import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadPortfolio() {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of ["projects.js", "portfolio-model.js", "i18n.js", "student-copy.js", "case-components.js"]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }
  return window;
}

test("Cove is a complete UI/UX Archive case without displacing selected work", () => {
  const window = loadPortfolio();
  const cove = window.PORTFOLIO_PROJECTS.find((project) => project.id === "cove");
  const partition = window.PortfolioModel.partitionProjects(window.PORTFOLIO_PROJECTS);

  assert.ok(cove, "Cove project is missing");
  assert.equal(cove.category, "digital-interaction");
  assert.equal(window.PORTFOLIO_PROJECTS.length, 17);
  assert.equal(partition.archive.length, 13);
  assert.deepEqual(
    Array.from(partition.selected, (project) => project.id),
    ["ai-for-education", "vita", "signal-aftershock", "financial-feasibility"],
  );
  assert.equal(partition.archive.some((project) => project.id === "cove"), true);
  assert.match(cove.caseFacts.ownership, /seven-person|seven member|group/i);
  assert.match(cove.caseFacts.contribution, /Alex|Uncertain Starter|one sec|wireframe/i);
  assert.match(cove.caseFacts.evidence, /11 participants/i);
  assert.match(cove.caseFacts.limitation, /friends|friend-sampling|academic performance|scrolling/i);
});

test("Cove publishes the prototype, two videos, the report and design-history evidence", () => {
  const { PORTFOLIO_PROJECTS, CaseComponents } = loadPortfolio();
  const cove = PORTFOLIO_PROJECTS.find((project) => project.id === "cove");

  assert.ok(cove.coveStudy, "Cove needs a dedicated case record");
  assert.equal(cove.coveStudy.features.length, 6);
  assert.equal(cove.coveStudy.evaluation.totalParticipants, 11);
  assert.equal(cove.coveStudy.evaluation.universityStudents, 9);
  assert.equal(cove.coveStudy.evaluation.highSchoolStudents, 2);
  assert.equal(cove.coveStudy.evaluation.tasks.length, 5);
  assert.equal(cove.coveStudy.evaluation.sus, "84.58");
  assert.equal(cove.coveStudy.journey.status, "Illustrative storyboard · not a measured outcome");
  assert.match(cove.coveStudy.prototype.url, /^https:\/\/www\.figma\.com\/proto\//);
  assert.equal(cove.media.filter((item) => item.type === "video").length, 2);
  assert.equal(cove.sources.filter((source) => source.href.endsWith(".pdf")).length, 2);
  const caseHtml = CaseComponents.coveStudy(cove);
  assert.match(caseHtml, /figma\.com\/embed\?embed_host=share/);
  assert.match(caseHtml, /data-cove-prototype-focus/);
  assert.match(caseHtml, /data-cove-prototype-stage/);
  assert.match(caseHtml, /data-cove-prototype-exit/);
  assert.match(caseHtml, /data-cove-prototype-iframe/);
  assert.match(caseHtml, /tabindex="0"/);
  assert.match(caseHtml, /allow="fullscreen; clipboard-read; clipboard-write"/);
  assert.match(caseHtml, new RegExp(cove.coveStudy.prototype.interactLabel));
  assert.equal((caseHtml.match(/<video /g) || []).length, 2);

  const publicPaths = [
    cove.cover.src,
    cove.shareImage,
    ...cove.media.map((item) => item.src),
    ...cove.media.flatMap((item) => (item.poster ? [item.poster] : [])),
    ...cove.sources.filter((source) => !source.href.startsWith("https://")).map((source) => source.href),
  ];
  for (const path of new Set(publicPaths)) {
    assert.ok(fs.existsSync(path), `${path} is missing`);
  }
});

test("Cove has equivalent English, Chinese and Japanese case structures", () => {
  const { PORTFOLIO_I18N } = loadPortfolio();

  for (const language of ["en", "zh", "ja"]) {
    const project = PORTFOLIO_I18N[language].projects.cove;
    const facts = PORTFOLIO_I18N[language].caseFacts.cove;
    assert.ok(project?.title?.trim(), `${language} Cove title is missing`);
    assert.ok(project.summary?.trim(), `${language} Cove summary is missing`);
    assert.equal(project.methods.length, 6);
    assert.equal(project.sections.length, 3);
    assert.equal(project.coveStudy.features.length, 6);
    assert.equal(project.coveStudy.evaluation.tasks.length, 5);
    assert.ok(project.coveStudy.prototype.interactLabel?.trim(), `${language} prototype interaction label is missing`);
    assert.ok(project.coveStudy.prototype.focusLabel?.trim(), `${language} prototype focus label is missing`);
    assert.ok(project.coveStudy.prototype.exitLabel?.trim(), `${language} prototype exit label is missing`);
    for (const key of ["context", "ownership", "contribution", "evidence", "outcome", "limitation"]) {
      assert.ok(facts?.[key]?.trim(), `${language} Cove caseFacts.${key} is missing`);
    }
  }

  assert.match(PORTFOLIO_I18N.en.site.archiveDescription, /13|thirteen/i);
  assert.match(PORTFOLIO_I18N.zh.site.archiveDescription, /13|十三/);
  assert.match(PORTFOLIO_I18N.ja.site.archiveDescription, /13|13件/);
  assert.match(PORTFOLIO_I18N.zh.projects.cove.displayTitle, /<wbr\s*\/>/);
  assert.match(PORTFOLIO_I18N.ja.projects.cove.displayTitle, /<wbr\s*\/>/);
});
