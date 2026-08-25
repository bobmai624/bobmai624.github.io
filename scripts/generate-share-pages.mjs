import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const window = {};
vm.runInNewContext(fs.readFileSync(path.join(root, "projects.js"), "utf8"), { window });
vm.runInNewContext(fs.readFileSync(path.join(root, "student-copy.js"), "utf8"), { window });

const outputFlagIndex = process.argv.indexOf("--output-dir");
const requestedOutput = outputFlagIndex >= 0 ? process.argv[outputFlagIndex + 1] : null;
const outputDirectory = requestedOutput
  ? path.resolve(root, requestedOutput)
  : path.join(root, "projects");
fs.mkdirSync(outputDirectory, { recursive: true });

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

for (const project of window.PORTFOLIO_PROJECTS) {
  const title = `${project.title} — Bowen Mai`;
  const description = project.caseFacts?.evidence || project.summary;
  const canonical = `https://bobmai624.github.io/projects/${project.id}.html`;
  const socialImage = project.shareImage || project.cover?.src;
  const imagePath = socialImage?.startsWith("assets/")
    ? socialImage
    : "assets/projects/library/cover-session.jpg";
  const image = `https://bobmai624.github.io/${imagePath}`;
  const route = `../index.html#project/${encodeURIComponent(project.id)}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta http-equiv="refresh" content="0; url=${route}" />
    <style>
      body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff;color:#0a0a0a;font:16px/1.5 Helvetica Neue,Arial,sans-serif}
      a{color:inherit;text-underline-offset:4px}
    </style>
  </head>
  <body>
    <p>Opening <a href="${route}">${escapeHtml(project.title)}</a>…</p>
    <script>location.replace(${JSON.stringify(route)});<\/script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(outputDirectory, `${project.id}.html`), html);
}

console.log(`Generated ${window.PORTFOLIO_PROJECTS.length} project share pages.`);
