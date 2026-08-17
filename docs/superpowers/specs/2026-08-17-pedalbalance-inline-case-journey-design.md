# PedalBalance Inline Case Journey Design

## Objective

Rebuild the PedalBalance Echo project page so a visitor can understand the complete project by scrolling, without opening the interactive prototype or clicking through scenes. The page must explain the problem, mechanism, making process, participant journey, study logic and evidence boundary as one continuous case-study journal.

## Chosen approach

Use a single-page scroll journey as the primary narrative. Keep the interactive prototype only as an optional lab at the end.

Two alternatives were rejected:

- Keeping the nine-scene popup as the main explanation still hides the mechanism behind repeated clicks.
- Splitting the story into tabs or accordions reduces page length but makes readers reconstruct the sequence themselves.

## Reader outcome

Within the first screen and the next section, a visitor must understand:

1. two pedal inputs are accumulated over one complete revolution;
2. the machine decides whether a persistent imbalance exists;
3. a brief cue returns to the lower-contributing ankle;
4. the rider voluntarily corrects the next revolution;
5. assisted performance is not treated as learning.

No click is required to see this loop. A chapter link may move the reader to a later section, but it must never be required to reveal content.

## Narrative structure

### 00 — Project in 30 seconds

The hero presents one sentence, the animated cycling model, four structural facts and one `Start the journey` anchor. The hero no longer promotes the popup.

### 01 — Why this problem matters

Show the translation burden of a screen and the simpler left cue / silence / right cue rule. The section answers why bodily feedback is being explored.

### 02 — How the loop works

Display `SENSE → DECIDE → CUE → CORRECT` as one always-visible four-stage mechanism. The complete-revolution rule sits beside the loop rather than on a separate hidden screen.

### 03 — One revolution, three moments

Use three large frames: pedal naturally, machine waits and decides, rider corrects the next revolution. This is the dominant explanation of the interaction and must appear without controls.

### 04 — How the prototype is assembled

Condense the making page into three inspectable modules: pedal sensing, machine interpretation and ankle return. Add three evidence gates: repeated relative response, one Hall event per revolution and fail-safe output clearing. Link to the detailed making page for readers who want the bill of materials and mounting details.

### 05 — What the participant experiences

Place `BASELINE → TRAINING → NO CUE → 24 H RETENTION → TRANSFER` on one timeline. Explain adaptive feedback and past-self replay as two questions inside that journey, not as separate navigation destinations. Link to the detailed experiment page for the full condition matrix and measures.

### 06 — What counts as evidence

Separate three claims: the mechanism runs, cues help current performance, and the rider learns without cues. State that the current build is an illustrative simulation and planned study. Preserve the stationary indoor, vibration-only, relative-pressure-proxy and no-DIY-EMS boundaries.

### 07 — Continue exploring

Offer the interactive nine-scene lab, detailed making page, detailed study page, primary references and source download. This is the only primary-page location that opens the popup.

## Navigation

Add a compact sticky chapter rail after the hero with anchors for `Overview`, `Loop`, `Build`, `Study` and `Evidence`. It follows normal document scrolling and uses no scroll-jacking. All chapter content remains in the DOM and is readable with JavaScript disabled.

## Visual system

- Retain the restrained paper, ink, blue, coral and green palette.
- Give each chapter one dominant diagram and one short explanatory paragraph.
- Use numbered chapter labels and strong dividers to make reading progress obvious.
- Avoid giant copy that competes with the diagram.
- Keep the animated hero, but make the static mechanism understandable when animation is paused.
- Reuse existing HTML/CSS shapes; do not add copied academic figures.

## Language and accessibility

- Chinese, English and Japanese must contain the same narrative blocks.
- Language switching must keep the reader on the same page and current scroll position.
- Anchors, headings, lists and links must remain semantic.
- The sticky rail must be keyboard reachable and horizontally scrollable on mobile.
- The optional popup must retain its existing close, stop-output and focus behavior.

## Validation

- Automated tests confirm all seven journal chapters, the five-stage participant timeline, trilingual parity and exactly one optional popup entry on the main page.
- Desktop checks at 1440 × 900 and 2048 × 1338 confirm the first mechanism is visible without opening the popup and no horizontal overflow occurs.
- Mobile check at 390 × 844 confirms the chapter rail, titles, timeline and diagrams remain readable without clipping.
- Chinese, English and Japanese switching is checked at the same journey position.
- Public GitHub Pages assets are checked after deployment.
