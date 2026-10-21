/* Exercises: every question of every exercise sheet (WS 2023/24 to WS 2026/27) plus extra practice problems,
 * organised by lecture and solved step by step. Each lecture page links to its exercises. */
GT.ex = [];
(function () {
  const X = o => GT.ex.push(o);
  const nd = (p, ch, o) => Object.assign({ p, ch }, o || {});
  const tm = (...pay) => ({ pay });
  const lab = (p, text) => '<p class="small">Check it yourself: <a href="#lab/' + p + '">open ' + text + ' in the Game lab</a>.</p>';
  const Q = h => '<div class="exq"><span class="lbl">Question</span>' + h + '</div>';

  tree('exTwoObj', nd(1, [
    ['(2,0)', nd(2, [['A', tm(2, 0)], ['R', tm(0, 0)]])],
    ['(1,1)', nd(2, [['A', tm(1, 1)], ['R', tm(0, 0)]])],
    ['(0,2)', nd(2, [['A', tm(0, 2)], ['R', tm(0, 0)]])]]));
  tree('exGuar', nd(1, [
    ['G', nd(1, [['pH', nd(2, [['pH', tm(3, 2)], ['pL', tm(1, 1)]], { info: 'g' })], ['pL', nd(2, [['pH', tm(2, 0)], ['pL', tm(1, 1)]], { info: 'g' })]])],
    ['N', nd(1, [['pH', nd(2, [['pH', tm(3, 2)], ['pL', tm(0, 3)]], { info: 'n' })], ['pL', nd(2, [['pH', tm(2, 0)], ['pL', tm(1, 1)]], { info: 'n' })]])]]));
  tree('exSafe', nd(1, [['S', tm(3, 3)], ['R', nd(1, [
    ['C', nd(2, [['A', tm(8, 0)], ['B', tm(0, 2)]], { info: 'h' })],
    ['D', nd(2, [['A', tm(6, 6)], ['B', tm(2, 2)]], { info: 'h' })]])]]));
  tree('exTremble', nd(1, [['L1', nd(2, [['L2', tm(1, 0)], ['R2', tm(3, 1)]])], ['R1', tm(2, 2)]]));
  tree('exHoldup', nd(2, [
    ['L', nd(1, [['offer x', nd(2, [['accept', tm('vL-x', 'x-cL')], ['reject', tm(0, '-cL')]])]])],
    ['H', nd(1, [['offer x', nd(2, [['accept', tm('vH-x', 'x-cH')], ['reject', tm(0, '-cH')]])]])]]));
  tree('exJunk', nd('B', [['H', tm(0, 'c')], ['C', nd('S', [['offer p', nd('B', [['accept', tm('v-p-k', 'p')], ['reject', tm('-k', 'c')]])]])]]));
  tree('exPBE6', nd(1, [['L', tm(2, 2)],
    ['M', nd(2, [['a', tm(3, 8)], ['b', tm(2, 4)], ['c', tm(5, 5)]], { info: 'h', belief: 'p' })],
    ['R', nd(2, [['a', tm(4, 1)], ['b', tm(4, 2)], ['c', tm(5, 0)]], { info: 'h', belief: '1-p' })]]));
  tree('exCar', nd('N', [
    ['High (0.3)', nd('S', [['N', nd('B', [['buy', tm(200, 200)], ['not', tm(0, 100)]], { info: 'n', belief: 'r' })], ['W', nd('B', [['buy', tm(120, 200)], ['not', tm(0, 100)]], { info: 'w', belief: 'q' })]]), '0.3'],
    ['Low (0.7)', nd('S', [['W', nd('B', [['buy', tm(-100, 0)], ['not', tm(0, 100)]], { info: 'w', belief: '1-q' })], ['N', nd('B', [['buy', tm(60, 0)], ['not', tm(0, 100)]], { info: 'n', belief: '1-r' })]]), '0.7']]));
  tree('exAd', nd('N', [
    ['High (0.3)', nd('F', [['no ad', nd('C', [['buy', tm(100, 100)], ['not', tm(0, 50)]], { info: 'n', belief: 'r' })], ['ad', nd('C', [['buy', tm(20, 100)], ['not', tm(-80, 50)]], { info: 'a', belief: 'q' })]]), '0.3'],
    ['Low (0.7)', nd('F', [['ad', nd('C', [['buy', tm(-50, 0)], ['not', tm(-80, 50)]], { info: 'a', belief: '1-q' })], ['no ad', nd('C', [['buy', tm(30, 0)], ['not', tm(0, 50)]], { info: 'n', belief: '1-r' })]]), '0.7']]));

  /* ---------------- Lecture 1 ---------------- */
  X({ lec: 'l1', id: 'x-wine', t: 'A starter on rationality: the wine problem', src: ['23.1.1', '25.1.1', '26.1.1'], body: H`
${Q(H`<p>Imagine you needed to choose how much wine (\(\alpha\)) to drink (in litre). Imagine that your payoff function is given by \(\Theta\alpha-4\alpha^2\), where \(\Theta\) is a parameter that depends on your physique. Every person may have a different value of \(\Theta\), and it is known that in the population (i) the smallest \(\Theta\) is 0.2; (ii) the largest \(\Theta\) is 6; and (iii) larger people have higher \(\Theta\) than smaller people.</p>
<ol type="a"><li>Can you find an amount that no person should drink? Based on what criterion?</li>
<li>How much should you drink if your \(\Theta=1\)? If \(\Theta=4\)?</li>
<li>Show that, in general, smaller people should drink less than larger people.</li>
<li>Should any person drink more than one 1-liter bottle of wine?</li></ol>
<p class="small muted">WS 2023/24 and 2025/26 ask part (a) without "Based on what criterion?".</p>`)}
${steps('Step-by-step solution', [
H`Write the decision problem: \(\max_{\alpha\ge0}\ \Theta\alpha-4\alpha^2\). It is a single-person decision, so "rational" means choosing the payoff-maximising amount.`,
H`(a) Yes. For each \(\Theta\) the payoff falls for every \(\alpha>\Theta/8\) (see (b)), and \(\Theta/8\le6/8=0.75\) for every person. So any amount above 0.75 litres is worse than 0.75 litres for everybody. Example from the official solution: \(\alpha=2\) gives at most \(6\cdot2-4\cdot4=-4<0\) (largest type), while drinking nothing gives 0. Criterion: <strong>rationality</strong>; a rational person never chooses an action that is strictly worse than another action whatever his type (a strictly dominated action).`,
H`(b) First-order condition: \(\Theta-8\alpha=0\Rightarrow\alpha^*(\Theta)=\Theta/8\). Second derivative \(-8<0\): a maximum. \(\Theta=1\): \(\tfrac18\) litre; \(\Theta=4\): \(\tfrac12\) litre.`,
H`(c) \(\dfrac{d\alpha^*}{d\Theta}=\tfrac18>0\): the optimal amount rises with \(\Theta\). Smaller people have lower \(\Theta\) (assumption iii), so they should drink less.`,
H`(d) No. Even the largest type, \(\Theta=6\), has \(\alpha^*=0.75<1\).`])}` });

  X({ lec: 'l1', id: 'x-fruit', t: 'Fruit trees', src: ['24.1.1'], body: H`
${Q(H`<p>You have room for up to two fruit bearing trees in your garden. The fruit trees that can grow in your garden are either apple, orange or pear. The cost of maintenance is $100 for an apple tree, $70 for an orange tree and $120 for a pear tree. Your food bill will be reduced by $130 for each apple tree you plant, by $145 for each pear tree you plant and by $90 for each orange tree you plant. You care only about your total expenditure in making any planting decisions.</p>
<ol type="a"><li>What is the set of possible actions?</li>
<li>What is the payoff of each action?</li>
<li>What action will a rational player choose?</li>
<li>Now imagine that the food bill reduction is half for the second tree of the same kind (you like variety). That is, the first apple still reduces your food bill by $130, but if you plant two apple trees your food bill will be reduced by $130 + $65 = $195. (Similarly for pear and orange trees.) What will a rational player choose now?</li></ol>`)}
${steps('Step-by-step solution', [
'(a) Plant nothing, one tree or two trees (same or different kinds): none, A, O, P, AA, OO, PP, AO, AP, OP. Ten actions.',
'(b) Net value of one tree = food-bill reduction minus maintenance: apple 130 - 100 = 30, orange 90 - 70 = 20, pear 145 - 120 = 25. Payoffs: none 0, A 30, O 20, P 25, AA 60, OO 40, PP 50, AO 50, AP 55, OP 45.',
'(c) The highest payoff is 60: a rational player plants two apple trees.',
'(d) Same-kind pairs change: AA = 130 + 65 - 200 = -5; OO = 90 + 45 - 140 = -5; PP = 145 + 72.5 - 240 = -22.5. Mixed pairs are unchanged: AO 50, AP 55, OP 45; single trees unchanged. Now the best action is one apple and one pear tree (55).'])}` });

  X({ lec: 'l1', id: 'x-oil', t: 'Drilling for oil', src: ['24.1.2'], body: H`
${Q(H`<p>An oil drilling company must decide whether or not to engage in a new drilling activity before regulators pass a law that bans drilling at that site. The cost of drilling is $1,000,000. After drilling is completed and the drilling costs are incurred, then the company will learn if there is oil or not. If there is oil, operating profits generated are estimated at $4,000,000. If there is no oil, there will be no future profits.</p>
<ol type="a"><li>\(p\) denotes the likelihood that drilling results in oil. The company estimates that \(p=0.6\). What is the expected value of drilling? Should the company go ahead and drill?</li>
<li>To be on the safe side, the company hires a specialist to come up with a more accurate estimate of \(p\). What is the minimum value of \(p\) for which it would be the company's best response to go ahead and drill?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) \(E[\text{drill}]=0.6\cdot4{,}000{,}000+0.4\cdot0-1{,}000{,}000=1{,}400{,}000\). Not drilling gives 0. Since \(1{,}400{,}000>0\): drill.`,
H`(b) Drill iff \(4{,}000{,}000\,p-1{,}000{,}000\ge0\iff p\ge0.25\). Minimum value \(p=0.25\) (at exactly 0.25 the company is indifferent).`])}` });

  /* ---------------- Lecture 2 ---------------- */
  X({ lec: 'l2', id: 'x-mafia', t: 'Mafia punishment', src: ['23.1.2'], body: H`
${Q(H`<p>Imagine that two mafia members (Player 1 and 2) caught by police and interrogated simultaneously have the chance to fink (F) on another member so that the punishment is reduced, compared to the case where both are quiet (Q). As you might know from lecture, this situation ends up in a Prisoner's Dilemma as shown below.</p>
${mx({ rows: ['Q', 'F'], cols: ['Q', 'F'], cells: [['-2,-2', '-5,-1'], ['-1,-5', '-4,-4']] })}
<ol type="a"><li>Explain, why this is a Prisoner's Dilemma.</li></ol>
<p>As both members are in mafia, and the organization is interested in confidentiality on all of its members, the organization itself prepares some serious punishment for a snitch, represented by the variable \(z\). The "mafia-modified" Prisoner's Dilemma is represented by the following matrix.</p>
${mx({ rows: ['Q', 'F'], cols: ['Q', 'F'], cells: [['-2,-2', '-5,-1-z'], ['-1-z,-5', '-4-z,-4-z']] })}
<ol type="a" start="2"><li>Since you are the Godfather of the Mafia you have to decide: how large has the punishment \(z\) to be, to avoid your members to fink?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Fix player 2's action and compare player 1's payoffs. Against Q: F gives \(-1>-2\). Against F: F gives \(-4>-5\). So F is <strong>strictly dominant</strong> for player 1, and by symmetry for player 2.`,
H`The equilibrium in dominant strategies is (F, F) with \((-4,-4)\). But (Q, Q) gives \((-2,-2)\), which is better for both. Individually rational behaviour leads to a Pareto-inferior outcome: that is the Prisoner's Dilemma.`,
H`(b) With punishment, compare again for player 1. Against Q: Q gives \(-2\), F gives \(-1-z\). Q is better iff \(-2>-1-z\iff z>1\).`,
H`Against F: Q gives \(-5\), F gives \(-4-z\). Q is better iff \(-5>-4-z\iff z>1\).`,
H`So for \(z>1\), Q is strictly dominant for both members and (Q, Q) is the unique equilibrium. (At \(z=1\) both actions give the same payoff: Q is then only weakly dominant.) The Godfather needs a punishment larger than 1 (year). Lesson: an outside institution can change the game so that cooperation becomes individually rational.`])}
${lab('mafia', 'the game without punishment')}` });

  X({ lec: 'l2', id: 'x-ebay', t: 'eBay', src: ['23.1.3', '26.1.2'], body: H`
${Q(H`<p>In the lecture you have learned that an eBay auction is similar to the 2nd price sealed bid auction. However, it differs from the standard 2nd price sealed bid auction in that the winner has to pay the 2nd highest price plus a little mark-up (say, 1€). (Note: there are some further differences, especially that the current 2nd highest bid can be observed, but we ignore this so as to have a static game.) Imagine you and a friend are the only competitors in such an auction where</p>
<ol><li>the highest bid wins;</li><li>the winner's purchase price is the bid of the losing competitor plus 1€;</li><li>you don't know the bid of your friend, that is, you bid simultaneously;</li><li>your valuation is 100€.</li></ol>
<p>Which bid should you choose? Explain your answer.</p>`)}
${steps('Step-by-step solution', [
H`Let \(b_c\) be your friend's bid. If you win, you pay \(b_c+1\) and get \(100-b_c-1\); if you lose, you get 0.`,
H`Winning is good iff \(100-(b_c+1)>0\iff b_c<99\). Losing is better if \(b_c>99\); at \(b_c=99\) you are indifferent.`,
H`The bid that makes you win exactly when \(b_c<99\) is \(b=99\): your valuation minus the mark-up.`,
H`Compare with any other bid, as in the lecture proof. Bidding more (e.g. 100) only adds wins for \(b_c\in(99,100)\), where you pay \(b_c+1>100\): a loss. Bidding less (e.g. 90) only adds losses for \(b_c\in(90,99)\), where winning would have given a positive payoff. In all other cases the payoff is the same. So \(b=99\) is never worse and sometimes better: it is <strong>weakly dominant</strong>.`])}` });

  X({ lec: 'l2', id: 'x-joint', t: 'Working on a joint project', src: ['26.1.3', '25.1.2', '24.2.1'], body: H`
${Q(H`<p>You are working with a friend on a joint project. Each of you can either work hard or goof off. If your friend works hard then you prefer to goof off (the outcome of the project would be better if you worked hard too, but the increment in its value to you is not worth the extra effort). You prefer the outcome of your both working hard to the outcome of your both goofing off (in which case nothing gets accomplished), and the worst outcome for you is that you work hard and your friend goofs off (you hate to be "exploited"). If your friend has the same preferences, then the game that models the situation you face is given in the figure.</p>
${mx({ rows: ['Work hard!', 'Goof off!'], cols: ['Work hard!', 'Goof off!'], cells: [['1,1', '-1,2'], ['2,-1', '0,0']] })}
<ol type="a"><li>Does the game have an equilibrium in dominant strategies?</li>
<li>Formulate a strategic game (i.e., a payoff matrix like the one above) for the same joint-project situation, but now assume that each person now prefers to work hard rather than goof off when the other person works hard. All other preferences remain unchanged.</li>
<li>Does this alternative game have an equilibrium in dominant strategies?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Player 1: against Work hard, Goof off gives 2 > 1; against Goof off, Goof off gives 0 > -1. So Goof off is <strong>strictly dominant</strong>; by symmetry also for player 2. Equilibrium in dominant strategies: (Goof off, Goof off) with (0,0). It is a Prisoner's Dilemma: (Work, Work) would give (1,1) to both.`,
H`(b) Old ranking of outcomes for each player: (G,W) > (W,W) > (G,G) > (W,G) (own action first). New: working hard is best when the other works hard, the rest is unchanged: (W,W) > (G,W) > (G,G) > (W,G). Any payoffs with this ranking work, for example
${mx({ rows: ['Work hard!', 'Goof off!'], cols: ['Work hard!', 'Goof off!'], cells: [['2,2', '-1,1'], ['1,-1', '0,0']], br: true })}`,
H`(c) No. Against Work hard, Work hard is best (2 > 1); against Goof off, Goof off is best (0 > -1). The best action depends on what the other does, so there is no dominant strategy and no equilibrium in dominant strategies. The game has two pure Nash equilibria, (W,W) and (G,G): a coordination game (stag hunt).`])}` });

  X({ lec: 'l2', id: 'x-pop3', t: 'Popsicle stands, three towers', src: ['26.1.4'], body: H`
${Q(H`<p>There are three lifeguard towers lined up along a beach, where the left-most tower is number 1 and the right-most tower is number 3. Two vendors, players 1 and 2, each have a popsicle stand that can be located next to one of the three towers.</p>
<p>There are 20 people located next to tower 1, 20 people next to tower 2, and 60 people next to tower 3. Each person purchases a popsicle from the stand that is closest to him or her. If a group of customers is equally distant from both stands, these customers are split equally between the two vendors. If both vendors locate at the same tower, they split all customers equally. Each purchase yields a profit of $1.</p>
<ol type="a"><li>Specify the strategy set of each player.</li>
<li>Represent the game in normal form by completing the payoff matrix below.
${mx({ rows: ['Tower 1', 'Tower 2', 'Tower 3'], cols: ['Tower 1', 'Tower 2', 'Tower 3'], cells: [['', '20,80', ''], ['', '', ''], ['', '', '']] })}</li>
<li>Determine the outcome of the game using repeated elimination of strictly dominated strategies. For each step, state which strategy or strategies are eliminated and explain why.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) \(S_1=S_2=\{\text{Tower }1,\ \text{Tower }2,\ \text{Tower }3\}\).`,
H`(b) Compute each cell from who is closest. Same tower: split 100 equally, (50,50). (1,2): tower 1 buys from player 1 (20), towers 2 and 3 from player 2 (80). (1,3): tower 2 is equally distant, split 10/10: player 1 gets \(20+10=30\), player 2 \(60+10=70\). (2,3): towers 1 and 2 go to player 1 (40), tower 3 to player 2 (60). The other cells follow by symmetry:
${mx({ rows: ['Tower 1', 'Tower 2', 'Tower 3'], cols: ['Tower 1', 'Tower 2', 'Tower 3'], cells: [['50,50', '20,80', '30,70'], ['80,20', '50,50', '40,60'], ['70,30', '60,40', '50,50']], br: true })}`,
H`(c) Step 1. Player 1: Tower 1 gives (50, 20, 30), Tower 2 gives (80, 50, 40). Since \(80>50\), \(50>20\), \(40>30\), Tower 1 is strictly dominated by Tower 2 (also by Tower 3: 70, 60, 50). By symmetry the same holds for player 2. <strong>Eliminate Tower 1 for both players.</strong>`,
H`Step 2. In the remaining game \(\{2,3\}\times\{2,3\}\), player 1: Tower 2 gives (50, 40), Tower 3 gives (60, 50): Tower 3 is strictly better against both. Same for player 2. <strong>Eliminate Tower 2 for both.</strong>`,
H`Outcome: (Tower 3, Tower 3) with payoffs (50, 50). Both vendors locate where the median customer is.`])}` });

  X({ lec: 'l2', id: 'x-pop5', t: 'Popsicle stands, five towers', src: ['24.1.4'], body: H`
${Q(H`<p>There are five lifeguard towers lined along a beach, where the left-most tower is number 1 and the right most tower is number 5. Two vendors, players 1 and 2, each have a popsicle stand that can be located next to one of five towers. There are 25 people located next to each tower, and each person will purchase a popsicle from the stand that is closest to him or her. That is, if player 1 locates his stand at tower 2 and player 2 at tower 3, then 50 people (at towers 1 and 2) will purchase from player 1, while 75 (from towers 3, 4 and 5) will purchase from vendor 2. Each purchase yields a profit of $1.</p>
<ol type="a"><li>Specify the strategy set of each player.</li>
<li>The game can be represented in matrix form as shown below. I have already filled out some entries with the profits. Complete the matrix.
${mx({ rows: ['1', '2', '3', '4', '5'], cols: ['1', '2', '3', '4', '5'], cells: [['62.5,62.5', '', '', '', ''], ['', '', '50,75', '', ''], ['', '75,50', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']] })}</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) \(S_1=S_2=\{1,2,3,4,5\}\).`,
H`(b) Rule: with stands at towers \(i< j\), everyone left of the midpoint buys from the stand at \(i\), everyone right of it from \(j\); a tower exactly at the midpoint is split. Same tower: \(125/2=62.5\) each. Examples: (1,2): 25 vs 100. (1,3): tower 2 is the midpoint and is split: \(25+12.5=37.5\) vs \(87.5\). (1,5): tower 3 split: 62.5 each. (2,4): 62.5 each.
${mx({ rows: ['1', '2', '3', '4', '5'], cols: ['1', '2', '3', '4', '5'], cells: [['62.5,62.5', '25,100', '37.5,87.5', '50,75', '62.5,62.5'], ['100,25', '62.5,62.5', '50,75', '62.5,62.5', '75,50'], ['87.5,37.5', '75,50', '62.5,62.5', '75,50', '87.5,37.5'], ['75,50', '62.5,62.5', '50,75', '62.5,62.5', '100,25'], ['62.5,62.5', '50,75', '37.5,87.5', '25,100', '62.5,62.5']], br: true })}`,
H`Going further (typical follow-up): iterated elimination. Tower 1 is strictly dominated by tower 2 and tower 5 by tower 4 (for both players). In \(\{2,3,4\}\), tower 3 strictly dominates 2 and 4. Outcome (3,3): both locate at the median, the logic of the median voter (Hotelling).`])}` });

  X({ lec: 'l2', id: 'x-iesds', t: 'Iterated elimination', src: ['24.2.2'], body: H`
${Q(H`<p>In the following normal-form game, which strategy profiles survive iterated elimination of strictly dominated strategies?</p>
${mx({ rows: ['U', 'M', 'D'], cols: ['L', 'C', 'R'], cells: [['6,8', '2,6', '8,2'], ['8,2', '4,4', '9,5'], ['8,10', '4,6', '6,7']] })}`)}
${steps('Step-by-step solution', [
H`Round 1, player 1 (compare rows column by column): U gives (6, 2, 8), M gives (8, 4, 9): \(8>6\), \(4>2\), \(9>8\). U is strictly dominated by M. <strong>Delete U.</strong> Player 2 (compare columns row by row): no column is strictly dominated in the full game (e.g. C beats R in row U).`,
H`Round 2, player 2 in \(\{M,D\}\times\{L,C,R\}\): C gives (4, 6), R gives (5, 7): R strictly dominates C. <strong>Delete C.</strong>`,
H`Round 3 in \(\{M,D\}\times\{L,R\}\). Player 1: M gives (8, 9), D gives (8, 6): equal against L, so only weak dominance. Player 2: L gives (2, 10), R gives (5, 7): no dominance. Stop.`,
H`Surviving profiles: (M,L), (M,R), (D,L), (D,R). (The pure Nash equilibria (M,R) and (D,L) are among them, as they must be.)`])}
${lab('ex2', 'this game')}` });

  /* ---------------- Lecture 3 ---------------- */
  X({ lec: 'l3', id: 'x-partner', t: 'Partnership game', src: ['23.2.2'], body: H`
${Q(H`<p>Lee (Player 1) and Julie (Player 2) are business partners. Each of them has to determine the amount of effort he or she will put into the business, which is denoted by \(e_i\), \(i=1,2\), and may be any nonnegative real number. The cost of effort \(e_i\) for Player \(i\) is \(ce_i\), where \(c>0\) is equal for both players. The success of the business depends on the amount of effort put in by the players. The business's profit is denoted by \(\pi(e_1,e_2)=e_1^\alpha e_2^\alpha\), where \(\alpha\in(0,1)\) is a fixed constant known by Lee and Julie, and the profit is shared equally between the two partners. Each player's utility is given by the difference between the share of the profit received by that player and the cost of the effort he or she put into the business. Answer the following questions:</p>
<ol type="a"><li>Describe this situation as a strategic-form game. Note that the set of strategies of each player is the continuum.</li>
<li>Find all the Nash equilibria of the game.</li>
<li>Find the efficient solution of the game and compare it to the Nash equilibrium.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Players \(I=\{1,2\}\); strategy sets \(S_i=[0,\infty)\); payoffs \(u_i(e_1,e_2)=\tfrac12e_1^\alpha e_2^\alpha-ce_i\).`,
H`(b) Best response. If \(e_j=0\), the profit is 0 whatever \(i\) does, so \(u_i=-ce_i\) and \(BR_i(0)=0\). Hence <strong>\((0,0)\) is always a Nash equilibrium</strong>: nobody wants to work if the partner does not.`,
H`If \(e_j>0\): \(u_i\) is strictly concave in \(e_i\) (because \(\alpha<1\)), so the FOC gives the maximum: \(\tfrac12\alpha e_i^{\alpha-1}e_j^\alpha=c\Rightarrow BR_i(e_j)=\left(\dfrac{\alpha e_j^\alpha}{2c}\right)^{\frac1{1-\alpha}}\). Efforts are strategic complements (the best response increases in \(e_j\)).`,
H`Interior equilibrium. Look for \(e_1=e_2=e>0\): \(\tfrac12\alpha e^{2\alpha-1}=c\Rightarrow e^*=\left(\dfrac{\alpha}{2c}\right)^{\frac1{1-2\alpha}}\) (for \(\alpha\ne\tfrac12\)). There is no asymmetric interior equilibrium: combining both best responses gives \(e_1=k\,e_1^{\beta^2}\) with \(\beta=\frac{\alpha}{1-\alpha}\ne1\), which has exactly one positive solution, the symmetric one.`,
H`Each partner's equilibrium payoff: \(\tfrac12e^{*2\alpha}-ce^*=\tfrac12(1-\alpha)e^{*2\alpha}>0\), better than in \((0,0)\). (Special case \(\alpha=\tfrac12\): the best response is linear, \(e_i=e_j/(16c^2)\); for \(c=\tfrac14\) every \(e_1=e_2\) is an equilibrium, otherwise only \((0,0)\).)`,
H`(c) Efficient solution: maximise the joint payoff \(e_1^\alpha e_2^\alpha-c(e_1+e_2)\). FOC: \(\alpha e_i^{\alpha-1}e_j^\alpha=c\). Symmetric: \(e^{**}=\left(\dfrac{\alpha}{c}\right)^{\frac1{1-2\alpha}}\) (for \(\alpha< \tfrac12\), where the joint payoff is concave).`,
H`Compare: the efficient FOC has the <strong>full</strong> marginal profit \(\alpha e_i^{\alpha-1}e_j^\alpha\), the individual FOC only half of it. For \(\alpha< \tfrac12\), \(e^{**}=2^{\frac1{1-2\alpha}}e^*>e^*\): in equilibrium both partners work too little. Reason: each bears the full cost of effort but receives only half of the extra profit, a positive externality on the partner (free riding). (For \(\alpha\ge\tfrac12\) the joint payoff has increasing returns and no finite optimum exists.)`])}` });

  X({ lec: 'l3', id: 'x-syn1', t: 'Synergies (version without b)', src: ['24.2.3'], body: H`
${Q(H`<p>Two division managers can invest time and effort in creating a better working relationship. Each invests \(e_i\ge0\), and if both invest more then both are better off, but it is costly for each manager to invest. In particular the payoff function for player \(i\) from effort levels \((e_i,e_j)\) is \(v_i(e_i,e_j)=(a+e_j)e_i-e_i^2\).</p>
<ol type="a"><li>What is the best-response function of each player?</li>
<li>In what way are the best-response functions different from those in the Cournot game? Why?</li>
<li>Find the Nash equilibrium of this game and argue that it is unique.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) FOC for player \(i\): \(\dfrac{\partial v_i}{\partial e_i}=a+e_j-2e_i=0\); second derivative \(-2<0\). So \(BR_i(e_j)=\dfrac{a+e_j}{2}\).`,
H`(b) The best response <strong>increases</strong> in the other's effort (slope \(+\tfrac12\)); in Cournot it decreases (slope \(-\tfrac12\)). Here efforts are <strong>strategic complements</strong>: more effort by the other raises the marginal return of my own effort (the term \(e_je_i\)). In Cournot, quantities are strategic substitutes: a higher rival quantity lowers the price and hence my marginal revenue.`,
H`(c) Symmetric candidate: \(e=\dfrac{a+e}{2}\Rightarrow e^*=a\). So \((e_1^*,e_2^*)=(a,a)\).`,
H`Uniqueness: insert one best response into the other: \(e_1=\dfrac{a+\frac{a+e_1}{2}}{2}\Rightarrow4e_1=3a+e_1\Rightarrow e_1=a\), then \(e_2=a\). The linear system has exactly one solution; graphically, two lines with slopes \(\tfrac12\) and 2 in the \((e_1,e_2)\) plane cross exactly once.`])}` });

  X({ lec: 'l3', id: 'x-syn2', t: 'Synergies (version with b)', src: ['25.2.1'], body: H`
${Q(H`<p>Two division managers can invest time and effort in creating a better working relationship. Each invests \(e_i\ge0\), and if both invest more then both are better off, but it is costly for each manager to invest. In particular, the payoff function for player \(i\) from effort levels \((e_i,e_j)\) is \(v_i(e_i,e_j)=(a+be_j)e_i-\tfrac12e_i^2\), where \(a>0\) and \(0< b< \tfrac12\).</p>
<ol type="a"><li>What is the best response function of each player?</li>
<li>Find the Nash equilibrium of this game.</li>
<li>Find the efficient solution of this game and compare it to the Nash equilibrium.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) FOC for manager \(i\): \(\partial v_i/\partial e_i=a+be_j-e_i=0\). Second derivative \(-1<0\). So \(BR_i(e_j)=a+be_j\): a straight line with slope \(b>0\) (strategic complements).`,
H`(b) Symmetric game, so try \(e_1=e_2=e\): \(e=a+be\Rightarrow e^*=\dfrac{a}{1-b}\). Uniqueness: the two best-response lines have slopes \(b<1\) and \(1/b>1\) in the \((e_1,e_2)\) plane, so they cross exactly once.`,
H`(c) Efficient: maximise \(v_1+v_2=(a+be_2)e_1-\tfrac12e_1^2+(a+be_1)e_2-\tfrac12e_2^2\). FOC for \(e_1\): \(a+be_2-e_1+be_2=0\Rightarrow e_1=a+2be_2\). Symmetric: \(e^{**}=\dfrac{a}{1-2b}\).`,
H`Here the assumption \(b< \tfrac12\) matters: the Hessian \(\begin{pmatrix}-1&2b\\2b&-1\end{pmatrix}\) is negative definite iff \(1-4b^2>0\iff b< \tfrac12\). Otherwise joint payoffs would have no maximum.`,
H`Comparison: \(\dfrac{a}{1-2b}>\dfrac{a}{1-b}\). Managers invest too little in equilibrium, because each ignores that his effort raises the other's payoff by \(be_j\) per unit (a positive externality). The efficient solution internalises it (the "2b" in the FOC).`])}` });

  X({ lec: 'l3', id: 'x-negads', t: 'Negative ad campaigns', src: ['24.2.4'], body: H`
${Q(H`<p>Each one of two political parties can choose to buy time on commercial radio shows to broadcast negative ad campaigns against its rival. These choices are made simultaneously. Government regulations forbid a party from buying more than 2 hours of negative campaign time \(a_i\), so that each party cannot choose an amount of negative campaigning above 2 hours. Given a pair of choices \((a_1,a_2)\), the payoff of party \(i\) is given by the following function: \(v_i(a_1,a_2)=a_i-2a_j+a_ia_j-(a_i)^2\).</p>
<ol type="a"><li>What is the normal-form representation of this game?</li>
<li>What is the best-response function for each party?</li>
<li>What is the pure-strategy Nash equilibrium? Is it unique?</li>
<li>If the parties could sign a binding agreement on how much to campaign, what levels would they choose?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Players \(I=\{1,2\}\); strategy sets \(S_i=[0,2]\) (hours of negative ads); payoffs \(v_i(a_1,a_2)=a_i-2a_j+a_ia_j-a_i^2\).`,
H`(b) FOC: \(\dfrac{\partial v_i}{\partial a_i}=1+a_j-2a_i=0\); second derivative \(-2<0\). \(BR_i(a_j)=\dfrac{1+a_j}{2}\). For \(a_j\in[0,2]\) this lies in \([0.5,1.5]\subset[0,2]\), so the constraint never binds.`,
H`(c) Symmetric: \(a=\dfrac{1+a}{2}\Rightarrow a_1^*=a_2^*=1\). Unique: the linear system \(a_1=\frac{1+a_2}{2}\), \(a_2=\frac{1+a_1}{2}\) has exactly one solution (lines with slopes \(\tfrac12\) and 2). Payoff of each party: \(1-2+1-1=-1\).`,
H`(d) Binding agreement: maximise the joint payoff \(v_1+v_2=(a_1-2a_2+a_1a_2-a_1^2)+(a_2-2a_1+a_1a_2-a_2^2)=-(a_1+a_2)-(a_1-a_2)^2\). Both terms are \(\le0\) and equal 0 at \(a_1=a_2=0\). So they agree on <strong>no negative ads</strong>; each gets \(0>-1\). Without a binding agreement each party has an incentive to deviate (\(BR(0)=\tfrac12\)): a variant of the Prisoner's Dilemma.`])}` });

  /* ---------------- Lecture 4 ---------------- */
  X({ lec: 'l4', id: 'x-penalty', t: 'Penalty kicks', src: ['24.1.3'], body: H`
${Q(H`<p>Imagine a kicker and a goalie who confront each other in a penalty kick that will determine the outcome of the game. The kicker can kick the ball left or right, while the goalie can choose to jump left or right. Because of the speed of the kick, the decisions need to be made simultaneously. If the goalie jumps in the same direction as the kick, then the goalie wins and the kicker loses. If the goalie jumps in the opposite direction of the kick then the kicker wins and the goalie loses. Use pay-off 1 to denote a win and \(-1\) to denote a loss. Model this as a normal form game and write down the matrix that represents the game you modeled.</p>`)}
${steps('Step-by-step solution', [
H`Players: kicker and goalie. Strategy sets: \(S_K=S_G=\{\text{Left},\text{Right}\}\). Same direction: goalie wins (kicker \(-1\), goalie \(1\)); opposite directions: kicker wins.
${mx({ p1: 'Kicker', p2: 'Goalie', rows: ['Left', 'Right'], cols: ['Left', 'Right'], cells: [['-1,1', '1,-1'], ['1,-1', '-1,1']], br: true })}`,
H`Remark (Lecture 4): this is Matching Pennies. There is no pure-strategy Nash equilibrium; the unique Nash equilibrium is mixed: both choose Left and Right with probability \(\tfrac12\).`])}` });

  X({ lec: 'l4', id: 'x-monitor', t: 'Monitoring and mixed strategies', src: ['23.2.3', '25.2.2'], body: H`
${Q(H`<p>An employee (player 1) who works for a boss (player 2) can either work (\(W\)) or shirk (\(S\)), while his boss can either monitor the employee (\(M\)) or ignore him (\(I\)). Like most employee-boss relationships, if the employee is working then the boss prefers not to monitor, but if the boss is not monitoring then the employee prefers to shirk. The game is represented in the following matrix:</p>
${mx({ rows: ['W', 'S'], cols: ['M', 'I'], cells: [['1,1', '1,2'], ['0,2', '2,1']] })}
<ol type="a"><li>Find all Nash equilibria of this game (i.e. equilibria in pure and in mixed strategies). Do you find the result "realistic"?</li></ol>`)}
${steps('Step-by-step solution', [
H`<strong>Pure strategies.</strong> Check every cell. (W,M): the boss prefers I (2 > 1). (W,I): the employee prefers S (2 > 1). (S,I): the boss prefers M (2 > 1). (S,M): the employee prefers W (1 > 0). The best responses cycle, so there is <strong>no pure-strategy NE</strong>.`,
H`<strong>Mixed strategies.</strong> Let the employee work with probability \(p\) and the boss monitor with probability \(q\). In a mixed equilibrium each player makes the <em>other</em> indifferent.`,
H`Boss indifferent: \(u_B(M)=1\cdot p+2(1-p)=2-p\), \(u_B(I)=2p+1\cdot(1-p)=1+p\). Equal iff \(p=\tfrac12\).`,
H`Employee indifferent: \(u_E(W)=1\) (whatever the boss does), \(u_E(S)=0\cdot q+2(1-q)=2-2q\). Equal iff \(q=\tfrac12\).`,
H`Unique NE: the employee works with probability \(\tfrac12\), the boss monitors with probability \(\tfrac12\). Expected payoffs: employee 1, boss \(1.5\).`,
H`Realistic? In part: random spot checks and occasional shirking are common. But notice the "paradox" of mixed equilibria: the employee's shirking probability is pinned down by the <em>boss's</em> payoffs. Making shirking less attractive for the employee changes how often the boss monitors, not how often the employee shirks. Whether people really randomise (rather than follow beliefs, as in the population interpretation of Lecture 4) is a fair point of discussion.`])}
${lab('monitor', 'this game')}` });

  X({ lec: 'l4', id: 'x-decline', t: 'Declining industry', src: ['24.3.1'], body: H`
${Q(H`<p>Consider two competing firms in a declining industry that cannot support both firms profitably. Each firm has to decide now (i.e., we consider a static game) between three possible options: whether or not to exit the industry immediately (E), at the end of this quarter (T), or at the end of the next quarter (N). If a firm chooses to exit, then its payoff is 0 from that point onward. Each quarter that both firms operate yields each a loss equal to \(-1\), and each quarter that a firm operates alone yields it a payoff of 2. For example, if firm 1 plans to exit at the end of this quarter while firm 2 plans to exit at the end of the next quarter then the payoffs are \((-1,1)\) because both firms lose \(-1\) in the first quarter and firm 2 gains 2 in the second. The payoff for each firm is the sum of its quarterly payoffs.</p>
<ol type="a"><li>Write down this game in matrix form.</li>
<li>Are there any strictly dominated strategies? Are there any weakly dominated strategies?</li>
<li>Find the pure-strategy Nash equilibria.</li>
<li>Find the unique mixed-strategy Nash equilibrium. (Hint: you can use your answer to (b) to make things easier.)</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Sum the quarterly payoffs. E: the firm gets 0; the rival operates alone for as many quarters as it stays (T: 2, N: 4). (T,T): \(-1\) each. (T,N): \((-1,\ -1+2)=(-1,1)\). (N,N): \(-2\) each.
${mx({ rows: ['E', 'T', 'N'], cols: ['E', 'T', 'N'], cells: [['0,0', '0,2', '0,4'], ['2,0', '-1,-1', '-1,1'], ['4,0', '1,-1', '-2,-2']], br: true })}`,
H`(b) No pure strategy strictly dominates another: E is best against N, N against E and T is never worse than everything. T is <strong>weakly</strong> dominated by the mixed strategy \(\tfrac12E+\tfrac12N\): against E: \(\tfrac12\cdot0+\tfrac12\cdot4=2=2\); against T: \(\tfrac12\cdot0+\tfrac12\cdot1=0.5>-1\); against N: \(\tfrac12\cdot0+\tfrac12(-2)=-1=-1\). Strict dominance by a mixture is impossible: more weight on N is worse than T against N, more weight on E is worse than T against E.`,
H`(c) Best responses: against E play N (4); against T play N (1); against N play E (0). Pure NE: \((E,N)\) with \((0,4)\) and \((N,E)\) with \((4,0)\).`,
H`(d) Use (b): drop T. Let firm 2 play E with probability \(q\) and N with \(1-q\). Firm 1 indifferent between E and N: \(0=4q-2(1-q)\Rightarrow q=\tfrac13\). By symmetry firm 1 also plays E with \(\tfrac13\). Mixed NE: each firm plays \((E,T,N)=(\tfrac13,0,\tfrac23)\), expected payoff 0.`,
H`Check: T against this mix gives \(2\cdot\tfrac13-1\cdot\tfrac23=0\), not more, so no firm wants to use T. (Careful, beyond the exercise: because T also earns exactly 0, there are further asymmetric mixed equilibria, so "unique" holds for the symmetric equilibrium. In the exam give \((\tfrac13,0,\tfrac23)\).)`])}
${lab('decl', 'this game')}` });

  /* ---------------- Lecture 5 ---------------- */
  X({ lec: 'l5', id: 'x-odd', t: 'The odd couple', src: ['23.2.1', '25.1.3'], body: H`
${Q(H`<p>Felix and Oscar live in a shared apartment. They have different ideas about cleaning and consequently also about the number of hours they are willing to spend on cleaning the apartment. Assume that at least 12 working hours (per week) are needed to make the apartment sparkling clean, 9 working hours to get it acceptably clean, and anything less than 9 working hours means that the apartment remains dirty. Further, assume that each of the two people can devote 3, 6, or 9 hours of their time to cleaning the apartment.</p>
<p>Felix and Oscar agree that an acceptably clean apartment has a utility index of 2. However, they do not agree on the value of a properly clean apartment; for Felix, in this case, it has a utility index of 10, while for Oscar, the utility is only 5 units. They also disagree on the repulsiveness of a dirty apartment; while for Felix in this case the apartment has a utility index of \(-10\), for Oscar the utility is \(-5\).</p>
<p>Each person's payoff is the difference between the utility of the apartment and the hours spent cleaning it; e.g., a spotlessly clean apartment for which each person worked for 6 hours gives Felix a payoff of 4, while for Oscar the payoff in this case is \(-1\).</p>
<ol type="a"><li>Represent the game in normal form.</li>
<li>Determine the outcome of the game using the procedure of "repeated elimination of dominated strategies".</li>
<li>Is the result from b) the only Nash equilibrium in this game?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Total hours decide the state: 6 (3+3) dirty; 9 (3+6) acceptable; 12 or more sparkling. Payoff = utility minus own hours. Example (3,9): total 12, Felix \(10-3=7\), Oscar \(5-9=-4\).
${mx({ p1: 'Felix', p2: 'Oscar', rows: ['3', '6', '9'], cols: ['3', '6', '9'], cells: [['-13,-8', '-1,-4', '7,-4'], ['-4,-1', '4,-1', '4,-4'], ['1,2', '1,-1', '1,-4']], br: true })}`,
H`(b) There is no strictly dominated strategy, so we must use weak dominance. Oscar: 9 gives (\(-4,-4,-4\)), 6 gives (\(-4,-1,-1\)): 6 is never worse and sometimes better. <strong>Delete Oscar's 9.</strong>`,
H`Felix in \(\{3,6,9\}\times\{3,6\}\): 3 gives (\(-13,-1\)), 6 gives (\(-4,4\)): 6 strictly dominates 3. <strong>Delete Felix's 3.</strong>`,
H`Oscar in \(\{6,9\}\times\{3,6\}\): 3 gives (\(-1,2\)), 6 gives (\(-1,-1\)): 3 weakly dominates 6. <strong>Delete Oscar's 6.</strong> Against Oscar's 3, Felix compares 6 (\(-4\)) and 9 (1): <strong>delete 6</strong>. Outcome: Felix 9 hours, Oscar 3 hours, payoffs (1, 2).`,
H`(c) No. Check all cells for mutual best responses: (3,9) with \((7,-4)\), (6,6) with \((4,-1)\) and (9,3) with \((1,2)\) are pure Nash equilibria. Elimination of <em>weakly</em> dominated strategies can delete Nash equilibria (here two of three), and the result can depend on the order of elimination.`])}
${lab('odd', 'this game')}` });

  X({ lec: 'l5', id: 'x-tremble', t: 'Trembling hand', src: ['25.2.3'], body: H`
${Q(H`<p>Consider the following sequential game between Player 1 and Player 2:</p>
<ul><li>Player 1 moves first and chooses L1 or R1.</li>
<li>If player 1 chooses R1, the game ends immediately with the payoff (2, 2).</li>
<li>If player 1 chooses L1, then Player 2 moves and chooses between L2 and R2: L2 leads to a payoff of (1, 0); R2 leads to a payoff of (3, 1).</li></ul>
<ol type="a"><li>Draw the extensive form (game tree) of the game.</li>
<li>Which Nash equilibria exist, and which solution results from backward induction?</li>
<li>Which Nash equilibrium is Pareto optimal?</li>
<li>Is the solution obtained by backward induction in part (b) also trembling-hand perfect?</li></ol>
<p class="small muted">The sheet calls the players A and B in the bullet points; they are players 1 and 2.</p>`)}
${steps('Step-by-step solution', [
H`(a) Player 1 at the root with L1 and R1; R1 is terminal (2,2); after L1 player 2 chooses L2 (1,0) or R2 (3,1).
${tree('exTremble', null, { solve: 1 })}`,
H`(b) For Nash equilibria write the normal form (player 2's strategy is what he would do after L1):
${mx({ rows: ['L1', 'R1'], cols: ['L2', 'R2'], cells: [['1,0', '3,1'], ['2,2', '2,2']], br: true })}
(L1, R2) with (3,1): player 1 gets 3 > 2, player 2 gets 1 > 0. (R1, L2) with (2,2): against L2, L1 would give player 1 only 1 < 2; player 2 is indifferent because his move is never reached. (L1, L2) and (R1, R2) are not NE.`,
H`Backward induction: after L1, player 2 compares R2 (1) with L2 (0) and picks R2. Anticipating this, player 1 compares L1 (3) with R1 (2) and picks L1. Solution (L1, R2), outcome (3, 1). (R1, L2) relies on the non-credible threat L2.`,
H`(c) Compare the equilibrium outcomes (3,1) and (2,2). Neither Pareto-dominates the other: player 1 prefers (3,1), player 2 prefers (2,2). So <strong>both</strong> equilibria are Pareto optimal. (Only the outcome (1,0) is Pareto-dominated.) Pareto optimality does not help to select here.`,
H`(d) Trembling hand: let each player make mistakes with small probability \(\varepsilon\). Player 2: if player 1 plays L1 with probability \(\ge\varepsilon>0\), R2 gives strictly more than L2 (\(1>0\) at that node, equal otherwise). So R2 is the only best response to a perturbed strategy, i.e. L2 is weakly dominated.`,
H`Player 1: if player 2 plays R2 with probability \(1-\varepsilon\), L1 gives \(3(1-\varepsilon)+1\cdot\varepsilon=3-2\varepsilon>2\) for small \(\varepsilon\). So L1 remains optimal. Hence <strong>(L1, R2) is trembling-hand perfect</strong>, while (R1, L2) is not, because L2 is weakly dominated.`])}` });

  /* ---------------- Lecture 6 ---------------- */
  X({ lec: 'l6', id: 'x-twoobj', t: 'Bargaining over two indivisible objects', src: ['23.3.1', '25.3.1'], body: H`
${Q(H`<p>Consider a variant of the ultimatum game, with indivisible units. Two people use the following procedure to allocate two desirable identical indivisible objects. Person 1 proposes an allocation (both objects go to person 1, both go to person 2, one goes to each person), which the other person then either accepts or rejects. In the event of rejection, neither person receives either object. Each person cares only about the number of objects she obtains. Hence the payoffs are (2,0) if both objects go to person 1, (0,2) if both go to person 2, and (1,1) if one goes to each person.</p>
<ol type="a"><li>Represent the game in normal form and find all pure-strategy Nash equilibria. (Hint: If you find it difficult to write down the strategies, you may start by drawing the game tree for question b.)</li>
<li>Construct an extensive game that models this situation.</li>
<li>What kind of game is it (static/dynamic, complete/incomplete, perfect/imperfect information)?</li>
<li>How many terminal nodes and how many information sets does the game have?</li>
<li>How many pure strategies does each player have?</li>
<li>Suppose that if person 2 is indifferent, she accepts the proposal. Find the subgame perfect equilibria.</li>
<li>Now suppose instead that if person 2 is indifferent, she rejects the proposal. Find the subgame perfect equilibria.</li>
<li>Is there any outcome that is generated by a Nash equilibrium but not by any subgame perfect equilibrium (from questions f. and g.)?</li></ol>`)}
${steps('Step-by-step solution', [
H`(b) Start with the tree (as the hint suggests): person 1 has one decision node with three proposals; after each proposal person 2 has her own decision node (she sees the proposal) with Accept/Reject.
${tree('exTwoObj')}`,
H`(c) Dynamic (sequential moves), complete information (payoffs common knowledge), perfect information (every information set is a single node).`,
H`(d) 6 terminal nodes; 4 information sets (1 for person 1, 3 for person 2).`,
H`(e) Person 1: 3 pure strategies. Person 2 needs a plan for each of her 3 information sets: \(2^3=8\) strategies, written as (response to (2,0), to (1,1), to (0,2)), e.g. RAA = reject (2,0), accept the others.`,
H`(a) Normal form (3 x 8); a cell gives the proposal if person 2's strategy accepts it, otherwise (0,0):
${mx({ p2: 'Person 2', p1: 'Person 1', rows: ['(2,0)', '(1,1)', '(0,2)'], cols: ['AAA', 'AAR', 'ARA', 'ARR', 'RAA', 'RAR', 'RRA', 'RRR'], cells: [['2,0', '2,0', '2,0', '2,0', '0,0', '0,0', '0,0', '0,0'], ['1,1', '1,1', '0,0', '0,0', '1,1', '1,1', '0,0', '0,0'], ['0,2', '0,0', '0,2', '0,0', '0,2', '0,0', '0,2', '0,0']], br: true })}`,
H`Pure NE (shaded cells, checked one by one): proposal (2,0) with AAA, AAR, ARA, ARR (outcome (2,0)); (2,0) with RRA or RRR (outcome (0,0)); (1,1) with RAA or RAR (outcome (1,1)); (0,2) with RRA (outcome (0,2)). In total <strong>9 pure NE</strong>. Logic: person 2 only needs to best respond to the proposal actually made; her threats elsewhere only need to make person 1's proposal optimal.`,
H`(f) Accept when indifferent: person 2 accepts everything (AAA), including (2,0) where she gets 0 either way. Person 1 proposes (2,0). SPE ((2,0), AAA), outcome (2,0).`,
H`(g) Reject when indifferent: person 2 plays RAA. Person 1 gets 0 from (2,0), 1 from (1,1), 0 from (0,2): proposes (1,1). SPE ((1,1), RAA), outcome (1,1).`,
H`(h) Yes: the outcomes (0,2) and (0,0) arise in Nash equilibria but in no SPE. They rely on person 2 threatening to reject (1,1), which she would never do once (1,1) is on the table (1 > 0): a non-credible threat.`])}` });

  /* ---------------- Lecture 7 ---------------- */
  X({ lec: 'l7', id: 'x-jv', t: 'Negotiating a joint venture', src: ['24.3.2'], body: H`
${Q(H`<p>Player 1 and Player 2 are executives negotiating a joint venture. At the beginning, Player 1 can either accept a mediocre offer and end the game by closing the deal immediately (choice A), or push for a better agreement (choice B). If Player 1 pushes for a better deal, Player 2 can either agree to favorable terms (choice C), benefiting both but ending the negotiation, or reject the terms (choice D), continuing the negotiation. Player 1 must then decide whether to make a final concession (choice E) or end the negotiations (choice F).</p>
<ol type="a"><li>Model this as an extensive-form game tree. Is it a game of perfect or imperfect information?</li>
<li>How many terminal nodes does the game have? How many information sets?</li>
<li>How many pure strategies does each player have?</li>
<li>Imagine that the payoffs following choice A by player 1 are (2, 0), those following C by player 2 are (3, 1), those following E by player 1 are (0, 0), and those following F by player 1 are (1, 2). What are the Nash equilibria of this game? Does one strike you as more "appealing" than the other?</li>
<li>Do the Nash equilibria satisfy the principle of sequential rationality?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Player 1 chooses A (end) or B; after B, player 2 chooses C (end) or D; after D, player 1 chooses E or F. Every information set is a single node: <strong>perfect information</strong>. (Tree with the payoffs of part d:)
${tree('exJV', null, { solve: 1 })}`,
'(b) 4 terminal nodes (after A, C, E, F); 3 information sets (2 for player 1, 1 for player 2).',
'(c) Player 1 has 2 information sets with 2 actions each: AE, AF, BE, BF (4 strategies). Player 2: C, D (2 strategies).',
H`(d) Normal form:
${mx({ rows: ['AE', 'AF', 'BE', 'BF'], cols: ['C', 'D'], cells: [['2,0', '2,0'], ['2,0', '2,0'], ['3,1', '0,0'], ['3,1', '1,2']], br: true })}
Nash equilibria: (AE, D), (AF, D) and (BE, C). (BE, C) looks more "appealing": (3,1) is better for both players than (2,0).`,
H`(e) Sequential rationality: at the last node player 1 picks F (1 > 0), so the plan E is a non-credible promise. Hence (AE, D) and (BE, C) violate sequential rationality. Backward induction: player 2 anticipates F, so D gives 2 > 1 (C); player 1 then compares A (2) with B (leading to D, F: 1) and picks A. Only <strong>(AF, D)</strong> is sequentially rational (the SPE), with outcome (2,0). The appealing (3,1) cannot be reached because player 1 cannot commit to E.`])}` });

  X({ lec: 'l7', id: 'x-cent', t: 'Centipedes', src: ['24.3.3'], body: H`
${Q(H`<p>Imagine a two-player game that proceeds as follows. A pot of money is created with $6 in it initially. Player 1 moves first, then player 2, then player 1 again, and finally player 2 again. At each player's turn to move, he has two possible actions: grab (G) or share (S). If he grabs, he gets 2/3 of the current pot of money, the other player gets 1/3 of the pot, and the game ends. If he shares, then the size of the current pot is multiplied by 3/2 and the next player gets to move. At the last stage at which player 2 moves, if he chooses S then the pot is still multiplied by 3/2, player 2 gets 1/3 of the pot, and player 1 gets 2/3 of the pot.</p>
<ol type="a"><li>Model this as an extensive-form game tree. Is it a game of perfect or imperfect information?</li>
<li>How many terminal nodes does the game have? How many information sets?</li>
<li>How many pure strategies does each player have?</li>
<li>Find the Nash equilibria of this game. How many outcomes can be supported in equilibrium? Do the Nash equilibria satisfy the principle of sequential rationality?</li>
<li>Now imagine that at the last stage at which player 2 moves, if he chooses to share then the pot is equally split among the players. Does your answer to part (d) change?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) The pot grows 6 → 9 → 13.5 → 20.25 → 30.375. Grabbing gives the mover 2/3 of the current pot. Perfect information (all information sets are singletons, no Nature).
${tree('exCent', null, { solve: 1 })}`,
'(b) 5 terminal nodes (four grabs and the final share); 4 information sets (2 per player).',
'(c) Each player has 2 information sets with 2 actions: 2 · 2 = 4 pure strategies each (e.g. GG, GS, SG, SS).',
H`(d) Backward induction: last node, player 2: G gives \(\tfrac23\cdot20.25=13.5\), S gives \(\tfrac13\cdot30.375=10.125\): G. Player 1 before: G gives 9 > 6.75: G. Player 2: G gives 6 > 4.5: G. Player 1 at the start: G gives 4 > 3: G.`,
H`Nash equilibria: player 1 grabs at his first node (anything at his second) and player 2 grabs at his first node (anything at his second): 4 NE, but <strong>one outcome</strong>: player 1 grabs immediately, (4,2). Only (GG, GG) is sequentially rational; the others contain non-optimal plans at nodes that are never reached.`,
H`(e) Now S at the last stage gives \(30.375/2=15.1875\) each. Last node, player 2: S (15.19 > 13.5). Then player 1: S (15.19 > 9); player 2: S (15.19 > 6); player 1: S (15.19 > 4). The SPE has everybody sharing, outcome (15.19, 15.19). The answer changes: the old (GG, GG) is still a Nash equilibrium (if player 1 grabs, player 2's plans do not matter; if player 2 grabs at once, sharing gives player 1 only 3 < 4), but it is no longer sequentially rational.
${tree('exCent2', null, { solve: 1 })}`])}` });

  X({ lec: 'l7', id: 'x-guar', t: 'Price guarantee', src: ['23.3.2', '25.3.2'], body: H`
${Q(H`<p>Consider two hardware stores that are in competition with each other. Both decide at the same time whether to charge a high price (\(p_H\)) or a low price (\(p_L\)) (for simplicity, we assume that the hardware stores sell only one product). Overall, the companies make the highest profits if they both charge high prices. Hardware store 1 is the dominant company in the market, hardware store 2 is a smaller competitor. If hardware store 2 undercuts the price of the other hardware store, it gains many new customers and therefore profits from this. If, on the other hand, hardware store 1 undercuts the competitor's price, it only gains a few new customers and these cannot compensate for the losses due to the lower price. This results in the following payout matrix:</p>
${mx({ p1: 'Hardware store 1', p2: 'Hardware store 2', rows: ['pH', 'pL'], cols: ['pH', 'pL'], cells: [['3,2', '0,3'], ['2,0', '1,1']] })}
<ol type="a"><li>Determine the Nash equilibrium of this game. Interpret it briefly from the customer's point of view.</li></ol>
<p>Now consider the following extension. In stage 1 of the game, hardware store 1 can give a price guarantee that it will never charge a higher price for its product than the other hardware store. In stage 2, the two hardware stores again decide on their prices simultaneously, with the payouts for the respective price combinations being the same as in the matrix above. If hardware store 1 has given a price guarantee and still has a higher price than the competitor, then customers can (and will) demand the price difference back from hardware store 1. Therefore, the payoffs will be the same as if both stores had charged a low price.</p>
<ol type="a" start="2"><li>Present this game in extensive form.</li>
<li>How many proper sub-games does the game have?</li>
<li>Write the (pure-) strategy sets for both players.</li>
<li>What kind of game is it (static/dynamic, complete/incomplete, perfect/imperfect information) and which equilibrium concept should be used?</li>
<li>What is the equilibrium of the game? Interpret it briefly.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Store 2: against \(p_H\), \(p_L\) gives 3 > 2; against \(p_L\), 1 > 0. So \(p_L\) is strictly dominant for store 2. Store 1's best reply to \(p_L\) is \(p_L\) (1 > 0). Unique NE \((p_L,p_L)\) with (1,1). Good for customers: competition keeps prices low (the stores are in a Prisoner's-Dilemma-like situation).`,
H`(b) Store 1 first chooses G (guarantee) or N. Then both choose prices simultaneously, drawn as store 1 moving and store 2 not observing (one information set after G, one after N). With G, the cell \((p_H,p_L)\) becomes (1,1).${tree('exGuar')}`,
H`(c) Two proper subgames: the price game after G and the price game after N. (The whole game is a subgame but not a proper one; the simultaneous stages contain no smaller subgames.)`,
H`(d) Store 1: \(\{G,N\}\times\{p_H,p_L\}\times\{p_H,p_L\}\) (stage-1 choice, price after G, price after N): 8 strategies, e.g. \((G,p_H,p_L)\). Store 2: a price after G and a price after N: 4 strategies, e.g. \((p_H,p_L)\).`,
H`(e) Dynamic, complete but imperfect information (simultaneous moves in stage 2). Use subgame perfect equilibrium (backward induction over subgames).`,
H`(f) Subgame after N: as in (a), \((p_L,p_L)\), payoffs (1,1). Subgame after G:
${mx({ p1: 'Store 1', p2: 'Store 2', rows: ['pH', 'pL'], cols: ['pH', 'pL'], cells: [['3,2', '1,1'], ['2,0', '1,1']], br: true })}
Store 2 now prefers \(p_H\) against \(p_H\) (2 > 1): undercutting no longer pays. NE: \((p_H,p_H)\) with (3,2) and \((p_L,p_L)\) with (1,1). For store 1, \(p_H\) weakly dominates \(p_L\) (3 > 2, 1 = 1), so \((p_H,p_H)\) is the natural prediction. (There are also mixed equilibria in which store 2 plays \(p_L\) and store 1 plays \(p_H\) with probability at most \(\tfrac12\); all give (1,1).)`,
H`Stage 1: G leads to 3, N to 1, so store 1 gives the guarantee. SPE: store 1 \((G,p_H,p_L)\), store 2 \((p_H,p_L)\); outcome: guarantee and both charge high prices, (3,2). (If players coordinated on \((p_L,p_L)\) after G, store 1 would be indifferent and further SPE exist; they rely on the weakly dominated \(p_L\).)`,
H`Interpretation: the guarantee looks customer-friendly, but it removes store 2's gain from undercutting, so it works as a commitment device that <strong>raises</strong> prices. Customers are worse off.`])}
${lab('guarG', 'the subgame after G')}` });

  X({ lec: 'l7', id: 'x-safe', t: 'Playing it safe', src: ['24.4.1'], body: H`
${Q(H`<p>Consider the following dynamic game: Player 1 can choose to play it safe (denote this choice by S), in which case both he and player 2 get a payoff of 3 each, or he can risk playing a game with player 2 (denote this choice by R). If he chooses R, then they play the following simultaneous-move game:</p>
${mx({ rows: ['C', 'D'], cols: ['A', 'B'], cells: [['8,0', '0,2'], ['6,6', '2,2']] })}
<ol type="a"><li>Draw a game tree that represents this game. How many proper sub-games does it have?</li>
<li>Are there other game trees that would work? Explain briefly.</li>
<li>Construct the matrix representation of the normal form of this dynamic game.</li>
<li>Find all the Nash and subgame-perfect equilibria of the dynamic game.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Player 1 chooses S (end, (3,3)) or R; after R, player 1 chooses C or D and player 2 chooses A or B without observing it (player 2's two nodes form one information set).
${tree('exSafe')}
One proper subgame: the simultaneous game after R. There is no subgame starting at player 2's nodes, because they share an information set.`,
H`(b) Yes: in the simultaneous stage the order of drawing does not matter. Player 2 could be drawn moving first (at a single node after R) and player 1 second, with both of player 1's nodes in one information set. Both trees have the same strategies and payoffs.`,
H`(c) Player 1 needs a plan for both information sets: SC, SD, RC, RD. Player 2: A, B.
${mx({ rows: ['SC', 'SD', 'RC', 'RD'], cols: ['A', 'B'], cells: [['3,3', '3,3'], ['3,3', '3,3'], ['8,0', '0,2'], ['6,6', '2,2']], br: true })}`,
H`(d) Pure NE of the whole game: (SC, B) and (SD, B). Check: against B, player 1 gets 3 from S, 0 from RC and 2 from RD, so S is optimal; player 2 is indifferent after S. With A, player 1 would choose RC (8), and against RC player 2 prefers B: no NE with A.`,
H`Subgame after R: best responses cycle (against C, player 2 picks B; against B, player 1 picks D; against D, player 2 picks A; against A, player 1 picks C), so <strong>no pure NE in the subgame</strong>. Hence (SC,B) and (SD,B) are not subgame perfect: B is not part of an equilibrium of the subgame.`,
H`Mixed NE of the subgame. Player 1 plays C with \(p\): player 2 indifferent iff \(0\cdot p+6(1-p)=2\Rightarrow p=\tfrac23\). Player 2 plays A with \(q\): player 1 indifferent iff \(8q=6q+2(1-q)\Rightarrow q=\tfrac12\). Expected payoffs in the subgame: player 1 \(8\cdot\tfrac12=4\), player 2 \(2\).`,
H`Stage 1: R gives 4 > 3 (S). Unique SPE: player 1 chooses R and then C with probability \(\tfrac23\); player 2 plays A with probability \(\tfrac12\). Expected payoffs (4, 2). (The game also has mixed NE in which player 1 plays S and player 2 plays A with probability at most \(\tfrac14\); they are not subgame perfect either.)`])}
${lab('safeNF', 'the normal form')}` });

  /* ---------------- Lecture 8 ---------------- */
  X({ lec: 'l8', id: 'x-delay', t: 'Bargaining with delay costs', src: ['23.4.1'], body: H`
${Q(H`<p>Consider the following three-period bargaining game with constant cost of delay: First, player 1 proposes a division \((x_1;x_2)\) of 1 pie, where \(x_1+x_2=1\) and \(0\le x_i\le1\) for \(i=1,2\). Player 2 either accepts (a) this division or rejects (r) it. If she accepts she receives \(x_2\) and player 1 receives \(x_1\). If she rejects, the game continues.</p>
<p>In the second period player 2 may make a counterproposal, which can be either accepted or rejected by player 1. If it is accepted, the game ends and both players receive the amount as proposed by player 2. If player 1 rejects, the game continues with player 1 as the proposer in the third and final period.</p>
<p>If his proposal is accepted, the game ends and both players receive the amount as proposed by player 1. If it is rejected, the game ends and none of the players receives anything from the pie. The cost to each player \(i\) of each period of delay is \(c_i>0\), \(i=1,2\). Therefore, the payoff \(\pi\) of player \(i\) in period \(t\) is \(\pi_i(t)=x_i-(t-1)c_i\), i.e. his share of the pie minus the costs of \(t-1\) periods of delay. Assume that a player accepts a proposal if he is indifferent.</p>
<ol type="a"><li>Find the subgame perfect outcome of this game for the case that \(c_1\ge c_2\).</li>
<li>Now suppose that \(c_1< c_2\), and note that payoffs \(\pi_i(t)\) can be negative, but a proposal \((x_1;x_2)\) must still be a pair of nonnegative numbers. What is now the subgame perfect outcome of the game?</li>
<li>How can the results be used to explain that pilots often strike at the beginning of the holiday season?</li></ol>`)}
${steps('Step-by-step solution', [
H`Backward induction, start in <strong>period 3</strong>. Player 1 proposes; rejecting gives player 2 nothing from the pie, accepting \(x_2\ge0\). So player 2 accepts any offer and player 1 proposes \((1,0)\). Payoffs \((1-2c_1,\ -2c_2)\).`,
H`<strong>Period 2</strong>: player 2 proposes. Player 1 accepts \(x_1\) iff \(x_1-c_1\ge1-2c_1\iff x_1\ge1-c_1\). Player 2 offers exactly \(x_1=1-c_1\) and keeps \(x_2=c_1\). Payoffs \((1-2c_1,\ c_1-c_2)\). (Player 2 prefers this to waiting for period 3: \(c_1-c_2>-2c_2\).)`,
H`<strong>Period 1</strong>: player 2 accepts \(x_2\) iff \(x_2\ge c_1-c_2\) (his value of continuing).`,
H`(a) \(c_1\ge c_2\): player 1 offers \(x_2=c_1-c_2\ge0\) and keeps \(x_1=1-c_1+c_2\). Accepted immediately: outcome \((1-c_1+c_2,\ c_1-c_2)\).`,
H`(b) \(c_1< c_2\): the continuation value \(c_1-c_2\) is negative, so player 2 accepts even \(x_2=0\). Player 1 takes the whole pie: outcome \((1,0)\) in period 1.`,
H`Lesson: what matters is the <strong>relative</strong> cost of delay. The player who suffers less from delay gets more; if the proposer is the more patient one, he gets everything.`,
H`(c) Pilots (union) vs. airline: at the start of the holiday season a strike is extremely costly for the airline (lost peak revenue, stranded customers), while the pilots' cost of a strike day hardly changes. With \(c_{\text{airline}}\gg c_{\text{pilots}}\) the bargaining power shifts to the pilots, so threatening or starting a strike exactly then gives them a larger share.`])}` });

  X({ lec: 'l8', id: 'x-holdup', t: 'Hold-up game', src: ['24.4.2'], body: H`
${Q(H`<p>Consider an ultimatum game in which player 1 makes an offer (\(x\)) to player 2 how to share a pie (i.e., if player 2 accepts, the offer is implemented, if he rejects, both get nothing from the pie). The size of the pie depends on an investment decision by player 2 that occurs before the ultimatum game is played. In particular, if player 2 chooses a low level of investment (L) then the size of the pie is small, equal to \(v_L\), while if player 2 chooses a high level of investment (H) then the size of the pie is large, equal to \(v_H\). The cost to player 2 of choosing L is \(c_L\), while the cost of choosing H is \(c_H\). Assume that \(v_H>v_L>0\), \(c_H>c_L>0\), and \(v_H-c_H>v_L-c_L\).</p>
<ol type="a"><li>Depict the game in extensive form.</li>
<li>What is the unique subgame-perfect equilibrium of this game? Is it Pareto optimal? (We assume that player 2 accepts if indifferent.)</li>
<li>Can you find a Nash equilibrium of the game that results in an outcome that is better for both players as compared to the unique subgame-perfect equilibrium?</li>
<li>Try to find a story that fits to the game.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Player 2 invests L or H; player 1 observes the pie and offers \(x\); player 2 accepts or rejects (payoffs: player 1, player 2). The offer \(x\in[0,v]\) is a continuum; the tree shows one representative branch.
${tree('exHoldup')}`,
H`(b) Ultimatum stage: player 2 accepts any \(x\ge0\) (accepting gives \(x-c\ge-c\)). So player 1 offers \(x=0\) after both L and H.`,
H`Investment stage: player 2 anticipates getting 0 of the pie, so L gives \(-c_L\) and H gives \(-c_H<-c_L\): he invests low. SPE: player 2 plays L and accepts every offer; player 1 offers 0 at both nodes. Payoffs \((v_L,-c_L)\).`,
H`Not Pareto optimal: high investment creates more net surplus (\(v_H-c_H>v_L-c_L\)). For any \(x\) with \(c_H-c_L< x< v_H-v_L\) (non-empty by assumption), (H, offer \(x\)) gives player 1 \(v_H-x>v_L\) and player 2 \(x-c_H>-c_L\): better for both.`,
H`(c) Yes. Player 2: invest H, and after H reject every offer below \(\bar x\), with \(\bar x\in(c_H-c_L,\ v_H-v_L)\); after L accept everything. Player 1: offer \(\bar x\) after H, 0 after L. Player 1 prefers \(v_H-\bar x>0\) to a rejection; player 2 gets \(\bar x-c_H>-c_L\). It is a NE, but not an SPE: once the investment is sunk, rejecting \(x< \bar x\) is not credible.`,
H`(d) Stories: a supplier who builds a machine tailored to one buyer; an employee who acquires firm-specific skills; a tenant renovating a flat before renegotiating the rent. Once the investment is sunk, the other party can "hold up" the investor, so the investment does not happen. Contracts, vertical integration or reputation can help.`])}` });

  X({ lec: 'l8', id: 'x-junk', t: 'Junk mail advertising', src: ['24.4.3'], body: H`
${Q(H`<p>Suppose a single good is owned by a single seller (S) who values it at \(c>0\) (he can consume the good and get a payoff of \(c\)). There is a single buyer (B) who has a small transportation cost \(k>0\) to get to and back from the seller's store, and he values the good at \(v>c+k\). The buyer first decides whether to make the commute (C) or stay at home (H), not buy the good, and receive a payoff of 0. If the buyer commutes to the store, the seller can then make the buyer a take-it-or-leave-it price offer \(p\ge0\) (where we assume that \(p>c\)). The buyer can then accept the offer, pay \(p\), and get the good, or he can reject, walk out and not buy the good. Assume that \(c\), \(v\), and \(k\) are common knowledge and that when a player is indifferent between two actions, they accept or choose the one that facilitates the continuation of the game.</p>
<ol type="a"><li>Depict the game in extensive form. What is the best response of the buyer at the node at which he decides whether to accept or reject the seller's offer?</li>
<li>Find the subgame-perfect equilibrium of the game and show that it is unique.</li>
<li>Are there Nash equilibria that yield a higher payoff to both players as compared to the subgame-perfect equilibrium you found in b)?</li>
<li>Now assume that before the game is played the seller can, at a small cost \(\varepsilon<(v-c-k)\), send the buyer a postcard that commits the seller to a certain price at which the buyer can buy the good (e.g., "bring this coupon and get the good at a price p"). Would the seller choose to do so?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) The buyer chooses H (payoffs: buyer 0, seller \(c\)) or C; the seller offers \(p\); the buyer accepts \((v-p-k,\ p)\) or rejects \((-k,\ c)\) (payoffs: buyer, seller).
${tree('exJunk')}
At the last node the commuting cost \(k\) is sunk: accepting gives \(v-p-k\), rejecting \(-k\). Best response: accept iff \(p\le v\).`,
H`(b) Seller: the highest accepted price is \(p=v\). Buyer at the start: commuting gives \(v-v-k=-k<0\), staying home 0. So he stays home. SPE: buyer (H, accept iff \(p\le v\)); seller \(p=v\). Payoffs: buyer 0, seller \(c\). Unique: the acceptance rule is forced (indifference breaks to accept), so \(p=v\) is the unique optimal offer, and then H is strictly better than C.`,
H`(c) Yes. Buyer: commute and accept only \(p\le\bar p\) with \(c< \bar p< v-k\). Seller: offer \(\bar p\). Payoffs \(v-\bar p-k>0\) and \(\bar p>c\): both better. It is a NE, but rejecting prices in \((\bar p,v]\) after commuting is not credible, so it is no SPE.`,
H`(d) With a committed price \(\hat p\), the buyer commutes iff \(v-\hat p-k\ge0\). The seller sets \(\hat p=v-k\) and earns \(v-k-\varepsilon\), which beats \(c\) because \(\varepsilon< v-c-k\). So yes, he sends the postcard: commitment solves the hold-up of the buyer's sunk commuting cost and creates trade. This is why coupons and "junk mail" with prices exist.`])}` });

  /* ---------------- Lecture 9 ---------------- */
  X({ lec: 'l9', id: 'x-invest', t: 'Investing in a business partnership', src: ['24.5.2'], body: H`
${Q(H`<p>There are two players who are considering a possible business partnership. First, the players simultaneously choose whether to make an investment. Investment entails a personal cost of 3; not investing costs nothing. The investment choices become common knowledge. Then the players jointly decide whether to form a partnership firm and, if so, how to divide the profit from the firm. If both players invested, then the firm's profit is 16. If exactly one player invested or if neither invested, then the firm's profit is 12. If the players decide not to form the firm, then each player \(i\) gets a default payoff of \(x-3\) if player \(i\) invested and zero if player \(i\) did not invest. The default payoff of \(x-3\) includes the cost of investment plus some value \(x\) that represents what player \(i\) can obtain by using his investment in other endeavours. Assume that the players divide surplus according to the Nash bargaining solution (with equal bargaining weights as in the lecture).</p>
<ol type="a"><li>What outcome maximizes the joint value? That is, what are the efficient investment choices?</li>
<li>Describe conditions on \(x\) such that there is a negotiation equilibrium in which both players invest. Show that this is an equilibrium.</li>
<li>In light of your answers to parts (a) and (b), briefly provide some intuition for your answers in relation to the "hold-up" problem.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Joint value of each investment profile (choosing the better of firm / no firm): both invest: \(\max\{16-6,\ 2x-6\}\); one invests: \(\max\{12-3,\ x-3\}\); nobody: 12. For \(x\le9\) the maximum is 12: <strong>efficient is no investment, and forming the firm</strong>. Investment raises the profit by only 4 but costs 6.`,
H`(b) Solve backwards. Bargaining stage with surplus split equally: each gets disagreement payoff plus half the surplus (gross of the sunk cost 3). Both invested (and \(2x\le16\)): each gets \(x+\tfrac12(16-2x)=8\), net \(8-3=5\).`,
H`Only player \(i\) invested (\(x\le12\)): \(i\) gets \(x+\tfrac12(12-x)=6+\tfrac x2\), net \(3+\tfrac x2\); the other gets \(6-\tfrac x2\). Nobody invested: 6 each.`,
H`Investment stage (for \(x\le8\)):
${mx({ rows: ['I', 'N'], cols: ['I', 'N'], cells: [['5,5', '3+x/2|6-x/2'], ['6-x/2|3+x/2', '6,6']] })}
Both invest is a NE iff \(5\ge6-\tfrac x2\iff x\ge2\). (For \(x>8\) the firm is not formed after both invest; each gets \(x-3>6-\tfrac x2\), so investing stays an equilibrium.) Answer: \(x\ge2\).`,
H`(c) For \(2\le x\le9\) both invest although it is inefficient. The investment is mainly a <strong>bargaining weapon</strong>: it raises the player's disagreement payoff \(x-3\) and therefore his share of the profit. Classic hold-up has the opposite effect (the investor's return is partly taken by the partner, so too little is invested). Both are cases where private and social returns to investment diverge because of ex-post bargaining.`])}` });

  /* ---------------- Lecture 10 ---------------- */
  X({ lec: 'l10', id: 'x-tft', t: 'Repeated games: tit-for-tat', src: ['23.4.2'], body: H`
${Q(H`<p>Consider a Prisoner's Dilemma with payoffs as given below. Suppose that agent 2 chooses the following strategy, called tit-for-tat: An agent using this strategy will first cooperate (C), then subsequently replicate an opponent's action in the previous round. If the opponent was cooperative (C) in the preceding round, the agent is cooperative (C); if the opponent was not cooperative (N) in the preceding round, the agent chooses (N). The discount factor is \(\delta\), where \(0\le\delta\le1\). So, the lower the discount factor, the lower the agents value future period's payoffs.</p>
${mx({ rows: ['C', 'N'], cols: ['C', 'N'], cells: [['4,4', '0,5'], ['5,0', '1,1']] })}
<p>Suppose that the game is played an infinite number of rounds. Imagine you are player 1 and player 2 plays tit-for-tat as described above.</p>
<ol type="a"><li>What is your payoff if you choose to play tit for tat as well?</li>
<li>Imagine you as player 1 wish to deviate from your strategy to play tit for tat. Could it be beneficial? If so, when?<br>[Hint 1: Under the grim-trigger strategy, it was not impossible to return to cooperation after a non-cooperative move. This is different with tit-for-tat. Hence for you as player 1, there are three rational possibilities to deviate.]<br>[Hint 2: Because of the discounting of future payoffs, you would try to deviate early in the game, focus on round 1-3.]</li>
<li>Based on your answer in a) and b), can you define a subgame-perfect Nash equilibrium for this repeated game?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Both cooperate forever: \(4+4\delta+4\delta^2+\ldots=\dfrac{4}{1-\delta}\).`,
H`(b) Deviation 1, <strong>defect once and return</strong>: round 1 \((N,C)\): 5; round 2 player 2 punishes while you cooperate \((C,N)\): 0; round 3 on, cooperation again. Payoff \(5+0\cdot\delta+\dfrac{4\delta^2}{1-\delta}\). Better than (a) iff \(5>4+4\delta\iff\delta< \tfrac14\).`,
H`Deviation 2, <strong>defect forever</strong>: \(5+\delta+\delta^2+\ldots=5+\dfrac{\delta}{1-\delta}\). Better iff \(5(1-\delta)+\delta>4\iff\delta< \tfrac14\).`,
H`Deviation 3, <strong>alternate</strong> N, C, N, C: tit-for-tat always answers one round late, giving 5, 0, 5, 0, ...: \(\dfrac{5}{1-\delta^2}\). Better iff \(5>4(1+\delta)\iff\delta< \tfrac14\).`,
H`So deviating pays exactly when \(\delta< \tfrac14\): the future is then worth so little that the one-time gain of 1 beats the loss of 4 tomorrow. Later deviations are just discounted copies of these, which is why the hint says to look at rounds 1 to 3.`,
H`(c) For \(\delta\ge\tfrac14\) no deviation pays, so (tit-for-tat, tit-for-tat) is a <strong>Nash equilibrium</strong> with cooperation forever. Careful with subgame perfection: after a deviation tit-for-tat prescribes alternating punishments. Checking all four possible "states" (last round CC, NC, CN, NN) with the one-shot deviation principle gives the conditions \(\delta\ge\tfrac14\) (in states CC and after your own defection) and \(\delta\le\tfrac14\) (in states CN and NN, where forgiving would pay). So tit-for-tat is subgame perfect only for \(\delta=\tfrac14\) exactly.`,
H`An SPE that sustains cooperation for all \(\delta\ge\tfrac14\): <strong>grim trigger</strong> (cooperate until someone defects, then N forever). Condition \(\dfrac{4}{1-\delta}\ge5+\dfrac{\delta}{1-\delta}\iff\delta\ge\tfrac14\), and the punishment (stage NE forever) is itself an equilibrium of every subgame. In the exam, state the condition \(\delta\ge\tfrac14\) and name the strategies precisely.`])}` });

  X({ lec: 'l10', id: 'x-grim3', t: 'Grim trigger', src: ['24.5.1', '25.4.1'], body: H`
${Q(H`<p>Consider the infinitely repeated game with discount factor \(\delta<1\) of the following variant of the Prisoner's Dilemma:</p>
${mx({ rows: ['T', 'M', 'B'], cols: ['L', 'C', 'R'], cells: [['6,6', '-1,7', '-2,8'], ['7,-1', '4,4', '-1,5'], ['8,-2', '5,-1', '0,0']] })}
<ol type="a"><li>For which values of the discount factor \(\delta\) can the players support the pair of actions \((M,C)\) played in every period? (Assume that if one player deviates, (B,R) is played forever.)</li>
<li>For which values of the discount factor \(\delta\) can the players support the pair of actions \((T,L)\) played in every period?</li>
<li>Why is your answer different from that for (a)?</li></ol>
<p class="small muted">WS 2025/26 asks (a) without the sentence in brackets; the punishment (B,R) is then the natural choice, as the only stage-game equilibrium.</p>`)}
${steps('Step-by-step solution', [
H`Punishment: (B, R) is the unique stage-game NE (B is strictly dominant for player 1, R for player 2), payoff 0 each. Playing it forever is an equilibrium of every subgame, so grim trigger is subgame perfect whenever no one wants to deviate on the path.`,
H`(a) Player 1 on the path to (M, C): cooperation gives \(\dfrac{4}{1-\delta}\). Best deviation against C is B with 5, then 0 forever. Condition \(\dfrac{4}{1-\delta}\ge5\iff\delta\ge\tfrac15\). By symmetry the same for player 2 (deviation to R gives 5).`,
H`(b) (T, L): cooperation \(\dfrac{6}{1-\delta}\); best deviation against L is B with 8. Condition \(\dfrac{6}{1-\delta}\ge8\iff\delta\ge\tfrac14\).`,
H`(c) For (T, L) the deviation gain is \(8-6=2\) per 6 at stake; for (M, C) it is \(5-4=1\) per 4. Relative to what cooperation is worth (and to the punishment payoff 0), the temptation is larger for (T, L), so more patience is needed: \(\tfrac14>\tfrac15\). General form: \(\delta\ge\dfrac{d-c}{d-p}\) with deviation \(d\), cooperation \(c\), punishment \(p\): \(\tfrac{5-4}{5-0}=\tfrac15\) and \(\tfrac{8-6}{8-0}=\tfrac14\).`])}
${lab('grim3', 'the stage game')}` });

  /* ---------------- Lecture 11 ---------------- */
  X({ lec: 'l11', id: 'x-bcournot', t: 'Cournot duopoly and Bayesian Nash equilibrium', src: ['23.5.1', '24.6.1', '25.4.2'], body: H`
${Q(H`<p>Consider a Cournot duopoly operating in a market with inverse demand \(P(Q)=a-Q\), where \(Q=q_1+q_2\) is the aggregate quantity on the market.</p>
<p>Both firms have constant unit costs and no fixed costs. The unit costs of each firm can be either high, \(c_H\), or low, \(c_L\), where \(c_H>c_L\). Each firm knows its own unit costs. However, each firm only knows that the other firm has probability \(\tfrac12\) of having unit costs of \(c_H\) and probability \(\tfrac12\) of having unit costs of \(c_L\). All of this is common knowledge. The two firms simultaneously choose their quantities.</p>
<ol type="a"><li>Specify the type space \(T\), from which nature draws.</li>
<li>Specify firm 1's expected payoff for the cases where it has high costs and low costs. (Hint: You can do that separately, but it is recommended to use an indicator \(j=H,L\) so that you have to write only one profit function that covers both cases.)</li>
<li>Determine the best-response function of firm 1 for the cases where it has high costs and low costs. Do the same for firm 2. (Hint: See previous hint, determine the first order condition of the expected payoff function and exploit the fact that the two firms are symmetric.)</li>
<li>Find the Bayesian Nash-Equilibrium of this game. (Hint: Symmetry also helps when you determine the solution from the 4 best-response functions.)</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Each firm's type set is \(T_i=\{c_H,c_L\}\); nature draws from \(T=T_1\times T_2=\{(c_H,c_H),(c_H,c_L),(c_L,c_H),(c_L,c_L)\}\), each with probability \(\tfrac14\).`,
H`(b) A strategy is a quantity for each type: \(q_1^H,q_1^L\) (and \(q_2^H,q_2^L\)). Firm 1 of type \(j\in\{H,L\}\) does not know firm 2's type:
\[E\pi_1^j=\tfrac12\big(a-q_1^j-q_2^H-c_j\big)q_1^j+\tfrac12\big(a-q_1^j-q_2^L-c_j\big)q_1^j=\big(a-q_1^j-\bar q_2-c_j\big)q_1^j,\]
with \(\bar q_2=\tfrac12(q_2^H+q_2^L)\), the expected quantity of firm 2.`,
H`(c) FOC: \(a-2q_1^j-\bar q_2-c_j=0\Rightarrow q_1^j=\dfrac{a-c_j-\bar q_2}{2}\), for \(j=H,L\). Symmetrically \(q_2^j=\dfrac{a-c_j-\bar q_1}{2}\). Four best-response functions.`,
H`(d) Symmetry: \(q_1^j=q_2^j=q^j\), \(\bar q=\tfrac12(q^H+q^L)\). Average the two best responses: \(\bar q=\dfrac{a-\bar c-\bar q}{2}\) with \(\bar c=\tfrac12(c_H+c_L)\), so \(\bar q=\dfrac{a-\bar c}{3}=\dfrac{2a-c_H-c_L}{6}\).`,
H`Insert: \(q^H=\dfrac{a-c_H}{2}-\dfrac{2a-c_H-c_L}{12}=\dfrac{4a-5c_H+c_L}{12}\) and \(q^L=\dfrac{4a-5c_L+c_H}{12}\). Check: with \(c_H=c_L=c\) both equal \(\dfrac{a-c}{3}\), the standard Cournot quantity. The low-cost type produces more: \(q^L-q^H=\tfrac12(c_H-c_L)\).`])}
<p class="small">More of this type: <a href="#drills">Practice drills</a> (Bayesian Cournot).</p>` });

  /* ---------------- Lecture 12 ---------------- */
  X({ lec: 'l12', id: 'x-reserve', t: 'Reserve prices', src: ['23.5.2'], body: H`
${Q(H`<p>Consider a seller who must sell a single private value good. There are two potential buyers, each with a valuation \(\theta_i>0\). The players' values are independently drawn. The seller will offer the good using a second-price sealed-bid auction, but he can set a "reserve price" of \(r\ge0\), \(r\in\mathbb N\), that modifies the rules of the auction as follows. If both bids are below \(r\) then neither bidder obtains the good and it is destroyed. If both bids are at or above \(r\) then the regular auction rules prevail. If only one bid is at or above \(r\) then that bidder obtains the good and pays \(r\) to the seller.</p>
<ol type="a"><li>Is it still a weakly dominant strategy for each player to bid his valuation when \(r>0\)? (Hint: The proof approach is similar to that from lecture 10.)</li></ol>
<p>From now on, assume that \(\theta_i\in\{0,1,2\}\), each value occurring with an equal probability of \(\tfrac13\).</p>
<ol type="a" start="2"><li>What is the expected revenue of the seller when \(r=0\) (no reserve price)? (Hint: It may help to draw a game tree with the possible valuations of the buyers, the associated probabilities and the resulting revenues for the seller.)</li>
<li>What is the expected revenue of the seller when \(r=1\)?</li>
<li>What explains the difference between your answers to b) and c)?</li>
<li>What is the optimal reserve price \(r\) for the seller, and what can you conclude about the value of reserve prices?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Yes. Replace "the highest rival bid \(b_j^*\)" in the lecture proof by the price-relevant threshold \(\max\{b_j^*,r\}\). Bid \(b_i< \theta_i\): if \(\max\{b_j^*,r\}< b_i\) (region L), \(i\) wins with either bid and pays the same; if \(\max\{b_j^*,r\}>\theta_i\) (region H), \(i\) loses with either bid; if \(\max\{b_j^*,r\}\in[b_i,\theta_i]\) (region M), \(i\) loses with \(b_i\) but would win with \(\theta_i\) and get \(\theta_i-\max\{b_j^*,r\}\ge0\). So \(\theta_i\) is never worse and sometimes better.`,
H`Bid \(b_i>\theta_i\): regions L and H as before; in region M (\(\max\{b_j^*,r\}\in[\theta_i,b_i]\)) bidding \(b_i\) wins but pays at least \(\theta_i\): payoff \(\le0\), while bidding \(\theta_i\) gives 0. Truthful bidding remains weakly dominant.`,
H`(b) \(r=0\): with truthful bids the seller earns the second-highest value \(\min\{\theta_1,\theta_2\}\). Nine equally likely pairs: \(\Pr(\min\ge1)=(\tfrac23)^2=\tfrac49\), \(\Pr(\min=2)=\tfrac19\). \(E[R]=1\cdot\tfrac39+2\cdot\tfrac19=\tfrac59\approx0.56\).`,
H`(c) \(r=1\): (0,0): no sale, 0 (prob. \(\tfrac19\)). Exactly one value is 0 and the other 1 or 2: the other pays \(r=1\) (4 pairs, prob. \(\tfrac49\)). Both values \(\ge1\): usual rules, price \(\min\{\theta_1,\theta_2\}\): (1,1), (1,2), (2,1) give 1, (2,2) gives 2 (sum \(\tfrac59\)). \(E[R]=\tfrac49+\tfrac59=1\).`,
H`(d) The reserve price acts like an extra bidder: when only one buyer values the good, the seller now gets \(r=1\) instead of the second bid 0. It costs nothing here, because the only lost sales are to buyers with value 0.`,
H`(e) \(r=2\): no sale if both values are below 2 (prob. \(\tfrac49\)); otherwise the price is 2 (prob. \(\tfrac59\)): \(E[R]=\tfrac{10}9\approx1.11\). \(r\ge3\): no sale, 0. Optimal: \(r=2\). Conclusion: a reserve price above the seller's own value (0) raises expected revenue, at the cost of sometimes not selling although a buyer values the good (inefficiency, e.g. at values (1,1)).`])}` });

  X({ lec: 'l12', id: 'x-fpan', t: 'First-price sealed bid auction with n players', src: ['24.6.2', '25.5.1'], body: H`
${Q(H`<p>Suppose you want to buy a house that is sold by way of a first-price sealed bid auction. In contrast to the model in the lecture, there are more than 2 players. Players simultaneously and independently submit bids \(b_i\), \(i=1,\ldots,n\). The house is awarded to the highest bidder who must pay his bid, denoted \(x\). Your conjecture is that each player bids a fraction \(a\) of her valuation, i.e. \(b_i=av_i\), where \(v_i\) is a player's valuation. Moreover, suppose that you have the following information: You know the number of persons \(n\) that bid for the house. You believe the other bidders' values are independently and uniformly distributed over the interval [0, 1], where 1 stands for €1.000.000.</p>
<ol type="a"><li>What is the probability that your bid \(x\) exceeds the bid of player 2?</li>
<li>What is the probability that your bid \(x\) exceeds the bids of player 2 and 3?</li>
<li>Now, what is the probability that your bid exceeds that of all other bidders?</li>
<li>What bid should you choose?</li>
<li>Explain intuitively how your bid changes with the number of bidders \(n\).</li>
<li>Now suppose that your own valuation for the house is €800.000 and that there are 5 other bidders. How much should you bid?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) \(\Pr(av_2< x)=\Pr(v_2< x/a)=\dfrac{x}{a}\) (for \(x\le a\)).`,
H`(b) Independence: \(\Pr(av_2< x,\ av_3< x)=\left(\dfrac xa\right)^2\).`,
H`(c) \(n-1\) rivals: \(\left(\dfrac xa\right)^{n-1}\).`,
H`(d) Expected payoff \((v-x)\left(\dfrac xa\right)^{n-1}\). FOC: \(-\left(\dfrac xa\right)^{n-1}+(v-x)\dfrac{(n-1)x^{n-2}}{a^{n-1}}=0\Rightarrow -x+(n-1)(v-x)=0\Rightarrow x^*=\dfrac{n-1}{n}v\). This is linear in \(v\), consistent with the conjecture when \(a=\tfrac{n-1}{n}\).`,
H`(e) More bidders mean more competition: shading the bid now risks losing to someone more often, so the optimal shading \(v/n\) shrinks and bids approach the true value. \(n=2\) gives the lecture result \(v/2\).`,
H`(f) \(n=6\): \(x^*=\tfrac56\cdot800{,}000\approx\)€666,667.`])}` });

  /* ---------------- Lecture 13 ---------------- */
  X({ lec: 'l13', id: 'x-pbe6', t: 'Perfect Bayesian equilibrium', src: ['23.6.1'], body: H`
${Q(H`<p>Consider the following game. Player 1 chooses L, M or R; L ends the game. Player 2 does not observe whether M or R was chosen; \(p\) is the probability he assigns to M.</p>
${tree('exPBE6')}
<ol type="a"><li>Represent the game in normal form.</li>
<li>Find all pure strategy Nash and subgame perfect equilibria.</li></ol>
<p>We now turn to perfect Bayesian equilibria.</p>
<ol type="a" start="3"><li>Can there be any beliefs so that playing \(c\) is sequentially rational for player 2?</li>
<li>Given your answer under (c), what strategy should player 1 choose?</li>
<li>You should now be able to specify the weak perfect Bayesian equilibrium.</li>
<li>Find the strong perfect Bayesian equilibrium.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) ${mx({ rows: ['L', 'M', 'R'], cols: ['a', 'b', 'c'], cells: [['2,2', '2,2', '2,2'], ['3,8', '2,4', '5,5'], ['4,1', '4,2', '5,0']], br: true })}`,
H`(b) Best responses. Player 2: against M choose a (8); against R choose b (2); against L anything. Player 1: against a or b choose R (4); against c, M or R (5). The only cell with mutual best responses is <strong>(R, b)</strong>, payoffs (4,2). The game has no proper subgame (player 2's information set has two nodes), so SPE = NE = (R, b).`,
H`(c) With belief \(p\): \(u_2(a)=8p+1(1-p)=1+7p\), \(u_2(b)=4p+2(1-p)=2+2p\), \(u_2(c)=5p\). c is at least as good as a iff \(5p\ge1+7p\iff p\le-\tfrac12\): impossible. In fact a beats c at both nodes (8 > 5, 1 > 0): c is strictly dominated. No belief makes c sequentially rational.`,
H`(d) Player 2 plays only a or b. Then M gives player 1 at most 3, R gives 4 for sure, L gives 2. Player 1 chooses R.`,
H`(e) Weak PBE: R is played, so the information set is on the path and Bayes' rule gives \(p=0\). Then b (2) beats a (1) and c (0). Weak PBE: \((R,\ b,\ p=0)\).`,
H`(f) Strong PBE (requirement 4 off the path, or requirement 5): the information set is reached, so there are no off-path beliefs to restrict. The same profile \((R,\ b,\ p=0)\) is the PBE, and it is unique.`])}
${lab('pbe6', 'the normal form')}` });

  /* ---------------- Lecture 14 ---------------- */
  X({ lec: 'l14', id: 'x-car', t: 'Signalling: car warranty', src: ['23.6.2'], body: H`
${Q(H`<p>You're thinking about buying a car so that you can drive to your fiancée's birthday in Denmark in comfort and easily transport all those presents for her in the back of the car. But the car has to work properly, otherwise you'll be stuck in the middle of nowhere.</p>
<p>Consider a fellow student selling his/her car that may be either high quality (probability 0.3) or low quality (probability 0.7). The fellow student knows the car's type, but you do not. You get a payoff of 200 from buying a high-quality car but 0 from buying a low-quality car, and you have a payoff of 100 if you do not spend any money on a car. Furthermore, the fellow student earns a profit of 200 from selling a high-quality car, 60 from selling a low-quality car, and 0 from not making a sale. Prior to you buying a car, the fellow student can take a costly action: he/she offers a warranty, by guaranteeing to pay any repair costs during the year following the purchase. The repair costs are 160, and the probabilities that the car has to be repaired is 100% for the low-quality car and 50% for the high-quality car.</p>
<ol type="a"><li>Write the game in extensive form, similarly as we have done it in the job market signaling model in the lecture.</li>
<li>Find any pooling perfect Bayesian equilibria.</li>
<li>Is there a separating perfect Bayesian equilibrium in which a warranty is offered for the high-quality car and none for the low-quality car?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Nature draws the quality; the seller (S) chooses warranty W or no warranty N; the buyer (B) sees only the signal and buys or not (payoffs: seller, buyer). The warranty costs the seller only if the car is sold: expected repair cost \(0.5\cdot160=80\) (high) and \(160\) (low). So a sale with warranty gives \(200-80=120\) (high) and \(60-160=-100\) (low). The buyer's payoffs do not depend on the warranty (repairs are paid by the seller). \(q\): buyer's belief "high" after W; \(r\): after N.
${tree('exCar')}`,
H`Buyer's rule: buy iff \(200\cdot\text{belief}\ge100\iff\text{belief}\ge\tfrac12\). With the prior, \(0.3\cdot200=60<100\): no purchase.`,
H`(b) <strong>Pooling on N</strong>: on the path \(r=0.3\), so the buyer does not buy; both types get 0. Off the path, if the buyer bought after W, the high type would deviate (120 > 0). So we need \(q< \tfrac12\) and no purchase after W; then deviating gives 0, no gain. PBE: both types N; buyer does not buy after N or W; \(r=0.3\), \(q< \tfrac12\).`,
H`<strong>Pooling on W</strong>: on the path \(q=0.3\), no purchase, both types get 0 (no sale, so no warranty cost). Off the path the buyer must not buy after N (otherwise both types would deviate): \(r< \tfrac12\). Also a PBE. Both pooling equilibria have no trade.`,
H`(c) <strong>Separating</strong> (high W, low N): Bayes gives \(q=1\), \(r=0\). The buyer buys after W (200 > 100) and not after N (0 < 100).`,
H`Check the seller types. High: W gives 120, N gives 0: stays. Low: N gives 0; mimicking with W leads to a sale but \(60-160=-100<0\): stays. So the separating PBE exists. The warranty is a credible signal because it is much more expensive for the low type (single crossing). Payoffs: high 120, low 0, buyer \(0.3\cdot200+0.7\cdot100=130\).`])}` });

  X({ lec: 'l14', id: 'x-superbowl', t: 'Signalling: Super Bowl ad', src: ['25.5.2'], body: H`
${Q(H`<p>Consider a firm offering a product (let's say an advent calendar) that may be either high quality or low quality (probability 0.3 vs. 0.7). Only the firm knows its own type, but it is common knowledge that 30% of the products are of high quality and 70% are of low quality. The consumer earns a payoff (benefits minus costs) of 100 from purchasing the high-quality product but 0 from purchasing a low-quality product, and she earns 50 if she buys something else with known quality. Furthermore, the firm earns a profit of 100 from selling a high-quality product (since it will have gained a loyal customer), 30 from selling a low-quality product (since it will be a onetime sale and the customer avoids purchasing from the firm ever again), and 0 from not making a sale. Prior to the customer making the purchase, the firm can take a costly action: it can pay 80 for a 30-second Super Bowl ad. Assume that advertising does not increase product awareness, and a priori customers do not consider advertising to be particularly credible. Hence the only purpose of the Super Bowl ad is to serve as a signal.</p>
<ol type="a"><li>Write the game in extensive form, similarly as we have done it in the job market signaling model in the lecture.</li>
<li>Find any pooling perfect Bayesian equilibria.</li>
<li>Is there a separating perfect Bayesian equilibrium in which the high-quality firm advertises and the low-quality firm does not?</li>
<li>What exactly does the Super Bowl ad signal, and why does the signal work?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Nature draws the quality; the firm (F) chooses ad or no ad; the consumer (C) sees only the signal and buys or not (payoffs: firm, consumer). The ad cost 80 is paid whether or not the consumer buys: high type \(100-80=20\) or \(-80\); low type \(30-80=-50\) or \(-80\).
${tree('exAd')}`,
H`Consumer's rule: buy iff \(100\cdot\text{belief}\ge50\iff\text{belief}\ge\tfrac12\). With the prior: \(30<50\), do not buy.`,
H`(b) <strong>Pooling on no ad</strong>: belief 0.3, no purchase, both types get 0. If the consumer bought after an ad, the high type would deviate (20 > 0), so the off-path belief must be \(q< \tfrac12\) with no purchase after an ad; deviating then gives \(-80\). PBE: nobody advertises, the consumer never buys, \(r=0.3\), \(q< \tfrac12\).`,
H`<strong>Pooling on ad</strong>: belief 0.3, no purchase, both types get \(-80\). Not advertising guarantees at least 0, so both types deviate: <strong>no</strong> pooling PBE with advertising.`,
H`(c) <strong>Separating</strong> (high advertises, low does not): \(q=1\), \(r=0\); the consumer buys after the ad and not without it. High: \(20>0\), stays. Low: \(0\) vs. mimicking \(30-80=-50\): stays. The separating PBE exists.`,
H`(d) The ad says nothing about the product itself; it is "money burning". It works because only the high type can recover the cost: a sale is worth 100 (repeat purchases) to the high type but only 30 to the low type, and \(30<80<100\). Spending 80 is therefore credible evidence of high quality, exactly like education in the job-market model.`])}` });

  /* ---------------- Lecture 15 ---------------- */
  X({ lec: 'l15', id: 'x-lawex', t: 'Principal agent: Cleanex and Lawex', src: ['25.6.1'], body: H`
${Q(H`<p>The laundry "Cleanex" is located at a river downstream to the sewage plant "Dirtex". Last week, part of the clothes were spoiled during the laundry process so that the customers had to be compensated, leading to additional costs \(d\). Cleanex is convinced that a defect in the sewage plant Dirtex is responsible for the problem. Therefore, Cleanex authorizes the law firm "Lawex" to sue Dirtex for damages.</p>
<p>We make the following assumptions: The effort cost of the law firm are a convex function \(c(e)=e^2\) and efforts \(e\in[0;\,0.5d]\). Cleanex pays Lawex conditional on the indemnification \(x\) that the court grants to Cleanex, where \(x\) is uniformly distributed in the interval \([0,2e]\). In particular, payments are \(w(x)=a+bx\), \(b\in[0,1]\). Furthermore, \(w(x)\ge0\), i.e. the law firm cannot be held liable for a bad job. Both Cleanex and Lawex are risk-neutral. Finally, if Lawex does not accept the contract offered by Cleanex, it gets a reservation income of 0.</p>
<ol type="a"><li>Set up the Principal-Agent problem.</li>
<li>Why does the liability constraint \(w(x)\ge0\) imply that \(a\ge0\)?</li>
<li>Solve the Principal-Agent problem for the optimal contract elements \((a,b,e)\).</li>
<li>Calculate the rent which Lawex receives due to the liability constraint.</li>
<li>Compare the size of this rent with the effort cost.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) \(E[x]=e\). Principal: \(\max_{a,b,e}\ E[x-w]=e-a-be\) subject to (IC) \(e\in\arg\max_{e'}\ a+be'-e'^2\), (PC) \(a+be-e^2\ge0\), (LL) \(a+bx\ge0\) for all \(x\in[0,2e]\).`,
H`(b) The award can be (arbitrarily close to) 0, and then \(w=a\). So \(w(x)\ge0\) for all \(x\) requires \(a\ge0\) (with \(b\ge0\), \(a\ge0\) is also sufficient).`,
H`(c) IC: FOC \(b-2e=0\Rightarrow e=\tfrac b2\). Then the agent's payoff is \(a+\tfrac{b^2}{2}-\tfrac{b^2}{4}=a+\tfrac{b^2}{4}\ge0\) for any \(a\ge0\): the PC is slack and the principal sets \(a=0\) (LL binds).`,
H`Principal: \(\max_b\ \tfrac b2-b\cdot\tfrac b2=\tfrac b2-\tfrac{b^2}{2}\). FOC \(\tfrac12-b=0\Rightarrow b^*=\tfrac12\), \(e^*=\tfrac14\), \(a^*=0\). (Needs \(e^*\le0.5d\), i.e. \(d\ge\tfrac12\).) Principal's expected profit \(\tfrac14-\tfrac18=\tfrac18\).`,
H`(d) Lawex's expected payoff: \(be-e^2=\tfrac18-\tfrac1{16}=\tfrac1{16}>0\). Since its outside option is 0, this whole amount is a <strong>limited-liability rent</strong>.`,
H`(e) The rent \(\tfrac1{16}\) equals the effort cost \(e^2=\tfrac1{16}\): the expected wage \(\tfrac18\) is twice the effort cost. Without the liability limit the principal would "sell the case" (\(b=1\), negative \(a\)) and get first-best effort \(e=\tfrac12\) with no rent. Because a fee cannot be negative, the principal trades off effort against rent and chooses weaker incentives.`])}` });

  /* ---------------- Lecture 16 ---------------- */
  X({ lec: 'l16', id: 'x-riskinc', t: 'Risk and incentives in contracting', src: ['25.6.2'], body: H`
${Q(H`<p>Consider a principal-agent relationship where a risk-neutral principal hires an agent whose effort is not observable.</p>
<p>We make the following assumptions: The agent's effort level is \(e\ge0\) and effort costs are given by \(c(e)=0.5\cdot e^2\). Output is \(Q=10\cdot e+u\) where \(u\) is a random variable with \(E[u]=0\). Only output \(Q\) is observable. The principal offers a linear incentive contract \(p=s+r\cdot Q\) where \(s\) is a fixed payment and \(r\) measures the strength of incentives. The agent is risk-averse. His expected utility (certainty-equivalent form) is \(EU=E[p]-0.5\cdot e^2-Kr^2\), where \(K>0\) measures the agent's degree of risk aversion. If the agent does not accept the contract, he obtains a reservation utility \(u_0\). The principal maximizes expected profits.</p>
<ol type="a"><li>Set up the Principal-Agent problem.</li>
<li>Solve the agent's incentive constraint. Derive the agent's optimal effort choice \(e(r)\).</li>
<li>Show that the participation constraint binds in the optimal contract and derive the fixed payment \(s(r)\).</li>
<li>Determine the optimal incentive parameter \(r^*\) chosen by the principal and the induced effort level \(e^*\).</li>
<li>Calculate and discuss how the strength of incentives, \(r\), depends on the agent's degree of risk aversion.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) \(\max_{s,r,e}\ E[Q-p]=10e-s-10re\) subject to (IC) \(e\in\arg\max_{e'}\ s+10re'-0.5e'^2-Kr^2\) and (PC) \(s+10re-0.5e^2-Kr^2\ge u_0\).`,
H`(b) IC: FOC \(10r-e=0\Rightarrow e(r)=10r\).`,
H`(c) The principal's profit falls in \(s\), and \(s\) does not affect effort. If the PC were slack, lowering \(s\) would raise profit, so it binds: \(s(r)=u_0+0.5e^2+Kr^2-10re=u_0+50r^2+Kr^2-100r^2=u_0+(K-50)r^2\).`,
H`(d) Insert: profit \(=10e-0.5e^2-Kr^2-u_0=100r-(50+K)r^2-u_0\). FOC: \(100-2(50+K)r=0\Rightarrow r^*=\dfrac{50}{50+K}\), \(e^*=10r^*=\dfrac{500}{50+K}\). Profit \(\dfrac{2500}{50+K}-u_0\).`,
H`(e) \(\dfrac{dr^*}{dK}=-\dfrac{50}{(50+K)^2}< 0\): the more risk averse the agent, the weaker the incentives and the lower the effort. \(K\to0\): \(r^*\to1\) and \(e^*\to10\), the first best (risk-neutral agent, "sell the firm"). \(K\to\infty\): \(r^*\to0\), a fixed wage. The trade-off between insurance and incentives: every unit of incentive \(r\) costs a risk premium \(Kr^2\) that the principal must pay through \(s\).`])}` });

  /* ---------------- Extra practice for Lectures 1-7 ---------------- */
  tree('exL6', nd(1, [['A', nd(2, [['a', tm(2, 2)], ['b', nd(1, [['x', tm(3, 1)], ['y', tm(0, 3)]])]])], ['B', nd(2, [['c', tm(1, 4)], ['d', tm(4, 0)]])]]));
  tree('exCap', nd(1, [
    ['Small', nd(1, [['H', nd(2, [['H', tm(3, 3)], ['L', tm(6, 2)]], { info: 's' })], ['L', nd(2, [['H', tm(2, 6)], ['L', tm(5, 5)]], { info: 's' })]])],
    ['Large', nd(1, [['H', nd(2, [['H', tm(4, 1)], ['L', tm(6, 0)]], { info: 'g' })], ['L', nd(2, [['H', tm(2, 3)], ['L', tm(4, 2)]], { info: 'g' })]])]]));

  X({ lec: 'l1', id: 'p1-1', t: 'Rational preferences and the money pump', extra: true, body: H`
${Q(H`<p>A student has to choose one of three seminars A, B and C. Asked about pairs, she says: she prefers A to B, B to C, and C to A.</p>
<ol type="a"><li>Which property of a rational preference relation is violated?</li>
<li>Show how somebody could exploit these preferences (a "money pump").</li>
<li>Can her choice from the set {A, B, C} be described as maximising a payoff function?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) A rational preference relation is complete and <strong>transitive</strong>. Transitivity requires: A \(\succ\) B and B \(\succ\) C imply A \(\succ\) C. She states C \(\succ\) A instead: transitivity is violated (completeness holds, she ranks every pair).`,
H`(b) Give her C. Because she prefers B to C, she pays a small amount (say €1) to swap C for B. Because she prefers A to B, she pays €1 to swap B for A. Because she prefers C to A, she pays €1 to swap A for C. She is back where she started and €3 poorer, and the cycle can be repeated: a money pump.`,
H`(c) No. A payoff function \(u\) would need \(u(A)>u(B)>u(C)>u(A)\), which is impossible. Rational choice in the sense of the course (Lecture 1) requires complete and transitive preferences; only then can choices be represented by maximising a payoff function.`])}` });

  X({ lec: 'l2', id: 'p2-1', t: 'Iterated elimination in three rounds', extra: true, body: H`
${Q(H`<p>Apply iterated elimination of strictly dominated strategies to the game below. State for each round which strategy is eliminated and why. Is the result a Nash equilibrium?</p>
${mx({ rows: ['T', 'M', 'B'], cols: ['L', 'C', 'R'], cells: [['4,3', '5,1', '6,2'], ['2,1', '8,4', '3,6'], ['3,0', '9,6', '2,8']] })}`)}
${steps('Step-by-step solution', [
H`Round 1. Player 1: no row is strictly dominated (T is best against L, B against C, T against R). Player 2: C gives (1, 4, 6), R gives (2, 6, 8): R is strictly better in every row. <strong>Delete C.</strong>`,
H`Round 2. Without C, player 1 compares rows against L and R: T gives (4, 6), M gives (2, 3), B gives (3, 2). T strictly dominates M and B. <strong>Delete M and B.</strong>`,
H`Round 3. Only row T is left. Player 2: L gives 3, R gives 2. <strong>Delete R.</strong>`,
H`Unique outcome (T, L) with payoffs (4, 3). Every profile that survives IESDS uniquely is a Nash equilibrium: check that T is a best response to L (4 > 3 > 2) and L to T (3 > 2 > 1). Note the order of reasoning: player 1 eliminates M and B only because he knows that player 2 will not play C (common knowledge of rationality).`])}
${lab('iesds3', 'this game')}` });

  X({ lec: 'l3', id: 'p3-1', t: 'Cournot with three firms', extra: true, body: H`
${Q(H`<p>Three identical firms produce a homogeneous good with constant marginal cost \(c=10\) and no fixed costs. Inverse demand is \(p=100-Q\), where \(Q=q_1+q_2+q_3\). Firms choose quantities simultaneously.</p>
<ol type="a"><li>Derive firm 1's best-response function.</li>
<li>Find the symmetric Nash equilibrium: quantities, price and profits.</li>
<li>Compare with the duopoly (two firms) and with the monopoly. What happens to the price as the number of firms grows?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) \(\pi_1=(100-q_1-q_2-q_3)q_1-10q_1\). FOC: \(90-2q_1-q_2-q_3=0\Rightarrow BR_1(q_2,q_3)=\dfrac{90-q_2-q_3}{2}\).`,
H`(b) Symmetry \(q_1=q_2=q_3=q\): \(q=\dfrac{90-2q}{2}\Rightarrow4q=90\Rightarrow q=22.5\). \(Q=67.5\), \(p=32.5\), profit \((32.5-10)\cdot22.5=506.25\) per firm.`,
H`(c) Duopoly: \(q=\dfrac{90}{3}=30\), \(Q=60\), \(p=40\), profit 900 each. Monopoly: \(Q=45\), \(p=55\), profit 2025. General: with \(n\) firms \(q=\dfrac{a-c}{n+1}\), \(p=c+\dfrac{a-c}{n+1}\to c\) as \(n\to\infty\): the Cournot price falls towards marginal cost (the competitive outcome) as the number of firms grows.`])}` });

  X({ lec: 'l4', id: 'p4-1', t: 'Tax audits', extra: true, body: H`
${Q(H`<p>A taxpayer can report honestly (H) or cheat (C); simultaneously the tax office can audit (A) or not (N). Payoffs (taxpayer, tax office):</p>
${mx({ p1: 'Taxpayer', p2: 'Tax office', rows: ['C', 'H'], cols: ['A', 'N'], cells: [['-20,15', '10,-10'], ['0,-5', '0,0']] })}
<ol type="a"><li>Show that there is no pure-strategy Nash equilibrium.</li>
<li>Find the mixed-strategy Nash equilibrium.</li>
<li>The government raises the fine, so that a cheater who is audited gets \(-40\) instead of \(-20\). How do the equilibrium probabilities change? Interpret.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) (C,A): the taxpayer prefers H (0 > \(-20\)). (C,N): the office prefers A (15 > \(-10\)). (H,N): the taxpayer prefers C (10 > 0). (H,A): the office prefers N (0 > \(-5\)). Best responses cycle: no pure NE.`,
H`(b) Let \(q\) = Pr(cheat) and \(p\) = Pr(audit). Office indifferent: \(u(A)=15q-5(1-q)=20q-5\), \(u(N)=-10q\). Equal iff \(30q=5\iff q=\tfrac16\).`,
H`Taxpayer indifferent: \(u(C)=-20p+10(1-p)=10-30p\), \(u(H)=0\). Equal iff \(p=\tfrac13\). Mixed NE: cheat with \(\tfrac16\), audit with \(\tfrac13\).`,
H`(c) New fine: \(u(C)=-40p+10(1-p)=10-50p=0\iff p=\tfrac15\). The office's indifference condition does not involve the fine, so cheating stays at \(q=\tfrac16\). A higher fine lowers the <strong>audit</strong> rate, not the cheating rate: in a mixed equilibrium each player's probability is pinned down by the other player's payoffs.`])}
${lab('audit', 'this game')}` });

  X({ lec: 'l5', id: 'p5-1', t: 'Stag hunt: Pareto vs. risk dominance', extra: true, body: H`
${Q(H`<p>Two hunters choose Stag (S) or Hare (H):</p>
${mx({ rows: ['S', 'H'], cols: ['S', 'H'], cells: [['10,10', '0,7'], ['7,0', '6,6']] })}
<ol type="a"><li>Find all Nash equilibria (pure and mixed).</li>
<li>Which equilibrium is Pareto dominant, which is risk dominant?</li>
<li>Are both pure equilibria trembling-hand perfect? Which one would you predict, and why?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Pure: (S,S) with (10,10) and (H,H) with (6,6): each is a best response to itself (10 > 7, 6 > 0). Mixed: let the other play S with \(p\). S gives \(10p\), H gives \(7p+6(1-p)=6+p\). Indifferent iff \(9p=6\iff p=\tfrac23\). Mixed NE: both play S with \(\tfrac23\).`,
H`(b) Pareto: (S,S) gives both 10 > 6, so it Pareto-dominates (H,H). Risk: compare the losses from a unilateral deviation of the partner. At (S,S) a player loses \(10-7=3\) by deviating; at (H,H) \(6-0=6\). The product of deviation losses is larger at (H,H) (\(6\cdot6>3\cdot3\)), so (H,H) is <strong>risk dominant</strong>. Equivalently, S is a best response only if the partner plays S with probability at least \(\tfrac23>\tfrac12\).`,
H`(c) Both are strict Nash equilibria (each strategy is the unique best response), so both are trembling-hand perfect: small mistakes by the partner do not change the best response. Trembling-hand perfection does not select here. Prediction: with good communication or trust, (S,S); with strategic uncertainty (anonymous partners), experiments typically show play drifting to the risk-dominant (H,H).`])}
${lab('stag2', 'this game')}` });

  X({ lec: 'l5', id: 'p5-2', t: 'An equilibrium in weakly dominated strategies', extra: true, body: H`
${Q(H`<p>Consider the game</p>
${mx({ rows: ['U', 'D'], cols: ['L', 'R'], cells: [['1,1', '0,0'], ['0,0', '0,0']] })}
<ol type="a"><li>Find all pure-strategy Nash equilibria.</li>
<li>Which of them is trembling-hand perfect? Explain with a small probability of mistakes.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) (U,L): 1 > 0 for both, a NE. (D,R): against R, player 1 gets 0 with U or D, so D is a best response; against D, player 2 gets 0 with L or R, so R is a best response. Also a NE. (U,R) and (D,L) are not.`,
H`(b) Let player 2 tremble to L with small probability \(\varepsilon>0\). Then U gives \(\varepsilon\cdot1>0\) = D: player 1's only best response is U. Similarly player 2's only best response to a trembling player 1 is L. So (D,R) is not trembling-hand perfect: D and R are weakly dominated.`,
H`(U,L) is trembling-hand perfect: against small trembles, U and L remain strictly best. Lesson (Lecture 5): in two-player games, trembling-hand perfection removes exactly the equilibria in weakly dominated strategies.`])}` });

  X({ lec: 'l6', id: 'p6-1', t: 'Strategies and backward induction in a three-stage game', extra: true, body: H`
${Q(H`<p>Player 1 chooses A or B. After A, player 2 chooses a, which ends the game with (2,2), or b, after which player 1 chooses x (payoffs (3,1)) or y (payoffs (0,3)). After B, player 2 chooses c (payoffs (1,4)) or d (payoffs (4,0)). Every player observes all previous moves.</p>
<ol type="a"><li>Draw the game tree. How many information sets does each player have?</li>
<li>How many pure strategies does each player have? List them.</li>
<li>Solve the game by backward induction. State the equilibrium strategies and the equilibrium path.</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Tree below (click "Solve next node" to follow part c). Perfect information: every information set is a single node. Player 1 has 2 information sets (the root and the node after (A, b)); player 2 has 2 (after A and after B).
${tree('exL6', null, { solve: 1 })}`,
H`(b) Player 1: (action at the root, action after (A,b)): Ax, Ay, Bx, By: 4 strategies (also Bx and By count, although x/y is never reached after B). Player 2: (action after A, action after B): ac, ad, bc, bd: 4 strategies.`,
H`(c) Last node, player 1 after (A,b): x gives 3 > 0: x. Player 2 after A: a gives 2, b leads to x and gives 1: a. Player 2 after B: c gives 4 > 0: c.`,
H`Root: A leads to (2,2), B leads to (1,4); player 1 picks A. Backward-induction equilibrium: player 1 (A, x), player 2 (a, c). Equilibrium path: A, a, with payoffs (2,2). The off-path choices x and c are part of the strategies.`])}` });

  X({ lec: 'l7', id: 'p7-1', t: 'Capacity choice before a simultaneous game', extra: true, body: H`
${Q(H`<p>Firm 1 first chooses a Small or a Large capacity, which firm 2 observes. Then both firms choose a High (H) or Low (L) output simultaneously. Payoffs (firm 1, firm 2):</p>
<div class="wgrid"><div><p class="small">After Small</p>${mx({ rows: ['H', 'L'], cols: ['H', 'L'], cells: [['3,3', '6,2'], ['2,6', '5,5']] })}</div><div><p class="small">After Large</p>${mx({ rows: ['H', 'L'], cols: ['H', 'L'], cells: [['4,1', '6,0'], ['2,3', '4,2']] })}</div></div>
<ol type="a"><li>Draw the game tree. How many proper subgames are there?</li>
<li>Find the Nash equilibrium of each subgame.</li>
<li>Find the subgame-perfect equilibrium. Why does firm 1 choose the large capacity?</li></ol>`)}
${steps('Step-by-step solution', [
H`(a) Firm 1 chooses Small or Large; in each simultaneous stage firm 2's two nodes form one information set. Two proper subgames (after Small and after Large).
${tree('exCap')}`,
H`(b) After Small: H strictly dominates L for both (3 > 2 and 6 > 5): NE (H,H) with (3,3), a Prisoner's Dilemma. After Large: firm 1's H strictly dominates L (4 > 2, 6 > 4); firm 2's best response to H is H (1 > 0): NE (H,H) with (4,1).`,
H`(c) Replace each subgame by its equilibrium payoff: Small gives firm 1 3, Large gives 4. Firm 1 chooses Large. SPE: firm 1 (Large; H after Small; H after Large), firm 2 (H after Small; H after Large). Outcome (4,1).`,
H`Interpretation: the large capacity changes the payoffs of the later game in firm 1's favour (it makes high output more profitable for firm 1 and less attractive for firm 2), a commitment that firm 2 can see. This is the logic of strategic investment and entry deterrence.`])}` });

  /* ---------------- Extra practice problems (Tadelis and course-style) ---------------- */
  X({ lec: 'l8', id: 'p8-1', t: 'Asymmetric patience, three periods', extra: true, tag: 'Tadelis 11.5', body: H`
${Q(H`<p>Two players bargain over a pie of size 1 for at most three periods. In period 1 player 1 proposes a division \((x_1,x_2)\) with \(x_1+x_2=1\), which player 2 accepts or rejects. After a rejection, player 2 makes a proposal in period 2, which player 1 accepts or rejects. After a second rejection, player 1 makes a final proposal in period 3; if it is rejected, both get 0. Player \(i\) discounts payoffs received one period later by the factor \(\delta_i\in(0,1)\). A player accepts when indifferent.</p>
<ol type="a"><li>Find the subgame-perfect equilibrium outcome.</li>
<li>Show that with equal discount factors \(\delta_1=\delta_2=\delta\), player 1 receives more than player 2.</li>
<li>Under which condition on \(\delta_1\) and \(\delta_2\) does player 2 receive more than player 1? Interpret.</li></ol>`)}
${steps('Step-by-step solution', [H`Backward induction, start in <strong>period 3</strong>: player 1 proposes and player 2 accepts anything (rejecting gives 0), so player 1 takes the whole pie. Value in period-1 terms: \((\delta_1^2,\ 0)\).`,
H`<strong>Period 2</strong>: player 2 must offer player 1 at least what player 1 gets by waiting, \(\delta_1\cdot1=\delta_1\) (worth \(\delta_1^2\) from today's view). Player 2 offers exactly \(\delta_1\) and keeps \(1-\delta_1\).`,
H`<strong>Period 1</strong>: player 1 must offer player 2 his discounted continuation value \(\delta_2(1-\delta_1)\). (a) SPE outcome: immediate agreement with \(x_2=\delta_2(1-\delta_1)\), \(x_1=1-\delta_2+\delta_1\delta_2\).`,
H`(b) With \(\delta_1=\delta_2=\delta\): \(x_1-x_2=1-2\delta(1-\delta)=1-2\delta+2\delta^2=(1-\delta)^2+\delta^2>0\). Player 1 always gets more: he moves first and last.`,
H`(c) Player 2 gets more iff \(x_2>x_1\iff2\delta_2(1-\delta_1)>1\). This needs \(\delta_2>\tfrac12\) and a sufficiently impatient player 1 (e.g. \(\delta_2=0.9\), \(\delta_1< \tfrac49\)). Interpretation: only much greater patience can outweigh the first- and last-mover advantage of player 1.`])}` });
  X({ lec: 'l8', id: 'p8-3', t: 'Hold-up with numbers', extra: true, tag: 'Tadelis 11.2', body: H`
${Q(H`<p>Player 2 first decides how much to invest: a low investment costs him 1 and makes a pie of size 6; a high investment costs him 3 and makes a pie of size 12. Player 1 observes the pie and then makes a take-it-or-leave-it offer \(x\) to player 2 (player 1 keeps the rest). If player 2 accepts, the offer is implemented; if he rejects, both get nothing from the pie. Player 2 accepts when indifferent.</p>
<ol type="a"><li>Find the subgame-perfect equilibrium. Is its outcome Pareto optimal?</li>
<li>Find a Nash equilibrium whose outcome is better for both players than the SPE outcome. Why is it not subgame perfect?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Ultimatum stage: player 2 accepts every offer \(x\ge0\) (the investment cost is sunk), so player 1 offers \(x=0\) after both investments.`,
H`Investment stage: player 2 anticipates receiving 0, so low gives \(-1\) and high gives \(-3\). He invests low. SPE: player 2 invests low and accepts every offer; player 1 offers 0 after either pie. Payoffs \((6,-1)\).`,
H`Not Pareto optimal: high investment creates net surplus \(12-3=9\) instead of \(6-1=5\). Example: high investment with \(x=4\) gives \((8,1)\), better for both than \((6,-1)\).`,
H`(b) Nash equilibrium: player 2 invests high and after high rejects every offer below 4 (after low he accepts everything); player 1 offers 4 after high and 0 after low. Player 1 gets \(12-4=8>0\) (a rejection gives 0); player 2 gets \(4-3=1>-1\). Payoffs \((8,1)\).`,
H`It is not subgame perfect: once the investment is sunk, rejecting an offer of, say, 3 gives player 2 nothing instead of 3. The threat is not credible. This is the hold-up problem: the investor cannot protect his return, so he underinvests.`])}` });
  X({ lec: 'l8', id: 'p8-4', t: 'A fair-minded proposer', extra: true, body: H`
${Q(H`<p>In an ultimatum game over €100, proposer A offers a split \((x,100-x)\), where \(x\) is what A keeps. The responder B is selfish and accepts every offer. A has Fehr-Schmidt preferences \(u_A=x_A-\alpha_A\max\{x_B-x_A,0\}-\beta_A\max\{x_A-x_B,0\}\) with \(\alpha_A=0\) and \(0< \beta_A<1\).</p>
<ol type="a"><li>Write down A's utility for offers with \(x\ge50\).</li>
<li>Which share \(x\) does A keep? Distinguish the cases \(\beta_A< \tfrac12\) and \(\beta_A>\tfrac12\).</li>
<li>What does this imply for the interpretation of equal splits observed in ultimatum experiments?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) For \(x\ge50\), A is ahead, so only the advantageous-inequality term applies: \(u_A=x-\beta_A\big(x-(100-x)\big)=x(1-2\beta_A)+100\beta_A\).`,
H`(b) The utility is linear in \(x\) with slope \(1-2\beta_A\). If \(\beta_A< \tfrac12\), it rises in \(x\): A keeps everything, \(x=100\). If \(\beta_A>\tfrac12\), it falls in \(x\): A chooses the smallest \(x\ge50\), the equal split \((50,50)\). (At \(\beta_A=\tfrac12\) A is indifferent among all \(x\ge50\).) Offers with \(x< 50\) are never better, because A would then be behind.`,
H`(c) Equal splits in experiments need not come from fear of rejection: a proposer who dislikes being ahead (high \(\beta\)) offers 50:50 even to a responder who would accept anything. Dictator games, where rejection is impossible, help separate the two motives.`])}` });
  X({ lec: 'l9', id: 'p9-1', t: 'Selling a house', extra: true, body: H`
${Q(H`<p>A seller values her house at 200 (thousand €) and has another buyer who offers 210. A second buyer values the house at 260 and has no alternative (his disagreement payoff is 0). The seller and this buyer bargain over the price \(p\); their surplus is divided according to the Nash bargaining solution.</p>
<ol type="a"><li>Write down the Nash bargaining problem (payoffs, disagreement point, maximisation problem).</li>
<li>Find the price \(p\) when both have equal bargaining power.</li>
<li>Find the price with the generalised Nash bargaining solution when the seller's bargaining power is \(\alpha=0.8\).</li>
<li>How does the result in (b) change if the other offer were only 150? Explain.</li></ol>`)}
${steps('Step-by-step solution', [H`(a) If they agree on \(p\): seller \(x_S=p\), buyer \(x_B=260-p\); joint value \(v^*=260\). Disagreement: the seller sells to the other buyer, \(d_S=210\); the buyer gets \(d_B=0\). Nash bargaining: \(\max_p\ (p-210)(260-p)\).`,
H`(b) FOC: \((260-p)-(p-210)=0\Rightarrow p=235\). Equivalently: surplus \(260-210=50\) split equally, the seller gets \(210+25\).`,
H`(c) Generalised solution: the seller gets \(d_S+\alpha(v^*-d_S-d_B)=210+0.8\cdot50=250\), so \(p=250\).`,
H`(d) An offer of 150 is below the seller's own value 200; she would rather keep the house. Her disagreement payoff becomes 200, the surplus 60, and \(p=200+30=230\). An outside option only matters if it is better than what you have anyway.`])}` });
  X({ lec: 'l9', id: 'p9-2', t: 'Axioms', extra: true, body: H`
${Q(H`<p>Consider the Nash bargaining solution for two players with disagreement point \((d_1,d_2)\) and maximal joint value \(v^*\).</p>
<ol type="a"><li>State the four axioms that characterise the Nash bargaining solution.</li>
<li>A mediator always gives player 1 the whole surplus, i.e. \(x_1=v^*-d_2\) and \(x_2=d_2\). Which of the axioms does this rule satisfy, and why is it not the (symmetric) Nash bargaining solution?</li>
<li>Explain the independence of irrelevant alternatives in one sentence, with a graph of the bargaining set in mind.</li></ol>`)}
${steps('Step-by-step solution', [H`(a) (1) Pareto efficiency: the whole surplus is used, \(x_1+x_2=v^*\). (2) Individual rationality: \(x_i\ge d_i\). (3) Invariance to independent (affine) changes of the utility units. (4) Independence of irrelevant alternatives. With symmetry, these determine the Nash bargaining solution.`,
H`(b) The rule \(x_1=v^*-d_2\), \(x_2=d_2\) is Pareto efficient (nothing is wasted), individually rational (player 2 gets exactly \(d_2\), player 1 at least \(d_1\)), invariant to changes of units and satisfies IIA. What it violates is <strong>symmetry</strong>: it treats the players unequally. It is the generalised Nash solution with all bargaining power for player 1 (\(\alpha=1\)).`,
H`(c) If the chosen agreement is still feasible after some other (unchosen) agreements are removed from the bargaining set, it remains the chosen agreement.`])}` });
  X({ lec: 'l10', id: 'p10-2', t: 'Not-so-grim trigger', extra: true, tag: 'Tadelis 10.3', body: H`
${Q(H`<p>Consider the infinitely repeated Prisoner's Dilemma with discount factor \(\delta\) and the stage game below.</p>
${mx({ rows: ['C', 'D'], cols: ['C', 'D'], cells: [['4,4', '-1,5'], ['5,-1', '1,1']] })}
<p>Instead of grim trigger the players use a "not-so-grim" trigger strategy: play C as long as nobody has deviated; after a deviation, play D for \(T\) periods and then return to C.</p>
<ol type="a"><li>For which \(\delta\) does this strategy support cooperation if \(T=1\)?</li>
<li>For which \(\delta\) if \(T=2\)?</li>
<li>Compare your answers with each other and with grim trigger (\(T=\infty\)). Explain the pattern.</li></ol>`)}
${steps('Step-by-step solution', [H`Compare, period by period, cooperating with deviating once and then following the strategy. Deviating today gains \(5-4=1\). During the punishment the deviator gets 1 instead of 4, a loss of 3 per period (deviating again during the punishment gives 1 as well, so it does not help).`,
H`(a) \(T=1\): loss \(3\delta\). Cooperation is sustained iff \(1\le3\delta\iff\delta\ge\tfrac13\).`,
H`(b) \(T=2\): loss \(3\delta+3\delta^2\). Condition \(\delta+\delta^2\ge\tfrac13\). Solve \(\delta^2+\delta-\tfrac13=0\): \(\delta=\frac{-1+\sqrt{1+4/3}}{2}\approx0.264\). So \(\delta\ge0.264\).`,
H`(c) \(\tfrac13>0.264>\tfrac14\) (grim trigger: \(4/(1-\delta)\ge5+\delta/(1-\delta)\iff\delta\ge\tfrac14\)). A longer punishment is harsher, so it deters deviations with less patience. Grim trigger needs the least patience, but it is also the least forgiving after a mistake.`])}` });
  X({ lec: 'l10', id: 'p10-3', t: 'Tacit collusion: Cournot vs. Bertrand', extra: true, tag: 'Tadelis 10.8', body: H`
${Q(H`<p>Two firms produce a homogeneous good at zero cost. Inverse demand is \(p=200-Q\). The stage game is played infinitely often; both firms discount the future with \(\delta\).</p>
<ol type="a"><li>Find the Nash equilibrium quantities and profits of the stage game if firms compete in quantities (Cournot).</li>
<li>The firms want to share the monopoly profit equally in every period. For which \(\delta\) can this be sustained if a deviation is punished by Cournot competition forever?</li>
<li>Find the Nash equilibrium of the stage game if firms compete in prices (Bertrand).</li>
<li>For which \(\delta\) can the collusive outcome be sustained if a deviation is punished by Bertrand competition forever?</li>
<li>Now the Bertrand punishment lasts only two periods, after which the firms return to collusion. For which \(\delta\) is collusion sustainable? Compare with (d).</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Cournot: firm \(i\) maximises \((200-q_i-q_j)q_i\Rightarrow q_i=\frac{200-q_j}{2}\). Symmetric: \(q=\frac{200}{3}\approx66.7\), price \(\frac{200}{3}\), profit \(\left(\frac{200}{3}\right)^2\approx4444.4\) each.`,
H`(b) Monopoly: \(Q=100\), price 100, profit 10000, i.e. 5000 each with \(q=50\). Best deviation against \(q_j=50\): \(q_i=75\), price 75, profit 5625. Grim trigger with Cournot reversion: \(5625+\frac{\delta}{1-\delta}4444.4\le\frac{5000}{1-\delta}\iff625\le1180.6\,\delta\iff\delta\ge\tfrac{9}{17}\approx0.53\).`,
H`(c) Bertrand: price equals marginal cost, \(p=0\), zero profits (any higher price would be undercut).`,
H`(d) A deviator undercuts the monopoly price slightly and takes (almost) the whole monopoly profit 10000, then gets 0 forever: \(10000\le\frac{5000}{1-\delta}\iff\delta\ge\tfrac12\). The harsher Bertrand punishment needs less patience than Cournot reversion.`,
H`(e) Two periods of punishment, then collusion again: \(10000+0+0+\frac{5000\delta^3}{1-\delta}\le\frac{5000}{1-\delta}\). Multiply by \((1-\delta)/5000\): \(2(1-\delta)\le1-\delta^3\iff1-2\delta+\delta^3\le0\iff(1-\delta)(1-\delta-\delta^2)\le0\iff\delta^2+\delta-1\ge0\iff\delta\ge\frac{\sqrt5-1}{2}\approx0.618\). A shorter punishment needs more patience than (d).`])}` });
  X({ lec: 'l10', id: 'p10-4', t: 'Negative ads revisited', extra: true, tag: 'Tadelis 10.5', body: H`
${Q(H`<p>Two political parties choose hours of negative ads \(a_i\in[0,2]\) simultaneously; party \(i\)'s payoff is \(v_i(a_1,a_2)=a_i-2a_j+a_ia_j-a_i^2\). (The one-shot game has the unique Nash equilibrium \(a_1=a_2=1\) with payoff \(-1\) each.) The game is now repeated infinitely often with discount factor \(\delta\).</p>
<ol type="a"><li>For which \(\delta\) can the parties sustain \(a_1=a_2=0\) in every period with grim-trigger strategies (reverting to the stage-game equilibrium forever after a deviation)?</li>
<li>The government now caps negative ads at half an hour, \(a_i\in[0,\tfrac12]\). Find the new stage-game equilibrium and the new condition on \(\delta\). Is the cap a good idea?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) On the path both choose 0 and get \(v=0\) each period. Best deviation against \(a_j=0\): \(BR(0)=\tfrac12\), payoff \(\tfrac12-\tfrac14=\tfrac14\). Punishment: the stage equilibrium \((1,1)\) with \(-1\) forever.`,
H`No deviation iff \(0\ge\tfrac14+\frac{\delta}{1-\delta}(-1)\iff\frac{\delta}{1-\delta}\ge\tfrac14\iff\delta\ge\tfrac15\).`,
H`(b) With the cap \(a_i\in[0,\tfrac12]\), the best response \(\frac{1+a_j}{2}\ge\tfrac12\) is cut at \(\tfrac12\): the new stage equilibrium is \(a_1=a_2=\tfrac12\) with payoff \(\tfrac12-1+\tfrac14-\tfrac14=-\tfrac12\) each, better than \(-1\).`,
H`The deviation gain is still \(\tfrac14\) (\(a=\tfrac12\) is allowed), but the punishment is milder: \(\tfrac14\le\frac{\delta}{1-\delta}\cdot\tfrac12\iff\delta\ge\tfrac13\).`,
H`Evaluation: in the one-shot game the cap helps (\(-\tfrac12\) instead of \(-1\)). In the repeated game it hurts if \(\delta\in[\tfrac15,\tfrac13)\): there the parties could have avoided negative ads entirely, but with the cap the threat is too weak. Regulation that softens punishments can destroy cooperation.`])}` });
  X({ lec: 'l11', id: 'p11-1', t: 'Cournot with one-sided private costs', extra: true, body: H`
${Q(H`<p>Two firms compete in quantities (Cournot) with inverse demand \(p=20-q_1-q_2\). Firm 2's unit cost is 2, and this is common knowledge. Firm 1's unit cost is either 2 or 6, each with probability \(\tfrac12\); only firm 1 knows its cost. Firms choose quantities simultaneously.</p>
<ol type="a"><li>What is a strategy of firm 1 and of firm 2 in this Bayesian game?</li>
<li>Derive the best-response functions of both types of firm 1 and of firm 2.</li>
<li>Find the Bayesian Nash equilibrium.</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Firm 1 knows its cost, so its strategy specifies a quantity for each type: \((q_1(2),\ q_1(6))\). Firm 2 has one type: a single quantity \(q_2\).`,
H`(b) Firm 1 of type \(c\): \(\max_{q_1}(20-q_1-q_2-c)q_1\Rightarrow q_1(c)=\frac{20-c-q_2}{2}\): \(q_1(2)=\frac{18-q_2}{2}\), \(q_1(6)=\frac{14-q_2}{2}\).`,
H`Firm 2 does not know firm 1's type and maximises expected profit \(\big(20-q_2-E[q_1]-2\big)q_2\), so \(q_2=\frac{18-E[q_1]}{2}\) with \(E[q_1]=\tfrac12q_1(2)+\tfrac12q_1(6)\).`,
H`(c) \(E[q_1]=\tfrac12\cdot\frac{18-q_2}{2}+\tfrac12\cdot\frac{14-q_2}{2}=\frac{16-q_2}{2}\). Insert: \(q_2=\frac{18-(16-q_2)/2}{2}\Rightarrow4q_2=36-16+q_2\Rightarrow q_2=\tfrac{20}{3}\).`,
H`Then \(q_1(2)=\frac{18-20/3}{2}=\tfrac{17}{3}\) and \(q_1(6)=\frac{14-20/3}{2}=\tfrac{11}{3}\). BNE: \(\big((\tfrac{17}{3},\tfrac{11}{3}),\ \tfrac{20}{3}\big)\). Each type best responds to firm 2, and firm 2 best responds to the type-dependent strategy.`])}` });
  X({ lec: 'l11', id: 'p11-2', t: 'Public good with private costs', extra: true, body: H`
${Q(H`<p>Two neighbours decide simultaneously whether to contribute to a public good (e.g. clearing the snow from the shared driveway). If at least one contributes, each neighbour receives a benefit of 1; otherwise both receive 0. Neighbour \(i\)'s cost of contributing is \(c_i\in\{0.3,\ 0.8\}\), each with probability \(\tfrac12\), drawn independently; each neighbour knows only his own cost.</p>
<ol type="a"><li>Show that the strategy profile "contribute if and only if \(c_i=0.3\)" is a Bayesian Nash equilibrium.</li>
<li>Is the outcome efficient? Discuss the case in which both neighbours have high costs.</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Suppose the other neighbour follows the strategy. Then he contributes with probability \(\tfrac12\) (when his cost is 0.3).`,
H`Low-cost type (\(c_i=0.3\)): contributing gives \(1-0.3=0.7\) for sure; not contributing gives \(\tfrac12\cdot1+\tfrac12\cdot0=0.5\). Contribute.`,
H`High-cost type (\(c_i=0.8\)): contributing gives \(1-0.8=0.2\); not contributing gives \(0.5\). Do not contribute.`,
H`Both types of both players best respond, so the profile is a Bayesian Nash equilibrium.`,
H`(b) Not always efficient. If both have high costs (probability \(\tfrac14\)), nobody contributes, although the good is worth \(1+1=2\) to the two neighbours and costs only 0.8. If both have low costs, both contribute although one contribution would suffice (cost 0.3 wasted).`])}` });
  X({ lec: 'l11', id: 'p11-3', t: 'Entry game with different numbers', extra: true, body: H`
${Q(H`<p>Consider the market-entry game of Lecture 11. Player 1 (incumbent) decides whether to invest (I) or not (nI); simultaneously player 2 decides whether to enter (E) or not (nE). Player 1's cost is high with probability \(p\) and low with probability \(1-p\); only player 1 knows it. Payoffs (player 1, player 2):</p>
<div class="wgrid"><div><p class="small">High cost</p>${mx({ rows: ['I', 'nI'], cols: ['E', 'nE'], cells: [['0,-3', '2,0'], ['2,1', '3,0']] })}</div><div><p class="small">Low cost</p>${mx({ rows: ['I', 'nI'], cols: ['E', 'nE'], cells: [['3,-3', '5,0'], ['2,1', '3,0']] })}</div></div>
<p>Compared with the lecture, entering against an incumbent who invests now gives player 2 a payoff of \(-3\) instead of \(-1\).</p>
<ol type="a"><li>What does each type of player 1 do?</li>
<li>For which beliefs \(p\) does player 2 enter? Compare with the lecture.</li></ol>`)}
${steps('Step-by-step solution', [H`(a) High cost: nI gives (2, 3) against (E, nE), I gives (0, 2): nI is strictly dominant. Low cost: I gives (3, 5), nI gives (2, 3): I is strictly dominant. So the high type does not invest and the low type invests.`,
H`(b) Player 2: entering gives 1 against a high-cost incumbent (nI) and \(-3\) against a low-cost one (I): \(E[\pi_2\mid E]=p\cdot1+(1-p)(-3)=4p-3\). Not entering gives 0.`,
H`Player 2 enters iff \(4p-3>0\iff p>\tfrac34\). In the lecture (payoff \(-1\)) the condition was \(2p-1>0\iff p>\tfrac12\). A bigger loss from meeting a tough incumbent requires more confidence that the incumbent is weak.`])}` });
  X({ lec: 'l12', id: 'p12-1', t: 'First-price auction', extra: true, body: H`
${Q(H`<p>Consider a first-price sealed-bid auction with independent private values, uniformly distributed on [0,1].</p>
<ol type="a"><li>There are two bidders. Your value is 0.6 and your rival bids half of his value. Compute your expected payoff from bidding 0.3 and from bidding 0.4. Which bid is better?</li>
<li>With two bidders bidding half their value, compute the seller's expected revenue. Compare it with the expected revenue of a second-price auction.</li>
<li>Now there are three bidders. What is the equilibrium bid function, and what is the seller's expected revenue?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) The rival bids \(v_j/2\), so you win with bid \(x\) iff \(v_j< 2x\): probability \(2x\) (for \(x\le\tfrac12\)). Bid 0.3: \((0.6-0.3)\cdot0.6=0.18\). Bid 0.4: \((0.6-0.4)\cdot0.8=0.16\). Bidding 0.3, half of your value, is better.`,
H`(b) First price: revenue = winning bid = \(\tfrac12\max\{v_1,v_2\}\); \(E[\max]=\tfrac23\), so expected revenue \(\tfrac13\). Second price (truthful bids): revenue = second-highest value, \(E[\min\{v_1,v_2\}]=\tfrac13\). The same.`,
H`(c) With \(n\) bidders the equilibrium bid is \(\frac{n-1}{n}v\), so \(b=\tfrac23v\) for \(n=3\). Expected revenue \(=\tfrac23E[\max\text{ of 3}]=\tfrac23\cdot\tfrac34=\tfrac12=\frac{n-1}{n+1}\). More bidders, more revenue.`])}` });
  X({ lec: 'l12', id: 'p12-2', t: 'Who suffers from naive bidding?', extra: true, body: H`
${Q(H`<p>Recall the oil-field example of Lecture 12: two identical firms bid for an oil field in a second-price sealed-bid auction. The field is worth \(v\in\{10,20,30\}\) to both, with \(\Pr(10)=\Pr(30)=\tfrac14\) and \(\Pr(20)=\tfrac12\). Each firm receives a signal \(\theta_i\in\{L,H\}\): if \(v=10\) both get L, if \(v=30\) both get H, and if \(v=20\) one firm gets L and the other H (each with equal probability). Suppose both firms bid naively their expected value given only their own signal: \(E[v\mid L]=15\), \(E[v\mid H]=25\). Ties are broken by a coin toss.</p>
<ol type="a"><li>Compute the expected payoff of a firm with signal H.</li>
<li>Compute the expected payoff of a firm with signal L. Is naive bidding a Bayesian Nash equilibrium? Which phenomenon does this illustrate?</li></ol>`)}
${steps('Step-by-step solution', [H`Signals: LL, LH, HL, HH each with probability \(\tfrac14\). Given your own signal, the rival's signal is L or H with probability \(\tfrac12\) each.`,
H`(a) Signal H, bid 25. Rival H (prob. \(\tfrac12\)): \(v=30\), both bid 25, you win half the time and pay 25: \(\tfrac12\cdot\tfrac12\cdot(30-25)=1.25\). Rival L (prob. \(\tfrac12\)): \(v=20\), you win and pay the rival's bid 15: \(\tfrac12\cdot(20-15)=2.5\). Expected payoff \(3.75\).`,
H`(b) Signal L, bid 15. Rival L: \(v=10\), tie at 15, you win half the time and pay 15: \(\tfrac12\cdot\tfrac12\cdot(10-15)=-1.25\). Rival H: he bids 25, you lose: 0. Expected payoff \(-1.25< 0\).`,
H`The L type would do better bidding 0, so naive bidding is not a BNE. This is the <strong>winner's curse</strong>: winning is bad news (the rival's signal was low), and a bidder who ignores this pays too much.`])}` });
  X({ lec: 'l12', id: 'p12-3', t: 'Monty Hall with four doors', extra: true, body: H`
${Q(H`<p>A game show has four closed doors; behind one is a car, behind the other three are goats. You pick door A. The host, who knows where the car is, opens one of the other three doors that has a goat behind it. You may now switch to one of the two remaining closed doors, which you then choose at random.</p>
<ol type="a"><li>What is your probability of winning the car if you stay with door A?</li>
<li>What is your probability of winning if you switch? Should you switch?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) The car is behind door A with probability \(\tfrac14\). Opening a goat door does not change that. Staying wins with probability \(\tfrac14\).`,
H`(b) With probability \(\tfrac34\) the car is behind one of the other three doors. The host never opens the car door, so in that case the car is behind one of the two remaining closed doors. Switching to one of them at random wins with probability \(\tfrac34\cdot\tfrac12=\tfrac38\).`,
H`Since \(\tfrac38>\tfrac14\), you should switch. (Bayes' rule gives the same: each of the two remaining doors has posterior probability \(\tfrac38\).)`])}` });
  X({ lec: 'l12', id: 'p12-4', t: 'Revenue equivalence', extra: true, body: H`
${Q(H`<ol type="a"><li>State the revenue equivalence theorem and its assumptions.</li>
<li>In a first-price auction the winner pays his own bid, in a second-price auction only the second-highest bid. Explain why the first-price auction nevertheless does not yield more expected revenue. Use the case of two bidders with values uniform on [0,1] as an illustration.</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Revenue equivalence: with risk-neutral bidders, independent private values from the same well-behaved distribution, any auction in which the bidder with the highest value wins and the lowest type expects zero payoff yields the same expected revenue (and the same expected payoff for every type).`,
H`(b) In a first-price auction bidders shade their bids below their value; in a second-price auction they bid their value but pay the second-highest bid. The shading exactly offsets the higher price rule.`,
H`Illustration with two uniform bidders: in the first-price auction the winner bids and pays \(\tfrac v2\); given that he has the highest value \(v\), the rival's value is uniform on \([0,v]\) with mean \(\tfrac v2\), exactly what he would pay in a second-price auction. Both auctions give expected revenue \(\tfrac13\).`])}` });
  X({ lec: 'l13', id: 'p13-1', t: 'Find all pure-strategy PBE', extra: true, body: H`
${Q(H`<p>Player 1 chooses L, M or R. R ends the game with payoffs (1,1). After L or M, player 2 chooses L' or R' without observing whether L or M was played. Payoffs (player 1, player 2): (L,L') = (2,1), (L,R') = (0,0), (M,L') = (0,0), (M,R') = (2,1). Let \(p\) be player 2's belief that L was played.</p>
<ol type="a"><li>Determine player 2's sequentially rational choice as a function of \(p\).</li>
<li>Find all pure-strategy perfect Bayesian equilibria.</li>
<li>Does requirement 5 (no beliefs on strictly dominated strategies) eliminate any of them?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Player 2's expected payoffs with belief \(p\): L' gives \(1\cdot p+0\cdot(1-p)=p\), R' gives \(0\cdot p+1\cdot(1-p)=1-p\). L' is optimal iff \(p\ge\tfrac12\), R' iff \(p\le\tfrac12\).`,
H`(b) Candidate "player 1 plays L": the information set is on the path, Bayes gives \(p=1\), player 2 plays L'. Player 1 gets 2 from L, 0 from M, 1 from R: L is optimal. PBE: \(((L,L'),\ p=1)\).`,
H`Candidate "M": \(p=0\), player 2 plays R'; player 1 gets 2 from M, 0 from L, 1 from R. PBE: \(((M,R'),\ p=0)\).`,
H`Candidate "R": player 2's information set is off the path, so any belief is allowed. But whatever pure action player 2 chooses, player 1 gets 2 from L (if L') or from M (if R'), more than 1 from R. No pure-strategy PBE with R.`,
H`(c) Requirement 5 restricts beliefs only off the path and only by excluding strictly dominated strategies. In both PBE the information set is on the path, and neither L nor M is strictly dominated. Nothing is eliminated: both PBE remain.`])}` });
  X({ lec: 'l13', id: 'p13-2', t: 'Weak PBE vs. PBE', extra: true, body: H`
${Q(H`<p>Player 1 chooses A, which ends the game with payoffs (2,0,0), or D. After D, player 2 chooses L or R. Player 3 then chooses L' or R' without observing player 2's choice; \(p\) is player 3's belief that L was played. Payoffs (players 1, 2, 3): (D,L,L') = (1,2,4), (D,L,R') = (3,3,3), (D,R,L') = (0,1,2), (D,R,R') = (0,1,1). (This is Example 3 of Lecture 13 with player 3's payoff after (D,L,L') raised from 1 to 4.)</p>
<ol type="a"><li>Is \(((A,L,L'),p)\) a perfect Bayesian equilibrium for some belief \(p\)? Check all requirements.</li>
<li>Is (D,L,R') still a Nash equilibrium of the subgame after D?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Check the requirements for \(((A,L,L'),p)\). Requirement 4: player 3's information set is off the path (player 1 plays A), but beliefs must follow player 2's strategy L where possible, so \(p=1\).`,
H`Sequential rationality of player 3 at \(p=1\): L' gives 4, R' gives 3: L' is optimal.`,
H`Player 2 after D, given L': L gives 2, R gives 1: L is optimal. Player 1, given (L, L'): A gives 2, D gives 1: A is optimal.`,
H`All requirements hold: \(((A,L,L'),\ p=1)\) is now a perfect Bayesian equilibrium. (In the lecture it was not, because with \(p=1\) player 3 preferred R'.)`,
H`(b) In the subgame after D, given R' player 2 prefers L (3 > 1), but given L player 3 now prefers L' (4 > 3). So \((L,R')\) is no longer a Nash equilibrium of that subgame; its equilibrium is \((L,L')\).`])}` });
  X({ lec: 'l14', id: 'p14-1', t: 'How cheap can education be for the low type?', extra: true, body: H`
${Q(H`<p>Consider the job-market signalling game of Lecture 14. A worker is of high ability with probability \(\tfrac13\) and of low ability with probability \(\tfrac23\); only the worker knows his type. He chooses education (E) or no education (N); the firm observes the choice and assigns him to a management job (M), paying a wage of 10, or a clerical job (C), paying 4. The firm gets 10 from a high type in M, 0 from a low type in M and 4 from either type in C. Education costs the high type \(c_H\) and the low type \(c_L\).</p>
<ol type="a"><li>Write down the beliefs and the firm's strategy in a separating equilibrium in which the high type chooses E and the low type N.</li>
<li>For which costs \(c_H\) and \(c_L\) is this a perfect Bayesian equilibrium?</li>
<li>Explain the role of the single-crossing condition.</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Separating with high = E, low = N: Bayes gives belief "high" \(q=1\) after E and \(p=0\) after N. The firm assigns M after E (10 > 4) and C after N (4 > 0).`,
H`(b) High type must not deviate to N: \(10-c_H\ge4\iff c_H\le6\).`,
H`Low type must not mimic with E: \(4\ge10-c_L\iff c_L\ge6\).`,
H`So the separating PBE exists iff \(c_H\le6\le c_L\). For example with \(c_L=5\) the low type would get \(10-5=5>4\) by mimicking, and separation fails.`,
H`(c) Single crossing: the signal must be cheaper for the type that wants to reveal itself. Only then can the wage gain (6) be worth the signal for the high type but not for the low type.`])}` });
  X({ lec: 'l14', id: 'p14-2', t: 'A more optimistic market', extra: true, body: H`
${Q(H`<p>Consider the job-market signalling game of Lecture 14 (wages 10 in M and 4 in C; the firm gets 10 from a high type in M, 0 from a low type in M and 4 from either type in C; education costs 4 for the high type and 7 for the low type), but now the prior probability of the high type is \(\tfrac12\).</p>
<ol type="a"><li>Is pooling on no education (N) a perfect Bayesian equilibrium? Specify beliefs and the firm's strategy.</li>
<li>Is there a separating perfect Bayesian equilibrium in which only the high type gets education?</li>
<li>Which equilibrium do the workers prefer?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Pooling on N: on the path the firm's belief is the prior \(\tfrac12\). M' gives the firm \(\tfrac12\cdot10+\tfrac12\cdot0=5\), C' gives 4: the firm chooses M'. Both types get 10 without paying for education.`,
H`Deviating to E costs 4 or 7 and can at most also bring the wage 10, so no type gains, whatever the firm believes after E (e.g. belief 0 and C). Pooling on N is a PBE.`,
H`(b) Separating (high E, low N): beliefs 1 and 0, firm plays M after E and C after N. High type: \(10-4=6\ge4\); low type: \(4\ge10-7=3\). Also a PBE: the prior does not enter the separating conditions.`,
H`(c) Both worker types prefer the pooling equilibrium: the high type gets 10 instead of 6, the low type 10 instead of 4. With an optimistic market, education is a wasteful signal.`])}` });
  X({ lec: 'l15', id: 'p15-1', t: 'Linear contract with an outside option', extra: true, body: H`
${Q(H`<p>A risk-neutral principal hires a risk-neutral agent. Output is \(Q=e+u\) with \(E[u]=0\); the agent's effort cost is \(0.5e^2\); only \(Q\) is observable. The principal offers a linear contract \(w=s+rQ\). The agent's outside option is \(A=0.2\).</p>
<ol type="a"><li>Find the optimal contract \((s,r)\), effort and the principal's profit without any restriction on \(s\).</li>
<li>Now the agent is protected by limited liability, \(s\ge0\). Find the optimal contract, effort and profit. Does the agent earn a rent?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Effort: the agent maximises \(s+re-0.5e^2\Rightarrow e=r\). Participation binds: \(s+0.5r^2=0.2\). The principal maximises \(E[Q]-E[w]=r-(s+r^2)=r-0.5r^2-0.2\Rightarrow r^*=1\), \(e=1\), \(s^*=0.2-0.5=-0.3\) (the agent pays a fee, "buys the firm"), profit \(0.5-0.2=0.3\).`,
H`(b) Now \(s\ge0\). Profit is \(r-s-r^2\) with \(s=\max\{0,\ 0.2-0.5r^2\}\) (the smallest fixed pay that satisfies both participation and limited liability).`,
H`For \(r\le\sqrt{0.4}\approx0.632\), \(s=0.2-0.5r^2\ge0\) and profit \(r-0.2-0.5r^2\) increases in \(r\). For \(r\ge\sqrt{0.4}\), \(s=0\) and profit \(r-r^2\) decreases (since \(r>0.5\)).`,
H`Optimum: \(r=\sqrt{0.4}\approx0.632\), \(s=0\), \(e\approx0.632\), profit \(0.632-0.4\approx0.232\). The agent gets exactly \(0.5r^2=0.2\), his outside option: <strong>no rent</strong>. A good outside option removes the limited-liability rent of the lecture (where \(A=0\) gave \(r=0.5\) and a rent).`])}` });
  X({ lec: 'l15', id: 'p15-2', t: 'Bonus contract equivalent to a linear contract', extra: true, body: H`
${Q(H`<p>A risk-neutral agent produces \(Q=e+u\), where \(u\) is uniform on \([-1,1]\); effort costs \(0.5e^2\). His outside option is \(A=0.5\), so the optimal linear contract is \(s^*=0\), \(r^*=1\). The principal wants to replace it by a bonus contract: the agent receives \(\alpha\) if \(Q< Q^*\) and \(\alpha+\beta\) if \(Q\ge Q^*\), with target \(Q^*=1\).</p>
<ol type="a"><li>Find \(\alpha\) and \(\beta\) such that the bonus contract gives the same incentives as the linear contract.</li>
<li>Verify that the agent then chooses \(e=1\).</li></ol>`)}
${steps('Step-by-step solution', [H`(a) The lecture's rule for \(u\) uniform on \([a,b]=[-1,1]\): \(\beta=(b-a)r=2\cdot1=2\) and \(\alpha=s-(b-Q^*)r=0-(1-1)\cdot1=0\). Contract: pay 0 if \(Q< 1\), pay 2 if \(Q\ge1\).`,
H`(b) Probability of meeting the target: \(\Pr(e+u\ge1)=\Pr(u\ge1-e)=\frac{1-(1-e)}{2}=\frac e2\) (for \(0\le e\le2\)).`,
H`Expected pay \(0+2\cdot\frac e2=e\), the same as under \(s+re=e\). The agent maximises \(e-0.5e^2\Rightarrow e=1\), as with the linear contract.`])}` });
  X({ lec: 'l16', id: 'p16-1', t: 'Certainty equivalents', extra: true, body: H`
${Q(H`<p>A person has the utility function \(v(x)=\sqrt x\) over money.</p>
<ol type="a"><li>Compute the certainty equivalent and the risk premium of a lottery paying 0 or 2000, each with probability \(\tfrac12\).</li>
<li>Do the same for a lottery paying 900 or 1100, each with probability \(\tfrac12\).</li>
<li>Compare the two risk premia and explain.</li></ol>`)}
${steps('Step-by-step solution', [H`Certainty equivalent \(c\): the sure amount with \(v(c)=EU\). Risk premium: \(E[x]-c\).`,
H`(a) \(EU=\tfrac12\sqrt0+\tfrac12\sqrt{2000}\approx22.36\Rightarrow c=22.36^2=500\). \(E[x]=1000\), risk premium \(500\).`,
H`(b) \(EU=\tfrac12\sqrt{900}+\tfrac12\sqrt{1100}\approx\tfrac12(30+33.17)=31.58\Rightarrow c\approx997.5\). \(E[x]=1000\), risk premium \(\approx2.5\).`,
H`(c) Same expected value, but the second lottery is much less risky, so the risk premium is tiny. The risk premium grows roughly with the variance of the lottery (about \(\tfrac12\cdot\)variance\(\cdot\)absolute risk aversion).`])}` });
  X({ lec: 'l16', id: 'p16-2', t: 'St. Petersburg with log utility', extra: true, body: H`
${Q(H`<p>St. Petersburg game: a fair coin is tossed until "number" appears for the first time. If this happens at toss \(k\), the prize is \(2^{k-1}\) euros. A person evaluates money with the utility function \(v(x)=\ln x\).</p>
<ol type="a"><li>Show that the expected prize is infinite.</li>
<li>Compute the person's expected utility and certainty equivalent. How much would she pay at most to play?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) The prize \(2^{k-1}\) is paid with probability \(2^{-k}\): \(E[x]=\sum_{k\ge1}2^{-k}2^{k-1}=\sum_{k\ge1}\tfrac12=\infty\).`,
H`(b) \(EU=\sum_{k\ge1}2^{-k}\ln2^{k-1}=\ln2\sum_{k\ge1}\frac{k-1}{2^k}=\ln2\Big(\sum_k\frac{k}{2^k}-\sum_k\frac1{2^k}\Big)=\ln2\,(2-1)=\ln2\).`,
H`Certainty equivalent: \(\ln c=\ln2\Rightarrow c=2\). A person with log utility pays at most €2, although the expected prize is infinite: Bernoulli's resolution of the St. Petersburg paradox.`])}` });
  X({ lec: 'l16', id: 'p16-3', t: 'Optimal contract with numbers', extra: true, body: H`
${Q(H`<p>Consider the principal-agent model with a risk-averse manager of Lecture 16: output \(Q=e+u\) with \(E[u]=0\); pay \(p=s+rQ\); the manager's certainty equivalent is \(EU=s+re-Kr^2-0.5e^2\); his reservation utility is \(u_0\). Let \(K=0.5\) and \(u_0=0.1\).</p>
<ol type="a"><li>Compute the optimal \(r^*\), effort \(e\), fixed pay \(s\) and expected pay \(E[p]\).</li>
<li>Compute the risk premium and the principal's expected profit.</li>
<li>Would the principal ever prefer a fixed wage? For which degree of risk aversion \(K\) (with \(u_0=0.1\)) would he rather not hire the manager at all?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Effort: \(e=r\). Lecture result: \(r^*=\frac{1}{1+2K}=\tfrac12\), so \(e=\tfrac12\). Participation binds: \(s=u_0+Kr^2+0.5e^2-re=0.1+0.125+0.125-0.25=0.1\). Expected pay \(E[p]=s+re=0.1+0.25=0.35\).`,
H`(b) Risk premium \(Kr^2=0.5\cdot0.25=0.125\). Expected profit \(E[Q]-E[p]=0.5-0.35=0.15\); in general \(\frac{1}{2(1+2K)}-u_0\).`,
H`(c) A fixed wage is never better than the optimal incentive contract: it gives \(e=0\) and profit \(-u_0\), while the incentive contract gives \(\frac{1}{2(1+2K)}-u_0>-u_0\). But hiring at all is profitable only if \(\frac{1}{2(1+2K)}\ge u_0\iff K\le\frac{1}{4u_0}-\tfrac12=2\). For \(K>2\) the principal would rather not hire the manager.`])}` });
  X({ lec: 'l17', id: 'p17-1', t: 'A riskier die', extra: true, body: H`
${Q(H`<p>Consider the trust game of Lecture 17. Player A chooses Out, giving (5,5), or In. After In, player B chooses Grab, giving (0,14), or Roll. After Roll a die is rolled: with probability 2/3 the payoffs are (12,10) and with probability 1/3 they are (0,10). (In the lecture these probabilities were 5/6 and 1/6.) B is guilt averse: Grab gives B the utility \(14-\theta\,\big(E_{BA}(\pi_A)-0\big)\), where \(E_{BA}(\pi_A)\) is B's belief about A's expected payoff and \(\theta\ge0\) his sensitivity to guilt. Let \(\alpha\) be A's belief that B rolls and \(\beta\) B's belief about \(\alpha\).</p>
<ol type="a"><li>Compute A's expected payoff from Roll and B's utility from Grab and from Roll.</li>
<li>Find the conditions for a psychological equilibrium in which A plays In and B plays Roll.</li>
<li>Compare with the lecture: how much guilt aversion is needed now, and why?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) A's expected payoff from Roll: \(\tfrac23\cdot12+\tfrac13\cdot0=8\). A expects \(8\alpha\), so B's belief about A's expectation is \(E_{BA}(\pi_A)=8\beta\).`,
H`B's utilities: Roll gives 10 (A receives on average what he expects, no guilt). Grab gives \(14-\theta\cdot8\beta\).`,
H`(b) B rolls iff \(10\ge14-8\theta\beta\iff\theta\beta\ge\tfrac12\). A plays In iff \(8\alpha\ge5\iff\alpha\ge\tfrac58\). In a psychological equilibrium beliefs are correct: \(\alpha=\beta=\) the actual probability of Roll. With (In, Roll) played for sure, \(\alpha=\beta=1\): PE iff \(\theta\ge\tfrac12\).`,
H`(c) In the lecture (prize 12 with probability 5/6, so A expects 10) the condition was \(\theta\ge0.4\). Now A expects less (8), so letting him down causes less guilt, and B must be more guilt averse (\(\theta\ge0.5\)) to roll.`])}` });
  X({ lec: 'l17', id: 'p17-2', t: 'Beliefs vs. outcomes', extra: true, body: H`
${Q(H`<p>In the experiment of Charness and Dufwenberg (2006), allowing B to send a message (typically a promise to roll) before the trust game increased cooperation.</p>
<ol type="a"><li>Explain why Fehr-Schmidt inequality aversion cannot explain this finding.</li>
<li>Explain how guilt aversion can explain it.</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Fehr-Schmidt utility depends only on the material payoffs of the players. A promise does not change any material payoff, so it cannot change a Fehr-Schmidt player's behaviour.`,
H`(b) A promise raises A's expectation that B rolls, and B knows this: B's second-order belief \(\beta\) rises. With guilt aversion, grabbing costs \(\theta\cdot E_{BA}(\pi_A)\), which increases in \(\beta\). The promise therefore makes grabbing more costly for B and rolling more attractive, as observed.`])}` });
  X({ lec: 'l18', id: 'p18-1', t: 'Comparing legal regimes', extra: true, body: H`
${Q(H`<p>Two players simultaneously choose to invest (I) or not (N) in a joint project (e.g. a house remodelling by an architect, player 1, and a constructor, player 2):</p>
${mx({ rows: ['I', 'N'], cols: ['I', 'N'], cells: [['5,5', '-3,4'], ['7,-1', '0,0']] })}
<p>In the notation of Lecture 18: \(z=(5,5)\) is the payoff of cooperation, \(x_1=7\) and \(x_2=4\) the payoffs of the player who breaches, \(y_1=-3\) and \(y_2=-1\) the payoffs of the player who is breached against.</p>
<ol type="a"><li>Is (I,I) efficient? Is it self-enforcing?</li>
<li>Limited verifiability: the court can only see whether the outcome is (I,I) or not, so the same transfer \(\alpha\) from player 2 to player 1 applies after (I,N), (N,I) and (N,N). Can such a contract enforce (I,I)?</li>
<li>Can expectation damages enforce (I,I)?</li>
<li>Can reliance damages enforce (I,I)?</li>
<li>With full verifiability, a complete contract specifies a transfer \(\alpha\) from player 2 to player 1 after (N,I) and a transfer \(\beta\) from player 2 to player 1 after (I,N) (negative values mean that player 1 pays). Which values of \(\alpha\) and \(\beta\) enforce (I,I)?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Efficiency: total payoffs are 10 for (I,I), 1 for (I,N), 6 for (N,I) and 0 for (N,N): (I,I) is efficient. Self-enforcing? Player 1 gets 7 > 5 by deviating to N: no. (Player 2 would not deviate: 4 < 5.)`,
H`(b) Limited verifiability: (I,I) is a NE with transfer \(\alpha\) iff \(z_1\ge x_1+\alpha\) and \(z_2\ge x_2-\alpha\). Adding gives the necessary condition \(z_1+z_2\ge x_1+x_2\): \(10\ge11\) fails. No such contract works.`,
H`(c) Expectation damages give the breached party its cooperation payoff \(z\); the breaching party pays the difference. Conditions (lecture): \(z_1+z_2\ge x_1+y_2\): \(10\ge6\) and \(z_1+z_2\ge x_2+y_1\): \(10\ge1\). Both hold: enforceable.`,
H`(d) Reliance damages only restore the breached party's no-contract payoff 0. Player 1 then breaches iff \(x_1+y_2>z_1\): \(7-1=6>5\). Not enforceable: player 1's temptation is too large relative to player 2's reliance loss.`,
H`(e) Player 1 must not want to breach: \(z_1\ge x_1+\alpha\iff5\ge7+\alpha\iff\alpha\le-2\) (player 1 pays at least 2 if he alone breaches). Player 2: \(z_2\ge x_2-\beta\iff5\ge4-\beta\iff\beta\ge-1\); since player 2 has no incentive to breach anyway, \(\beta=0\) works.`])}` });
  X({ lec: 'l18', id: 'p18-2', t: 'Information requirements', extra: true, body: H`
${Q(H`<p>Courts can remedy a breach of contract with expectation damages or with reliance damages.</p>
<ol type="a"><li>Which information does a court need for each remedy?</li>
<li>Why are reliance damages easier to apply, and what is the cost of this simplicity?</li></ol>`)}
${steps('Step-by-step solution', [H`(a) Expectation damages: the court must know who breached and the payoff the plaintiff would have obtained if the contract had been fulfilled (\(z\)), plus his actual payoff. Reliance damages: the court only needs who breached and the plaintiff's loss relative to having no contract (\(y\)).`,
H`(b) The no-contract payoff (0) is easier to verify than a hypothetical fulfilment value, so reliance damages are simpler to apply. The cost: they compensate less and therefore deter breach less; they do not always enforce efficient cooperation (as in the previous problem, part d).`])}` });
})();

/* ---------- the Exercises page ---------- */
(function () {
  const SEM = { 23: 'WS 2023/24', 24: 'WS 2024/25', 25: 'WS 2025/26', 26: 'WS 2026/27' };
  const srcLabel = s => { const [y, e, q] = s.split('.'); return SEM[y] + ', Ex ' + e + ', Q' + q; };
  const lessonOf = id => GT.lessons.find(l => l.id === id);
  const sorted = () => GT.lessons.flatMap(l => GT.ex.filter(x => x.lec === l.id && !x.extra).concat(GT.ex.filter(x => x.lec === l.id && x.extra)));
  const chips = x => (x.src || []).map(s => '<span class="chip acc">' + srcLabel(s) + '</span>').join(' ') + (x.extra ? ' <span class="chip">Extra practice</span>' + (x.tag ? ' <span class="chip">' + x.tag + '</span>' : '') : '');
  GT.exChips = chips;

  /* List of exercises for one lecture (used at the end of each lecture page). */
  GT.exFor = function (lid) {
    const xs = sorted().filter(x => x.lec === lid);
    if (!xs.length) return '';
    return '<div class="box tip"><span class="lbl">Practise this lecture</span><ul>' + xs.map(x => '<li><a href="#exercises/' + x.id + '">' + x.t + '</a> ' + chips(x) + ' ' + (GT.exBadge ? GT.exBadge(x.id) : '') + '</li>').join('') + '</ul></div>';
  };

  GT.pages.exercises = {
    title: 'Exercises (solved)', render: () => {
      const xs = sorted();
      const sheets = {};
      xs.forEach(x => (x.src || []).forEach(s => { const [y, e, q] = s.split('.'); ((sheets[y] = sheets[y] || {})[e] = sheets[y][e] || []).push([+q, x]); }));
      const finder = Object.keys(sheets).sort().map(y => Object.keys(sheets[y]).sort((a, b) => a - b).map(e =>
        '<tr><td>' + SEM[y] + '</td><td>Exercise ' + e + '</td><td>' + sheets[y][e].sort((a, b) => a[0] - b[0]).map(([q, x]) => '<a href="#exercises/' + x.id + '">Q' + q + ' ' + x.t + '</a>').join('<br>') + '</td></tr>').join('')).join('');
      const lecs = GT.lessons.filter(l => xs.some(x => x.lec === l.id));
      /* One lecture at a time keeps the page light (the full set has about 1000 formulas). */
      const sub = (location.hash || '').slice(1).split('/')[1] || '';
      const hit = GT.ex.find(x => x.id === sub);
      let cur = hit ? hit.lec : sub.startsWith('x-l') ? sub.slice(2) : store.get('exLec', lecs[0].id);
      if (!lecs.some(l => l.id === cur)) cur = lecs[0].id;
      store.set('exLec', cur);
      const L = lecs.find(l => l.id === cur), k = lecs.indexOf(L), prev = lecs[k - 1], next = lecs[k + 1];
      const tabs = lecs.map(l => '<a class="chip' + (l.id === cur ? ' acc' : '') + '" href="#exercises/x-' + l.id + '" title="Lecture ' + l.no + ': ' + esc(l.title) + '">L' + l.no + ' <span class="muted">(' + (GT.exStat ? GT.exStat.counts(l.id).solved + '/' : '') + xs.filter(x => x.lec === l.id).length + ')</span></a>').join(' ');
      const nOff = xs.filter(x => !x.extra).length, nExtra = xs.length - nOff;
      const items = xs.filter(x => x.lec === cur);
      const body = '<h2 id="x-' + cur + '">Lecture ' + L.no + ': ' + L.title + '</h2><p class="small muted">' + items.filter(x => !x.extra).length + ' sheet questions, ' + items.filter(x => x.extra).length + ' extra problems · <a href="#' + cur + '">Open Lecture ' + L.no + '</a></p>' +
        items.map(x => '<section class="exitem" id="' + x.id + '"><h3>' + x.t + ' <span data-exbadge="' + x.id + '">' + GT.exBadge(x.id) + '</span></h3><p class="exsrc">' + chips(x) + '</p>' + x.body + GT.exStatusBar(x.id) + '</section>').join('') +
        '<div class="pager">' + (prev ? '<a href="#exercises/x-' + prev.id + '"><span class="eyebrow">Previous</span>L' + prev.no + ' ' + prev.title + '</a>' : '<span></span>') + (next ? '<a href="#exercises/x-' + next.id + '" style="text-align:right"><span class="eyebrow">Next</span>L' + next.no + ' ' + next.title + '</a>' : '<span></span>') + '</div>';
      return '<p class="eyebrow">Practise</p><h1>Exercises, solved step by step</h1>' +
        '<p>All ' + nOff + ' questions from the exercise sheets of four winter terms (2023/24 to 2026/27), plus ' + nExtra + ' extra practice problems, ordered by lecture. Questions that appear on several sheets are shown once, with every sheet listed. The exam contains questions "close to the exercises": write your own answer on paper first, then open the steps one by one.</p>' +
        box('tip', '<p>Bonus point: submitting 3 solution attempts (2 if you presented in class) improves the final grade by 0.3 and can rescue a fail by 1-2 points. Attempts need not be correct, but must show you applied the lecture.</p>') +
        '<p class="readout small" id="ex-sum">' + GT.exSummary() + '</p>' +
        '<p class="small">Want a random set under exam conditions? <a href="#extest">Start an exercise test</a>.</p>' +
        '<p class="extabs"><strong>Lecture:</strong> ' + tabs + ' <span class="small muted">(solved / total)</span></p>' +
        sol('Find a question by exercise sheet', '<div class="tbl"><table><tr><th>Term</th><th>Sheet</th><th>Questions</th></tr>' + finder + '</table></div>') +
        body;
    },
  };
})();

bank('l5', [
  { q: 'In the stag hunt (S,S) = (10,10), (S,H) = (0,7), (H,S) = (7,0), (H,H) = (6,6), which equilibrium is risk dominant?', o: ['(H, H)', '(S, S)', 'Neither, both are equally risky', 'The mixed equilibrium'], a: 0, e: 'Deviation losses: 10 - 7 = 3 at (S,S), 6 - 0 = 6 at (H,H). The larger loss belongs to (H,H), so it is risk dominant; S is a best response only if the partner plays S with probability at least 2/3.' },
  { q: 'Which Nash equilibria does trembling-hand perfection eliminate in two-player games?', o: ['Those in weakly dominated strategies', 'All mixed equilibria', 'Pareto-dominated equilibria', 'Equilibria that are not risk dominant'], a: 0, e: 'With a small probability of mistakes, a weakly dominated strategy becomes strictly worse.' },
  { q: 'Odd couple: what can go wrong with eliminating weakly dominated strategies?', o: ['It can delete Nash equilibria and depend on the order of elimination', 'It never terminates', 'It always leaves all Nash equilibria', 'It eliminates strictly dominant strategies'], a: 0, e: 'In the odd couple, weak elimination leaves only (9,3), although (3,9) and (6,6) are also Nash equilibria.' },
  { q: 'A strict Nash equilibrium is always...', o: ['trembling-hand perfect', 'Pareto dominant', 'risk dominant', 'unique'], a: 0, e: 'Each strategy is the unique best response, so it stays a best response against small trembles.' },
]);


GT.mocks.push({ id: 'm6', title: 'Mock exam F (60 min, 30 points)', qs: [
  { pts: 10, q: H`<p><strong>Question 1 (mixed strategies).</strong> Two drivers approach a narrow bridge. Each can drive on (A) or wait (B).</p>
${mx({ rows: ['A', 'B'], cols: ['A', 'B'], cells: [['0,0', '4,1'], ['1,4', '2,2']] })}
<p>a) Find all pure-strategy Nash equilibria. (2p) b) Find the mixed-strategy Nash equilibrium. (4p) c) Compute the expected payoffs in the mixed equilibrium and compare them with (B, B). (2p) d) Is one of the pure equilibria Pareto dominant? Explain. (2p)</p>`,
    a: H`<ol type="a"><li>(2p) (A, B) with (4,1) and (B, A) with (1,4): against A the best reply is B (1 > 0), against B it is A (4 > 2).</li>
<li>(4p) Let the other driver play A with probability \(q\). A gives \(0\cdot q+4(1-q)\), B gives \(1\cdot q+2(1-q)=2-q\). Indifference: \(4-4q=2-q\iff q=\tfrac23\). By symmetry both play A with \(\tfrac23\) and B with \(\tfrac13\).</li>
<li>(2p) Expected payoff \(4(1-\tfrac23)=\tfrac43\) each, less than 2 in (B, B), which is not an equilibrium (each would drive on: 4 > 2). Coordination failure: with probability \(\tfrac49\) both drive on and get 0.</li>
<li>(2p) No: (4,1) and (1,4) cannot be ranked by Pareto, each player prefers a different one. It is a Chicken game; selection needs conventions (e.g. right of way) or commitment.</li></ol>` },
  { pts: 10, q: H`<p><strong>Question 2 (subgame perfection).</strong> Player 1 chooses Out, giving (1, 5), or In. After In, both players simultaneously choose C or F: (C,C) = (3,3), (C,F) = (−1,4), (F,C) = (4,−1), (F,F) = (0,0).</p>
<p>a) Draw the game tree and state the number of proper subgames. (2p) b) Write down the normal form and find all pure-strategy Nash equilibria. (4p) c) Find the subgame-perfect equilibrium. (3p) d) Why is one of the Nash equilibria not subgame perfect? (1p)</p>`,
    a: H`<ol type="a"><li>(2p) Player 1 chooses Out/In; after In, player 1 chooses C/F and player 2 chooses C/F without observing it (one information set). One proper subgame: the game after In.</li>
<li>(4p) Player 1: OutC, OutF, InC, InF; player 2: C, F. Rows OutC and OutF give (1,5) in both columns; InC: (3,3), (−1,4); InF: (4,−1), (0,0). Pure NE: (OutC, F) and (OutF, F): with F, Out gives 1 > 0 (InF) > −1 (InC); player 2 is indifferent after Out. With C, player 1 would choose InF (4).</li>
<li>(3p) The subgame is a Prisoner's Dilemma: F strictly dominates C for both, NE (F,F) with (0,0). Player 1 then compares Out (1) with In (0): Out. SPE: player 1 (Out, F), player 2 F; outcome (1,5).</li>
<li>(1p) (OutC, F) prescribes C in the subgame, which is not a best response to F there (0 > −1): it is not a Nash equilibrium of the subgame.</li></ol>` },
  { pts: 10, q: H`<p><strong>Question 3 (limited liability).</strong> A risk-neutral principal hires a risk-neutral agent. Output \(Q=e+u\) with \(E[u]=0\); effort cost \(0.5e^2\); linear contract \(w=s+rQ\); the agent's outside option is 0.</p>
<p>a) Find the optimal contract if \(s\) is unrestricted. (2p) b) Why is this contract impossible if the agent is protected by limited liability, \(s\ge0\)? (1p) c) Find the optimal contract, effort and profit with \(s\ge0\). (4p) d) Compute the agent's rent and explain why effort is below the first best. (3p)</p>`,
    a: H`<ol type="a"><li>(2p) The agent chooses \(e=r\). With a binding participation constraint \(s=-0.5r^2\), the principal maximises \(r-0.5r^2\Rightarrow r=1\), \(e=1\), \(s=-0.5\) (the agent pays a fee, "selling the firm"); profit 0.5.</li>
<li>(1p) It requires \(s=-0.5< 0\): the agent would have to pay the principal, which limited liability forbids.</li>
<li>(4p) With \(s\ge0\) the participation constraint \(s+0.5r^2\ge0\) is slack, so \(s=0\). The principal maximises \(E[Q]-E[w]=r-r^2\Rightarrow r=\tfrac12\), \(e=\tfrac12\); profit \(\tfrac14\).</li>
<li>(3p) The agent gets \(0.5r^2=\tfrac18>0\) = his outside option + rent \(\tfrac18\). Every increase of \(r\) raises effort but also the rent paid on all units of output; the principal trades off efficiency against rent extraction and stops at \(r=\tfrac12< 1\).</li></ol>` },
] });
