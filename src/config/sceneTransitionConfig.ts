import type { SceneTransitionKind } from '../types'

export const sceneTransitionConfig = {
  normal: { durationMs: 900, commitMs: 560, commitProgress: 560 / 900 },
  reduced: { durationMs: 240, commitMs: 120, commitProgress: .5 },
  phases: { compressionEnd: 180 / 900, rushEnd: 560 / 900 },
  camera: {
    focus: { pullback: .5, dollyAtCommit: -2.25, settle: -1.28 },
    awaken: { pullback: .18, dollyAtCommit: -.86, settle: -.58 },
    return: { pullback: -.12, dollyAtCommit: 1.68, settle: .82 },
  },
  shards: {
    originZ: -4.6,
    focusNearLensZ: 9.2,
    awakenNearLensZ: 10.15,
    passThroughZ: 15.9,
    returnNearLensZ: 13.4,
    returnDepthZ: -5.6,
    radialAmount: .46,
  },
} as const

export interface TransitionTiming { durationMs: number; commitMs: number; commitProgress: number }

export function getTransitionTiming(motionOff: boolean): TransitionTiming {
  return motionOff ? sceneTransitionConfig.reduced : sceneTransitionConfig.normal
}

export function getTransitionProgress(startedAt: number | null, now: number, motionOff: boolean, playbackRate = 1) {
  if (!startedAt) return 0
  const timing = getTransitionTiming(motionOff)
  return Math.max(0, Math.min(1, ((now - startedAt) * playbackRate) / timing.durationMs))
}

export function getTransitionVariant(kind: SceneTransitionKind) {
  return kind === 'return' ? sceneTransitionConfig.camera.return : sceneTransitionConfig.camera[kind]
}
