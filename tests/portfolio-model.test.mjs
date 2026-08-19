import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadWindowScript(path, window = {}) {
  const context = vm.createContext({ window });
  vm.runInContext(fs.readFileSync(path, "utf8"), context, { filename: path });
  return window;
}

test("the home model selects four evidence-led cases and archives the remaining ten", () => {
  const window = loadWindowScript("projects.js");
  loadWindowScript("portfolio-model.js", window);

  const model = window.PortfolioModel.partitionProjects(window.PORTFOLIO_PROJECTS);
  assert.deepEqual(
    Array.from(model.selected, (project) => project.id),
    ["library-evaluation", "signal-aftershock", "vita", "pedalbalance-echo"],
  );
  assert.equal(model.archive.length, 10);
  assert.equal(new Set([...model.selected, ...model.archive].map((project) => project.id)).size, 14);
});

test("every project exposes a comparable responsibility and evidence record", () => {
  const window = loadWindowScript("projects.js");
  for (const project of window.PORTFOLIO_PROJECTS) {
    assert.ok(project.caseFacts, `${project.id} is missing caseFacts`);
    for (const key of ["context", "ownership", "contribution", "evidence", "outcome"]) {
      assert.ok(project.caseFacts[key]?.trim(), `${project.id} is missing caseFacts.${key}`);
    }
  }
});

test("project share paths are stable HTML URLs", () => {
  const window = loadWindowScript("projects.js");
  loadWindowScript("portfolio-model.js", window);
  assert.equal(
    window.PortfolioModel.projectSharePath({ id: "library-evaluation" }),
    "projects/library-evaluation.html",
  );
});

test("group submissions are not offered as unrestricted raw downloads", () => {
  const window = loadWindowScript("projects.js");
  for (const project of window.PORTFOLIO_PROJECTS.filter((item) => item.sourcePolicy === "shared")) {
    assert.equal(
      project.sources.some((source) => !source.external && !source.presentation && !source.restricted),
      false,
      `${project.id} exposes an unrestricted shared source`,
    );
  }
});

test("Chinese and Japanese provide complete project evidence records", () => {
  const window = loadWindowScript("projects.js");
  loadWindowScript("i18n.js", window);
  const ids = window.PORTFOLIO_PROJECTS.map((project) => project.id);
  for (const language of ["zh", "ja"]) {
    for (const id of ids) {
      const facts = window.PORTFOLIO_I18N[language].caseFacts[id];
      assert.ok(facts, `${language} is missing ${id} case facts`);
      for (const key of ["context", "ownership", "contribution", "evidence", "outcome"]) {
        assert.ok(facts[key]?.trim(), `${language} ${id} is missing ${key}`);
      }
    }
  }
});
