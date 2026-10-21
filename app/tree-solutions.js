/* Written solutions for game trees that cannot be solved by plain backward induction
 * (information sets with several nodes, or symbolic payoffs). Shown under the tree in the Game lab. */
GT.treeSol = {
  l6bossim: [
    H`Player 2 does not observe player 1's move (dashed line), so this tree is just the simultaneous Battle of the Sexes; there is no proper subgame.`,
    H`Pure Nash equilibria: (O, o) with (2,1) and (F, f) with (1,2): each player matches the other's choice.`,
    H`Mixed equilibrium: player 1 plays O with \(\tfrac23\), player 2 plays o with \(\tfrac13\) (each makes the other indifferent); expected payoffs \((\tfrac23,\tfrac23)\).`],
  l6entryN: [
    H`After entry, Nature chooses high or low demand (\(\tfrac12\) each); the monopolist does not observe it, so it compares <strong>expected</strong> payoffs over its information set.`,
    H`Fight: \(\tfrac12\cdot0+\tfrac12\cdot(-1)=-\tfrac12\). Share: \(\tfrac12\cdot3+\tfrac12\cdot1=2\). The monopolist shares.`,
    H`Entrant: entering gives \(\tfrac12\cdot3+\tfrac12\cdot1=2>0\) (staying out). It enters. Equilibrium: (Enter, Share), expected payoffs (2, 2).`],
  l7vbos: [
    H`Proper subgame: the simultaneous Battle of the Sexes after Y. Its Nash equilibria: (O,o) with (2,1), (F,f) with (1,2), and the mixed one with payoffs \((\tfrac23,\tfrac23)\).`,
    H`Replace the subgame by each equilibrium payoff and let player 1 compare with N (1.5).`,
    H`If (O,o) is played: Y gives 2 > 1.5. SPE \(((Y,O),o)\), outcome (2,1).`,
    H`If (F,f) is played: Y gives 1 < 1.5. SPE \(((N,F),f)\), outcome (1.5, 1.5).`,
    H`If the mixed equilibrium is played: Y gives \(\tfrac23< 1.5\). SPE with N and the mixed strategies in the subgame. Three SPE in total.`],
  l7cards: [
    H`Player 1 sees the card; player 2 does not (one information set). The only subgame is the whole game, so we look for a Nash equilibrium of the whole game. Let \(\mu\) be player 2's belief that the card is an ace when player 1 plays.`,
    H`Player 1 with an ace: Y gives 2 (call) or 1 (fold), N gives \(-1\): always Y.`,
    H`Player 2: call gives \(-2\mu+2(1-\mu)=2-4\mu\), fold gives \(-1\). Call iff \(\mu\le\tfrac34\).`,
    H`No pure equilibrium: if the king also plays Y, \(\mu=\tfrac12\), player 2 calls, and the king would rather play N (\(-1>-2\)). If the king plays N, \(\mu=1\), player 2 folds, and the king would rather bluff (1 > \(-1\)).`,
    H`Mixed equilibrium (beyond the lecture, which only counts subgames here): the king bluffs with probability \(b\), so \(\mu=\frac{1/2}{1/2+b/2}=\frac1{1+b}\). Player 2 indifferent iff \(\mu=\tfrac34\iff b=\tfrac13\). The king is indifferent iff player 2 calls with probability \(c\): \(1-3c=-1\iff c=\tfrac23\).`,
    H`Result: ace always plays, king bluffs with \(\tfrac13\), player 2 calls with \(\tfrac23\). Expected payoff of player 1: \(\tfrac12\cdot\tfrac53+\tfrac12\cdot(-1)=\tfrac13\).`],
  l7entry: [
    H`Proper subgame after In: a simultaneous game between the entrant (player 1) and the incumbent (player 2), each choosing Fight or Accommodate.`,
    H`Player 1: against Fight, Acc gives \(-2>-3\); against Acc, Acc gives 3 > 1. Acc is strictly dominant. Player 2's best response to Acc: Acc (1 > \(-1\)). Subgame equilibrium (Acc, Acc) with (3,1).`,
    H`Replace the subgame by (3,1). Player 1: In gives 3 > 0 (Out). SPE: player 1 plays In and Acc, player 2 plays Acc; outcome (3,1).`],
  l11harsanyi: [
    H`Harsanyi transformation: Nature draws the incumbent's cost (high with \(p\), low with \(1-p\)); only player 1 observes it, so player 2's two nodes after each choice form information sets.`,
    H`High cost: nI gives 2 or 3, I gives 0 or 2: nI is dominant. Low cost: I gives 3 or 5, nI gives 2 or 3: I is dominant.`,
    H`Player 2 enters: \(p\cdot1+(1-p)(-1)=2p-1\); stays out: 0. Enter iff \(p>\tfrac12\).`,
    H`Bayesian Nash equilibrium: (nI if high, I if low; E if \(p>\tfrac12\), nE if \(p< \tfrac12\)).`],
  l13ex1: [
    H`No proper subgames (player 2's information set has two nodes), so SPE = NE: (L, L') with (2,1) and (R, R') with (1,3).`,
    H`Player 2 with belief \(p\) on L: L' gives \(p\cdot1+(1-p)\cdot2=2-p\), R' gives \((1-p)\cdot1=1-p\). L' is better for <strong>every</strong> belief.`,
    H`So (R, R') relies on a choice that is never sequentially rational: not a PBE. Unique PBE: \(((L,L'),\ p=1)\).`],
  l13ex2: [
    H`Player 2: L' gives \(p\), R' gives \(1-p\): L' iff \(p>\tfrac12\), R' iff \(p< \tfrac12\).`,
    H`If player 2 plays L', player 1 chooses L (3 > 2 > 1); then Bayes gives \(p=1\), consistent. PBE \(((L,L'),\ p=1)\).`,
    H`If player 2 plays R', player 1 chooses R (2 > 0); the information set is off the path, so any \(p< \tfrac12\) is allowed. (Weak) PBE \(((R,R'),\ p< \tfrac12)\).`],
  l13ex3: [
    H`Proper subgame after D (players 2 and 3; player 3 does not see player 2's move). Player 2: L gives 2 or 3, R gives 1: L is dominant. Player 3, given L: R' (3) beats L' (1). Subgame equilibrium (L, R') with (3,3,3).`,
    H`Player 1: D gives 3 > 2 (A). SPE \((D,L,R')\), and with \(p=1\) it is a PBE.`,
    H`(A, L, L') is a Nash equilibrium (player 1 gets 2 > 1), and with \(p=0\) it satisfies requirements 1-3 (weak PBE). But requirement 4 forces \(p=1\) (player 2 plays L), where L' is not optimal: not a PBE.`],
  l14job: [
    H`Pooling on E: the firm believes \(q=\tfrac13\) and chooses C (4 > 3.33); both types pay for education and get 4: they would deviate to N. No PBE.`,
    H`Pooling on N: \(p=\tfrac13\), the firm chooses C' and both get 4. The high type does not deviate if the firm chooses C after E, i.e. if \(q\le\tfrac25\). PBE: (N, N'; C', C), \(p=\tfrac13\), \(q\le\tfrac25\).`,
    H`Separating with only low types educating: the low type pays 7 for a clerical job: deviation. No PBE.`,
    H`Separating (E, N'): \(q=1\), \(p=0\); the firm plays M after E and C' after N. High: \(10-4=6>4\); low: \(4>10-7=3\). PBE: (E, N'; C', M), \(p=0\), \(q=1\).`],
  exPA: [
    H`The worker accepts the safe job iff \(w+y\ge100\); the firm pays \(w=100-y\) and earns \(80+y\).`,
    H`The worker accepts the risky job iff \(q(w+100)+(1-q)w\ge100\iff w\ge100(1-q)\); the firm earns \(100+100q\).`,
    H`The firm offers the job with the higher revenue; with \(q=0.5\): risky (150) if \(y\le70\), safe if \(y>70\). (Feb 2014 exam, question 1.)`],
  exGuar: [
    H`After N: store 2's \(p_L\) is strictly dominant; equilibrium \((p_L,p_L)\), (1,1).`,
    H`After G: store 2 now prefers \(p_H\) against \(p_H\) (2 > 1); equilibria \((p_H,p_H)\) with (3,2) and \((p_L,p_L)\); \(p_H\) weakly dominates \(p_L\) for store 1.`,
    H`Store 1 compares 3 (G) with 1 (N): it gives the guarantee. SPE outcome: guarantee and high prices (3,2). Full solution: Exercises, Lecture 7, "Price guarantee".`],
  exSafe: [
    H`The subgame after R has no pure equilibrium (best responses cycle). Mixed: player 1 plays C with \(\tfrac23\), player 2 plays A with \(\tfrac12\); payoffs (4, 2).`,
    H`Player 1: R gives 4 > 3 (S). Unique SPE: R, then C with \(\tfrac23\); A with \(\tfrac12\). The pure NE (SC, B) and (SD, B) are not subgame perfect. Full solution: Exercises, Lecture 7, "Playing it safe".`],
  exHoldup: [
    H`Ultimatum stage: player 2 accepts any \(x\ge0\), so player 1 offers \(x=0\) after L and after H.`,
    H`Player 2 anticipates 0 from the pie: L gives \(-c_L\), H gives \(-c_H< -c_L\). SPE: L, accept everything, offer 0; payoffs \((v_L,-c_L)\). Not Pareto optimal since \(v_H-c_H>v_L-c_L\). Full solution: Exercises, Lecture 8, "Hold-up game".`],
  exJunk: [
    H`At the last node the commuting cost is sunk: the buyer accepts iff \(p\le v\). The seller offers \(p=v\).`,
    H`The buyer anticipates \(v-v-k=-k< 0\) and stays home. Unique SPE: (H, accept iff \(p\le v\); \(p=v\)), payoffs (0, \(c\)). With a price commitment \(\hat p=v-k\) (postcard) trade happens. Full solution: Exercises, Lecture 8, "Junk mail advertising".`],
  exPBE6: [
    H`c is strictly dominated by a for player 2 (8 > 5 and 1 > 0), so it is never sequentially rational.`,
    H`Given a or b, player 1 gets 4 from R, at most 3 from M and 2 from L: R. Bayes: \(p=0\); then b (2) is optimal.`,
    H`Unique (weak and strong) PBE: \((R,\ b,\ p=0)\), payoffs (4, 2). Full solution: Exercises, Lecture 13.`],
  exCar: [
    H`The buyer buys iff his belief in high quality is at least \(\tfrac12\); with the prior (0.3) he does not buy.`,
    H`Pooling on N or on W: no trade, both types get 0; supported by off-path beliefs below \(\tfrac12\).`,
    H`Separating (high W, low N): the buyer buys after W only. High: 120 > 0; low: mimicking gives \(60-160=-100< 0\). Separating PBE exists. Full solution: Exercises, Lecture 14, "Signalling: car warranty".`],
  exCap: [
    H`After Small: H strictly dominates L for both firms; equilibrium (H,H) with (3,3).`,
    H`After Large: H strictly dominates L for firm 1; firm 2's best response to H is H; equilibrium (H,H) with (4,1).`,
    H`Firm 1 compares 3 (Small) with 4 (Large): Large. SPE outcome (Large; H, H) with (4,1). Full solution: Exercises, Lecture 7, "Capacity choice before a simultaneous game".`],
  exAd: [
    H`The consumer buys iff her belief in high quality is at least \(\tfrac12\); with the prior (0.3) she does not buy.`,
    H`Pooling on no ad is a PBE (off-path belief after an ad below \(\tfrac12\)); pooling on the ad is not (both types lose 80).`,
    H`Separating (high advertises): high \(100-80=20>0\); low \(30-80=-50< 0\). Separating PBE exists: the ad is credible "money burning". Full solution: Exercises, Lecture 14, "Signalling: Super Bowl ad".`],
};
