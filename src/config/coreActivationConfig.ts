import type { CoreActivationMode } from '../types'

export interface CoreActivationTiming {
  durationMs: number
  connectionDelaysMs: readonly number[]
  nodeDelaysMs: readonly number[]
  reduced: boolean
}

export interface CoreActivationVisual {
  scale: number
  brightness: number
  innerHalo: number
  midHalo: number
  outerHalo: number
  lightFieldScale: number
  lightFieldOpacity: number
  ringScale: number
  ringProgress: number
}

interface ActivationKeyframe extends CoreActivationVisual { at: number }

// This timeline belongs only to the Video Studio / Creative Orbit auto-create core.
// Galaxy Hero motion intentionally remains independent.
const normalDurationMs = 5600
const normalConnectionDelaysMs = [1800, 2100, 2450, 2850, 3300, 3800, 4200, 4550] as const
const normalNodeDelaysMs = [2040, 2340, 2690, 3090, 3540, 4070, 4480, 4840] as const

export const coreActivationConfig = {
  normal: {
    durationMs: normalDurationMs,
    stableScale: 1.13,
    peakBrightness: 1.56,
    stableBrightness: 1.28,
    connectionDelaysMs: normalConnectionDelaysMs,
    nodeDelaysMs: normalNodeDelaysMs,
  },
  mobile: { durationMs: 4800, haloLayers: 2 },
  reduced: {
    durationMs: 760,
    connectionDelaysMs: [160, 215, 275, 340, 410, 485, 545, 600],
    nodeDelaysMs: [245, 300, 360, 425, 495, 565, 625, 680],
  },
  reconnect: {
    durationMs: 720,
    connectionDelaysMs: [80, 135, 190, 245, 300, 360, 420, 475],
    nodeDelaysMs: [155, 210, 265, 320, 380, 440, 500, 555],
  },
  confirmationFlashMs: 150,
} as const

const fullKeyframes: readonly ActivationKeyframe[] = [
  { at: 0, scale: 1, brightness: 1, innerHalo: 1, midHalo: 1, outerHalo: 1, lightFieldScale: 1, lightFieldOpacity: .18, ringScale: 1, ringProgress: .28 },
  { at: 900 / normalDurationMs, scale: 1.11, brightness: 1.14, innerHalo: 1.2, midHalo: 1.28, outerHalo: 1.08, lightFieldScale: 1.25, lightFieldOpacity: .35, ringScale: 1.12, ringProgress: .34 },
  { at: 1500 / normalDurationMs, scale: 1.025, brightness: 1.05, innerHalo: 1.05, midHalo: 1.08, outerHalo: 1.02, lightFieldScale: 1.08, lightFieldOpacity: .22, ringScale: 1.04, ringProgress: .35 },
  { at: 2500 / normalDurationMs, scale: 1.16, brightness: 1.25, innerHalo: 1.3, midHalo: 1.42, outerHalo: 1.34, lightFieldScale: 1.4, lightFieldOpacity: .48, ringScale: 1.23, ringProgress: .62 },
  { at: 3200 / normalDurationMs, scale: 1.04, brightness: 1.12, innerHalo: 1.08, midHalo: 1.12, outerHalo: 1.1, lightFieldScale: 1.16, lightFieldOpacity: .28, ringScale: 1.1, ringProgress: .7 },
  { at: 4900 / normalDurationMs, scale: 1.22, brightness: 1.56, innerHalo: 1.42, midHalo: 1.58, outerHalo: 1.84, lightFieldScale: 1.72, lightFieldOpacity: .76, ringScale: 1.38, ringProgress: .9 },
  { at: 5600 / normalDurationMs, scale: 1.14, brightness: 1.28, innerHalo: 1.2, midHalo: 1.32, outerHalo: 1.48, lightFieldScale: 1.4, lightFieldOpacity: .52, ringScale: 1.18, ringProgress: 1 },
  { at: 1, scale: 1.14, brightness: 1.28, innerHalo: 1.2, midHalo: 1.32, outerHalo: 1.48, lightFieldScale: 1.4, lightFieldOpacity: .52, ringScale: 1.18, ringProgress: 1 },
]

const reconnectKeyframes: readonly ActivationKeyframe[] = [
  { at: 0, scale: 1.14, brightness: 1.24, innerHalo: 1.16, midHalo: 1.22, outerHalo: 1.34, lightFieldScale: 1.34, lightFieldOpacity: .48, ringScale: 1.16, ringProgress: 1 },
  { at: .42, scale: 1.18, brightness: 1.38, innerHalo: 1.32, midHalo: 1.46, outerHalo: 1.56, lightFieldScale: 1.55, lightFieldOpacity: .64, ringScale: 1.28, ringProgress: 1 },
  { at: 1, scale: 1.14, brightness: 1.28, innerHalo: 1.2, midHalo: 1.32, outerHalo: 1.48, lightFieldScale: 1.4, lightFieldOpacity: .52, ringScale: 1.18, ringProgress: 1 },
]

const reducedKeyframes: readonly ActivationKeyframe[] = [
  { at: 0, scale: 1.14, brightness: .82, innerHalo: .68, midHalo: 0, outerHalo: 0, lightFieldScale: 1, lightFieldOpacity: .14, ringScale: 1, ringProgress: .28 },
  { at: .5, scale: 1.14, brightness: 1.08, innerHalo: 1.06, midHalo: .78, outerHalo: .54, lightFieldScale: 1.2, lightFieldOpacity: .34, ringScale: 1.1, ringProgress: .78 },
  { at: 1, scale: 1.14, brightness: 1.28, innerHalo: 1.2, midHalo: 1.32, outerHalo: 1.48, lightFieldScale: 1.4, lightFieldOpacity: .52, ringScale: 1.18, ringProgress: 1 },
]

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const t = clamp01(value); return t * t * (3 - 2 * t) }
const mix = (from: number, to: number, amount: number) => from + (to - from) * smooth(amount)
const scaleDelays = (delays: readonly number[], durationMs: number) => delays.map((delay) => Math.round(delay / normalDurationMs * durationMs))

export function getCoreActivationTiming(mode: CoreActivationMode, motionOff: boolean, mobile: boolean): CoreActivationTiming {
  if (motionOff) return { durationMs: coreActivationConfig.reduced.durationMs, connectionDelaysMs: coreActivationConfig.reduced.connectionDelaysMs, nodeDelaysMs: coreActivationConfig.reduced.nodeDelaysMs, reduced: true }
  if (mode === 'reconnect') return { durationMs: coreActivationConfig.reconnect.durationMs, connectionDelaysMs: coreActivationConfig.reconnect.connectionDelaysMs, nodeDelaysMs: coreActivationConfig.reconnect.nodeDelaysMs, reduced: false }
  const durationMs = mobile ? coreActivationConfig.mobile.durationMs : coreActivationConfig.normal.durationMs
  return { durationMs, connectionDelaysMs: scaleDelays(normalConnectionDelaysMs, durationMs), nodeDelaysMs: scaleDelays(normalNodeDelaysMs, durationMs), reduced: false }
}

export function getCoreActivationProgress(startedAt: number | null, durationMs: number, now = Date.now()) {
  if (!startedAt) return 0
  return clamp01((now - startedAt) / Math.max(1, durationMs))
}

export function getCoreActivationVisual(progress: number, mode: CoreActivationMode, reduced = false): CoreActivationVisual {
  const frames = reduced ? reducedKeyframes : mode === 'reconnect' ? reconnectKeyframes : fullKeyframes
  const normalized = clamp01(progress)
  const nextIndex = frames.findIndex((frame) => frame.at >= normalized)
  if (nextIndex <= 0) return frames[0]
  const from = frames[nextIndex - 1]; const to = frames[nextIndex]
  const amount = (normalized - from.at) / Math.max(.0001, to.at - from.at)
  return {
    scale: mix(from.scale, to.scale, amount), brightness: mix(from.brightness, to.brightness, amount), innerHalo: mix(from.innerHalo, to.innerHalo, amount), midHalo: mix(from.midHalo, to.midHalo, amount), outerHalo: mix(from.outerHalo, to.outerHalo, amount), lightFieldScale: mix(from.lightFieldScale, to.lightFieldScale, amount), lightFieldOpacity: mix(from.lightFieldOpacity, to.lightFieldOpacity, amount), ringScale: mix(from.ringScale, to.ringScale, amount), ringProgress: mix(from.ringProgress, to.ringProgress, amount),
  }
}

export function getStableCoreActivationVisual(): CoreActivationVisual {
  return fullKeyframes[fullKeyframes.length - 1]
}
