/* Slide references per section, progress dashboard and study plan. */

/* Slide pages (PDF page numbers) for each lesson section. */
GT.slideFiles = {
  1: 'AM_L1_Introduction.pdf', 2: 'AM_L2_CompleteInfo.pdf', 3: 'AM_L3_Nash_GG.pdf', 4: 'AM_L4_MixedStrategies.pdf', 5: 'AM_L5_MultipleGG.pdf',
  6: 'AM_L6_Dynamic_PerfectInfos.pdf', 7: 'AM_L7_Dynamic_ImperfectInfos.pdf', 8: 'AM_L8_Dynamic_Bargaining.pdf', 9: 'AM_L9_BargainingSolution.pdf',
  10: 'AM_L10_DynamicRepeated.pdf', 11: 'AM_L11_StaticBayesian.pdf', 12: 'AM_L12_Auctions.pdf', 13: 'AM_L13_Dynamic_IncompleteInfo.pdf',
  14: 'AM_L14_Signaling.pdf', 15: 'AM_L15_PrincipalAgent.pdf', 16: 'AM_L16_RiskInContracting.pdf', 17: 'AM_L17_PsychologicalGT-shortened.pdf', 18: 'AM_L18_ContractEnforcement.pdf',
};
GT.slideMap = {
  1: { s1: 'info', s2: [2, 5], s3: [6, 7], s4: [8, 9], s5: [10, 15] },
  2: { s1: [2, 4], s2: [5, 9], s3: [10, 11], s4: [12, 13], s5: [14, 19], s6: [20, 27] },
  3: { s1: [2, 2], s2: [3, 3], s3: [4, 5], s4: [6, 19] },
  4: { s1: [2, 4], s2: [5, 8], s3: [9, 14], s4: [15, 19], s5: [20, 21] },
  5: { s1: [2, 2], s2: [3, 9], s3: [10, 12], s4: [13, 19] },
  6: { s1: [2, 4], s2: [5, 12], s3: [13, 14], s4: [15, 19], s5: [20, 29] },
  7: { s1: [2, 3], s2: [4, 7], s3: [8, 12], s4: [13, 16], s5: [17, 17] },
  8: { s1: [2, 9], s2: [10, 12], s3: [13, 23], s4: [24, 27] },
  9: { s1: [2, 2], s2: [3, 5], s3: [6, 8], s4: [9, 9], s5: [10, 14] },
  10: { s1: [2, 2], s2: [3, 5], s3: [6, 14], s4: [15, 22] },
  11: { s1: [2, 2], s2: [3, 8], s3: [9, 13], s4: [14, 19], s5: [20, 24] },
  12: { s1: [2, 6], s2: [7, 10], s3: [11, 18], s4: [19, 20], s5: [21, 24], s6: [25, 29], s7: [30, 30], s8: [31, 46] },
  13: { s1: [2, 4], s2: [5, 8], s3: [9, 12], s4: [13, 17], s5: [18, 20] },
  14: { s1: [2, 7], s2: [8, 18] },
  15: { s1: [2, 6], s2: [7, 18], s3: [19, 30] },
  16: { s1: [2, 4], s2: [5, 15], s3: [16, 27] },
  17: { s1: [2, 2], s2: [3, 5], s3: [6, 7], s4: [8, 17] },
  18: { s1: [2, 3], s2: [4, 7], s3: [8, 11], s4: [12, 18] },
};

/* Learning statistics stored per lecture: quiz and drill answers. */
GT.stats = {
  get() { return store.get('stats', {}); },
  add(lec, kind, ok) { if (!lec) return; const s = this.get(); s[lec] = s[lec] || { q: [0, 0], d: [0, 0] }; s[lec][kind][1]++; if (ok) s[lec][kind][0]++; store.set('stats', s); },
};

GT.pages.progress = {
  title: 'My progress', render: () => {
    const st = GT.stats.get(), done = new Set(store.get('done', []));
    const rows = GT.lessons.map(l => {
      const s = st[l.id] || { q: [0, 0], d: [0, 0] };
      const tot = s.q[1] + s.d[1], ok = s.q[0] + s.d[0];
      return { l, s, tot, acc: tot ? ok / tot : null, learned: done.has(l.id) };
    });
    const practised = rows.filter(r => r.tot >= 3).sort((a, b) => a.acc - b.acc);
    const unpractised = rows.filter(r => r.tot < 3);
    const weak = practised.filter(r => r.acc < 0.8).slice(0, 3);
    const pct = x => x == null ? '-' : Math.round(100 * x) + '%';
    const bar = x => x == null ? '' : '<div style="height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden;min-width:80px"><div style="height:100%;width:' + Math.round(100 * x) + '%;background:' + (x >= 0.8 ? 'var(--good)' : x >= 0.6 ? 'var(--warn)' : 'var(--bad)') + '"></div></div>';
    const totAll = rows.reduce((a, r) => a + r.tot, 0);
    return '<p class="eyebrow">My study</p><h1>My progress</h1>' +
      '<p>Quiz answers (in lessons and the question bank) and drill results are counted per lecture in this browser. Accuracy below 80% marks a weak topic.</p>' +
      '<div class="grid-cards"><div class="card"><span class="t">' + done.size + ' / 18</span><span class="d">lectures marked as learned</span></div><div class="card"><span class="t">' + totAll + '</span><span class="d">questions and drills answered</span></div><div class="card"><span class="t">' + (practised.length ? pct(practised.reduce((a, r) => a + r.acc * r.tot, 0) / practised.reduce((a, r) => a + r.tot, 0)) : '-') + '</span><span class="d">overall accuracy</span></div></div>' +
      '<h2>Review these first</h2>' +
      (weak.length ? '<ol>' + weak.map(r => '<li><a href="#' + r.l.id + '">L' + r.l.no + ' ' + r.l.title + '</a>: ' + pct(r.acc) + ' correct (' + r.tot + ' answers). Re-read the key takeaways, then do the drills and the <a href="#quiz">question bank</a> for this lecture again.</li>').join('') + '</ol>'
        : '<p class="readout">' + (practised.length ? 'No weak topic: every practised lecture is at 80% or more.' : 'No data yet. Answer the quiz at the end of a lecture or do some drills, and your weak topics will appear here.') + '</p>') +
      (unpractised.length ? '<p class="small">Not practised yet (fewer than 3 answers): ' + unpractised.map(r => '<a href="#' + r.l.id + '">L' + r.l.no + '</a>').join(', ') + '.</p>' : '') +
      (GT.exStat ? '<h2>Exercises</h2><p>' + GT.exSummary() + ' <a href="#extest">Exercise test</a> draws your "review again" questions first.</p>' : '') +
      '<h2>All lectures</h2><div class="tbl"><table><tr><th>Lecture</th><th>Learned</th><th class="num">Quiz</th><th class="num">Drills</th><th class="num">Exercises solved</th><th>Accuracy</th></tr>' +
      rows.map(r => { const ec = GT.exStat ? GT.exStat.counts(r.l.id) : null; return '<tr><td><a href="#' + r.l.id + '">L' + r.l.no + ' ' + r.l.title + '</a></td><td>' + (r.learned ? '<span class="pill ok">yes</span>' : '') + '</td><td class="num">' + r.s.q[0] + '/' + r.s.q[1] + '</td><td class="num">' + r.s.d[0] + '/' + r.s.d[1] + '</td><td class="num">' + (ec ? '<a href="#exercises/x-' + r.l.id + '">' + ec.solved + '/' + ec.total + '</a>' + (ec.review ? ' <span class="pill mid">' + ec.review + ' review</span>' : '') : '') + '</td><td>' + bar(r.acc) + '</td></tr>'; }).join('') + '</table></div>' +
      '<p><button class="btn sm ghost" id="pg-reset" type="button">Reset statistics</button> <span class="small muted" id="pg-msg"></span></p>';
  },
};

GT.pages.plan = {
  title: 'Study plan', render: () => '<p class="eyebrow">My study</p><h1>Study plan to the exam</h1><p>Enter your exam date. The plan spreads the lectures you have not marked as learned over the days left, keeps the final week for past and mock exams, and puts your weak topics into the review days. It updates whenever you mark lectures as learned.</p>' +
    '<div class="row"><label for="pl-date">Exam date</label><input type="date" id="pl-date"><label for="pl-rest">Free days per week</label><select id="pl-rest"><option value="0">0</option><option value="1" selected>1</option><option value="2">2</option></select></div><div id="pl-out"></div>' +
    '<p class="small muted">The course information sheet lists Friday, 12 February (12:00-13:30) as the exam and 10 March as the retake, marked "to be confirmed". Check Stud.IP and register at least one week before.</p>',
};
GT.buildPlan = function (root) {
  const di = root.querySelector('#pl-date'), rest = root.querySelector('#pl-rest'), out = root.querySelector('#pl-out');
  const saved = store.get('examDate', null);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const defYear = today.getFullYear() + (today.getMonth() >= 2 ? 1 : 0);
  di.value = saved || (defYear + '-02-12');
  rest.value = String(store.get('restDays', 1));
  const fmtD = d => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  function build() {
    store.set('examDate', di.value); store.set('restDays', +rest.value);
    const exam = new Date(di.value + 'T00:00:00'); const days = Math.round((exam - today) / 864e5);
    if (!(days > 0)) { out.innerHTML = '<p class="readout">Choose a date in the future.</p>'; return; }
    const done = new Set(store.get('done', []));
    const todo = GT.lessons.filter(l => !done.has(l.id));
    const st = GT.stats.get();
    const weak = GT.lessons.map(l => { const s = st[l.id]; const t = s ? s.q[1] + s.d[1] : 0; return { l, acc: t >= 3 ? (s.q[0] + s.d[0]) / t : null }; }).filter(x => x.acc != null && x.acc < 0.8).sort((a, b) => a.acc - b.acc).map(x => x.l);
    const finalDays = Math.min(7, Math.max(1, Math.floor(days / 4)));
    const all = []; for (let i = 0; i < days; i++) { const d = new Date(today); d.setDate(today.getDate() + i); all.push(d); }
    const restSet = new Set(); const rpw = +rest.value;
    all.forEach((d, i) => { const dow = d.getDay(); if (i < days - finalDays && ((rpw >= 1 && dow === 0) || (rpw >= 2 && dow === 6))) restSet.add(i); });
    const studyIdx = all.map((_, i) => i).filter(i => i < days - finalDays && !restSet.has(i));
    const perDay = studyIdx.length ? Math.max(1, Math.ceil(todo.length / studyIdx.length)) : todo.length;
    const plan = all.map(() => []);
    let k = 0;
    studyIdx.forEach((i, n) => {
      const ls = todo.slice(k, k + perDay); k += ls.length;
      ls.forEach(l => plan[i].push('Lecture <a href="#' + l.id + '">L' + l.no + ' ' + l.title + '</a>: work through it, do the quiz, mark as learned'));
      if (n % 3 === 2) plan[i].push('<a href="#cards">Flashcards</a> (15 min) and <a href="#drills">drills</a> for the last lectures');
      if (n % 2 === 1) { const ex = (GT.ex || []).filter(x => ls.concat(todo.slice(0, k)).some(l => l.id === x.lec) && GT.exStat && GT.exStat.status(x.id) !== 'solved' && !x.extra); const pickEx = ex.find(x => !plan.some(d => d.join('').includes('exercises/' + x.id))); if (pickEx) plan[i].push('Exercise: <a href="#exercises/' + pickEx.id + '">' + pickEx.t.replace(/\\\(|\\\)/g, '') + '</a> (L' + GT.lessons.find(l => l.id === pickEx.lec).no + ') on paper, then mark it'); }
      if (!ls.length) plan[i].push(weak.length ? 'Review weak topic <a href="#' + weak[n % weak.length].id + '">L' + weak[n % weak.length].no + '</a> and its drills' : '<a href="#exercises">Exercises</a>; <a href="#quiz">question bank</a>');
    });
    if (k < todo.length) plan[studyIdx.length ? studyIdx[studyIdx.length - 1] : 0].push('Remaining lectures: ' + todo.slice(k).map(l => 'L' + l.no).join(', ') + ' (not enough days: increase daily load)');
    const finals = ['<a href="#exams">Past exam December 2013</a> under time pressure', '<a href="#exams">Past exam February 2014</a> under time pressure', '<a href="#mock">Mock exam A</a>', '<a href="#mock">Mock exam B</a> and <a href="#progress">weak topics</a>', '<a href="#mock">Mock exam C</a>', '<a href="#mock">Mock exams D and E</a>', '<a href="#formulas">Formula sheet</a> and <a href="#cards">all flashcards</a>: light review, sleep well'];
    for (let j = 0; j < finalDays; j++) plan[days - finalDays + j].push(finals[finals.length - finalDays + j]);
    restSet.forEach(i => plan[i].push('<span class="muted">Free day</span>'));
    out.innerHTML = '<p class="readout"><strong>' + days + ' days</strong> until the exam on ' + exam.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + '. ' + todo.length + ' lectures left, about ' + perDay + ' per study day; the last ' + finalDays + ' days are for exams.' + (weak.length ? ' Weak topics: ' + weak.map(l => 'L' + l.no).join(', ') + '.' : '') + '</p>' +
      '<div class="tbl"><table><tr><th>Date</th><th>Plan</th></tr>' + all.map((d, i) => '<tr><td style="white-space:nowrap">' + fmtD(d) + (i === 0 ? ' <span class="pill mid">today</span>' : '') + '</td><td>' + (plan[i].join('<br>') || '<span class="muted">Flashcards (15 min)</span>') + '</td></tr>').join('') + '</table></div>';
  }
  di.addEventListener('change', build); rest.addEventListener('change', build); build();
};
