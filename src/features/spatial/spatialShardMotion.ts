import { sceneTransitionConfig } from '../../config/sceneTransitionConfig'
import type { SceneTransitionKind } from '../../types'

export type ShardWave = 'center-lead' | 'primary-radial' | 'secondary-spread' | 'stardust-tail'

export interface ShardSeed {
  wave: ShardWave
  x: number
  y: number
  radialX: number
  radialY: number
  radialStrength: number
  startZ: number
  startMs: number
  nearLensMs: number
  passThroughMs?: number
  targetZOffset: number
  scale: number
  rotation: number
  rotationSpeed: number
}

/** Fixed-count waves: Center first, radial foreground next, then depth-filling secondary/tail fragments. */
export const spatialShardSeeds: readonly ShardSeed[] = [
  { wave: 'center-lead', x: 0, y: 0, radialX: .04, radialY: -.025, radialStrength: .14, startZ: -4.6, startMs: 170, nearLensMs: 470, passThroughMs: 565, targetZOffset: 0, scale: 1.9, rotation: .3, rotationSpeed: 1.34 },
  { wave: 'primary-radial', x: -.46, y: .16, radialX: -1.55, radialY: .32, radialStrength: .55, startZ: -5.7, startMs: 225, nearLensMs: 535, passThroughMs: 635, targetZOffset: .46, scale: 1.2, rotation: 1.2, rotationSpeed: 1.08 },
  { wave: 'primary-radial', x: .44, y: -.16, radialX: 1.6, radialY: -.3, radialStrength: .55, startZ: -6.5, startMs: 260, nearLensMs: 590, passThroughMs: 705, targetZOffset: .88, scale: 1.17, rotation: -.9, rotationSpeed: .94 },
  { wave: 'secondary-spread', x: -.16, y: -.32, radialX: -1.8, radialY: -1.45, radialStrength: .66, startZ: -7.25, startMs: 285, nearLensMs: 640, targetZOffset: -1.35, scale: .69, rotation: 2, rotationSpeed: .78 },
  { wave: 'secondary-spread', x: .2, y: .34, radialX: 1.72, radialY: 1.5, radialStrength: .66, startZ: -8.05, startMs: 315, nearLensMs: 680, targetZOffset: -1.05, scale: .64, rotation: -2, rotationSpeed: .72 },
  { wave: 'secondary-spread', x: -.62, y: -.14, radialX: -2.05, radialY: -.46, radialStrength: .64, startZ: -8.8, startMs: 335, nearLensMs: 705, targetZOffset: -1.72, scale: .47, rotation: .7, rotationSpeed: .68 },
  { wave: 'secondary-spread', x: .62, y: .2, radialX: 2.02, radialY: .5, radialStrength: .64, startZ: -9.55, startMs: 355, nearLensMs: 730, targetZOffset: -1.48, scale: .45, rotation: -1.5, rotationSpeed: .64 },
  { wave: 'secondary-spread', x: -.3, y: .5, radialX: -.72, radialY: 2.08, radialStrength: .62, startZ: -10.3, startMs: 375, nearLensMs: 750, targetZOffset: -2.15, scale: .31, rotation: .2, rotationSpeed: .58 },
  { wave: 'secondary-spread', x: .3, y: -.5, radialX: .72, radialY: -2.08, radialStrength: .62, startZ: -11.05, startMs: 395, nearLensMs: 770, targetZOffset: -2.25, scale: .29, rotation: 1.1, rotationSpeed: .54 },
  { wave: 'stardust-tail', x: -.82, y: .42, radialX: -2.28, radialY: .86, radialStrength: .7, startZ: -11.8, startMs: 425, nearLensMs: 800, targetZOffset: -3.25, scale: .25, rotation: -.4, rotationSpeed: .48 },
  { wave: 'stardust-tail', x: .8, y: -.44, radialX: 2.26, radialY: -.88, radialStrength: .7, startZ: -12.55, startMs: 450, nearLensMs: 825, targetZOffset: -3.38, scale: .23, rotation: .55, rotationSpeed: .44 },
  { wave: 'stardust-tail', x: .06, y: .68, radialX: .18, radialY: 2.22, radialStrength: .68, startZ: -13.3, startMs: 475, nearLensMs: 845, targetZOffset: -3.7, scale: .2, rotation: 1.9, rotationSpeed: .4 },
  { wave: 'stardust-tail', x: -.06, y: -.68, radialX: -.18, radialY: -2.22, radialStrength: .68, startZ: -14.05, startMs: 500, nearLensMs: 865, targetZOffset: -3.85, scale: .18, rotation: -1.8, rotationSpeed: .36 },
  { wave: 'stardust-tail', x: .94, y: .06, radialX: 2.48, radialY: .14, radialStrength: .68, startZ: -14.8, startMs: 520, nearLensMs: 880, targetZOffset: -4.08, scale: .16, rotation: .95, rotationSpeed: .32 },
]

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }
const rush = (value: number, acceleration: number) => 1 - Math.pow(1 - clamp(value), acceleration)
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount

export function getSpatialShardCount(quality: 'high' | 'balanced' | 'low', mobile: boolean) {
  if (mobile) return 6
  return quality === 'high' ? 14 : quality === 'balanced' ? 12 : 7
}

export function getShardNearPlaneCrossingMs(seed: ShardSeed) {
  return seed.passThroughMs ?? seed.nearLensMs
}

function getReturnPose(seed: ShardSeed, index: number, progress: number) {
  const radialProgress = 1 - smooth(progress)
  return {
    x: seed.x + seed.radialX * radialProgress * sceneTransitionConfig.shards.radialAmount,
    y: seed.y + seed.radialY * radialProgress * sceneTransitionConfig.shards.radialAmount,
    z: mix(sceneTransitionConfig.shards.returnNearLensZ, sceneTransitionConfig.shards.returnDepthZ, smooth(progress)),
    scale: Math.max(.01, seed.scale * mix(1.9, .22, smooth(progress))),
    opacity: Math.max(0, Math.min(index === 0 ? .62 : .5, progress > .84 ? (1 - progress) * 3.5 : index === 0 ? .62 : .5)),
    rotation: [seed.rotation + progress * (2.2 + index * .17), seed.rotation * .72 - progress * (2.05 + index * .13), seed.rotation * .35 + progress * (2.85 + index * .11)] as const,
  }
}

export function getSpatialShardPose(seed: ShardSeed, index: number, progress: number, transition: SceneTransitionKind) {
  if (transition === 'return') return getReturnPose(seed, index, progress)
  const durationMs = sceneTransitionConfig.normal.durationMs
  const timeMs = clamp(progress) * durationMs
  const hasStarted = timeMs >= seed.startMs
  const approachDuration = Math.max(1, seed.nearLensMs - seed.startMs)
  const approach = hasStarted ? rush((timeMs - seed.startMs) / approachDuration, seed.wave === 'center-lead' ? 3.25 : 2.05 + (index % 3) * .22) : 0
  const nearZ = (transition === 'awaken' ? sceneTransitionConfig.shards.awakenNearLensZ : sceneTransitionConfig.shards.focusNearLensZ) + seed.targetZOffset
  const pass = seed.passThroughMs ? smooth((timeMs - seed.nearLensMs) / Math.max(1, seed.passThroughMs - seed.nearLensMs)) : 0
  const z = !hasStarted
    ? seed.startZ
    : seed.passThroughMs && timeMs > seed.nearLensMs
      ? mix(nearZ, sceneTransitionConfig.shards.passThroughZ, pass)
      : mix(seed.startZ, nearZ, approach)
  const radialProgress = hasStarted ? smooth(Math.min(1, (timeMs - seed.startMs) / Math.max(1, seed.nearLensMs - seed.startMs))) : 0
  const scale = !hasStarted
    ? .01
    : seed.scale * (timeMs < seed.nearLensMs ? mix(.18, 2, approach) : seed.passThroughMs ? mix(2, 2.28, pass) : mix(2, 1.56, smooth((timeMs - seed.nearLensMs) / Math.max(1, durationMs - seed.nearLensMs))))
  const tailFadeStart = durationMs - 140
  const secondaryFadeStart = durationMs - 110
  const fading = seed.wave === 'stardust-tail' ? smooth((timeMs - tailFadeStart) / 140) : seed.passThroughMs ? smooth((timeMs - seed.passThroughMs) / Math.max(1, durationMs - seed.passThroughMs)) : smooth((timeMs - secondaryFadeStart) / 110)
  const maxOpacity = index === 0 ? .62 : seed.wave === 'primary-radial' ? .5 : .38
  return {
    x: seed.x + seed.radialX * radialProgress * seed.radialStrength,
    y: seed.y + seed.radialY * radialProgress * seed.radialStrength,
    z,
    scale: Math.max(.01, scale),
    opacity: hasStarted ? Math.max(0, Math.min(maxOpacity, approach * 2.8) * (1 - fading)) : 0,
    rotation: [seed.rotation + approach * (2.2 + index * .17) * seed.rotationSpeed, seed.rotation * .72 - approach * (2.05 + index * .13) * seed.rotationSpeed, seed.rotation * .35 + approach * (2.85 + index * .11) * seed.rotationSpeed] as const,
  }
}
