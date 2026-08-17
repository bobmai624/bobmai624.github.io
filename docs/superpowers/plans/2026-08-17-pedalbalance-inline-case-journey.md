# PedalBalance Inline Case Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the popup-first PedalBalance explanation with a trilingual, scroll-first case journey whose complete interaction and study logic are visible without clicks.

**Architecture:** Keep the existing static HTML/CSS/JS site and reuse the current hero animation, detail pages and popup. Rebuild the main PedalBalance page as semantic anchor-linked chapters, move the popup entry to the final optional-lab chapter, and add responsive journey components in the shared stylesheet.

**Tech stack:** Static HTML, CSS, vanilla JavaScript, Node test runner, Playwright browser validation, GitHub Pages.

---

### Task 1: Lock the no-click journey contract with tests

**Files:**
- Modify: `tests/page-one-content.test.mjs`

- [ ] Add assertions for the journey landmark and seven chapter IDs.
- [ ] Assert that `SENSE → DECIDE → CUE → CORRECT` and the five-stage study timeline are in the initial HTML.
- [ ] Assert the hero starts the journey with an anchor and that the page contains exactly one popup trigger, in the optional-lab chapter.
- [ ] Add trilingual-parity checks for the new chapter titles and summaries.
- [ ] Run `node --test tests/page-one-content.test.mjs` and confirm the new tests fail for the expected missing markup.

### Task 2: Rebuild the main page as a continuous journal

**Files:**
- Modify: `pedalbalance-echo/index.html`
- Modify: `pedalbalance-echo/assets/js/language.js`

- [ ] Replace header and hero popup buttons with a `#journey` start anchor.
- [ ] Add the sticky Overview / Loop / Build / Study / Evidence chapter rail.
- [ ] Implement the seven numbered chapters with Chinese, English and Japanese content in matching structure.
- [ ] Present the four-stage mechanism, three-moment revolution and five-stage participant timeline inline.
- [ ] Summarize construction and evidence gates, with links to the detailed making and study pages.
- [ ] Keep exactly one popup trigger in the final optional-lab chapter.
- [ ] Add localized interface copy for the new anchors and detail links.

### Task 3: Add the visual and responsive journey system

**Files:**
- Modify: `pedalbalance-echo/assets/css/site.css`
- Modify: `pedalbalance-echo/index.html`
- Modify: `pedalbalance-echo/prototype-making.html`
- Modify: `pedalbalance-echo/experiment-capabilities.html`

- [ ] Add journey rail, chapter, mechanism, moment, build, timeline, evidence and optional-lab styles.
- [ ] Keep diagrams dominant and body copy within readable line lengths.
- [ ] Add mobile stacking and horizontal rail/timeline behavior without page overflow.
- [ ] Update the shared stylesheet cache-busting query on all three pages.
- [ ] Run the focused test and then the full Node test suite.

### Task 4: Refresh delivery artifacts and documentation

**Files:**
- Modify: `README.md`
- Modify: `VALIDATION.md`
- Modify: `tests/final-validation.test.mjs` if the documented count changes
- Modify: `../outputs/bowen-portfolio/` mirror files
- Rebuild: portfolio download ZIP using the repository's existing packaging command

- [ ] Document the scroll-first journey and optional status of the popup.
- [ ] Update the validation count and dated evidence.
- [ ] Rebuild the downloadable source package.
- [ ] Synchronize the local preview mirror.
- [ ] Confirm the full automated suite is green.

### Task 5: Browser QA and deployment

- [ ] Serve the repository over local HTTP.
- [ ] Validate desktop layouts at 1440×900 and 2048×1338.
- [ ] Validate mobile layout at 390×844.
- [ ] Confirm the core process is visible with the popup closed, there is no horizontal overflow, and all three languages preserve the current journey position.
- [ ] Confirm there are no browser console errors.
- [ ] Commit and push to `main`.
- [ ] Wait for GitHub Pages deployment and verify the public page and stylesheet.

