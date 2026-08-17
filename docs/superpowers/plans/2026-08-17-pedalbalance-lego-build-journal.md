# PedalBalance Echo Lego-Style Build Journal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Prototype & Making page as an inline, trilingual, part-by-part assembly journal.

**Architecture:** Extend the existing static HTML page with a stable parts-number system and six semantic build modules. Add presentation-only CSS beside the current making-page styles, and protect the contract with source-level structural tests plus full browser QA.

**Tech Stack:** Static HTML, CSS, existing ES modules, Node test runner, local HTTP browser QA.

## Global Constraints

- Keep all required instructions visible without a popup, accordion or filter interaction.
- Preserve Chinese, English and Japanese parity.
- Preserve the existing research-plan status and exclude DIY EMS/TENS/FES.
- Use FSR readings only as relative pressure-contribution proxies.
- Reuse the current image and source registry; add no unverified hardware claim.

---

### Task 1: Protect the instruction contract

**Files:**
- Modify: `pedalbalance-echo/tests/page-two-content.test.mjs`

**Interfaces:**
- Consumes: `prototype-making.html` as UTF-8 text.
- Produces: regression checks for inline module, step, check and stop markers.

- [ ] Add tests requiring `#assembly`, six `data-assembly-module` blocks, at least eighteen `data-assembly-step` blocks, a check for every step, safety stop markers and matched trilingual copy.
- [ ] Run `node --test pedalbalance-echo/tests/page-two-content.test.mjs` and confirm failure because the new assembly structure is absent.
- [ ] Record the expected failure before editing production files.

### Task 2: Build the inline parts-and-assembly narrative

**Files:**
- Modify: `pedalbalance-echo/prototype-making.html`

**Interfaces:**
- Consumes: current component imagery, project navigation and language switching.
- Produces: `#assembly`, `.parts-manifest`, `.assembly-module`, `.assembly-step`, `.step-check`, `.step-stop`.

- [ ] Add a one-jump “Start assembly” link in the hero.
- [ ] Replace the filter-dependent component introduction with an always-readable P01–P12 parts manifest while retaining the visual component library below it.
- [ ] Add six modules with at least three concrete steps each, each carrying an input/action/check structure and trilingual copy.
- [ ] Add bench-test evidence and explicit stop conditions before the body/stationary integration stage.
- [ ] Keep optional sEMG and DIY stimulation outside the core build.
- [ ] Run the focused test and confirm it passes.

### Task 3: Style the paper construction manual

**Files:**
- Modify: `pedalbalance-echo/assets/css/site.css`

**Interfaces:**
- Consumes: semantic classes from Task 2.
- Produces: desktop editorial grid and stacked mobile layout without page overflow.

- [ ] Add parts-manifest, module-header, part-callout, step-index, action, check and stop treatments using existing palette variables.
- [ ] Keep step text and images readable at 1440 px and 390 px widths.
- [ ] Ensure only local component strips may scroll on narrow screens; the document width must remain bounded.
- [ ] Run the focused test, complete project suite and `git diff --check`.

### Task 4: Package, inspect and publish

**Files:**
- Modify: `pedalbalance-echo/README.md`
- Modify: `pedalbalance-echo/VALIDATION.md`
- Rebuild: `files/pedalbalance-echo-html-portfolio.zip`

**Interfaces:**
- Consumes: verified static site.
- Produces: matching local mirror, downloadable archive and deployed GitHub Pages build.

- [ ] Update the page description and verification record.
- [ ] Serve the repo over local HTTP and inspect Chinese, English and Japanese at desktop and mobile widths.
- [ ] Confirm zero page overflow, required sections visible, language switching stable and no console errors.
- [ ] Rebuild the public archive and copy the updated project to the local preview mirror.
- [ ] Commit, push, wait for Pages deployment and verify the public HTML and stylesheet.
