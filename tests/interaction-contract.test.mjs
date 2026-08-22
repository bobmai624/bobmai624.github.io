import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("project focus restoration uses a stable project identity", () => {
  const source = fs.readFileSync("app.js", "utf8");
  assert.match(source, /let lastProjectTriggerId = null;/);
  assert.match(source, /lastProjectTriggerId = id;/);
  assert.match(source, /\[data-project="\$\{lastProjectTriggerId\}"\]/);
  assert.doesNotMatch(source, /lastProjectTrigger\s*=\s*trigger/);
});

test("the selected-work heading is an explicit focus fallback", () => {
  const html = fs.readFileSync("index.html", "utf8");
  assert.match(html, /id="work-heading"[^>]*tabindex="-1"/);
});

test("the home page opens with the selected-work index rather than a slogan hero", () => {
  const html = fs.readFileSync("index.html", "utf8");
  assert.match(html, /class="portfolio-index"[^>]*id="work"/);
  assert.doesNotMatch(html, /<section class="hero"/);
  assert.doesNotMatch(html, /data-i18n-html="heroTitle"/);
});

test("selected and supporting work use distinct homepage presentation tiers", () => {
  const app = fs.readFileSync("app.js", "utf8");
  const styles = fs.readFileSync("style.css", "utf8");
  assert.match(app, /featured-projects/);
  assert.match(app, /archive-group/);
  assert.match(styles, /\.featured-projects\s*\{/);
  assert.match(styles, /\.archive-group\s*\{/);
});

test("featured work exposes contribution and evidence before its cover image", () => {
  const app = fs.readFileSync("app.js", "utf8");
  const copyIndex = app.indexOf('<div class="featured-project-copy">');
  const figureIndex = app.indexOf('<figure class="featured-project-figure">');
  assert.ok(copyIndex >= 0, "featured copy is missing");
  assert.ok(figureIndex >= 0, "featured figure is missing");
  assert.ok(copyIndex < figureIndex, "featured evidence must appear before the cover image");
  assert.match(app, /project\.caseFacts\.homeContribution/);
  assert.match(app, /project\.caseFacts\.homeEvidence/);
  assert.match(app, /featured-project-proof/);
});

test("the homepage removes duplicated capability and resume-contact presentations", () => {
  const html = fs.readFileSync("index.html", "utf8");
  assert.doesNotMatch(html, /class="capability-block-heading/);
  assert.doesNotMatch(html, /class="resume-contact-section/);
  assert.match(html, /class="portfolio-index-summary"/);
});

test("supplementary source files use a deliberately quieter visual tier", () => {
  const app = fs.readFileSync("app.js", "utf8");
  const styles = fs.readFileSync("style.css", "utf8");
  assert.match(app, /source-link--supplementary/);
  assert.match(styles, /\.source-link--supplementary\s*\{/);
});
