/* Fill-in derivations, the concept map and the common-mistakes collection. */

/* Each derivation: steps with {{k}} blanks; each blank offers options (plain-text math), a = correct index. */
GT.derivations = [
  { id: 'cournot', lec: 'l3', title: 'Cournot duopoly: reaction function and equilibrium', given: 'p(X) = a - b(x₁ + x₂), constant marginal cost c, two firms choose quantities simultaneously.',
    steps: ['Firm 1 maximises π₁ = (a - b(x₁ + x₂))x₁ - cx₁. The FOC is {{1}} = 0.', 'Solving for x₁ gives the reaction function R₁(x₂) = {{2}}.', 'By symmetry x₁ = x₂ in equilibrium, so x₁ = (a - c - bx₁)/(2b), which gives x₁ᴺ = {{3}}.', 'Total output is Xᴺ = {{4}}; the cartel would produce only X = (a - c)/(2b).'],
    blanks: { 1: [['a - b(x₁ + x₂) - bx₁ - c', 'a - b(x₁ + x₂) - c', 'a - 2bx₁ - c'], 0], 2: [['(a - c - bx₂)/(2b)', '(a - c - bx₂)/b', '(a - c)/(3b)'], 0], 3: [['(a - c)/(3b)', '(a - c)/(2b)', '(a - c)/(4b)'], 0], 4: [['2(a - c)/(3b)', '(a - c)/(2b)', '(a - c)/b'], 0] } },
  { id: 'bos', lec: 'l4', title: 'Mixed equilibrium of the Battle of the Sexes', given: '(S,S) = (2,1), (O,O) = (1,2), mismatches (0,0). r = Pr(man plays Soccer), q = Pr(woman plays Soccer).',
    steps: ['The man chooses r so that the {{1}} is indifferent.', 'Her indifference: 1·r = 2·(1 - r), so r = {{2}}.', 'The woman chooses q so that the man is indifferent: 2q = 1·(1 - q), so q = {{3}}.', 'Each player\'s expected payoff in the mixed equilibrium is {{4}}.'],
    blanks: { 1: [['woman', 'man', 'pair'], 0], 2: [['2/3', '1/3', '1/2'], 0], 3: [['1/3', '2/3', '1/2'], 0], 4: [['2/3', '1', '4/3'], 0] } },
  { id: 'grim', lec: 'l10', title: 'Grim trigger in the infinitely repeated Prisoner\'s Dilemma', given: 'Stage payoffs: cooperation 4, temptation 5, punishment 1 (lecture game), discount factor δ.',
    steps: ['Cooperating forever gives the present value {{1}}.', 'Deviating once and being punished forever gives {{2}}.', 'Deviation does not pay iff 4 ≥ 5(1 - δ) + δ, i.e. δ ≥ {{3}}.', 'In general, with temptation T, reward R and punishment P, the condition is δ ≥ {{4}}.'],
    blanks: { 1: [['4/(1 - δ)', '4δ/(1 - δ)', '4/(1 + δ)'], 0], 2: [['5 + δ/(1 - δ)', '5/(1 - δ)', '5 + 1/(1 - δ)'], 0], 3: [['1/4', '1/5', '1/2'], 0], 4: [['(T - R)/(T - P)', '(T - R)/(R - P)', '(R - P)/(T - P)'], 0] } },
  { id: 'rubinstein', lec: 'l8', title: 'Rubinstein bargaining: the SPE share', given: 'A proposes in periods 1, 3, 5, ...; discount factors δ_A, δ_B; Z = A\'s share in periods A proposes.',
    steps: ['In period 3, A gets Z, worth {{1}} to A from today\'s perspective.', 'In period 2, B offers A exactly {{2}} and keeps the rest.', 'In period 1, A offers B what B can secure in period 2, {{3}}, so Z = 1 - δ_B(1 - δ_A Z).', 'Solving: Z = {{4}}.'],
    blanks: { 1: [['Z δ_A²', 'Z δ_A', 'Z'], 0], 2: [['Z δ_A', 'Z δ_A²', 'Z'], 0], 3: [['δ_B(1 - Z δ_A)', '1 - Z δ_A', 'δ_B(1 - Z)'], 0], 4: [['(1 - δ_B)/(1 - δ_A δ_B)', '1/(1 + δ_B)', '(1 - δ_A)/(1 - δ_A δ_B)'], 0] } },
  { id: 'nash', lec: 'l9', title: 'Nash bargaining solution', given: 'max (x₁ - d₁)(x₂ - d₂) subject to x₁ + x₂ ≤ v*.',
    steps: ['The constraint binds because of {{1}}.', 'Substituting x₂ = v* - x₁, the FOC is {{2}} = 0.', 'Hence x₁* = {{3}}.'],
    blanks: { 1: [['Pareto efficiency: leftover surplus raises the product', 'individual rationality', 'independence of irrelevant alternatives'], 0], 2: [['(v* - x₁ - d₂) - (x₁ - d₁)', '(v* - x₁ - d₂) + (x₁ - d₁)', 'v* - 2x₁'], 0], 3: [['d₁ + ½(v* - d₁ - d₂)', '½v*', 'd₁ + ½(v* - d₂)'], 0] } },
  { id: 'fpa', lec: 'l12', title: 'First-price auction with two uniform bidders', given: 'Values uniform on [0, 1000]; the rival bids b_j = a·v_j; you bid x.',
    steps: ['You win iff x > a v_j, i.e. v_j < x/a, which has probability {{1}}.', 'Your expected payoff is {{2}}.', 'The FOC (v_i - 2x)/(1000a) = 0 gives x = {{3}}, which has the guessed form with a = 1/2.', 'With n uniform bidders the equilibrium bid is {{4}}.'],
    blanks: { 1: [['x/(1000a)', 'x/1000', 'a x/1000'], 0], 2: [['(v_i - x)·x/(1000a)', '(v_i - x)/(1000a)', 'v_i·x/(1000a)'], 0], 3: [['v_i/2', 'v_i', 'v_i/3'], 0], 4: [['(n - 1)v/n', 'v/n', 'v/2'], 0] } },
  { id: 'bcournot', lec: 'l11', title: 'Bayesian Cournot with symmetric private costs', given: 'P = a - Q; each firm has cost c_H or c_L with probability ½ each, privately known; q̄ = ½(q^H + q^L), c̄ = ½(c_H + c_L).',
    steps: ['Firm 1 of type j does not know firm 2\'s type, so its expected profit is (a - q₁ʲ - {{1}} - c_j)q₁ʲ.', 'The FOC gives the best response q₁ʲ = {{2}}.', 'By symmetry both firms use the same strategy; averaging the two best responses gives q̄ = {{3}}.', 'Inserting q̄ into the best response of the high type gives q^H = {{4}}.'],
    blanks: { 1: [['q̄₂ (the expected quantity of firm 2)', 'q₂^H', 'q₂^L'], 0], 2: [['(a - c_j - q̄₂)/2', '(a - c_j)/3', '(a - c_j - q̄₂)/3'], 0], 3: [['(a - c̄)/3', '(a - c̄)/2', '(2a - c̄)/3'], 0], 4: [['(4a - 5c_H + c_L)/12', '(a - c_H)/3', '(4a - 5c_L + c_H)/12'], 0] } },
  { id: 'separating', lec: 'l14', title: 'Separating equilibrium in the job-market signalling game', given: 'Manager wage 10, clerk wage 4; the firm gets 10 from a high type in M, 0 from a low type in M, 4 from any clerk; education costs c_H (high) and c_L (low).',
    steps: ['In the separating candidate (high: E, low: N) Bayes\' rule gives the firm the belief {{1}} after E.', 'The high type does not deviate to N iff {{2}}.', 'The low type does not mimic with E iff {{3}}.', 'With the lecture costs c_H = 4 and c_L = 7, the separating PBE {{4}}.'],
    blanks: { 1: [['q = 1 (only the high type educates)', 'q = 1/3 (the prior)', 'q = 0'], 0], 2: [['10 - c_H ≥ 4', '10 - c_H ≥ 10', '4 - c_H ≥ 0'], 0], 3: [['4 ≥ 10 - c_L', '10 - c_L ≥ 4', '4 ≥ c_L'], 0], 4: [['exists, since 6 ≥ 4 and 4 ≥ 3', 'fails for the low type', 'fails for the high type'], 0] } },
  { id: 'pa', lec: 'l15', title: 'Principal-agent with a risk-neutral agent', given: 'Q = e + u, E[u] = 0, effort cost 0.5e², contract p = s + rQ, outside option A.',
    steps: ['The agent maximises s + re - 0.5e², so e = {{1}}.', 'The participation constraint binds, so s = {{2}}.', 'The principal maximises r - A - 0.5r², so r* = {{3}} and s* = A - 0.5.', 'With limited liability (s ≥ 0, A = 0) the principal instead maximises r - r², so r = {{4}}.'],
    blanks: { 1: [['r', '1', 'r/2'], 0], 2: [['A - 0.5r²', 'A', 'A + 0.5r²'], 0], 3: [['1', '0.5', 'A'], 0], 4: [['0.5', '1', '0.25'], 0] } },
  { id: 'risk', lec: 'l16', title: 'Risk-averse agent: optimal bonus', given: 'EU = s + re - r²K - 0.5e², outside option u₀, risk-neutral principal.',
    steps: ['The agent chooses e = {{1}}.', 'The binding participation constraint gives s = {{2}}.', 'Expected payment E[p] = u₀ + (K + 0.5)r², so the principal maximises r - u₀ - (K + 0.5)r² and r* = {{3}}.', 'The risk premium the principal pays is {{4}}.'],
    blanks: { 1: [['r', 'r/K', '1'], 0], 2: [['u₀ + (K - 0.5)r²', 'u₀ - 0.5r²', 'u₀ + Kr²'], 0], 3: [['1/(2K + 1)', '1/(K + 1)', '1/(2K)'], 0], 4: [['Kr²', '0.5r²', '(K + 0.5)r²'], 0] } },
];

GT.pages.derive = {
  title: 'Derivation practice', render: () => '<p class="eyebrow">Practise</p><h1>Derivation practice</h1><p>The key derivations of the course with blanks. Choose the missing expression in each step, then check. The exam rewards writing these steps yourself, so after a correct run, close the page and write the derivation on paper from memory.</p>' +
    GT.derivations.map(d => '<div class="drill" data-deriv="' + d.id + '"><div><span class="chip acc">' + d.title + '</span> <a class="small" href="#' + d.lec + '">Review lesson</a></div><p class="small muted">Given: ' + esc(d.given) + '</p><ol>' +
      d.steps.map(s => '<li>' + esc(s).replace(/\{\{(\d+)\}\}/g, (m, k) => { const b = d.blanks[k]; return '<select data-k="' + k + '" aria-label="blank ' + k + '"><option value="">choose</option>' + b[0].map((o, i) => ({ o, i })).sort((x, y) => (x.o > y.o ? 1 : -1)).map(x => '<option value="' + x.i + '">' + esc(x.o) + '</option>').join('') + '</select>'; }) + '</li>').join('') +
      '</ol><div class="row"><button class="btn sm" data-check="1" type="button">Check</button><button class="btn sm ghost" data-show="1" type="button">Show answers</button></div><div class="why" hidden></div></div>').join(''),
};
GT.bindDerivations = function (root) {
  root.querySelectorAll('[data-deriv]').forEach(box => {
    const d = GT.derivations.find(x => x.id === box.dataset.deriv), fb = box.querySelector('.why');
    const res = () => [...box.querySelectorAll('select')].map(s => ({ s, ok: s.value !== '' && +s.value === d.blanks[s.dataset.k][1] }));
    box.querySelector('[data-check]').addEventListener('click', () => {
      const r = res(), n = r.filter(x => x.ok).length;
      r.forEach(x => { x.s.style.outline = '2px solid ' + (x.ok ? 'var(--good)' : 'var(--bad)'); });
      fb.hidden = false; fb.innerHTML = (n === r.length ? '<span class="pill ok">All correct</span> Now write it on paper without looking.' : '<span class="pill no">' + n + ' of ' + r.length + ' correct</span> Red blanks need another look.');
      GT.stats.add(d.lec, 'd', n === r.length);
    });
    box.querySelector('[data-show]').addEventListener('click', () => {
      box.querySelectorAll('select').forEach(s => { s.value = String(d.blanks[s.dataset.k][1]); s.style.outline = '2px solid var(--good)'; });
      fb.hidden = false; fb.innerHTML = 'Answers filled in. Reset by reloading the page and try again from memory.';
    });
  });
};

/* Concept map: hand-drawn SVG using theme classes. */
GT.pages.concepts = {
  title: 'Concept map', render: () => {
    const box = (x, y, w, h, title, sub, links, cls) => '<g class="cm-node"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" class="' + (cls || 'cm-box') + '"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + 26) + '" text-anchor="middle" class="cm-title">' + title + '</text>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + 46) + '" text-anchor="middle" class="cm-sub">' + sub + '</text>' +
      links.map((l, i) => '<a href="#' + l[0] + '"><text x="' + (x + w / 2) + '" y="' + (y + 70 + i * 18) + '" text-anchor="middle" class="cm-link">' + l[1] + '</text></a>').join('') + '</g>';
    const arrow = (x1, y1, x2, y2, label, lx, ly) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="cm-arrow" marker-end="url(#cm-head)"/><text x="' + lx + '" y="' + ly + '" text-anchor="middle" class="cm-label">' + label + '</text>';
    const svg = '<svg viewBox="0 0 760 470" class="cm" role="img" aria-label="Concept map of the four classes of games and their equilibrium concepts">' +
      '<defs><marker id="cm-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="cm-headfill"/></marker></defs>' +
      '<text x="240" y="24" text-anchor="middle" class="cm-axis">STATIC</text><text x="560" y="24" text-anchor="middle" class="cm-axis">DYNAMIC</text>' +
      '<text x="22" y="120" text-anchor="middle" class="cm-axis" transform="rotate(-90 22 120)">COMPLETE INFO</text><text x="22" y="360" text-anchor="middle" class="cm-axis" transform="rotate(-90 22 360)">INCOMPLETE INFO</text>' +
      box(90, 40, 300, 160, 'Nash equilibrium', 'mutual best responses', [['l2', 'L2 dominance, IESDS'], ['l3', 'L3 Nash, Cournot'], ['l4', 'L4 mixed strategies'], ['l5', 'L5 selection, trembling hand']]) +
      box(450, 40, 280, 160, 'Subgame perfect eq.', 'NE in every subgame', [['l6', 'L6 backward induction'], ['l7', 'L7 subgame perfection'], ['l8', 'L8-L9 bargaining'], ['l10', 'L10 repeated games'], ['l15', 'L15-L16 contracts']]) +
      box(90, 280, 300, 160, 'Bayesian Nash eq.', 'each type best responds', [['l11', 'L11 Bayesian games'], ['l12', 'L12 auctions'], ['l11', 'adverse selection']]) +
      box(450, 280, 280, 160, 'Perfect Bayesian eq.', 'strategies + beliefs', [['l13', 'L13 requirements 1-5'], ['l14', 'L14 signalling'], ['l17', 'L17 psychological eq. (beliefs)']]) +
      arrow(390, 120, 448, 120, 'refine', 419, 110) +
      arrow(240, 200, 240, 278, 'add types', 285, 244) +
      arrow(590, 200, 590, 278, 'add beliefs', 640, 244) +
      arrow(390, 380, 448, 380, 'add sequential', 419, 352) +
      '<text x="419" y="366" text-anchor="middle" class="cm-label">rationality</text>' +
      '</svg>';
    return '<p class="eyebrow">Overview</p><h1>Concept map</h1><p>How the equilibrium concepts of the course fit together. Each arrow adds one requirement: moving right adds sequential rationality (credible behaviour off the path), moving down adds private information (types and beliefs). Click a lecture to open it.</p>' +
      '<div class="widget cm-wide" style="padding:10px"><div class="treewrap">' + svg + '</div></div>' +
      '<div class="cm-narrow">' + [['Nash equilibrium', 'Static, complete information: mutual best responses', [['l2', 'L2 dominance, IESDS'], ['l3', 'L3 Nash, Cournot'], ['l4', 'L4 mixed strategies'], ['l5', 'L5 selection, trembling hand']], 'add sequential rationality'],
        ['Subgame perfect equilibrium', 'Dynamic, complete information: NE in every subgame', [['l6', 'L6 backward induction'], ['l7', 'L7 subgame perfection'], ['l8', 'L8-L9 bargaining'], ['l10', 'L10 repeated games'], ['l15', 'L15-L16 contracts']], '#'],
        ['Bayesian Nash equilibrium', 'Static, incomplete information: each type best responds', [['l11', 'L11 Bayesian games'], ['l12', 'L12 auctions'], ['l11', 'adverse selection']], 'add sequential rationality'],
        ['Perfect Bayesian equilibrium', 'Dynamic, incomplete information: strategies + beliefs', [['l13', 'L13 requirements 1-5'], ['l14', 'L14 signalling'], ['l17', 'L17 psychological eq. (beliefs)']], '']].map(c => '<div class="cm-card"><strong>' + c[0] + '</strong><span class="small muted">' + c[1] + '</span><span>' + c[2].map(l => '<a href="#' + l[0] + '">' + l[1] + '</a>').join(' · ') + '</span></div>' + (c[3] === '#' ? '<div class="cm-sep">With private information: add types to NE (giving BNE) and beliefs to SPE (giving PBE)</div>' : c[3] ? '<div class="cm-step">↓ ' + c[3] + '</div>' : '')).join('') + '<p class="small muted">Every refinement keeps the previous concept as a special case. On a wider screen this page shows the full two-by-two map.</p></div>' +
      '<h2>Inclusions you should be able to state</h2><div class="tbl"><table><tr><th>Statement</th><th>Where</th></tr>' +
      [['Every equilibrium in dominant strategies is a Nash equilibrium.', 'l3'], ['If IESDS leaves one profile, it is the unique Nash equilibrium; strictly dominated strategies are never played in a NE.', 'l3'], ['Every finite game has a NE in mixed strategies (Nash 1950).', 'l4'], ['Trembling-hand perfect equilibria are Nash equilibria without weakly dominated strategies (2-player case).', 'l5'], ['Every SPE is a NE, not every NE is an SPE; in finite perfect-information games SPE = backward induction.', 'l7'], ['A static game with one type per player: BNE = NE.', 'l11'], ['PBE coincides with SPE under complete information, with BNE in static Bayesian games, and with NE in static complete-information games.', 'l13'], ['PBE ⊂ weak PBE (requirement 4 restricts off-path beliefs); requirement 5 refines further.', 'l13'], ['Folk theorem: with patient players the repeated game has many SPE, including cooperation.', 'l10']].map(r => '<tr><td>' + r[0] + '</td><td><a href="#' + r[1] + '">' + r[1].toUpperCase() + '</a></td></tr>').join('') + '</table></div>';
  },
};

/* All common-mistake and exam-tip boxes from the lessons, on one page. */
GT.pages.mistakes = {
  title: 'Common mistakes', render: () => {
    const tmp = document.createElement('div');
    let h = '<p class="eyebrow">Exam</p><h1>Common mistakes and exam tips</h1><p>Every warning and exam tip from the lessons, in course order. Read this the day before the exam.</p>';
    GT.lessons.forEach(l => {
      tmp.innerHTML = l.html;
      const boxes = [...tmp.querySelectorAll('.box.warn, .box.tip')];
      if (!boxes.length) return;
      h += '<h2><a href="#' + l.id + '" style="text-decoration:none;color:inherit">L' + l.no + ' ' + l.title + '</a></h2>' + boxes.map(b => b.outerHTML).join('');
    });
    return h;
  },
};
