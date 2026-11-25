/* Step-by-step game walkthroughs ("Games step by step").
 * A walkthrough plays one game of a lecture move by move. Every step redraws a picture (payoff matrix,
 * game tree or diagram) and explains who moves, what he compares and why that move is the rational one.
 *
 * Spec: GT.walk({ id, lec, sec, title, intro, names: {1: 'Entrant', 2: 'Monopolist'},
 *   panels: { A: {type: 'mx'|'tree'|'plot'|'html', ...}, B: ... },
 *   steps: [{ show: ['A'], who: 1|2|3|'N'|0, h: 'heading', d: 'detail', why: 'reason', res: 'result', A: {delta}, B: {delta} }] })
 * Panel deltas are cumulative from step to step; focus, cmp, arrows, bad and tmp apply to their own step only.
 *   mx:   cells, rows, cols, probR, probC, cap (replace) · auto: 'br' | 'ne' | null · br [[i,j,k]], ne [[i,j]], dr [i], dc [j] (add)
 *         focus {r: [i], c: [j], cell: [[i,j]]} · cmp [[i,j,k]] · arrows [[[i,j],[i2,j2],k]] · reset: clears marks
 *   tree: pick {path: action}, val {path: text}, bel {path: text} (merge; null deletes) · sub [paths], dim [paths] (replace)
 *         focus [paths] · cmp [[leafPath,k]] · bad [[path, action]] · reset: clears marks
 *         A path is a list of action labels or child indices from the root, joined by '>' (root: '').
 *   plot: add (function P => svg, or a list; kept) · tmp (this step only) · legend, cap (replace) · reset: clears layers
 *   html: html (replace)
 */
(function () {
  const U = GT.util;
  GT.walks = [];
  GT.walk = o => { GT.walks.push(o); };
  let uid = 0;

  const P1 = new Set(['1', 'A', 'W', 'Firm', 'S']), P2 = new Set(['2', 'B', 'F', 'Worker', 'R']);
  const pIdx = p => P1.has(String(p)) ? 1 : P2.has(String(p)) ? 2 : String(p) === '3' ? 3 : 0;
  const arr = x => x == null ? [] : Array.isArray(x) ? x : [x];
  const f1 = v => (+v).toFixed(1);

  /* Arrow from (x1,y1) to (x2,y2): a line and a filled head, both with class cls. */
  function arrow(x1, y1, x2, y2, cls) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, s = Math.min(9, L * 0.6), w = s * 0.6;
    const bx = x2 - ux * s, by = y2 - uy * s;
    return '<line class="' + cls + '" x1="' + f1(x1) + '" y1="' + f1(y1) + '" x2="' + f1(bx) + '" y2="' + f1(by) + '"/>' +
      '<polygon class="' + cls + ' head" points="' + f1(x2) + ',' + f1(y2) + ' ' + f1(bx - uy * w) + ',' + f1(by + ux * w) + ' ' + f1(bx + uy * w) + ',' + f1(by - ux * w) + '"/>';
  }
  GT.walkArrow = arrow;

  /* ---------- state ---------- */
  function initState(p) {
    if (p.type === 'mx') return { br: new Set(), ne: new Set(), dr: new Set(), dc: new Set(), auto: p.auto || null, probR: p.probR || null, probC: p.probC || null, cells: null, rows: null, cols: null, cap: p.cap || '', t: {} };
    if (p.type === 'tree') return { pick: {}, val: {}, bel: {}, sub: [], dim: [], cap: p.cap || '', t: {} };
    if (p.type === 'plot') return { layers: arr(p.base), legend: p.legend || '', cap: p.cap || '', t: {} };
    return { html: p.html || '', cap: p.cap || '', t: {} };
  }
  const merge = (o, d) => { Object.keys(d).forEach(k => { if (d[k] == null) delete o[k]; else o[k] = d[k]; }); };
  function apply(p, s, d, last) {
    if (!d) return;
    if (d.cap != null) s.cap = d.cap;
    if (p.type === 'mx') {
      if (d.reset) { s.br.clear(); s.ne.clear(); s.dr.clear(); s.dc.clear(); s.auto = null; }
      ['cells', 'rows', 'cols', 'probR', 'probC'].forEach(k => { if (d[k] !== undefined) s[k] = d[k]; });
      if (d.auto !== undefined) s.auto = d.auto;
      arr(d.br).forEach(x => s.br.add(x.join(','))); arr(d.ne).forEach(x => s.ne.add(x.join(',')));
      arr(d.unne).forEach(x => s.ne.delete(x.join(',')));
      arr(d.dr).forEach(i => s.dr.add(i)); arr(d.dc).forEach(j => s.dc.add(j));
      if (last) s.t = { focus: d.focus || {}, cmp: d.cmp || [], arrows: d.arrows || [] };
    } else if (p.type === 'tree') {
      if (d.reset) { s.pick = {}; s.val = {}; s.bel = {}; s.sub = []; s.dim = []; }
      if (d.pick) merge(s.pick, d.pick); if (d.val) merge(s.val, d.val); if (d.bel) merge(s.bel, d.bel);
      if (d.sub) s.sub = d.sub; if (d.dim) s.dim = d.dim;
      if (last) s.t = { focus: arr(d.focus), cmp: d.cmp || [], bad: d.bad || [] };
    } else if (p.type === 'plot') {
      if (d.reset) s.layers = arr(p.base);
      s.layers = s.layers.concat(arr(d.add));
      if (d.legend != null) s.legend = d.legend;
      if (last) s.t = { tmp: arr(d.tmp) };
    } else if (d.html != null) s.html = d.html;
  }
  function stateAt(wk, k) {
    const st = {}; let show = wk.show || [Object.keys(wk.panels)[0]];
    Object.keys(wk.panels).forEach(key => { st[key] = initState(wk.panels[key]); });
    for (let i = 0; i <= k; i++) {
      const step = wk.steps[i];
      if (step.show) show = step.show;
      Object.keys(wk.panels).forEach(key => { if (i === k) st[key].t = {}; apply(wk.panels[key], st[key], step[key], i === k); });
    }
    return { st, show };
  }

  /* ---------- payoff matrix ---------- */
  function split(c) {
    const s = String(c == null ? '' : c); if (s.trim() === '') return ['', ''];
    const parts = s.includes('|') ? s.split('|') : s.split(',');
    return [parts[0].trim(), (parts[1] || '').trim()];
  }
  /* Rows, columns and the best-response and equilibrium marks of a matrix state (explicit marks plus the auto ones). */
  function mxMarks(p, s) {
    const rows = s.rows || p.rows, cols = s.cols || p.cols, raw = s.cells || p.cells;
    const C = raw.map(r => r.map(c => p.plain ? [String(c)] : split(c)));
    const m = C.length, n = C[0].length;
    const R = [...Array(m).keys()].filter(i => !s.dr.has(i)), K = [...Array(n).keys()].filter(j => !s.dc.has(j));
    const br = new Set(s.br), ne = new Set(s.ne);
    if (s.auto && !p.plain && C.every(r => r.every(c => c[0] !== '' && c[1] !== '' && !isNaN(+c[0]) && !isNaN(+c[1])))) {
      K.forEach(j => { const top = Math.max(...R.map(i => +C[i][j][0])); R.forEach(i => { if (+C[i][j][0] === top) br.add(i + ',' + j + ',1'); }); });
      R.forEach(i => { const top = Math.max(...K.map(j => +C[i][j][1])); K.forEach(j => { if (+C[i][j][1] === top) br.add(i + ',' + j + ',2'); }); });
      if (s.auto === 'ne') R.forEach(i => K.forEach(j => { if (br.has(i + ',' + j + ',1') && br.has(i + ',' + j + ',2')) ne.add(i + ',' + j); }));
    }
    return { rows, cols, raw, C, m, n, R, K, br, ne };
  }
  function renderMx(p, s) {
    const { rows, cols, C, m, n, br, ne } = mxMarks(p, s), t = s.t || {};
    const fo = t.focus || {}, fr = new Set(arr(fo.r)), fc = new Set(arr(fo.c)), fcell = new Set(arr(fo.cell).map(x => x.join(',')));
    const cmp = new Set((t.cmp || []).map(x => x.join(','))), sel = new Set(t.sel || []), ask = t.ask ? ' wk-asking' : '';
    let h = '<div class="mxwrap wk-mxwrap"><div class="wk-mxbox"><table class="mx wk-mx' + ask + '"><tr><th class="blank" colspan="2" rowspan="2"></th><th class="pl2" colspan="' + n + '">' + (p.p2 || 'Player 2') + '</th></tr><tr>';
    cols.forEach((c, j) => { h += '<th data-h="c' + j + '" class="' + (fc.has(j) ? 'wk-fh' : '') + (s.dc.has(j) ? ' wk-deadh' : '') + (sel.has('c' + j) ? ' wk-pick' : '') + '">' + cellVal(c) + (s.probC && s.probC[j] != null ? '<span class="wk-prob p2">' + cellVal(s.probC[j]) + '</span>' : '') + '</th>'; });
    h += '</tr>';
    C.forEach((r, i) => {
      h += '<tr>' + (i === 0 ? '<th class="pl1" rowspan="' + m + '">' + (p.p1 || 'Player 1') + '</th>' : '');
      h += '<th data-h="r' + i + '" class="' + (fr.has(i) ? 'wk-fh' : '') + (s.dr.has(i) ? ' wk-deadh' : '') + (sel.has('r' + i) ? ' wk-pick' : '') + '">' + cellVal(rows[i]) + (s.probR && s.probR[i] != null ? '<span class="wk-prob p1">' + cellVal(s.probR[i]) + '</span>' : '') + '</th>';
      r.forEach((c, j) => {
        const key = i + ',' + j, dead = s.dr.has(i) || s.dc.has(j);
        const cls = (ne.has(key) ? 'ne ' : '') + (dead ? 'dead ' : '') + ((fr.has(i) || fc.has(j) || fcell.has(key)) && !dead ? 'wk-f' : '') + (sel.has(key) ? ' wk-pick' : '');
        if (p.plain) { h += '<td class="' + cls + '" data-ij="' + key + '"><span class="wk-plain' + (cmp.has(key + ',1') || cmp.has(key + ',0') ? ' wk-cmp' : '') + '">' + cellVal(c[0]) + '</span></td>'; return; }
        const sp = k => '<span class="u' + k + (br.has(key + ',' + k) ? ' br' : '') + (cmp.has(key + ',' + k) ? ' wk-cmp' : '') + (sel.has(key + ',' + k) ? ' wk-pick' : '') + '">' + cellVal(c[k - 1]) + '</span>';
        h += '<td class="' + cls + '" data-ij="' + key + '">' + (c[0] === '' && c[1] === '' ? '' : sp(1) + ', ' + sp(2)) + '</td>';
      });
      h += '</tr>';
    });
    return h + '</table><svg class="wk-arrows" aria-hidden="true"></svg></div></div>';
  }
  /* Deviation arrows drawn over the table: player 1 changes the row (vertical, left edge), player 2 the column (horizontal, bottom edge). */
  function drawMxArrows(panel, arrows) {
    const box = panel.querySelector('.wk-mxbox'); if (!box) return;
    const svg = box.querySelector('svg.wk-arrows'), b = box.getBoundingClientRect();
    svg.setAttribute('width', b.width); svg.setAttribute('height', b.height); svg.setAttribute('viewBox', '0 0 ' + b.width + ' ' + b.height);
    let out = '';
    (arrows || []).forEach(([a, c, k]) => {
      const A = box.querySelector('td[data-ij="' + a.join(',') + '"]'), B = box.querySelector('td[data-ij="' + c.join(',') + '"]'); if (!A || !B) return;
      const ra = A.getBoundingClientRect(), rb = B.getBoundingClientRect();
      const ax = ra.left - b.left + ra.width / 2, ay = ra.top - b.top + ra.height / 2, bx = rb.left - b.left + rb.width / 2, by = rb.top - b.top + rb.height / 2;
      let x1, y1, x2, y2;
      if (a[1] === c[1]) { const x = ra.left - b.left + 8, d = Math.sign(by - ay); x1 = x2 = x; y1 = ay + d * ra.height * 0.18; y2 = by - d * rb.height * 0.18; }
      else if (a[0] === c[0]) { const y = ra.bottom - b.top - 5, d = Math.sign(bx - ax); y1 = y2 = y; x1 = ax + d * ra.width * 0.2; x2 = bx - d * rb.width * 0.2; }
      else { x1 = ax + (bx - ax) * 0.25; y1 = ay + (by - ay) * 0.25; x2 = ax + (bx - ax) * 0.75; y2 = ay + (by - ay) * 0.75; }
      out += arrow(x1, y1, x2, y2, 'wk-ar p' + k);
    });
    svg.innerHTML = out;
  }

  /* ---------- game tree ---------- */
  function buildTree(spec) {
    const all = [], keys = new Map(); let leaves = 0, maxD = 0;
    (function walkN(n, d, parent, act, idx, pkeys) {
      const w = { n, d, parent, act, idx, kids: [] };
      w.keys = parent ? [...new Set(pkeys.flatMap(k => [k === '' ? act : k + '>' + act, k === '' ? String(idx) : k + '>' + idx]))] : [''];
      w.keys.forEach(k => { if (!keys.has(k)) keys.set(k, w); });
      all.push(w); maxD = Math.max(maxD, d);
      if (n.pay) { w.x = leaves++; return w; }
      n.ch.forEach((c, i) => w.kids.push(walkN(c[1], d + 1, w, String(c[0]), i, w.keys)));
      w.x = w.kids.reduce((s, c) => s + c.x, 0) / w.kids.length;
      return w;
    })(spec, 0, null, null, 0, ['']);
    return { all, keys, leaves, maxD };
  }
  const byKeys = (obj, w) => { for (const k of w.keys) if (obj[k] != null) return obj[k]; return null; };
  const treeSpec = p => typeof p.tree === 'string' ? GT.trees[p.tree] : p.tree;
  /* Map node -> index of the chosen child, from a pick object keyed by paths. */
  function resolvePicks(T, pick) {
    const chosen = new Map();
    Object.keys(pick).forEach(k => {
      const w = T.keys.get(String(k)); if (!w || w.n.pay) return;
      const a = String(pick[k]); let i = w.kids.findIndex(c => c.act === a); if (i < 0 && /^\d+$/.test(a)) i = +a;
      if (i >= 0 && i < w.kids.length) chosen.set(w, i);
    });
    return chosen;
  }
  const edgeKey = w => w.parent.keys[0] + '|' + w.idx;
  function renderTree(p, s) {
    const spec = treeSpec(p);
    if (!spec) return '<p class="small">Missing tree</p>';
    const T = buildTree(spec), get = k => T.keys.get(String(k)), t = Object.assign({ focus: [], cmp: [], bad: [], sel: [] }, s.t);
    const np = Math.max(...T.all.filter(w => w.n.pay).map(w => w.n.pay.length));
    const gap = p.gap || 96, lv = p.lv || 84, W0 = Math.max((T.leaves - 1) * gap + 60, p.minW || 320), H0 = T.maxD * lv + 64 + np * 14;
    const X = w => 40 + (W0 - (T.leaves - 1) * gap) / 2 + w.x * gap, Y = w => 34 + w.d * lv;
    const chosen = resolvePicks(T, s.pick), sel = new Set(t.sel), hit = new Set(t.hit || []);
    const dimmed = new Set();
    s.dim.forEach(k => { const w = get(k); if (w) (function mark(x) { x.kids.forEach(c => { dimmed.add(c); mark(c); }); })(w); });
    const focus = new Set(t.focus.map(get).filter(Boolean));
    const cmp = new Map(); t.cmp.forEach(([k, j]) => { const w = get(k); if (w) { if (!cmp.has(w)) cmp.set(w, new Set()); cmp.get(w).add(j); } });
    const bad = new Set(); t.bad.forEach(([k, a]) => { const w = get(k); if (!w || w.n.pay) return; let i = w.kids.findIndex(c => c.act === String(a)); if (i < 0 && /^\d+$/.test(String(a))) i = +a; if (w.kids[i]) bad.add(w.kids[i]); });
    let g = '';
    // subgame boxes (outer boxes get more padding so nested boxes stay visible)
    s.sub.forEach(k => {
      const w = get(k); if (!w) return;
      const desc = []; (function c(x) { desc.push(x); x.kids.forEach(c); })(w);
      const pad = 26 + (T.maxD - w.d) * 6, xs = desc.map(X);
      const x0 = Math.min(...xs) - pad, x1 = Math.max(...xs) + pad, y0 = Y(w) - 30 - (T.maxD - w.d) * 3;
      const y1 = Math.max(...desc.map(d => Y(d) + (d.n.pay ? 10 + np * 14 : 10))) + 4 + (T.maxD - w.d) * 3;
      g += '<rect class="wk-sub" x="' + f1(x0) + '" y="' + f1(y0) + '" width="' + f1(x1 - x0) + '" height="' + f1(y1 - y0) + '" rx="12"/><text class="wk-sublbl" x="' + f1(x0 + 8) + '" y="' + f1(y0 + 13) + '">' + (w.d === 0 ? 'whole game' : 'subgame') + '</text>';
    });
    // information sets
    const groups = {};
    T.all.forEach(w => { if (w.n.info) (groups[w.n.info] = groups[w.n.info] || []).push(w); });
    Object.values(groups).forEach(gr => {
      if (gr.length < 2) return; gr.sort((a, b) => a.x - b.x);
      for (let i = 1; i < gr.length; i++) { const a = gr[i - 1], b = gr[i], mx2 = (X(a) + X(b)) / 2, my = Math.max(Y(a), Y(b)) - 18 - Math.abs(X(b) - X(a)) * 0.12; g += '<path class="info' + (dimmed.has(a) && dimmed.has(b) ? ' wk-dim' : '') + '" d="M' + X(a) + ',' + Y(a) + ' Q' + mx2 + ',' + my + ' ' + X(b) + ',' + Y(b) + '"/>'; }
    });
    // edges
    T.all.forEach(w => {
      if (!w.parent) return;
      const pw = w.parent, on = chosen.get(pw) === w.idx, off = chosen.has(pw) && !on && pw.n.p !== 'N';
      const dm = dimmed.has(w) ? ' wk-dim' : '', bd = bad.has(w) ? ' wk-bad' : '', ek = edgeKey(w), sl = sel.has(ek) ? ' wk-sel' : '';
      g += '<line class="edge' + (on ? ' on' : off ? ' off' : '') + bd + dm + sl + '" x1="' + X(pw) + '" y1="' + Y(pw) + '" x2="' + X(w) + '" y2="' + Y(w) + '"/>';
      const lx = (X(pw) + X(w)) / 2 + (X(w) < X(pw) ? -8 : X(w) > X(pw) ? 8 : 6), ly = (Y(pw) + Y(w)) / 2;
      g += '<text class="act' + dm + sl + '" x="' + f1(lx) + '" y="' + f1(ly) + '" text-anchor="' + (X(w) < X(pw) ? 'end' : 'start') + '">' + esc(w.act) + '</text>';
      if (hit.has(ek)) g += '<line class="wk-hit" data-e="' + esc(ek) + '" x1="' + X(pw) + '" y1="' + Y(pw) + '" x2="' + X(w) + '" y2="' + Y(w) + '"><title>' + esc('Choose ' + w.act) + '</title></line>';
      if (bd) { const cx = (X(pw) + X(w)) / 2, cy = ly; g += '<path class="wk-x" d="M' + f1(cx - 6) + ',' + f1(cy - 6) + 'L' + f1(cx + 6) + ',' + f1(cy + 6) + 'M' + f1(cx + 6) + ',' + f1(cy - 6) + 'L' + f1(cx - 6) + ',' + f1(cy + 6) + '"/>'; }
    });
    // nodes, labels, payoffs
    T.all.forEach(w => {
      const dm = dimmed.has(w) ? ' wk-dim' : '', x = X(w), y = Y(w);
      if (w.n.pay) {
        g += '<circle class="term' + dm + '" cx="' + x + '" cy="' + y + '" r="3"/>';
        w.n.pay.forEach((v, k) => {
          const txt = esc(typeof v === 'number' ? U.fmt(v, 4) : v), ty = y + 18 + k * 14;
          if (cmp.has(w) && cmp.get(w).has(k + 1)) { const wd = txt.length * 7.2 + 10; g += '<rect class="wk-hl" x="' + f1(x - wd / 2) + '" y="' + f1(ty - 11) + '" width="' + f1(wd) + '" height="15" rx="4"/>'; }
          g += '<text class="pay' + (k + 1) + dm + '" x="' + x + '" y="' + ty + '" text-anchor="middle">' + txt + '</text>';
        });
        return;
      }
      const k = pIdx(w.n.p), cls = w.n.p === 'N' ? 'nat' : ['p1', 'p2', 'p3'][k - 1] || 'p1';
      if (focus.has(w)) g += '<circle class="wk-ring" cx="' + x + '" cy="' + y + '" r="13"/>';
      g += '<circle class="node ' + cls + dm + '" cx="' + x + '" cy="' + y + '" r="7"/>';
      g += '<text class="pl' + dm + '" x="' + x + '" y="' + (y - 12) + '" text-anchor="middle">' + esc(w.n.p === 'N' ? 'Nature' : w.n.p) + '</text>';
      const bl = byKeys(s.bel, w) || (w.n.belief ? '[' + w.n.belief + ']' : null);
      if (bl) g += '<text class="act wk-bel' + dm + '" x="' + (x + 12) + '" y="' + (y + 4) + '">' + esc(bl) + '</text>';
      const vl = byKeys(s.val, w);
      if (vl) g += '<text class="val' + dm + '" x="' + (x + 12) + '" y="' + (y + (bl ? 18 : 4)) + '">' + esc(vl) + '</text>';
    });
    const VW = W0 + 80;
    return '<div class="treewrap"><svg class="tree" style="max-width:' + Math.round(VW * (p.scale || 0.95)) + 'px;margin:0 auto" viewBox="0 0 ' + VW + ' ' + H0 + '" role="img" aria-label="Game tree">' + g + '</svg></div>';
  }

  /* ---------- diagram ---------- */
  function renderPlot(p, s) {
    const P = U.plot(p), t = s.t || {};
    P.ar = (x1, y1, x2, y2, cls) => arrow(P.X(x1), P.Y(y1), P.X(x2), P.Y(y2), 'wk-ar ' + (cls || 'pa'));
    P.rect = (x0, y0, x1, y1, cls) => P.poly([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], cls);
    P.vline = (x, cls) => P.line([[x, p.y0], [x, p.y1]], cls || 'cm');
    P.hline = (y, cls) => P.line([[p.x0, y], [p.x1, y]], cls || 'cm');
    P.lab = (x, y, txt, cls, anchor) => P.text(x, y, txt, cls || 'wk-t', anchor || 'middle');
    const inner = s.layers.concat(arr(t.tmp)).map(f => typeof f === 'function' ? f(P) : f).join('');
    return P.svg(inner) + (s.legend ? '<div class="legend">' + s.legend + '</div>' : '');
  }

  /* ---------- prediction questions ----------
   * Before a step is shown, the reader can predict it. A question is
   *   { ask, groups: [{ label, multi, opts: [{ label, ok, hit }] }], t: { panelKey: transient marks } }
   * where hit lists the matrix cells ('i,j'), headers ('r0', 'c1') or tree edges ('path|idx') that select the option
   * when clicked in the picture, and t is drawn over the state before the step.
   * A step may define it by hand: q: { ask, opts: [...], ok: index | [indices], multi } or q: { ask, groups: [...] },
   * with q: false to switch the automatic question off. Otherwise it is derived from the step:
   *   tree: the choices the moving player makes in this step (new picks); matrix: eliminated strategies, new Nash
   *   equilibria, or new best responses, in that order. Steps by Nature, tree steps without a mover and resets get none.
   *   Hand-written questions for walkthroughs drawn as diagrams are kept in walk-q.js. */
  const pname = (wk, who) => { const nm = wk.names || {}; return nm[who] || (typeof who === 'number' ? 'Player ' + who : String(who)); };
  /* Hand-written options are shuffled with a fixed seed per question, so the right answer is not always first
     but the order stays the same between visits. */
  function shuffled(list, seed) {
    let h = 2166136261; for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    const a = list.slice(), rnd = () => { h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909); return ((h >>>= 0) % 10000) / 10000; };
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function manualQ(q, seed) {
    const groups = q.groups || [{ opts: q.opts, ok: q.ok, multi: q.multi }];
    return { ask: q.ask, manual: true, t: {}, groups: groups.map((g, gi) => { const ok = new Set(arr(g.ok)); const opts = g.opts.map((o, i) => ({ label: o, ok: ok.has(i), hit: [] })); return { label: g.label || '', multi: !!g.multi || ok.size > 1, opts: g.keep ? opts : shuffled(opts, seed + ':' + gi) }; }) };
  }
  function treeQ(wk, step, key, p, sA, sB) {
    const d = step[key]; if (!d || !d.pick || d.reset) return null;
    const T = buildTree(treeSpec(p)), cA = resolvePicks(T, sA.pick), cB = resolvePicks(T, sB.pick);
    const changed = [...cB.keys()].filter(w => w.n.p !== 'N' && cA.get(w) !== cB.get(w));
    const mine = changed.filter(w => String(w.n.p) === String(step.who) || (pIdx(w.n.p) && pIdx(w.n.p) === pIdx(step.who)));
    const nodes = mine.length ? mine : changed.every(w => w.n.p === (changed[0] && changed[0].n.p)) ? changed : [];
    if (!nodes.length) return null;
    const where = w => { const acts = []; for (let x = w; x.parent; x = x.parent) acts.unshift(x.act); return acts.length ? 'after ' + acts.join(', ') : 'at the first move'; };
    const groups = [];
    nodes.forEach(w => {
      const g = w.n.info && groups.find(x => x.info === w.n.info && x.ok === cB.get(w));
      if (g) { g.nodes.push(w); return; }
      groups.push({ info: w.n.info, ok: cB.get(w), nodes: [w] });
    });
    return {
      ask: 'What does ' + esc(pname(wk, step.who)) + ' choose ' + (groups.length > 1 ? 'at each ringed node' : 'at the ringed node') + '? Pick below or click a branch.',
      t: { [key]: { focus: nodes.map(w => w.keys[0]), cmp: [], bad: [], hit: nodes.flatMap(w => w.kids.map(edgeKey)) } },
      groups: groups.map(g => ({
        label: groups.length > 1 ? esc(/^\d$/.test(String(g.nodes[0].n.p)) ? 'Player ' + g.nodes[0].n.p : g.nodes[0].n.p) + ' ' + (g.nodes.length > 1 ? 'in the information set (' + g.nodes.map(where).join(' or ') + ')' : where(g.nodes[0])) : '',
        multi: false,
        opts: g.nodes[0].kids.map((c, i) => ({ label: esc(c.act), ok: i === g.ok, hit: g.nodes.map(w => edgeKey(w.kids[i])) })),
      })),
    };
  }
  function mxQ(wk, step, key, p, sA, sB) {
    const d = step[key]; if (!d || p.plain || d.reset || d.cells || d.rows || d.cols) return null;
    const A = mxMarks(p, sA), B = mxMarks(p, sB), P1n = p.p1 || 'Player 1', P2n = p.p2 || 'Player 2';
    const cl = (i, j) => '(' + cellVal(A.rows[i]) + ', ' + cellVal(A.cols[j]) + ')';
    const killR = A.R.filter(i => sB.dr.has(i)), killC = A.K.filter(j => sB.dc.has(j));
    if (killR.length || killC.length) {
      return {
        ask: 'Which strategy is eliminated in this round? Select every one that goes (click its label in the matrix or pick below).',
        t: { [key]: { ask: true } },
        groups: [{ label: '', multi: true, opts: A.R.map(i => ({ label: esc(P1n) + ': ' + cellVal(A.rows[i]), ok: killR.includes(i), hit: ['r' + i] })).concat(A.K.map(j => ({ label: esc(P2n) + ': ' + cellVal(A.cols[j]), ok: killC.includes(j), hit: ['c' + j] }))) }],
      };
    }
    const lostNe = [...A.ne].some(x => !B.ne.has(x)), newNe = [...B.ne].filter(x => !A.ne.has(x));
    if (newNe.length && !lostNe) {
      const opts = []; B.R.forEach(i => B.K.forEach(j => opts.push({ label: cl(i, j), ok: B.ne.has(i + ',' + j), hit: [i + ',' + j] })));
      return { ask: 'Which cells are pure-strategy Nash equilibria? Select all of them (click the cells or pick below).', t: { [key]: { ask: true } }, groups: [{ label: '', multi: true, opts }] };
    }
    const newBr = [...B.br].filter(x => !A.br.has(x)).map(x => x.split(',').map(Number));
    if (!newBr.length || [...A.br].some(x => !B.br.has(x))) return null;
    const groups = [], fr = [], fc = [];
    newBr.forEach(([i, j, k]) => {
      const id = k === 1 ? 'c' + j : 'r' + i;
      if (groups.some(g => g.id === id)) return;
      if (k === 1) { fc.push(j); groups.push({ id, label: esc(P1n) + '\'s best response to ' + cellVal(B.cols[j]), multi: true, opts: B.R.map(r => ({ label: cellVal(B.rows[r]), ok: B.br.has(r + ',' + j + ',1'), hit: [r + ',' + j + ',1'] })) }); }
      else { fr.push(i); groups.push({ id, label: esc(P2n) + '\'s best response to ' + cellVal(B.rows[i]), multi: true, opts: B.K.map(c => ({ label: cellVal(B.cols[c]), ok: B.br.has(i + ',' + c + ',2'), hit: [i + ',' + c + ',2'] })) }); }
    });
    if (groups.length > 6) return null;
    return { ask: 'Find the best response' + (groups.length > 1 ? 's' : '') + ': select every strategy that gives the highest payoff (ties count), by clicking the cell or below.', t: { [key]: { ask: true, focus: { r: fr, c: fc } } }, groups };
  }
  /* The question for step k (k >= 1), or null. */
  function questionFor(wk, k) {
    const step = wk.steps[k]; if (!step || k < 1 || step.q === false) return null;
    if (step.q) return manualQ(step.q, wk.id + ':' + k);
    if (step.who === 'N') return null;
    const A = stateAt(wk, k - 1), B = stateAt(wk, k);
    for (const key of B.show) {
      const p = wk.panels[key];
      const q = p.type === 'tree' ? (step.who ? treeQ(wk, step, key, p, A.st[key], B.st[key]) : null) : p.type === 'mx' ? mxQ(wk, step, key, p, A.st[key], B.st[key]) : null;
      if (q && q.groups.some(g => g.opts.length > 1)) return q;
    }
    return null;
  }
  GT.walkQuestion = questionFor;

  /* Prediction results, kept per walkthrough and step: { id: { stepIndex: true | false } } (latest attempt counts). */
  GT.walkPred = {
    all() { return store.get('walkp', {}); },
    set(id, k, ok) { const a = this.all(); a[id] = a[id] || {}; a[id][k] = !!ok; store.set('walkp', a); },
    score(id) { const s = this.all()[id] || {}; const v = Object.values(s); return { right: v.filter(Boolean).length, done: v.length }; },
    lecture(lec) { let right = 0, done = 0; GT.walks.filter(w => w.lec === lec).forEach(w => { const s = this.score(w.id); right += s.right; done += s.done; }); return { right, done }; },
    count(wk) { let n = 0; for (let i = 1; i < wk.steps.length; i++) if (questionFor(wk, i)) n++; return n; },
  };

  /* ---------- widget ---------- */
  function whoChip(wk, who) {
    if (who == null || who === 0) return '<span class="wk-who p0">Analysis</span>';
    if (who === 'N') return '<span class="wk-who nat">Nature moves</span>';
    const names = wk.names || {}, k = typeof who === 'number' ? who : pIdx(who);
    const label = names[who] || (typeof who === 'number' ? 'Player ' + who : who);
    return '<span class="wk-who p' + (k || 0) + '">' + esc(label) + ' decides</span>';
  }
  GT.widgets.walk = function (el) {
    const wk = GT.walks.find(w => w.id === el.dataset.id);
    if (!wk) { el.textContent = 'Missing walkthrough ' + el.dataset.id; return; }
    const N = wk.steps.length, nQ = GT.walkPred.count(wk);
    let k = 0, timer = null, ask = null, sel = [], fb = null;
    const answered = new Set();
    const predictOn = () => nQ > 0 && store.get('walkPredict', true);
    el.innerHTML = '<div class="widget wk" tabindex="0" aria-label="' + esc('Step-by-step game: ' + wk.title + '. Use the arrow keys to move between steps.') + '"><div class="widget-head"><span class="tag">Step by step</span><span class="ttl">' + wk.title + '</span>' +
      (nQ ? '<label class="wk-ptoggle" title="Before each move is shown, you choose what the player does"><input type="checkbox" data-a="predict"' + (predictOn() ? ' checked' : '') + '> Predict first</label>' : '') + '</div><div class="widget-body">' +
      (wk.intro ? '<p class="small wk-intro">' + wk.intro + '</p>' : '') +
      '<div class="wk-panels"></div><div class="wk-text" aria-live="polite"></div>' +
      '<div class="wk-ctl"><button class="btn sm ghost" type="button" data-a="prev">Back</button><button class="btn sm" type="button" data-a="next">Next step</button><button class="btn sm ghost" type="button" data-a="play">Play</button><button class="btn sm ghost" type="button" data-a="restart">Restart</button>' +
      '<div class="wk-dots">' + wk.steps.map((_, i) => '<button class="wk-dot" type="button" data-i="' + i + '" aria-label="Step ' + (i + 1) + '">' + (i + 1) + '</button>').join('') + '</div></div></div></div>';
    const root = el.querySelector('.wk'), panelsEl = el.querySelector('.wk-panels'), textEl = el.querySelector('.wk-text');
    function stopPlay() { if (timer) { clearInterval(timer); timer = null; } const b = el.querySelector('[data-a="play"]'); if (b) b.textContent = 'Play'; }
    const scoreLine = () => { if (!nQ) return ''; const s = GT.walkPred.score(wk.id); return s.done ? '<span class="wk-score" title="Your latest prediction for each question of this game">Predictions ' + s.right + ' / ' + s.done + (s.done < nQ ? ' (of ' + nQ + ')' : '') + '</span>' : ''; };
    const selHits = () => { const h = []; ask.groups.forEach((g, gi) => sel[gi].forEach(oi => h.push(...g.opts[oi].hit))); return h; };
    function draw(anim) {
      // While asking, the picture shows the state before step k with the question's marks.
      const view = stateAt(wk, k), st = ask ? stateAt(wk, k - 1).st : view.st, show = view.show, step = wk.steps[k];
      if (ask) { const hits = selHits(); show.forEach(key => { st[key].t = Object.assign({}, ask.t[key] || {}, { sel: hits }); }); }
      if (window.MathJax && MathJax.typesetClear) { try { MathJax.typesetClear([panelsEl, textEl]); } catch (e) { /* nothing to clear */ } }
      panelsEl.innerHTML = show.map(key => {
        const p = wk.panels[key], s = st[key];
        const body = p.type === 'mx' ? renderMx(p, s) : p.type === 'tree' ? renderTree(p, s) : p.type === 'plot' ? renderPlot(p, s) : s.html;
        return '<div class="wk-panel" data-k="' + key + '">' + (p.title ? '<p class="eyebrow wk-ptitle">' + p.title + '</p>' : '') + body + (s.cap ? '<div class="mxcap">' + s.cap + '</div>' : '') + '</div>';
      }).join('');
      panelsEl.classList.toggle('one', show.length === 1);
      const meta = '<div class="wk-meta"><span class="wk-count">Step ' + (k + 1) + ' of ' + N + '</span>' + whoChip(wk, step.who) + scoreLine() + '</div>';
      if (ask) {
        const ready = ask.groups.every((g, gi) => sel[gi].length);
        textEl.innerHTML = meta + '<p class="wk-h">Your prediction</p><div class="wk-d">' + ask.ask + '</div>' +
          ask.groups.map((g, gi) => '<div class="wk-qg">' + (g.label ? '<p class="wk-ql">' + g.label + '</p>' : '') + '<div class="wk-opts" role="group">' +
            g.opts.map((o, oi) => '<button type="button" class="wk-opt" data-g="' + gi + '" data-o="' + oi + '" aria-pressed="' + (sel[gi].includes(oi) ? 'true' : 'false') + '">' + o.label + '</button>').join('') + '</div></div>').join('') +
          '<div class="wk-qact"><button class="btn sm" type="button" data-a="check"' + (ready ? '' : ' disabled') + '>Check my prediction</button><button class="btn sm ghost" type="button" data-a="reveal">Just show me</button>' +
          (ask.groups.some(g => g.multi) ? '<span class="small muted">Several answers can be right.</span>' : '') + '</div>';
      } else {
        textEl.innerHTML = meta + (fb || '') +
          '<p class="wk-h">' + step.h + '</p>' + (step.d ? '<div class="wk-d">' + step.d + '</div>' : '') +
          (step.why ? '<div class="wk-why"><span class="lbl">' + (step.who && step.who !== 'N' ? 'Why this move' : 'Why') + '</span>' + step.why + '</div>' : '') +
          (step.res ? '<div class="wk-res"><span class="lbl">Result</span>' + step.res + '</div>' : '');
      }
      textEl.classList.toggle('wk-asking', !!ask);
      if (anim !== false) { textEl.classList.remove('anim'); void textEl.offsetWidth; textEl.classList.add('anim'); }
      el.querySelector('[data-a="prev"]').disabled = k === 0 && !ask;
      el.querySelector('[data-a="next"]').disabled = k === N - 1 || !!ask;
      el.querySelectorAll('.wk-dot').forEach((d, i) => { d.classList.toggle('on', i === k); d.classList.toggle('past', i < k); d.setAttribute('aria-current', i === k ? 'step' : 'false'); });
      const post = () => show.forEach(key => { if (wk.panels[key].type === 'mx') drawMxArrows(panelsEl.querySelector('.wk-panel[data-k="' + key + '"]'), st[key].t.arrows); });
      post();
      if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([panelsEl, textEl]).then(post).catch(() => {});
    }
    const go = i => { ask = null; fb = null; k = Math.max(0, Math.min(N - 1, i)); draw(); };
    function next() {
      if (k >= N - 1) return;
      const q = predictOn() && !answered.has(k + 1) ? questionFor(wk, k + 1) : null;
      if (!q) { go(k + 1); return; }
      k = k + 1; ask = q; fb = null; sel = q.groups.map(() => []); draw();
    }
    function toggle(gi, oi) {
      const g = ask.groups[gi], cur = sel[gi];
      if (!g.multi) sel[gi] = cur[0] === oi ? [] : [oi];
      else sel[gi] = cur.includes(oi) ? cur.filter(x => x !== oi) : cur.concat(oi);
      draw(false);
    }
    function finish(check) {
      const q = ask, mine = sel;
      answered.add(k); ask = null;
      if (check) {
        const res = q.groups.map((g, gi) => { const want = g.opts.map((o, i) => o.ok ? i : -1).filter(i => i >= 0); return { g, want, got: mine[gi], ok: want.length === mine[gi].length && want.every(i => mine[gi].includes(i)) }; });
        const ok = res.every(r => r.ok);
        GT.walkPred.set(wk.id, k, ok);
        const names = (g, idx) => idx.length ? idx.map(i => g.opts[i].label).join(', ') : 'nothing';
        fb = '<div class="wk-fb ' + (ok ? 'ok' : 'no') + '"><span class="lbl">' + (ok ? 'Correct prediction' : 'Not quite') + '</span>' +
          (ok ? (res.length === 1 && res[0].want.length === 1 ? 'You predicted ' + names(res[0].g, res[0].want) + '. ' : '') + 'The explanation below confirms why.'
            : '<ul>' + res.map(r => '<li>' + (r.g.label ? r.g.label + ': ' : '') + (r.ok ? 'right (' + names(r.g, r.want) + ')' : 'you chose ' + names(r.g, r.got) + ', correct is <strong>' + names(r.g, r.want) + '</strong>')).join('</li><li>') + '</li></ul>Read the reason below.') + '</div>';
      } else fb = null;
      draw();
    }
    el.querySelector('.wk-ctl').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.i != null) { stopPlay(); go(+b.dataset.i); return; }
      const a = b.dataset.a;
      if (a === 'prev') { stopPlay(); go(k - 1); }
      if (a === 'next') { stopPlay(); next(); }
      if (a === 'restart') { stopPlay(); answered.clear(); go(0); }
      if (a === 'play') {
        if (timer) { stopPlay(); return; }
        if (k === N - 1) go(0);
        b.textContent = 'Pause';
        timer = setInterval(() => { if (!document.body.contains(el) || k >= N - 1) { stopPlay(); return; } go(k + 1); if (k >= N - 1) stopPlay(); }, 5000);
      }
    });
    textEl.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b || !ask) return;
      if (b.dataset.g != null) toggle(+b.dataset.g, +b.dataset.o);
      if (b.dataset.a === 'check' && ask.groups.every((g, gi) => sel[gi].length)) finish(true);
      if (b.dataset.a === 'reveal') finish(false);
    });
    // Answering in the picture: matrix cells, payoffs, strategy labels and tree branches.
    panelsEl.addEventListener('click', e => {
      if (!ask) return;
      let cands = [];
      const he = e.target.closest('[data-e]'), th = e.target.closest('th[data-h]'), td = e.target.closest('td[data-ij]');
      if (he) cands = [he.getAttribute('data-e')];
      else if (th) cands = [th.dataset.h];
      else if (td) { const ij = td.dataset.ij, sp = e.target.closest('.u1,.u2'); cands = sp ? [ij + (sp.classList.contains('u1') ? ',1' : ',2')] : [ij, ij + ',1', ij + ',2']; }
      for (const c of cands) for (let gi = 0; gi < ask.groups.length; gi++) {
        const oi = ask.groups[gi].opts.findIndex(o => o.hit.includes(c));
        if (oi >= 0) { toggle(gi, oi); return; }
      }
    });
    const pt = el.querySelector('[data-a="predict"]');
    if (pt) pt.addEventListener('change', () => { store.set('walkPredict', pt.checked); document.querySelectorAll('.wk [data-a="predict"]').forEach(x => { x.checked = pt.checked; }); if (!pt.checked && ask) finish(false); });
    root.addEventListener('keydown', e => {
      if (e.target.closest('input,select,textarea')) return;
      if (ask) {
        if (/^[1-9]$/.test(e.key) && ask.groups.length === 1 && ask.groups[0].opts[+e.key - 1]) { e.preventDefault(); toggle(0, +e.key - 1); }
        if (e.key === 'Enter' && ask.groups.every((g, gi) => sel[gi].length)) { e.preventDefault(); finish(true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(k - 1); }
        return;
      }
      if (e.key === 'ArrowRight') { e.preventDefault(); stopPlay(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stopPlay(); go(k - 1); }
    });
    if (window.ResizeObserver) { let raf = 0; new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const st = stateAt(wk, ask ? k - 1 : k).st; stateAt(wk, k).show.forEach(key => { if (wk.panels[key].type === 'mx') drawMxArrows(panelsEl.querySelector('.wk-panel[data-k="' + key + '"]'), ask ? [] : st[key].t.arrows); }); }); }).observe(panelsEl); }
    draw();
  };

  /* ---------- placement in the lecture pages ---------- */
  GT.injectWalks = function () {
    const by = {};
    GT.walks.forEach(w => { if (w.lec) (by[w.lec] = by[w.lec] || []).push(w); });
    GT.lessons.forEach(l => {
      const list = by[l.id]; if (!list) return;
      const secs = {};
      list.forEach(w => { (secs[w.sec || 'end'] = secs[w.sec || 'end'] || []).push(w); });
      Object.keys(secs).forEach(sec => {
        const block = '<div class="wk-group">' + secs[sec].map(w => '<div id="wk-' + w.id + '" class="wk-anchor">' + W('walk', { id: w.id }) + '</div>').join('') + '</div>';
        const html = l.html, h2 = html.indexOf('<h2 id="' + sec + '">');
        let pos = h2 >= 0 ? html.indexOf('<h2 id="s', h2 + 5) : -1;
        if (pos < 0) { const q = html.lastIndexOf('<div class="quiz"'); pos = q >= 0 ? q : html.length; }
        l.html = html.slice(0, pos) + block + html.slice(pos);
      });
    });
  };

  /* ---------- overview page ---------- */
  GT.pages.walk = {
    title: 'Games step by step',
    render() {
      const lecs = GT.lessons.filter(l => GT.walks.some(w => w.lec === l.id));
      const saved = store.get('walkLec', null), cur = lecs.some(l => l.id === saved) ? saved : (lecs[0] && lecs[0].id);
      setTimeout(() => {
        const bar = document.getElementById('wk-lecs'), holder = document.getElementById('wk-holder'); if (!bar || !holder) return;
        const show = id => {
          store.set('walkLec', id);
          bar.querySelectorAll('button').forEach(b => { const on = b.dataset.l === id; b.classList.toggle('ghost', !on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
          const l = GT.lessons.find(x => x.id === id), list = GT.walks.filter(w => w.lec === id);
          holder.innerHTML = '<h2>L' + l.no + ' ' + l.title + '</h2><p class="small muted">' + list.length + ' game' + (list.length === 1 ? '' : 's') + '. The same walkthroughs appear inside <a href="#' + l.id + '">the lecture page</a>, next to the section they belong to.</p><div class="wk-group">' + list.map(w => W('walk', { id: w.id })).join('') + '</div>';
          GT.enhance(holder);
        };
        bar.addEventListener('click', e => { const b = e.target.closest('button[data-l]'); if (b) show(b.dataset.l); });
        if (cur) show(cur);
      }, 0);
      return '<p class="eyebrow">Overview</p><h1>Games step by step</h1>' +
        '<p>Every game of the lectures, played one move at a time. At each step the picture changes (the row or column being compared lights up, best responses get underlined, dominated strategies are crossed out, branches of a tree are chosen, subgames are boxed) and the text says <strong>who moves, what he compares and why this is the rational move</strong>.</p>' +
        '<div class="box thm"><span class="lbl">Predict first</span>With <strong>Predict first</strong> switched on (top right of each game), the next move is hidden until you have made your own prediction: click a branch of the tree, a cell or strategy label of the matrix, or one of the answers below the picture, then <strong>Check my prediction</strong>. The step then opens with your result and the reason. Your latest answer to every question is counted' + (function () { let r = 0, d = 0; GT.walks.forEach(w => { const s = GT.walkPred.score(w.id); r += s.right; d += s.done; }); return d ? ': so far <strong>' + r + ' of ' + d + '</strong> correct.' : '.'; })() + ' Switch it off to simply read through the steps.</div>' +
        '<div class="box tip"><span class="lbl">How to read the pictures</span><ul>' +
        '<li><span class="u1 mono">Blue</span> numbers and nodes belong to player 1, <span class="u2 mono">orange</span> ones to player 2. A light band marks the column or row being compared; circled numbers are the payoffs compared in this step.</li>' +
        '<li>Arrows show a profitable unilateral deviation (blue: player 1 switches row, orange: player 2 switches column). A cell without outgoing arrows is a Nash equilibrium (shaded yellow).</li>' +
        '<li>In trees, the thick green branch is the chosen action, dashed branches are not chosen, a red cross marks a non-credible move, dashed boxes are subgames and faded parts have been replaced by their equilibrium payoffs.</li>' +
        '<li>Use <strong>Next step</strong> and <strong>Back</strong>, the numbered dots, the arrow keys (after clicking into the box), or <strong>Play</strong> for an automatic run (it skips the predictions). While predicting, the number keys pick an answer and Enter checks it.</li></ul></div>' +
        '<div class="wk-lecs" id="wk-lecs" role="group" aria-label="Lecture">' + lecs.map(l => { const s = GT.walkPred.lecture(l.id); return '<button class="btn sm ghost" type="button" data-l="' + l.id + '" aria-pressed="false"' + (s.done ? ' title="Predictions: ' + s.right + ' of ' + s.done + ' correct"' : '') + '>L' + l.no + (s.done ? ' <span class="wk-lscore">' + Math.round(100 * s.right / s.done) + '%</span>' : '') + '</button>'; }).join('') + '</div>' +
        '<div id="wk-holder"></div>';
    },
  };
})();
