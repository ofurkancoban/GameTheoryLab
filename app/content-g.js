/* Two more mock exams, key takeaways, extra questions and cards. */

GT.mocks.push(
  { id: 'm4', title: 'Mock exam D (60 min, 30 points)', qs: [
    { pts: 10, q: H`<p><strong>Question 1 (PBE).</strong> Player 1 chooses A, which ends the game with (2,0,0), or D. After D, player 2 chooses L or R. Player 3 then chooses L' or R' without observing player 2's choice; \(p\) is player 3's belief that L was played. Payoffs (players 1, 2, 3): (D,L,L') = (1,2,1), (D,L,R') = (3,3,3), (D,R,L') = (0,1,2), (D,R,R') = (0,1,1).</p><p>a) Find the SPE. (2p) b) Show that (A, L, L') is a Nash equilibrium. (2p) c) Show that ((A,L,L'), p = 0) is a weak PBE but not a PBE. (4p) d) What is requirement 4? (2p)</p>`,
      a: H`<ol type="a"><li>The subgame after D has the unique NE (L, R'), payoffs (3,3,3). Player 1 compares A (2) and D (3): D. SPE (D, L, R').</li>
<li>Given L and L', D gives player 1 only 1 < 2; player 2's and 3's choices are off the path and do not affect their payoffs: no profitable unilateral deviation.</li>
<li>Player 3's information set is off the path, so requirement 3 does not restrict \(p\). With \(p=0\), L' gives 2 > 1: sequentially rational. Player 2 after D: given L', L gives 2 and R gives 1, so L is optimal. Hence a weak PBE. But requirement 4 asks beliefs off the path to follow player 2's strategy L where possible: \(p=1\), and then R' (3 > 1) is optimal, so L' violates sequential rationality: not a PBE.</li>
<li>At information sets off the equilibrium path, beliefs are determined by Bayes' rule and the players' equilibrium strategies where possible.</li></ol>` },
    { pts: 10, q: H`<p><strong>Question 2 (Nash bargaining).</strong> A firm and a union bargain over a surplus of 120. If they disagree, the firm gets 20 and the union 40.</p><p>a) Write down the Nash bargaining problem and solve it. (4p) b) Solve the generalised version with the union's power \(\alpha=0.25\). (2p) c) Name the four axioms. (2p) d) How can the Nash solution be motivated by the Rubinstein game? (2p)</p>`,
      a: H`<ol type="a"><li>\(\max (x_F-20)(x_U-40)\) s.t. \(x_F+x_U\le120\). Constraint binds; FOC gives each the disagreement payoff plus half of the surplus \(120-60=60\): \(x_F=50\), \(x_U=70\).</li>
<li>\(x_U=40+0.25\cdot60=55\), \(x_F=65\).</li>
<li>Pareto efficiency, individual rationality, invariance to utility units, independence of irrelevant alternatives.</li>
<li>For any Nash solution there are discount factors such that the alternating-offer game gives the same split; patience is one source of bargaining power (Binmore, Rubinstein, Wolinsky).</li></ol>` },
    { pts: 10, q: H`<p><strong>Question 3 (psychological games).</strong> Trust game: Out gives (5,5); after In, B grabs (0,14) or rolls a die (A gets 0 with probability 1/6 and 12 otherwise; B gets 10). B is guilt averse with parameter θ.</p><p>a) Define first- and second-order beliefs. (2p) b) Write B's utility from Grab. (2p) c) Derive the conditions for a psychological equilibrium with (In, Roll). (4p) d) Why does nobody feel guilt in that equilibrium? (2p)</p>`,
      a: H`<ol type="a"><li>First order: belief about others' strategies (α: A's belief that B rolls). Second order: belief about others' first-order beliefs (β: B's belief about α).</li>
<li>\(u_B=14-\theta\max\{0,10\beta-0\}=14-10\theta\beta\).</li>
<li>Consistency \(\alpha=\beta=p=1\). B rolls iff \(14-10\theta\le10\iff\theta\ge0.4\). A plays In iff \(10\ge5\): yes. So PE (In, Roll) iff \(\theta\ge0.4\).</li>
<li>B rolls, A gets what he expected (10 in expectation), so B never falls short of A's expectation.</li></ol>` },
  ] },
  { id: 'm5', title: 'Mock exam E (60 min, 30 points)', qs: [
    { pts: 10, q: H`<p><strong>Question 1 (Bayesian Cournot).</strong> \(p=20-q_1-q_2\); firm 2's cost is 2; firm 1's cost is 2 or 6 with probability ½ each, privately known.</p><p>a) What is a strategy of firm 1? (1p) b) Derive the best responses. (4p) c) Find the BNE. (4p) d) Which equilibrium concept did you use and why? (1p)</p>`,
      a: H`<ol type="a"><li>A quantity for each cost type: \((q_1(2),q_1(6))\).</li>
<li>\(q_1(c)=\frac{20-c-q_2}{2}\); \(q_2=\frac{18-E[q_1]}{2}\).</li>
<li>\(q_2=\tfrac{20}{3}\), \(q_1(2)=\tfrac{17}{3}\), \(q_1(6)=\tfrac{11}{3}\).</li>
<li>Bayesian Nash equilibrium: static game with incomplete information.</li></ol>` },
    { pts: 10, q: H`<p><strong>Question 2 (tacit collusion).</strong> Demand \(p=200-Q\), zero costs, two Cournot firms, infinitely repeated, discount factor δ.</p><p>a) Stage-game NE and profits. (2p) b) Profits if they share monopoly output; best deviation and its profit. (3p) c) Grim-trigger condition on δ. (3p) d) Interpret the Folk theorem in this context. (2p)</p>`,
      a: H`<ol type="a"><li>\(q=66\tfrac23\) each, profit \(4444\tfrac49\).</li>
<li>50 each, profit 5000; best response to 50 is 75, profit 5625.</li>
<li>\(5625+\frac{\delta}{1-\delta}4444\tfrac49\le\frac{5000}{1-\delta}\iff\delta\ge\tfrac9{17}\).</li>
<li>Any feasible profit pair above the Cournot profits can be sustained as an SPE if firms are patient enough; many equilibria, so little predictive power.</li></ol>` },
    { pts: 10, q: H`<p><strong>Question 3 (wages and employment).</strong> A union sets the wage \(w\), then a firm with revenue \(R(L)\) (\(R'>0, R''<0\)) chooses employment.</p><p>a) Which type of game and which equilibrium concept? (2p) b) Derive the firm's best response and show it is decreasing in \(w\). (3p) c) Explain graphically why the outcome is inefficient. (3p) d) Policy implication. (2p)</p>`,
      a: H`<ol type="a"><li>Dynamic game with complete and perfect information; SPE (backward induction).</li>
<li>\(\max R(L)-wL\Rightarrow R'(L)=w\); since \(R''<0\), a higher \(w\) requires lower \(L\): \(L'(w)=1/R''(L)<0\).</li>
<li>The union picks the point on \(L^*(w)\) tangent to its indifference curve; there the firm's iso-profit curve is flat (its peak lies on \(L^*\)). The two curves cross, creating a lens of points that are better for both (lower wage, higher employment).</li>
<li>Negotiate wages and employment jointly.</li></ol>` },
  ] }
);

/* Key takeaways per lecture, rendered at the end of each lesson. */
GT.summaries = {
  l1: ['Game theory analyses strategic interaction; the course is organised by static/dynamic × complete/incomplete information.', 'Rational preferences are complete and transitive and can be represented by payoffs (finite outcomes).', 'Rational = maximising payoff given preferences; it says nothing about selfishness.', 'Models are simplifications: pictures, caricatures, fables, credible worlds, analogies.'],
  l2: ['Normal form = players, strategy sets, payoff functions.', 'Dominant-strategy equilibrium needs only rationality; IESDS also needs common knowledge of rationality.', 'Truthful bidding is weakly dominant in the second-price auction.', 'In IESDS compare rows for player 1 and columns for player 2, and justify each deletion.'],
  l3: ['Nash equilibrium: mutual best responses, no profitable unilateral deviation; requires correct beliefs.', 'Find pure NE by underlining best responses.', 'Cournot: R(x) = (a-c-bx)/2b, x = (a-c)/3b; the cartel restricts output but is not a NE.'],
  l4: ['A mixed strategy is a probability distribution over pure strategies.', 'In a mixed NE each player makes the other indifferent between the strategies he mixes.', 'Every finite game has a NE in mixed strategies (Nash).'],
  l5: ['With several equilibria use focal points, communication, Pareto efficiency, risk dominance or refinements.', 'Pareto dominance and risk dominance can conflict.', 'Trembling-hand perfection removes weakly dominated strategies; weak elimination can lose equilibria.', 'Institutions (priority claims) can make good equilibria more plausible.'],
  l6: ['Extensive form: order, information sets, moves of nature; perfect recall assumed.', 'A strategy is a complete plan for every information set.', 'Backward induction removes non-credible threats; sequential rationality applies on and off the path.', 'Union-firm: sequential wage then employment choice is inefficient.'],
  l7: ['A subgame starts at a singleton node and cuts no information set.', 'SPE = NE in every subgame; every SPE is a NE, not vice versa.', 'Generalised backward induction replaces smallest subgames by NE payoffs.'],
  l8: ['Ultimatum: infinitely many NE, unique SPE (100, 0); experiments show rejections.', 'Fehr-Schmidt: envy α, empathy β; with α = 0.5 the proposer keeps 75.', 'Rubinstein: Z = (1-δB)/(1-δAδB); patience and moving first are bargaining power; agreement is immediate.'],
  l9: ['Nash solution: each gets d_i plus half the surplus; generalised version with power α.', 'Motivated by Rubinstein equivalence and by four axioms (including IIA).'],
  l10: ['Unique stage NE ⇒ finitely repeated game has a unique SPE.', 'Grim trigger sustains cooperation iff δ ≥ (T-R)/(T-P).', 'Folk theorem: any feasible payoff above the NE payoff is an SPE average payoff for δ near 1.'],
  l11: ['Incomplete information is modelled with types; Harsanyi turns it into imperfect information.', 'A strategy assigns an action to every own type; BNE: every type best responds in expectation.', 'Common values cause adverse selection: only the lowest quality trades.'],
  l12: ['First price: bid v/2 (two uniform bidders), (n-1)v/n in general; Dutch is equivalent.', 'Second price and English/button: truthful bidding is weakly dominant.', 'Revenue equivalence under four conditions.', 'Common values: condition on winning to avoid the winner\'s curse; use Bayes\' rule.'],
  l13: ['PBE = strategies + beliefs satisfying requirements 1-4.', 'Weak PBE allows arbitrary off-path beliefs; requirement 4 uses Bayes where possible; requirement 5 excludes dominated paths.'],
  l14: ['Signalling: pooling vs. separating; requirements 1, 2R, 2S, 3.', 'Job-market example: pooling on N (q ≤ 2/5) and separating (E, N\') are PBE; signalling works because education is cheaper for the high type.'],
  l15: ['Moral hazard = hidden action + diverging objectives.', 'Risk-neutral agent: r* = 1 (residual claimant), efficient.', 'Limited liability: r = 0.5, agent earns a rent.'],
  l16: ['Risk aversion: concave utility; certainty equivalent and risk premium.', 'Risk-averse agent: r* = 1/(2K+1), risk premium K r²; fixed wage if K is large.'],
  l17: ['Psychological games let payoffs depend on beliefs (first and second order).', 'Guilt aversion: (In, Roll) is a PE iff θ ≥ 0.4; evidence: promises raise cooperation.'],
  l18: ['Contracts can be self-enforcing (NE) or externally enforced.', 'Limited verifiability needs z1+z2 ≥ x1+x2.', 'Expectation damages enforce (I, I) iff efficient; reliance damages need less information.'],
};

bank('l1', [
  { q: 'Which assumption is part of the rational-choice paradigm?', o: ['The player knows all actions, outcomes, how actions map to outcomes, and his preferences', 'The player is selfish', 'The player knows others\' types', 'Payoffs are monetary'], a: 0, e: 'The four implicit assumptions of Lecture 1.' },
  { q: 'Friedman\'s "instrumentalist" view says...', o: ['assumptions must be realistic', 'wrong assumptions do not matter if predictions are accurate', 'models are analogies', 'models are caricatures'], a: 1, e: 'Most economists today reject it.' },
  { q: 'Which pair of Nobel laureates is linked to auction theory?', o: ['Milgrom and Wilson', 'Hart and Holmström', 'Akerlof and Spence', 'Roth and Shapley'], a: 0, e: '2020 prize.' },
]);
bank('l9', [
  { q: 'In the Nash solution, the disagreement point of player 1 rises by 10. What happens to x1?', o: ['Rises by 10', 'Rises by 5', 'Unchanged', 'Falls by 5'], a: 1, e: 'x1 = d1 + ½(v* - d1 - d2): +10 - 5 = +5.' },
  { q: 'Which is the generalised Nash solution for player 2?', o: ['d2 + α(v* - d1 - d2)', 'd2 + (1-α)(v* - d1 - d2)', 'v*/2', 'αv*'], a: 1, e: 'Player 1 has power α.' },
]);
bank('l16', [
  { q: 'Log utility St. Petersburg game: certainty equivalent?', o: ['∞', '2', '1', 'ln 2'], a: 1, e: 'EU = ln 2.' },
  { q: 'Risk premium in the agency model?', o: ['K r²', 'r/2', '0.5 e²', 'u0'], a: 0, e: 'E[p] - c.' },
]);
bank('l17', [
  { q: 'In the trust game, why can A not tell whether B grabbed?', o: ['The die can also produce 0 after Roll', 'A does not see his payoff', 'B moves first', 'Payoffs are private'], a: 0, e: 'Roll gives A 0 with probability 1/6.' },
  { q: 'In a psychological equilibrium, second-order beliefs must...', o: ['equal the prior', 'match the other player\'s first-order beliefs', 'be zero', 'be arbitrary'], a: 1, e: 'Consistency of higher-order beliefs.' },
]);
bank('l13', [
  { q: 'Which requirement says beliefs on the path follow Bayes\' rule?', o: ['1', '2', '3', '5'], a: 2, e: 'Requirement 3.' },
]);
bank('l14', [
  { q: 'For separation in the job-market game (wages 10 and 4) we need...', o: ['c_H ≤ 6 ≤ c_L', 'c_H ≥ 6', 'c_L ≤ 6', 'c_H = c_L'], a: 0, e: 'See the extra practice problem "How cheap can education be for the low type?" (Exercises, Lecture 14).' },
]);
bank('l18', [
  { q: 'Which damages restore the plaintiff to the no-contract state?', o: ['Expectation damages', 'Reliance damages', 'Punitive damages', 'Liquidated damages'], a: 1, e: 'Definition from Lecture 18.' },
]);
bank('l8', [
  { q: 'Three periods, A proposes in 1 and 3: A\'s share?', o: ['1 - δB + δAδB', '1/(1+δ)', '1 - δB', 'δA'], a: 0, e: 'See the extra practice problem "Asymmetric patience, three periods" (Exercises, Lecture 8).' },
]);
cards('l7', [
  ['Equilibrium path', 'The sequence of moves actually played when everyone follows the equilibrium strategies.'],
  ['Generalised backward induction', 'Solve the smallest subgames for a NE, replace them by the NE payoffs, repeat.'],
]);
cards('l9', [
  ['Disagreement point', 'What each player gets if bargaining fails (d1, d2).'],
  ['Independence of irrelevant alternatives', 'Removing unchosen feasible agreements does not change the solution.'],
]);
cards('l14', [
  ['Single-crossing idea', 'The signal must be cheaper for the type that wants to reveal itself (c_H < premium < c_L).'],
  ['Off-path beliefs in signalling', 'If no type sends a message in equilibrium, Bayes\' rule does not apply and beliefs must be chosen to support the equilibrium.'],
]);
cards('l17', [
  ['Material vs. psychological payoff', 'Material: standard payoff of the strategy profile. Psychological: depends on beliefs (e.g. guilt).'],
  ['Charness and Dufwenberg (2006)', 'Pre-play promises raise cooperation in the trust game; consistent with guilt aversion.'],
]);
cards('l18', [
  ['Induced game', 'The underlying game plus court-imposed transfers.'],
  ['Limited verifiability', 'The court cannot tell who deviated; one transfer for all non-(I,I) outcomes; needs z1+z2 ≥ x1+x2.'],
]);
cards('l1', [
  ['Cooperative vs non-cooperative game theory', 'Non-cooperative: individual strategies and equilibria (dominant since the 1980s). Cooperative: what coalitions can achieve.'],
]);

/* Lecture-to-textbook cross-check (Osborne 2009 read in full via text recognition; printed page numbers). */
GT.pages.sources = {
  title: 'Sources and cross-check', render: () => {
    const rows = [
      ['L1', 'Preferences represented by a payoff function; rational choice', 'Ch. 1, pp. 5-6', 'Consistent'],
      ['L2', 'Strategic (normal-form) game: players, actions, preferences', 'p. 13', 'Consistent'],
      ['L2', 'Strict domination; iterated elimination of strictly dominated actions', 'p. 45; ch. 12, p. 385', 'Consistent'],
      ['L2', 'Second-price auction: bidding the valuation is weakly dominant', 'pp. 83-88, 294', 'Consistent'],
      ['L3', 'Nash equilibrium as mutual best responses (Proposition 36.1)', 'pp. 23, 36', 'Consistent'],
      ['L3', 'Cournot equilibrium q = (a-c)/3 each (b = 1); collusive output lower', 'pp. 57-59', 'Consistent (lecture adds slope b)'],
      ['L4', 'Mixed strategies; BoS: player 1 plays B with 2/3; characterisation (Prop. 116.2); existence (Prop. 119.1)', 'pp. 107, 116-119', 'Consistent; Prop. 116.2 added to L4'],
      ['L5', 'Stag Hunt, focal points; equilibrium without weakly dominated strategies (Prop. 122.1)', 'pp. 20, 32, 122', 'Consistent; Prop. 122.1 added to L5'],
      ['L5', 'Risk dominance, trembling-hand perfection, bank run', 'not in Osborne', 'Slides only (bank run cited to Osborne ch. 3 but absent from this edition)'],
      ['L6', 'Extensive game with perfect information; strategies; entry game; backward induction', 'pp. 154-159, 172-173', 'Consistent'],
      ['L7', 'Subgame perfect equilibrium; Prop. 172.1; centipede game and evidence', 'pp. 166, 172, 233-235', 'Consistent; McKelvey-Palfrey evidence added to L7'],
      ['L8', 'Ultimatum game, hold-up, Güth et al. experiment', 'pp. 181-185', 'Consistent; experiment details added to L8'],
      ['L8', 'Alternating offers: x1 = (1-δ2)/(1-δ1δ2), unique SPE (Prop. 471.3); risk of breakdown', 'pp. 465-475', 'Identical formula; uniqueness remark added to L8'],
      ['L9', 'Nash bargaining solution (Prop. 486.2), IIA; convergence with breakdown (Prop. 490.1)', 'pp. 482-490', 'Consistent; axiom wording (SYM vs. individual rationality) explained in L9'],
      ['L10', 'Grim trigger; modified grim trigger is an SPE; folk theorems (Props. 435.1, 447.1, 454.1, 458.2, 461.1)', 'pp. 419-461', 'Consistent; definition subtlety and Props. 447.1, 461.1 added to L10'],
      ['L11', 'Bayesian game; Cournot with imperfect information', 'pp. 279, 285-288', 'Consistent (Osborne uses "Nash equilibrium of a Bayesian game")'],
      ['L12', 'First-price bid v/2 with two uniform bidders; revenue equivalence; common values', 'pp. 294-300, 309', 'Consistent'],
      ['L13', 'Beliefs and weak sequential equilibrium (= weak PBE in the lecture)', 'pp. 328-334', 'Consistent; terminology note added to L13'],
      ['L14', 'Signalling; education as a signal (continuous education, two firms)', 'pp. 331-345', 'Same idea; the lecture uses a discrete 2-type version'],
      ['L15-L16', 'Principal-agent, limited liability, risk premium', 'not in Osborne', 'Slides; McMillan, Bolton-Dewatripont, Campbell (not in folder)'],
      ['L17', 'Psychological games, guilt aversion', 'not in Osborne', 'Slides; Carpenter and Robbett (not in folder)'],
      ['L18', 'Contract enforcement, expectation and reliance damages', 'not in Osborne', 'Slides; Watson ch. 13 (not in folder)'],
    ];
    return '<p class="eyebrow">About and settings</p><h1>Sources and cross-check</h1>' +
      '<p>Everything in the lessons is built from the course folder: 18 lecture slide sets (text and figures), the course information sheet, 19 exercise sheets from four winter terms, 2 past exams with solution sketches, the Tadelis (2013) solution manuals, Chiappori et al. (2002) and Gilboa et al. (2014). Osborne (2009) is a scanned book; all 552 pages were converted with text recognition and every lecture result below was looked up in it. Page numbers are the printed book pages.</p>' +
      '<div class="tbl"><table><tr><th>Lecture</th><th>Result</th><th>Osborne</th><th>Check</th></tr>' + rows.map(r => '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td></tr>').join('') + '</table></div>' +
      '<p>Section-by-section map of the whole book: <a href="#osborne">Osborne chapter guide</a>.</p><h2>Corrections made against the sources</h2><ul>' +
      '<li><strong>Declining industry (WS 2024/25 Exercise 3, Q1):</strong> the exercise and the Tadelis manual call (1/3, 0, 2/3) "the unique mixed equilibrium". Checked by computing all best responses: (1/3,0,2/3) vs (1/3,0,2/3), (1/3,0,2/3) vs (0,2/3,1/3), (0,2/3,1/3) vs (1/3,0,2/3) and (1/3,0,2/3) vs (1/6,1/3,1/2) are all Nash equilibria, because every strategy earns 0 against (1/3,0,2/3). It is the unique <em>symmetric</em> mixed equilibrium; Lecture 4 says so.</li>' +
      '<li><strong>Feb 2014 exam, auction:</strong> the official sketch writes 1000a (from the lecture example); with values on [0,100] it is 100a. The optimal bid v/2 is unaffected.</li>' +
      '<li><strong>Lecture 12 slide:</strong> the auction of the Roman Empire is dated 193 BC on the slide; it took place in 193 AD.</li>' +
      '<li><strong>Lecture 5 reading:</strong> the bank-run example cited to Osborne ch. 3 does not appear anywhere in the 2009 edition.</li></ul>' +
      '<h2>Verification performed</h2><ul>' +
      '<li><strong>Slide coverage:</strong> all 384 text-bearing slide pages and, separately, all 1012 distinct bullet lines of L1-L18 were compared with the lessons. Every page and every line with low overlap was reviewed by hand. Missing details were added (Goethe\'s letter, 3G transmission rates, auction examples and procurement auctions, "Do I hear $(p + k)?", Herodotus, the classroom Monty Hall game, "worst kept secret", the justice-system remark, the owner-tenant example, the VW strike, the entry game with Nature, the video links). After adding the slide wording, the only lines not matched by the text check are 8 video/article links (present as clickable links) and 2 reading references (present in the lecture headers).</li>' +
      '<li><strong>Osborne and L15-L18:</strong> the full text of Osborne contains no occurrence of moral hazard, limited liability, incentive contracts, risk premium, certainty equivalent, guilt aversion, inequality aversion, breach or expectation/reliance damages; its 4 uses of "psychological" concern the volunteer\'s dilemma, not psychological games. These lectures are therefore checked against the slides only.</li>' +
      '<li><strong>Uniqueness claims:</strong> every statement that an equilibrium is unique was recomputed, including mixed equilibria, with a full support enumeration (L3, L4, L7, L10, L13, all exercise sheets, mock exams). All hold; only the declining-industry exercise needed the correction above.</li>' +
      '<li><strong>Game trees:</strong> all perfect-information trees were solved by backward induction and checked for ties; the only tie (the responder at x = 100 in the ultimatum game) is resolved by the lecture\'s assumption that indifferent players accept.</li>' +
      '<li><strong>Signalling:</strong> the four job-market candidates were checked for several off-path beliefs; the result matches the lecture (pooling on N for q ≤ 2/5, separating (E, N\')).</li>' +
      '<li><strong>Numbers:</strong> every numerical quiz answer was recomputed.</li></ul>' +
      '<p class="small muted">Not in the folder and therefore not used: Gibbons (1992), Watson (2013), Carpenter and Robbett (2022), Campbell (2018), McMillan (1992), Bolton and Dewatripont (2005). Where the slides cite them, the lessons follow the slides.</p>';
  },
};

/* Every chapter and section of Osborne (2009), mapped to the course. */
GT.pages.osborne = {
  title: 'Osborne chapter guide', render: () => {
    const C = (l, t) => l ? '<a href="#' + l + '">' + t + '</a>' : '<span class="muted">' + t + '</span>';
    const ch = [
      ['1 Introduction', [['1.1-1.2 What is game theory; theory of rational choice', C('l1', 'L1 rationality')], ['1.3 Coming attractions; history; von Neumann', C('l1', 'L1 history')]]],
      ['2 Nash Equilibrium: Theory', [['2.1 Strategic games', C('l2', 'L2 normal form')], ['2.2 Prisoner\'s Dilemma; experimental evidence', C('l2', 'L2')], ['2.3 Bach or Stravinsky (BoS)', C('l4', 'L4 Battle of the Sexes')], ['2.4 Matching Pennies', C('l4', 'L4')], ['2.5 Stag Hunt', C('l5', 'L5 Pareto vs. risk; joint-project exercise, part b')], ['2.6-2.7 Nash equilibrium, examples, experiments', C('l3', 'L3')], ['Focal points', C('l5', 'L5 focal points')], ['2.8 Best response functions', C('l3', 'L3 Cournot, synergies, ads')], ['2.9 Dominated actions', C('l2', 'L2 dominance')], ['2.10 Symmetric games, single population', C(null, 'not in the course')]]],
      ['3 Nash Equilibrium: Illustrations', [['3.1 Cournot\'s oligopoly', C('l3', 'L3 (same result (a-c)/3)')], ['3.2 Bertrand\'s oligopoly', C('exercises/p10-3', 'Exercise: tacit collusion, Cournot vs. Bertrand')], ['3.3 Electoral competition (Hotelling)', C('exercises/x-pop3', 'Popsicle-stand exercises')], ['3.4 War of Attrition', C(null, 'not in the course')], ['3.5 Auctions (complete information)', C('l2', 'L2 second-price auction')], ['3.6 Accident law', C(null, 'not in the course')]]],
      ['4 Mixed Strategy Equilibrium', [['4.1-4.3 Mixed strategies and mixed equilibrium (Prop. 116.2, 119.1)', C('l4', 'L4')], ['4.4 Dominated actions (domination by mixtures)', C('lab', 'Game lab "Dominated by a mixture?"; declining-industry exercise')], ['4.5 Pure equilibria when randomization is allowed (Prop. 122.1, 123.1)', C('l5', 'L4/L5')], ['4.6 Expert diagnosis; 4.7 single population; 4.8 reporting a crime', C(null, 'not in the course')], ['4.9 Formation of beliefs', C('l4', 'L4 interpretation of mixing')], ['4.10 Finding all mixed equilibria', C('lab', 'Game lab (support enumeration)')], ['4.11 Continuum of actions', C('l4', 'L4 (cdf definition)')], ['4.12 Expected payoffs (vNM)', C('l16', 'L16 expected utility')]]],
      ['5 Extensive Games, Perfect Information: Theory', [['5.1-5.3 Extensive games, strategies, Nash equilibrium', C('l6', 'L6')], ['5.4-5.5 Subgame perfect equilibrium, backward induction (Prop. 172.1)', C('l7', 'L6/L7')], ['Chess, tic-tac-toe', C('l6', 'L6 Zermelo')]]],
      ['6 Extensive Games: Illustrations', [['6.1 Ultimatum game, holdup game, experiments', C('exercises/x-holdup', 'L8; hold-up exercises')], ['6.2 Stackelberg duopoly; 6.3 buying votes; 6.4 a race', C(null, 'not in the course')]]],
      ['7 Extensions and Discussion', [['7.1 Simultaneous moves', C('l7', 'L7 entry game with a simultaneous subgame')], ['7.2 Entry into a monopolized industry', C('l6', 'L6/L7')], ['7.3 Strategic voters; 7.4 committee decision-making', C(null, 'not in the course')], ['7.5 Exit from a declining industry (dynamic capacity model)', C('exercises/x-decline', 'related to the declining-industry exercise, a static version')], ['7.6 Exogenous uncertainty', C('l6', 'L6 moves of nature')], ['7.7 SPE and backward induction; centipede evidence', C('l7', 'L7')]]],
      ['8 Coalitional Games and the Core', [['8.1-8.8 Core, ownership, housing, matching', C('l1', 'only mentioned in L1 (cooperative games, Roth-Shapley prize)')]]],
      ['9 Bayesian Games', [['9.1-9.3 Motivating examples, definitions', C('l11', 'L11')], ['9.4 Cournot with imperfect information', C('exercises/p11-1', 'Exercise: Cournot with one-sided private costs')], ['9.5 Providing a public good', C('exercises/p11-2', 'Exercise: public good with private costs')], ['9.6 Auctions; radio spectrum', C('l12', 'L12')], ['9.7 Juries', C(null, 'not in the course')], ['9.8 Auctions with arbitrary distributions; revenue equivalence', C('l12', 'L12 general bid formula, revenue equivalence')]]],
      ['10 Extensive Games with Imperfect Information', [['10.1-10.3 Information sets, strategies, Nash equilibrium', C('l7', 'L6/L7')], ['10.4 Beliefs and (weak) sequential equilibrium', C('l13', 'L13 (weak) PBE')], ['10.5 Signaling games', C('l14', 'L14')], ['10.7 Education as a signal of ability', C('l14', 'L14 job-market signalling')], ['10.6 Conspicuous expenditure; 10.8 cheap talk; 10.9 agenda control', C(null, 'not in the course')]]],
      ['11 Strictly Competitive Games and Maxminimization', [['11.1-11.4 Maxminimization', C(null, 'not in the course (zero-sum games only mentioned in L1)')], ['Empirical tests: experiments, tennis and soccer', C('l4', 'L4 evidence on mixed strategies')]]],
      ['12 Rationalizability', [['12.1 Rationalizability', C('l2', 'related to common knowledge of rationality (L2)')], ['12.2 Iterated elimination of strictly dominated actions', C('l2', 'L2 IESDS')], ['12.3 Iterated elimination of weakly dominated actions', C('l5', 'L5')], ['12.4 Dominance solvability', C('l2', 'L2')]]],
      ['13 Evolutionary Equilibrium', [['13.1-13.6', C(null, 'not in the course (evolutionary game theory mentioned in L1)')]]],
      ['14 Repeated Games: the Prisoner\'s Dilemma', [['14.1-14.11 Grim trigger, discounting, folk theorems (Props. 435.1, 447.1)', C('l10', 'L10')]]],
      ['15 Repeated Games: General Results', [['15.1-15.3 General folk theorems, finitely repeated games (Props. 454.1, 458.2, 461.1)', C('l10', 'L10')], ['15.4 Imperfect observability', C(null, 'not in the course')]]],
      ['16 Bargaining', [['16.1 Alternating offers (Prop. 471.3), risk of breakdown', C('l8', 'L8')], ['16.2 Trade in a market', C(null, 'not in the course')], ['16.3 Nash\'s axiomatic model (Prop. 486.2)', C('l9', 'L9')], ['16.4 Relation between the approaches (Prop. 490.1)', C('l9', 'L9 motivation 1')]]],
      ['17 Appendix: Mathematics', [['Sequences, probability, proofs', C('l10', 'L10 geometric series; L12 Bayes\' rule')]]],
    ];
    return '<p class="eyebrow">About and settings</p><h1>Osborne chapter guide</h1><p>Every chapter and section of Osborne (2009), the scanned textbook in your Literature folder, with its place in the course. Use it to read the book selectively: the linked sections cover exam material; sections marked "not in the course" are optional.</p>' +
      ch.map(c => '<h3>' + c[0] + '</h3><div class="tbl"><table>' + c[1].map(r => '<tr><td style="width:55%">' + r[0] + '</td><td>' + r[1] + '</td></tr>').join('') + '</table></div>').join('') +
      '<p class="small muted">Not in Osborne at all: risk dominance and trembling-hand perfection (L5), the bank run (L5), inequality aversion (L8), the principal-agent model, limited liability and risk premia (L15-L16), psychological games (L17), contract enforcement (L18). These follow the slides.</p>';
  },
};
