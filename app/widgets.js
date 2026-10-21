/* Interactive widgets. Each widget mounts into a .w[data-w] placeholder. */
(function () {
  let uid = 0;
  const W = {};
  GT.widgets = W;

  /* ---------- helpers ---------- */
  function fmt(x, d) {
    if (typeof x !== 'number' || !isFinite(x)) return String(x);
    d = d == null ? 3 : d;
    const s = x.toFixed(d);
    return s.indexOf('.') >= 0 ? s.replace(/0+$/, '').replace(/\.$/, '') : s;
  }
  function frac(x) {
    if (Math.abs(x - Math.round(x)) < 1e-9) return String(Math.round(x));
    for (let den = 2; den <= 60; den++) {
      const num = Math.round(x * den);
      if (Math.abs(num / den - x) < 1e-9) return num + '/' + den;
    }
    return fmt(x, 4);
  }
  function frame(el, title, tag) {
    el.innerHTML = '<div class="widget"><div class="widget-head"><span class="tag">' + (tag || 'Interactive') + '</span><span class="ttl">' + title + '</span></div><div class="widget-body"></div></div>';
    return el.querySelector('.widget-body');
  }
  function slider(id, label, min, max, step, val) {
    return '<label class="ctl" for="' + id + '"><span>' + label + '</span><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"><output id="' + id + '-o">' + val + '</output></label>';
  }
  function bindAll(body, fn) {
    body.querySelectorAll('input,select').forEach(inp => {
      inp.addEventListener('input', () => {
        const o = body.querySelector('#' + CSS.escape(inp.id) + '-o');
        if (o) o.textContent = inp.value;
        fn();
      });
    });
  }
  const val = (body, id) => parseFloat(body.querySelector('#' + id).value);

  /* SVG plot helper with linear scales. */
  function plot(o) {
    const w = o.w || 520, h = o.h || 300, m = { l: 48, r: 16, t: 14, b: 38 };
    const X = x => m.l + (x - o.x0) / (o.x1 - o.x0) * (w - m.l - m.r);
    const Y = y => h - m.b - (y - o.y0) / (o.y1 - o.y0) * (h - m.t - m.b);
    let g = '';
    const xt = o.xt || ticks(o.x0, o.x1), yt = o.yt || ticks(o.y0, o.y1);
    xt.forEach(t => { g += '<line class="grid" x1="' + X(t) + '" x2="' + X(t) + '" y1="' + Y(o.y0) + '" y2="' + Y(o.y1) + '"/><text x="' + X(t) + '" y="' + (h - m.b + 15) + '" text-anchor="middle">' + fmt(t, 2) + '</text>'; });
    yt.forEach(t => { g += '<line class="grid" x1="' + X(o.x0) + '" x2="' + X(o.x1) + '" y1="' + Y(t) + '" y2="' + Y(t) + '"/><text x="' + (m.l - 6) + '" y="' + (Y(t) + 4) + '" text-anchor="end">' + fmt(t, 2) + '</text>'; });
    g += '<line class="axis" x1="' + X(o.x0) + '" x2="' + X(o.x1) + '" y1="' + Y(o.y0) + '" y2="' + Y(o.y0) + '"/><line class="axis" x1="' + X(o.x0) + '" x2="' + X(o.x0) + '" y1="' + Y(o.y0) + '" y2="' + Y(o.y1) + '"/>';
    g += '<text x="' + (w - m.r) + '" y="' + (h - 4) + '" text-anchor="end">' + (o.xl || '') + '</text><text x="12" y="' + (m.t + 2) + '" text-anchor="start" transform="rotate(0)">' + (o.yl || '') + '</text>';
    const P = {
      X, Y, w, h,
      line: (pts, cls) => '<polyline class="' + cls + '" points="' + pts.filter(p => isFinite(p[1])).map(p => X(p[0]).toFixed(1) + ',' + Y(Math.max(o.y0 - (o.y1 - o.y0) * 0.02, Math.min(o.y1 + (o.y1 - o.y0) * 0.02, p[1]))).toFixed(1)).join(' ') + '"/>',
      fn: (f, cls, a, b, n) => { const pts = []; a = a == null ? o.x0 : a; b = b == null ? o.x1 : b; n = n || 120; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; pts.push([x, f(x)]); } return P.line(pts, cls); },
      dot: (x, y, cls, r) => '<circle class="' + (cls || 'dot') + '" cx="' + X(x) + '" cy="' + Y(y) + '" r="' + (r || 5) + '"/>',
      text: (x, y, t, cls, anchor) => '<text class="' + (cls || 'ink') + '" x="' + X(x) + '" y="' + Y(y) + '" text-anchor="' + (anchor || 'start') + '">' + t + '</text>',
      poly: (pts, cls) => '<polygon class="' + cls + '" points="' + pts.map(p => X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join(' ') + '"/>',
      svg: inner => '<svg class="plot" viewBox="0 0 ' + w + ' ' + h + '" role="img">' + g + inner + '</svg>',
    };
    return P;
  }
  function ticks(a, b) {
    const span = b - a, raw = span / 5, p = Math.pow(10, Math.floor(Math.log10(raw)));
    const st = [1, 2, 2.5, 5, 10].map(k => k * p).find(s => s >= raw);
    const out = []; for (let t = Math.ceil(a / st) * st; t <= b + 1e-9; t += st) out.push(+t.toFixed(10)); return out;
  }

  /* ---------- game math ---------- */
  function pureNE(A, B) {
    const m = A.length, n = A[0].length, out = [];
    for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {
      const best1 = Math.max(...A.map(r => r[j])), best2 = Math.max(...B[i]);
      if (A[i][j] === best1 && B[i][j] === best2) out.push([i, j]);
    }
    return out;
  }
  function solveLin(M, v) {
    const n = v.length, a = M.map((r, i) => r.concat([v[i]]));
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(a[r][c]) > Math.abs(a[p][c])) p = r;
      if (Math.abs(a[p][c]) < 1e-12) return null;
      [a[c], a[p]] = [a[p], a[c]];
      for (let r = 0; r < n; r++) if (r !== c) { const f = a[r][c] / a[c][c]; for (let k = c; k <= n; k++) a[r][k] -= f * a[c][k]; }
    }
    return a.map((r, i) => r[n] / r[i]);
  }
  function subsets(n, k) { const out = []; (function rec(s, cur) { if (cur.length === k) { out.push(cur.slice()); return; } for (let i = s; i < n; i++) { cur.push(i); rec(i + 1, cur); cur.pop(); } })(0, []); return out; }
  /* Solve M x = b exactly (square), or by least squares / minimum norm otherwise; caller verifies. */
  function solveAny(M, b) {
    const r = M.length, c = M[0].length;
    if (r === c) return solveLin(M, b);
    const T = A => A[0].map((_, j) => A.map(row => row[j]));
    const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
    const Mt = T(M), bc = b.map(x => [x]);
    if (r < c) { const y = solveLin(mul(M, Mt), b); if (!y) return null; return mul(Mt, y.map(x => [x])).map(x => x[0]); }
    const MtM = mul(Mt, M), Mtb = mul(Mt, bc).map(x => x[0]); return solveLin(MtM, Mtb);
  }
  /* Support enumeration over all support pairs; handles degenerate games approximately. */
  function mixedNE(A, B) {
    const m = A.length, n = A[0].length, res = [];
    for (let k1 = 1; k1 <= m; k1++) for (let k2 = 1; k2 <= n; k2++) {
      for (const S1 of subsets(m, k1)) for (const S2 of subsets(n, k2)) {
        const M1 = [], v1 = [];
        S1.forEach(i => { M1.push(S2.map(j => A[i][j]).concat([-1])); v1.push(0); });
        M1.push(S2.map(() => 1).concat([0])); v1.push(1);
        const sq = solveAny(M1, v1); if (!sq) continue;
        const M2 = [], v2 = [];
        S2.forEach(j => { M2.push(S1.map(i => B[i][j]).concat([-1])); v2.push(0); });
        M2.push(S1.map(() => 1).concat([0])); v2.push(1);
        const sp = solveAny(M2, v2); if (!sp) continue;
        const q = Array(n).fill(0), p = Array(m).fill(0);
        S2.forEach((j, t) => { q[j] = sq[t]; }); S1.forEach((i, t) => { p[i] = sp[t]; });
        if (q.some(x => x < -1e-7) || p.some(x => x < -1e-7)) continue;
        if (Math.abs(q.reduce((a, b) => a + b, 0) - 1) > 1e-6 || Math.abs(p.reduce((a, b) => a + b, 0) - 1) > 1e-6) continue;
        const u1 = A.map(r => r.reduce((s, a, j) => s + a * q[j], 0)), u2 = B[0].map((_, j) => B.reduce((s, r, i) => s + r[j] * p[i], 0));
        const v1s = Math.max(...u1), v2s = Math.max(...u2);
        if (p.some((x, i) => x > 1e-7 && u1[i] < v1s - 1e-7) || q.some((x, j) => x > 1e-7 && u2[j] < v2s - 1e-7)) continue;
        const key = p.map(x => x.toFixed(5)).join() + '|' + q.map(x => x.toFixed(5)).join();
        if (!res.some(r => r.key === key)) res.push({ p: p.map(x => Math.max(0, x)), q: q.map(x => Math.max(0, x)), v1: v1s, v2: v2s, key, cont: k1 !== k2 });
      }
    }
    return res;
  }
  /* Is pure strategy `idx` dominated by a mixture of the other listed strategies? rowsPay[k] = payoff vector of strategy k. */
  function mixDominated(rowsPay, idx, others) {
    const target = rowsPay[idx], best = { strict: null, weak: null };
    const test = w => {
      const mixv = target.map((_, c) => others.reduce((s, k, t) => s + w[t] * rowsPay[k][c], 0));
      const ge = mixv.every((x, c) => x >= target[c] - 1e-9), gt = mixv.every((x, c) => x > target[c] + 1e-9), some = mixv.some((x, c) => x > target[c] + 1e-9);
      if (gt && !best.strict) best.strict = w.slice(); else if (ge && some && !best.weak) best.weak = w.slice();
    };
    if (others.length === 1) test([1]);
    else if (others.length === 2) for (let a = 0; a <= 100; a++) test([a / 100, 1 - a / 100]);
    else if (others.length === 3) for (let a = 0; a <= 50; a++) for (let b = 0; a + b <= 50; b++) test([a / 50, b / 50, 1 - (a + b) / 50]);
    return best;
  }

  /* ---------- matrix lab ---------- */
  const PRESETS = {
    pd: { name: "Prisoner's Dilemma (L2)", r: ['N', 'C'], c: ['N', 'C'], A: [[-1, -9], [0, -6]], B: [[-1, 0], [-9, -6]] },
    bos: { name: 'Battle of the Sexes (L4)', r: ['Soccer', 'Opera'], c: ['Soccer', 'Opera'], A: [[2, 0], [0, 1]], B: [[1, 0], [0, 2]] },
    mp: { name: 'Matching pennies (L4)', r: ['Heads', 'Tails'], c: ['Heads', 'Tails'], A: [[-1, 1], [1, -1]], B: [[1, -1], [-1, 1]] },
    chicken: { name: 'Chicken a=-10, b=2, d=6 (L5)', r: ['T', 'C'], c: ['T', 'C'], A: [[-10, 6], [0, 2]], B: [[-10, 0], [6, 2]] },
    pareto: { name: 'Pareto vs. risk dominance (L5)', r: ['O', 'U'], c: ['L', 'R'], A: [[9, 0], [8, 7]], B: [[9, 8], [0, 7]] },
    exam13: { name: 'Adam and Eva (Dec 2013 exam)', r: ['Top', 'Bottom'], c: ['Left', 'Right'], A: [[8, 0], [7, 6]], B: [[8, 7], [0, 6]] },
    tremble: { name: 'Trembling hand (L5)', r: ['O', 'U'], c: ['L', 'R'], A: [[5, 0], [5, 1]], B: [[5, 5], [0, 1]] },
    stag: { name: 'Joint project, variant b (exercise)', r: ['Work', 'Goof'], c: ['Work', 'Goof'], A: [[2, -1], [1, 0]], B: [[2, 1], [-1, 0]] },
    l2dom: { name: 'IESDS example (L2)', r: ['Top', 'Bottom'], c: ['Left', 'Middle', 'Right'], A: [[1, 1, 0], [0, 0, 2]], B: [[0, 2, 1], [3, 1, 0]] },
    l3: { name: 'Nash example (L3)', r: ['Top', 'Middle', 'Bottom'], c: ['Left', 'Middle', 'Right'], A: [[0, 4, 5], [4, 0, 5], [3, 3, 6]], B: [[4, 0, 3], [0, 4, 3], [5, 5, 6]] },
    ex2: { name: 'Iterated elimination (WS24 Ex 2)', r: ['U', 'M', 'D'], c: ['L', 'C', 'R'], A: [[6, 2, 8], [8, 4, 9], [8, 4, 6]], B: [[8, 6, 2], [2, 4, 5], [10, 6, 7]] },
    pop: { name: 'Popsicle stands, 3 towers (WS26 Ex 1)', r: ['T1', 'T2', 'T3'], c: ['T1', 'T2', 'T3'], A: [[50, 20, 30], [80, 50, 40], [70, 60, 50]], B: [[50, 80, 70], [20, 50, 60], [30, 40, 50]] },
    odd: { name: 'Odd couple: Felix and Oscar (exercise)', r: ['3', '6', '9'], c: ['3', '6', '9'], A: [[-13, -1, 7], [-4, 4, 4], [1, 1, 1]], B: [[-8, -4, -4], [-1, -1, -4], [2, -1, -4]] },
    decl: { name: 'Declining industry (WS24 Ex 3)', r: ['E', 'T', 'N'], c: ['E', 'T', 'N'], A: [[0, 0, 0], [2, -1, -1], [4, 1, -2]], B: [[0, 2, 4], [0, -1, 1], [0, -1, -2]] },
    pen: { name: 'Penalty 3x3 (Dec 2013 exam)', r: ['Left', 'Middle', 'Right'], c: ['Left', 'Middle', 'Right'], A: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], B: [[0, 1, 1], [1, 0, 1], [1, 1, 0]] },
    mafia: { name: 'Mafia PD without punishment (WS23 Ex 1)', r: ['Q', 'F'], c: ['Q', 'F'], A: [[-2, -5], [-1, -4]], B: [[-2, -1], [-5, -4]] },
    monitor: { name: 'Monitoring: work or shirk (exercise)', r: ['W', 'S'], c: ['M', 'I'], A: [[1, 1], [0, 2]], B: [[1, 2], [2, 1]] },
    safe: { name: 'Playing it safe, subgame after R (WS24 Ex 4)', r: ['C', 'D'], c: ['A', 'B'], A: [[8, 0], [6, 2]], B: [[0, 2], [6, 2]] },
    safeNF: { name: 'Playing it safe, whole game (WS24 Ex 4)', r: ['SC', 'SD', 'RC', 'RD'], c: ['A', 'B'], A: [[3, 3], [3, 3], [8, 0], [6, 2]], B: [[3, 3], [3, 3], [0, 2], [6, 2]] },
    guarG: { name: 'Price guarantee, subgame after G (exercise)', r: ['pH', 'pL'], c: ['pH', 'pL'], A: [[3, 1], [2, 1]], B: [[2, 1], [0, 1]] },
    grim3: { name: 'Grim trigger stage game (exercise)', r: ['T', 'M', 'B'], c: ['L', 'C', 'R'], A: [[6, -1, -2], [7, 4, -1], [8, 5, 0]], B: [[6, 7, 8], [-1, 4, 5], [-2, -1, 0]] },
    pbe6: { name: 'PBE game, normal form (WS23 Ex 6)', r: ['L', 'M', 'R'], c: ['a', 'b', 'c'], A: [[2, 2, 2], [3, 2, 5], [4, 4, 5]], B: [[2, 2, 2], [8, 4, 5], [1, 2, 0]] },
    iesds3: { name: 'IESDS in three rounds (extra practice L2)', r: ['T', 'M', 'B'], c: ['L', 'C', 'R'], A: [[4, 5, 6], [2, 8, 3], [3, 9, 2]], B: [[3, 1, 2], [1, 4, 6], [0, 6, 8]] },
    audit: { name: 'Tax audits (extra practice L4)', r: ['C', 'H'], c: ['A', 'N'], A: [[-20, 10], [0, 0]], B: [[15, -10], [-5, 0]] },
    stag2: { name: 'Stag hunt 10/7/6 (extra practice L5)', r: ['S', 'H'], c: ['S', 'H'], A: [[10, 0], [7, 6]], B: [[10, 7], [0, 6]] },
    l7simple: { name: 'Normal form of the L7 tree', r: ['L', 'R'], c: ['ll', 'lr', 'rl', 'rr'], A: [[3, 3, 1, 1], [2, 0, 2, 0]], B: [[1, 1, 2, 2], [1, 0, 1, 0]] },
  };
  GT.PRESETS = PRESETS;

  W['matrix-lab'] = function (el) {
    const id = 'mx' + (uid++);
    const body = frame(el, 'Matrix lab: best responses, IESDS, pure and mixed Nash equilibria', 'Game solver');
    let g = JSON.parse(JSON.stringify(PRESETS[el.dataset.preset] || PRESETS.pd));
    let dead = { r: new Set(), c: new Set() };
    body.innerHTML = '<div class="row"><label for="' + id + 'p">Preset</label><select id="' + id + 'p">' + Object.keys(PRESETS).map(k => '<option value="' + k + '">' + PRESETS[k].name + '</option>').join('') + '</select>' +
      '<label for="' + id + 'm">Rows</label><select id="' + id + 'm"><option>2</option><option>3</option><option>4</option></select><label for="' + id + 'n">Columns</label><select id="' + id + 'n"><option>2</option><option>3</option><option>4</option></select></div>' +
      '<div class="mxwrap" id="' + id + 'g"></div>' +
      '<div class="row"><button class="btn sm" data-a="ne">Best responses and pure NE</button><button class="btn sm" data-a="step">IESDS: next round</button><button class="btn sm ghost" data-a="all">IESDS: run to end</button><button class="btn sm ghost" data-a="weak">Weak elimination round</button><button class="btn sm" data-a="mixed">Mixed NE</button><button class="btn sm ghost" data-a="mixdom">Dominated by a mixture?</button><button class="btn sm ghost" data-a="reset">Reset</button></div>' +
      '<div class="log" id="' + id + 'l"></div><p class="small muted">Edit any payoff (blue: row player, orange: column player). IESDS compares pure strategies, as in the lecture; use "Dominated by a mixture?" to test domination by mixed strategies (grid search). The mixed-NE search enumerates all support pairs; in degenerate games with a continuum of equilibria it reports representative points.</p>';
    const sel = body.querySelector('#' + id + 'p'); sel.value = el.dataset.preset || 'pd';
    const gridEl = body.querySelector('#' + id + 'g'), log = body.querySelector('#' + id + 'l');
    const say = (h, reset) => { if (reset) log.innerHTML = ''; log.insertAdjacentHTML('beforeend', '<div>' + h + '</div>'); };
    function draw(hl) {
      hl = hl || {};
      const m = g.A.length, n = g.A[0].length;
      body.querySelector('#' + id + 'm').value = m; body.querySelector('#' + id + 'n').value = n;
      let h = '<table class="edit-mx"><tr><th></th>' + g.c.map((c, j) => '<th><input class="lab" data-c="' + j + '" value="' + esc(c) + '" aria-label="column label"></th>').join('') + '</tr>';
      for (let i = 0; i < m; i++) {
        h += '<tr><th><input class="lab" data-r="' + i + '" value="' + esc(g.r[i]) + '" aria-label="row label"></th>';
        for (let j = 0; j < n; j++) {
          const isNE = hl.ne && hl.ne.some(x => x[0] === i && x[1] === j);
          const d = dead.r.has(i) || dead.c.has(j);
          h += '<td class="' + (isNE ? 'ne ' : '') + (d ? 'dead' : '') + '"><input class="i1' + (hl.br1 && hl.br1[i][j] ? ' br' : '') + '" data-i="' + i + '" data-j="' + j + '" data-p="A" value="' + g.A[i][j] + '" aria-label="row payoff"> <input class="i2' + (hl.br2 && hl.br2[i][j] ? ' br' : '') + '" data-i="' + i + '" data-j="' + j + '" data-p="B" value="' + g.B[i][j] + '" aria-label="column payoff"></td>';
        }
        h += '</tr>';
      }
      gridEl.innerHTML = h + '</table>';
      gridEl.querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => {
        if (inp.dataset.p) { const v = parseFloat(inp.value); g[inp.dataset.p][+inp.dataset.i][+inp.dataset.j] = isNaN(v) ? 0 : v; }
        else if (inp.dataset.r != null) g.r[+inp.dataset.r] = inp.value; else g.c[+inp.dataset.c] = inp.value;
        dead = { r: new Set(), c: new Set() }; draw();
      }));
    }
    function resize() {
      const m = +body.querySelector('#' + id + 'm').value, n = +body.querySelector('#' + id + 'n').value;
      const fix = (M) => { const out = []; for (let i = 0; i < m; i++) { out.push([]); for (let j = 0; j < n; j++) out[i].push(M[i] && M[i][j] != null ? M[i][j] : 0); } return out; };
      g.A = fix(g.A); g.B = fix(g.B);
      for (let i = 0; i < m; i++) g.r[i] = g.r[i] || 'R' + (i + 1); g.r.length = m;
      for (let j = 0; j < n; j++) g.c[j] = g.c[j] || 'C' + (j + 1); g.c.length = n;
      dead = { r: new Set(), c: new Set() }; draw(); log.innerHTML = '';
    }
    function bestResp() {
      const m = g.A.length, n = g.A[0].length;
      const br1 = g.A.map(() => Array(n).fill(false)), br2 = g.A.map(() => Array(n).fill(false));
      for (let j = 0; j < n; j++) { const mx = Math.max(...g.A.map(r => r[j])); for (let i = 0; i < m; i++) br1[i][j] = g.A[i][j] === mx; }
      for (let i = 0; i < m; i++) { const mx = Math.max(...g.B[i]); for (let j = 0; j < n; j++) br2[i][j] = g.B[i][j] === mx; }
      return { br1, br2, ne: pureNE(g.A, g.B) };
    }
    function elimRound(weak) {
      const R = [...Array(g.A.length).keys()].filter(i => !dead.r.has(i)), C = [...Array(g.A[0].length).keys()].filter(j => !dead.c.has(j));
      const dom = (u, v) => weak ? (u.every((x, k) => x >= v[k]) && u.some((x, k) => x > v[k])) : u.every((x, k) => x > v[k]);
      const kr = [], kc = [], why = [];
      R.forEach(i => { const by = R.find(i2 => i2 !== i && dom(C.map(j => g.A[i2][j]), C.map(j => g.A[i][j]))); if (by != null) { kr.push(i); why.push('Row player: <strong>' + esc(g.r[i]) + '</strong> is ' + (weak ? 'weakly' : 'strictly') + ' dominated by ' + esc(g.r[by]) + ' (' + C.map(j => g.A[by][j] + ' vs ' + g.A[i][j]).join(', ') + ').'); } });
      C.forEach(j => { const by = C.find(j2 => j2 !== j && dom(R.map(i => g.B[i][j2]), R.map(i => g.B[i][j]))); if (by != null) { kc.push(j); why.push('Column player: <strong>' + esc(g.c[j]) + '</strong> is ' + (weak ? 'weakly' : 'strictly') + ' dominated by ' + esc(g.c[by]) + ' (' + R.map(i => g.B[i][by] + ' vs ' + g.B[i][j]).join(', ') + ').'); } });
      kr.forEach(i => dead.r.add(i)); kc.forEach(j => dead.c.add(j));
      return why;
    }
    function remaining() {
      const R = [...Array(g.A.length).keys()].filter(i => !dead.r.has(i)).map(i => g.r[i]), C = [...Array(g.A[0].length).keys()].filter(j => !dead.c.has(j)).map(j => g.c[j]);
      return '{' + R.map(esc).join(', ') + '} × {' + C.map(esc).join(', ') + '}';
    }
    let round = 0;
    body.querySelectorAll('button[data-a]').forEach(b => b.addEventListener('click', () => {
      const a = b.dataset.a;
      if (a === 'reset') { dead = { r: new Set(), c: new Set() }; round = 0; draw(); log.innerHTML = ''; return; }
      if (a === 'ne') {
        const r = bestResp(); draw(r);
        say(r.ne.length ? 'Pure Nash equilibria (shaded): ' + r.ne.map(([i, j]) => '(' + esc(g.r[i]) + ', ' + esc(g.c[j]) + ') with payoffs (' + g.A[i][j] + ', ' + g.B[i][j] + ')').join('; ') : 'No pure-strategy Nash equilibrium: no cell where both payoffs are best responses. Try "Mixed NE".', true);
        say('Bold underlined numbers are best responses: in each column the highest blue number, in each row the highest orange number.');
        if (g.A.length === 2 && g.A[0].length === 2 && r.ne.length === 2) {
          const [e1, e2] = r.ne;
          const loss = ([i, j]) => (g.A[i][j] - g.A[1 - i][j]) * (g.B[i][j] - g.B[i][1 - j]);
          const l1 = loss(e1), l2 = loss(e2);
          const name = e => '(' + esc(g.r[e[0]]) + ', ' + esc(g.c[e[1]]) + ')';
          say('Two pure NE. Pareto comparison: ' + (g.A[e1[0]][e1[1]] >= g.A[e2[0]][e2[1]] && g.B[e1[0]][e1[1]] >= g.B[e2[0]][e2[1]] ? name(e1) + ' Pareto-dominates.' : g.A[e2[0]][e2[1]] >= g.A[e1[0]][e1[1]] && g.B[e2[0]][e2[1]] >= g.B[e1[0]][e1[1]] ? name(e2) + ' Pareto-dominates.' : 'neither Pareto-dominates the other.') + ' Risk dominance (product of deviation losses): ' + name(e1) + ' ' + fmt(l1) + ', ' + name(e2) + ' ' + fmt(l2) + (l1 !== l2 ? ': ' + name(l1 > l2 ? e1 : e2) + ' is risk dominant.' : ': tie.'));
        }
        return;
      }
      if (a === 'step' || a === 'weak') {
        if (round === 0) log.innerHTML = '';
        const why = elimRound(a === 'weak'); round++;
        draw();
        say('<strong>Round ' + round + (a === 'weak' ? ' (weak)' : '') + ':</strong> ' + (why.length ? why.join(' ') : 'nothing ' + (a === 'weak' ? 'weakly' : 'strictly') + ' dominated. Elimination stops.') + ' Remaining: ' + remaining());
        if (a === 'weak' && why.length) say('<span class="small muted">Caution: weak elimination can lose Nash equilibria and depends on the order (Lecture 5).</span>');
        return;
      }
      if (a === 'all') {
        log.innerHTML = ''; dead = { r: new Set(), c: new Set() }; round = 0;
        for (let k = 0; k < 10; k++) { const why = elimRound(false); round++; if (!why.length) { say('<strong>Round ' + round + ':</strong> nothing strictly dominated. Stop.'); break; } say('<strong>Round ' + round + ':</strong> ' + why.join(' ')); }
        draw(); say('Survivors of IESDS: ' + remaining()); return;
      }
      if (a === 'mixdom') {
        const m = g.A.length, n = g.A[0].length;
        say('Domination by mixtures of the other pure strategies:', true);
        const rowsPay = g.A.map(r => r.slice()), colsPay = g.B[0].map((_, j) => g.B.map(r => r[j]));
        let any = false;
        for (let i = 0; i < m; i++) { const others = [...Array(m).keys()].filter(k => k !== i); if (others.length > 3) continue; const r = mixDominated(rowsPay, i, others); const w = r.strict || r.weak; if (w) { any = true; say('Row <strong>' + esc(g.r[i]) + '</strong> is ' + (r.strict ? 'strictly' : 'weakly') + ' dominated by ' + others.map((k, t) => frac(w[t]) + '·' + esc(g.r[k])).filter((_, t) => w[t] > 0).join(' + ') + '.'); } }
        for (let j = 0; j < n; j++) { const others = [...Array(n).keys()].filter(k => k !== j); if (others.length > 3) continue; const r = mixDominated(colsPay, j, others); const w = r.strict || r.weak; if (w) { any = true; say('Column <strong>' + esc(g.c[j]) + '</strong> is ' + (r.strict ? 'strictly' : 'weakly') + ' dominated by ' + others.map((k, t) => frac(w[t]) + '·' + esc(g.c[k])).filter((_, t) => w[t] > 0).join(' + ') + '.'); } }
        if (!any) say('No strategy is dominated by any mixture of the others (checked on a fine grid).');
        return;
      }
      if (a === 'mixed') {
        const eq = mixedNE(g.A, g.B); draw(bestResp());
        say('All Nash equilibria found by support enumeration:', true);
        eq.forEach(e => say((e.cont ? '<span class="small muted">(one point of a continuum)</span> ' : '') + 'Row player (' + g.r.map((r, i) => esc(r) + ': ' + frac(e.p[i])).join(', ') + '); column player (' + g.c.map((c, j) => esc(c) + ': ' + frac(e.q[j])).join(', ') + '). Expected payoffs (' + fmt(e.v1) + ', ' + fmt(e.v2) + ').'));
        if (!eq.length) say('None found (numerical problem); check the game for exact ties.');
        if (g.A.length === 2 && g.A[0].length === 2) say('<span class="small muted">2x2 check: the row player\'s mix makes the column player indifferent, and vice versa.</span>');
      }
    }));
    sel.addEventListener('change', () => { g = JSON.parse(JSON.stringify(PRESETS[sel.value])); dead = { r: new Set(), c: new Set() }; round = 0; log.innerHTML = ''; draw(); });
    body.querySelector('#' + id + 'm').addEventListener('change', resize);
    body.querySelector('#' + id + 'n').addEventListener('change', resize);
    draw();
  };

  /* ---------- wine problem ---------- */
  W.wine = function (el) {
    const id = 'wi' + (uid++);
    const body = frame(el, 'The wine problem: payoff θα - 4α² for different body types', 'Visualisation');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 't', 'Your θ', 0.2, 6, 0.1, 1) + slider(id + 'a', 'Litres α', 0, 1.2, 0.01, 0.4) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const t = val(body, id + 't'), a = val(body, id + 'a'), f = (th, x) => th * x - 4 * x * x;
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>Payoff at α</dt><dd>' + fmt(f(t, a), 3) + '</dd><dt>Optimal α* = θ/8</dt><dd>' + fmt(t / 8, 3) + ' litres</dd><dt>Payoff at α*</dt><dd>' + fmt(t * t / 16, 3) + '</dd></dl><p class="small">' + (a > 0.75 ? '<span class="pill no">Dominated</span> Every type, even θ = 6, prefers 0.75 litres to this amount.' : a < 0.025 ? '<span class="pill no">Dominated</span> Every type, even θ = 0.2, prefers 0.025 litres.' : '<span class="pill ok">Optimal for θ = ' + fmt(8 * a, 2) + '</span>') + '</p>';
      const P = plot({ x0: 0, x1: 1.2, y0: -2, y1: 2.5, w: 420, h: 260, xl: 'α (litres)', yl: 'payoff' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.poly([[0.75, -2], [1.2, -2], [1.2, 2.5], [0.75, 2.5]], 'area2') + P.fn(x => f(0.2, x), 'cm') + P.fn(x => f(6, x), 'cm') + P.fn(x => f(t, x), 'c1') + P.dot(t / 8, t * t / 16, 'dot', 5) + P.dot(a, f(t, a), 'dot-a', 4) + P.text(0.98, 2.2, 'dominated', 'ink', 'middle')) + '<div class="legend"><span class="l1">your payoff</span><span class="lm">smallest and largest type</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- second-price auction proof ---------- */
  W['spa-proof'] = function (el) {
    const id = 'sp' + (uid++);
    const body = frame(el, 'Second-price auction: compare your bid with bidding your value', 'Proof explorer');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'v', 'Your value θ', 0, 200, 1, 153) + slider(id + 'b', 'Your bid b', 0, 200, 1, 120) + slider(id + 'c', 'Highest rival bid', 0, 200, 1, 140) + '</div><div class="readout" id="' + id + 'r"></div></div><div id="' + id + 's"></div>';
    function r() {
      const v = val(body, id + 'v'), b = val(body, id + 'b'), c = val(body, id + 'c');
      const pay = bid => bid > c ? v - c : bid === c ? (v - c) / 2 : 0;
      const pb = pay(b), pv = pay(v);
      const region = c < Math.min(b, v) ? 'L (below both bids)' : c > Math.max(b, v) ? 'H (above both bids)' : 'M (between your bid and your value)';
      body.querySelector('#' + id + 'r').innerHTML = '<dl class="kv"><dt>Rival bid region</dt><dd>' + region + '</dd><dt>Payoff bidding b = ' + b + '</dt><dd>' + fmt(pb) + (b > c ? ' (win, pay ' + c + ')' : b < c ? ' (lose)' : ' (tie)') + '</dd><dt>Payoff bidding θ = ' + v + '</dt><dd>' + fmt(pv) + (v > c ? ' (win, pay ' + c + ')' : v < c ? ' (lose)' : ' (tie)') + '</dd></dl><p>' +
        (pv > pb ? '<span class="pill ok">Bidding θ is strictly better here</span>' : pv === pb ? '<span class="pill mid">Same payoff</span>' : '<span class="pill no">b is better here</span>') + '</p><p class="small muted">Move the rival bid across all regions: bidding θ is never worse. The price you pay never depends on your own bid.</p>';
      const P = plot({ x0: 0, x1: 200, y0: -60, y1: 200, h: 220, xl: 'highest rival bid', yl: 'payoff' });
      const f = bid => x => x < bid ? v - x : 0;
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.fn(f(v), 'c1', 0, 200, 400) + P.fn(f(b), 'c2', 0, 200, 400) + P.dot(c, pv, 'dot-1') + P.dot(c, pb, 'dot-2')) + '<div class="legend"><span class="l1">bid θ</span><span class="l2">bid b</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- Cournot ---------- */
  W.cournot = function (el) {
    const id = 'co' + (uid++);
    const body = frame(el, 'Cournot duopoly: reaction functions, Nash equilibrium and cartel', 'Visualisation');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'a', 'Demand intercept a', 20, 120, 1, 60) + slider(id + 'c', 'Marginal cost c', 0, 40, 1, 12) + slider(id + 'b', 'Slope b', 0.5, 3, 0.1, 1) + slider(id + 'x', 'Rival output x₂', 0, 60, 0.5, 8) + '<div class="readout" id="' + id + 'r"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const a = val(body, id + 'a'), c = val(body, id + 'c'), b = val(body, id + 'b'), x2 = val(body, id + 'x');
      const k = (a - c) / b, xn = k / 3, xc = k / 4, br = Math.max(0, (a - c - b * x2) / (2 * b));
      const pN = a - b * 2 * xn, prN = (pN - c) * xn, pC = a - b * 2 * xc, prC = (pC - c) * xc;
      const dev = (a - c - b * xc) / (2 * b), prDev = (a - b * (dev + xc) - c) * dev;
      body.querySelector('#' + id + 'r').innerHTML = '<dl class="kv"><dt>Best response to x₂</dt><dd>R₁(' + fmt(x2, 1) + ') = ' + fmt(br, 2) + '</dd><dt>Nash x₁ = x₂</dt><dd>(a-c)/3b = ' + fmt(xn, 2) + '</dd><dt>Nash price, profit</dt><dd>' + fmt(pN, 2) + ', ' + fmt(prN, 2) + ' each</dd><dt>Cartel x₁ = x₂</dt><dd>(a-c)/4b = ' + fmt(xc, 2) + '</dd><dt>Cartel price, profit</dt><dd>' + fmt(pC, 2) + ', ' + fmt(prC, 2) + ' each</dd><dt>Deviation from cartel</dt><dd>x = ' + fmt(dev, 2) + ', profit ' + fmt(prDev, 2) + ' > ' + fmt(prC, 2) + '</dd></dl>';
      const M = k * 1.05;
      const P = plot({ x0: 0, x1: M, y0: 0, y1: M, w: 420, h: 380, xl: 'x₁', yl: 'x₂' });
      let s = P.line([[0, k / 2], [k, 0]], 'c1') + P.line([[k / 2, 0], [0, k]], 'c2') + P.line([[0, k / 2], [k / 2, 0]], 'cm');
      s += P.line([[x2 > k ? k : 0, x2], [M, x2]], 'cm') + P.dot(br, x2, 'dot-a', 4);
      s += P.dot(xn, xn, 'dot', 6) + P.text(xn + M * 0.02, xn + M * 0.03, 'Nash', 'ink') + P.dot(xc, xc, 'dot-a', 5) + P.text(xc - M * 0.02, xc - M * 0.06, 'cartel', 'lbla', 'end');
      s += P.text(M * 0.02, k / 2 + M * 0.02, 'R₁(x₂)', 'lbl1') + P.text(k / 2 + M * 0.02, M * 0.02, 'R₂(x₁)', 'lbl2');
      body.querySelector('#' + id + 's').innerHTML = P.svg(s) + '<div class="legend"><span class="l1">R₁: firm 1 reaction</span><span class="l2">R₂: firm 2 reaction</span><span class="lm">x₁ + x₂ = cartel output</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- best-response diagram for 2x2 ---------- */
  W['mixed-br'] = function (el) {
    const id = 'mb' + (uid++);
    const body = frame(el, 'Best-response correspondences in mixed strategies', 'Visualisation');
    const opts = { mp: 'Matching pennies', bos: 'Battle of the Sexes', chicken: 'Chicken', pareto: 'Pareto vs. risk', stag: 'Joint project (b)', exam13: 'Adam and Eva' };
    body.innerHTML = '<div class="row"><label for="' + id + 'p">Game</label><select id="' + id + 'p">' + Object.keys(opts).map(k => '<option value="' + k + '">' + opts[k] + '</option>').join('') + '</select></div><div class="wgrid"><div id="' + id + 's"></div><div class="controls">' + slider(id + 'q', 'q = Pr(col plays 1st)', 0, 1, 0.01, 0.3) + slider(id + 'r', 'r = Pr(row plays 1st)', 0, 1, 0.01, 0.7) + '<div class="readout" id="' + id + 'o"></div></div></div>';
    body.querySelector('#' + id + 'p').value = el.dataset.preset || 'mp';
    function r() {
      const g = PRESETS[body.querySelector('#' + id + 'p').value], A = g.A, B = g.B;
      const q = val(body, id + 'q'), rr = val(body, id + 'r');
      const u1a = A[0][0] * q + A[0][1] * (1 - q), u1b = A[1][0] * q + A[1][1] * (1 - q);
      const u2a = B[0][0] * rr + B[1][0] * (1 - rr), u2b = B[0][1] * rr + B[1][1] * (1 - rr);
      body.querySelector('#' + id + 'o').innerHTML = mx({ rows: g.r, cols: g.c, cells: A.map((row, i) => row.map((x, j) => x + ',' + B[i][j])) }) +
        '<p>Given q: ' + esc(g.r[0]) + ' gives <strong>' + fmt(u1a) + '</strong>, ' + esc(g.r[1]) + ' gives <strong>' + fmt(u1b) + '</strong> → row player\'s best response: ' + (Math.abs(u1a - u1b) < 1e-9 ? 'any r (indifferent)' : u1a > u1b ? 'r = 1' : 'r = 0') + '.</p>' +
        '<p>Given r: ' + esc(g.c[0]) + ' gives <strong>' + fmt(u2a) + '</strong>, ' + esc(g.c[1]) + ' gives <strong>' + fmt(u2b) + '</strong> → column player\'s best response: ' + (Math.abs(u2a - u2b) < 1e-9 ? 'any q (indifferent)' : u2a > u2b ? 'q = 1' : 'q = 0') + '.</p>';
      // indifference thresholds
      const d1 = (A[0][0] - A[1][0]) - (A[0][1] - A[1][1]); const qs = d1 !== 0 ? (A[1][1] - A[0][1]) / d1 : null;
      const d2 = (B[0][0] - B[0][1]) - (B[1][0] - B[1][1]); const rs = d2 !== 0 ? (B[1][1] - B[1][0]) / d2 : null;
      const P = plot({ x0: 0, x1: 1, y0: 0, y1: 1, w: 360, h: 340, xl: 'q', yl: 'r' });
      const br1 = qq => { const a = A[0][0] * qq + A[0][1] * (1 - qq), b = A[1][0] * qq + A[1][1] * (1 - qq); return a > b + 1e-12 ? 1 : a < b - 1e-12 ? 0 : 0.5; };
      const br2 = r0 => { const a = B[0][0] * r0 + B[1][0] * (1 - r0), b = B[0][1] * r0 + B[1][1] * (1 - r0); return a > b + 1e-12 ? 1 : a < b - 1e-12 ? 0 : 0.5; };
      let pts1 = [];
      if (qs != null && qs > 0 && qs < 1) { const lo = br1(qs / 2), hi = br1((1 + qs) / 2); pts1 = [[0, lo], [qs, lo], [qs, hi], [1, hi]]; } else { const v = br1(0.5); pts1 = [[0, v], [1, v]]; }
      let pts2 = [];
      if (rs != null && rs > 0 && rs < 1) { const lo = br2(rs / 2), hi = br2((1 + rs) / 2); pts2 = [[lo, 0], [lo, rs], [hi, rs], [hi, 1]]; } else { const v = br2(0.5); pts2 = [[v, 0], [v, 1]]; }
      let s = P.line(pts1, 'c1') + P.line(pts2, 'c2');
      mixedNE(A, B).forEach(e => { s += P.dot(e.q[0], e.p[0], 'dot', 6); });
      s += P.dot(q, rr, 'dot-a', 4);
      body.querySelector('#' + id + 's').innerHTML = P.svg(s) + '<div class="legend"><span class="l1">row player\'s best r(q)</span><span class="l2">column player\'s best q(r)</span><span class="lm">dots: all Nash equilibria</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- trembling hand ---------- */
  W.tremble = function (el) {
    const id = 'tr' + (uid++);
    const body = frame(el, 'Trembling hand: player 2\'s payoffs when player 1 errs with probability ε', 'Visualisation');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'e', 'Error probability ε', 0, 0.5, 0.01, 0.05) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const e = val(body, id + 'e'), L = 5 * (1 - e), R = 5 * (1 - e) + e;
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>v₂(L) = 5(1-ε)</dt><dd>' + fmt(L) + '</dd><dt>v₂(R) = 5(1-ε)+ε</dt><dd>' + fmt(R) + '</dd></dl><p>' + (e > 0 ? '<span class="pill ok">R strictly better</span> (O, L) does not survive the tremble.' : '<span class="pill mid">ε = 0: L and R equally good</span>') + '</p>';
      const P = plot({ x0: 0, x1: 0.5, y0: 2, y1: 5.2, w: 420, h: 240, xl: 'ε', yl: 'payoff' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.fn(x => 5 * (1 - x), 'c2') + P.fn(x => 5 * (1 - x) + x, 'c1') + P.dot(e, L, 'dot-2', 4) + P.dot(e, R, 'dot-1', 4)) + '<div class="legend"><span class="l1">v₂(R)</span><span class="l2">v₂(L)</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- bank run ---------- */
  W.bankrun = function (el) {
    const id = 'br' + (uid++);
    const body = frame(el, 'Bank run: old game vs. game with a priority claim', 'Simulation');
    body.innerHTML = '<div class="controls">' + slider(id + 'K', 'Project cost K', 50, 150, 1, 100) + slider(id + 'R', 'Return R', 100, 300, 1, 180) + slider(id + 'r', 'Liquidation value r', 26, 149, 1, 80) + '</div><div id="' + id + 'o"></div>';
    function r() {
      const K = val(body, id + 'K'), R = val(body, id + 'R'), rr = val(body, id + 'r');
      const ok = K / 2 < rr && rr < K && K < R;
      const f = x => fmt(x, 1);
      const old = [[f(rr / 2) + ',' + f(rr / 2), f(K / 2) + ',' + f(rr - K / 2)], [f(rr - K / 2) + ',' + f(K / 2), f(R / 2) + ',' + f(R / 2)]];
      const nw = [[f(K / 2) + ',' + f(rr - K / 2), f(K / 2) + ',' + f(rr - K / 2)], [f(K / 2) + ',' + f(rr - K / 2), f(R / 2) + ',' + f(R / 2)]];
      body.querySelector('#' + id + 'o').innerHTML = (ok ? '' : '<p><span class="pill no">Assumptions violated</span> The model needs K/2 &lt; r &lt; K &lt; R.</p>') +
        '<div class="wgrid"><div><p class="eyebrow">Old game</p>' + mx({ rows: ['rush', 'wait'], cols: ['rush', 'wait'], cells: old, br: true }) + '</div><div><p class="eyebrow">Player 1 has priority</p>' + mx({ rows: ['rush', 'wait'], cols: ['rush', 'wait'], cells: nw, br: true }) + '</div></div>' +
        '<p class="small">Shaded cells are Nash equilibria. In the new game rush is weakly dominated by wait for both players (compare rows for player 1, columns for player 2), so the run equilibrium is less plausible.</p>';
    }
    bindAll(body, r); r();
  };

  /* ---------- union / firm ---------- */
  W.union = function (el) {
    const id = 'un' + (uid++);
    const body = frame(el, 'Wages and employment: equilibrium vs. efficient bargains', 'Visualisation');
    body.innerHTML = '<p class="small muted">Illustrative functional forms: R(L) = 2A√L (so L*(w) = (A/w)²) and union utility U = (w - w̄)L, where w̄ is the reservation wage.</p><div class="wgrid"><div class="controls">' + slider(id + 'A', 'Productivity A', 5, 20, 0.5, 10) + slider(id + 'wb', 'Reservation wage w̄', 1, 5, 0.1, 2) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const A = val(body, id + 'A'), wb = val(body, id + 'wb');
      const w = 2 * wb, L = (A / w) ** 2, Rv = l => 2 * A * Math.sqrt(l), pi = Rv(L) - w * L, U = (w - wb) * L, Leff = (A / wb) ** 2;
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>Union sets</dt><dd>w* = 2w̄ = ' + fmt(w, 2) + '</dd><dt>Firm hires</dt><dd>L*(w*) = ' + fmt(L, 2) + '</dd><dt>Firm profit</dt><dd>' + fmt(pi, 2) + '</dd><dt>Union utility</dt><dd>' + fmt(U, 2) + '</dd><dt>Efficient employment</dt><dd>R′(L) = w̄ ⇒ L = ' + fmt(Leff, 2) + '</dd></dl><p class="small">The shaded lens contains (w, L) pairs that give the union more utility and the firm more profit: lower the wage, raise employment.</p>';
      const Lmax = Math.max(L * 3, Leff * 1.2), wmax = w * 2.2;
      const P = plot({ x0: 0, x1: Lmax, y0: 0, y1: wmax, w: 440, h: 340, xl: 'employment L', yl: 'wage w' });
      const iso = l => (Rv(l) - pi) / l, ic = l => wb + U / l;
      const lens = []; const n = 200;
      for (let i = 1; i <= n; i++) { const l = Lmax * i / n; if (iso(l) > ic(l)) lens.push([l, iso(l)]); }
      const lensLow = lens.map(p => [p[0], ic(p[0])]).reverse();
      let s = lens.length ? P.poly(lens.concat(lensLow), 'area') : '';
      s += P.fn(l => A / Math.sqrt(l), 'c2', Lmax * 0.01, Lmax) + P.fn(iso, 'cm', Lmax * 0.01, Lmax) + P.fn(ic, 'c1', Lmax * 0.01, Lmax);
      s += P.line([[Leff, 0], [Leff, wmax]], 'ca') + P.dot(L, w, 'dot', 6) + P.text(L, w + wmax * 0.04, '(L*, w*)', 'ink', 'middle');
      body.querySelector('#' + id + 's').innerHTML = P.svg(s) + '<div class="legend"><span class="l2">firm reaction L*(w)</span><span class="lm">iso-profit through equilibrium</span><span class="l1">union indifference curve</span><span class="la">efficient bargains (contract curve)</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- game trees ---------- */
  const P1 = new Set(['1', 'A', 'W', 'Firm', 'S']), P2 = new Set(['2', 'B', 'F', 'Worker', 'R']);
  const pIdx = p => P1.has(String(p)) ? 0 : P2.has(String(p)) ? 1 : String(p) === '3' ? 2 : -1;
  W.tree = function (el) {
    const spec = GT.trees[el.dataset.t]; if (!spec) { el.textContent = 'Missing tree ' + el.dataset.t; return; }
    const solve = el.dataset.solve === '1';
    const nodes = []; let leaves = 0, maxD = 0, hasInfo = false;
    (function walk(n, d, parent, act) {
      n._d = d; n._par = parent; n._act = act; nodes.push(n); maxD = Math.max(maxD, d);
      if (n.info) hasInfo = true;
      if (n.pay) { n._x = leaves++; return; }
      n.ch.forEach(c => walk(c[1], d + 1, n, c));
      n._x = n.ch.reduce((s, c) => s + c[1]._x, 0) / n.ch.length;
    })(spec, 0, null, null);
    const gap = 92, W0 = Math.max(leaves * gap, 300), H0 = (maxD) * 86 + 110;
    const X = n => 40 + n._x * gap + (W0 - leaves * gap) / 2, Y = n => 30 + n._d * 86;
    const canSolve = solve && !hasInfo;
    let solvedSet = new Set(), choice = new Map(), values = new Map();
    const order = nodes.filter(n => !n.pay).sort((a, b) => b._d - a._d);
    function valueOf(n) {
      if (n.pay) return n.pay.map(Number);
      if (values.has(n)) return values.get(n);
      if (n.p === 'N') {
        const probs = n.ch.map(c => { const s = String(c[2] != null ? c[2] : 1 / n.ch.length); return s.includes('/') ? s.split('/')[0] / s.split('/')[1] : +s; });
        const vs = n.ch.map(c => valueOf(c[1]));
        return vs[0].map((_, k) => vs.reduce((s, v, i) => s + v[k] * probs[i], 0));
      }
      const k = pIdx(n.p); let best = 0, bv = -Infinity;
      n.ch.forEach((c, i) => { const v = valueOf(c[1])[k]; if (v > bv + 1e-12) { bv = v; best = i; } });
      choice.set(n, best); const v = valueOf(n.ch[best][1]); values.set(n, v); return v;
    }
    if (canSolve) valueOf(spec);
    const id = 'tg' + (uid++);
    el.innerHTML = '<div class="widget"><div class="widget-head"><span class="tag">Game tree</span><span class="ttl">' + (canSolve ? 'Backward induction, step by step' : 'Extensive form') + '</span>' +
      (canSolve ? '<button class="btn sm" data-a="step">Solve next node</button><button class="btn sm ghost" data-a="all">Solve all</button><button class="btn sm ghost" data-a="reset">Reset</button>' : '') + '</div><div class="widget-body"><div class="treewrap" id="' + id + '"></div><div class="log" id="' + id + 'l"></div></div></div>';
    const holder = el.querySelector('#' + id), log = el.querySelector('#' + id + 'l');
    const fmtV = v => '(' + v.map(x => fmt(x, 3)).join(', ') + ')';
    function draw() {
      let s = '';
      // information sets
      const groups = {};
      nodes.forEach(n => { if (n.info) (groups[n.info] = groups[n.info] || []).push(n); });
      Object.values(groups).forEach(gr => { if (gr.length < 2) return; gr.sort((a, b) => a._x - b._x); for (let i = 1; i < gr.length; i++) { const a = gr[i - 1], b = gr[i]; const mx2 = (X(a) + X(b)) / 2, my = Math.max(Y(a), Y(b)) - 18 - Math.abs(X(b) - X(a)) * 0.12; s += '<path class="info" d="M' + X(a) + ',' + Y(a) + ' Q' + mx2 + ',' + my + ' ' + X(b) + ',' + Y(b) + '"/>'; } });
      nodes.forEach(n => {
        if (!n._par) return;
        const p = n._par, on = solvedSet.has(p) && p.ch[choice.get(p)] && p.ch[choice.get(p)][1] === n, off = solvedSet.has(p) && !on && p.p !== 'N';
        s += '<line class="edge' + (on ? ' on' : off ? ' off' : '') + '" x1="' + X(p) + '" y1="' + Y(p) + '" x2="' + X(n) + '" y2="' + Y(n) + '"/>';
        const lx = (X(p) + X(n)) / 2 + (X(n) < X(p) ? -8 : X(n) > X(p) ? 8 : 6), ly = (Y(p) + Y(n)) / 2;
        s += '<text class="act" x="' + lx + '" y="' + ly + '" text-anchor="' + (X(n) < X(p) ? 'end' : 'start') + '">' + esc(n._act[0]) + '</text>';
      });
      nodes.forEach(n => {
        if (n.pay) {
          s += '<circle class="term" cx="' + X(n) + '" cy="' + Y(n) + '" r="3"/>';
          n.pay.forEach((v, k) => { s += '<text class="pay' + (k + 1) + '" x="' + X(n) + '" y="' + (Y(n) + 18 + k * 14) + '" text-anchor="middle">' + esc(typeof v === 'number' ? fmt(v, 4) : v) + '</text>'; });
        } else {
          const k = pIdx(n.p), cls = n.p === 'N' ? 'nat' : ['p1', 'p2', 'p3'][k] || 'p1';
          s += '<circle class="node ' + cls + (solvedSet.has(n) ? ' solved' : '') + '" cx="' + X(n) + '" cy="' + Y(n) + '" r="7"/>';
          s += '<text class="pl" x="' + (X(n)) + '" y="' + (Y(n) - 12) + '" text-anchor="middle">' + esc(n.p === 'N' ? 'Nature' : n.p) + '</text>';
          if (n.belief) s += '<text class="act" x="' + (X(n) + 12) + '" y="' + (Y(n) + 4) + '">[' + esc(n.belief) + ']</text>';
          if (solvedSet.has(n)) s += '<text class="val" x="' + (X(n) + 12) + '" y="' + (Y(n) + (n.belief ? 18 : 4)) + '">' + fmtV(values.get(n)) + '</text>';
        }
      });
      holder.innerHTML = '<svg class="tree" style="max-width:' + Math.round((W0 + 80) * 0.95) + 'px;margin:0 auto" viewBox="0 0 ' + (W0 + 80) + ' ' + H0 + '" role="img">' + s + '</svg>';
      if (!canSolve && solve && hasInfo) log.innerHTML = '<div class="small">This tree has information sets with several nodes: solve the simultaneous subgame as a matrix first (see text).</div>';
    }
    function describe(n) {
      const c = n.ch[choice.get(n)], k = pIdx(n.p);
      const alts = n.ch.map(cc => esc(cc[0]) + ' → ' + fmt(valueOf(cc[1])[k], 3)).join(', ');
      const path = []; let p = n; while (p._par) { path.unshift(p._act[0]); p = p._par; }
      return 'Player ' + esc(n.p) + (path.length ? ' after ' + path.map(esc).join(', ') : ' at the root') + ': ' + alts + '. Chooses <strong>' + esc(c[0]) + '</strong>.';
    }
    if (canSolve) {
      el.querySelectorAll('button[data-a]').forEach(b => b.addEventListener('click', () => {
        if (b.dataset.a === 'reset') { solvedSet = new Set(); log.innerHTML = ''; draw(); return; }
        const todo = order.filter(n => n.p !== 'N' && !solvedSet.has(n) && n.ch.every(c => c[1].pay || c[1].p === 'N' || solvedSet.has(c[1])));
        const pick = b.dataset.a === 'all' ? order.filter(n => n.p !== 'N' && !solvedSet.has(n)) : todo.slice(0, 1);
        pick.forEach(n => { solvedSet.add(n); log.insertAdjacentHTML('beforeend', '<div>' + describe(n) + '</div>'); });
        if (order.filter(n => n.p !== 'N').every(n => solvedSet.has(n))) {
          log.insertAdjacentHTML('beforeend', '<div><strong>Done.</strong> Equilibrium payoffs ' + fmtV(values.get(spec)) + '. The thick path is the equilibrium path; dashed edges are choices not taken (they still belong to the strategies).</div>');
          pick.length = 0;
        }
        draw();
      }));
    }
    draw();
  };

  /* ---------- ultimatum with envy ---------- */
  W.ultimatum = function (el) {
    const id = 'ul' + (uid++);
    const body = frame(el, 'Ultimatum game with an envious responder (Fehr-Schmidt)', 'Calculator');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'a', 'Envy α of B', 0, 3, 0.05, 0.5) + slider(id + 'x', 'A demands x', 0, 100, 1, 70) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const a = val(body, id + 'a'), x = val(body, id + 'x');
      const uB = 100 - x - a * Math.max(x - (100 - x), 0), xs = 100 * (1 + a) / (1 + 2 * a);
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>B\'s utility if accepting</dt><dd>' + fmt(uB, 2) + '</dd><dt>B\'s utility if rejecting</dt><dd>0</dd><dt>B\'s response</dt><dd>' + (uB >= 0 ? 'accept' : 'reject') + '</dd><dt>Highest acceptable x*</dt><dd>100(1+α)/(1+2α) = ' + fmt(xs, 2) + '</dd></dl>';
      const P = plot({ x0: 0, x1: 100, y0: -100, y1: 100, w: 420, h: 260, xl: 'A\'s demand x', yl: 'u_B' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.line([[0, 0], [100, 0]], 'cm') + P.fn(xx => 100 - xx - a * Math.max(2 * xx - 100, 0), 'c2') + P.dot(xs, 0, 'dot', 5) + P.dot(x, uB, 'dot-a', 4)) + '<div class="legend"><span class="l2">B\'s utility from accepting</span><span class="lm">rejection = 0</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- Rubinstein ---------- */
  W.rubinstein = function (el) {
    const id = 'ru' + (uid++);
    const body = frame(el, 'Rubinstein bargaining: shares and the finite-horizon approximation', 'Calculator');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'a', 'δ_A (proposer)', 0.01, 0.99, 0.01, 0.9) + slider(id + 'b', 'δ_B', 0.01, 0.99, 0.01, 0.8) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 't"></div></div>';
    function r() {
      const dA = val(body, id + 'a'), dB = val(body, id + 'b'), Z = (1 - dB) / (1 - dA * dB);
      body.querySelector('#' + id + 'o').innerHTML = '<p class="big">Z = (1-δ_B)/(1-δ_Aδ_B) = ' + fmt(Z, 4) + '</p><div style="display:flex;height:22px;border-radius:6px;overflow:hidden"><div style="width:' + (Z * 100) + '%;background:var(--p1)"></div><div style="flex:1;background:var(--p2)"></div></div><p class="small">A gets ' + fmt(Z * 100, 1) + '%, B gets ' + fmt((1 - Z) * 100, 1) + '%. Equal δ = δ_A would give 1/(1+δ) = ' + fmt(1 / (1 + dA), 4) + '; with 3 players the proposer gets 1/(1+δ+δ²) = ' + fmt(1 / (1 + dA + dA * dA), 4) + '.</p>';
      let rows = '';
      for (let T = 1; T <= 12; T++) {
        let f = 1; for (let t = T - 1; t >= 1; t--) { const respB = t % 2 === 1; f = 1 - (respB ? dB : dA) * f; }
        rows += '<tr><td class="num">' + T + '</td><td class="num">' + fmt(f, 4) + '</td></tr>';
      }
      body.querySelector('#' + id + 't').innerHTML = '<div class="tbl"><table><tr><th class="num">Periods T</th><th class="num">A\'s share in period 1</th></tr>' + rows + '<tr><td class="num">∞</td><td class="num"><strong>' + fmt(Z, 4) + '</strong></td></tr></table></div><p class="small muted">Finite version (last proposer takes all) solved by backward induction; it converges to Z, which motivates the stationary argument.</p>';
    }
    bindAll(body, r); r();
  };

  /* ---------- Nash bargaining ---------- */
  W.nashbarg = function (el) {
    const id = 'nb' + (uid++);
    const body = frame(el, 'Nash bargaining solution (Rosemary and Jerry preset)', 'Calculator');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'v', 'Joint value v*', 10000, 80000, 500, 50000) + slider(id + 'dj', 'Jerry\'s d_J', 0, 40000, 500, 15000) + slider(id + 'dr', 'Rosemary\'s d_R', 0, 40000, 500, 10000) + slider(id + 'al', 'Jerry\'s power α', 0.05, 0.95, 0.05, 0.5) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const v = val(body, id + 'v'), dJ = val(body, id + 'dj'), dR = val(body, id + 'dr'), al = val(body, id + 'al');
      const S = v - dJ - dR, xJ = dJ + al * S, xR = dR + (1 - al) * S, t = xJ - 10000;
      body.querySelector('#' + id + 'o').innerHTML = S < 0 ? '<span class="pill no">No gains from trade: v* &lt; d_J + d_R</span>' : '<dl class="kv"><dt>Surplus v* - d_J - d_R</dt><dd>' + fmt(S, 0) + '</dd><dt>Jerry x_J</dt><dd>' + fmt(xJ, 0) + '</dd><dt>Rosemary x_R</dt><dd>' + fmt(xR, 0) + '</dd><dt>Salary t = x_J - 10,000</dt><dd>' + fmt(t, 0) + '</dd></dl>';
      const P = plot({ x0: 0, x1: v, y0: 0, y1: v, w: 380, h: 340, xl: 'x_J', yl: 'x_R' });
      let s = P.line([[0, v], [v, 0]], 'ca') + P.line([[dJ, dR], [dJ, v]], 'cm') + P.line([[dJ, dR], [v, dR]], 'cm') + P.dot(dJ, dR, 'dot', 4) + P.text(dJ, dR - v * 0.05, 'd', 'ink', 'middle');
      if (S > 0) {
        const N = Math.pow(xJ - dJ, al) * Math.pow(xR - dR, 1 - al);
        s += P.fn(x => x > dJ ? dR + Math.pow(N / Math.pow(x - dJ, al), 1 / (1 - al)) : NaN, 'c1', dJ + S * 0.05, v) + P.dot(xJ, xR, 'dot-1', 6);
      }
      body.querySelector('#' + id + 's').innerHTML = P.svg(s) + '<div class="legend"><span class="la">frontier x_J + x_R = v*</span><span class="l1">Nash product level curve</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- IIA ---------- */
  W.iia = function (el) {
    const id = 'ia' + (uid++);
    const body = frame(el, 'Independence of irrelevant alternatives', 'Visualisation');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'c', 'Remove all outcomes with x₁ above', 0.5, 1, 0.01, 0.75) + '<div class="readout small">Bargaining set v: x₁ + x₂ ≤ 1, disagreement point (0,0), solution (0.5, 0.5). Cutting off part of the set that does not contain the solution leaves the solution unchanged (Nash solution of the smaller set v′ is computed below).</div><div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const c = val(body, id + 'c');
      const best = Math.min(0.5, c);
      body.querySelector('#' + id + 'o').innerHTML = 'Nash solution of v′: (' + fmt(best, 2) + ', ' + fmt(1 - best, 2) + ')' + (c >= 0.5 ? ' <span class="pill ok">unchanged</span>' : '');
      const P = plot({ x0: 0, x1: 1, y0: 0, y1: 1, w: 340, h: 320, xl: 'x₁', yl: 'x₂' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.poly([[0, 0], [0, 1], [1, 0]], 'area2') + P.poly([[0, 0], [0, 1], [c, 1 - c], [c, 0]], 'area') + P.line([[0, 1], [1, 0]], 'cm') + P.dot(best, 1 - best, 'dot-1', 6)) + '<div class="legend"><span class="la">v′ (smaller set)</span><span class="lm">frontier of v</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- repeated PD ---------- */
  W.repeated = function (el) {
    const id = 'rp' + (uid++);
    const body = frame(el, 'Grim trigger: cooperate or deviate?', 'Calculator');
    body.innerHTML = '<div class="row"><label>T (temptation) <input type="number" id="' + id + 'T" value="5" step="0.5"></label><label>R (reward) <input type="number" id="' + id + 'R" value="4" step="0.5"></label><label>P (punishment) <input type="number" id="' + id + 'P" value="1" step="0.5"></label></div><div class="wgrid"><div class="controls">' + slider(id + 'd', 'Discount factor δ', 0, 0.98, 0.01, 0.5) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const T = val(body, id + 'T'), R = val(body, id + 'R'), Pn = val(body, id + 'P'), d = val(body, id + 'd');
      const coop = R / (1 - d), dev = T + d * Pn / (1 - d), crit = (T - R) / (T - Pn);
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>Cooperate: R/(1-δ)</dt><dd>' + fmt(coop, 3) + '</dd><dt>Deviate: T + δP/(1-δ)</dt><dd>' + fmt(dev, 3) + '</dd><dt>Critical δ = (T-R)/(T-P)</dt><dd>' + fmt(crit, 4) + '</dd></dl><p>' + (coop >= dev ? '<span class="pill ok">Grim trigger is an SPE</span>' : '<span class="pill no">Deviation pays</span>') + '</p>';
      const P = plot({ x0: 0, x1: 0.95, y0: 0, y1: Math.max(R / 0.05, T + 0.95 * Pn / 0.05) * 1.02, w: 420, h: 280, xl: 'δ', yl: 'present value' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.fn(x => R / (1 - x), 'c1') + P.fn(x => T + x * Pn / (1 - x), 'c2') + (crit > 0 && crit < 0.95 ? P.line([[crit, 0], [crit, R / (1 - crit)]], 'cm') : '') + P.dot(d, coop, 'dot-1', 4) + P.dot(d, dev, 'dot-2', 4)) + '<div class="legend"><span class="l1">cooperate forever</span><span class="l2">deviate once, then punished</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- folk theorem ---------- */
  W.folk = function (el) {
    const id = 'fk' + (uid++);
    const body = frame(el, 'Folk theorem: feasible and individually rational payoffs', 'Visualisation');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'a', 'Target average payoff x₁', 0, 5, 0.1, 3) + slider(id + 'b', 'Target average payoff x₂', 0, 5, 0.1, 3) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    const pts = [[1, 1], [5, 0], [4, 4], [0, 5]];
    function inside(x, y) { const poly = [[1, 1], [5, 0], [4, 4], [0, 5]]; let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c || Math.abs(x - 4) + Math.abs(y - 4) < 1e-9; }
    function r() {
      const x = val(body, id + 'a'), y = val(body, id + 'b');
      const feas = inside(x, y) || (x === 1 && y === 1), ir = x > 1 && y > 1;
      body.querySelector('#' + id + 'o').innerHTML = '<p>Stage game: (O,L)=(1,1), (O,R)=(5,0), (U,L)=(0,5), (U,R)=(4,4). Stage NE payoff e = (1,1).</p><p>Feasible: ' + (feas ? '<span class="pill ok">yes</span>' : '<span class="pill no">no</span>') + ' Above NE payoff for both: ' + (ir ? '<span class="pill ok">yes</span>' : '<span class="pill no">no</span>') + '</p><p>' + (feas && ir ? 'Supportable as an SPE average payoff for δ close enough to 1.' : 'Not covered by the Folk theorem.') + '</p>';
      const P = plot({ x0: 0, x1: 5.2, y0: 0, y1: 5.2, w: 360, h: 340, xl: 'x₁', yl: 'x₂' });
      let s = P.poly(pts, 'area2') + P.poly([[1, 1], [4.8, 1.05], [4, 4], [1.05, 4.8]], 'area');
      s += P.line([[1, 0], [1, 5.2]], 'cm') + P.line([[0, 1], [5.2, 1]], 'cm');
      pts.forEach(p => { s += P.dot(p[0], p[1], 'dot', 4); });
      s += P.text(1.1, 0.75, 'NE (1,1)', 'ink') + P.dot(x, y, 'dot-a', 6);
      body.querySelector('#' + id + 's').innerHTML = P.svg(s) + '<div class="legend"><span class="l1">feasible set (convex hull)</span><span class="la">feasible and above (1,1)</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- Bayesian entry ---------- */
  W['bayes-entry'] = function (el) {
    const id = 'be' + (uid++);
    const body = frame(el, 'Bayesian entry game: should player 2 enter?', 'Calculator');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'p', 'Belief p = Pr(high cost)', 0, 1, 0.01, 0.4) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const p = val(body, id + 'p'), e = 2 * p - 1;
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>High type plays</dt><dd>nI (dominant)</dd><dt>Low type plays</dt><dd>I (dominant)</dd><dt>E[π₂ | E] = p·1 + (1-p)(-1)</dt><dd>' + fmt(e, 3) + '</dd><dt>E[π₂ | nE]</dt><dd>0</dd></dl><p>' + (e > 0 ? '<span class="pill ok">Enter</span>' : e < 0 ? '<span class="pill no">Stay out</span>' : '<span class="pill mid">Indifferent</span>') + '</p>';
      const P = plot({ x0: 0, x1: 1, y0: -1, y1: 1, w: 380, h: 240, xl: 'p', yl: 'expected payoff' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.fn(x => 2 * x - 1, 'c2') + P.line([[0, 0], [1, 0]], 'cm') + P.dot(p, e, 'dot-a', 5)) + '<div class="legend"><span class="l2">enter</span><span class="lm">stay out</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- lemons / orange grove ---------- */
  W.lemons = function (el) {
    const id = 'le' + (uid++);
    const body = frame(el, 'Orange grove: which types sell at a given price?', 'Simulation');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'p', 'Price offered by player 2', 0, 36, 0.5, 24) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    const v1 = [10, 20, 30], v2 = [14, 24, 34], nm = ['L', 'M', 'H'];
    const buyer = p => v1.reduce((s, v, k) => s + (p >= v ? (v2[k] - p) / 3 : 0), 0);
    function r() {
      const p = val(body, id + 'p'), sellers = nm.filter((_, k) => p >= v1[k]);
      body.querySelector('#' + id + 'o').innerHTML = '<div class="tbl"><table><tr><th>Type</th><th class="num">Seller value</th><th class="num">Buyer value</th><th>Sells?</th></tr>' + nm.map((n, k) => '<tr><td>' + n + '</td><td class="num">' + v1[k] + '</td><td class="num">' + v2[k] + '</td><td>' + (p >= v1[k] ? '<span class="pill ok">yes</span>' : '<span class="pill no">no</span>') + '</td></tr>').join('') + '</table></div><p>Buyer\'s expected payoff: <strong>' + fmt(buyer(p), 3) + '</strong>' + (sellers.length ? ' (conditional on trade the average value is ' + fmt(sellers.reduce((s, n) => s + v2[nm.indexOf(n)], 0) / sellers.length, 2) + ')' : '') + '</p>';
      const P = plot({ x0: 0, x1: 36, y0: -10, y1: 3, w: 420, h: 260, xl: 'price', yl: 'buyer payoff' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.fn(buyer, 'c2', 0, 36, 360) + P.line([[0, 0], [36, 0]], 'cm') + P.dot(p, buyer(p), 'dot-a', 5)) + '<div class="legend"><span class="l2">buyer\'s expected payoff</span></div><p class="small muted">The buyer\'s payoff is non-negative only for prices in [10, 14]: only the lowest type trades.</p>';
    }
    bindAll(body, r); r();
  };

  /* ---------- first-price auction ---------- */
  W.fpa = function (el) {
    const id = 'fp' + (uid++), Vm = +(el.dataset.max || 1000);
    const body = frame(el, 'First-price auction: expected payoff of a bid, and revenue equivalence', 'Simulation');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'v', 'Your value v', 0, Vm, Vm / 100, Vm * 0.6) + slider(id + 'x', 'Your bid x', 0, Vm, Vm / 200, Vm * 0.2) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>' +
      '<div class="row"><label for="' + id + 'n">Bidders</label><select id="' + id + 'n"><option>2</option><option>3</option><option>4</option><option>5</option></select><button class="btn sm" id="' + id + 'go">Simulate 5,000 auctions</button></div><div class="readout" id="' + id + 'm">Revenue equivalence check: simulate first-price (equilibrium bids (n-1)/n · v) and second-price (truthful bids) auctions.</div>';
    function r() {
      const v = val(body, id + 'v'), x = val(body, id + 'x'), a = 0.5;
      const pw = Math.min(1, x / (a * Vm)), ep = Math.max(0, v - x) * pw;
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>Rival bids a·v_j with a = 0.5</dt><dd>Pr(win) = x/(' + Vm + '·a) = ' + fmt(pw, 3) + '</dd><dt>Expected payoff (v-x)·Pr(win)</dt><dd>' + fmt(ep, 2) + '</dd><dt>Optimal bid</dt><dd>v/2 = ' + fmt(v / 2, 2) + '</dd></dl>';
      const P = plot({ x0: 0, x1: Vm, y0: 0, y1: Math.max(1e-9, v * v / (4 * a * Vm)) * 1.15 + 1e-9, w: 420, h: 250, xl: 'bid x', yl: 'expected payoff' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.fn(xx => Math.max(0, v - xx) * Math.min(1, xx / (a * Vm)), 'c1', 0, Vm, 300) + P.line([[v / 2, 0], [v / 2, v * v / (4 * a * Vm)]], 'cm') + P.dot(x, ep, 'dot-a', 5)) + '<div class="legend"><span class="l1">(v - x) · x / (' + Vm + 'a)</span><span class="lm">maximum at x = v/2</span></div>';
    }
    body.querySelector('#' + id + 'go').addEventListener('click', () => {
      const n = +body.querySelector('#' + id + 'n').value, N = 5000; let f = 0, s2 = 0;
      for (let k = 0; k < N; k++) { const vs = Array.from({ length: n }, () => Math.random() * Vm).sort((a, b) => b - a); f += vs[0] * (n - 1) / n; s2 += vs[1]; }
      body.querySelector('#' + id + 'm').innerHTML = '<dl class="kv"><dt>First-price, average revenue</dt><dd>' + fmt(f / N, 1) + '</dd><dt>Second-price, average revenue</dt><dd>' + fmt(s2 / N, 1) + '</dd><dt>Theory (n-1)/(n+1)·' + Vm + '</dt><dd>' + fmt((n - 1) / (n + 1) * Vm, 1) + '</dd></dl>';
    });
    bindAll(body, r); r();
  };

  /* ---------- Monty Hall ---------- */
  W.monty = function (el) {
    const id = 'mh' + (uid++);
    const body = frame(el, 'Monty Hall: play it, or simulate many rounds', 'Simulation');
    let car, pick, opened, stats = { sw: [0, 0], st: [0, 0] };
    body.innerHTML = '<div class="row" id="' + id + 'd"></div><div class="readout" id="' + id + 'o"></div><div class="row"><button class="btn sm ghost" id="' + id + 'n">New round</button><button class="btn sm" id="' + id + 'sim">Simulate 3,000 rounds of each strategy</button></div><div class="readout" id="' + id + 's"></div>';
    const doors = body.querySelector('#' + id + 'd'), out = body.querySelector('#' + id + 'o');
    function newRound() { car = Math.floor(Math.random() * 3); pick = null; opened = null; drawDoors(); out.innerHTML = 'Pick a door.'; }
    function drawDoors(reveal) {
      doors.innerHTML = [0, 1, 2].map(d => '<button class="opt" data-d="' + d + '" ' + (opened === d || reveal ? 'disabled' : '') + '>Door ' + 'ABC'[d] + (opened === d || reveal ? (d === car ? ': car' : ': goat') : pick === d ? ' (your pick)' : '') + '</button>').join('');
      doors.querySelectorAll('button').forEach(b => b.addEventListener('click', () => choose(+b.dataset.d)));
    }
    function choose(d) {
      if (pick == null) {
        pick = d; const cand = [0, 1, 2].filter(x => x !== pick && x !== car); opened = cand[Math.floor(Math.random() * cand.length)];
        drawDoors(); out.innerHTML = 'The host opens door ' + 'ABC'[opened] + ': a goat. Click your door to stay or the other closed door to switch.';
      } else if (d !== opened) {
        const sw = d !== pick, win = d === car; stats[sw ? 'sw' : 'st'][win ? 0 : 1]++;
        drawDoors(true); out.innerHTML = (sw ? 'You switched' : 'You stayed') + ' and ' + (win ? '<span class="pill ok">won the car</span>' : '<span class="pill no">got a goat</span>') + '. Your record: switching ' + stats.sw[0] + '/' + (stats.sw[0] + stats.sw[1]) + ', staying ' + stats.st[0] + '/' + (stats.st[0] + stats.st[1]) + '.';
      }
    }
    body.querySelector('#' + id + 'n').addEventListener('click', newRound);
    body.querySelector('#' + id + 'sim').addEventListener('click', () => {
      let sw = 0, st = 0; for (let k = 0; k < 3000; k++) { const c = Math.floor(Math.random() * 3), p = Math.floor(Math.random() * 3); if (c === p) st++; else sw++; }
      body.querySelector('#' + id + 's').innerHTML = 'Staying wins ' + fmt(st / 30, 1) + '% (theory 33.3%); switching wins ' + fmt(sw / 30, 1) + '% (theory 66.7%).';
    });
    newRound();
  };

  /* ---------- winner's curse ---------- */
  W.wcurse = function (el) {
    const id = 'wc' + (uid++);
    const body = frame(el, 'Winner\'s curse: type L\'s expected payoff from bid b (rival bids 15 with L, 25 with H)', 'Calculator');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'b', 'Bid of type L', 0, 30, 0.5, 15) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    const pay = b => { let s = 0; s += 0.5 * (b > 15 ? (10 - 15) : b === 15 ? 0.5 * (10 - 15) : 0); s += 0.5 * (b > 25 ? (20 - 25) : b === 25 ? 0.5 * (20 - 25) : 0); return s; };
    function r() {
      const b = val(body, id + 'b');
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>Pr(rival L | own L)</dt><dd>1/2 (then v = 10)</dd><dt>Pr(rival H | own L)</dt><dd>1/2 (then v = 20)</dd><dt>Expected payoff</dt><dd>' + fmt(pay(b), 3) + '</dd></dl><p class="small">Whenever type L wins, the value is lower than its naive estimate 15. Bidding below 15 (payoff 0) beats bidding 15 (payoff -1.25).</p>';
      const P = plot({ x0: 0, x1: 30, y0: -5.5, y1: 1, w: 420, h: 240, xl: 'bid', yl: 'expected payoff' });
      const pts = []; for (let k = 0; k <= 600; k++) { const x = k / 20; pts.push([x, pay(x)]); }
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.line(pts, 'c2') + P.line([[0, 0], [30, 0]], 'cm') + P.dot(b, pay(b), 'dot-a', 5));
    }
    bindAll(body, r); r();
  };

  /* ---------- PBE example 2 ---------- */
  W['pbe-ex'] = function (el) {
    const id = 'pb' + (uid++);
    const body = frame(el, 'Example 2: player 2\'s belief and the candidate equilibria', 'Calculator');
    body.innerHTML = '<div class="controls">' + slider(id + 'p', 'Belief p (node after L)', 0, 1, 0.01, 0.3) + '</div><div class="readout" id="' + id + 'o"></div>';
    function r() {
      const p = val(body, id + 'p'), uL = p, uR = 1 - p;
      const a2 = uL > uR ? "L'" : uL < uR ? "R'" : "L' or R'";
      const u1 = a2 === "L'" ? { L: 3, M: 1, R: 2 } : a2 === "R'" ? { L: 0, M: 0, R: 2 } : null;
      const a1 = u1 ? Object.keys(u1).reduce((a, b) => u1[a] >= u1[b] ? a : b) : '-';
      let verdict;
      if (a2 === "L'") verdict = a1 === 'L' ? (p === 1 ? '<span class="pill ok">PBE: ((L, L\'), p = 1)</span>' : '<span class="pill no">Requirement 3 fails</span> Player 1 plays L, so on the path Bayes\' rule demands p = 1, not ' + fmt(p) + '.') : '';
      else if (a2 === "R'") verdict = '<span class="pill ok">Weak PBE (and PBE): ((R, R\'), p = ' + fmt(p) + ')</span> The information set is off the path, Bayes\' rule cannot pin down p. Requirement 5 kills it: M is strictly dominated by R, so p should be 1.';
      else verdict = '<span class="pill mid">Player 2 indifferent at p = 1/2</span>';
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>Player 2: L\' gives p</dt><dd>' + fmt(uL) + '</dd><dt>Player 2: R\' gives 1-p</dt><dd>' + fmt(uR) + '</dd><dt>Player 2 chooses</dt><dd>' + a2 + '</dd><dt>Player 1 then chooses</dt><dd>' + a1 + (u1 ? ' (L: ' + u1.L + ', M: ' + u1.M + ', R: ' + u1.R + ')' : '') + '</dd></dl><p>' + verdict + '</p>';
    }
    bindAll(body, r); r();
  };

  /* ---------- signalling checker ---------- */
  W.signal = function (el) {
    const id = 'sg' + (uid++);
    const body = frame(el, 'Job-market signalling: check any candidate equilibrium', 'Equilibrium checker');
    body.innerHTML = '<div class="row"><label for="' + id + 'h">High type</label><select id="' + id + 'h"><option value="E">E (educate)</option><option value="N">N</option></select><label for="' + id + 'l">Low type</label><select id="' + id + 'l"><option value="N">N\'</option><option value="E">E\'</option></select></div><div class="wgrid"><div class="controls">' +
      slider(id + 'pr', 'Prior Pr(high)', 0.05, 0.95, 0.01, 0.33) + slider(id + 'ch', 'Education cost, high', 0, 10, 0.5, 4) + slider(id + 'cl', 'Education cost, low', 0, 10, 0.5, 7) + slider(id + 'q', 'Off-path belief Pr(high | off-path message)', 0, 1, 0.01, 0.33) +
      '</div><div class="readout" id="' + id + 'o"></div></div>';
    function r() {
      const mH = body.querySelector('#' + id + 'h').value, mL = body.querySelector('#' + id + 'l').value;
      const pr = val(body, id + 'pr'), cH = val(body, id + 'ch'), cL = val(body, id + 'cl'), qoff = val(body, id + 'q');
      const belief = m => { const a = (mH === m ? pr : 0), b = (mL === m ? 1 - pr : 0); return a + b > 0 ? { mu: a / (a + b), on: true } : { mu: qoff, on: false }; };
      const act = mu => 10 * mu > 4 ? 'M' : 'C'; // lecture convention: the firm keeps the clerical job when 10q = 4
      const res = {}; ['N', 'E'].forEach(m => { const b = belief(m); res[m] = { mu: b.mu, on: b.on, a: act(b.mu) }; });
      const wage = a => a === 'M' ? 10 : 4;
      const pay = (type, m) => wage(res[m].a) - (m === 'E' ? (type === 'H' ? cH : cL) : 0);
      const devH = mH === 'E' ? 'N' : 'E', devL = mL === 'E' ? 'N' : 'E';
      const okH = pay('H', mH) >= pay('H', devH), okL = pay('L', mL) >= pay('L', devL);
      const kind = mH === mL ? 'pooling on ' + mH : 'separating (high ' + mH + ', low ' + mL + ')';
      body.querySelector('#' + id + 'o').innerHTML = '<p><strong>Candidate:</strong> ' + kind + '</p><dl class="kv">' +
        ['N', 'E'].map(m => '<dt>After ' + m + '</dt><dd>belief ' + fmt(res[m].mu, 3) + (res[m].on ? ' (Bayes, on path)' : ' (off path, your choice)') + '; firm: ' + res[m].a + ' (M gives ' + fmt(10 * res[m].mu, 2) + ' vs C 4; ties go to C as in the lecture)</dd>').join('') +
        '<dt>High type</dt><dd>' + fmt(pay('H', mH), 2) + ' vs deviating to ' + devH + ': ' + fmt(pay('H', devH), 2) + '</dd><dt>Low type</dt><dd>' + fmt(pay('L', mL), 2) + ' vs deviating to ' + devL + ': ' + fmt(pay('L', devL), 2) + '</dd></dl><p>' +
        (okH && okL ? '<span class="pill ok">This is a PBE</span>' : '<span class="pill no">Not a PBE</span> ' + (!okH ? 'The high type deviates. ' : '') + (!okL ? 'The low type deviates.' : '')) + '</p>' + (mH === mL ? '<p class="small muted">For pooling, the off-path belief slider matters. With the lecture numbers pooling on N needs q ≤ 2/5.</p>' : '');
    }
    bindAll(body, r); r();
  };

  /* ---------- PA linear ---------- */
  W['pa-linear'] = function (el) {
    const id = 'pl' + (uid++);
    const body = frame(el, 'Principal-agent: unlimited vs. limited liability', 'Calculator');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'A', 'Outside option A', 0, 0.4, 0.01, 0) + slider(id + 'r', 'Try a bonus rate r', 0, 1.2, 0.01, 0.7) + '<label class="row"><input type="checkbox" id="' + id + 'll"> Limited liability (s ≥ 0)</label><div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const A = val(body, id + 'A'), rr = val(body, id + 'r'), ll = body.querySelector('#' + id + 'll').checked;
      const sFor = x => ll ? Math.max(0, A - 0.5 * x * x) : A - 0.5 * x * x;
      const prof = x => x - (sFor(x) + x * x);
      let best = 0, bp = -1e9; for (let k = 0; k <= 1200; k++) { const x = k / 1000; if (prof(x) > bp) { bp = prof(x); best = x; } }
      const s = sFor(rr), rent = s + 0.5 * rr * rr - A;
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>Agent effort e = r</dt><dd>' + fmt(rr, 2) + '</dd><dt>Fixed pay s</dt><dd>' + fmt(s, 3) + (s < 0 ? ' (franchise fee)' : '') + '</dd><dt>Principal profit</dt><dd>' + fmt(prof(rr), 3) + '</dd><dt>Agent rent above A</dt><dd>' + fmt(rent, 3) + '</dd><dt>Optimal r</dt><dd>' + fmt(best, 2) + ' (profit ' + fmt(bp, 3) + ')</dd></dl>';
      const P = plot({ x0: 0, x1: 1.2, y0: -0.4, y1: 0.6, w: 420, h: 260, xl: 'bonus rate r', yl: 'principal profit' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.fn(x => x - (A - 0.5 * x * x + x * x), 'c1', 0, 1.2) + P.fn(x => x - (Math.max(0, A - 0.5 * x * x) + x * x), 'c2', 0, 1.2) + P.dot(rr, prof(rr), 'dot-a', 5)) + '<div class="legend"><span class="l1">unlimited liability: max at r = 1</span><span class="l2">limited liability: max at r = 0.5 (for A = 0)</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- PA risk ---------- */
  W['pa-risk'] = function (el) {
    const id = 'pr' + (uid++);
    const body = frame(el, 'Risk-averse agent: optimal bonus and risk premium', 'Calculator');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 'K', 'Risk aversion K', 0, 3, 0.05, 1) + slider(id + 'u', 'Outside option u₀', 0, 0.3, 0.01, 0.1) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const K = val(body, id + 'K'), u0 = val(body, id + 'u'), rs = 1 / (2 * K + 1), s = u0 + (K - 0.5) * rs * rs, prof = 1 / (4 * (K + 0.5)) - u0, th = u0 > 0 ? 1 / (4 * u0) - 0.5 : Infinity;
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>r* = 1/(2K+1)</dt><dd>' + fmt(rs, 4) + '</dd><dt>effort e = r*</dt><dd>' + fmt(rs, 4) + '</dd><dt>s = u₀ + (K-0.5)r²</dt><dd>' + fmt(s, 4) + '</dd><dt>Risk premium K r²</dt><dd>' + fmt(K * rs * rs, 4) + '</dd><dt>Profit with bonus</dt><dd>' + fmt(prof, 4) + '</dd><dt>No bonus better if K &gt;</dt><dd>' + (isFinite(th) ? fmt(th, 3) : '∞') + '</dd></dl><p>' + (prof >= 0 ? '<span class="pill ok">Offer the bonus contract</span>' : '<span class="pill no">Offer no incentives (profit 0)</span>') + '</p>';
      const P = plot({ x0: 0, x1: 3, y0: 0, y1: 1, w: 420, h: 250, xl: 'K', yl: 'r*' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.fn(k => 1 / (2 * k + 1), 'c1') + P.fn(k => k / (2 * k + 1) ** 2, 'c2') + P.dot(K, rs, 'dot-a', 5)) + '<div class="legend"><span class="l1">r*(K)</span><span class="l2">risk premium K r*²</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- risk aversion ---------- */
  W.risk = function (el) {
    const id = 'rk' + (uid++);
    const body = frame(el, 'Expected utility, certainty equivalent and risk premium', 'Visualisation');
    body.innerHTML = '<div class="row"><label for="' + id + 'f">Utility</label><select id="' + id + 'f"><option value="sqrt">v(x) = √x</option><option value="log">v(x) = ln(1 + x)</option><option value="lin">v(x) = x (risk neutral)</option><option value="q">v(x) = x^0.25</option></select></div><div class="wgrid"><div class="controls">' + slider(id + 'lo', 'Low outcome', 0, 2000, 50, 0) + slider(id + 'hi', 'High outcome', 0, 2000, 50, 2000) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    const F = { sqrt: [x => Math.sqrt(x), u => u * u], log: [x => Math.log(1 + x), u => Math.exp(u) - 1], lin: [x => x, u => u], q: [x => Math.pow(x, 0.25), u => Math.pow(u, 4)] };
    function r() {
      const f = F[body.querySelector('#' + id + 'f').value]; let lo = val(body, id + 'lo'), hi = val(body, id + 'hi'); if (lo > hi) [lo, hi] = [hi, lo];
      const ev = (lo + hi) / 2, eu = (f[0](lo) + f[0](hi)) / 2, ce = f[1](eu);
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>Expected value</dt><dd>' + fmt(ev, 1) + '</dd><dt>Expected utility</dt><dd>' + fmt(eu, 3) + '</dd><dt>Certainty equivalent c</dt><dd>' + fmt(ce, 1) + '</dd><dt>Risk premium EV - c</dt><dd>' + fmt(ev - ce, 1) + '</dd></dl><p class="small">Try 900 and 1100: the premium shrinks with smaller risk.</p>';
      const top = f[0](2000);
      const P = plot({ x0: 0, x1: 2000, y0: 0, y1: top * 1.05, w: 420, h: 280, xl: 'money x', yl: 'utility' });
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.fn(f[0], 'c1') + P.line([[lo, f[0](lo)], [hi, f[0](hi)]], 'cm') + P.dot(ev, eu, 'dot-2', 5) + P.dot(ce, eu, 'dot-a', 5) + P.line([[ce, eu], [ev, eu]], 'ca') + P.text(ce, eu + top * 0.05, 'c', 'lbla', 'middle') + P.text(ev, eu - top * 0.06, 'EV', 'lbl2', 'middle')) + '<div class="legend"><span class="l1">utility v(x)</span><span class="lm">chord: expected utility of the lottery</span><span class="la">risk premium</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- guilt aversion ---------- */
  W.guilt = function (el) {
    const id = 'gu' + (uid++);
    const body = frame(el, 'Trust game with guilt aversion: psychological equilibria', 'Calculator');
    body.innerHTML = '<div class="wgrid"><div class="controls">' + slider(id + 't', 'Guilt aversion θ', 0, 2, 0.01, 0.6) + slider(id + 'p', 'Consistent belief α = β = p', 0, 1, 0.01, 1) + '<div class="readout" id="' + id + 'o"></div></div><div id="' + id + 's"></div></div>';
    function r() {
      const th = val(body, id + 't'), p = val(body, id + 'p'), grab = 14 - 10 * th * p;
      const bRoll = grab <= 10, aIn = 10 * p >= 5;
      let pe;
      if (p === 1) pe = bRoll ? '<span class="pill ok">PE: (In, Roll), p = 1</span>' : '<span class="pill no">Not a PE</span> B would grab, contradicting p = 1.';
      else if (p === 0) pe = grab > 10 ? '<span class="pill ok">PE: (Out, Grab), p = 0</span>' : '<span class="pill mid">B indifferent</span>';
      else pe = Math.abs(th * p - 0.4) < 0.005 ? '<span class="pill ok">B indifferent: mixing consistent</span>' + (aIn ? ' and A plays In.' : ' but A plays Out.') : '<span class="pill no">B is not indifferent, so mixing with this p is inconsistent</span>';
      body.querySelector('#' + id + 'o').innerHTML = '<dl class="kv"><dt>B: Grab = 14 - 10θβ</dt><dd>' + fmt(grab, 2) + '</dd><dt>B: Roll</dt><dd>10</dd><dt>B prefers</dt><dd>' + (bRoll ? 'Roll' : 'Grab') + '</dd><dt>A: In = 10α vs Out = 5</dt><dd>' + fmt(10 * p, 2) + ' → ' + (aIn ? 'In' : 'Out') + '</dd></dl><p>' + pe + '</p>';
      const P = plot({ x0: 0, x1: 2, y0: 0, y1: 1, w: 400, h: 280, xl: 'θ', yl: 'p' });
      const pts = [[0.4, 1]]; for (let k = 0; k <= 100; k++) { const t = 0.4 + 1.6 * k / 100; pts.push([t, Math.min(1, 0.4 / t)]); }
      body.querySelector('#' + id + 's').innerHTML = P.svg(P.poly(pts.concat([[2, 1]]), 'area') + P.fn(t => 0.4 / t, 'c2', 0.4, 2) + P.line([[0, 0.5], [2, 0.5]], 'cm') + P.dot(th, p, 'dot-a', 5)) + '<div class="legend"><span class="la">B prefers Roll (θp ≥ 0.4)</span><span class="l2">θp = 0.4</span><span class="lm">p = 0.5: A indifferent</span></div>';
    }
    bindAll(body, r); r();
  };

  /* ---------- contract enforcement ---------- */
  W.contract = function (el) {
    const id = 'ct' + (uid++);
    const body = frame(el, 'Contract enforcement: induced games under different legal regimes', 'Calculator');
    const f = (k, l, v) => '<label>' + l + ' <input type="number" id="' + id + k + '" value="' + v + '" step="1"></label>';
    body.innerHTML = '<div class="row">' + f('z1', 'z₁', 6) + f('z2', 'z₂', 6) + f('x1', 'x₁', 8) + f('x2', 'x₂', 8) + f('y1', 'y₁', -2) + f('y2', 'y₂', -2) + '</div><div class="row"><label for="' + id + 'reg">Regime</label><select id="' + id + 'reg"><option value="none">No contract (underlying game)</option><option value="lv">Limited verifiability, transfer α</option><option value="exp">Expectation damages</option><option value="rel">Reliance damages</option></select></div>' + slider(id + 'al', 'Transfer α (to architect)', -10, 10, 0.5, 0) + '<div id="' + id + 'o"></div>';
    function r() {
      const g = k => val(body, id + k); const z1 = g('z1'), z2 = g('z2'), x1 = g('x1'), x2 = g('x2'), y1 = g('y1'), y2 = g('y2'), a = val(body, id + 'al');
      const reg = body.querySelector('#' + id + 'reg').value;
      let M;
      if (reg === 'none') M = [[[z1, z2], [y1, x2]], [[x1, y2], [0, 0]]];
      if (reg === 'lv') M = [[[z1, z2], [y1 + a, x2 - a]], [[x1 + a, y2 - a], [a, -a]]];
      if (reg === 'exp') M = [[[z1, z2], [z1, x2 - z1 + y1]], [[x1 - z2 + y2, z2], [0, 0]]];
      if (reg === 'rel') M = [[[z1, z2], [0, x2 + y1]], [[x1 + y2, 0], [0, 0]]];
      const iiNE = M[0][0][0] >= M[1][0][0] && M[0][0][1] >= M[0][1][1];
      const eff = z1 + z2 > Math.max(x1 + y2, y1 + x2, 0);
      let note = '';
      if (reg === 'lv') note = 'Need z₁ ≥ x₁ + α and z₂ ≥ x₂ - α, i.e. α ∈ [' + fmt(x2 - z2) + ', ' + fmt(z1 - x1) + ']' + (x2 - z2 > z1 - x1 ? ': empty, since z₁ + z₂ < x₁ + x₂.' : '.');
      if (reg === 'exp') note = 'Enforceable iff z₁ + z₂ ≥ x₁ + y₂ and z₁ + z₂ ≥ x₂ + y₁ (efficiency).';
      if (reg === 'rel') note = 'Enforceable iff z₁ ≥ x₁ + y₂ and z₂ ≥ x₂ + y₁.';
      body.querySelector('#' + id + 'o').innerHTML = mx({ p1: 'Architect/Owner', p2: 'Constructor', rows: ['I', 'N'], cols: ['I', 'N'], cells: M.map(row => row.map(c => fmt(c[0], 2) + ',' + fmt(c[1], 2))), br: true }) +
        '<p>(I, I) efficient: ' + (eff ? '<span class="pill ok">yes</span>' : '<span class="pill no">no</span>') + ' &nbsp; (I, I) a Nash equilibrium of this game: ' + (iiNE ? '<span class="pill ok">yes</span>' : '<span class="pill no">no</span>') + '</p><p class="small">' + note + '</p>';
    }
    bindAll(body, r); r();
  };

  /* Mount all widgets inside a root element. */
  GT.mountWidgets = function (root) {
    root.querySelectorAll('.w[data-w]').forEach(el => {
      if (el.dataset.mounted) return; el.dataset.mounted = '1';
      const f = W[el.dataset.w];
      try { if (f) f(el); else el.textContent = 'Unknown widget ' + el.dataset.w; } catch (e) { el.textContent = 'Widget error: ' + e.message; console.error(e); }
    });
  };
  GT.util = { fmt, frac, plot, mixedNE, pureNE, mixDominated };
})();
