import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

test("the student-voice copy layer loads after localization and before rendering", () => {
  const html = fs.readFileSync("index.html", "utf8");
  const i18nIndex = html.indexOf('src="i18n.js');
  const copyIndex = html.indexOf('src="student-copy.js');
  const appIndex = html.indexOf('src="app.js');

  assert.ok(i18nIndex >= 0, "i18n.js is missing");
  assert.ok(copyIndex > i18nIndex, "student-copy.js must load after i18n.js");
  assert.ok(appIndex > copyIndex, "student-copy.js must load before app.js renders the page");
});

test("share-page metadata uses the same English copy layer as the portfolio", () => {
  const generator = fs.readFileSync("scripts/generate-share-pages.mjs", "utf8");
  assert.match(generator, /student-copy\.js/, "share-page generation is missing the student copy layer");
});

test("the student copy covers every project in English, Chinese and Japanese", () => {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of ["projects.js", "i18n.js", "student-copy.js"]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }

  const projectIds = window.PORTFOLIO_PROJECTS.map((project) => project.id).sort();
  assert.equal(projectIds.length, 14);
  for (const language of ["en", "zh", "ja"]) {
    const languageCopy = window.PORTFOLIO_STUDENT_COPY[language];
    assert.equal(Object.keys(languageCopy.projects).sort().join("|"), projectIds.join("|"));
    assert.ok(languageCopy.site.aboutParagraphOne);
    assert.ok(languageCopy.site.resumeSummary);
    assert.equal(languageCopy.capabilities.groups.length, 3);
    for (const id of projectIds) {
      assert.ok(languageCopy.projects[id].summary, `${language}.${id} needs a student-voice summary`);
      assert.ok(languageCopy.projects[id].meaning, `${language}.${id} needs a student-voice reflection`);
      assert.ok(languageCopy.projects[id].role, `${language}.${id} needs a clear responsibility statement`);
    }
  }
});
