# Bowen Mai Brand Intro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current fast `BM` splash with a code-native monogram, `BOWEN MAI` wordmark, one-second hold and gradual fade.

**Architecture:** Keep the feature entirely in existing HTML and CSS. The overlay owns the hold-and-exit timeline; its child lockup and mark own only their entrance motion, so changing one does not unexpectedly shorten the other.

**Tech Stack:** Static HTML, CSS keyframes, Node test runner.

## Global Constraints

- The fully visible brand hold is at least 1,000 ms.
- The exit fade lasts at least 500 ms.
- The intro stays decorative and hidden from assistive technology.
- `prefers-reduced-motion: reduce` continues to remove the intro.
- No JavaScript timer, image, SVG, external font or new dependency.

---

### Task 1: Protect the brand and timing contract

**Files:**
- Create: `tests/brand-intro.test.mjs`

**Interfaces:**
- Consumes: root `index.html` and `style.css`.
- Produces: regression checks for brand markup, overlay timing, fade end-state and reduced-motion behavior.

- [ ] Add a test requiring `.intro-mark`, `.intro-name`, `BOWEN MAI`, and two monogram letter spans.
- [ ] Add a test that parses the `intro-curtain` keyframes and verifies a 1,000 ms hold plus at least a 500 ms exit phase.
- [ ] Add a test requiring final hidden/transparent state and the existing reduced-motion opt-out.
- [ ] Run the focused test and confirm it fails because the old splash has neither the new markup nor timing variables.

### Task 2: Implement the branded intro

**Files:**
- Modify: `index.html`
- Modify: `style.css`

**Interfaces:**
- Consumes: `.page-intro` overlay and `--ease` timing curve.
- Produces: `.intro-lockup`, `.intro-mark`, `.intro-name`, `intro-curtain`, `intro-lockup-in`, and `intro-mark-in`.

- [ ] Replace the single `BM` span with a framed two-letter monogram and full name.
- [ ] Declare `--intro-hold: 1000ms` and `--intro-fade: 550ms` on `.page-intro`.
- [ ] Give the curtain an explicit 1,800 ms timeline whose fade begins after the hold.
- [ ] Give the lockup and mark short entrance animations that finish before the hold completes.
- [ ] Add mobile sizing without changing other header or hero rules.
- [ ] Run the focused test and confirm it passes.

### Task 3: Verify and publish

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: completed root-site edit.
- Produces: deployed GitHub Pages intro and a brief maintainability note.

- [ ] Document the intro timing variables and CSS-only logo.
- [ ] Run the complete root and PedalBalance test suites plus `git diff --check`.
- [ ] Commit and push to `main`.
- [ ] Wait for the matching GitHub Pages workflow to succeed.
- [ ] Verify the public HTML and versioned stylesheet contain the new mark and animation.
