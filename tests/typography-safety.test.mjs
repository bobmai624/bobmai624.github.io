import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const styles = fs.readFileSync("style.css", "utf8");
const muscleKeyStyles = fs.readFileSync("musclekey/assets/css/site.css", "utf8");
const app = fs.readFileSync("app.js", "utf8");

function flatRules(source) {
  return [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match) => ({
    selector: match[1].trim(),
    declarations: match[2],
  }));
}

function rulesFor(fragment) {
  return flatRules(styles).filter(({ selector }) => selector.includes(fragment));
}

test("portfolio headings never opt into breaking an English word", () => {
  const headingRules = flatRules(styles).filter(({ selector }) => /(?:^|[\s,>+~])h[1-3](?:\b|[:.#[])/.test(selector));
  assert.ok(headingRules.length > 0, "no heading rules were inspected");

  for (const { selector, declarations } of headingRules) {
    assert.doesNotMatch(declarations, /overflow-wrap:\s*(?:anywhere|break-word)/, `${selector} allows arbitrary word breaks`);
    assert.doesNotMatch(declarations, /word-break:\s*break-all/, `${selector} allows arbitrary word breaks`);
    assert.doesNotMatch(declarations, /hyphens:\s*auto/, `${selector} enables automatic word splitting`);
  }
});

test("display headings stay within the restrained portfolio scale", () => {
  const headingRules = flatRules(styles).filter(({ selector }) => /(?:^|[\s,>+~])h[1-3](?:\b|[:.#[])/.test(selector));
  for (const { selector, declarations } of headingRules) {
    for (const match of declarations.matchAll(/font-size:\s*clamp\([^,]+,[^,]+,\s*([\d.]+)rem\s*\)/g)) {
      const maximumRem = Number(match[1]);
      assert.ok(maximumRem <= 9, `${selector} reaches ${maximumRem}rem, above the 9rem display limit`);
    }
  }
});

test("the CV identity is compact, single-line and does not reserve a full viewport", () => {
  const heroRules = rulesFor(".resume-hero");
  const titleRules = rulesFor(".resume-hero h1");
  const focusRules = rulesFor(".resume-identity .resume-focus");
  const toplineRules = rulesFor(".resume-topline");

  assert.ok(heroRules.length > 0 && titleRules.length > 0 && focusRules.length > 0);
  for (const { declarations } of heroRules) {
    assert.doesNotMatch(declarations, /min-height:\s*(?:9[0-9]vh|100svh)/);
  }
  assert.ok(titleRules.some(({ declarations }) => /white-space:\s*nowrap/.test(declarations)), "CV name must remain on one line");
  assert.ok(focusRules.some(({ declarations }) => /white-space:\s*nowrap/.test(declarations)), "CV focus line must remain on one line");
  assert.ok(toplineRules.some(({ declarations }) => /white-space:\s*nowrap/.test(declarations)), "CV utility labels must remain on one line");
});

test("the standalone MuscleKey case follows the same restrained title scale", () => {
  const headingRules = flatRules(muscleKeyStyles).filter(({ selector }) => /(?:^|[\s,>+~])h[12](?:\b|[:.#[])/.test(selector));
  assert.ok(headingRules.length > 0, "no MuscleKey display headings were inspected");

  for (const { selector, declarations } of headingRules) {
    for (const match of declarations.matchAll(/font-size:\s*clamp\([^,]+,[^,]+,\s*([\d.]+)rem\s*\)/g)) {
      const maximumRem = Number(match[1]);
      const limit = /h1/.test(selector) ? 7 : 5.5;
      assert.ok(maximumRem <= limit, `${selector} reaches ${maximumRem}rem, above its ${limit}rem limit`);
    }
  }
});

test("mobile Japanese project labels wrap at phrase boundaries", () => {
  assert.match(app, /case-article--\$\{project\.id\}/, "project pages need a stable class for title-specific typography");
  assert.match(styles, /\.case-topline\s*\{[^}]*grid-template-columns:\s*auto\s+minmax\(0,\s*1fr\)/s);
  assert.match(styles, /html\[lang="ja"\]\s+\.case-topline\s+p:nth-child\(2\)\s*\{[^}]*word-break:\s*keep-all/s);
  assert.match(styles, /html\[lang="ja"\]\s+\.case-article--booking-systems\s+\.case-hero h1\s*\{[^}]*word-break:\s*keep-all/s);
});
