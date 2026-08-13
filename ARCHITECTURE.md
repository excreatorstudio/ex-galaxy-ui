# Architecture

## v1.2 Creative Orbit activation boundary

`GalaxyScene` and `GalaxyCore3D` own only the ambient Galaxy Hero. `VideoStudio` owns the Creative Orbit Auto Create DOM sphere. `project-core-anchor` is a fixed placement layer, while `project-core-visual`, halo, and Energy Ring are independent visual layers. Zustand keeps a project-only timestamp lifecycle (`projectCoreActivation*`); `ProjectCoreActivationController` is mounted only inside Video Studio and owns the one completion timeout. Presentation reads that scoped state only at its Video Studio chapter.

## v1.2 Showcase+ platform layer

`src/i18n/` owns stable locale keys, dictionaries, browser-language resolution, and safe localStorage persistence. UI components consume `useI18n()`; untranslated keys fall back to English and then expose their key rather than failing silently.

`src/features/account/` owns compact account controls and the visual console. `src/features/credits/creditsConfig.ts` owns showcase allocations and estimated usage values. The UI obtains all profile, credits, plans, and Enterprise behavior via `src/services/platform/platformService.ts`, whose `PlatformAdapters` interfaces live in `src/services/platform/types.ts`. The only current implementation is `mockPlatformAdapters`; `backendConfig.ts` reserves future remote endpoint configuration while returning the mock service safely.

The new panels are DOM glass layers above the existing scene but below an active `TransitionOverlay`. `SpatialCanvas` remains optional and pointer-transparent. Zustand continues to own the Galaxy phase machine; it only holds panel visibility/refresh state, not commercial fixture data.

Foreground shards are now `shard-position > shard-depth`: the outer element is centered on the Galaxy core and animates only constrained radial XY movement; the inner fragment owns all 3D depth/scale/rotation/blur. `transitionTrajectories.ts` is the data source for core origin, foreground quality counts and development-only debug-query parsing.

Foreground Glass Stardust rendering remains fixed-DOM CSS. The overlay supplies `perspective: 1100px` and `preserve-3d`; only foreground fragment transforms use the camera-rush Z range. Midground/background fragments, timers, scene commit and store locking remain unchanged.

`TransitionOverlay` derives two scoped timer offsets from `sceneTransitionStartedAt` and shared configuration: `commitSceneTransition` at 560ms / 62.2% (120ms in Motion Off) and `clearSceneTransition` at 900ms (240ms in Motion Off). Camera and GlassShardField3D calculate the same normalized progress from that timestamp, so the active scene stays visible until the spatial shards have reached near-lens arrival.

`TransitionOverlay` is a small fixed-DOM scene layer controlled by `sceneTransition` in `useGalaxyStore`. `transitionAwaken`, `transitionFocus`, and `transitionBack` atomically set the target phase and transition kind only when no overlay is active. It commits at 560ms / 62.2% and clears at 900ms; Presentation restart, exit and store reset clear the transition state immediately.

## v1.1 Spatial Canvas

`SpatialLayer` assesses `spatial=off|low|auto`, then lazy loads `SpatialCanvas` between CSS `GalaxyScene` and all DOM UI. `SpatialErrorBoundary` wraps only that canvas: a dynamic-import, renderer, material or render failure removes Canvas and records diagnostics, but cannot unmount AppShell, Loading or DOM UI. Its WebGL check fails closed, leaving CSS fully visible. `StarVolume`, `NebulaDust`, `GalaxyCore3D`, `CameraRig`, `CameraTransitionController`, `GlassShardField3D`, `spatialCapability` and `spatialShardMotion` are isolated under `src/features/spatial/`. The Canvas cannot mutate phase. When active, `TransitionOverlay` retains blur/refraction but defers foreground shard rendering to Three.js so both systems never stack large fragments.

## v1.2 Core Activation timeline

`coreActivationConfig.ts` supplies the declarative Creative Orbit full/reconnect/reduced timing model. `useGalaxyStore` owns phase-guarded `projectCoreActivation*` state. `ProjectCoreActivationController`, mounted only by `VideoStudio`, owns the completion timeout. `VideoStudio` passes its selected delays to the CSS halo, ring, connection and node layers. `GalaxyScene` and `GalaxyCore3D` are intentionally excluded. Reset paths clear project activation state, and Presentation waits only for its Video Studio chapter.

## Display-grade visual layer

`src/config/designTokens.ts` records reusable visual constants and `src/styles/impact.css` applies the cinematic depth layer over existing modular CSS. `GalaxyScene` owns procedural stars, core, nebula, orbit lines and delayed module planets. `GalaxyInterface` owns staged navigation, brand, card and footer appearance. `VideoStudio` owns its layered Auto Create core, semantic node classes and lifecycle-safe workflow interval. Design intent and timing are recorded in `docs/PRODUCT_DESIGN_AUDIT.md`, `docs/VISUAL_IMPACT_SYSTEM.md` and `docs/UI_MOTION_SPEC.md`.

```text
App
├─ Zustand store (phase, experience mode, language, quality, motion, workflow, presentation)
├─ LoadingScreen (single scoped initialization timer)
├─ GalaxyScene (generated stars / nebula / core / orbit / module nodes)
├─ GalaxyInterface (awakened navigation and generated media cards)
├─ ModuleFocus
│  ├─ Coming Soon preview
│  └─ VideoStudio (core, nodes, drag media orbit, timeline, export simulation)
└─ PresentationController
```

Manual state is `loading → idle → awakened → module-focus`. `completeLoading` only reaches idle; `awaken` and `focus` are phase-guarded. `LoadingScreen` owns only its scoped interval. Presentation Mode is separately represented by `experienceMode: 'presentation'` plus its controller, so its auto-script cannot mutate Manual Experience Mode. Configuration belongs in `src/config/`; content-like simulated assets belong in `src/data/`; primitives use `src/types/`; styling is isolated in `src/styles/`.
