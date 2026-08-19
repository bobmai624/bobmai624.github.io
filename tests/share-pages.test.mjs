import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("the share-page generator creates one independently identified page per project", () => {
  const outputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "bowen-share-pages-"));
  const result = spawnSync(process.execPath, ["scripts/generate-share-pages.mjs", "--output-dir", outputDirectory], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);

  const pages = fs.readdirSync(outputDirectory).filter((name) => name.endsWith(".html"));
  assert.equal(pages.length, 14);
  for (const page of pages) {
    const html = fs.readFileSync(path.join(outputDirectory, page), "utf8");
    const id = page.replace(/\.html$/, "");
    assert.match(html, new RegExp(`<title>[^<]+ — Bowen Mai</title>`));
    assert.match(html, new RegExp(`rel="canonical" href="https://bobmai624\\.github\\.io/projects/${id}\\.html"`));
    assert.match(html, /property="og:description" content="[^"]+"/);
    assert.match(html, new RegExp(`#project/${id}`));
  }
});

test("checked-in share pages match a fresh non-mutating generation", () => {
  const outputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "bowen-share-drift-"));
  const result = spawnSync(process.execPath, ["scripts/generate-share-pages.mjs", "--output-dir", outputDirectory], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);

  const checkedInPages = fs.readdirSync("projects").filter((name) => name.endsWith(".html")).sort();
  const generatedPages = fs.readdirSync(outputDirectory).filter((name) => name.endsWith(".html")).sort();
  assert.deepEqual(checkedInPages, generatedPages, "checked-in share-page filename set has drifted");

  for (const page of checkedInPages) {
    assert.equal(
      fs.readFileSync(path.join("projects", page), "utf8"),
      fs.readFileSync(path.join(outputDirectory, page), "utf8"),
      `${page} has drifted from the share-page generator`,
    );
  }
});

test("PedalBalance uses a project-specific social image", () => {
  const html = fs.readFileSync("projects/pedalbalance-echo.html", "utf8");
  assert.match(html, /og:image" content="https:\/\/bobmai624\.github\.io\/assets\/projects\/pedalbalance\/share-cover\.png"/);
  assert.ok(fs.existsSync("assets/projects/pedalbalance/share-cover.png"));
});
