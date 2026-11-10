window.SIGNALS = {
  "signal_points": {
    "glasses_to_contacts": 25,
    "suddenly_ripped": 40,
    "perm_or_new_hair": 20,
    "bought_motorcycle": 15,
    "wardrobe_overhaul": 15,
    "took_up_combat_sports": 10,
    "released_music": 15,
    "sports_car_or_superyacht": 10,
    "dramatic_weight_loss": 20,
    "luxury_watch_flex": 10,
    "fashion_week_front_row": 10
  },
  "role_weights": {
    "CEO": 1.0,
    "Co-CEO": 1.0,
    "Executive Chair": 0.5
  },
  "companies": {
    "META": {
      "company": "Meta Platforms",
      "executives": [
        {
          "name": "Mark Zuckerberg",
          "role": "CEO",
          "signals": [
            {
              "signal": "perm_or_new_hair",
              "date": "2024-04-24",
              "verification": 1.0,
              "source": "https://www.nytimes.com/2024/04/24/style/mark-zuckerberg-new-look.html",
              "note": "Longer curls plus a chain went viral before Q1 earnings."
            },
            {
              "signal": "wardrobe_overhaul",
              "date": "2024-08-02",
              "verification": 1.0,
              "source": "https://www.wsj.com/style/fashion/mark-zuckerberg-meta-gold-chain-outfits-76533bb2",
              "note": "WSJ: 'Mark Zuckerberg 3.0', gold chain and Gen-Z curls."
            },
            {
              "signal": "suddenly_ripped",
              "date": "2024-10-01",
              "verification": 1.0,
              "source": "https://slate.com/business/2024/10/mark-zuckerberg-style-transformation-zinc-oxide-face-smokin-meats.html",
              "note": "Slate: 'started working out, getting buff'."
            },
            {
              "signal": "took_up_combat_sports",
              "date": "2023-05-08",
              "verification": 1.0,
              "source": "https://www.cbsnews.com/news/mark-zuckerberg-wins-gold-silver-jiu-jitsu-competition/",
              "note": "Won gold and silver at his first jiu-jitsu tournament."
            },
            {
              "signal": "released_music",
              "date": "2024-11-13",
              "verification": 1.0,
              "source": "https://www.nytimes.com/2024/11/13/style/mark-zuckerberg-tpain-get-low.html",
              "note": "'Get Low' cover with T-Pain as 'Z-Pain', dedicated to his wife."
            },
            {
              "signal": "sports_car_or_superyacht",
              "date": "2024-06-01",
              "verification": 1.0,
              "source": "https://www.geekwire.com/2026/photos-mark-zuckerbergs-superyacht-arrives-in-seattle-the-same-day-meta-discloses-1400-local-job-cuts/",
              "note": "387-ft, ~$300M Feadship 'Launchpad', delivered 2024, plus a support yacht called 'Wingman'."
            },
            {
              "signal": "luxury_watch_flex",
              "date": "2025-01-08",
              "verification": 1.0,
              "source": "https://www.businessinsider.com/mark-zuckerberg-luxury-watch-collection",
              "note": "Wore a ~$900K Greubel Forsey Hand Made 1 in the fact-checking announcement video."
            },
            {
              "signal": "fashion_week_front_row",
              "date": "2026-02-26",
              "verification": 1.0,
              "source": "https://www.gq.com/story/mark-zuckerberg-milan-fashion-week-prada-front-row",
              "note": "Front row at Prada, Milan Fashion Week, in head-to-toe Prada. With his wife."
            },
            {
              "signal": "wardrobe_overhaul",
              "date": "2026-09-23",
              "verification": 1.0,
              "source": "https://www.cnn.com/2026/09/25/style/mark-zuckerberg-style",
              "note": "Custom Amiri tee reading 'BUILDING IS MY LOVE LANGUAGE' at Meta Connect."
            }
          ]
        }
      ]
    },
    "TSLA": {
      "company": "Tesla",
      "executives": [
        {
          "name": "Elon Musk",
          "role": "CEO",
          "signals": [
            {
              "signal": "dramatic_weight_loss",
              "date": "2022-11-16",
              "verification": 1.0,
              "source": "https://www.businessinsider.com/elon-musk-weight-loss-drug-wegovy-semaglutide-fit-ripped-healthy-2022-10",
              "note": "Self-reported 'Down 30 lbs!' via fasting + Wegovy."
            },
            {
              "signal": "dramatic_weight_loss",
              "date": "2024-12-26",
              "verification": 0.5,
              "source": "https://www.ibtimes.co.uk/elon-musk-transformation-fuller-face-leaner-look-1791841",
              "note": "'Ozempic Santa' post, then clarified he uses Mounjaro. Continuation of 2022, hence 0.5."
            },
            {
              "signal": "wardrobe_overhaul",
              "date": "2024-10-27",
              "verification": 1.0,
              "source": "https://www.wsj.com/style/fashion/elon-musk-dark-maga-hat-cap-gothic-trump-81e963cf",
              "note": "'I'm not just MAGA, I'm dark gothic MAGA': black cap, black blazer, slogan tees."
            },
            {
              "signal": "perm_or_new_hair",
              "date": "2025-05-21",
              "verification": 0.5,
              "source": "https://www.thelist.com/1866295/elon-musk-ages-himself-with-patchy-gray-beard/",
              "note": "Debuted a patchy gray beard in the Oval Office. Tabloid-grade source."
            },
            {
              "signal": "took_up_combat_sports",
              "date": "2023-06-21",
              "verification": 0.5,
              "source": "https://www.businessinsider.com/elon-musk-weight-loss-drug-wegovy-semaglutide-fit-ripped-healthy-2022-10",
              "note": "Proposed a cage fight with Zuckerberg; it never happened."
            }
          ]
        }
      ]
    },
    "AMZN": {
      "company": "Amazon",
      "executives": [
        {
          "name": "Andy Jassy",
          "role": "CEO",
          "signals": []
        },
        {
          "name": "Jeff Bezos",
          "role": "Executive Chair",
          "signals": [
            {
              "signal": "suddenly_ripped",
              "date": "2017-07-14",
              "verification": 1.0,
              "source": "https://www.thenewdaily.com.au/life/2017/07/16/jeff-bezos-muscles",
              "note": "Sun Valley 2017 biceps, vest and aviators."
            },
            {
              "signal": "wardrobe_overhaul",
              "date": "2022-01-01",
              "verification": 1.0,
              "source": "https://airmail.news/issues/2022-1-22/eye-of-the-beholder",
              "note": "Skintight New Year's outfit and heart-shaped sunglasses in St. Barth's."
            },
            {
              "signal": "sports_car_or_superyacht",
              "date": "2023-04-11",
              "verification": 1.0,
              "source": "https://www.superyachts.com/news/story/oceancos-127m-koru-delivered-16711/",
              "note": "$500M sailing yacht Koru delivered (Maori for 'new beginnings')."
            },
            {
              "signal": "fashion_week_front_row",
              "date": "2026-01-26",
              "verification": 1.0,
              "source": "https://www.gq.com/story/mark-zuckerberg-milan-fashion-week-prada-front-row",
              "note": "Attended Jonathan Anderson's debut Dior couture show (per GQ)."
            }
          ]
        }
      ]
    },
    "NVDA": {
      "company": "Nvidia",
      "executives": [
        {
          "name": "Jensen Huang",
          "role": "CEO",
          "signals": [
            {
              "signal": "wardrobe_overhaul",
              "date": "2005-01-01",
              "verification": 1.0,
              "source": "https://www.nytimes.com/2023/06/14/style/jensen-huang-nvidia-leather-jackets.html",
              "note": "Black leather jacket 'for at least 20 years', chosen by his wife and daughter. Not a recent change, so it has decayed away."
            },
            {
              "signal": "wardrobe_overhaul",
              "date": "2024-03-18",
              "verification": 0.5,
              "source": "https://fortune.com/article/why-does-jensen-huang-nvidia-wear-black-leather-jackets-revenge-of-the-nerds/",
              "note": "Escalated to ~$9,000 lizard-embossed Tom Ford jackets. Fortune: 'I doubt he has a motorcycle outside.'"
            },
            {
              "signal": "wardrobe_overhaul",
              "date": "2026-01-15",
              "verification": 1.0,
              "source": "https://www.lesechos.fr/weekend/mode-beaute/le-dress-code-de-la-silicon-valley-les-nouveaux-princes-de-la-tech-vont-ils-devenir-des-influenceurs-du-luxe-2238151",
              "note": "Swapped smooth leather for a crocodile-embossed calfskin Tom Ford blouson (Les Echos)."
            },
            {
              "signal": "wardrobe_overhaul",
              "date": "2026-06-03",
              "verification": 1.0,
              "source": "https://www.koreaherald.com/article/10765334",
              "note": "Ditched the leather jacket entirely for a ~$3,000 Dior embroidered zip shirt and Hermes slip-ons in Seoul. Kept his Oakley glasses."
            }
          ]
        }
      ]
    },
    "AAPL": {
      "company": "Apple",
      "executives": [
        {
          "name": "John Ternus",
          "role": "CEO",
          "signals": []
        },
        {
          "name": "Tim Cook",
          "role": "Executive Chair",
          "signals": []
        }
      ]
    },
    "MSFT": {
      "company": "Microsoft",
      "executives": [
        {
          "name": "Satya Nadella",
          "role": "CEO",
          "signals": []
        }
      ]
    },
    "GOOGL": {
      "company": "Alphabet",
      "executives": [
        {
          "name": "Sundar Pichai",
          "role": "CEO",
          "signals": []
        }
      ]
    },
    "BRK.B": {
      "company": "Berkshire Hathaway",
      "executives": [
        {
          "name": "Greg Abel",
          "role": "CEO",
          "signals": []
        }
      ]
    },
    "ORCL": {
      "company": "Oracle",
      "executives": [
        {
          "name": "Clay Magouyrk",
          "role": "Co-CEO",
          "signals": []
        },
        {
          "name": "Mike Sicilia",
          "role": "Co-CEO",
          "signals": []
        },
        {
          "name": "Larry Ellison",
          "role": "Executive Chair",
          "signals": [
            {
              "signal": "sports_car_or_superyacht",
              "date": "2011-01-01",
              "verification": 1.0,
              "source": "https://www.scmp.com/magazines/style/celebrity/article/3182380/inside-tech-billionaire-larry-ellisons-us160-million",
              "note": "88m Feadship Musashi. A lifelong yacht collector, so this is baseline, not a crisis."
            }
          ]
        }
      ]
    },
    "NFLX": {
      "company": "Netflix",
      "executives": [
        {
          "name": "Ted Sarandos",
          "role": "Co-CEO",
          "signals": []
        },
        {
          "name": "Greg Peters",
          "role": "Co-CEO",
          "signals": []
        }
      ]
    },
    "F": {
      "company": "Ford Motor",
      "executives": [
        {
          "name": "Jim Farley",
          "role": "CEO",
          "signals": [
            {
              "signal": "bought_motorcycle",
              "date": "2026-10-14",
              "verification": 0.5,
              "source": "https://fordauthority.com/2026/10/ford-ceo-jim-farley-takes-beta-rr-dirt-bike-into-aspen/",
              "note": "Rode a Beta RR dirt bike to 12,500 ft in Aspen and has been bidding at auctions. Lifelong rider and Harley-Davidson board member, so 0.5: this is a hobby, not a crisis."
            }
          ]
        }
      ]
    },
    "1810.HK": {
      "company": "Xiaomi",
      "executives": [
        {
          "name": "Lei Jun",
          "role": "CEO",
          "signals": [
            {
              "signal": "dramatic_weight_loss",
              "date": "2025-09-30",
              "verification": 1.0,
              "source": "https://finance.sina.com.cn/stock/t/2025-09-30/doc-infsfrrr7728759.shtml",
              "note": "Publicly logged 101 gym check-ins in 2025, beating his 100 target three months early."
            },
            {
              "signal": "suddenly_ripped",
              "date": "2025-02-15",
              "verification": 0.5,
              "source": "https://m.jiemian.com/video/AGUCMAhgB2YBOFVm.html",
              "note": "A fellow chairman asked why he was 'thinner and more handsome'. Lei: 'If you can't control your own weight, how can you run a company?' He says he isn't chasing an eight-pack, hence 0.5."
            }
          ]
        }
      ]
    }
  }
};
