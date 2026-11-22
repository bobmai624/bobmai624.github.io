import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

// Share metadata and catalogue checks use the same project data and copy as the browser.
export function loadPortfolio(root = process.cwd()) {
  const window = {};
  const context = vm.createContext({ window });
  for (const file of ["projects.js", "portfolio-model.js", "case-components.js", "i18n.js", "student-copy.js", "ai-futures.js"]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  return window;
}
