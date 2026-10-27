import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadCopy() {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of ["projects.js", "i18n.js", "student-copy.js", "cv-copy.js"]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }
  return window.PORTFOLIO_I18N;
}

test("the public summary presents AI ethics and policy as a developing research direction", () => {
  const copy = loadCopy();

  assert.match(copy.en.site.aboutParagraphTwo, /AI ethics and (?:technology )?policy/i);
  assert.match(copy.en.site.aboutParagraphTwo, /autonomy|transparency|accountab/i);
  assert.match(copy.zh.site.aboutParagraphTwo, /AI 伦理|人工智能伦理/);
  assert.match(copy.zh.site.aboutParagraphTwo, /政策/);
  assert.match(copy.ja.site.aboutParagraphTwo, /AI倫理/);
  assert.match(copy.ja.site.aboutParagraphTwo, /政策/);
});

test("the CV connects existing UX and HCI methods to the new research direction without overstating expertise", () => {
  const copy = loadCopy();

  assert.match(copy.en.site.resumeFocus, /UX\/HCI Research/i);
  assert.match(copy.en.site.resumeFocus, /AI Ethics and Policy/i);
  assert.match(copy.en.site.resumeProfileTwo, /research direction/i);
  assert.match(copy.en.site.resumeProfileTwo, /rather than.*completed|not.*claim/i);
  assert.match(copy.zh.site.resumeProfileTwo, /研究方向/);
  assert.match(copy.zh.site.resumeProfileTwo, /并不|而不是|尚未/);
  assert.match(copy.ja.site.resumeProfileTwo, /研究方向/);
  assert.match(copy.ja.site.resumeProfileTwo, /実績.*主張|専門家.*主張|完了した研究/);
});

test("static metadata identifies the same research direction", () => {
  const html = fs.readFileSync("index.html", "utf8");
  assert.match(html, /AI ethics and technology policy/i);
  assert.match(html, /Human.AI Interaction/i);
});
