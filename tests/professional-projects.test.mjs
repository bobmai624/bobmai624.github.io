import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadPortfolio() {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of ["projects.js", "portfolio-model.js", "i18n.js", "student-copy.js"]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }
  return window;
}

const expectedProjects = {
  "ai-for-education": "ux-research",
  tidyteddy: "digital-interaction",
  linghang: "strategy",
};

test("the three professional projects are independent archive cases in the requested categories", () => {
  const window = loadPortfolio();
  const partition = window.PortfolioModel.partitionProjects(window.PORTFOLIO_PROJECTS);

  assert.deepEqual(
    Array.from(partition.selected, (project) => project.id),
    ["vita", "signal-aftershock", "financial-feasibility", "musclekey"],
  );
  assert.equal(partition.selected.length, 4);
  assert.equal(partition.archive.length, 13);
  assert.equal(window.PORTFOLIO_PROJECTS.length, 17);

  for (const [id, category] of Object.entries(expectedProjects)) {
    const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === id);
    assert.ok(project, `${id} must be a separate project`);
    assert.equal(project.category, category);
    assert.equal(partition.selected.some((item) => item.id === id), false);
    assert.equal(partition.archive.some((item) => item.id === id), true);
  }
});

test("each new case has a replaceable vector cover, a process visual and a complete evidence record", () => {
  const window = loadPortfolio();

  for (const id of Object.keys(expectedProjects)) {
    const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === id);
    assert.ok(project.cover?.src.endsWith(".svg"), `${id} needs an SVG cover`);
    assert.ok(fs.existsSync(project.cover.src), `${project.cover.src} is missing`);
    assert.ok(project.media.length >= 2, `${id} needs cover and process visuals`);
    for (const item of project.media) {
      assert.ok(fs.existsSync(item.src), `${item.src} is missing`);
    }
    assert.equal(project.sections.length, 3, `${id} needs a three-part case narrative`);
    assert.equal(project.sources.length, 0, `${id} must not invent source files`);
    for (const key of ["context", "ownership", "contribution", "evidence", "outcome", "limitation"]) {
      assert.ok(project.caseFacts[key]?.trim(), `${id} is missing caseFacts.${key}`);
    }
  }
});

test("the new cases preserve the supplied evidence boundaries", () => {
  const window = loadPortfolio();
  const byId = Object.fromEntries(window.PORTFOLIO_PROJECTS.map((project) => [project.id, project]));

  assert.match(byId["ai-for-education"].caseFacts.limitation, /not proof|did not test|did not establish/i);
  assert.match(byId.tidyteddy.caseFacts.limitation, /no verified post-launch conversion data/i);
  assert.match(byId.linghang.caseFacts.limitation, /ongoing/i);
  assert.match(byId.linghang.caseFacts.limitation, /completed before submission/i);
});

test("English, Chinese and Japanese expose complete project pages for all three cases", () => {
  const window = loadPortfolio();

  for (const language of ["en", "zh", "ja"]) {
    for (const id of Object.keys(expectedProjects)) {
      const project = window.PORTFOLIO_I18N[language].projects[id];
      const facts = window.PORTFOLIO_I18N[language].caseFacts[id];
      assert.ok(project?.title?.trim(), `${language}.${id} needs a title`);
      assert.ok(project.summary?.trim(), `${language}.${id} needs a summary`);
      assert.ok(project.meaning?.trim(), `${language}.${id} needs a reflection`);
      assert.ok(project.role?.trim(), `${language}.${id} needs a responsibility statement`);
      assert.ok(project.methods?.length, `${language}.${id} needs methods`);
      assert.equal(project.sections?.length, 3, `${language}.${id} needs three sections`);
      for (const key of ["context", "ownership", "contribution", "evidence", "outcome", "limitation"]) {
        assert.ok(facts?.[key]?.trim(), `${language}.${id} needs caseFacts.${key}`);
      }
    }
  }

  assert.match(window.PORTFOLIO_I18N.en.site.archiveDescription, /13|thirteen/i);
  assert.match(window.PORTFOLIO_I18N.zh.site.archiveDescription, /13|十三/);
  assert.match(window.PORTFOLIO_I18N.ja.site.archiveDescription, /13|13件/);
});

test("long Japanese case titles provide deliberate phrase-level wrap points", () => {
  const window = loadPortfolio();
  const app = fs.readFileSync("app.js", "utf8");
  const styles = fs.readFileSync("style.css", "utf8");

  assert.match(app, /project\.displayTitle\s*\|\|\s*project\.title/);
  for (const id of Object.keys(expectedProjects)) {
    const project = window.PORTFOLIO_I18N.ja.projects[id];
    assert.match(project.displayTitle, /<wbr\s*\/>/, `${id} needs explicit Japanese phrase boundaries`);
    assert.match(
      styles,
      new RegExp(`case-article--${id}[^}]+word-break:\\s*keep-all`, "s"),
      `${id} needs Japanese keep-all wrapping`,
    );
  }
});
