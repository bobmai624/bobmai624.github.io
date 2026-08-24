import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadI18n() {
  const window = {};
  const context = vm.createContext({ window });
  vm.runInContext(fs.readFileSync("i18n.js", "utf8"), context, { filename: "i18n.js" });
  return window.PORTFOLIO_I18N;
}

test("the web resume reflects the latest dated education and professional history in all three languages", () => {
  const i18n = loadI18n();
  const expected = {
    en: {
      education: ["Feb 2024 — Feb 2027", "Jul 2025 — Aug 2025", "Jan 2026 — Feb 2026"],
      experience: [
        ["May 2026 — Dec 2026", /Liuxue Linghang|Study.*Migration/i],
        ["Feb 2026 — Jun 2026", /HCI Research Assistant/i],
        ["Feb 2025 — Jul 2025", /UX Design Intern/i],
        ["Jun 2021 — Dec 2022", /Sales (Associate|Advisor)/i],
      ],
      projects: /Consulting, research & digital transformation projects/i,
      languages: /Chinese.*English.*Japanese/i,
    },
    zh: {
      education: ["2024年2月 — 2027年2月", "2025年7月 — 2025年8月", "2026年1月 — 2026年2月"],
      experience: [
        ["2026年5月 — 2026年12月", /留学领航留学移民/],
        ["2026年2月 — 2026年6月", /HCI 研究助理/],
        ["2025年2月 — 2025年7月", /UI\/UX 设计实习生/],
        ["2021年6月 — 2022年12月", /销售顾问/],
      ],
      projects: /咨询、研究与数字化转型项目/,
      languages: /中文.*英语.*日语/,
    },
    ja: {
      education: ["2024年2月 — 2027年2月", "2025年7月 — 2025年8月", "2026年1月 — 2026年2月"],
      experience: [
        ["2026年5月 — 2026年12月", /留学領航/],
        ["2026年2月 — 2026年6月", /HCIリサーチアシスタント/],
        ["2025年2月 — 2025年7月", /UI\/UXデザイン・インターン/],
        ["2021年6月 — 2022年12月", /販売アドバイザー/],
      ],
      projects: /コンサルティング・リサーチ・デジタル変革プロジェクト/,
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
      const number = ["One", "Two", "Three", "Four"][index];
      assert.equal(site[`experience${number}Date`], date, `${language} experience ${index + 1} date is stale`);
      assert.match(
        `${site[`experience${number}Place`] || ""} ${site[`experience${number}Role`] || ""}`,
        role,
        `${language} experience ${index + 1} is stale`,
      );
      assert.ok(site[`experience${number}Body`]?.length > 80, `${language} experience ${index + 1} lacks detail`);
    }
    assert.match(site.resumeProjectsTitle, facts.projects);
    for (const number of ["One", "Two", "Three", "Four", "Five", "Six"]) {
      assert.ok(site[`resumeProject${number}Date`], `${language} project ${number} date is missing`);
      assert.ok(site[`resumeProject${number}Title`], `${language} project ${number} title is missing`);
      assert.ok(site[`resumeProject${number}Body`]?.length > 70, `${language} project ${number} lacks evidence`);
    }
    assert.match(site.resumeLanguagesBody, facts.languages);
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
