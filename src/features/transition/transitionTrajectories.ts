import type { Quality } from '../../types'

export type ForegroundShard = { id: 'center-impact' | 'left-radial' | 'right-radial'; originX: number; originY: number; endX: number; endY: number; delayMs: number }

export const transitionCoreOrigin = { x: '50vw', y: '50vh' } as const
export const foregroundShards: readonly ForegroundShard[] = [
  { id: 'center-impact', originX: 0, originY: 0, endX: .7, endY: -.5, delayMs: 0 },
  { id: 'left-radial', originX: -4, originY: 2, endX: -3, endY: 1, delayMs: 32 },
  { id: 'right-radial', originX: 4, originY: -2, endX: 3, endY: -1, delayMs: 42 },
]

export const foregroundCount = (quality: Quality) => quality === 'high' ? 3 : quality === 'balanced' ? 2 : 1
export const selectForegroundShards = (quality: Quality) => foregroundShards.slice(0, foregroundCount(quality))

export const getTransitionDebugConfig = (isDevelopment: boolean, search: string) => {
  const params = new URLSearchParams(search)
  const enabled = isDevelopment && params.get('transitionDebug') === '1'
  const requestedSpeed = params.get('transitionSpeed')
  const playbackRate = !enabled ? 1 : requestedSpeed === 'quarter' || requestedSpeed === 'slow' ? .25 : requestedSpeed === 'half' ? .5 : 1
  return { enabled, playbackRate, slow: playbackRate < 1, onlyCenter: enabled && params.get('transitionOnlyCenter') === '1', simplified: enabled && params.get('transitionSimplified') === '1' }
}
