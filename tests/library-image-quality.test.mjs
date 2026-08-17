import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectsSource = fs.readFileSync(path.join(ROOT, "projects.js"), "utf8");
const appSource = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const cssSource = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");
const dataContext = { window: {} };
vm.runInNewContext(projectsSource, dataContext);
const libraryProject = dataContext.window.PORTFOLIO_PROJECTS.find(
  ({ id }) => id === "library-evaluation",
);

function pngDimensions(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  assert.equal(signature, "89504e470d0a1a0a", "invalid PNG signature");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function jpegDimensions(buffer) {
  assert.equal(buffer.readUInt16BE(0), 0xffd8, "invalid JPEG signature");
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    if (marker === 0xd9 || marker === 0xda) break;
    const segmentLength = buffer.readUInt16BE(offset + 2);
    const isStartOfFrame = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker);
    if (isStartOfFrame) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + segmentLength;
  }
  throw new Error("JPEG dimensions not found");
}

function imageDimensions(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  const buffer = fs.readFileSync(absolutePath);
  return path.extname(relativePath).toLowerCase() === ".png"
    ? pngDimensions(buffer)
    : jpegDimensions(buffer);
}

const reportPages = [
  "assets/projects/library/01-executive-summary.jpg",
  "assets/projects/library/02-task-findings.jpg",
  "assets/projects/library/03-eye-tracking.jpg",
  "assets/projects/library/04-recommendations.jpg",
  "assets/projects/library/05-search-evidence.jpg",
  "assets/projects/library/06-priority-table.jpg",
];

test("Library report pages retain enough source pixels for a retina gallery", () => {
  for (const relativePath of reportPages) {
    const { width, height } = imageDimensions(relativePath);
    assert.ok(width >= 2700, `${relativePath} width ${width} is below 2700`);
    assert.ok(height >= 3500, `${relativePath} height ${height} is below 3500`);
  }
});

test("Library cover uses a native video frame rather than an enlarged eye-tracking screenshot", () => {
  assert.equal(libraryProject.cover.src, "assets/projects/library/cover-session.jpg");
  assert.doesNotMatch(libraryProject.cover.src, /eye-tracking/i);

  const { width, height } = imageDimensions(libraryProject.cover.src);
  assert.ok(width >= 1280, `cover width ${width} is below the source frame`);
  assert.ok(height >= 720, `cover height ${height} is below the source frame`);
});

test("Library video poster never falls below the source-video frame", () => {
  const { width, height } = imageDimensions("media/library-video-poster.png");
  assert.ok(width >= 1280, `poster width ${width} is below 1280`);
  assert.ok(height >= 720, `poster height ${height} is below 720`);
});

test("Library case study has a complete research narrative instead of a page gallery", () => {
  const study = libraryProject.libraryStudy;
  assert.ok(study, "libraryStudy data is missing");
  assert.equal(study.metrics.length, 4);
  assert.equal(study.journey.steps.length, 4);
  assert.equal(study.findings.items.length, 3);
  assert.equal(
    study.recommendations.groups.flatMap(({ items }) => items).length,
    8,
    "all eight submitted recommendations should remain visible",
  );

  assert.match(appSource, /function libraryStudyMarkup\(project\)/);
  assert.match(appSource, /project\.libraryStudy\s*\?\s*libraryStudyMarkup\(project\)/);
});

test("Library evidence crops use balanced landscape frames", () => {
  for (const relativePath of libraryProject.libraryStudy.findings.items.map(({ image }) => image)) {
    const { width, height } = imageDimensions(relativePath);
    assert.ok(width >= 1200, `${relativePath} width ${width} is below 1200`);
    assert.ok(height >= 700, `${relativePath} height ${height} is below 700`);
    assert.ok(width / height >= 1.35, `${relativePath} is not a landscape evidence crop`);
    assert.ok(width / height <= 2, `${relativePath} is too panoramic for a balanced evidence card`);
  }
});

test("Library presentation video fills its dedicated 16:9 stage", () => {
  const stageRule = cssSource.match(/\.library-video-stage video\s*\{([^}]+)\}/s)?.[1] || "";
  assert.match(stageRule, /width:\s*100%/);
  assert.match(stageRule, /aspect-ratio:\s*16\s*\/\s*9/);
  assert.doesNotMatch(stageRule, /max-width/);
});
