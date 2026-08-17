# Bowen Mai Portfolio

Public portfolio for Bowen Mai, built with plain HTML, CSS and JavaScript.

**Live site:** https://bobmai624.github.io/

## Open the website

Double-click `index.html`, or run a small local server:

```bash
python3 -m http.server 4178
```

Then visit `http://127.0.0.1:4178/`.

## Edit the content

- `projects.js` is the single structured-content file. Projects and the complete Capabilities profile—including metrics, disciplines, software workflows and professional qualities—are listed there.
- `index.html` contains the homepage introduction, profile, complete web resume and contact links.
- `style.css` controls the monochrome-led, low-saturation typography, spacing, responsive layout, print resume and motion.
- `app.js` renders the five grouped practice areas and Capabilities section, and controls project/resume opening, URL routing, focus and scroll reveals.
- `assets/projects/` contains the website-ready project imagery.
- `pedalbalance-echo/index.html` is the scroll-first PedalBalance Echo case journey. Its core loop, build journal, participant timeline and evidence ladder are readable without opening the optional nine-scene lab.

The public repository intentionally excludes phone details, original assignment files, models,
videos and the resume PDF. Those remain in the private local portfolio archive.

## Add another project

Duplicate one object inside `projects.js`, then change its unique `id`, title, category, summary, `meaning`, cover, case-study sections and media. The `category` must match one of the five IDs in `PORTFOLIO_CATEGORIES`; the project will appear automatically in that section.

Keep new public image assets inside `assets/projects/`.

## Edit the resume

The web resume is written directly inside the `#resume-view` section of `index.html`. Edit the experience, education and capability text there.

## Edit the capabilities section

Edit `PORTFOLIO_CAPABILITIES` at the end of `projects.js`. Its four arrays map directly to the evidence counters, six professional disciplines, software workflow rows and professional-quality cards, so content changes do not require editing the page layout.
