/* Lectures 1-5: introduction and static games with complete information. */

lesson({
  id: 'l1', no: 1, part: 'Introduction', title: 'Introduction: game theory and rationality',
  read: 'Gibbons ch. 1 · Tadelis ch. 1 · Osborne ch. 1 · Gilboa et al. (2014)',
  goals: [
    'Explain why game theory is the language of strategic interaction',
    'Define a rational preference relation (complete + transitive) and a payoff function',
    'State the Homo Oeconomicus definition and its four implicit assumptions',
    'Distinguish the normative and the positive interpretation of rationality',
    'Summarise views on what economic models are for (Friedman, Gibbard and Varian, Rubinstein, Sugden, Gilboa et al.)',
  ],
  html: H`
<h2 id="s1">1. From microeconomics to game theory</h2>
<p>In BA microeconomics, consumers maximise utility and firms maximise profits while <strong>taking prices and other parameters as exogenously given</strong>. Nobody thinks about what anybody else will do. This is <em>non-strategic</em> interaction.</p>
<p>Advanced microeconomics analyses situations of <strong>strategic interaction</strong>: the result depends on the decisions of several interacting economic agents. The tool for analysing them is <strong>game theory</strong>.</p>
${box('ex', H`<ul>
<li>Oligopoly markets: prices, volumes, market entry, product differentiation, R&amp;D</li>
<li>Negotiations: international environmental policy, collective wage agreements, trade liberalisation, disarmament</li>
<li>Bidding behaviour in auctions</li>
<li>Provision of public goods in small groups</li>
<li>Strikes, trade wars, military and other conflicts</li>
<li>Interaction between a firm and its employees (performance pay)</li></ul>`, 'Where is it used?')}

<h3>The map of the course: four classes of games</h3>
<p>The course is organised along two dimensions and starts with the easiest class. Keep this table in mind: every new topic sits in one cell, and each cell has its own equilibrium concept.</p>
<div class="quad">
<div class="hd"></div><div class="hd">Static (simultaneous)</div><div class="hd">Dynamic (sequential)</div>
<div class="hd">Complete information</div><div><strong>1.</strong> Nash equilibrium<br><a href="#l2">Lectures 2-5</a></div><div><strong>2.</strong> Subgame perfect equilibrium (SPE)<br><a href="#l6">Lectures 6-10</a></div>
<div class="hd">Incomplete information</div><div><strong>3.</strong> Bayesian Nash equilibrium (BNE)<br><a href="#l11">Lectures 11-12</a></div><div><strong>4.</strong> Perfect Bayesian equilibrium (PBE)<br><a href="#l13">Lectures 13-14</a></div>
</div>
${box('tip', '<p>Past exams regularly ask "What kind of game is this? What is the correct equilibrium concept for this class of games?" (e.g. Feb 2014 exam). The answer is exactly this table: first <em>static or dynamic</em>, then <em>complete or incomplete information</em>, then the matching concept.</p>')}

${box('tip', '<p>In class some games are played live with <strong>ClassEx</strong> (classex.uni-passau.de; select your institution: Carl von Ossietzky University of Oldenburg; account "Advanced Microeconomics"): the ultimatum game in Lecture 8 and the trust game in Lecture 17. Videos linked on the slides: <a href="https://www.youtube.com/watch?v=JhfDyBLRnrM">the Nobel committee trying to reach Paul Milgrom</a> (L1), <a href="https://www.youtube.com/watch?v=BGtEp7zFdrc">the Chicken game</a> (L5), <a href="https://www.youtube.com/watch?v=lKhAd0Tyny0">the capuchin monkey fairness experiment</a> and its <a href="https://www.youtube.com/watch?v=GcJxRqTs5nk">longer version</a> (L8), <a href="https://ncase.me/trust/">the evolution of trust</a> (L10), <a href="https://www.youtube.com/watch?v=uAdmzyKagvE">a Dutch flower auction</a> and <a href="https://www.youtube.com/watch?v=Q5nCtgcL4jU">Monty Hall</a> (L12).</p>', 'In the lecture room')}
<h2 id="s2">2. History and Nobel prizes</h2>
<ul>
<li>Around 1900: mathematical analysis of board games; initial focus on <strong>zero-sum games</strong> (one person\'s gain is the other\'s loss).</li>
<li>John von Neumann and Oskar Morgenstern: <em>The Theory of Games and Economic Behavior</em> (1944).</li>
<li>Cooperative vs. non-cooperative game theory; since the 1980s <strong>non-cooperative</strong> game theory dominates: industrial economics, trade theory, macroeconomics, political economy.</li>
<li>Evolutionary game theory, learning, bounded rationality and contract theory build on game-theoretic methods.</li>
<li>Successful applications: UMTS auctions, auctioning permits in the EU Emissions Trading System, B2B/B2C commerce, energy markets, "matching" of students and organ donations.</li>
</ul>
<div class="tbl"><table><tr><th>Year</th><th>Laureates</th><th>Contribution</th></tr>
<tr><td class="num">1994</td><td>Nash, Harsanyi, Selten</td><td>Equilibria in non-cooperative games</td></tr>
<tr><td class="num">1996</td><td>Mirrlees, Vickrey</td><td>Theory of incentives under asymmetric information</td></tr>
<tr><td class="num">2001</td><td>Akerlof, Spence, Stiglitz</td><td>Markets with asymmetric information</td></tr>
<tr><td class="num">2005</td><td>Aumann, Schelling</td><td>Conflict and cooperation through game theory</td></tr>
<tr><td class="num">2007</td><td>Maskin, Myerson, Hurwicz</td><td>Foundations of mechanism design</td></tr>
<tr><td class="num">2012</td><td>Roth, Shapley</td><td>Stable allocations and market design</td></tr>
<tr><td class="num">2014</td><td>Tirole</td><td>Market power and regulation</td></tr>
<tr><td class="num">2016</td><td>Hart, Holmström</td><td>Contract theory</td></tr>
<tr><td class="num">2017</td><td>Thaler</td><td>Behavioural economics</td></tr>
<tr><td class="num">2019</td><td>Banerjee, Duflo, Kremer</td><td>Experimental approach to alleviating poverty</td></tr>
<tr><td class="num">2020</td><td>Milgrom, Wilson</td><td>Auction theory and new auction formats</td></tr></table></div>

<h2 id="s3">3. The rationality hypothesis</h2>
<h3>Step 1: preferences</h3>
${box('def', H`<p>A preference relation that is <strong>complete</strong> and <strong>transitive</strong> is called a <strong>rational preference relation</strong>.</p>
<ul><li><strong>Complete:</strong> for any two outcomes \(x,y\), either \(x \succeq y\) or \(y\succeq x\) (or both). The person can compare every pair.</li>
<li><strong>Transitive:</strong> if \(x\succeq y\) and \(y \succeq z\) then \(x\succeq z\). No cycles.</li></ul>`)}
<h3>Step 2: from preferences to a payoff function</h3>
${box('thm', H`<p>If the set of outcomes \(X\) is finite, any rational preference relation over \(X\) can be represented by a <strong>payoff function</strong>.</p><p class="small muted">Idea: a rational preference relation allows a ranking of all alternatives; the payoff function gives higher numbers to more preferred alternatives.</p>`)}
${box('ex', H`<p>A student ranks three desserts: cake \(\succ\) ice cream \(\succ\) pudding. A payoff function could be \(v=(3,2,1)\). The function \(v=(100,7,-4)\) represents the same preferences: only the <em>ranking</em> matters (ordinal information).</p>`)}
<h3>Step 3: Homo Oeconomicus</h3>
${box('def', H`<p>A player facing a decision problem with a payoff function \(v(\cdot)\) over actions is <strong>rational</strong> if he chooses an action \(a\in A\) that maximises his payoff:</p>
\[a^*\in A \text{ is chosen} \iff v(a^*)\ge v(a)\ \text{ for all } a\in A.\]`, 'Definition (Homo Oeconomicus)')}
<h3>Step 4: two important remarks</h3>
<ol>
<li><strong>Rationality is not an assumption about the type of preferences.</strong> Homo Oeconomicus need not be selfish: for a person with altruistic preferences, donating money is rational. (This returns in inequality aversion, Lecture 8, and guilt aversion, Lecture 17.)</li>
<li>Rational choice implicitly assumes the player <strong>fully understands</strong> the decision problem, i.e. knows:
<ol type="a"><li>all possible actions \(A\),</li><li>all possible outcomes \(X\),</li><li>exactly how each action affects which outcome materialises,</li><li>his rational preferences (payoffs) over outcomes.</li></ol></li>
</ol>
${W('wine')}
${box('ex', H`<p><strong>The wine problem</strong> (WS 2023/24, 2025/26 and 2026/27, Exercise 1, Q1): payoff \(\theta\alpha-4\alpha^2\), where \(\alpha\) is litres of wine and \(\theta\in[0.2,6]\) depends on physique.</p>
${steps('Step by step: how much should a rational person drink?', [
H`A rational person maximises the payoff: \(\max_\alpha\ \theta\alpha-4\alpha^2\).`,
H`First-order condition (FOC): \(\theta-8\alpha=0\Rightarrow \alpha^*(\theta)=\theta/8\). Second derivative \(-8<0\), so this is a maximum.`,
H`\(\theta=1\Rightarrow\alpha^*=0.125\) litres; \(\theta=4\Rightarrow \alpha^*=0.5\) litres.`,
H`\(d\alpha^*/d\theta = 1/8>0\): larger people (higher \(\theta\)) should drink more.`,
H`Even the largest \(\theta=6\) gives \(\alpha^*=0.75<1\): nobody should drink more than one 1-litre bottle. Any \(\alpha>0.75\) is worse than \(0.75\) for every type (the payoff is decreasing for \(\alpha>\theta/8\)); the official solution uses \(\alpha=2\), which gives at most \(6\cdot2-16=-4<0\) (drinking nothing gives 0). Criterion: rationality, i.e. such an amount is strictly dominated.`])}`)}

<h2 id="s4">4. Two interpretations of rationality</h2>
<div class="wgrid">
${box('def', '<p>It is not claimed that all individuals are perfectly rational. The questions are: what does "rationality" mean in strategic interaction? What are "rational expectations"? How should equilibrium be defined under rational behaviour? In this reading game theory is a branch of philosophy.</p>', 'Normative interpretation')}
${box('def', '<p>Even if individuals are only boundedly rational, rational behaviour prevails in the long run: people learn and adapt; successful behaviour is passed on through social norms and laws (perhaps genes). So the analysis of perfectly rational behaviour should, by and large, predict actual behaviour well.</p>', 'Positive interpretation')}
</div>

<h2 id="s5">5. What are economic models for?</h2>
<p>The slide opens with a joke: "Q: Why did God create economists?" (The answer is left blank on the slide; a common punchline is "to make weather forecasters look good".) A cartoon on the slides makes the same point about predictions with a political joke.</p>
<p>Economics is criticised for (1) the quality of its forecasts and (2) its fundamental assumptions, which psychologists and experimental economists often refute in the lab (Nobel Prize 2017 awarded to behavioural economist Richard Thaler).</p>
<ul>
<li><strong>Limits of prediction:</strong> people react to theories (stock markets, spread of viruses), so predicting human behaviour has limits beyond those of the natural sciences. Yet economists reveal their assumptions, which other social scientists rarely do.</li>
<li>That assumptions in economics are (often) wrong is "one of the worst kept secrets in science".</li>
<li><strong>Friedman (1953):</strong> wrong assumptions do not matter as long as conclusions about market phenomena are accurate. Most economists today reject this "instrumentalist view".</li>
<li><strong>Gibbard and Varian (1978):</strong> models are like pictures (mimic reality), drawings (simplify) or caricatures (exaggerated and distorted representations of reality).</li>
<li><strong>Rubinstein (2006):</strong> models are fables: the moral of the story matters; simplifications make the core message stand out.</li>
<li><strong>Sugden (2011):</strong> models are "credible worlds" for reasoning about reality.</li>
<li><strong>Gilboa, Postlewaite, Samuelson and Schmeidler (2014):</strong> economic models are <em>analogies</em>: they help reasoning by drawing similarities to real situations.</li>
</ul>
${quiz('q-l1', [
 { q: 'Which two properties define a rational preference relation?', o: ['Complete and transitive', 'Monotone and convex', 'Continuous and complete', 'Transitive and selfish'], a: 0, e: 'Definition: complete + transitive. Selfishness is not part of rationality.' },
 { q: 'A person donates all her money. What does the rationality hypothesis say?', o: ['She is irrational', 'She can be rational if she has altruistic preferences', 'Only rational in an infinitely repeated game', 'Rationality forbids donations'], a: 1, e: 'Rationality is about maximising given preferences, not about which preferences one has.' },
 { q: 'A union and a firm move one after the other and everything is common knowledge. Which cell?', o: ['Static, complete information', 'Dynamic, complete information', 'Static, incomplete information', 'Dynamic, incomplete information'], a: 1, e: 'Sequential = dynamic; payoffs common knowledge = complete information. Concept: SPE.' },
 { q: 'Who described economic models as "fables"?', o: ['Friedman', 'Rubinstein', 'Sugden', 'Gibbard and Varian'], a: 1, e: 'Rubinstein (2006). Sugden: credible worlds; Gibbard-Varian: caricatures.' },
])}
`});

lesson({
  id: 'l2', no: 2, part: 'I. Static games, complete information', title: 'Static games with complete information and dominance',
  read: 'Gibbons ch. 1 · Tadelis ch. 3-4 · Osborne ch. 2',
  goals: [
    'Define complete information and common knowledge',
    'Write a game in normal (strategic) form \\(G=\\{I; S_i; u_i\\}\\)',
    'Apply strictly and weakly dominant strategies and equilibrium in dominant strategies',
    'Show why bidding your true value is weakly dominant in a second-price sealed-bid auction',
    'Apply iterated elimination of strictly dominated strategies (IESDS) step by step and state which assumption it needs',
  ],
  html: H`
<h2 id="s1">1. Classification of games</h2>
<h3>Complete information and common knowledge</h3>
${box('def', H`<p>A game of <strong>complete information</strong> requires that the following four components are <strong>common knowledge</strong> among all players:</p>
<ol><li>all possible actions of all players,</li><li>all possible outcomes,</li><li>how each combination of actions affects which outcome materialises,</li><li>the preferences of each and every player over outcomes.</li></ol>
<p>An event \(E\) is <strong>common knowledge</strong> if (1) everyone knows \(E\), (2) everyone knows that everyone knows \(E\), and so on ad infinitum.</p>`)}
<p>If at least one assumption fails, the game has <strong>incomplete information</strong>. Most relevant case: a player is unsure about the payoff functions of other players (from Lecture 11 on).</p>
<div class="wgrid">
${box('def', '<p>All players decide "at the same time", i.e. <em>without knowing</em> the decisions of the others. What matters is information, not the clock.</p>', 'Static games')}
${box('def', '<p>Players decide sequentially; they may observe earlier decisions (perfect information) or not (imperfect information).</p>', 'Dynamic games')}
</div>

<h2 id="s2">2. Normal (strategic) form</h2>
${box('def', H`<p>A game in normal form consists of</p>
<ol><li>a finite set of players \(I=\{1,\dots,n\}\),</li><li>a collection of sets of pure strategies \(S_1,\dots,S_n\),</li><li>payoff functions \(u_1,\dots,u_n\), each assigning a payoff to every combination of chosen strategies.</li></ol>
<p>Notation: \(G=\{I;S_1,\dots,S_n;u_1,\dots,u_n\}\) or \(G=\{I;S_i;u_i\}\).</p>`)}
<h3>Example 1: Prisoner's Dilemma (finite players, finite strategies)</h3>
${mx({ p1: 'Prisoner 1', p2: 'Prisoner 2', rows: ['N (do not confess)', 'C (confess)'], cols: ['N', 'C'], cells: [['-1,-1', '-9,0'], ['0,-9', '-6,-6']], cap: 'Payoffs: minus years in prison. Blue: player 1, orange: player 2.' })}
<p>The matrix contains all information of the normal form: (1) players \(I=\{1,2\}\); (2) strategy sets \(S_i=\{N,C\}\); (3) payoff functions, e.g. \(u_1(N,N)=u_2(N,N)=-1\), \(u_1(C,N)=0\), \(u_1(N,C)=-9\), ...</p>
<h3>Example 2: Cournot oligopoly (finite players, infinitely many strategies)</h3>
<ul><li>\(i=1,\dots,n\) firms, supply \(x_i\ge 0\), aggregate supply \(X=x_1+\dots+x_n\)</li>
<li>Inverse demand \(p(X)=\max\{A-bX,0\}\), cost \(K_i(x_i)=cx_i\)</li></ul>
${steps('Write the Cournot game in normal form', [
H`<strong>Players:</strong> \(I=\{1,\dots,n\}\)`,
H`<strong>Strategy sets:</strong> \(S_i=\{x_i\mid x_i\ge 0\}\): every non-negative quantity is a strategy (infinite set).`,
H`<strong>Payoff functions:</strong> \(u_i(x_1,\dots,x_n)=p(x_1+\dots+x_n)\,x_i-cx_i\).`])}
${box('tip', '<p>"What is the normal-form representation of this game?" Always answer with three parts: <em>players, strategy sets, payoff functions</em>. E.g. negative ad campaigns: \\(I=\\{1,2\\}\\), \\(S_i=[0,2]\\), \\(v_i(a_1,a_2)=a_i-2a_j+a_ia_j-a_i^2\\).</p>')}

<h2 id="s3">3. Solution concepts and equilibria</h2>
<p>A <strong>solution concept</strong> is a method of analysing games that restricts the set of all possible outcomes to those that are more reasonable. Desirable properties:</p>
<ol type="a"><li>widely applicable (an equilibrium exists in many games),</li><li>restricts the outcomes to a small set of reasonable outcomes (maybe a unique one),</li><li>not too sensitive to small changes in payoffs (robust).</li></ol>
<p>An <strong>equilibrium</strong> is a strategy profile that emerges as a prediction of the solution concept. Theories simplify, so predictions may be wrong if important aspects are omitted. New assumption: every equilibrium must be <strong>self-enforcing</strong>: each player is happy with his own choice given how the others choose.</p>
${box('def', '<p><strong>Strategy:</strong> a <em>complete</em> behavioural plan that provides a decision for each situation. In static games a strategy is just one action. (In dynamic games this becomes much richer, see Lecture 6.)</p>')}

<h2 id="s4">4. Dominant strategies</h2>
<p>Notation: \(s_{-i}:=(s_1,\dots,s_{i-1},s_{i+1},\dots,s_n)\), the strategies of all players other than \(i\).</p>
${box('def', H`<p>In \(G=\{I;S_i;u_i\}\), \(s_i\in S_i\) is a <strong>strictly dominant strategy</strong> of player \(i\) if for all \(s_i'\neq s_i\)
\[u_i(s_i,s_{-i})>u_i(s_i',s_{-i})\quad \text{for all } s_{-i}\in S_{-i}.\]
The profile \(s^*=(s_1^*,\dots,s_n^*)\) consisting of one dominant strategy for each player is an <strong>equilibrium in dominant strategies</strong>.</p>
<p><strong>Weakly dominant:</strong> requires only \(u_i(s_i,s_{-i})\ge u_i(s_i',s_{-i})\) for all \(s_{-i}\) (with strict inequality for at least one \(s_{-i}\) in the standard definition).</p>`)}
${steps('Dominance check in the Prisoner\'s Dilemma', [
H`Player 1: if player 2 plays N, C gives 0 and N gives \(-1\): \(0>-1\), C is better.`,
H`If player 2 plays C: C gives \(-6\), N gives \(-9\): \(-6>-9\), C is better again.`,
'C is better in every case, so C is player 1\'s strictly dominant strategy. By symmetry also for player 2.',
H`Equilibrium in dominant strategies: \((C,C)\) with payoffs \((-6,-6)\). Yet \((N,N)\) would give both \(-1\): individual rationality leads to a collectively bad outcome. This is the dilemma.`])}
${mx({ p1: 'Prisoner 1', p2: 'Prisoner 2', rows: ['N', 'C'], cols: ['N', 'C'], cells: [['-1,-1', '-9,0'], ['0,-9', '-6,-6']], br: true, cap: 'Underlined payoffs are best responses; the shaded cell is the equilibrium.' })}
${box('tip', '<p>Equilibrium in dominant strategies only assumes that <strong>players are rational</strong>. You need not know anything about the rationality of your opponent. It is the strongest (least demanding) concept, but in most games it does not exist.</p>')}

<h2 id="s5">5. Application: the second-price sealed-bid auction</h2>
<p>An oil company considers acquiring drilling rights in the Gulf of Mexico. It values them at <strong>€153 million</strong>; there is one competitor. Rules: (1) each bidder submits a sealed bid simultaneously (\(b_c\): competitor's unknown bid); (2) the highest bid wins; (3) the winner pays the <strong>second-highest bid</strong> (the loser's bid).</p>
${steps('Why is bidding the true value (153) weakly dominant?', [
'Key observation: if you win, the price depends on the <em>competitor\'s</em> bid, not yours. Your bid only decides <strong>whether</strong> you win.',
H`Case 1: \(153>b_c\). You want to win (profit \(153-b_c>0\)): any \(b\ge 153\) does it, \(b=153\) included.`,
H`Case 2: \(153< b_c\). You want to lose (winning means paying \(b_c>153\)): any \(b\le 153\) does it, \(b=153\) included.`,
H`Case 3: \(153=b_c\). Winning or losing gives 0; every bid is optimal.`,
H`Result: \(b=153\) is at least as good as any other bid in every case and strictly better in some. Bidding the true valuation is a <strong>weakly dominant strategy</strong>. The equilibrium is Pareto efficient (the bidder with the highest value gets the good).`])}
${W('spa-proof')}
${box('ex', '<p><strong>Goethe and the second-price auction (1797):</strong> Goethe suspected that publishers exploited their better information about the true demand for his works. On 16 January 1797, through his confidant Karl August Böttiger, he proposed to the publisher Vieweg for <em>Hermann und Dorothea</em>: he would give a sealed note with his demand to Böttiger; Vieweg would make an offer. If the offer was below the demand, no deal; if above, Goethe would only receive the amount in the note. Goethe\'s reservation price plays the role of the second price, so it is optimal for Vieweg to offer his true valuation. But Böttiger revealed the reservation price of 1000 thalers. The book became a bestseller and Vieweg was the only publisher to make a profit on a single Goethe work during Goethe\'s lifetime. The contract caused a sensation as "peculiar business conduct".</p><p class="small">Goethe\'s wording (slide translation): "As far as the fee is concerned, I am sending Mr. Böttiger, the senior consistorial councilor, a sealed note containing my demand, and I am waiting to see what Mr. Vieweg thinks he can offer me for my work. If his offer is lower than my demand, I will take back my sealed note unopened and the negotiation will be shattered; if it is higher, I will not demand more than is listed in the note to be opened by Mr. Böttiger."</p>', 'Historical example')}
${box('ex', H`<p><strong>eBay variant</strong> (WS 2026/27 Exercise 1, Q2; WS 2023/24 Exercise 1, Q3): the winner pays the loser's bid <strong>plus €1</strong>; your valuation is €100. What should you bid?</p>
${sol('Show solution', H`<p>The price is \(b_c+1\). Winning is good iff \(100-(b_c+1)>0 \iff b_c<99\); losing is better if \(b_c>99\); at \(b_c=99\) you are indifferent. The bid that implements "win iff \(b_c<99\)" is \(b=99\): valuation minus the mark-up. By the same steps as in the lecture, \(b=99\) is weakly dominant. (Bidding 100 would make you win for \(b_c\in(99,100)\) and pay \(b_c+1>100\): a loss.)</p>`)}`)}

<h2 id="s6">6. Dominated strategies and iterated elimination</h2>
${mx({ rows: ['Top', 'Bottom'], cols: ['Left', 'Middle', 'Right'], cells: [['1,0', '1,2', '0,1'], ['0,3', '0,1', '2,0']] })}
<p>Any dominant strategies? Player 1: Top is better against Left/Middle, Bottom against Right: no. Player 2: none is always best. Are there strategies that a rational player <em>should never play</em>?</p>
${box('def', H`<p>\(s_i\in S_i\) is <strong>strictly dominated</strong> if there is another \(s_i'\in S_i\) such that for all \(s_{-i}\in S_{-i}\): \(u_i(s_i',s_{-i})>u_i(s_i,s_{-i})\). We say \(s_i'\) strictly dominates \(s_i\).</p><p><strong>Rationality requirement:</strong> individually rational behaviour precludes the choice of strictly dominated strategies.</p>`)}
${steps('IESDS step by step', [
H`Player 2: compare Right with Middle: against Top \(2>1\), against Bottom \(1>0\). Middle strictly dominates Right. <strong>Delete Right</strong> (rationality of player 2).`,
H`In the remaining game (Left, Middle), player 1: Top gives \((1,1)\), Bottom \((0,0)\). Top strictly dominates Bottom. <strong>Delete Bottom</strong>. This requires that player 1 <em>knows</em> that player 2 is rational.`,
H`Only Top is left. Player 2: Left 0, Middle 2. <strong>Delete Left</strong>. This requires that 2 knows that 1 knows that 2 is rational.`,
'Result: <strong>(Top, Middle)</strong> with payoffs (1, 2).'])}
${W('matrix-lab', { preset: 'l2dom', mode: 'iesds' })}
<h3>Common knowledge of rationality</h3>
<p>To apply this procedure over arbitrarily many steps we must assume <strong>common knowledge of rationality</strong>: all players are rational; all know that all are rational; all know that all know that all are rational; ...</p>
<p>The assumption is problematic, especially when a "mistake" about others' rationality is very costly. It is <strong>not</strong> required for an equilibrium in dominant strategies.</p>
${box('def', '<p><strong>Step 1:</strong> mark all dominated strategies of player 1. Then mark all dominated strategies of player 2 (without crossing out player 1\'s). Do the same for all other players. Then cross out all marked strategies.<br><strong>Step 2:</strong> apply step 1 to the game thus obtained.<br><strong>...</strong> until no player has a dominated strategy.</p>', 'General procedure (lecture)')}
${box('warn', '<p>(1) The dominating strategy must be strictly better against <em>every</em> opponent strategy; a single tie means only <em>weak</em> dominance. (2) Compare player 1\'s payoffs across <em>rows</em> (column fixed) and player 2\'s across <em>columns</em> (row fixed). (3) State in each step what you delete and why: this is where exam points come from ("For each step, state which strategy is eliminated and explain why").</p>')}
${box('ex', H`<p><strong>Popsicle stands</strong> (WS 2026/27 Exercise 1, Q4): three towers with 20, 20 and 60 people; everyone buys from the closest stand; equidistant groups are split equally.</p>
${mx({ rows: ['Tower 1', 'Tower 2', 'Tower 3'], cols: ['Tower 1', 'Tower 2', 'Tower 3'], cells: [['50,50', '20,80', '30,70'], ['80,20', '50,50', '40,60'], ['70,30', '60,40', '50,50']] })}
${steps('Step-by-step solution', [
H`(a) Strategy set of each player: \(S_i=\{\text{Tower }1,\text{Tower }2,\text{Tower }3\}\). (b) Example cell (Tower 1, Tower 3): the 20 people at tower 2 are equidistant and split. Player 1: \(20+10=30\), player 2: \(60+10=70\).`,
H`(c) Player 1: Tower 1 \((50,20,30)\) is strictly dominated by Tower 2 \((80,50,40)\) since \(80>50, 50>20, 40>30\) (also by Tower 3). By symmetry the same for player 2. <strong>Delete Tower 1 for both.</strong>`,
H`In the remaining 2x2, player 1: Tower 2 \((50,40)\) vs Tower 3 \((60,50)\): Tower 3 strictly dominates. Symmetric for player 2. <strong>Delete Tower 2.</strong>`,
'Outcome: (Tower 3, Tower 3) with payoffs (50, 50). Vendors cluster where the median customer is.'])}`)}
${quiz('q-l2', [
 { q: 'Which assumption does an equilibrium in dominant strategies need?', o: ['Only that players are rational', 'Common knowledge of rationality', 'Correct beliefs', 'Mixed strategies'], a: 0, e: 'You do not need to know what your opponent does to play your dominant strategy.' },
 { q: 'Which assumption does IESDS rely on?', o: ['Only rationality', 'Rationality and common knowledge of rationality', 'Perfect recall', 'Bayes\' rule'], a: 1, e: 'Every additional round of elimination needs one more level of "knows that knows".' },
 { q: 'Second-price auction: your value is 50, the rival bids 30. What happens if you bid 70?', o: ['You win and pay 70', 'You win, pay 30, payoff 20', 'You lose', 'You win and pay 50'], a: 1, e: 'The winner pays the second-highest bid. But had the rival bid 60, you would win and pay 60 (a loss): this is why overbidding is weakly dominated.' },
 { q: 'Strategy A gives ≥ B against all opponent strategies and = against one. Which is true?', o: ['A strictly dominates B', 'A weakly dominates B', 'B is dominant', 'No relation'], a: 1, e: 'A single tie destroys strict dominance.' },
 { q: 'What is the strategy set in the Cournot game?', o: ['{low, high}', H`\(S_i=\{x_i\ge 0\}\)`, 'The set of prices', 'The set of profits'], a: 1, e: 'Every non-negative quantity is a strategy: an infinite strategy set.' },
])}
`});

lesson({
  id: 'l3', no: 3, part: 'I. Static games, complete information', title: 'Nash equilibrium and the Cournot duopoly',
  read: 'Gibbons ch. 1 · Tadelis ch. 5 · (Osborne ch. 2-4)',
  goals: [
    'Define Nash equilibrium as mutual best responses',
    'Find all pure Nash equilibria of a matrix game by marking best responses',
    'Compare the assumptions behind the different equilibrium concepts',
    'Derive reaction functions and solve the Cournot duopoly',
    'Compare cartel output with Nash output and interpret voluntary export restraints',
  ],
  html: H`
<h2 id="s1">1. Why a new concept?</h2>
${mx({ rows: ['Top', 'Middle', 'Bottom'], cols: ['Left', 'Middle', 'Right'], cells: [['0,4', '4,0', '5,3'], ['4,0', '0,4', '5,3'], ['3,5', '3,5', '6,6']] })}
<p>There are no dominant and no dominated strategies here: IESDS deletes nothing. Can we still predict?</p>
${box('intu', '<p>If game theory makes a prediction, it must be <strong>strategically stable</strong> ("self-enforcing"): strategies must be best responses to each other so that nobody wants to deviate. In the game above (Bottom, Right) has this property: against Right, player 1 gets 6 with Bottom (vs. 5 and 5); against Bottom, player 2 gets 6 with Right (vs. 5 and 5).</p>')}

<h2 id="s2">2. Definition</h2>
${box('def', H`<p>In the normal-form game \(G=\{I;S_i;u_i\}\), the pure-strategy profile \(s^*=(s_1^*,\dots,s_n^*)\) is a <strong>Nash equilibrium</strong> if for all \(i=1,\dots,n\)
\[u_i(s_i^*,s_{-i}^*)\ \ge\ u_i(s_i,s_{-i}^*)\quad\text{for all } s_i\in S_i.\]
I.e. each player's strategy \(s_i^*\) is a <strong>best response</strong> to the strategies of the others; equivalently \(s_i^*\) solves \(\max_{s_i\in S_i} u_i(s_i,s_{-i}^*)\). Nash equilibrium = mutual best responses.</p>`)}
${box('en', '<p>A strategy profile s* is a Nash equilibrium if for each player i, s_i* is a best response to the strategies s_-i* of the other players, i.e. no player can increase his payoff by unilaterally deviating.</p>')}
${box('warn', '<p>A Nash equilibrium is a <strong>strategy profile</strong>, not a payoff vector. Do not write "the equilibrium is (6,6)" but "the equilibrium is (Bottom, Right) with payoffs (6,6)". And check <em>unilateral</em> deviations only: a joint deviation by two players does not break an equilibrium (the Prisoner\'s Dilemma shows this).</p>')}
<h3>Finding all pure Nash equilibria in a matrix</h3>
${steps('The underlining method', [
'For each strategy of player 2 (each column) find player 1\'s best response and underline that payoff (the largest <em>first</em> number in the column).',
'For each strategy of player 1 (each row) find player 2\'s best response and underline it (the largest <em>second</em> number in the row).',
'Cells where both numbers are underlined are pure Nash equilibria. With ties, underline all maximal payoffs.',
'If there is no such cell, there is no pure-strategy NE (e.g. matching pennies); look at mixed strategies (Lecture 4).'])}
${mx({ rows: ['Top', 'Middle', 'Bottom'], cols: ['Left', 'Middle', 'Right'], cells: [['0,4', '4,0', '5,3'], ['4,0', '0,4', '5,3'], ['3,5', '3,5', '6,6']], br: true, cap: 'Unique pure Nash equilibrium (Bottom, Right).' })}
${W('matrix-lab', { preset: 'l3' })}

<h2 id="s3">3. What each concept requires</h2>
<div class="tbl"><table><tr><th>Concept</th><th>Requirements</th></tr>
<tr><td>Equilibrium in dominant strategies</td><td>Players are rational</td></tr>
<tr><td>Iterated elimination of dominated strategies</td><td>Players are rational + rationality is common knowledge</td></tr>
<tr><td>Nash equilibrium</td><td>Players are rational (they play a best response to their beliefs) + <strong>players' beliefs about their opponents are correct</strong> (a demanding requirement)</td></tr></table></div>
${box('thm', '<p>Every equilibrium in dominant strategies is a Nash equilibrium. If IESDS leaves a single profile, it is the unique Nash equilibrium. A strictly dominated strategy is never played in a Nash equilibrium. (Weakly dominated strategies can be: see Lecture 5.)</p>', 'Links between the concepts')}
<h3>Motivations for Nash equilibrium</h3>
<ul><li>Consequence of rational inference</li><li>A necessary condition if there is a clear prediction about the outcome</li><li>An agreement that does not destroy itself</li><li>A stable social convention</li><li><strong>Focal point:</strong> a solution players choose without communication because it seems natural or outstanding</li></ul>

<h2 id="s4">4. The Cournot duopoly</h2>
<p>Two firms produce a homogeneous good; no fixed costs, identical constant marginal costs \(c\); quantities \(x_1,x_2\) chosen simultaneously; price \(p(X)=a-b(x_1+x_2)\).</p>
\[\pi_i=\big(a-b(x_i+x_{-i})\big)x_i-cx_i\]
${steps('Step by step: reaction function and Nash equilibrium', [
H`<strong>Firm 1's problem:</strong> \(\max_{x_1}\ \pi_1=(a-b(x_1+x_2))x_1-cx_1\), taking \(x_2\) as given (Nash: best response to the other's strategy).`,
H`<strong>FOC:</strong> \(\dfrac{\partial\pi_1}{\partial x_1}=a-b(x_1+x_2)-bx_1-c=0\). (Product rule: do not forget the price effect \(-bx_1\)!)`,
H`<strong>Reaction (best-response) function:</strong> \(R_1(x_2)=x_1^*(x_2)=\dfrac{a-c-bx_2}{2b}\); symmetrically \(R_2(x_1)=\dfrac{a-c-bx_1}{2b}\). Slope \(-1/2\): if the rival produces more, I produce less (strategic substitutes).`,
H`<strong>Nash equilibrium = mutual best response:</strong> both equations hold simultaneously. Solution 1: insert and solve. Solution 2 (symmetry): \(x_1^*=x_2^*\), so \(x_1=\dfrac{a-c-bx_1}{2b}\Rightarrow 3bx_1=a-c\).`,
H`<strong>Result:</strong> \(x_1^N=x_2^N=\dfrac{a-c}{3b}\), total \(X^N=\dfrac{2}{3}\dfrac{a-c}{b}\), price \(p^N=\dfrac{a+2c}{3}\), profit \(\pi_i^N=\dfrac{(a-c)^2}{9b}\). Graphically: the intersection of the two reaction functions (Cournot equilibrium).`])}
${W('cournot')}
<h3>Collusion (cartel)</h3>
${steps('Cartel output', [
H`The firms maximise joint profits \(\max_{x_1,x_2}\ \pi_1+\pi_2\). By symmetry they can choose total output: \(\max_X (a-bX)X-cX\).`,
H`FOC: \(a-2bX-c=0\Rightarrow X^*=\dfrac{a-c}{2b}< X^N=\dfrac{2}{3}\dfrac{a-c}{b}\).`,
'A cartel acts like a monopolist and restricts output. Monopoly output is inefficiently low for society, which is why cartels are illegal and many countries have a cartel office (in Germany the Federal Cartel Office).',
H`Why is a cartel unstable? If the rival produces \(X^*/2\), each firm wants to produce more according to its reaction function: \(R_1\big(\tfrac{a-c}{4b}\big)=\tfrac{3(a-c)}{8b}>\tfrac{a-c}{4b}\). The cartel agreement is not a Nash equilibrium (Prisoner's Dilemma structure). Lecture 10 shows how infinite repetition can change this.`])}
${box('ex', H`<p><strong>Voluntary export restraints (VER), 1980s:</strong> Japanese car makers agreed to restrict exports to the US; US negotiators saw this as a success in protecting US producers.</p>
<ul><li>Economic analysis: the car industry is oligopolistic; firms can raise profits through a cartel that restricts output, but cartels are unstable and illegal (no contracts possible). The VER produces a cartel-like outcome that is legal and stable.</li>
<li>Crandall (1984): Japanese cars were about $2,500 and US cars about $1,000 more expensive; in 1985-86 US consumers paid about $10 billion more for Japanese cars; each job saved cost about $160,000 per year.</li>
<li>A tariff would probably have been better (revenue stays in the US), although Japanese firms would have passed much of it on to consumers.</li></ul>`, 'Application')}
${box('ex', H`<p><strong>Synergies</strong> (WS 2024/25 Exercise 2, Q3): \(v_i(e_i,e_j)=(a+e_j)e_i-e_i^2\).</p>
${sol('Show solution', H`<ol><li>FOC: \(a+e_j-2e_i=0\Rightarrow BR_i(e_j)=\dfrac{a+e_j}{2}\).</li>
<li>Difference to Cournot: slope \(+1/2\) (increasing). Efforts are <strong>strategic complements</strong>: when the other invests more, the marginal return of my effort rises. In Cournot, quantities are strategic substitutes (decreasing reaction).</li>
<li>Symmetric equilibrium: \(e=\dfrac{a+e}{2}\Rightarrow e^*=a\). Uniqueness: solving the linear system \(e_1=\frac{a+(a+e_2)/2}{2}\)... gives \(3e_1=3a\); two lines with slopes \(1/2\) and \(2\) intersect exactly once.</li></ol>`)}`)}
${box('ex', H`<p><strong>Negative ad campaigns</strong> (WS 2024/25 Exercise 2, Q4): \(v_i=a_i-2a_j+a_ia_j-a_i^2\), \(a_i\in[0,2]\).</p>
${sol('Show solution', H`<ol><li>Normal form: \(I=\{1,2\}\), \(S_i=[0,2]\), payoffs as given.</li>
<li>FOC: \(1+a_j-2a_i=0\Rightarrow BR_i(a_j)=\dfrac{1+a_j}{2}\in[0.5,1.5]\subset[0,2]\).</li>
<li>Equilibrium: \(a=\frac{1+a}{2}\Rightarrow a_1^*=a_2^*=1\), unique (the linear system has one solution). Payoff: \(1-2+1-1=-1\).</li>
<li>Binding agreement: \(v_1+v_2=-(a_1+a_2)-(a_1-a_2)^2\), maximised at \(a_1=a_2=0\), each gets \(0>-1\). A variant of the Prisoner's Dilemma.</li></ol>`)}`)}
${quiz('q-l3', [
 { q: 'What does a Nash equilibrium require?', o: ['No player can gain by unilaterally deviating', 'No group of players can gain by jointly deviating', 'The outcome is Pareto efficient', 'Each player plays a dominant strategy'], a: 0, e: 'Unilateral deviations only. Pareto efficiency is not required (Prisoner\'s Dilemma).' },
 { q: H`Cournot with \(a=12, c=0, b=1\). What is \(x_i^N\)?`, o: ['3', '4', '6', '2'], a: 1, e: '(a-c)/(3b)=12/3=4. Total 8, price 4, profit 16 each.' },
 { q: 'Same parameters: total cartel output?', o: ['8', '6', '4', '12'], a: 1, e: '(a-c)/(2b)=6, i.e. 3 each. Profit 18 each > 16.' },
 { q: 'Compared to dominant-strategy equilibrium, which extra assumption does Nash equilibrium need?', o: ['Correct beliefs', 'Mixed strategies', 'Non-common knowledge of rationality', 'Bayes\' rule'], a: 0, e: 'Players must hold correct beliefs about what the opponents play.' },
 { q: 'In the synergies game the reaction functions slope upwards. What does this mean?', o: ['Strategic substitutes', 'Strategic complements', 'Dominant strategies', 'No equilibrium'], a: 1, e: 'The more the rival does, the more it pays for me to do.' },
])}
`});

lesson({
  id: 'l4', no: 4, part: 'I. Static games, complete information', title: 'Mixed strategies',
  read: 'Gibbons ch. 1 · Tadelis ch. 6 · Chiappori, Levitt and Groseclose (2002)',
  goals: [
    'Define a mixed strategy as a probability distribution over pure strategies',
    'Compute expected payoffs with mixed strategies',
    'Find mixed-strategy Nash equilibria in two ways: derivatives / best-response diagram and the indifference condition',
    'Compute the three equilibria of the Battle of the Sexes',
    'Explain Nash\'s existence theorem and Harsanyi\'s purification argument',
  ],
  html: H`
<h2 id="s1">1. Motivation: Matching Pennies</h2>
${mx({ rows: ['Heads', 'Tails'], cols: ['Heads', 'Tails'], cells: [['-1,1', '1,-1'], ['1,-1', '-1,1']], br: true })}
<p>In every cell one player wants to deviate: there is <strong>no</strong> Nash equilibrium in pure strategies. A penalty taker does not always aim at the same corner either: being predictable is punished. Instead of expanding the set of actions, we expand the choices by letting players <strong>randomise</strong>.</p>
${box('def', H`<p>Let \(S_i=\{s_{i1},\dots,s_{iK}\}\) be player \(i\)'s finite set of pure strategies. A <strong>mixed strategy</strong> is a probability distribution \(p_i=(p_{i1},\dots,p_{iK})\) over the pure strategies with \(0\le p_{ik}\le 1\) and \(p_{i1}+\dots+p_{iK}=1\). \(p_{i1}\): probability that \(i\) plays \(s_{i1}\).</p>
<p>For continuous strategy sets (e.g. a duopolist's quantity), \(S_i\) is an interval and a mixed strategy is a cumulative distribution function \(F_i(x)=\Pr[s_i\le x]\). Every pure strategy is a (trivial) mixed strategy.</p>`)}

<h2 id="s2">2. Expected payoffs</h2>
<p>Two steps: (1) weight the payoff of each pure strategy with the probability of that strategy; (2) add up.</p>
\[v_1(s_{1j},p_2)=\sum_{k=1}^{K}p_{2k}\,u_1(s_{1j},s_{2k}),\qquad v_1(p_1,p_2)=\sum_{j=1}^{J}p_{1j}\,v_1(s_{1j},p_2)=\sum_{j}\sum_{k}p_{1j}p_{2k}\,u_1(s_{1j},s_{2k})\]
${box('def', H`<p>The mixed-strategy profile \(p^*=(p_1^*,\dots,p_n^*)\) is a <strong>Nash equilibrium</strong> if each player's mixed strategy is a best response to the others':
\[v_i(p_i^*,p_{-i}^*)\ge v_i(p_i,p_{-i}^*)\quad \text{for all } p_i\in\Delta S_i.\]
\(\Delta S_i\): the simplex of \(S_i\), i.e. the set of all probability distributions over \(S_i\).</p>
<p class="small">Interpretation: think of \(p_{-i}\) as player \(i\)'s <strong>belief</strong> about the opponents. Rationality requires a best response given the belief; Nash equilibrium requires that the beliefs are <strong>correct</strong>.</p>`)}

<h2 id="s3">3. Method A: derivative and best-response diagram</h2>
<p>\(r\): probability that player 1 plays Heads; \(q\): probability that player 2 plays Heads.</p>
${steps('Step by step', [
H`Player 1's expected payoff: \(v_1(r,q)=r[-q+(1-q)]+(1-r)[q-(1-q)]=r(2-4q)+(2q-1)\).`,
H`\(\partial v_1/\partial r=2-4q\). If \(q<0.5\), \(v_1\) rises in \(r\Rightarrow r=1\); if \(q>0.5\) it falls \(\Rightarrow r=0\); if \(q=0.5\) every \(r\in[0,1]\) is a best response.`,
H`Player 2: \(v_2(r,q)=q[r-(1-r)]+(1-q)[-r+(1-r)]=q(4r-2)+(1-2r)\). \(r<0.5\Rightarrow q=0\); \(r>0.5\Rightarrow q=1\); \(r=0.5\Rightarrow\) any \(q\).`,
H`Draw both best-response correspondences in one diagram. Unique intersection: \(r^*=0.5,\ q^*=0.5\). This is the unique Nash equilibrium.`])}
${W('mixed-br', { preset: 'mp' })}

<h2 id="s4">4. Method B: the indifference condition (the standard method)</h2>
${box('intu', '<p>If a player mixes several pure strategies, he must be <strong>indifferent</strong> between them; otherwise he would play the one with the highest expected value with probability 1. <br><strong>Approach:</strong> each player chooses his mixed strategy so that the <em>other</em> player is indifferent between his pure strategies.</p>')}
${box('warn', '<p>Most common mistake: trying to find player 1\'s probability from player 1\'s own payoffs. Player 1\'s \\(r\\) comes from the indifference equation built with <strong>player 2\'s</strong> payoffs, and vice versa.</p>')}
<p>Matching pennies: \(v_1(H,q)=v_1(T,q)\iff -q+(1-q)=q-(1-q)\iff q=0.5\).</p>
<h3>Battle of the Sexes</h3>
${mx({ p1: 'Man (1)', p2: 'Woman (2)', rows: ['Soccer', 'Opera'], cols: ['Soccer', 'Opera'], cells: [['2,1', '0,0'], ['0,0', '1,2']], br: true })}
${steps('Find all three Nash equilibria', [
'Pure: underlining gives \\((S,S)\\) and \\((O,O)\\).',
H`Mixed: \(r\) = probability that the man plays Soccer, \(q\) = probability that the woman plays Soccer.`,
H`The man chooses \(r\) such that the woman is indifferent: \(v_2(S\mid r)=v_2(O\mid r)\iff 1\cdot r=2(1-r)\iff r=\tfrac{2}{3}\).`,
H`The woman chooses \(q\) such that the man is indifferent: \(v_1(S\mid q)=v_1(O\mid q)\iff 2q=1\cdot(1-q)\iff q=\tfrac13\).`,
H`Mixed equilibrium: \(p_1^*=(\tfrac23,\tfrac13)\), \(p_2^*=(\tfrac13,\tfrac23)\). Expected payoffs: man \(2q=\tfrac23\), woman \(r=\tfrac23\): worse than both pure equilibria (miscoordination happens with probability \(\tfrac23\cdot\tfrac23+\tfrac13\cdot\tfrac13=\tfrac59\)).`])}
${W('mixed-br', { preset: 'bos' })}
${box('ex', H`<p><strong>3x3 penalty game</strong> (Dec 2013 exam, Q2): goalkeeper (rows) and shooter (columns) choose Left, Middle, Right. Same corner: goalkeeper wins \((1,0)\); different corners: shooter wins \((0,1)\).</p>
${mx({ p1: 'Goalkeeper', p2: 'Shooter', rows: ['Left (x1)', 'Middle (x2)', 'Right (x3)'], cols: ['Left (y1)', 'Middle (y2)', 'Right (y3)'], cells: [['1,0', '0,1', '0,1'], ['0,1', '1,0', '0,1'], ['0,1', '0,1', '1,0']] })}
${steps('Solution (the 5-point part)', [
H`The shooter's expected payoffs depend on the goalkeeper's \(x\): \(v_S(L)=1-x_1,\ v_S(M)=1-x_2,\ v_S(R)=1-x_3\).`,
H`If the shooter mixes all three, he must be indifferent: \(1-x_1=1-x_2=1-x_3\Rightarrow x_1=x_2=x_3=\tfrac13\).`,
H`Goalkeeper's payoffs: \(v_G(L)=y_1,\ v_G(M)=y_2,\ v_G(R)=y_3\). Indifference: \(y_1=y_2=y_3=\tfrac13\).`,
H`(d) Why does the goalie get \(\tfrac13\) and the shooter \(\tfrac23\)? In equilibrium each of the 9 cells occurs with probability \(\tfrac19\); the goalie wins in the 3 diagonal cells: \(3\cdot\tfrac19=\tfrac13\); the remaining \(\tfrac23\) go to the shooter.`])}`)}
${box('ex', H`<p><strong>Declining industry</strong> (WS 2024/25 Exercise 3, Q1): two firms exit immediately (E), at the end of this quarter (T) or at the end of the next quarter (N). Each quarter both operate yields \(-1\) each; a firm operating alone gets \(+2\).</p>
${mx({ rows: ['E', 'T', 'N'], cols: ['E', 'T', 'N'], cells: [['0,0', '0,2', '0,4'], ['2,0', '-1,-1', '-1,1'], ['4,0', '1,-1', '-2,-2']], br: true })}
${steps('Solution', [
H`(a) Matrix above. Example: (T, N): both lose 1 in quarter 1, firm 2 gains 2 in quarter 2: \((-1,1)\).`,
H`(b) No strictly dominated strategy. T is <strong>weakly</strong> dominated by the mixed strategy \(\tfrac12E+\tfrac12N\): against E \(2=2\), against T \(0.5>-1\), against N \(-1=-1\). Strict dominance is impossible: more weight on N makes it worse than T against N; more weight on E makes it worse than T against E.`,
'(c) Pure Nash equilibria: \\((E,N)\\) with payoffs \\((0,4)\\) and \\((N,E)\\) with payoffs \\((4,0)\\).',
H`(d) Drop T. Let player 2 play E with probability \(q\); player 1 indifferent between E and N: \(0=4q-2(1-q)\Rightarrow q=\tfrac13\). Symmetric. Equilibrium: each firm plays \((\tfrac13,0,\tfrac23)\).`,
H`Check: in this equilibrium T also yields \(2\cdot\tfrac13-1\cdot\tfrac23=0\), so T is equally good for both players. This is the answer the exercise (and the Tadelis solution manual) expects: the unique <em>symmetric</em> mixed equilibrium, with expected payoff 0.`,
H`Careful, extra: because every strategy earns 0 against \((\tfrac13,0,\tfrac23)\), the game is degenerate and also has asymmetric mixed equilibria, e.g. firm 1 plays \((\tfrac13,0,\tfrac23)\) and firm 2 plays \((0,\tfrac23,\tfrac13)\): then firm 1 gets 0 from E and N and \(-1\) from T, and firm 2 is indifferent between all three. The solution manual's claim that no equilibrium uses T is too strong; in the exam, give the symmetric equilibrium and you are safe. The matrix lab lists all of these. (Osborne, section 7.5, studies a richer dynamic version of exit from a declining industry, with a unique SPE in which the large firm exits first, in the first period in which both firms cannot profitably coexist, and the small firm stays longer.)`])}`)}

<h2 id="s5">5. Interpretation and existence</h2>
<ul>
<li><strong>Scepticism:</strong> mixing is usually motivated by repeated interaction (the penalty example), but we analyse one-shot interaction (otherwise it would be a dynamic game).</li>
<li><strong>Harsanyi's purification argument:</strong> a mixed-strategy Nash equilibrium can (almost always) be viewed as a pure-strategy equilibrium of a "similar game" with a "bit" of private information. Idea: instead of one opponent who mixes, there are several <em>types</em> of the opponent, each playing a pure strategy (details in the appendix of Lecture 11).</li>
<li><strong>Empirical evidence:</strong> Chiappori, Levitt and Groseclose (2002, AER) study penalty kicks in professional soccer and find behaviour largely consistent with mixed-strategy equilibrium predictions. Osborne (pp. 373-375) contrasts this with lab evidence: in O'Neill's (1987) experiment, 25 pairs played a game 105 times; average frequencies came close to the prediction (0.2, 0.2, 0.2, 0.4) but statistical tests reject exact equilibrium play. Experienced professionals (tennis serves, soccer penalties) fit the theory better.</li>
</ul>
${box('thm', H`<p><strong>Osborne, Proposition 116.2</strong> (characterisation of mixed equilibrium in finite games): a mixed strategy profile is a Nash equilibrium if and only if, for each player, (1) every action played with positive probability yields the same expected payoff, and (2) every action played with probability 0 yields at most that payoff. Condition (2) is the one students forget: after solving the indifference equations, check that unused strategies are not better.</p>`, 'From Osborne (2009)')}
${box('thm', H`<p><strong>Nash (1950):</strong> every <strong>finite</strong> normal-form game \(G=\{I;S_i;u_i\}\) has a Nash equilibrium in mixed strategies. (It may be a pure one, since every pure strategy is a trivial mixed strategy.) There can be more than one equilibrium: which one is more plausible is the topic of Lecture 5.</p>`)}
${quiz('q-l4', [
 { q: 'In a mixed equilibrium, how do you find player 1\'s probability?', o: ['By equating player 1\'s own payoffs', 'By making player 2 indifferent between his pure strategies', 'By a corner solution maximising player 1\'s payoff', 'It is always 1/2'], a: 1, e: 'Indifference principle: each player mixes so as to make the opponent indifferent.' },
 { q: 'Battle of the Sexes (2,1 / 0,0 / 0,0 / 1,2): with which probability does the man play Soccer?', o: ['1/3', '2/3', '1/2', '3/4'], a: 1, e: 'Woman indifferent: 1·r = 2(1-r), r=2/3.' },
 { q: 'If a player mixes, what is true of the pure strategies he mixes?', o: ['They yield the same expected payoff', 'One is strictly dominant', 'One is dominated', 'All yield zero'], a: 0, e: 'Otherwise he would play the better one with probability 1.' },
 { q: 'Nash\'s existence theorem holds for which games?', o: ['All games, in pure strategies', 'Finite games, in mixed strategies', 'Only 2x2 games', 'Only zero-sum games'], a: 1, e: 'Finitely many players and strategies: at least one NE in mixed strategies.' },
 { q: H`Chicken game with \(a=-10, b=2, d=6\). Equilibrium probability of T (tough)?`, o: ['2/7', '4/10', '1/3', '0.5'], a: 0, e: '(d-b)/(d-b-a) = 4/14 = 2/7. A costly crash makes being tough less likely.' },
])}
`});

lesson({
  id: 'l5', no: 5, part: 'I. Static games, complete information', title: 'Multiple Nash equilibria: selection criteria',
  read: 'Gibbons ch. 1.3 · Mas-Colell pp. 258-260 (trembling hand) · Osborne ch. 3 (bank runs)',
  goals: [
    'Find the pure and mixed equilibria of the Chicken game parametrically',
    'Explain and apply focal points, pre-play communication, Pareto efficiency and risk dominance',
    'Show both the use and the danger of eliminating weakly dominated strategies',
    'Compute Selten\'s trembling-hand perfection with an error probability',
    'Explain how institutional design selects equilibria in the bank-run game',
  ],
  html: H`
<h2 id="s1">1. The Chicken game</h2>
${mx({ rows: ['T (tough)', 'C (concede)'], cols: ['T', 'C'], cells: [[H`a|a`, H`d|0`], [H`0|d`, H`b|b`]] })}
<p>The matrix is a Chicken game if \(d>b>0>a\): both tough means a crash (\(a<0\)); being tough while the other concedes is best (\(d\)).</p>
${steps('The three equilibria', [
H`Pure: \((C,T)\) and \((T,C)\). Check: against T, C gives \(0>a\); against C, T gives \(d>b\).`,
H`Mixed: let player 2 play T with probability \(q\). Player 1 indifferent: \(aq+d(1-q)=0\cdot q+b(1-q)\).`,
H`Rearrange: \(d-b=q(d-b-a)\Rightarrow q^*=\dfrac{d-b}{d-b-a}\). By symmetry \(p_1^*=p_2^*=\Big(\dfrac{d-b}{d-b-a},\dfrac{-a}{d-b-a}\Big)\) (first entry: probability of T).`,
H`Interpretation: the larger the crash cost \(|a|\), the lower the probability of playing tough.`])}
${W('matrix-lab', { preset: 'chicken' })}

<h2 id="s2">2. Solution approaches with multiple equilibria</h2>
<p>Without additional information it is unclear which equilibrium will be played. When is a strategy combination "obvious"?</p>
<h3>a) Focal points (Schelling, 1960)</h3>
<p>In many coordination problems social norms or conventions determine which equilibrium is played (e.g. driving on the right).</p>
<h3>b) Communication before the game</h3>
<p>Agreement on an equilibrium makes it a focal point. Game played in class: (Top, Left) = (100,100), (Bottom, Right) = (1,1); everybody coordinates on Top/Left.</p>
<h3>c) Pareto efficiency</h3>
${mx({ rows: ['O', 'U'], cols: ['L', 'R'], cells: [['9,9', '0,8'], ['8,0', '7,7']], br: true })}
<p>Two pure equilibria \((O,L)\) and \((U,R)\) plus a mixed one. \((O,L)\) is Pareto efficient, even <strong>Pareto dominant</strong>: better for both players. It seems "obvious" that it should be played.</p>
<h3>d) Risk dominance (Harsanyi and Selten, 1988)</h3>
${box('intu', '<p>But \\((O,L)\\) is <strong>risky</strong>: heavy losses if the other player plays something other than intended (0 instead of 9). U is safe: whatever the rival does, 7 or 8. So it can be argued that \\((U,R)\\) is more likely: \\((O,L)\\) is <strong>risk-dominated</strong> by \\((U,R)\\). Pareto efficiency and risk dominance can conflict.</p>')}
${steps('Seeing risk dominance in numbers', [
H`Let player 1 believe the rival plays L with probability \(q\). O pays \(9q\), U pays \(8q+7(1-q)=7+q\).`,
H`O is optimal only if \(9q\ge 7+q\iff q\ge \tfrac78\). To play O you must be at least <strong>87.5%</strong> sure the rival plays L; U is optimal for \(q\le\tfrac78\).`,
H`Product of deviation losses (Harsanyi-Selten measure, extra material): \((O,L)\): \((9-8)(9-8)=1\); \((U,R)\): \((7-0)(7-0)=49\). The larger one, \((U,R)\), is risk dominant.`])}
${box('ex', H`<p><strong>Dec 2013 exam, Q1</strong> (7 points): Adam/Eva game: (Top,Left)=(8,8), (Top,Right)=(0,7), (Bottom,Left)=(7,0), (Bottom,Right)=(6,6).</p>
${mx({ p1: 'Adam', p2: 'Eva', rows: ['Top', 'Bottom'], cols: ['Left', 'Right'], cells: [['8,8', '0,7'], ['7,0', '6,6']], br: true })}
${sol('Graded solution', H`<ol type="a"><li>(2p) Definition: for each player, his strategy is a best response to the strategies of the other players.</li>
<li>(1p) (Top, Left) and (Bottom, Right).</li>
<li>(2p) Pareto: (Top, Left). Pareto efficiency: no one can be made better off without making someone else worse off. Compared with the other NE both are better off, so they should coordinate on it.</li>
<li>(2p) Risk dominance: (Top, Left) is risk-dominated by (Bottom, Right): heavy losses if the other player plays a different strategy than intended (0 instead of 8). Therefore (Bottom, Right) can be argued to be more likely.</li></ol>`)}`)}
<h3>e) Eliminating implausible strategies</h3>
${mx({ rows: ['S11', 'S12'], cols: ['S21', 'S22'], cells: [['0,100', '0,100'], ['-10,-10', '40,40']], br: true })}
<p>Two Nash equilibria: \((S_{11},S_{21})\) and \((S_{12},S_{22})\). \(S_{21}\) is weakly dominated for player 2 (\(100=100\), \(-10<40\)). Eliminating weakly dominated strategies leaves a single plausible equilibrium: \((S_{12},S_{22})\).</p>
${box('warn', H`<p><strong>Problem:</strong> eliminating weakly dominated strategies may give a worse outcome for all players:</p>
${mx({ rows: ['S11', 'S12'], cols: ['S21', 'S22'], cells: [['5,5', '0,5'], ['5,0', '1,1']], br: true })}
<p>\(S_{11}\) and \(S_{21}\) are weakly dominated; eliminating them leaves \((1,1)\), although \((5,5)\) is also a Nash equilibrium. This does not happen if only <strong>strictly</strong> dominated strategies are eliminated. Iterated weak elimination can also depend on the order and lose Nash equilibria (see Felix and Oscar below).</p>`)}

${box('thm', '<p><strong>Osborne, Proposition 122.1:</strong> every finite game has a mixed-strategy Nash equilibrium in which no player\'s strategy is weakly dominated. So refining by "no weakly dominated strategies" never leaves you with no equilibrium at all, even though it may remove some (as in the examples above).</p>', 'From Osborne (2009)')}
<h2 id="s3">3. Trembling-hand perfection (Selten, 1975)</h2>
<p>Selten justified eliminating weakly dominated strategies: an equilibrium should be stable against minor <strong>mistakes</strong>. Players choose with "trembling hands": they do not always select the intended strategy (not fully rational, or they miscalculate). If an equilibrium does not survive even a very small error probability, it is not trembling-hand perfect.</p>
${steps('Is (O, L) trembling-hand perfect?', [
H`Game: O: \((5,5),(0,5)\); U: \((5,0),(1,1)\). \((O,L)\) is the Pareto-superior Nash equilibrium.`,
H`\(\varepsilon\): probability that player 1 chooses U (his weakly dominant strategy) instead of O: the error probability.`,
H`\(v_2(L)=(1-\varepsilon)\cdot 5+\varepsilon\cdot 0=5(1-\varepsilon)\).`,
H`\(v_2(R)=(1-\varepsilon)\cdot 5+\varepsilon\cdot 1=5(1-\varepsilon)+\varepsilon\).`,
H`Hence \(v_2(R)>v_2(L)\) whenever \(\varepsilon>0\). With an arbitrarily small error probability, player 2 is better off with his weakly dominant strategy R. So \((O,L)\) is <strong>not</strong> trembling-hand perfect; \((U,R)\) is.`])}
${W('tremble')}

<h2 id="s4">4. Institutional design: bank runs</h2>
<p>With many equilibria, regulators can design institutions that guide players to a Pareto-superior equilibrium.</p>
<p class="small muted">Reading note: the slides cite Osborne, chapter 3, for the bank collapse. The Osborne edition in your folder (2009, scanned) does not contain this example (the whole book was searched after text recognition), so this section follows the lecture slides exactly.</p>
<ul><li>\(K\): cost of a long-term project financed by the bank; \(R>K\): project yield in period 2.</li>
<li>The bank finances the project with deposits of two investors, \(K/2\) each.</li>
<li>Each investor can reclaim in period 1 (\(K/2\)) or period 2 (\(R/2\)).</li>
<li>If an investor reclaims in period 1, the project is liquidated prematurely (bank collapse) and yields \(r< K< R\). Assume \(r>K/2\): one investor can be paid in full, but not both.</li></ul>
${mx({ rows: ['rush', 'wait'], cols: ['rush', 'wait'], cells: [[H`\tfrac r2|\tfrac r2`, H`\tfrac K2|r-\tfrac K2`], [H`r-\tfrac K2|\tfrac K2`, H`\tfrac R2|\tfrac R2`]] })}
${steps('Why are there two equilibria?', [
H`\((wait,wait)\): \(R/2>K/2>r-K/2\) because \(R>K\) and \(r< K\). Waiting is a best response.`,
H`\((rush,rush)\): if the other rushes, \(r/2>r-K/2\iff r< K\), true. Rushing is a best response.`,
'Intuition: the collapse is triggered by the expectation that the <em>other</em> investor withdraws. If others withdraw, I should withdraw too, even though the bank then collapses. Nash equilibrium requires correct beliefs: a self-fulfilling prophecy. The Pareto criterion could be used to predict (wait, wait).'])}
<h3>Modified game: a secured, prioritised claim</h3>
<p>Player 1's claim is secured and has priority: if the project is liquidated early (return \(r\)), player 1 is always paid first (\(K/2\)) and player 2 gets the remainder \(r-K/2\) (since \(r>K/2\), player 1 can always be paid in full).</p>
${mx({ rows: ['rush', 'wait'], cols: ['rush', 'wait'], cells: [[H`\tfrac K2|r-\tfrac K2`, H`\tfrac K2|r-\tfrac K2`], [H`\tfrac K2|r-\tfrac K2`, H`\tfrac R2|\tfrac R2`]] })}
<p>Still two equilibria, but now \((rush,rush)\) consists of <strong>weakly dominated strategies</strong>: thanks to the priority, nobody can improve by quitting early. \((wait,wait)\) becomes more likely and a collapse less likely. (Waiting is a best response for player 2 because \(R/2>r-K/2\iff R-r>r-K\), where the left side is positive and the right side negative.)</p>
${W('bankrun')}
${box('ex', H`<p><strong>The odd couple</strong> (WS 2025/26 Exercise 1, Q3; WS 2023/24 Exercise 2, Q1): Felix and Oscar each clean 3, 6 or 9 hours. Total \(\ge 12\): sparkling (Felix 10, Oscar 5); 9 to 11: acceptable (2, 2); \(<9\): dirty (Felix \(-10\), Oscar \(-5\)). Payoff = utility minus own hours.</p>
${mx({ p1: 'Felix', p2: 'Oscar', rows: ['3', '6', '9'], cols: ['3', '6', '9'], cells: [['-13,-8', '-1,-4', '7,-4'], ['-4,-1', '4,-1', '4,-4'], ['1,2', '1,-1', '1,-4']], br: true })}
${steps('Solution', [
'(a) Example: (6,6) gives total 12, Felix 10-6=4, Oscar 5-6=-1. Full matrix above.',
'(b) No strictly dominated strategy. Weak elimination: Oscar\'s 9 is weakly dominated by 6 (-4=-4, -4<-1, -4<-1). Delete.',
'In the remaining game Felix\'s 3 is strictly dominated by 6 (-4>-13, 4>-1). Delete.',
'In {6,9}x{3,6}: Oscar\'s 6 is weakly dominated by 3 (-1=-1, -1<2). Delete. Against Oscar 3, Felix picks 9 (1>-4). Outcome (Felix 9, Oscar 3) with payoffs (1,2).',
'(c) No. Pure Nash equilibria: (3,9) with (7,-4), (6,6) with (4,-1), (9,3) with (1,2). Weak elimination lost two Nash equilibria: the known danger of weak elimination.'])}`)}
${quiz('q-l5', [
 { q: 'Is the Pareto-dominant equilibrium always played?', o: ['Yes, by rationality', 'No; it may be risk-dominated, and the risk that the rival deviates makes it risky', 'Only in mixed strategies', 'Only in zero-sum games'], a: 1, e: 'Pareto efficiency and risk dominance can conflict.' },
 { q: 'Trembling-hand perfection serves to exclude which strategies?', o: ['Strictly dominant strategies', 'Weakly dominated strategies', 'Mixed strategies', 'Focal points'], a: 1, e: 'Once the rival errs with small probability, the weakly dominated strategy becomes strictly worse.' },
 { q: 'Why is (rush, rush) a Nash equilibrium in the bank-run game?', o: ['Rushing is dominant', 'If the other rushes, r/2 > r-K/2 because r < K', 'R > K', 'There is no deposit insurance'], a: 1, e: 'If the other withdraws, waiting gives r-K/2 and rushing r/2; with r<K rushing is better.' },
 { q: 'Why does the priority rule make a run less likely?', o: ['Rushing becomes strictly dominated', 'Rushing becomes a weakly dominated strategy', 'The run equilibrium disappears', 'R increases'], a: 1, e: '(rush,rush) is still a NE but consists of weakly dominated strategies.' },
 { q: 'A drawback of iterated elimination of weakly dominated strategies?', o: ['It never deletes anything', 'It can lose Nash equilibria and depend on the order of elimination', 'It does not require rationality', 'It always yields a mixed equilibrium'], a: 1, e: 'In the Felix and Oscar example, 2 of the 3 equilibria were lost.' },
])}
`});
