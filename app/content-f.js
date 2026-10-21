/* Flashcards (definitions to learn by heart) and extra question-bank items. */

cards('l1', [
  ['Rational preference relation', 'A preference relation that is complete and transitive.'],
  ['Homo Oeconomicus', 'A player is rational if he chooses an action a* with v(a*) ≥ v(a) for all a in A, i.e. maximises his payoff. Rationality says nothing about selfishness.'],
  ['Normative vs. positive interpretation of rationality', 'Normative: what rationality and equilibrium should mean (philosophy). Positive: even boundedly rational people learn, so rational analysis predicts behaviour by and large.'],
]);
cards('l2', [
  ['Complete information', 'All actions, outcomes, how actions map to outcomes, and all players\' preferences are common knowledge.'],
  ['Common knowledge', 'Everyone knows E, everyone knows that everyone knows E, and so on ad infinitum.'],
  ['Normal-form game', 'G = {I; S_1,...,S_n; u_1,...,u_n}: players, pure-strategy sets, payoff functions.'],
  ['Strategy', 'A complete behavioural plan that provides a decision for each situation. In static games: one action.'],
  ['Strictly dominant strategy', 's_i with u_i(s_i, s_-i) > u_i(s_i\', s_-i) for all s_i\' ≠ s_i and all s_-i.'],
  ['Strictly dominated strategy', 's_i such that some s_i\' gives a strictly higher payoff against every s_-i. Never played by a rational player.'],
  ['IESDS requirements', 'Rationality plus common knowledge of rationality.'],
  ['Second-price sealed-bid auction result', 'Bidding the true valuation is a weakly dominant strategy; outcome efficient.'],
]);
cards('l3', [
  ['Nash equilibrium', 's* such that u_i(s_i*, s_-i*) ≥ u_i(s_i, s_-i*) for all s_i and all i: mutual best responses; nobody gains by deviating unilaterally.'],
  ['Requirements of Nash equilibrium', 'Players are rational (best respond to beliefs) and beliefs about opponents are correct.'],
  ['Cournot equilibrium (linear)', 'x_i = (a-c)/(3b); total 2(a-c)/(3b); cartel total (a-c)/(2b).'],
  ['Focal point', 'A solution players pick without communication because it seems natural or outstanding (Schelling).'],
]);
cards('l4', [
  ['Mixed strategy', 'A probability distribution over a player\'s pure strategies.'],
  ['Mixed-strategy Nash equilibrium', 'Each player\'s mixed strategy is a best response to the others\' mixed strategies.'],
  ['Indifference principle', 'In a mixed NE each player mixes so that the other player is indifferent between the pure strategies he mixes.'],
  ['Nash existence theorem', 'Every finite normal-form game has a Nash equilibrium in mixed strategies.'],
  ['Harsanyi purification', 'A mixed NE can be seen as a pure-strategy equilibrium of a similar game with a bit of private information (types).'],
]);
cards('l5', [
  ['Pareto dominance (equilibrium selection)', 'An equilibrium that makes all players better off than another; argued to be the "obvious" one.'],
  ['Risk dominance', 'An equilibrium is risk-dominated if deviations by the other player are very costly in it; the safer equilibrium may be played (Harsanyi-Selten).'],
  ['Trembling-hand perfection', 'An equilibrium must survive small probabilities of mistakes; rules out weakly dominated strategies (Selten 1975).'],
  ['Bank run lesson', 'With a priority claim, (rush, rush) uses weakly dominated strategies, making the good equilibrium more likely: institutions select equilibria.'],
]);
cards('l6', [
  ['Extensive-form game', 'Players; order of moves; actions; information when moving; moves of nature; payoffs. Structure is common knowledge.'],
  ['Information set', 'Set of nodes a player cannot distinguish when moving; same actions available at each node.'],
  ['Perfect recall', 'No player ever forgets information he previously knew.'],
  ['Perfect information', 'Every information set is a singleton and there are no moves of nature.'],
  ['Pure strategy (extensive form)', 'A complete plan: an action for every information set of the player, including unreached ones.'],
  ['Sequential rationality', 'A player best responds at every information set, on and off the equilibrium path.'],
  ['Zermelo\'s theorem', 'Every finite game of perfect information has a sequentially rational backward-induction solution; unique if no ties.'],
  ['Non-credible threat', 'A threat that would not be in the player\'s interest to carry out once the situation arises.'],
]);
cards('l7', [
  ['Subgame', 'Begins at a singleton decision node, includes all successors, and does not cut any information set.'],
  ['Subgame perfect equilibrium', 'A strategy profile that induces a Nash equilibrium in every subgame.'],
  ['SPE vs NE', 'Every SPE is a NE; not every NE is an SPE. Every finite extensive game has an SPE.'],
]);
cards('l8', [
  ['Ultimatum game SPE', 'Responder accepts everything; proposer takes (almost) everything: (100,0).'],
  ['Fehr-Schmidt utility', 'u_i = x_i - α_i max(x_j - x_i, 0) - β_i max(x_i - x_j, 0); α envy, β empathy, β < 1.'],
  ['Rubinstein share', 'Z = (1-δB)/(1-δAδB); equal δ: 1/(1+δ); immediate agreement; first-mover advantage.'],
  ['Outside option principle', 'An outside option raises bargaining power only if it exceeds the equilibrium payoff.'],
]);
cards('l9', [
  ['Nash bargaining solution', 'argmax (x1-d1)(x2-d2) s.t. x1+x2 ≤ v*; each gets d_i plus half the surplus.'],
  ['Generalised Nash solution', 'x1 = d1 + α(v* - d1 - d2); α = bargaining power.'],
  ['Nash axioms', 'Pareto efficiency, individual rationality, invariance to utility units, independence of irrelevant alternatives.'],
]);
cards('l10', [
  ['Finitely repeated game result', 'Unique stage NE ⇒ unique SPE: play the stage NE in every period.'],
  ['Grim trigger', 'Cooperate until anyone defects, then defect forever. SPE iff δ ≥ (T-R)/(T-P).'],
  ['Feasible payoffs', 'Convex combinations of stage-game payoff vectors.'],
  ['Average payoff', '(1-δ) Σ δ^(t-1) π_t; equals π for a constant stream.'],
  ['Folk theorem (Friedman 1971)', 'Any feasible payoff above a stage NE payoff for every player is an SPE average payoff of G(∞,δ) if δ is close enough to 1.'],
]);
cards('l11', [
  ['Type', 'A player\'s private information that determines his payoff function.'],
  ['Static Bayesian game', 'G = {I; A_i; T_i; p_i; u_i}: players, actions, type spaces, beliefs, payoffs.'],
  ['Strategy in a Bayesian game', 'A function s_i(t_i) assigning an action to every own type.'],
  ['Bayesian Nash equilibrium', 'For every player and every type, the action maximises expected payoff given beliefs and others\' equilibrium strategies.'],
  ['Adverse selection', 'With common values, only low qualities trade (orange grove: only L, p* in [10,14]).'],
]);
cards('l12', [
  ['First-price auction (2 bidders, uniform)', 'BNE bid b = v/2.'],
  ['Strategic equivalence', 'Dutch and first-price sealed-bid auctions have the same normal form and BNE.'],
  ['Button auction', 'Holding until p = θ is weakly dominant; outcome equals second-price auction.'],
  ['Revenue equivalence theorem', 'Well-behaved type distribution, risk-neutral bidders, highest type wins, lowest type gets zero ⇒ same expected revenue and same expected payoff for each type.'],
  ['Winner\'s curse', 'With common values, the winner has the most optimistic signal and overpays unless he conditions on winning.'],
]);
cards('l13', [
  ['System of beliefs', 'A probability over the nodes of every information set, summing to 1.'],
  ['Requirements 1-4 (PBE)', '1 beliefs at every information set; 2 sequential rationality given beliefs; 3 Bayes on path; 4 Bayes off path where possible.'],
  ['Weak PBE', 'Satisfies requirements 1-3; arbitrary beliefs off the path.'],
  ['Requirement 5', 'Off-path beliefs put zero probability on nodes reached only via strictly dominated strategies.'],
]);
cards('l14', [
  ['Pooling vs separating', 'Pooling: all types send the same message; separating: each type a different message; hybrid: one type mixes.'],
  ['Signalling game requirements', '1 belief after every message; 2R receiver best responds to beliefs; 2S sender best responds to receiver; 3 Bayes on path.'],
  ['Why signalling works', 'The signal is cheaper for the high type, so only she finds it worth acquiring.'],
]);
cards('l15', [
  ['Contract', 'An agreement about behaviour intended to be enforced; contracting phase and implementation phase.'],
  ['Moral hazard', 'Hidden, non-verifiable action combined with diverging objectives.'],
  ['Residual claimant / franchise', 'r* = 1, s* = A - 0.5 < 0 possible: agent pays a fee and keeps all returns.'],
  ['Limited liability result', 's ≥ 0 binds; r = 0.5; agent earns a rent of 1/8.'],
]);
cards('l16', [
  ['Risk aversion', 'Strictly prefers a sure payment to a lottery with the same expected value; concave utility.'],
  ['Certainty equivalent', 'Sure amount c with v(c) = expected utility of the lottery.'],
  ['Risk premium', 'Expected value minus certainty equivalent; in the agency model K r².'],
  ['Optimal bonus with risk aversion', 'r* = 1/(2K+1), decreasing in K.'],
]);
cards('l17', [
  ['First- and second-order beliefs', 'First: belief about others\' strategies. Second: belief about others\' first-order beliefs.'],
  ['Guilt aversion', 'u_i = π_i - θ_i max{0, E_ij(π_j) - π_j}: disutility from falling short of what i thinks j expects.'],
  ['Psychological equilibrium', 'Best responses in full payoffs, consistent higher-order beliefs, sequential rationality.'],
]);
cards('l18', [
  ['Self-enforced vs externally enforced', 'Self: individual incentives to comply (NE). External: a court or arbitrator enforces.'],
  ['Expectation damages', 'Breacher pays so the victim gets what fulfilment would have given; (I,I) enforceable iff efficient.'],
  ['Reliance damages', 'Breacher restores the victim to the no-contract state; needs less information.'],
]);

bank('l2', [
  { q: 'An event is common knowledge if...', o: ['everyone knows it', 'everyone knows it and everyone knows that everyone knows it, ad infinitum', 'it is written in a contract', 'at least one player knows it'], a: 1, e: 'Infinite hierarchy of knowledge.' },
  { q: 'In a normal-form game, which three elements are listed?', o: ['Players, strategy sets, payoff functions', 'Players, beliefs, types', 'Nodes, edges, payoffs', 'Actions, prices, quantities'], a: 0, e: 'G = {I; S_i; u_i}.' },
]);
bank('l3', [
  { q: 'A game has the unique NE (Bottom, Right) with payoffs (6,6). How should you write the equilibrium?', o: ['(6,6)', '(Bottom, Right)', 'Bottom', '6'], a: 1, e: 'An equilibrium is a strategy profile.' },
  { q: 'Cournot: a=20, c=2, b=1. Nash price?', o: ['8', '6', '11', '14'], a: 0, e: 'p = (a+2c)/3 = 24/3 = 8.' },
]);
bank('l4', [
  { q: 'Matching pennies: if player 2 plays Heads with q = 0.7, player 1\'s best response is...', o: ['Heads', 'Tails', 'Any mix', '50/50'], a: 1, e: '∂v1/∂r = 2 - 4q < 0.' },
  { q: 'A strategy that is strictly dominated by a mixed strategy...', o: ['can be played in a mixed NE', 'is never played in any NE', 'is always weakly dominant', 'must be a pure NE'], a: 1, e: 'It is never a best response.' },
]);
bank('l6', [
  { q: 'Player 2 has three information sets with 2, 3 and 2 actions. How many pure strategies?', o: ['7', '12', '6', '3'], a: 1, e: '2 × 3 × 2 = 12.' },
]);
bank('l7', [
  { q: 'A game of perfect information with no ties: SPE and backward induction...', o: ['coincide', 'differ', 'never exist', 'require beliefs'], a: 0, e: 'In finite perfect-information games they coincide.' },
]);
bank('l10', [
  { q: 'Stage game PD with T=5, R=3, P=1. Critical δ for grim trigger?', o: ['1/2', '1/4', '2/3', '1/3'], a: 0, e: '(5-3)/(5-1) = 1/2.' },
  { q: 'Average payoff of the stream 4, 4, 4, ...?', o: ['4', '4/(1-δ)', '4δ', '0'], a: 0, e: '(1-δ)·4/(1-δ) = 4.' },
]);
bank('l11', [
  { q: 'Static game of incomplete information. Correct equilibrium concept?', o: ['Nash', 'Bayesian Nash', 'SPE', 'PBE'], a: 1, e: 'Cell 3 of the course map.' },
]);
bank('l12', [
  { q: 'Two bidders uniform on [0,1000]; first-price. Expected revenue?', o: ['500', '333.3', '250', '666.7'], a: 1, e: 'E[max]/2 = (2/3·1000)/2.' },
  { q: 'Which assumption is needed for the first-price analysis but NOT for the second-price dominance result?', o: ['Independent private values', 'Risk neutrality of the seller', 'Sealed bids', 'Two bidders'], a: 0, e: 'Truthful bidding in second-price works even with correlated types.' },
]);
bank('l13', [
  { q: 'A dynamic game with incomplete information. Correct concept?', o: ['Nash', 'BNE', 'SPE', 'PBE'], a: 3, e: 'Cell 4 of the course map.' },
]);
bank('l14', [
  { q: 'In a separating equilibrium, beliefs after each equilibrium message are...', o: ['equal to the prior', '0 or 1', 'arbitrary', '1/2'], a: 1, e: 'Each message reveals the type.' },
]);
bank('l15', [
  { q: 'Without moral hazard and with a risk-neutral agent, first-best effort is...', o: ['0.5', '1', 'r', 'A'], a: 1, e: 'max e - A - 0.5e² ⇒ e = 1.' },
]);
bank('l18', [
  { q: 'Underlying game: z = (5,5), x = (7,7). Limited verifiability. Enforceable?', o: ['Yes', 'No, since 10 < 14', 'Only with reliance damages', 'Only if α = 0'], a: 1, e: 'Necessary: z1+z2 ≥ x1+x2.' },
]);
