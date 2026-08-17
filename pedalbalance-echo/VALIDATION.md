# Validation Record

Date: 2026-08-17  
Build: local review prototype  
Status: passed

## Completed automated checks

- Core model/content suite: 56/56 passed after the scroll-first case-journey redesign and the Lego-style making-journal expansion.
- Hero model: two rigid planar leg links per side, fixed hip joints, exactly opposite pedal targets, forward-bending knees, fixed foot-to-pedal attachment, bounded values and complete-revolution cue logic.
- Experiment model: deterministic synthetic data, invalid-revolution exclusion, cue-dose summary, neutral `simulated_matched_other` provenance.
- Prototype state machine: calibration gate, valid setup sequence, global STOP, fail-safe output clearing, replay provenance.
- Content contracts: three shared pages, balanced trilingual copy, local images, component/source lineage, research status and limitations.
- Main-page journey contract: `00–07` sections, always-visible four-step mechanism, three-moment revolution, five-stage study timeline, matching Chinese/English/Japanese blocks and exactly one popup trigger in the optional final lab.
- Making-page instruction contract: one direct `#assembly` entry, 12 always-visible part IDs, 6 inline assembly modules, 24 action cards, one visible completion check per action and one stop condition per module. No required assembly instruction is hidden in a `details` element or modal.
- Prototype flow: nine participant-facing scenes, complete Chinese/English/Japanese action-system-check copy, cue/no-cue controls, past-self provenance and semantic CJK title breaks.
- Presentation system: nine distinct visual grammars—closed loop, modular mechanism, causal sequence, design-space matrix, system facts, task conditions, replay provenance, study timeline and evidence comparison.
- Final validator checks local assets, duplicate IDs, image alternatives, HTTPS sources, three-language counts, the nine-scene prototype story, safety boundaries and handoff documentation.
- Complete suite after final handoff validation: 56/56 passed.
- Local HTTP smoke: making page and versioned stylesheet returned 200; the served HTML exposed 12 part IDs, 6 modules, 24 actions, 24 checks and 6 stop conditions.

## Browser visual QA

Passed in the in-app browser:

- Desktop 1440 × 900: the revised hero, sticky chapter rail and always-visible `SENSE → DECIDE → CUE → CORRECT` mechanism inspected; zero page-level horizontal overflow and the popup remained closed by default.
- Large desktop 2048 × 1338: the five-stage participant timeline, two research questions and all visible Chinese headings inspected; zero heading overflow.
- Mobile 390 × 844: the core loop, chapter navigation, Chinese study introduction and horizontally scrollable five-stage timeline inspected; zero page-level horizontal overflow.
- Language continuity: Chinese → English at the Study chapter retained the same chapter and URL hash; English → Japanese at the optional lab preserved the lab at effectively the same viewport position.
- Optional lab: the only main-page popup trigger opened the nine-scene lab, and Close returned to the same end-of-journey reading position.
- Title regression fixture: the nine Chinese titles report `maxTitleOverflow = 0` at 2048 × 1338 after container-relative sizing and natural CJK wrapping.
- Interaction: animation pause/resume verified; opening the full-screen prototype held the hero dashboard constant, and closing it resumed updates.
- Motion safeguard: the unchanged `prefers-reduced-motion` path initializes the hero controller in its paused state.
- Prototype: Chinese/English/Japanese switching inside the open overlay, route and scene preservation, localized navigation, left-ankle training cue, no-cue output-off state, global STOP and Escape-to-close verified.
- Console: zero error-level entries after navigation and interaction.
- Handoff: browser viewport reset to its default size and the updated project journey left open for review.

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
