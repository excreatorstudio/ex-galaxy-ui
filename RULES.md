# Development Rules

## v1.2 Showcase+ commercial boundary

- Keep Account, Credits, Subscription, and Enterprise capabilities mock-only until a separately approved backend scope exists.
- Do not add payment, checkout, real authentication, database, or remote API behavior to the static showcase.
- UI must use platform adapters and feature flags; it must not bind directly to commercial mock fixtures.
- Preserve the 4.2s Loading and 900ms / 560ms spatial-transition contracts unless a later version explicitly authorizes their change.

- Keep the SpatialCanvas additive and optional: no WebGL feature may be required for DOM controls, state flow, Presentation Mode, or fallback rendering.
- Camera and 3D shard animation may read `sceneTransition` but must never set application phase, schedule transition commits, or create a second presentation timer.
- Keep 3D effects fixed-count, asset-free and quality/DPR bounded; do not add global bloom, full-screen DOF, or postprocessing that reduces DOM text clarity.
- Core Activation must read its shared Zustand/config timestamp only; Canvas and CSS renderers may not independently complete it or mutate phase. The local MOV reference is never a runtime import, autoplay asset, or production background.

- Preserve visual dark reserve and one active cold-light focal point; do not solve impact with global bloom, rainbow accents, dense equal cards, or high-frequency motion.
- Keep UI emergence staged by depth; do not reintroduce simultaneous Dashboard-style fades.
- Any new visual timing must honour Motion Off and must not schedule presentation behavior in Manual Experience Mode.

- Maintain local-first behavior: no paid API, API key, account, or online-service dependency.
- Keep simulation language clear; never represent Auto Create or Export Demo as real video processing.
- Do not use the provided visual references as runtime background or copy their brands/products/layouts.
- Use centralized Zustand state for major application phase and workflow transitions.
- Preserve keyboard access, focus visibility, Esc return, and Motion Off / reduced-motion behavior.
- Avoid high-cost, persistent effects and uncontrolled animation loops.
- In Manual Experience Mode, never automatically transition from `idle` to `awakened`.
- Never use mousemove or pointermove as an entry trigger; those events are parallax-only.
- Loading completion must only reveal the Idle Galaxy, never the complete interface.
