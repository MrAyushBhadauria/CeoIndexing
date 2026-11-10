"""CEO Horniness Risk Index: score a portfolio's exposure to CEO midlife-crisis signals.

Usage: python3 risk_index/horniness_risk.py [portfolio.csv] [--as-of YYYY-MM-DD] [--half-life YEARS]
"""

import argparse
import csv
import json
import math
from datetime import date
from pathlib import Path

HERE = Path(__file__).parent
SCORE_CAP = 100.0


def years_between(start: date, end: date) -> float:
    return max((end - start).days, 0) / 365.25


def executive_score(signals, points, as_of, half_life):
    total, parts = 0.0, []
    for s in signals:
        age = years_between(date.fromisoformat(s["date"]), as_of)
        contrib = points[s["signal"]] * s["verification"] * math.exp(-math.log(2) * age / half_life)
        total += contrib
        parts.append((s["signal"], contrib))
    return min(SCORE_CAP, total), parts


def company_score(entry, points, role_weights, as_of, half_life):
    best = (0.0, None, [])
    for ex in entry["executives"]:
        raw, parts = executive_score(ex["signals"], points, as_of, half_life)
        weighted = role_weights[ex["role"]] * raw
        if weighted > best[0] or best[1] is None:
            best = (weighted, ex, parts)
    return best


def load_portfolio(path):
    with open(path, newline="") as f:
        rows = [(r["ticker"].strip().upper(), float(r["weight"])) for r in csv.DictReader(f)]
    total = sum(w for _, w in rows)
    return [(t, w / total) for t, w in rows]


def run(portfolio_path, as_of, half_life):
    data = json.loads((HERE / "signals.json").read_text())
    points, role_weights, companies = data["signal_points"], data["role_weights"], data["companies"]

    rows = []
    for ticker, weight in load_portfolio(portfolio_path):
        entry = companies.get(ticker)
        if entry is None:
            rows.append({"ticker": ticker, "weight": weight, "score": 0.0, "who": "no data", "parts": []})
            continue
        score, ex, parts = company_score(entry, points, role_weights, as_of, half_life)
        who = f"{ex['name']} ({ex['role']})" if parts else "no signals"
        rows.append({"ticker": ticker, "weight": weight, "score": score, "who": who, "parts": parts})

    exposure = sum(r["weight"] * r["score"] for r in rows)
    for r in rows:
        r["contribution"] = r["weight"] * r["score"]
        r["share"] = r["contribution"] / exposure if exposure else 0.0
    rows.sort(key=lambda r: r["contribution"], reverse=True)
    return rows, exposure


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("portfolio", nargs="?", default=str(HERE / "portfolio.csv"))
    parser.add_argument("--as-of", default=date.today().isoformat())
    parser.add_argument("--half-life", type=float, default=2.0)
    args = parser.parse_args()

    rows, exposure = run(args.portfolio, date.fromisoformat(args.as_of), args.half_life)

    print(f"CEO Horniness Risk Index, as of {args.as_of} (half-life {args.half_life:g} years)\n")
    print(f"{'Ticker':<7}{'Weight':>7}{'Score':>7}{'Contrib':>9}{'Share':>7}  Riskiest executive")
    for r in rows:
        print(f"{r['ticker']:<7}{r['weight']:>7.1%}{r['score']:>7.1f}{r['contribution']:>9.2f}"
              f"{r['share']:>7.1%}  {r['who']}")
    print(f"\nPortfolio horniness exposure R = {exposure:.2f} / 100")

    top = rows[0]
    if top["score"] > 0:
        print(f"Highest horniness risk: {top['ticker']} ({top['who']})")
        for signal, contrib in sorted(top["parts"], key=lambda p: p[1], reverse=True):
            print(f"  {signal:<26}{contrib:>6.1f} pts after decay")


if __name__ == "__main__":
    main()
