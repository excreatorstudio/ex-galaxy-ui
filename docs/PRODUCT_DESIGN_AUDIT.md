# Product Design Audit — E.X Galaxy v1.0

Date: 2026-07-26  
Scope: display-recording visual upgrade, not a product-feature expansion.

## Evidence reviewed

- `references/ui-concept/01-idle-galaxy.png`: a large luminous galaxy with deliberate empty space and a restrained brand treatment.
- `references/ui-concept/02-awakened-interface.png`: interface elements coexist with the galaxy through depth, offsets, and transparency.
- `references/ui-concept/03-module-focus.png`: a luminous system core, functional satellites, thin paths, and an orbital media workspace.
- Local browser states captured during this audit: Loading, Idle, Awakened, and Video Studio.

No RAY reference video was present in `references/` or `assets/`. Its timing and motion language were therefore not claimed as analyzed. An optional Product Design saved-context preflight could not run because neither `python` nor `py -3` is installed in this Windows environment; the Product Design audit itself was completed against the local screens and supplied still references.

## Diagnosis and executable response

| Area | Prototype symptom | Perceived effect | Priority | Implemented engineering response |
|---|---|---|---|---|
| Visual focus | Core, labels, cards and orbit lines competed at equal intensity | No single cinematic focal point | P0 | Enlarged the core, reserved dark surround, reduced broad nebula opacity, concentrated light at the core |
| Galaxy core | Early core read as a simple atomic graphic | Decorative rather than environmental | P0 | Added concentric dust texture, subtle conic arm detail, a layered radial core, slow pulse and inner rings |
| Scale and whitespace | Interface occupied the scene before the galaxy established itself | Conventional web-app density | P0 | Preserved a protected central core zone; interface is staged around it |
| Depth | Far stars, cards and controls had limited separation | Flat prototype appearance | P0 | Defined far/mid/near opacity layers, card shadows, blur-in and delayed constellation reveal |
| Light and colour | Similar blue-violet glow applied to many objects | Risk of generic sci-fi glow | P0 | Dark reserve remains dominant; active core and active path use the brightest cold-white rim only |
| Stars and nebula | Starfield was functional but visually uniform | Static-wallpaper impression | P1 | Reinforced different depth opacities and restrained nebula colour fields without increasing particle counts |
| Orbit and data flow | Orbit lines existed without hierarchy | Diagrammatic rather than alive | P1 | Strengthened thin orbit lines and lit connection state; retain data motion for active workflow only |
| Brand typography | Awakened wordmark was visually too dominant | Brand blocked the environmental core | P1 | Settles brand with blur/scale rather than a new large overlay; keep the brand secondary to the core |
| Floating cards | Cards appeared as comparable gradient tiles | Dashboard feeling | P0 | Delayed each card independently, used depth blur/scale entrance and heavier lower shadow on hover |
| Interface reveal | Multiple elements appeared nearly together | Generic fade-in | P0 | Navigation, core/brand, constellation, cards, bottom bar and footer now have distinct timing bands |
| Loading ritual | Thin line and core were clean but low-energy | More loader than system initialization | P1 | Retained the thin line; reinforced the same cold-light language for continuity rather than adding a spinner |
| Idle immersion | Good purity, but insufficient core environmental scale | A calm screen rather than a destination | P0 | Expanded the CSS galaxy, added slow ambient drift and protected negative space |
| Awakened impact | Navigation looked like a standard glass toolbar | App shell overlays the galaxy | P0 | Top bar now enters late from depth while cards and module planets summon in sequence |
| Module focus | Focus did not feel like a deeper system layer | Route-change impression | P1 | Added radial dimming, focus-grid contrast and a stronger return control surface |
| Video Studio core | Core was a glowing circle | Generic control button | P0 | Added nested rotating/dashed rings, layered radial material, stronger central halo and active-path lines |
| Video Studio nodes | Equal round nodes had weak functional identity | Tool palette rather than neural workflow | P0 | Added semantic node classes with distinct restrained material accents and internal orbit geometry |
| Media orbit and timeline | Lower panels read as ordinary containers | Weak sense of generated workflow | P1 | Added darker material separation and a restrained core-facing workspace hierarchy |
| Presentation rhythm | Existing script was structurally sound | Needs stronger staging in scenes | P1 | Existing presentation remains isolated; inherited reveal system improves each screenplay stop |
| Responsive density | Cards could become overly dense at narrow widths | Risk of central-core obstruction | P1 | Existing breakpoint reduction retained; impact CSS scales core and nodes down before controls fail |
| Dashboard/web-prototype risk | Equal panels and equal glow | Commodity dashboard / game UI risk | P0 | Asymmetry, delayed reveal, dark reserve and selective brightness replace equal treatment |
| Cheap sci-fi risk | More bloom could have been an easy but harmful fix | RGB/e-sports appearance | P0 | No global bloom, rainbow colour or rapid flicker added |

## Priority outcome

### P0 — completed in this pass

- A centralized visual-impact token layer.
- A larger, layered, environmental CSS galaxy core with reserved negative space.
- Staged awakened-interface and module-constellation emergence.
- Stronger, functionally differentiated Video Studio auto-create core and nodes.
- Higher-contrast, lower-density card and studio-surface hierarchy.

### P1 — completed where low risk

- Card blur/scale entrance and hover elevation.
- More decisive Module Focus dimming and return-control surface.
- Reinforced visual continuity between loading, idle, and studio.

### P2 — deferred intentionally

- True 3D camera movement and WebGL particle field.
- RAY-specific timing study if a legally usable local reference video is supplied.
- Automated screenshot/performance-regression baseline across the full device matrix.

