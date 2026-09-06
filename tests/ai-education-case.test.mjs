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

test("AI for Education records both supplied questionnaire formats without inventing response results", () => {
  const window = loadPortfolio();
  const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === "ai-for-education");
  const study = project.educationStudy;

  assert.ok(study, "AI for Education needs a dedicated questionnaire study");
  assert.equal(study.liveForm.questions.length, 6);
  assert.equal(study.liveForm.questions.filter((question) => question.kind === "open").length, 3);
  assert.equal(study.longForm.scaleItems, 12);
  assert.equal(study.longForm.openItems, 1);
  assert.equal(study.longForm.dimensions.flatMap((dimension) => dimension.items).length, 12);
  assert.equal(study.analysis.steps.length, 4);
  assert.match(study.liveForm.url, /^https:\/\/docs\.google\.com\/forms\//);
  assert.match(study.liveForm.embedUrl, /embedded=true/);
  assert.match(study.boundary.body, /no response dataset|response data (?:was|were) not supplied/i);

  const pdf = project.sources.find((source) => source.href === "files/course-feedback-survey.pdf");
  assert.ok(pdf, "the supplied questionnaire PDF should be available from the case");
  assert.ok(fs.existsSync(pdf.href));
});

test("the AI for Education renderer shows the instruments, item map, analysis plan and live questionnaire together", () => {
  const window = loadPortfolio();
  const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === "ai-for-education");
  const html = window.CaseComponents.educationStudy(project);

  assert.match(html, /class="education-study"/);
  assert.match(html, /class="education-instrument-card/g);
  assert.equal((html.match(/class="education-live-question/g) || []).length, 6);
  assert.equal((html.match(/class="education-dimension"/g) || []).length, 6);
  assert.equal((html.match(/class="education-analysis-step/g) || []).length, 4);
  assert.match(html, /<iframe[^>]+embedded=true/);
  assert.match(html, /files\/course-feedback-survey\.pdf/);
  assert.match(html, /No response dataset was supplied/i);
});

test("English, Chinese and Japanese include the same complete questionnaire structure", () => {
  const window = loadPortfolio();

  for (const language of ["en", "zh", "ja"]) {
    const study = window.PORTFOLIO_I18N[language].projects["ai-for-education"].educationStudy;
    assert.ok(study, `${language} needs the questionnaire study`);
    assert.equal(study.liveForm.questions.length, 6);
    assert.equal(study.longForm.dimensions.length, 6);
    assert.equal(study.analysis.steps.length, 4);
    assert.ok(study.boundary.title.trim());
    assert.ok(study.boundary.body.trim());
  }
});
