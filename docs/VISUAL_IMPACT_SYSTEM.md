# E.X Galaxy Visual Impact System

## Principles

1. **Scale:** the galaxy is an environment first; UI is a sparse layer within it.
2. **Depth:** far field is muted, mid field defines orbital topology, foreground is crisp only when actionable.
3. **Light:** retain at least two thirds of the viewport as dark reserve; give the brightest cold-white energy to one active locus.
4. **Motion:** long ambient cycles establish weight; short staged reveals establish intent; data pulses exist only on active routes.
5. **Whitespace:** do not cover the center with cards or always-on utility UI.
6. **Brand:** wide-tracked E.X language is a spatial cue, never a blocking dashboard masthead.
7. **UI emergence:** surfaces arrive with opacity, small depth shift and temporary blur, not a simultaneous fade.
8. **Data:** thin directional paths and few moving points communicate work better than continuous glow.
9. **Focus:** an active module dims its context before it brightens its own core.
10. **Restraint:** no global bloom, rainbow gradients, high-frequency flicker, or equal-size/equal-brightness panels.

## Engineering tokens

The executable source is `src/styles/tokens.css`, `src/styles/impact.css`, and `src/config/designTokens.ts`.

| Group | Token/value | Use |
|---|---|---|
| Base colour | `--void #02040a`, `--midnight #060a18` | dark reserve and scene edges |
| Cold light | `--ice #e8f1ff`, `--mist #a9bde9`, `--blue #86a8ff`, `--violet #b69bf0` | text, core rim, restrained accents |
| Surface | `rgba(10,18,42,.72)` | required glass surfaces only |
| Border | `rgba(173,199,255,.28)` | hairline structure |
| Core glow | `0 0 32px #8da9ff88, 0 0 110px #5d6dce55` | localized active-core energy |
| Depth | far `.32`, mid `.62`, near `.9`, interface `1` | visual stack opacity |
| Core scale | `min(61vw, 890px)` desktop, `112vw` compact mobile | environmental scale without a bitmap |
| Nebula | opacity `.30`, blur `58px` | low-frequency colour atmosphere |
| Orbit | 1px, alpha approximately `.30`–`.45` | precise but recessive topology |
| Stars | High `190`, Balanced `115`, Low `55` | quality preset density |
| Parallax | max `18px`; layered factors `.15` and `.62` | controlled depth without camera shake |
| Cards | blur-in `5px`, rise `36px`, duration `.82s` | summoned foreground material |
| Radius | existing compact pills/circles; preserve circles only for planets/nodes | avoid uniform card geometry |
| Typography | UI labels `7–10px` tracked, display headers `18–30px` | precise control text; legible title hierarchy |

## Quality and motion reduction

- Balanced remains default and limits programmatically generated stars to 115.
- High and Low only change star density; no costly post-processing was added.
- Motion Off and `prefers-reduced-motion` keep state, focus and affordance but allow existing reduced-motion rules to suppress ambient/entry animation.
- No renderer, API, external font, image service, or runtime dependency was added.

