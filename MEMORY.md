# Continuation Memory

## 2026-08-13 ??v1.2 Core Activation Sequence

`src/config/coreActivationConfig.ts` owns the full 6200ms Core Activation curve, connection/node delays, 5200ms Mobile version, 760ms Reduced Motion alternative, and 720ms Module-return reconnect. `useGalaxyStore` owns activation state/timestamp; `CoreActivationController` is the only completion timer. CSS `GalaxyScene` and optional R3F `GalaxyCore3D` read that same timeline. Presentation waits until activation is complete. `references/motion/core-breathing-reference.MOV` is inspection-only and must never be imported or deployed as a runtime asset; see `references/motion/README.md` and `docs/CORE_ACTIVATION_SEQUENCE.md`.

## 2026-07-26 — v1.1.5 Stable finalized

E.X Galaxy UI Prototype v1.1.5 was formally finalized on 2026-07-26. Its stable recovery archive is `releases/E.X-Galaxy-v1.1.5-stable-20260726.zip`. Do not modify this baseline directly; all later Galaxy work must use a new version. The next development sequence is Ernest Video Autopilot v1.2.

## 2026-07-26 — v1.1 Spatial Cinematic 3D Layer

`src/features/spatial/` is an additive lazy-loaded React Three Fiber layer. Preserve the CSS GalaxyScene underneath as the no-WebGL fallback and never let Camera or Three objects mutate the Zustand phase machine. `sceneTransitionStartedAt` synchronizes Camera/shards and the Overlay schedule at 560ms commit / 900ms cleanup. The pre-v1.1 recoverable archive is `releases/E.X-Galaxy-v1.0.0-stable-pre-v1.1-20260726.zip`; the workspace did not contain Git metadata at the time of the v1.1 change.

## 2026-07-26 — Display-grade visual upgrade

`src/styles/impact.css` and `src/config/designTokens.ts` are the visual source of truth alongside `docs/PRODUCT_DESIGN_AUDIT.md`, `docs/VISUAL_IMPACT_SYSTEM.md`, and `docs/UI_MOTION_SPEC.md`. Preserve dark reserve, a single dominant core, staged UI emergence, semantic Video Studio nodes, and no global bloom. The audit used the three supplied PNGs and live local screens; no RAY video was present.

The initial v1.0 build uses a dependency-light CSS universe under `src/features/galaxy/GalaxyScene.tsx`; the reference PNGs remain inspection-only and are not rendered into the app. State is centralized at `src/state/useGalaxyStore.ts`. New tools should be added in `src/config/moduleDefinitions.ts`, then selectively receive an implementation from `ModuleFocus`.

Run from this directory with `npm.cmd run dev`. PowerShell may block `npm.ps1`; use `npm.cmd` directly.

Entry flow after the 2026-07-26 refinement is centralized in `useGalaxyStore`: `loading → idle → awakened → module-focus`. Manual mode never auto-awakens; `LoadingScreen` is the sole manual initialization timer and cleans up on unmount. Presentation starts through `startPresentation`, waits for loading to reach idle, then owns its independent script timer.
