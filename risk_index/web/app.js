(() => {
  const data = window.SIGNALS;
  if (!data) {
    document.body.innerHTML = "<p style='padding:2rem'>Missing signals.js</p>";
    return;
  }

  const SIGNAL_LABELS = {
    glasses_to_contacts: "Glasses → contacts",
    suddenly_ripped: "Suddenly ripped",
    perm_or_new_hair: "Perm / new hair",
    bought_motorcycle: "Bought a motorcycle",
    wardrobe_overhaul: "Wardrobe overhaul",
    took_up_combat_sports: "Combat sports",
    released_music: "Released music",
    sports_car_or_superyacht: "Sports car / yacht",
    dramatic_weight_loss: "Dramatic weight loss",
    luxury_watch_flex: "Luxury watch flex",
    fashion_week_front_row: "Fashion-week front row",
  };

  const SAMPLE = [
    ["NVDA", 15], ["MSFT", 14], ["AAPL", 14], ["AMZN", 10], ["GOOGL", 10],
    ["META", 8], ["BRK.B", 8], ["TSLA", 6], ["ORCL", 5], ["NFLX", 5],
    ["JPM", 5], ["F", 3], ["1810.HK", 2],
  ];

  const SCORE_CAP = 100;
  const portraits = window.PORTRAITS || {};
  const $ = (sel) => document.querySelector(sel);

  function portraitFor(name) {
    return portraits[name] || null;
  }

  function primaryPerson(entry) {
    const ranked = [...entry.executives].sort((a, b) => {
      const wa = data.role_weights[a.role] ?? 1;
      const wb = data.role_weights[b.role] ?? 1;
      if (wb !== wa) return wb - wa;
      return (b.signals?.length || 0) - (a.signals?.length || 0);
    });
    return ranked[0]?.name || entry.company;
  }

  function avatarHtml(name, className = "avatar") {
    const src = portraitFor(name);
    if (src) {
      return `<img class="${className}" src="${src}" alt="${name}" loading="lazy" />`;
    }
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return `<span class="${className} mono" aria-hidden="true">${initials}</span>`;
  }

  function renderHeroFaces() {
    const faces = [
      ["Mark Zuckerberg", "META"],
      ["Jensen Huang", "NVDA"],
      ["Elon Musk", "TSLA"],
      ["Jeff Bezos", "AMZN"],
    ];
    $("#hero-faces").innerHTML = faces
      .map(([name, ticker]) => {
        const src = portraitFor(name);
        if (!src) return "";
        return `<div class="face-tile"><img src="${src}" alt="${name}" /><span class="cap">${ticker}</span></div>`;
      })
      .join("");
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function yearsBetween(startISO, endISO) {
    const a = new Date(startISO + "T00:00:00");
    const b = new Date(endISO + "T00:00:00");
    return Math.max((b - a) / (365.25 * 86400000), 0);
  }

  function label(key) {
    return SIGNAL_LABELS[key] || key.replaceAll("_", " ");
  }

  function executiveScore(signals, asOf, halfLife) {
    let total = 0;
    const parts = [];
    for (const s of signals) {
      const age = yearsBetween(s.date, asOf);
      const contrib =
        data.signal_points[s.signal] * s.verification * Math.pow(2, -age / halfLife);
      total += contrib;
      parts.push({ ...s, contrib, label: label(s.signal) });
    }
    return { score: Math.min(SCORE_CAP, total), parts };
  }

  function companyScore(entry, asOf, halfLife) {
    let best = { score: 0, ex: null, parts: [] };
    for (const ex of entry.executives) {
      const raw = executiveScore(ex.signals, asOf, halfLife);
      const weighted = (data.role_weights[ex.role] ?? 1) * raw.score;
      if (!best.ex || weighted > best.score) {
        best = { score: weighted, ex, parts: raw.parts };
      }
    }
    return best;
  }

  function countSignals() {
    let n = 0;
    for (const entry of Object.values(data.companies)) {
      for (const ex of entry.executives) n += ex.signals.length;
    }
    return n;
  }

  function rankCompanies(asOf, halfLife) {
    return Object.entries(data.companies)
      .map(([ticker, entry]) => {
        const scored = companyScore(entry, asOf, halfLife);
        return { ticker, entry, ...scored };
      })
      .sort((a, b) => b.score - a.score);
  }

  function renderPoints() {
    const grid = $("#points-grid");
    grid.innerHTML = Object.entries(data.signal_points)
      .sort((a, b) => b[1] - a[1])
      .map(
        ([key, pts]) => `
        <div class="point-chip">
          <span class="label">${label(key)}</span>
          <span class="pts">+${pts}</span>
        </div>`
      )
      .join("");
  }

  function renderCompanyList(selected) {
    const asOf = $("#as-of").value || todayISO();
    const halfLife = Number($("#half-life").value) || 2;
    const ranked = rankCompanies(asOf, halfLife);
    const list = $("#company-list");
    list.innerHTML = ranked
      .map(({ ticker, entry, score }) => {
        const person = primaryPerson(entry);
        return `
        <button type="button" class="company-btn" role="option"
          data-ticker="${ticker}" aria-selected="${ticker === selected}">
          ${avatarHtml(person)}
          <span class="ticker">${ticker}</span>
          <span class="name">${entry.company}</span>
          <span class="mini-score">${score.toFixed(1)} / 100</span>
        </button>`;
      })
      .join("");

    list.querySelectorAll(".company-btn").forEach((btn) => {
      btn.addEventListener("click", () => openCompany(btn.dataset.ticker));
    });

    const top = ranked[0];
    $("#strip-top").textContent = top ? `${top.ticker} · ${top.score.toFixed(1)}` : "—";
    $("#strip-count").textContent = String(countSignals());
    $("#strip-asof").textContent = asOf;
  }

  function openCompany(ticker) {
    const entry = data.companies[ticker];
    if (!entry) return;
    const asOf = $("#as-of").value || todayISO();
    const halfLife = Number($("#half-life").value) || 2;
    const scored = companyScore(entry, asOf, halfLife);

    renderCompanyList(ticker);

    const execBlocks = entry.executives
      .map((ex) => {
        const raw = executiveScore(ex.signals, asOf, halfLife);
        const roleW = data.role_weights[ex.role] ?? 1;
        const signalsHtml =
          ex.signals.length === 0
            ? `<p class="empty-signals">No public makeover signals logged.</p>`
            : `<div class="signal-list">${raw.parts
                .sort((a, b) => b.contrib - a.contrib)
                .map(
                  (s, i) => `
                  <div class="signal-item" style="animation-delay:${i * 0.04}s">
                    <div class="row">
                      <span class="sig-name">${s.label}</span>
                      <span class="contrib">${s.contrib.toFixed(1)} pts after decay</span>
                    </div>
                    <div class="meta">
                      ${s.date} · verification ${s.verification.toFixed(1)} · raw +${data.signal_points[s.signal]}
                    </div>
                    <p class="note">${s.note}</p>
                    <a href="${s.source}" target="_blank" rel="noopener">Source ↗</a>
                  </div>`
                )
                .join("")}</div>`;

        return `
          <div class="exec-block">
            <h4>${avatarHtml(ex.name, "exec-portrait")}${ex.name} · ${ex.role}${roleW !== 1 ? ` · role weight ×${roleW}` : ""}
              <span style="color:var(--muted);font-family:var(--mono);font-weight:500;font-size:0.85rem">
                · raw ${raw.score.toFixed(1)}
              </span>
            </h4>
            ${signalsHtml}
          </div>`;
      })
      .join("");

    const lead = scored.ex?.name || primaryPerson(entry);
    const leadImg = portraitFor(lead);

    $("#signal-panel").innerHTML = `
      <div class="panel-head">
        <div class="panel-head-main">
          ${leadImg ? `<img class="panel-portrait" src="${leadImg}" alt="${lead}" />` : ""}
          <div>
            <h3>${ticker}</h3>
            <p class="company">${entry.company}</p>
            <p class="company" style="margin-top:0.55rem;text-transform:none;letter-spacing:0">${lead}</p>
          </div>
        </div>
        <div class="score-badge">
          <div class="num">${scored.score.toFixed(1)}</div>
          <div class="cap">company score / 100</div>
        </div>
      </div>
      ${execBlocks}`;
  }

  function bookRows() {
    return [...document.querySelectorAll(".book-row")].map((row) => ({
      ticker: row.querySelector(".ticker-input").value.trim().toUpperCase(),
      weight: Number(row.querySelector(".weight-input").value) || 0,
      el: row,
    }));
  }

  function addBookRow(ticker = "", weight = "") {
    const row = document.createElement("div");
    row.className = "book-row";
    row.innerHTML = `
      <input class="ticker-input" placeholder="TICKER" value="${ticker}" spellcheck="false" />
      <input class="weight-input" type="number" min="0" step="any" placeholder="Weight" value="${weight}" />
      <button type="button" aria-label="Remove">✕</button>`;
    row.querySelector("button").addEventListener("click", () => {
      row.remove();
      if (!$(".book-row")) addBookRow();
    });
    $("#book").appendChild(row);
  }

  function loadSample() {
    $("#book").innerHTML = "";
    SAMPLE.forEach(([t, w]) => addBookRow(t, w));
  }

  function scorePortfolio() {
    const asOf = $("#as-of").value || todayISO();
    const halfLife = Number($("#half-life").value) || 2;
    let rows = bookRows().filter((r) => r.ticker);
    const totalW = rows.reduce((s, r) => s + r.weight, 0);
    if (!rows.length || totalW <= 0) {
      alert("Add at least one ticker with a positive weight.");
      return;
    }

    rows = rows.map((r) => {
      const entry = data.companies[r.ticker];
      const weight = r.weight / totalW;
      if (!entry) {
        return { ticker: r.ticker, weight, score: 0, who: "no data", parts: [] };
      }
      const scored = companyScore(entry, asOf, halfLife);
      const who = scored.parts.length
        ? `${scored.ex.name} (${scored.ex.role})`
        : "no signals";
      return { ticker: r.ticker, weight, score: scored.score, who, parts: scored.parts };
    });

    const exposure = rows.reduce((s, r) => s + r.weight * r.score, 0);
    rows = rows
      .map((r) => ({
        ...r,
        contribution: r.weight * r.score,
        share: exposure ? (r.weight * r.score) / exposure : 0,
      }))
      .sort((a, b) => b.contribution - a.contribution);

    $("#results").hidden = false;
    $("#r-score").textContent = exposure.toFixed(2);
    const top = rows[0];
    $("#r-top").textContent =
      top && top.score > 0 ? `${top.ticker} · ${top.who}` : "No elevated risk";

    $("#results-body").innerHTML = rows
      .map((r, i) => {
        const name = r.who.includes("(") ? r.who.split(" (")[0] : "";
        const avatar = name && portraitFor(name)
          ? `<img class="who-avatar" src="${portraitFor(name)}" alt="" />`
          : "";
        return `
        <tr class="${i === 0 && r.score > 0 ? "hot" : ""}">
          <td>${r.ticker}</td>
          <td>${(r.weight * 100).toFixed(1)}%</td>
          <td>${r.score.toFixed(1)}</td>
          <td>${r.contribution.toFixed(2)}</td>
          <td>${(r.share * 100).toFixed(1)}%</td>
          <td><div class="who-cell">${avatar}<span>${r.who}</span></div></td>
        </tr>`;
      })
      .join("");

    if (top && top.parts.length) {
      $("#breakdown").innerHTML = `
        <h4>Why ${top.ticker} leads</h4>
        <ul>
          ${top.parts
            .sort((a, b) => b.contrib - a.contrib)
            .map(
              (p) =>
                `<li><span>${p.label}</span><span>${p.contrib.toFixed(1)} pts</span></li>`
            )
            .join("")}
        </ul>`;
    } else {
      $("#breakdown").innerHTML = "";
    }

    $("#results").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Boot
  $("#as-of").value = todayISO();
  renderPoints();
  renderHeroFaces();
  renderCompanyList(null);
  loadSample();

  $("#add-row").addEventListener("click", () => addBookRow());
  $("#load-sample").addEventListener("click", loadSample);
  $("#clear-book").addEventListener("click", () => {
    $("#book").innerHTML = "";
    addBookRow();
    $("#results").hidden = true;
  });
  $("#score-btn").addEventListener("click", scorePortfolio);
  $("#as-of").addEventListener("change", () => {
    const selected = document.querySelector('.company-btn[aria-selected="true"]');
    renderCompanyList(selected?.dataset.ticker || null);
    if (selected) openCompany(selected.dataset.ticker);
  });
  $("#half-life").addEventListener("change", () => {
    const selected = document.querySelector('.company-btn[aria-selected="true"]');
    renderCompanyList(selected?.dataset.ticker || null);
    if (selected) openCompany(selected.dataset.ticker);
  });

  // Open top company by default so the vault isn't empty
  const topTicker = rankCompanies(todayISO(), 2)[0]?.ticker;
  if (topTicker) openCompany(topTicker);
})();
