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

## Publication action

Before adding this project to a public portfolio, replace the six product photographs with original photographs of the purchased parts and installed prototype. Keep the source links because they document selection, limitations and learning lineage.
