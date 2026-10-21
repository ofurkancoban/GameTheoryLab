/* Features that need the claude.ai viewer: cross-device sync (db), study-group questions (db + user) and Ask Claude (sample).
 * Every feature degrades to "not available here" when the page runs as a local file. */
(function () {
  const C = GT.cloud = { db: null, user: null, sample: null, uid: null, ready: false, synced: false };
  const SYNC_KEYS = ['done', 'wrong', 'stats', 'srs', 'srsq', 'examDate', 'restDays', 'answers', 'exstat'];
  const hasViewer = typeof window.claude !== 'undefined' && window.claude && typeof window.claude.use === 'function';

  /* ---------- sync ---------- */
  const rawSet = store.set.bind(store);
  let pushTimer = null;
  store.set = function (k, v) {
    rawSet(k, v);
    if (C.synced && SYNC_KEYS.includes(k)) { clearTimeout(pushTimer); pushTimer = setTimeout(push, 1500); }
  };
  function snapshot() { const o = {}; SYNC_KEYS.forEach(k => { const v = store.get(k, null); if (v != null) o[k] = v; }); return o; }
  function setStatus(t) { C.statusText = t; const el = document.getElementById('syncStatus'); if (el) { el.textContent = t; el.hidden = false; } }
  let writing = false, again = false;
  async function push() {
    if (!C.db || !C.uid) return;
    if (writing) { again = true; return; }
    writing = true;
    try { await C.db.doc('data/users/' + C.uid + '/progress').set(Object.assign(snapshot(), { updatedAt: Date.now() })); setStatus('✓ Progress synced to your account'); }
    catch (e) { setStatus('Progress saved on this device only'); }
    writing = false;
    if (again) { again = false; push(); }
  }
  /* Merge two progress objects so nothing learned on either device is lost. */
  function merge(local, remote) {
    const out = Object.assign({}, remote, local);
    out.done = [...new Set([...(remote.done || []), ...(local.done || [])])];
    out.wrong = [...new Set([...(remote.wrong || []), ...(local.wrong || [])])];
    const st = {}; [remote.stats || {}, local.stats || {}].forEach(s => Object.keys(s).forEach(l => {
      const a = st[l], b = s[l]; if (!a) { st[l] = b; return; }
      st[l] = (a.q[1] + a.d[1] >= b.q[1] + b.d[1]) ? a : b;
    }));
    out.stats = st;
    ['srs', 'srsq'].forEach(key => {
      const m = Object.assign({}, remote[key] || {});
      Object.entries(local[key] || {}).forEach(([k, v]) => { if (!m[k] || (v.n || 0) >= (m[k].n || 0)) m[k] = v; });
      out[key] = m;
    });
    out.answers = Object.assign({}, remote.answers || {}, local.answers || {});
    const ex = Object.assign({}, remote.exstat || {});
    Object.entries(local.exstat || {}).forEach(([k, v]) => { if (!ex[k] || (v.t || 0) >= (ex[k].t || 0)) ex[k] = v; });
    out.exstat = ex;
    if (local.examDate) out.examDate = local.examDate;
    return out;
  }

  async function init() {
    if (!hasViewer) return;
    const [db, user, sample] = await Promise.all([window.claude.use('db'), window.claude.use('user'), window.claude.use('sample')]);
    C.db = db; C.user = user; C.sample = sample; C.ready = true;
    if (user) C.uid = await user.id();
    if (db && C.uid) {
      setStatus('Syncing progress...');
      try {
        const snap = await db.doc('data/users/' + C.uid + '/progress').get();
        const merged = merge(snapshot(), snap.exists ? snap.data() : {});
        SYNC_KEYS.forEach(k => { if (merged[k] != null) rawSet(k, merged[k]); });
        C.synced = true;
        await push();
        if (GT.refresh) GT.refresh();
      } catch (e) { setStatus('Progress saved on this device only'); }
    }
    document.dispatchEvent(new CustomEvent('gt-cloud'));
  }
  init();

  /* ---------- study group questions ---------- */
  GT.pages.group = {
    title: 'Study group', render: () => '<p class="eyebrow">My study</p><h1>Study group questions</h1>' +
      '<p>A shared question pool for everyone you share this app with. Write exam-style multiple-choice questions for each other; everybody can practise them. Questions are visible to everyone who can open the app.</p>' +
      '<div id="grp-state" class="readout">Connecting...</div>' +
      '<div id="grp-form" hidden><h2>Add a question</h2><div class="drill">' +
      '<label>Lecture <select id="g-lec">' + GT.lessons.map(l => '<option value="' + l.id + '">L' + l.no + ' ' + esc(l.title) + '</option>').join('') + '</select></label>' +
      '<label>Question<br><textarea id="g-q" rows="2" maxlength="500" style="width:100%"></textarea></label>' +
      [0, 1, 2, 3].map(i => '<label class="row"><input type="radio" name="g-a" value="' + i + '"' + (i === 0 ? ' checked' : '') + ' aria-label="mark option ' + (i + 1) + ' correct"> <input type="text" id="g-o' + i + '" maxlength="200" placeholder="Option ' + (i + 1) + (i === 0 ? ' (select the correct one on the left)' : '') + '" style="flex:1;min-width:0"></label>').join('') +
      '<label>Explanation (why the answer is right)<br><textarea id="g-e" rows="2" maxlength="600" style="width:100%"></textarea></label>' +
      '<div class="row"><button class="btn sm" id="g-add" type="button">Add question</button><span class="small" id="g-msg"></span></div></div></div>' +
      '<h2>Practise the pool</h2><div class="row"><label for="g-filter">Lecture</label><select id="g-filter"><option value="all">All lectures</option>' + GT.lessons.map(l => '<option value="' + l.id + '">L' + l.no + '</option>').join('') + '</select></div><div id="grp-list"></div>',
  };
  let grpUnsub = null;
  GT.bindGroup = function (root) {
    if (grpUnsub) { grpUnsub(); grpUnsub = null; }
    const state = root.querySelector('#grp-state'), list = root.querySelector('#grp-list');
    const start = async () => {
      if (!C.db) { state.innerHTML = hasViewer ? 'The shared pool needs you to be signed in on claude.ai.' : 'The study group works in the published version of this app on claude.ai (open the link and sign in). This copy runs from a local file.'; return; }
      const canWrite = C.user ? await C.user.can('data.write') : null;
      root.querySelector('#grp-form').hidden = canWrite === false || !C.uid;
      state.innerHTML = canWrite === false ? 'You can practise the pool. Adding questions needs Contributor access to this app (ask the owner).' : 'Connected. Questions you add appear for everyone instantly.';
      let docs = [];
      const render = async () => {
        const f = root.querySelector('#g-filter').value;
        const items = docs.filter(d => f === 'all' || d.lec === f);
        if (!items.length) { list.innerHTML = '<p class="readout">No questions yet' + (f !== 'all' ? ' for this lecture' : '') + '. Add the first one above.</p>'; return; }
        const ps = C.user ? await C.user.profiles([...new Set(items.map(d => d.author).filter(Boolean))]) : {};
        list.innerHTML = '<div class="quiz"></div>';
        GT.mountQuiz(list.firstChild, items.map(d => ({ lec: d.lec, q: esc(d.q), o: d.o.map(esc), a: d.a, e: esc(d.e || '') + '<br><span class="small muted">Added by ' + esc((ps[d.author] && ps[d.author].name) || (d.author === C.uid ? 'you' : 'a classmate')) + '</span>' })), 'Group questions (' + items.length + ')');
        items.forEach((d, i) => {
          if (d.author !== C.uid) return;
          const q = list.querySelectorAll('.q')[i]; if (!q) return;
          const b = document.createElement('button'); b.className = 'btn ghost sm'; b.type = 'button'; b.textContent = 'Delete my question'; b.style.marginTop = '6px';
          b.addEventListener('click', async () => { if (b.dataset.armed) { try { await C.db.doc('groupq/' + d.id).delete(); } catch (e) { b.textContent = 'Could not delete'; } } else { b.dataset.armed = '1'; b.textContent = 'Click again to delete'; } });
          q.appendChild(b);
        });
      };
      grpUnsub = C.db.collection('groupq').orderBy('created', 'desc').limit(500).onSnapshot(s => { docs = s.docs.map(x => Object.assign({ id: x.id }, x.data())).filter(d => d && typeof d.q === 'string' && Array.isArray(d.o) && d.o.length === 4); render(); }, () => { state.textContent = 'The shared pool is not reachable right now. Reload the page to try again.'; });
      root.querySelector('#g-filter').addEventListener('change', render);
      root.querySelector('#g-add').addEventListener('click', async () => {
        const msg = root.querySelector('#g-msg'), q = root.querySelector('#g-q').value.trim(), o = [0, 1, 2, 3].map(i => root.querySelector('#g-o' + i).value.trim());
        const a = +root.querySelector('input[name=g-a]:checked').value, e = root.querySelector('#g-e').value.trim();
        if (q.length < 10 || o.some(x => !x)) { msg.textContent = 'Write a question and all four options.'; return; }
        try {
          await C.db.collection('groupq').add({ lec: root.querySelector('#g-lec').value, q, o, a, e, author: C.uid, created: Date.now() });
          msg.textContent = 'Added. Thanks!'; ['#g-q', '#g-e', '#g-o0', '#g-o1', '#g-o2', '#g-o3'].forEach(s => { root.querySelector(s).value = ''; });
        } catch (err) { msg.textContent = err && err.code === 'quota_exceeded' ? 'The pool is full. Delete old questions first.' : 'Could not save. You may only have view access to this app.'; }
      });
    };
    if (C.ready || !hasViewer) start(); else document.addEventListener('gt-cloud', start, { once: true });
  };
  window.addEventListener('hashchange', () => { if (grpUnsub && location.hash !== '#group') { grpUnsub(); grpUnsub = null; } });

  /* ---------- Ask the AI (claude.ai account, or the viewer's own provider) ---------- */
  /* Resolves the whole answer text. Uses claude.ai's sample when available, otherwise the connected provider. */
  GT.askAI = async function (rules, turns, onText, signal) {
    if (C.sample) {
      try { const r = await C.sample([{ role: 'user', content: rules }, ...turns], { cache: false, signal, onText: onText ? ({ text }) => onText(text) : undefined }); return r.text; }
      catch (e) { const x = new Error(e && e.message || 'failed'); x.code = e && e.code; x.text = e && e.text; throw x; }
    }
    if (GT.ai && GT.ai.configured()) return GT.ai.chat(rules, turns, signal, onText);
    const x = new Error('No AI connected.'); x.code = 'not_configured'; throw x;
  };
  /* Live rendering of a streamed answer: Markdown while it arrives (throttled), formulas typeset at the end. */
  GT.streamInto = function (el) {
    let last = '', timer = null;
    el.classList.add('streaming');
    const paint = () => { timer = null; el.innerHTML = renderMD(last) || '<p class="muted">Thinking...</p>'; };
    return {
      update(t) { last = t; if (!timer) timer = setTimeout(paint, 60); },
      finish(t) { clearTimeout(timer); el.classList.remove('streaming'); el.innerHTML = renderMD(t != null ? t : last); GT.typeset(el); },
      fail() { clearTimeout(timer); el.classList.remove('streaming'); },
    };
  };
  GT.aiAvailable = () => !!C.sample || !!(GT.ai && GT.ai.configured());
  const aiMissingHTML = () => hasViewer ? '' : '<p class="small">No AI connected yet. <a href="#ai">Connect your own AI</a> (Anthropic, OpenAI, Gemini or a local model) to ask questions here.</p>';
  GT.aiErrorText = function (e) {
    const code = e && e.code;
    return code === 'cancelled' ? '' : code === 'not_configured' ? 'No AI connected. Open the AI tutor settings to choose one.' : code === 'auth' ? 'The provider rejected the key. Check it in the AI tutor settings.' : code === 'rate' || code === 'rate_limited' ? ((e && /free model/.test(e.message || '')) ? e.message : 'Too many requests right now. Try again in a little while.') : code === 'timeout' ? e.message : code === 'refused' ? 'The model declined this question. Try rephrasing it.' : code === 'session_expired' ? 'Please sign in to claude.ai again.' : (e && e.message) ? 'The answer failed: ' + e.message : 'The answer was interrupted. Ask again.';
  };
  const hideCodes = ['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'];

  GT.askBox = function (lessonId) {
    return '<div class="box" data-ask="' + lessonId + '" hidden><span class="lbl">Ask about this lecture</span>' +
      '<p class="small muted ask-src"></p><div class="ask-missing"></div>' +
      '<div class="ask-log"></div>' +
      '<div class="ask-compose"><textarea class="ask-in" rows="2" placeholder="e.g. Why does B offer A exactly Zδ_A in stage 2?" aria-label="Your question"></textarea>' +
      '<button class="btn ask-go" type="button">Ask</button><button class="btn ghost ask-stop" type="button" hidden>Stop</button></div>' +
      '<p class="small muted ask-hint">Enter to send, Shift + Enter for a new line.</p><p class="small ask-note"></p></div>';
  };
  GT.bindAsk = function (root) {
    const el = root.querySelector('[data-ask]'); if (!el) return;
    const go = () => {
      if (hasViewer && !C.sample) return;
      el.hidden = false;
      const src = el.querySelector('.ask-src');
      const label = () => { if (C.sample) src.textContent = 'Answers use your claude.ai account and follow this lecture\'s content.'; else if (GT.ai && GT.ai.configured()) { const c = GT.ai.cfg(); src.innerHTML = c.provider === 'free' ? 'Answers use the free open model GPT-OSS 20B.' : 'Answers use ' + esc(GT.ai.PROVIDERS[c.provider].name) + ' (' + esc(c.model) + '). <a href="#ai">Change</a>'; } else src.textContent = ''; el.querySelector('.ask-missing').innerHTML = GT.aiAvailable() ? '' : aiMissingHTML(); };
      label();
      const l = GT.lessons.find(x => x.id === el.dataset.ask), log = el.querySelector('.ask-log'), inp = el.querySelector('.ask-in'), btn = el.querySelector('.ask-go'), stop = el.querySelector('.ask-stop'), note = el.querySelector('.ask-note');
      const tmp = document.createElement('div'); tmp.innerHTML = l.html;
      const ctx = tmp.textContent.replace(/\s+/g, ' ').slice(0, 14000);
      const rules = 'You are a patient tutor for the university course "Advanced Microeconomics" (game theory, Prof. Carsten Helm, University of Oldenburg). Answer the student\'s question about Lecture ' + l.no + ': ' + l.title + '. Stay consistent with the lecture notes below, use the same notation, explain step by step in plain English, keep it short (under 250 words) unless asked for more, and write math in LaTeX between \\( and \\). If the question is outside the course, say so briefly.\n\nLECTURE NOTES:\n' + ctx;
      const turns = [];
      let ctl = null;
      stop.addEventListener('click', () => ctl && ctl.abort());
      inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); if (!btn.disabled) btn.click(); } });
      btn.addEventListener('click', async () => {
        const q = inp.value.trim(); if (!q) return;
        if (!GT.aiAvailable()) { label(); return; }
        inp.value = ''; btn.disabled = true; btn.hidden = true; stop.hidden = false; note.textContent = '';
        const qd = document.createElement('div'); qd.className = 'ask-q'; qd.textContent = q; log.appendChild(qd);
        const ad = document.createElement('div'); ad.className = 'ask-a'; ad.innerHTML = '<p class="muted">Thinking...</p>'; log.appendChild(ad);
        const live = GT.streamInto(ad);
        turns.push({ role: 'user', content: q });
        ctl = new AbortController();
        try {
          const text = await GT.askAI(rules, turns.slice(-8), t => live.update(t), ctl.signal);
          turns.push({ role: 'assistant', content: text });
          live.finish(text);
        } catch (e) {
          turns.pop();
          live.fail();
          if (e && e.text) live.finish(e.text); else ad.textContent = '';
          if (hideCodes.includes(e && e.code)) { el.hidden = true; return; }
          note.textContent = GT.aiErrorText(e);
          if (!ad.textContent) ad.remove();
        } finally { btn.disabled = false; btn.hidden = false; stop.hidden = true; inp.focus(); }
      });
    };
    if (C.ready || !hasViewer) go(); else document.addEventListener('gt-cloud', go, { once: true });
  };
})();
