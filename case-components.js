(() => {
  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function playableStage(project, ui) {
    if (!project?.playableUrl) return "";
    const headingId = `playable-${escapeHtml(project.id)}-heading`;
    return `
      <section class="playable-stage" data-inline-game="${escapeHtml(project.playableUrl)}" aria-labelledby="${headingId}">
        <header class="playable-stage-header">
          <div>
            <p>${escapeHtml(ui.interactivePrototype)}</p>
            <h2 id="${headingId}">${escapeHtml(ui.playSignal)}</h2>
          </div>
          <a href="${escapeHtml(project.playableUrl)}" target="_blank" rel="noreferrer">
            <span>${escapeHtml(ui.openSeparately)}</span><span aria-hidden="true">↗</span>
          </a>
        </header>
        <div class="playable-stage-frame">
          <img src="${escapeHtml(project.cover.src)}" alt="${escapeHtml(project.cover.alt)}" loading="lazy" decoding="async" />
          <button class="playable-stage-play" type="button" data-play-inline>
            <span>${escapeHtml(ui.interactivePrototype)}</span>
            <strong>${escapeHtml(ui.playInPage)}</strong>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
        <p class="playable-stage-caption">${escapeHtml(ui.playableCaption)}</p>
      </section>`;
  }

  function playableFrame(url, title) {
    return `<iframe src="${escapeHtml(url)}" title="${escapeHtml(title)}" allow="fullscreen" loading="eager"></iframe>`;
  }

  function tidyTeddyBoard(board, position, extraClass = "") {
    if (!board) return "";
    return `
      <figure class="tidyteddy-board${extraClass ? ` ${escapeHtml(extraClass)}` : ""}">
        <a class="tidyteddy-board-frame" href="${escapeHtml(board.src)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(board.alt)}">
          <img src="${escapeHtml(board.src)}" alt="${escapeHtml(board.alt)}" loading="lazy" decoding="async" />
        </a>
        <figcaption><span>${String(position).padStart(2, "0")}</span><p>${escapeHtml(board.caption)}</p></figcaption>
      </figure>`;
  }

  function tidyTeddyCapture(capture, position) {
    const modifier = capture.kind ? ` tidyteddy-capture--${escapeHtml(capture.kind)}` : "";
    return `
      <figure class="tidyteddy-capture${modifier}">
        <a href="${escapeHtml(capture.src)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(capture.alt)}">
          <img src="${escapeHtml(capture.src)}" alt="${escapeHtml(capture.alt)}" loading="lazy" decoding="async" />
        </a>
        <figcaption><span>${String(position).padStart(2, "0")}</span><p>${escapeHtml(capture.caption)}</p></figcaption>
      </figure>`;
  }

  function tidyTeddyStudy(project) {
    const study = project?.tidyTeddyStudy;
    if (!study) return "";
    const boards = new Map(study.boards.map((board) => [board.id, board]));
    const openingBoard = boards.get(study.openingBoard);
    const coverCapture = study.captures.items.find((capture) => capture.src === project.cover?.src);
    let boardPosition = 1;

    return `
      <div class="tidyteddy-study">
        <figure class="tidyteddy-cover">
          <a href="${escapeHtml(project.cover.src)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(coverCapture?.alt || project.cover.alt)}">
            <img src="${escapeHtml(project.cover.src)}" alt="${escapeHtml(coverCapture?.alt || project.cover.alt)}" decoding="async" fetchpriority="high" />
          </a>
          <figcaption><span>00</span><p>${escapeHtml(coverCapture?.caption || project.cover.alt)}</p></figcaption>
        </figure>

        <section class="tidyteddy-opening" aria-labelledby="tidyteddy-opening-heading">
          <div class="tidyteddy-opening-copy">
            <p>${escapeHtml(study.opening.label)}</p>
            <h2 id="tidyteddy-opening-heading">${escapeHtml(study.opening.title)}</h2>
            <p>${escapeHtml(study.opening.body)}</p>
            <p class="tidyteddy-evidence-note">${escapeHtml(study.opening.note)}</p>
          </div>
          ${tidyTeddyBoard(openingBoard, boardPosition++, "tidyteddy-board--opening")}
        </section>

        <section class="tidyteddy-strategy" aria-labelledby="tidyteddy-strategy-heading">
          <header class="tidyteddy-section-heading">
            <p>${escapeHtml(study.strategy.label)}</p>
            <div>
              <h2 id="tidyteddy-strategy-heading">${escapeHtml(study.strategy.title)}</h2>
              <p>${escapeHtml(study.strategy.body)}</p>
            </div>
          </header>
          <ol class="tidyteddy-strategy-list">
            ${study.strategy.steps
              .map(
                (step, index) => `
                  <li>
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <h3>${escapeHtml(step.title)}</h3>
                    <p>${escapeHtml(step.body)}</p>
                  </li>`,
              )
              .join("")}
          </ol>
        </section>

        ${study.chapters
          .map(
            (chapter) => `
              <section class="tidyteddy-chapter" aria-labelledby="tidyteddy-chapter-${escapeHtml(chapter.number)}">
                <header class="tidyteddy-chapter-heading">
                  <p>${escapeHtml(chapter.number)} / ${escapeHtml(chapter.eyebrow)}</p>
                  <h2 id="tidyteddy-chapter-${escapeHtml(chapter.number)}">${escapeHtml(chapter.title)}</h2>
                  <p>${escapeHtml(chapter.body)}</p>
                </header>
                <div class="tidyteddy-board-list">
                  ${chapter.boards.map((id) => tidyTeddyBoard(boards.get(id), boardPosition++)).join("")}
                </div>
              </section>`,
          )
          .join("")}

        <aside class="tidyteddy-review" aria-labelledby="tidyteddy-review-heading">
          <header class="tidyteddy-section-heading tidyteddy-section-heading--dark">
            <p>${escapeHtml(study.review.label)}</p>
            <div>
              <h2 id="tidyteddy-review-heading">${escapeHtml(study.review.title)}</h2>
              <p>${escapeHtml(study.review.body)}</p>
            </div>
          </header>
          <div class="tidyteddy-review-list">
            ${study.review.items
              .map(
                (item, index) => `
                  <article class="tidyteddy-review-item">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.body)}</p>
                  </article>`,
              )
              .join("")}
          </div>
          <p class="tidyteddy-accuracy">${escapeHtml(study.review.accuracy)}</p>
        </aside>

        <section class="tidyteddy-captures" aria-labelledby="tidyteddy-captures-heading">
          <header class="tidyteddy-section-heading">
            <p>${escapeHtml(study.captures.label)}</p>
            <div>
              <h2 id="tidyteddy-captures-heading">${escapeHtml(study.captures.title)}</h2>
              <p>${escapeHtml(study.captures.body)}</p>
            </div>
          </header>
          <div class="tidyteddy-capture-list">
            ${study.captures.items.map((capture, index) => tidyTeddyCapture(capture, index + 1)).join("")}
          </div>
        </section>
      </div>`;
  }

  function educationStudy(project) {
    const study = project?.educationStudy;
    if (!study) return "";
    const pdf = project.sources?.find((source) => source.href.endsWith(".pdf"));

    return `
      <div class="education-study">
        <section class="education-opening" aria-labelledby="education-opening-heading">
          <div>
            <p>${escapeHtml(study.opening.label)}</p>
            <h2 id="education-opening-heading">${escapeHtml(study.opening.title)}</h2>
            <p>${escapeHtml(study.opening.body)}</p>
          </div>
          <p class="education-boundary-note">${escapeHtml(study.opening.note)}</p>
        </section>

        <section class="education-instruments" aria-label="${escapeHtml(study.opening.label)}">
          <article class="education-instrument-card education-instrument-card--live">
            <p>${escapeHtml(study.liveForm.label)}</p>
            <strong>06</strong>
            <h2>${escapeHtml(study.liveForm.title)}</h2>
            <p>${escapeHtml(study.liveForm.summary)}</p>
            <a href="${escapeHtml(study.liveForm.url)}" target="_blank" rel="noreferrer">
              <span>${escapeHtml(study.liveForm.openLabel)}</span><span aria-hidden="true">↗</span>
            </a>
          </article>
          <article class="education-instrument-card education-instrument-card--long">
            <p>${escapeHtml(study.longForm.label)}</p>
            <strong>${String(study.longForm.scaleItems + study.longForm.openItems).padStart(2, "0")}</strong>
            <h2>${escapeHtml(study.longForm.title)}</h2>
            <p>${escapeHtml(study.longForm.summary)}</p>
            ${pdf ? `<a href="${escapeHtml(pdf.href)}" target="_blank" rel="noreferrer"><span>${escapeHtml(study.longForm.pdfLabel)}</span><span aria-hidden="true">↗</span></a>` : ""}
          </article>
        </section>

        <section class="education-live" aria-labelledby="education-live-heading">
          <header class="education-section-heading">
            <p>${escapeHtml(study.liveForm.label)}</p>
            <h2 id="education-live-heading">${escapeHtml(study.liveForm.title)}</h2>
          </header>
          <ol class="education-live-list">
            ${study.liveForm.questions
              .map(
                (question) => `
                  <li class="education-live-question">
                    <span>${escapeHtml(question.id)}</span>
                    <p>${escapeHtml(question.kind)}</p>
                    <h3>${escapeHtml(question.title)}</h3>
                    <p>${escapeHtml(question.detail)}</p>
                  </li>`,
              )
              .join("")}
          </ol>
        </section>

        <section class="education-dimensions" aria-labelledby="education-dimensions-heading">
          <header class="education-section-heading">
            <p>${escapeHtml(study.longForm.label)}</p>
            <div>
              <h2 id="education-dimensions-heading">${escapeHtml(study.longForm.title)}</h2>
              <p>${escapeHtml(study.longForm.summary)}</p>
            </div>
          </header>
          <div class="education-dimension-grid">
            ${study.longForm.dimensions
              .map(
                (dimension, index) => `
                  <article class="education-dimension">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <h3>${escapeHtml(dimension.title)}</h3>
                    <ul>${dimension.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                  </article>`,
              )
              .join("")}
          </div>
        </section>

        <section class="education-feedback" aria-labelledby="education-feedback-heading">
          <header class="education-section-heading">
            <p>${escapeHtml(study.feedbackBrief.label)}</p>
            <div>
              <h2 id="education-feedback-heading">${escapeHtml(study.feedbackBrief.title)}</h2>
              <p>${escapeHtml(study.feedbackBrief.body)}</p>
              <span>${escapeHtml(study.feedbackBrief.source)}</span>
            </div>
          </header>
          <div class="education-feedback-grid">
            ${study.feedbackBrief.themes
              .map(
                (theme, index) => `
                  <article class="education-feedback-theme">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <h3>${escapeHtml(theme.title)}</h3>
                    <p>${escapeHtml(theme.body)}</p>
                  </article>`,
              )
              .join("")}
          </div>
          <div class="education-responses">
            <header>
              <p>${escapeHtml(study.feedbackBrief.responsesLabel)}</p>
              <h3>${escapeHtml(study.feedbackBrief.responsesTitle)}</h3>
            </header>
            <div>
              ${study.feedbackBrief.responses
                .map(
                  (response, index) => `
                    <article class="education-response-card">
                      <span>${String(index + 1).padStart(2, "0")}</span>
                      <h4>${escapeHtml(response.title)}</h4>
                      <p>${escapeHtml(response.body)}</p>
                    </article>`,
                )
                .join("")}
            </div>
          </div>
          <p class="education-evidence-note">${escapeHtml(study.feedbackBrief.note)}</p>
        </section>

        <section class="education-context" aria-labelledby="education-context-heading">
          <header class="education-section-heading">
            <p>${escapeHtml(study.institutionalContext.label)}</p>
            <div>
              <h2 id="education-context-heading">${escapeHtml(study.institutionalContext.title)}</h2>
              <p>${escapeHtml(study.institutionalContext.body)}</p>
            </div>
          </header>
          <div class="education-context-grid">
            ${study.institutionalContext.items
              .map(
                (item, index) => `
                  <a class="education-context-card" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <p>${escapeHtml(item.source)}</p>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.body)}</p>
                    <span aria-hidden="true">↗</span>
                  </a>`,
              )
              .join("")}
          </div>
          <p class="education-context-note">${escapeHtml(study.institutionalContext.note)}</p>
        </section>

        <section class="education-analysis" aria-labelledby="education-analysis-heading">
          <header class="education-section-heading education-section-heading--dark">
            <p>${escapeHtml(study.analysis.label)}</p>
            <div>
              <h2 id="education-analysis-heading">${escapeHtml(study.analysis.title)}</h2>
              <p>${escapeHtml(study.analysis.body)}</p>
            </div>
          </header>
          <ol>
            ${study.analysis.steps
              .map(
                (step, index) => `
                  <li class="education-analysis-step">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <h3>${escapeHtml(step.title)}</h3>
                    <p>${escapeHtml(step.body)}</p>
                  </li>`,
              )
              .join("")}
          </ol>
        </section>

        <section class="education-form" aria-labelledby="education-form-heading">
          <header class="education-section-heading">
            <p>${escapeHtml(study.liveForm.label)}</p>
            <div>
              <h2 id="education-form-heading">${escapeHtml(study.liveForm.openLabel)}</h2>
              <a href="${escapeHtml(study.liveForm.url)}" target="_blank" rel="noreferrer">${escapeHtml(study.liveForm.openLabel)} ↗</a>
            </div>
          </header>
          <div class="education-form-frame">
            <iframe src="${escapeHtml(study.liveForm.embedUrl)}" title="${escapeHtml(study.liveForm.title)}" loading="lazy"> </iframe>
          </div>
        </section>

        <aside class="education-boundary" aria-labelledby="education-boundary-heading">
          <p>${escapeHtml(study.boundary.label)}</p>
          <h2 id="education-boundary-heading">${escapeHtml(study.boundary.title)}</h2>
          <p>${escapeHtml(study.boundary.body)}</p>
        </aside>
      </div>`;
  }

  function linghangStudy(project) {
    const study = project?.linghangStudy;
    if (!study) return "";

    return `
      <div class="linghang-study">
        <section class="linghang-opening" aria-labelledby="linghang-opening-heading">
          <p>${escapeHtml(study.opening.label)}</p>
          <div>
            <h2 id="linghang-opening-heading">${escapeHtml(study.opening.title)}</h2>
            <p>${escapeHtml(study.opening.body)}</p>
            <p class="linghang-opening-note">${escapeHtml(study.opening.note)}</p>
          </div>
        </section>

        <section class="linghang-role-map" aria-label="${escapeHtml(study.labels.roleMap)}">
          ${study.roleMap
            .map(
              (role, index) => `
                <article class="linghang-role-card">
                  <span>${String(index + 1).padStart(2, "0")}</span>
                  <p>${escapeHtml(role.label)}</p>
                  <h2>${escapeHtml(role.title)}</h2>
                  <p>${escapeHtml(role.body)}</p>
                </article>`,
            )
            .join("")}
        </section>

        <section class="linghang-workflow" aria-labelledby="linghang-workflow-heading">
          <header class="linghang-section-heading">
            <p>${escapeHtml(study.labels.workflow)}</p>
            <div>
              <h2 id="linghang-workflow-heading">${escapeHtml(study.labels.workflowTitle)}</h2>
              <p>${escapeHtml(study.opening.body)}</p>
            </div>
          </header>
          <ol class="linghang-workflow-list">
            ${study.workflow
              .map(
                (step) => `
                  <li class="linghang-workflow-step">
                    <div class="linghang-workflow-index"><span>${escapeHtml(step.id)}</span><p>${escapeHtml(step.owner)}</p></div>
                    <div class="linghang-workflow-main"><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.action)}</p></div>
                    <dl>
                      <div><dt>${escapeHtml(study.labels.input)}</dt><dd>${escapeHtml(step.input)}</dd></div>
                      <div><dt>${escapeHtml(study.labels.output)}</dt><dd>${escapeHtml(step.output)}</dd></div>
                      ${step.gate ? `<div class="linghang-workflow-gate"><dt>${escapeHtml(study.labels.gate)}</dt><dd>${escapeHtml(step.gate)}</dd></div>` : ""}
                    </dl>
                  </li>`,
              )
              .join("")}
          </ol>
        </section>

        <section class="linghang-scale" aria-labelledby="linghang-scale-heading">
          <header class="linghang-section-heading">
            <p>${escapeHtml(study.labels.scale)}</p>
            <h2 id="linghang-scale-heading">${escapeHtml(study.labels.scaleTitle)}</h2>
          </header>
          <div class="linghang-metric-grid">
            ${study.metrics
              .map(
                (metric) => `
                  <article class="linghang-metric">
                    <strong>${escapeHtml(metric.value)}</strong>
                    <h3>${escapeHtml(metric.label)}</h3>
                    <p>${escapeHtml(metric.basis)}</p>
                    <small>${escapeHtml(metric.caution)}</small>
                  </article>`,
              )
              .join("")}
          </div>
        </section>

        <section class="linghang-workstreams" aria-labelledby="linghang-workstreams-heading">
          <header class="linghang-section-heading">
            <p>${escapeHtml(study.labels.workProduced)}</p>
            <h2 id="linghang-workstreams-heading">${escapeHtml(study.labels.workProducedTitle)}</h2>
          </header>
          <div class="linghang-workstream-list">
            ${study.workstreams
              .map(
                (item) => `
                  <article class="linghang-workstream">
                    <span>${escapeHtml(item.number)}</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.body)}</p>
                  </article>`,
              )
              .join("")}
          </div>
        </section>

        <section class="linghang-retrospective" aria-labelledby="linghang-retrospective-heading">
          <header>
            <p>${escapeHtml(study.retrospective.label)}</p>
            <h2 id="linghang-retrospective-heading">${escapeHtml(study.retrospective.title)}</h2>
            <p>${escapeHtml(study.retrospective.body)}</p>
          </header>
          <div class="linghang-assumption-grid">
            ${study.retrospective.assumptions
              .map(
                (item, index) => `
                  <article class="linghang-assumption">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.body)}</p>
                  </article>`,
              )
              .join("")}
          </div>
          <p class="linghang-decision">${escapeHtml(study.retrospective.decision)}</p>
        </section>

        <aside class="linghang-boundaries" aria-labelledby="linghang-boundaries-heading">
          <header>
            <p>${escapeHtml(study.boundaries.label)}</p>
            <h2 id="linghang-boundaries-heading">${escapeHtml(study.boundaries.title)}</h2>
          </header>
          <div>
            ${study.boundaries.items
              .map((item) => `<article><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></article>`)
              .join("")}
          </div>
        </aside>
      </div>`;
  }

  function coveStudy(project) {
    const study = project?.coveStudy;
    if (!study) return "";
    const videos = (project.media || []).filter((item) => item.type === "video");
    const prototypeEmbedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(study.prototype.url)}`;

    return `
      <div class="cove-study">
        <section class="cove-opening" aria-labelledby="cove-opening-heading">
          <div>
            <p>${escapeHtml(study.opening.label)}</p>
            <h2 id="cove-opening-heading">${escapeHtml(study.opening.title)}</h2>
            <p>${escapeHtml(study.opening.body)}</p>
          </div>
          <p class="cove-boundary-note">${escapeHtml(study.opening.note)}</p>
        </section>

        <figure class="cove-rich-picture">
          <a href="${escapeHtml(study.richPicture.src)}" target="_blank" rel="noreferrer">
            <img src="${escapeHtml(study.richPicture.src)}" alt="${escapeHtml(study.richPicture.alt)}" loading="lazy" decoding="async" />
          </a>
          <figcaption>${escapeHtml(study.richPicture.caption)}</figcaption>
        </figure>

        <section class="cove-contribution" aria-labelledby="cove-contribution-heading">
          <header>
            <p>${escapeHtml(study.contribution.label)}</p>
            <div>
              <h2 id="cove-contribution-heading">${escapeHtml(study.contribution.title)}</h2>
              <p>${escapeHtml(study.contribution.body)}</p>
            </div>
          </header>
          <ol>
            ${study.contribution.items
              .map(
                (item, index) => `
                  <li>
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.body)}</p>
                  </li>`,
              )
              .join("")}
          </ol>
        </section>

        <section class="cove-features" aria-labelledby="cove-features-heading">
          <header>
            <p>${escapeHtml(study.labels.productFlow)}</p>
            <h2 id="cove-features-heading">${escapeHtml(study.prototype.body)}</h2>
          </header>
          <div class="cove-feature-grid">
            ${study.features
              .map(
                (feature, index) => `
                  <article class="cove-feature">
                    <figure><img src="${escapeHtml(feature.src)}" alt="${escapeHtml(feature.alt)}" loading="lazy" decoding="async" /></figure>
                    <div><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(feature.title)}</h3><p>${escapeHtml(feature.body)}</p></div>
                  </article>`,
              )
              .join("")}
          </div>
        </section>

        <section class="cove-prototype" aria-labelledby="cove-prototype-heading">
          <header>
            <p>${escapeHtml(study.prototype.label)}</p>
            <div>
              <h2 id="cove-prototype-heading">${escapeHtml(study.prototype.title)}</h2>
              <p>${escapeHtml(study.prototype.body)}</p>
              <a href="${escapeHtml(study.prototype.url)}" target="_blank" rel="noreferrer">${escapeHtml(study.prototype.openLabel)} <span aria-hidden="true">↗</span></a>
            </div>
          </header>
          <div class="cove-prototype-toolbar">
            <p><span aria-hidden="true"></span>${escapeHtml(study.prototype.interactLabel)}</p>
            <button type="button" data-cove-prototype-focus aria-expanded="false" aria-controls="cove-prototype-stage">
              ${escapeHtml(study.prototype.focusLabel)} <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div class="cove-prototype-frame" id="cove-prototype-stage" data-cove-prototype-stage>
            <button class="cove-prototype-exit" type="button" data-cove-prototype-exit aria-label="${escapeHtml(study.prototype.exitLabel)}">
              <span>${escapeHtml(study.prototype.exitLabel)}</span><span aria-hidden="true">×</span>
            </button>
            <iframe data-cove-prototype-iframe src="${escapeHtml(prototypeEmbedUrl)}" title="${escapeHtml(study.prototype.frameTitle)}" loading="lazy" tabindex="0" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>
          </div>
        </section>

        <section class="cove-journey" aria-labelledby="cove-journey-heading">
          <header>
            <p>${escapeHtml(study.journey.label)}</p>
            <div>
              <h2 id="cove-journey-heading">${escapeHtml(study.journey.title)}</h2>
              <p>${escapeHtml(study.journey.body)}</p>
              <span>${escapeHtml(study.journey.status)}</span>
            </div>
          </header>
          <div class="cove-journey-strip">
            ${study.journey.frames
              .map(
                (frame) => `
                  <figure>
                    <img src="${escapeHtml(frame.src)}" alt="${escapeHtml(frame.alt)}" loading="lazy" decoding="async" />
                    <figcaption>${escapeHtml(frame.caption)}</figcaption>
                  </figure>`,
              )
              .join("")}
          </div>
        </section>

        <section class="cove-evaluation" aria-labelledby="cove-evaluation-heading">
          <header>
            <p>${escapeHtml(study.evaluation.label)}</p>
            <div><h2 id="cove-evaluation-heading">${escapeHtml(study.evaluation.title)}</h2><p>${escapeHtml(study.evaluation.body)}</p></div>
          </header>
          <div class="cove-metrics" aria-label="${escapeHtml(study.evaluation.label)}">
            <article><strong>${escapeHtml(study.evaluation.totalParticipants)}</strong><span>${escapeHtml(study.labels.participants)}</span></article>
            <article><strong>${escapeHtml(study.evaluation.universityStudents)}</strong><span>${escapeHtml(study.labels.universityStudents)}</span></article>
            <article><strong>${escapeHtml(study.evaluation.highSchoolStudents)}</strong><span>${escapeHtml(study.labels.highSchoolStudents)}</span></article>
            <article><strong>${escapeHtml(study.evaluation.sus)}</strong><span>${escapeHtml(study.labels.sus)}</span></article>
          </div>
          <div class="cove-evaluation-body">
            <ol>${study.evaluation.tasks.map((task, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(task)}</p></li>`).join("")}</ol>
            <aside><h3>${escapeHtml(study.labels.evidenceBoundaries)}</h3><ul>${study.evaluation.limitations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></aside>
          </div>
        </section>

        <section class="cove-findings" aria-labelledby="cove-findings-heading">
          <header>
            <p>${escapeHtml(study.findings.label)}</p>
            <div><h2 id="cove-findings-heading">${escapeHtml(study.findings.title)}</h2><p>${escapeHtml(study.findings.body)}</p></div>
          </header>
          <div>${study.findings.items.map((item, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></article>`).join("")}</div>
        </section>

        <section class="cove-videos" aria-label="${escapeHtml(study.labels.projectVideos)}">
          ${videos
            .map(
              (video, index) => `
                <figure>
                  <video controls preload="metadata" poster="${escapeHtml(video.poster || "")}"><source src="${escapeHtml(video.src)}" type="video/mp4" /></video>
                  <figcaption><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(video.caption)}</p></figcaption>
                </figure>`,
            )
            .join("")}
        </section>

        <figure class="cove-poster">
          <a href="${escapeHtml(study.poster.src)}" target="_blank" rel="noreferrer"><img src="${escapeHtml(study.poster.src)}" alt="${escapeHtml(study.poster.alt)}" loading="lazy" decoding="async" /></a>
          <figcaption>${escapeHtml(study.poster.caption)}</figcaption>
        </figure>
      </div>`;
  }

  function futuresForecasts(project) {
    const forecast = project.futuresStudy.forecasts;
    const text = escapeHtml;
    const cards = forecast.items.map((item, index) => {
      const page = index + 3;
      const pageLabel = forecast.pageLabel.replace("{n}", page);
      return `<article class="forecast-card">
        <img src="assets/projects/ai-futures/${text(item.key)}.webp" alt="${text(item.alt)}" width="650" height="650" decoding="async">
        <h3>${text(item.title)}</h3>
        <dl>
          <div><dt>${text(forecast.aiLabel)}</dt><dd>${text(item.ai)}</dd></div>
          <div><dt>${text(forecast.humanLabel)}</dt><dd>${text(item.human)}</dd></div>
        </dl>
        <a href="${text(project.sources[1].href)}#page=${page}" target="_blank" rel="noreferrer">${text(pageLabel)} · PDF <span aria-hidden="true">↗</span></a>
      </article>`;
    });
    return `<section class="forecast-panel" aria-labelledby="forecast-heading">
      <header><div><p class="futures-kicker">${text(forecast.label)}</p><h2 id="forecast-heading">${text(forecast.title)}</h2></div>
        <p>${text(forecast.body)}</p></header>
      <div class="forecast-grid">${cards.join("")}</div>
    </section>`;
  }

  function futuresStudy(project) {
    const { platform, participation, cone, zone, concepts, statements, studyPlan, reflection } = project.futuresStudy;
    const text = escapeHtml;
    const imagePath = "assets/projects/ai-futures/";
    function source(section, index, page) {
      return `<a class="futures-source" href="${text(project.sources[index].href)}#page=${text(page)}" target="_blank" rel="noreferrer">${text(section.cite)} · PDF <span aria-hidden="true">↗</span></a>`;
    }
    function citedPage({ sourceIndex, page, label }) {
      return source({ cite: label }, sourceIndex, page);
    }
    function heading(section) {
      return `<p class="futures-kicker">${text(section.label)}</p><h2>${text(section.title)}</h2><p class="futures-body">${text(section.body)}</p>`;
    }
    function picture(section, file, width, height) {
      return `<figure class="futures-figure"><a href="${imagePath}${file}" target="_blank" rel="noreferrer"><img src="${imagePath}${file}" alt="${text(section.caption)}" width="${width}" height="${height}" loading="lazy" decoding="async"></a><figcaption>${text(section.caption)}</figcaption></figure>`;
    }
    function comparisons(items) {
      return `<dl class="futures-comparisons">${items.map(([title, description]) =>
        `<div><dt>${text(title)}</dt><dd>${text(description)}</dd></div>`).join("")}</dl>`;
    }
    const statementExamples = statements.examples.map((example) => `
      <article class="futures-statement-example">
        <header><h3>${text(example.title)}</h3><p>${text(example.situation)}</p></header>
        <div>
          <dl class="futures-statement-pair">
            <div><dt>${text(statements.shortLabel)}</dt><dd>${text(example.brief)}</dd></div>
            <div><dt>${text(statements.detailLabel)}</dt><dd>${text(example.detailed)}</dd></div>
          </dl>
          <p class="futures-statement-note">${text(example.note)}</p>
          <div class="futures-references">${citedPage(example.cite)}${citedPage(example.contextCite)}</div>
        </div>
      </article>`).join("");
    return `<div class="futures-study">
      <section class="futures-split"><div>${heading(platform)}${source(platform, 0, 5)}</div>${picture(platform, "platform-trajectories.webp", 1851, 1206)}</section>
      <section class="futures-participation"><header>${heading(participation)}</header>
        ${comparisons(participation.items)}
        <div class="futures-references">${participation.citations.map(citedPage).join("")}</div>
      </section>
      <section class="futures-cone"><header>${heading(cone)}${source(cone, 1, 20)}</header>${comparisons(cone.items)}</section>
      <section class="futures-zone futures-split"><div>${heading(zone)}${source(zone, 1, 7)}</div>
        <figure class="futures-figure"><img src="${text(project.cover.src)}" alt="${text(project.cover.alt)}" width="1480" height="780" loading="lazy">
        <figcaption>${text(project.coverCaption)}</figcaption></figure></section>
      <section class="futures-concepts"><header>${heading(concepts)}${source(concepts, 2, 14)}</header>${picture(concepts, "carriage-storyboard.webp", 1720, 831)}${comparisons(concepts.items)}</section>
      <section class="futures-statements" id="futures-statements" tabindex="-1" aria-label="${text(statements.title)}"><header>${heading(statements)}</header>${statementExamples}</section>
      <section class="futures-study-plan futures-split"><header>${heading(studyPlan)}</header>${comparisons(studyPlan.items)}</section>
      <section class="futures-reflection">${heading(reflection)}<p class="futures-edition-note">${text(reflection.editionNote)}</p></section>
    </div>`;
  }

  window.CaseComponents = { playableStage, playableFrame, tidyTeddyStudy, educationStudy, linghangStudy, coveStudy, futuresForecasts, futuresStudy };
})();
