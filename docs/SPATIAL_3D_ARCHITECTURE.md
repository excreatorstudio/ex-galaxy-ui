# E.X Galaxy v1.1 Spatial Cinematic 3D Layer

## Boundary

The v1.1 renderer is an additive, transparent React Three Fiber Canvas. The existing CSS GalaxyScene stays mounted underneath it and every DOM interface stays above it. This preserves the v1.0 manual interaction state machine and makes the CSS scene the WebGL fallback. No preload helper or external 3D asset is required for the runtime.

```text
CSS GalaxyScene (fallback / atmospheric base)
  -> SpatialCanvas (transparent Three.js depth layer)
     -> StarVolume / NebulaDust
     -> GalaxyCore3D
     -> CameraRig + CameraTransitionController
     -> GlassShardField3D during a locked scene transition
  -> Existing DOM Idle / Awakened / Module Focus / Video Studio UI
  -> DOM TransitionOverlay blur + refraction helper
```

## State ownership

Zustand remains the only owner of application phase. `sceneTransition` drives the Camera and shard field, but neither can call `awaken`, `focus`, `back`, or commit a scene. `sceneTransitionStartedAt` is written atomically when a transition is requested. Overlay, Camera and shards calculate from the same 900ms timeline: commit at 560ms / 62.2%, cleanup at 900ms. `spatialActive` records only whether the optional Canvas is available; it never represents application state.

## Recovery boundary and LAN safety

`SpatialLayer` evaluates the current-host query before importing Canvas. `?spatial=off` prevents the import; `?spatial=low` requests the safe Low renderer; `?spatial=auto` is the default assessment. `SpatialErrorBoundary` wraps only the lazy Canvas. If a lazy import, renderer, mesh material or R3F render fails, the boundary unmounts Canvas and updates a development diagnostic while the CSS GalaxyScene and all DOM UI remain visible. Vite uses the host-relative base `/`; the chunk request therefore uses the LAN IP origin rather than a hard-coded localhost address.

## 3D scene primitives

- `StarVolume`: deterministic far, mid and near point clouds. No external texture or asset is required.
- `NebulaDust`: a restrained rotating dust volume behind the core.
- `GalaxyCore3D`: three particle rings, a low-cost energy sphere and point light.
- `CameraRig`: damped pointer yaw/pitch and an extremely slow idle drift.
- `CameraTransitionController`: procedural awaken/focus/back dolly offsets only.
- `GlassShardField3D`: fixed count of three reusable thick low-poly octahedron fragment geometries from the core toward the camera plane. Each shard has its own transparent physical material.
- `WebGLFallback`: avoids mounting the Canvas if the browser cannot create WebGL; the v1.0 CSS scene remains fully usable.

## Transition integration

When the Canvas is ready, CSS foreground shards and stardust are suppressed to prevent duplicate large-fragment effects. The DOM overlay keeps only short blur/refraction support. When Canvas is unavailable, CSS Glass Stardust follows the same 900ms rhythm. Reduced Motion always uses the DOM short blur fade and does not launch 3D shards.
