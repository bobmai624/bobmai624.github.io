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
