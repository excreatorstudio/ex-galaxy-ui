# E.X Galaxy UI Prototype v1.2.0-dev

> **Development Version: v1.2.0-dev — Showcase+ Phase 1**  
> **Stable Baseline: v1.1.5 Finalized**  
> **Stable Archive: 2026-07-26**

v1.1.5 remains frozen in its release archive. v1.2.0-dev adds static mock showcase layers only; no real account, payment, billing, or remote backend capability is present.

Major scene changes use a 900ms Glass Stardust Transition with a 560ms / 62.2% scene commit. Where WebGL is supported, the spatial layer adds true 3D core-origin shards and a damped 3D camera; otherwise the programmatic CSS transition remains available. Motion Off reduces this to a brief blur fade.

## Visual system

The prototype uses programmatic CSS visual layers plus an optional transparent Three/R3F spatial Canvas rather than a static galaxy image: generated star bands, restrained nebulae, a layered 3D galaxy core, thin orbital topology, staged glass UI, and semantic Video Studio workflow nodes. The Product Design audit and executable visual/motion specifications live in `docs/PRODUCT_DESIGN_AUDIT.md`, `docs/VISUAL_IMPACT_SYSTEM.md`, `docs/UI_MOTION_SPEC.md`, `docs/SPATIAL_3D_ARCHITECTURE.md`, `docs/CAMERA_MOTION_SPEC.md`, and `docs/3D_PERFORMANCE_BUDGET.md`. Balanced quality remains the default.

Local concept preview for an AI Creative Operating System. It is a presentation prototype, not a production editing or AI processing service.

## Requirements

Node.js 20+ on Windows. PowerShell installations that block `npm.ps1` should use `npm.cmd`.

## Start

```powershell
cd "D:\CODEX-\E.X Galaxy UI Prototype"
npm.cmd install
npm.cmd run dev
```

## Production preview

```powershell
npm.cmd run build
npm.cmd run preview -- --host 0.0.0.0 --port 4173
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`). A 4.2-second initialization sequence resolves to the pure Idle Galaxy. Click empty space or `CLICK TO ENTER`, use a short tap, or press Enter/Space to awaken the interface. Pointer movement controls parallax only. Select VIDEO, then use the central Auto Create core. Esc returns from module focus.

## Presentation Mode

Awaken the interface, then select `PRESENTATION MODE` in the upper right (or press `P`). Presentation restarts from Loading and uses an isolated scripted timer after Idle. Controls permit pause/resume, restart, skip, exit, and fullscreen. `FAST COMPLETE` is a small developer aid displayed only inside Video Studio and should not be used during recording.

## Validation

```powershell
npm.cmd run lint
npm.cmd run test
npm.cmd run build
```

See `PROGRESS.md` for checked milestones and `TASKS.md` for browser acceptance work still pending.

## LAN and mobile recovery

For a handset on the same network, start a host-bound server and open the displayed LAN address:

```powershell
cd "D:\CODEX-\E.X Galaxy UI Prototype"
npm.cmd run dev -- --host 0.0.0.0 --port 5174
npm.cmd run preview -- --host 0.0.0.0 --port 4173
```

`?spatial=off` forces the complete CSS/DOM fallback, `?spatial=low` requests the six-shard mobile-safe Canvas, and `?spatial=auto` restores default capability selection. During development only, add `&bootDebug=1` to show mounted/fallback diagnostics. Production UI never exposes those diagnostic details.
