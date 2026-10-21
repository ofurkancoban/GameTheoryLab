/* App shell: routing, navigation, progress, quiz bank, flashcards, drills, mock exams, search. */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const main = $('#main'), nav = $('#nav');
  const done = new Set(store.get('done', []));
  const fmt = GT.util.fmt;

  /* ---------- navigation ---------- */
  const NAV = [
    ['Practise', [['exercises', 'Exercises'], ['extest', 'Exercise test'], ['drills', 'Practice drills'], ['derive', 'Derivation practice'], ['quiz', 'Question bank'], ['cards', 'Flashcards']]],
    ['Exam', [['exams', 'Past exams'], ['mock', 'Mock exams'], ['formulas', 'Formula sheet'], ['mistakes', 'Common mistakes']]],
    ['My study', [['progress', 'My progress'], ['plan', 'Study plan'], ['group', 'Study group']]],
    ['About and settings', [['sources', 'Sources and cross-check'], ['osborne', 'Osborne chapter guide'], ['ai', 'AI tutor']]],
  ];
  function buildNav() {
    const parts = {};
    GT.lessons.forEach(l => { (parts[l.part] = parts[l.part] || []).push(l); });
    let h = '<div class="nav-group"><span class="eyebrow">Overview</span><div class="nav">' + navLink(['home', 'Start here']) + navLink(['concepts', 'Concept map']) + navLink(['lab', 'Game lab']) + navLink(['tutorial', 'Tutorial']) + '</div></div>';
    h += '<div class="nav-group"><span class="eyebrow">Progress</span><div class="progressbar"><div id="pbar"></div></div><div class="small muted" style="padding:0 10px" id="ptext"></div><div class="sync-line" id="syncStatus"' + (GT.cloud && GT.cloud.statusText ? '' : ' hidden') + ' title="Your progress is saved to your claude.ai account and appears on all your devices">' + (GT.cloud && GT.cloud.statusText ? esc(GT.cloud.statusText) : '') + '</div></div>';
    Object.keys(parts).forEach(p => {
      h += '<div class="nav-group"><span class="eyebrow">' + p + '</span><div class="nav">' + parts[p].map(l => '<a href="#' + l.id + '" data-r="' + l.id + '"><span class="num">L' + l.no + '</span><span>' + l.title + '</span>' + (done.has(l.id) ? '<span class="done">✓</span>' : '') + '</a>').join('') + '</div></div>';
    });
    NAV.forEach(([g, items]) => { h += '<div class="nav-group"><span class="eyebrow">' + g + '</span><div class="nav">' + items.map(navLink).join('') + '</div></div>'; });
    nav.innerHTML = h; updateProgress(); markActive();
  }
  function navLink(e) { return '<a href="#' + e[0] + '" data-r="' + e[0] + '"><span>' + e[1] + '</span></a>'; }
  function updateProgress() {
    const n = GT.lessons.filter(l => done.has(l.id)).length, t = GT.lessons.length;
    const bar = $('#pbar'); if (bar) bar.style.width = (100 * n / t) + '%';
    const tx = $('#ptext'); if (tx) tx.textContent = n + ' of ' + t + ' lectures marked as learned';
  }
  function markActive() { const r = route(); nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.dataset.r === r)); }
  const ALIAS = { problems: 'exercises' };
  const route = () => { const r = (location.hash || '#home').slice(1).split('/')[0] || 'home'; return ALIAS[r] || r; };
  const subTarget = () => (location.hash || '').slice(1).split('/')[1] || '';

  /* ---------- rendering ---------- */
  function clean(html) { return html.replace(/\\'/g, "'"); }
  function render() {
    const r = route();
    const lesson = GT.lessons.find(l => l.id === r);
    let html, wide = false;
    if (lesson) html = renderLesson(lesson);
    else if (r === 'home') html = renderHome();
    else if (r === 'lab') { html = renderLab(); wide = true; }
    else if (r === 'drills') html = '<div id="drills"></div>';
    else if (r === 'quiz') html = '<div id="quizpage"></div>';
    else if (r === 'cards') html = '<div id="cardpage"></div>';
    else if (r === 'search') html = '<div id="searchpage"></div>';
    else if (GT.pages[r]) html = GT.pages[r].render();
    else html = renderHome();
    main.innerHTML = '<div class="page' + (wide ? ' wide' : '') + '">' + clean(html) + '</div>';
    enhance(main);
    if (r === 'drills') Drills.mount($('#drills'));
    if (r === 'quiz') QuizPage.mount($('#quizpage'));
    if (r === 'cards') Cards.mount($('#cardpage'));
    if (r === 'search') Search.mount($('#searchpage'));
    if (r === 'mock') Mock.bind(main);
    if (r === 'exercises') GT.bindExStatus(main);
    if (r === 'tutorial') GT.bindTutorial(main);
    if (r === 'home' && GT.bindTourInvite) GT.bindTourInvite(main);
    if (r === 'extest') GT.bindExTest(main);
    if (r === 'home') bindBackup();
    if (r === 'plan') GT.buildPlan(main);
    if (r === 'derive') GT.bindDerivations(main);
    if (r === 'ai') GT.bindAISettings(main);
    if (r === 'group') GT.bindGroup(main);
    if (lesson) GT.bindAsk(main);
    bindAnswers(main);
    main.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = main.querySelector('#' + a.dataset.jump); if (t) t.scrollIntoView({ behavior: 'smooth' }); }));
    if (r === 'progress') { const b = $('#pg-reset'); if (b) b.addEventListener('click', () => { if (b.dataset.armed) { store.set('stats', {}); render(); } else { b.dataset.armed = '1'; b.textContent = 'Click again to confirm'; $('#pg-msg').textContent = 'This clears all quiz and drill statistics.'; } }); }
    markActive();
    document.title = (lesson ? 'L' + lesson.no + ' ' + lesson.title : (GT.pages[r] ? GT.pages[r].title : 'Advanced Micro Lab')) + ' · Advanced Micro Lab';
    const sub = subTarget(), target = sub && /^[\w-]+$/.test(sub) ? main.querySelector('#' + sub) : null;
    if (target) setTimeout(() => target.scrollIntoView(), 0); else window.scrollTo(0, 0);
    $('#sidebar').classList.remove('open');
    store.set('last', r);
  }
  function bindBackup() {
    const t = $('#bk-text'), msg = $('#bk-msg'); if (!t) return;
    $('#bk-show').addEventListener('click', () => { t.value = btoa(unescape(encodeURIComponent(JSON.stringify({ done: [...done], wrong: store.get('wrong', []), last: store.get('last', null) })))); t.select(); msg.textContent = 'Copy this code and paste it on the other device, then press "Restore from code" there.'; });
    $('#bk-load').addEventListener('click', () => {
      try { const d = JSON.parse(decodeURIComponent(escape(atob(t.value.trim())))); done.clear(); (d.done || []).forEach(x => done.add(x)); store.set('done', [...done]); store.set('wrong', d.wrong || []); buildNav(); msg.textContent = 'Restored: ' + done.size + ' lectures marked as learned.'; }
      catch (e) { msg.textContent = 'This code could not be read. Copy the whole code from the other device and try again.'; }
    });
  }
  function typeset(el) { if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([el]).catch(() => {}); }
  GT.typeset = typeset;
  GT.enhance = r => enhance(r);

  function enhance(root) {
    root.querySelectorAll('.reveal').forEach(rv => {
      const items = [...rv.querySelectorAll('ol.steps > li')];
      let shown = 1;
      const upd = () => { items.forEach((li, i) => { li.classList.toggle('hidden-step', i >= shown); }); rv.querySelector('.js-next').disabled = shown >= items.length; };
      rv.querySelector('.js-next').addEventListener('click', () => { shown = Math.min(items.length, shown + 1); upd(); items[shown - 1].classList.add('just'); });
      rv.querySelector('.js-all').addEventListener('click', () => { shown = items.length; upd(); });
      rv.querySelector('.js-reset').addEventListener('click', () => { shown = 1; upd(); });
      upd();
    });
    root.querySelectorAll('.quiz[data-quiz]').forEach(q => mountQuiz(q, GT.quizzes[q.dataset.quiz], q.dataset.title, q.dataset.quiz.replace('q-', '')));
    GT.mountWidgets(root);
    root.querySelectorAll('[data-done]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.done; if (done.has(id)) done.delete(id); else done.add(id);
      store.set('done', [...done]); buildNav(); b.textContent = done.has(id) ? 'Marked as learned ✓ (undo)' : 'Mark this lecture as learned'; b.classList.toggle('ghost', done.has(id));
    }));
    typeset(root);
  }

  function renderLesson(l) {
    const i = GT.lessons.indexOf(l), prev = GT.lessons[i - 1], next = GT.lessons[i + 1];
    const toc = [...l.html.matchAll(/<h2 id="(s\d+)">(.*?)<\/h2>/g)].map(m => '<a href="#' + l.id + '" data-jump="' + m[1] + '">' + m[2].replace(/<[^>]+>/g, '') + '</a>').join('');
    const sm = GT.slideMap && GT.slideMap[l.no], file = GT.slideFiles && GT.slideFiles[l.no], local = location.protocol === 'file:';
    const html = l.html.replace(/<h2 id="(s\d+)">(.*?)<\/h2>/g, (m, id, t) => {
      const r = sm && sm[id]; if (!r) return m;
      const txt = r === 'info' ? 'Course information sheet, pp. 6-8' : 'Slides ' + (r[0] === r[1] ? 'p. ' + r[0] : 'pp. ' + r[0] + '-' + r[1]) + ' of ' + file;
      const href = r === 'info' ? '../AdvancedMicro_Info_WS2627.pdf#page=6' : '../' + file + '#page=' + r[0];
      return m + '<p class="small muted" style="margin-top:-4px">' + (local ? '<a href="' + href + '" target="_blank" rel="noopener">' + txt + '</a>' : txt) + '</p>';
    });
    return '<header class="lesson-head"><div class="lesson-meta"><span class="chip acc">Lecture ' + l.no + '</span><span class="chip">' + l.part + '</span></div><h1>' + l.title + '</h1><div class="small muted">Reading: ' + l.read + '</div><div class="small muted">Slides: ' + (GT.slideFiles ? GT.slideFiles[l.no] : '') + ' (page references under each heading)</div></header>' +
      '<div class="goals"><span class="eyebrow">After this lecture you can</span><ul>' + l.goals.map(g => '<li>' + g + '</li>').join('') + '</ul></div><nav class="toc" aria-label="Sections">' + toc + '</nav>' +
      html +
      (GT.summaries && GT.summaries[l.id] ? '<div class="box thm"><span class="lbl">Key takeaways</span><ul>' + GT.summaries[l.id].map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' + '</div>' : '') +
      GT.exFor(l.id) +
      GT.askBox(l.id) +
      '<div class="mark-done"><span>Worked through everything, including the quiz?</span><button class="btn' + (done.has(l.id) ? ' ghost' : '') + '" data-done="' + l.id + '">' + (done.has(l.id) ? 'Marked as learned ✓ (undo)' : 'Mark this lecture as learned') + '</button></div>' +
      '<div class="pager">' + (prev ? '<a href="#' + prev.id + '"><span class="eyebrow">Previous</span>L' + prev.no + ' ' + prev.title + '</a>' : '<span></span>') + (next ? '<a href="#' + next.id + '" style="text-align:right"><span class="eyebrow">Next</span>L' + next.no + ' ' + next.title + '</a>' : '<a href="#exams" style="text-align:right"><span class="eyebrow">Next</span>Past exams</a>') + '</div>';
  }

  function todayBox() {
    const dc = GT.srs.dueCards().length, dq = GT.srs.dueQuestions().length, ex = store.get('examDate', null);
    const days = ex ? Math.round((new Date(ex + 'T00:00:00') - new Date(new Date().toDateString())) / 864e5) : null;
    const next = GT.lessons.find(l => !done.has(l.id));
    const st = GT.stats.get(); let weak = null;
    GT.lessons.forEach(l => { const r = st[l.id]; if (!r) return; const t = r.q[1] + r.d[1]; if (t < 3) return; const acc = (r.q[0] + r.d[0]) / t; if (acc < 0.8 && (!weak || acc < weak.acc)) weak = { l, acc }; });
    return '<div class="box thm"><span class="lbl">Today</span><ul>' +
      (dc ? '<li><a href="#cards">' + dc + ' flashcard' + (dc === 1 ? '' : 's') + ' due for review</a></li>' : '<li>No flashcards due: <a href="#cards">learn new cards</a></li>') +
      (dq ? '<li><a href="#quiz">' + dq + ' quiz mistake' + (dq === 1 ? '' : 's') + ' due for review</a></li>' : '') +
      (GT.exStat && GT.exStat.reviewList().length ? '<li><a href="#extest">' + GT.exStat.reviewList().length + ' exercise' + (GT.exStat.reviewList().length === 1 ? '' : 's') + ' marked "review again"</a>: practise them in an exercise test</li>' : '') +
      (next ? '<li>Next lecture: <a href="#' + next.id + '">L' + next.no + ' ' + next.title + '</a></li>' : '') +
      (weak ? '<li>Weakest topic: <a href="#' + weak.l.id + '">L' + weak.l.no + ' ' + weak.l.title + '</a> (' + Math.round(weak.acc * 100) + '% correct)</li>' : '') +
      (days != null && days > 0 ? '<li><a href="#plan">' + days + ' days until the exam</a></li>' : '<li><a href="#plan">Set your exam date for a study plan</a></li>') +
      '</ul></div>';
  }
  function renderHome() {
    const last = store.get('last', null), lastL = GT.lessons.find(l => l.id === last);
    return H`<p class="eyebrow">Advanced Microeconomics · Prof. Carsten Helm · University of Oldenburg</p>
<h1>Advanced Micro Lab</h1>
<p>A complete, interactive course companion built from the 18 lecture slide sets, the exercise sheets and the past exams in your course folder. Every lecture is broken into small steps, every derivation can be revealed line by line, and every model you need for the exam has a tool you can play with.</p>
${lastL ? '<p><a class="btn" href="#' + lastL.id + '" style="text-decoration:none">Continue with L' + lastL.no + ': ' + lastL.title + '</a></p>' : '<p><a class="btn" href="#l1" style="text-decoration:none">Start with Lecture 1</a></p>'}
${GT.tourInvite ? GT.tourInvite() : ''}
${todayBox()}
<h2>The course on one page</h2>
<p>The course is organised by classes of games. Each cell has its own equilibrium concept, and each refinement keeps the previous one as a special case.</p>
<div class="quad">
<div class="hd hd-col"></div><div class="hd hd-col">Static</div><div class="hd hd-col">Dynamic</div>
<div class="hd hd-row">Complete information</div><div data-k="Static, complete information"><strong>Nash equilibrium</strong><a href="#l2">L2 Dominance</a><a href="#l3">L3 Nash, Cournot</a><a href="#l4">L4 Mixed strategies</a><a href="#l5">L5 Selection</a></div><div data-k="Dynamic, complete information"><strong>Subgame perfect equilibrium</strong><a href="#l6">L6 Backward induction</a><a href="#l7">L7 Subgame perfection</a><a href="#l8">L8 Rubinstein</a><a href="#l9">L9 Nash bargaining</a><a href="#l10">L10 Repeated games</a></div>
<div class="hd hd-row">Incomplete information</div><div data-k="Static, incomplete information"><strong>Bayesian Nash equilibrium</strong><a href="#l11">L11 Bayesian games</a><a href="#l12">L12 Auctions</a></div><div data-k="Dynamic, incomplete information"><strong>Perfect Bayesian equilibrium</strong><a href="#l13">L13 PBE</a><a href="#l14">L14 Signalling</a></div>
</div>
<p>Applications built on these tools: <a href="#l15">L15 Incentive contracts</a>, <a href="#l16">L16 Risk in contracting</a>, <a href="#l17">L17 Psychological games</a>, <a href="#l18">L18 Contract enforcement</a>.</p>

<h2>How each lecture page works</h2>
<div class="grid-cards">
<div class="card"><span class="t">Goals first</span><span class="d">Each page starts with what you will be able to do, then builds up in numbered sections.</span></div>
<div class="card"><span class="t">Step-by-step derivations</span><span class="d">Click "Next step" to reveal one line at a time. Try to predict the next step before you click.</span></div>
<div class="card"><span class="t">Interactive models</span><span class="d">Sliders, matrices and game trees you can change. Watch the equilibrium move.</span></div>
<div class="card"><span class="t">Exam boxes</span><span class="d">Exam-ready wording of definitions, common mistakes and graded past-exam solutions.</span></div>
</div>

<h2>A study plan for the exam</h2>
<div class="tbl"><table><tr><th>Phase</th><th>What to do</th><th>Where</th></tr>
<tr><td>1. Understand</td><td>Work through one lecture at a time; do every step reveal and the quiz at the end; mark it as learned.</td><td>L1 to L18</td></tr>
<tr><td>2. Memorise</td><td>Learn all definitions in exam wording; the exams give 1-2 points per definition.</td><td><a href="#cards">Flashcards</a>, <a href="#formulas">Formula sheet</a></td></tr>
<tr><td>3. Practise</td><td>Solve every exercise on paper first, then compare step by step. Do drills until the computations are automatic.</td><td><a href="#exercises">Exercises</a>, <a href="#drills">Drills</a></td></tr>
<tr><td>4. Test</td><td>Write the past exams and mock exams under time pressure (60 minutes, 30 points).</td><td><a href="#exams">Past exams</a>, <a href="#mock">Mock exams</a></td></tr>
<tr><td>5. Close gaps</td><td>Review the questions you got wrong.</td><td><a href="#quiz">Question bank</a> (mistakes mode)</td></tr></table></div>
${box('tip', '<p>From the course information sheet: exam questions are partly close to the lecture slides and partly close to the exercises, or a mix. Relevant are the exercises and the final version of the lecture slides. Register at least one week before the exam. Bonus point: 3 solution attempts (2 if you presented) improve the grade by 0.3. The info sheet lists an exam on Friday, 12 February (12:00-13:30) and a retake on 10 March (14:00-15:30), marked "to be confirmed": check Stud.IP for the current dates and rooms.</p>', 'Exam facts')}
<h2>Exam preparation tools</h2>
<div class="grid-cards">
<a class="card" href="#progress"><span class="t">My progress</span><span class="d">Accuracy per lecture and your weakest topics.</span></a>
<a class="card" href="#plan"><span class="t">Study plan</span><span class="d">A day-by-day plan up to your exam date.</span></a>
<a class="card" href="#lab"><span class="t">Game lab</span><span class="d">Enter any matrix: best responses, IESDS, pure and mixed equilibria. Solve any game tree by backward induction.</span></a>
<a class="card" href="#drills"><span class="t">Practice drills</span><span class="d">Endless randomly generated exam-style computations with instant feedback.</span></a>
<a class="card" href="#quiz"><span class="t">Question bank</span><span class="d">${GT.bank.length + Object.values(GT.quizzes).reduce((s, q) => s + q.length, 0)} multiple-choice questions with explanations.</span></a>
<a class="card" href="#exercises"><span class="t">Exercises</span><span class="d">${GT.ex.filter(x => !x.extra).length} questions from all exercise sheets and ${GT.ex.filter(x => x.extra).length} extra problems, solved step by step and ordered by lecture.</span></a>
<a class="card" href="#exams"><span class="t">Past exams</span><span class="d">Dec 2013 and Feb 2014 with graded solutions.</span></a>
<a class="card" href="#mock"><span class="t">Mock exams</span><span class="d">${GT.mocks.length} exams in the same style, with a 60 or 90-minute timer.</span></a>
<a class="card" href="#cards"><span class="t">Flashcards</span><span class="d">${GT.cards.length} definitions and results.</span></a>
</div>
<h2>Back up or move your progress</h2>
<p class="small">On claude.ai your progress syncs automatically between your devices while you are signed in. In the offline copy (index.html) it stays in this browser: copy the code below and paste it on another device to transfer the lectures marked as learned and your mistakes.</p>
<div class="row"><button class="btn sm ghost" id="bk-show" type="button">Show my progress code</button><button class="btn sm ghost" id="bk-load" type="button">Restore from code</button></div>
<textarea id="bk-text" rows="3" style="width:100%;font-family:var(--f-mono);font-size:.8rem;margin-top:8px;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:8px" aria-label="Progress code"></textarea><p class="small" id="bk-msg"></p>
<p class="small muted">Sources: lecture slides L1-L18 (WS 2025/26 versions), course info WS 2026/27, exercise sheets WS 2023/24 to WS 2026/27, partial exams Dec 2013 and Feb 2014, Tadelis (2013) solution manual, Osborne (2009), Chiappori et al. (2002), Gilboa et al. (2014).</p>`;
  }

  function renderLab() {
    const NAMES = {
      l6trust: 'L6 Trust game', l6entry: 'L6 Market entry', l6bosseq: 'L6 Sequential Battle of the Sexes', l6bossim: 'L6 Simultaneous BoS as a tree', l6entryN: 'L6 Entry with a move of Nature',
      l7simple: 'L7 Simple two-stage game', l7vbos: 'L7 Voluntary Battle of the Sexes', l7cards: 'L7 Card game', l7entry: 'L7 Entry with a simultaneous subgame', l7cent: 'L7 Rosenthal centipede',
      ultD: 'L8 Ultimatum game (two offers)', l11harsanyi: 'L11 Entry game with an unknown cost', l13ex1: 'L13 Example 1', l13ex2: 'L13 Example 2', l13ex3: 'L13 Example 3 (three players)',
      l14job: 'L14 Job-market signalling', l17trust: 'L17 Trust game with a die', exPA: 'Exam Feb 2014: principal-agent tree',
      exEnt: 'Exam Dec 2013: two entrepreneurs', exEntEnvy: 'Exam Dec 2013: two entrepreneurs with envy', exTremble: 'Exercise: trembling hand', exTwoObj: 'Exercise: two indivisible objects',
      exJV: 'Exercise: joint venture', exCent: 'Exercise: centipedes', exCent2: 'Exercise: centipedes, equal split', exGuar: 'Exercise: price guarantee', exSafe: 'Exercise: playing it safe',
      exHoldup: 'Exercise: hold-up game', exJunk: 'Exercise: junk mail advertising', exPBE6: 'Exercise: perfect Bayesian equilibrium', exCar: 'Exercise: car warranty signalling', exAd: 'Exercise: Super Bowl ad signalling', exL6: 'Extra practice L6: three-stage game', exCap: 'Extra practice L7: capacity choice',
    };
    const opts = Object.keys(GT.trees).sort((a, b) => (NAMES[a] || a).localeCompare(NAMES[b] || b, 'en', { numeric: true })).map(k => '<option value="' + k + '">' + esc(NAMES[k] || k) + '</option>').join('');
    setTimeout(() => {
      const sel = $('#treesel'), holder = $('#treeholder');
      const show = () => { const sl = GT.treeSol && GT.treeSol[sel.value]; holder.innerHTML = W0('tree', { t: sel.value, solve: sl ? 0 : 1 }) + (sl ? steps('Solution of this game', sl) : ''); enhance(holder); const all = holder.querySelector('.reveal .js-all'); if (all) all.click(); };
      const st = subTarget(); if (GT.trees[st]) sel.value = st;
      sel.addEventListener('change', show); show();
    }, 0);
    return '<p class="eyebrow">Overview</p><h1>Game lab</h1><p>The Game lab is a calculator for games. You give it a game, it shows the solution <strong>step by step</strong>, the way you would write it in the exam. Use it to check your own answer after solving an exercise on paper, or to explore what happens when you change a payoff.</p>' +
      '<div class="box tip"><span class="lbl">How to use it in 4 steps</span><ol>' +
      '<li><strong>Choose a game.</strong> Pick a game from the course in "Preset" (lectures, exercises, past exams), or type your own: set the number of rows and columns, then click into any cell and type the payoffs. Blue numbers belong to the row player (player 1), orange numbers to the column player (player 2). Row and column names can be edited too.</li>' +
      '<li><strong>Solve it on paper first.</strong> The lab is for checking, not for replacing your own work.</li>' +
      '<li><strong>Click the button for the question you want answered</strong> (see the table below). The explanation appears under the buttons; best responses are underlined, equilibria shaded, eliminated rows and columns greyed out.</li>' +
      '<li><strong>Click "Reset"</strong> to undo eliminations and start again; changing the preset also starts fresh.</li></ol></div>' +
      '<div class="tbl"><table><tr><th>Button</th><th>What it does</th><th>Exam question it answers</th></tr>' +
      '<tr><td>Best responses and pure NE</td><td>Underlines each player\'s best response to every strategy of the other and shades cells where both are best responses.</td><td>"Find all pure-strategy Nash equilibria."</td></tr>' +
      '<tr><td>IESDS: next round</td><td>Deletes the strictly dominated strategies of both players for one round and says which strategy dominates them.</td><td>"Apply iterated elimination and state each step."</td></tr>' +
      '<tr><td>IESDS: run to end</td><td>Repeats the rounds until nothing is strictly dominated and lists the surviving profiles.</td><td>"Which profiles survive IESDS?"</td></tr>' +
      '<tr><td>Weak elimination round</td><td>One round of eliminating <em>weakly</em> dominated strategies (warns that equilibria can be lost).</td><td>"Repeated elimination of dominated strategies" when strict dominance gets stuck (e.g. the odd couple).</td></tr>' +
      '<tr><td>Mixed NE</td><td>Finds every Nash equilibrium, including mixed ones, with the probabilities and expected payoffs; for 2x2 games it shows the indifference conditions.</td><td>"Find all Nash equilibria (pure and mixed)."</td></tr>' +
      '<tr><td>Dominated by a mixture?</td><td>Checks whether a strategy is dominated by a mix of two other strategies.</td><td>"Is there a (weakly) dominated strategy?" (e.g. the declining industry).</td></tr></table></div>' +
      '<p class="small muted">Try it: choose the preset "Monitoring: work or shirk", click "Best responses and pure NE" (no pure equilibrium: the underlines never meet), then "Mixed NE" (both mix ½ : ½).</p>' +
      '<h2>Normal-form games</h2>' + W0('matrix-lab', { preset: GT.PRESETS[subTarget()] ? subTarget() : 'ex2' }) +
      '<h2>Game trees</h2><p>Every game tree of the lectures, exercises and exams. Choose one in the list. For trees with perfect information (no dashed lines) click <strong>"Solve next node"</strong> to apply backward induction one decision node at a time, starting at the end of the game: the chosen branch is highlighted and the explanation says why. <strong>"Solve all"</strong> finishes it, <strong>"Reset"</strong> starts again. Trees with dashed lines (information sets), moves of Nature combined with hidden information, or letters instead of numbers as payoffs cannot be solved by plain backward induction; for these the full solution (subgames, mixed strategies, beliefs or PBE) is written out step by step below the tree.</p><div class="row"><label for="treesel">Tree</label><select id="treesel">' + opts + '</select></div><div id="treeholder"></div>';
  }
  const W0 = (n, a) => W(n, a);

  /* ---------- spaced repetition (Leitner boxes) ---------- */
  const INT = [0, 1, 3, 7, 14, 30];
  const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
  GT.srs = {
    dueCards() { const m = store.get('srs', {}), t = today(); return GT.cards.filter(c => m[c.f] && m[c.f].due <= t); },
    newCards() { const m = store.get('srs', {}); return GT.cards.filter(c => !m[c.f]); },
    rateCard(c, known) { const m = store.get('srs', {}), r = m[c.f] || { b: 0, n: 0 }; const b = known ? Math.min(5, r.b + 1) : 1; m[c.f] = { b, due: today() + (known ? INT[b] : 0), n: r.n + 1 }; store.set('srs', m); },
    dueQuestions() { const m = store.get('srsq', {}), t = today(); return Object.keys(m).filter(q => m[q].due <= t); },
    rateQuestion(q, ok) { const m = store.get('srsq', {}), r = m[q]; if (!ok) m[q] = { b: 1, due: today() + 1, n: (r ? r.n : 0) + 1 }; else if (r) { const b = r.b + 1; if (b >= INT.length) delete m[q]; else m[q] = { b, due: today() + INT[b], n: r.n + 1 }; } else return; store.set('srsq', m); },
  };

  /* ---------- write-and-grade answer boxes ---------- */
  function bindAnswers(root) {
    root.querySelectorAll('.ansbox[data-ans]').forEach(box => {
      if (box.dataset.bound) return; box.dataset.bound = '1';
      const id = box.dataset.ans, parts = JSON.parse(box.dataset.parts), rec = (store.get('answers', {})[id]) || { t: '', p: [] };
      const max = parts.reduce((a, p) => a + p[1], 0);
      const opts = m => { let o = ''; for (let v = 0; v <= m + 1e-9; v += 0.5) o += '<option value="' + v + '">' + v + '</option>'; return o; };
      box.innerHTML = '<label class="small muted" for="ans-' + id + '">Your answer (saved automatically in this browser)</label><textarea id="ans-' + id + '" rows="5" class="anstext">' + esc(rec.t || '') + '</textarea>' +
        '<div class="row"><button class="btn sm ghost" type="button" data-grade="1">Grade my answer</button><span class="small" data-total="1"></span></div>' +
        '<div class="rubric" hidden><p class="small muted">Open the solution and give yourself points per part, as the examiners would.</p>' + parts.map((p, i) => '<label class="row rubric-row"><select data-i="' + i + '" aria-label="points for ' + esc(p[0]) + '">' + opts(p[1]) + '</select><span>' + esc(p[0]) + ' <span class="muted">(max ' + p[1] + ')</span></span></label>').join('') + '</div>';
      const ta = box.querySelector('textarea'), sels = [...box.querySelectorAll('select')], tot = box.querySelector('[data-total]'), rub = box.querySelector('.rubric');
      sels.forEach((s, i) => { if (rec.p && rec.p[i] != null) s.value = String(rec.p[i]); });
      const total = () => sels.reduce((a, s) => a + (+s.value || 0), 0);
      const show = () => { tot.textContent = (rec.p && rec.p.length ? 'Your score: ' + total() + ' / ' + max : max + ' points'); const mt = document.getElementById('mk-total'); if (mt) { let sum = 0, mx = 0; document.querySelectorAll('#mk-out .ansbox').forEach(b => { mx += JSON.parse(b.dataset.parts).reduce((a, p) => a + p[1], 0); b.querySelectorAll('select').forEach(x => { sum += +x.value || 0; }); }); mt.textContent = 'Total: ' + sum + ' / ' + mx + (sum >= mx / 2 ? ' (pass level)' : ''); } };
      let tm = null;
      const save = () => { const all = store.get('answers', {}); all[id] = { t: ta.value, p: rub.hidden ? (rec.p || []) : sels.map(s => +s.value) }; rec.p = all[id].p; store.set('answers', all); show(); };
      ta.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(save, 600); });
      sels.forEach(s => s.addEventListener('change', save));
      box.querySelector('[data-grade]').addEventListener('click', () => {
        rub.hidden = false; let n = box.nextElementSibling; while (n && !(n.matches && n.matches('details.sol'))) n = n.nextElementSibling; if (n) n.open = true; save();
      });
      if (rec.p && rec.p.length) rub.hidden = false;
      show();
    });
  }

  /* ---------- inline quiz ---------- */
  function mountQuiz(el, items, title, lec) {
    if (!items) return;
    let score = 0, answered = 0;
    el.innerHTML = '<div class="qhead"><strong>' + (title || 'Check yourself') + '</strong><span class="small muted" data-score>0 / ' + items.length + '</span></div>' + items.map((it, k) => '<div class="q" data-k="' + k + '"><div class="qt">' + (k + 1) + '. ' + it.q + '</div><div class="opts">' + it.o.map((o, j) => '<button class="opt" data-j="' + j + '">' + o + '</button>').join('') + '</div></div>').join('');
    el.querySelectorAll('.q').forEach(qe => {
      const it = items[+qe.dataset.k];
      qe.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
        const j = +b.dataset.j; answered++; if (j === it.a) score++;
        GT.stats.add(it.lec || lec, 'q', j === it.a);
        GT.srs.rateQuestion(it.q, j === it.a);
        qe.querySelectorAll('.opt').forEach((x, jj) => { x.disabled = true; if (jj === it.a) x.classList.add('right'); else if (jj === j) x.classList.add('wrong'); });
        qe.insertAdjacentHTML('beforeend', '<div class="why">' + (j === it.a ? '<span class="pill ok">Correct</span> ' : '<span class="pill no">Not quite</span> ') + it.e + '</div>');
        el.querySelector('[data-score]').textContent = score + ' / ' + items.length;
        if (j !== it.a) { const wrong = store.get('wrong', []); if (!wrong.includes(it.q)) { wrong.push(it.q); store.set('wrong', wrong); } }
        typeset(qe);
      }));
    });
  }

  /* ---------- question bank page ---------- */
  const QuizPage = {
    pool() {
      const all = [];
      Object.keys(GT.quizzes).forEach(k => { const lec = k.replace('q-', ''); GT.quizzes[k].forEach(it => all.push(Object.assign({ lec }, it))); });
      return all.concat(GT.bank);
    },
    mount(root) {
      const pool = this.pool();
      root.innerHTML = '<p class="eyebrow">Practise</p><h1>Question bank</h1><p>' + pool.length + ' questions from all lectures, each with an explanation. Wrong answers are remembered so you can review them.</p><div class="row"><label for="qb-lec">Lecture</label><select id="qb-lec"><option value="all">All lectures</option>' + GT.lessons.map(l => '<option value="' + l.id + '">L' + l.no + ' ' + l.title + '</option>').join('') + '</select><label for="qb-n">Questions</label><select id="qb-n"><option>10</option><option selected>15</option><option>25</option><option value="999">All</option></select><button class="btn sm" id="qb-go">New set</button><button class="btn sm ghost" id="qb-wrong">Review mistakes due today (' + GT.srs.dueQuestions().length + ')</button><button class="btn sm ghost" id="qb-clear">Clear mistakes</button></div><div id="qb-out"></div>';
      const go = (onlyWrong) => {
        const lec = $('#qb-lec').value, n = +$('#qb-n').value, wrong = GT.srs.dueQuestions();
        let items = pool.filter(it => (lec === 'all' || it.lec === lec) && (!onlyWrong || wrong.includes(it.q)));
        items = items.sort(() => Math.random() - 0.5).slice(0, n);
        const out = $('#qb-out');
        if (!items.length) { out.innerHTML = '<p class="readout">' + (onlyWrong ? 'No mistakes due today for this selection. Mistakes come back after 1, 3, 7, 14 and 30 days until you answer them correctly each time.' : 'No questions for this selection.') + '</p>'; return; }
        out.innerHTML = '<div class="quiz"></div>'; mountQuiz(out.firstChild, items, onlyWrong ? 'Your mistakes' : 'Practice set'); typeset(out);
      };
      $('#qb-go').addEventListener('click', () => go(false));
      $('#qb-wrong').addEventListener('click', () => go(true));
      $('#qb-clear').addEventListener('click', () => { store.set('wrong', []); store.set('srsq', {}); $('#qb-out').innerHTML = '<p class="readout">Mistake list cleared.</p>'; });
      go(false);
    },
  };

  /* ---------- flashcards ---------- */
  const Cards = {
    mount(root) {
      const due = GT.srs.dueCards().length, fresh = GT.srs.newCards().length;
      root.innerHTML = '<p class="eyebrow">Practise</p><h1>Flashcards</h1><p>Say the definition out loud (in exam wording) before you flip. "I know it" moves a card to a later box (it returns after 1, 3, 7, 14, then 30 days); "Again" brings it back today.</p><div class="row"><label for="fc-mode">Deck</label><select id="fc-mode"><option value="due">Due today (' + due + ')</option><option value="new">New cards (' + fresh + ')</option><option value="all">All cards (' + GT.cards.length + ')</option></select><label for="fc-lec">Lecture</label><select id="fc-lec"><option value="all">All lectures</option>' + GT.lessons.map(l => '<option value="' + l.id + '">L' + l.no + ' ' + l.title + '</option>').join('') + '</select><button class="btn sm ghost" id="fc-sh">Shuffle</button></div><div class="flash" style="margin-top:14px"><div class="flash-inner" id="fc-card" tabindex="0" role="button" aria-label="Flip card"></div></div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn sm ghost" id="fc-again">Again</button><button class="btn sm" id="fc-know">I know it</button><button class="btn sm ghost" id="fc-skip">Skip</button></div><p class="small muted" style="text-align:center" id="fc-pos"></p>';
      $('#fc-mode').value = due ? 'due' : 'new';
      let deck = [], i = 0, flipped = false;
      const build = () => {
        const lec = $('#fc-lec').value, mode = $('#fc-mode').value;
        const base = mode === 'due' ? GT.srs.dueCards() : mode === 'new' ? GT.srs.newCards() : GT.cards.slice();
        deck = base.filter(c => lec === 'all' || c.lec === lec); i = 0; flipped = false; show();
      };
      const show = () => {
        const c = deck[i];
        if (!c) { $('#fc-card').innerHTML = '<div class="front">Done for now</div><div class="small muted">No cards left in this deck. Come back tomorrow, or pick "New cards".</div>'; $('#fc-pos').textContent = ''; return; }
        const les = GT.lessons.find(l => l.id === c.lec);
        $('#fc-card').innerHTML = flipped ? '<div class="eyebrow">' + c.f + '</div><div class="back">' + c.b + '</div>' : '<div class="eyebrow">L' + (les ? les.no : '') + '</div><div class="front">' + c.f + '</div><div class="small muted">Click or press space to flip</div>';
        $('#fc-pos').textContent = deck.length + ' card' + (deck.length === 1 ? '' : 's') + ' left';
      };
      const flip = () => { if (deck[i]) { flipped = !flipped; show(); } };
      $('#fc-card').addEventListener('click', flip);
      $('#fc-card').addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
      $('#fc-know').addEventListener('click', () => { const c = deck[i]; if (!c) return; GT.srs.rateCard(c, true); deck.splice(i, 1); if (i >= deck.length) i = 0; flipped = false; show(); });
      $('#fc-again').addEventListener('click', () => { const c = deck[i]; if (!c) return; GT.srs.rateCard(c, false); deck.splice(i, 1); deck.splice(Math.min(deck.length, i + 3), 0, c); if (i >= deck.length) i = 0; flipped = false; show(); });
      $('#fc-skip').addEventListener('click', () => { if (!deck.length) return; i = (i + 1) % deck.length; flipped = false; show(); });
      $('#fc-sh').addEventListener('click', () => { deck.sort(() => Math.random() - 0.5); i = 0; flipped = false; show(); });
      $('#fc-lec').addEventListener('change', build); $('#fc-mode').addEventListener('change', build);
      build();
    },
  };

  /* ---------- drills ---------- */
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  function parseNum(s) { s = String(s).trim().replace(',', '.'); if (s.includes('/')) { const [a, b] = s.split('/'); return +a / +b; } return parseFloat(s); }
  const DRILLS = {
    pureNE: { name: 'Pure Nash equilibria (click the cells)', lec: 'l3', make() {
      const m = pick([2, 3]), n = pick([2, 3]);
      const A = Array.from({ length: m }, () => Array.from({ length: n }, () => rnd(0, 9))), B = Array.from({ length: m }, () => Array.from({ length: n }, () => rnd(0, 9)));
      const ne = GT.util.pureNE(A, B);
      return { kind: 'cells', A, B, ne, q: 'Click every cell that is a pure-strategy Nash equilibrium (possibly none), then check.' };
    } },
    mixed: { name: 'Mixed equilibrium of a 2x2 game', lec: 'l4', make() {
      let A, B, eq;
      for (let t = 0; t < 200; t++) { A = [[rnd(0, 6), rnd(0, 6)], [rnd(0, 6), rnd(0, 6)]]; B = [[rnd(0, 6), rnd(0, 6)], [rnd(0, 6), rnd(0, 6)]]; eq = GT.util.mixedNE(A, B).filter(e => e.p[0] > 0.01 && e.p[0] < 0.99 && e.q[0] > 0.01 && e.q[0] < 0.99); if (eq.length === 1) break; }
      const e = eq[0];
      return { kind: 'nums', mat: { rows: ['Top', 'Bottom'], cols: ['Left', 'Right'], cells: A.map((r, i) => r.map((x, j) => x + ',' + B[i][j])) }, q: 'Find the completely mixed Nash equilibrium. r = Pr(Top), q = Pr(Left).', ans: [['r', e.p[0]], ['q', e.q[0]]], sol: 'Row player mixes to make the column player indifferent: r·' + B[0][0] + ' + (1-r)·' + B[1][0] + ' = r·' + B[0][1] + ' + (1-r)·' + B[1][1] + ' ⇒ r = ' + GT.util.frac(e.p[0]) + '. Column player makes the row player indifferent: q·' + A[0][0] + ' + (1-q)·' + A[0][1] + ' = q·' + A[1][0] + ' + (1-q)·' + A[1][1] + ' ⇒ q = ' + GT.util.frac(e.q[0]) + '.' };
    } },
    cournot: { name: 'Cournot duopoly', lec: 'l3', make() {
      const b = pick([1, 2]), c = rnd(1, 10) * 2, a = c + 6 * rnd(2, 8) * b / b;
      const xn = (a - c) / (3 * b), Xc = (a - c) / (2 * b);
      return { kind: 'nums', q: 'Inverse demand p = ' + a + ' - ' + b + 'X, marginal cost ' + c + ' for both firms. Compute each firm\'s Nash output, the Nash price, and the total cartel output.', ans: [['x_i^N', xn], ['p^N', a - 2 * b * xn], ['X cartel', Xc]], sol: 'x = (a-c)/(3b) = ' + fmt(xn) + '; p = a - 2b·x = ' + fmt(a - 2 * b * xn) + '; cartel X = (a-c)/(2b) = ' + fmt(Xc) + '.' };
    } },
    grim: { name: 'Grim trigger threshold', lec: 'l10', make() {
      const P = rnd(0, 3), R = P + rnd(1, 5), T = R + rnd(1, 5), S = P - rnd(1, 3);
      return { kind: 'nums', mat: { rows: ['C', 'D'], cols: ['C', 'D'], cells: [[R + ',' + R, S + ',' + T], [T + ',' + S, P + ',' + P]] }, q: 'This stage game is repeated infinitely often and both players use grim trigger. Find the smallest discount factor δ that sustains cooperation (C, C).', ans: [['δ*', (T - R) / (T - P)]], sol: 'R/(1-δ) ≥ T + δP/(1-δ) ⇔ δ ≥ (T-R)/(T-P) = (' + T + '-' + R + ')/(' + T + '-' + P + ') = ' + GT.util.frac((T - R) / (T - P)) + '.' };
    } },
    rub: { name: 'Rubinstein shares', lec: 'l8', make() {
      const dA = rnd(5, 9) / 10, dB = rnd(5, 9) / 10;
      return { kind: 'nums', q: 'Alternating offers, infinite horizon, A proposes first. δ_A = ' + dA + ', δ_B = ' + dB + '. Compute A\'s share Z.', ans: [['Z', (1 - dB) / (1 - dA * dB)]], sol: 'Z = (1-δ_B)/(1-δ_Aδ_B) = ' + fmt(1 - dB) + '/' + fmt(1 - dA * dB) + ' = ' + fmt((1 - dB) / (1 - dA * dB), 4) + '.' };
    } },
    nash: { name: 'Nash bargaining', lec: 'l9', make() {
      const v = rnd(5, 12) * 10, d1 = rnd(0, 3) * 5, d2 = rnd(0, 3) * 5, al = pick([0.5, 0.5, 0.25, 0.75, 0.6]);
      return { kind: 'nums', q: 'v* = ' + v + ', d₁ = ' + d1 + ', d₂ = ' + d2 + ', bargaining power of player 1 α = ' + al + '. Compute x₁ and x₂.', ans: [['x₁', d1 + al * (v - d1 - d2)], ['x₂', d2 + (1 - al) * (v - d1 - d2)]], sol: 'Surplus ' + (v - d1 - d2) + '. x₁ = d₁ + α·surplus = ' + fmt(d1 + al * (v - d1 - d2)) + ', x₂ = d₂ + (1-α)·surplus = ' + fmt(d2 + (1 - al) * (v - d1 - d2)) + '.' };
    } },
    fpa: { name: 'First-price auction bid', lec: 'l12', make() {
      const n = rnd(2, 5), V = pick([1, 100, 1000]), v = Math.round(Math.random() * V * 100) / 100;
      return { kind: 'nums', q: n + ' bidders, values independent and uniform on [0, ' + V + ']. Your value is ' + v + '. What is your equilibrium bid in a first-price sealed-bid auction?', ans: [['bid', (n - 1) / n * v]], sol: 'b = (n-1)/n · v = ' + (n - 1) + '/' + n + ' · ' + v + ' = ' + fmt((n - 1) / n * v, 3) + '.' };
    } },
    bayes: { name: 'Bayes\' rule', lec: 'l12', make() {
      const pA = rnd(1, 9) / 10, pBA = rnd(5, 10) / 10, pBn = rnd(0, 5) / 10;
      const post = pBA * pA / (pBA * pA + pBn * (1 - pA));
      return { kind: 'nums', q: 'Pr(A) = ' + pA + ', Pr(B | A) = ' + pBA + ', Pr(B | not A) = ' + pBn + '. Compute Pr(A | B).', ans: [['Pr(A|B)', post]], sol: 'Pr(A|B) = Pr(B|A)Pr(A) / [Pr(B|A)Pr(A) + Pr(B|¬A)Pr(¬A)] = ' + fmt(pBA * pA, 4) + ' / ' + fmt(pBA * pA + pBn * (1 - pA), 4) + ' = ' + fmt(post, 4) + '.' };
    } },
    pa: { name: 'Principal-agent with risk aversion', lec: 'l16', make() {
      const K = pick([0, 0.25, 0.5, 1, 1.5, 2]), u0 = pick([0, 0.05, 0.1]);
      const r = 1 / (2 * K + 1);
      return { kind: 'nums', q: 'Risk-aversion parameter K = ' + K + ', outside option u₀ = ' + u0 + '. Compute the optimal bonus r*, the fixed payment s and the risk premium.', ans: [['r*', r], ['s', u0 + (K - 0.5) * r * r], ['RP', K * r * r]], sol: 'r* = 1/(2K+1) = ' + fmt(r, 4) + '; s = u₀ + (K-0.5)r² = ' + fmt(u0 + (K - 0.5) * r * r, 4) + '; RP = K r² = ' + fmt(K * r * r, 4) + '.' };
    } },
    iesds: { name: 'IESDS (click the surviving cells)', lec: 'l2', make() {
      let A, B, res;
      for (let t = 0; t < 500; t++) {
        A = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rnd(0, 9))); B = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rnd(0, 9)));
        res = iesds(A, B); if (res.R.length * res.C.length <= 2 && res.log.length >= 2) break;
      }
      const ne = []; res.R.forEach(i => res.C.forEach(j => ne.push([i, j])));
      return { kind: 'cells', A, B, ne, q: 'Apply iterated elimination of strictly dominated strategies (pure strategies). Click every cell that survives, then check.', sol: res.log.join(' ') + ' Survivors: ' + ne.map(([i, j]) => '(R' + (i + 1) + ', C' + (j + 1) + ')').join(', ') + '.' };
    } },
    bentry: { name: 'Bayesian entry threshold', lec: 'l11', make() {
      const a = rnd(1, 4), b = rnd(1, 5);
      return { kind: 'nums', q: 'An incumbent is high-cost with probability p (then it does not invest) or low-cost (then it invests). An entrant gets ' + a + ' from entering against a non-investing incumbent, ' + (-b) + ' against an investing one, and 0 from staying out. Above which belief p does it enter?', ans: [['p*', b / (a + b)]], sol: 'E[enter] = p·' + a + ' + (1-p)·(' + (-b) + ') > 0 ⇔ p > ' + b + '/(' + a + '+' + b + ') = ' + GT.util.frac(b / (a + b)) + '.' };
    } },
    signal: { name: 'Signalling: which equilibria exist?', lec: 'l14', make() {
      const pr = pick([0.25, 1 / 3, 0.5, 0.6]), cH = rnd(1, 9), cL = rnd(cH, 10);
      const sep = cH <= 6 && cL >= 6, poolE = 10 * pr > 4 && cL <= 6 && cH <= 6;
      return { kind: 'yn', q: 'Job-market game as in Lecture 14: managerial job pays 10, clerical 4; the firm gets 10 (high) or 0 (low) from a manager and 4 from a clerk. Prior Pr(high) = ' + GT.util.frac(pr) + '; education costs ' + cH + ' (high) and ' + cL + ' (low). For each candidate, is there a PBE (with suitable off-path beliefs)?', yn: [['Separating: only the high type educates', sep], ['Pooling: nobody educates', true], ['Pooling: everybody educates', poolE]], sol: 'Separating needs c_H ≤ 6 ≤ c_L (premium 10 - 4 = 6). Pooling on N always works: if the prior makes the firm offer M (10·prior ≥ 4) nobody wants to deviate; otherwise choose a pessimistic off-path belief (q ≤ 2/5) after E. Pooling on E needs the firm to offer M on the prior (10·prior ≥ 4) and both types to prefer 10 - c to the clerical wage 4 after a deviation (c ≤ 6), with a pessimistic belief after N.' };
    } },
    contract: { name: 'Contract enforcement', lec: 'l18', make() {
      const z1 = rnd(3, 8), z2 = rnd(3, 8), x1 = rnd(z1 - 1, 11), x2 = rnd(z2 - 1, 11), y1 = -rnd(0, 4), y2 = -rnd(0, 4);
      const eff = z1 + z2 > Math.max(x1 + y2, x2 + y1, 0);
      return { kind: 'yn', mat: { p1: 'Architect', p2: 'Constructor', rows: ['I', 'N'], cols: ['I', 'N'], cells: [[z1 + ',' + z2, y1 + ',' + x2], [x1 + ',' + y2, '0,0']] }, q: 'Underlying game above. Can (I, I) be achieved...', yn: [['without any contract (self-enforcing)?', z1 >= x1 && z2 >= x2], ['with one court transfer under limited verifiability?', z1 + z2 >= x1 + x2], ['under expectation damages?', z1 + z2 >= x1 + y2 && z1 + z2 >= x2 + y1], ['under reliance damages?', z1 >= x1 + y2 && z2 >= x2 + y1]], sol: 'Self-enforcing iff z1 ≥ x1 and z2 ≥ x2. Limited verifiability needs z1 + z2 ≥ x1 + x2 (' + (z1 + z2) + ' vs ' + (x1 + x2) + '). Expectation damages: z1 + z2 ≥ x1 + y2 = ' + (x1 + y2) + ' and ≥ x2 + y1 = ' + (x2 + y1) + ' (efficiency' + (eff ? ' holds' : ' fails') + '). Reliance: z1 ≥ x1 + y2 and z2 ≥ x2 + y1.' };
    } },
    subgames: { name: 'Counting subgames', lec: 'l7', make() {
      const id = 'sg' + Math.random().toString(36).slice(2, 7), joined = Math.random() < 0.5;
      const t = () => ({ pay: [rnd(0, 6), rnd(0, 6)] });
      let k = 0;
      const p2 = (side) => { const extra = Math.random() < 0.5; if (extra) k++; return { p: 2, info: joined ? 'h' : undefined, ch: [['l', extra ? { p: 1, ch: [['a', t()], ['b', t()]] } : t()], ['r', t()]] }; };
      GT.trees[id] = { p: 1, ch: [['L', p2(0)], ['R', p2(1)]] };
      return { kind: 'nums', tree: id, q: 'How many subgames does this game have (including the whole game)? A dashed line joins nodes of one information set.', ans: [['subgames', 1 + (joined ? 0 : 2) + k]], sol: 'Count the whole game (1). Player 2\'s nodes ' + (joined ? 'share one information set, so neither starts a subgame' : 'are singletons and each starts a subgame (+2)') + '. Each later decision node of player 1 is a singleton whose subtree cuts no information set (+' + k + ').' };
    } },
    bcournot: { name: 'Bayesian Cournot', lec: 'l11', make() {
      const a = pick([20, 24, 30, 36]), c2 = pick([2, 4, 6]), cl = pick([0, 2, 4]), ch = cl + pick([2, 4, 6]);
      const Ec = (cl + ch) / 2, q2 = (a - 2 * c2 + Ec) / 3, qL = (a - cl - q2) / 2, qH = (a - ch - q2) / 2;
      return { kind: 'nums', q: 'Inverse demand p = ' + a + ' - q₁ - q₂. Firm 2\'s cost is ' + c2 + ' (known). Firm 1\'s cost is ' + cl + ' or ' + ch + ' with probability ½ each, known only to firm 1. Find the Bayesian Nash equilibrium.', ans: [['q₂', q2], ['q₁ (low cost)', qL], ['q₁ (high cost)', qH]], sol: 'Type c of firm 1: q₁(c) = (a - c - q₂)/2. Firm 2: q₂ = (a - c₂ - E[q₁])/2 with E[q₁] = (a - E[c₁] - q₂)/2. Solving: q₂ = (a - 2c₂ + E[c₁])/3 = (' + a + ' - ' + 2 * c2 + ' + ' + Ec + ')/3 = ' + fmt(q2, 3) + '; q₁(' + cl + ') = ' + fmt(qL, 3) + '; q₁(' + ch + ') = ' + fmt(qH, 3) + '.' };
    } },
    revenue: { name: 'Auction revenue', lec: 'l12', make() {
      const n = rnd(2, 6), V = pick([1, 100, 1000]);
      return { kind: 'nums', q: n + ' risk-neutral bidders with values independent and uniform on [0, ' + V + ']. Compute the seller\'s expected revenue in a first-price and in a second-price sealed-bid auction (symmetric equilibrium).', ans: [['first price', (n - 1) / (n + 1) * V], ['second price', (n - 1) / (n + 1) * V]], sol: 'Second price: revenue = expected second-highest value = (n-1)/(n+1)·' + V + ' = ' + fmt((n - 1) / (n + 1) * V, 3) + '. First price: bids (n-1)/n·v and the winner has the highest value, E[max] = n/(n+1)·' + V + ', so revenue = (n-1)/n · n/(n+1)·' + V + ', the same number (revenue equivalence).' };
    } },
    tpunish: { name: 'One-period punishment', lec: 'l10', make() {
      let T, R, P; do { P = rnd(0, 3); R = P + rnd(2, 6); T = R + rnd(1, 4); } while (T - R >= R - P);
      return { kind: 'nums', q: 'Prisoner\'s Dilemma with cooperation payoff R = ' + R + ', temptation T = ' + T + ', punishment P = ' + P + '. After a deviation, both play (D, D) for ONE period and then return to cooperation. Smallest δ that deters deviation?', ans: [['δ*', (T - R) / (R - P)]], sol: 'Deviating gains T - R = ' + (T - R) + ' today and loses R - P = ' + (R - P) + ' tomorrow, worth δ(R - P). Deterred iff T - R ≤ δ(R - P) ⇔ δ ≥ (T - R)/(R - P) = ' + GT.util.frac((T - R) / (R - P)) + '. Compare grim trigger: (T - R)/(T - P) = ' + GT.util.frac((T - R) / (T - P)) + ', a weaker requirement because the punishment lasts forever.' };
    } },
    riskdom: { name: 'Pareto vs. risk dominance (stag hunt)', lec: 'l5', make() {
      let h, t, m, s0; do { h = rnd(6, 12); t = rnd(2, h - 1); m = rnd(1, t); s0 = rnd(0, m - 1); } while (m >= h || (h - t) === (m - s0));
      const p = (m - s0) / ((h - t) + (m - s0));
      return { kind: 'nums', mat: { rows: ['S', 'H'], cols: ['S', 'H'], cells: [[h + ',' + h, s0 + ',' + t], [t + ',' + s0, m + ',' + m]] }, q: 'Both (S, S) and (H, H) are Nash equilibria. Compute the smallest probability p with which the other player must play S so that S is a best response. Then decide: (S, S) is risk dominant if p < 1/2. Enter p.', ans: [['p', p]], sol: 'S gives ' + h + 'p + ' + s0 + '(1-p), H gives ' + t + 'p + ' + m + '(1-p). Indifferent at p = (' + m + '-' + s0 + ')/((' + h + '-' + t + ')+(' + m + '-' + s0 + ')) = ' + GT.util.frac(p) + '. ' + (p < 0.5 ? '(S, S) is both Pareto and risk dominant.' : '(S, S) is Pareto dominant, but (H, H) is risk dominant: deviation losses ' + (m - s0) + ' at (H,H) vs. ' + (h - t) + ' at (S,S).') };
    } },
    ll: { name: 'Limited liability: optimal bonus rate', lec: 'l15', make() {
      const A = pick([0, 0, 0.05, 0.08, 0.1, 0.18, 0.2, 0.32]);
      const r = A <= 0.125 ? 0.5 : Math.min(1, Math.sqrt(2 * A)), sv = Math.max(0, A - 0.5 * r * r), rent = sv + 0.5 * r * r - A;
      return { kind: 'nums', q: 'Risk-neutral agent, Q = e + u with E[u] = 0, effort cost 0.5e², contract w = s + rQ with limited liability s ≥ 0, outside option A = ' + A + '. Find the optimal r and the agent\'s rent (expected utility minus A).', ans: [['r', r], ['rent', rent]], sol: 'Effort e = r; the agent gets s + 0.5r². The principal earns r - s - r² with s = max(0, A - 0.5r²). If A ≤ 0.125 the participation constraint is slack at r = 0.5, s = 0 (profit r - r² is maximal at 0.5) and the agent earns a rent 0.125 - A. If A > 0.125, raise r until 0.5r² = A: r = √(2A) (capped at 1). Here r = ' + fmt(r, 3) + ', rent = ' + fmt(rent, 3) + '.' };
    } },
    ce: { name: 'Certainty equivalent and risk premium', lec: 'l16', make() {
      const k1 = rnd(0, 20), k2 = k1 + rnd(2, 20), x1 = k1 * k1, x2 = k2 * k2, ce = ((k1 + k2) / 2) ** 2, ev = (x1 + x2) / 2;
      return { kind: 'nums', q: 'Utility v(x) = √x. A lottery pays ' + x1 + ' or ' + x2 + ', each with probability ½. Compute the certainty equivalent CE and the risk premium RP.', ans: [['CE', ce], ['RP', ev - ce]], sol: 'EU = ½√' + x1 + ' + ½√' + x2 + ' = ½(' + k1 + ' + ' + k2 + ') = ' + fmt((k1 + k2) / 2) + '. CE = EU² = ' + fmt(ce) + '. E[x] = ' + fmt(ev) + ', so RP = E[x] - CE = ' + fmt(ev - ce) + '.' };
    } },
    guilt: { name: 'Guilt aversion threshold', lec: 'l17', make() {
      const pi = pick([[1, 2], [2, 3], [3, 4], [5, 6]]), X = pick([12, 18, 24]), G = rnd(11, 16), out = rnd(3, 5);
      const ea = X * pi[0] / pi[1], th = (G - 10) / ea;
      return { kind: 'nums', q: 'Trust game: A chooses Out (' + out + ', ' + out + ') or In. B then chooses Grab (0, ' + G + ') or Roll: A gets ' + X + ' with probability ' + pi[0] + '/' + pi[1] + ' (else 0), B gets 10. B is guilt averse: Grab gives B ' + G + ' - θ·E_BA(π_A). With beliefs that B rolls for sure (α = β = 1), find the smallest θ for which B rolls.', ans: [['θ*', th]], sol: 'A expects ' + X + '·' + pi[0] + '/' + pi[1] + ' = ' + fmt(ea) + ' from Roll, so with β = 1 Grab gives ' + G + ' - ' + fmt(ea) + 'θ. B rolls iff 10 ≥ ' + G + ' - ' + fmt(ea) + 'θ ⇔ θ ≥ ' + (G - 10) + '/' + fmt(ea) + ' = ' + fmt(th, 4) + '. A plays In because ' + fmt(ea) + (ea >= out ? ' ≥ ' : ' < ') + out + (ea >= out ? '.' : ': here A would rather stay Out, so (In, Roll) is not an equilibrium although B would roll.') };
    } },
    pbe: { name: 'Perfect Bayesian equilibrium', lec: 'l13', make() {
      const a1 = rnd(2, 4), a2 = rnd(1, 3), b1 = rnd(0, 1), b2 = 0, c1 = rnd(0, 1), c2 = 0, d1 = rnd(1, 4), d2 = rnd(1, 3), r1 = rnd(1, 3), r2 = rnd(0, 3);
      const ps = d2 / (a2 + d2), shown = (a2 !== d2 && Math.random() < 0.5) ? a2 / (a2 + d2) : ps;
      const LL = a1 >= Math.max(c1, r1), MR = d1 >= Math.max(b1, r1);
      const id = 'pb' + Math.random().toString(36).slice(2, 7);
      GT.trees[id] = { p: 1, ch: [['L', { p: 2, info: 'h', belief: 'p', ch: [["L'", { pay: [a1, a2] }], ["R'", { pay: [b1, b2] }]] }], ['M', { p: 2, info: 'h', belief: '1-p', ch: [["L'", { pay: [c1, c2] }], ["R'", { pay: [d1, d2] }]] }], ['R', { pay: [r1, r2] }]] };
      return { kind: 'yn', tree: id, q: 'Player 2 does not observe whether L or M was played; p is the belief that L was played. Decide for each statement.', yn: [['Player 2 plays L\' if and only if p > ' + GT.util.frac(shown), Math.abs(shown - ps) < 1e-9], ['((L, L\'), p = 1) is a perfect Bayesian equilibrium', LL], ['((M, R\'), p = 0) is a perfect Bayesian equilibrium', MR]], sol: 'Player 2: L\' gives ' + a2 + 'p, R\' gives ' + d2 + '(1-p), so L\' iff p > ' + d2 + '/(' + a2 + '+' + d2 + ') = ' + GT.util.frac(ps) + '. If player 1 plays L, Bayes gives p = 1, player 2 plays L\', and L is optimal iff ' + a1 + ' ≥ max(' + c1 + ', ' + r1 + '). If player 1 plays M, p = 0, player 2 plays R\', and M is optimal iff ' + d1 + ' ≥ max(' + b1 + ', ' + r1 + ').' };
    } },
    tree: { name: 'Backward induction', lec: 'l6', make() {
      const id = 'drill' + Math.random().toString(36).slice(2, 7);
      const t = () => ({ pay: [rnd(0, 6), rnd(0, 6)] });
      const spec = { p: 1, ch: [['L', { p: 2, ch: [['l', t()], ['r', t()]] }], ['R', { p: 2, ch: [['l', t()], ['r', t()]] }]] };
      GT.trees[id] = spec;
      const v = n => { if (n.pay) return n.pay; const k = n.p === 1 ? 0 : 1; let b = n.ch[0][1]; n.ch.forEach(c => { if (v(c[1])[k] > v(b)[k]) b = c[1]; }); return v(b); };
      const choice = n => { const k = n.p === 1 ? 0 : 1; let bi = 0; n.ch.forEach((c, i) => { if (v(c[1])[k] > v(n.ch[bi][1])[k]) bi = i; }); return n.ch[bi][0]; };
      const s2 = choice(spec.ch[0][1]) + choice(spec.ch[1][1]);
      const opts = []; ['L', 'R'].forEach(a => ['ll', 'lr', 'rl', 'rr'].forEach(b => opts.push(a + '; ' + b)));
      return { kind: 'choice', tree: id, q: 'Find the subgame perfect equilibrium. Player 2\'s strategy lists the action after L, then after R (e.g. "rl" = r after L, l after R). Ties are broken toward the first action.', options: opts, ans: choice(spec) + '; ' + s2 };
    } },
  };
  function iesds(A, B) {
    let R = [0, 1, 2].slice(0, A.length), C = [...Array(A[0].length).keys()]; const log = [];
    for (let round = 1; round < 10; round++) {
      const dr = R.filter(i => R.some(i2 => i2 !== i && C.every(j => A[i2][j] > A[i][j]))), dc = C.filter(j => C.some(j2 => j2 !== j && R.every(i => B[i][j2] > B[i][j])));
      if (!dr.length && !dc.length) break;
      log.push('Round ' + round + ': delete ' + dr.map(i => 'R' + (i + 1)).concat(dc.map(j => 'C' + (j + 1))).join(', ') + '.');
      R = R.filter(i => !dr.includes(i)); C = C.filter(j => !dc.includes(j));
    }
    return { R, C, log };
  }
  const Drills = {
    mount(root) {
      root.innerHTML = '<p class="eyebrow">Practise</p><h1>Practice drills</h1><p>Randomly generated problems of the kind the exam asks for. Enter numbers as decimals or fractions (e.g. 2/3); answers within 0.01 count as correct. Click "New problem" for another one.</p><div class="row"><label for="dr-t">Topic</label><select id="dr-t">' + Object.keys(DRILLS).map(k => '<option value="' + k + '">' + DRILLS[k].name + '</option>').join('') + '</select><button class="btn sm" id="dr-new">New problem</button><span class="small muted" id="dr-score"></span></div><div id="dr-out"></div>';
      let right = 0, total = 0;
      const sc = () => { $('#dr-score').textContent = total ? 'Score this session: ' + right + ' / ' + total : ''; };
      const make = () => {
        const d = DRILLS[$('#dr-t').value], p = d.make(), out = $('#dr-out');
        let h = '<div class="drill"><div><span class="chip acc">' + d.name + '</span> <a class="small" href="#' + d.lec + '">Review lesson</a></div><p>' + p.q + '</p>';
        if (p.mat) h += mx(p.mat);
        if (p.kind === 'cells') h += '<div class="mxwrap"><table class="mx" id="dr-cells"><tr><th class="blank"></th>' + p.A[0].map((_, j) => '<th>C' + (j + 1) + '</th>').join('') + '</tr>' + p.A.map((r, i) => '<tr><th>R' + (i + 1) + '</th>' + r.map((x, j) => '<td data-i="' + i + '" data-j="' + j + '" style="cursor:pointer"><span class="u1">' + x + '</span>, <span class="u2">' + p.B[i][j] + '</span></td>').join('') + '</tr>').join('') + '</table></div>';
        if (p.tree && (p.kind === 'nums' || p.kind === 'yn')) h += W('tree', { t: p.tree });
        if (p.kind === 'yn') h += '<div class="ans" style="display:grid;gap:6px">' + p.yn.map((y, k) => '<label>' + y[0] + ' <select id="dr-y' + k + '"><option value="">choose</option><option value="1">yes</option><option value="0">no</option></select></label>').join('') + '</div>';
        if (p.kind === 'nums') h += '<div class="ans">' + p.ans.map((a, k) => '<label>' + a[0] + ' = <input type="text" id="dr-a' + k + '" inputmode="decimal"></label>').join('') + '</div>';
        if (p.kind === 'choice') h += W('tree', { t: p.tree, solve: 1 }) + '<div class="ans">' + p.options.map((o, k) => '<label><input type="radio" name="dr-c" value="' + o + '"> ' + o + '</label>').join('') + '</div>';
        h += '<div class="row"><button class="btn sm" id="dr-check">Check</button><button class="btn sm ghost" id="dr-show">Show solution</button><button class="btn sm ghost" id="dr-ai" type="button">Explain with AI</button></div><div id="dr-fb"></div><div id="dr-ai-out"></div></div>';
        out.innerHTML = h;
        if (p.tree && (p.kind === 'nums' || p.kind === 'yn')) GT.mountWidgets(out);
        if (p.kind === 'choice') { GT.mountWidgets(out); out.querySelectorAll('.w button').forEach(b => { b.disabled = true; }); }
        const sel = new Set();
        out.querySelectorAll('#dr-cells td').forEach(td => td.addEventListener('click', () => { const k = td.dataset.i + ',' + td.dataset.j; if (sel.has(k)) { sel.delete(k); td.classList.remove('ne'); } else { sel.add(k); td.classList.add('ne'); } }));
        const solution = () => {
          if (p.sol && p.kind === 'cells') return p.sol;
          if (p.kind === 'yn') return p.yn.map(y => y[0] + ' ' + (y[1] ? 'Yes.' : 'No.')).join(' ') + ' ' + p.sol;
          if (p.kind === 'cells') return p.ne.length ? 'Pure NE: ' + p.ne.map(([i, j]) => '(R' + (i + 1) + ', C' + (j + 1) + ')').join(', ') + '. Underline the best responses: in each column the largest blue number, in each row the largest orange number.' : 'There is no pure NE.';
          if (p.kind === 'choice') return 'Backward induction gives ' + p.ans + '. Use the tree buttons to see each step.';
          return p.sol;
        };
        $('#dr-check').addEventListener('click', () => {
          let ok;
          if (p.kind === 'cells') { const want = new Set(p.ne.map(x => x.join(','))); ok = want.size === sel.size && [...want].every(k => sel.has(k)); }
          if (p.kind === 'yn') ok = p.yn.every((y, k) => $('#dr-y' + k).value === (y[1] ? '1' : '0'));
          if (p.kind === 'nums') ok = p.ans.every((a, k) => Math.abs(parseNum($('#dr-a' + k).value) - a[1]) < 0.01);
          if (p.kind === 'choice') { const c = out.querySelector('input[name=dr-c]:checked'); ok = c && c.value === p.ans; out.querySelectorAll('.w button').forEach(b => { b.disabled = false; }); }
          total++; if (ok) right++; sc(); GT.stats.add(d.lec, 'd', !!ok);
          $('#dr-fb').innerHTML = '<div class="why">' + (ok ? '<span class="pill ok">Correct</span> ' : '<span class="pill no">Not yet</span> ') + solution() + '</div>';
        });
        $('#dr-ai').addEventListener('click', async () => {
          const out = $('#dr-ai-out');
          if (!GT.aiAvailable || !GT.aiAvailable()) { out.innerHTML = '<p class="small">' + (window.claude ? 'Asking Claude is not available for this account here.' : 'No AI connected. <a href="#ai">Connect your own AI</a> to get step-by-step explanations.') + '</p>'; return; }
          const btn = $('#dr-ai'); btn.disabled = true; out.innerHTML = '<div class="ask-a"><p class="muted">Thinking...</p></div>';
          const prob = out.closest('.drill').cloneNode(true); prob.querySelectorAll('button, #dr-fb, #dr-ai-out, .w').forEach(x => x.remove());
          const rules = 'You are a patient tutor for an Advanced Microeconomics (game theory) course. Explain how to solve the exercise below step by step, in plain English, as a student would write it in an exam. Use the given official solution as the correct result. Keep it under 250 words. Write math in LaTeX between \\( and \\).';
          try {
            const live = GT.streamInto(out.firstChild);
            const text = await GT.askAI(rules, [{ role: 'user', content: 'EXERCISE:\n' + prob.textContent.replace(/\s+/g, ' ').slice(0, 4000) + '\n\nOFFICIAL SOLUTION:\n' + solution().replace(/<[^>]+>/g, ' ') }], t => live.update(t));
            live.finish(text);
          } catch (e) { out.innerHTML = '<p class="small">' + esc(GT.aiErrorText(e)) + '</p>'; }
          btn.disabled = false;
        });
        $('#dr-show').addEventListener('click', () => { $('#dr-fb').innerHTML = '<div class="why">' + solution() + '</div>'; if (p.kind === 'choice') out.querySelectorAll('.w button').forEach(b => { b.disabled = false; }); });
      };
      $('#dr-new').addEventListener('click', make); $('#dr-t').addEventListener('change', make); make();
    },
  };

  /* ---------- mock exams ---------- */
  GT.renderMock = function () {
    return '<p class="eyebrow">Exam</p><h1>Mock exams</h1><p>Exams in the style of the past partial exams: 30 points each, designed for 60 minutes (choose 90 minutes if your exam slot is longer), a mix of definitions, computations and intuition. Write on paper, then reveal the solution per question and score yourself.</p><div class="row"><label for="mk-sel">Exam</label><select id="mk-sel">' + GT.mocks.map((m, i) => '<option value="' + i + '">' + m.title + '</option>').join('') + '</select><label for="mk-len">Time</label><select id="mk-len"><option value="60">60 min (past partial exams)</option><option value="90">90 min (current slot 12:00-13:30)</option></select><button class="btn sm" id="mk-start">Start timer</button><button class="btn sm ghost" id="mk-stop">Stop</button><span class="timer" id="mk-timer">--:--</span></div><div id="mk-out"></div>';
  };
  let timer = null;
  const Mock = {
    bind(root) {
      const show = () => {
        const m = GT.mocks[+$('#mk-sel').value];
        const partsOf = q => { const ps = []; const re = /([a-z])\)\s[\s\S]*?\((\d+(?:\.5)?)p\)/g; let mm; const txt = q.q.replace(/<[^>]+>/g, ' '); while ((mm = re.exec(txt))) ps.push(['Part ' + mm[1], +mm[2]]); return ps.length ? ps : [['Whole question', q.pts]]; };
        $('#mk-out').innerHTML = m.qs.map((q, k) => '<div class="box"><span class="lbl">' + q.pts + ' points</span>' + q.q + ans('mk' + m.id + 'q' + k, partsOf(q)) + '<details class="sol"><summary>Show solution</summary><div class="sol-body">' + q.a + '</div></details></div>').join('') + '<p class="readout" id="mk-total">Total: 0 / 30</p>';
        bindAnswers($('#mk-out'));
        typeset($('#mk-out'));
      };
      $('#mk-sel').addEventListener('change', show); show();
      $('#mk-start').addEventListener('click', () => {
        clearInterval(timer); let left = 60 * +$('#mk-len').value;
        timer = setInterval(() => { left--; const el = $('#mk-timer'); if (!el) { clearInterval(timer); return; } el.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0'); if (left <= 0) { clearInterval(timer); el.textContent = 'Time is up'; } }, 1000);
      });
      $('#mk-stop').addEventListener('click', () => clearInterval(timer));
    },
  };

  /* ---------- search ---------- */
  const Search = {
    index: null,
    build() {
      const strip = h => h.replace(/<[^>]+>/g, ' ').replace(/\\\(|\\\)|\\\[|\\\]/g, ' ').replace(/\s+/g, ' ');
      this.index = GT.lessons.map(l => ({ id: l.id, title: 'L' + l.no + ' ' + l.title, text: strip(l.title + ' ' + l.goals.join(' ') + ' ' + l.html) }))
        .concat(GT.ex.map(x => ({ id: 'exercises/' + x.id, title: 'Exercise: ' + x.t.replace(/\\\(|\\\)/g, ''), text: strip(x.t + ' ' + x.body) })))
        .concat(['exams', 'formulas', 'sources', 'osborne'].map(k => ({ id: k, title: GT.pages[k].title, text: strip(GT.pages[k].render()) })))
        .concat(GT.cards.map(c => ({ id: 'cards', title: 'Flashcard: ' + c.f, text: c.f + ' ' + c.b })));
    },
    mount(root) {
      if (!this.index) this.build();
      const q = (store.get('q', '') || '').toLowerCase();
      const res = q.length < 2 ? [] : this.index.filter(d => d.text.toLowerCase().includes(q)).slice(0, 40);
      root.innerHTML = '<h1>Search</h1><p>' + (q.length < 2 ? 'Type at least two characters in the search box (results appear while you type).' : res.length + ' results for "' + esc(q) + '"') + '</p><div class="searchres">' + res.map(d => { const i = d.text.toLowerCase().indexOf(q); const sn = d.text.slice(Math.max(0, i - 60), i + 90); return '<a href="#' + d.id + '"><strong>' + esc(d.title) + '</strong><br><span class="small muted">...' + esc(sn) + '...</span></a>'; }).join('') + '</div>';
    },
  };
  const sInput = $('#search');
  let sTimer = null;
  const runSearch = () => { store.set('q', sInput.value); if (location.hash === '#search') { const sp = $('#searchpage'); if (sp) Search.mount(sp); else render(); } else location.hash = 'search'; };
  sInput.addEventListener('keydown', e => { if (e.key === 'Enter') { clearTimeout(sTimer); runSearch(); } });
  sInput.addEventListener('input', () => { clearTimeout(sTimer); if (sInput.value.trim().length >= 3) sTimer = setTimeout(runSearch, 350); });

  /* ---------- chrome ---------- */
  $('#menuBtn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
  const topbar = document.querySelector('.topbar'), searchBtn = $('#searchBtn');
  if (searchBtn) searchBtn.addEventListener('click', () => { const open = topbar.classList.toggle('search-open'); searchBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); if (open) sInput.focus(); });
  const themeBtn = $('#themeBtn');
  const applyTheme = t => { if (t) document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme'); const dark = t ? t === 'dark' : !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches); themeBtn.innerHTML = dark ? '<span aria-hidden="true">☀</span><span class="tb-text"> Light mode</span>' : '<span aria-hidden="true">☾</span><span class="tb-text"> Dark mode</span>'; themeBtn.setAttribute('aria-label', dark ? 'Switch to the light theme' : 'Switch to the dark theme'); themeBtn.title = dark ? 'Switch to the light theme' : 'Switch to the dark theme'; };
  applyTheme(store.get('theme', null));
  if (window.matchMedia) { const mq = matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', () => applyTheme(store.get('theme', null))); }
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const sysDark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
    const next = cur ? (cur === 'dark' ? 'light' : 'dark') : (sysDark ? 'light' : 'dark');
    store.set('theme', next); applyTheme(next);
  });
  GT.mountQuiz = mountQuiz;
  GT.refresh = () => { buildNav(); if (!document.querySelector('#main textarea:focus, #main input:focus')) render(); };
  window.addEventListener('hashchange', render);
  buildNav(); render();
})();
