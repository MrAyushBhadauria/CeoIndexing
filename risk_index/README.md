# CEO Horniness Risk Index

A points system for measuring how much of your portfolio is exposed to CEO midlife crises. It is based on a viral reel:

> "If they switch their glasses to contact lenses, plus twenty-five points. If they all of a sudden get ripped, that's forty points. If they get a perm, that's twenty points, and if they buy a motorcycle, that's fifteen points. ... the highest risk for me is Meta."

This folder is standalone and separate from the CHI / Value-at-Romance model in [`../CONCEPT.md`](../CONCEPT.md).

## Point table

| Signal | Key in `signals.json` | Points |
|---|---|---|
| Glasses switched to contact lenses | `glasses_to_contacts` | 25 |
| Suddenly ripped | `suddenly_ripped` | 40 |
| Got a perm / dramatic new hair | `perm_or_new_hair` | 20 |
| Bought a motorcycle | `bought_motorcycle` | 15 |
| Wardrobe overhaul (chains, streetwear, embossed leather) | `wardrobe_overhaul` | 15 |
| Took up combat sports | `took_up_combat_sports` | 10 |
| Released music | `released_music` | 15 |
| New sports car or superyacht | `sports_car_or_superyacht` | 10 |
| Dramatic weight loss (GLP-1s, public gym streaks) | `dramatic_weight_loss` | 20 |
| Luxury watch flex | `luxury_watch_flex` | 10 |
| Fashion-week front row | `fashion_week_front_row` | 10 |

The first four come straight from the reel. The rest are extensions in the same spirit.

Nobody in the dataset has triggered `glasses_to_contacts` yet. Nadella still wears frameless glasses, Huang still wears his Oakleys, and Zuckerberg went the other way and put cameras in his.

## Formulas

**Executive score.** Each signal \(k\) contributes its points, scaled by how well it is verified and decayed by its age:

\[
S_j = \min\Big(100,\ \sum_k p_k \cdot v_k \cdot 2^{-a_k / h}\Big)
\]

- \(p_k\): points from the table
- \(v_k\): verification. 1.0 = photos or a major outlet; 0.5 = self-reported, generous interpretation, or a single source
- \(a_k\): years since the change
- \(h\): half-life, 2 years by default. A makeover is a *change*, so a look someone has had for 20 years scores roughly nothing.

**Company score.** A company can have several executives (co-CEOs, a founder still around as executive chair). The company takes the riskiest one, weighted by role:

\[
S_i = \max_j \ \rho_j \, S_j, \qquad \rho_{\text{CEO}} = \rho_{\text{Co-CEO}} = 1,\ \ \rho_{\text{Exec Chair}} = 0.5
\]

**Portfolio exposure.** With position weights \(w_i\) (normalised to sum to 1):

\[
R = \sum_i w_i S_i, \qquad \text{share}_i = \frac{w_i S_i}{R}
\]

\(R\) is on the same 0–100 scale: a portfolio of nothing but maxed-out CEOs scores 100.

## Website

Interactive signal vault + portfolio risk desk:

```bash
chmod +x risk_index/web/serve.sh
./risk_index/web/serve.sh          # http://127.0.0.1:8765
```

Or open `risk_index/web/index.html` after syncing data:

```bash
python3 -c "import json,pathlib; p=pathlib.Path('risk_index'); (p/'web/signals.js').write_text('window.SIGNALS = '+json.dumps(json.loads((p/'signals.json').read_text()),indent=2)+';\n')"
```

Browse companies under **Signal vault**, then weight holdings under **Risk desk** and run the index.

## CLI usage

```bash
python3 risk_index/horniness_risk.py                      # sample portfolio, as of today
python3 risk_index/horniness_risk.py my_portfolio.csv     # your own holdings
python3 risk_index/horniness_risk.py --as-of 2024-12-01   # time travel
python3 risk_index/horniness_risk.py --half-life 1000     # no decay: the raw reel scoring
```


Your portfolio CSV just needs `ticker,weight` columns. Weights can be dollars, shares × price, or percentages; they are normalised. Tickers missing from `signals.json` score 0 and show as `no data`.

**Adding a signal:** append to that executive's `signals` list in `signals.json`, with a date, verification and source URL. **Adding a company:** add a ticker under `companies`. A company with no known signals should still get an entry with an empty `signals` list. That records "we checked" rather than "we never looked".

## Sample result (as of 2026-11-10)

| Ticker | CEO | Score | Main drivers |
|---|---|---|---|
| META | Zuckerberg | 76.6 | Getting buff, curls, gold chain, Amiri tees, Prada front row, T-Pain cover, $900K watch, superyacht, jiu-jitsu |
| NVDA | Huang | 27.2 | 2026 wardrobe break: crocodile-embossed Tom Ford in January, Dior instead of leather in Seoul in June |
| TSLA | Musk | 25.2 | Dark gothic MAGA look, Wegovy then Mounjaro weight loss, patchy beard, cage-fight challenge |
| 1810.HK | Lei Jun | 24.6 | 101 public gym check-ins in 2025, "thinner and more handsome" |
| AMZN | Bezos (exec chair, half weight) | 7.4 | Dior couture front row, superyacht, 2017 biceps (mostly decayed) |
| F | Farley | 7.3 | Dirt bike up a mountain in Aspen; the only motorcycle in the dataset |

Meta comes out on top, as the reel said. That one ~8% position is 47% of the sample portfolio's exposure. With no decay (`--half-life 1000`), Zuckerberg hits the 100 cap.

## Known blind spot

In the first version of this dataset, Jensen Huang scored about 3. His leather jacket is a 20-year-old uniform picked by his wife and daughter, so it had decayed to nothing. Adding his 2026 wardrobe changes lifts him to 27, second place. Those changes predate his November 2026 [admission of an affair](https://apnews.com/article/nvidia-jensen-huang-investigation-chinese-spy-68839e7ca6ba2b121529f7e475e501d6).

Don't read that as the index working. A Dior shirt in 30°C Seoul heat is a Dior shirt, and Zuckerberg's highest-scoring romantic gesture was a song for his own wife. Appearance signals are not evidence of anything. For a model of actual scandal risk, see [`../CONCEPT.md`](../CONCEPT.md).

## Disclaimer

This is satire. Every signal is a publicly reported change in appearance or hobbies, with a source. None of it implies anything about anyone's marriage. Not investment advice.
