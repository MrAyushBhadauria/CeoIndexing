# The CEO Horniness Index (CHI)

*A satirical governance metric: how likely is a chief executive's libido to become the shareholders' problem?*

---

## 0. Why this exists

Two incidents made this index unavoidable:

- **July 2025, the Coldplay kiss cam.** A stadium kiss cam at a Boston concert caught Astronomer CEO Andy Byron with the company's head of HR. The clip went global within hours, Byron was placed on leave, and the HR head stepped down.
- **November 2026, the Nvidia affair.** On 8 November 2026, Jensen Huang told Nvidia employees in a memo that he had been "unfaithful" to his wife. Press reports (NYT, WSJ, FT) identified the woman as Alice Huang (no relation), an executive at Megaspeed, an Nvidia customer that reportedly bought about $4.8B of hard-to-get chips. According to the NYT, U.S. intelligence believes she was gathering information for Beijing. Nvidia's board opened an independent investigation and said it had no reason to believe company secrets or national security were compromised. China called the espionage claims "groundless", and Singapore said it has never investigated her for espionage. Within a day, an AI-generated fake Coldplay-style kiss-cam clip of Huang was all over X.

The lesson for corporate governance: boards model key-person risk as death, illness and poaching. **Nobody models horniness.** CHI fixes that.

> Satire disclaimer: the espionage allegations above are unproven and denied. The worked examples in §8 are invented archetypes, not scores for real people.

---

## 1. Structure

CHI borrows from the fraud triangle (pressure × opportunity × rationalisation). A scandal needs **three things at once**:

1. **Opportunity (O)**: being out late, unsupervised, with the wrong people.
2. **Entanglement (E)**: who the CEO is actually involved with, and how conflicted that is.
3. **Exposure (X)**: the chance that someone films it.

Remove any one of them and nothing happens. A CEO with plenty of opportunity but no entanglement is just tired. That's why the three are **multiplied**, not added.

On top of CHI sit three **risk amplifiers**: honeytrap probability, governance fragility, and a credibility discount. They turn the score into a dollar figure, the **Value-at-Romance**.

---

## 2. The core components

### 2.1 Opportunity, O ("Unsupervised Nightlife Ratio")

$$
O = \frac{N_{\text{late}}}{N_{\text{travel}}}\,(1 - c)
$$

- \(N_{\text{late}}\) = after-10pm social events with counterparties per year (bars, karaoke, "dinner that ran long")
- \(N_{\text{travel}}\) = nights per year spent travelling
- \(c\) = chaperone coverage: the share of those nights with comms staff, security or a chief of staff present

It is then normalised into \((0,1)\):

$$
\tilde O = \frac{O}{O + O_{1/2}}, \qquad O_{1/2} = 0.1
$$

Unchaperoned late nights on 10% of trips already puts \(\tilde O\) at 0.5.

### 2.2 Entanglement, E ("Conflict-Weighted Intimacy")

Summed over every relationship \(r\) beyond the strictly professional:

$$
E = \sum_r \iota_r \left[\ln\!\left(1 + \frac{V_r}{V_0}\right) + 2\cdot\mathbb{1}[\text{subordinate}_r]\right]
$$

| Intimacy level | \(\iota_r\) |
|---|---|
| Strictly professional | 0 |
| Flirty photos at a bar | 0.2 |
| Photographed cheek kiss | 0.5 |
| Admitted affair | 1.0 |

- \(V_r\) = the value of deals between your company and that person's company. \(V_0 = \$1\text{M}\). The log means a \$4.8B customer is far worse than a \$1M customer, but not 4,800× worse.
- The subordinate term (+2) covers the **kiss-cam case**: no outside deal is involved, but the relationship sits inside the reporting line, which is a different governance failure.

Normalised:

$$
\tilde E = \frac{E + \epsilon}{E + \epsilon + E_{1/2}}, \qquad \epsilon = 0.25,\ E_{1/2} = 3
$$

The \(\epsilon\) floor stops CHI from collapsing to exactly zero for a CEO who is merely restless.

### 2.3 Exposure, X ("The Coldplay Coefficient")

Every public setting \(e\) the CEO attends has some probability \(p_e\) of capture: stadium kiss cam, paparazzi, a TV crew at a Taipei dinner, a phone in the karaoke room. The chance of being captured at least once:

$$
X = 1 - \prod_{e} (1 - p_e)
$$

Note the 2026 twist: generative AI pushes the effective \(X\) towards 1 for anyone famous, because the internet will make the kiss-cam clip for you whether or not it happened.

### 2.4 Combining them

$$
\boxed{\ \mathrm{CHI} = 100 \cdot \left(\tilde O \cdot \tilde E \cdot X\right)^{1/3}\ }
$$

This is a geometric mean, so all three have to be high for a high score. A CEO cannot offset zero opportunity with a great deal of entanglement.

---

## 3. Risk amplifiers

### 3.1 Honeytrap posterior, H (Bayesian)

The more strategically valuable a CEO is, the more likely it is that a new admirer is not there by accident.

**Prior.** \(s \in [0, 10]\) is strategic value: 0 for a regional utility, 10 for someone who controls export-controlled AI chips.

$$
p_0(s) = 1 - e^{-k s}, \qquad k = 0.02
$$

At \(s = 10\), the prior that an attentive new admirer is an intelligence asset is about 18%.

**Update.** Each red flag \(f\) has a likelihood ratio \(\mathrm{LR}_f\):

| Red flag | Example \(\mathrm{LR}_f\) |
|---|---|
| Their company's growth "appeared to come out of nowhere" | 2 |
| Their company buys large volumes of restricted products from yours | 3 |
| They keep turning up at events their role doesn't need them at | 1.5 |
| A friendly foreign government denies everything very fast | 1 (uninformative; they always do) |

$$
\text{odds}(H) = \frac{p_0}{1 - p_0} \prod_f \mathrm{LR}_f, \qquad H = \frac{\text{odds}}{1 + \text{odds}}
$$

### 3.2 Governance Fragility, G

How badly the company copes if the CEO has to step aside:

$$
G = \frac{(1 - b) + \phi + \dfrac{1}{1 + n_s}}{3}
$$

- \(b\) = share of the board that is independent
- \(\phi\) = share of the CEO's immediate family on the company payroll (the "is my wife on the all-staff email list?" term)
- \(n_s\) = number of credible, named successors. With 60 direct reports and no clear deputy, \(n_s = 0\), and that term maxes out at 1.

### 3.3 Credibility Discount, C ("Denial Decay")

Taking \(L\) days to go from "nothing inappropriate" to "I was unfaithful" costs trust:

$$
C = e^{-L/\tau}, \qquad \tau = 30 \text{ days}
$$

An immediate admission gives \(C = 1\). A month of denial gives \(C \approx 0.37\).

---

## 4. Value-at-Romance (VaR)

The headline number for the board: expected shareholder value destroyed by the CEO's love life over a horizon \(T\).

**Step 1, scandal hazard.** Scandals arrive as a Poisson process whose rate rises with opportunity and entanglement:

$$
\lambda = \lambda_0 \, O\,(1 + E), \qquad P(\text{scandal by } T) = 1 - e^{-\lambda T}, \qquad \lambda_0 = 0.5/\text{yr}
$$

**Step 2, it has to become public:**

$$
P_{\text{pub}} = P(\text{scandal by } T) \cdot X
$$

**Step 3, the dollar figure:**

$$
\boxed{\ \mathrm{VaR} = M \cdot \kappa \cdot G \cdot P_{\text{pub}} \cdot (1 + \mu H) \cdot (2 - C)\ }
$$

| Symbol | Meaning |
|---|---|
| \(M\) | Market capitalisation |
| \(\kappa\) | Key-person share: the fraction of company value attributable to the CEO personally (from event studies of past CEO health scares or departures) |
| \(\mu\) | National-security multiplier (1.0 by default): a honeytrap scandal brings Congress, regulators and export-control scrutiny, not just HR |
| \((2 - C)\) | Ranges from 1 (came clean immediately) to 2 (denied until the photos came out) |

**Calibration check.** Nvidia's stock was reported down almost 5% after the admission. On a company worth roughly \$4T, that is about \$200B: a realised loss against which a VaR model can be back-tested.

---

## 5. Tiers

| CHI | Tier |
|---|---|
| 0–20 | Monk Mode |
| 20–40 | Married to the Roadmap |
| 40–60 | Lingers at the After-Party |
| 60–80 | Karaoke Liability |
| 80–95 | Kiss-Cam Candidate |
| 95–100 | Person of Interest to a Foreign Ministry |

---

## 6. Board countermeasures (each one lowers a specific term)

| Countermeasure | Term it lowers |
|---|---|
| Two-person rule: no one-on-one late nights with counterparty executives | \(c \uparrow \Rightarrow O \downarrow\) |
| Mandatory disclosure of relationships with customers or suppliers above \$X in deals | Makes \(E\) observable |
| Counter-intelligence briefing for CEOs with \(s \geq 7\) | \(H \downarrow\) |
| Naming two real successors | \(n_s \uparrow \Rightarrow G \downarrow\) |
| Keeping the family off the all-staff email list | \(\phi \downarrow\) |
| Avoiding Coldplay concerts | \(X \downarrow\) |

---

## 7. Data sources (all public, all legal)

- **O**: travel and event appearances from press coverage, conference schedules, and paparazzi photos with timestamps.
- **E**: only *disclosed or credibly reported* relationships. CHI never speculates; \(\iota\) moves only on confirmed reporting.
- **X**: event types attended; historical capture rates by venue (stadiums with kiss cams are high).
- **H**: red flags come from investigative reporting and regulatory filings about the counterparty.
- **G**: proxy statements (board independence), org charts, LinkedIn (family on payroll), succession disclosures.
- **C**: the dated public statements themselves.
- **κ, M**: market data and event studies.

---

## 8. Worked example (invented archetypes)

Run `python3 chi.py` to reproduce these. All inputs are made up.

| Archetype | O | E | X | CHI | Tier | H | G | P(public, 1y) | Value-at-Romance |
|---|---|---|---|---|---|---|---|---|---|
| A: monk-mode founder | 0.003 | 0 | 0.01 | 2.9 | Monk Mode | 0.06 | 0.18 | ~0% | ~\$0 |
| B: SaaS CEO, stadium-concert regular, involved with own HR head | 0.20 | 2.0 | 0.47 | 51.1 | Lingers at the After-Party | 0.02 | 0.27 | 12.1% | ~\$6.4M |
| C: hardware CEO, karaoke circuit, very attentive \$4.8B customer | 0.21 | 9.5 | 0.66 | 70.1 | Karaoke Liability | 0.57 | 0.55 | 44.4% | ~\$376B |

The main point: **B and C behave about equally badly** (similar opportunity), yet C's Value-at-Romance is about 58,000× larger. The behaviour is not the difference. Entanglement with a huge customer, strategic value attracting spies, no successor, and a month of denial each multiply the damage.

---

## 9. Known weaknesses

- **Unobservable until it isn't.** \(E\) is near zero for every CEO right up to the day the story breaks. In practice CHI is a lagging indicator dressed up as a leading one.
- **Bias towards the famous.** \(X\) is higher for celebrities, so private-company CEOs look chaste.
- **Deepfakes contaminate X.** Fabricated clips raise exposure without any real behaviour, so the index has to separate "caught" from "memed".
- **Privacy.** Scoring real, non-public people on rumours would be both unfair and defamatory. Use only confirmed public reporting, and only for public figures in their corporate role.
