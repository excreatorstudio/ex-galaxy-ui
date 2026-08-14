import type { AppPhase, SceneTransitionKind } from '../types'

export const mobileHomepageBreakpointPx = 560

/**
 * Mobile Homepage is the only long-form scene. Every immersive or in-flight
 * scene keeps the document locked so a transition cannot be scrolled midway.
 */
export function isMobileHomepageScrollEnabled(phase: AppPhase, sceneTransition: SceneTransitionKind | null) {
  return phase === 'awakened' && sceneTransition === null
}

export const mobileRadialTransition = {
  cssShardCount: 6,
  stardustCount: 4,
  durationMs: 900,
  commitMs: 560,
} as const

export type MobileRadialWave = 'center-lead' | 'primary-radial' | 'secondary-spread' | 'stardust-tail'

export const mobileCssRadialShards: readonly { id: string; wave: MobileRadialWave; originX: number; originY: number; endX: number; endY: number; delayMs: number }[] = [
  { id: 'center-impact', wave: 'center-lead', originX: 0, originY: 0, endX: 3, endY: -2, delayMs: 0 },
  { id: 'left-radial', wave: 'primary-radial', originX: -3, originY: 2, endX: -42, endY: 8, delayMs: 55 },
  { id: 'right-radial', wave: 'primary-radial', originX: 3, originY: -2, endX: 42, endY: -10, delayMs: 75 },
  { id: 'upper-spread', wave: 'secondary-spread', originX: -2, originY: -3, endX: -15, endY: -38, delayMs: 120 },
  { id: 'lower-spread', wave: 'secondary-spread', originX: 2, originY: 3, endX: 18, endY: 39, delayMs: 145 },
  { id: 'stardust-tail', wave: 'stardust-tail', originX: 0, originY: 3, endX: -6, endY: 23, delayMs: 210 },
]

export const mobileRadialStardust = [
  { x: '-34vw', y: '-27vh', rotation: '-142deg', delay: '160ms' },
  { x: '36vw', y: '-20vh', rotation: '-28deg', delay: '205ms' },
  { x: '-25vw', y: '31vh', rotation: '132deg', delay: '255ms' },
  { x: '28vw', y: '34vh', rotation: '42deg', delay: '305ms' },
] as const

let mobileHomepageReturnScrollTop = 0

export function captureMobileHomepageScroll(scrollTop: number) {
  mobileHomepageReturnScrollTop = Math.max(0, scrollTop)
}

export function getMobileHomepageReturnScroll() {
  return mobileHomepageReturnScrollTop
}
