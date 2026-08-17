# Bowen Mai Brand Intro Design

## Goal

Replace the fleeting `BM` splash with a deliberate, lightweight portfolio signature that presents an original monogram and the name `BOWEN MAI`, remains clearly visible for about one second, then exits through a soft fade.

## Visual concept

The logo is a code-native `BM` monogram built from typography and borders rather than a bitmap or external asset. Two letterforms share one thin square frame and a centre rule, producing a compact mark that matches the portfolio's monochrome editorial system. The full name sits beneath it in spaced capitals, with no slogan or extra explanation.

## Motion sequence

1. **Reveal, 220–280 ms:** the mark rises a few pixels and its frame resolves from slightly reduced scale.
2. **Hold, approximately 1,000 ms:** the mark and `BOWEN MAI` remain fully legible against the black curtain.
3. **Exit, approximately 550 ms:** the whole curtain fades to transparent with a subtle scale increase; it becomes hidden and non-interactive at the end.

The total intro is intentionally around 1.6 seconds. This gives the requested one-second brand hold while keeping the site responsive. Under `prefers-reduced-motion: reduce`, the intro remains disabled as in the existing site.

## Implementation boundaries

- Modify only the existing splash markup and splash styles.
- Keep the portfolio content, navigation, language switching and project overlays unchanged.
- Use semantic decorative markup with `aria-hidden="true"`; the page title and visible header already carry the owner's identity.
- Do not add a JavaScript timer, image request, SVG, font dependency or storage-based “show once” state.
- Keep the intro responsive from 320 px mobile through large desktop screens.

## Acceptance criteria

- The intro contains a distinct `BM` monogram and the exact text `BOWEN MAI`.
- The fully visible hold is at least 1,000 ms before the curtain begins to fade.
- The fade lasts at least 500 ms and ends with `visibility: hidden` and `opacity: 0`.
- The mark has its own entrance animation instead of appearing as unstyled text.
- Reduced-motion users do not receive the splash animation.
- No JavaScript timing dependency is introduced.
