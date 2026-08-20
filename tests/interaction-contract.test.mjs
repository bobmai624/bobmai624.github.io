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

test("supplementary source files use a deliberately quieter visual tier", () => {
  const app = fs.readFileSync("app.js", "utf8");
  const styles = fs.readFileSync("style.css", "utf8");
  assert.match(app, /source-link--supplementary/);
  assert.match(styles, /\.source-link--supplementary\s*\{/);
});
