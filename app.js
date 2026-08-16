(() => {
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const baseProjects = clone(window.PORTFOLIO_PROJECTS || []);
  const baseCategories = clone(window.PORTFOLIO_CATEGORIES || []);
  const baseCapabilities = clone(window.PORTFOLIO_CAPABILITIES || {
    metrics: [],
    groups: [],
    tools: [],
    qualities: [],
  });
  const languageContent = window.PORTFOLIO_I18N || {};
  const supportedLanguages = ["en", "zh", "ja"];
  const isPublicPortfolio = baseProjects.every((project) =>
    project.sources.every((source) => source.external),
  );

  let projects = clone(baseProjects);
  let categories = clone(baseCategories);
  let capabilities = clone(baseCapabilities);
  let categoryMap = {};
  let orderedProjects = [];
  let currentLanguage = "en";
  let currentUi = languageContent.en?.ui || {};

  const practiceIndex = document.querySelector("#practice-index");
  const projectGroups = document.querySelector("#project-groups");
  const capabilityMetrics = document.querySelector("#capability-metrics");
  const capabilityGroups = document.querySelector("#capability-groups");
  const capabilityTools = document.querySelector("#capability-tools");
  const capabilityQualities = document.querySelector("#capability-qualities");
  const caseStudy = document.querySelector("#case-study");
  const caseContent = document.querySelector("#case-content");
  const caseClose = document.querySelector("#case-close");
  const gameView = document.querySelector("#game-view");
  const gameFrame = document.querySelector("#game-frame");
  const gameExternal = document.querySelector("#game-external");
  const gameClose = document.querySelector("#game-close");
  const resumeView = document.querySelector("#resume-view");
  const resumeClose = document.querySelector("#resume-close");
  const languageSelect = document.querySelector("#language-select");

  let lastProjectTrigger = null;
  let lastGameTrigger = null;
  let lastResumeTrigger = null;

  const projectIndex = (id) => orderedProjects.findIndex((project) => project.id === id);
  const projectById = (id) => orderedProjects.find((project) => project.id === id);
  const twoDigits = (value) => String(value).padStart(2, "0");

  function mergeTranslation(base, override) {
    if (override === undefined) return clone(base);
    if (Array.isArray(base)) {
      return base.map((item, index) => mergeTranslation(item, override?.[index]));
    }
    if (base && typeof base === "object") {
      return Object.fromEntries(
        Object.keys(base).map((key) => [key, mergeTranslation(base[key], override?.[key])]),
      );
    }
    return override;
  }

  function sourceLabel(source) {
    if (source.external) {
      return currentLanguage === "zh" ? "打开可试玩原型" : "プレイ可能なプロトタイプを開く";
    }
    const extension = source.href.split(".").pop().split(/[?#]/)[0].toUpperCase();
    if (currentLanguage === "zh") {
      const type = extension === "XLSX" ? "数据与模型" : extension === "MP4" ? "项目视频" : "完整项目";
      return `${type} · ${extension}`;
    }
    const type = extension === "XLSX" ? "データ／モデル" : extension === "MP4" ? "プロジェクト動画" : "全プロジェクト";
    return `${type} · ${extension}`;
  }

  function localiseProject(baseProject, override) {
    const project = mergeTranslation(baseProject, override || {});
    if (currentLanguage === "en") return project;

    project.cover.alt =
      currentLanguage === "zh"
        ? `“${project.title}”项目封面`
        : `${project.title}のプロジェクト表紙`;
    project.media = project.media.map((item, index) => ({
      ...item,
      alt:
        currentLanguage === "zh"
          ? `“${project.title}”项目图像 ${index + 1}`
          : `${project.title}のプロジェクト画像 ${index + 1}`,
      caption:
        currentLanguage === "zh"
          ? `项目过程与成果 · ${twoDigits(index + 1)}`
          : `制作過程と成果 · ${twoDigits(index + 1)}`,
    }));
    project.sources = project.sources.map((source) => ({ ...source, label: sourceLabel(source) }));
    return project;
  }

  function projectCountLabel(count) {
    if (currentLanguage === "zh") return `${twoDigits(count)} 个项目`;
    if (currentLanguage === "ja") return `${twoDigits(count)} 件`;
    return `${twoDigits(count)} projects`;
  }

  function applyStaticTranslations(content) {
    document.documentElement.lang = content.htmlLang;
    document.title = content.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.meta.description);
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = content.site[element.dataset.i18n];
      if (value !== undefined) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = content.site[element.dataset.i18nHtml];
      if (value !== undefined) element.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const value = content.site[element.dataset.i18nAria];
      if (value !== undefined) element.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const value = content.site[element.dataset.i18nTitle];
      if (value !== undefined) element.setAttribute("title", value);
    });
  }

  function storedLanguage() {
    try {
      return window.localStorage.getItem("portfolio-language");
    } catch (_error) {
      return null;
    }
  }

  function setStoredLanguage(language) {
    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch (_error) {
      // The query string still preserves the choice when storage is unavailable.
    }
  }

  function setLanguage(language, { updateUrl = false } = {}) {
    currentLanguage = supportedLanguages.includes(language) ? language : "en";
    const content = languageContent[currentLanguage] || languageContent.en;
    currentUi = content.ui;
    categories = baseCategories.map((category) =>
      mergeTranslation(category, content.categories?.[category.id]),
    );
    projects = baseProjects.map((project) =>
      localiseProject(project, content.projects?.[project.id]),
    );
    capabilities = mergeTranslation(baseCapabilities, content.capabilities);
    categoryMap = Object.fromEntries(categories.map((category) => [category.id, category]));
    orderedProjects = categories.flatMap((category) =>
      projects.filter((project) => project.category === category.id),
    );

    applyStaticTranslations(content);
    languageSelect.value = currentLanguage;
    renderPortfolio();
    renderCapabilities();
    setupReveal();

    const projectMatch = window.location.hash.match(/^#project\/(.+)$/);
    if (projectMatch && !caseStudy.hidden) {
      const project = projectById(decodeURIComponent(projectMatch[1]));
      if (project) renderCaseStudy(project);
    }

    setStoredLanguage(currentLanguage);
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", currentLanguage);
      history.replaceState(history.state, "", url);
    }
  }

  function investmentPointMarkup(asset, showLabel = false) {
    const maximumRisk = 34.63;
    const minimumGrowth = -2.7;
    const maximumGrowth = 23.07;
    const x = Math.max(3, Math.min(97, (asset.risk / maximumRisk) * 92 + 3));
    const y = Math.max(
      4,
      Math.min(96, ((asset.growth - minimumGrowth) / (maximumGrowth - minimumGrowth)) * 88 + 4),
    );

    return `
      <span
        class="investment-point investment-point--${asset.stance}"
        style="--point-x: ${x.toFixed(2)}%; --point-y: ${y.toFixed(2)}%"
        title="${asset.name}: ${asset.volatility} ${currentUi.volatility}, ${asset.cagr} ${currentUi.cagr}"
        aria-hidden="true"
      >${showLabel ? `<b>${asset.code}</b>` : ""}</span>`;
  }

  function investmentCoverMarkup(project) {
    const study = project.investmentStudy;
    return `
      <div class="investment-cover" role="img" aria-label="${project.cover.alt}">
        <div class="investment-cover-topline">
          <span>PROP20001</span>
          <span>${currentUi.researchNote}</span>
        </div>
        <p class="investment-cover-title">${currentUi.investmentCoverTitle}</p>
        <div class="investment-cover-plot" aria-hidden="true">
          <span class="investment-cover-y">${currentUi.longRunGrowth}</span>
          <span class="investment-cover-x">${currentUi.observedVolatility}</span>
          ${study.assets.map((asset) => investmentPointMarkup(asset)).join("")}
        </div>
        <div class="investment-cover-stats">
          <span class="investment-cover-stat"><b>10</b><small>${currentUi.assets}</small></span>
          <span class="investment-cover-stat"><b>12Y</b><small>${currentUi.window}</small></span>
          <span class="investment-cover-stat"><b>04</b><small>${currentUi.metrics}</small></span>
          <span class="investment-cover-stat"><b>+200bp</b><small>${currentUi.stress}</small></span>
        </div>
      </div>`;
  }

  function pedalCoverMarkup(project) {
    return `
      <div class="pedal-cover" role="img" aria-label="${project.cover.alt}">
        <div class="pedal-cover-topline"><span>PBE / 2026</span><span>RESEARCH THROUGH MAKING</span></div>
        <div class="pedal-cover-title">
          <strong>PedalBalance</strong>
          <span>Echo</span>
        </div>
        <div class="pedal-cover-flow" aria-hidden="true">
          <span class="pedal-cover-node pedal-cover-node--human">H</span>
          <i></i>
          <span class="pedal-cover-node pedal-cover-node--machine">M</span>
          <i></i>
          <span class="pedal-cover-node pedal-cover-node--return">R</span>
          <i></i>
          <span class="pedal-cover-node pedal-cover-node--learn">L</span>
        </div>
        <div class="pedal-cover-footer"><span>03 NODES</span><span>02 STUDIES</span><span>00 DIY EMS</span></div>
      </div>`;
  }

  function projectCoverMarkup(project) {
    if (project.cover.variant === "investment" && project.investmentStudy) {
      return investmentCoverMarkup(project);
    }
    if (project.cover.variant === "pedal" && project.pedalStudy) {
      return pedalCoverMarkup(project);
    }
    return `<img src="${project.cover.src}" alt="${project.cover.alt}" loading="lazy" decoding="async" />`;
  }

  function practiceMarkup(category, index) {
    const count = projects.filter((project) => project.category === category.id).length;
    return `
      <a class="practice-index-row reveal" href="#group-${category.id}">
        <span class="practice-index-number">${twoDigits(index + 1)}</span>
        <span class="practice-index-name">${category.label}</span>
        <span class="practice-index-description">${category.description}</span>
        <span class="practice-index-count">${projectCountLabel(count)}</span>
        <span class="practice-index-arrow" aria-hidden="true">↓</span>
      </a>`;
  }

  function projectCardMarkup(project) {
    const index = projectIndex(project.id);
    return `
      <a class="project-card reveal" data-project="${project.id}" href="#project/${project.id}">
        <figure class="project-figure">
          ${projectCoverMarkup(project)}
          <figcaption>${twoDigits(index + 1)}</figcaption>
        </figure>
        <div class="project-card-copy">
          <div class="project-card-heading">
            <p class="project-kicker">${project.kicker}</p>
            <h3>${project.shortTitle}</h3>
          </div>
          <p class="project-meaning">${project.meaning}</p>
          <p class="project-year">${project.year}</p>
          <span class="project-arrow" aria-hidden="true">↗</span>
        </div>
      </a>`;
  }

  function workGroupMarkup(category, index) {
    const categoryProjects = projects.filter((project) => project.category === category.id);
    return `
      <section class="work-group" id="group-${category.id}" aria-labelledby="group-title-${category.id}">
        <header class="work-group-header reveal">
          <p class="work-group-number">${twoDigits(index + 1)}</p>
          <h2 id="group-title-${category.id}">${category.label}</h2>
          <p>${category.description}</p>
          <p class="work-group-count">${projectCountLabel(categoryProjects.length)}</p>
        </header>
        <div class="group-projects">
          ${categoryProjects.map(projectCardMarkup).join("")}
        </div>
      </section>`;
  }

  function renderPortfolio() {
    practiceIndex.innerHTML = categories.map(practiceMarkup).join("");
    projectGroups.innerHTML = categories.map(workGroupMarkup).join("");
  }

  function metricMarkup(metric) {
    return `
      <article class="capability-metric reveal">
        <p class="capability-metric-value">${metric.value}</p>
        <h3>${metric.label}</h3>
        <p>${metric.note}</p>
      </article>`;
  }

  function capabilityGroupMarkup(group) {
    return `
      <article class="capability-group reveal">
        <p class="capability-group-number">${group.number}</p>
        <div class="capability-group-title">
          <h3>${group.title}</h3>
          <p>${group.statement}</p>
        </div>
        <ul class="capability-skill-list" aria-label="${group.title} ${currentUi.methodsAria}">
          ${group.skills.map((skill) => `<li>${skill}</li>`).join("")}
        </ul>
        <p class="capability-proof"><span>${currentUi.evidence}</span>${group.evidence}</p>
      </article>`;
  }

  function toolMarkup(tool, index) {
    return `
      <article class="tool-row reveal">
        <p class="tool-number">${twoDigits(index + 1)}</p>
        <div class="tool-title">
          <h3>${tool.name}</h3>
          <p>${tool.domain}</p>
        </div>
        <p class="tool-workflow">${tool.workflow}</p>
        <p class="tool-evidence"><span>${currentUi.evidence}</span>${tool.evidence}</p>
      </article>`;
  }

  function qualityMarkup(quality, index) {
    return `
      <article class="quality-card reveal">
        <p>${twoDigits(index + 1)}</p>
        <h3>${quality.title}</h3>
        <p>${quality.evidence}</p>
      </article>`;
  }

  function renderCapabilities() {
    capabilityMetrics.innerHTML = capabilities.metrics.map(metricMarkup).join("");
    capabilityGroups.innerHTML = capabilities.groups.map(capabilityGroupMarkup).join("");
    capabilityTools.innerHTML = capabilities.tools.map(toolMarkup).join("");
    capabilityQualities.innerHTML = capabilities.qualities.map(qualityMarkup).join("");
  }

  function mediaMarkup(item) {
    const wide = item.layout === "wide" ? " case-media--wide" : "";
    const media =
      item.type === "video"
        ? `<video controls preload="metadata" poster="${item.poster || ""}" aria-label="${item.alt}">
             <source src="${item.src}" type="video/mp4" />
             ${currentUi.videoUnsupported} <a href="${item.src}">${currentUi.openVideo}</a>.
           </video>`
        : `<img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" />`;

    return `
      <figure class="case-media${wide}">
        <div class="case-media-frame">${media}</div>
        <figcaption>${item.caption || ""}</figcaption>
      </figure>`;
  }

  function lightStudyCardMarkup(item, mediaIndex, total) {
    return `
      <figure class="light-study-card">
        <div class="light-study-image">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" />
        </div>
        <figcaption>
          <p class="light-study-counter">${currentUi.study} ${twoDigits(mediaIndex + 1)} / ${twoDigits(total)}</p>
          <h3>${item.title}</h3>
          <p class="light-study-principle">${item.principle}</p>
          <p class="light-study-finding">${item.finding}</p>
        </figcaption>
      </figure>`;
  }

  function lightStudyChapterMarkup(project, chapter) {
    return `
      <section class="light-study-chapter" aria-labelledby="light-chapter-${chapter.number}">
        <header class="light-study-chapter-header">
          <p class="light-study-chapter-number">${chapter.number}</p>
          <div>
            <p class="light-study-eyebrow">${chapter.eyebrow}</p>
            <h2 id="light-chapter-${chapter.number}">${chapter.title}</h2>
          </div>
          <p>${chapter.statement}</p>
        </header>
        <div class="light-study-pair">
          ${chapter.media
            .map((mediaIndex) =>
              lightStudyCardMarkup(project.media[mediaIndex], mediaIndex, project.media.length),
            )
            .join("")}
        </div>
      </section>`;
  }

  function lightStudyMarkup(project) {
    const study = project.lightStudy;
    const leadImage = project.media[0];

    return `
      <div class="light-study-story">
        <figure class="light-study-opening">
          <img src="${leadImage.src}" alt="${leadImage.alt}" />
          <figcaption>
            <span>${currentUi.openingStudy}</span>
            <span>${leadImage.caption}</span>
          </figcaption>
        </figure>

        <section class="light-study-highlights" aria-labelledby="light-highlights-heading">
          <header class="light-study-section-heading">
            <p>${currentUi.projectHighlights}</p>
            <h2 id="light-highlights-heading">${currentUi.lightHighlightsTitle}</h2>
          </header>
          <div class="light-study-highlight-grid">
            ${study.highlights
              .map(
                (highlight) => `
                  <article class="light-study-highlight">
                    <p>${highlight.number}</p>
                    <h3>${highlight.title}</h3>
                    <p>${highlight.body}</p>
                  </article>`,
              )
              .join("")}
          </div>
        </section>

        <div class="light-study-chapters">
          ${study.chapters.map((chapter) => lightStudyChapterMarkup(project, chapter)).join("")}
        </div>

        <section class="light-study-comparison" aria-labelledby="light-comparison-heading">
          <header class="light-study-section-heading">
            <p>${currentUi.comparativeFinding}</p>
            <h2 id="light-comparison-heading">${currentUi.lightComparisonTitle}</h2>
          </header>
          <div class="light-study-comparison-table" role="table" aria-label="${currentUi.materialResponseAria}">
            <div class="light-study-comparison-header" role="row">
              <span role="columnheader">${currentUi.material}</span>
              <span role="columnheader">${currentUi.opticalBehaviour}</span>
              <span role="columnheader">${currentUi.spatialEffect}</span>
            </div>
            ${study.comparison
              .map(
                (row) => `
                  <div class="light-study-comparison-row" role="row">
                    <strong role="cell" data-label="${currentUi.material}">${row.material}</strong>
                    <span role="cell" data-label="${currentUi.opticalBehaviour}">${row.behaviour}</span>
                    <span role="cell" data-label="${currentUi.spatialEffect}">${row.effect}</span>
                  </div>`,
              )
              .join("")}
          </div>
        </section>

        <section class="light-study-conclusion">
          <p>${study.conclusion.eyebrow}</p>
          <h2>${study.conclusion.title}</h2>
          <p>${study.conclusion.body}</p>
        </section>
      </div>`;
  }

  function investmentMetricMarkup(metric) {
    return `
      <article class="investment-metric">
        <p>${metric.value}</p>
        <h3>${metric.label}</h3>
        <p>${metric.note}</p>
      </article>`;
  }

  function investmentLeaderMarkup(asset) {
    return `
      <div class="investment-leader-row" role="row">
        <span class="investment-leader-rank" role="cell">${asset.rank}</span>
        <strong role="cell">${asset.name}</strong>
        <span role="cell" data-label="${currentUi.averageReturn}">${asset.average}</span>
        <span role="cell" data-label="${currentUi.cagr}">${asset.cagr}</span>
        <span role="cell" data-label="${currentUi.volatility}">${asset.volatility}</span>
        <span role="cell" data-label="${currentUi.sharpe}">${asset.sharpe}</span>
        <span class="investment-role investment-role--${asset.stance}" role="cell">${asset.role}</span>
      </div>`;
  }

  function investmentThesisMarkup(thesis) {
    return `
      <article class="investment-thesis-card">
        <div class="investment-thesis-topline">
          <span>${thesis.number}</span>
          <span>${thesis.signal}</span>
        </div>
        <p class="investment-thesis-label">${thesis.label}</p>
        <h3>${thesis.title}</h3>
        <p class="investment-thesis-assets">${thesis.assets}</p>
        <p class="investment-thesis-body">${thesis.body}</p>
      </article>`;
  }

  function investmentStressMarkup(row, index) {
    return `
      <article class="investment-stress-row">
        <p>${twoDigits(index + 1)}</p>
        <h3>${row.market}</h3>
        <p><span>${currentUi.pressure}</span>${row.pressure}</p>
        <p><span>${currentUi.portfolioResponse}</span>${row.response}</p>
      </article>`;
  }

  function investmentStudyMarkup(project) {
    const study = project.investmentStudy;

    return `
      <div class="investment-study">
        <section class="investment-opening" aria-labelledby="investment-opening-heading">
          <div class="investment-risk-map" role="img" aria-label="${currentUi.investmentMapAria}">
            <div class="investment-map-topline">
              <span>${currentUi.riskReturnMap}</span>
              <span>2013–2024</span>
            </div>
            <div class="investment-map-field">
              <span class="investment-map-y">${currentUi.higherCagr}</span>
              <span class="investment-map-x">${currentUi.higherVolatility}</span>
              ${study.assets.map((asset) => investmentPointMarkup(asset, true)).join("")}
            </div>
            <div class="investment-map-legend">
              <span><i class="investment-legend-core"></i>${currentUi.core}</span>
              <span><i class="investment-legend-growth"></i>${currentUi.growth}</span>
              <span><i class="investment-legend-diversifier"></i>${currentUi.diversifier}</span>
              <span><i class="investment-legend-reduce"></i>${currentUi.reduce}</span>
            </div>
          </div>
          <div class="investment-opening-copy">
            <p class="investment-eyebrow">${currentUi.investmentThesis}</p>
            <h2 id="investment-opening-heading">${currentUi.investmentOpeningTitle}</h2>
            <p>${currentUi.investmentOpeningBody}</p>
            <dl class="investment-assumptions">
              ${study.assumptions
                .map(
                  (item) => `
                    <div>
                      <dt>${item.label}</dt>
                      <dd><strong>${item.value}</strong><span>${item.note}</span></dd>
                    </div>`,
                )
                .join("")}
            </dl>
          </div>
        </section>

        <section class="investment-method" aria-labelledby="investment-method-heading">
          <header class="investment-section-heading">
            <p>${currentUi.researchSystem}</p>
            <div>
              <h2 id="investment-method-heading">${currentUi.researchSystemTitle}</h2>
              <p>${currentUi.researchSystemBody}</p>
            </div>
          </header>
          <div class="investment-metric-grid">
            ${study.metrics.map(investmentMetricMarkup).join("")}
          </div>
        </section>

        <section class="investment-ranking" aria-labelledby="investment-ranking-heading">
          <header class="investment-section-heading">
            <p>${currentUi.comparativeEvidence}</p>
            <div>
              <h2 id="investment-ranking-heading">${currentUi.rankingTitle}</h2>
              <p>${currentUi.rankingBody}</p>
            </div>
          </header>
          <div class="investment-leaderboard" role="table" aria-label="${currentUi.comparativeEvidence}">
            <div class="investment-leader-header" role="row">
              <span role="columnheader">${currentUi.rank}</span>
              <span role="columnheader">${currentUi.assetClass}</span>
              <span role="columnheader">${currentUi.averageReturn}</span>
              <span role="columnheader">${currentUi.cagr}</span>
              <span role="columnheader">${currentUi.volatility}</span>
              <span role="columnheader">${currentUi.sharpe}</span>
              <span role="columnheader">${currentUi.role}</span>
            </div>
            ${study.assets.map(investmentLeaderMarkup).join("")}
          </div>
          <p class="investment-data-note">${currentUi.investmentDataNote}</p>
        </section>

        <section class="investment-allocation" aria-labelledby="investment-allocation-heading">
          <header class="investment-section-heading">
            <p>${currentUi.portfolioLogic}</p>
            <div>
              <h2 id="investment-allocation-heading">${currentUi.allocationTitle}</h2>
              <p>${currentUi.allocationBody}</p>
            </div>
          </header>
          <div class="investment-thesis-grid">
            ${study.theses.map(investmentThesisMarkup).join("")}
          </div>
        </section>

        <section class="investment-scenario" aria-labelledby="investment-scenario-heading">
          <header class="investment-scenario-header">
            <p>${currentUi.scenarioDiscipline}</p>
            <div>
              <p class="investment-scenario-kicker">${currentUi.downsideLens}</p>
              <h2 class="investment-scenario-title" id="investment-scenario-heading">${study.scenario.title}</h2>
            </div>
            <p>${study.scenario.intro}</p>
          </header>
          <div class="investment-stress-list">
            ${study.scenario.rows.map(investmentStressMarkup).join("")}
          </div>
          <p class="investment-scenario-conclusion">${study.scenario.conclusion}</p>
        </section>

        <section class="investment-evidence" aria-labelledby="investment-evidence-heading">
          <header class="investment-section-heading">
            <p>${currentUi.auditTrail}</p>
            <div>
              <h2 id="investment-evidence-heading">${currentUi.auditTitle}</h2>
              <p>${currentUi.auditBody}</p>
            </div>
          </header>
          <div class="investment-evidence-grid">
            ${study.evidence.map((mediaIndex) => mediaMarkup(project.media[mediaIndex])).join("")}
          </div>
        </section>

        <section class="investment-reflection">
          <p>${currentUi.reflection}</p>
          <h2>${study.reflection.title}</h2>
          <p>${study.reflection.body}</p>
        </section>
      </div>`;
  }

  function pedalStudyMarkup(project) {
    const study = project.pedalStudy;
    const sectionHeading = (section, id) => `
      <header class="pedal-section-heading">
        <p>${section.eyebrow}</p>
        <div><h2 id="${id}">${section.title}</h2><p>${section.body}</p></div>
      </header>`;

    return `
      <div class="pedal-study">
        <section class="pedal-status" aria-label="${study.statusLabel}">
          <p>${study.statusLabel}</p>
          <p class="pedal-status-note">${study.statusNote}</p>
        </section>

        <section class="pedal-facts" aria-label="${project.title}">
          ${study.facts.map((fact) => `
            <article class="pedal-fact">
              <strong>${fact.value}</strong>
              <h3>${fact.label}</h3>
              <p>${fact.note}</p>
            </article>`).join("")}
        </section>

        <section class="pedal-loop" aria-labelledby="pedal-loop-heading">
          ${sectionHeading(study.loop, "pedal-loop-heading")}
          <div class="pedal-loop-track" role="img" aria-label="${study.loop.aria}">
            ${study.loop.stages.map((stage) => `
              <article class="pedal-loop-stage pedal-loop-stage--${stage.tone}">
                <span>${stage.number}</span><h3>${stage.title}</h3><p>${stage.body}</p>
              </article>`).join("")}
          </div>
        </section>

        <section class="pedal-questions" aria-label="${project.title}">
          ${study.questions.map((question) => `
            <article class="pedal-question">
              <div class="pedal-question-code">${question.code}</div>
              <p>${question.eyebrow}</p>
              <h2>${question.title}</h2>
              <p>${question.body}</p>
              <strong>${question.outcome}</strong>
            </article>`).join("")}
        </section>

        <section class="pedal-architecture" aria-labelledby="pedal-architecture-heading">
          ${sectionHeading(study.architecture, "pedal-architecture-heading")}
          <div class="pedal-node-map">
            ${study.architecture.nodes.map((node) => `
              <article class="pedal-node">
                <span>${node.code}</span><h3>${node.name}</h3><p>${node.role}</p><small>${node.parts}</small>
              </article>`).join("")}
          </div>
          <p class="pedal-failsafe"><span>FAIL-SAFE</span>${study.architecture.failSafe}</p>
        </section>

        <section class="pedal-logic" aria-labelledby="pedal-logic-heading">
          ${sectionHeading(study.logic, "pedal-logic-heading")}
          <div class="pedal-logic-grid">
            <ol class="pedal-formula">${study.logic.formula.map((line) => `<li>${line}</li>`).join("")}</ol>
            <ol class="pedal-rules">${study.logic.rules.map((rule) => `<li>${rule}</li>`).join("")}</ol>
          </div>
          <p class="pedal-measurement-note">${study.measurementNote}</p>
        </section>

        <section class="pedal-experiments" aria-label="${project.title}">
          <article class="pedal-experiment pedal-experiment--c1">
            ${sectionHeading(study.c1, "pedal-c1-heading")}
            <div class="pedal-condition-grid">
              ${study.c1.conditions.map((item) => `
                <article class="pedal-condition pedal-condition--c1">
                  <span>${item.code}</span><h3>${item.title}</h3><p>${item.trigger}</p><small>${item.test}</small>
                </article>`).join("")}
            </div>
          </article>
          <article class="pedal-experiment pedal-experiment--e2">
            ${sectionHeading(study.e2, "pedal-e2-heading")}
            <div class="pedal-condition-grid">
              ${study.e2.conditions.map((item) => `
                <article class="pedal-condition pedal-condition--e2">
                  <span>${item.code}</span><h3>${item.title}</h3><p>${item.source}</p><small>${item.channel}</small>
                </article>`).join("")}
            </div>
          </article>
        </section>

        <section class="pedal-making" aria-labelledby="pedal-making-heading">
          ${sectionHeading(study.making, "pedal-making-heading")}
          <div class="pedal-phase-grid">
            ${study.making.phases.map((phase) => `
              <article class="pedal-phase"><span>${phase.range}</span><h3>${phase.title}</h3><p>${phase.evidence}</p></article>`).join("")}
          </div>
          <ul class="pedal-gates">${study.making.gates.map((gate) => `<li>${gate}</li>`).join("")}</ul>
        </section>

        <section class="pedal-safety" aria-labelledby="pedal-safety-heading">
          <header class="pedal-section-heading">
            <p>${study.safety.eyebrow}</p>
            <div><h2 id="pedal-safety-heading">${study.safety.title}</h2></div>
          </header>
          <p class="pedal-safety-body">${study.safety.body}</p>
          <div class="pedal-safety-grid">
            <ul>${study.safety.boundaries.map((item) => `<li>${item}</li>`).join("")}</ul>
            <ul>${study.safety.limitations.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
        </section>

        <section class="pedal-capabilities" aria-labelledby="pedal-capability-heading">
          <header class="pedal-section-heading">
            <p>${study.capabilityEyebrow}</p>
            <div><h2 id="pedal-capability-heading">${study.capabilityTitle}</h2><p>${study.capabilityBody}</p></div>
          </header>
          <div class="pedal-capability-grid">
            ${study.capabilities.map((item) => `
              <article class="pedal-capability"><h3>${item.title}</h3><p>${item.evidence}</p></article>`).join("")}
          </div>
        </section>

        <section class="pedal-references" aria-labelledby="pedal-reference-heading">
          <header><p>${study.referenceEyebrow}</p><h2 id="pedal-reference-heading">${study.referenceTitle}</h2></header>
          <div>
            ${study.references.map((item) => `
              <a href="${item.href}" target="_blank" rel="noreferrer"><strong>${item.title}</strong><span>${item.detail}</span><i aria-hidden="true">↗</i></a>`).join("")}
          </div>
        </section>

        <section class="pedal-reflection">
          <p>${study.reflection.eyebrow}</p><h2>${study.reflection.title}</h2><p>${study.reflection.body}</p>
        </section>
      </div>`;
  }

  function defaultCaseStoryMarkup(project) {
    return `
      <figure class="case-feature">
        <img src="${project.cover.src}" alt="${project.cover.alt}" />
      </figure>

      <div class="case-narrative">
        ${project.sections
          .map(
            (section, sectionIndex) => `
              <section class="case-section">
                <p class="case-section-label">${twoDigits(sectionIndex + 1)} / ${section.eyebrow}</p>
                <h2>${section.title}</h2>
                <p>${section.body}</p>
              </section>`,
          )
          .join("")}
      </div>

      <section class="case-evidence" aria-labelledby="evidence-heading">
        <header class="case-evidence-heading">
          <p>${currentUi.projectEvidence}</p>
          <h2 id="evidence-heading">${currentUi.selectedProcess}</h2>
        </header>
        <div class="case-gallery">${project.media.map(mediaMarkup).join("")}</div>
      </section>`;
  }

  function sourceArchiveMarkup(project) {
    if (isPublicPortfolio && !project.playableUrl && project.sources.length === 0) return "";
    const headingLabel = isPublicPortfolio ? currentUi.liveProject : currentUi.sourceArchive;
    const headingTitle = isPublicPortfolio
      ? currentUi.interactivePrototypeHeading
      : currentUi.originalSubmissions;
    const note = isPublicPortfolio ? currentUi.publicSourceNote : currentUi.sourceNote;

    return `
      <section class="source-archive" aria-labelledby="source-heading">
        <div>
          <p>${headingLabel}</p>
          <h2 id="source-heading">${headingTitle}</h2>
        </div>
        <p class="source-note">${note}</p>
        <div class="source-list">
          ${
            project.playableUrl
              ? `<button class="source-link source-link--play" type="button" data-play-game="${project.playableUrl}">
                  <span>${currentUi.playSignal}</span><span aria-hidden="true">↗</span>
                </button>`
              : ""
          }
          ${project.sources
            .map(
              (source) => `
                <a class="source-link" href="${source.href}" target="_blank" rel="noreferrer">
                  <span>${source.label}</span><span aria-hidden="true">↗</span>
                </a>`,
            )
            .join("")}
        </div>
      </section>`;
  }

  function renderCaseStudy(project) {
    const index = projectIndex(project.id);
    const nextProject = orderedProjects[(index + 1) % orderedProjects.length];
    const category = categoryMap[project.category];
    const articleClasses = [
      "case-article",
      project.lightStudy ? "case-article--light-performance" : "",
      project.investmentStudy ? "case-article--investment" : "",
      project.pedalStudy ? "case-article--pedal" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const caseStory = project.lightStudy
      ? lightStudyMarkup(project)
      : project.investmentStudy
        ? investmentStudyMarkup(project)
        : project.pedalStudy
          ? pedalStudyMarkup(project)
          : defaultCaseStoryMarkup(project);

    caseContent.innerHTML = `
      <article class="${articleClasses}">
        <header class="case-hero">
          <div class="case-topline">
            <p>${twoDigits(index + 1)} / ${twoDigits(projects.length)}</p>
            <p>${category.label}</p>
            <p>${project.year}</p>
          </div>
          <h1 id="case-title">${project.title}</h1>
          <p class="case-proposition">${project.meaning}</p>
        </header>

        <section class="case-overview" aria-label="${currentUi.projectOverview}">
          <p class="case-overview-label">${currentUi.overview}</p>
          <p class="case-summary">${project.summary}</p>
          <dl class="case-meta">
            <div><dt>${currentUi.role}</dt><dd>${project.role}</dd></div>
            <div><dt>${currentUi.methods}</dt><dd>${project.methods.join(" · ")}</dd></div>
          </dl>
        </section>

        ${caseStory}

        ${sourceArchiveMarkup(project)}

        <a class="case-next" href="#project/${nextProject.id}" data-next-project="${nextProject.id}">
          <p>${currentUi.nextProject} / ${categoryMap[nextProject.category].label}</p>
          <p><span>${nextProject.shortTitle}</span><span aria-hidden="true">→</span></p>
        </a>
      </article>`;
  }

  function transition(change) {
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.startViewTransition(change);
    } else {
      change();
    }
  }

  function updateBodyLock() {
    document.body.classList.toggle(
      "overlay-open",
      !caseStudy.hidden || !gameView.hidden || !resumeView.hidden,
    );
  }

  function hideGame() {
    gameView.hidden = true;
    gameFrame.removeAttribute("src");
    gameExternal.removeAttribute("href");
    caseStudy.inert = false;
  }

  function hideProject() {
    hideGame();
    caseStudy.hidden = true;
    caseContent.innerHTML = "";
    updateBodyLock();
  }

  function hideResume() {
    resumeView.hidden = true;
    updateBodyLock();
  }

  function openProject(id, trigger = null, updateHistory = true) {
    const project = projectById(id);
    if (!project) return;
    if (trigger) lastProjectTrigger = trigger;

    transition(() => {
      hideResume();
      renderCaseStudy(project);
      caseStudy.hidden = false;
      caseStudy.scrollTop = 0;
      updateBodyLock();
    });

    if (updateHistory && window.location.hash !== `#project/${id}`) {
      history.pushState({ project: id }, "", `#project/${id}`);
    }
    window.setTimeout(() => caseClose.focus({ preventScroll: true }), 0);
  }

  function closeProject({ restoreFocus = true, updateHistory = true } = {}) {
    if (caseStudy.hidden) return;
    transition(hideProject);
    if (updateHistory && window.location.hash.startsWith("#project/")) {
      history.pushState({}, "", "#work");
    }
    if (restoreFocus && lastProjectTrigger) {
      window.setTimeout(() => lastProjectTrigger.focus({ preventScroll: true }), 0);
    }
  }

  function openGame(url, trigger) {
    if (!url || caseStudy.hidden) return;
    lastGameTrigger = trigger;
    gameFrame.src = url;
    gameExternal.href = url;
    caseStudy.inert = true;
    gameView.hidden = false;
    updateBodyLock();
    window.setTimeout(() => gameClose.focus({ preventScroll: true }), 0);
  }

  function closeGame({ restoreFocus = true } = {}) {
    if (gameView.hidden) return;
    hideGame();
    updateBodyLock();
    if (restoreFocus && lastGameTrigger) {
      lastGameTrigger.focus({ preventScroll: true });
    }
  }

  function openResume(trigger = null, updateHistory = true) {
    if (trigger) lastResumeTrigger = trigger;
    transition(() => {
      hideProject();
      resumeView.hidden = false;
      resumeView.scrollTop = 0;
      updateBodyLock();
    });
    if (updateHistory && window.location.hash !== "#resume") {
      history.pushState({ resume: true }, "", "#resume");
    }
    window.setTimeout(() => resumeClose.focus({ preventScroll: true }), 0);
  }

  function closeResume({ restoreFocus = true, updateHistory = true } = {}) {
    if (resumeView.hidden) return;
    transition(hideResume);
    if (updateHistory && window.location.hash === "#resume") {
      history.pushState({}, "", "#profile");
    }
    if (restoreFocus && lastResumeTrigger) {
      window.setTimeout(() => lastResumeTrigger.focus({ preventScroll: true }), 0);
    }
  }

  function routeFromLocation() {
    const projectMatch = window.location.hash.match(/^#project\/(.+)$/);
    if (projectMatch) {
      openProject(decodeURIComponent(projectMatch[1]), null, false);
      return;
    }
    if (window.location.hash === "#resume") {
      openResume(null, false);
      return;
    }
    closeProject({ restoreFocus: false, updateHistory: false });
    closeResume({ restoreFocus: false, updateHistory: false });
  }

  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -5%" },
    );
    items.forEach((item) => observer.observe(item));
  }

  function trapFocus(event, container) {
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), iframe, video[controls], [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hidden);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const requestedLanguage = new URL(window.location.href).searchParams.get("lang");
  const initialLanguage = supportedLanguages.includes(requestedLanguage)
    ? requestedLanguage
    : supportedLanguages.includes(storedLanguage())
      ? storedLanguage()
      : "en";
  setLanguage(initialLanguage);
  routeFromLocation();

  languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value, { updateUrl: true });
  });

  document.addEventListener("click", (event) => {
    const projectLink = event.target.closest("[data-project]");
    if (projectLink) {
      event.preventDefault();
      openProject(projectLink.dataset.project, projectLink);
      return;
    }

    const nextLink = event.target.closest("[data-next-project]");
    if (nextLink) {
      event.preventDefault();
      openProject(nextLink.dataset.nextProject);
      return;
    }

    const resumeLink = event.target.closest("[data-resume-open]");
    if (resumeLink) {
      event.preventDefault();
      openResume(resumeLink);
      return;
    }

    const playGameButton = event.target.closest("[data-play-game]");
    if (playGameButton) {
      event.preventDefault();
      openGame(playGameButton.dataset.playGame, playGameButton);
    }
  });

  caseClose.addEventListener("click", () => closeProject());
  gameClose.addEventListener("click", () => closeGame());
  resumeClose.addEventListener("click", () => closeResume());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!gameView.hidden) closeGame();
      else if (!caseStudy.hidden) closeProject();
      else if (!resumeView.hidden) closeResume();
      return;
    }
    if (!gameView.hidden) trapFocus(event, gameView);
    else if (!caseStudy.hidden) trapFocus(event, caseStudy);
    else if (!resumeView.hidden) trapFocus(event, resumeView);
  });

  window.addEventListener("popstate", routeFromLocation);
})();
