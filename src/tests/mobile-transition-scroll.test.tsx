import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { isMobileHomepageScrollEnabled, mobileCssRadialShards, mobileRadialStardust, mobileRadialTransition } from '../config/mobileScenePolicy'
import { TransitionOverlay } from '../features/transition/TransitionOverlay'
import { useGalaxyStore } from '../state/useGalaxyStore'

function setMobileViewport(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: vi.fn().mockImplementation(() => ({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() })) })
}

function beginAwaken(spatialActive = false) {
  const store = useGalaxyStore.getState()
  store.completeLoading()
  store.setSpatialActive(spatialActive)
  store.transitionAwaken()
}

function renderOverlay() {
  const host = document.createElement('div')
  const root = createRoot(host)
  act(() => root.render(<TransitionOverlay />))
  return { host, root }
}

describe('Mobile radial transition and Homepage scroll policy', () => {
  beforeEach(() => {
    useGalaxyStore.getState().reset()
    if (useGalaxyStore.getState().motionOff) useGalaxyStore.getState().toggleMotion()
    setMobileViewport(true)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('unlocks only an settled Awakened Homepage, keeping Idle and active transitions locked', () => {
    expect(isMobileHomepageScrollEnabled('loading', null)).toBe(false)
    expect(isMobileHomepageScrollEnabled('idle', null)).toBe(false)
    expect(isMobileHomepageScrollEnabled('awakened', 'awaken')).toBe(false)
    expect(isMobileHomepageScrollEnabled('awakened', null)).toBe(true)
    expect(isMobileHomepageScrollEnabled('module-focus', null)).toBe(false)
  })

  it('uses six center-origin CSS shards across four radial waves instead of legacy planar fragments', () => {
    beginAwaken(false)
    const { host, root } = renderOverlay()
    const overlay = host.querySelector('.scene-transition')
    expect(overlay?.getAttribute('data-transition-path')).toBe('css-mobile-radial')
    expect(host.querySelectorAll('.shard-position')).toHaveLength(mobileRadialTransition.cssShardCount)
    expect(Array.from(host.querySelectorAll('.shard-position')).map((shard) => shard.getAttribute('data-wave'))).toEqual(mobileCssRadialShards.map((shard) => shard.wave))
    expect(host.querySelectorAll('.transition-fragment--midground, .transition-fragment--background')).toHaveLength(0)
    expect(host.querySelectorAll('.transition-stardust i')).toHaveLength(mobileRadialTransition.stardustCount)
    expect(new Set(mobileRadialStardust.map((star) => star.rotation)).size).toBe(mobileRadialTransition.stardustCount)
    act(() => root.unmount())
  })

  it('labels Mobile WebGL Low as radial and leaves CSS shards to the fallback only', () => {
    beginAwaken(true)
    const { host, root } = renderOverlay()
    expect(host.querySelector('.scene-transition')?.getAttribute('data-transition-path')).toBe('webgl-low-radial')
    expect(host.querySelectorAll('.transition-fragment')).toHaveLength(0)
    act(() => root.unmount())
  })

  it('keeps Reduced Motion shard-free and removes the fullscreen interaction layer when complete', () => {
    vi.useFakeTimers()
    useGalaxyStore.getState().toggleMotion()
    beginAwaken(false)
    const { host, root } = renderOverlay()
    expect(host.querySelector('.scene-transition')?.getAttribute('data-transition-path')).toBe('reduced')
    expect(host.querySelectorAll('.transition-fragment, .transition-stardust i')).toHaveLength(0)
    act(() => vi.advanceTimersByTime(mobileRadialTransition.durationMs))
    expect(host.querySelector('.scene-transition')).toBeNull()
    act(() => root.unmount())
  })

  it('does not apply the mobile path when the viewport is desktop-sized', () => {
    setMobileViewport(false)
    beginAwaken(false)
    const { host, root } = renderOverlay()
    expect(host.querySelector('.scene-transition')?.getAttribute('data-transition-path')).toBe('css-fallback')
    expect(host.querySelectorAll('.transition-fragment--midground')).not.toHaveLength(0)
    act(() => root.unmount())
  })
})
