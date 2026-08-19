import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

test("every published project asset and source exists locally", () => {
  const window = {};
  vm.runInNewContext(fs.readFileSync("projects.js", "utf8"), { window });

  for (const project of window.PORTFOLIO_PROJECTS) {
    const paths = [
      project.cover?.src,
      project.shareImage,
      ...project.media.map((item) => item.src),
      ...project.media.map((item) => item.poster),
      ...project.sources.filter((source) => !source.external).map((source) => source.href),
      project.libraryStudy?.video?.src,
      project.libraryStudy?.video?.poster,
    ].filter(Boolean);
    for (const path of paths) {
      assert.ok(fs.existsSync(path), `${project.id} references missing resource ${path}`);
      assert.ok(fs.statSync(path).size > 0, `${project.id} references empty resource ${path}`);
    }
  }
});
