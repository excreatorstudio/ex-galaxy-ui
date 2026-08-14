# Decisions

## 2026-08-14 - Orbit life and cover visibility stay layer-scoped

`galaxy-orbit-rings.png` remains the only Homepage ring artwork. Its fixed-center 88-second linear rotation is paired with a masked cold-light sweep and a three-point glint field, so no duplicate orbit image, position drift, or global scene exposure is introduced. Mobile retains only the slower rotation plus a dim sweep; glints are removed. Video Studio has a separate 126-second structural rotation and no Hero sweep/glints. Motion Off and Reduced Motion stop all of these loops.

Project-cover visibility is owned by individual image tokens, not the Galaxy Scene. FILM, CAMPAIGN, REEL, AI, and AUDIO have deliberately distinct brightness values in the 1.30-1.38 range; the cover-only upper overlay is lighter, while the lower metadata gradient and pre-existing CSS gradient fallback remain dark enough for copy. Scene Balance opacity contracts remain unchanged.

## 2026-08-14 - Mobile radial transition and scene-specific scroll policy

Mobile Safe Mode continues to fail closed when Auto capability judges WebGL constrained; it must not silently substitute a diagonal planar sweep. Its CSS fallback now follows the shared transition language: center impact, opposing primary radial shards, secondary up/down spread, and a late stardust tail. The normal 900ms duration and 560ms commit remain shared with desktop; Reduced Motion remains the existing short shard-free path. When optional Canvas is available on mobile, the WebGL Low renderer keeps the DPR 1/six-shard budget and selects seeds covering all four waves.

The document remains immersive and scroll-locked for Loading, Idle, live transitions, desktop Awakened, and module scenes. Only a completed Awakened Homepage at 560px and below enables vertical scrolling, because that layout deliberately becomes a long document flow. The class is applied to the document roots only while that policy is active, the Galaxy scene is fixed and pointer-transparent behind it, and the Command Dock includes `safe-area-inset-bottom` spacing. A focus transition saves the mobile document offset and a return restores it after the overlay clears.

## 2026-08-14 - Supplied Galaxy asset source is scene-specific

The ten public PNGs are not one global background. Idle owns `galaxy-master-composite` with only sparse image stars and atmosphere support; Awakened and non-Video Module Focus own `galaxy-home-master-composite` plus the eight-layer core-visual mapping; Video Studio owns only the five functional background layers. `GalaxyScene` filters inline asset variables to the active scene and exposes scene/layer metadata in the DOM. Explicit z-index keeps supplied layers above the fallback vignette, while the procedural CSS Galaxy remains low-opacity fallback motion. No application phase, Core activation, Presentation timing, i18n, or layout contract is changed.

The emitted CSS file is not the correct base for a `./assets/...` custom-property URL on a project site. Runtime resolution now uses `document.baseURI`, yielding `/ex-galaxy-ui/assets/galaxy/...` on Pages and avoiding the previously observed `/ex-galaxy-ui/assets/assets/galaxy/...` 404. Local preview proves the corrected path; the public site must be redeployed to receive it.

## 2026-08-14 - Awakened Homepage layout polish

The Awakened Homepage now uses a scoped `home-layout` shell rather than inheriting the original scattered absolute card composition. Desktop cards retain asymmetry through five stable anchors: Film and Campaign are primary upper cards, AI and Audio are secondary lower cards, and Reel is a smaller vertical side card. The brand remains centered but uses a 15-20% smaller type scale and a quieter kicker/status treatment.

At 560px and below, the Homepage switches to a CSS grid flow with explicit areas (`film`, `campaign`, `ai`, `audio`, `reel`) so the mobile view is not a shrunken desktop canvas. The Command Dock remains the same three-button action surface, with only its glass dimensions and hierarchy adjusted. Card hover is capped at a small scale/lift, and reduced motion removes those transforms.

The stylesheet is imported after the shared global and scene-balance styles so the Homepage rules can intentionally win only inside `.home-layout`. Video Studio and Module Focus do not render this shell; no background, Core, timing, i18n, Presentation, or platform behavior is changed.

## 2026-08-13 ??Showcase project-cover treatment

Awakened project cards use generated showcase covers as restrained background photography/art rather than finished campaign deliverables. Covers load by public, relative asset paths through a single `projectCovers` map; a failed `<img>` becomes hidden and the existing per-card CSS gradient remains visible. A two-stage dark overlay and bottom metadata well are mandatory so no cover outshines the E.X Galaxy Hero or makes card copy unreadable. The Video Studio, Presentation state model, locale system, mobile-safe architecture, and central Hero balance are unaffected.

## 2026-08-13 ??Galaxy Hero and Creative Orbit scene rebalance

Hero artwork is now scene-specific rather than a shared high-brightness treatment. Awakened and non-Video Module Focus retain the home composite and all transparent Hero layers only at deliberately low intensity over the procedural deep-space fallback. Video Studio explicitly removes those Hero composites and high-exposure central layers, then creates a local functional field from the background base, minimal nebula, cold orbit structure, sparse stars, and near-zero atmosphere. The Auto Create Core and its nodes therefore remain the first and second visual layers. No timing, store, activation, Presentation, locale, or safe-mode contract changes are permitted by this visual rebalance.

## 2026-08-13 ??Supplied Galaxy artwork integration

The supplied entry and home composites are static Hero artwork, not UI replacements: Idle uses `galaxy-master-composite`; Awakened and Module Focus use `galaxy-home-master-composite` at low opacity beneath the existing DOM interface. The supplied transparent core-visual assets are a Hero-only stack, so they cannot inherit, start, pause, or alter Video Studio's project activation sequence. The original CSS galaxy remains behind the image layers as the visual fallback, and `import.meta.env.BASE_URL` keeps all public asset references compatible with GitHub Pages project sites.

## 2026-08-13 ??Project Core breathing visual-match pass

The fixed Creative Orbit anchor remains the sole owner of center position. To avoid a generic button pulse, the Auto Create Core now propagates energy from core to Light Field, Inner/Mid/Outer halos and Energy Ring using short delayed visual layers. The final peak is deliberately brief and settles to a lower stable active state. Mobile reduces only the outer-field scale/blur; Reduced Motion keeps the fade-and-illumination path without repeated scale breathing.

## 2026-08-13 ??Creative Orbit activation scope

The Core Activation Sequence is not a Galaxy Hero or Awakened landing animation. It is owned by Video Studio's Creative Orbit Auto Create sphere only. The store uses explicit `projectCoreActivation*` state so Hero visuals cannot accidentally consume project workflow state. The fixed DOM `project-core-anchor` owns x/y centering; `project-core-visual`, halo and ring siblings may only animate scale, brightness, opacity and rotation. Presentation waits at the Video Studio chapter, not the Hero awaken chapter.

## 2026-08-13 ??Core Activation Sequence

This earlier Hero-scoped decision is superseded by the Creative Orbit activation boundary above. `coreActivationConfig` now supports only project activation: desktop 5600ms, mobile 4800ms, and a 760ms Reduced Motion alternative. `GalaxyScene` and `GalaxyCore3D` do not consume the project timestamp.

The supplied `core-breathing-reference.MOV` remains a non-runtime reference. The local runner could inspect its container and companion still but not decode a frame sequence; no direct timing claim or video import is made.

## 2026-08-13 — v1.2 Showcase+ mock commerce boundary

v1.2.0-dev adds a commercial-platform showcase without changing the frozen v1.1.5 spatial contracts. Account, Credits, subscription, and Enterprise UI consume `platformService` adapters rather than mock fixtures directly. The only implementation is in-memory mock adapters; `VITE_PLATFORM_MODE=remote` is reserved and safely falls back to mock data with a development warning. No user credential, inquiry, payment, billing, or cloud record leaves the static SPA.

## 2026-08-13 — Locale and reset policy

The UI supports zh-TW, en, ja, and ko using stable translation keys. zh-TW is the safe first-load and unavailable-storage default; selected locale persists through safe local storage when available. The optional browser-language suggestion helper maps all zh variants to zh-TW, ja to ja, ko to ko, and unsupported languages to en. Locale changes never affect Galaxy phase, Camera, selected module, or transition timing. Restarting Galaxy closes transient account panels but keeps the locale and in-memory mock account session for continuity.

## 2026-07-26 — v1.1.5 Stable release baseline

E.X Galaxy UI Prototype v1.1.5 is the current formal Stable / Finalized presentation baseline. It is frozen for demonstration, recording, and recovery. No additional effects, feature work, dependency upgrades, or direct overwrites are permitted on this baseline. Future Galaxy work must start under a new version number and preserve v1.1.5 as the rollback reference. The next primary development sequence returns to Ernest Video Autopilot v1.2.

## 2026-07-26 — Brand interaction layers and Idle glass treatment

`GalaxyIdleEntry` and `GalaxyLaunchButton` remain separate controls by responsibility: the Idle central mark always calls `transitionAwaken()`, while the shared operational mark in Awakened, Module Focus, and Video Studio always calls `restartGalaxyExperience()`. The Awakened failure was caused by the later full-inset `floating-cards` visual plane receiving pointer input above the header, not by the Spatial Canvas, which is already pointer-transparent. The card plane is now pointer-transparent; individual cards, the top bar, and the restart button explicitly opt in at higher UI layers. The Idle entry is intentionally a smaller semi-transparent glass-embossed wordmark with a static reduced-motion version, rather than a bright hero headline.

## 2026-07-26 — Separate Idle entry from operational restart

Brand controls have distinct responsibilities. `GalaxyIdleEntry` is permitted only during Idle and invokes `transitionAwaken()` to preserve the immersive entry ritual. `GalaxyLaunchButton` is permitted only during Awakened and Module Focus and invokes `restartGalaxyExperience()` to return through Loading. `getGalaxyBrandControl(phase)` is the enforced source of truth so no future component can accidentally render the restart control in Idle.

## 2026-07-26 — Brand wordmark is the launch-screen restart

The E.X GALAXY wordmark is a real button, not a navigation link or page reload. `restartGalaxyExperience()` is the single reset path: it rejects duplicate calls while already loading, clears the centralized scene transition and module/workflow state, exits Presentation Mode, increments `loadingRun`, and returns to a fresh Loading sequence. Existing effect cleanup removes presentation/overlay/video timers; all delayed commits are additionally phase-guarded. Canvas state is never required: no active transition unmounts shards and CameraTransitionController resolves its idle offsets on the next frame, while CSS fallback follows the same state reset.

## 2026-07-26 — Progressive radial shard waves

3D shards use four data-driven waves instead of a shared delayed rush. Center Lead has the smallest XY drift and leads the transition; Primary Radial sends fixed left/right foreground paths through the lens with at least 50ms crossing separation; Secondary Spread stays broader and slower in mid-depth; Stardust Tail continues after commit. The scene clock remains 900ms with a 560ms commit, and no shard count, postprocessing, fallback or state ownership change is introduced.

## 2026-07-26 — Mobile spatial failure isolation

The 3D renderer is optional and now fails closed. `SpatialLayer` owns capability selection and lazy loading; `SpatialErrorBoundary` wraps only `SpatialCanvas` and returns `null` after an error, leaving the already-mounted CSS GalaxyScene and DOM interface intact. The capability assessment is deliberately conservative: auto mode falls back on no WebGL, reduced motion, or constrained mobile hardware. `?spatial=off`, `?spatial=low` and `?spatial=auto` are deterministic development/support controls. `?bootDebug=1` is development-only and never appears in a production build.

Spatial mount diagnostics use memoized callbacks. This avoids a Zustand diagnostic write causing AppShell to rerender, replacing the lazy-ready prop, and recursively invoking the Canvas mount effect.

## 2026-07-26 — Near-lens scene commit

The normal scene transition is now 900ms with a 560ms (62.2%) commit. `sceneTransitionStartedAt` is set atomically by Zustand when the transition is requested; Overlay timers, Camera progression and 3D shard poses derive from the same configuration and timestamp. This deliberately delays phase changes until the Center Impact shard has arrived near the camera. Reduced Motion remains an independent 240ms / 120ms blur-only path.

## 2026-07-26 — Shard presence without density inflation

Impact is increased through 35–41% foreground scale, 20–30% midground scale, thick low-poly octahedron variants, per-shard physical material response, three-axis rotation and limited rim lighting. Counts remain High 14, Balanced 12, Low 7 and Mobile 6; no postprocessing package, full-screen blur or global bloom is added.

## 2026-07-26 — v1.1 spatial renderer

React Three Fiber, Drei and Three.js are used as a transparent, lazy-loaded spatial layer instead of replacing the v1.0 DOM UI. The existing CSS GalaxyScene remains mounted as a complete WebGL fallback. Zustand continues to own all phase changes; Camera and shards only read `sceneTransition`. No postprocessing package is added in the baseline because the required depth read is achieved with point fields, low-poly geometry and controlled light at lower sustained GPU cost.

## 2026-07-26 — Core-radial foreground trajectory

Focus and Awaken foreground shards now originate from a centered Galaxy-core coordinate (`50vw`, `50vh`) and use two transform layers: position handles small radial XY separation, while depth handles translateZ, scale, rotation and blur. Center Impact remains within ±1 viewport unit; left/right radial shards remain balanced. Development-only query debugging is environment-gated and cannot display in the production build.

## 2026-07-26 — Foreground shard camera-rush direction

Foreground Glass Stardust shards use CSS 3D perspective (`1100px`, `preserve-3d`) and a Z-axis-first movement model. Focus begins deep behind the scene and passes the lens; Awaken uses a gentler core-origin rush; Back begins near the lens then releases into depth. X/Y travel is now only a small supporting offset, avoiding a rightward spray as the dominant reading.

## 2026-07-26 — Glass Stardust clarity pass

The Glass Stardust transition now uses 760ms in normal motion with a centralized 380ms scene-commit point. This creates Impact Entry (0–180ms), Spatial Crossing (180–420ms), and Refocus Exit (420–760ms) rather than an immediate phase swap. Fragment and star density scale by quality, while Reduced Motion remains a 240ms blur-only variant with a 120ms commit. Focus travels inward across the scene; Back disperses outward with separate fragment and stardust directions.

## 2026-07-26 — Glass Stardust Transition

Adopted a 520ms Glass Stardust scene-transition overlay for major page and module changes only. It uses a small fixed set of CSS glass fragments, sparse star-dust streaks, a refractive sweep and brief backdrop blur. Motion Off removes fragments and streaks in favor of a short blur fade. The centralized transition state rejects repeat requests while active, and Presentation restart/exit explicitly clears it.

## 2026-07-26 — Renderer

Selected React + TypeScript + Vite + Zustand + Framer Motion with CSS-generated visual layers rather than Three.js for v1.0. The visual is fully programmatic, needs no online assets or WebGL, and is safer for local recording on lower-powered Windows hardware. The architecture can add a Three.js scene later behind a renderer interface.

## 2026-07-26 — Prototype truthfulness

All media, AI processing, timeline creation, preview and export behavior is explicitly simulated. Labels retain `PROTOTYPE v1.0` and `CONCEPT PREVIEW`; no formal processing or delivery claims are made.

## 2026-07-26 — Motion performance

Balanced is the default preset. Star count varies by quality mode; Motion Off honors system reduced-motion at startup and can be toggled in the awakened interface.

## 2026-07-26 — Entry flow

Manual Experience Mode is explicit: Loading completes only to `idle`; `idle` remains indefinitely until a click, qualifying tap, Enter or Space. Pointer movement controls parallax only. Presentation Mode owns its own start/restart loading state and is the only path permitted to automatically awaken after its idle hold. Tap and drag are separated by a 12px pointer-distance threshold.

## 2026-07-26 — Visual impact direction

Product Design direction is implemented as programmatic CSS layers and existing Framer Motion timing, not as a new renderer or image/video dependency. The visual hierarchy uses dark reserve, one dominant core, three depth bands, staged UI emergence and selective active-path light. This preserves Balanced-mode stability and the existing manual-entry state machine.
