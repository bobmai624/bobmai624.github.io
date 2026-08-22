import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadWindowScript(relativePath) {
  const sourcePath = path.join(ROOT, relativePath);
  assert.ok(fs.existsSync(sourcePath), `${relativePath} is missing`);
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(sourcePath, "utf8"), context);
  return context.window;
}

function pngDimensions(relativePath) {
  const sourcePath = path.join(ROOT, relativePath);
  assert.ok(fs.existsSync(sourcePath), `${relativePath} is missing`);
  const buffer = fs.readFileSync(sourcePath);
  assert.equal(buffer.toString("ascii", 1, 4), "PNG", `${relativePath} is not a PNG`);
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

test("Signal Aftershock presents a click-to-play frame inside its case study", () => {
  const { PORTFOLIO_PROJECTS } = loadWindowScript("projects.js");
  const { CaseComponents } = loadWindowScript("case-components.js");
  const project = PORTFOLIO_PROJECTS.find(({ id }) => id === "signal-aftershock");
  const ui = {
    interactivePrototype: "Interactive prototype",
    playSignal: "Play Signal Aftershock",
    playInPage: "Play in this page",
    openSeparately: "Open separately",
    playGameTitle: "Play Signal Aftershock",
  };

  const stage = CaseComponents.playableStage(project, ui);
  const frame = CaseComponents.playableFrame(project.playableUrl, ui.playGameTitle);

  assert.match(stage, /class="playable-stage"/);
  assert.match(stage, /data-inline-game=/);
  assert.match(stage, new RegExp(project.cover.src.replaceAll("/", "\\/")));
  assert.match(stage, /data-play-inline/);
  assert.match(stage, /Play in this page/);
  assert.match(stage, /Open separately/);
  assert.match(frame, /<iframe/);
  assert.match(frame, new RegExp(project.playableUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("Retail Mall Feasibility uses a purpose-built high-resolution project cover", () => {
  const { PORTFOLIO_PROJECTS } = loadWindowScript("projects.js");
  const project = PORTFOLIO_PROJECTS.find(({ id }) => id === "financial-feasibility");

  assert.equal(project.cover.src, "assets/projects/feasibility/cover-project-brief.png");
  assert.match(project.cover.alt, /financial|feasibility|scenario|model/i);
  const { width, height } = pngDimensions(project.cover.src);
  assert.ok(width >= 2400, `financial cover width ${width} is below 2400`);
  assert.ok(height >= 1500, `financial cover height ${height} is below 1500`);
});

test("PedalBalance Echo uses a high-resolution screenshot of the working pedalling prototype", () => {
  const { PORTFOLIO_PROJECTS } = loadWindowScript("projects.js");
  const project = PORTFOLIO_PROJECTS.find(({ id }) => id === "pedalbalance-echo");

  assert.equal(project.cover.src, "assets/projects/pedalbalance/prototype-pedalling.png");
  assert.equal(project.shareImage, project.cover.src);
  assert.match(project.cover.alt, /prototype|pedal|cycling|interface/i);
  const { width, height } = pngDimensions(project.cover.src);
  assert.ok(width >= 2000, `PedalBalance cover width ${width} is below 2000`);
  assert.ok(height >= 1200, `PedalBalance cover height ${height} is below 1200`);
});

test("the inline playable frame has complete English, Chinese and Japanese labels", () => {
  const { PORTFOLIO_I18N } = loadWindowScript("i18n.js");
  for (const language of ["en", "zh", "ja"]) {
    assert.ok(PORTFOLIO_I18N[language].ui.playInPage, `${language} playInPage is missing`);
    assert.ok(PORTFOLIO_I18N[language].ui.playableCaption, `${language} playableCaption is missing`);
  }
});
