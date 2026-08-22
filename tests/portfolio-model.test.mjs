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
    ["vita", "signal-aftershock", "financial-feasibility", "pedalbalance-echo"],
  );
  assert.equal(model.archive.length, 10);
  assert.equal(new Set([...model.selected, ...model.archive].map((project) => project.id)).size, 14);
});

test("the ten supporting projects are grouped by their existing practice categories", () => {
  const window = loadWindowScript("projects.js");
  loadWindowScript("portfolio-model.js", window);

  const partition = window.PortfolioModel.partitionProjects(window.PORTFOLIO_PROJECTS);
  const groups = window.PortfolioModel.groupProjectsByCategory(
    partition.archive,
    window.PORTFOLIO_CATEGORIES,
  );

  assert.deepEqual(
    Array.from(groups, (group) => group.category.id),
    ["ux-research", "visual-editorial", "spatial-material", "strategy"],
  );
  assert.equal(groups.flatMap((group) => group.projects).length, 10);
  assert.deepEqual(
    Array.from(groups.flatMap((group) => group.projects), (project) => project.id),
    [
      "library-evaluation",
      "booking-systems",
      "film-to-book",
      "colour-systems",
      "melbourne-motion",
      "words-unleashed",
      "light-performance",
      "pyrrha",
      "trace-exaggeration",
      "investment-strategy",
    ],
  );
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

test("selected projects provide concise homepage contribution and evidence in every language", () => {
  const window = loadWindowScript("projects.js");
  loadWindowScript("portfolio-model.js", window);
  loadWindowScript("i18n.js", window);
  const selected = window.PortfolioModel.partitionProjects(window.PORTFOLIO_PROJECTS).selected;

  for (const project of selected) {
    assert.ok(project.caseFacts.homeContribution?.trim(), `${project.id} needs an English homepage contribution`);
    assert.ok(project.caseFacts.homeEvidence?.trim(), `${project.id} needs English homepage evidence`);
    for (const language of ["zh", "ja"]) {
      const facts = window.PORTFOLIO_I18N[language].caseFacts[project.id];
      assert.ok(facts.homeContribution?.trim(), `${language} ${project.id} needs a homepage contribution`);
      assert.ok(facts.homeEvidence?.trim(), `${language} ${project.id} needs homepage evidence`);
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

test("shared submissions and public derivatives remain secondary project evidence", () => {
  const window = loadWindowScript("projects.js");
  const expectedSources = {
    vita: [
      "files/aip-conceptual-design.pdf",
      "files/aip-future-scenario.pdf",
      "files/aip-vita-refined-prototype.pdf",
    ],
    "library-evaluation": ["files/unimelb-library-evaluation-public-summary.pdf"],
    "financial-feasibility": [
      "files/financial-feasibility-public-summary.pdf",
      "files/financial-feasibility-public-model.xlsx",
    ],
  };

  for (const [projectId, paths] of Object.entries(expectedSources)) {
    const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === projectId);
    assert.equal(project.sourcePolicy, "shared");
    for (const href of paths) {
      const source = project.sources.find((item) => item.href === href);
      assert.ok(source, `${projectId} must retain ${href}`);
      assert.equal(source.supplementary, true, `${href} must remain visually secondary`);
      assert.equal(source.sharedAttribution, true, `${href} must retain group-work attribution`);
      assert.equal(source.restricted, false, `${href} must remain available from its case study`);
      assert.ok(source.labels?.zh?.trim(), `${href} needs a Chinese secondary-material label`);
      assert.ok(source.labels?.ja?.trim(), `${href} needs a Japanese secondary-material label`);
    }
  }
});

test("confidential originals are never referenced by the public portfolio", () => {
  const window = loadWindowScript("projects.js");
  const publicPaths = window.PORTFOLIO_PROJECTS.flatMap((project) =>
    project.sources.map((source) => source.href),
  );
  for (const privatePath of [
    "files/unimelb-library-evaluation-report.pdf",
    "files/financial-feasibility-report.pdf",
    "files/financial-feasibility-model.xlsx",
  ]) {
    assert.equal(publicPaths.includes(privatePath), false, `${privatePath} must remain private`);
  }
});

test("shared-source notes describe retained group materials without claiming sole authorship", () => {
  const window = loadWindowScript("projects.js");
  loadWindowScript("i18n.js", window);
  const notes = [
    window.PORTFOLIO_I18N.en.ui.sharedSourceNote,
    window.PORTFOLIO_I18N.zh.ui.sharedSourceNote,
    window.PORTFOLIO_I18N.ja.ui.sharedSourceNote,
  ];
  for (const note of notes) {
    assert.match(note, /group|小组|共同/);
    assert.match(note, /supplementary|补充|補足/);
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
