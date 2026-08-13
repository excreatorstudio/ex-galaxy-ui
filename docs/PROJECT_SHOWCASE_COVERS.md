# Project Showcase Covers

## Purpose

These are original showcase covers for Awakened project cards, not final commercial campaign assets. Each uses the same low-exposure, indigo-forward visual family so the central E.X Galaxy brand and Hero retain priority.

## Public cover map

| Card | File | Dimensions | Composition |
| --- | --- | ---: | --- |
| FILM / Luxury Real Estate Film | `film-cover.png` | 1570 x 1001 | Dusk modern residence, warm interior reserve |
| AI / AI Visual Campaign | `ai-visual-cover.png` | 1586 x 992 | Translucent petal-like generative form |
| CAMPAIGN / Brand Campaign | `campaign-cover.png` | 1586 x 992 | Unbranded premium product still |
| REEL / City Lights Reel | `reel-cover.png` | 1586 x 992 | Central vertical urban light composition |
| AUDIO / Cinematic Soundtrack | `audio-cover.png` | 1587 x 991 | Abstract cold frequency ribbons |

All images live in `public/assets/galaxy/project-covers/`. `projectCovers.ts` builds relative public paths from `import.meta.env.BASE_URL`, retaining GitHub Pages project-site compatibility.

## Readability and fallback

Cards place a dark surface, a full-image dark overlay, a deeper bottom metadata well, and restrained hover brightness over the covers. If a static image fails to load, its image element is hidden and the existing card gradient is still visible. The image is decorative; localized card copy remains HTML text and is not embedded in an image.
