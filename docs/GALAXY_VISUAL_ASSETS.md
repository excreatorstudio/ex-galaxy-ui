# Galaxy Visual Asset Integration

## Runtime boundary

The supplied image set is used only by `GalaxyScene`, the ambient Hero renderer. It does not enter `VideoStudio`, `ProjectCoreActivationController`, the Core breathing timeline, Presentation timing, locale state, or the optional Spatial Canvas.

`GalaxyScene` supplies every image URL from `import.meta.env.BASE_URL`. This retains the relative `./` base used by the static GitHub Pages and LAN builds. The existing CSS galaxy stays mounted below the artwork, so its procedural background remains visible if image delivery fails.

## Audited source files

| Source file | Dimensions | Alpha | Runtime mapping |
| --- | ---: | --- | --- |
| `reference/galaxy-master-composite.png` | 1672 x 941 | No (RGB) | Idle entry full visual |
| `reference/galaxy-home-master-composite.png` | 1717 x 916 | No (RGB) | Awakened / Module Focus atmospheric base |
| `core-visual/galaxy-background-base.png` | 1772 x 888 | No (RGB) | Underlying Hero artwork base / image fallback |
| `core-visual/galaxy-nebula-glow.png` | 1672 x 941 | Yes (ARGB) | Home nebula layer |
| `core-visual/galaxy-orbit-rings.png` | 1672 x 941 | Yes (ARGB) | Home orbit layer |
| `core-visual/galaxy-core-glow.png` | 1254 x 1254 | Yes (ARGB) | Home central glow layer |
| `core-visual/galaxy-core-particles.png` | 1254 x 1254 | Yes (ARGB) | Home central particle layer |
| `core-visual/galaxy-ex-outline.png` | 1536 x 1024 | Yes (ARGB) | Home E.X outline layer |
| `core-visual/galaxy-stars-foreground.png` | 1672 x 941 | Yes (ARGB) | Home foreground-star layer |
| `core-visual/galaxy-atmosphere-overlay.png` | 1672 x 941 | Yes (ARGB) | Home atmosphere finishing layer |

## Visibility and fallback

- `idle`: shows the entry composite at reduced brightness and saturation. The procedural CSS galaxy and RGB background base remain behind it.
- `awakened` and non-Video `module-focus`: show the home composite at `0.09` opacity, then all seven transparent core-visual overlays at independently low intensity. Existing live CSS stars, core, module controls, and interface remain in place.
- `Video Studio`: does not use either composite, Hero core glow, Hero particles, or E.X outline. Its local functional scene uses the RGB background base, low nebula, cold orbit rings, sparse stars, and very low atmosphere below the workflow and Auto Create Core.
- `loading`: continues to use the existing Loading screen; its timing is unchanged.
- Image delivery failure: no JavaScript fallback timer or state change is introduced. The existing procedural CSS galaxy remains rendered beneath unavailable image layers.

## Build impact

All ten supplied PNGs are copied from `public/` to `dist/assets/galaxy/` verbatim. They add 17,565,913 bytes of static output and are loaded as CSS background layers, not bundled into the JavaScript chunks.
