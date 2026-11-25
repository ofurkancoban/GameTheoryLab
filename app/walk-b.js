/* Step-by-step games for Lectures 6-10 (backward induction, subgame perfection, bargaining, repeated games). */
(function () {
  const walk = GT.walk, fmt = GT.util.fmt;

  /* ---------- L6 ---------- */
  walk({
    id: 'trust6', lec: 'l6', sec: 's1', title: 'Trust game: backward induction',
    names: { 1: 'Player 1 (trusts or not)', 2: 'Player 2 (cooperates or defects)' },
    panels: { A: { type: 'tree', tree: 'l6trust' } },
    steps: [
      { who: 0, h: 'Start at the end of the tree',
        d: 'Player 2 moves last, after player 1 has trusted (T). Solve his decision first.',
        why: 'The last mover has nothing left to anticipate: he simply compares his own payoffs. Everybody before him can then predict his choice.',
        A: { focus: ['T'] } },
      { who: 2, h: 'Player 2: cooperating gives 1, defecting gives 2',
        d: 'Player 2 defects (D). The node is replaced by the payoffs (-1, 2).',
        why: 'Player 2 maximises his own payoff. A promise to cooperate would not be credible, because at the moment of choice defecting pays more.',
        A: { focus: ['T'], cmp: [['T>C', 2], ['T>D', 2]], pick: { T: 'D' }, val: { T: '(-1, 2)' } } },
      { who: 1, h: 'Player 1 anticipates the defection',
        d: 'Trusting leads to (-1, 2), so it gives player 1 -1; not trusting gives 0. He chooses N.',
        why: 'Player 1 knows player 2 is rational (complete information) and therefore predicts D. Trust would be exploited.',
        A: { focus: [''], cmp: [['N', 1]], pick: { '': 'N' }, val: { '': '(0, 0)' } } },
      { who: 0, h: 'Backward-induction outcome: (N, D) with (0, 0)',
        d: 'The strategy profile is (N; D): player 2\'s plan "defect if trusted" is part of the solution even though it is never reached.',
        why: 'Both would prefer (T, C) with (1, 1), but player 2 cannot credibly commit to cooperate. Reputation (repeated games, L10), contracts (L18) or guilt aversion (L17) can change this.',
        res: '(N; D), payoffs (0, 0).' },
    ],
  });

  walk({
    id: 'entry6', lec: 'l6', sec: 's4', title: 'Market entry: backward induction and a non-credible threat',
    names: { 1: 'Entrant', 2: 'Monopolist' },
    panels: {
      A: { type: 'tree', tree: 'l6entry', title: 'Extensive form' },
      B: { type: 'mx', title: 'Normal form', p1: 'Entrant', p2: 'Monopolist', rows: ['E', 'N'], cols: ['f', 'n'], cells: [['-1,-1', '2,1'], ['0,2', '0,2']] },
    },
    steps: [
      { show: ['A'], who: 2, h: 'Last mover first: the monopolist after entry',
        d: 'Fighting (f) gives the monopolist -1, sharing (n) gives 1. It shares.',
        why: 'Once the entrant is in the market, fighting only hurts the monopolist itself. Whatever it said before, at this node sharing is optimal.',
        A: { focus: ['E'], cmp: [['E>f', 2], ['E>n', 2]], pick: { E: 'n' }, val: { E: '(2, 1)' } } },
      { show: ['A'], who: 1, h: 'The entrant anticipates sharing',
        d: 'Entering leads to (2, 1) and gives 2; staying out gives 0. It enters.',
        why: 'The entrant predicts the monopolist\'s rational reaction instead of listening to threats.',
        A: { focus: [''], cmp: [['N', 1]], pick: { '': 'E' }, val: { '': '(2, 1)' } } },
      { show: ['A', 'B'], who: 0, h: 'The normal form has a second Nash equilibrium',
        d: 'Underlining in the matrix gives (E, n) and also (N, f): if the monopolist fights, staying out (0) is better than entering (-1); if the entrant stays out, fighting costs the monopolist nothing (2 = 2).',
        why: 'Nash equilibrium only checks best responses along the equilibrium path. The monopolist\'s choice after entry does not matter for its payoff if entry never happens.',
        B: { auto: 'ne' } },
      { show: ['A', 'B'], who: 2, h: '(N, f) rests on a non-credible threat',
        d: 'The threat "I will fight if you enter" is never tested in (N, f). But if entry did happen, fighting gives -1 < 1: the monopolist would not carry it out (red cross).',
        why: 'Sequential rationality: a strategy must prescribe an optimal action at every information set, also those not reached in equilibrium. Only (E, n) passes this test.',
        res: 'Backward induction selects (E, n). The Nash equilibrium (N, f) is eliminated because f is not credible.',
        A: { reset: true, pick: { '': 'N', E: 'f' }, focus: ['E'], cmp: [['E>f', 2], ['E>n', 2]], bad: [['E', 'f']] }, B: { focus: { cell: [[1, 0]] } } },
    ],
  });

  walk({
    id: 'bosseq', lec: 'l6', sec: 's2', title: 'Battle of the Sexes, sequential versus simultaneous',
    panels: {
      A: { type: 'tree', tree: 'l6bosseq', title: 'Player 2 observes player 1' },
      B: { type: 'tree', tree: 'l6bossim', title: 'Player 2 does not observe (dashed line)' },
    },
    steps: [
      { show: ['A'], who: 0, h: 'Two information sets for player 2, so four strategies',
        d: 'Player 2 sees whether player 1 chose O or F. A strategy must say what to do in both cases: oo, of, fo, ff ("of" = o after O, f after F).',
        why: 'A strategy is a complete plan for every information set, including the ones that are not reached.' },
      { show: ['A'], who: 2, h: 'After O: player 2 plays o (1 > 0)', A: { focus: ['O'], cmp: [['O>o', 2], ['O>f', 2]], pick: { O: 'o' }, val: { O: '(2, 1)' } },
        why: 'Being together matters more to player 2 than the place: given that player 1 is at O, going there is best.' },
      { show: ['A'], who: 2, h: 'After F: player 2 plays f (2 > 0)', A: { focus: ['F'], cmp: [['F>o', 2], ['F>f', 2]], pick: { F: 'f' }, val: { F: '(1, 2)' } } },
      { show: ['A'], who: 1, h: 'Player 1: O gives 2, F gives 1, so O',
        d: 'Player 1 knows player 2 will follow him and picks his favourite place.',
        why: 'Moving first and being observed lets player 1 select the equilibrium he likes: a first-mover advantage.',
        res: 'Backward-induction solution (O; of), outcome (2, 1).',
        A: { focus: [''], pick: { '': 'O' }, val: { '': '(2, 1)' } } },
      { show: ['A', 'B'], who: 0, h: 'If player 2 cannot see the move, backward induction fails',
        d: 'With the dashed line player 2 does not know at which node he is. There is no proper subgame; the tree is just the simultaneous BoS with pure equilibria (O, o), (F, f) and a mixed one.',
        why: 'What matters is information, not the clock: "simultaneous" means not knowing the other\'s choice.' },
    ],
  });

  walk({
    id: 'entryN', lec: 'l6', sec: 's2', title: 'Entry with a move of Nature: expected payoffs at an information set',
    names: { 1: 'Entrant', 2: 'Monopolist' },
    panels: { A: { type: 'tree', tree: 'l6entryN' } },
    steps: [
      { who: 'N', h: 'After entry, Nature draws high or low demand (½ each)',
        d: 'The monopolist does not observe the demand state: its two nodes are joined by a dashed line (one information set).',
        why: 'Exogenous uncertainty is modelled as a move of an extra player, Nature, with known probabilities.',
        A: { focus: ['E>0', 'E>1'] } },
      { who: 2, h: 'The monopolist compares expected payoffs',
        d: H`Fight: \(\tfrac12\cdot0+\tfrac12\cdot(-1)=-\tfrac12\). Share: \(\tfrac12\cdot3+\tfrac12\cdot1=2\). It shares, at both nodes.`,
        why: 'At an information set the player must choose the same action at every node, so he weighs the nodes with their probabilities. (Here sharing is better in each state anyway.)',
        A: { cmp: [['E>0>f', 2], ['E>0>n', 2], ['E>1>f', 2], ['E>1>n', 2]], pick: { 'E>0': 'n', 'E>1': 'n' } } },
      { who: 1, h: H`The entrant: entering gives \(\tfrac12\cdot3+\tfrac12\cdot1=2>0\)`,
        d: 'Anticipating sharing, the entrant enters.',
        res: '(Enter, Share) with expected payoffs (2, 2).',
        A: { focus: [''], pick: { '': 'E' }, val: { E: '(2, 2) expected' } } },
    ],
  });

  const UA = 10, UWB = 2, Uw = 4, UL = 6.25, Upi = 25, UU = 12.5, ULeff = 25;
  const iso = l => (2 * UA * Math.sqrt(l) - Upi) / l, ic = l => UWB + UU / l;
  const lens = P => { const top = [], bot = []; for (let i = 1; i <= 200; i++) { const l = 30 * i / 200; if (l > UL && iso(l) > ic(l)) { top.push([l, iso(l)]); bot.push([l, ic(l)]); } } return top.length ? P.poly(top.concat(bot.reverse()), 'wk-good') : ''; };
  walk({
    id: 'union', lec: 'l6', sec: 's5', title: 'Wages and employment: the union sets w, the firm sets L',
    intro: H`Illustrative forms as in the lecture widget: revenue \(R(L)=2A\sqrt L\) with \(A=10\), union utility \(U=(w-\bar w)L\) with \(\bar w=2\).`,
    names: { 1: 'Union', 2: 'Firm' },
    panels: { A: { type: 'plot', x0: 0, x1: 30, y0: 0, y1: 9, w: 470, h: 340, xl: 'employment L', yl: 'wage w', legend: '<span class="l2">labour demand L*(w)</span><span class="lm">iso-profit lines</span><span class="l1">union indifference curve</span><span class="la">efficient bargains</span>' } },
    steps: [
      { who: 2, h: 'Backward induction: first the firm in stage 2',
        d: H`Given \(w\), the firm maximises \(R(L)-wL\): \(R'(L)=w\iff A/\sqrt L=w\iff L^*(w)=(A/w)^2\). Higher wage, lower employment.`,
        why: 'The union moves first, so it must know how the firm will react to every wage it might set.',
        A: { add: P => P.fn(l => UA / Math.sqrt(l), 'c2', 1.25, 30) + P.lab(3.2, 7.6, 'L*(w)', 'lbl2', 'start') } },
      { who: 2, h: 'Iso-profit lines peak on L*(w); lower lines mean higher profit',
        d: H`Wages that keep profit at \(\bar\pi\): \(w=(R(L)-\bar\pi)/L\). The two grey curves are \(\bar\pi=25\) and \(\bar\pi=40\).`,
        why: 'For a given employment level the firm is happier with a lower wage, so curves further down belong to higher profits; each curve is flat exactly where R\'(L) = w.',
        A: { add: P => P.fn(iso, 'cm', 1.6, 30) + P.fn(l => (2 * UA * Math.sqrt(l) - 40) / l, 'cm', 4.05, 30) + P.lab(29.5, 2.55, 'π = 40', 'wk-t', 'end') + P.lab(29.5, 3.05, 'π = 25', 'wk-t', 'end') } },
      { who: 1, h: 'The union picks the best point on the firm\'s labour-demand curve',
        d: H`It maximises \((w-\bar w)\,L^*(w)=(w-2)\cdot100/w^2\): FOC gives \(w^*=2\bar w=4\), so \(L^*=6.25\). Its indifference curve (blue) is tangent to \(L^*(w)\) there.`,
        why: 'The union cannot choose L; it can only choose w and must accept the firm\'s reaction. So it moves along L*(w) to its highest indifference curve.',
        A: { add: P => P.fn(ic, 'c1', 1.45, 30) + P.dot(UL, Uw, 'dot', 6) + P.lab(UL + 0.6, Uw + 0.55, '(L*, w*) = (6.25, 4)', 'wk-t', 'start') } },
      { who: 0, h: 'The outcome is inefficient: the green lens',
        d: 'At the equilibrium the union\'s curve is tangent to L*(w), but the firm\'s iso-profit line is flat. Between the two curves lies a lens of (w, L) pairs that give the union more utility <em>and</em> the firm more profit: lower the wage a little, raise employment a little. Efficient bargains satisfy R\'(L) = w̄, here L = 25 (green line).',
        why: 'The inefficiency comes from the timing: the union sets the wage alone and the firm then sets employment alone. Negotiating w and L jointly removes it.',
        res: 'Subgame-perfect outcome (w*, L*) = (4, 6.25): Pareto inefficient.',
        A: { add: [lens, P => P.vline(ULeff, 'ca')] } },
    ],
  });

  /* ---------- L7 ---------- */
  walk({
    id: 'simple7', lec: 'l7', sec: 's3', title: 'A simple two-stage game: subgames, SPE and the non-credible (L, rr)',
    panels: {
      A: { type: 'tree', tree: 'l7simple' },
      B: { type: 'mx', title: 'Normal form', rows: ['L', 'R'], cols: ['ll', 'lr', 'rl', 'rr'], cells: [['3,1', '3,1', '1,2', '1,2'], ['2,1', '0,0', '2,1', '0,0']], cap: 'Player 2\'s strategy "rl" means r after L, l after R.' },
    },
    steps: [
      { show: ['A'], who: 0, h: 'Three subgames',
        d: 'The whole game, and one subgame at each of player 2\'s nodes (both are singleton information sets and cut no information set).',
        why: 'SPE requires a Nash equilibrium in every subgame, so we first list them.',
        A: { sub: ['', 'L', 'R'] } },
      { show: ['A'], who: 2, h: 'Subgame after L: r (2) beats l (1)', A: { focus: ['L'], cmp: [['L>l', 2], ['L>r', 2]], pick: { L: 'r' }, val: { L: '(1, 2)' } },
        why: 'In a one-player subgame the Nash equilibrium is simply the best choice of that player.' },
      { show: ['A'], who: 2, h: 'Subgame after R: l (1) beats r (0)', A: { focus: ['R'], cmp: [['R>l', 2], ['R>r', 2]], pick: { R: 'l' }, val: { R: '(2, 1)' } } },
      { show: ['A'], who: 1, h: 'Player 1: L leads to (1, 2), R to (2, 1), so R',
        why: 'Player 1 compares the values of the two subgames, which already contain player 2\'s optimal reactions.',
        A: { focus: [''], pick: { '': 'R' }, val: { '': '(2, 1)' } } },
      { show: ['A'], who: 0, h: 'SPE: (R; rl), equilibrium path (R, l)',
        d: 'The SPE also says what player 2 would do off the path (r after L): a strategy is a complete plan. Writing just "R" or "(R, l)" is not an SPE.',
        res: 'SPE (R; rl) with payoffs (2, 1).' },
      { show: ['A', 'B'], who: 0, h: 'The normal form has two pure Nash equilibria',
        d: '(R, rl) and (L, rr). Only (R, rl) is subgame perfect. (R, ll) is not a Nash equilibrium: against ll, player 1 gets 3 with L and only 2 with R.',
        why: 'Nash equilibrium checks best responses only on the path; off-path choices of player 2 can be anything that keeps player 1 from deviating.',
        B: { auto: 'ne' } },
      { show: ['A', 'B'], who: 2, h: '(L, rr): the threat "r after R" is not credible',
        d: 'In (L, rr) player 2 threatens to answer R with r, giving player 1 only 0, so player 1 plays L. But in the subgame after R, r gives player 2 0 < 1.',
        why: 'Subgame perfection removes Nash equilibria that rely on actions no rational player would take once the subgame is actually reached.',
        A: { reset: true, pick: { '': 'L', L: 'r', R: 'r' }, focus: ['R'], cmp: [['R>l', 2], ['R>r', 2]], bad: [['R', 'r']] }, B: { focus: { cell: [[0, 3]] } } },
    ],
  });

  walk({
    id: 'entry7', lec: 'l7', sec: 's4', title: 'Extended entry game: replace the simultaneous subgame by its equilibrium',
    names: { 1: 'Firm E (entrant)', 2: 'Firm I (incumbent)' },
    panels: {
      A: { type: 'tree', tree: 'l7entry' },
      B: { type: 'mx', title: 'The subgame after In', p1: 'Firm E', p2: 'Firm I', rows: ['Acc', 'Fig'], cols: ['Acc', 'Fig'], cells: [['3,1', '-2,-1'], ['1,-2', '-3,-1']] },
    },
    steps: [
      { show: ['A'], who: 0, h: 'Two subgames: the whole game and the one after In',
        d: 'Firm I does not see E\'s second-stage choice (dashed line), so no subgame can start at one of I\'s nodes. The subgames are the whole game and the game that starts after In.',
        why: 'We cannot start at the very end because firm I has a non-singleton information set. Generalised backward induction starts with the smallest subgame instead.',
        A: { sub: ['', 'In'] } },
      { show: ['A', 'B'], who: 1, h: 'Write the subgame as a matrix: Acc is strictly dominant for E',
        d: 'Against Acc: 3 > 1; against Fight: -2 > -3.',
        why: 'Inside the subgame E and I move simultaneously, so we solve it like a static game.',
        B: { focus: { r: [0, 1] }, cmp: [[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]], arrows: [[[1, 0], [0, 0], 1], [[1, 1], [0, 1], 1]], br: [[0, 0, 1], [0, 1, 1]] } },
      { show: ['A', 'B'], who: 2, h: 'I\'s best response to Acc is Acc (1 > -1)',
        d: 'Unique Nash equilibrium of the subgame: (Acc, Acc) with payoffs (3, 1).',
        why: 'I can predict that E accommodates (dominant strategy) and fighting would only cost I.',
        B: { cmp: [[0, 0, 2], [0, 1, 2]], br: [[0, 0, 2]], ne: [[0, 0]] } },
      { show: ['A', 'B'], who: 0, h: 'Replace the subgame by its equilibrium payoffs (3, 1)',
        d: 'The faded part of the tree is summarised by one payoff vector.',
        A: { dim: ['In'], val: { In: '(3, 1)' }, pick: { In: 'Acc', 'In>Acc': 'Acc', 'In>Fight': 'Acc' } } },
      { show: ['A'], who: 1, h: 'E in the reduced game: In gives 3 > 0 (Out)',
        why: 'E anticipates that after entry both accommodate.',
        res: 'SPE: (In, Acc; Acc), outcome (3, 1).',
        A: { focus: [''], pick: { '': 'In' }, val: { '': '(3, 1)' } } },
    ],
  });

  walk({
    id: 'vbos', lec: 'l7', sec: 's1', title: 'Voluntary Battle of the Sexes: three SPE, one for each subgame equilibrium',
    panels: {
      A: { type: 'tree', tree: 'l7vbos' },
      B: { type: 'mx', title: 'The subgame after Y', rows: ['O', 'F'], cols: ['o', 'f'], cells: [['2,1', '0,0'], ['0,0', '1,2']] },
    },
    steps: [
      { show: ['A'], who: 0, h: 'Player 2 cannot see O or F: we cannot start at the end',
        d: 'Without a belief about player 1\'s choice, player 2\'s best response is not defined. The proper subgames are the whole game and the one after Y.',
        why: 'This is problem 1 of plain backward induction (imperfect information), solved by subgame perfection.',
        A: { sub: ['', 'Y'], focus: ['Y>O', 'Y>F'] } },
      { show: ['A', 'B'], who: 0, h: 'The subgame after Y is the simultaneous BoS: three Nash equilibria',
        d: H`(O, o) with (2, 1), (F, f) with (1, 2), and the mixed one with payoffs \((\tfrac23,\tfrac23)\).`,
        B: { auto: 'ne' } },
      { show: ['A', 'B'], who: 1, h: 'If (O, o) is played after Y: Y gives 2 > 1.5',
        d: 'Replace the subgame by (2, 1). Player 1 enters the game.',
        why: 'Player 1 compares the value of the subgame with the sure 1.5 from N.',
        res: 'SPE 1: ((Y, O), o), outcome (2, 1).',
        A: { dim: ['Y'], val: { Y: '(2, 1)' }, pick: { '': 'Y', Y: 'O', 'Y>O': 'o', 'Y>F': 'o' } }, B: { focus: { cell: [[0, 0]] } } },
      { show: ['A', 'B'], who: 1, h: 'If (F, f) is played after Y: Y gives 1 < 1.5, so N',
        d: 'Player 1 stays out. His plan still specifies F in the (unreached) subgame.',
        res: 'SPE 2: ((N, F), f), outcome (1.5, 1.5).',
        A: { reset: true, dim: ['Y'], val: { Y: '(1, 2)' }, pick: { '': 'N', Y: 'F', 'Y>O': 'f', 'Y>F': 'f' } }, B: { focus: { cell: [[1, 1]] } } },
      { show: ['A', 'B'], who: 1, h: H`If the mixed equilibrium is played: Y gives \(\tfrac23< 1.5\), so N`,
        res: 'SPE 3: N, and the mixed strategies in the subgame.',
        why: 'Each Nash equilibrium of the subgame gives its own reduced game and hence its own SPE. SPE need not be unique.',
        A: { reset: true, dim: ['Y'], val: { Y: '(2/3, 2/3)' }, pick: { '': 'N' } }, B: { probR: ['2/3', '1/3'], probC: ['1/3', '2/3'] } },
    ],
  });

  walk({
    id: 'cent7', lec: 'l7', sec: 's5', title: 'Rosenthal\'s centipede: backward induction stops at once',
    panels: { A: { type: 'tree', tree: 'l7cent', gap: 86 } },
    steps: [
      { who: 2, h: 'Last node: player 2 stops (4 > 3)', A: { focus: ['w>w>w'], cmp: [['w>w>w>s', 2], ['w>w>w>w', 2]], pick: { 'w>w>w': 's' }, val: { 'w>w>w': '(1, 4)' } },
        why: 'At the last node there is no future: stopping gives 4, continuing 3.' },
      { who: 1, h: 'Player 1 before: stopping gives 2, continuing leads to (1, 4)', A: { focus: ['w>w'], cmp: [['w>w>s', 1]], pick: { 'w>w': 's' }, val: { 'w>w': '(2, 2)' } },
        why: 'Player 1 anticipates that player 2 will stop next, which would leave him only 1.' },
      { who: 2, h: 'Player 2: stopping gives 3, continuing leads to (2, 2)', A: { focus: ['w'], cmp: [['w>s', 2]], pick: { w: 's' }, val: { w: '(0, 3)' } } },
      { who: 1, h: 'Player 1 at the root: stopping gives 1, continuing leads to (0, 3)', A: { focus: [''], cmp: [['s', 1]], pick: { '': 's' }, val: { '': '(1, 1)' } },
        res: 'Unique SPE: every player stops whenever it is his turn. Outcome (1, 1), although continuing to the end would give both 3.' },
      { who: 0, h: 'Is this convincing?',
        d: 'If player 1 does not stop at the root, should player 2 still believe he is rational? Maybe he signals willingness to cooperate. In experiments (McKelvey and Palfrey, 1992) players continue for several rounds.',
        why: 'Whether the SPE is convincing depends on how players interpret deviations from the equilibrium path. Backward induction assumes that rationality is believed even after it has been contradicted.' },
    ],
  });

  walk({
    id: 'entrep', lec: 'l7', sec: 's5', title: 'Two entrepreneurs (Dec 2013 exam): how envy makes punishment credible',
    panels: {
      A: { type: 'tree', tree: 'exEnt', title: 'Original payoffs' },
      B: { type: 'tree', tree: 'exEntEnvy', title: 'Envious entrepreneur 2: u₂ = 2π₂ - π₁' },
    },
    steps: [
      { show: ['A'], who: 0, h: 'Three subgames',
        d: 'The whole game and one at each of entrepreneur 2\'s nodes (he observes entrepreneur 1).',
        A: { sub: ['', 'T', 'NT'] } },
      { show: ['A'], who: 2, h: 'Entrepreneur 2: after T he stays out (0 > -1), after NT he enters (4 > 0)',
        why: 'If the market gap is already taken, entering would only cause a loss for both.',
        A: { cmp: [['T>T', 2], ['T>NT', 2], ['NT>T', 2], ['NT>NT', 2]], pick: { T: 'NT', NT: 'T' }, val: { T: '(4, 0)', NT: '(0, 4)' } } },
      { show: ['A'], who: 1, h: 'Entrepreneur 1: T gives 4, NT gives 0, so T',
        why: 'First-mover advantage: entrepreneur 1 occupies the gap first, knowing 2 will then stay out.',
        res: 'SPE (T; NT, T), outcome (4, 0).',
        A: { focus: [''], pick: { '': 'T' }, val: { '': '(4, 0)' } } },
      { show: ['A', 'B'], who: 0, h: 'Now entrepreneur 2 is envious',
        d: H`\(u_2=\pi_2+(\pi_2-\pi_1)=2\pi_2-\pi_1\): (T,T) \(-1\), (T,NT) \(-4\), (NT,T) \(8\), (NT,NT) \(0\).`,
        why: 'Only player 2\'s payoffs change; the tree and player 1\'s payoffs are the same.',
        B: { sub: ['', 'T', 'NT'] } },
      { show: ['A', 'B'], who: 2, h: 'Envious 2 enters in both cases: after T (-1 > -4), after NT (8 > 0)',
        why: 'Seeing entrepreneur 1 earn 4 while he gets 0 hurts so much that entering and causing a loss for both is better for him.',
        B: { cmp: [['T>T', 2], ['T>NT', 2], ['NT>T', 2], ['NT>NT', 2]], pick: { T: 'T', NT: 'T' }, val: { T: '(-1, -1)', NT: '(0, 8)' } } },
      { show: ['A', 'B'], who: 1, h: 'Entrepreneur 1: T gives -1, NT gives 0, so NT',
        why: 'Envy works as a commitment device: the punishment of 1\'s entry is now in 2\'s own interest, so it is credible.',
        res: 'New SPE (NT; T, T), outcome (0, 8).',
        B: { focus: [''], pick: { '': 'NT' }, val: { '': '(0, 8)' } } },
    ],
  });

  /* ---------- L8 ---------- */
  const fs = x => 100 - x - 0.5 * Math.max(2 * x - 100, 0);
  walk({
    id: 'ultimatum', lec: 'l8', sec: 's2', title: 'Ultimatum game: SPE, many Nash equilibria, and an envious responder',
    names: { 1: 'A (proposer)', 2: 'B (responder)' },
    panels: {
      A: { type: 'tree', tree: 'ultD', title: 'Two of the possible demands' },
      B: { type: 'plot', title: "B's payoffs when A demands x of €100", x0: 0, x1: 100, y0: -50, y1: 100, w: 440, h: 300, xl: "A's demand x", yl: "B's payoff", xt: [0, 25, 50, 60, 75, 100], legend: '<span class="l2">accept: 100 - x</span><span class="lm">reject: 0</span><span class="la">accept with envy α = 0.5</span>' },
    },
    steps: [
      { show: ['A'], who: 2, h: 'B accepts both offers',
        d: 'Demand 50: accepting gives B 50 > 0. Demand 100: accepting gives 0 = 0, and an indifferent B accepts (assumption).',
        why: 'Rejecting gives B nothing. Any positive amount, however small, is better than nothing for a selfish B.',
        A: { cmp: [['x=100>Ac', 2], ['x=100>Re', 2], ['x=50>Ac', 2], ['x=50>Re', 2]], pick: { 'x=100': 'Ac', 'x=50': 'Ac' } } },
      { show: ['A'], who: 1, h: 'A demands everything: x = 100',
        d: 'Anticipating acceptance, A keeps the whole pie.',
        res: 'SPE payoffs (100, 0): B accepts everything, A demands x = 100.',
        A: { focus: [''], pick: { '': 'x=100' }, val: { '': '(100, 0)' } } },
      { show: ['B'], who: 2, h: 'For every demand x, accepting beats rejecting',
        d: H`Accept: \(100-x\ge0\); reject: 0. The orange line is never below the grey one.`,
        why: 'This holds at every one of B\'s (infinitely many) decision nodes, so sequential rationality forces "accept everything".',
        B: { add: P => P.fn(x => 100 - x, 'c2') + P.hline(0, 'cm') } },
      { show: ['B'], who: 0, h: 'But there are infinitely many Nash equilibria',
        d: H`Take any split, e.g. \(x=60\). B's strategy "reject if A demands more than 60" and A's demand 60 are mutual best responses: A cannot gain (more is rejected), B gets 40 by accepting.`,
        why: 'The threat to reject demands above 60 is never tested in this equilibrium. If tested, rejecting would give B 0 instead of 100 - x > 0 (red area): it is not credible, so only (100, 0) survives as an SPE.',
        B: { tmp: P => P.vline(60, 'cbad') + P.poly([[60, 0], [60, 40], [100, 0]], 'wk-bad') + P.lab(63, 70, 'B threatens to reject', 'wk-t', 'start') } },
      { show: ['B'], who: 2, h: 'Envious B (Fehr-Schmidt, α = 0.5)',
        d: H`Accepting gives \(u_B=100-x-0.5\max\{x-(100-x),0\}=150-2x\) for \(x>50\) (green). Rejecting still gives 0 and no inequality.`,
        why: 'B suffers from disadvantageous inequality. A large demand can make accepting worse than rejecting, so B now rejects offers that are too unequal.',
        B: { add: P => P.fn(fs, 'ca') } },
      { show: ['B'], who: 1, h: 'A demands the most B still accepts: x = 75',
        d: H`\(150-2x=0\iff x=75\). In general \(x^*=\dfrac{100(1+\alpha)}{1+2\alpha}\): \(\alpha=0\) gives 100, \(\alpha\to\infty\) gives 50.`,
        why: 'A keeps as much as possible subject to B\'s acceptance. This matches experiments better: offers of about a third, low offers rejected (Güth et al., 1982).',
        res: 'With α = 0.5: A demands 75, B accepts and gets 25.',
        B: { add: P => P.dot(75, 0, 'dot-a', 6) + P.lab(75, -12, 'x* = 75', 'lbla') } },
    ],
  });

  const dA = 0.9, dB = 0.9, Z = (1 - dB) / (1 - dA * dB);
  const bar = (P, y, a, la, lb) => P.rect(0, y - 0.3, a, y + 0.3, 'wk-f1') + P.rect(a, y - 0.3, 1, y + 0.3, 'wk-f2') + P.lab(a / 2, y + 0.06, la) + P.lab((1 + a) / 2, y + 0.06, lb);
  const stg = (P, y, t) => P.text(0.005, y + 0.37, t, 'wk-t', 'start');
  walk({
    id: 'rubinstein', lec: 'l8', sec: 's3', title: 'Rubinstein bargaining: working backwards through three stages',
    intro: H`Drawn with \(\delta_A=\delta_B=0.9\). Blue: A's share, orange: B's share of the pie in the stage where the offer is made.`,
    names: { 1: 'A', 2: 'B' },
    panels: { A: { type: 'plot', x0: 0, x1: 1, y0: 0.55, y1: 3.75, w: 500, h: 280, xl: 'share of the pie', yl: '', yt: [], base: P => stg(P, 3, 'Stage 1 (A offers)') + stg(P, 2, 'Stage 2 (B offers)') + stg(P, 1, 'Stage 3 (A offers)') } },
    steps: [
      { who: 0, h: 'No last stage, but the game repeats itself',
        d: H`The subgame that starts in stage 3 (A proposes) looks exactly like the whole game. Call \(Z\) the share A demands for himself whenever he proposes, and assume it is the same in stages 1, 3, 5, ...`,
        why: 'SPE requires a Nash equilibrium in every subgame; since the stage-3 subgame is identical to the whole game, the same equilibrium share must apply there (stationary equilibrium).' },
      { who: 1, h: H`Stage 3: A proposes \((Z,\,1-Z)\) and B accepts`,
        d: H`Seen from stage 1 these payoffs are worth \(Z\delta_A^2\) to A and \((1-Z)\delta_B^2\) to B.`,
        A: { add: P => bar(P, 1, Z, 'A: Z', 'B: 1 - Z') } },
      { who: 2, h: H`Stage 2: B offers A exactly \(Z\delta_A\)`,
        d: H`If A rejects, he gets \(Z\) one period later, worth \(Z\delta_A\) in stage 2. So A accepts any offer of at least \(Z\delta_A\). B offers exactly that and keeps \(1-Z\delta_A\).`,
        why: 'B gives A no more than A could secure by waiting. Common slip: it is Zδ_A, not Zδ_A², because the comparison is made in stage 2.',
        A: { add: P => bar(P, 2, Z * dA, 'A: Zδ = ' + fmt(Z * dA, 3), 'B: 1 - Zδ = ' + fmt(1 - Z * dA, 3)) } },
      { who: 1, h: H`Stage 1: A offers B exactly \(\delta_B(1-Z\delta_A)\)`,
        d: H`If B rejects, he gets \(1-Z\delta_A\) in stage 2, worth \(\delta_B(1-Z\delta_A)\) now. A offers exactly this and keeps \(1-\delta_B(1-Z\delta_A)\).`,
        why: 'The same logic one stage earlier: the proposer offers the responder precisely the value of the responder\'s best alternative (waiting and proposing himself).',
        A: { add: P => bar(P, 3, 1 - dB * (1 - Z * dA), 'A keeps ' + fmt(1 - dB * (1 - Z * dA), 3), 'B: ' + fmt(dB * (1 - Z * dA), 3)) } },
      { who: 0, h: 'Consistency: what A keeps in stage 1 must equal Z',
        d: H`\(Z=1-\delta_B(1-Z\delta_A)\Rightarrow Z=\dfrac{1-\delta_B}{1-\delta_A\delta_B}\). With 0.9 and 0.9: \(Z=0.1/0.19\approx0.526\). The first and third bars coincide.`,
        why: 'Stationarity closes the argument. The offer is accepted immediately, so there is no delay in equilibrium.',
        res: H`A gets \(\frac{1-\delta_B}{1-\delta_A\delta_B}\), B gets \(\frac{\delta_B-\delta_A\delta_B}{1-\delta_A\delta_B}\). Unique SPE (Osborne 471.3).`,
        A: { tmp: P => P.vline(Z, 'cbad') } },
      { who: 0, h: 'Patience is bargaining power; moving first is an advantage',
        d: H`If B were less patient, \(\delta_B=0.5\): \(Z=0.5/0.55\approx0.91\) (dashed line). With equal \(\delta\): \(Z=\frac1{1+\delta}>\frac12\) (first-mover advantage), and \(Z\to\frac12\) as \(\delta\to1\).`,
        why: 'The player with the lower cost of delay can credibly hold out longer, so the other must concede more. Negotiate when your delay costs are low relative to your partner\'s.',
        A: { tmp: P => P.vline(0.5 / 0.55, 'cm') + P.lab(0.5 / 0.55 - 0.01, 3.6, 'if δ_B = 0.5', 'wk-t', 'end') } },
    ],
  });

  /* ---------- L9 ---------- */
  walk({
    id: 'nashbarg', lec: 'l9', sec: 's3', title: 'Nash bargaining: Rosemary and Jerry',
    intro: 'Joint value $50,000; Jerry gets 10,000 + t, Rosemary 40,000 - t; disagreement points Jerry 15,000, Rosemary 10,000. Amounts in thousands.',
    panels: { A: { type: 'plot', x0: 0, x1: 52, y0: 0, y1: 52, w: 420, h: 390, xl: "Jerry's payoff x_J (thousand $)", yl: 'Rosemary x_R', legend: '<span class="la">possible agreements: x_J + x_R = 50</span><span class="l2">level curves of the Nash product</span>' } },
    steps: [
      { who: 0, h: 'All agreements: the line x_J + x_R = 50',
        d: 'Any salary t splits the joint value of 50: Jerry 10 + t, Rosemary 40 - t.',
        why: 'The constraint binds at the solution: below the line both could get more.',
        A: { add: P => P.line([[0, 50], [50, 0]], 'ca') } },
      { who: 0, h: 'The disagreement point d = (15, 10)',
        d: 'Without agreement Jerry works on his own (15) and Rosemary hires a less qualified applicant (10). Agreements both accept lie in the shaded triangle.',
        why: 'Individual rationality: nobody accepts less than his fall-back option.',
        A: { add: [P => P.poly([[15, 10], [40, 10], [15, 35]], 'wk-acc'), P => P.dot(15, 10, 'dot', 5) + P.lab(14, 7, 'd = (15, 10)', 'wk-t', 'end')] } },
      { who: 0, h: 'Maximise the product of the gains (x_J - 15)(x_R - 10)',
        d: 'The orange curves are combinations with the same product. The highest one that still touches the line is tangent at (27.5, 22.5).',
        why: 'The Nash solution picks the agreement where the product of both players\' gains over disagreement is largest.',
        A: { add: P => P.fn(x => 10 + 60 / (x - 15), 'cm', 16.2, 52) + P.fn(x => 10 + 156.25 / (x - 15), 'c2', 18.8, 52) } },
      { who: 0, h: 'Each gets his disagreement payoff plus half the surplus',
        d: H`Surplus: \(50-15-10=25\). Jerry: \(15+12.5=27.5\); Rosemary: \(10+12.5=22.5\). Salary: \(10+t=27.5\Rightarrow t=17.5\) thousand.`,
        why: H`FOC of \((x_1-d_1)(v^*-x_1-d_2)\): \(x_1^*=d_1+\tfrac12(v^*-d_1-d_2)\). Better outside options raise your own share one for one.`,
        res: 'Jerry is hired at a salary of $17,500.',
        A: { add: P => P.dot(27.5, 22.5, 'dot-a', 6) + P.lab(29, 24.5, '(27.5, 22.5)', 'lbla', 'start') } },
      { who: 0, h: 'Generalised solution with bargaining power α',
        d: H`\(x_J^*=d_J+\alpha(v^*-d_J-d_R)\). With \(\alpha=0.7\) for Jerry: \(15+0.7\cdot25=32.5\), salary 22.5 thousand (dashed point).`,
        why: 'α captures sources of bargaining power outside the model, for example patience in the Rubinstein game (Binmore, Rubinstein and Wolinsky).',
        A: { tmp: P => P.dot(32.5, 17.5, 'dot-2', 5) + P.lab(34, 18.5, 'α = 0.7', 'lbl2', 'start') } },
    ],
  });

  /* ---------- L10 ---------- */
  walk({
    id: 'pd2', lec: 'l10', sec: 's2', title: 'Prisoner\'s Dilemma played twice: unravelling from the last stage',
    panels: { A: { type: 'mx', rows: ['O', 'U'], cols: ['L', 'R'], cells: [['1,1', '5,0'], ['0,5', '4,4']], cap: 'Stage game. U and R mean cooperation.' } },
    steps: [
      { who: 0, h: 'The stage game has a unique Nash equilibrium (O, L)',
        d: 'O and L are dominant: 1 > 0 and 5 > 4 for each player.',
        A: { auto: 'ne' } },
      { who: 0, h: 'Stage 2 is the last stage: (O, L) whatever happened before',
        d: 'After any history the stage-2 subgame is just the stage game, so its unique NE (O, L) with (1, 1) is played.',
        why: 'There is no future left to reward cooperation or punish defection. Any promise about stage 2 that is not the stage NE is not credible.' },
      { who: 0, h: 'The reduced stage-1 game: add (1, 1) to every cell',
        d: 'Stage 2 always adds (1, 1), regardless of what is played in stage 1.',
        why: 'Since stage-2 play does not depend on stage-1 play, it cannot change the incentives in stage 1.',
        A: { reset: true, cells: [['2,2', '6,1'], ['1,6', '5,5']], rows: ['O₁', 'U₁'], cols: ['L₁', 'R₁'], cap: 'Reduced game in stage 1 (stage-2 payoffs added).' } },
      { who: 0, h: 'The reduced game again has the unique NE (O₁, L₁)',
        d: 'Adding a constant does not change best responses.',
        res: 'Unique SPE: O and L in every stage after every history.',
        A: { auto: 'ne' } },
      { who: 0, h: 'General result and its limit',
        d: 'If the stage game has a unique NE, every finite repetition has a unique SPE: the stage NE in every stage. If the stage game has several NE, the last-stage equilibrium can depend on the history (reward or punishment), and cooperation earlier can be supported.' },
    ],
  });

  const pvC = d => 4 / (1 - d), pvD = d => 5 + d / (1 - d);
  walk({
    id: 'grim', lec: 'l10', sec: 's3', title: 'Grim trigger in the infinitely repeated Prisoner\'s Dilemma: the critical δ',
    panels: {
      A: { type: 'plot', title: "Player 2's payoff in each period", x0: 0.4, x1: 8.6, y0: 0, y1: 5.6, w: 440, h: 230, xl: 'period t', yl: 'payoff', xt: [1, 2, 3, 4, 5, 6, 7, 8], legend: '<span class="l1">stick to grim trigger: 4, 4, 4, ...</span><span class="l2">deviate once: 5, 1, 1, ...</span>' },
      B: { type: 'plot', title: 'Present values', x0: 0, x1: 0.8, y0: 0, y1: 21, w: 440, h: 280, xl: 'discount factor δ', yl: 'present value', xt: [0, 0.25, 0.5, 0.75], legend: '<span class="l1">cooperate: 4/(1-δ)</span><span class="l2">deviate: 5 + δ/(1-δ)</span>' },
    },
    steps: [
      { show: ['A'], who: 0, h: 'The grim trigger strategy',
        d: 'Play R in period 1. From period 2 on, play R if all previous outcomes were (U, R); otherwise play L forever. Player 1 uses the same strategy with U and O.',
        why: 'The threat of permanent punishment makes today\'s defection costly tomorrow. The strategy reacts to the outcome, so after any deviation both play the stage NE.' },
      { show: ['A'], who: 2, h: 'If player 2 sticks to the strategy: 4 every period',
        d: H`Present value \(4+4\delta+4\delta^2+\dots=\dfrac{4}{1-\delta}\).`,
        A: { add: P => [1, 2, 3, 4, 5, 6, 7, 8].map(t => P.rect(t - 0.38, 0, t - 0.02, 4, 'wk-f1')).join('') } },
      { show: ['A'], who: 2, h: 'If player 2 deviates: 5 once, then 1 forever',
        d: H`Present value \(5+\delta+\delta^2+\dots=5+\dfrac{\delta}{1-\delta}\).`,
        why: 'Deviating gains 1 today (5 instead of 4) but loses 3 in every later period (1 instead of 4), because player 1 punishes forever.',
        A: { add: P => [1, 2, 3, 4, 5, 6, 7, 8].map(t => P.rect(t + 0.02, 0, t + 0.38, t === 1 ? 5 : 1, 'wk-f2')).join('') } },
      { show: ['A', 'B'], who: 2, h: 'Deviation does not pay if δ ≥ 1/4',
        d: H`\(\dfrac{4}{1-\delta}\ge5+\dfrac{\delta}{1-\delta}\iff4\ge5-4\delta\iff\delta\ge\tfrac14\). General: \(\delta\ge\dfrac{T-R}{T-P}=\dfrac{5-4}{5-1}\).`,
        why: 'A patient player (high δ) values the future losses from punishment more than the one-time gain.',
        B: { add: [P => P.rect(0.25, 0, 0.8, 21, 'wk-good'), P => P.fn(pvC, 'c1', 0, 0.8) + P.fn(pvD, 'c2', 0, 0.8) + P.dot(0.25, 16 / 3, 'dot', 5) + P.lab(0.27, 3.2, 'δ = 1/4', 'wk-t', 'start') + P.lab(0.55, 18, 'cooperation pays', 'wk-t')] } },
      { show: ['A', 'B'], who: 0, h: 'Nash equilibrium in every subgame: so it is an SPE',
        d: '(1) Subgames after histories with only (U, R): identical to the whole game, so for δ ≥ 1/4 grim trigger is a NE there. (2) Subgames after any other history: both play (O, L) forever, the stage NE repeated; no unilateral deviation pays.',
        why: 'Every subgame of the infinitely repeated game looks like the whole game, so two groups of subgames cover everything.',
        res: 'For δ ≥ 1/4 mutual grim trigger is a subgame perfect equilibrium with cooperation in every period.' },
    ],
  });

  walk({
    id: 'folk', lec: 'l10', sec: 's4', title: 'The Folk theorem in a picture',
    panels: { A: { type: 'plot', x0: -0.3, x1: 5.6, y0: -0.3, y1: 5.6, w: 400, h: 380, xl: 'average payoff of player 1', yl: 'player 2', xt: [0, 1, 2, 3, 4, 5], yt: [0, 1, 2, 3, 4, 5] } },
    steps: [
      { who: 0, h: 'The four payoff pairs of the stage game',
        d: '(O, L) = (1, 1), (O, R) = (5, 0), (U, L) = (0, 5), (U, R) = (4, 4).',
        A: { add: P => [[1, 1], [5, 0], [0, 5], [4, 4]].map(([x, y]) => P.dot(x, y, 'dot', 5)).join('') + P.lab(1.15, 0.55, '(1, 1)', 'wk-t', 'start') + P.lab(4.15, 4.25, '(4, 4)', 'wk-t', 'start') + P.lab(5, 0.3, '(5, 0)', 'wk-t', 'end') + P.lab(0.15, 5.2, '(0, 5)', 'wk-t', 'start') } },
      { who: 0, h: 'Feasible payoffs: all convex combinations',
        d: 'Alternating between outcomes with suitable frequencies yields every point of the shaded area as an average payoff.',
        A: { add: P => P.poly([[1, 1], [5, 0], [4, 4], [0, 5]], 'wk-acc') } },
      { who: 0, h: 'The stage-game Nash equilibrium gives (1, 1)',
        d: 'Playing the stage NE forever is an SPE for every δ (Osborne 447.1), and no SPE gives a player less than 1 on average.',
        A: { add: P => P.line([[1, -0.3], [1, 5.6]], 'cm') + P.line([[-0.3, 1], [5.6, 1]], 'cm') } },
      { who: 0, h: 'Folk theorem: every feasible payoff above (1, 1) is possible',
        d: 'If δ is close enough to 1, every feasible (x₁, x₂) with x₁ > 1 and x₂ > 1 (green) is the average payoff of some SPE of the infinitely repeated game (Friedman, 1971). Mutual cooperation (4, 4) is one of them.',
        why: 'Deviations from any such path can be punished by reverting to the stage NE, which gives less than the path; patient players therefore stick to it.',
        res: 'Infinitely many SPE: the Folk theorem has little predictive power.',
        A: { add: P => P.poly([[1, 1], [4.75, 1], [4, 4], [1, 4.75]], 'wk-good') + P.dot(4, 4, 'dot-a', 6) } },
    ],
  });
})();
