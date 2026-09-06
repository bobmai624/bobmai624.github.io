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

test("Linghang has an evidence-bounded role map, ten-stage workflow and honest retrospective", () => {
  const window = loadPortfolio();
  const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === "linghang");
  const study = project.linghangStudy;

  assert.ok(study, "Linghang needs a dedicated operations case study");
  assert.equal(study.roleMap.length, 3);
  assert.equal(study.workflow.length, 10);
  assert.ok(study.labels.workflowTitle);
  assert.notEqual(study.labels.workflowTitle, study.opening.title);
  assert.equal(study.metrics.length, 4);
  assert.equal(study.workstreams.length, 4);
  assert.equal(study.retrospective.assumptions.length, 4);
  assert.equal(study.boundaries.items.length, 3);
  assert.ok(study.workflow.some((step) => step.gate));
  assert.ok(study.workflow.every((step) => step.input && step.action && step.output && step.owner));

  const metrics = Object.fromEntries(study.metrics.map((metric) => [metric.value, metric]));
  assert.match(metrics["456"].basis, /reference|source/i);
  assert.match(metrics["216,566"].basis, /candidate|source|dataset/i);
  assert.match(metrics["3,291"].basis, /data rows|locality|hierarchy|mapping/i);
  assert.match(metrics["19"].basis, /18 Excel|one Numbers/i);

  const serialised = JSON.stringify(study);
  assert.doesNotMatch(serialised, /bob@|\+61\s*449|Yangfan@|passport|bank account/i);
});

test("the Linghang renderer makes the complete workflow visible without modal or disclosure clicks", () => {
  const window = loadPortfolio();
  const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === "linghang");
  const html = window.CaseComponents.linghangStudy(project);

  assert.match(html, /class="linghang-study"/);
  assert.equal((html.match(/class="linghang-role-card"/g) || []).length, 3);
  assert.equal((html.match(/class="linghang-workflow-step"/g) || []).length, 10);
  assert.equal((html.match(/class="linghang-metric"/g) || []).length, 4);
  assert.equal((html.match(/class="linghang-workstream"/g) || []).length, 4);
  assert.equal((html.match(/class="linghang-assumption"/g) || []).length, 4);
  assert.doesNotMatch(html, /<details|data-modal|data-dialog/i);
  assert.match(html, /stopped|did not become stable/i);
});

test("English, Chinese and Japanese preserve the Linghang structure and responsibility boundaries", () => {
  const window = loadPortfolio();

  for (const language of ["en", "zh", "ja"]) {
    const study = window.PORTFOLIO_I18N[language].projects.linghang.linghangStudy;
    assert.ok(study, `${language} needs the dedicated Linghang study`);
    assert.equal(study.roleMap.length, 3);
    assert.equal(study.workflow.length, 10);
    assert.equal(study.metrics.length, 4);
    assert.equal(study.workstreams.length, 4);
    assert.equal(study.retrospective.assumptions.length, 4);
    assert.equal(study.boundaries.items.length, 3);
  }
});

test("small labels in the new cases keep AA contrast on light and dark panels", () => {
  const styles = fs.readFileSync("style.css", "utf8");
  assert.match(styles, /\.case-article--education\s*\{[^}]*--education-blue:\s*#415761/s);
  assert.match(styles, /\.case-article--linghang-study\s*\{[^}]*--linghang-blue:\s*#415761/s);
  assert.match(styles, /\.education-analysis-step\s*>\s*span\s*\{[^}]*color:\s*#8eabbc/s);
  assert.match(styles, /\.linghang-role-card\s*>\s*p:first-of-type\s*\{[^}]*color:\s*#415761/s);
  assert.match(styles, /\.linghang-role-card:nth-child\(-n\s*\+\s*2\)\s*>\s*span,[\s\S]*?\.linghang-workstream span\s*\{[^}]*color:\s*#7d4b3c/s);
  assert.match(styles, /\.linghang-role-card:nth-child\(3\)\s*>\s*span,[\s\S]*?\.linghang-assumption span\s*\{[^}]*color:\s*#c98e76/s);
  assert.match(styles, /\.linghang-retrospective\s*>\s*header\s*>\s*p\s*\{[^}]*color:\s*#9eb0b9/s);
});
