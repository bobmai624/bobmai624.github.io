import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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

test("Library cover remains sharp at full-viewport width", () => {
  const { width, height } = imageDimensions("assets/projects/library/cover-eye-tracking.jpg");
  assert.ok(width >= 3000, `cover width ${width} is below 3000`);
  assert.ok(height >= 2200, `cover height ${height} is below 2200`);
});

test("Library video poster never falls below the source-video frame", () => {
  const { width, height } = imageDimensions("media/library-video-poster.png");
  assert.ok(width >= 1280, `poster width ${width} is below 1280`);
  assert.ok(height >= 720, `poster height ${height} is below 720`);
});
