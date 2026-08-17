# PedalBalance Echo Lego-Style Build Journal Design

## Goal

Turn the existing Prototype & Making page into an inline, step-by-step build journal that explains every physical part, assembly action, check and stop condition without requiring a popup or repeated clicks.

## Reading model

The page reads like a paper construction manual:

1. **System map** — show the finished system and its three node responsibilities.
2. **Parts tray** — give every required item a stable part number, quantity and role.
3. **Six assembly modules** — bench preparation, one pressure module, two body nodes, Hall boundary, coordinator, and stationary integration.
4. **Bench proof** — show what evidence permits the next stage.
5. **Supporting evidence** — retain reuse, tutorial, schedule, budget and exclusions after the main build story.

All primary instructions remain expanded in the document. Filters may remain for browsing the component library, but no required step depends on a filter, accordion or modal.

## Instruction card contract

Each assembly module contains:

- an output statement describing what the module produces;
- a compact part-callout row using `P01`–`P12` identifiers;
- three or more sequential instruction cards;
- one concrete action per card;
- a `CHECK` line describing the visible or measurable completion state;
- a `STOP` line where unsafe or invalid conditions require correction;
- an evidence artefact that belongs in the project journal.

The copy is complete in Chinese, English and Japanese. Technical names and pin labels remain in their conventional form where translation would reduce precision.

## Visual system

- Use the existing paper, ink, muted blue and muted coral palette.
- Treat the parts tray as a numbered catalogue and the assembly steps as large editorial rows.
- Use existing high-resolution manufacturer images only for identification, with attribution and replacement notes preserved.
- Use CSS-native diagrams and labels for wiring, layer stacks and keep-out zones; do not introduce decorative illustration.
- On mobile, cards stack vertically and part-callout strips scroll only when necessary; the page itself must not overflow horizontally.

## Safety and evidence boundaries

- This is a documented research build plan, not evidence of completed hardware.
- FSR readings are relative pressure trends, not power, torque, strength or medical measurements.
- The body-facing output is vibration only. DIY EMS, TENS and FES remain explicitly excluded.
- Human use starts only after bench checks pass; rotating parts, loose wires, battery modification and direct prolonged soldering of FSR tails remain excluded.
- Optional read-only sEMG remains outside the core build and never controls feedback.

## Acceptance criteria

- The first required assembly sequence is reachable from the page header with one anchor jump and otherwise by normal scrolling.
- At least six inline build modules and eighteen numbered action steps are present.
- Every step exposes a visible check result; safety-critical modules expose a stop condition.
- The parts tray covers compute, sensing, return, mounting, power and tools.
- Chinese, English and Japanese content counts remain matched.
- Existing component sources, tutorial references, build gates, source download and project navigation remain available.
- Desktop and mobile layouts have no page-level horizontal overflow or console errors.
