/* Step-by-step games for Lectures 11-18 (Bayesian games, auctions, PBE, signalling, contracts, guilt, enforcement).
 * Loaded last of the walkthrough files: it also places all walkthroughs into the lecture pages. */
(function () {
  const walk = GT.walk;

  /* ---------- L11 ---------- */
  walk({
    id: 'bayesentry', lec: 'l11', sec: 's2', title: 'Entry with an unknown cost: a strategy for every type',
    names: { 1: 'Incumbent (player 1)', 2: 'Entrant (player 2)' },
    panels: {
      A: { type: 'mx', title: 'Player 1 has high cost (probability p)', p1: 'P1 high', p2: 'Player 2', rows: ['I', 'nI'], cols: ['E', 'nE'], cells: [['0,-1', '2,0'], ['2,1', '3,0']] },
      B: { type: 'mx', title: 'Player 1 has low cost (probability 1-p)', p1: 'P1 low', p2: 'Player 2', rows: ['I', 'nI'], cols: ['E', 'nE'], cells: [['3,-1', '5,0'], ['2,1', '3,0']] },
      C: { type: 'plot', title: "Player 2's expected payoffs", x0: 0, x1: 1, y0: -1.1, y1: 1.1, w: 380, h: 260, xl: 'p = Pr(high cost)', yl: 'player 2', xt: [0, 0.25, 0.5, 0.75, 1], legend: '<span class="l2">enter: 2p - 1</span><span class="lm">stay out: 0</span>' },
    },
    steps: [
      { show: ['A', 'B'], who: 'N', h: 'Harsanyi\'s trick: Nature draws player 1\'s cost',
        d: 'High cost with probability p, low cost with 1 - p. Player 1 learns his cost, player 2 only knows p (common knowledge). Player 2\'s payoffs are the same in both matrices: he has one type.',
        why: 'Incomplete information about payoffs becomes imperfect information about a move of Nature, which we know how to handle.' },
      { show: ['A', 'B'], who: 1, h: 'Each type of player 1 has a dominant strategy',
        d: 'High cost: nI is better against E (2 > 0) and against nE (3 > 2). Low cost: I is better against E (3 > 2) and against nE (5 > 3).',
        why: 'Player 1 knows his own cost, so each type simply solves its own matrix. A strategy now is a plan for every type: (high: nI, low: I).',
        A: { arrows: [[[0, 0], [1, 0], 1], [[0, 1], [1, 1], 1]], br: [[1, 0, 1], [1, 1, 1]] }, B: { arrows: [[[1, 0], [0, 0], 1], [[1, 1], [0, 1], 1]], br: [[0, 0, 1], [0, 1, 1]] } },
      { show: ['A', 'B', 'C'], who: 2, h: 'Player 2 expects nI from the high type and I from the low type',
        d: H`Enter: \(p\cdot1+(1-p)\cdot(-1)=2p-1\). Stay out: 0.`,
        why: 'Player 2 cannot see the type, so he weighs the payoffs in the rows that each type will actually play with the probability of that type.',
        A: { focus: { r: [1] }, cmp: [[1, 0, 2], [1, 1, 2]] }, B: { focus: { r: [0] }, cmp: [[0, 0, 2], [0, 1, 2]] }, C: { add: P => P.fn(p => 2 * p - 1, 'c2') + P.hline(0, 'cm') } },
      { show: ['C'], who: 2, h: 'Enter iff p > 1/2',
        d: 'Entry pays when the high-cost type (who does not invest) is likely enough. At p = 1/2 player 2 is indifferent.',
        res: 'BNE: s₁(high) = nI, s₁(low) = I; s₂ = E if p > 1/2 and nE if p < 1/2.',
        C: { add: [P => P.rect(0.5, -1.1, 1, 1.1, 'wk-good'), P => P.dot(0.5, 0, 'dot', 5) + P.lab(0.75, 0.75, 'enter', 'wk-t') + P.lab(0.25, 0.75, 'stay out', 'wk-t')] } },
    ],
  });

  const grove = [['L', 10, 14], ['M', 20, 24], ['H', 30, 34]];
  const groveBase = P => grove.map(([t, a, b], i) => P.line([[a, i + 1], [b, i + 1]], 'cm') + P.dot(a, i + 1, 'dot-1', 5) + P.dot(b, i + 1, 'dot-2', 5) + P.text(1, i + 1.05, 'type ' + t, 'wk-t', 'start')).join('');
  const sells = (P, p) => grove.filter(g => g[1] <= p).map((g, i) => P.rect(0, grove.indexOf(g) + 0.62, 40, grove.indexOf(g) + 1.38, 'wk-good')).join('') + P.vline(p, 'ca') + P.lab(p, 3.6, 'price ' + p, 'lbla');
  walk({
    id: 'grove', lec: 'l11', sec: 's4', title: 'The orange grove: how adverse selection unravels the market',
    names: { 1: 'Seller (player 1)', 2: 'Buyer (player 2)' },
    panels: { A: { type: 'plot', x0: 0, x1: 40, y0: 0.5, y1: 3.75, w: 470, h: 260, xl: 'price', yl: '', yt: [], xt: [0, 10, 14, 19, 20, 24, 30, 34, 40], base: groveBase, legend: '<span class="l1">seller\'s value 10, 20, 30</span><span class="l2">buyer\'s value 14, 24, 34</span><span class="la">price offered</span>' } },
    steps: [
      { who: 0, h: 'Trade is always efficient',
        d: 'For every quality the buyer values the grove 4 more than the seller. With complete information every grove would be sold.',
        why: 'The seller knows the quality; the buyer only knows that L, M and H are equally likely (1/3 each).' },
      { who: 2, h: 'Offer the average value, 24?',
        d: H`\(\tfrac13(14+24+34)=24\). But at 24 only types L and M sell (green rows); H (value 30) keeps the grove.`,
        why: 'Who accepts depends on the price: the sellers who accept are exactly those whose grove is worth less than the price.',
        A: { tmp: P => sells(P, 24) } },
      { who: 2, h: 'At prices from 20 to 30 only L and M sell: worth 19 on average',
        d: H`\(\tfrac12(14+24)=19< 20\). Every such price loses money, so the buyer offers no more than 19.`,
        why: 'Conditioning on acceptance: the expected value of what you actually get is lower than the unconditional average.',
        A: { tmp: P => sells(P, 20) } },
      { who: 2, h: 'Below 20, M drops out too: only L sells, worth 14',
        d: 'The buyer will pay at most 14.',
        A: { tmp: P => sells(P, 14) } },
      { who: 0, h: 'BNE: only the lowest quality is traded',
        d: H`Any price \(p^*\in[10,14]\) is a BNE: type L accepts iff \(p\ge p^*\), M iff \(p\ge20\), H iff \(p\ge30\); the buyer gets \(\tfrac13(14-p^*)\ge0\) and no other price does better.`,
        why: 'Common values (the seller\'s type affects the buyer\'s payoff) cause adverse selection. The same logic explains why low-risk types may stay uninsured, and why insurance is often made compulsory.',
        res: 'Only L trades, at a price between 10 and 14. Two thirds of the efficient trades do not happen.',
        A: { tmp: P => P.rect(10, 0.5, 14, 3.75, 'wk-acc') + sells(P, 12) } },
    ],
  });

  /* ---------- L12 ---------- */
  walk({
    id: 'fpa', lec: 'l12', sec: 's3', title: 'First-price auction: why you bid half your value',
    intro: 'Two bidders, values uniform on [0, 1000]. Drawn for a bidder with value v = 600 who expects the rival to bid half his value.',
    names: { 1: 'Bidder i' },
    panels: {
      A: { type: 'plot', title: 'Expected payoff of bidding x when v = 600', x0: 0, x1: 600, y0: 0, y1: 200, w: 440, h: 280, xl: 'bid x', yl: 'expected payoff', xt: [0, 150, 300, 450, 600], legend: '<span class="l1">(v - x) · Pr(win)</span>' },
      B: { type: 'plot', title: 'Equilibrium bid function', x0: 0, x1: 1000, y0: 0, y1: 1000, w: 380, h: 320, xl: 'value v', yl: 'bid b', legend: '<span class="lm">bid = value</span><span class="l1">equilibrium bid v/2</span>' },
    },
    steps: [
      { show: ['A'], who: 0, h: H`Guess the form of the equilibrium: \(b_j=a\,v_j\)`,
        d: H`If the rival bids \(a v_j\), bidding \(x\) wins iff \(x>av_j\iff v_j< x/a\). With \(v_j\) uniform on [0, 1000]: \(\Pr(\text{win})=\dfrac{x}{1000a}\).`,
        why: 'Strategy for finding a BNE: guess a bid function, compute the best response to it, and check that the best response has the guessed form.' },
      { show: ['A'], who: 1, h: 'The trade-off: a lower bid raises the surplus but lowers the chance of winning',
        d: H`Expected payoff \(\dfrac{(v-x)\,x}{1000a}\). With \(a=0.5\): bidding 150 wins with probability 0.3 and leaves 450 (payoff 135); bidding 450 wins with 0.9 but leaves only 150 (also 135).`,
        why: 'In a first-price auction you pay your own bid, so bidding your value would leave you nothing even when you win.',
        A: { add: P => P.fn(x => (600 - x) * x / 500, 'c1'), tmp: P => P.dot(150, 135, 'dot', 5) + P.dot(450, 135, 'dot', 5) + P.lab(150, 148, 'x = 150', 'wk-t') + P.lab(450, 148, 'x = 450', 'wk-t') } },
      { show: ['A'], who: 1, h: H`Maximise: FOC \(v-2x=0\Rightarrow x=v/2=300\)`,
        d: 'The best bid is exactly half the value, with expected payoff 180.',
        why: 'At the optimum, the marginal gain from a higher chance of winning equals the marginal loss of surplus.',
        A: { add: P => P.dot(300, 180, 'dot-1', 6) + P.line([[300, 0], [300, 180]], 'cm') + P.lab(300, 190, 'x* = 300 = v/2', 'lbl1') } },
      { show: ['B'], who: 0, h: 'The guess is confirmed: everybody bids half his value',
        d: H`The best response \(x=0.5v_i\) has the assumed form with \(a=0.5\). The gap between the lines is bid shading. With \(n\) bidders and uniform values: \(b=\frac{n-1}{n}v\).`,
        why: 'Mutual best responses for every type: a Bayesian Nash equilibrium. The highest value still wins, so the outcome is efficient.',
        res: H`BNE \(b_i=v_i/2\). Expected revenue \(\tfrac13\cdot1000\approx333\), the same as in the second-price auction (revenue equivalence).`,
        B: { add: [P => P.poly([[0, 0], [1000, 1000], [1000, 500]], 'wk-acc'), P => P.line([[0, 0], [1000, 1000]], 'cm') + P.line([[0, 0], [1000, 500]], 'c1') + P.lab(760, 300, 'b = v/2', 'lbl1') + P.lab(560, 700, 'b = v', 'wk-t')] } },
    ],
  });

  const doors = ['A', 'B', 'C'], pri = [1 / 3, 1 / 3, 1 / 3], lik = [1 / 2, 1, 0], post = [1 / 3, 2 / 3, 0];
  const dlab = P => doors.map((d, i) => P.text(i + 1, -0.07, 'door ' + d + (i === 0 ? ' (Ben)' : ''), 'wk-t', 'middle')).join('');
  const bars = (P, vals, off, cls, lab) => vals.map((v, i) => P.rect(i + 1 + off - 0.1, 0, i + 1 + off + 0.1, Math.max(v, 0.004), cls) + P.lab(i + 1 + off, v + 0.04, lab[i])).join('');
  walk({
    id: 'monty', lec: 'l12', sec: 's8', title: 'Monty Hall with Bayes\' rule: Ben picks A, Kevin opens C',
    panels: { A: { type: 'plot', x0: 0.45, x1: 3.55, y0: 0, y1: 1.12, w: 460, h: 280, xl: '', yl: 'probability', xt: [], yt: [0, 0.25, 0.5, 0.75, 1], base: dlab, legend: '<span class="l1">prior: car behind the door</span><span class="l2">Pr(Kevin opens C | car there)</span><span class="la">posterior after C is opened</span>' } },
    steps: [
      { who: 0, h: 'Priors: the car is behind each door with probability 1/3', A: { add: P => bars(P, pri, -0.24, 'wk-f1', ['1/3', '1/3', '1/3']) } },
      { who: 'N', h: 'How likely is it that Kevin opens C?',
        d: 'Kevin knows where the car is and never opens Ben\'s door or the car door. Car behind A: he opens B or C, so C with 1/2. Car behind B: he must open C (1). Car behind C: he never opens it (0).',
        why: 'The host\'s choice is informative because it depends on where the car is. This is the likelihood in Bayes\' rule.',
        A: { add: P => bars(P, lik, 0, 'wk-f2', ['1/2', '1', '0']) } },
      { who: 0, h: H`Total probability: \(\Pr(\text{opens }C)=\tfrac13\cdot\tfrac12+\tfrac13\cdot1+\tfrac13\cdot0=\tfrac12\)` },
      { who: 0, h: 'Posterior: A keeps 1/3, B rises to 2/3',
        d: H`\(\Pr(A\mid C)=\dfrac{\tfrac12\cdot\tfrac13}{\tfrac12}=\tfrac13\), \(\Pr(B\mid C)=\dfrac{1\cdot\tfrac13}{\tfrac12}=\tfrac23\).`,
        why: 'Opening C tells Ben nothing about his own door (Kevin could always open some goat door), but all the probability of C moves to B.',
        res: 'Switch to B: it wins the car with probability 2/3.',
        A: { add: P => bars(P, post, 0.24, 'wk-fa', ['1/3', '2/3', '0']) } },
    ],
  });

  walk({
    id: 'wcurse', lec: 'l12', sec: 's8', title: 'The winner\'s curse: bidding your expected value loses money',
    intro: 'Oil field worth 10, 20 or 30 (probabilities 1/4, 1/2, 1/4) to both firms; second-price auction; each firm gets a signal L or H.',
    names: { 1: 'Firm i' },
    panels: { A: { type: 'mx', plain: true, p1: 'Firm i\'s signal', p2: 'Firm j\'s signal', rows: ['L', 'H'], cols: ['L', 'H'], cells: [['v = 10', 'v = 20'], ['v = 20', 'v = 30']], cap: 'Each signal pair has probability 1/4.' } },
    steps: [
      { who: 0, h: 'Signals and values',
        d: 'v = 10 gives LL, v = 30 gives HH, v = 20 gives LH or HL with equal probability. So each cell has probability 1/4.',
        why: 'With common values the signals are correlated: your own signal tells you something about the rival\'s.' },
      { who: 1, h: 'With signal L the value is 10 or 20: expected value 15',
        d: H`\(\Pr(v=10\mid L)=\dfrac{1/4}{1/2}=\tfrac12\). Similarly \(E[v\mid H]=25\).`,
        A: { focus: { r: [0] }, cmp: [[0, 0, 1], [0, 1, 1]] } },
      { who: 1, h: 'Candidate: bid the expected value, 15 with L and 25 with H',
        A: { cells: [['both bid 15', 'i: 15, j: 25'], ['i: 25, j: 15', 'both bid 25']] } },
      { who: 1, h: 'When does firm i win with signal L?',
        d: 'Rival also has L (probability 1/2): both bid 15, a coin decides, the price is 15 and v = 10, a loss of 5. Rival has H: j bids 25 and i loses (payoff 0).',
        why: 'You win exactly when the rival\'s signal is not better than yours, which is bad news about the value.',
        A: { cells: [['coin flip, pay 15, v = 10', 'i loses: 0'], ['i wins, pays 15, v = 20', 'coin flip, pay 25, v = 30']], focus: { r: [0] }, cmp: [[0, 0, 1], [0, 1, 1]] } },
      { who: 1, h: H`Expected payoff with L: \(\tfrac12\cdot\tfrac12\cdot(10-15)+\tfrac12\cdot0=-1.25< 0\)`,
        d: 'Bidding 0 would be better, so bidding the expected value is not a best response and not a BNE.',
        why: 'The winner\'s curse: winning means your signal was the most optimistic. Equilibrium bids must condition on winning, i.e. on everyone else\'s signal being lower.',
        res: 'Bid less than E[v | your signal] in common-value auctions.',
        A: { focus: { cell: [[0, 0]] }, cmp: [[0, 0, 1]] } },
    ],
  });

  /* ---------- L13 ---------- */
  walk({
    id: 'pbe1', lec: 'l13', sec: 's2', title: 'PBE example 1: a threat that is never sequentially rational',
    panels: {
      A: { type: 'tree', tree: 'l13ex1' },
      B: { type: 'mx', title: 'Normal form', rows: ['L', 'M', 'R'], cols: ["L'", "R'"], cells: [['2,1', '0,0'], ['0,2', '0,1'], ['1,3', '1,3']] },
    },
    steps: [
      { show: ['A', 'B'], who: 0, h: 'No proper subgame, so SPE = Nash equilibrium',
        d: 'Player 2\'s information set contains two nodes; the whole game is the only subgame. Nash equilibria: (L, L\') and (R, R\'). Both are subgame perfect.',
        why: 'Subgame perfection has no bite when there are no proper subgames. We need a refinement that works at information sets.',
        A: { sub: [''] }, B: { auto: 'ne' } },
      { show: ['A'], who: 2, h: 'Requirement 1: player 2 has a belief p that he is at the left node',
        d: H`L' gives \(p\cdot1+(1-p)\cdot2=2-p\); R' gives \(p\cdot0+(1-p)\cdot1=1-p\). L' is better for <strong>every</strong> belief.`,
        why: 'Requirement 2 (sequential rationality given beliefs): whatever player 2 believes, he plays L\'.',
        A: { focus: ['L', 'M'], cmp: [["L>L'", 2], ["L>R'", 2], ["M>L'", 2], ["M>R'", 2]], pick: { L: "L'", M: "L'" } } },
      { show: ['A', 'B'], who: 0, h: '(R, R\') relies on a move player 2 would never make',
        d: 'The threat R\' is what keeps player 1 at R. Since R\' is never optimal at the information set, (R, R\') is eliminated.',
        A: { bad: [['L', "R'"], ['M', "R'"]] }, B: { focus: { cell: [[2, 1]] } } },
      { show: ['A'], who: 1, h: 'Given L\', player 1 chooses L (2 > 1 > 0)', A: { focus: [''], pick: { '': 'L' }, val: { '': '(2, 1)' } } },
      { show: ['A'], who: 0, h: 'Requirement 3: on the path, beliefs follow Bayes\' rule: p = 1',
        d: 'Player 1 plays L, so if player 2\'s information set is reached, it was reached through L.',
        res: H`Unique PBE: \(((L,L'),\ p=1)\).`,
        A: { bel: { L: 'p = 1', M: '1-p = 0' } } },
    ],
  });

  walk({
    id: 'pbe2', lec: 'l13', sec: 's5', title: 'PBE example 2: off-path beliefs, requirement 4 and requirement 5',
    panels: { A: { type: 'tree', tree: 'l13ex2' } },
    steps: [
      { who: 2, h: 'Player 2: L\' gives p, R\' gives 1 - p',
        d: H`L' iff \(p>\tfrac12\), R' iff \(p< \tfrac12\). Unlike example 1, player 2's choice now depends on his belief.`,
        A: { focus: ['L', 'M'], cmp: [["L>L'", 2], ["L>R'", 2], ["M>L'", 2], ["M>R'", 2]] } },
      { who: 1, h: 'Case p > 1/2: player 2 plays L\', player 1 chooses L (3 > 2 > 1)',
        d: 'Requirement 3: the information set is on the path, so p = 1, which is consistent with p > 1/2.',
        res: 'Weak PBE 1: ((L, L\'), p = 1).',
        A: { pick: { L: "L'", M: "L'", '': 'L' }, bel: { L: 'p = 1', M: '1-p = 0' } } },
      { who: 1, h: 'Case p < 1/2: player 2 plays R\', player 1 chooses R (2 > 0)',
        d: 'Now player 2\'s information set is off the path, so requirement 3 does not restrict p.',
        res: 'Weak PBE 2: ((R, R\'), p < 1/2).',
        A: { reset: true, pick: { L: "R'", M: "R'", '': 'R' }, bel: { L: 'p < 1/2', M: '1-p > 1/2' } } },
      { who: 0, h: 'Requirement 4 does not help here',
        d: 'Off the path, beliefs must follow Bayes\' rule and the equilibrium strategies <em>where possible</em>. Player 1\'s strategy R says nothing about the relative likelihood of L and M, so Bayes\' rule is not applicable. Both candidates are PBE.' },
      { who: 1, h: 'Requirement 5: M is strictly dominated by R',
        d: 'M gives player 1 either 1 or 0; R always gives 2. A rational player 1 never plays M, so the belief must put zero weight on the right node: 1 - p = 0.',
        why: 'Off-path beliefs should not rely on a player having chosen a strictly dominated strategy.',
        A: { dim: ['M'], focus: ['M'], bel: { L: 'p = 1 (req. 5)', M: '1-p = 0' } } },
      { who: 2, h: 'With p = 1 player 2 plays L\', contradicting p < 1/2',
        d: 'So ((R, R\'), p < 1/2) violates requirement 5.',
        res: 'Only ((L, L\'), p = 1) satisfies all five requirements.',
        A: { reset: true, pick: { L: "L'", M: "L'", '': 'L' }, bel: { L: 'p = 1', M: '1-p = 0' }, bad: [['L', "R'"], ['M', "R'"]] } },
    ],
  });

  walk({
    id: 'pbe3', lec: 'l13', sec: 's4', title: 'PBE example 3: requirement 4 pins down beliefs off the path',
    panels: { A: { type: 'tree', tree: 'l13ex3' } },
    steps: [
      { who: 0, h: 'One proper subgame: after D',
        d: 'Player 3 does not observe player 2\'s move (dashed line), so the subgame starts at player 2\'s node.',
        A: { sub: ['', 'D'] } },
      { who: 2, h: 'Player 2: L is dominant',
        d: 'L gives player 2 a payoff of 2 or 3, R only 1.',
        A: { focus: ['D'], cmp: [["D>L>L'", 2], ["D>L>R'", 2], ["D>R>L'", 2], ["D>R>R'", 2]], pick: { D: 'L' } } },
      { who: 3, h: 'Player 3, knowing that 2 plays L: R\' (3) beats L\' (1)',
        why: 'Bayes\' rule with player 2\'s strategy L puts all weight on the left node: p = 1.',
        A: { focus: ['D>L', 'D>R'], cmp: [["D>L>L'", 3], ["D>L>R'", 3]], pick: { 'D>L': "R'", 'D>R': "R'" }, bel: { 'D>L': 'p = 1', 'D>R': '1-p = 0' }, val: { D: '(3, 3, 3)' } } },
      { who: 1, h: 'Player 1: D gives 3 > 2 (A)',
        res: 'SPE (D, L, R\') and PBE ((D, L, R\'), p = 1).',
        A: { focus: [''], pick: { '': 'D' } } },
      { who: 0, h: 'Another Nash equilibrium: (A, L, L\') with p = 0',
        d: 'If player 1 plays A, nothing else matters for him (2 > 1). Player 3\'s information set is off the path, so requirement 3 allows p = 0, and with p = 0 L\' is optimal (2 > 1). This is a weak PBE.',
        A: { reset: true, sub: ['', 'D'], pick: { '': 'A', D: 'L', 'D>L': "L'", 'D>R': "L'" }, bel: { 'D>L': 'p = 0', 'D>R': '1-p = 1' } } },
      { who: 3, h: 'Requirement 4 rules it out',
        d: 'Even off the path, player 3\'s belief must follow player 2\'s strategy where possible. Player 2 plays L, so p = 1, and then L\' is not optimal (1 < 3).',
        why: 'p = 0 would mean that player 3 believes player 2 played R, which contradicts player 2\'s own equilibrium strategy.',
        res: 'Unique PBE: ((D, L, R\'), p = 1).',
        A: { bel: { 'D>L': 'p must be 1', 'D>R': '' }, bad: [['D>L', "L'"], ['D>R', "L'"]], cmp: [["D>L>L'", 3], ["D>L>R'", 3]] } },
    ],
  });

  /* ---------- L14 ---------- */
  const JB = { '0>0': 'p', '1>1': '1-p', '0>1': 'q', '1>0': '1-q' };
  walk({
    id: 'jobsignal', lec: 'l14', sec: 's2', title: 'Job-market signalling: checking all four candidate equilibria',
    intro: 'High type with probability 1/3, low type with 2/3. Worker payoff first, firm second. N/E for the high type, N\'/E\' for the low type; the firm has one information set after no education (belief p on High) and one after education (belief q on High).',
    names: { W: 'Worker', F: 'Firm' },
    panels: { A: { type: 'tree', tree: 'l14job', gap: 92 } },
    steps: [
      { who: 'N', h: 'Nature draws the type; the firm sees only the education choice',
        d: 'The dashed lines join the firm\'s nodes that it cannot tell apart. Firm payoffs do not depend on education: M gives 10 with a high type and 0 with a low type, C always 4.',
        why: 'Education does not raise productivity here; it can only be useful as a signal.' },
      { who: 0, h: 'Candidate 1: both types educate (pooling on E)',
        d: H`Beliefs equal the priors: \(q=\tfrac13\). Firm after E: M gives \(\tfrac13\cdot10=3.33< 4\), so C.`,
        A: { pick: { 0: 'E', 1: "E'", '0>1': 'C', '1>0': 'C' }, bel: { '0>1': 'q = 1/3', '1>0': '1-q = 2/3' }, cmp: [['0>1>0', 2], ['0>1>1', 2], ['1>0>0', 2], ['1>0>1', 2]] } },
      { who: 'W', h: 'Both types would rather not educate: no PBE',
        d: 'High gets 4 - 4 = 0, low gets 4 - 7 = -3. Not educating gives at least 4 (a clerical job) for either type.',
        why: 'Paying for a signal that does not change the firm\'s decision is wasted money.',
        A: { bad: [['0', 'E'], ['1', "E'"]], cmp: [['0>1>1', 1], ['1>0>1', 1]] } },
      { who: 0, h: 'Candidate 2: nobody educates (pooling on N)',
        d: H`On the path \(p=\tfrac13\): the firm chooses C' (4 > 3.33). Both types get 4.`,
        A: { reset: true, pick: { 0: 'N', 1: "N'", '0>0': "C'", '1>1': "C'" }, bel: { '0>0': 'p = 1/3', '1>1': '1-p = 2/3' }, cmp: [['0>0>0', 2], ['0>0>1', 2], ['1>1>0', 2], ['1>1>1', 2]] } },
      { who: 'F', h: 'Off the path after E: the firm must not hire as manager',
        d: H`The high type would deviate to E only if the firm then chose M. The firm chooses C after E iff \(4\ge10q\iff q\le\tfrac25\). Bayes' rule is not applicable off the path; the slides use the prior \(q=\tfrac13\le\tfrac25\).`,
        why: 'With such a belief education buys nothing: high gets 0 < 4 and low -3 < 4 by educating. No type deviates.',
        res: H`Pooling PBE: (N, N'; C', C) with \(p=\tfrac13,\ q\le\tfrac25\).`,
        A: { pick: { '0>1': 'C', '1>0': 'C' }, bel: { '0>1': 'q ≤ 2/5', '1>0': '1-q' }, cmp: [['0>1>1', 1], ['1>0>1', 1]] } },
      { who: 0, h: 'Candidate 3: only the low type educates (N, E\')',
        d: 'Consistent beliefs: p = 1 (N comes from High), q = 0 (E comes from Low). The firm offers M\' after N and C after E.',
        A: { reset: true, pick: { 0: 'N', 1: "E'", '0>0': "M'", '1>1': "M'", '0>1': 'C', '1>0': 'C' }, bel: { '0>0': 'p = 1', '1>1': '1-p = 0', '0>1': 'q = 0', '1>0': '1-q = 1' } } },
      { who: 'W', h: 'The low type would deviate: no PBE',
        d: 'Low gets 4 - 7 = -3 but could get M\' and 10 by not educating.',
        A: { bad: [['1', "E'"]], cmp: [['1>0>1', 1], ['1>1>0', 1]] } },
      { who: 0, h: 'Candidate 4: only the high type educates (E, N\')',
        d: 'Consistent beliefs: q = 1, p = 0. The firm offers M after E (10 > 4) and C\' after N (4 > 0).',
        A: { reset: true, pick: { 0: 'E', 1: "N'", '0>1': 'M', '1>0': 'M', '0>0': "C'", '1>1': "C'" }, bel: { '0>1': 'q = 1', '1>0': '1-q = 0', '0>0': 'p = 0', '1>1': '1-p = 1' } } },
      { who: 'W', h: 'Neither type deviates',
        d: 'High: E gives 10 - 4 = 6, N would give C\' = 4. Low: N\' gives 4, E\' would give M with 10 - 7 = 3.',
        why: 'The education premium 10 - 4 = 6 exceeds the high type\'s cost (4) but not the low type\'s (7). Only the high type finds the signal worth buying.',
        res: 'Separating PBE: (E, N\'; C\', M) with p = 0, q = 1.',
        A: { cmp: [['0>1>0', 1], ['0>0>1', 1], ['1>1>1', 1], ['1>0>0', 1]] } },
      { who: 0, h: 'Why signalling works',
        d: 'Two PBE: pooling on N (supported by pessimistic off-path beliefs) and separating. Signalling needs the signal to be cheaper for the type that wants to reveal itself (4 < 7).',
        why: 'If education were equally costly for both types, the low type would copy the high type and the signal would carry no information.' },
    ],
  });

  /* ---------- L15 ---------- */
  walk({
    id: 'pa15', lec: 'l15', sec: 's3', title: 'Linear incentive contract: backward induction, with and without limited liability',
    names: { 1: 'Principal', 2: 'Agent' },
    panels: {
      A: { type: 'plot', title: "Agent's expected net income s + re - e²/2 (s = 0)", x0: 0, x1: 1.4, y0: -0.25, y1: 0.6, w: 400, h: 260, xl: 'effort e', yl: 'agent', legend: '<span class="l2">r = 1</span><span class="la">r = 0.5</span>' },
      B: { type: 'plot', title: "Principal's expected profit as a function of r (A = 0)", x0: 0, x1: 1.4, y0: -0.25, y1: 0.6, w: 400, h: 260, xl: 'bonus rate r', yl: 'principal', legend: '<span class="l1">unlimited liability: r - r²/2</span><span class="lm">limited liability (s ≥ 0): r - r²</span>' },
    },
    steps: [
      { show: ['A'], who: 0, h: 'Timing: contract, acceptance, then unobservable effort',
        d: H`The principal offers \(p=s+rQ\) with \(Q=e+u\), \(E[u]=0\). The agent accepts or rejects, then chooses effort \(e\) at cost \(\tfrac12e^2\).`,
        why: 'The principal observes only output, not effort (moral hazard). The contract can depend only on Q.' },
      { show: ['A'], who: 2, h: 'Stage 3: the agent chooses e = r',
        d: H`\(\max_e\ s+re-\tfrac12e^2\Rightarrow r-e=0\Rightarrow e=r\). With r = 1 the agent works e = 1; with r = 0.5 only 0.5.`,
        why: 'The agent keeps the share r of every extra unit of output, and stops where that marginal gain equals his marginal effort cost e.',
        A: { add: P => P.fn(e => e - e * e / 2, 'c2') + P.fn(e => 0.5 * e - e * e / 2, 'ca') + P.dot(1, 0.5, 'dot-2', 5) + P.dot(0.5, 0.125, 'dot-a', 5) + P.lab(1, 0.54, 'e = 1', 'lbl2') + P.lab(0.5, 0.16, 'e = 0.5', 'lbla') } },
      { show: ['A', 'B'], who: 1, h: 'Stage 2 and 1: the principal sets s so that participation just binds',
        d: H`Agent's expected net income with \(e=r\): \(s+\tfrac12r^2\ge A\). The principal lowers \(s\) until \(s=A-\tfrac12r^2\).`,
        why: 'A lower fixed payment raises profit without changing incentives (effort depends only on r), so the principal leaves the agent no rent.' },
      { show: ['B'], who: 1, h: 'Choose r: maximise r - A - r²/2, so r* = 1',
        d: H`\(r^*=1,\ e^*=1,\ s^*=A-\tfrac12\). If \(s^*< 0\) this is a franchise contract: the agent pays a fee and keeps all output (residual claimant).`,
        why: 'Same effort and profit as the first best without moral hazard: a risk-neutral agent with unlimited liability can simply be "sold" the project.',
        B: { add: P => P.fn(r => r - r * r / 2, 'c1') + P.dot(1, 0.5, 'dot-1', 6) + P.lab(1, 0.54, 'r* = 1', 'lbl1') } },
      { show: ['B'], who: 1, h: 'Limited liability: s ≥ 0 (and A = 0)',
        d: H`Binding participation would need \(s=-\tfrac12r^2< 0\), which is not allowed. So \(s=0\) and profit is \(r-r^2\): \(r^{**}=0.5\), effort 0.5, profit 0.25 instead of 0.5.`,
        why: 'Without a negative fixed payment the principal can extract profit only by lowering r, which weakens incentives. She balances both.',
        res: H`\(r^{**}=0.5\); the agent earns a rent \(\tfrac12r^2=\tfrac18\) (participation is slack).`,
        B: { add: P => P.fn(r => r - r * r, 'cm') + P.dot(0.5, 0.25, 'dot', 6) + P.lab(0.5, 0.3, 'r** = 0.5', 'wk-t') } },
    ],
  });

  /* ---------- L16 ---------- */
  walk({
    id: 'ce16', lec: 'l16', sec: 's2', title: 'Certainty equivalent and risk premium',
    intro: H`Illustrated with \(v(x)=\sqrt x\) (one of the options of the risk widget) and the lottery B: $2000 or $0 with probability ½ each.`,
    panels: { A: { type: 'plot', x0: 0, x1: 2000, y0: 0, y1: 47, w: 440, h: 290, xl: 'money x', yl: 'utility', xt: [0, 500, 1000, 1500, 2000], legend: '<span class="l1">utility v(x) = √x</span><span class="lm">chord: expected utility</span><span class="la">risk premium</span>' } },
    steps: [
      { who: 0, h: 'A concave utility function: decreasing marginal utility', A: { add: P => P.fn(x => Math.sqrt(x), 'c1') },
        why: 'Concavity is what risk aversion means: losing $1000 hurts more than winning $1000 pleases.' },
      { who: 0, h: H`Expected utility of the lottery: \(\tfrac12\sqrt0+\tfrac12\sqrt{2000}\approx22.4\)`,
        d: 'It lies on the straight line (chord) between the two outcomes, at the expected value 1000. A sure 1000 gives √1000 ≈ 31.6 > 22.4.',
        A: { add: P => P.line([[0, 0], [2000, Math.sqrt(2000)]], 'cm') + P.dot(1000, Math.sqrt(2000) / 2, 'dot-2', 5) + P.lab(1000, 25, 'EV = 1000', 'lbl2') } },
      { who: 0, h: 'Certainty equivalent: the sure amount with the same utility',
        d: H`\(\sqrt c=22.36\Rightarrow c=500\). The person is indifferent between the lottery and $500 for sure.`,
        A: { add: P => P.dot(500, Math.sqrt(500), 'dot-a', 5) + P.lab(500, 25, 'c = 500', 'lbla') } },
      { who: 0, h: 'Risk premium = expected value - certainty equivalent = 500',
        d: 'With a smaller risk, $900 or $1100, the certainty equivalent is about 997.5 and the premium only about 2.5.',
        why: 'The premium grows with the concavity of v (risk aversion) and with the size of the risk. In contracts, a risk-averse agent must be paid this premium for bearing risk.',
        A: { add: P => P.line([[500, Math.sqrt(500)], [1000, Math.sqrt(500)]], 'ca') } },
    ],
  });

  const prof = (K, r) => r - 0.25 - (K + 0.5) * r * r;
  walk({
    id: 'pa16', lec: 'l16', sec: 's3', title: 'Optimal bonus for a risk-averse manager: r* = 1/(1 + 2K)',
    intro: H`Profit curves drawn for an outside option \(u_0=0.25\) and three degrees of risk aversion \(K\).`,
    names: { 1: 'Shareholders (principal)', 2: 'Manager (agent)' },
    panels: { A: { type: 'plot', x0: 0, x1: 1.2, y0: -0.35, y1: 0.32, w: 450, h: 300, xl: 'bonus rate r', yl: 'expected profit', xt: [0, 1 / 3, 0.5, 1], legend: '<span class="l1">K = 0</span><span class="la">K = 0.5</span><span class="l2">K = 1</span><span class="lm">no bonus (r = 0): profit 0</span>' } },
    steps: [
      { who: 2, h: 'Step 1, incentive constraint: e = r',
        d: H`The manager maximises \(s+re-r^2K-\tfrac12e^2\). The risk cost \(r^2K\) does not depend on effort, so again \(e=r\).`,
        why: 'Risk aversion does not change how hard the manager works for a given r; it changes how expensive it is to give him that r.' },
      { who: 1, h: 'Step 2, participation binds: s = u₀ + (K - 0.5)r²',
        d: H`Expected pay \(E[p]=s+re=u_0+(K+\tfrac12)r^2\).`,
        why: 'As before, the fixed part s is lowered until the manager is just willing to accept.' },
      { who: 1, h: 'Step 3: maximise r - u₀ - (K + 0.5)r²',
        d: H`FOC: \(1-2(K+\tfrac12)r=0\Rightarrow r^*=\dfrac{1}{1+2K}\): 1 for K = 0, 1/2 for K = 0.5, 1/3 for K = 1.`,
        why: 'Each extra unit of r brings more effort but also a risk premium Kr² that the shareholders must pay. The more risk averse the manager, the weaker the optimal incentive.',
        A: { add: P => P.hline(0, 'cm') + P.fn(r => prof(0, r), 'c1') + P.fn(r => prof(0.5, r), 'ca') + P.fn(r => prof(1, r), 'c2') + P.dot(1, prof(0, 1), 'dot-1', 5) + P.dot(0.5, prof(0.5, 0.5), 'dot-a', 5) + P.dot(1 / 3, prof(1, 1 / 3), 'dot-2', 5) } },
      { who: 0, h: H`Risk premium \(Kr^2\)`,
        d: H`Certainty equivalent of the pay: \(u_0+\tfrac12r^2\); expected pay \(u_0+(K+\tfrac12)r^2\). Difference \(Kr^2\). For K = 1 and r = 1/3: 1/9 ≈ 0.11.` },
      { who: 1, h: 'When is no bonus better?',
        d: H`Best profit with a bonus: \(\dfrac{1}{4(K+0.5)}-u_0\). Negative iff \(K>\dfrac1{4u_0}-0.5=0.5\). For K = 1 the orange curve stays below 0: a fixed wage (r = 0, no effort, profit 0) is better.`,
        why: 'Bonuses pay off when effort matters a lot, the agent is not very risk averse, and production is not very risky.',
        res: H`\(r^*=\frac1{1+2K}\); no bonus at all if risk aversion is large enough.`,
        A: { tmp: P => P.lab(1 / 3, prof(1, 1 / 3) - 0.04, 'below 0', 'lbl2') } },
    ],
  });

  /* ---------- L17 ---------- */
  walk({
    id: 'guilt', lec: 'l17', sec: 's4', title: 'Trust game with a die: material SPNE and guilt-averse equilibria',
    names: { A: 'A (investor)', B: 'B (trustee)' },
    panels: {
      A: { type: 'tree', tree: 'l17trust' },
      B: { type: 'plot', title: "B's utility when guilt aversion θ = 0.6", x0: 0, x1: 1, y0: 7, y1: 14.6, w: 400, h: 270, xl: "β = B's belief about A's belief that B rolls", yl: 'B', xt: [0, 1 / 3, 2 / 3, 1], legend: '<span class="l2">Grab: 14 - 10θβ</span><span class="la">Roll: 10</span><span class="lm">Grab if θ = 0.3</span>' },
    },
    steps: [
      { show: ['A'], who: 0, h: 'Material payoffs',
        d: H`Roll: A gets 0 with probability \(\tfrac16\) and 12 otherwise, in expectation \(\tfrac56\cdot12=10\); B always gets 10. Because of the die, A cannot tell bad luck from B's bad intentions.`,
        A: { val: { 'In>Roll': '(10, 10) expected' } } },
      { show: ['A'], who: 'B', h: 'Selfish B grabs: 14 > 10', A: { focus: ['In'], cmp: [['In>Grab', 2]], pick: { In: 'Grab' }, val: { In: '(0, 14)' } } },
      { show: ['A'], who: 'A', h: 'A anticipates this and stays out: 5 > 0',
        res: 'Material SPNE: (Out, Grab) with (5, 5), although (In, Roll) gives (10, 10) in expectation.',
        A: { focus: [''], cmp: [['Out', 1]], pick: { '': 'Out' } } },
      { show: ['A', 'B'], who: 'B', h: 'A guilt-averse B cares about what A expected',
        d: H`\(\beta\) is B's second-order belief: what B thinks A believes about Roll. B believes A expects \(10\beta\). Grab gives A 0, so \(u_B(\text{Grab})=14-\theta\cdot10\beta\). Roll gives A 10 in expectation, at least \(10\beta\): no guilt, \(u_B(\text{Roll})=10\).`,
        why: 'Guilt depends on beliefs, not just outcomes: B feels bad only if he lets A down relative to A\'s expectations. This is the difference to Fehr-Schmidt.',
        B: { add: P => P.fn(b => 14 - 6 * b, 'c2') + P.hline(10, 'ca') + P.dot(2 / 3, 10, 'dot', 5) + P.lab(0.69, 10.6, 'β = 0.4/θ = 2/3', 'wk-t', 'start') } },
      { show: ['A', 'B'], who: 0, h: 'Consistent beliefs: α = β = p',
        d: H`In a psychological equilibrium beliefs are correct. A plays In iff \(5\le10p\) (\(p\ge\tfrac12\)); B rolls iff \(14-10\theta p\le10\iff\theta p\ge0.4\).`,
        why: 'Beliefs must match what is actually played: first-order beliefs match strategies, second-order beliefs match first-order beliefs.' },
      { show: ['A', 'B'], who: 'B', h: 'With θ = 0.6 and p = 1: B rolls (14 - 6 = 8 < 10), so A plays In',
        d: 'If everybody expects Roll, B would feel too guilty to grab. A, expecting Roll, enters.',
        why: 'Guilt aversion makes cooperation self-enforcing, and in this equilibrium nobody actually feels guilty.',
        res: 'PE (In, Roll) with α = β = p = 1, possible whenever θ ≥ 0.4.',
        A: { reset: true, pick: { '': 'In', In: 'Roll' }, val: { In: '(10, 10) expected' } }, B: { tmp: P => P.dot(1, 8, 'dot-2', 6) + P.lab(0.97, 7.6, 'p = 1: grab gives 8', 'lbl2', 'end') } },
      { show: ['A', 'B'], who: 0, h: '(Out, Grab) with p = 0 is still a psychological equilibrium',
        d: 'If nobody expects Roll, B feels no guilt from grabbing (14 > 10), and A rightly stays out. With low guilt aversion (θ < 0.4, dashed line for θ = 0.3) grabbing is always better and only (Out, Grab) remains.',
        res: 'Two pure PE for θ ≥ 0.4: (In, Roll) and (Out, Grab). Charness and Dufwenberg (2006): promises raise both beliefs and cooperation.',
        A: { reset: true, pick: { '': 'Out', In: 'Grab' } }, B: { tmp: P => P.fn(b => 14 - 3 * b, 'cm') + P.dot(0, 14, 'dot-2', 6) } },
    ],
  });

  /* ---------- L18 ---------- */
  walk({
    id: 'contract', lec: 'l18', sec: 's4', title: 'Remodelling a house: which contract makes investing an equilibrium?',
    intro: H`Numbers for illustration: \(z_1=z_2=6\), \(x_1=x_2=8\), \(y_1=y_2=-3\) (try others in the calculator below). Cells: I = invest, N = not.`,
    names: { 1: 'Architect/Owner', 2: 'Constructor' },
    panels: { A: { type: 'mx', p1: 'Architect/Owner', p2: 'Constructor', rows: ['I', 'N'], cols: ['I', 'N'], cells: [['6,6', '-3,8'], ['8,-3', '0,0']], cap: H`Underlying game: \((z_1,z_2)\), \((y_1,x_2)\), \((x_1,y_2)\), \((0,0)\).` } },
    steps: [
      { who: 0, h: '(I, I) is the only efficient outcome',
        d: H`\(z_1+z_2=12\) is larger than \(x_1+y_2=5\), \(y_1+x_2=5\) and 0. With transfers both could be made better off at (I, I).` },
      { who: 0, h: 'But without a contract nobody invests',
        d: H`Not investing is dominant: 8 > 6 against I and 0 > -3 against N, for both. The only NE is (N, N): a Prisoner's Dilemma.`,
        why: H`An agreement to play (I, I) is not self-enforcing because \(z_i< x_i\): each side gains by shirking on its own.`,
        A: { auto: 'ne', arrows: [[[0, 0], [1, 0], 1], [[0, 0], [0, 1], 2]] } },
      { who: 0, h: 'Limited verifiability: one transfer α for every outcome other than (I, I)',
        d: H`(I, I) is a NE iff \(z_1\ge x_1+\alpha\) (\(\alpha\le-2\)) and \(z_2\ge x_2-\alpha\) (\(\alpha\ge2\)). Adding them: \(z_1+z_2\ge x_1+x_2\), i.e. \(12\ge16\): impossible. With \(\alpha=-2\) the architect is kept honest, but the constructor gains by deviating (10 > 6).`,
        why: 'If the court cannot see who breached, the same transfer must punish one side and reward the other, so it cannot deter both.',
        A: { reset: true, cells: [['6,6', '-5,10'], ['6,-1', '-2,2']], cap: 'Limited verifiability with α = -2: (I, N) = (y₁ + α, x₂ - α), (N, I) = (x₁ + α, y₂ - α), (N, N) = (α, -α).', auto: 'br', arrows: [[[0, 0], [0, 1], 2]] } },
      { who: 0, h: 'Expectation damages: the breacher pays the victim what he expected',
        d: H`If the constructor breaches, he pays \(z_1-y_1\): (I, N) becomes \((z_1,\ x_2-z_1+y_1)=(6,-1)\). If the architect breaches: (N, I) becomes \((x_1-z_2+y_2,\ z_2)=(-1,6)\).`,
        why: 'Breaching no longer pays: the breacher keeps his temptation x but must compensate the full loss of the other side.',
        A: { reset: true, cells: [['6,6', '6,-1'], ['-1,6', '0,0']], cap: 'Induced game: expectation damages.', auto: 'ne' } },
      { who: 0, h: '(I, I) is enforced if and only if it is efficient',
        d: H`(I, I) is a NE iff \(z_1\ge x_1-z_2+y_2\) and \(z_2\ge x_2-z_1+y_1\), i.e. \(z_1+z_2\ge x_1+y_2\) and \(z_1+z_2\ge x_2+y_1\): exactly the efficiency conditions.`,
        why: 'Expectation damages make each player internalise the other\'s loss, removing the tension between individual and joint incentives. Drawback: the court needs to know who breached and the payoffs at (I, I).',
        A: { focus: { cell: [[0, 0]] } } },
      { who: 0, h: 'Reliance damages: restore the victim to the no-contract payoff 0',
        d: H`(I, N) becomes \((0,\ x_2+y_1)=(0,5)\), (N, I) becomes \((x_1+y_2,\ 0)=(5,0)\). (I, I) is a NE iff \(z_1\ge x_1+y_2\) (\(6\ge5\)) and \(z_2\ge x_2+y_1\) (\(6\ge5\)).`,
        why: 'Easier for a court (no need to know the payoffs at (I, I)), but it works only if the loss from the other\'s not investing is large enough. (N, N) also remains an equilibrium here.',
        res: 'Expectation damages enforce (I, I) exactly when it is efficient; reliance damages under a stricter condition.',
        A: { reset: true, cells: [['6,6', '0,5'], ['5,0', '0,0']], cap: 'Induced game: reliance damages.', auto: 'ne' } },
    ],
  });

  GT.injectWalks();
})();
