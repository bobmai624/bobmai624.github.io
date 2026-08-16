# Validation Record

Date: 2026-08-17  
Build: local review prototype  
Status: passed

## Completed automated checks

- Core model/content suite: 37/37 passed after the scientific-linkage hero redesign.
- Hero model: two rigid planar leg links per side, fixed hip joints, exactly opposite pedal targets, forward-bending knees, fixed foot-to-pedal attachment, bounded values and complete-revolution cue logic.
- Experiment model: deterministic synthetic data, invalid-revolution exclusion, cue-dose summary, neutral `simulated_matched_other` provenance.
- Prototype state machine: calibration gate, valid setup sequence, global STOP, fail-safe output clearing, replay provenance.
- Content contracts: three shared pages, balanced trilingual copy, local images, component/source lineage, research status and limitations.
- Final validator checks local assets, duplicate IDs, image alternatives, HTTPS sources, three-language counts, 11 prototype scenes, safety boundaries and handoff documentation.
- Complete suite after final handoff validation: 37/37 passed.

## Browser visual QA

Passed in the in-app browser:

- Desktop 1440 × 1000: the new two-link cycling mechanism, fixed hip, opposite pedals, complete-revolution machine node and dashboard inspected; zero horizontal overflow.
- Mobile 390 × 844: the 405 px canvas, joints, pedal labels, return cue and dashboard inspected without cropping; zero horizontal overflow.
- Interaction: animation pause/resume verified; opening the full-screen prototype held the hero dashboard constant, and closing it resumed updates.
- Motion safeguard: the unchanged `prefers-reduced-motion` path initializes the hero controller in its paused state.
- Prototype: Chinese/English language switch, training cue and global STOP verified.
- Failure scene: `NODE_TIMEOUT_R · 642ms · HAPTICS OFF` visible and bodily cue cleared.
- Console: zero error-level entries after navigation and interaction.
- Handoff: browser viewport reset to its default size and the Chinese project-vision page left open for review.

## Evidence status

- All numerical charts in this review build are illustrative simulation, not participant results.
- The study design is planned, not completed.
- The hero is an original Canvas redraw informed by scientific cycling-linkage references; no journal animation or figure was copied.
- Three linkage/animation references are recorded in `data/sources.json` and `SOURCES.md` with their role and reuse boundary.
- Six manufacturer photographs are attributed and marked replace-before-publication.
- Six tutorial thumbnails are internal reference media linked to their original videos.
- No paper figures or copied tutorial instructions are reproduced.

## Known handoff risk

The pages use browser-native ES modules and should be served over local HTTP. Opening via `file://` can fail because of browser module security rules.
