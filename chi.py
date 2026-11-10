"""CEO Horniness Index (CHI) and Value-at-Romance calculator. Satire with real math. See CONCEPT.md."""

import math
from dataclasses import dataclass, field

O_HALF = 0.1            # opportunity at which the normalised term reaches 0.5
E_HALF = 3.0            # entanglement at which the normalised term reaches 0.5
E_FLOOR = 0.25          # keeps CHI above zero for the merely restless
V0 = 1e6                # deal-size scale, USD
SUBORDINATE_PENALTY = 2.0
HONEYTRAP_K = 0.02      # prior-per-unit-of-strategic-value
SCANDAL_RATE = 0.5      # baseline scandals per year at O*(1+E) = 1
NATSEC_MULTIPLIER = 1.0
DENIAL_TAU_DAYS = 30.0

TIERS = [
    (20, "Monk Mode"),
    (40, "Married to the Roadmap"),
    (60, "Lingers at the After-Party"),
    (80, "Karaoke Liability"),
    (95, "Kiss-Cam Candidate"),
    (100.1, "Person of Interest to a Foreign Ministry"),
]


@dataclass
class Relationship:
    intimacy: float               # 0 professional ... 1 admitted affair
    counterparty_deal_usd: float = 0.0
    subordinate: bool = False


@dataclass
class CEOProfile:
    name: str
    late_social_nights: int       # after-10pm social events with counterparties, per year
    travel_nights: int
    chaperone_coverage: float     # fraction of those nights with comms/security present
    relationships: list = field(default_factory=list)
    capture_probs: list = field(default_factory=list)  # per-event chance of being filmed/photographed
    strategic_value: float = 0.0  # 0 (regional utility) ... 10 (export-controlled tech)
    red_flag_lrs: list = field(default_factory=list)   # likelihood ratios of honeytrap red flags
    market_cap_usd: float = 1e9
    key_person_share: float = 0.05
    board_independence: float = 0.8
    family_on_payroll: float = 0.0  # fraction of immediate family employed by the company
    named_successors: int = 1
    denial_to_admission_days: float = 0.0


def opportunity(p: CEOProfile) -> float:
    return (p.late_social_nights / max(p.travel_nights, 1)) * (1 - p.chaperone_coverage)


def entanglement(p: CEOProfile) -> float:
    return sum(
        r.intimacy * (math.log1p(r.counterparty_deal_usd / V0) + (SUBORDINATE_PENALTY if r.subordinate else 0))
        for r in p.relationships
    )


def exposure(p: CEOProfile) -> float:
    survive = 1.0
    for q in p.capture_probs:
        survive *= 1 - q
    return 1 - survive


def honeytrap_posterior(p: CEOProfile) -> float:
    prior = 1 - math.exp(-HONEYTRAP_K * p.strategic_value)
    if prior <= 0:
        return 0.0
    odds = prior / (1 - prior)
    for lr in p.red_flag_lrs:
        odds *= lr
    return odds / (1 + odds)


def governance_fragility(p: CEOProfile) -> float:
    return ((1 - p.board_independence) + p.family_on_payroll + 1 / (1 + p.named_successors)) / 3


def chi(p: CEOProfile, horizon_years: float = 1.0) -> dict:
    o = opportunity(p)
    e = entanglement(p)
    x = exposure(p)
    o_norm = o / (o + O_HALF)
    e_norm = (e + E_FLOOR) / (e + E_FLOOR + E_HALF)
    score = 100 * (o_norm * e_norm * x) ** (1 / 3)

    h = honeytrap_posterior(p)
    g = governance_fragility(p)
    credibility = math.exp(-p.denial_to_admission_days / DENIAL_TAU_DAYS)
    p_scandal = 1 - math.exp(-SCANDAL_RATE * o * (1 + e) * horizon_years)
    p_public = p_scandal * x
    var = (p.market_cap_usd * p.key_person_share * g * p_public
           * (1 + NATSEC_MULTIPLIER * h) * (2 - credibility))

    tier = next(label for cutoff, label in TIERS if score < cutoff)
    return {"name": p.name, "O": o, "E": e, "X": x, "CHI": score, "tier": tier,
            "H": h, "G": g, "credibility": credibility,
            "P_public": p_public, "value_at_romance": var}


EXAMPLES = [
    CEOProfile(
        name="Archetype A: monk-mode founder",
        late_social_nights=2, travel_nights=60, chaperone_coverage=0.9,
        capture_probs=[0.01], strategic_value=3,
        market_cap_usd=50e9, key_person_share=0.10,
        board_independence=0.8, named_successors=2,
    ),
    CEOProfile(
        name="Archetype B: SaaS CEO, stadium-concert regular, involved with own HR head",
        late_social_nights=20, travel_nights=80, chaperone_coverage=0.2,
        relationships=[Relationship(intimacy=1.0, subordinate=True)],
        capture_probs=[0.3, 0.2, 0.05],
        strategic_value=1,
        market_cap_usd=1.3e9, key_person_share=0.15,
        board_independence=0.7, named_successors=1,
        denial_to_admission_days=0,
    ),
    CEOProfile(
        name="Archetype C: hardware CEO, karaoke circuit, very attentive customer",
        late_social_nights=45, travel_nights=150, chaperone_coverage=0.3,
        relationships=[Relationship(intimacy=1.0, counterparty_deal_usd=4.8e9),
                       Relationship(intimacy=0.2, counterparty_deal_usd=2e8)],
        capture_probs=[0.4, 0.3, 0.2],
        strategic_value=10, red_flag_lrs=[2.0, 3.0],
        market_cap_usd=4e12, key_person_share=0.15,
        board_independence=0.85, family_on_payroll=0.5, named_successors=0,
        denial_to_admission_days=30,
    ),
]


if __name__ == "__main__":
    for prof in EXAMPLES:
        r = chi(prof)
        print(f"{r['name']}\n"
              f"  O={r['O']:.3f}  E={r['E']:.2f}  X={r['X']:.2f}  ->  CHI={r['CHI']:.1f} ({r['tier']})\n"
              f"  honeytrap posterior H={r['H']:.2f}  governance fragility G={r['G']:.2f}  "
              f"credibility={r['credibility']:.2f}\n"
              f"  P(public scandal, 1y)={r['P_public']:.1%}  "
              f"Value-at-Romance=${r['value_at_romance'] / 1e9:,.2f}B\n")
