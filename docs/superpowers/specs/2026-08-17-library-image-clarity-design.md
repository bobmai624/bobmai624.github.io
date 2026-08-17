# Library Image Clarity Design

## Goal

Make every visual in the Unimelb Library Evaluation case study display at the clearest resolution available from its original source, without changing the surrounding portfolio structure or other projects.

## Approach

- Re-render the six selected report pages directly from the original PDF at a 3600-pixel long edge and JPEG quality 94. This doubles each page from 1391×1800 to 2782×3600 and provides more than two source pixels per CSS pixel in the two-column desktop gallery.
- Rebuild the project cover from the new eye-tracking page at 3200×2400 so the full-viewport hero is not enlarged beyond its source resolution.
- Preserve the presentation video at its original 1280×720 resolution. Its poster may not claim detail beyond that source; playback remains the authoritative visual.
- Keep the PDF's 568×303 eye-tracking screenshot within a narrower 840-pixel report-page presentation so the browser does not excessively enlarge the source-limited raster. Other report pages use the full evidence width.
- Add a Library-specific article class, switch its evidence gallery to one readable column, and remove the portfolio-wide colour filter from its document pages. The filter and two-column gallery remain unchanged on every other project.
- Add an automated asset audit that reads the real image headers and fails if a future export falls below the agreed resolution contract.

## Display Contract

- Report pages: at least 2700×3500 pixels.
- Cover: at least 3000×2200 pixels.
- Video poster: at least the 1280×720 source-video resolution.
- Images remain responsive and keep their intrinsic aspect ratio.
- Report pages use the full evidence-column width so embedded screenshots and annotations remain legible.
- No CSS blur, grayscale, saturation or contrast filter is applied to Library report images.

## Verification

Run the automated resolution audit, the full existing test suite, a broken-reference scan, and visual browser checks at desktop and mobile widths. Compare the eye-tracking page against the original PDF and confirm that the image is never upscaled beyond the density contract at the tested viewport.
