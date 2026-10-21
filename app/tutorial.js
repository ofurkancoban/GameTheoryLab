/* Interactive tutorial: a guided tour over the real interface, in chapters.
 * Each step can switch page (route), spotlight an element (target) and, optionally, ask the learner
 * to do something (task) before "Next" unlocks. Progress is stored so the tour can be resumed. */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const narrow = () => window.matchMedia && matchMedia('(max-width: 900px)').matches;
  const navGroup = name => () => $$('#nav .nav-group').find(g => { const e = g.querySelector('.eyebrow'); return e && e.textContent.trim().toLowerCase() === name.toLowerCase(); });
  const boxWith = (sel, re) => () => $$('#main ' + sel).find(b => re.test(b.textContent));
  const searchTarget = () => (narrow() ? $('#searchBtn') : $('.topbar .search'));
  const firstExItem = () => $('#main .exitem');

  /* ---------- chapters ---------- */
  const CH = [
    { id: 'basics', title: 'Getting around', desc: 'Top bar, menu, search, theme, the start page and how your progress is kept.', steps: [
      { route: 'home', title: 'Welcome to Advanced Micro Lab', text: 'This tour shows every part of the app on the real pages. Use <b>Next</b> and <b>Back</b> (or the arrow keys), and <b>Esc</b> to pause; you can resume later from the Tutorial page. Some steps ask you to try something: the Next button unlocks once you have done it.' },
      { route: 'home', target: '.brand', title: 'Home', text: 'The logo always brings you back to this start page, with today\'s tasks and the course overview.' },
      { route: 'home', target: searchTarget, title: 'Search the whole course', text: 'Search lectures, every exercise, past exams, the formula sheet and the flashcards. Results appear while you type (from 3 letters) and each result jumps to the right place. On a phone, tap <b>Search</b> to open the search field.' },
      { route: 'home', target: '#themeBtn', title: 'Light and dark mode', text: 'Switch between a light and a dark theme. Your choice is remembered; without a choice the app follows your device setting.' },
      { route: 'home', target: navGroup('Overview'), sidebar: true, title: 'The menu', text: 'The menu on the left (on a phone: the <b>Menu</b> button) has everything. <b>Overview</b>: the start page, the concept map of all equilibrium concepts, the Game lab and this Tutorial.' },
      { route: 'home', target: navGroup('Progress'), sidebar: true, title: 'Your progress bar', text: 'Shows how many of the 18 lectures you have marked as learned. Lectures you marked get a check mark in the list below.' },
      { route: 'home', target: () => $$('#nav .nav-group')[2], sidebar: true, title: 'The 18 lectures', text: 'Grouped by the five parts of the course: static and dynamic games with complete information, games with incomplete information, and contracts. Work through them in order: each builds on the previous one.' },
      { route: 'home', target: navGroup('Practise'), sidebar: true, title: 'Practise', text: '<b>Exercises</b>: every exercise-sheet question, solved step by step. <b>Exercise test</b>: a random timed test. <b>Practice drills</b>: endless auto-checked problems. <b>Derivation practice</b>, <b>Question bank</b> and <b>Flashcards</b> train the exam basics.' },
      { route: 'home', target: navGroup('Exam'), sidebar: true, title: 'Exam', text: 'Past exams with graded solutions, six timed mock exams, the formula sheet and a collection of every common mistake and exam tip.' },
      { route: 'home', target: navGroup('My study'), sidebar: true, title: 'My study', text: 'Your statistics per lecture, a day-by-day study plan up to your exam date, and (in the claude.ai version) a shared question pool for your study group.' },
      { route: 'home', target: boxWith('.box', /^Today/), title: 'Today', text: 'Your to-do list for today: flashcards and quiz mistakes that are due, exercises you marked "review again", your weakest topic and the next lecture. It updates as you study.' },
      { route: 'home', target: '#main .quad', title: 'The course on one page', text: 'The whole course in one table: each class of games has its own equilibrium concept. Click any lecture to open it.' },
      { route: 'home', target: () => $$('#main .grid-cards').pop(), title: 'All study tools', text: 'Shortcuts to every tool, with what each one is good for.' },
      { route: 'home', target: '#bk-show', title: 'Your progress is saved', text: 'Everything you do is saved in this browser automatically (and synced across devices in the claude.ai version). To move it to another device, copy your progress code here and paste it there.' },
    ] },
    { id: 'lecture', title: 'A lecture page', desc: 'Goals, sections, step-by-step derivations, interactive models, quizzes and the AI tutor, on Lecture 4.', steps: [
      { route: 'l4', target: '.lesson-head', title: 'A lecture page', text: 'Each lecture starts with its title, the reading list and the slide file it is based on. This is Lecture 4, mixed strategies.' },
      { route: 'l4', target: '#main .goals', title: 'Learning goals', text: 'What you will be able to do after this lecture. Use them as a checklist before the exam.' },
      { route: 'l4', target: '#main nav.toc', title: 'Sections', text: 'The lecture is split into small numbered sections. Click a section to jump to it.' },
      { route: 'l4', target: () => { const h = $('#main h2#s2'); return h && h.nextElementSibling && /Slides/.test(h.nextElementSibling.textContent) ? h.nextElementSibling : h; }, title: 'Link to the slides', text: 'Under every section heading you find the exact slide pages it covers, so you can check the original.' },
      { route: 'l4', target: () => $('#main .box.def'), title: 'Definitions', text: 'Blue boxes are definitions. Exams give points for exact definitions, so learn the wording; the same definitions are in the Flashcards.' },
      { route: 'l4', target: () => $('#main .reveal'), title: 'Step-by-step derivations', text: 'Derivations are revealed one line at a time. Try to predict the next line before you click.', task: { label: 'Click <b>Next step</b> in this box.', click: () => $('#main .reveal .js-next') } },
      { route: 'l4', target: () => $('#main .w:not([data-w="tree"])') || $('#main .w'), title: 'Interactive models', text: 'Many sections have a model you can play with: change the numbers with the sliders or inputs and watch the equilibrium move. Playing is the fastest way to build intuition.' },
      { route: 'l4', target: () => $('#main .box.warn') || $('#main .box.tip'), title: 'Common mistakes and exam tips', text: 'Red boxes warn about typical mistakes, yellow boxes give exam tips taken from the course information and past exams.' },
      { route: 'l4', target: () => $('#main .quiz'), title: 'Check yourself', text: 'At the end of every lecture: a short quiz with an explanation for every answer. Wrong answers come back later for review.', task: { label: 'Answer one question by clicking an option.', click: () => $$('#main .quiz .opt') } },
      { route: 'l4', target: boxWith('.box.thm', /Key takeaways/), title: 'Key takeaways', text: 'The core results of the lecture in a few lines: read them again the day before the exam.' },
      { route: 'l4', target: boxWith('.box.tip', /Practise this lecture/), title: 'Practise this lecture', text: 'Every exercise for this lecture, with the exercise sheets it comes from. Your status (solved / review again) shows up here too.' },
      { route: 'l4', target: '[data-ask]', title: 'Ask the AI tutor', text: 'Ask any question about this lecture. The tutor knows the lecture notes and answers in the course notation, with formulas. Press <b>Enter</b> to send; the answer is written while it arrives.' },
      { route: 'l4', target: '#main .mark-done', title: 'Mark as learned', text: 'When you have worked through the lecture and the quiz, mark it as learned. It fills your progress bar and the study plan uses it.' },
      { route: 'l4', target: '#main .pager', title: 'Next lecture', text: 'Move on to the previous or next lecture from the bottom of the page.' },
    ] },
    { id: 'exercises', title: 'Exercises and the exercise test', desc: 'All 73 exercises by lecture, step-by-step solutions, your status, and a random timed test.', steps: [
      { route: 'exercises/x-l4', target: '#ex-sum', title: 'Every exercise, solved', text: 'All questions of the exercise sheets (2023/24 to 2026/27) plus extra practice problems, ordered by lecture. This line shows how many you have solved.' },
      { route: 'exercises/x-l4', target: '#main .extabs', title: 'One lecture at a time', text: 'Choose a lecture. The numbers show solved / total exercises for that lecture.' },
      { route: 'exercises/x-l4', target: () => $('#main > .page > details.sol') || $('#main details.sol'), title: 'Find a question by sheet', text: 'Looking for "WS 2024/25, Exercise 3, Q1"? Open this table: every sheet and question, with a direct link.' },
      { route: 'exercises/x-l4', target: () => { const x = firstExItem(); return x && x.querySelector('.exq'); }, title: 'The question, exactly as on the sheet', text: 'The full question text with all parts (a), (b), (c). The chips above it show every sheet on which the question appeared. Solve it on paper first.' },
      { route: 'exercises/x-l4', target: () => { const x = firstExItem(); return x && x.querySelector('.reveal'); }, title: 'Step-by-step solution', text: 'Compare your answer step by step. Each part of the question is answered separately.', task: { label: 'Reveal the first step: click <b>Next step</b>.', click: () => { const x = firstExItem(); return x && x.querySelector('.js-next'); } } },
      { route: 'exercises/x-l4', target: () => { const x = firstExItem(); return x && x.querySelector('[data-exst]'); }, title: 'Track your exercises', text: 'Mark a question as <b>Solved</b>, or as <b>Review again</b> if you want to see it once more. "Review again" questions appear in Today, in your progress and first in the exercise test. <b>Clear</b> removes the mark.', task: { label: 'Click <b>Solved</b> or <b>Review again</b> (you can clear it afterwards).', click: () => { const x = firstExItem(); return x && $$('[data-exst] button[data-v="solved"], [data-exst] button[data-v="review"]', x); } } },
      { route: 'extest', target: '#main .drill', title: 'Exercise test', text: 'A random test under exam conditions: choose the lectures, the number of questions and a timer. Sheet questions only is the exam style; "review again" questions are drawn first.' },
      { route: 'extest', target: '#xt-go', title: 'Start a test', text: 'Each test is a new random set, one question per lecture where possible.', task: { label: 'Click <b>Start a new test</b>.', click: () => $('#xt-go'), done: () => !!$('#xt-out .xt-item') } },
      { route: 'extest', target: () => $('#xt-out .xt-item'), title: 'Write first, then check', text: 'Write your answer (on paper or in the box). The solution stays hidden behind <b>Show solution</b> until you open it. Then mark the question. The timer above counts down; stop it any time.' },
    ] },
    { id: 'practise', title: 'Practice tools', desc: 'Drills with auto-checking, derivation practice, the question bank and flashcards with spaced repetition.', steps: [
      { route: 'drills', target: '#drills select', title: 'Practice drills', text: 'Randomly generated exam-style problems for 23 topics: Nash equilibria, IESDS, mixed strategies, Cournot, grim trigger, bargaining, auctions, PBE, signalling, contracts and more. Choose a topic here.' },
      { route: 'drills', target: () => { const b = $('#dr-check'); return b && b.parentElement; }, title: 'Check, solution, AI explanation', text: '<b>Check</b> grades your answer (numbers within 0.01 count; fractions like 2/3 are fine). <b>Show solution</b> gives the worked solution, <b>Explain with AI</b> a step-by-step explanation. <b>New problem</b> creates a fresh one.' },
      { route: 'derive', target: () => $('#main [data-deriv]'), title: 'Derivation practice', text: 'The key derivations of the course with blanks: pick the right expression for each step, then <b>Check</b>. After a correct run, write the derivation on paper without looking.' },
      { route: 'quiz', target: '#quizpage', title: 'Question bank', text: 'All multiple-choice questions of the course. Filter by lecture, choose the number of questions, and use <b>Review mistakes</b> to repeat the ones you got wrong (spaced repetition).' },
      { route: 'cards', target: '#fc-card', title: 'Flashcards', text: 'Definitions and results in exam wording. Say the answer out loud, then flip.', task: { label: 'Click the card to flip it.', click: () => $('#fc-card') } },
      { route: 'cards', target: () => { const b = $('#fc-know'); return b && b.parentElement; }, title: 'Spaced repetition', text: '<b>I know it</b> moves a card to a later box (it returns after 1, 3, 7, 14, then 30 days); <b>Again</b> brings it back today. Due cards appear in Today on the start page.' },
    ] },
    { id: 'exam', title: 'Exam preparation', desc: 'Past exams with grading, timed mock exams, the formula sheet and the common mistakes.', steps: [
      { route: 'exams', target: () => $('#main .ansbox'), title: 'Past exams: write and grade', text: 'The two past partial exams with the original questions. Write your answer in the box (it is saved), then open the graded solution and give yourself points part by part with the grading tool.' },
      { route: 'exams', target: () => $('#main details.sol'), title: 'Graded solution', text: 'The official solution with the points per part: it shows what examiners reward (definitions, the correct equilibrium, a one-sentence intuition).' },
      { route: 'mock', target: '#mk-sel', title: 'Mock exams', text: 'Six mock exams in the same style (30 points, 60 minutes); together with the past exams they cover all 18 lectures.' },
      { route: 'mock', target: () => { const b = $('#mk-start'); return b && b.parentElement; }, title: 'Exam timer', text: 'Start the timer (60 or 90 minutes) and write the exam under real conditions. Then compare with the solutions and score yourself.' },
      { route: 'formulas', target: () => $('#main .tbl'), title: 'Formula sheet', text: 'Every result you may need to reproduce, in course order: Cournot, mixed equilibria, Rubinstein, Nash bargaining, grim trigger, auctions, signalling, contracts and more.' },
      { route: 'mistakes', target: () => $('#main .box'), title: 'Common mistakes', text: 'Every warning and exam tip from all lectures on one page. Read it the day before the exam.' },
    ] },
    { id: 'lab', title: 'The Game lab', desc: 'Solve any matrix game step by step and every game tree of the course.', steps: [
      { route: 'lab', target: () => boxWith('.box.tip', /How to use it/)() , title: 'A calculator for games', text: 'Give the lab a game and it shows the solution step by step, the way you would write it in the exam. Use it to check your own answers.' },
      { route: 'lab', target: () => $('#main .w[data-w="matrix-lab"] select'), title: 'Choose or type a game', text: 'Pick a game from the course (lectures, exercises, exams) or set rows and columns and type your own payoffs: blue for the row player, orange for the column player.' },
      { route: 'lab', target: () => $('#main .w[data-w="matrix-lab"] [data-a="ne"]'), title: 'Solve it', text: 'Each button answers one exam question: pure Nash equilibria, iterated elimination (round by round or to the end), weak elimination, all mixed equilibria, and domination by a mixture.', task: { label: 'Click <b>Best responses and pure NE</b>.', click: () => $('#main .w[data-w="matrix-lab"] [data-a="ne"]') } },
      { route: 'lab', target: () => $('#main .w[data-w="matrix-lab"] .log'), title: 'The explanation', text: 'Best responses are underlined, equilibria shaded, and the explanation says why. Click <b>Reset</b> to start again.' },
      { route: 'lab', target: '#treesel', title: 'Game trees', text: 'Every game tree of the lectures, exercises and exams. Trees with perfect information are solved node by node with <b>Solve next node</b>; for trees with information sets the full solution is written out below the tree.' },
    ] },
    { id: 'study', title: 'Your study, AI tutor and more', desc: 'Statistics, the study plan, the AI tutor settings and the concept map.', steps: [
      { route: 'progress', target: () => $('#main .grid-cards'), title: 'My progress', text: 'Lectures learned, questions answered and your accuracy. Lectures below 80% correct are listed as weak topics to review first.' },
      { route: 'progress', target: () => $('#main .tbl'), title: 'Per lecture', text: 'Quiz and drill results and solved exercises for every lecture. Click a number to go to that lecture\'s exercises.' },
      { route: 'plan', target: '#pl-date', title: 'Study plan', text: 'Enter your exam date and the number of free days per week: the plan spreads the remaining lectures over the days, adds exercises, flashcards and your weak topics, and keeps the last days for past and mock exams.' },
      { route: 'ai', target: '#ai-p', title: 'The AI tutor', text: 'By default the tutor uses a free open-weight model (GPT-OSS 20B), no key needed. You can switch to another provider with your own key, or to a model running on your computer (Ollama, LM Studio).' },
      { route: 'concepts', target: () => ($('#main .cm-wide') && $('#main .cm-wide').offsetParent ? $('#main .cm-wide') : $('#main .cm-narrow')), title: 'Concept map', text: 'How the equilibrium concepts fit together: each step right adds sequential rationality, each step down adds private information. A good page to start revising.' },
      { route: 'tutorial', title: 'You are ready', text: 'That was the whole app. A good routine: one lecture with its quiz, then its exercises on paper, drills until the computations are automatic, flashcards every day, and the past and mock exams in the last week. You can restart any chapter of this tour from this page.' },
    ] },
  ];
  const total = CH.reduce((a, c) => a + c.steps.length, 0);

  /* ---------- state ---------- */
  const st = () => store.get('tour', { done: [], at: null });
  const save = s => store.set('tour', s);

  /* ---------- overlay ---------- */
  let ui = null, cur = null, cleanup = [];
  function build() {
    if (ui) return ui;
    const root = document.createElement('div'); root.className = 'tour'; root.hidden = true;
    root.innerHTML = '<div class="tour-block"></div><div class="tour-spot"></div>' +
      '<div class="tour-card" role="dialog" aria-modal="false" aria-labelledby="tour-t"><div class="tour-meta"></div><h3 id="tour-t"></h3><div class="tour-text"></div><div class="tour-task" hidden></div>' +
      '<div class="tour-dots"></div><div class="tour-btns"><button class="btn sm ghost" type="button" data-t="close">Pause</button><span class="spacer"></span><button class="btn sm ghost" type="button" data-t="back">Back</button><button class="btn sm" type="button" data-t="next">Next</button></div></div>';
    document.body.appendChild(root);
    ui = { root, block: $('.tour-block', root), spot: $('.tour-spot', root), card: $('.tour-card', root) };
    ui.spot.hidden = true;
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-t]'); if (!b) return;
      if (b.dataset.t === 'next') next(); else if (b.dataset.t === 'back') back(); else if (b.dataset.t === 'close') stop(); else if (b.dataset.t === 'skip') { cur.taskDone = true; paintButtons(); }
    });
    document.addEventListener('keydown', e => {
      if (!cur || root.hidden) return;
      if (e.target.closest && e.target.closest('input, textarea, select')) return;
      if (e.key === 'Escape') stop(); else if (e.key === 'ArrowRight' && !$('[data-t="next"]', root).disabled) next(); else if (e.key === 'ArrowLeft') back();
    });
    const re = () => { if (cur) place(); };
    window.addEventListener('resize', re); window.addEventListener('scroll', re, true);
    const sb = $('#sidebar'); if (sb) sb.addEventListener('transitionend', re);
    return ui;
  }
  const resolve = t => { try { const x = typeof t === 'function' ? t() : (t ? $(t) : null); return Array.isArray(x) ? x[0] : x; } catch (e) { return null; } };
  const visible = el => !!(el && el.getClientRects().length && el.offsetParent !== null);

  function place() {
    const el = cur && cur.el, card = ui.card;
    ui.root.classList.toggle('nospot', !el || !visible(el));
    if (!el || !visible(el)) {
      ui.spot.hidden = true;
      card.className = 'tour-card center';
      card.style.top = card.style.left = '';
      return;
    }
    const r = el.getBoundingClientRect(), pad = 6;
    ui.spot.hidden = false;
    Object.assign(ui.spot.style, { top: (r.top - pad) + 'px', left: (r.left - pad) + 'px', width: (r.width + 2 * pad) + 'px', height: (r.height + 2 * pad) + 'px' });
    if (narrow()) { card.className = 'tour-card sheet' + (r.top > window.innerHeight * 0.55 ? ' top' : ''); card.style.top = card.style.left = ''; return; }
    card.className = 'tour-card';
    const cw = card.offsetWidth, ch = card.offsetHeight, vw = window.innerWidth, vh = window.innerHeight, m = 14;
    let top, left;
    if (r.bottom + m + ch < vh) top = r.bottom + m; else if (r.top - m - ch > 60) top = r.top - m - ch; else top = Math.max(70, vh - ch - 16);
    left = Math.min(Math.max(16, r.left), vw - cw - 16);
    if (top < r.bottom && top + ch > r.top && r.right + m + cw < vw) { left = r.right + m; top = Math.min(Math.max(70, r.top), vh - ch - 16); }
    card.style.top = top + 'px'; card.style.left = left + 'px';
  }

  function paintButtons() {
    const n = $('[data-t="next"]', ui.root), b = $('[data-t="back"]', ui.root), task = $('.tour-task', ui.root);
    const last = cur.ci === CH.length - 1 && cur.si === CH[cur.ci].steps.length - 1;
    const lastInCh = cur.si === CH[cur.ci].steps.length - 1;
    n.textContent = last ? 'Finish' : lastInCh ? 'Next chapter' : 'Next';
    n.disabled = !!(cur.step.task && !cur.taskDone);
    b.disabled = cur.ci === 0 && cur.si === 0;
    if (cur.step.task) {
      task.hidden = false;
      task.innerHTML = cur.taskDone ? '<span class="pill ok">Done</span> Well done: click <b>' + n.textContent + '</b>.' : '<span class="pill mid">Try it</span> ' + cur.step.task.label + ' <button class="linkbtn" type="button" data-t="skip">Skip this task</button>';
    } else task.hidden = true;
  }

  const waitFor = (fn, ms) => new Promise(ok => { const t0 = Date.now(); const tick = () => { const x = fn(); if (x || Date.now() - t0 > ms) ok(x); else setTimeout(tick, 60); }; tick(); });

  async function show(ci, si) {
    build();
    cleanup.forEach(f => f()); cleanup = [];
    const step = CH[ci].steps[si];
    cur = { ci, si, step, el: null, taskDone: false };
    const s = st(); s.at = [ci, si]; save(s);
    const sidebar = $('#sidebar');
    if (step.route && (location.hash || '#home').slice(1) !== step.route) { location.hash = step.route; await new Promise(r => setTimeout(r, 120)); }
    if (sidebar) sidebar.classList.toggle('open', !!(step.sidebar && narrow()));
    const el = step.target ? await waitFor(() => { const x = resolve(step.target); return visible(x) ? x : null; }, 3000) : null;
    if (!cur || cur.step !== step) return;
    cur.el = el;
    ui.root.hidden = false;
    ui.root.classList.toggle('interactive', !!step.task || !step.target);
    ui.block.hidden = !!step.task;
    $('.tour-meta', ui.root).textContent = 'Chapter ' + (ci + 1) + ' of ' + CH.length + ': ' + CH[ci].title + ' · step ' + (si + 1) + ' of ' + CH[ci].steps.length;
    $('#tour-t', ui.root).textContent = step.title;
    $('.tour-text', ui.root).innerHTML = step.text + (step.target && !el ? '<p class="small muted">(This part is not visible on this page right now.)</p>' : '');
    $('.tour-dots', ui.root).innerHTML = CH[ci].steps.map((_, k) => '<span class="' + (k === si ? 'on' : k < si ? 'past' : '') + '"></span>').join('');
    if (step.task) {
      let raw = null; try { raw = typeof step.task.click === 'function' ? step.task.click() : $$(step.task.click); } catch (e) { raw = null; }
      const targets = [].concat(raw || []).filter(Boolean);
      const ok = () => { if (cur && cur.step === step) { cur.taskDone = true; paintButtons(); place(); } };
      const mark = () => setTimeout(() => { if (!cur || cur.step !== step) return; if (!step.task.done || step.task.done()) ok(); else waitFor(step.task.done, 4000).then(x => { if (x) ok(); }); }, 80);
      if (!targets.length) cur.taskDone = true;
      targets.forEach(t => { t.addEventListener('click', mark); cleanup.push(() => t.removeEventListener('click', mark)); });
    }
    if (el) el.scrollIntoView({ block: 'center' });
    paintButtons();
    place(); setTimeout(place, 120); setTimeout(place, 400); setTimeout(place, 800);
    $('[data-t="next"]', ui.root).focus({ preventScroll: true });
  }

  function next() {
    if (!cur) return;
    const { ci, si } = cur;
    if (si + 1 < CH[ci].steps.length) return show(ci, si + 1);
    const s = st(); if (!s.done.includes(CH[ci].id)) s.done.push(CH[ci].id); s.at = ci + 1 < CH.length ? [ci + 1, 0] : null; save(s);
    if (ci + 1 < CH.length) return show(ci + 1, 0);
    stop(true);
  }
  function back() {
    if (!cur) return;
    const { ci, si } = cur;
    if (si > 0) show(ci, si - 1); else if (ci > 0) show(ci - 1, CH[ci - 1].steps.length - 1);
  }
  function stop(finished) {
    cleanup.forEach(f => f()); cleanup = [];
    cur = null;
    if (ui) ui.root.hidden = true;
    const sb = $('#sidebar'); if (sb) sb.classList.remove('open');
    if (finished) { const s = st(); s.at = null; save(s); location.hash = 'tutorial'; }
    if ((location.hash || '').slice(1) === 'tutorial' && GT.refresh) GT.refresh();
  }

  GT.tour = { start: (ci, si) => show(ci || 0, si || 0), resume: () => { const a = st().at; show(a ? a[0] : 0, a ? a[1] : 0); }, stop, chapters: CH };

  /* ---------- tutorial page ---------- */
  GT.pages.tutorial = {
    title: 'Tutorial', render: () => {
      const s = st(), at = s.at;
      return '<p class="eyebrow">Overview</p><h1>Interactive tutorial</h1>' +
        '<p>A guided tour over the real pages of the app: ' + CH.length + ' short chapters, ' + total + ' steps in total. Each step highlights one part of the interface and explains what it does and how to use it for the exam; some steps ask you to try it. Keys: <b>→</b> next, <b>←</b> back, <b>Esc</b> pause.</p>' +
        '<div class="row"><button class="btn" type="button" data-tour-start="0">' + (s.done.length ? 'Start the full tour again' : 'Start the full tour') + '</button>' +
        (at ? '<button class="btn ghost" type="button" data-tour-resume="1">Resume: chapter ' + (at[0] + 1) + ', step ' + (at[1] + 1) + '</button>' : '') + '</div>' +
        '<div class="tour-list">' + CH.map((c, i) => '<div class="tour-ch"><div><span class="eyebrow">Chapter ' + (i + 1) + ' · ' + c.steps.length + ' steps</span><h3>' + c.title + (s.done.includes(c.id) ? ' <span class="pill ok">done</span>' : '') + '</h3><p class="small">' + c.desc + '</p></div><button class="btn sm' + (s.done.includes(c.id) ? ' ghost' : '') + '" type="button" data-tour-start="' + i + '">' + (s.done.includes(c.id) ? 'Again' : 'Start') + '</button></div>').join('') + '</div>' +
        '<p class="small muted">Tip: the tour works on a phone too; the explanation then appears at the bottom of the screen.</p>';
    },
  };
  GT.bindTutorial = function (root) {
    root.querySelectorAll('[data-tour-start]').forEach(b => b.addEventListener('click', () => show(+b.dataset.tourStart, 0)));
    root.querySelectorAll('[data-tour-resume]').forEach(b => b.addEventListener('click', () => GT.tour.resume()));
  };

  /* Invitation on the start page for first-time visitors. */
  GT.tourInvite = function () {
    const s = st();
    if (store.get('tourDismissed', false) || s.done.length) return '';
    return '<div class="box tip tour-invite"><span class="lbl">New here?</span><p>Take the interactive tour: ' + CH.length + ' short chapters that show every part of the app on the real pages, with small tasks to try.</p>' +
      '<div class="row"><button class="btn sm" type="button" data-tour-start="0">Start the tour</button><a class="btn sm ghost" href="#tutorial">Choose a chapter</a><button class="btn sm ghost" type="button" data-tour-dismiss="1">No thanks</button></div></div>';
  };
  GT.bindTourInvite = function (root) {
    root.querySelectorAll('[data-tour-start]').forEach(b => b.addEventListener('click', () => show(+b.dataset.tourStart, 0)));
    root.querySelectorAll('[data-tour-dismiss]').forEach(b => b.addEventListener('click', () => { store.set('tourDismissed', true); const box = b.closest('.tour-invite'); if (box) box.remove(); }));
  };
  /* A page change that the tour did not ask for (the learner clicked a link) keeps the tour on screen but re-places it. */
  window.addEventListener('hashchange', () => { if (cur) setTimeout(() => { if (cur && cur.el && !document.body.contains(cur.el)) { cur.el = resolve(cur.step.target); } if (cur) place(); }, 150); });
})();
