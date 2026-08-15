# Bowen Mai Portfolio

This is a self-contained, local portfolio website. It uses plain HTML, CSS and JavaScript, so there is no build step and no dependency to install.

## Open the website

Double-click `index.html`, or open it in any modern browser.

For the most reliable video and file preview behaviour, open Terminal in this folder and run:

```bash
python3 -m http.server 4176
```

Then visit `http://127.0.0.1:4176/`.

## Edit the content

- `projects.js` is the single structured-content file. Projects and the complete Capabilities profile—including metrics, disciplines, software workflows and professional qualities—are listed there.
- `index.html` contains the homepage introduction, profile, complete web resume and contact links.
- `style.css` controls the monochrome-led, low-saturation typography, spacing, responsive layout, print resume and motion.
- `app.js` renders the five grouped practice areas and Capabilities section, and controls project/resume opening, URL routing, focus and scroll reveals.
- `assets/projects/` contains the website-ready project imagery.
- `files/` contains the original assignment files, spreadsheets, videos, 3D model and resume.

## Add another project

Duplicate one object inside `projects.js`, then change its unique `id`, title, category, summary, `meaning`, cover, case-study sections, media and source links. The `category` must match one of the five IDs in `PORTFOLIO_CATEGORIES`; the project will appear automatically in that section.

Keep new image assets inside `assets/projects/` and original downloadable files inside `files/` so the portfolio remains portable.

## Edit the resume

The web resume is written directly inside the `#resume-view` section of `index.html`. Edit the experience, education and capability text there. Replace `files/resume-bowen-mai.pdf` only when the downloadable PDF version also changes.

## Edit the capabilities section

Edit `PORTFOLIO_CAPABILITIES` at the end of `projects.js`. Its four arrays map directly to the evidence counters, six professional disciplines, software workflow rows and professional-quality cards, so content changes do not require editing the page layout.
