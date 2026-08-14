# Galaxy Visual Asset Source and Scene Mapping

## Source verification

The ten supplied runtime PNGs were inspected from `public/assets/galaxy/` rather than inferred from configuration. The two master composites are opaque RGB images. The eight core-visual layers are 8-bit RGBA PNGs with real transparent coverage; they are not empty alpha placeholders.

| File | Dimensions | Channel / alpha evidence | Production URL | Runtime source status |
| --- | ---: | --- | --- | --- |
| `reference/galaxy-master-composite.png` | 1672 × 941 | RGB, no alpha | `./assets/galaxy/reference/galaxy-master-composite.png` | Rendered by `GalaxyScene` only in Idle; primary entry artwork |
| `reference/galaxy-home-master-composite.png` | 1717 × 916 | RGB, no alpha | `./assets/galaxy/reference/galaxy-home-master-composite.png` | Rendered by `GalaxyScene` only in Awakened / non-Video Module Focus |
| `core-visual/galaxy-background-base.png` | 1772 × 888 | RGB, no alpha | `./assets/galaxy/core-visual/galaxy-background-base.png` | Homepage layer 1; Video Studio layer 1; CSS fallback support |
| `core-visual/galaxy-nebula-glow.png` | 1672 × 941 | RGBA; alpha 0–253, 81.58% non-zero sample coverage | `./assets/galaxy/core-visual/galaxy-nebula-glow.png` | Homepage layer 3; Video Studio layer 2 |
| `core-visual/galaxy-orbit-rings.png` | 1672 × 941 | RGBA; alpha 0–253, 57.04% non-zero sample coverage | `./assets/galaxy/core-visual/galaxy-orbit-rings.png` | Homepage layer 4; Video Studio layer 3 |
| `core-visual/galaxy-core-glow.png` | 1254 × 1254 | RGBA; alpha 0–253, 63.45% non-zero sample coverage | `./assets/galaxy/core-visual/galaxy-core-glow.png` | Homepage layer 5 only; excluded from Video Studio |
| `core-visual/galaxy-core-particles.png` | 1254 × 1254 | RGBA; alpha 0–255, 49.79% non-zero sample coverage | `./assets/galaxy/core-visual/galaxy-core-particles.png` | Homepage layer 6 only; excluded from Video Studio |
| `core-visual/galaxy-ex-outline.png` | 1536 × 1024 | RGBA; alpha 0–252, 15.97% non-zero sample coverage | `./assets/galaxy/core-visual/galaxy-ex-outline.png` | Homepage layer 7 only; excluded from Video Studio |
| `core-visual/galaxy-stars-foreground.png` | 1672 × 941 | RGBA; alpha 0–252, 63.86% non-zero sample coverage | `./assets/galaxy/core-visual/galaxy-stars-foreground.png` | Idle support, Homepage layer 8, Video Studio layer 4 |
| `core-visual/galaxy-atmosphere-overlay.png` | 1672 × 941 | RGBA; alpha 0–254, 71.58% non-zero sample coverage | `./assets/galaxy/core-visual/galaxy-atmosphere-overlay.png` | Idle support, Homepage layer 9, Video Studio layer 5 |

The alpha coverage values are sampled from the decoded PNG rows; the source files retain soft alpha and do not contain fully opaque overlay pixels in the sampled grids, which is expected for glow, atmosphere, particles, and line-work assets.

## Scene contracts

The mapping is centralized in `src/config/galaxyVisualAssets.ts` and consumed by `GalaxyScene` / `VideoStudio`:

| Scene | Primary image source | Transparent layers actually rendered | CSS/procedural fallback |
| --- | --- | --- | --- |
| Idle | `galaxy-master-composite` | `stars`, `atmosphere` as a separate two-layer support stack | Low-opacity procedural stars, nebula, core, orbit, and base |
| Awakened Homepage | `galaxy-home-master-composite` plus `background-base` | `nebula`, `orbits`, `core-glow`, `core-particles`, `ex-outline`, `stars`, `atmosphere` | Low-opacity procedural universe remains behind the supplied stack |
| Non-Video Module Focus | Same Homepage contract | Same eight-layer Home mapping | Same fallback, with module-focus UI above it |
| Video Studio | No master composite | `background-base`, `nebula`, `orbits`, `stars`, `atmosphere` in the local functional scene | GalaxyScene remains a dim CSS fallback; Auto Create Core is independent |

## What changed from the previous source wiring

The previous implementation did contain the ten URLs, but it exposed every URL as an inline CSS variable on every `GalaxyScene` phase and mounted the entire Hero visual stack before CSS hid it. That made source ownership ambiguous: Idle did not have a separate image support stack, Video Studio's root style still carried the Hero composite URLs, and the transparent Homepage layers had no explicit stack above the scene vignette. The layers could therefore be technically present while the procedural galaxy remained the dominant reading.

The current implementation makes the scene contract observable in the DOM:

- `data-scene-role="idle"` and `data-asset-stack="idle"` identify the entry composite and its two quiet support layers.
- `data-scene-role="homepage"` and `data-asset-stack="homepage"` identify the Home composite and all seven transparent overlays (the base is the separate first layer).
- Video Studio has its own `data-asset-stack="video-studio"` with exactly five `<i>` layers. Neither master composite, Hero core glow, particles, nor E.X outline is rendered there.
- Inline asset variables are filtered to the active scene; Video Studio no longer carries the two master-composite URLs.
- Explicit z-index places the supplied image stack above the fallback vignette and keeps the procedural universe secondary.
- CSS custom-property URLs are resolved against `document.baseURI` before entering the stylesheet. This avoids the emitted CSS-file-relative `/assets/assets/galaxy/...` failure while retaining the `./assets/galaxy/...` Vite base for GitHub Pages.

## Final scene balance

Desktop values are listed first; the mobile values are the reduced values in parentheses.

### Idle

- Entry composite opacity: `.86` (`.80`), `brightness(.70)` / `saturate(.72)`; mobile uses `brightness(.64)` / `saturate(.68)`.
- Base fallback opacity: `.035`.
- Asset stars opacity: `.08` (`.06`), Screen blend, `brightness(.44)`.
- Asset atmosphere opacity: `.035` (`.025`), Normal blend, `brightness(.38)`.
- Procedural nebula / stars / core / orbit are limited to `.035` / `.08` / `.11` / `.08`.

### Awakened Homepage and non-Video Module Focus

- Base: `.42`, `brightness(.42) saturate(.56)`.
- Home master composite: `.16` (`.11` mobile), `brightness(.52) saturate(.62) contrast(.94)`.
- Nebula: `.12` (`.09`), Screen blend, `brightness(.48)`.
- Orbit rings: `.21` (`.15`), Screen blend, `brightness(.58)`.
- Core glow: `.12` (`.09`), Screen blend, `brightness(.44)`.
- Core particles: `.12` (`.09`), Screen blend, `brightness(.54)`.
- E.X outline: `.065` (`.04`), Screen blend, `brightness(.46)` and slight blur so it remains a background echo rather than a second HTML wordmark.
- Foreground stars: `.10` (`.075`), Screen blend, `brightness(.48)`.
- Atmosphere: `.05` (`.028`), Normal blend, `brightness(.42)`.
- Procedural nebula / stars / core / orbit are limited to `.055` / `.10` / `.14` / `.12`.

### Video Studio

The existing functional five-layer balance is preserved: base `.20` (`.16` mobile), nebula `.09` (`.06`), orbit `.17` (`.12`), stars `.09` (`.06`), atmosphere `.045` (`.03`). Nebula, orbit, and stars use Screen blending with reduced brightness/saturation. The root `GalaxyScene` fallback base is only `.04` (`.028`) and all Hero composites / Hero-only layers are absent.

## Fallback and deployment

The CSS procedural universe remains mounted and does not own application phase, loading, transition, Presentation, or Video Studio activation state. A missing public image therefore leaves a dark CSS fallback instead of a blank page. The ten files remain under `public/`, are copied to `dist/assets/galaxy/`, and are referenced with `import.meta.env.BASE_URL` (`./` in the Vite config); no PNG bytes are embedded in JavaScript.

The ten-source set contributes **17,565,913 bytes** to static output. Local production preview checks returned HTTP 200 for all ten canonical `/assets/galaxy/...` URLs. The currently published GitHub Pages build was also inspected: its stale computed URLs are `/assets/assets/galaxy/...` and all ten observed requests return HTTP 404, so public HTTP 200 acceptance requires redeploying this corrected build.
