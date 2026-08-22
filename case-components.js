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

  window.CaseComponents = { playableStage, playableFrame };
})();
