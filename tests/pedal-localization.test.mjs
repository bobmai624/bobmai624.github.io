import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadTranslations() {
  const window = {};
  vm.runInNewContext(
    fs.readFileSync("pedalbalance-echo/assets/js/translations.js", "utf8"),
    { window },
  );
  return window.PEDALBALANCE_TRANSLATIONS;
}

test("all PedalBalance pages load the complete static translation catalogue", () => {
  for (const file of [
    "pedalbalance-echo/index.html",
    "pedalbalance-echo/prototype-making.html",
    "pedalbalance-echo/experiment-capabilities.html",
  ]) {
    const html = fs.readFileSync(file, "utf8");
    assert.match(html, /assets\/js\/translations\.js\?v=20260820-complete-localization/);
  }
});

test("Chinese and Japanese translate the previously mixed reader-facing labels", () => {
  const catalogue = loadTranslations();
  for (const source of [
    "PROJECT IN 30 SECONDS",
    "THE WHOLE IDEA",
    "SCREEN PATH · 4 STEPS",
    "PLANNED STUDY",
    "Mean absolute imbalance error",
    "FAULT",
    "BODY OUTPUT",
    "THE CLAIM TO A SUPERVISOR",
    "PAGE 02 · PROTOTYPE & MAKING",
    "08 · 14-DAY BUILD",
  ]) {
    assert.ok(catalogue.staticCopy[source]?.zh, `missing Chinese translation for ${source}`);
    assert.ok(catalogue.staticCopy[source]?.ja, `missing Japanese translation for ${source}`);
  }
});

test("dynamic chart and hero output rerender when language changes", () => {
  const chartSource = fs.readFileSync("pedalbalance-echo/assets/js/experiment-ui.js", "utf8");
  const heroSource = fs.readFileSync("pedalbalance-echo/assets/js/hero-canvas.js", "utf8");
  assert.match(chartSource, /pedalbalance:language/);
  assert.match(heroSource, /pedalbalance:language/);
});
