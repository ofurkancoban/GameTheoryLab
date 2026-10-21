/* Core registries and content helpers shared by all content files. */
window.GT = {
  lessons: [],     // {id, no, part, title, read, goals, html}
  quizzes: {},     // id -> [{q, o, a, e}]
  trees: {},       // id -> tree spec
  pages: {},       // id -> {title, render()}
  bank: [],        // question bank {lec, q, o, a, e}
  cards: [],       // flashcards {lec, f, b}
};
const H = String.raw;

/* Safe localStorage wrapper. */
const store = {
  get(k, d) { try { const v = localStorage.getItem('gtl:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('gtl:' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
};

function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

/* Render a cell value: TeX if it contains a backslash or caret, plain otherwise. */
function cellVal(v) {
  v = String(v).trim();
  return /[\\^_{}]/.test(v) ? '\\(' + v + '\\)' : esc(v);
}

/*
 * Payoff matrix helper.
 * spec: {p1, p2, rows, cols, cells: [["a,b", ...], ...], br: bool, ne: [[i,j]], dead: [[i,j]] , cap}
 * Cells use "u1,u2"; use "|" as separator when a payoff itself contains a comma.
 */
function mx(spec) {
  const cells = spec.cells.map(r => r.map(c => {
    const s = String(c); const parts = s.includes('|') ? s.split('|') : s.split(',');
    return [parts[0].trim(), (parts[1] || '').trim()];
  }));
  const nR = cells.length, nC = cells[0].length;
  const num = cells.every(r => r.every(c => !isNaN(+c[0]) && !isNaN(+c[1]) && c[0] !== '' && c[1] !== ''));
  let br1 = [], br2 = [], ne = new Set((spec.ne || []).map(x => x.join(',')));
  if (spec.br && num) {
    for (let j = 0; j < nC; j++) { const m = Math.max(...cells.map(r => +r[j][0])); br1[j] = cells.map(r => +r[j][0] === m); }
    for (let i = 0; i < nR; i++) { const m = Math.max(...cells[i].map(c => +c[1])); br2[i] = cells[i].map(c => +c[1] === m); }
    if (!spec.ne) for (let i = 0; i < nR; i++) for (let j = 0; j < nC; j++) if (br1[j][i] && br2[i][j]) ne.add(i + ',' + j);
  }
  const dead = new Set((spec.dead || []).map(x => x.join(',')));
  let h = '<div class="mxwrap"><table class="mx"><tr><th class="blank" colspan="2" rowspan="2"></th><th class="pl2" colspan="' + nC + '">' + (spec.p2 || 'Player 2') + '</th></tr><tr>';
  spec.cols.forEach(c => { h += '<th>' + cellVal(c) + '</th>'; });
  h += '</tr>';
  cells.forEach((r, i) => {
    h += '<tr>';
    if (i === 0) h += '<th class="pl1" rowspan="' + nR + '">' + (spec.p1 || 'Player 1') + '</th>';
    h += '<th>' + cellVal(spec.rows[i]) + '</th>';
    r.forEach((c, j) => {
      const k = i + ',' + j;
      const cls = (ne.has(k) ? 'ne ' : '') + (dead.has(k) ? 'dead' : '');
      const b1 = spec.br && num && br1[j][i] ? ' br' : '', b2 = spec.br && num && br2[i][j] ? ' br' : '';
      if (c[0] === '' && c[1] === '') { h += '<td class="' + cls + '"></td>'; return; }
      h += '<td class="' + cls + '"><span class="u1' + b1 + '">' + cellVal(c[0]) + '</span>, <span class="u2' + b2 + '">' + cellVal(c[1]) + '</span></td>';
    });
    h += '</tr>';
  });
  h += '</table></div>';
  if (spec.cap) h += '<div class="mxcap">' + spec.cap + '</div>';
  return h;
}

/* Inline quiz: registers questions and returns a placeholder. */
function quiz(id, items, title) {
  GT.quizzes[id] = items;
  return '<div class="quiz" data-quiz="' + id + '" data-title="' + esc(title || 'Check yourself') + '"></div>';
}

/* Widget placeholder. */
function W(name, attrs) {
  let a = '';
  for (const k in (attrs || {})) a += ' data-' + k + '="' + esc(typeof attrs[k] === 'object' ? JSON.stringify(attrs[k]) : attrs[k]) + '"';
  return '<div class="w" data-w="' + name + '"' + a + '></div>';
}

/* Game-tree placeholder; spec stored in registry. */
function tree(id, spec, opts) {
  if (spec) GT.trees[id] = spec;
  return W('tree', Object.assign({ t: id }, opts || {}));
}

/* Step-by-step reveal block. steps: array of HTML strings. */
function steps(title, list) {
  return '<div class="reveal"><div class="reveal-head"><strong>' + title + '</strong>' +
    '<button class="btn sm js-next" type="button">Next step</button><button class="btn ghost sm js-all" type="button">Show all</button>' +
    '<button class="btn ghost sm js-reset" type="button">Reset</button></div><ol class="steps">' +
    list.map(s => '<li>' + s + '</li>').join('') + '</ol></div>';
}

/* Collapsible solution. */
function sol(title, body) { return '<details class="sol"><summary>' + title + '</summary><div class="sol-body">' + body + '</div></details>'; }

/* Typed callout boxes. */
const BOXLBL = { def: 'Definition', en: 'Exam-ready wording', ex: 'Example', intu: 'Intuition', warn: 'Common mistake', tip: 'Exam tip', thm: 'Result / Theorem' };
function box(type, body, label) { return '<div class="box ' + type + '"><span class="lbl">' + (label || BOXLBL[type]) + '</span>' + body + '</div>'; }

function lesson(o) { GT.lessons.push(o); }
function bank(lec, items) { items.forEach(it => GT.bank.push(Object.assign({ lec }, it))); }
function cards(lec, items) { items.forEach(([f, b]) => GT.cards.push({ lec, f, b })); }

/* Write-and-grade answer box: parts = [[label, maxPoints], ...]. */
function ans(id, parts) { return '<div class="ansbox" data-ans="' + id + '" data-parts="' + esc(JSON.stringify(parts)) + '"></div>'; }
