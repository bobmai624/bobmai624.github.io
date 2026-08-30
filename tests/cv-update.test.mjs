import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadPortfolioCopy() {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of ["projects.js", "i18n.js", "student-copy.js", "cv-copy.js"]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }
  return window.PORTFOLIO_I18N;
}

test("the CV uses the academic label and has a prominent homepage entry in every language", () => {
  const html = fs.readFileSync("index.html", "utf8");
  const styles = fs.readFileSync("style.css", "utf8");
  const i18n = loadPortfolioCopy();

  assert.match(html, /class="cv-primary-link"[^>]*data-resume-open/);
  assert.match(styles, /\.cv-primary-link\s*\{/);
  assert.match(styles, /\.cv-primary-link[^}]*background:\s*var\(--ink\)/s);

  const expected = {
    en: ["CV", "View CV", "Curriculum Vitae (CV)"],
    zh: ["CV", "查看 CV", "学术履历（CV）"],
    ja: ["CV", "CVを見る", "Curriculum Vitae（CV）"],
  };
  for (const [language, [nav, view, title]] of Object.entries(expected)) {
    const site = i18n[language].site;
    assert.equal(site.navResume, nav);
    assert.equal(site.viewResume, view);
    assert.equal(site.resumeTopline, title);
  }
});

test("the English web CV mirrors the supplied two-page CV without old resume-only material", () => {
  const html = fs.readFileSync("index.html", "utf8");
  const cvHtml = html.slice(html.indexOf('id="resume-view"'), html.indexOf('id="contact-view"'));
  const site = loadPortfolioCopy().en.site;

  assert.match(cvHtml, /<h1 id="resume-title">MAI BOWEN<\/h1>/);
  assert.doesNotMatch(cvHtml, /data-i18n="experienceFour/);
  assert.doesNotMatch(cvHtml, /0449 024 862|mai205204/);
  assert.doesNotMatch(cvHtml, /resume-footer/);

  assert.equal(site.resumeFocus, "UX Research | Interaction Design | Human-Computer Interaction");
  assert.equal(
    site.resumeProfileOne,
    "Bachelor of Design candidate at the University of Melbourne, with completed coursework and practical experience in applied psychology, UX research, interaction design, and mixed methods. My work has included questionnaire development, interviews, usability testing, survey-data cleaning, initial descriptive analysis, open-text coding, research reporting, and interactive Figma prototyping.",
  );
  assert.equal(
    site.resumeProfileTwo,
    "My future research direction grows from a question that now drives my interest in embodied interaction, namely how people can perceive gradual changes in their own bodies when progress is too slow to notice day by day. I hope to explore whether a person's past exertion-related bodily state can be recorded, calibrated, and replayed across sessions so that rehabilitation progress becomes easier to perceive. This is research I want to pursue rather than work I have already completed. Graduate study would allow me to build the necessary capabilities in wearable sensing, psychophysics, haptic prototyping, longitudinal evaluation, and research ethics, beginning with technical calibration and healthy-adult studies before considering rehabilitation feasibility.",
  );

  assert.deepEqual(
    [site.educationOneDate, site.educationTwoDate, site.educationThreeDate],
    ["Feb 2024 - Expected Feb 2027", "Jul 2025 - Aug 2025", "Jan 2026 - Feb 2026"],
  );
  assert.deepEqual(
    [site.experienceOneDate, site.experienceTwoDate, site.experienceThreeDate],
    ["Feb 2026 - Jun 2026", "Feb 2025 - Jul 2025", "May 2026 - Present"],
  );
  assert.deepEqual(
    [site.experienceOneRole, site.experienceTwoRole, site.experienceThreeRole],
    ["HCI Research Assistant", "UI/UX Design Intern", "Product Manager / Digital Consultant"],
  );

  assert.deepEqual(
    [
      site.resumeProjectOneTitle,
      site.resumeProjectTwoTitle,
      site.resumeProjectThreeTitle,
      site.resumeProjectFourTitle,
      site.resumeProjectFiveTitle,
      site.resumeProjectSixTitle,
    ],
    [
      "AI-Supported Education and Student Course Experience Study | University of Melbourne",
      "User Research and Behavioural Analysis | University Coursework",
      "Usability Evaluation and Accessibility | University Coursework",
      "Web Interaction Design and Prototyping | University Coursework",
      "Quantitative Decision Analysis | Australian Multi-Asset Strategy",
      "Human-AI Workflow Design and Product Testing",
    ],
  );

  assert.deepEqual(
    [
      site.resumeCapabilityOneTitle,
      site.resumeCapabilityTwoTitle,
      site.resumeCapabilityThreeTitle,
      site.resumeCapabilityFourTitle,
      site.resumeCapabilityFiveTitle,
      site.resumeCapabilitySixTitle,
    ],
    [
      "UX Research",
      "Interaction Design & Prototyping",
      "Data Analysis",
      "Programming & AI Automation",
      "Project Delivery",
      "Languages",
    ],
  );
});

test("the CV structure and factual item counts remain equal across English, Chinese and Japanese", () => {
  const i18n = loadPortfolioCopy();
  const groups = {
    education: ["One", "Two", "Three"],
    experience: ["One", "Two", "Three"],
    resumeProject: ["One", "Two", "Three", "Four", "Five", "Six"],
    resumeCapability: ["One", "Two", "Three", "Four", "Five", "Six"],
  };

  for (const language of ["en", "zh", "ja"]) {
    const site = i18n[language].site;
    assert.ok(site.resumeProfileOne);
    assert.ok(site.resumeProfileTwo);
    for (const number of groups.education) {
      assert.ok(site[`education${number}Date`]);
      assert.ok(site[`education${number}Degree`]);
      assert.ok(site[`education${number}Place`]);
      assert.ok(site[`education${number}Body`]);
    }
    for (const number of groups.experience) {
      assert.ok(site[`experience${number}Date`]);
      assert.ok(site[`experience${number}Role`]);
      assert.ok(site[`experience${number}Place`]);
      assert.ok(site[`experience${number}BulletOne`]);
    }
    for (const number of groups.resumeProject) {
      assert.ok(site[`resumeProject${number}Date`]);
      assert.ok(site[`resumeProject${number}Title`]);
      assert.ok(site[`resumeProject${number}BulletOne`]);
    }
    for (const number of groups.resumeCapability) {
      assert.ok(site[`resumeCapability${number}Title`]);
      assert.ok(site[`resumeCapability${number}Body`]);
    }
  }
});
