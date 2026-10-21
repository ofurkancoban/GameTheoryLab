/* Past exams, mock exams and the formula sheet. */

GT.pages.exams = {
  title: 'Past exams (solved)', render: () => H`
<p class="eyebrow">Exam</p><h1>Past exams with graded solutions</h1>
<p>Two partial exams by Prof. Helm (60 minutes, 30 points each, non-programmable calculator allowed, answers in German or English). Write your answer in the box under each question, then open the graded solution and give yourself points part by part. The point split shows what examiners reward: definitions, the correct equilibrium, and a one-sentence intuition.</p>
${box('tip', '<ul><li>Always show the solution path ("Let the solution path be identified").</li><li>Contradictory answers to one question score zero even if one is correct: commit to one answer.</li><li>Definitions are cheap points: learn the English definitions in the flashcards by heart.</li><li>"Explain intuitively" questions are worth 1 point each: one clear sentence is enough.</li></ul>', 'How these exams are graded')}

<h2>Partial exam of 4 December 2013 (30 points)</h2>
<h3>Question 1: Equilibrium selection (7 points)</h3>
${mx({ p1: 'Adam', p2: 'Eva', rows: ['Top', 'Bottom'], cols: ['Left', 'Right'], cells: [['8,8', '0,7'], ['7,0', '6,6']] })}
<p>a) Define a Nash equilibrium. b) Determine the two NE. c) Which is more plausible by Pareto efficiency? Explain the criterion. d) Which by risk dominance? Explain.</p>
${ans('e13q1', [['a) Definition of Nash equilibrium', 2], ['b) The two equilibria', 1], ['c) Pareto criterion explained and applied', 2], ['d) Risk dominance explained and applied', 2]])}
${sol('Graded solution', '<p>Full solution in <a href="#l5">Lecture 5</a>: (2p) definition; (1p) (Top, Left), (Bottom, Right); (2p) Pareto: (Top, Left), both better off; (2p) risk dominance: (Bottom, Right), since deviating rival costs 8 (0 instead of 8).</p>')}
<h3>Question 2: Mixed strategies (10 points)</h3>
${mx({ p1: 'Goalkeeper', p2: 'Shooter', rows: ['Left (x1)', 'Middle (x2)', 'Right (x3)'], cols: ['Left (y1)', 'Middle (y2)', 'Right (y3)'], cells: [['1,0', '0,1', '0,1'], ['0,1', '1,0', '0,1'], ['0,1', '0,1', '1,0']] })}
<p>a) What is a NE in mixed strategies? b) General procedure? c) Determine the mixed NE. d) Why are expected payoffs 1/3 for the goalie and 2/3 for the shooter?</p>
${ans('e13q2', [['a) Definition of mixed-strategy NE', 1], ['b) General procedure (indifference) and why', 2], ['c) Goalkeeper probabilities x', 3], ['c) Shooter probabilities y', 2], ['d) Why 1/3 and 2/3', 2]])}
${sol('Graded solution', H`<ol type="a"><li>(1p) Each player's mixed strategy (a probability distribution over his pure strategies) is a best response to the other's mixed strategy.</li>
<li>(2p) Each player chooses his probabilities so that the other is indifferent between his pure strategies; otherwise the other would play his best pure strategy with probability 1 and there would be no mixed equilibrium.</li>
<li>(5p) Shooter indifferent: \(1-x_1=1-x_2=1-x_3\Rightarrow x_i=\tfrac13\) (3p). Goalie indifferent: \(y_1=y_2=y_3=\tfrac13\) (2p).</li>
<li>(2p) All 9 payoff combinations occur with equal probability 1/9; the shooter wins in 6 of them (2/3), the goalie in 3 (1/3).</li></ol>`)}
<h3>Question 3: Two entrepreneurs (13 points)</h3>
<p>Entrepreneur 1 decides first, 2 observes and decides. Only one exploits the gap: 4 and 0; both: -1 each; nobody: 0. a) Extensive form. b) Define subgame; how many? c) Define SPE. d) SPE and intuition. Then 2 is envious: \(u_2=\pi_2+(\pi_2-\pi_1)\). e) New payoffs. f) New SPE and intuition.</p>
${ans('e13q3', [['a) Game tree', 2], ['b) Subgame definition and number of subgames', 3], ['c) SPE definition', 1], ['d) SPE and intuition', 3], ['e) Payoffs with envy', 2], ['f) New SPE and intuition', 2]])}
${sol('Graded solution', '<p>Trees and full graded solution in <a href="#l7">Lecture 7, section 5</a>. Answers: 3 subgames; SPE (T; NT, T) with first-mover advantage; envy payoffs (-1,-1), (4,-4), (0,8), (0,0); new SPE (NT; T, T): envy makes punishment credible.</p>')}

<h2>Partial exam of 11 February 2014 (30 points)</h2>
<h3>Question 1: Principal-agent model (14 points)</h3>
<p>A firm offers a worker a salary \(w\) and a job \(z\): safe (\(z=0\)) or risky (\(z=1\)). The worker accepts or rejects; rejecting gives 100. If employed, the worker gets \(w+v(x)\), where status \(x\) is 2 in the safe job and, in the risky job, 3 with probability \(q\) and 1 with probability \(1-q\); \(v(1)=0\), \(v(2)=y\), \(v(3)=100\). The firm gets \(180-w\) (safe) or \(200-w\) (risky) if the worker accepts, 0 otherwise.</p>
<p>a) Type of game and equilibrium concept? b) Extensive form. c) Salary for the safe job and the firm's maximum revenue; role of \(y\). d) Same for the risky job; role of \(q\). e) With \(q=0.5\): for which \(y\) safe, for which risky?</p>
${ans('e14q1', [['a) Type of game and equilibrium concept', 2], ['b) Extensive form', 4], ['c) Safe job: wage, revenue, role of y', 3], ['d) Risky job: wage, revenue, role of q', 3], ['e) Comparison for q = 0.5', 2]])}
${tree('exPA')}
${sol('Graded solution', H`<ol type="a"><li>(2p) Dynamic game with complete information (the move of Nature is a known lottery; no private information). Concept: subgame perfect equilibrium.</li>
<li>(4p) Tree above: the firm chooses \((w,z)\), the worker accepts/rejects, Nature draws the status in the risky job.</li>
<li>(3p) Backward induction: the worker accepts the safe job iff \(w+y\ge100\). The firm pays the lowest such wage, \(w=100-y\), and earns \(180-(100-y)=80+y\). Intuition: the more the safe job's status is worth (higher \(y\)), the lower the salary the worker accepts, so the firm's revenue rises.</li>
<li>(3p) Risky job: accept iff \(q(w+100)+(1-q)w\ge100\iff w\ge100(1-q)\). Firm: \(200-100(1-q)=100+100q\). Intuition: a higher chance of excellent status lets the firm pay less.</li>
<li>(2p) With \(q=0.5\): risky gives 150, safe gives \(80+y\). The firm offers the risky job iff \(150\ge80+y\iff y\le70\), the safe job if \(y>70\): only a sufficiently prestigious safe job is worth offering.</li></ol>`)}
<h3>Question 2: First-price sealed-bid auction (16 points)</h3>
<p>Dagobert auctions a painting; two bidders with private valuations uniform on [0,100], distribution common knowledge. a) Draw the density. b) Describe first- and second-price sealed-bid auctions. c) Type of game and equilibrium concept? Suppose \(b_i=av_i\). d) For which \(v_2\) does player 2 bid less than \(x\)? e) Probability that player 1 wins; mark it in the density plot. f) Player 1's expected payoff from bidding \(x\). g) Optimal bid of player 1. h) Optimal bid of player 2. i) Revenue equivalence theorem.</p>
<p class="small muted">Points: the official sketch lists 6 points for part c, but then the parts add up to 20 instead of the 16 points of this question; the rubric below uses 2 points for c so that the total is 16.</p>
${ans('e14q2', [['a) Density drawn', 2], ['b) Both auction formats described', 2], ['c) Type of game and equilibrium concept', 2], ['d) Condition on v2', 2], ['e) Winning probability, marked in the graph', 2], ['f) Expected payoff', 1], ['g) Optimal bid of player 1', 2], ['h) Optimal bid of player 2', 1], ['i) Revenue equivalence theorem', 2]])}
${W('fpa', { max: 100 })}
${sol('Graded solution', H`<ol type="a"><li>(2p) Uniform density: a flat line at height \(1/100\) on [0,100].</li>
<li>(2p) Both: simultaneous sealed bids, highest bid wins. First price: winner pays his own bid. Second price: winner pays the second-highest bid.</li>
<li>(6p as in the official sketch) Static (simultaneous bids) game with incomplete information (valuations are private and affect payoffs). Concept: Bayesian Nash equilibrium.</li>
<li>(2p) \(av_2< x\iff v_2< x/a\).</li>
<li>(2p) \(\Pr[v_2< x/a]=\dfrac{x}{a}\cdot\dfrac{1}{100}=\dfrac{x}{100a}\): the area under the density from 0 to \(x/a\).</li>
<li>(1p) \(\dfrac{(v_1-x)\,x}{100a}\).</li>
<li>(2p) FOC \(\dfrac{v_1-2x}{100a}=0\Rightarrow x=0.5v_1\). (The official sketch writes 1000a from the lecture version; with [0,100] the constant is 100a, and it does not affect the result.)</li>
<li>(1p) \(b_2=0.5v_2\) by symmetry.</li>
<li>(2p) Revenue equivalence: every auction in which bidders' types come from a well-behaved distribution, bidders are risk neutral, the highest type wins and the lowest type has zero expected payoff gives the seller the same expected revenue (and each type the same expected payoff).</li></ol>`)}
`};

GT.pages.mock = { title: 'Mock exams', render: () => GT.renderMock() };

GT.mocks = [
  { id: 'm1', title: 'Mock exam A (60 min, 30 points)', qs: [
    { pts: 8, q: H`<p><strong>Question 1 (static games).</strong> Consider the game below.</p>${mx({ rows: ['U', 'M', 'D'], cols: ['L', 'C', 'R'], cells: [['4,3', '2,2', '1,4'], ['3,1', '3,3', '2,2'], ['1,0', '2,1', '0,0']] })}<p>a) Define a strictly dominated strategy. (1p) b) Apply IESDS and state each step. (3p) c) Find all pure-strategy Nash equilibria of the original game. (2p) d) Which assumption about players does IESDS need that Nash equilibrium does not, and vice versa? (2p)</p>`,
      a: H`<ol type="a"><li>\(s_i\) is strictly dominated if some \(s_i'\) gives a strictly higher payoff against every \(s_{-i}\).</li>
<li>D is strictly dominated by M for player 1 (3>1, 3>2, 2>0). Delete D. Player 2 then: no strictly dominated column (L: 3,1; C: 2,3; R: 4,2). Player 1 in the reduced game: U (4,2,1), M (3,3,2): none. IESDS stops: {U, M} × {L, C, R}.</li>
<li>Best responses: vs L: U (4); vs C: M (3); vs R: M (2). Player 2: vs U: R (4); vs M: C (3); vs D: C (1). NE: (M, C) with (3,3). Check (U,R): player 1 vs R prefers M (2>1), no. Unique pure NE (M, C).</li>
<li>IESDS needs common knowledge of rationality (beyond rationality). Nash equilibrium needs correct beliefs about opponents' strategies, which IESDS does not.</li></ol>` },
    { pts: 8, q: H`<p><strong>Question 2 (Cournot and collusion).</strong> Inverse demand \(p=60-X\), \(X=x_1+x_2\), marginal cost 12 for both firms.</p><p>a) Derive firm 1's reaction function. (2p) b) Compute the Nash equilibrium quantities, price and profits. (3p) c) Compute the cartel output and profits per firm and explain why the cartel is unstable in the one-shot game. (3p)</p>`,
      a: H`<ol type="a"><li>\(\pi_1=(60-x_1-x_2)x_1-12x_1\); FOC \(48-2x_1-x_2=0\Rightarrow R_1(x_2)=24-x_2/2\).</li>
<li>Symmetry: \(x=24-x/2\Rightarrow x^N=16\) each, \(X=32\), \(p=28\), profit \((28-12)\cdot16=256\) each.</li>
<li>Cartel: \(\max_X (48-X)X\Rightarrow X=24\), 12 each, \(p=36\), profit \(24\cdot12=288\) each \(>256\). Unstable: if the rival produces 12, \(R_1(12)=18>12\); deviating gives \((60-30-12)\cdot18=324>288\). The cartel is not a NE (Prisoner's Dilemma structure).</li></ol>` },
    { pts: 14, q: H`<p><strong>Question 3 (bargaining).</strong> Two parties split a surplus of 1 by alternating offers over an infinite horizon; A proposes first; discount factors \(\delta_A=0.8\), \(\delta_B=0.5\).</p><p>a) What kind of game is this and which equilibrium concept applies? (2p) b) Explain why the offers in periods 1, 3, 5, ... must be identical. (2p) c) Derive A's equilibrium share \(Z\) step by step and compute it. (6p) d) How does \(Z\) change if B becomes more patient? Give the intuition. (2p) e) Now use the Nash bargaining solution with \(v^*=1\), \(d_A=0.2\), \(d_B=0.1\) and equal bargaining power. (2p)</p>`,
      a: H`<ol type="a"><li>Dynamic game with complete (and perfect) information; SPE.</li>
<li>The subgame starting in period 3 is identical to the whole game; SPE requires NE in every subgame, so (in a stationary SPE) A's offer is the same in periods 1, 3, 5, ...</li>
<li>Stage 3: A gets \(Z\). Stage 2: B offers A \(Z\delta_A\), keeps \(1-Z\delta_A\). Stage 1: A offers B \(\delta_B(1-Z\delta_A)\): \(Z=1-\delta_B(1-\delta_AZ)\Rightarrow Z=\dfrac{1-\delta_B}{1-\delta_A\delta_B}=\dfrac{0.5}{0.6}=0.833\).</li>
<li>\(\partial Z/\partial\delta_B<0\): a more patient B can credibly wait, so A must offer more.</li>
<li>Surplus \(1-0.3=0.7\); \(x_A=0.2+0.35=0.55\), \(x_B=0.1+0.35=0.45\).</li></ol>` },
  ] },
  { id: 'm2', title: 'Mock exam B (60 min, 30 points)', qs: [
    { pts: 10, q: H`<p><strong>Question 1 (repeated games).</strong> Stage game: (C,C) = (3,3), (C,D) = (0,5), (D,C) = (5,0), (D,D) = (1,1).</p><p>a) Find the stage-game NE. (1p) b) The game is played twice without discounting. Find the SPE and explain. (3p) c) Infinitely repeated with discount factor δ. Define the grim trigger strategy and derive the condition on δ for mutual grim trigger to be a NE. (4p) d) Why is it also an SPE? (2p)</p>`,
      a: H`<ol type="a"><li>D is dominant: unique NE (D,D) with (1,1).</li>
<li>Stage 2: unique NE (D,D) regardless of history. Stage 1 reduced game adds (1,1) to every cell, still (D,D). Unique SPE: D in both stages after every history.</li>
<li>Grim trigger: play C in period 1; play C as long as all previous outcomes were (C,C); otherwise D forever. Cooperate: \(3/(1-\delta)\). Deviate: \(5+\delta/(1-\delta)\). Condition: \(3\ge5(1-\delta)+\delta\iff\delta\ge\tfrac12\) (= (5-3)/(5-1)).</li>
<li>Subgames after cooperative histories: NE by (c). Subgames after any defection: both play (D,D) forever, repeated stage NE, no profitable deviation. NE in every subgame: SPE.</li></ol>` },
    { pts: 10, q: H`<p><strong>Question 2 (Bayesian game).</strong> A used car is of low quality (seller value 4, buyer value 6) or high quality (seller value 10, buyer value 12), each with probability ½; only the seller knows the quality. The buyer names a price \(p\); simultaneously the seller decides which prices to accept.</p><p>a) Write down the type space and a strategy for each player. (2p) b) Show that no price \(p\ge10\) is offered in a BNE. (4p) c) Which prices can be supported in a BNE and which types trade? (2p) d) Name this phenomenon and one policy response from the lecture. (2p)</p>`,
      a: H`<ol type="a"><li>Seller types \(\{L,H\}\); seller strategy: for each type and price, accept or reject. Buyer strategy: a price \(p\ge0\).</li>
<li>At \(p\ge10\) both types sell; the buyer gets \(\tfrac12(6-p)+\tfrac12(12-p)=9-p<0\). At \(p\in[4,10)\) only L sells: \(\tfrac12(6-p)\ge0\) for \(p\le6\). So the buyer never offers \(p\ge10\).</li>
<li>Any \(p^*\in[4,6]\) (with L accepting iff \(p\ge p^*\), H iff \(p\ge10\)); only the low type trades.</li>
<li>Adverse selection (common values). Policy example: mandatory insurance; here, e.g., warranties or certification (beyond the lecture).</li></ol>` },
    { pts: 10, q: H`<p><strong>Question 3 (principal-agent).</strong> Output \(Q=e+u\), \(E[u]=0\), effort cost \(0.5e^2\), contract \(p=s+rQ\), agent's utility cost of risk \(r^2K\), outside option \(u_0\).</p><p>a) Derive the agent's effort choice. (2p) b) Use the binding participation constraint to find \(s\). (2p) c) Derive \(r^*\) and explain how it depends on \(K\). (3p) d) Compute the risk premium for \(K=0.5\). (1p) e) For \(u_0=0.1\), is a bonus contract better than a fixed wage when \(K=2\)? (2p)</p>`,
      a: H`<ol type="a"><li>\(\max_e s+re-r^2K-0.5e^2\Rightarrow e=r\).</li>
<li>\(s+r^2-r^2K-0.5r^2=u_0\Rightarrow s=u_0+(K-0.5)r^2\).</li>
<li>\(\max_r r-u_0-(K+0.5)r^2\Rightarrow r^*=1/(2K+1)\), decreasing in \(K\): a more risk-averse agent requires a larger risk premium, so incentives are weakened.</li>
<li>\(r^*=0.5\), \(RP=Kr^2=0.125\).</li>
<li>Profit with bonus \(1/(4(K+0.5))-u_0=0.1-0.1=0\). Exactly the threshold \(K=1/(4u_0)-0.5=2\): the principal is indifferent.</li></ol>` },
  ] },
  { id: 'm3', title: 'Mock exam C (60 min, 30 points)', qs: [
    { pts: 12, q: H`<p><strong>Question 1 (signalling).</strong> A worker is high type with probability 1/2 and low type with 1/2. She chooses education E or not N; the firm then offers a managerial job M or a clerical job C. Wages: M 10, C 4. Education costs 3 (high) or 8 (low). Firm: C gives 4; M gives 10 with a high type and 0 with a low type.</p><p>a) Is there a pooling PBE on N? Specify beliefs. (4p) b) Is there a separating PBE where only the high type educates? (4p) c) Explain why signalling works here. (2p) d) Is there a pooling PBE on E? (2p)</p>`,
      a: H`<ol type="a"><li>On N, belief = prior ½: M gives 5 > 4, so the firm offers M' after N. Both types get 10, the maximum possible without education; no type gains by deviating to E (at best 10 - cost). Pooling PBE: (N, N'; M' after N, and e.g. C after E), p = ½, any off-path q (for instance q ≤ 0.4 so that C follows E; but even M after E does not make deviation profitable).</li>
<li>Beliefs q = 1 after E, p = 0 after N: M after E, C' after N. High: 10 - 3 = 7 vs 4 by deviating: stays. Low: 4 vs 10 - 8 = 2 by deviating: stays. Separating PBE exists.</li>
<li>The signal is cheaper for the high type (3 < 8): education pays for her (premium 6 > 3) but not for the low type (6 < 8).</li>
<li>On E, belief ½, firm offers M (5 > 4): high gets 7, low gets 2. The low type deviates to N and gets at least 4 (C') > 2. No pooling PBE on E.</li></ol>` },
    { pts: 10, q: H`<p><strong>Question 2 (auctions).</strong> a) Prove that bidding one's value is weakly dominant in a second-price sealed-bid auction (consider a bid below the value). (5p) b) Three bidders with values uniform on [0,1] in a first-price auction: give the symmetric equilibrium bid and the expected revenue. (3p) c) What is the winner's curse? (2p)</p>`,
      a: H`<ol type="a"><li>Bid \(b_i< \theta_i\). Case 1: all rivals below \(b_i\): bidding \(\theta_i\) wins at the same price. Case 2: highest rival above \(\theta_i\): both lose. Case 3: highest rival \(b^*\in[b_i,\theta_i]\): \(b_i\) loses, \(\theta_i\) wins with \(\theta_i-b^*\ge0\). So \(\theta_i\) is never worse and sometimes better. Overbidding is analogous.</li>
<li>\(b(\theta)=\tfrac23\theta\). Revenue \(=\tfrac23E[\max]=\tfrac23\cdot\tfrac34=\tfrac12\) (= expected second-highest value \((n-1)/(n+1)\)).</li>
<li>With common values, winning means your signal was the most optimistic; bidding your unconditional expected value means overpaying on average.</li></ol>` },
    { pts: 8, q: H`<p><strong>Question 3 (contracts).</strong> Underlying game: (I,I) = (6,6), (I,N) = (-2,8), (N,I) = (8,-2), (N,N) = (0,0).</p><p>a) Is (I,I) self-enforcing? (1p) b) Can (I,I) be enforced with a single transfer under limited verifiability? (3p) c) Under expectation damages? (2p) d) Under reliance damages? (2p)</p>`,
      a: H`<ol type="a"><li>No: \(z_1=6< x_1=8\); (N,N) is the NE.</li>
<li>Need \(z_1+z_2\ge x_1+x_2\): \(12\ge16\) false. No.</li>
<li>Efficiency: \(12\ge x_1+y_2=6\) and \(12\ge x_2+y_1=6\): yes, enforceable.</li>
<li>\(z_1\ge x_1+y_2\): \(6\ge6\) and \(z_2\ge x_2+y_1\): \(6\ge6\). Yes (weakly).</li></ol>` },
  ] },
];

GT.pages.formulas = {
  title: 'Formula sheet', render: () => H`
<p class="eyebrow">Exam</p><h1>Formula and result sheet</h1>
<p>Every result you may need to reproduce, in course order.</p>
<div class="tbl"><table><tr><th>Topic</th><th>Result</th></tr>
<tr><td>Nash equilibrium</td><td>\(u_i(s_i^*,s_{-i}^*)\ge u_i(s_i,s_{-i}^*)\ \forall s_i,\forall i\)</td></tr>
<tr><td>Cournot (2 firms)</td><td>\(R_i(x_j)=\dfrac{a-c-bx_j}{2b}\), \(x^N=\dfrac{a-c}{3b}\), \(X^N=\dfrac{2(a-c)}{3b}\), \(\pi^N=\dfrac{(a-c)^2}{9b}\); cartel \(X=\dfrac{a-c}{2b}\)</td></tr>
<tr><td>Mixed NE (2x2)</td><td>Each player mixes to make the <em>other</em> indifferent</td></tr>
<tr><td>Battle of the Sexes (2,1 / 1,2)</td><td>\(r=\tfrac23,\ q=\tfrac13\)</td></tr>
<tr><td>Chicken</td><td>\(\Pr(T)=\dfrac{d-b}{d-b-a}\)</td></tr>
<tr><td>Trembling hand</td><td>\(v_2(R)-v_2(L)=\varepsilon>0\Rightarrow (O,L)\) not perfect</td></tr>
<tr><td>Ultimatum + envy</td><td>\(x^*=\dfrac{100(1+\alpha)}{1+2\alpha}\) (\(\alpha=0.5\Rightarrow75\))</td></tr>
<tr><td>Rubinstein</td><td>\(Z=\dfrac{1-\delta_B}{1-\delta_A\delta_B}\); equal \(\delta\): \(\dfrac1{1+\delta}\); 3 players: \(\dfrac1{1+\delta+\delta^2}\)</td></tr>
<tr><td>Bargaining with delay costs (3 periods)</td><td>\(c_1\ge c_2\): \((1-c_1+c_2,\ c_1-c_2)\); \(c_1< c_2\): \((1,0)\): the player with lower delay cost gains</td></tr>
<tr><td>Hold-up</td><td>After a sunk investment the proposer takes everything \(\Rightarrow\) underinvestment; the efficient outcome needs commitment (contract, price posting)</td></tr>
<tr><td>Nash bargaining</td><td>\(x_i=d_i+\tfrac12(v^*-d_1-d_2)\); generalised \(x_1=d_1+\alpha(v^*-d_1-d_2)\)</td></tr>
<tr><td>Geometric series</td><td>\(\sum_{t=1}^\infty\delta^{t-1}=\dfrac1{1-\delta}\), \(\sum_{t=2}^\infty\delta^{t-1}=\dfrac{\delta}{1-\delta}\)</td></tr>
<tr><td>Grim trigger</td><td>\(\delta\ge\dfrac{T-R}{T-P}\) (lecture: \(\tfrac14\)); general: \(\delta\ge\dfrac{d-c}{d-p}\) with deviation \(d\), cooperation \(c\), punishment \(p\)</td></tr>
<tr><td>One-period punishment</td><td>\(\delta\ge\dfrac{T-R}{R-P}\); tit-for-tat in the PD (4,4),(0,5),(5,0),(1,1): no profitable deviation iff \(\delta\ge\tfrac14\)</td></tr>
<tr><td>Collusion, \(p=a-Q\), zero cost</td><td>Cournot reversion \(\delta\ge\tfrac{9}{17}\); Bertrand reversion \(\delta\ge\tfrac12\)</td></tr>
<tr><td>Average payoff</td><td>\((1-\delta)\sum\delta^{t-1}\pi_t\)</td></tr>
<tr><td>Bayesian entry</td><td>Enter iff \(2p-1>0\iff p>\tfrac12\)</td></tr>
<tr><td>Orange grove</td><td>Only L trades, \(p^*\in[10,14]\)</td></tr>
<tr><td>Bayesian Cournot, symmetric types (½, ½)</td><td>\(q^j=\dfrac{a-c_j-\bar q}{2}\), \(\bar q=\dfrac{a-\bar c}{3}\), \(q^H=\dfrac{4a-5c_H+c_L}{12}\), \(q^L=\dfrac{4a-5c_L+c_H}{12}\)</td></tr>
<tr><td>Reserve price (second price)</td><td>Truthful bidding stays weakly dominant; \(\theta\in\{0,1,2\}\): \(E[R]=\tfrac59,\ 1,\ \tfrac{10}{9}\) for \(r=0,1,2\)</td></tr>
<tr><td>First-price auction</td><td>\(\Pr(\text{win})=\dfrac{x}{1000a}\), \(b=v/2\); \(n\) uniform: \(b=\dfrac{n-1}{n}v\)</td></tr>
<tr><td>Expected revenue (uniform \([0,1]\), \(n\) bidders)</td><td>\(\dfrac{n-1}{n+1}\)</td></tr>
<tr><td>Bayes' rule</td><td>\(\Pr(E\mid F)=\dfrac{\Pr(F\mid E)\Pr(E)}{\Pr(F)}\); Monty Hall: switch, \(\tfrac23\)</td></tr>
<tr><td>Winner's curse example</td><td>\(E[v\mid L]=15\), truthful bid payoff \(-1.25\)</td></tr>
<tr><td>Job-market signalling</td><td>Pooling on N with \(q\le\tfrac25\); separating (E, N')</td></tr>
<tr><td>PA, risk neutral</td><td>\(e=r\), \(r^*=1\), \(s^*=A-0.5\)</td></tr>
<tr><td>PA, limited liability</td><td>\(r^{**}=0.5\), \(s=0\), rent \(\tfrac18\)</td></tr>
<tr><td>PA, risk averse</td><td>\(r^*=\dfrac1{2K+1}\), \(s=u_0+(K-0.5)r^2\), \(RP=Kr^2\), no bonus iff \(K>\dfrac1{4u_0}-0.5\)</td></tr>
<tr><td>Guilt aversion (trust game)</td><td>\(u_B(\text{Grab})=14-10\theta\beta\); (In, Roll) PE iff \(\theta\ge0.4\)</td></tr>
<tr><td>Limited verifiability</td><td>\(z_1+z_2\ge x_1+x_2\) necessary</td></tr>
<tr><td>Expectation damages</td><td>Enforceable iff efficient: \(z_1+z_2\ge x_1+y_2,\ x_2+y_1\)</td></tr>
<tr><td>Reliance damages</td><td>\(z_1\ge x_1+y_2,\ z_2\ge x_2+y_1\)</td></tr></table></div>
<h2>Which concept for which game?</h2>
<div class="tbl"><table><tr><th></th><th>Static</th><th>Dynamic</th></tr>
<tr><td>Complete information</td><td>Nash equilibrium</td><td>Subgame perfect equilibrium</td></tr>
<tr><td>Incomplete information</td><td>Bayesian Nash equilibrium</td><td>Perfect Bayesian equilibrium</td></tr></table></div>
`};
