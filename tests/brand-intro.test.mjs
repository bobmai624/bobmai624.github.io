import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");

function ruleBody(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`))?.[1] || "";
}

function millisecondValue(body, property) {
  const match = body.match(new RegExp(`${property}\\s*:\\s*(\\d+)ms`));
  return match ? Number(match[1]) : 0;
}

test("the opening curtain presents a framed BM mark and Bowen Mai wordmark", () => {
  const intro = html.match(/<div class="page-intro"[\s\S]*?<\/div>\s*<\/div>/)?.[0] || "";
  assert.match(intro, /class="intro-lockup"/);
  assert.match(intro, /class="intro-mark"/);
  assert.equal((intro.match(/class="intro-letter"/g) || []).length, 2);
  assert.match(intro, /class="intro-name"[^>]*>BOWEN MAI</);
});

test("the curtain holds the brand for one second before a gradual fade", () => {
  const introRule = ruleBody(".page-intro");
  const reveal = millisecondValue(introRule, "--intro-reveal");
  const hold = millisecondValue(introRule, "--intro-hold");
  const fade = millisecondValue(introRule, "--intro-fade");
  const duration = reveal + hold + fade;

  assert.ok(hold >= 1000, `visible hold ${hold}ms is shorter than 1000ms`);
  assert.ok(fade >= 500, `fade ${fade}ms is shorter than 500ms`);
  assert.ok(duration >= 1750, `duration ${duration}ms is too short for reveal, hold and fade`);
  assert.match(introRule, /animation-duration\s*:\s*var\(--intro-fade\)/);
  assert.match(introRule, /animation-delay\s*:\s*calc\(var\(--intro-reveal\) \+ var\(--intro-hold\)\)/);
});

test("the curtain finishes hidden and reduced-motion users skip it", () => {
  const keyframes = css.match(/@keyframes intro-curtain\s*\{([\s\S]*?)\n\}/)?.[1] || "";
  const finalFrame = keyframes.match(/100%\s*\{([^}]*)\}/)?.[1] || "";
  assert.match(finalFrame, /opacity\s*:\s*0/);
  assert.match(finalFrame, /visibility\s*:\s*hidden/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.page-intro\s*\{\s*display:\s*none;/);
});
