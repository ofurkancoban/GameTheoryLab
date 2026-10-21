/* Exercise progress ("Solved" / "Review again") and the random exercise test. */
(function () {
  /* ---------- per-exercise status, stored as {id: {s: 'solved' | 'review' | '', t: timestamp}} ---------- */
  const get = () => store.get('exstat', {});
  const status = id => { const r = get()[id]; return r && r.s ? r.s : ''; };
  const setStatus = (id, s) => { const all = get(); all[id] = { s, t: Date.now() }; store.set('exstat', all); };
  const counts = lid => {
    const xs = GT.ex.filter(x => !lid || x.lec === lid), all = get();
    return { total: xs.length, solved: xs.filter(x => all[x.id] && all[x.id].s === 'solved').length, review: xs.filter(x => all[x.id] && all[x.id].s === 'review').length };
  };
  const reviewList = () => GT.ex.filter(x => status(x.id) === 'review');
  GT.exStat = { get, status, setStatus, counts, reviewList };

  const BADGE = { solved: '<span class="pill ok">solved</span>', review: '<span class="pill mid">review again</span>' };
  GT.exBadge = id => BADGE[status(id)] || '';

  /* Buttons under an exercise. */
  GT.exStatusBar = id => '<div class="row exst" data-exst="' + id + '"><span class="small muted">My status:</span>' +
    '<button class="btn sm ghost" type="button" data-v="solved">✓ Solved</button>' +
    '<button class="btn sm ghost" type="button" data-v="review">↺ Review again</button>' +
    '<button class="btn sm ghost" type="button" data-v="">Clear</button></div>';

  GT.bindExStatus = function (root) {
    root.querySelectorAll('[data-exst]').forEach(bar => {
      const id = bar.dataset.exst;
      const paint = () => {
        const s = status(id);
        bar.querySelectorAll('button').forEach(b => { const on = b.dataset.v === s && s !== ''; b.classList.toggle('ghost', !on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.hidden = b.dataset.v === '' && !s; });
        const badge = root.querySelector('[data-exbadge="' + id + '"]'); if (badge) badge.innerHTML = GT.exBadge(id);
      };
      bar.querySelectorAll('button').forEach(b => b.addEventListener('click', () => { setStatus(id, b.dataset.v); paint(); const sum = root.querySelector('#ex-sum'); if (sum) sum.innerHTML = GT.exSummary(); }));
      paint();
    });
  };

  GT.exSummary = function () {
    const c = counts(), r = reviewList();
    return '<strong>My progress:</strong> ' + c.solved + ' of ' + c.total + ' solved' + (c.review ? ', ' + c.review + ' marked "review again": ' + r.slice(0, 6).map(x => '<a href="#exercises/' + x.id + '">' + x.t.replace(/\\\(|\\\)/g, '') + '</a>').join(', ') + (r.length > 6 ? ', ...' : '') : '') + '.';
  };

  /* ---------- random exercise test ---------- */
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let timer = null;

  GT.pages.extest = {
    title: 'Exercise test', render: () => {
      const lecs = GT.lessons.filter(l => GT.ex.some(x => x.lec === l.id));
      const saved = store.get('extestLecs', lecs.map(l => l.id));
      return '<p class="eyebrow">Practise</p><h1>Exercise test</h1>' +
        '<p>A random set of exercise questions under exam conditions. Choose the lectures, the number of questions and the time. Write your answers on paper (or in the box), then open each solution and mark the question as solved or "review again". Questions you marked "review again" are drawn first if you tick the option below.</p>' +
        '<div class="drill"><div><strong>Lectures</strong> <button class="btn sm ghost" type="button" id="xt-all">All</button> <button class="btn sm ghost" type="button" id="xt-none">None</button></div>' +
        '<div class="xt-lecs">' + lecs.map(l => '<label class="chip"><input type="checkbox" value="' + l.id + '"' + (saved.includes(l.id) ? ' checked' : '') + '> L' + l.no + '</label>').join('') + '</div>' +
        '<div class="row"><label for="xt-n">Questions</label><select id="xt-n"><option>2</option><option selected>3</option><option>4</option><option>5</option></select>' +
        '<label for="xt-t">Time</label><select id="xt-t"><option value="0">no timer</option><option value="30">30 min</option><option value="45" selected>45 min</option><option value="60">60 min</option><option value="90">90 min</option></select></div>' +
        '<div class="row"><label><input type="checkbox" id="xt-sheet" checked> Only questions from the exercise sheets (exam style)</label></div>' +
        '<div class="row"><label><input type="checkbox" id="xt-rev" checked> Include my "review again" questions first</label></div>' +
        '<div class="row"><button class="btn" type="button" id="xt-go">Start a new test</button><span class="mono" id="xt-timer"></span><button class="btn sm ghost" type="button" id="xt-stop" hidden>Stop timer</button><span class="small muted" id="xt-msg"></span></div></div>' +
        '<div id="xt-out"></div>';
    },
  };

  GT.bindExTest = function (root) {
    const $ = s => root.querySelector(s), boxes = () => [...root.querySelectorAll('.xt-lecs input')];
    $('#xt-all').addEventListener('click', () => boxes().forEach(b => { b.checked = true; }));
    $('#xt-none').addEventListener('click', () => boxes().forEach(b => { b.checked = false; }));
    $('#xt-stop').addEventListener('click', () => { clearInterval(timer); $('#xt-stop').hidden = true; });
    $('#xt-go').addEventListener('click', () => {
      const lecs = boxes().filter(b => b.checked).map(b => b.value);
      store.set('extestLecs', lecs);
      const n = +$('#xt-n').value, onlySheet = $('#xt-sheet').checked, rev = $('#xt-rev').checked;
      let pool = GT.ex.filter(x => lecs.includes(x.lec) && (!onlySheet || !x.extra));
      if (!pool.length) { $('#xt-msg').textContent = 'No questions match: choose at least one lecture.'; return; }
      $('#xt-msg').textContent = '';
      const first = rev ? shuffle(pool.filter(x => status(x.id) === 'review')) : [];
      const rest = shuffle(pool.filter(x => !first.includes(x)).sort((a, b) => (status(a.id) === 'solved') - (status(b.id) === 'solved')));
      /* Prefer unsolved questions, then solved ones; keep at most one question per lecture where possible. */
      const pick = [], used = new Set();
      [...first, ...rest].forEach(x => { if (pick.length < n && !used.has(x.lec)) { pick.push(x); used.add(x.lec); } });
      [...first, ...rest].forEach(x => { if (pick.length < n && !pick.includes(x)) pick.push(x); });
      const out = $('#xt-out');
      out.innerHTML = pick.map((x, k) => '<section class="exitem xt-item" id="xt-' + x.id + '"><h3>Question ' + (k + 1) + ': ' + x.t + ' <span data-exbadge="' + x.id + '">' + GT.exBadge(x.id) + '</span></h3><p class="exsrc">' + GT.exChips(x) + ' <span class="chip">Lecture ' + GT.lessons.find(l => l.id === x.lec).no + '</span></p><div class="xt-body">' + x.body + '</div>' +
        '<textarea class="anstext" rows="5" placeholder="Your answer (optional; not saved)" aria-label="Your answer"></textarea>' + GT.exStatusBar(x.id) + '</section>').join('') +
        '<p class="small muted">Finished? <a href="#exercises">Back to all exercises</a> or start a new test above.</p>';
      /* Hide everything after the question block behind one "Show solution" button. */
      out.querySelectorAll('.xt-body').forEach(b => {
        const q = b.querySelector('.exq'); if (!q) return;
        const det = document.createElement('details'); det.className = 'sol'; det.innerHTML = '<summary>Show solution</summary><div class="sol-body"></div>';
        const body = det.querySelector('.sol-body');
        [...b.childNodes].filter(nd => nd !== q).forEach(nd => body.appendChild(nd));
        const ta = b.parentElement.querySelector('.anstext'); if (ta) b.appendChild(ta);
        b.appendChild(det);
      });
      GT.enhance(out);
      GT.bindExStatus(out);
      clearInterval(timer);
      const mins = +$('#xt-t').value, el = $('#xt-timer');
      if (mins) {
        let left = mins * 60; $('#xt-stop').hidden = false;
        const tick = () => { el.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0'); };
        tick();
        timer = setInterval(() => { if (!document.body.contains(el)) { clearInterval(timer); return; } left--; tick(); if (left <= 0) { clearInterval(timer); el.textContent = 'Time is up'; $('#xt-stop').hidden = true; } }, 1000);
      } else { el.textContent = ''; $('#xt-stop').hidden = true; }
      out.scrollIntoView({ behavior: 'smooth' });
    });
  };
})();
