# UI Motion Specification — Visual Upgrade

## Video Studio Creative Orbit activation boundary

The 5600ms core activation is deliberately scoped to `VideoStudio`'s Auto Create sphere. Its position anchor is immutable; only the inner visual scale, brightness, halo opacity/scale and Energy Ring evolve. The Galaxy Hero keeps its original ambient pulse and must never receive this workflow sequence. Mobile uses 4800ms/two halos and Reduced Motion uses the existing 760ms non-pulsing reveal.

Visual-match pass: a new fixed-center Light Field makes the entire energy mass breathe rather than scaling only the button. Core, field, Inner/Mid/Outer halos, Ring and connection field propagate outward with 45/75/145/215/285ms offsets. Desktop final peak is Core `1.22`, Light Field `1.72`, Inner `1.42`, Mid `1.58`, Outer `1.84`, Ring `1.38`; all settle to a stable active state without X/Y movement.

## v1.1 spatial cinema layer

The fixed global transition is **900ms** with scene commit at **560ms / 62.2%**. On supported WebGL hardware, its main fragments are thick low-poly 3D shards launched from the spatial core toward and through the camera plane. Focus begins with a small camera pullback and then stronger dolly-forward; Awaken uses a lower-strength core-led push; Back releases outward into a widened Galaxy framing. The DOM transition keeps only blur/refraction when 3D is active, preventing duplicate large CSS fragments. Reduced Motion does not launch 3D shards.

When spatial capability is unavailable or an optional Canvas error occurs, the DOM Glass Stardust transition remains the sole fragment renderer; 3D and full DOM shard fields are never intentionally layered together.

| Quality | Canvas DPR cap | 3D fragments | Motion rule |
| --- | ---: | ---: | --- |
| High | 1.75 | 14 | full fixed-density point depth and shards |
| Balanced | 1.35 | 12 | default recording configuration |
| Low | 1.0 | 7 | fewer point clouds and no expensive additions |
| Mobile | 1.0 | 6 | derived Low density, no 3D postprocessing |

## Ambient baseline

> v1.1.1 supersedes the historical 760ms and 520ms records below: the production scene timeline is 900ms, commits at 560ms / 62.2%, and uses core-origin 3D shard near-lens arrival before phase commit.

## Glass Stardust scene transition

### Core-radial foreground path

| Shard | Origin from core | Final radial offset | Delay | Role |
|---|---|---|---:|---|
| Center Impact | `0vw, 0vh` | `.7vw, -.5vh` | 0ms | primary lens-facing collision; XY remains nearly fixed |
| Left Radial Rush | `-4vw, 2vh` | `-3vw, 1vh` | 32ms | restrained left separation with the same Z rush |
| Right Radial Rush | `4vw, -2vh` | `3vw, -1vh` | 42ms | restrained right separation with the same Z rush |

The outer position layer uses `left/top: 50% + origin` plus `translate(-50%, -50%)`, preventing element dimensions or depth scale from moving a shard off core. The inner depth layer owns the existing Z/scale path. Near-lens tails are centered radial residuals that expand with the shard rather than fixed rightward streaks.

Development-only inspection: `?transitionDebug=1` shows the core crosshair plus 3D progress, commit, Camera Z, primary shard Z and near-plane status. Add `&transitionSpeed=quarter` (or legacy `slow`) for 25%, `&transitionSpeed=half` for 50%, `&transitionOnlyCenter=1` for Center Impact only, or `&transitionSimplified=1` to hide mid/background/stardust. Production builds ignore all debug query parameters.

### Foreground camera-rush pass

| Variant | Depth path | Scale path | Blur path | Direction |
|---|---|---|---|---|
| Focus | `-760px → 20px → 620px` | `.32 → 2.0 → 3.9` | `1px → 5px → 14px` | deep scene to lens; minor XY correction only |
| Awaken | `-680px → 0px → 460px` | `.36 → 1.55 → 2.9` | `1px → 4px → 11px` | restrained core-origin ceremonial rush |
| Back | `480px → 90px → -720px` | `3.1 → 1.75 → .28` | `13px → 6px → 1px` | near-lens release that opens back into the Galaxy |

The overlay uses `perspective: 1100px`, centered perspective origin and preserved 3D transforms. Foreground fragments are active mainly from 120ms to 620ms, peak near the lens around the Spatial Crossing window, and fade before the 760ms transition end. Compact mobile uses `850px` perspective with a reduced `-520px → 310px` range, `1.42 → 2.25` scale, and 8px maximum blur.

### Clarity pass — 760ms three-phase sequence

| Phase | Time | Behavior |
|---|---:|---|
| Impact Entry | 0–180ms | foreground glass enters, old scene begins blur/1.018 scale, sparse star lines initiate |
| Spatial Crossing | 180–420ms | fragments are clearest; blur reaches 8px; diagonal cold-white refraction crosses the center; scene commits at 380ms |
| Refocus Exit | 420–760ms | incoming scene starts at .985 scale/blur and resolves to 1/0px while fragments and tails leave |

| Quality | Foreground | Midground | Background | Total shards | Stardust |
|---|---:|---:|---:|---:|---:|
| High | 3 | 7 | 4 | 14 | 10 |
| Balanced | 2 | 6 | 4 | 12 | 8 |
| Low / compact mobile | 1 | 4 | 2 | 7 | 5 |

Focus uses an inward left-to-right crossing with stardust aimed through the scene. Back starts near the center and disperses fragments/stardust outward on a different diagonal. Reduced Motion is 240ms, commits at 120ms, and uses only a 1px blur fade.

| Property | Specification |
|---|---|
| Scope | Main scene/module changes only; never hover, language, small buttons or loading percentage ticks |
| Duration | `520ms`; fragments travel for `460ms`, central blur/refraction sweep lasts `520ms` |
| Composition | 8 fixed translucent polygon fragments, 6 sparse 2px stardust streaks, one refractive streak, one 2.2px backdrop blur layer |
| Rhythm | 0–104ms entry, 104–312ms spatial cover and state handoff, 312–520ms exit and refocus |
| Direction | Awaken/focus sweep left-to-right; return reverses the glass travel direction |
| Interaction | Overlay captures pointer input; Zustand rejects a second scene-transition request while one is active |
| Reduced motion | no fragments or stardust; 220ms blur-only fade with 1px backdrop blur |
| Cleanup | a single component-scoped timeout clears state; Presentation restart/exit/reset clears immediately |

| System | Duration | Easing | Rule |
|---|---:|---|---|
| Core breath | 7–9s | ease-in-out | one low-amplitude luminance change |
| Galaxy arm drift | 92s | linear | environmental, never a spinner |
| Scene field drift | 36s | linear | barely perceptible background parallax |
| Nebula breathing | 12–16s | ease-in-out | opacity and scale remain low amplitude |
| Node float | 5s | ease-in-out | only vertical 7px travel |
| Data/workflow route | existing workflow timing | linear | activate only with a workflow state |

## Manual experience sequence

## Brand launch-screen restart

The left-top `E.X GALAXY` wordmark is a semantic restart button only in Awakened and Module Focus / Video Studio. Activating it does not animate backward through the current scene: it immediately clears the active transition and Presentation session, remounts the 4.2-second Loading sequence at `000%`, and then settles only into Idle. The button is hidden during Loading and Idle, uses a 44×44px minimum hit target, a restrained brightness/letter-spacing hover response, 0.98 active scale, and a visible keyboard focus ring. It is not a browser reload.

## Idle central Galaxy entry

Idle has no left-top brand button. Its sole branded control is the central `GalaxyIdleEntry`: the faint E.X GALAXY mark invokes `transitionAwaken()` and begins the existing 900ms system-awaken transition. It is semantically separate from the operational restart button, remains available again after every Loading-to-Idle return, and retains keyboard Enter/Space support through AppShell.

The manual state machine remains `loading → idle → awakened → module-focus`.

| Moment | Time band | Visual event |
|---|---:|---|
| Loading complete | 0ms | fades only into `idle`; no interface ownership |
| Idle | unlimited | core, stars, nebula and entry cue remain pure; pointer movement is parallax only |
| Explicit click/tap/Enter/Space | 0–300ms | entry cue gives way, core reads brighter |
| Awakened header | 320–1120ms | top bar rises from depth |
| Module constellation | 520–1255ms | each planet resolves in 105ms increments |
| Brand settle | 0–1300ms | blur/scale resolves rather than popping in |
| Cards | 680–2060ms | each card rises with 140ms offset, blur clears |
| Bottom system UI | 1250–2200ms | action surface and footer arrive last |
| Module focus | 0–800ms | context dims, focus grid and selected workspace gain contrast |

## Presentation Mode

Presentation retains an independent controller and may schedule its own idle hold/awakening. Manual Experience Mode never owns that timer. Restart returns presentation to loading; exit clears the presentation timeout and returns to a clean manual state.

## Core Activation Sequence ??v1.2

The first committed Idle → Awakened entry runs a single 6200ms `Core Activation Sequence`: a 1.00 → 1.08 → 1.02 first breath, 1.12 → 1.04 second breath, final 1.18 illuminate peak, then stable 1.13 energy. Inner, mid, and outer halos expand progressively; the energy ring reaches 35% by 1500ms, 70% by 3200ms, 85% by 5000ms, and 100% by 6200ms. Eight core-to-node paths activate outward with fixed 1800–4550ms delays; node illumination follows each arrival.

Module Focus return uses a 720ms reconnect, not a full replay. Mobile uses a two-halo 5200ms version. Reduced Motion replaces breathing with a 760ms fade/connection reveal. Presentation holds its System Awakening chapter until activation completes and then allows a 700ms stable settle.

## Reduced motion

Use short opacity transitions where needed, remove nonessential spins/floats, preserve the focus change and textual system state, and never use flash, bounce, or high-frequency oscillation to express completion.

## Brand interaction layer rule

The Spatial Canvas remains pointer-transparent. In Awakened, the full-inset floating-card plane is visual-only (`pointer-events: none`) and only a card itself opts into input. The top bar and the shared `GalaxyLaunchButton` occupy the explicit interactive layer (`z-index: 24/25`), so the launch-screen restart is never covered by a transparent visual plane. A live scene transition remains the only layer allowed to temporarily block interaction.

## Idle glass entry treatment

The Idle E.X GALAXY mark is intentionally 20% smaller than the former hero scale (`clamp(30px, 4.8vw, 76px)`). It uses a 0.22–0.50 cool-white/ice-blue/violet text gradient, a 1px translucent upper edge, a deep-blue lower emboss edge, and a faint offset inner shadow rather than white text or external neon. Resting opacity breathes only from 0.78 to 0.93 over 6.2s; hover raises perceived brightness approximately 16%, adds a very narrow refractive line, and scales letters by 1.01. Active scale is 0.985. Reduced Motion removes breathing and the sweep while preserving the static emboss and the 44px-plus hit target.
