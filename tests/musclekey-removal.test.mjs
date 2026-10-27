import assert from "node:assert/strict";
import fs from "node:fs";
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

test("the current portfolio no longer publishes MuscleKey", () => {
  const window = loadPortfolio();

  assert.equal(window.PORTFOLIO_PROJECTS.some(({ id }) => id === "musclekey"), false);
  assert.equal(window.PORTFOLIO_CATEGORIES.some(({ id }) => id === "embodied-systems"), false);
  assert.equal(fs.existsSync("musclekey"), false);
  assert.equal(fs.existsSync("projects/musclekey.html"), false);
  assert.equal(fs.existsSync("assets/projects/musclekey"), false);

  for (const language of ["en", "zh", "ja"]) {
    assert.equal(window.PORTFOLIO_STUDENT_COPY[language].projects.musclekey, undefined);
    assert.equal(window.PORTFOLIO_I18N[language].projects.musclekey, undefined);
    assert.equal(window.PORTFOLIO_I18N[language].caseFacts.musclekey, undefined);
  }
});

test("the superseded PedalBalance project remains absent", () => {
  assert.equal(fs.existsSync("pedalbalance-echo"), false);
  assert.equal(fs.existsSync("projects/pedalbalance-echo.html"), false);
  assert.equal(fs.existsSync("assets/projects/pedalbalance"), false);
  assert.equal(fs.existsSync("files/pedalbalance-echo-html-portfolio.zip"), false);
});
