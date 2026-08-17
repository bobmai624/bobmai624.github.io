# Library Image Clarity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore sharp, source-faithful imagery throughout the Unimelb Library Evaluation case study.

**Architecture:** The case study keeps its current data and gallery structure. High-resolution assets replace undersized exports in place; a project-specific article class disables document-softening filters; a Node test audits the real image headers to prevent regression.

**Tech Stack:** Static HTML/CSS/JavaScript, Poppler `pdftoppm`, Pillow, Node test runner, browser visual QA.

## Global Constraints

- Change only the Unimelb Library Evaluation visual treatment and its asset-generation settings.
- Never invent detail that is absent from the source PDF or 720p video.
- Preserve all multilingual copy, routes, downloads, video playback and other project styles.
- Keep the deployed GitHub Pages site and editable local copy synchronized.

---

### Task 1: Add the image-resolution regression contract

**Files:**
- Create: `tests/library-image-quality.test.mjs`

**Interfaces:**
- Consumes: JPEG and PNG files under `assets/projects/library/` and `media/library-video-poster.png`.
- Produces: a `node --test` quality gate that exits non-zero for undersized or missing assets.

- [x] **Step 1: Write a failing test** that reads actual JPEG/PNG dimensions and asserts six report pages are at least 2700×3500, the cover is at least 3000×2200, and the poster is at least 1280×720.
- [x] **Step 2: Run `node --test tests/library-image-quality.test.mjs`** and confirm it fails on the current 1391×1800 page exports.

### Task 2: Replace undersized assets from original sources

**Files:**
- Replace: `assets/projects/library/01-executive-summary.jpg`
- Replace: `assets/projects/library/02-task-findings.jpg`
- Replace: `assets/projects/library/03-eye-tracking.jpg`
- Replace: `assets/projects/library/04-recommendations.jpg`
- Replace: `assets/projects/library/05-search-evidence.jpg`
- Replace: `assets/projects/library/06-priority-table.jpg`
- Replace: `assets/projects/library/cover-eye-tracking.jpg`
- Modify: `../portfolio-rebuild/prepare_site_assets.py`
- Modify: `../portfolio-rebuild/make_cover_crops.py`

**Interfaces:**
- Consumes: `/Users/bob/Downloads/Assignment 2 - Evaluation Report.pdf` selected pages 3, 10, 16, 20, 22 and 24.
- Produces: page images at 2782×3600 and a cover at 3200×2400.

- [x] **Step 1: Render the six pages** with `pdftoppm -scale-to 3600 -jpegopt quality=94`.
- [x] **Step 2: Generate the cover** from the high-resolution eye-tracking page with an equivalent normalized crop and 3200×2400 output.
- [x] **Step 3: Update the generator settings** so later rebuilds preserve the same quality.
- [x] **Step 4: Run the image quality test** and confirm it passes.

### Task 3: Preserve crisp document rendering in the browser

**Files:**
- Modify: `app.js`
- Modify: `style.css`

**Interfaces:**
- Consumes: the `library-evaluation` project id.
- Produces: a `case-article--library` scope with source-faithful document rendering.

- [x] **Step 1: Add the Library article class** in `renderCaseStudy`.
- [x] **Step 2: Add scoped CSS** that uses a single readable evidence column and removes filters from the Library cover, report images and poster while preserving width, height and aspect ratio behavior.
- [x] **Step 3: Run the full Node test suite** and confirm no regression.

### Task 4: Validate, synchronize and publish

**Files:**
- Update: `/Users/bob/Documents/Codex/2026-08-12/wo/outputs/bowen-portfolio/`

**Interfaces:**
- Consumes: the verified Git working tree.
- Produces: matching editable local output and GitHub Pages deployment.

- [x] **Step 1: Run broken-reference and zero-byte checks.**
- [x] **Step 2: Inspect all Library media in a desktop browser and a mobile viewport.**
- [x] **Step 3: Copy the verified changes to the editable local output.**
- [ ] **Step 4: Commit, push, wait for GitHub Pages, and verify public asset dimensions and the live case route.**
