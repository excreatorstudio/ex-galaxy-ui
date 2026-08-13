# Video Studio Creative Orbit Activation Sequence

## Scope correction — 2026-08-13

The activation sequence belongs exclusively to the Video Studio / Autopilot Creative Orbit central **Auto Create** sphere (`button.auto-core`). It does not control the Galaxy Hero, `GalaxyScene`, `GalaxyCore3D`, Camera, Spatial orbit, or Awakened landing composition.

## Implementation

- Component: `src/features/video-studio/VideoStudio.tsx`
- Controller: `src/features/video-studio/ProjectCoreActivationController.tsx`
- Timeline: `src/config/coreActivationConfig.ts`
- Store lifecycle: `projectCoreActivationState`, timestamp, mode, duration, pause state, and reset actions in `src/state/useGalaxyStore.ts`
- CSS fallback: `src/styles/core-activation.css`

`project-core-anchor` is fixed at `left: 50%; top: 47%` and is the only element responsible for placement. `project-core-visual` applies scale and brightness; halo and energy-ring layers are siblings. No activation animation changes `translateX`, `translateY`, `position.x`, `position.y`, orbit center, or camera.

## Timeline

| Mode | Duration | Use |
| --- | ---: | --- |
| Full desktop | 5600ms | Video Studio Auto Create start |
| Full mobile | 4800ms | Mobile Safe Mode |
| Reconnect | 720ms | Optional scoped reconnect |
| Reduced Motion | 760ms | Fade, ring, connection and node reveal only |

The visual-match progression keeps the core stable after its final pulse: `1.00 → 1.11 → 1.025 → 1.16 → 1.04 → 1.22 → 1.14`. Brightness reaches a controlled `1.56` peak, then settles at `1.28`. A fixed, radial `project-core-light-field` expands `1.00 → 1.25 → 1.40 → 1.72 → 1.40` while its opacity rises from `.18` to `.76`, then settles at `.52`.

Halo propagation is intentionally delayed after the core: Light Field `45ms`, Inner `75ms`, Mid `145ms`, Outer `215ms`, then Energy Ring `285ms`. The final 700ms pulse releases core brightness first, followed by the soft halos, outer light field, Energy Ring, connection field and nodes. The Energy Ring expands `1.00 → 1.12 → 1.23 → 1.38 → 1.18` as it completes. Mobile retains the complete story at lower cost: its outer halo peak is capped at `1.56` (about 15% below desktop) and the field blur is reduced.

## Lifecycle and presentation

- Auto Create starts the project activation and the existing mock workflow from the same user action.
- Restart, exit, back-to-Galaxy and reset clear project activation state and its scoped completion timer.
- Presentation waits only at its Video Studio chapter (chapter 4) for `projectCoreActivationState === 'complete'`; it no longer waits at the Galaxy Hero awaken chapter.
- Reduced Motion removes breathing scale. Mobile uses two halo layers and reduced visual cost.

## Reference boundary

`references/motion/core-breathing-reference.MOV` remains a local design reference only. It is not imported into source, public assets, or the production build.
