# PedalBalance Echo Prototype Experiment Story

## Problem

The current full-screen prototype presents eleven technical states with equal visual weight. The opening headline is too large for Chinese, the copy explains theory before action, and the right-hand human-machine diagram does not show what the participant does, what the system decides, or what the experiment learns.

## Design

The walkthrough becomes seven participant-facing stages:

1. Experiment question
2. Safe setup
3. Personal baseline
4. Cue training
5. No-cue test
6. Past-self replay
7. Results and interpretation

Every stage uses the same narrative contract:

- `DO`: the participant's immediate action.
- `SYSTEM`: the system's observable decision.
- `CHECK`: the result or experimental question to inspect.

The visual area becomes a four-part evidence flow: pedal input, one-revolution comparison, ankle cue state, and observed outcome. Left/right contribution bars remain illustrative and the screen continues to state that the values are simulated. Safety, calibration, fault handling, trace provenance, and export evidence remain present, but are placed inside the relevant stage instead of appearing as separate theory-heavy chapters.

## Content and language

Chinese, English, and Japanese receive complete localized navigation, headings, explanatory rows, controls, and visual labels. Copy is short, direct, and connected through the experiment sequence. It must not claim that a 50:50 split is universally correct, that pressure is power or torque, or that the prototype has collected a real study result.

## Visual rules

- Keep the portfolio's warm neutral, blue, coral, and black palette.
- Reduce the headline scale and prevent Chinese and Japanese character-by-character wrapping.
- Keep all important content visible at common laptop heights without forcing a long internal scroll.
- Make the current phase and the output state immediately identifiable.
- Preserve keyboard focus trapping, Escape close, global language switching, and STOP OUTPUT.

## Acceptance criteria

- Seven localized stages replace the eleven technical menu items.
- The first screen names the experiment question and shows the complete test sequence.
- Every stage renders localized `DO`, `SYSTEM`, and `CHECK` content.
- Training shows a bounded left-ankle cue; no-cue testing explicitly shows output off.
- Replay remains labelled `past_self`; results remain labelled simulated/planned.
- Desktop and mobile layouts remain readable in Chinese, English, and Japanese.

