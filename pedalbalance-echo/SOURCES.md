# PedalBalance Echo Source and Media Register

Verified: 2026-08-16

The machine-readable source of truth is `data/sources.json`. This file explains how to use it when reviewing or publishing the portfolio.

## Media rules

- Six component photographs from Seeed, Adafruit and DFRobot are stored locally so the review build remains stable.
- These photographs are attributed product references, not the project author's own build evidence.
- Because no general reuse licence was confirmed for those photographs, every component image is marked `replace-before-publication`.
- Six YouTube thumbnails are stored as attributed `internal-reference` cards. The page links to the original video and does not embed or copy its teaching content.
- Paper figures are not downloaded. The site redraws mechanisms in its own visual language and cites the source.

## Open-source boundaries

| Project | Licence | Planned use |
|---|---|---|
| qppd/smart-chair | MIT | Calibration, EMA, non-blocking haptic and logging patterns |
| jamesjmtaylor/esp32-ftms-server | MIT | Hall cadence and mechanical mount patterns |
| Adafruit_DRV2605_Library | MIT | I2C initialisation and haptic effect selection |
| Brillnova/Insole-Pressure-Sensor | CC BY-NC 4.0 | Non-commercial future reference only; not required by MVP |

Official documentation, tutorial videos, product media and open-source code are deliberately separate source types. Linking to an official guide does not make its photographs or prose open-source.

## Scientific linkage visual

The revised Page 1 animation is an original Canvas reconstruction informed by three sources: Park, Caldwell and Umberger's planar OpenSim pedalling model; the OpenSim Educational Cycling Model; and Sauren et al.'s lower-limb cycling-animation paper. The site borrows the scientific abstraction—fixed pelvis, rigid leg segments, feet constrained to opposite pedals—not any paper video, figure, OpenSim render or third-party SVG asset. Exact citations, licences and verification dates are recorded in `data/sources.json` as `PAPER-PARK-PEDALING`, `DOC-OPENSIM-CYCLING` and `PAPER-SAUREN-ANIMATION`.

## Nine presentation-method influences

The interactive model uses nine academic projects as presentation references. It does not copy their figures, videos, slides, interface assets or validation claims; every displayed mechanism is an original HTML/CSS representation of PedalBalance Echo.

| Primary source | Presentation method translated into PedalBalance |
|---|---|
| [Proprioceptive Interaction](https://hpi.de/baudisch/projects/proprioceptive.html) | Define bodily input and output with one closed-loop diagram. |
| [HERMITS](https://tangible.media.mit.edu/project/hermits/) | Explain an invisible system as modular mechanical units with one role each. |
| [Muscle-Propelled Force Feedback](https://hpi.de/baudisch/projects/muscle-propelled-force-feedback.html) | Separate normal action, machine intervention and voluntary response in three frames. |
| [SwarmHaptics](https://shape.stanford.edu/research/2019-SwarmHaptics/) | Map the design space before showing scenarios and study outcomes. |
| [Wireality](https://www.futureinterfaces.com/research/2020/wireality) | Put quantified system facts directly beside the mechanism. |
| [PantoGuide](https://shape.stanford.edu/research/pantoguide/) | Begin with the participant's real task, then compare clear guidance conditions. |
| [Linked-Stick](https://tangible.media.mit.edu/project/linkedstick/) | Make cross-time physical replay and source identity visible. |
| [Breaking It Down Is Better](https://pmc.ncbi.nlm.nih.gov/articles/PMC4015469/) | Put baseline, training, withdrawal, retention and transfer on one timeline. |
| [Robotic Assistance vs Visual Demonstration](https://pmc.ncbi.nlm.nih.gov/articles/PMC1569852/) | Separate assisted performance from unaided reproduction and learning evidence. |

The exact lineage records are stored in `data/sources.json` under the `METHOD-*` identifiers. These sources support communication structure and experimental caution; they do not validate this planned PedalBalance study.

## Publication action

Before adding this project to a public portfolio, replace the six product photographs with original photographs of the purchased parts and installed prototype. Keep the source links because they document selection, limitations and learning lineage.
