import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(ROOT, "language-session.js"), "utf8");

function createRuntime(href, savedLanguage = "ja") {
  let currentHref = href;
  const saved = new Map([
    ["portfolio-language", savedLanguage],
    ["pedalbalance-language", savedLanguage],
  ]);
  const runtimeWindow = {
    URL,
    location: {
      get href() {
        return currentHref;
      },
    },
    history: {
      state: { route: "portfolio" },
      replaceState(_state, _title, nextHref) {
        currentHref = new URL(nextHref, currentHref).href;
      },
    },
    localStorage: {
      getItem(key) {
        return saved.get(key) ?? null;
      },
      removeItem(key) {
        saved.delete(key);
      },
    },
  };
  const context = vm.createContext({ URL, window: runtimeWindow });
  vm.runInContext(source, context);
  return {
    policy: runtimeWindow.PORTFOLIO_LANGUAGE_SESSION,
    runtimeWindow,
    saved,
    href: () => currentHref,
  };
}

test("a fresh page ignores the last saved choice and starts in English", () => {
  const runtime = createRuntime("https://portfolio.test/#work", "ja");

  assert.equal(runtime.policy.begin(runtime.runtimeWindow), "en");
  assert.equal(runtime.saved.has("portfolio-language"), false);
  assert.equal(runtime.saved.has("pedalbalance-language"), false);
});

test("an incoming language is available for this navigation, then refresh returns to English", () => {
  const runtime = createRuntime(
    "https://portfolio.test/pedalbalance-echo/index.html?campaign=folio&lang=ja#journey",
  );

  assert.equal(runtime.policy.begin(runtime.runtimeWindow), "ja");
  assert.equal(
    runtime.href(),
    "https://portfolio.test/pedalbalance-echo/index.html?campaign=folio#journey",
  );
  assert.equal(runtime.policy.begin(runtime.runtimeWindow), "en");
});

test("unsupported incoming languages fall back to English", () => {
  const runtime = createRuntime("https://portfolio.test/?lang=fr#work", "zh");

  assert.equal(runtime.policy.begin(runtime.runtimeWindow), "en");
  assert.equal(runtime.href(), "https://portfolio.test/#work");
});
