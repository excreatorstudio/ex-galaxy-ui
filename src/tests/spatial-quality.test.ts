import { describe, expect, it } from 'vitest'
import { getSpatialQuality } from '../features/spatial/QualityAdapter'

describe('Spatial cinematic quality adapter', () => {
  it('keeps Balanced below High while preserving the requested 3D shard range', () => {
    const high = getSpatialQuality('high', false)
    const balanced = getSpatialQuality('balanced', false)
    expect(high.shards).toBe(14)
    expect(balanced.shards).toBe(12)
    expect(balanced.farStars).toBeLessThan(high.farStars)
    expect(balanced.dpr[1]).toBeLessThan(high.dpr[1])
  })

  it('uses a reduced DPR and fewer shards for mobile fallback quality', () => {
    const mobile = getSpatialQuality('high', true)
    expect(mobile.shards).toBeLessThanOrEqual(6)
    expect(mobile.dpr[1]).toBe(1)
  })
})
