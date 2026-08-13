# Camera Motion Specification — v1.1

## Creative Orbit activation isolation

Video Studio Auto Create activation has no camera or world-position keyframes. Its fixed DOM anchor remains centered while visual descendants breathe. Camera / parallax motion remains exclusively owned by the Galaxy Spatial layer and the existing 900ms / 560ms scene transition timeline.

## Idle

- Base camera: `(0, 0, 12)`, FOV `48`, near plane `0.1`, far plane `90`.
- Pointer parallax: maximum `0.32` world units on X and `0.22` on Y, with exponential damping.
- Environmental drift: approximately `0.075` world units at low frequency.
- Motion Off: pointer and drift offsets resolve to zero; only a low-frequency core pulse remains.

## Scene transitions

The global Glass Stardust schedule is now **900ms total**, **560ms / 62.2% scene commit**.

## Progressive radial shard schedule

| Wave | Start | Lens / pass behavior | Spatial role |
| --- | ---: | --- | --- |
| Center Lead | 170ms | near lens 470ms; pass 565ms | one central first impact with minimal XY drift |
| Primary Radial | 225ms / 260ms | passes 635ms / 705ms | opposing left and right foreground routes |
| Secondary Spread | 285–395ms | reaches broad mid-depth 640–770ms | slower surrounding left/right/up/down fill; no required camera crossing |
| Stardust Tail | 425–520ms | remains visible through 800–880ms | delayed small fragments creating an outward perspective tail |

Foreground starts use Z `-4.6`, `-5.7` and `-6.5`; the first two radial helpers expand their displacement by roughly 37% over the previous clustered path, while Z movement remains dominant. The Center Lead reaches near-lens space before the 560ms scene commit; later waves continue across the new scene, preventing a single synchronous shard wall.

| Variant | 0–180ms | 180–420ms | 420–760ms |
| --- | --- | --- | --- |
| Awaken | Core energy rises, restrained `+0.18` anticipation | Dolly reaches `-0.86`; shard arrives near lens before commit | Camera settles into interface depth |
| Focus | Camera first pulls back `+0.50`, core contracts | Dolly reaches `-2.25`; Center Impact arrives near lens at commit | Camera decelerates into module-focus framing |
| Back | Near focus holds briefly | Camera withdraws to `+1.68`; shards release toward depth | Galaxy wide view reopens |

Camera offsets are visual-only and do not alter Zustand phase. `sceneTransitionStartedAt` drives both the overlay and Canvas progress, so the new DOM scene enters only after near-lens arrival rather than before spatial crossing.

## Core Activation camera coexistence ??v1.2

The 900ms / 560ms Glass Stardust camera transition remains unchanged. Its Awaken commit starts the independent Core Activation timestamp only after the camera/shard crossing has committed the Awakened scene. Activation multiplies the 3D core's visual scale and light response but never changes camera position, scene transition timing, or application phase. Focus and Back continue to use their existing camera paths; Back returns with the short reconnect visual only.

When `restartGalaxyExperience()` clears `sceneTransition`, `CameraTransitionController` resolves `cameraZ`, core scale and core energy to Idle values on its next render frame. `GlassShardField3D` receives no active transition and unmounts immediately; the same restart remains valid when Canvas is unavailable and CSS fallback is active.

On Mobile Safe Mode, camera transitions retain the same phase timing but use Low quality density and no physical-transmission material. If the capability assessment refuses Canvas, the existing DOM transition owns the same visual state change.

## 3D shard trajectory

### v1.1.1 amendment

The current schedule is 900ms total with a 560ms / 62.2% commit. Focus uses 0–180ms compression, 180–560ms dolly and near-lens arrival, then 560–900ms pass-through/refocus. Focus reaches camera offset `-2.25` at commit; Awaken reaches `-0.86`; Back reaches `+1.68`. Center Impact travels from Z `-4.6` to `9.2` by commit and only then advances to Z `15.9` through the camera region. This amendment supersedes the historical timing table above.

Focus fragments originate within roughly `0.5` world units of the 3D core. The primary Center Impact fragment uses nearly zero XY drift; assistant fragments separate by only about `0.46` of their radial vector while moving from Z `-4.6` to `9.2` at commit, then to `15.9` after commit. This is a true camera-plane crossing, not CSS XY translation. Back uses its own release path from the near camera toward deep space.
