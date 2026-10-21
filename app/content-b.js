/* Lectures 6-10: dynamic games with complete information. */
const nd = (p, ch, o) => Object.assign({ p, ch }, o || {});
const tm = (...pay) => ({ pay });

tree('l6trust', nd(1, [['N', tm(0, 0)], ['T', nd(2, [['C', tm(1, 1)], ['D', tm(-1, 2)]])]]));
tree('l6entry', nd(1, [['N', tm(0, 2)], ['E', nd(2, [['f', tm(-1, -1)], ['n', tm(2, 1)]])]]), null);
tree('l6bosseq', nd(1, [['O', nd(2, [['o', tm(2, 1)], ['f', tm(0, 0)]])], ['F', nd(2, [['o', tm(0, 0)], ['f', tm(1, 2)]])]]));
tree('l6bossim', nd(1, [['O', nd(2, [['o', tm(2, 1)], ['f', tm(0, 0)]], { info: 'h2' })], ['F', nd(2, [['o', tm(0, 0)], ['f', tm(1, 2)]], { info: 'h2' })]]));
tree('l6entryN', nd(1, [['N', tm(0, 2)], ['E', nd('N', [['½', nd(2, [['f', tm(0, 0)], ['n', tm(3, 3)]], { info: 'm' }), '1/2'], ['½', nd(2, [['f', tm(-1, -1)], ['n', tm(1, 1)]], { info: 'm' }), '1/2']])]]));
tree('l7simple', nd(1, [['L', nd(2, [['l', tm(3, 1)], ['r', tm(1, 2)]])], ['R', nd(2, [['l', tm(2, 1)], ['r', tm(0, 0)]])]]));
tree('l7vbos', nd(1, [['N', tm(1.5, 1.5)], ['Y', nd(1, [['O', nd(2, [['o', tm(2, 1)], ['f', tm(0, 0)]], { info: 'h' })], ['F', nd(2, [['o', tm(0, 0)], ['f', tm(1, 2)]], { info: 'h' })]])]]));
tree('l7cards', nd('N', [['A ½', nd(1, [['N', tm(-1, 1)], ['Y', nd(2, [['C', tm(2, -2)], ['F', tm(1, -1)]], { info: 'h' })]]), 0.5], ['K ½', nd(1, [['N', tm(-1, 1)], ['Y', nd(2, [['C', tm(-2, 2)], ['F', tm(1, -1)]], { info: 'h' })]]), 0.5]]));
tree('l7entry', nd(1, [['Out', tm(0, 2)], ['In', nd(1, [['Fight', nd(2, [['Fight', tm(-3, -1)], ['Acc', tm(1, -2)]], { info: 'h' })], ['Acc', nd(2, [['Fight', tm(-2, -1)], ['Acc', tm(3, 1)]], { info: 'h' })]])]]));
tree('l7cent', nd(1, [['s', tm(1, 1)], ['w', nd(2, [['s', tm(0, 3)], ['w', nd(1, [['s', tm(2, 2)], ['w', nd(2, [['s', tm(1, 4)], ['w', tm(3, 3)]])]])]])]]));
tree('exJV', nd(1, [['A', tm(2, 0)], ['B', nd(2, [['C', tm(3, 1)], ['D', nd(1, [['E', tm(0, 0)], ['F', tm(1, 2)]])]])]]));
tree('exCent', nd(1, [['G', tm(4, 2)], ['S', nd(2, [['g', tm(3, 6)], ['s', nd(1, [['G', tm(9, 4.5)], ['S', nd(2, [['g', tm(6.75, 13.5)], ['s', tm(20.25, 10.125)]])]])]])]]));
tree('exCent2', nd(1, [['G', tm(4, 2)], ['S', nd(2, [['g', tm(3, 6)], ['s', nd(1, [['G', tm(9, 4.5)], ['S', nd(2, [['g', tm(6.75, 13.5)], ['s', tm(15.1875, 15.1875)]])]])]])]]));
tree('exEnt', nd(1, [['T', nd(2, [['T', tm(-1, -1)], ['NT', tm(4, 0)]])], ['NT', nd(2, [['T', tm(0, 4)], ['NT', tm(0, 0)]])]]));
tree('exEntEnvy', nd(1, [['T', nd(2, [['T', tm(-1, -1)], ['NT', tm(4, -4)]])], ['NT', nd(2, [['T', tm(0, 8)], ['NT', tm(0, 0)]])]]));
tree('ultD', nd('A', [['x=100', nd('B', [['Ac', tm(100, 0)], ['Re', tm(0, 0)]])], ['x=50', nd('B', [['Ac', tm(50, 50)], ['Re', tm(0, 0)]])]]));


lesson({
  id: 'l6', no: 6, part: 'II. Dynamic games, complete information', title: 'Dynamic games with complete and perfect information',
  read: 'Gibbons ch. 2.1 · Tadelis ch. 7 · Osborne ch. 5-6 · McDonald and Solow (1981)',
  goals: [
    'Define an extensive-form game and a game tree',
    'Represent information sets, perfect recall and moves of nature',
    'Distinguish perfect from imperfect information (and both from complete information)',
    'Understand a strategy as a complete plan of play and count strategies',
    'Solve by backward induction, spot non-credible threats, define sequential rationality',
    'Solve the wage-employment (union-firm) model and explain its inefficiency',
  ],
  html: H`
<h2 id="s1">1. The extensive-form game</h2>
<p>So far all players decided simultaneously (normal form). In many situations players decide sequentially and more than once.</p>
${box('ex', '<p><strong>Trust game:</strong> player 1 decides whether to trust (T) player 2 or not (N), e.g. paying up front on eBay and hoping the seller delivers. If trusted, player 2 cooperates (C) or defects (D).</p>' + tree('l6trust', null, { solve: 1 }))}
${box('def', H`<p>A game in extensive form consists of</p>
<ol><li>a set of players \(N\);</li><li>(a) the order of moves, (b) the actions of players when they can move, (c) the knowledge players have when they can move, (d) probability distributions over exogenous events ("moves of nature");</li><li>players' payoffs as a function of outcomes, \(\{v_i(\cdot)\}_{i\in N}\).</li></ol>
<p>The structure of the game is <strong>common knowledge</strong>. In the normal form, item (2) was just a collection of strategy sets; here it is much richer.</p>`)}
<h3>Game trees</h3>
${box('def', H`<p>A game tree is a set of nodes \(x\in X\) with a precedence relation \(x>x'\) ("\(x\) precedes \(x'\)"). Every node has <strong>only one</strong> predecessor. The relation is transitive, asymmetric and incomplete. The <strong>root</strong> \(x_0\) precedes every other node. Nodes that precede no other node are <strong>terminal nodes</strong> \(Z\subset X\): final outcomes with associated payoffs. Every non-terminal node is assigned either to a player \(i(x)\) with action set \(A_i(x)\), or to Nature.</p>`)}

<h2 id="s2">2. Information sets</h2>
<p>Simultaneous-move games can also be drawn as trees: that player 2 does not know whether 1 chose O or F is shown by (i) an ellipse or (ii) a <strong>dashed line</strong> joining the two nodes.</p>
<div class="wgrid"><div><p class="eyebrow">Sequential BoS: \(h_2=\{x_2\}\)</p>${tree('l6bosseq', null, { solve: 1 })}</div><div><p class="eyebrow">Simultaneous BoS: \(h_2=\{x_1,x_2\}\)</p>${tree('l6bossim')}${steps('Solution of the simultaneous version', GT.treeSol.l6bossim)}</div></div>
<p class="small muted">Left: player 2 sees player 1's choice, so backward induction works (click "Solve next node"): player 2 matches, player 1 chooses O, outcome (2,1). Right: player 2 cannot see it, so the game is the simultaneous BoS.</p>
${box('def', H`<p>Every player \(i\) has a collection of information sets \(h_i\in H_i\) that partition the nodes at which \(i\) moves, with the properties:</p>
<ol><li>If \(h_i\) is a singleton containing only \(x\), the player who moves at \(x\) knows he is at \(x\).</li>
<li>If \(x\ne x'\) and both are in \(h_i\), the player does not know whether he is at \(x\) or \(x'\).</li>
<li>If \(x\ne x'\) and both are in \(h_i\), then \(A_i(x')=A_i(x)\). (With different available actions the player could tell the nodes apart.)</li></ol>`)}
${box('def', '<p><strong>Perfect recall:</strong> no player ever forgets information he previously knew. The whole course focuses on games with perfect recall. Counter-example: the <em>absent-minded driver</em>: there are two motorway exits, the first leads to an unsafe neighbourhood, the second is the safe way home; at an exit the driver cannot remember whether he has already passed one.</p>')}
<h3>Exogenous uncertainty: moves of nature</h3>
<p>Random events are modelled as moves of an additional player, "Nature", who picks a state of the world from a given probability distribution. Example from the slides: after entry, Nature selects high or low demand with probabilities ½, ½. The monopolist does not observe the demand state, so its two nodes form one information set (dashed line); its payoffs from fighting or sharing depend on the state.</p>
${tree('l6entryN')}${steps('Solution', GT.treeSol.l6entryN)}
<p class="small muted">Left branch: the entrant stays out (0, 2). After entry: high demand gives (0,0) if the monopolist fights and (3,3) if it shares; low demand gives (-1,-1) and (1,1). Sharing is better for the monopolist in both states, so the entrant enters.</p>
${box('def', '<p>A game of complete information in which every information set is a singleton and there are no moves of Nature is a game of <strong>perfect information</strong>. If some information sets contain several nodes, or there are moves of Nature, it is a game of <strong>imperfect information</strong>. With perfect information all players move sequentially and each observes all previous moves.</p>')}
${box('warn', '<p>Do not confuse "complete" with "perfect" information! <strong>Complete</strong>: the structure and the payoffs are common knowledge (incomplete = uncertainty about payoffs, types). <strong>Perfect</strong>: whenever a player moves, he has observed all previous moves.</p>')}

<h2 id="s3">3. Strategies in extensive-form games</h2>
${box('def', H`<p>A <strong>pure strategy</strong> for player \(i\) is a complete plan of play that describes which pure action \(i\) chooses at <em>each</em> of his information sets. Formally a mapping \(s_i:H_i\to A_i\) assigning an action \(s_i(h_i)\in A_i(h_i)\) to every \(h_i\in H_i\), where \(A_i=\cup_{h_i\in H_i}A_i(h_i)\).</p>`)}
<ul><li>Simultaneous BoS: \(S_1=\{O,F\}\), \(S_2=\{o,f\}\).</li><li>Sequential BoS: \(S_1=\{O,F\}\), \(S_2=\{oo,of,fo,ff\}\), where "\(of\)" means "play o if player 1 plays O and f if he plays F".</li></ul>
${box('tip', H`<p>Number of pure strategies = product of the number of actions over all of the player's information sets. Two information sets with two actions each: \(2\times2=4\). Information sets that are never reached still count! (Exercise 3, joint venture: player 1 has 2 information sets and 4 strategies AE, AF, BE, BF.)</p>`)}
<p><strong>Mixed strategy:</strong> a probability distribution over pure strategies. This course does not analyse mixed strategies in sequential games.</p>

<h2 id="s4">4. Backward induction and sequential rationality</h2>
<p>A sequential game with finitely many stages and perfect information is solved from the end by <strong>backward induction</strong>.</p>
${tree('l6entry', null, { solve: 1 })}
${steps('Solve the market-entry game', [
'Monopolist (last mover): after entry, fighting (f) gives -1 and sharing (n) gives 1. It shares.',
'Entrant: anticipates sharing; entering gives 2, staying out 0. It enters.',
'Backward-induction outcome \\((E,n)\\). It is a Nash equilibrium: n is best against E and E is best against n.',
'Write the normal form and search for all Nash equilibria: a second one, \\((N,f)\\), appears.'])}
${mx({ p1: 'Entrant', p2: 'Monopolist', rows: ['E', 'N'], cols: ['f', 'n'], cells: [['-1,-1', '2,1'], ['0,2', '0,2']], br: true, cap: 'Two Nash equilibria: (E,n) and (N,f).' })}
${box('intu', '<p>In \\((N,f)\\) the monopolist "threatens" to fight entry. But this is a <strong>non-credible threat</strong>: once entry happens, fighting is not in its interest (-1 < 1). Because the threat is never tested in equilibrium (the entrant stays out), Nash equilibrium cannot detect it. Dynamic games need a stronger concept.</p>')}
${box('def', H`<p>Given the opponents' strategies \(\sigma_{-i}\in\Delta S_{-i}\), \(\sigma_i\) is <strong>sequentially rational</strong> if and only if \(i\) plays a best response to \(\sigma_{-i}\) in <em>each</em> of his information sets. A player's strategy must prescribe an optimal action at every information set, including those not reached in equilibrium.</p>`)}
${box('thm', '<p><strong>Zermelo\'s theorem:</strong> any finite game of perfect information has a backward-induction solution that is sequentially rational. If no two terminal nodes give the same payoff to any player, the backward-induction solution is unique.</p>')}

<h2 id="s5">5. Application: wages and employment</h2>
<p>Leontief (1946); McDonald and Solow (1981). Two stages: (1) the union (player 1) sets the wage \(w\); (2) the firm (player 2) sets employment \(L\). Backward induction: first the firm's best response \(L(w)\).</p>
${steps('Stage 2: the firm', [
H`Revenue \(R(L)\) is increasing and strictly concave: \(R'(L)>0,\ R''(L)<0\). Profit maximisation: \(\max_L \pi(L)=R(L)-wL\Rightarrow R'(L)=w\).`,
H`Optimal employment \(L^*(w)\) is decreasing in \(w\): since \(R'\) is decreasing, a higher \(w\) is matched at a lower \(L\) (\(L'(w)=1/R''<0\)).`,
H`<strong>Iso-profit lines</strong> (wages that keep profit at \(\bar\pi\)): \(R(L)-wL=\bar\pi\iff w=\dfrac{R(L)-\bar\pi}{L}\), slope \(\dfrac{dw}{dL}=\dfrac{R'(L)L-(R(L)-\bar\pi)}{L^2}\).`,
H`With \(\lim_{L\to0}R'(L)=\infty\) and \(\lim_{L\to\infty}R'(L)=0\): for small \(L\) the slope is positive (more employment must go with a higher wage to keep profit constant), for large \(L\) negative. Each iso-profit line peaks on \(L^*(w)\) (since \(dw/dL=0\iff R'(L)=w\)). <strong>Lower</strong> iso-profit lines mean <strong>higher</strong> profits.`])}
${steps('Stage 1: the union', [
H`The union's utility \(U(w,L)\) is strictly increasing in \(w\) and \(L\) and quasiconcave (convex indifference curves).`,
H`The union anticipates \(L^*(w)\) and chooses the highest indifference curve compatible with it: the tangency point \((w^*,L^*)\).`,
H`\((w^*,L^*)\) is <strong>inefficient</strong>: there the union's indifference curve is tangent to \(L^*(w)\), while the firm's iso-profit line is flat. A lens between the two curves appears: unions and companies could both do better by choosing a point within the shaded ellipse, i.e. lowering the wage a little and raising employment a little makes both better off.`,
'Policy implication: the inefficiency arises because wages and employment are not negotiated at the same time. The model is an argument for negotiating them jointly (which is often the case).'])}
${W('union')}
${quiz('q-l6', [
 { q: 'How many pure strategies does player 2 have in the sequential BoS?', o: ['2', '4', '8', '3'], a: 1, e: '2 information sets × 2 actions: 4 (oo, of, fo, ff).' },
 { q: 'Why is (N, f) in the entry game unconvincing?', o: ['It is not a Nash equilibrium', 'The threat to fight is not credible: after entry the monopolist prefers to share', 'The entrant is irrational', 'Payoffs are equal'], a: 1, e: 'A threat that is never tested in equilibrium but would not be carried out if tested.' },
 { q: 'Which is a game of perfect information?', o: ['A game with a move of nature', 'A game where every information set is a singleton and there is no move of nature', 'A game with unknown payoffs', 'A simultaneous game'], a: 1, e: 'Definition.' },
 { q: 'When is the backward-induction solution unique (Zermelo)?', o: ['Always', 'If no two terminal nodes give any player the same payoff', 'If the game is infinite', 'With mixed strategies'], a: 1, e: 'Ties can create several optimal actions.' },
 { q: 'Why is the union-firm outcome inefficient?', o: ['The firm does not maximise profit', 'Wages and employment are not negotiated at the same time', 'The union is irrational', 'Revenue is linear'], a: 1, e: 'The union only sets w; the firm unilaterally sets L.' },
])}
`});

lesson({
  id: 'l7', no: 7, part: 'II. Dynamic games, complete information', title: 'Dynamic games with imperfect information: subgame perfection',
  read: 'Gibbons ch. 2.2 and 2.4 · Tadelis ch. 8',
  goals: [
    'Explain why backward induction fails with imperfect information and in infinite games',
    'Define a proper subgame and count the subgames of a tree',
    'Define subgame perfect Nash equilibrium (SPE) and relate it to Nash equilibrium',
    'Apply generalised backward induction (replace subgames by Nash equilibrium payoffs)',
    'Discuss Rosenthal\'s centipede and the interpretation of off-path deviations',
  ],
  html: H`
<h2 id="s1">1. Limits of backward induction</h2>
<p><strong>Problem 1: imperfect information.</strong> In the voluntary Battle of the Sexes, player 1 first decides whether to play (Y) or not (N); if yes, a simultaneous BoS follows. Player 2's best response is not well defined without a <em>belief</em> about what player 1 chose. We cannot start at the end.</p>
${tree('l7vbos')}${steps('Solution (with the tools of this lecture: SPE)', GT.treeSol.l7vbos)}
<p><strong>Problem 2: games that are not finite.</strong> Infinite games have no finite set of terminal nodes, so they cannot be solved from behind (e.g. Rubinstein bargaining, infinitely repeated games).</p>
<p>This lecture: a general solution concept for dynamic games (finite and infinite) with perfect and imperfect information.</p>

<h2 id="s2">2. Subgames</h2>
${box('def', H`<p>A <strong>proper subgame</strong> \(G\) of an extensive-form game \(\Gamma\) consists of a single node and all its successors in \(\Gamma\), with the property that if \(x\in G\) and \(x'\in h(x)\) then \(x'\in G\). \(G\) is itself a game tree with information sets and payoffs inherited from \(\Gamma\).</p>`)}
${box('en', '<p>A subgame is a subset of the game that (1) begins at a decision node n that is a singleton information set, (2) includes all decision and terminal nodes following n (but no nodes that do not follow n), and (3) does not cut any information set: if a node n\' follows n, all other nodes in the information set containing n\' must also follow n. (Graded definition from the Dec 2013 exam.)</p>')}
${steps('Does the card game have proper subgames?', [
'Nature pulls a card from a deck of kings (K) and aces (A): an ace or a king with probability ½ each. Player 1 sees the card and decides to play (Y) or not (N). If 1 plays, player 2 folds (F) or calls (C) without knowing the card. Player 2 loses against an ace and wins against a king.',
H`Could \(x_1\) (or \(x_2\)) start a subgame? Its successor \(x_3\) would be in it, so \(x_4\) (same information set) must be too. But \(x_4\) is not a successor of \(x_1\). The property is violated.`,
'Hence the only proper subgame is the complete game.'])}
${tree('l7cards')}${steps('Solution of the card game', GT.treeSol.l7cards)}
${box('tip', '<p>To count subgames: (1) every decision node that is a <em>singleton</em> information set is a candidate; (2) check that no information set below it is cut; (3) count the whole game too. Example: two entrepreneurs game has 3 subgames (whole game + player 2\'s two nodes).</p>')}

<h2 id="s3">3. Subgame perfect Nash equilibrium (SPE)</h2>
${box('def', H`<p>Let \(\Gamma\) be an \(n\)-player extensive-form game. A behavioural strategy profile \(\sigma^*=(\sigma_1^*,\dots,\sigma_n^*)\) is a <strong>subgame perfect (Nash) equilibrium</strong> if for every proper subgame \(G\) of \(\Gamma\) the restriction of \(\sigma^*\) to \(G\) is a Nash equilibrium in \(G\).</p>
<p>Strategies must form a Nash equilibrium in <strong>every subgame</strong>: mutual best responses on <em>and off</em> the equilibrium path. (Reinhard Selten, 1975; Nobel prize 1994.)</p>`)}
${box('en', '<p>A strategy profile of an extensive-form game is subgame perfect if it induces a Nash equilibrium in every subgame of that game.</p>')}
<h3>A simple example</h3>
${tree('l7simple', null, { solve: 1 })}
${steps('Subgames, equilibrium path and SPE', [
'Subgames: 3 (whole game + player 2\'s two nodes).',
'After L, player 2: l gives 1, r gives 2: r. After R: l gives 1, r gives 0: l.',
'Player 1: L leads to (1,2) and gives 1; R leads to (2,1) and gives 2. He picks R.',
H`SPE: \((R,rl)\). Equilibrium path: \((R,l)\). The SPE also specifies what happens off the path (r after L), because a strategy is a complete plan of actions.`,
H`A second Nash equilibrium \((L,rr)\) exists, but it is <strong>not</strong> subgame perfect: it contains the non-credible threat that player 2 plays r if player 1 plays R. (Strategy \(ll\) of player 2 means: play l after L and also l after R.)`])}
${mx({ rows: ['L', 'R'], cols: ['ll', 'lr', 'rl', 'rr'], cells: [['3,1', '3,1', '1,2', '1,2'], ['2,1', '0,0', '2,1', '0,0']], br: true, cap: 'Normal form. Shaded: pure NE (R, ll), (R, rl), (L, rr). Only (R, rl) is subgame perfect; (R, ll) prescribes l after L, which is not optimal in that subgame.' })}
${box('warn', H`<p>Writing just "R" or "(R,l)" is not an SPE: give player 2's action at <em>all</em> information sets, e.g. \((R;\,rl)\).</p>`)}
<h3>General remarks</h3>
<ul><li>Subgame perfection is well defined for games with imperfect information too.</li>
<li>Every SPE is a Nash equilibrium, but not every Nash equilibrium is subgame perfect.</li>
<li>Every finite extensive-form game has at least one SPE.</li>
<li>In finite games of perfect information, the set of SPE coincides with the set of Nash equilibria that survive backward induction.</li></ul>

<h2 id="s4">4. Solution procedure: backward induction with imperfect information</h2>
<ol><li>Start at the end of the tree and find the Nash equilibrium of each smallest subgame (these are finite games, so at least one NE exists, possibly mixed).</li>
<li>Choose one NE for each smallest subgame and build the <strong>reduced</strong> game in which these subgames are replaced by the equilibrium payoff vectors.</li>
<li>Repeat steps 1 and 2 on the reduced game until every move is determined; this gives an SPE.</li></ol>
<h3>Example: the extended market-entry game</h3>
${tree('l7entry')}
${steps('Step-by-step solution', [
'How many subgames? 2: the whole game and the subgame after "In" (where E and I simultaneously choose Fight or Accommodate).',
'Write the smallest subgame as a matrix (below). For E, Acc strictly dominates (3>1, -2>-3); I answers Acc with Acc (1>-1). Unique NE: (Acc, Acc) with payoffs (3,1).',
'Replace the subgame by (3,1). In the reduced game, E gets 3 from In and 0 from Out: In.',
H`SPE: \(s^*=(In,Acc;\ Acc)\).`])}
${mx({ p1: 'Firm E', p2: 'Firm I', rows: ['Acc', 'Fig'], cols: ['Acc', 'Fig'], cells: [['3,1', '-2,-1'], ['1,-2', '-3,-1']], br: true })}

<h2 id="s5">5. Rosenthal's centipede</h2>
<p>Players 1 and 2 take turns and each time decide whether to stop (\(s\)) or continue (\(w\)). Payoffs grow as the game continues: \((1,1),(0,3),(2,2),\dots,(97,100),(99,99),(98,101),(100,100)\).</p>
${tree('l7cent', null, { solve: 1 })}
<p class="small muted">Shortened 4-stage version with the same pattern; backward induction gives "s" at every node.</p>
<ul><li>Unique SPE: each player ends the game whenever it is his turn. Outcome (1,1), although continuing could give both 100.</li>
<li>What if player 1 does not end the game in period 1? Should player 2 still stick to the equilibrium strategy? Is 1 irrational, or signalling cooperation?</li>
<li>Whether this SPE is convincing depends crucially on how players <strong>interpret deviations</strong> from the equilibrium path.</li></ul>
${box('ex', '<p><strong>Evidence (Osborne, box on p. 234):</strong> McKelvey and Palfrey (1992) let 58 US students play a six-period centipede 9 or 10 times against changing opponents, with stakes growing from $0.40/$0.10 to $25.60/$6.40. Games ended earlier as subjects gained experience, but even experienced players were far from the SPE prediction of stopping in period 1.</p>', 'From Osborne (2009)')}
${box('ex', H`<p><strong>Centipedes (WS 2024/25 Exercise 3, Q3):</strong> pot of $6. Grab (G) takes 2/3 of the pot, the other gets 1/3; share (S) multiplies the pot by 3/2 and the other moves. Order 1, 2, 1, 2; if 2 shares at the last stage the pot is multiplied by 3/2 again, 2 gets 1/3 and 1 gets 2/3.</p>
${tree('exCent', null, { solve: 1 })}
${steps('Solution', [
H`(a) Perfect information (all information sets are singletons, no Nature). Pot: 6 → 9 → 13.5 → 20.25 → 30.375.`,
'(b) 5 terminal nodes, 4 information sets (2 per player). (c) Each player has 2·2 = 4 pure strategies.',
H`(d) Backward: last node, 2: G gives 13.5, S gives 10.125 → G. Before: 1: G 9 > 6.75 → G. 2: G 6 > 4.5 → G. 1: G 4 > 3 → G. SPE: everybody grabs at every node.`,
H`Nash equilibria: player 1 grabs at his first node (anything at the second), player 2 grabs at his first node (anything at the second): 4 NE but <strong>a single outcome</strong> (4,2). Only (GG, gg) is sequentially rational.`,
H`(e) Now S at the last stage splits equally: 30.375/2 = 15.1875 each. Last node, 2: S (15.19 > 13.5); 1: S (15.19 > 9); 2: S (15.19 > 6); 1: S (15.19 > 4). The SPE has everybody sharing, outcome (15.19, 15.19). The old NE (GG, gg) is still a Nash equilibrium (if 1 grabs, 2's off-path actions do not matter; if 2 grabs, sharing gives 1 only 3 < 4), but it is no longer an SPE. So the answer changes.`])}
${tree('exCent2', null, { solve: 1 })}`)}
${box('ex', H`<p><strong>Joint venture (WS 2024/25 Exercise 3, Q2):</strong> 1: A (accept a mediocre offer, end) or B (push). 2: C (favourable terms, end) or D (reject). 1: E (final concession) or F (end negotiations). Payoffs A (2,0), C (3,1), E (0,0), F (1,2).</p>
${tree('exJV', null, { solve: 1 })}
${steps('Solution', [
'(a) Perfect information. (b) 4 terminal nodes; 3 information sets (2 for player 1, 1 for player 2). (c) Player 1: AE, AF, BE, BF (4); player 2: C, D (2).',
'(d) Normal form below. Nash equilibria: (AE, D), (AF, D), (BE, C). (BE, C) may look more "appealing": (3,1) is better for both than (2,0).',
H`(e) Sequential rationality: at the last node 1 picks F (1 > 0), so E is a non-credible promise; (AE,D) and (BE,C) are not sequentially rational. Player 2: C gives 1, D (leading to F) gives 2 → D. Player 1: A gives 2, B gives 1 → A. Unique SPE \((AF,D)\), outcome (2,0).`])}
${mx({ rows: ['AE', 'AF', 'BE', 'BF'], cols: ['C', 'D'], cells: [['2,0', '2,0'], ['2,0', '2,0'], ['3,1', '0,0'], ['3,1', '1,2']], br: true })}`)}
${box('ex', H`<p><strong>Dec 2013 exam, Q3 (Two entrepreneurs, 13 points):</strong> entrepreneur 1 moves first, 2 observes and then decides. If only one exploits a market gap he gets 4 and the other 0; if both do, both get \(-1\); if nobody does, both get 0.</p>
<div class="wgrid"><div><p class="eyebrow">Original</p>${tree('exEnt', null, { solve: 1 })}</div><div><p class="eyebrow">Envy: \(u_2=\pi_2+(\pi_2-\pi_1)\)</p>${tree('exEntEnvy', null, { solve: 1 })}</div></div>
${sol('Graded solution', H`<ol type="a"><li>(2p) Tree: above.</li>
<li>(3p) Subgame definition (box above) and number: 3 subgames, one of them the complete game.</li>
<li>(1p) SPE definition: a strategy profile that induces a Nash equilibrium in every subgame.</li>
<li>(3p) SPE \((T;\ NT,T)\): after T, 2 plays NT (0 > -1); after NT, T (4 > 0). Player 1: T gives 4, NT gives 0 → T. Intuition: entrepreneur 1 has a first-mover advantage and occupies the gap first.</li>
<li>(2p) Envious 2's utility \(2\pi_2-\pi_1\): (T,T): \(-1\); (T,NT): \(-4\); (NT,T): 8; (NT,NT): 0.</li>
<li>(2p) New SPE \((NT;\ T,T)\): after T, 2 picks T (\(-1>-4\)); after NT, T (8 > 0). Player 1: T gives \(-1\), NT gives 0 → NT. Intuition: due to envy, 2 can credibly commit to punish 1's use of the market gap.</li></ol>`)}`)}
${quiz('q-l7', [
 { q: 'Is every Nash equilibrium subgame perfect?', o: ['Yes', 'No; but every SPE is a Nash equilibrium', 'Only in infinite games', 'No NE is an SPE'], a: 1, e: 'SPE is a refinement of NE.' },
 { q: 'How many proper subgames does the card game have?', o: ['1 (the whole game)', '2', '3', '5'], a: 0, e: 'Player 1\'s nodes would cut player 2\'s information set.' },
 { q: 'Simple example (L:(3,1),(1,2); R:(2,1),(0,0)): what is the SPE?', o: ['(L, rr)', '(R, rl)', '(R, ll)', '(L, lr)'], a: 1, e: 'r after L, l after R; player 1 gets 2 with R.' },
 { q: 'In generalised backward induction, the smallest subgame is replaced by...', o: ['a random terminal node', 'the payoff vector of one of its Nash equilibria', 'the Pareto efficient outcome', 'zero'], a: 1, e: 'With several NE, each choice can lead to a different SPE.' },
 { q: 'Why does the outcome change with an envious entrepreneur 2?', o: ['Player 1 becomes envious', 'Envy makes player 2\'s punishment credible', 'The game becomes simultaneous', 'Information becomes incomplete'], a: 1, e: 'For 2, (T,T) = -1 > (T,NT) = -4.' },
])}
`});

lesson({
  id: 'l8', no: 8, part: 'II. Dynamic games, complete information', title: 'Bargaining I: ultimatum and alternating offers (Rubinstein)',
  read: 'Gibbons ch. 2.1.D · Rubinstein (1982) · Watson ch. 13 (multilateral bargaining)',
  goals: [
    'Find the Nash equilibria and the SPE of the ultimatum game; explain discrete vs. continuous money',
    'Discuss experimental evidence and apply Fehr-Schmidt inequality aversion',
    'Derive the SPE share of the infinite-horizon Rubinstein game step by step',
    'Comparative statics: patience and first-mover advantage',
    'Variations: risk of breakdown, outside options, three-player bargaining',
  ],
  html: H`
<h2 id="s1">1. The ultimatum game</h2>
<ul><li>Player A proposes how to split €100: own share \(x\), B's share \(100-x\).</li>
<li>B accepts (Ac) or rejects (Re). If B rejects, both get 0. When indifferent, B accepts.</li></ul>
${tree('ultD')}
<p class="small muted">The tree shows only two example offers; A actually chooses from a continuum.</p>
<ul><li>A's strategy: a demand \(x\) (e.g. "offer (73,27)").</li><li>B's strategy: the highest \(x\) he accepts (a threshold \(m\)): e.g. \(m=49\): "accept if \(x\le 49\), reject if \(x>49\)". A complete strategy assigns a response to every possible offer.</li></ul>
${steps('Nash equilibria: why infinitely many?', [
H`Take any split \((x,100-x)\), \(0\le x\le100\). Let B's strategy be "reject offers in which A demands more than \(x\)" (\(m=x\)).`,
H`A's best response: demand exactly \(x\) (more is rejected and gives 0, less is unnecessary).`,
H`B's best response: accepting \(x\) is optimal; his (off-path) responses to other offers do not affect his payoff. Mutual best responses: a Nash equilibrium. So the ultimatum game has <strong>infinitely many Nash equilibria</strong>.`,
H`But for \(m<100\), "reject offers with \(x>m\)" is not sequentially rational: facing \(x\in(m,100)\), rejecting gives 0 and accepting gives \(100-x>0\). The only payoff achievable as an SPE is \((100,0)\): B accepts everything and A demands \(x=100\).`])}
${box('ex', H`<p><strong>Modified game:</strong> suppose B rejects an offer of \(100-x=0\).</p>
<ul><li>With <strong>discrete</strong> money (e.g. cents) the SPE: A offers B the smallest positive unit (1 cent); B accepts every positive offer. Outcome (99.99, 0.01).</li>
<li>With <strong>continuous</strong> money there is no SPE: for any positive offer \(\varepsilon\), offering \(\varepsilon/2\) is better; there is no smallest positive number, so A has no best response.</li></ul>`, 'Careful: discrete vs. continuous')}
<h3>Experimental evidence</h3>
<ul><li>One of the first experiments: Güth et al. (1982), Cologne, 42 students, amounts between DM 4 and DM 10. The second player was offered <strong>33%</strong> on average; almost <strong>20%</strong> of offers were rejected, including offers of about 25%. Later experiments found similar results across people and stakes.</li>
<li>Andersen et al. (2011, AER): when the pie is nearly a year's wages, almost no recipient rejects a 20% offer.</li>
<li>Osborne (p. 183) adds details of Güth et al.: the average demand of player 1 was 0.65 of the pie in the first and 0.69 in the repeated session a week later; almost 20% of offers were rejected, including 3 DM out of 7 DM. Hoffman, McCabe and Smith (1996) found similar results with much larger stakes.</li></ul>
<p>Is SPE out of touch with reality? Not necessarily: (a) in reality we often face repeated games where punishment is useful; people may follow the rule of thumb "punish outrageous offers". (b) Maybe our assumption that more for oneself is always better is the problem: people may be <strong>inequality averse</strong> (monkey experiment: grapes vs. cucumber).</p>

<h2 id="s2">2. Inequality aversion (Fehr and Schmidt, 1999)</h2>
\[u_i(x_i,x_j)=x_i-\underbrace{\alpha_i\max\{x_j-x_i,0\}}_{\text{envy}}-\underbrace{\beta_i\max\{x_i-x_j,0\}}_{\text{empathy}}\]
<ul><li>\(\alpha_i\ge0\): suffering from disadvantageous inequality (envy); \(\beta_i\in[0,1)\): suffering from advantageous inequality (empathy, compassion).</li>
<li>\(\beta_i<1\): even compassionate agents prefer an increase in their own payoff to a reduction of inequality by the same amount.</li></ul>
${steps('Ultimatum game with an envious B (α = 0.5, β = 0)', [
H`A wants to make the lowest offer that B accepts. Accepting gives B \(u_B=100-x-0.5\max\{x-(100-x),0\}\); rejecting gives 0.`,
H`A obviously takes more than 50%, so \(\max\{x-(100-x),0\}=2x-100\).`,
H`The highest \(x\) that B accepts: \(100-x-0.5(2x-100)=0\iff 150-2x=0\iff x=75\).`,
H`General formula: \(100-x-\alpha(2x-100)=0\iff x^*=\dfrac{100(1+\alpha)}{1+2\alpha}\). \(\alpha=0\Rightarrow 100\); \(\alpha\to\infty\Rightarrow 50\).`])}
${W('ultimatum')}

<h2 id="s3">3. Alternating offers with an infinite horizon (Rubinstein game)</h2>
<ul><li>Stage 1: A offers \((x,1-x)\). Stage 2: B accepts or counter-offers \((y,1-y)\). Stage 3: A accepts or counter-offers... (forever).</li>
<li>Players are impatient with discount factors \(0< \delta_A,\delta_B<1\): a payoff \(x\) next period is worth \(\delta_Ax\) today, the period after \(\delta_A^2x\).</li>
<li>When indifferent between accepting and rejecting, players accept.</li></ul>
${box('intu', '<p>There is no last subgame! But the subgame starting at stage 3 (A proposes) looks <strong>exactly like the game in stage 1</strong>. By definition of SPE (NE in every subgame) the equilibrium strategy of that subgame must also be an equilibrium. So the offers in stages 1, 3, 5, 7, ... are the same (stationary equilibrium). This self-similarity trick solves the problem.</p>')}
${steps('Derivation of the SPE share', [
H`Define \(Z\) as the highest share A demands for himself that B accepts, in periods 1, 3, 5, ...`,
H`<strong>Stage 3:</strong> A offers B \(1-Z\); B accepts. Payoff vector \(\pi_3=(Z,1-Z)\), utility vector (from today) \(u_3=(Z\delta_A^2,(1-Z)\delta_B^2)\).`,
H`<strong>Stage 2:</strong> B knows A can secure \(Z\delta_A^2\) (today's value) in stage 3. B must guarantee A this utility but, maximising his own share, offers no more: A gets \(Z\delta_A\) in stage 2. \(\pi_2=(Z\delta_A,1-Z\delta_A)\), \(u_2=(Z\delta_A^2,(1-Z\delta_A)\delta_B)\).`,
H`<strong>Stage 1:</strong> A knows B can secure \((1-Z\delta_A)\delta_B\) in stage 2. A offers B exactly this and keeps the rest: \(Z=1-(1-Z\delta_A)\delta_B\).`,
H`Solve: \(Z-Z\delta_A\delta_B=1-\delta_B\Rightarrow \boxed{Z=\dfrac{1-\delta_B}{1-\delta_A\delta_B}}\); B gets \(1-Z=\dfrac{\delta_B-\delta_A\delta_B}{1-\delta_A\delta_B}\). The offer is accepted immediately: no delay.`])}
${W('rubinstein')}
${box('thm', H`<p><strong>Osborne, Proposition 471.3:</strong> the two-player alternating-offer game has a <strong>unique</strong> SPE: player 1 proposes \(x_1^*=\frac{1-\delta_2}{1-\delta_1\delta_2}\) and player 2 accepts immediately. Uniqueness means there are no non-stationary SPE with two players; the remark that "any division can be supported by a non-stationary SPE" (section 4) applies to three or more players.</p>`, 'From Osborne (2009)')}
<h3>Comparative statics</h3>
<ul><li>\(\dfrac{\partial Z}{\partial\delta_A}=\dfrac{\delta_B(1-\delta_B)}{(1-\delta_A\delta_B)^2}>0\): if A becomes more patient, his share increases.</li>
<li>\(\dfrac{\partial Z}{\partial\delta_B}=-\dfrac{1-\delta_A}{(1-\delta_A\delta_B)^2}<0\): if B becomes more patient, A's share falls.</li>
<li>\(\delta_A=\delta_B=\delta<1\): \(Z=\dfrac{1}{1+\delta}>0.5\), \(1-Z=\dfrac{\delta}{1+\delta}<0.5\). Intuition: <strong>first-mover advantage</strong>. \(\lim_{\delta\to1}Z=0.5\): infinitely patient players split 50:50.</li></ul>
${box('tip', '<p>Most common slip in the derivation: in stage 2, B offers A \\(Z\\delta_A\\), not \\(Z\\delta_A^2\\). Why? A share received in stage 2 is discounted once from the stage-1 perspective; A\'s \\(Z\\) in stage 3 is worth \\(Z\\delta_A\\) from the viewpoint of stage 2.</p>')}
<h3>Conclusions</h3>
<ul><li>Delay costs affect the division of the surplus even if agreement is reached immediately.</li>
<li>Negotiate at a time when your delay costs are low relative to your partner's. (Why do airline pilots strike at the start of the holiday season?)</li>
<li>Sometimes you can influence both delay costs: before wage negotiations increase inventories, or organise production so that outsourcing or production abroad is possible.</li></ul>
${box('ex', '<p><strong>Beetle delay costs (application: strikes).</strong> The New Beetle was produced in only one plant worldwide, in Puebla, Mexico, which also built Jettas and Golf Cabrios for the US and Canadian markets; almost 80% of its output was exported. On 18 August 2001, 12,500 workers went on strike. VW opened with a 7% pay rise, the union asked for 30%; by the second week the union had cut its demand to 19% while VW held firm at 7%.</p><p>VW put the cost of the strike at about $30 million of forgone production per day, so the 12-day strike cost about $360 million. VW AG\'s profit for 2000 was €524 million ($750 million): the strike cost almost half of the previous year\'s profit. But lost sales exaggerate the delay cost: VW does not pay wages during a strike; the US, Mexican and Canadian economies were entering a recession, so production would have been scaled back anyway; and lost production can be made up with overtime or with inventories built before the strike. VW\'s true delay costs may have been quite small, a fact the union may have misjudged, which may have led to the strike in the first place (Reuters, 28 August 2001).</p><p>Link to the model: the side with the lower delay cost (higher δ) gets the larger share.</p>', 'Case study from the slides')}

<h2 id="s4">4. Variations</h2>
<ul><li><strong>Risk of breakdown:</strong> no discounting, but each period is the last one with probability \(1-\delta\) (after a rejection the game continues with probability \(\delta\)). Formally completely equivalent to the Rubinstein game with equal discount factors.</li>
<li><strong>Outside options:</strong> a player may have an alternative if negotiations fail. It improves his bargaining power <strong>if and only if</strong> it is better than his equilibrium payoff.</li>
<li><strong>More than two players (multilateral bargaining):</strong> 3 players make alternating offers until one is unanimously accepted by the other two; common \(\delta\); €1 to divide.</li></ul>
${steps('Stationary SPE with 3 players', [
H`The proposer offers \(x^p\) to himself, \(x^n\) to the next proposer and \(x^i\) to the proposer after next.`,
H`Player \(n\) would be proposer next round and could secure \(x^p\): he accepts only if \(x^n\ge\delta x^p\).`,
H`Player \(i\) would be proposer in two rounds: he accepts only if \(x^i\ge\delta^2x^p\).`,
H`The proposer offers no more than necessary: \(x^p+\delta x^p+\delta^2x^p=1\Rightarrow x^p=\dfrac{1}{1+\delta+\delta^2}\).`,
H`Check with 2 players: \(Z+\delta Z=1\Rightarrow Z=\dfrac{1}{1+\delta}\) (as above). This shortcut does not work with different discount factors. Note: if non-stationary SPE are allowed, any division can be supported as an SPE.`])}
${quiz('q-l8', [
 { q: 'SPE payoff of the ultimatum game (continuous money, B accepts when indifferent)?', o: ['(50,50)', '(100,0)', '(75,25)', 'No SPE'], a: 1, e: 'B accepts every offer (sequential rationality), so A demands everything.' },
 { q: 'Fehr-Schmidt with α=1 for B: the largest share A can demand out of €100?', o: ['75', '66.67', '50', '100'], a: 1, e: 'x=100(1+α)/(1+2α)=200/3≈66.67.' },
 { q: 'Rubinstein with δA=0.9, δB=0.8: A\'s share Z?', o: ['0.714', '0.5', '0.643', '0.556'], a: 0, e: 'Z=(1-0.8)/(1-0.72)=0.2/0.28≈0.714.' },
 { q: 'What happens if B becomes more patient?', o: ['A\'s share rises', 'A\'s share falls', 'Nothing', 'Agreement is delayed'], a: 1, e: '∂Z/∂δB < 0.' },
 { q: 'Proposer\'s share in the stationary 3-player SPE?', o: ['1/3', '1/(1+δ+δ²)', 'δ/(1+δ)', '1/(1+δ)'], a: 1, e: 'xp + δxp + δ²xp = 1.' },
 { q: 'When does an outside option increase bargaining power?', o: ['Always', 'Only if it is better than the equilibrium payoff', 'Never', 'Only if δ=1'], a: 1, e: 'Otherwise the threat to leave is not credible: you get more in equilibrium anyway.' },
])}
`});

lesson({
  id: 'l9', no: 9, part: 'II. Dynamic games, complete information', title: 'Bargaining II: the Nash bargaining solution',
  read: 'Nash (1950) · Watson (2013) ch. 18 · Binmore, Rubinstein and Wolinsky (1986)',
  goals: [
    'Write the Nash bargaining solution as a maximisation problem and solve it',
    'Interpret "disagreement point plus half the surplus"',
    'Compute the salary in the Rosemary and Jerry example',
    'Use the generalised Nash solution with bargaining power α',
    'Explain the two motivations (equivalence to Rubinstein and the axioms, especially IIA)',
  ],
  html: H`
<h2 id="s1">1. Why another approach?</h2>
<p>In Lecture 8 we modelled offers and counter-offers explicitly; bargaining power came from (i) making the first offer and (ii) being more patient (the discount factor). Two drawbacks: there may be other sources of bargaining power (experience, a higher position, ...), and the modelling was a bit tricky. Now an alternative approach that is not based on game theory: the <strong>Nash bargaining solution</strong> (Nash, 1950, Econometrica).</p>

<h2 id="s2">2. Definition and solution</h2>
<ul><li>If they reach an agreement, two players attain a joint value \(v^*\) and bargain over how to divide it.</li>
<li>\(x_1,x_2\): shares; \(d_1,d_2\): <strong>disagreement points</strong> (what they get if bargaining fails).</li></ul>
${box('def', H`\[(x_1^*,x_2^*)=\arg\max_{x_1,x_2}\ (x_1-d_1)(x_2-d_2)\quad\text{s.t.}\quad x_1+x_2\le v^*\]`, 'Nash bargaining solution')}
${steps('Step-by-step solution', [
H`The constraint binds. Why? Otherwise raising \(x_1\) a bit increases the product (and stays feasible). So \(x_2=v^*-x_1\).`,
H`Substitute: \(x_1^*=\arg\max_{x_1}(x_1-d_1)(v^*-x_1-d_2)\).`,
H`FOC (product rule): \((v^*-x_1-d_2)-(x_1-d_1)=0\Rightarrow 2x_1=v^*-d_2+d_1\).`,
H`\(x_1^*=d_1+0.5(v^*-d_1-d_2)\) and by symmetry \(x_2^*=d_2+0.5(v^*-d_1-d_2)\).`,
H`<strong>In words:</strong> each player gets his fall-back option \(d_i\) <em>plus</em> half of the surplus from negotiations, \(v^*-d_1-d_2\).`])}

<h2 id="s3">3. Example: Rosemary and Jerry (Watson ch. 18)</h2>
<p>Rosemary chairs the English department of a high school; Jerry, a professional actor, wants to work there as drama teacher.</p>
<ul><li>Jerry loves teaching: being a drama teacher is worth $10,000 to him personally. The school values his work at $40,000. Joint value if bargaining succeeds: \(v^*=50{,}000\).</li>
<li>They bargain over the salary \(t\): \(x_R=40{,}000-t\), \(x_J=10{,}000+t\).</li>
<li>Disagreement points: Jerry \(d_J=15{,}000\) (working on his own); Rosemary \(d_R=10{,}000\) (value of hiring a less qualified applicant). Equal bargaining power.</li></ul>
${steps('Compute the salary', [
H`Surplus: \(v^*-d_J-d_R=50{,}000-15{,}000-10{,}000=25{,}000\). Half: 12,500.`,
H`Jerry: \(10{,}000+t=15{,}000+12{,}500\Rightarrow t=17{,}500\).`,
H`Check with Rosemary: \(40{,}000-t=10{,}000+12{,}500\Rightarrow t=17{,}500\). Consistent.`,
'Jerry is employed at a salary of 17,500.'])}
${W('nashbarg')}

<h2 id="s4">4. The generalised Nash bargaining solution</h2>
${box('def', H`\[(x_1^*,x_2^*)=\arg\max\ (x_1-d_1)^{\alpha}(x_2-d_2)^{1-\alpha}\quad\text{s.t.}\quad x_1+x_2\le v^*,\ \alpha\in(0,1)\]
<p>Solution: \(x_1^*=d_1+\alpha(v^*-d_1-d_2)\), \(x_2^*=d_2+(1-\alpha)(v^*-d_1-d_2)\). \(\alpha\) measures player 1's <strong>bargaining power</strong>.</p>`)}
${sol('Derivation (appendix, not relevant for the exam)', H`<p>The constraint binds: \(\max_{x_1}(x_1-d_1)^\alpha(v^*-x_1-d_2)^{1-\alpha}\). FOC:
\(\alpha(x_1-d_1)^{\alpha-1}(v^*-x_1-d_2)^{1-\alpha}-(1-\alpha)(x_1-d_1)^\alpha(v^*-x_1-d_2)^{-\alpha}=0\). Multiply by \((x_1-d_1)^{1-\alpha}(v^*-x_1-d_2)^{\alpha}\): \(\alpha(v^*-x_1-d_2)-(1-\alpha)(x_1-d_1)=0\Rightarrow x_1^*=\alpha(v^*-d_2)+(1-\alpha)d_1=d_1+\alpha(v^*-d_1-d_2)\).</p>`)}

<h2 id="s5">5. Two ways to motivate the Nash bargaining solution</h2>
<h3>1) Equivalence with the alternating-offer game</h3>
<p>If two agents bargain over \(v^*\) and the Nash solution gives \((x_1^*,x_2^*)\), there exists a profile of discount factors \((\delta_A,\delta_B)\) such that the alternating-offer game leads to the same allocation (Binmore, Rubinstein and Wolinsky, RAND Journal of Economics). Patience can be read as one source of the bargaining power \(\alpha\).</p>
<h3>2) The axiomatic approach (Nash's original approach)</h3>
<p>The generalised Nash solution is the <strong>only</strong> bargaining solution that satisfies:</p>
<ul><li><strong>Pareto efficiency</strong></li><li><strong>Individual rationality</strong> (every agent gets at least his reservation utility)</li><li><strong>Invariance to independent changes of the units in which utility is measured</strong> (it uses cardinal information but no interpersonal comparison of utilities)</li><li><strong>Independence of irrelevant alternatives (IIA)</strong></li></ul>
${box('thm', H`<p><strong>Osborne, Proposition 486.2</strong> states the axioms slightly differently: the <em>symmetric</em> Nash solution \(\max(u_1-d_1)(u_2-d_2)\) is the unique solution satisfying invariance (INV), <strong>symmetry</strong> (SYM), IIA and Pareto efficiency (PAR). Dropping symmetry gives the generalised solution with weights \(\alpha,1-\alpha\), which is the version on the slides (where individual rationality is listed instead). <strong>Proposition 490.1:</strong> the SPE outcome of the alternating-offer game with a risk of breakdown (no discounting) converges to the Nash bargaining solution as the breakdown probability goes to 0. This is the formal version of motivation 1.</p>`, 'From Osborne (2009)')}
${box('def', H`<p>If \((x_1^*,x_2^*)\) is a "reasonable" outcome in the bargaining set \(v\), and we consider a \(v'\) that is smaller than \(v\) but still contains \((x_1^*,x_2^*)\) (we remove only "irrelevant alternatives"), then \((x_1^*,x_2^*)\) remains the reasonable outcome.</p>`, 'Independence of irrelevant alternatives')}
${W('iia')}
${quiz('q-l9', [
 { q: 'v*=100, d1=20, d2=40. Symmetric Nash solution x1?', o: ['50', '40', '30', '60'], a: 1, e: 'Surplus 40, half 20: x1=20+20=40, x2=40+20=60.' },
 { q: 'Generalised solution with α=0.75, v*=100, d1=d2=0: x1?', o: ['75', '50', '25', '100'], a: 0, e: 'x1=d1+α·surplus=75.' },
 { q: 'If Jerry\'s outside option were 25,000 instead of 15,000, the salary t would be...', o: ['17,500', '22,500', '25,000', '20,000'], a: 1, e: 'Surplus 15,000, half 7,500: 10,000+t=25,000+7,500 → t=22,500.' },
 { q: 'Why does the constraint bind in the Nash solution?', o: ['By assumption', 'Pareto efficiency: giving the rest of the pie to someone raises the product', 'Because of IIA', 'Because d1=d2'], a: 1, e: 'No surplus is left undistributed.' },
 { q: 'Which of these is NOT one of Nash\'s axioms?', o: ['Pareto efficiency', 'Individual rationality', 'Independence of irrelevant alternatives', 'Interpersonal comparison of utility'], a: 3, e: 'On the contrary: unit invariance rules out interpersonal comparisons.' },
])}
`});

lesson({
  id: 'l10', no: 10, part: 'II. Dynamic games, complete information', title: 'Repeated games and the Folk theorem',
  read: 'Gibbons ch. 2 · Osborne ch. 14-15 · ncase.me/trust',
  goals: [
    'Show why a finitely repeated game has a unique SPE if the stage game has a unique NE',
    'Use present values and the geometric series in infinitely repeated games',
    'Prove in two steps that grim trigger is an SPE and find the critical δ',
    'Define feasible and average payoffs',
    'State and interpret the Folk theorem',
  ],
  html: H`
<h2 id="s1">1. Repeated games</h2>
<ul><li>Games in which the same <strong>stage game</strong> is played at every stage.</li><li>All players learn the result of the last stage before the next one starts.</li><li>A special case of dynamic games with interesting properties: <strong>threats and promises</strong> about future behaviour can influence present behaviour.</li></ul>

<h2 id="s2">2. Finitely repeated games</h2>
${box('def', H`<p>Let \(G=\{I,S_i,u_i\}\) be the stage game in normal form. \(G(T,\delta)\) denotes the finitely repeated game in which \(G\) is played \(T\) consecutive times and \(\delta\) is the common discount factor.</p>`)}
${mx({ rows: ['O', 'U'], cols: ['L', 'R'], cells: [['1,1', '5,0'], ['0,5', '4,4']], br: true, cap: 'Stage game (Prisoner\'s Dilemma): unique NE (O, L) with payoffs (1,1). U/R = cooperation.' })}
${steps('Prisoner\'s Dilemma played twice (no discounting)', [
H`Backward induction: the last subgame (stage 2) is the stage game; its unique NE is \((O_2,L_2)\) with (1,1), whatever happened in stage 1.`,
'The "reduced" game in stage 1: add stage 2\'s (1,1) to every cell.',
H`The unique NE of the reduced game is \((O_1,L_1)\).`,
H`Unique SPE: \(((O_1,O_2),(L_1,L_2))\): in every stage, whatever the history, O and L.`])}
${mx({ rows: ['O1', 'U1'], cols: ['L1', 'R1'], cells: [['2,2', '6,1'], ['1,6', '5,5']], br: true, cap: 'Reduced game in stage 1 (+1, +1 in every cell).' })}
${box('thm', H`<p>If the stage game \(G\) has a <strong>unique</strong> Nash equilibrium, the finitely repeated game \(G(T,\delta)\) has a unique SPE: the stage-game NE is played at every stage. In this class of games, the SPE is independent of the "history" of the game.</p>`)}
${box('warn', '<p>The result relies on a <em>unique</em> stage-game NE. If the stage game has several NE, making the last-stage equilibrium depend on the history (reward or punishment) can support cooperation in earlier stages.</p>')}

<h2 id="s3">3. Infinitely repeated games</h2>
\[\pi_1+\delta\pi_2+\delta^2\pi_3+\dots=\sum_{t=1}^{\infty}\delta^{t-1}\pi_t,\qquad \delta\in(0,1)\]
<p>Written \(G(\infty,\delta)\) or \(G(\delta)\). Question: can cooperation \((U,R)\) occur at every stage, although the only stage-game NE is \((O,L)\)?</p>
${box('def', H`<p><strong>Player 2:</strong> "Play R at \(t=1\). At \(t\ge2\), play R if the outcome of all previous \(t-1\) stages was \((U,R)\); otherwise play L (forever)." Player 1 uses the equivalent strategy with U and O.</p>`, 'Grim trigger strategy')}
${steps('Proof, step 1: for δ large enough mutual grim trigger is a NE', [
H`(a) If both stick to the strategy, \((U,R)\) is played every stage: payoffs 4, 4, 4, ... Present value: \(4+4\delta+4\delta^2+\dots=4\sum_{t=1}^\infty\delta^{t-1}=\dfrac{4}{1-\delta}\).`,
H`(b) If player 1 sticks to it but player 2 deviates: 2's stream is 5, 1, 1, ... (5 once, then punishment forever). Present value: \(5+\delta+\delta^2+\dots=5+\dfrac{\delta}{1-\delta}\).`,
H`Deviation does not pay if \(\dfrac{4}{1-\delta}\ge5+\dfrac{\delta}{1-\delta}\iff 4\ge 5(1-\delta)+\delta=5-4\delta\iff \delta\ge\dfrac14\).`,
H`General formula (cooperation payoff \(R\), temptation \(T\), punishment \(P\)): \(\dfrac{R}{1-\delta}\ge T+\dfrac{\delta P}{1-\delta}\iff\delta\ge\dfrac{T-R}{T-P}\). Here \(\dfrac{5-4}{5-1}=\dfrac14\).`])}
${steps('Proof, step 2: NE in every subgame', [
'Every subgame of the infinitely repeated game is identical to the whole game. Subgames fall into two groups:',
H`(1) Subgames where all previous outcomes were \((U,R)\): for \(\delta\ge1/4\) grim trigger is a NE of this subgame (step 1).`,
H`(2) Subgames where at least one previous outcome was not \((U,R)\): the strategies prescribe \((O,L)\) forever, i.e. the stage NE repeated; unilateral deviation does not pay. NE.`,
H`NE in both groups, so for \(\delta\ge1/4\) mutual grim trigger is an <strong>SPE</strong>.`])}
${W('repeated')}
${box('warn', H`<p>The lecture's trigger strategy reacts to the <strong>outcome</strong> ("if all previous outcomes were (U,R)"), so after <em>any</em> deviation, including your own, both play the stage NE. Osborne (section 14.10) shows why this matters: if a player only reacts to the <em>opponent's</em> past defection ("grim trigger" in his chapter 14), the pair is a Nash equilibrium but <strong>not</strong> subgame perfect, because after player 1 deviates once, player 2 would rather keep cooperating than follow through with the punishment. The "modified grim trigger" that punishes after any defection (the lecture's version) is an SPE for \(\delta\ge\frac{T-R}{T-P}\) (Osborne's PD with payoffs 2, 3, 1: \(\delta\ge\tfrac12\)). In the exam, define the strategy via the outcome of previous stages, exactly as on the slide.</p>`, 'Careful with the definition')}
${box('def', '<p><strong>Tit-for-tat:</strong> cooperate in period 1, then copy what the other player did in the previous period. For δ large enough, such punishment strategies also lead to mutual cooperation in SPE (limited, forgiving punishment).</p>')}

<h2 id="s4">4. The Folk theorem</h2>
${box('def', H`<p><strong>Feasible payoffs:</strong> \((x_1,\dots,x_n)\) is feasible if it is a <strong>convex combination</strong> of the payoff combinations of the stage game (non-negative weights summing to 1).</p>
<p><strong>Average payoff:</strong> \((1-\delta)\sum_{t=1}^\infty\delta^{t-1}\pi_t\). For constant \(\pi_t=\pi\), \(\sum\delta^{t-1}\pi=\dfrac{\pi}{1-\delta}\), so the average payoff equals \(\pi\). It is a rescaling of the present value by \(1-\delta\): maximising it is equivalent; its advantage is direct comparability with stage-game payoffs.</p>`)}
${box('thm', H`<p><strong>Folk theorem (Friedman, 1971):</strong> let \(G\) be a finite static game with complete information. Let \((e_1,\dots,e_n)\) be the payoffs of a Nash equilibrium of \(G\) and \((x_1,\dots,x_n)\) a feasible payoff of \(G\). If \(x_i>e_i\) for all \(i\) and \(\delta\) is sufficiently close to 1, then there exists an SPE of the infinitely repeated game \(G(\infty,\delta)\) that achieves average payoff \((x_1,\dots,x_n)\).</p>`)}
${W('folk')}
<ul><li><strong>Implication:</strong> with δ large enough, an SPE with better payoffs than the stage NE is achievable (e.g. mutual cooperation in the Prisoner's Dilemma).</li>
<li>An infinitely repeated game has <strong>infinitely many SPE</strong> with very different outcomes; the Folk theorem has little predictive power: "almost all" payoffs can be achieved if players are patient enough.</li>
<li>Osborne, Proposition 447.1 adds two facts for the Prisoner's Dilemma: in <em>every</em> SPE each player's average payoff is at least the stage NE payoff, and for <em>every</em> δ playing the stage NE forever is an SPE. Proposition 461.1: if the stage game has two Nash equilibria with different payoffs for each player, a folk theorem also holds for long <em>finitely</em> repeated games (see the warning box in section 2).</li>
<li>Question: is the alternating-offer game of Lecture 8 a repeated game? No: the same stage game is not played every period (the game ends with an agreement and payoffs are realised only once).</li></ul>
${box('def', H`<p>Let \(x:=1+\delta+\delta^2+\dots\). Multiply by \(\delta\): \(\delta x=\delta+\delta^2+\dots\). Subtract: \((1-\delta)x=1\Rightarrow x=\dfrac{1}{1-\delta}\). Hence \(\pi\sum_{t=0}^\infty\delta^t=\dfrac{\pi}{1-\delta}\) and \(\sum_{t=2}^\infty\delta^{t-1}=\dfrac{\delta}{1-\delta}\).</p>`, 'Appendix: geometric series')}
${quiz('q-l10', [
 { q: 'Prisoner\'s Dilemma with T=6, R=4, P=1. Critical δ for grim trigger?', o: ['0.4', '0.5', '0.25', '0.6'], a: 0, e: '(T-R)/(T-P)=2/5=0.4.' },
 { q: 'The stage game has a unique NE and is repeated 10 times. SPE?', o: ['Cooperation in the last round', 'Stage NE in every round', 'Grim trigger', 'Infinitely many SPE'], a: 1, e: 'Backward induction.' },
 { q: 'Present value of the stream 5, 1, 1, 1, ...?', o: ['5/(1-δ)', '5+δ/(1-δ)', '6/(1-δ)', '5+1/(1-δ)'], a: 1, e: '5 + δ + δ² + ... = 5 + δ/(1-δ).' },
 { q: 'Why is the Folk theorem said to have little predictive power?', o: ['There is no SPE', 'There are (infinitely) many SPE', 'It applies only to finite games', 'It requires δ=0'], a: 1, e: 'Almost every individually rational feasible payoff can be supported.' },
 { q: 'Advantage of the average payoff?', o: ['It is larger than the present value', 'It is directly comparable with stage-game payoffs', 'It does not depend on δ', 'It is always 1'], a: 1, e: '(1-δ)·PV; equals π for a constant stream.' },
])}
`});
