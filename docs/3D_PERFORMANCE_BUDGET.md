# Spatial 3D Performance Budget — v1.1

## Budget principles

- Transparent Canvas only; DOM text and controls never receive postprocessing.
- No external 3D assets, texture downloads, continuous allocation, animation RAF outside React Three Fiber, or high-poly models.
- Point buffers and three pooled shard geometries are created once per mounted scene. Geometry/material cleanup occurs on unmount.
- Browser background tabs avoid particle/core rotation updates; visibility does not schedule another timer.

| Mode | DPR cap | Far/Mid/Near stars | Dust | Shards | Expensive postprocessing |
| --- | --- | --- | --- | --- | --- |
| High | 1.75 | 1100 / 620 / 220 | 330 | 14 | None in v1.1 baseline |
| Balanced (default) | 1.35 | 720 / 390 / 140 | 190 | 12 | None in v1.1 baseline |
| Low | 1.0 | 280 / 150 / 55 | 75 | 7 | Disabled |
| Mobile | 1.0 | Low-derived | 52 | 6 | Disabled |

Mobile Safe Mode uses a basic transparent `MeshStandardMaterial` instead of transmission/clearcoat physical glass, limits DPR to `1.0`, uses no expensive scene lights beyond ambient support, and never adds postprocessing. Auto mode selects CSS fallback instead if WebGL fails, reduced motion is requested, or conservative mobile capability signals report insufficient texture, memory or CPU capacity.

The implementation intentionally does not add `@react-three/postprocessing` in v1.1.1. Presence is improved through low-poly geometry scale, material highlights and two constrained Canvas rim lights, not bloom, depth-of-field or chromatic aberration. A future measured performance pass may evaluate a selective bloom only for High.

## Delivery size

SpatialCanvas is loaded via React lazy import. The existing application chunk remains independently available while the Three/R3F/Drei chunk loads behind the initialization screen. Vite explicitly de-duplicates React, React DOM, Three and React Three Fiber because the spatial layer must never render with a second renderer context. The production build currently reports about 889 kB minified / 237 kB gzip for the lazy spatial chunk; this needs monitoring before external deployment but does not block local prototype recording.
