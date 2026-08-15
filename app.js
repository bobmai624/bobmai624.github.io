(() => {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const categories = window.PORTFOLIO_CATEGORIES || [];
  const capabilities = window.PORTFOLIO_CAPABILITIES || {
    metrics: [],
    groups: [],
    tools: [],
    qualities: [],
  };
  const categoryMap = Object.fromEntries(categories.map((category) => [category.id, category]));
  const orderedProjects = categories.flatMap((category) =>
    projects.filter((project) => project.category === category.id),
  );

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

  let lastProjectTrigger = null;
  let lastGameTrigger = null;
  let lastResumeTrigger = null;

  const projectIndex = (id) => orderedProjects.findIndex((project) => project.id === id);
  const projectById = (id) => orderedProjects.find((project) => project.id === id);
  const twoDigits = (value) => String(value).padStart(2, "0");

  function practiceMarkup(category, index) {
    const count = projects.filter((project) => project.category === category.id).length;
    return `
      <a class="practice-index-row reveal" href="#group-${category.id}">
        <span class="practice-index-number">${twoDigits(index + 1)}</span>
        <span class="practice-index-name">${category.label}</span>
        <span class="practice-index-description">${category.description}</span>
        <span class="practice-index-count">${twoDigits(count)} projects</span>
        <span class="practice-index-arrow" aria-hidden="true">↓</span>
      </a>`;
  }

  function projectCardMarkup(project) {
    const index = projectIndex(project.id);
    return `
      <a class="project-card reveal" data-project="${project.id}" href="#project/${project.id}">
        <figure class="project-figure">
          <img src="${project.cover.src}" alt="${project.cover.alt}" loading="lazy" decoding="async" />
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
          <p class="work-group-count">${twoDigits(categoryProjects.length)} projects</p>
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
        <ul class="capability-skill-list" aria-label="${group.title} methods">
          ${group.skills.map((skill) => `<li>${skill}</li>`).join("")}
        </ul>
        <p class="capability-proof"><span>Evidence</span>${group.evidence}</p>
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
        <p class="tool-evidence"><span>Evidence</span>${tool.evidence}</p>
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
             Your browser cannot play this video. <a href="${item.src}">Open the video file</a>.
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
          <p class="light-study-counter">Study ${twoDigits(mediaIndex + 1)} / ${twoDigits(total)}</p>
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
            <span>Opening study</span>
            <span>${leadImage.caption}</span>
          </figcaption>
        </figure>

        <section class="light-study-highlights" aria-labelledby="light-highlights-heading">
          <header class="light-study-section-heading">
            <p>Project highlights</p>
            <h2 id="light-highlights-heading">What the experiments reveal</h2>
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
            <p>Comparative finding</p>
            <h2 id="light-comparison-heading">One light source, four material responses</h2>
          </header>
          <div class="light-study-comparison-table" role="table" aria-label="Material response comparison">
            <div class="light-study-comparison-header" role="row">
              <span role="columnheader">Material</span>
              <span role="columnheader">Optical behaviour</span>
              <span role="columnheader">Spatial effect</span>
            </div>
            ${study.comparison
              .map(
                (row) => `
                  <div class="light-study-comparison-row" role="row">
                    <strong role="cell">${row.material}</strong>
                    <span role="cell">${row.behaviour}</span>
                    <span role="cell">${row.effect}</span>
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
          <p>Project evidence</p>
          <h2 id="evidence-heading">Selected process and outcomes</h2>
        </header>
        <div class="case-gallery">${project.media.map(mediaMarkup).join("")}</div>
      </section>`;
  }

  function sourceArchiveMarkup(project) {
    if (!project.playableUrl && project.sources.length === 0) return "";

    return `
      <section class="source-archive" aria-labelledby="source-heading">
        <div>
          <p>Live project</p>
          <h2 id="source-heading">Interactive prototype</h2>
        </div>
        <p class="source-note">
          The case study above explains the design process. Open the live prototype to experience
          the interaction directly.
        </p>
        <div class="source-list">
          ${
            project.playableUrl
              ? `<button class="source-link source-link--play" type="button" data-play-game="${project.playableUrl}">
                  <span>Play Signal Aftershock</span><span aria-hidden="true">↗</span>
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

    caseContent.innerHTML = `
      <article class="case-article${project.lightStudy ? " case-article--light-performance" : ""}">
        <header class="case-hero">
          <div class="case-topline">
            <p>${twoDigits(index + 1)} / ${twoDigits(projects.length)}</p>
            <p>${category.label}</p>
            <p>${project.year}</p>
          </div>
          <h1 id="case-title">${project.title}</h1>
          <p class="case-proposition">${project.meaning}</p>
        </header>

        <section class="case-overview" aria-label="Project overview">
          <p class="case-overview-label">Overview</p>
          <p class="case-summary">${project.summary}</p>
          <dl class="case-meta">
            <div><dt>Role</dt><dd>${project.role}</dd></div>
            <div><dt>Methods</dt><dd>${project.methods.join(" · ")}</dd></div>
          </dl>
        </section>

        ${project.lightStudy ? lightStudyMarkup(project) : defaultCaseStoryMarkup(project)}

        ${sourceArchiveMarkup(project)}

        <a class="case-next" href="#project/${nextProject.id}" data-next-project="${nextProject.id}">
          <p>Next project / ${categoryMap[nextProject.category].label}</p>
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
      window.setTimeout(() => lastGameTrigger.focus({ preventScroll: true }), 0);
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

  renderPortfolio();
  renderCapabilities();
  setupReveal();
  routeFromLocation();

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
