# Validation Record

Date: 2026-08-17  
Build: local review prototype  
Status: passed

## Completed automated checks

- Core model/content suite: 43/43 passed after the interaction-model redesign.
- Hero model: two rigid planar leg links per side, fixed hip joints, exactly opposite pedal targets, forward-bending knees, fixed foot-to-pedal attachment, bounded values and complete-revolution cue logic.
- Experiment model: deterministic synthetic data, invalid-revolution exclusion, cue-dose summary, neutral `simulated_matched_other` provenance.
- Prototype state machine: calibration gate, valid setup sequence, global STOP, fail-safe output clearing, replay provenance.
- Content contracts: three shared pages, balanced trilingual copy, local images, component/source lineage, research status and limitations.
- Prototype flow: seven participant-facing experiment stages, complete Chinese/English/Japanese action-system-check copy, cue/no-cue controls, past-self provenance and semantic CJK title breaks.
- Final validator checks local assets, duplicate IDs, image alternatives, HTTPS sources, three-language counts, the seven-stage prototype story, safety boundaries and handoff documentation.
- Complete suite after final handoff validation: 43/43 passed.

## Browser visual QA

Passed in the in-app browser:

- Desktop 1440 × 900: the seven-stage experiment navigation and input → decision → cue → observation evidence flow inspected; zero horizontal overflow.
- Mobile 390 × 844: semantic Chinese/Japanese heading breaks, horizontal stage navigation and vertically scrolling evidence flow inspected without clipping; zero horizontal overflow.
- Interaction: animation pause/resume verified; opening the full-screen prototype held the hero dashboard constant, and closing it resumed updates.
- Motion safeguard: the unchanged `prefers-reduced-motion` path initializes the hero controller in its paused state.
- Prototype: Chinese/English/Japanese switching inside the open overlay, localized navigation, left-ankle training cue, no-cue output-off state and global STOP verified.
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
