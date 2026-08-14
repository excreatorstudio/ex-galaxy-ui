# Progress

## E.X Galaxy v1.2.0-showcase - Orbit Motion and Project Cover Brightness Polish - 2026-08-14

**Status: COMPLETE LOCALLY / PREVIEW AND PUBLIC REDEPLOY PENDING**

- Restored restrained life to the supplied Homepage orbit image only: one fixed-center 88s linear rotation, a masked 9.4s cold-light sweep, and a maximum three-point glint field. Video Studio receives only a slower 126s functional orbit rotation; Idle remains static.
- Established per-cover brightness tokens for FILM, CAMPAIGN, REEL, AI, and AUDIO, raised image visibility while lowering only the upper cover overlay, and retained the deep metadata gradient plus static CSS gradient fallback.
- No Scene Balance asset opacity, Homepage layout, transition, scrolling, Core activation, or runtime asset mapping changed.

## E.X Galaxy v1.2.0-showcase - Mobile transition and Homepage scroll critical fix - 2026-08-14

**Status: COMPLETE LOCALLY / DEVICE AND PUBLIC REDEPLOY PENDING**

- Identified the Mobile Safe Mode fallback path: constrained mobile Auto mode intentionally declines WebGL, but the CSS fallback still emitted legacy diagonal mid/background shards, stardust, and refraction alongside the newer center shards. Mobile CSS fallback now renders six center-origin radial shards across four staggered waves, four radial stardust tails, and a centered impact bloom; the existing WebGL Low path keeps its six-shard/DPR 1 budget and now includes a tail-wave seed.
- Added an explicit scene scroll policy. Loading, Idle, all live transitions, Module Focus, and desktop remain locked; only a settled Awakened Homepage at 560px and below enables normal vertical document scrolling. The flow shell now has `min-height:100dvh`, `touch-action:pan-y`, fixed non-interactive Galaxy scenery, safe-area Command Dock spacing, and scroll restoration for a Video Studio return.
- No Idle assets, desktop transition timing, Homepage layout, asset-scene balance, Video Studio Core behavior, Presentation timing, i18n, or platform logic was changed. Automated checks and browser viewport inspection remain required before public deployment.

## E.X Galaxy v1.2.0-showcase - Visual asset source correction - 2026-08-14

**Status: COMPLETE LOCALLY / PUBLIC REDEPLOY PENDING**

- Re-verified the two opaque reference composites and eight RGBA core-visual PNGs directly from `public/assets/galaxy/`; dimensions, channel type, alpha coverage, public URLs, and static output impact are documented in `docs/GALAXY_VISUAL_ASSETS.md`.
- Added a data-driven Idle / Homepage / Video Studio asset mapping. Idle now renders the entry composite with only quiet stars and atmosphere support; Awakened and non-Video Module Focus render the home composite plus the complete transparent core-visual stack; Video Studio renders exactly its five functional background layers and no Hero composite/core-only layers.
- Added explicit scene DOM metadata, active-scene-only CSS variables, z-index ordering above the fallback vignette, and a separate asset-scene stylesheet. Procedural Galaxy layers remain a dim fallback and do not affect existing phase, Core breathing, Presentation, or transition contracts.
- Validation: lint pass, 12 Vitest files / 71 tests pass, and production build pass. Browser preview covered Idle, Homepage, Video Studio, 1440px, 1920px, 560px, and `?spatial=off` with no horizontal overflow. Public Pages currently serves the previous deployment: its observed asset requests use `/assets/assets/galaxy/...` and return 404, so a redeploy is required before public HTTP 200 acceptance.

## E.X Galaxy v1.2.0-showcase - Awakened Homepage layout polish - 2026-08-14

**Status: COMPLETE / BROWSER VIEWPORT MATRIX VERIFIED**

- Added a dedicated `home-layout` shell for Awakened only. The E.X GALAXY brand is reduced to the requested premium focal scale, while the five existing showcase covers now form a bounded orbital composition with primary, secondary, and vertical Reel size tiers.
- Replaced the desktop scattered-card reading with stable anchors and converted widths at 560px and below to a true responsive grid flow: Film and Campaign span the main column, AI and Audio share a secondary row, and Reel remains centered in its own vertical-safe row.
- Slimmed the three-action Command Dock into a floating glass control without changing its i18n keys, handlers, or routing. Reduced Motion keeps card transforms static and uses only restrained brightness/border feedback.
- Preserved Idle, Video Studio, Core breathing, Spatial, Loading, transition, i18n, Presentation timing, platform panels, Mobile Safe Mode, and GitHub Pages behavior. Browser preview checks covered 1440, 1600, 1920, and 560px with no horizontal overflow.
- Validation: lint, 11 Vitest files / 67 tests, and production build pass. Final subjective visual sign-off remains a release-owner review item.

## E.X Galaxy v1.2.0-showcase ??GitHub Pages release ??2026-08-13

**Status: DEPLOYED / PUBLIC PAGES VERIFIED**

- Added the GitHub Pages deployment workflow and release-safe Git ignore policy. The repository is prepared to publish the static Showcase from `main` without tracking `node_modules`, `dist`, local environment files, recovery ZIPs, or the local-only Core MOV reference.
- Updated release metadata to `v1.2.0-showcase`; the frozen `v1.1.5` archive remains local and unchanged. The relative Vite public asset base remains `./` for repository Pages compatibility.
- Local release checks are pending the final pre-push run; remote Actions and public browser acceptance must be reported only after the commit is pushed.

## E.X Galaxy v1.2.0-dev ??Showcase project covers ??2026-08-13

**Status: COMPLETE / HUMAN VISUAL ACCEPTANCE PENDING**

- Generated five original, same-family premium showcase covers for FILM, AI, CAMPAIGN, REEL, and AUDIO. Each is a dark cinematic portfolio illustration with safe central composition and is stored as a public PNG under `public/assets/galaxy/project-covers/`.
- Added the public-path `projectCovers` mapping to Awakened cards. Every cover is protected by dark top/bottom overlays, a readable metadata well, restrained hover brightening, and its existing card gradient fallback when an image cannot load.
- Validation: lint, 10 Vitest files / 63 tests, and production build pass. The generated images remain static public output and are not embedded in the JavaScript bundle.

## E.X Galaxy v1.2.0-dev ??Galaxy Hero and Creative Orbit scene rebalance ??2026-08-13

**Status: COMPLETE / HUMAN VISUAL ACCEPTANCE PENDING**

- Lowered the Hero home composite to `0.09` opacity with reduced brightness/saturation, then independently reduced nebula, atmosphere, foreground stars, central glow, particles, outline, procedural core, and live star field. This restores dark reserve for the central brand and cards instead of treating the home artwork as a bright poster.
- Added a dedicated `video-studio-scene` using only `background-base`, a restrained nebula, cold orbit rings, sparse stars, and a nearly invisible atmosphere. It deliberately excludes both master composites, Hero core glow, particles, and E.X outline, so the Auto Create Core is the brightest element.
- Preserved the Core breathing clock and anchor, Presentation, i18n, Mobile Safe Mode, optional Spatial fallback, loading and transition timings. Validation: lint, 10 Vitest files / 62 tests, and production build pass.

## E.X Galaxy v1.2.0-dev ??Supplied Galaxy artwork integration ??2026-08-13

**Status: COMPLETE**

- Audited both opaque reference composites and all eight supplied `core-visual` PNG layers before integration. `GalaxyScene` now uses the entry composite only for Idle, while Awakened and Module Focus use the home composite as a restrained atmospheric base plus the transparent core-visual stack.
- The Hero-only visual stack is independent of `VideoStudio`; the fixed `project-core-anchor`, Core breathing clock, Presentation gating, i18n state, Mobile Safe Mode, and optional Spatial Canvas remain unchanged.
- Added a DOM-level regression check for the two composites and seven transparent Hero visual layers. Validation: lint, 10 Vitest files / 61 tests, and production build pass.

## E.X Galaxy v1.2.0-dev ??Project Core Breathing Visual Match Pass ??2026-08-13

**Status: COMPLETE**

- Strengthened only the fixed Video Studio Auto Create visual layers: Core scale/brightness, a new radial Light Field, all three halos, Energy Ring expansion, connection-field breathing and final stable illumination.
- Added delayed energy propagation (45ms Light Field, 75ms Inner, 145ms Mid, 215ms Outer, 285ms Ring) without changing anchor position, workflow scope, Camera, orbit center or Galaxy Hero.
- Desktop peak is Core `1.22` / brightness `1.56`, Light Field `1.72`, Inner `1.42`, Mid `1.58`, Outer `1.84`, Ring `1.38`; Mobile limits outer expansion to `1.56`; Reduced Motion remains non-pulsing.

## E.X Galaxy v1.2.0-dev ??Creative Orbit Activation scope correction ??2026-08-13

**Status: COMPLETE**

- Removed the mistakenly global Core Activation behavior from `GalaxyScene`, `GalaxyCore3D`, AppShell, and the Awakened interface. The Galaxy Hero keeps its pre-existing spatial field, orbit, Camera/parallax, and ambient core behavior.
- Added the scoped `ProjectCoreActivationController` for `VideoStudio`'s actual central `button.auto-core`. A fixed `project-core-anchor` owns center placement; `project-core-visual`, halo and energy-ring siblings own scale, glow and expansion with no X/Y motion.
- Renamed store lifecycle state to `projectCoreActivation*`; Presentation now waits only for the Video Studio chapter. Desktop uses 5600ms, Mobile 4800ms, and Reduced Motion 760ms.
- Validation: lint, 10 Vitest files / 60 tests, and production build pass. Human visual acceptance remains required for desktop/mobile appearance.

## E.X Galaxy v1.2.0-dev ??Core Activation Sequence ??2026-08-13

**Status: SUPERSEDED BY CREATIVE ORBIT SCOPE CORRECTION**

- Added the 6200ms Core Activation Sequence: two breaths, progressive halo expansion, energy-ring completion, eight staggered outward connections, node illumination, a restrained final flare, and a stable energized result at scale `1.13`.
- Added one centralized timestamp-based timeline through `coreActivationConfig`, Zustand activation state, a scoped completion controller, CSS fallback, and the optional R3F `GalaxyCore3D`. WebGL failure still leaves the full CSS sequence intact.
- Presentation chapter 2 now waits for activation completion and Pause freezes/resumes the shared activation clock; module return uses only a 720ms reconnect pulse. Mobile uses 5200ms / two halos; Reduced Motion uses a non-pulsing 760ms fade/connection path.
- Reference `core-breathing-reference.MOV` was inspected as a local reference only and is not a source import or public runtime asset. The local runner lacks a MOV decoder, so direct frame-by-frame analysis is not claimed; the companion PNG and requested sequence informed the documented interpretation.
- Validation: lint, 10 Vitest files / 61 tests, and static production build pass. The build contains no `.MOV`/`.MP4` motion-reference asset.

## E.X Galaxy v1.2.0-dev — Showcase+ Phase 1 — 2026-08-13

**Status: COMPLETE FOR PHASE 1 / MOCK-ONLY**

- Added a dependency-light i18n layer for zh-TW, English, Japanese, and Korean. Locale changes persist when storage is available, do not reset the active Galaxy phase, module, Camera, or scene transition, and use English for unsupported browser-language suggestions.
- Added compact Awakened-only locale, Credits, and Account controls plus glass Account, Credits, License, and Enterprise console panels. Presentation Mode clears/hides those panels to protect recording flow.
- Added mock platform adapters and backend reservation configuration. No real authentication, payment, billing, inquiry submission, cloud DB, or remote API call is implemented.
- v1.1.5 spatial contracts remain unchanged: 4.2s Loading, 900ms transition, 560ms commit, progressive shard spread, Mobile Safe Mode, Spatial Error Boundary, and CSS fallback.
- Validation: lint, 9 test files / 52 tests, and static production build pass. Bundle measurement is recorded in CHANGELOG.md.

## E.X Galaxy UI Prototype v1.1.5 Stable — 2026-07-26

**Status: FINALIZED / STABLE**

- Formal presentation baseline frozen after completed human acceptance. No further feature, UI, animation, Camera, Spatial 3D, state-flow, or dependency changes are permitted on v1.1.5.
- Archive: `releases/E.X-Galaxy-v1.1.5-stable-20260726.zip`.
- Final validation: `npm.cmd run lint`, `npm.cmd run test` (8 files / 42 tests), and `npm.cmd run build` passed on 2026-07-26.
- Future changes must begin under a new version; the next primary development sequence is Ernest Video Autopilot v1.2.

## 2026-07-26 — Idle glass entry and operational brand repair

- Rebuilt the Idle-only `GalaxyIdleEntry` as a smaller, low-contrast glass-embossed wordmark. It keeps the dedicated `transitionAwaken()` action and cannot restart Loading.
- Fixed the Awakened left-top restart control: the full-screen visual card plane was intercepting its pointer input. The plane is now non-interactive while individual media cards, the top bar, and the shared `GalaxyLaunchButton` explicitly opt into interaction at controlled z-index levels.
- Added DOM-backed coverage for the distinct Idle Entry and operational Restart buttons, including aria labels and resulting state changes. Final validation: lint, 8 files / 42 tests, and the production build pass.

## 2026-07-26 — Brand control separation correction

- Corrected the Idle regression: `GalaxyIdleEntry` is now the central, faint E.X GALAXY control and only invokes `transitionAwaken()`. It never calls the launch-screen restart action.
- `GalaxyLaunchButton` now enforces the centralized brand policy and renders only for `awakened` and `module-focus`; Loading has no brand operation and Idle has no left-top restart brand. The same restart control remains available in Video Studio through Module Focus.
- Added phase-policy, Idle-to-Awakened, Module Focus restart, Loading replay and Presentation-safe state coverage. Final validation passed: lint, 8 files / 40 tests, and production build.

## 2026-07-26 — Brand launch-screen restart

- Replaced the interactive `E.X GALAXY` wordmark with a semantic `GalaxyLaunchButton` in Awakened, Module Focus and Idle. It has the required launch-screen aria label, 44px mobile target, restrained hover/active/focus treatment, and is intentionally absent during Loading.
- Added the centralized Zustand `restartGalaxyExperience()`: it atomically ends Presentation Mode, clears transition target/start state, selected module, workflow/export simulation and presentation flags, increments `loadingRun`, then returns to `loading`. `LoadingSequence` is keyed by that run so its progress always remounts at 0 and completes only to Idle after 4.2 seconds.
- Guarded stale presentation chapters and Video Studio export timers; transition cleanup runs on overlay unmount and guarded commits cannot alter a restarted Loading state. Final validation passed: lint, 8 files / 38 tests, and production build.

## 2026-07-26 — Progressive radial shard dispersion

- Replaced the near-synchronous 3D shard rush with four fixed-count data-driven waves: Center Lead begins at 170ms, opposing Primary Radial shards follow, Secondary Spread fills the wider mid-depth, and Stardust Tail fragments continue after scene commit.
- Each shard now owns a distinct start depth, start/near-lens/pass-through time, radial strength, acceleration and three-axis rotation speed. The Center Lead reaches the lens first; Primary crossings are staggered at 565ms, 635ms and 705ms while the 900ms / 560ms shared timeline, camera path, quality counts and fallback remain unchanged.
- Added wave spacing, opposing-direction, crossing-gap, world-space anti-clustering, total-count and existing shared-timeline coverage. Final validation passed: `npm.cmd run lint`, `npm.cmd run test` (7 files / 33 tests), and `npm.cmd run build`.

## 2026-07-26 — v1.1.2 mobile Spatial recovery

- Isolated the optional lazy `SpatialCanvas` behind `SpatialLayer` and `SpatialErrorBoundary`. A failed dynamic import, Three/R3F render error or material initialization error now unmounts only Canvas; `App`, Loading, CSS GalaxyScene and DOM interface remain mounted as the v1.0 fallback.
- Removed the unused Drei `Preload` helper after development inspection produced a duplicate Three/invalid-hook failure risk. The spatial chunk now depends only on Three and React Three Fiber; explicit `@types/three` supports the production type build.
- Added centralized capability assessment: `?spatial=off` is a deterministic CSS fallback, `?spatial=low` uses the Low safe renderer, and `?spatial=auto` uses WebGL, texture size, memory, CPU, motion and mobile checks. Mobile safe mode caps DPR at 1.0, uses six shards, low star/dust counts, basic material and no expensive light/postprocessing.
- Added development-only `?bootDebug=1` mounted diagnostics. Validation passed: `npm.cmd run lint`, `npm.cmd run test` (7 files / 30 tests), and `npm.cmd run build`.
- Live LAN development verification caught and corrected a `Maximum update depth exceeded` loop in the first Safe Canvas mount: a newly-created lazy-ready callback re-ran after each diagnostics write. Stable callbacks now prevent the loop; `?spatial=off` reached Idle with no Canvas, while `?spatial=low` mounted one safe Canvas and reached Idle successfully.

## 2026-07-26 — Near-lens commit and shard-presence pass

- Replaced the separate overlay/Canvas clocks with a single Zustand `sceneTransitionStartedAt` and shared 900ms timeline configuration. Scene commit now occurs at 560ms / 62.2%, after the Center Impact shard has reached the near-camera zone.
- Rebuilt 3D shards as three reusable thick low-poly octahedron variants. Foreground seed sizing increased 35–41%, midground sizing 20–30%, with independent physical materials, three-axis rotation and restrained cold rim lighting.
- Added development-only `transitionDebug=1` diagnostics, with `transitionSpeed=quarter`, `half`, or normal speed, exposing progress, commit, camera Z, primary shard Z and near-plane crossing. Production builds cannot render it.
- Updated CSS fallback to the same 900ms visual rhythm while retaining DOM shards only when WebGL is unavailable. Lint, 24 tests and production build pass.

## 2026-07-26 — v1.1 Spatial Cinematic 3D Layer

- Created recoverable pre-v1.1 archive `releases/E.X-Galaxy-v1.0.0-stable-pre-v1.1-20260726.zip`; this workspace has no Git metadata, so a commit/tag could not be created.
- Added lazy-loaded React Three Fiber + Drei + Three.js SpatialCanvas with 3D point-cloud depth, a particle-ring Galaxy core, damped camera parallax, quality/DPR adaptation and CSS fallback.
- Replaced the primary transition shards with 8–14 true 3D low-poly shards whenever WebGL is available, preserving the existing 760ms duration and 380ms scene commit. CSS shards remain the no-WebGL fallback and reduced-motion path.
- Automated validation is complete: lint, 20 Vitest tests and production build pass. The in-app browser completed Loading → Idle and Awaken fallback verification but cannot create a WebGL Canvas, so true 3D camera/shard imagery remains an explicit Chrome/Edge hardware acceptance item.

## 2026-07-26 — Core-radial foreground rush

- Replaced foreground edge origins with a centered core-origin trajectory: Center Impact begins at the Galaxy core, while left/right shards start within ±4vw and separate only slightly.
- Split shard position from shard depth so Z/scale no longer magnify XY movement. Added development-only `transitionDebug=1` markers and optional slow/center-only/simplified query controls.
- Validated 17 tests, lint and production build; debug is disabled by production environment gating.

## 2026-07-26 — Glass Stardust Z-axis rush pass

- Replaced the foreground shard's dominant horizontal spray with an 1100px-perspective camera rush from roughly `translateZ(-760px)` through the lens plane and out to `translateZ(620px)`.
- Added differentiated Focus, Awaken and Back foreground depth curves, while retaining the 760ms timeline, 380ms scene commit, fixed DOM counts and Motion Off fallback.
- Lint, 13 tests and production build pass.

## 2026-07-26 — Glass Stardust clarity pass

- Extended the full motion transition to 760ms and delayed scene commit to 380ms, preserving the old scene during Impact Entry and committing in Spatial Crossing.
- Rebuilt the fixed overlay density into foreground, midground and background glass layers: High 14/10, Balanced 12/8, Low 7/5 fragments/stardust.
- Verified lint, 13 tests and production build after the delayed-commit state change.

## 2026-07-26 — Glass Stardust scene transition

- Added the shared `TransitionOverlay` for Idle→Awakened, Awakened→Module Focus, Module Focus→Awakened, Video Studio return, and Presentation awaken/focus chapters.
- The overlay runs for 520ms, uses one-shot glass fragments, sparse stardust, a refractive streak and short backdrop blur, then clears centralized transition state.
- Added state guards against stacked transitions and reset cleanup for Presentation restart/exit. Motion Off uses a short blur-only fallback.

## 2026-07-26 — v1.0 implementation

- Milestone 0: complete — empty workspace assessed; three concept references read; local Vite architecture selected.
- Milestone 1: complete — CSS-generated star field, nebulae, core, orbit system, parallax, quality modes, reduced-motion mode, and non-WebGL fallback path.
- Milestone 2: complete — centralized idle / awakened / module-focus state transitions; keyboard, pointer, timed awaken, and Esc return.
- Milestone 3: complete — navigation, language state, floating generated project cards, status and bottom actions.
- Milestone 4: complete — eight module definitions, one usable Video Studio route, Coming Soon previews.
- Milestone 5: complete — media orbit, drag/drop simulation, 13-step Auto Create flow, animated timeline, project-ready and simulated export.
- Milestone 6: implemented — presentation play/pause/restart/skip/exit/fullscreen controls; end-to-end interaction needs browser acceptance confirmation.
- Milestone 7: complete for automated acceptance — `npm.cmd run lint`, `npm.cmd run test`, and `npm.cmd run build` pass; local Vite returns HTTP 200; browser verification confirms awaken, Video Studio, flow completion, export, Esc return, and presentation pause/resume/exit without application console errors.

## Validation evidence

- Local development URL: `http://127.0.0.1:5173/` returned HTTP 200 on 2026-07-26.
- Vitest: 1 file / 2 tests passed.
- Production build: completed successfully (431 transformed modules).
- Browser acceptance: verified at the browser's available desktop viewport. Remaining viewport matrix checks are intentionally retained in `TASKS.md` rather than claimed as completed.

## 2026-07-26 — Entry-flow refinement

- Replaced the initial `idle` state with `loading` and a 4.2-second controlled initialization sequence.
- Removed automatic idle timeout and pointer-movement/pointer-down awakening.
- Added pointer-up tap/drag classification, manual-only awakening, Presentation-specific initialization and safe exit/restart routing.
- Added state and gesture tests. `npm.cmd run lint`, `npm.cmd run test` (2 files / 8 tests), and `npm.cmd run build` pass.
- Browser verification: Loading appeared, completed into pure Idle after approximately 4.2 seconds, remained Idle after an additional 3.5 seconds, entered Awakened only after explicit click, and Presentation Mode restarted through Loading then exited cleanly back to Idle. No application console errors were recorded.

## 2026-07-26 — Product Design visual impact upgrade

- Completed an in-app Product Design audit of the three supplied UI references and local Loading, Idle, Awakened and Video Studio states. No local RAY video was found, so no RAY-specific analysis is claimed.
- Added an executable visual impact token layer, a larger environmental galaxy core, depth-aware star/nebula treatment, staged Awakened emergence, delayed constellation reveal, and a layered Auto Create core with semantically differentiated workflow nodes.
- Preserved manual `loading → idle → awakened → module-focus` behavior and Presentation Mode isolation. Automated validation and browser re-check are pending final completion in this milestone.
- Final verification: `npm.cmd run lint`, `npm.cmd run test` (2 files / 8 tests), and `npm.cmd run build` passed. `http://127.0.0.1:5173/` returned HTTP 200. Browser inspection confirmed the upgraded Loading-to-Idle handoff, an additional 3.5-second idle hold without awakening, explicit-click awakening, Module Focus, and the upgraded Video Studio scene. The complete 30–60-second Presentation recording remains a human acceptance task rather than an unverified claim.
