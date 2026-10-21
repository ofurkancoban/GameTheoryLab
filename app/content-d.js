/* Lectures 15-18: contracts, risk, psychological game theory, enforcement. */
(function () {
  const nd = (p, ch, o) => Object.assign({ p, ch }, o || {});
  const tm = (...pay) => ({ pay });
  tree('l17trust', nd('A', [['Out', tm(5, 5)], ['In', nd('B', [['Grab', tm(0, 14)], ['Roll', nd('N', [['1/6', tm(0, 10), '1/6'], ['5/6', tm(12, 10), '5/6']])]])]]));
  tree('exPA', nd('Firm', [['(w, z=0) safe', nd('Worker', [['accept', tm('180-w', 'w+y')], ['reject', tm(0, 100)]])], ['(w, z=1) risky', nd('Worker', [['accept', nd('N', [['q: x=3', tm('200-w', 'w+100'), 'q'], ['1-q: x=1', tm('200-w', 'w'), '1-q']])], ['reject', tm(0, 100)]])]]));
})();

lesson({
  id: 'l15', no: 15, part: 'V. Contracts and extensions', title: 'Incentive contracts: moral hazard and limited liability',
  read: 'McMillan, Games, Strategies and Managers (1992) ch. 8 · Patrick Bolton and Mathias Dewatripont, Contract Theory, MIT Press (2005) ch. 4',
  goals: [
    'Define a contract and its two phases',
    'Explain moral hazard (asymmetric information + diverging objectives) with examples',
    'Solve the linear principal-agent model with risk-neutral actors by backward induction',
    'Show that the contract with r* = 1 (franchise) is Pareto efficient and compare with the first best',
    'Solve the model with a limited-liability (payment) constraint: r** = 0.5 and the agent\'s rent',
  ],
  html: H`
<h2 id="s1">1. The role of contracts</h2>
<p>We now allow parties to conclude contracts: firms and workers (wages, employment), homeowners and builders, firms and suppliers or customers, nations (WTO, NATO).</p>
${box('def', '<p>A <strong>contract</strong> is an agreement about behaviour that is intended to be enforced. A contractual relationship has two phases: the <strong>contracting phase</strong>, where players set the terms (often simplified as a take-it-or-leave-it offer by one party), and the <strong>implementation phase</strong>, where the contract is carried out and enforced.</p>')}
<h3>Moral hazard</h3>
<p>Frederick Taylor (1856-1915): "Hardly a competent worker can be found who does not devote a considerable amount of time to studying just how slowly he can work and still convince his employer that he is going at a good pace." Moral hazard arises from <strong>asymmetric information</strong> plus <strong>diverging objectives</strong>.</p>
<ul><li><strong>Field sales employee:</strong> the employer wants hard work; the employee wants more and longer breaks; monitoring is difficult.</li>
<li><strong>Borrowed capital:</strong> with limited liability, owners may invest in overly risky projects; the bank prefers a conservative policy.</li>
<li><strong>Car insurance:</strong> after buying theft insurance the owner is less careful; 30% of accidents with comprehensive insurance end up in court over alleged gross negligence.</li></ul>
<p>Trade-offs can be reduced by selecting a suitable agent (family businesses), but conflicts of objectives are usually handled with <strong>incentive schemes</strong>, modelled as monetary rewards (e.g. parcel carriers paid per parcel). Lemieux et al. (2009): by the end of the 1990s, contracts with incentive components were 30% for US craftsmen, 78% for sales workers, 45% on average; in Europe from 10-15% (some Mediterranean countries) to over 30% (Nordic countries).</p>

<h2 id="s2">2. The principal-agent model</h2>
<p>The <strong>principal</strong> hires an <strong>agent</strong> to work on a project on her behalf. <strong>Moral hazard:</strong> the agent's effort is not verifiable, so no externally enforced contract on effort is possible. Standard assumption: only the outcome is verifiable, and it depends on effort and on random events.</p>
${box('def', H`<ul><li>Risk-neutral agent chooses effort \(e\in[0,1]\) at cost \(0.5e^2\); outside option \(A\).</li>
<li>Output \(Q=e+u\), with \(u\) random, \(E[u]=0\). The principal observes only \(Q\), not \(e\) or \(u\).</li>
<li>Stage 1: the risk-neutral principal offers a linear contract \(p=s+rQ\). Stage 2: the agent accepts or rejects. Stage 3: the agent chooses effort; output and payments result.</li></ul>
<p>The contract is agreed ex ante; no strategic move follows the unobservable effort, so the game is solved by backward induction.</p>`, 'Linear incentive contracts with risk-neutral actors')}
${steps('Backward induction', [
H`<strong>Stage 3, agent:</strong> expected net return \(s+r\,E[Q\mid e]-0.5e^2\) with \(E[Q\mid e]=e+E[u]=e\). Objective: \(\max_e\ s+re-\tfrac{e^2}{2}\). FOC: \(r-e=0\Rightarrow e=r\).`,
H`\(r\) measures the strength of incentives: \(r=0\): no effort; \(r=1\): the agent bears full responsibility for his activity.`,
H`<strong>Stage 2:</strong> the agent's expected net income (using \(e=r\)) is \(\pi=s+r^2-0.5r^2=s+0.5r^2\). Participation constraint: \(s+0.5r^2\ge A\).`,
H`<strong>Stage 1, principal:</strong> maximises \(E[Q]-(s+rE[Q])\) anticipating \(e=r\): \(\max_{r,s}\ r-(s+r^2)\) s.t. \(s+0.5r^2\ge A\).`,
H`The principal keeps \(s\) as small as possible (lower \(s\) raises profit without changing incentives): the participation constraint binds, \(s=A-0.5r^2\).`,
H`Substitute: \(\max_r\ r-A-0.5r^2\). FOC: \(1-r=0\Rightarrow r^*=1,\ s^*=A-0.5,\ e^*=1\).`,
H`If \(s^*<0\) this is a <strong>franchise contract</strong>: the agent pays a fixed fee and keeps all realised returns (residual claimant).`])}
${W('pa-linear')}
<h3>Comparison with the Pareto-efficient solution (no moral hazard)</h3>
${steps('First best', [
H`Without moral hazard the principal sets effort \(e\) and wage \(w\) directly: \(\max_{e,w}\ e-w\) s.t. \(w-0.5e^2\ge A\).`,
H`The participation constraint binds (otherwise reduce \(w\)): \(w=A+0.5e^2\). Then \(\max_e e-A-0.5e^2\Rightarrow e^*=1,\ w^*=A+0.5\).`,
H`Same effort and same profit (\(0.5-A\)) as with the linear contract: in this example the solution is <strong>Pareto efficient despite moral hazard</strong>, because the risk-neutral agent with unlimited liability can be made residual claimant.`,
H`Even without moral hazard, incentives are needed, but trivial: \(w=0\) if \(e<1\), \(w=w^*\) if \(e\ge1\).`])}
<h3>Bonus contracts vs. linear contracts</h3>
<p>In practice contracts often pay a bonus \(\beta\) if a target \(Q^*\) is met: \(w=\alpha\) if \(Q< Q^*\), \(w=\alpha+\beta\) if \(Q\ge Q^*\). It can be designed to give the same incentives as the linear contract: if \(u\) is uniform on \([a,b]\), use \(\beta=(b-a)r\) and \(\alpha=s-(b-Q^*)r\) [appendix, not exam-relevant: then the agent's problem becomes \(\max_e s^*+r^*e-0.5e^2\)].</p>
<h3>Non-monetary incentives</h3>
<ul><li>Promotion, layoff, perks (bigger office, company car); these can be valued in money.</li>
<li><strong>Tombola:</strong> in the 1940s a US company reduced absence with a daily lottery for goods hard to get during the war; workers had to be present (<a href="https://time.com/archive/6866354/labor-lotteries-v-absenteeism/">Time archive article</a>).</li>
<li><strong>Bonus points in a car company:</strong> one point per day present, convertible into prizes (e.g. plane tickets to a popular vacation destination), given to the workers' <em>spouses</em>; the involvement of spouses into the control of the workers turned out to be very effective (R. G. Ehrenberg and R. S. Smith, 1988, Modern Labor Economics, Scott Foresman, Glenview, Illinois, p. 417).</li></ul>

<h2 id="s3">3. Limited liability</h2>
<p>The encouraging efficiency result rests on implicit assumptions, e.g. <strong>unlimited liability</strong> of the agent. Investment bankers get high bonuses for gains but bear losses to a much smaller extent, so they take too much risk (one cause of the 2007 financial crisis): "gains are privatised, losses are socialised".</p>
<p>Agents often cannot pay the principal (limited assets). Add the payment constraint \(s\ge0\) and set the outside option to 0:</p>
\[\max_{r,s,e}\ e-(s+re)\quad\text{s.t.}\quad e=\arg\max_{\tilde e}\ s+r\tilde e-\tfrac{\tilde e^2}{2}\ (IC),\quad s+re-\tfrac{e^2}{2}\ge0\ (PC),\quad s\ge0\ (LL)\]
${steps('Solution with limited liability', [
H`(IC): FOC \(r-e=0\Rightarrow e=r\).`,
H`Substitute into (PC): \(s+r^2-0.5r^2=s+0.5r^2\ge0\).`,
H`Suppose (PC) binds: then \(s=-0.5r^2<0\), violating (LL). So (PC) does not bind and (LL) binds: \(s=0\) (otherwise the principal could lower \(s\) and raise profit).`,
H`From (IC) and (LL): \(e=r,\ s=0\). Principal: \(\max_r\ r-r^2\). FOC: \(1-2r=0\Rightarrow r^{**}=0.5\).`,
H`The incentive is only half as strong as in the efficient solution (\(r^*=1\)). Effort 0.5, principal profit 0.25 (vs. 0.5), agent rent \(s+re-0.5e^2=0.5r^2=\tfrac18>0\): the participation constraint is slack.`])}
${box('intu', '<p>Without the wealth constraint, the principal sets \\(r=1\\) for optimal incentives and extracts all profit with a negative fixed payment. With the constraint this is impossible: extracting profit requires lowering \\(r\\), which weakens incentives. The principal balances both and sets \\(r=0.5\\); the agent earns a rent.</p>')}
${box('ex', '<p><strong>Oktoberfest waitresses</strong> receive no fixed salary but 9% of the revenue they collect, and are employed only for the 18 days of the festival: with such a short contract, good incentives are particularly important (Ray Rees, RES Newsletter 2008).</p>')}
${quiz('q-l15', [
 { q: 'Linear contract, risk-neutral agent: which effort does the agent choose for bonus rate r?', o: ['e = 1', 'e = r', 'e = r/2', 'e = s'], a: 1, e: 'FOC of s + re - e²/2.' },
 { q: 'Optimal contract without liability limits?', o: ['r = 0.5, s = 0', 'r = 1, s = A - 0.5', 'r = 0, s = A', 'r = 1, s = 0'], a: 1, e: 'Agent becomes residual claimant; s may be negative (franchise).' },
 { q: 'With limited liability (s ≥ 0, A = 0), the agent\'s rent is...', o: ['0', '1/8', '1/4', '1/2'], a: 1, e: '0.5 r² with r = 0.5.' },
 { q: 'Moral hazard results from...', o: ['asymmetric information about types before contracting', 'non-verifiable actions plus diverging objectives', 'risk neutrality', 'common values'], a: 1, e: 'Hidden action, not hidden type.' },
 { q: 'Why does the participation constraint bind without limited liability?', o: ['The agent is risk averse', 'Otherwise the principal could lower s without affecting incentives', 'Because r = 1', 'Because effort is verifiable'], a: 1, e: 's does not enter the agent\'s effort choice.' },
])}
`});

lesson({
  id: 'l16', no: 16, part: 'V. Contracts and extensions', title: 'Risk and incentives in contracting',
  read: 'Campbell (2018) section 4.5.7 · Watson (2013) ch. 25',
  goals: [
    'List reasons why moral hazard usually leads to inefficient outcomes',
    'Explain risk aversion, certainty equivalent and risk premium (St. Petersburg paradox)',
    'Solve the agency model with a risk-averse manager: r* = 1/(1+2K)',
    'Compute the risk premium K r² and the condition under which no bonus is optimal',
    'Derive implications for when bonus contracts are used',
  ],
  html: H`
<h2 id="s1">1. Why moral hazard is usually inefficient</h2>
<p>Contracts that make the agent the <strong>residual claimant</strong> (he receives what is left after all factors are paid) can overcome moral hazard. Usually, however, outcomes are not Pareto efficient, because:</p>
<ul><li>the agent has <strong>limited liability</strong> (Lecture 15);</li>
<li>the agent performs <strong>multiple tasks</strong> and the measure used for incentives is not congruent with the principal's objective (a franchisee may chase revenue and neglect the franchisor's reputation);</li>
<li>with several <strong>inequality-averse</strong> agents, the principal may weaken incentives to reduce pay inequality;</li>
<li>monetary incentives can <strong>crowd out intrinsic motivation</strong> (Israeli kindergarten: after a fine for late pick-up was introduced, the problem that kids were picked up late actually deteriorated: now that parents paid for being late, their intrinsic motivation to be on time was suppressed);</li>
<li>the agent is <strong>risk averse</strong>: bonuses motivate effort but require paying a risk premium (this lecture).</li></ul>

<h2 id="s2">2. Risk aversion</h2>
${box('ex', H`<p><strong>St. Petersburg paradox:</strong> toss a coin until "number" shows; if it shows at toss 1 you get €1, at toss 2 €2, at toss 3 €4, at toss 4 €8, ... Expected payment: \(0.5\cdot1+0.5^2\cdot2+0.5^3\cdot4+\dots=0.5+0.5+0.5+\dots=\infty\). Nobody would pay an infinite amount: people dislike risk.</p>`)}
<p>Lottery B pays $2000 or $0 with probability ½ each. Let \(v(x)\) be the utility of \(x\) dollars, \(v'(x)>0\). The expected utility of B is \(\tfrac12v(0)+\tfrac12v(2000)\). If you prefer $1000 for sure to B, then \(\tfrac12v(0)+\tfrac12v(2000)< v(1000)\).</p>
${box('def', H`<ul><li><strong>Risk averse:</strong> strictly prefers a sure payment to a lottery with the same expected payment. Concave utility (decreasing marginal utility of money).</li>
<li><strong>Risk neutral:</strong> indifferent between a lottery and its expected payment. Linear utility.</li>
<li><strong>Certainty equivalent</strong> \(c\): the sure amount that makes the person indifferent to the lottery, e.g. \(v(c)=\tfrac12v(0)+\tfrac12v(2000)\).</li>
<li><strong>Risk premium:</strong> expected value minus certainty equivalent, e.g. \(1000-c\).</li></ul>`)}
<p>The risk premium increases if the utility function is more concave (more risk averse) and if the risk is larger. A lottery paying $900 or $1100 has a much smaller risk premium than one paying $0 or $2000.</p>
${W('risk')}

${box('ex', '<p><strong>Risk in contracting, an example from the slides:</strong> owner-tenant contracts. The tenant of a shop in a mall faces the risk that few customers visit the mall. The mall owner can take over part of this risk by making the rent contingent on mall traffic. The questions are how risk should be allocated and what incentives each allocation creates, e.g. for the owner to keep the mall attractive. The agency model below answers exactly this trade-off between risk sharing and incentives.</p>')}
<h2 id="s3">3. Agency theory with a risk-averse manager</h2>
<ul><li>The <strong>manager</strong> (agent) is risk averse: his pay is most of his income.</li>
<li>The <strong>shareholders</strong> (principal) are risk neutral (diversified portfolios) and want expected profits maximised.</li>
<li>\(Q=e+u\): value of the manager's effort \(e\ge0\) for the firm, \(u\) random with \(E[u]=0\).</li>
<li>Pay \(p=s+rQ=s+r(e+u)\): \(r\) captures how pay swings with the random variable (taxi revenue share, sales commission, profit bonus).</li></ul>
\[E[p]=s+re,\qquad EU=E[p]-r^2K-0.5e^2=s+re-r^2K-0.5e^2\]
<p>\(0.5e^2\): effort cost (less leisure); \(r^2K\): utility cost of risk; \(K\) captures risk aversion. The principal makes a take-it-or-leave-it offer \((s,r)\) maximising \(E[\Pi]=E[Q]-E[p]\) subject to the incentive constraint and the participation constraint \(EU\ge u_0\).</p>
${steps('Determining the optimal contract', [
H`<strong>Step 1 (incentive constraint):</strong> \(\max_e\ s+re-r^2K-0.5e^2\). FOC: \(e^*=r\).`,
H`<strong>Step 2 (participation binds):</strong> otherwise \(s\) could be reduced without affecting incentives. \(s+r^2-r^2K-0.5r^2=u_0\Rightarrow s=u_0+(K-0.5)r^2\). (With \(K=0\) and small \(u_0\), \(s<0\) as before.)`,
H`<strong>Step 3 (bonus):</strong> \(E[Q]=r\), \(E[p]=s+re=u_0+(K-0.5)r^2+r^2=u_0+(K+0.5)r^2\). So \(\max_r\ r-u_0-(K+0.5)r^2\).`,
H`FOC: \(1-2(K+0.5)r=0\Rightarrow \boxed{r^*=\dfrac{1}{2K+1}}\in[0,1]\).`,
H`\(\dfrac{dr^*}{dK}<0\): incentives are weaker for a more risk-averse agent. Without risk aversion (\(K=0\)): \(r^*=1\), the agent is residual claimant.`])}
<h3>Risk premium</h3>
${steps('Compute the risk premium', [
H`Participation binds, so \(EU=u_0\).`,
H`Certainty equivalent (same effort): \(c=u_0+0.5e^2=u_0+0.5r^2\): compensation for the outside option and effort cost.`,
H`Expected payment under the contract: \(E[p]=u_0+(K+0.5)r^2\).`,
H`Risk premium \(RP=E[p]-c=Kr^2\): higher if the agent is more risk averse and if the bonus is stronger.`])}
${steps('When is a contract without incentives better?', [
H`With \(r=0\): \(e=0\), so the principal makes no payment and earns 0.`,
H`With \(r^*=\dfrac{1}{2(K+0.5)}\): profit \(r^*-u_0-(K+0.5)r^{*2}=\dfrac{1}{2(K+0.5)}\Big(1-\dfrac{K+0.5}{2(K+0.5)}\Big)-u_0=\dfrac{1}{4(K+0.5)}-u_0\).`,
H`No-bonus contract preferred if \(\dfrac{1}{4(K+0.5)}-u_0<0\iff K>\dfrac{1}{4u_0}-0.5\): risk aversion sufficiently large.`])}
${W('pa-risk')}
${box('thm', '<p>The principal faces a trade-off: bonuses motivate effort but require a risk premium. Bonus contracts (vs. fixed wages) should be more common when (1) the non-verifiable effort is crucial for success, (2) the agent is less risk averse, (3) there is little risk in the production process.</p>', 'Implications')}
${quiz('q-l16', [
 { q: 'r* with K = 1?', o: ['1', '1/3', '1/2', '2/3'], a: 1, e: '1/(2K+1)=1/3.' },
 { q: 'Risk premium with K = 1 at r*?', o: ['1/9', '1/3', '1/6', '0'], a: 0, e: 'K r² = 1/9.' },
 { q: 'Sqrt utility, lottery 0 or 100 with ½ each. Certainty equivalent?', o: ['50', '25', '10', '75'], a: 1, e: 'v(c)=0.5·10=5 → c=25; risk premium 25.' },
 { q: 'u0 = 0.2. Above which K is no bonus optimal?', o: ['0.75', '1.25', '0.5', '2'], a: 0, e: '1/(4·0.2) - 0.5 = 1.25 - 0.5 = 0.75.' },
 { q: 'Which change makes bonus contracts more attractive?', o: ['More risk in production', 'A less risk-averse agent', 'Verifiable effort', 'A higher K'], a: 1, e: 'Lower K lowers the risk premium.' },
])}
`});

lesson({
  id: 'l17', no: 17, part: 'V. Contracts and extensions', title: 'Psychological game theory',
  read: 'Carpenter and Robbett (2023) ch. 28 · Charness and Dufwenberg (2006)',
  goals: [
    'Explain how psychological games let payoffs depend on beliefs',
    'Distinguish first-order and second-order beliefs',
    'Define guilt-averse preferences and contrast them with Fehr-Schmidt preferences',
    'Solve the trust game with a guilt-averse trustee and find the psychological equilibria',
    'Summarise the experimental evidence of Charness and Dufwenberg',
  ],
  html: H`
<h2 id="s1">1. Introductory experiment: the trust game</h2>
<p>Two participants, an investor and a trustee, each receive €10. The investor decides how much to send; the trustee receives three times that amount and decides how much to send back.</p>

<h2 id="s2">2. What psychological game theory adds</h2>
<ul><li>Standard game theory: preferences only over ultimate outcomes, determined by the players' actions.</li>
<li>Psychological game theory lets the <strong>process</strong> matter too: preferences may depend on one's own or others' <strong>beliefs</strong>, capturing self-esteem, reciprocity and emotions such as guilt.</li>
<li>People care about what others think (wanting to look moral, smart or cool); intentional harm is judged worse than accidental harm even with the same outcome (and our justice system often reflects this); outcomes are evaluated relative to expectations; we feel guilty when letting others down.</li>
<li>Keep in mind: models simplify; for many problems (strategic interaction of firms) the standard model is well suited.</li></ul>
${box('def', '<p><strong>First-order beliefs:</strong> probabilities a player assigns to others\' strategies (what the investor thinks the trustee returns).<br><strong>Second-order beliefs:</strong> beliefs about others\' first-order beliefs (what the trustee thinks the investor expects him to return).</p>')}

<h2 id="s3">3. Guilt aversion</h2>
<p>We distinguish a player's <strong>material payoff</strong> (standard payoff from the realised strategy profile) from his <strong>psychological payoff</strong>, which may depend on beliefs.</p>
${box('def', H`<p>Let \(\pi_j(s)\) be player \(j\)'s material payoff and \(E_{ij}(\pi_j)\) the payoff that player \(i\) believes player \(j\) expects to receive. A guilt-averse player \(i\) maximises
\[u_i\big(s,E_{ij}(\pi_j)\big)=\pi_i(s)-\theta_i\max\{0,\ E_{ij}(\pi_j)-\pi_j\},\]
where \(\theta_i\) measures \(i\)'s guilt aversion. Player \(i\) feels guilty if \(j\)'s payoff falls short of what \(i\) believes \(j\) expected.</p>`, 'Definition 1 (guilt-averse preferences)')}
${box('warn', H`<p>Compare with Fehr-Schmidt (Lecture 8): \(u_i=x_i-\alpha_i\max\{0,x_j-x_i\}-\beta_i\max\{0,x_i-x_j\}\). Fehr-Schmidt depends only on <strong>outcomes</strong> (payoff differences). Guilt aversion depends on <strong>beliefs</strong> (what the other expected). Same outcome, different expectations, different utility.</p>`)}

<h2 id="s4">4. Example: a trust game with a die</h2>
${tree('l17trust')}
<ul><li>A chooses Out (no trust) or In. After In, B chooses Grab or Roll.</li>
<li>Roll: a die is rolled; A gets 0 if a 1 comes up and 12 otherwise; B always gets 10.</li>
<li>SPNE (material payoffs): (Out, Grab) with (5,5). Mutual cooperation (In, Roll) gives expected (10,10): A gets \(\tfrac16\cdot0+\tfrac56\cdot12=10\).</li>
<li>Because of the die, A cannot tell whether a 0 came from B screwing him or from bad luck after B tried to reward him.</li></ul>
${box('def', H`<p>\(\alpha\in[0,1]\): A's first-order belief that B chooses Roll. \(\beta\in[0,1]\): B's second-order belief (when B moves) about \(\alpha\).</p>`)}
${steps('B\'s utility', [
H`Payoff B believes A expects: \(E_{BA}(\pi_A)=\beta\cdot10+(1-\beta)\cdot0=10\beta\).`,
H`Grab: \(u_B=14-\theta_B\max\{0,10\beta-0\}=14-10\theta_B\beta\).`,
H`Roll: B gets 10; A's expected payoff from Roll is 10, which is at least \(10\beta\), so no guilt: \(u_B=10\).`])}
<h3>Psychological equilibrium (basic idea)</h3>
<ol><li>Players best respond to each other, maximising full payoffs (material + psychological).</li><li>Higher-order beliefs are consistent (accurate): first-order beliefs match actual strategies, second-order beliefs match first-order beliefs, and so on.</li><li>In dynamic games, players are sequentially rational.</li></ol>
${steps('Psychological equilibria of the trust game', [
H`Let \(p\) be the probability that B rolls. Consistent beliefs: \(\beta=\alpha=p\).`,
H`A chooses In only if \(5\le10\alpha\), i.e. \(p\ge0.5\).`,
H`B rolls if \(14-10\theta\beta\le10\), i.e. \(\theta p\ge0.4\).`,
H`Low guilt aversion: \(\theta p\ge0.4\) never holds (e.g. \(\theta<0.4\)), so the PE equals the SPNE (Out, Grab).`,
H`If \(0.4/\theta\le1\iff\theta\ge0.4\), there is a PE with (In, Roll) and \(\beta=\alpha=p=1\). Guilt aversion leads to the efficient outcome, and in this PE nobody actually experiences guilt.`,
H`(Out, Grab) with \(p=0\) remains a PE as well: B, expecting nobody to expect Roll, feels no guilt from grabbing. The slides also note further mixed PE.`])}
${W('guilt')}
${box('ex', '<p><strong>Charness and Dufwenberg (2006):</strong> lab trust game; in one treatment B could send a message to A before the game; first- and second-order beliefs were elicited (by asking players A to guess the proportion of Bs choosing Roll and players B to guess the average guess of As). Communication substantially increased Roll, and explicit promises to Roll were especially often followed by (In, Roll). They interpret this as evidence that cooperation works through beliefs, consistent with guilt aversion.</p>', 'Experimental evidence')}
${quiz('q-l17', [
 { q: 'B\'s second-order belief β is a belief about...', o: ['A\'s action', 'A\'s belief that B will roll', 'the die', 'B\'s own payoff'], a: 1, e: 'A belief about a belief.' },
 { q: 'B\'s utility from Grab with θ = 0.5 and β = 1?', o: ['14', '9', '10', '4'], a: 1, e: '14 - 10·0.5·1 = 9 < 10: B rolls.' },
 { q: 'For which θ does (In, Roll) with p = 1 form a PE?', o: ['θ ≥ 0.4', 'θ ≥ 0.5', 'θ ≤ 0.4', 'Any θ'], a: 0, e: 'Need θ·1 ≥ 0.4.' },
 { q: 'Key difference between guilt aversion and Fehr-Schmidt?', o: ['Guilt aversion depends on beliefs, Fehr-Schmidt on outcomes', 'Fehr-Schmidt depends on beliefs', 'They are identical', 'Guilt aversion requires money'], a: 0, e: 'Psychological payoffs depend on beliefs.' },
])}
`});

lesson({
  id: 'l18', no: 18, part: 'V. Contracts and extensions', title: 'Contract, law and enforcement in static settings',
  read: 'Watson (2013) ch. 13',
  goals: [
    'Explain how contracts help: strategic uncertainty, coordination, aligning incentives',
    'Distinguish self-enforced and externally enforced contracts; underlying vs. induced game',
    'Analyse complete contracts, limited verifiability and the necessary condition z1 + z2 ≥ x1 + x2',
    'Derive the induced games under expectation damages and reliance damages',
    'Show that expectation damages enforce (I, I) iff (I, I) is efficient',
  ],
  html: H`
<h2 id="s1">1. The role of contracts</h2>
<p>Contracting institutions such as the legal system govern employment, construction, supply relationships and international agreements. Contracting may (1) alleviate strategic uncertainty, (2) avoid inefficient coordination, especially with multiple equilibria, and (3) align incentives, i.e. mitigate conflicts between joint and individual decisions.</p>
${box('def', '<p>A contract is an agreement about behaviour that is intended to be enforced. Contracting phase (focus of the principal-agent lectures) and implementation phase (focus here: enforcement).<br>A contract is <strong>self-enforced</strong> if players have individual incentives to abide by it, and <strong>externally enforced</strong> if an external party (judge, arbitrator) enforces behaviour.</p>')}

<h2 id="s2">2. Example: remodelling a house</h2>
<p>An architect (who also owns the house) and a construction firm simultaneously decide whether to invest costly effort (I) or not (N). The architect's investment eases the constructor's work; the constructor's investment improves quality, which benefits the owner. This is the <strong>underlying game</strong>:</p>
${mx({ p1: 'Architect/Owner', p2: 'Constructor', rows: ['I', 'N'], cols: ['I', 'N'], cells: [[H`z_1|z_2`, H`y_1|x_2`], [H`x_1|y_2`, H`0|0`]] })}
<p>Assumptions: \(z_1+z_2>x_1+y_2,\ y_1+x_2,\ 0\), and parties can make monetary transfers. So \((I,I)\) is the only efficient outcome. Can they enforce a contract specifying \((I,I)\)?</p>
<p>If \(z_1< x_1\) and/or \(z_2< x_2\), an agreement to play \((I,I)\) is <strong>not self-enforcing</strong>: it is not a Nash equilibrium. It must be externally enforced: a court imposes transfers \(\alpha,\beta,\gamma\in\mathbb R\) if the outcome is not \((I,I)\). The resulting game is the <strong>induced game</strong>.</p>

<h2 id="s3">3. Complete contracts in discretionary environments</h2>
<p>Players write a complete contract specifying \(\alpha,\beta,\gamma\) for \((N,I)\), \((I,N)\), \((N,N)\) (positive = transfer to the architect).</p>
${mx({ p1: 'Architect/Owner', p2: 'Constructor', rows: ['I', 'N'], cols: ['I', 'N'], cells: [[H`z_1|z_2`, H`y_1+\beta|x_2-\beta`], [H`x_1+\alpha|y_2-\alpha`, H`\gamma|-\gamma`]] })}
<p>The contract induces \((I,I)\) if \(z_1\ge x_1+\alpha\) and \(z_2\ge x_2-\beta\), and the court enforces it. This requires <strong>full verifiability</strong>: the court must be able to verify whether each player chose I or N. With suitable \(\alpha,\beta\) this can always be achieved.</p>
<h3>Limited verifiability</h3>
<p>Full verifiability is the exception. E.g. the court can judge the quality of the work but not whether defects were caused by the architect or the constructor: it cannot distinguish \((I,N)\), \((N,I)\) and \((N,N)\), so the same transfer \(\alpha\) applies:</p>
${mx({ p1: 'Architect/Owner', p2: 'Constructor', rows: ['I', 'N'], cols: ['I', 'N'], cells: [[H`z_1|z_2`, H`y_1+\alpha|x_2-\alpha`], [H`x_1+\alpha|y_2-\alpha`, H`\alpha|-\alpha`]] })}
${steps('Condition for (I, I)', [
H`\((I,I)\) is a NE if \(z_1\ge x_1+\alpha\) and \(z_2\ge x_2-\alpha\).`,
H`Adding both yields the necessary condition \(z_1+z_2\ge x_1+x_2\).`,
'This may easily be violated, e.g. with Prisoner\'s-Dilemma payoffs where the temptations x are large.'])}

<h2 id="s4">4. Court-imposed breach remedies</h2>
<p>Players often write <strong>incomplete</strong> contracts (listing all contingencies is expensive; they count on the court to complete the contract in litigation). Courts impose transfers based on legal principles rather than the contract document.</p>
<h3>Expectation damages</h3>
${box('def', H`<p>A court-imposed transfer from defendant to plaintiff that gives the plaintiff the payoff he would have received had the contract been fulfilled, here \(z_1,z_2\).</p>`)}
${steps('Induced game under expectation damages', [
H`If the constructor breaches (\((I,N)\)), he pays the architect \(z_1-y_1\): payoffs \((z_1,\ x_2-z_1+y_1)\).`,
H`If the architect breaches (\((N,I)\)), he pays the constructor \(z_2-y_2\): payoffs \((x_1-z_2+y_2,\ z_2)\).`,
H`\((I,I)\) is a NE iff \(z_1\ge x_1-z_2+y_2\) and \(z_2\ge x_2-z_1+y_1\).`,
H`Rearranged: \(z_1+z_2\ge x_1+y_2\) and \(z_1+z_2\ge x_2+y_1\): exactly the conditions for \((I,I)\) to be efficient.`,
'<strong>Result:</strong> under expectation damages, (I, I) is enforceable if and only if (I, I) is efficient. Expectation damages remove the tension between individual and joint incentives. But the court needs a lot of information: who breached and the exact payoffs.'])}
${mx({ p1: 'Architect/Owner', p2: 'Constructor', rows: ['I', 'N'], cols: ['I', 'N'], cells: [[H`z_1|z_2`, H`z_1|x_2-z_1+y_1`], [H`x_1-z_2+y_2|z_2`, H`0|0`]], cap: 'Induced game: expectation damages.' })}
<h3>Reliance damages</h3>
${box('def', H`<p>A court-imposed transfer that returns the plaintiff to the state he would have been in <em>but for</em> the contract. Take the NE payoff (0,0) as the "no contract" value (assume \(y_i\le0\)).</p>`)}
${mx({ p1: 'Architect/Owner', p2: 'Constructor', rows: ['I', 'N'], cols: ['I', 'N'], cells: [[H`z_1|z_2`, H`0|x_2+y_1`], [H`x_1+y_2|0`, H`0|0`]], cap: 'Induced game: reliance damages.' })}
<p>\((I,I)\) is a NE iff \(z_1\ge x_1+y_2\) and \(z_2\ge x_2+y_1\). In words: the losses from the other's not investing (\(y_i<0\)) must be large enough. Advantage: easier to implement, since the court does not need to know the payoffs at \((I,I)\).</p>
${W('contract')}
${quiz('q-l18', [
 { q: 'Under limited verifiability, a necessary condition for enforcing (I, I) is...', o: ['z1 + z2 ≥ x1 + x2', 'z1 ≥ x1', 'y1 + y2 ≥ 0', 'α = 0'], a: 0, e: 'Add the two NE conditions.' },
 { q: 'Under expectation damages, (I, I) is enforceable iff...', o: ['(I, I) is a NE of the underlying game', '(I, I) is efficient', 'y ≤ 0', 'the court knows α'], a: 1, e: 'z1+z2 ≥ x1+y2 and z1+z2 ≥ x2+y1.' },
 { q: 'What does the court need to know for reliance damages?', o: ['z1 and z2', 'Only the losses relative to the no-contract state', 'Nothing', 'The discount factor'], a: 1, e: 'It restores the plaintiff to 0; no knowledge of payoffs under (I, I) needed.' },
 { q: 'A contract is self-enforcing if...', o: ['a court enforces it', 'players have individual incentives to comply (it is a NE)', 'it is written', 'it is complete'], a: 1, e: 'Definition.' },
])}
`});
