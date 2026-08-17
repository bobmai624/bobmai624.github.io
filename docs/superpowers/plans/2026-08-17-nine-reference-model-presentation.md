# PedalBalance Echo Nine-Reference Model Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the PedalBalance interactive model into a coherent nine-scene academic demonstration derived from nine verified HCI and haptics presentation methods.

**Architecture:** Keep the existing static modal, safety state machine, and language system. Extend `prototype-flow.js` into a localized nine-scene presentation model and render each scene through a small scene-kind renderer in `prototype-ui.js`; CSS supplies the distinct loop, module, sequence, matrix, metric, condition, replay, timeline, and evidence layouts without external libraries or copied research imagery.

**Tech Stack:** Static HTML, CSS, browser-native JavaScript modules, Node.js test runner.

## Global Constraints

- Preserve the current static site, three-language support, source download, and portfolio return route.
- Use all nine reference methods in one narrative; do not create a screenshot gallery of other projects.
- Keep every value and result explicitly illustrative or planned.
- Pressure is a relative complete-revolution proxy, not power, torque, muscle strength, or diagnosis.
- No DIY EMS/TENS/FES; body output is a short bounded vibration cue.
- Preserve STOP OUTPUT, Escape close, focus trapping, and language switching.

---

### Task 1: Nine-scene presentation model

**Files:**
- Modify: `pedalbalance-echo/tests/prototype-flow.test.mjs`
- Modify: `pedalbalance-echo/assets/js/prototype-flow.js`

**Interfaces:**
- Produces: `PROTOTYPE_STEPS`, `getPrototypeStep(index, language)`, and `prototypeLabels(language)`.
- Each localized step exposes `key`, `visualKind`, `referenceName`, `referenceUrl`, `nav`, `tag`, `title`, `summary`, `action`, `system`, `check`, `visualTitle`, `visualItems`, `machineState`, `cueSide`, `outputMode`, and optional `traceProvenance`.

- [ ] **Step 1: Write the failing nine-scene test**

Assert the literal key order `LOOP`, `MODULES`, `CUE_SEQUENCE`, `DESIGN_SPACE`, `SYSTEM_FACTS`, `TASK_CONDITIONS`, `REPLAY`, `TIMELINE`, `EVIDENCE`; assert nine distinct visual kinds, HTTPS source URLs, localized nested visual data, left cue behavior, past-self provenance, and output-off evidence behavior.

- [ ] **Step 2: Run the focused test and verify the seven-scene model fails**

Run: `/Users/bob/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test pedalbalance-echo/tests/prototype-flow.test.mjs`

Expected: FAIL because the current model exposes seven old keys and lacks reference and visual-kind fields.

- [ ] **Step 3: Implement the minimal nine-scene localized model**

Replace the old seven-step data with the nine specified scenes. Add recursive localization so arrays and nested objects resolve fully into the selected language while stable numeric and state fields remain unchanged.

- [ ] **Step 4: Run the focused test and verify it passes**

Run the same focused test and expect all assertions to pass.

### Task 2: Scene-specific visual renderer

**Files:**
- Modify: `pedalbalance-echo/tests/site-contract.test.mjs`
- Modify: `pedalbalance-echo/assets/js/prototype-ui.js`
- Modify: `pedalbalance-echo/assets/css/site.css`

**Interfaces:**
- Consumes: the localized scene contract from Task 1.
- Produces: a single `.prototype-scene-visual` whose `data-visual-kind` maps to one of nine accessible CSS layouts.

- [ ] **Step 1: Add a failing DOM contract test**

Assert that the prototype UI defines a scene renderer for all nine visual kinds and preserves language, STOP, close, progress, and machine-state hooks.

- [ ] **Step 2: Run the focused contract test and verify it fails**

Expected: FAIL because the current UI only renders the repeated four-card flow.

- [ ] **Step 3: Implement scene rendering and state mapping**

Render the reference-method label and link, one scene-specific visual, and the action/system/check explanation. Map scene keys onto existing safe machine transitions; cue only in `CUE_SEQUENCE` and keep `EVIDENCE` output off.

- [ ] **Step 4: Implement responsive visual styles**

Add nine compact CSS layouts, maintain one dominant focal behavior, reduce internal scrolling, and provide a mobile horizontal progress rail and stacked visuals.

- [ ] **Step 5: Run the contract test and full automated suite**

Run: `/Users/bob/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test pedalbalance-echo/tests/*.test.mjs tests/*.test.mjs`

Expected: all tests pass.

### Task 3: Reference register, mirrors, and browser verification

**Files:**
- Modify: `pedalbalance-echo/SOURCES.md`
- Modify: `pedalbalance-echo/README.md`
- Mirror changed files to: `outputs/bowen-portfolio/pedalbalance-echo/`

**Interfaces:**
- The source register records the nine primary pages/papers and the presentation method borrowed from each.
- The local output mirror matches the published source for all changed PedalBalance files.

- [ ] **Step 1: Document the nine-reference lineage**

Add one concise mapping per source, distinguishing presentation influence from PedalBalance validation evidence.

- [ ] **Step 2: Synchronize changed files to the local output mirror**

Use `apply_patch` for source edits and `install -m 0644` for the mechanical mirror copy.

- [ ] **Step 3: Serve and inspect the site**

Serve the published-source repository over local HTTP. Check the nine scenes at desktop and mobile sizes, Chinese/English/Japanese switching, reference links, STOP, next/back/restart, Escape close, and console output.

- [ ] **Step 4: Run final verification**

Re-run the complete automated suite, JavaScript syntax checks, resource checks, and compare all changed mirrored files byte-for-byte.

- [ ] **Step 5: Commit and publish**

Commit the verified source changes to `main`, push to the existing GitHub Pages repository, then verify the public page and a representative PedalBalance asset after deployment.
