import { describe, expect, it } from 'vitest'
import { foregroundShards, getTransitionDebugConfig, selectForegroundShards, transitionCoreOrigin } from '../features/transition/transitionTrajectories'
import { galaxyConfig } from '../config/galaxyConfig'

describe('foreground camera-rush trajectories', () => {
  it('starts Focus and Awaken foreground shards at the centered core origin', () => {
    expect(transitionCoreOrigin).toEqual({ x: '50vw', y: '50vh' })
    expect(foregroundShards.find(shard => shard.id === 'center-impact')).toMatchObject({ originX: 0, originY: 0 })
    expect(foregroundShards.every(shard => Math.abs(shard.originX) <= 4 && Math.abs(shard.originY) <= 2)).toBe(true)
  })

  it('keeps Center Impact near the core while left and right radial shards separate oppositely', () => {
    const [center, left, right] = foregroundShards
    expect(Math.abs(center.endX)).toBeLessThanOrEqual(1)
    expect(Math.abs(center.endY)).toBeLessThanOrEqual(1)
    expect(left.endX).toBeLessThan(0)
    expect(right.endX).toBeGreaterThan(0)
    expect(Math.abs(left.endX)).toBeLessThanOrEqual(5)
    expect(Math.abs(right.endX)).toBeLessThanOrEqual(5)
  })

  it('uses one centered foreground shard in Low and never enables debug outside development', () => {
    expect(selectForegroundShards('low')).toHaveLength(1)
    expect(selectForegroundShards('balanced')).toHaveLength(2)
    expect(selectForegroundShards('high')).toHaveLength(3)
    expect(getTransitionDebugConfig(false, '?transitionDebug=1')).toMatchObject({ enabled: false, slow: false })
  })

  it('preserves scene timing while debug slow mode is opt-in', () => {
    expect(galaxyConfig).toMatchObject({ sceneTransitionMs: 900, sceneTransitionCommitMs: 560 })
    expect(getTransitionDebugConfig(true, '?transitionDebug=1&transitionSpeed=quarter&transitionOnlyCenter=1')).toMatchObject({ enabled: true, playbackRate: .25, slow: true, onlyCenter: true })
    expect(getTransitionDebugConfig(true, '?transitionDebug=1&transitionSpeed=half')).toMatchObject({ playbackRate: .5 })
  })
})
