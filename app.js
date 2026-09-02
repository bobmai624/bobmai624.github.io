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
  const portfolioModel = window.PortfolioModel;
  const caseComponents = window.CaseComponents;
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
  const canonical = document.querySelector('link[rel="canonical"]');
  const metaDescription = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const ogImage = document.querySelector('meta[property="og:image"]');

  const projectGroups = document.querySelector("#project-groups");
  const archiveProjects = document.querySelector("#archive-projects");
  const capabilityGroups = document.querySelector("#capability-groups");
  const caseStudy = document.querySelector("#case-study");
  const caseContent = document.querySelector("#case-content");
  const caseClose = document.querySelector("#case-close");
  const gameView = document.querySelector("#game-view");
  const gameFrame = document.querySelector("#game-frame");
  const gameExternal = document.querySelector("#game-external");
  const gameClose = document.querySelector("#game-close");
  const resumeView = document.querySelector("#resume-view");
  const resumeClose = document.querySelector("#resume-close");
  const resumePrint = document.querySelector("#resume-print");
  const contactView = document.querySelector("#contact-view");
  const contactClose = document.querySelector("#contact-close");
  const languageSelect = document.querySelector("#language-select");
  const siteHeader = document.querySelector(".site-header");
  const main = document.querySelector("main");
  const siteFooter = document.querySelector(".site-footer");

  let lastProjectTriggerId = null;
  let lastGameTrigger = null;
  let lastResumeTrigger = null;
  let lastContactTrigger = null;

  const projectIndex = (id) => orderedProjects.findIndex((project) => project.id === id);
  const catalogueIndex = (id) => baseProjects.findIndex((project) => project.id === id);
  const projectById = (id) => orderedProjects.find((project) => project.id === id);
  const twoDigits = (value) => String(value).padStart(2, "0");

  function projectHref(project) {
    if (!project.caseHref) return `#project/${project.id}`;
    const separator = project.caseHref.includes("?") ? "&" : "?";
    return `${project.caseHref}${separator}lang=${encodeURIComponent(currentLanguage)}`;
  }

  function projectShareHref(project) {
    return portfolioModel.projectSharePath(project);
  }

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
    if (source.labels?.[currentLanguage]) return source.labels[currentLanguage];
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
    const factOverride = languageContent[currentLanguage]?.caseFacts?.[baseProject.id];
    project.caseFacts = mergeTranslation(baseProject.caseFacts, factOverride || {});
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
    return `${twoDigits(count)} ${count === 1 ? "project" : "projects"}`;
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

  function setMeta({ title, description, url, image }) {
    document.title = title;
    metaDescription?.setAttribute("content", description);
    ogTitle?.setAttribute("content", title);
    ogDescription?.setAttribute("content", description);
    ogUrl?.setAttribute("content", url);
    if (image) ogImage?.setAttribute("content", image);
    canonical?.setAttribute("href", url);
  }

  function restoreHomeMeta() {
    const content = languageContent[currentLanguage] || languageContent.en;
    setMeta({
      title: content.meta.title,
      description: content.meta.description,
      url: "https://bobmai624.github.io/",
      image: "https://bobmai624.github.io/assets/projects/vita/04-refined-prototype.jpg",
    });
  }

  function applyProjectMeta(project) {
    const shareUrl = `https://bobmai624.github.io/${projectShareHref(project)}`;
    const socialImage = project.shareImage || project.cover?.src;
    const cover = socialImage?.startsWith("assets/")
      ? `https://bobmai624.github.io/${socialImage}`
      : "https://bobmai624.github.io/assets/projects/library/cover-session.jpg";
    setMeta({
      title: `${project.title} — Bowen Mai`,
      description: portfolioModel.projectDescription(project),
      url: shareUrl,
      image: cover,
    });
  }

  function captureReadingPosition() {
    if (!caseStudy.hidden) return { surface: "case", top: caseStudy.scrollTop };
    if (!resumeView.hidden) return { surface: "resume", top: resumeView.scrollTop };
    if (!contactView.hidden) return { surface: "contact", top: contactView.scrollTop };
    return { surface: "window", top: window.scrollY };
  }

  function restoreReadingPosition(snapshot) {
    window.requestAnimationFrame(() => {
      if (snapshot.surface === "case" && !caseStudy.hidden) {
        caseStudy.scrollTop = snapshot.top;
      } else if (snapshot.surface === "resume" && !resumeView.hidden) {
        resumeView.scrollTop = snapshot.top;
      } else if (snapshot.surface === "contact" && !contactView.hidden) {
        contactView.scrollTop = snapshot.top;
      } else if (
        snapshot.surface === "window" &&
        caseStudy.hidden &&
        resumeView.hidden &&
        contactView.hidden
      ) {
        window.scrollTo({ top: snapshot.top, left: window.scrollX, behavior: "auto" });
      }
    });
  }

  function setLanguage(language) {
    const readingPosition = captureReadingPosition();
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
    const partition = portfolioModel.partitionProjects(projects);
    orderedProjects = [...partition.selected, ...partition.archive];

    applyStaticTranslations(content);
    languageSelect.value = currentLanguage;
    renderPortfolio();
    renderCapabilities();
    setupReveal();

    const projectMatch = window.location.hash.match(/^#project\/(.+)$/);
    if (projectMatch && !caseStudy.hidden) {
      const project = projectById(decodeURIComponent(projectMatch[1]));
      if (project) {
        renderCaseStudy(project);
        applyProjectMeta(project);
      }
    } else if (!resumeView.hidden) {
      const content = languageContent[currentLanguage] || languageContent.en;
      setMeta({
        title: `${currentUi.resumeLabel} — Bowen Mai`,
        description: content.site.resumeSummary,
        url: "https://bobmai624.github.io/#resume",
        image: "https://bobmai624.github.io/assets/projects/library/cover-session.jpg",
      });
    } else if (!contactView.hidden) {
      setMeta({
        title: `${content.site.contactTitle} — Bowen Mai`,
        description: content.site.contactIntro,
        url: "https://bobmai624.github.io/#contact",
        image: "https://bobmai624.github.io/assets/projects/vita/04-refined-prototype.jpg",
      });
    }

    restoreReadingPosition(readingPosition);
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

  function projectCoverMarkup(project) {
    if (project.cover.variant === "investment" && project.investmentStudy) {
      return investmentCoverMarkup(project);
    }
    return `<img src="${project.cover.src}" alt="${project.cover.alt}" loading="lazy" decoding="async" />`;
  }

  function featuredProjectMarkup(project, position) {
    const routeAttributes = project.caseHref
      ? `href="${projectHref(project)}" data-project-page="${project.id}"`
      : `data-project="${project.id}" href="${projectShareHref(project)}"`;
    return `
      <a class="featured-project featured-project--${position + 1} reveal" ${routeAttributes}>
        <div class="featured-project-copy">
          <p class="featured-project-number">${twoDigits(catalogueIndex(project.id) + 1)}</p>
          <div class="featured-project-details">
            <p class="featured-project-kicker">${project.kicker} · ${project.year}</p>
            <h3>${project.shortTitle}</h3>
            <p class="featured-project-proof"><span>${currentUi.myContribution}</span>${project.caseFacts.homeContribution}</p>
            <p class="featured-project-evidence"><span>${currentUi.evidence}</span>${project.caseFacts.homeEvidence}</p>
          </div>
          <span aria-hidden="true">↗</span>
        </div>
        <figure class="featured-project-figure">
          ${projectCoverMarkup(project)}
        </figure>
      </a>`;
  }

  function archiveCardMarkup(project, index) {
    const routeAttributes = project.caseHref
      ? `href="${projectHref(project)}" data-project-page="${project.id}"`
      : `data-project="${project.id}" href="${projectShareHref(project)}"`;
    return `
      <a class="archive-card reveal" ${routeAttributes}>
        <p class="archive-card-number">${twoDigits(index + 1)}</p>
        <div><p class="archive-card-kicker">${project.year}</p><h3>${project.shortTitle}</h3></div>
        <p class="archive-card-summary">${project.caseFacts.outcome}</p>
        <span aria-hidden="true">↗</span>
      </a>`;
  }

  function archiveGroupMarkup(group) {
    return `
      <section class="archive-group" aria-labelledby="archive-${group.category.id}">
        <header class="archive-group-heading reveal">
          <p>${projectCountLabel(group.projects.length)}</p>
          <h3 id="archive-${group.category.id}">${group.category.label}</h3>
        </header>
        <div class="archive-group-list">
          ${group.projects
            .map((project) => archiveCardMarkup(project, catalogueIndex(project.id)))
            .join("")}
        </div>
      </section>`;
  }

  function renderPortfolio() {
    const partition = portfolioModel.partitionProjects(projects);
    const archiveGroups = portfolioModel.groupProjectsByCategory(partition.archive, categories);
    projectGroups.innerHTML = `<div class="featured-projects">${partition.selected.map(featuredProjectMarkup).join("")}</div>`;
    archiveProjects.innerHTML = archiveGroups.map(archiveGroupMarkup).join("");
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

  function renderCapabilities() {
    capabilityGroups.innerHTML = capabilities.groups.map(capabilityGroupMarkup).join("");
  }

  function mediaMarkup(item) {
    const layoutClass = item.layout ? ` case-media--${item.layout}` : "";
    const media =
      item.type === "video"
        ? `<video controls preload="metadata" poster="${item.poster || ""}" aria-label="${item.alt}">
             <source src="${item.src}" type="video/mp4" />
             ${currentUi.videoUnsupported} <a href="${item.src}">${currentUi.openVideo}</a>.
           </video>`
        : `<img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" />`;

    return `
      <figure class="case-media${layoutClass}">
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

      ${caseComponents.playableStage(project, currentUi)}

      <section class="case-evidence" aria-labelledby="evidence-heading">
        <header class="case-evidence-heading">
          <p>${currentUi.projectEvidence}</p>
          <h2 id="evidence-heading">${currentUi.selectedProcess}</h2>
        </header>
        <div class="case-gallery">${project.media.map(mediaMarkup).join("")}</div>
      </section>`;
  }

  function libraryMetricMarkup(metric) {
    return `
      <div class="library-metric">
        <strong>${metric.value}</strong>
        <span>${metric.label}</span>
      </div>`;
  }

  function libraryJourneyStepMarkup(step) {
    return `
      <li class="library-journey-step">
        <p>${step.number}</p>
        <h3>${step.title}</h3>
        <p>${step.body}</p>
      </li>`;
  }

  function libraryFindingMarkup(item, index) {
    return `
      <article class="library-finding${index % 2 ? " library-finding--reverse" : ""}">
        <figure class="library-finding-figure">
          <img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async" />
          <figcaption>${item.caption}</figcaption>
        </figure>
        <div class="library-finding-copy">
          <p class="library-finding-stat">${item.stat}</p>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </div>
      </article>`;
  }

  function libraryRecommendationGroupMarkup(group) {
    return `
      <section class="library-recommendation-group">
        <h3>${group.label}</h3>
        <div class="library-recommendation-list">
          ${group.items
            .map(
              (item) => `
                <article class="library-recommendation">
                  <p>${item.id}</p>
                  <div>
                    <h4>${item.title}</h4>
                    <p>${item.body}</p>
                  </div>
                </article>`,
            )
            .join("")}
        </div>
      </section>`;
  }

  function libraryStudyMarkup(project) {
    const study = project.libraryStudy;
    const coverTitle = study.cover.title.split("\n").join("<br />");

    return `
      <div class="library-study-story">
        <section class="library-study-cover" aria-labelledby="library-study-cover-heading">
          <div class="library-study-cover-copy">
            <p>${study.cover.eyebrow}</p>
            <h2 id="library-study-cover-heading">${coverTitle}</h2>
            <p>${study.cover.body}</p>
          </div>
          <figure class="library-study-cover-image">
            <img src="${project.cover.src}" alt="${project.cover.alt}" />
          </figure>
        </section>

        <section class="library-metrics" aria-label="${study.journey.label}">
          ${study.metrics.map(libraryMetricMarkup).join("")}
        </section>

        <section class="library-journey" aria-labelledby="library-journey-heading">
          <header class="library-section-heading">
            <p>${study.journey.label}</p>
            <div>
              <h2 id="library-journey-heading">${study.journey.title}</h2>
              <p>${study.journey.body}</p>
            </div>
          </header>
          <ol class="library-journey-steps">
            ${study.journey.steps.map(libraryJourneyStepMarkup).join("")}
          </ol>
        </section>

        <section class="library-findings" aria-labelledby="library-findings-heading">
          <header class="library-section-heading library-section-heading--light">
            <p>${study.findings.label}</p>
            <div>
              <h2 id="library-findings-heading">${study.findings.title}</h2>
              <p>${study.findings.body}</p>
            </div>
          </header>
          <div class="library-findings-list">
            ${study.findings.items.map(libraryFindingMarkup).join("")}
          </div>
        </section>

        <section class="library-recommendations" aria-labelledby="library-recommendations-heading">
          <header class="library-section-heading">
            <p>${study.recommendations.label}</p>
            <div>
              <h2 id="library-recommendations-heading">${study.recommendations.title}</h2>
              <p>${study.recommendations.body}</p>
            </div>
          </header>
          <div class="library-recommendation-groups">
            ${study.recommendations.groups.map(libraryRecommendationGroupMarkup).join("")}
          </div>
        </section>

        <aside class="library-limitation" aria-labelledby="library-limitation-heading">
          <p>${study.limitation.label}</p>
          <div>
            <h2 id="library-limitation-heading">${study.limitation.title}</h2>
            <p>${study.limitation.body}</p>
          </div>
        </aside>

        <section class="library-video" aria-labelledby="library-video-heading">
          <header class="library-section-heading library-section-heading--light">
            <p>${study.video.label}</p>
            <div>
              <h2 id="library-video-heading">${study.video.title}</h2>
              <p>${study.video.body}</p>
            </div>
          </header>
          <figure class="library-video-figure">
            <div class="library-video-stage">
              <video controls preload="metadata" poster="${study.video.poster}" aria-label="${study.video.title}">
                <source src="${study.video.src}" type="video/mp4" />
                ${currentUi.videoUnsupported} <a href="${study.video.src}">${currentUi.openVideo}</a>.
              </video>
            </div>
            <figcaption>${study.video.caption}</figcaption>
          </figure>
        </section>
      </div>`;
  }

  function sourceArchiveMarkup(project) {
    const publicSources = project.sources.filter((source) => !source.restricted);
    if (!project.playableUrl && publicSources.length === 0 && project.sourcePolicy !== "shared") return "";
    const headingLabel = isPublicPortfolio ? currentUi.liveProject : currentUi.sourceArchive;
    const headingTitle = isPublicPortfolio
      ? currentUi.interactivePrototypeHeading
      : currentUi.originalSubmissions;
    const note = project.sourcePolicy === "shared"
      ? currentUi.sharedSourceNote
      : isPublicPortfolio
        ? currentUi.publicSourceNote
        : currentUi.sourceNote;

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
          ${publicSources
            .map(
              (source) => `
                <a class="source-link${source.supplementary ? " source-link--supplementary" : ""}" href="${source.href}" target="_blank" rel="noreferrer">
                  <span>${source.label}</span><span aria-hidden="true">↗</span>
                </a>`,
            )
            .join("")}
          <a class="source-link" href="${projectShareHref(project)}">
            <span>${currentUi.shareProject}</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>`;
  }

  function renderCaseStudy(project) {
    const index = projectIndex(project.id);
    const nextProject = orderedProjects[(index + 1) % orderedProjects.length];
    const category = categoryMap[project.category];
    const articleClasses = [
      "case-article",
      `case-article--${project.id}`,
      project.lightStudy ? "case-article--light-performance" : "",
      project.investmentStudy ? "case-article--investment" : "",
      project.id === "library-evaluation" ? "case-article--library" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const caseStory = project.lightStudy
      ? lightStudyMarkup(project)
      : project.investmentStudy
        ? investmentStudyMarkup(project)
        : project.libraryStudy
          ? libraryStudyMarkup(project)
          : defaultCaseStoryMarkup(project);

    caseContent.innerHTML = `
      <article class="${articleClasses}">
        <header class="case-hero">
          <div class="case-topline">
            <p>${twoDigits(index + 1)} / ${twoDigits(projects.length)}</p>
            <p>${category.label}</p>
            <p>${project.year}</p>
          </div>
          <h1 id="case-title">${project.displayTitle || project.title}</h1>
          <p class="case-proposition">${project.meaning}</p>
        </header>

        <section class="case-overview" aria-label="${currentUi.projectOverview}">
          <p class="case-overview-label">${currentUi.overview}</p>
          <p class="case-summary">${project.summary}</p>
          <dl class="case-meta">
            <div><dt>${currentUi.context}</dt><dd>${project.caseFacts.context}</dd></div>
            <div><dt>${currentUi.ownership}</dt><dd>${project.caseFacts.ownership}</dd></div>
            <div><dt>${currentUi.myContribution}</dt><dd>${project.caseFacts.contribution}</dd></div>
            <div><dt>${currentUi.evidence}</dt><dd>${project.caseFacts.evidence}</dd></div>
            <div><dt>${currentUi.outcome}</dt><dd>${project.caseFacts.outcome}</dd></div>
            ${project.caseFacts.limitation ? `<div><dt>${currentUi.limitation}</dt><dd>${project.caseFacts.limitation}</dd></div>` : ""}
            <div><dt>${currentUi.methods}</dt><dd>${project.methods.join(" · ")}</dd></div>
          </dl>
        </section>

        ${caseStory}

        ${sourceArchiveMarkup(project)}

        <a class="case-next" href="${projectHref(nextProject)}" ${nextProject.caseHref ? `data-project-page="${nextProject.id}"` : `data-next-project="${nextProject.id}"`}>
          <p>${currentUi.nextProject} / ${categoryMap[nextProject.category].label}</p>
          <p><span>${nextProject.shortTitle}</span><span aria-hidden="true">→</span></p>
        </a>
      </article>`;
  }

  function transition(change) {
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return document.startViewTransition(change).finished;
    }
    change();
    return Promise.resolve();
  }

  function focusWhenReady(element, finished = Promise.resolve()) {
    finished.finally(() => {
      window.requestAnimationFrame(() => element?.focus({ preventScroll: true }));
    });
  }

  function updateBodyLock() {
    const overlayOpen = !caseStudy.hidden || !gameView.hidden || !resumeView.hidden || !contactView.hidden;
    document.body.classList.toggle("overlay-open", overlayOpen);
    [siteHeader, main, siteFooter].forEach((element) => {
      if (element) element.inert = overlayOpen;
    });
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

  function hideContact() {
    contactView.hidden = true;
    updateBodyLock();
  }

  function openProject(id, trigger = null, updateHistory = true) {
    const project = projectById(id);
    if (!project) return;
    if (project.caseHref) {
      window.location.assign(projectHref(project));
      return;
    }
    lastProjectTriggerId = id;

    const transitionFinished = transition(() => {
      hideResume();
      hideContact();
      renderCaseStudy(project);
      caseStudy.hidden = false;
      caseStudy.scrollTop = 0;
      updateBodyLock();
      applyProjectMeta(project);
    });

    if (updateHistory && window.location.hash !== `#project/${id}`) {
      history.pushState({ project: id }, "", `#project/${id}`);
    }
    focusWhenReady(caseClose, transitionFinished);
  }

  function closeProject({ restoreFocus = true, updateHistory = true } = {}) {
    if (caseStudy.hidden) return;
    const transitionFinished = transition(() => {
      hideProject();
      restoreHomeMeta();
    });
    if (updateHistory && window.location.hash.startsWith("#project/")) {
      history.pushState({}, "", "#work");
    }
    if (restoreFocus) {
      const returnTarget = lastProjectTriggerId
        ? document.querySelector(`[data-project="${lastProjectTriggerId}"]`)
        : null;
      focusWhenReady(returnTarget || document.querySelector("#work-heading"), transitionFinished);
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
    focusWhenReady(gameClose);
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
    const transitionFinished = transition(() => {
      hideProject();
      hideContact();
      resumeView.hidden = false;
      resumeView.scrollTop = 0;
      updateBodyLock();
      const content = languageContent[currentLanguage] || languageContent.en;
      setMeta({
        title: `${currentUi.resumeLabel} — Bowen Mai`,
        description: content.site.resumeSummary,
        url: "https://bobmai624.github.io/#resume",
        image: "https://bobmai624.github.io/assets/projects/library/cover-session.jpg",
      });
    });
    if (updateHistory && window.location.hash !== "#resume") {
      history.pushState({ resume: true }, "", "#resume");
    }
    focusWhenReady(resumeClose, transitionFinished);
  }

  function closeResume({ restoreFocus = true, updateHistory = true } = {}) {
    if (resumeView.hidden) return;
    const transitionFinished = transition(() => {
      hideResume();
      restoreHomeMeta();
    });
    if (updateHistory && window.location.hash === "#resume") {
      history.pushState({}, "", "#profile");
    }
    if (restoreFocus && lastResumeTrigger) {
      focusWhenReady(lastResumeTrigger, transitionFinished);
    }
  }

  function openContact(trigger = null, updateHistory = true) {
    if (trigger) lastContactTrigger = trigger;
    const transitionFinished = transition(() => {
      hideProject();
      hideResume();
      contactView.hidden = false;
      contactView.scrollTop = 0;
      updateBodyLock();
      const content = languageContent[currentLanguage] || languageContent.en;
      setMeta({
        title: `${content.site.contactTitle} — Bowen Mai`,
        description: content.site.contactIntro,
        url: "https://bobmai624.github.io/#contact",
        image: "https://bobmai624.github.io/assets/projects/vita/04-refined-prototype.jpg",
      });
    });
    if (updateHistory && window.location.hash !== "#contact") {
      history.pushState({ contact: true }, "", "#contact");
    }
    focusWhenReady(contactClose, transitionFinished);
  }

  function closeContact({ restoreFocus = true, updateHistory = true } = {}) {
    if (contactView.hidden) return;
    const transitionFinished = transition(() => {
      hideContact();
      restoreHomeMeta();
    });
    if (updateHistory && window.location.hash === "#contact") {
      history.pushState({}, "", "#work");
    }
    if (restoreFocus && lastContactTrigger) {
      focusWhenReady(lastContactTrigger, transitionFinished);
    }
  }

  function routeFromLocation() {
    const projectMatch = window.location.hash.match(/^#project\/(.+)$/);
    if (projectMatch) {
      const project = projectById(decodeURIComponent(projectMatch[1]));
      if (project?.caseHref) {
        window.location.replace(projectHref(project));
        return;
      }
      openProject(project?.id, null, false);
      return;
    }
    if (window.location.hash === "#resume") {
      openResume(null, false);
      return;
    }
    if (window.location.hash === "#contact") {
      openContact(null, false);
      return;
    }
    closeProject({ restoreFocus: false, updateHistory: false });
    closeResume({ restoreFocus: false, updateHistory: false });
    closeContact({ restoreFocus: false, updateHistory: false });
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

  function trapFocus(event, container, additionalElements = []) {
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), iframe, video[controls], [tabindex]:not([tabindex="-1"])',
      ),
    )
      .concat(additionalElements)
      .filter((element) => element && !element.hidden && !element.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!focusable.includes(document.activeElement)) {
      event.preventDefault();
      first.focus();
      return;
    }
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const initialLanguage = window.PORTFOLIO_LANGUAGE_SESSION?.begin(window) || "en";
  setLanguage(initialLanguage);
  routeFromLocation();

  languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });

  document.addEventListener("click", (event) => {
    const projectLink = event.target.closest("[data-project]");
    if (projectLink) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
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

    const contactLink = event.target.closest("[data-contact-open]");
    if (contactLink) {
      event.preventDefault();
      openContact(contactLink);
      return;
    }

    const playGameButton = event.target.closest("[data-play-game]");
    if (playGameButton) {
      event.preventDefault();
      openGame(playGameButton.dataset.playGame, playGameButton);
      return;
    }

    const inlinePlayButton = event.target.closest("[data-play-inline]");
    if (inlinePlayButton) {
      event.preventDefault();
      const stage = inlinePlayButton.closest("[data-inline-game]");
      const frame = stage?.querySelector(".playable-stage-frame");
      if (!stage || !frame) return;
      frame.innerHTML = caseComponents.playableFrame(stage.dataset.inlineGame, currentUi.playGameTitle);
      stage.classList.add("is-active");
      frame.querySelector("iframe")?.focus({ preventScroll: true });
    }
  });

  caseClose.addEventListener("click", () => closeProject());
  gameClose.addEventListener("click", () => closeGame());
  resumeClose.addEventListener("click", () => closeResume());
  contactClose.addEventListener("click", () => closeContact());
  resumePrint.addEventListener("click", () => window.print());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!gameView.hidden) closeGame();
      else if (!caseStudy.hidden) closeProject();
      else if (!resumeView.hidden) closeResume();
      else if (!contactView.hidden) closeContact();
      return;
    }
    if (!gameView.hidden) trapFocus(event, gameView, [languageSelect]);
    else if (!caseStudy.hidden) trapFocus(event, caseStudy, [languageSelect]);
    else if (!resumeView.hidden) trapFocus(event, resumeView, [languageSelect]);
    else if (!contactView.hidden) trapFocus(event, contactView, [languageSelect]);
  });

  window.addEventListener("popstate", routeFromLocation);
})();
