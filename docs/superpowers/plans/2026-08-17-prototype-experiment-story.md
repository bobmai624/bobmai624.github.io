# PedalBalance Echo Prototype Experiment Story Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the theory-heavy eleven-scene prototype overlay with a clear seven-stage experiment walkthrough in Chinese, English, and Japanese.

**Architecture:** Move localized experiment-stage content and its view-model helper into `prototype-flow.js`, then let `prototype-ui.js` render a consistent action-system-check narrative and an input-decision-cue-outcome visual. Keep the existing state machine as the safety boundary and map each participant-facing stage onto its existing transitions.

**Tech Stack:** Static HTML, CSS, browser-native JavaScript modules, Node.js test runner.

## Global Constraints

- Preserve the existing three-page static subsite and portfolio integration.
- Keep all participant-facing prototype content complete in Chinese, English, and Japanese.
- Treat all numbers as illustrative simulation or planned-study values.
- Use pressure only as a relative prototype signal, not power, torque, muscle strength, or diagnosis.
- No DIY EMS/TENS/FES; the only simulated body output is a short bounded vibration cue.
- Preserve STOP OUTPUT, Escape close, focus trapping, and global language switching.

---

### Task 1: Participant-facing experiment flow

**Files:**
- Create: `pedalbalance-echo/assets/js/prototype-flow.js`
- Modify: `pedalbalance-echo/assets/js/prototype-ui.js`
- Modify: `pedalbalance-echo/assets/css/site.css`
- Modify: `pedalbalance-echo/tests/final-validation.test.mjs`
- Create: `pedalbalance-echo/tests/prototype-flow.test.mjs`

**Interfaces:**
- Consumes: `createPrototypeMachine()` from `assets/js/prototype-machine.js` and `pedalbalance:language` events from the existing language switcher.
- Produces: `PROTOTYPE_STEPS`, `getPrototypeStep(index, language)`, and `prototypeLabels(language)` from `assets/js/prototype-flow.js`.

- [ ] **Step 1: Write the failing flow tests**

```js
import { PROTOTYPE_STEPS, getPrototypeStep } from '../assets/js/prototype-flow.js';

assert.deepEqual(PROTOTYPE_STEPS.map(({ key }) => key), [
  'QUESTION', 'SETUP', 'BASELINE', 'TRAINING', 'NO_CUE', 'REPLAY', 'RESULTS'
]);

for (const language of ['zh', 'en', 'ja']) {
  const view = getPrototypeStep(0, language);
  for (const field of ['nav', 'tag', 'title', 'summary', 'action', 'system', 'check']) {
    assert.ok(view[field]);
  }
}

assert.equal(getPrototypeStep(3, 'en').cueSide, 'left');
assert.equal(getPrototypeStep(4, 'en').outputMode, 'off');
assert.equal(getPrototypeStep(5, 'en').traceProvenance, 'past_self');
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `node --test pedalbalance-echo/tests/prototype-flow.test.mjs`

Expected: FAIL because `assets/js/prototype-flow.js` does not exist.

- [ ] **Step 3: Implement the localized flow model**

Create seven steps whose localized view contains `nav`, `tag`, `title`, `summary`, `action`, `system`, `check`, `inputLabel`, `decisionLabel`, `cueLabel`, and `outcomeLabel`. Give each step stable `values`, `machineState`, `cueSide`, `outputMode`, and optional `traceProvenance` fields.

- [ ] **Step 4: Render the new explanation and evidence flow**

Replace the eleven-scene array in `prototype-ui.js` with imports from `prototype-flow.js`. Render localized progress labels, action-system-check rows, visual-stage labels, controls, accessible names, simulated-value bars, cue state, and machine state. Map the seven participant-facing stages to the existing machine transitions without weakening STOP or fault safety.

- [ ] **Step 5: Refine desktop and responsive layout**

Replace the abstract oversized diagram treatment with a compact evidence-flow panel. Constrain headings to `clamp(2.35rem, 4.25vw, 4.9rem)`, use `word-break: keep-all` for Chinese and Japanese, keep the seven-step navigation readable, and stack the narrative and flow cleanly below 900px.

- [ ] **Step 6: Run all subsite tests**

Run: `node --test pedalbalance-echo/tests/*.test.mjs`

Expected: all tests pass, including the updated seven-stage contract.

- [ ] **Step 7: Synchronize and visually verify**

Copy only the changed PedalBalance Echo files to the local portfolio mirror, serve the repository, and verify desktop and mobile views in Chinese, English, and Japanese. Confirm the opening screen, cue-training screen, no-cue screen, results screen, language switching, and close/STOP controls.

- [ ] **Step 8: Commit**

```bash
git add docs/superpowers/specs/2026-08-17-prototype-experiment-story.md \
  docs/superpowers/plans/2026-08-17-prototype-experiment-story.md \
  pedalbalance-echo/assets/js/prototype-flow.js \
  pedalbalance-echo/assets/js/prototype-ui.js \
  pedalbalance-echo/assets/css/site.css \
  pedalbalance-echo/tests/prototype-flow.test.mjs \
  pedalbalance-echo/tests/final-validation.test.mjs
git commit -m "Clarify PedalBalance experiment walkthrough"
```

