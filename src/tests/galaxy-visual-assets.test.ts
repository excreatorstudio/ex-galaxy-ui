import { describe, expect, it } from 'vitest'
import { galaxySceneAssetMapping, galaxyVisualAssets, resolveGalaxyAssetUrl } from '../config/galaxyVisualAssets'
import { galaxyConfig } from '../config/galaxyConfig'
import { isMobileHomepageScrollEnabled } from '../config/mobileScenePolicy'
import { getLoadingProgress } from '../features/galaxy/loadingProgress'
import { viteAssetBase } from '../config/networkConfig'

describe('Galaxy visual asset source mapping', () => {
  it('keeps all ten supplied runtime assets on public relative paths', () => {
    expect(Object.keys(galaxyVisualAssets)).toHaveLength(10)
    expect(viteAssetBase).toBe('./')
    Object.values(galaxyVisualAssets).forEach((asset) => {
      expect(asset).toMatch(/^\/?assets\/galaxy\//)
    })
  })

  it('resolves CSS custom-property URLs against the document base without duplicating the assets segment', () => {
    const resolved = new URL(resolveGalaxyAssetUrl(galaxyVisualAssets.home))
    expect(resolved.pathname).toMatch(/\/assets\/galaxy\/reference\/galaxy-home-master-composite\.png$/)
    expect(resolved.pathname).not.toContain('/assets/assets/')
  })

  it('keeps the Idle master composite canonical, pre-loadable, and independent from the 4.2 second loading clock', () => {
    const resolved = new URL(resolveGalaxyAssetUrl(galaxyVisualAssets.entry))
    expect(resolved.pathname).toMatch(/\/assets\/galaxy\/reference\/galaxy-master-composite\.png$/)
    expect(resolved.pathname).not.toContain('/assets/assets/')
    expect(galaxySceneAssetMapping.idle).toMatchObject({ composite: 'entry', fallback: 'procedural-css' })
    expect(galaxyConfig.loadingDurationMs).toBe(4200)
    expect(getLoadingProgress(4200)).toBe(100)
    expect(isMobileHomepageScrollEnabled('idle', null)).toBe(false)
  })

  it('separates Idle, Homepage, and Video Studio layer contracts', () => {
    expect(galaxySceneAssetMapping.idle).toMatchObject({ composite: 'entry', layers: ['stars', 'atmosphere'], fallback: 'procedural-css' })
    expect(galaxySceneAssetMapping.homepage).toMatchObject({ composite: 'home', layers: ['base', 'nebula', 'orbits', 'coreGlow', 'coreParticles', 'exOutline', 'stars', 'atmosphere'] })
    expect(galaxySceneAssetMapping.videoStudio).toMatchObject({ composite: null, layers: ['base', 'nebula', 'orbits', 'stars', 'atmosphere'] })
    expect(galaxySceneAssetMapping.videoStudio.layers).not.toContain('coreGlow')
    expect(galaxySceneAssetMapping.videoStudio.layers).not.toContain('coreParticles')
    expect(galaxySceneAssetMapping.videoStudio.layers).not.toContain('exOutline')
  })
})
