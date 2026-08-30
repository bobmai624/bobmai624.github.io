import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadI18n() {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of ["projects.js", "i18n.js", "student-copy.js", "cv-copy.js"]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }
  return window.PORTFOLIO_I18N;
}

test("the web CV reflects the supplied education and research history in all three languages", () => {
  const i18n = loadI18n();
  const expected = {
    en: {
      education: ["Feb 2024 - Expected Feb 2027", "Jul 2025 - Aug 2025", "Jan 2026 - Feb 2026"],
      experience: [
        ["Feb 2026 - Jun 2026", /HCI Research Assistant/i],
        ["Feb 2025 - Jul 2025", /UX Design Intern/i],
        ["May 2026 - Present", /Linghang Education|Product Manager/i],
      ],
      projects: /Selected Research Projects/i,
      languages: /Mandarin Chinese.*English.*Japanese/i,
    },
    zh: {
      education: ["2024年2月 - 预计2027年2月", "2025年7月 - 2025年8月", "2026年1月 - 2026年2月"],
      experience: [
        ["2026年2月 - 2026年6月", /HCI 研究助理/],
        ["2025年2月 - 2025年7月", /UI\/UX 设计实习生/],
        ["2026年5月 - 至今", /领航教育|产品经理/],
      ],
      projects: /精选研究项目/,
      languages: /普通话.*英语.*日语/,
    },
    ja: {
      education: ["2024年2月 - 2027年2月修了予定", "2025年7月 - 2025年8月", "2026年1月 - 2026年2月"],
      experience: [
        ["2026年2月 - 2026年6月", /HCIリサーチアシスタント/],
        ["2025年2月 - 2025年7月", /UI\/UXデザイン・インターン/],
        ["2026年5月 - 現在", /Linghang Education|プロダクトマネージャー/],
      ],
      projects: /主な研究プロジェクト/,
      languages: /中国語.*英語.*日本語/,
    },
  };

  for (const [language, facts] of Object.entries(expected)) {
    const site = i18n[language].site;
    assert.deepEqual(
      [site.educationOneDate, site.educationTwoDate, site.educationThreeDate],
      facts.education,
      `${language} education dates are stale`,
    );
    for (const [index, [date, role]] of facts.experience.entries()) {
      const number = ["One", "Two", "Three"][index];
      assert.equal(site[`experience${number}Date`], date, `${language} experience ${index + 1} date is stale`);
      assert.match(
        `${site[`experience${number}Place`] || ""} ${site[`experience${number}Role`] || ""}`,
        role,
        `${language} experience ${index + 1} is stale`,
      );
      assert.ok(site[`experience${number}BulletOne`]?.length > 40, `${language} experience ${index + 1} lacks detail`);
    }
    assert.match(site.resumeProjectsTitle, facts.projects);
    for (const number of ["One", "Two", "Three", "Four", "Five", "Six"]) {
      assert.ok(site[`resumeProject${number}Date`], `${language} project ${number} date is missing`);
      assert.ok(site[`resumeProject${number}Title`], `${language} project ${number} title is missing`);
      assert.ok(site[`resumeProject${number}BulletOne`]?.length > 35, `${language} project ${number} lacks evidence`);
    }
    assert.match(site.resumeCapabilitySixBody, facts.languages);
  }
});

test("Contact me opens a localized in-site dialog with the requested public contact details", () => {
  const html = fs.readFileSync("index.html", "utf8");
  const app = fs.readFileSync("app.js", "utf8");
  const i18n = loadI18n();

  assert.match(html, /href="#contact"[^>]*data-contact-open/);
  assert.match(html, /id="contact-view"[^>]*role="dialog"[^>]*aria-modal="true"/s);
  assert.match(html, /id="contact-close"/);
  assert.match(html, /bobmy5464@gmail\.com/);
  assert.match(html, /mai205204/);
  assert.match(html, /\+86 166 0272 5464/);

  assert.match(app, /window\.location\.hash === "#contact"/);
  assert.match(app, /function openContact\(/);
  assert.match(app, /function closeContact\(/);
  assert.match(app, /trapFocus\(event, contactView/);

  for (const language of ["en", "zh", "ja"]) {
    const site = i18n[language].site;
    for (const key of [
      "closeContact",
      "contactTopline",
      "contactTitle",
      "contactIntro",
      "contactNameLabel",
      "contactEmailLabel",
      "contactWechatLabel",
      "contactChinaPhoneLabel",
    ]) {
      assert.ok(site[key]?.trim(), `${language}.${key} is missing`);
    }
  }
});
