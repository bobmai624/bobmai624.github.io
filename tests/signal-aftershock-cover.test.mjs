import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectsSource = fs.readFileSync(path.join(ROOT, "projects.js"), "utf8");
const dataContext = { window: {} };
vm.runInNewContext(projectsSource, dataContext);

function jpegDimensions(buffer) {
  assert.equal(buffer.readUInt16BE(0), 0xffd8, "cover is not a valid JPEG");
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    if (marker === 0xd9 || marker === 0xda) break;
    const segmentLength = buffer.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + segmentLength;
  }
  throw new Error("JPEG dimensions not found");
}

test("Signal Aftershock uses a sharp live-game screenshot as its cover", () => {
  const project = dataContext.window.PORTFOLIO_PROJECTS.find(({ id }) => id === "signal-aftershock");
  const coverPath = project?.cover.src;
  const coverAlt = project?.cover.alt || "";

  assert.equal(coverPath, "assets/projects/game/cover-gameplay.jpg");
  assert.match(coverAlt, /live|active|match|relay/i);

  const cover = fs.readFileSync(path.join(ROOT, coverPath));
  const { width, height } = jpegDimensions(cover);
  assert.ok(width >= 2400, `gameplay cover width ${width} is below 2400`);
  assert.ok(height >= 1300, `gameplay cover height ${height} is below 1300`);
});
