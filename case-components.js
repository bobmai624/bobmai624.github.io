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

  window.CaseComponents = { playableStage, playableFrame, tidyTeddyStudy, educationStudy, linghangStudy };
})();
