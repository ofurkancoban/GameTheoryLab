/* Hand-written prediction questions for the step-by-step walkthroughs.
 * Matrix and tree steps get their questions automatically (walk-engine.js). Steps drawn as diagrams, and steps
 * where the move rests on an assumption the picture does not show, get them here.
 * Keyed by walkthrough id and step number (1 = first step; step 1 is never asked):
 *   { ask, opts: [...], ok: index | [indices] }  or  false to switch off the automatic question.
 * The question is shown before the step, so it must state every premise the step relies on. */
(function () {
  const Q = {
    wine: {
      2: { ask: H`Payoff \(v(\alpha)=\theta\alpha-4\alpha^2\) with \(\theta=1\). Which amount of wine maximises it?`, opts: [H`\(\alpha=0\)`, H`\(\alpha=0.125\)`, H`\(\alpha=0.25\)`, H`\(\alpha=0.5\)`], ok: 1 },
      3: { ask: H`A larger person has \(\theta=4\). What happens to the optimal amount?`, opts: ['It rises (to 0.5 litres)', 'It stays at 0.125 litres', 'It falls'], ok: 0 },
      4: { ask: H`Types range over \(\theta\in[0.2,6]\). Which amounts can be ruled out for every type?`, opts: ['Everything above 0.75 litres', 'Everything above 0.125 litres', 'Nothing: a large enough type may want any amount'], ok: 0 },
    },
    spa153: {
      2: { ask: H`Second-price auction, your value 153. The competitor bids \(b_c< 153\). Do you want to win?`, opts: [H`Yes: winning pays \(153-b_c>0\)`, 'No: you would rather lose', 'You are indifferent'], ok: 0 },
      3: { ask: H`Now the competitor bids \(b_c>153\). Do you want to win?`, opts: ['Yes', H`No: you would pay \(b_c\), more than the rights are worth`, 'You are indifferent'], ok: 1 },
      4: { ask: 'Compared with bidding 153, what does bidding 180 change?', opts: ['It adds wins at prices above 153: only losses', 'It lowers the price you pay', 'Nothing at all'], ok: 0 },
      5: { ask: 'And what does bidding 130 instead of 153 change?', opts: ['It lowers the price you pay when you win', 'It gives up wins at prices between 130 and 153, which were profitable', 'Nothing at all'], ok: 1 },
      6: { ask: 'So which bid is (weakly) dominant?', opts: ['130', '153, the true value', '180', 'It depends on the rival\'s bid'], ok: 1 },
    },
    popsicle: {
      2: { ask: 'Which of player 1\'s strategies is strictly dominated? Compare the blue numbers row by row.', opts: ['Tower 1', 'Tower 2', 'Tower 3', 'None'], ok: 0 },
      5: { ask: 'Only towers 2 and 3 are left. Which strategy does player 1 drop in round 2?', opts: ['Tower 2', 'Tower 3', 'Neither'], ok: 0 },
    },
    cournot: {
      2: { ask: H`\(a=12,\ b=1,\ c=0\). Firm 2 produces 8. What is firm 1's best response?`, opts: ['2', '4', '6', '8'], ok: 0 },
      4: { ask: H`Both reaction functions are \(x_i=(12-x_j)/2\). Where is the Nash equilibrium?`, opts: [H`\(x_1=x_2=4\)`, H`\(x_1=x_2=3\)`, H`\(x_1=x_2=6\)`, H`\(x_1=6,\ x_2=0\)`], ok: 0 },
      6: { ask: 'Firm 2 keeps the cartel quota 3. Does firm 1 keep its quota of 3?', opts: ['Yes: 3 is its best response', 'No: it raises its output to 4.5', 'No: it cuts its output to 2'], ok: 1 },
    },
    mp: {
      4: { ask: H`Player 1 wants to mismatch. If \(q< \tfrac12\) (player 2 leans to Tails), what is player 1's best response?`, opts: [H`\(r=1\): Heads for sure`, H`\(r=0\): Tails for sure`, H`\(r=\tfrac12\)`], ok: 0 },
      5: { ask: H`Player 2 wants to match. If \(r>\tfrac12\) (player 1 leans to Heads), what is player 2's best response?`, opts: [H`\(q=1\): Heads for sure`, H`\(q=0\): Tails for sure`, H`\(q=\tfrac12\)`], ok: 0 },
      6: { ask: 'Where do the two best-response curves cross?', opts: [H`Once, at \(r=q=\tfrac12\)`, H`At \(r=1,\ q=0\)`, 'Nowhere: there is no equilibrium'], ok: 0 },
    },
    bos: {
      3: { ask: H`The man plays Soccer with probability \(r\). Which \(r\) is consistent with a mixed equilibrium?`, opts: [H`\(r=\tfrac23\), from the woman's payoffs`, H`\(r=\tfrac13\), from the man's own payoffs`, H`\(r=\tfrac12\)`], ok: 0 },
      4: { ask: H`And the woman's probability \(q\) of Soccer?`, opts: [H`\(q=\tfrac13\), from the man's payoffs`, H`\(q=\tfrac23\), from the woman's own payoffs`, H`\(q=\tfrac12\)`], ok: 0 },
      5: { ask: 'How many Nash equilibria does the game have in total?', opts: ['1', '2', '3'], ok: 2 },
      6: { ask: 'How do the payoffs in the mixed equilibrium compare with the pure ones?', opts: [H`Lower for both: \(\tfrac23\) each`, 'Between the two pure equilibria for each player', 'Higher for both'], ok: 0 },
    },
    chicken: {
      3: { ask: H`Player 1 gets \(-10\) or \(6\) with T and \(0\) or \(2\) with C (against T or C). Which probability \(q\) that player 2 plays T makes player 1 indifferent?`, opts: [H`\(\tfrac27\)`, H`\(\tfrac13\)`, H`\(\tfrac12\)`, H`\(\tfrac57\)`], ok: 0 },
      4: { ask: H`The crash gets more painful: \(a=-20\). What happens to the equilibrium probability of T?`, opts: [H`It falls (to \(\tfrac16\))`, 'It rises', 'It stays the same'], ok: 0 },
    },
    risk: {
      2: { ask: 'Which equilibrium is Pareto dominant?', opts: ['(O, L) with (9, 9)', '(U, R) with (7, 7)', 'Neither'], ok: 0 },
      4: { ask: H`O pays \(9q\), U pays \(7+q\), where \(q\) is the probability of L. How sure must player 1 be to play O?`, opts: [H`\(q\ge\tfrac78\)`, H`\(q\ge\tfrac12\)`, H`\(q\ge\tfrac79\)`], ok: 0 },
      5: { ask: 'Deviation losses: (9 - 8)(9 - 8) at (O, L), (7 - 0)(7 - 0) at (U, R). Which equilibrium is risk dominant?', opts: ['(O, L)', '(U, R)', 'Neither'], ok: 1 },
    },
    tremble: {
      2: { ask: 'Player 1: U gives (5, 1), O gives (5, 0). How would you describe O?', opts: ['Weakly dominated by U', 'Strictly dominated by U', 'Not dominated'], ok: 0 },
      4: { ask: H`Player 1 means to play O but plays U with a small probability \(\varepsilon>0\). What is player 2's best response?`, opts: ['R, for every ε > 0', 'L, as long as ε is small', 'Both are equally good'], ok: 0 },
    },
    union: {
      3: { ask: H`The union maximises \((w-2)\cdot100/w^2\) along the firm's labour demand. Which wage does it set?`, opts: ['2', '3', '4', '6'], ok: 2 },
      4: { ask: 'Is the subgame-perfect outcome (w, L) = (4, 6.25) Pareto efficient?', opts: ['No: a slightly lower wage with higher employment helps both', 'Yes: subgame-perfect outcomes are efficient', 'Yes: the union is on its best indifference curve'], ok: 0 },
    },
    rubinstein: {
      3: { ask: H`A gets \(Z\) if he proposes in stage 3. In stage 2, B proposes. What does B offer A?`, opts: [H`\(Z\delta_A\)`, H`\(Z\delta_A^2\)`, H`\(Z\)`, '0'], ok: 0 },
      4: { ask: H`B would keep \(1-Z\delta_A\) in stage 2. In stage 1, A proposes. What does A offer B?`, opts: [H`\(\delta_B(1-Z\delta_A)\)`, H`\(1-Z\delta_A\)`, H`\(\delta_B^2(1-Z)\)`], ok: 0 },
      5: { ask: H`Stationarity: \(Z=1-\delta_B(1-Z\delta_A)\). With \(\delta_A=\delta_B=0.9\), what is \(Z\)?`, opts: ['about 0.526', '0.5', '0.9', 'about 0.474'], ok: 0 },
      6: { ask: H`B becomes less patient: \(\delta_B=0.5\). What happens to A's share?`, opts: ['It rises', 'It falls', 'It stays the same'], ok: 0 },
    },
    nashbarg: {
      3: { ask: H`Which agreement on \(x_J+x_R=50\) maximises \((x_J-15)(x_R-10)\)?`, opts: ['(27.5, 22.5)', '(25, 25)', '(30, 20)', '(32.5, 17.5)'], ok: 0 },
      4: { ask: H`Jerry gets \(10+t\) and should get 27.5 (thousand). Which salary \(t\)?`, opts: ['17.5', '27.5', '12.5', '15'], ok: 0 },
      5: { ask: H`Jerry has bargaining power \(\alpha=0.7\) (surplus 25, disagreement 15). What does he get?`, opts: ['32.5', '27.5', '35', '30'], ok: 0 },
    },
    pd2: {
      2: { ask: 'The stage game is played twice. What is played in stage 2 if (U, R) was played in stage 1?', opts: ['(O, L), the stage-game NE, after every history', '(U, R), as a reward for cooperating', 'It depends on what was played in stage 1'], ok: 0 },
    },
    grim: {
      2: { ask: H`Player 2 sticks to grim trigger and both cooperate forever (4 per period). Present value?`, opts: [H`\(\dfrac{4}{1-\delta}\)`, H`\(\dfrac{4\delta}{1-\delta}\)`, '4'], ok: 0 },
      3: { ask: 'Player 2 deviates: 5 today, then the punishment. Present value?', opts: [H`\(5+\dfrac{\delta}{1-\delta}\)`, H`\(\dfrac{5}{1-\delta}\)`, H`\(5+\dfrac{4\delta}{1-\delta}\)`], ok: 0 },
      4: { ask: 'For which discount factors does deviating not pay?', opts: [H`\(\delta\ge\tfrac14\)`, H`\(\delta\ge\tfrac12\)`, H`\(\delta\ge\tfrac45\)`, 'For every δ'], ok: 0 },
    },
    folk: {
      3: { ask: 'What is the lowest average payoff a player can get in any SPE of the infinitely repeated game?', opts: ['1, the stage-game NE payoff', '0', '4'], ok: 0 },
      4: { ask: 'Which average payoffs can be sustained by an SPE when δ is close to 1?', opts: ['Every feasible pair with both payoffs above 1', 'Only (4, 4)', 'Only (1, 1)'], ok: 0 },
    },
    grove: {
      2: { ask: 'Seller values 10, 20, 30 for L, M, H. The buyer offers 24. Which seller types sell? Select all.', opts: ['L', 'M', 'H'], ok: [0, 1] },
      3: { ask: 'At any price from 20 to 30, only L and M sell. What is a grove that is actually sold worth to the buyer on average?', opts: ['19', '24', '29'], ok: 0 },
      5: { ask: 'Which qualities are traded in the Bayesian Nash equilibrium?', opts: ['Only L', 'L and M', 'All three'], ok: 0 },
    },
    fpa: {
      3: { ask: H`Your value is 600; the rival bids half his value, so \(\Pr(\text{win})=x/500\). Which bid \(x\) maximises \((600-x)\,x/500\)?`, opts: ['300', '600', '450', '150'], ok: 0 },
      4: { ask: 'So what is the equilibrium bid function?', opts: [H`\(b=v/2\)`, H`\(b=v\)`, H`\(b=v/3\)`], ok: 0 },
    },
    monty: {
      2: { ask: 'Ben chose door A. If the car is behind B, with what probability does Kevin open C?', opts: ['1', '1/2', '0'], ok: 0 },
      4: { ask: 'Kevin opened C. Should Ben switch to B?', opts: ['Yes: B wins with probability 2/3', 'It does not matter: 1/2 each', 'No: A now wins with 2/3'], ok: 0 },
    },
    wcurse: {
      2: { ask: H`With signal L the value is 10 or 20, equally likely. What is \(E[v\mid L]\)?`, opts: ['15', '10', '20'], ok: 0 },
      5: { ask: 'Both firms bid their expected value (15 with L, 25 with H). Expected payoff of a firm with signal L?', opts: ['-1.25: a loss', '0', '+2.5'], ok: 0 },
    },
    pa15: {
      2: { ask: H`The agent gets \(s+rQ\) with \(E[Q]=e\) and effort cost \(\tfrac12e^2\). Which effort does he choose?`, opts: [H`\(e=r\)`, H`\(e=1\)`, H`\(e=r/2\)`, H`\(e=s+r\)`], ok: 0 },
      3: { ask: H`How does the principal set the fixed payment \(s\)?`, opts: [H`As low as participation allows: \(s=A-\tfrac12r^2\)`, H`\(s=0\)`, H`\(s=A\)`], ok: 0 },
      4: { ask: H`Profit \(r-A-\tfrac12r^2\). Which bonus rate \(r\)?`, opts: ['1', '0.5', '0'], ok: 0 },
      5: { ask: H`Limited liability: \(s\ge0\) and \(A=0\). Profit is \(r-r^2\). Which \(r\)?`, opts: ['0.5', '1', '0'], ok: 0 },
    },
    ce16: {
      3: { ask: H`\(v(x)=\sqrt x\). Lottery: $2000 or $0 with ½ each, expected utility about 22.4. Certainty equivalent?`, opts: ['$500', '$1000', '$707'], ok: 0 },
      4: { ask: 'Same person, smaller risk: $900 or $1100 with ½ each. Compared with the premium of 500, the risk premium is', opts: ['much smaller (about 2.5)', 'also about 500', 'larger'], ok: 0 },
    },
    pa16: {
      3: { ask: H`Shareholders maximise \(r-u_0-(K+\tfrac12)r^2\). Which \(r\) for a manager with \(K=1\)?`, opts: [H`\(\tfrac13\)`, H`\(\tfrac12\)`, '1'], ok: 0 },
      5: { ask: H`With \(K=1\) and \(u_0=0.25\), is a bonus worth paying?`, opts: [H`No: the best profit with a bonus is negative, so a fixed wage is better`, H`Yes, with \(r=\tfrac13\)`], ok: 0 },
    },
    contract: {
      3: { ask: 'The court cannot see who breached, so one transfer α applies to every outcome other than (I, I). Can it make (I, I) a Nash equilibrium?', opts: ['No: it would need 12 ≥ 16', 'Yes, with α = -2', 'Yes, with α = 2'], ok: 0 },
      5: { ask: 'With expectation damages, when is (I, I) a Nash equilibrium?', opts: ['Exactly when it is efficient', 'Always', H`Only if \(z_i\ge x_i\)`], ok: 0 },
      6: { ask: H`Reliance damages: (I, I) is a NE iff \(z_1\ge x_1+y_2\) and \(z_2\ge x_2+y_1\). Does it hold here (z = 6, x = 8, y = -3)?`, opts: ['Yes: 6 ≥ 5 for both', 'No'], ok: 0 },
    },
    vbos: {
      3: { ask: 'Suppose (O, o) is played in the subgame after Y, worth (2, 1). N gives player 1 a sure 1.5. What does player 1 choose at the start?', opts: ['N', 'Y'], ok: 1 },
      4: { ask: 'Suppose instead (F, f) is played after Y, worth (1, 2). What does player 1 choose at the start?', opts: ['N', 'Y'], ok: 0 },
      5: { ask: H`Suppose the mixed equilibrium is played after Y, worth \(\tfrac23\) to player 1. What does he choose at the start?`, opts: ['N', 'Y'], ok: 0 },
    },
    pbe2: {
      2: { ask: H`Case \(p>\tfrac12\): player 2 plays L'. What does player 1 choose?`, opts: ['L', 'M', 'R'], ok: 0 },
      3: { ask: H`Case \(p< \tfrac12\): player 2 plays R'. What does player 1 choose?`, opts: ['L', 'M', 'R'], ok: 2 },
      6: { ask: H`Requirement 5 forces \(p=1\). What does player 2 play then?`, opts: ["L'", "R'"], ok: 0 },
    },
    jobsignal: {
      2: { ask: H`Both types educate, so after E the belief is the prior \(q=\tfrac13\). What does the firm choose after E?`, opts: ['M (manager)', 'C (clerk)'], ok: 1 },
      3: { ask: 'The firm offers C after E anyway. Do the types want to keep educating?', opts: ['No: both would rather skip education', 'Only the low type would deviate', 'Nobody deviates'], ok: 0 },
      5: { ask: H`Nobody educates. If the firm still sees E and keeps the prior \(q=\tfrac13\), what does it choose after E?`, opts: ['M (manager)', 'C (clerk)'], ok: 1 },
      7: { ask: 'Only the low type educates, so the firm offers M\' after N and C after E. Who deviates?', opts: ['The low type: skipping education gets M\' and 10', 'The high type', 'Nobody'], ok: 0 },
      9: { ask: 'Only the high type educates: the firm offers M after E and C\' after N. Does anyone deviate?', opts: ['Nobody: this is a separating PBE', 'The low type copies E', 'The high type drops E'], ok: 0 },
    },
  };
  Object.keys(Q).forEach(id => {
    const wk = GT.walks.find(w => w.id === id); if (!wk) return;
    Object.keys(Q[id]).forEach(n => { const st = wk.steps[+n - 1]; if (st) st.q = Q[id][n]; });
  });
})();
