# Changelog

## 1.2.0-showcase - Mobile transition and Homepage scroll critical fix - 2026-08-14

- Replaced Mobile CSS fallback's remaining diagonal fragments, streaks, and refraction sweep with a lightweight center-origin radial glass/stardust sequence: six shards across Center, Primary, Secondary, and Tail waves plus a centered impact bloom.
- Kept the shared 900ms / 560ms transition contract and Reduced Motion behavior; Mobile WebGL Low remains DPR 1 with six shards and now represents every radial wave.
- Enabled document scrolling only for settled 560px-and-below Awakened Homepage flow, with `100dvh`, vertical-pan, safe-area dock clearance, transition locking, overlay cleanup, and Video Studio return-position restoration.

## 1.2.0-showcase - Visual asset source correction - 2026-08-14

- Re-verified the two master composites and eight transparent core-visual PNGs from `public/assets/galaxy/` and documented their real dimensions, alpha coverage, public URLs, and runtime ownership.
- Remapped Idle, Awakened / non-Video Module Focus, and Video Studio to independent image-layer contracts. Idle now uses the entry composite as its primary source; Homepage uses the home composite plus the supplied transparent layers; Video Studio keeps only the five functional background layers.
- Added explicit image-stack z-index, scene metadata, active-scene URL variables, and a procedural fallback path without changing existing state, activation, Presentation, or transition timing.
- Corrected CSS custom-property URL resolution so deployed project-site assets resolve to `/assets/galaxy/...` rather than the stale `/assets/assets/galaxy/...` path. Local production preview now serves all ten source images at HTTP 200; the currently published Pages build still needs redeployment.

## 1.2.0-showcase - 2026-08-14 - Awakened Homepage layout polish

- Replaced the old five-card floating spread with a scoped desktop orbital composition around the existing E.X GALAXY brand and cover assets.
- Reduced the Homepage brand scale, lowered secondary copy presence, and refined the three-action Command Dock into a thinner floating glass control.
- Added a real 560px-and-below grid flow for Project Showcase cards, including safe Reel cropping and no horizontal overflow.
- Kept cover mapping, i18n, Presentation, reduced-motion behavior, Video Studio, Core activation, Spatial rendering, and scene-balance values unchanged.

## 1.2.0-showcase ??2026-08-13 ??GitHub Pages release

- Prepared the public E.X Galaxy Showcase for GitHub Pages with a Node 22 Actions workflow that runs install, lint, test, build, Pages configuration, artifact upload, and deployment from `main`.
- Added release-safe ignore rules for dependencies, production build output, caches, local environment files, recovery ZIPs, and the inspection-only Core motion MOV. Existing local files remain untouched.
- Kept the static Vite relative asset base (`./`), so public visual assets and the SPA entry resolve under the repository project path.

## 1.2.0-dev ??2026-08-13 ??Showcase project covers

- Generated five dark, premium, same-series project-cover images and added them to the Awakened FILM, AI, CAMPAIGN, REEL, and AUDIO cards.
- Added public static cover mapping, dark readability overlays, a deeper metadata well, responsive crop controls, restrained hover detail, and a gradient fallback when an image fails to load.
- Validation: lint, 10 Vitest files / 63 tests, and production build pass. The five public PNGs add 8,427,783 bytes of static output; main application JavaScript is 392.18 kB / 124.58 kB gzip.

## 1.2.0-dev ??2026-08-13 ??Galaxy Hero and Creative Orbit scene rebalance

- Rebalanced the Hero to a darker, lower-saturation deep-space presentation: the home composite now acts only as a 0.09-opacity atmospheric base, while nebula, atmosphere, stars, core glow, particles, and outline layers are independently restrained.
- Added a separate Video Studio background stack containing only `galaxy-background-base`, low nebula, cold orbit rings, sparse stars, and very low atmosphere. Neither master composite nor the Hero core/brand overlays enter the functional workspace.
- Preserved Core breathing, project anchor, Presentation, Mobile Safe Mode, i18n, static public asset routing, and CSS fallback. Validation: lint, 10 Vitest files / 62 tests, and production build pass. Main application chunk: 391.84 kB / 124.41 kB gzip; lazy SpatialCanvas is unchanged at 893.34 kB / 238.09 kB gzip.

## 1.2.0-dev ??2026-08-13 ??Supplied Galaxy artwork integration

- Added the supplied `galaxy-master-composite` to the Idle entry and `galaxy-home-master-composite` as the restrained Awakened / Module Focus atmospheric base.
- Layered the seven transparent core-visual overlays only in the Galaxy Hero; the RGB background base remains underneath as a CSS-visible fallback base.
- Preserved the independent Video Studio Core breathing, Presentation, i18n, optional WebGL fallback, and static GitHub Pages-relative public asset paths.
- Validation: lint, 10 Vitest files / 61 tests, and production build pass. Main application chunk: 391.15 kB / 124.31 kB gzip; existing lazy SpatialCanvas chunk: 893.34 kB / 238.09 kB gzip. Public Galaxy artwork is copied verbatim at 17,565,913 bytes.

## 1.2.0-dev ??2026-08-13 ??Project Core Breathing Visual Match Pass

- Strengthened Video Studio's fixed Auto Create core with higher breathing scale/brightness, propagated three-layer halos, Energy Ring expansion, connection-field illumination and a new radial Light Field.
- Kept all x/y placement, Galaxy Hero, Camera, orbit center and activation scope unchanged; added mobile outer-halo and Reduced Motion safeguards.

## 1.2.0-dev ??2026-08-13 ??Creative Orbit Activation scope correction

- Restored the Galaxy Hero and `GalaxyCore3D` to their ambient spatial behavior; no 5600ms project activation is applied to Idle or Awakened.
- Moved the activation to `VideoStudio`'s central Auto Create core with fixed positioning, scale/glow/halo/ring-only motion, staggered connections and stable final energy.
- Renamed lifecycle ownership to `projectCoreActivation*` and moved Presentation completion gating to the Video Studio chapter.
- Validation: lint, 60 tests, and production build pass.

## 1.2.0-dev ??2026-08-13 ??Core Activation Sequence (superseded scope)

- Historical implementation note: the original 6200ms Hero-scoped Core Activation approach was superseded by the Creative Orbit scope correction above; it is not active in the current application.
- Added shared activation configuration and Zustand lifecycle state for CSS fallback and the optional R3F core; Module Focus return uses a 720ms reconnect, Presentation waits for completion, Mobile uses 5200ms/two halos, and Reduced Motion uses a 760ms non-pulsing alternative.
- Added four-locale activation status text, motion-reference documentation, regression coverage, and verified that the MOV reference is absent from the production build.

## v1.2.0-dev — Showcase+ Phase 1

Date: 2026-08-13  
Status: Development / Mock-only

- Added stable-key zh-TW, en, ja, and ko dictionaries, locale persistence, browser language mapping, and English missing-key fallback.
- Added Account, E.X Credits, License, and Enterprise glass-console UI with guest and mock signed-in states, plan preview, credits history, and a locally captured Enterprise request.
- Added `AuthAdapter`, `CreditsAdapter`, `SubscriptionAdapter`, `EnterpriseAdapter`, and `UserProfileAdapter` behind a mock platform service. Remote mode is a safe, non-networked reservation.
- Added centralized feature flags and mobile responsive console behavior without adding a runtime server or blocking GitHub Pages static deployment.
- Preserved Loading 4.2s, Spatial 900ms / 560ms timeline, progressive shard spread, Mobile Safe Mode, Spatial Error Boundary, CSS fallback, and Presentation Mode.
- Validation: lint and 52 Vitest tests pass; production static build passes. Main application chunk: 384.90 kB / 122.62 kB gzip. Existing lazy SpatialCanvas chunk: 893.15 kB / 238.04 kB gzip, with Vite's existing chunk-size advisory.

## v1.1.5 — Stable Release

Date: 2026-07-26  
Status: Finalized

- Finalized the Spatial Cinematic 3D Layer with the 900ms Glass Stardust transition and 560ms scene commit.
- Preserved the shared Camera, Shard, and Overlay timeline plus Progressive Radial Shard Spread.
- Includes Mobile Safe Mode, Spatial Error Boundary, and WebGL / CSS fallback recovery.
- Includes the Idle central glass-embossed entry, plus the left-top return-to-system entry in Awakened, Module Focus, and Video Studio.
- Includes the 4.2-second Loading restart, Presentation Mode, and Reduced Motion path.
- Final validation passed: lint, 42 Vitest tests, and production build.
- Future upgrades will continue under a later version; v1.1.5 is frozen as the stable presentation baseline.

## 1.1.4 — 2026-07-26

- Reworked the Idle-only E.X GALAXY entry into a smaller, semi-transparent cold-glass embossed wordmark with layered highlight/shadow edges, restrained hover refraction, and reduced-motion fallback.
- Repaired the Awakened left-top launch restart by preventing the full-screen floating-card visual plane from intercepting header input; standardized active restart button interaction layers and hit targets.
- Added behavioral coverage for the distinct Idle entry and operational restart controls. Validation: lint, 42 Vitest tests, and production build pass.

## 1.1.2 — Brand control separation — 2026-07-26

- Restored Idle's central E.X GALAXY as an Awaken entry control instead of a Loading restart.
- Added phase-enforced `GalaxyIdleEntry` / `GalaxyLaunchButton` separation: Idle has no left-top restart; Awakened and Module Focus retain the launch restart control.

## 1.1.2 — Brand launch restart — 2026-07-26

- Converted the E.X GALAXY wordmark into a keyboard-accessible launch-screen restart button across Idle, Awakened and Module Focus.
- Added centralized `restartGalaxyExperience()` and keyed Loading replay; it clears Presentation, scene-transition, module/workflow/export state and returns through the complete 4.2-second Loading sequence.
- Added stale presentation/export timer protections and 38-test restart coverage.

## 1.1.2 — Progressive radial dispersion — 2026-07-26

- Replaced clustered simultaneous 3D shard arrival with four staggered Center Lead, Primary Radial, Secondary Spread and Stardust Tail waves.
- Added per-shard Z origins, approach/crossing timing, radial strengths, acceleration and rotation rates; preserved the 900ms transition, 560ms commit, fixed counts, Mobile Safe Mode and CSS fallback.

## 1.1.2 — 2026-07-26

- Added `SpatialErrorBoundary` and capability-led `SpatialLayer` so lazy chunk, Canvas, renderer or material failures degrade to the v1.0 CSS/DOM universe instead of blanking the React tree.
- Added mobile safe mode, `spatial=off|low|auto`, development boot diagnostics, host-relative Vite asset base and test coverage for fallback behavior.
- Removed the unused Drei preload helper after a development invalid-hook / duplicate renderer-context risk was observed; retained Three/R3F spatial rendering on supported desktops.
- Stabilized lazy Canvas diagnostic callbacks after LAN Safe Mode inspection exposed a `Maximum update depth exceeded` mount loop; verified both forced fallback and Low Canvas paths reach Idle.

## 1.1.1 — 2026-07-26

- Extended normal Spatial Glass Stardust timing to 900ms and delayed scene commit to 560ms / 62.2%.
- Unified Overlay, Camera and 3D shard timing through the Zustand transition start timestamp and shared timeline configuration.
- Strengthened shard geometry, material, rotation and rim-light presence without increasing fragment count; added development-only 0.25×/0.5×/1× transition diagnostics.

## 1.1.0 — 2026-07-26

- Added a lazy-loaded React Three Fiber spatial cinema layer with true 3D star depth, Galaxy core, damped camera parallax and WebGL fallback to the v1.0 CSS universe.
- Added core-origin low-poly 3D Glass Shards for Awaken, Focus and Back while preserving 760ms transition timing and 380ms scene commit.
- Added spatial architecture, camera motion and performance-budget documentation. No postprocessing dependency or external 3D assets were introduced.
- Added Vite renderer dependency de-duplication for the lazy Three/R3F/Drei path after development inspection identified duplicate renderer-context risk.

## 1.0.6 — 2026-07-26

- Rebuilt Glass Stardust foreground paths around a core-origin Center Impact and symmetric radial helpers.
- Added split position/depth transforms, radial near-lens tails, trajectory tests, and development-only transition debug controls.

## 1.0.5 — 2026-07-26

- Reoriented foreground Glass Stardust shards into a perspective Z-axis camera rush with Focus, Awaken and Back depth variants.
- Added near-lens blur/refraction tails and compact-mobile limits without changing transition timing or state flow.

## 1.0.4 — 2026-07-26

- Extended Glass Stardust Transition to 760ms with a 380ms delayed scene commit.
- Added tiered foreground/midground/background fragments, quality-scaled stardust density, stronger directional blur/refraction, and timing coverage tests.

## 1.0.3 — 2026-07-26

- Added the 520ms Glass Stardust Transition overlay for major Galaxy scene changes.
- Added centralized transition locking, Motion Off fallback, Presentation cleanup, and state tests for repeated input and reset behavior.

## 1.0.0 — 2026-07-26

- Created the E.X Galaxy local React/Vite prototype.
- Added responsive programmatic galaxy visuals, data-driven module system, Video Studio workflow simulation, and Presentation Mode controls.
- Added quality, Motion Off, language selection state, test, lint, build and operational documentation.

## 1.0.1 — 2026-07-26

- Added cinematic E.X initialization Loading screen with staged statuses and controlled progress.
- Reworked the entry state flow to prevent automatic Idle Galaxy awakening.
- Added tap-versus-drag input classification and isolated Presentation Mode scheduling.

## 1.0.2 — 2026-07-26

- Applied a Product Design-led visual impact upgrade using the supplied UI references and live local-screen audit.
- Added visual-impact tokens, deeper CSS galaxy layers, staged Awakened reveal, constellation timing, and a stronger semantically differentiated Video Studio core.
- Added visual system, motion specification and Product Design audit documentation. No functional AI, media, cloud or renderer scope was added.
