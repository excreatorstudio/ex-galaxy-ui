import { describe, expect, it } from 'vitest'
import { sceneTransitionConfig, getTransitionProgress, getTransitionTiming } from '../config/sceneTransitionConfig'
import { getShardNearPlaneCrossingMs, getSpatialShardCount, getSpatialShardPose, getSpatialShardSeeds, spatialShardSeeds } from '../features/spatial/spatialShardMotion'
import { shouldRenderCssTransitionFragments } from '../features/transition/transitionRenderPolicy'

describe('shared spatial scene transition timeline', () => {
  it('uses 900ms with a delayed 560ms commit after the Center Lead reaches near lens', () => {
    const timing = getTransitionTiming(false)
    expect(timing).toMatchObject({ durationMs: 900, commitMs: 560 })
    expect(timing.commitProgress).toBeCloseTo(560 / 900, 5)
    const centerAtCommit = getSpatialShardPose(spatialShardSeeds[0], 0, timing.commitProgress, 'focus')
    expect(centerAtCommit.z).toBeGreaterThan(sceneTransitionConfig.shards.focusNearLensZ)
    expect(centerAtCommit.scale).toBeGreaterThan(3.4)
  })

  it('keeps the center impact near the lens before commit and moves it beyond during the pass-through', () => {
    const commit = sceneTransitionConfig.normal.commitProgress
    const before = getSpatialShardPose(spatialShardSeeds[0], 0, commit - .04, 'focus')
    const after = getSpatialShardPose(spatialShardSeeds[0], 0, commit + .16, 'focus')
    expect(before.z).toBeGreaterThanOrEqual(sceneTransitionConfig.shards.focusNearLensZ)
    expect(after.z).toBeGreaterThan(sceneTransitionConfig.shards.focusNearLensZ)
  })

  it('uses staggered radial waves with non-identical starts and spaced near-plane crossings', () => {
    const center = spatialShardSeeds[0]
    const primary = spatialShardSeeds.filter((seed) => seed.wave === 'primary-radial')
    const crossings = [center, ...primary].map(getShardNearPlaneCrossingMs).sort((left, right) => left - right)
    expect(center.startMs).toBeGreaterThanOrEqual(160)
    expect(center.startMs).toBeLessThanOrEqual(190)
    expect(new Set(spatialShardSeeds.map((seed) => seed.startMs)).size).toBe(spatialShardSeeds.length)
    expect(crossings.every((value, index) => index === 0 || value - crossings[index - 1] >= 50)).toBe(true)
    expect(crossings).toEqual(expect.arrayContaining([expect.any(Number)]))
    expect(Math.max(...crossings)).toBeLessThanOrEqual(720)
  })

  it('sends the primary foreground into opposing radial directions without increasing shard count', () => {
    const primary = spatialShardSeeds.filter((seed) => seed.wave === 'primary-radial')
    expect(primary.some((seed) => seed.radialX < 0)).toBe(true)
    expect(primary.some((seed) => seed.radialX > 0)).toBe(true)
    expect(spatialShardSeeds).toHaveLength(14)
    expect(getSpatialShardCount('balanced', false)).toBe(12)
  })

  it('does not cluster three visible foreground or secondary shards into one world-space neighborhood', () => {
    const samples = [350, 450, 550, 600]
    samples.forEach((timeMs) => {
      const poses = spatialShardSeeds.slice(0, 7)
        .map((seed, index) => getSpatialShardPose(seed, index, timeMs / sceneTransitionConfig.normal.durationMs, 'focus'))
        .filter((pose) => pose.opacity > .1)
      const largestNeighborhood = Math.max(...poses.map((pose) => poses.filter((other) => Math.hypot(pose.x - other.x, pose.y - other.y) < .85 && Math.abs(pose.z - other.z) < 1.25).length), 0)
      expect(largestNeighborhood).toBeLessThan(3)
    })
  })

  it('uses one progress calculation for normal, debug playback and reduced motion', () => {
    expect(getTransitionProgress(1_000, 1_560, false)).toBeCloseTo(sceneTransitionConfig.normal.commitProgress, 5)
    expect(getTransitionProgress(1_000, 3_240, false, .25)).toBeCloseTo(sceneTransitionConfig.normal.commitProgress, 5)
    expect(getTransitionProgress(1_000, 1_120, true)).toBeCloseTo(.5, 5)
  })

  it('preserves fixed quality counts without using extra particles for impact', () => {
    expect(getSpatialShardCount('high', false)).toBe(14)
    expect(getSpatialShardCount('balanced', false)).toBe(12)
    expect(getSpatialShardCount('low', false)).toBe(7)
    expect(getSpatialShardCount('high', true)).toBe(6)
  })

  it('keeps one Mobile Low shard from each radial wave within the six-shard budget', () => {
    const mobile = getSpatialShardSeeds('low', true)
    expect(mobile).toHaveLength(6)
    expect(new Set(mobile.map((seed) => seed.wave))).toEqual(new Set(['center-lead', 'primary-radial', 'secondary-spread', 'stardust-tail']))
    expect(mobile.filter((seed) => seed.wave === 'primary-radial')).toHaveLength(2)
  })

  it('never stacks full CSS shards with the active WebGL shard field', () => {
    expect(shouldRenderCssTransitionFragments(true, false)).toBe(false)
    expect(shouldRenderCssTransitionFragments(false, false)).toBe(true)
    expect(shouldRenderCssTransitionFragments(false, true)).toBe(false)
  })
})
