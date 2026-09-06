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

test("AI for Education records the instruments and briefing summary without inventing response counts", () => {
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
  assert.equal(study.feedbackBrief.themes.length, 3);
  assert.equal(study.feedbackBrief.responses.length, 2);
  assert.match(study.feedbackBrief.note, /no raw response|no participant count/i);
  assert.match(study.liveForm.url, /^https:\/\/docs\.google\.com\/forms\//);
  assert.match(study.liveForm.embedUrl, /embedded=true/);
  assert.match(study.boundary.body, /no response dataset|response data (?:was|were) not supplied/i);

  const pdf = project.sources.find((source) => source.href === "files/course-feedback-survey.pdf");
  assert.ok(pdf, "the supplied questionnaire PDF should be available from the case");
  assert.ok(fs.existsSync(pdf.href));
});

test("University context remains separate from the survey and uses official sources", () => {
  const window = loadPortfolio();
  const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === "ai-for-education");
  const context = project.educationStudy.institutionalContext;

  assert.equal(context.items.length, 3);
  assert.match(context.note, /not (?:results|findings).*survey|not produced by.*survey/i);
  for (const item of context.items) {
    const url = new URL(item.href);
    assert.equal(url.protocol, "https:");
    assert.match(url.hostname, /(^|\.)unimelb\.edu\.au$/);
  }

  const sourceUrls = project.sources.map((source) => source.href);
  assert.equal(sourceUrls.filter((href) => href.startsWith("https://")).length, 3);
  for (const source of project.sources.filter((item) => item.href.startsWith("https://"))) {
    assert.equal(source.external, true);
    assert.ok(source.labels.zh.trim());
    assert.ok(source.labels.ja.trim());
  }
});

test("the AI for Education renderer shows the feedback, context and questionnaires without hidden steps", () => {
  const window = loadPortfolio();
  const project = window.PORTFOLIO_PROJECTS.find((item) => item.id === "ai-for-education");
  const html = window.CaseComponents.educationStudy(project);

  assert.match(html, /class="education-study"/);
  assert.match(html, /class="education-instrument-card/g);
  assert.equal((html.match(/class="education-live-question/g) || []).length, 6);
  assert.equal((html.match(/class="education-dimension"/g) || []).length, 6);
  assert.equal((html.match(/class="education-analysis-step/g) || []).length, 4);
  assert.equal((html.match(/class="education-feedback-theme/g) || []).length, 3);
  assert.equal((html.match(/class="education-response-card/g) || []).length, 2);
  assert.equal((html.match(/class="education-context-card/g) || []).length, 3);
  assert.match(html, /<iframe[^>]+embedded=true/);
  assert.match(html, /files\/course-feedback-survey\.pdf/);
  assert.match(html, /No response dataset was supplied/i);
  assert.doesNotMatch(html, /<details|dialog|aria-expanded=/i);
});

test("English, Chinese and Japanese include the same complete questionnaire structure", () => {
  const window = loadPortfolio();

  for (const language of ["en", "zh", "ja"]) {
    const study = window.PORTFOLIO_I18N[language].projects["ai-for-education"].educationStudy;
    assert.ok(study, `${language} needs the questionnaire study`);
    assert.equal(study.liveForm.questions.length, 6);
    assert.equal(study.longForm.dimensions.length, 6);
    assert.equal(study.analysis.steps.length, 4);
    assert.equal(study.feedbackBrief.themes.length, 3);
    assert.equal(study.feedbackBrief.responses.length, 2);
    assert.equal(study.institutionalContext.items.length, 3);
    assert.ok(study.boundary.title.trim());
    assert.ok(study.boundary.body.trim());
  }
});

test("small feedback labels keep AA contrast on the new light panels", () => {
  const styles = fs.readFileSync("style.css", "utf8");
  const labelColor = styles.match(/--education-rust:\s*(#[0-9a-f]{6})/i)?.[1];
  const panelColor = styles.match(/\.education-responses\s*\{[^}]*background:\s*(#[0-9a-f]{6})/i)?.[1];
  assert.ok(labelColor && panelColor, "feedback label and panel colours must be explicit");

  const luminance = (hex) => {
    const channels = hex.match(/[0-9a-f]{2}/gi).map((value) => Number.parseInt(value, 16) / 255);
    const linear = channels.map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const foreground = luminance(labelColor);
  const background = luminance(panelColor);
  const ratio = (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
  assert.ok(ratio >= 4.5, `small feedback labels need 4.5:1 contrast, received ${ratio.toFixed(2)}:1`);
});
