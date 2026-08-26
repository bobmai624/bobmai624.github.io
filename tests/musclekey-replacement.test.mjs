import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

function loadPortfolio() {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of ["projects.js", "i18n.js", "student-copy.js"]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }
  return window;
}

test("MuscleKey replaces PedalBalance as one complete portfolio project", () => {
  const window = loadPortfolio();
  const muscleKey = window.PORTFOLIO_PROJECTS.find(({ id }) => id === "musclekey");

  assert.equal(window.PORTFOLIO_PROJECTS.length, 14);
  assert.ok(muscleKey, "MuscleKey is missing from the project catalogue");
  assert.equal(muscleKey.caseHref, "musclekey/index.html");
  assert.equal(muscleKey.category, "embodied-systems");
  assert.equal(window.PORTFOLIO_PROJECTS.some(({ id }) => id === "pedalbalance-echo"), false);

  for (const language of ["en", "zh", "ja"]) {
    const copy = window.PORTFOLIO_STUDENT_COPY[language].projects.musclekey;
    assert.ok(copy.summary?.trim(), `${language} MuscleKey summary is missing`);
    assert.ok(copy.meaning?.trim(), `${language} MuscleKey reflection is missing`);
    assert.ok(copy.role?.trim(), `${language} MuscleKey role is missing`);
  }
});

test("the published MuscleKey site retains every supplied experiment asset", () => {
  const requiredFiles = [
    "README.md",
    "SOURCES.md",
    "index.html",
    "assets/css/site.css",
    "assets/js/core.js",
    "assets/js/app.js",
    "tests/core.test.cjs",
    "tests/page.test.cjs",
    ...[
      "analog-read-setup.jpg",
      "arduino-shield.jpg",
      "disconnect-laptop-power.jpg",
      "disconnect-shields.jpg",
      "electrode-snaps.jpg",
      "forearm-placement.jpg",
      "kit.jpg",
      "led-shield-status.jpg",
      "redboard.jpg",
      "sensor.jpg",
      "serial-plotter-envelope.png",
      "skin-cleaning.jpg",
      "stack-alignment.jpg",
      "usb-isolator.jpg",
    ].map((name) => path.join("assets/images", name)),
  ];

  for (const relativePath of requiredFiles) {
    assert.ok(fs.existsSync(path.join("musclekey", relativePath)), `musclekey/${relativePath} is missing`);
  }
});

test("the MuscleKey experiment offers complete page-level English Chinese and Japanese switching", () => {
  const html = fs.readFileSync("musclekey/index.html", "utf8");
  const translations = fs.readFileSync("musclekey/assets/js/translations.js", "utf8");
  const localizer = fs.readFileSync("musclekey/assets/js/i18n.js", "utf8");

  assert.match(html, /data-language="en"/);
  assert.match(html, /data-language="zh"/);
  assert.match(html, /data-language="ja"/);
  assert.match(html, /assets\/js\/translations\.js/);
  assert.match(html, /assets\/js\/i18n\.js/);
  assert.match(translations, /MuscleKey/);
  assert.match(translations, /肌电/);
  assert.match(translations, /筋電/);
  assert.match(localizer, /PORTFOLIO_LANGUAGE_SESSION/);
});

test("the current publication no longer ships the superseded PedalBalance project", () => {
  assert.equal(fs.existsSync("pedalbalance-echo"), false);
  assert.equal(fs.existsSync("projects/pedalbalance-echo.html"), false);
  assert.equal(fs.existsSync("assets/projects/pedalbalance"), false);
  assert.equal(fs.existsSync("files/pedalbalance-echo-html-portfolio.zip"), false);
});
