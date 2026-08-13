import { describe, expect, it } from 'vitest'
import { viteAssetBase } from '../config/networkConfig'
import { SpatialErrorBoundary } from '../features/spatial/SpatialErrorBoundary'
import { assessSpatialCapability, getSpatialRequest } from '../features/spatial/spatialCapability'
import { getSpatialQuality } from '../features/spatial/QualityAdapter'

const capableProbe = () => ({ available: true, maxTextureSize: 8192 })

describe('mobile-safe spatial capability policy', () => {
  it('forces CSS fallback when spatial=off or WebGL creation fails', () => {
    expect(getSpatialRequest('?spatial=off')).toBe('off')
    expect(assessSpatialCapability({ search: '?spatial=off', userAgent: 'Android', viewportWidth: 390, reducedMotion: false, probeWebGL: capableProbe })).toMatchObject({ enabled: false, reason: 'forced-off' })
    expect(assessSpatialCapability({ search: '?spatial=auto', userAgent: 'Android', viewportWidth: 390, reducedMotion: false, probeWebGL: () => ({ available: false, maxTextureSize: null }) })).toMatchObject({ enabled: false, reason: 'webgl-unavailable' })
  })

  it('uses explicit Low 3D and caps mobile DPR at one', () => {
    const capability = assessSpatialCapability({ search: '?spatial=low', userAgent: 'Mozilla/5.0 (iPhone)', viewportWidth: 390, reducedMotion: false, deviceMemory: 8, hardwareConcurrency: 8, probeWebGL: capableProbe })
    expect(capability).toMatchObject({ enabled: true, safeMode: true, quality: 'low', isMobile: true })
    expect(getSpatialQuality('balanced', true, true).dpr[1]).toBeLessThanOrEqual(1)
  })

  it('fails closed for constrained mobile auto mode but not capable desktop auto mode', () => {
    expect(assessSpatialCapability({ search: '', userAgent: 'Android', viewportWidth: 390, reducedMotion: false, deviceMemory: 2, hardwareConcurrency: 4, probeWebGL: capableProbe })).toMatchObject({ enabled: false, reason: 'mobile-capability-fallback' })
    expect(assessSpatialCapability({ search: '', userAgent: 'Mozilla/5.0 (Windows NT 10.0)', viewportWidth: 1440, reducedMotion: false, deviceMemory: 8, hardwareConcurrency: 12, probeWebGL: capableProbe })).toMatchObject({ enabled: true, safeMode: false })
  })

  it('has a recoverable boundary state and host-relative Vite asset base', () => {
    expect(SpatialErrorBoundary.getDerivedStateFromError()).toEqual({ failed: true })
    expect(viteAssetBase).toBe('./')
  })
})
