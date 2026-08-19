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

- `projects.js` contains the 14 project records, evidence facts, case-study media and source policies.
- `portfolio-model.js` defines the four selected cases, the ten-project archive and stable share paths.
- `i18n.js` contains complete English, Chinese and Japanese homepage, résumé and case-study translations.
- `index.html` contains the concise homepage shell, complete web résumé and contact links.
- `style.css` controls the monochrome-led, low-saturation typography, spacing, responsive layout, print resume and motion.
- `app.js` renders Selected Work, Archive and the three evidence-linked Capabilities, and controls project/resume opening, metadata, URL routing, focus and scroll reveals.
- `assets/projects/` contains the website-ready project imagery.
- `pedalbalance-echo/index.html` is the scroll-first PedalBalance Echo case journey. Its core loop, build journal, participant timeline and evidence ladder are readable without opening the optional nine-scene lab.

The public repository keeps individual evidence, presentation videos and approved group evidence.
Vita's original group submissions remain as quiet supplementary links. Library and Financial
Feasibility use privacy-safe public derivatives because their unredacted sources contain participant,
student or collaborator data. All shared evidence retains explicit group-work attribution and receives
no separate homepage promotion.

## Add another project

Duplicate one object inside `projects.js`, then change its unique `id`, title, category, summary, `meaning`, cover, `caseFacts`, case-study sections and media. Add the ID to `portfolio-model.js` only if it should become one of the four homepage-selected cases; otherwise it appears in Archive.

Keep new public image assets inside `assets/projects/`.

After editing project titles, evidence or social images, regenerate the independent share pages:

```bash
node scripts/generate-share-pages.mjs
```

## Edit the resume

The web resume is written directly inside the `#resume-view` section of `index.html`. Edit the experience, education and capability text there.

## Edit the capabilities section

Edit the three groups in `PORTFOLIO_CAPABILITIES` at the end of `projects.js`. Each capability must name a concrete project, action and visible form of evidence.

## Edit the opening identity

The CSS-only `BM` mark and `BOWEN MAI` wordmark are inside `.page-intro` near the top of `index.html`. Their appearance is controlled by the adjacent intro rules in `style.css`; change `--intro-reveal`, `--intro-hold` and `--intro-fade` there when adjusting the timing. Those three values are added together by CSS, so the current sequence reveals the mark for 0.25 seconds, holds it fully visible for one second, then fades the black curtain away over 0.55 seconds.
