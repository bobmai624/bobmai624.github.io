# Validation Record

Date: 2026-08-17  
Build: local review prototype  
Status: passed

## Completed automated checks

- Core model/content suite: 49/49 passed after the nine-method presentation redesign.
- Hero model: two rigid planar leg links per side, fixed hip joints, exactly opposite pedal targets, forward-bending knees, fixed foot-to-pedal attachment, bounded values and complete-revolution cue logic.
- Experiment model: deterministic synthetic data, invalid-revolution exclusion, cue-dose summary, neutral `simulated_matched_other` provenance.
- Prototype state machine: calibration gate, valid setup sequence, global STOP, fail-safe output clearing, replay provenance.
- Content contracts: three shared pages, balanced trilingual copy, local images, component/source lineage, research status and limitations.
- Prototype flow: nine participant-facing scenes, complete Chinese/English/Japanese action-system-check copy, cue/no-cue controls, past-self provenance and semantic CJK title breaks.
- Presentation system: nine distinct visual grammars—closed loop, modular mechanism, causal sequence, design-space matrix, system facts, task conditions, replay provenance, study timeline and evidence comparison.
- Final validator checks local assets, duplicate IDs, image alternatives, HTTPS sources, three-language counts, the nine-scene prototype story, safety boundaries and handoff documentation.
- Complete suite after final handoff validation: 49/49 passed.

## Browser visual QA

Passed in the in-app browser:

- Desktop 1440 × 900: the nine-scene navigation and representative loop, causal-sequence, system-facts and evidence layouts inspected; zero horizontal overflow.
- Large desktop 2048 × 1338: all nine Chinese, English and Japanese scene titles inspected; zero title overflow into the visual column.
- Mobile 390 × 844: scene 01, scene 03 and scene 09 inspected with horizontal scene navigation and vertically scrolling evidence content; zero horizontal overflow.
- Title regression fixture: the nine Chinese titles report `maxTitleOverflow = 0` at 2048 × 1338 after container-relative sizing and natural CJK wrapping.
- Interaction: animation pause/resume verified; opening the full-screen prototype held the hero dashboard constant, and closing it resumed updates.
- Motion safeguard: the unchanged `prefers-reduced-motion` path initializes the hero controller in its paused state.
- Prototype: Chinese/English/Japanese switching inside the open overlay, route and scene preservation, localized navigation, left-ankle training cue, no-cue output-off state, global STOP and Escape-to-close verified.
- Console: zero error-level entries after navigation and interaction.
- Handoff: browser viewport reset to its default size and the Chinese project-vision page left open for review.

## Evidence status

- All numerical charts in this review build are illustrative simulation, not participant results.
- The study design is planned, not completed.
- The hero is an original Canvas redraw informed by scientific cycling-linkage references; no journal animation or figure was copied.
- Three linkage/animation references and nine academic presentation-method references are recorded in `data/sources.json` and `SOURCES.md` with their role and reuse boundary.
- Six manufacturer photographs are attributed and marked replace-before-publication.
- Six tutorial thumbnails are internal reference media linked to their original videos.
- No paper figures or copied tutorial instructions are reproduced.

## Known handoff risk

The pages use browser-native ES modules and should be served over local HTTP. Opening via `file://` can fail because of browser module security rules.
