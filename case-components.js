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

  window.CaseComponents = { playableStage, playableFrame, tidyTeddyStudy };
})();
