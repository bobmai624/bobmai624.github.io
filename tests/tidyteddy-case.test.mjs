import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadPortfolio() {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of ["projects.js", "portfolio-model.js", "i18n.js", "student-copy.js", "case-components.js"]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }
  return window;
}

const annotatedFiles = [
  "00-end-to-end-experience-flow.png",
  "01-hero-and-booking.png",
  "02-service-architecture.png",
  "03-social-proof-band.png",
  "04-customer-stories.png",
  "05-before-after-proof.png",
  "06-brand-reassurance.png",
  "07-credibility-and-footer.png",
  "08-campaign-overlay.png",
  "09-mobile-service-discovery.png",
  "10-mobile-trust-flow.png",
  "11-mobile-brand-story.png",
  "12-mobile-contact-close.png",
];

const captureFiles = [
  "desktop-full-page.png",
  "01-desktop-hero-booking.png",
  "02-desktop-service-cards.png",
  "03-desktop-success-metrics.png",
  "04-desktop-testimonials.png",
  "05-desktop-before-after-gallery.png",
  "06-desktop-about.png",
  "07-desktop-partners-footer.png",
  "08-desktop-promo-overlay.png",
  "09-mobile-hero-services.png",
  "10-mobile-metrics-feedback.png",
  "11-mobile-cta-about.png",
  "12-mobile-partners-footer.png",
];

test("TidyTeddy remains an archive project with a high-resolution interface cover", () => {
  const window = loadPortfolio();
  const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === "tidyteddy");
  const partition = window.PortfolioModel.partitionProjects(window.PORTFOLIO_PROJECTS);

  assert.ok(project);
  assert.equal(project.category, "digital-interaction");
  assert.equal(partition.selected.some((item) => item.id === project.id), false);
  assert.equal(partition.archive.some((item) => item.id === project.id), true);
  assert.equal(project.cover.src, "assets/projects/tidyteddy/original/01-desktop-hero-booking.png");
  assert.ok(fs.statSync(project.cover.src).size > 100_000, "cover should use the supplied full-resolution PNG");
});

test("the TidyTeddy study publishes every supplied annotated board and original capture exactly once", () => {
  const window = loadPortfolio();
  const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === "tidyteddy");
  const study = project.tidyTeddyStudy;

  assert.ok(study, "TidyTeddy needs a dedicated case-study structure");
  const boardsInJourney = [study.openingBoard, ...study.chapters.flatMap((chapter) => chapter.boards)];
  assert.equal(boardsInJourney.length, 13);
  assert.equal(new Set(boardsInJourney).size, 13, "annotated boards should not be duplicated in the main journey");
  assert.deepEqual(
    Array.from(study.boards, (board) => board.src.split("/").pop()),
    annotatedFiles,
  );
  assert.deepEqual(
    Array.from(study.captures.items, (capture) => capture.src.split("/").pop()),
    captureFiles,
  );

  for (const item of [...study.boards, ...study.captures.items]) {
    assert.ok(fs.existsSync(item.src), `${item.src} must be published with the portfolio`);
    assert.ok(item.alt?.trim(), `${item.src} needs meaningful alternative text`);
    assert.ok(item.caption?.trim(), `${item.src} needs a caption`);
  }
});

test("the dedicated TidyTeddy renderer exposes the whole journey, review boundary and reference captures", () => {
  const window = loadPortfolio();
  const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === "tidyteddy");
  const html = window.CaseComponents.tidyTeddyStudy(project);

  assert.match(html, /class="tidyteddy-study"/);
  assert.equal((html.match(/class="tidyteddy-board(?:\s|")/g) || []).length, 13);
  assert.equal((html.match(/class="tidyteddy-capture(?:\s|")/g) || []).length, 13);
  assert.equal((html.match(/class="tidyteddy-review-item(?:\s|")/g) || []).length, 4);
  for (const file of [...annotatedFiles, ...captureFiles]) {
    assert.match(html, new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(html, /captured on 5 September 2026/i);
  assert.match(html, /does not claim|not claim/i);
});

test("the supplied desktop interface appears as the visible case cover", () => {
  const window = loadPortfolio();
  const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === "tidyteddy");
  const html = window.CaseComponents.tidyTeddyStudy(project);
  const coverPosition = html.indexOf('class="tidyteddy-cover"');
  const openingPosition = html.indexOf('class="tidyteddy-opening"');

  assert.ok(coverPosition >= 0, "the dedicated case renderer needs a visible cover figure");
  assert.ok(coverPosition < openingPosition, "the cover should introduce the study before the detailed journey");
  assert.match(html.slice(coverPosition, openingPosition), /01-desktop-hero-booking\.png/);
});

test("the TidyTeddy accent keeps AA contrast for small labels", () => {
  const css = fs.readFileSync("style.css", "utf8");
  const match = css.match(/\.case-article--tidyteddy\s*\{[\s\S]*?--tidy-blue:\s*#([0-9a-f]{6})/i);
  assert.ok(match, "the TidyTeddy accent token should be declared");

  const channels = match[1]
    .match(/../g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  const luminance = 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  const contrastOnWhite = 1.05 / (luminance + 0.05);
  assert.ok(contrastOnWhite >= 4.5, `small blue labels need 4.5:1 contrast, received ${contrastOnWhite.toFixed(2)}:1`);
});

test("English, Chinese and Japanese provide a complete TidyTeddy narrative without changing the asset record", () => {
  const window = loadPortfolio();

  for (const language of ["en", "zh", "ja"]) {
    const translated = window.PORTFOLIO_I18N[language].projects.tidyteddy;
    const study = translated.tidyTeddyStudy;
    assert.ok(study, `${language} needs the dedicated study copy`);
    assert.equal(study.strategy.steps.length, 6);
    assert.equal(study.chapters.length, 4);
    assert.equal(study.review.items.length, 4);
    assert.ok(study.captures.title.trim());
    for (const chapter of study.chapters) {
      assert.ok(chapter.title.trim());
      assert.ok(chapter.body.trim());
    }
  }
});
