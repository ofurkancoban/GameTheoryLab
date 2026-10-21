/* Lectures 11-14: games with incomplete information. */
(function () {
  const nd = (p, ch, o) => Object.assign({ p, ch }, o || {});
  const tm = (...pay) => ({ pay });
  tree('l11harsanyi', nd('N', [
    ['high cost (p)', nd(1, [['I', nd(2, [['E', tm(0, -1)], ['nE', tm(2, 0)]], { info: 'h' })], ['nI', nd(2, [['E', tm(2, 1)], ['nE', tm(3, 0)]], { info: 'h' })]]), 'p'],
    ['low cost (1-p)', nd(1, [['I', nd(2, [['E', tm(3, -1)], ['nE', tm(5, 0)]], { info: 'h' })], ['nI', nd(2, [['E', tm(2, 1)], ['nE', tm(3, 0)]], { info: 'h' })]]), '1-p']]));
  tree('l13ex1', nd(1, [['L', nd(2, [["L'", tm(2, 1)], ["R'", tm(0, 0)]], { info: 'h', belief: 'p' })], ['M', nd(2, [["L'", tm(0, 2)], ["R'", tm(0, 1)]], { info: 'h', belief: '1-p' })], ['R', tm(1, 3)]]));
  tree('l13ex2', nd(1, [['L', nd(2, [["L'", tm(3, 1)], ["R'", tm(0, 0)]], { info: 'h', belief: 'p' })], ['M', nd(2, [["L'", tm(1, 0)], ["R'", tm(0, 1)]], { info: 'h', belief: '1-p' })], ['R', tm(2, 2)]]));
  tree('l13ex3', nd(1, [['A', tm(2, 0, 0)], ['D', nd(2, [['L', nd(3, [["L'", tm(1, 2, 1)], ["R'", tm(3, 3, 3)]], { info: 'h', belief: 'p' })], ['R', nd(3, [["L'", tm(0, 1, 2)], ["R'", tm(0, 1, 1)]], { info: 'h', belief: '1-p' })]])]]));
  tree('l14job', nd('N', [
    ['High (1/3)', nd('W', [['N', nd('F', [["M'", tm(10, 10)], ["C'", tm(4, 4)]], { info: 'n', belief: 'p' })], ['E', nd('F', [['M', tm(6, 10)], ['C', tm(0, 4)]], { info: 'e', belief: 'q' })]]), '1/3'],
    ['Low (2/3)', nd('W', [["E'", nd('F', [['M', tm(3, 0)], ['C', tm(-3, 4)]], { info: 'e', belief: '1-q' })], ["N'", nd('F', [["M'", tm(10, 0)], ["C'", tm(4, 4)]], { info: 'n', belief: '1-p' })]]), '2/3']]));
})();

lesson({
  id: 'l11', no: 11, part: 'III. Static games, incomplete information', title: 'Static games with incomplete information (Bayesian games)',
  read: 'Gibbons ch. 3 · Tadelis ch. 12 · Carpenter and Robbett ch. 11',
  goals: [
    'Model incomplete information with types and beliefs',
    'Use Harsanyi\'s trick: turn incomplete into imperfect information with a move of Nature',
    'Write the normal form of a static Bayesian game \\(G=\\{I;A_i;T_i;p_i;u_i\\}\\)',
    'Understand a strategy as a function of one\'s own type and define Bayesian Nash equilibrium',
    'Solve the Bayesian entry game and the adverse-selection (orange grove) model',
  ],
  html: H`
<h2 id="s1">1. What is incomplete information?</h2>
<p>Static games with incomplete information are also called <strong>static Bayesian games</strong>: at least one player is unsure about the payoff function of another player.</p>
<ul><li>A bidder does not know the other bidders' valuations</li><li>Cournot duopoly with asymmetric information about costs</li><li>A poker player does not know the others' cards</li><li>Entry game with private information about capacity-expansion costs</li></ul>
<p>We model this by (1) saying a player may be one of several possible <strong>types</strong>, (2) forming <strong>beliefs</strong> about what each type would do, and (3) maximising <strong>expected payoffs</strong> based on these beliefs.</p>

<h2 id="s2">2. Introductory example: market entry with an unknown cost</h2>
<p>Player 1 (the incumbent monopolist) decides whether to build a new factory (I) or not (nI); player 2 decides whether to enter (E) or not (nE). Player 1 knows his expansion cost; player 2 only knows it is 3 or 0 and believes "high cost" has probability \(p\) (this belief is common knowledge).</p>
<div class="wgrid"><div>${mx({ p1: 'P1 high cost', p2: 'Player 2', rows: ['I', 'nI'], cols: ['E', 'nE'], cells: [['0,-1', '2,0'], ['2,1', '3,0']], cap: 'belief p' })}</div><div>${mx({ p1: 'P1 low cost', p2: 'Player 2', rows: ['I', 'nI'], cols: ['E', 'nE'], cells: [['3,-1', '5,0'], ['2,1', '3,0']], cap: 'belief 1-p' })}</div></div>
<h3>Harsanyi's trick</h3>
<p>Convert the game of incomplete information into a game of <strong>imperfect</strong> information by adding a player, "Nature". Timing of a static game with incomplete information:</p>
<ol><li>Nature draws a type vector \(t=(t_1,\dots,t_n)\), \(t_i\in T_i\), according to a probability distribution that is common knowledge.</li>
<li>Player \(i\) learns his own type \(t_i\), but not the others'.</li>
<li>Players choose actions \(a_i\in A_i\) simultaneously.</li>
<li>Payoffs \(u_i(a_1,\dots,a_n;t_i)\) are realised.</li></ol>
${tree('l11harsanyi')}
${steps('Solve the entry game', [
'Player 1 has a dominant strategy for each type. High cost: nI (2>0, 3>2). Low cost: I (3>2, 5>3).',
'Player 2 knows these dominant strategies, so it expects: high type plays nI, low type plays I.',
H`\(E_2[\pi_2\mid E]=p\cdot 1+(1-p)\cdot(-1)=2p-1\) (against nI entering gives 1, against I it gives \(-1\)). \(E_2[\pi_2\mid nE]=0\).`,
H`Player 2 enters if \(2p-1>0\iff p>\tfrac12\); indifferent at \(p=\tfrac12\).`,
H`Bayesian Nash equilibrium: \(s_1(\text{high})=nI,\ s_1(\text{low})=I\); \(s_2=E\) if \(p>\tfrac12\), \(nE\) if \(p< \tfrac12\).`])}
${W('bayes-entry')}

<h2 id="s3">3. Normal-form representation</h2>
<p>Recall: a static game is \(G=\{I;S_i;u_i\}\); with one action per strategy also \(G=\{I;A_i;u_i\}\). Now player \(i\)'s private information is summarised by his <strong>type</strong> \(t_i\in T_i\) (type space). Each type has a different payoff function \(u_i(a_1,\dots,a_n;t_i)\). In the example: high- and low-cost type of player 1; only one type of player 2 (his payoffs are the same in both matrices).</p>
${box('def', H`<p>The normal form of a static Bayesian game consists of</p><ol><li>the set of players,</li><li>the action sets \(A_1,\dots,A_n\),</li><li>the type spaces \(T_1,\dots,T_n\),</li><li>the beliefs \(p_1,\dots,p_n\),</li><li>the payoff functions \(u_1,\dots,u_n\).</li></ol><p>Briefly \(G=\{I;A_i;T_i;p_i;u_i\}\).</p>`)}
${box('def', H`<p>A <strong>strategy</strong> \(s_i\) of player \(i\) is a function \(s_i(t_i)\) that prescribes an action \(a_i\in A_i\) for each possible type \(t_i\in T_i\).</p>`, 'A new concept of strategy')}
<div class="tbl"><table><tr><th>Game class</th><th>What a strategy is</th></tr>
<tr><td>Static, complete information</td><td>Strategy = action</td></tr>
<tr><td>Dynamic, complete information</td><td>An action for every possible history (every information set)</td></tr>
<tr><td>Static, incomplete information</td><td>An action for every own type</td></tr></table></div>
${box('def', H`<p>In \(G=\{I;A_i;T_i;p_i;u_i\}\), the strategy profile \(s^*=(s_1^*,\dots,s_n^*)\) is a <strong>Bayesian Nash equilibrium</strong> if for every player \(i\) and every type \(t_i\in T_i\), \(s_i^*(t_i)\) solves
\[\max_{a_i\in A_i}\ \sum_{t_{-i}\in T_{-i}}p_i(t_{-i}\mid t_i)\,u_i\big(s_1^*(t_1),\dots,s_{i-1}^*(t_{i-1}),a_i,s_{i+1}^*(t_{i+1}),\dots,s_n^*(t_n);t_i\big).\]
Each type of each player maximises his expected payoff; no type wants to change its action.</p>`)}
${box('en', '<p>A strategy profile is a Bayesian Nash equilibrium if, for every player i and every type t_i, the action s_i*(t_i) maximises i\'s expected payoff given his beliefs about the others\' types and the others\' equilibrium strategies.</p>')}
${box('thm', '<p><strong>Existence:</strong> every static game with incomplete information in which the type sets and the action sets are finite has a Bayesian Nash equilibrium, possibly in mixed strategies.</p>')}
${box('warn', '<p>Always specify the action of <strong>every type</strong>, including types that are unlikely. "Player 1 does not invest" is not a strategy if player 1 has two types; "high type nI, low type I" is.</p>')}

<h2 id="s4">4. Inefficient trade and adverse selection (Tadelis pp. 258)</h2>
<p>Competitive markets allocate goods to those who value them most, assuming perfect information about value. With incomplete information the market outcome is often inefficient.</p>
<ul><li>Player 1 owns an orange grove; the yield depends on soil quality: private information.</li>
<li>Common knowledge: quality is low, mediocre or high with probability \(\tfrac13\) each.</li>
<li>For each quality, player 2's valuation exceeds player 1's (trade is always efficient).</li>
<li>Static pricing: simultaneously player 2 names a price and player 1 states which prices he accepts (A) or rejects (R).</li></ul>
${box('def', H`<ol><li>Players \(\{1,2\}\); 2. actions \(A_2=\{p\ge0\}\), \(A_1=\{A,R\}\); 3. type space \(\Theta_1=\{L,M,H\}\); 4. beliefs \(p_2(L)=p_2(M)=p_2(H)=\tfrac13\);</li>
<li>payoffs: \(v_1(\theta_1)=10, 20, 30\) and \(v_2(\theta_1)=14, 24, 34\) for \(L, M, H\).</li></ol>
<p>Strategy of player 2: a price \(p\ge0\). Strategy of player 1: \(s_1:[0,\infty)\times\Theta_1\to\{A,R\}\), a response for each price and type.</p>`, 'The Bayesian game')}
${steps('The unravelling argument', [
'Efficient outcome: the grove is always traded (this would happen with complete information).',
H`Player 2 should not offer more than his expected value \(\tfrac13(14+24+34)=24\). But type \(H\) (value 30) does not sell at 24.`,
H`Anticipating this, only \(L\) and \(M\) sell at prices in \([20,30)\); their expected value to player 2 is \(\tfrac12(14+24)=19<20\). So he offers no more than 19. But then type \(M\) (value 20) does not sell either.`,
H`Only \(L\) sells; its value to player 2 is 14. So player 2 offers no more than 14.`,
H`<strong>Result:</strong> in a BNE only the lowest type trades. Any price \(p^*\in[10,14]\) can be supported as a BNE.`])}
${steps('Why any p* in [10,14]? (proof of the last sentence)', [
H`Player 2's strategy: offer \(p^*\in[10,14]\).`,
H`Player 1's strategy: type \(L\) accepts iff \(p\ge p^*\); type \(M\) accepts iff \(p\ge20\); type \(H\) accepts iff \(p\ge30\).`,
H`Player 1 best-responds: at the price actually offered, \(p^*\), type L gains \(p^*-10\ge0\) by selling and M, H would lose by selling. (In a static game, L's responses to other prices do not affect his payoff.)`,
H`Player 2 best-responds: below \(p^*\) nobody sells (payoff 0); at \(p^*\) he gets \(\tfrac13(14-p^*)\ge0\); between \(p^*\) and 20 only L sells at a higher price; at \(p\in[20,30)\) he gets \(\tfrac13(14-p)+\tfrac13(24-p)<0\); at \(p\ge 30\) even worse. So \(p^*\) is optimal. Mutual best responses: a BNE.`,
'We have <strong>adverse selection</strong>: only the lowest quality is traded.'])}
${W('lemons')}
${box('def', '<p>This is a game with <strong>common values</strong>: the type of one player affects the payoffs of another. This feature causes adverse selection. Important application: insurance markets (the insurer does not know the risk type; low-risk types may not be insured). Government can partly correct this market failure by making insurance obligatory (health, pension, unemployment insurance).</p>', 'Remark')}

<h2 id="s5">5. Appendix: Harsanyi's purification (not relevant for the exam)</h2>
<p>Matching pennies has a unique mixed equilibrium (each plays Heads with 0.5). Critique: players are indifferent, yet prescribed to randomise in a precise way. Perturbed game: player \(i\) gets an extra \(\varepsilon_i\) for Heads (player 1 in (H,H) and (H,T); player 2 in (H,H) and (T,H)), where \(\varepsilon_i\) is private information, independently uniform on \([-\varepsilon,\varepsilon]\).</p>
<p>Unique pure BNE: \(s_i(\varepsilon_i)=H\) iff \(\varepsilon_i\ge0\). Each type plays a pure strategy, but since half of the types play H, the opponent faces what looks like a 50:50 mixture. As \(\varepsilon\to0\), outcomes and payoffs converge to the mixed equilibrium. Mixed equilibria of simple complete-information games can be seen as solutions of richer games with a bit of private information; the game is played once, but by randomly drawn types.</p>
${quiz('q-l11', [
 { q: 'In a static Bayesian game a strategy is...', o: ['an action', 'a function from own type to an action', 'a belief', 'a function from others\' types to actions'], a: 1, e: 'Each type of the player must have a prescribed action.' },
 { q: 'Entry game: p = 0.4 (high cost). What does player 2 do?', o: ['Enter', 'Stay out', 'Indifferent', 'Mixes 40/60'], a: 1, e: '2p-1 = -0.2 < 0: staying out (0) is better.' },
 { q: 'Harsanyi\'s trick turns incomplete information into...', o: ['complete information', 'imperfect information with a move of Nature', 'perfect information', 'a repeated game'], a: 1, e: 'Nature draws the types first.' },
 { q: 'Orange grove: what happens if player 2 offers 19?', o: ['L and M sell', 'Only L sells', 'All sell', 'Nobody sells'], a: 1, e: 'M needs at least 20.' },
 { q: 'Which feature causes adverse selection in the orange grove model?', o: ['Private values', 'Common values: the seller\'s type affects the buyer\'s payoff', 'Risk aversion', 'Discounting'], a: 1, e: 'Remark on the slides.' },
])}
`});

lesson({
  id: 'l12', no: 12, part: 'III. Static games, incomplete information', title: 'Auctions',
  read: 'Tadelis ch. 13 · Watson (2013) ch. 27',
  goals: [
    'Know the four standard auction formats (English, Dutch, first-price, second-price sealed bid)',
    'Derive the BNE bid b = v/2 in the first-price auction with two uniform bidders',
    'Prove that truthful bidding is weakly dominant in the second-price auction',
    'Explain the button auction, eBay, and strategic equivalence of Dutch and first-price auctions',
    'State the revenue equivalence theorem and its four conditions',
    'Apply Bayes\' rule (dice, Monty Hall) and explain the winner\'s curse with common values',
  ],
  html: H`
<h2 id="s1">1. Why auctions?</h2>
<p>In the orange-grove example the <em>seller</em> had private information (adverse selection). In other markets <em>buyers</em> have private information about their willingness to pay; the seller wants to find the buyer with the highest WTP, and an auction does that.</p>
<ul><li><strong>History:</strong> Herodotus reports annual auctions of women for marriage in Babylon around 500 BC, often named as the first auction; it is disputed whether (i) he has been translated correctly and (ii) he attributes to the Babylonians a custom that was not theirs but looks Greek. Rome auctioned war booty; in 193 AD (the slide says 193 BC, but the event dates from 193 AD) the entire Roman Empire was auctioned off by the Praetorian Guards after they killed the Roman Emperor Pertinax: Didius Julianus won with 6,250 drachmas per guard and was beheaded two months later when Septimius Severus took Rome.</li>
<li><strong>Today:</strong> paintings and antiques at prestigious auction houses such as Sotheby's (1744) and Christie's (1766), eBay (used by over 100 million households worldwide), procurement of goods and services by private and public entities, oil and gas, airport landing rights, overbooked seats, business-class upgrades (<a href="https://www.lufthansa.com/pe/en/bid-upgrade">Lufthansa bid upgrade</a>), renewable-energy tenders where the lowest subsidy wins (<a href="https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/Ausschreibungen/start.html">German Federal Network Agency</a>), Google ads, spectrum.</li>
<li><strong>3G/UMTS spectrum auctions (2000):</strong> licences for mobile telecommunication with transmission rates up to 200 times faster than the GSM standard. Germany €50.8 billion, UK €37.5 billion, much lower revenues in other countries such as the Netherlands and Italy.</li>
<li><strong>Public procurement</strong> favours auctions: transparent, well-defined rules, usually allocate to the party valuing the good most, hard to manipulate if well designed.</li></ul>

<h2 id="s2">2. Types of auctions</h2>
<div class="tbl"><table><tr><th>Format</th><th>Rules</th></tr>
<tr><td>English (open, ascending)</td><td>(As in the film <em>The Red Violin</em>.) Start at a reserve price, the lowest price at which the seller parts with the good; bidders successively bid higher; when nobody raises, the highest bidder wins and pays his bid.</td></tr>
<tr><td>Dutch (open, descending)</td><td>The auctioneer (often a mechanical clock) starts high and lowers the price until someone buys. Very fast, one of its chief virtues (Dutch flower and cheese markets; the slides link a video of a flower clock auction).</td></tr>
<tr><td>First-price sealed bid</td><td>Sealed bids opened simultaneously; highest bidder wins and pays <strong>his own bid</strong>. Mirror image: the reverse (procurement) auction. Governments and firms publish plans and specifications for e.g. a building or a highway with a request for bids; each potential builder submits a sealed bid, and the lowest bidder wins and receives its bid on completion.</td></tr>
<tr><td>Second-price sealed bid (Vickrey)</td><td>Highest bidder wins and pays the <strong>second-highest bid</strong>.</td></tr></table></div>
<p>Auctions are Bayesian games: players = bidders, actions = bids, payoffs depend on winning and the price; bidders usually do not know the others' valuations.</p>

<h2 id="s3">3. First-price sealed-bid auction</h2>
<p>A seller owns a painting worth nothing to her. Two bidders with valuations (types) \(v_1,v_2\), drawn independently, uniform on \([0,1000]\). Each knows his own value; the seller knows only the distribution. Bids \(b_1,b_2\) simultaneously; the highest bidder wins and pays his bid \(x\).</p>
<p><strong>Strategy for finding the BNE:</strong> guess the form of the equilibrium strategy, then verify it. Candidate: each bids a fraction \(a\) of his value, \(b_i=av_i\).</p>
${box('intu', '<p>The trade-off: a lower bid \\(x\\) <strong>raises</strong> the surplus if you win, \\(v_i-x\\), but <strong>lowers</strong> the probability of winning.</p>')}
${steps('Derive the equilibrium bid', [
H`Given \(i\)'s guess that \(b_j=av_j\), bidding \(x\) wins if \(x>av_j\iff v_j< \dfrac{x}{a}\).`,
H`With \(v_j\) uniform on \([0,1000]\) (density \(\tfrac{1}{1000}\)): \(\Pr\Big[v_j< \dfrac xa\Big]=\dfrac{x}{a}\cdot\dfrac{1}{1000}=\dfrac{x}{1000a}\).`,
H`Expected payoff = probability of winning × surplus: \(\dfrac{(v_i-x)\,x}{1000a}\).`,
H`Maximise: \(\max_x\dfrac{(v_i-x)x}{1000a}\). FOC: \(\dfrac{v_i-2x}{1000a}=0\Rightarrow x=0.5v_i\).`,
H`This has the assumed form \(b_i=av_i\) with \(a=0.5\): the guess is confirmed. BNE: each bids half his valuation, \(b_i=v_i/2\).`])}
${W('fpa')}
${box('def', H`<p>With \(n\) bidders whose types are drawn from the same cdf \(F\) on \([\underline\theta,\bar\theta]\), the symmetric BNE bid function is
\[s(\theta)=\theta-\frac{\int_{\underline\theta}^{\theta}F(x)^{n-1}dx}{F(\theta)^{n-1}}.\]
Again bidders shade their bids below their valuation. Uniform on \([0,1]\): \(s(\theta)=\theta-\dfrac{\theta^n/n}{\theta^{n-1}}=\dfrac{n-1}{n}\theta\) (for \(n=2\): \(\theta/2\)).</p>`, 'Generalisation (Tadelis pp. 276)')}
<h3>Dutch auction</h3>
<p>The price drops continuously; each bidder decides at which price to jump in. Waiting lowers the price but also the chance of winning. The Dutch and first-price sealed-bid auctions are <strong>strategically equivalent</strong>: they have the same normal form and hence the same set of BNE. The sealed bid is like the acceptance price in the Dutch auction.</p>

<h2 id="s4">4. Revenue: first vs. second price</h2>
${steps('Same expected revenue in the example', [
'First-price auction: bidders bid half their valuation; the outcome is efficient (the highest valuation wins). Revenue = \\(v_{\\max}/2\\).',
H`Second-price auction (truthful bids): let 1 be the winner. The price is the second-highest bid, which on average equals \(E[v_2\mid v_2< v_1]=0.5v_1\).`,
H`So both auctions yield the same expected revenue. (Numbers: \(E[\max]=\tfrac23\cdot1000\), revenue \(\tfrac13\cdot1000\approx 333\) in both.)`])}

<h2 id="s5">5. Second-price sealed-bid auction in general</h2>
<p>\(n\) bidders, bid \(b_i\ge0\), private valuation \(\theta_i\in[\underline\theta_i,\bar\theta_i]\). Payoff: \(\theta_i-b_j^*\) if \(b_i>b_j\) for all \(j\ne i\), where \(b_j^*=\max_{j\ne i}b_j\); 0 if \(b_i\le b_j\) for some \(j\). A strategy is \(s_i:[\underline\theta_i,\bar\theta_i]\to\mathbb R_+\).</p>
${box('thm', H`<p>In the second-price sealed-bid auction each player has a weakly dominant strategy: bid his true valuation, \(s_i(\theta_i)=\theta_i\). This is a BNE in weakly dominant strategies.</p>`, 'Proposition')}
${steps('Proof: bidding below the value (b_i < θ_i) is never better', [
H`Case 1: \(i\) is the highest bidder (all others in region L, below \(b_i\)). Bidding \(\theta_i\) is as good: \(i\) still wins and pays the same second-highest bid.`,
H`Case 2: the highest rival bid \(b_j^*>\theta_i\) (region H). Bidding \(\theta_i\) is as good: \(i\) still loses.`,
H`Case 3: \(b_j^*\in[b_i,\theta_i]\) (region M). \(i\) loses, but bidding \(\theta_i\) would win with payoff \(\theta_i-b_j^*\ge0\), strictly positive unless \(b_j^*=\theta_i\).`,
'Bidding above the value follows the same lines (there you risk winning at a price above your value).'])}
${W('spa-proof')}
<ul><li>The result holds even if players have no idea about the opponents' valuations (not true for first-price auctions), and even if types are correlated. For the other auctions we need <strong>independent private values (IPV)</strong>.</li><li>The outcome is efficient.</li></ul>

<h2 id="s6">6. English auction, button auction and eBay</h2>
<p>Mathematical problem: without discrete increments a bidder with \(p< \theta_i\) has no best response (a smaller increment is always better). Solution: the <strong>button auction</strong>. The auctioneer continuously raises \(p\) from 0; holding the button means "I would pay \(p\) if everyone else dropped out now"; releasing it means dropping out for good; the last bidder holding wins and pays the price at which the second-to-last let go. It is very close to the English auction: there the auctioneer cries "Do I hear $(p + k)?" at the current price p; in the button auction this happens automatically with an infinitesimally small increment k.</p>
${box('thm', H`<p>In the button auction it is weakly dominant to hold the button while \(p< \theta_i\) and release at \(p=\theta_i\). Case 1 (\(p< \theta_i\)): leaving could forgo winning at a price below value. Case 2 (\(p=\theta_i\)): staying could mean winning at a price above value. The outcome equals the second-price auction: the highest valuation wins and pays the second-highest valuation.</p>`, 'Proposition')}
<p><strong>eBay</strong> works like a button auction: you state the maximum and eBay presses the button for you; you pay the price when the last competitor dropped out plus a small increment. eBay advises: "enter the maximum amount you are willing to pay".</p>

<h2 id="s7">7. Revenue equivalence theorem</h2>
${box('thm', '<p>Any auction that satisfies the following four conditions yields the seller the same expected revenue and each bidder type the same expected payoff:<ol><li>each bidder\'s type is drawn from a "well-behaved" distribution (strictly increasing and continuous cdf),</li><li>bidders are risk neutral,</li><li>the bidder with the highest type wins,</li><li>the bidder with the lowest possible type has an expected payoff of zero.</li></ol></p>')}
${box('tip', '<p>The 2014 exam asked "What does the revenue equivalence theorem say?" (2 points). State the result (same expected revenue for the seller, same expected payoff for each type) and the conditions.</p>')}

<h2 id="s8">8. Common values, Bayes' rule and the winner's curse</h2>
<p>So far <strong>private values</strong>: my payoff does not depend on others' types. Now <strong>common values</strong>: e.g. a house's value includes what you can sell it for later; others may have information about it, and their types affect your payoff (also art, cars, a Rolex).</p>
<p>With common values types are correlated: learning your own type tells you something about the others'. Posterior belief via Bayes' rule: \(\Pr_i(\theta_j\mid\theta_i)=\dfrac{\Pr(\theta_j,\theta_i)}{\Pr(\theta_i)}\), all players starting from the same prior.</p>
${box('def', H`\[\Pr(E\mid F)=\frac{\Pr(E,F)}{\Pr(F)}=\frac{\Pr(F\mid E)\Pr(E)}{\Pr(F)}\]
<p>Dice: \(E\) = "shows 2", \(F\) = "shows an even number": \(\Pr(E\mid F)=\dfrac{1/6}{1/2}=\dfrac13\), or \(\dfrac{\Pr(\text{even}\mid2)\Pr(2)}{\Pr(\text{even})}=\dfrac{1\cdot1/6}{1/2}=\dfrac13\).</p>`, "Bayes' rule")}
<p>In class the game is played live: two doors hide a goat, one a car; the lecturer writes the car's door on the back of the blackboard, a student picks a door, the lecturer opens another door with a goat and asks whether the student wants to switch. The slides then use the scene from the film ("21") in which Ben picks door A and the host Kevin opens door C.</p>
${steps('Monty Hall: Ben picks A, Kevin opens C (a goat). Switch?', [
H`Priors: \(\Pr(A)=\Pr(B)=\Pr(C)=\tfrac13\) for the car.`,
H`Kevin knows where the car is and cannot open A (Ben's door) or the car door. \(\Pr(\text{opens }C\mid A)=\tfrac12\), \(\Pr(\text{opens }C\mid B)=1\), \(\Pr(\text{opens }C\mid C)=0\).`,
H`\(\Pr(\text{opens }C)=\tfrac13\cdot\tfrac12+\tfrac13\cdot1+\tfrac13\cdot0=\tfrac12\).`,
H`\(\Pr(A\mid\text{opens }C)=\dfrac{\tfrac12\cdot\tfrac13}{\tfrac12}=\tfrac13\), so \(\Pr(B\mid\text{opens }C)=\tfrac23\). <strong>Switch!</strong>`])}
${W('monty')}
<h3>The winner's curse: pure common values</h3>
<p>Two identical oil firms bid for an oil field worth \(v\in\{10,20,30\}\) (million €) to both, with \(\Pr(10)=\Pr(30)=\tfrac14\), \(\Pr(20)=\tfrac12\); second-price sealed-bid auction. Each firm's free exploration gives a signal \(\theta_i\in\{L,H\}\): \(v=10\Rightarrow LL\); \(v=30\Rightarrow HH\); \(v=20\Rightarrow LH\) or \(HL\) with equal probability. So \(\Pr(LL)=\Pr(LH)=\Pr(HL)=\Pr(HH)=\tfrac14\).</p>
${steps('Is bidding the expected value a BNE?', [
H`If \(\theta_i=L\), then \(v\in\{10,20\}\): \(\Pr(v=10\mid L)=\dfrac{1/4}{1/2}=\tfrac12=\Pr(v=20\mid L)\). So \(E[v\mid L]=15\); similarly \(E[v\mid H]=25\).`,
H`Candidate: \(s_i(\theta_i)=E[v\mid\theta_i]\), i.e. bid 15 with L and 25 with H.`,
H`With \(\theta_i=L\): \(\Pr(\theta_j=L\mid\theta_i=L)=\dfrac{1/4}{1/2}=\tfrac12\). Then \(j\) also bids 15, a coin decides, the price is 15, and \(v=10\).`,
H`With probability \(\tfrac12\), \(\theta_j=H\): \(j\) bids 25 and \(i\) loses (payoff 0).`,
H`Expected payoff: \(\tfrac12\cdot\tfrac12\cdot(10-15)+\tfrac12\cdot0=-1.25<0\). Bidding 0 is better, so this is not a best response.`,
'This is the <strong>winner\'s curse</strong>: you win when your signal is the most optimistic, so you have overestimated the value and overpay unless you condition on winning. In a BNE, bids must take into account that winning means everyone else\'s signal was lower. Be careful when bidding for a house or a painting.'])}
${W('wcurse')}
${quiz('q-l12', [
 { q: 'Two bidders, values uniform on [0,100], first-price: optimal bid with v = 80?', o: ['80', '40', '60', '53.3'], a: 1, e: 'b = v/2.' },
 { q: 'Three bidders, values uniform on [0,1], first-price: bid function?', o: ['θ/2', '2θ/3', 'θ/3', 'θ'], a: 1, e: '(n-1)θ/n = 2θ/3.' },
 { q: 'Which auction is strategically equivalent to the first-price sealed-bid auction?', o: ['English', 'Dutch', 'Second-price', 'Button'], a: 1, e: 'Same normal form.' },
 { q: 'Which is NOT a condition of revenue equivalence?', o: ['Risk-neutral bidders', 'Highest type wins', 'Lowest type gets zero expected payoff', 'Bidders bid their true value'], a: 3, e: 'In the first-price auction bidders shade their bids, yet revenue is the same.' },
 { q: 'Monty Hall: probability of winning if you switch?', o: ['1/2', '2/3', '1/3', '1'], a: 1, e: 'Bayes: Pr(B | opens C) = 2/3.' },
 { q: 'What causes the winner\'s curse?', o: ['Private values', 'Common values: winning reveals that your signal was the most optimistic', 'Risk aversion', 'A reserve price'], a: 1, e: 'Condition your bid on the event of winning.' },
])}
`});

lesson({
  id: 'l13', no: 13, part: 'IV. Dynamic games, incomplete information', title: 'Dynamic games with incomplete information: perfect Bayesian equilibrium',
  read: 'Gibbons ch. 4 · Tadelis ch. 15',
  goals: [
    'Explain why SPE is not enough when information sets contain several nodes',
    'Define a system of beliefs and on/off the equilibrium path',
    'Apply requirements 1 to 4 (and the refinement 5) step by step',
    'Distinguish weak PBE from PBE',
    'Work through the three slide examples completely',
  ],
  html: H`
<h2 id="s1">1. Motivation</h2>
<p>As with complete information, we want to eliminate equilibria based on implausible threats. We generalise subgame perfection to <strong>continuation games</strong>, which can also start at an information set with more than one node (unlike subgames). The player moving there needs a <strong>belief</strong>: a probability distribution over which node of the information set has been reached.</p>
${box('thm', '<p>The <strong>perfect Bayesian equilibrium (PBE)</strong> is consistent with: the SPE in dynamic games with complete information; the BNE in static games with incomplete information; the Nash equilibrium in static games with complete information.</p>', 'Where PBE fits')}
${box('def', H`<p>A <strong>system of beliefs</strong> \(p\) assigns a probability \(p(x)\in[0,1]\) to each decision node \(x\) such that \(\sum_{x\in H}p(x)=1\) for every information set \(H\).</p>`)}

<h2 id="s2">2. Example 1: why SPE is not enough</h2>
${tree('l13ex1')}${steps('Solution of example 1', GT.treeSol.l13ex1)}
${mx({ rows: ['L', 'M', 'R'], cols: ["L'", "R'"], cells: [['2,1', '0,0'], ['0,2', '0,1'], ['1,3', '1,3']], br: true, cap: "Pure Nash equilibria: (L, L') and (R, R')." })}
<p>There is no proper subgame (player 2's information set contains two nodes), so the whole game is the only subgame. Since \((R,R')\) is a NE of the whole game, it is also subgame perfect. But it is not sequentially rational: player 2 threatens R', yet for <strong>any</strong> belief \(p\), L' gives a higher payoff (1 > 0 at the left node, 2 > 1 at the right node).</p>
${box('def', '<p><strong>Requirement 1:</strong> at each information set, the player with the move must have a belief about which node of the information set has been reached.<br><strong>Requirement 2:</strong> strategies must be sequentially rational given the beliefs: given his beliefs, a player\'s strategy in every continuation game must be a best response to the opponents\' strategies.</p>')}
<p>In example 1, L' is dominant for player 2 at his information set, so requirements 1 and 2 eliminate \((R,R')\).</p>
<h3>Beliefs must also be reasonable</h3>
${box('def', '<p>For a given equilibrium, an information set is <strong>on the equilibrium path</strong> if it is reached with positive probability when the equilibrium strategies are played, and <strong>off the equilibrium path</strong> if it is certainly not reached.<br><strong>Requirement 3:</strong> at information sets on the equilibrium path, beliefs are determined by Bayes\' rule and the players\' equilibrium strategies.</p>')}
<p>For \((L,L')\) in example 1, player 2's belief must be \(p=1\): given player 1's strategy L, player 2 can anticipate which node is reached.</p>

<h2 id="s3">3. Example 2: new payoffs</h2>
${tree('l13ex2')}
${steps('Find all strategy-belief pairs that satisfy requirements 1 to 3', [
H`Player 2: L' gives \(p\cdot1+(1-p)\cdot0=p\); R' gives \(p\cdot0+(1-p)\cdot1=1-p\). So L' iff \(p>\tfrac12\), R' iff \(p< \tfrac12\).`,
H`Case \(p>\tfrac12\): player 2 plays L'. Player 1: L gives 3, M gives 1, R gives 2: L. Requirement 3: player 2's information set is on the path, so \(p=1\) (consistent with \(p>\tfrac12\)). Equilibrium \(((L,L'),\,p=1)\).`,
H`Case \(p< \tfrac12\): player 2 plays R'. Player 1: L gives 0, M gives 0, R gives 2: R. The information set is not reached, so requirement 3 has no bite. Equilibrium \(((R,R'),\,p< \tfrac12)\).`,
H`Two candidates satisfy 1 to 3: \(((L,L'),p=1)\) and \(((R,R'),p< \tfrac12)\).`])}
${W('pbe-ex')}
${box('def', '<p>A <strong>weak perfect Bayesian equilibrium</strong> consists of a strategy profile and a system of beliefs satisfying requirements 1 to 3. If strategies are not completely mixed, some information sets are reached with probability 0, and weak PBE allows <em>arbitrary</em> beliefs there, so often very many outcomes can be supported (like \\((R,R\'),p< \\tfrac12\\)).</p>')}
${box('def', '<p><strong>Requirement 4:</strong> at information sets off the equilibrium path, beliefs are determined by Bayes\' rule and the players\' equilibrium strategies <em>where possible</em>.<br>A <strong>perfect Bayesian equilibrium (PBE)</strong> consists of a strategy profile and a system of beliefs satisfying requirements 1 to 4.</p>')}
${box('tip', '<p>Terminology: Osborne (2009, ch. 10) calls a strategy profile plus beliefs satisfying requirements 1-3 an <em>assessment</em> that is a <strong>weak sequential equilibrium</strong>; this is the lecture\'s weak PBE. Use the lecture\'s terms in the exam.</p>', 'Other textbooks')}
${box('en', '<p>A perfect Bayesian equilibrium is a strategy profile and a system of beliefs such that (1) every player with the move has a belief at each information set, (2) strategies are sequentially rational given beliefs, (3) on the equilibrium path beliefs follow from Bayes\' rule and the equilibrium strategies, (4) off the path beliefs follow from Bayes\' rule and the equilibrium strategies where possible.</p>')}

<h2 id="s4">4. Example 3: beliefs off the equilibrium path</h2>
${tree('l13ex3')}
${steps('Weak PBE vs. PBE', [
H`One proper subgame (after D) with a unique NE \((L,R')\): (3,3) is the highest payoff for players 2 and 3. Unique SPE: \((D,L,R')\).`,
H`Unique PBE: \(((D,L,R'),p=1)\). Requirements 1 to 3 hold; requirement 4 is trivially satisfied (no information set off the path).`,
H`Another NE: \((A,L,L')\): nobody gains by deviating unilaterally (if 1 plays A, the others' moves do not matter; 1 gets 2 > 1).`,
H`\(((A,L,L'),p=0)\) is a weak PBE: requirements 1 to 3 hold, since player 3's information set is off the path and \(p=0\) makes L' optimal (2 > 1). Problem: \(p=0\) is inconsistent with player 2's strategy L.`,
H`Requirement 4: also off the path, player 3 must derive his belief from player 2's strategy: \(p=1\). With \(p=1\), player 3 must play R' (requirement 2). So \(((A,L,L'),p=0)\) violates requirement 4.`])}
<h3>What does requirement 4 imply for example 2?</h3>
<p>In example 2 there were two weak PBE: \(((L,L'),p=1)\) and \(((R,R'),p< \tfrac12)\). In the second, player 2's information set is off the path, but player 1's strategy R says nothing about the relative likelihood of L and M. Bayes' rule is not applicable, so <strong>\(((R,R'),p< \tfrac12)\) also satisfies all four requirements</strong>.</p>

<h2 id="s5">5. Refinement: requirement 5</h2>
${box('def', '<p><strong>Requirement 5:</strong> if possible, each player\'s beliefs off the equilibrium path should place zero probability on nodes that are reached only if another player plays a strategy that is strictly dominated beginning at some information set.</p>')}
${steps('Apply to ((R,R\'), p < 1/2)', [
'For player 1, M is strictly dominated by R: M yields 1 or 0, R always yields 2.',
H`So requirement 5 implies \(1-p=0\): the right node is reached only if player 1 plays his strictly dominated M.`,
H`With \(p=1\), player 2 plays L', contradicting \(p< \tfrac12\). The weak PBE \(((R,R'),p< \tfrac12)\) violates requirement 5.`,
H`Only one PBE satisfies all five requirements: \(s^*=((L,L'),p=1)\).`])}
${box('tip', '<p>Exam recipe for any PBE question: (1) for each candidate strategy profile, compute beliefs on the path with Bayes\' rule; (2) check sequential rationality of every player at every information set given beliefs; (3) for off-path information sets, state which beliefs support the equilibrium and whether requirement 4 (and 5) restricts them.</p>')}
${quiz('q-l13', [
 { q: 'What does a weak PBE allow that a PBE does not?', o: ['Arbitrary beliefs on the path', 'Beliefs off the path that are inconsistent with equilibrium strategies even where Bayes\' rule could be applied', 'Mixed strategies', 'No beliefs at all'], a: 1, e: 'Requirement 4 disciplines off-path beliefs where possible.' },
 { q: 'Example 1: why is (R, R\') unconvincing?', o: ['It is not a Nash equilibrium', 'For every belief, L\' is better for player 2', 'R is dominated', 'The game has proper subgames'], a: 1, e: 'R\' is never sequentially rational.' },
 { q: 'Example 2: for which beliefs does player 2 choose R\'?', o: ['p > 1/2', 'p < 1/2', 'p = 1', 'Any p'], a: 1, e: 'R\' gives 1-p, L\' gives p.' },
 { q: 'In example 3, why does ((A,L,L\'), p=0) violate requirement 4?', o: ['Player 3\'s belief must follow player 2\'s strategy L, so p=1', 'Player 1 should play D', 'p must be 1/2', 'It is not a NE'], a: 0, e: 'Bayes\' rule is applicable given player 2\'s strategy.' },
 { q: 'Requirement 5 puts zero belief on nodes reached only through...', o: ['strictly dominated strategies', 'weakly dominant strategies', 'mixed strategies', 'moves of nature'], a: 0, e: 'Definition.' },
])}
`});

lesson({
  id: 'l14', no: 14, part: 'IV. Dynamic games, incomplete information', title: 'Signalling games',
  read: 'Gibbons ch. 4 · Watson (2013) ch. 29',
  goals: [
    'Describe a signalling game: sender, receiver, types, messages, actions',
    'Distinguish pooling, separating and hybrid strategies',
    'State the PBE requirements 1, 2R, 2S and 3 for signalling games',
    'Check every candidate equilibrium of the job-market signalling game',
    'Explain why signalling works: the signal is cheaper for the high type',
  ],
  html: H`
<h2 id="s1">1. The signalling game</h2>
<p>A dynamic game with incomplete information with two players, a sender S and a receiver R. Equilibrium concept: PBE.</p>
<ol><li>Nature chooses the sender's type \(t_i\) from \(T=\{t_1,\dots,t_I\}\) with probabilities \(p(t_i)>0\), \(\sum p(t_i)=1\).</li>
<li>The sender learns \(t_i\) and selects a message \(m_j\in M=\{m_1,\dots,m_J\}\).</li>
<li>The receiver observes \(m_j\) (not \(t_i\)) and selects an action \(a_k\in A=\{a_1,\dots,a_K\}\).</li>
<li>Payoffs \(u_S(t_i,m_j,a_k)\) and \(u_R(t_i,m_j,a_k)\).</li></ol>
<p>A sender strategy is a function from \(T\) to \(M\); a receiver strategy is a function from \(M\) to \(A\).</p>
${box('def', '<ul><li><strong>Pooling</strong> (type-hiding): every type sends the same message.</li><li><strong>Separating</strong> (type-revealing): each type sends a different message.</li><li><strong>Hybrid</strong>: one type sends a message with certainty, the other mixes.</li></ul>The equilibrium is called pooling or separating according to the sender\'s strategy.')}
${box('def', H`<p>A pure-strategy PBE of the signalling game \((T,M,A,p)\) is a pair \(s^*=(m^*(t_i),a^*(m_j))\) and beliefs \(p(t_i\mid m_j)\) satisfying:</p>
<ul><li><strong>Requirement 1:</strong> after observing any \(m_j\in M\), the receiver has a belief about which type sent it.</li>
<li><strong>Requirement 2R:</strong> for each \(m_j\), \(a^*(m_j)\) solves \(\max_{a_k\in A}\sum_{t_i\in T}p(t_i\mid m_j)\,u_R(t_i,m_j,a_k)\).</li>
<li><strong>Requirement 2S:</strong> for each \(t_i\), \(m^*(t_i)\) solves \(\max_{m_j\in M}u_S(t_i,m_j,a^*(m_j))\).</li>
<li><strong>Requirement 3:</strong> for each message on the equilibrium path (sent by some type), the receiver's belief follows from the sender's strategy and Bayes' rule.</li></ul>`, 'PBE in signalling games')}

<h2 id="s2">2. Application: jobs and school</h2>
<p>Does your future employer care whether you know what a PBE is? Two motivations for studying game theory: (1) it develops a logical mind and understanding of social interaction; (2) a degree is a <strong>signal</strong> to prospective employers to the extent that highly productive people are more likely than less productive people to get one. This lecture focuses on (2) and assumes education does <em>not</em> raise productivity: socially wasteful, useful only as a signal.</p>
<ul><li>The worker knows her ability: high with probability 1/3, low with 2/3 (common knowledge).</li>
<li>Worker: E (costly education) or N (no education). Firm: M (managerial job) or C (clerical job).</li>
<li>Worker payoffs: M pays 10, C pays 4; education costs 4 for the high type and 7 for the low type.</li>
<li>Firm payoffs: C always gives 4; M gives 10 with a high type and 0 with a low type; independent of education.</li></ul>
${tree('l14job')}
<p class="small muted">Worker payoff first, firm second. N/E for the high type, N'/E' for the low type. The firm has one information set after no education (belief p on High) and one after education (belief q on High). Primed firm actions M', C' follow N.</p>
${steps('Candidate 1: pooling on education (E, E\')', [
H`Beliefs must equal priors: \(q=\tfrac13\).`,
H`Firm after E: C gives 4; M gives \(\tfrac13\cdot10+\tfrac23\cdot0=3.33<4\). Firm chooses C.`,
'Both types then get a clerical job despite paying for education (high: 4-4=0; low: 4-7=-3). Deviating to N gives at least 4 (C\') for either type. Both have an incentive to deviate.',
'<strong>No pooling PBE on E.</strong>'])}
${steps('Candidate 2: pooling on no education (N, N\')', [
H`On the path beliefs equal priors: \(p=\tfrac13\), so the firm chooses C' (4 > 3.33). Both types get 4.`,
H`Consider the high type deviating to E. Deviation does not pay if the firm still chooses C after E: \(4\ge10q+0(1-q)\iff q\le\tfrac25\).`,
'The information set after E is off the path. Requirement 4 says: use Bayes\' rule and the equilibrium strategies where possible. Here it is not possible, since N, N\' never reach it.',
H`The slides use the prior \(q=\tfrac13\), which satisfies \(q\le\tfrac25\). With \(q\le\tfrac25\) the firm plays C after E, the high type would get 0 < 4, the low type -3 < 4. <strong>Pooling PBE: (N, N'; C', C), p = 1/3, q ≤ 2/5.</strong>`])}
${steps('Candidate 3: separating, only low types educate (N, E\')', [
H`Consistent beliefs: \(p=1\) (N comes from High), \(q=0\) (E from Low). Firm: M' after N, C after E.`,
'Low type gets 4-7 = -3; deviating to N\' gives M\' and 10. Profitable deviation.',
'<strong>Not a PBE.</strong>'])}
${steps('Candidate 4: separating, only high types educate (E, N\')', [
H`Consistent beliefs: \(p=0\), \(q=1\). Firm: C' after N (4 > 0), M after E (10 > 4).`,
'High type: E gives 10-4 = 6; deviating to N gives C\' = 4. No deviation.',
'Low type: N\' gives 4; deviating to E\' gives M with 10-7 = 3. No deviation.',
H`<strong>Separating PBE: (E, N'; C', M), p = 0, q = 1.</strong>`])}
${box('thm', '<ul><li>The high type needs education to signal her ability.</li><li>Signalling works because acquiring the signal is <strong>less costly for the high type</strong> (4 < 7): the education premium 10 - 4 = 6 exceeds the high type\'s cost (4) but not the low type\'s (7).</li></ul>', 'Main insights')}
${W('signal')}
${quiz('q-l14', [
 { q: 'In a pooling equilibrium, the receiver\'s belief after the equilibrium message equals...', o: ['1', '0', 'the prior', 'arbitrary'], a: 2, e: 'All types send it, so Bayes\' rule returns the prior.' },
 { q: 'Why is there no pooling PBE on education?', o: ['Education is free', 'With prior beliefs the firm chooses C, so education does not pay and both types deviate to N', 'The firm always chooses M', 'The low type cannot educate'], a: 1, e: '10/3 < 4.' },
 { q: 'In the pooling PBE on N, which off-path beliefs q support it?', o: ['q > 2/5', 'q ≤ 2/5', 'q = 1', 'q = 0 only'], a: 1, e: 'Firm must prefer C after E: 4 ≥ 10q.' },
 { q: 'If education cost the high type 7 as well, would the separating equilibrium survive?', o: ['Yes', 'No: the high type would get 3 < 4 and deviate', 'Only with q = 1', 'Only if p = 1'], a: 1, e: 'Signalling needs differential costs.' },
 { q: 'A sender strategy in a signalling game is a function from...', o: ['messages to actions', 'types to messages', 'actions to types', 'beliefs to actions'], a: 1, e: 'Receiver: messages to actions.' },
])}
`});
