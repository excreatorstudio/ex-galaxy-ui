import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGalaxyStore } from '../state/useGalaxyStore'
import { isActivationTap } from '../utils/inputGesture'

describe('manual galaxy experience state', () => {
  beforeEach(() => useGalaxyStore.getState().reset())

  it('starts in loading and settles in idle without an automatic awaken', () => {
    vi.useFakeTimers()
    expect(useGalaxyStore.getState().phase).toBe('loading')
    useGalaxyStore.getState().completeLoading()
    vi.advanceTimersByTime(60_000)
    expect(useGalaxyStore.getState().phase).toBe('idle')
    vi.useRealTimers()
  })

  it('only awakens from an explicit idle action and does not repeat', () => {
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    useGalaxyStore.getState().awaken()
    expect(useGalaxyStore.getState().phase).toBe('awakened')
  })

  it('separates a tap from a drag before awakening', () => {
    expect(isActivationTap({ x: 20, y: 20 }, { x: 27, y: 26 }, 12)).toBe(true)
    expect(isActivationTap({ x: 20, y: 20 }, { x: 38, y: 20 }, 12)).toBe(false)
  })

  it('keeps module focus and Esc return on explicit transitions', () => {
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().focus('video-studio')
    expect(useGalaxyStore.getState().phase).toBe('idle')
    useGalaxyStore.getState().awaken()
    useGalaxyStore.getState().focus('video-studio')
    expect(useGalaxyStore.getState().phase).toBe('module-focus')
    useGalaxyStore.getState().back()
    expect(useGalaxyStore.getState().phase).toBe('awakened')
  })
})

describe('presentation experience state', () => {
  beforeEach(() => useGalaxyStore.getState().reset())

  it('uses a separate loading start and can exit without a residual transition', () => {
    useGalaxyStore.getState().startPresentation()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', experienceMode: 'presentation', presentation: true })
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    expect(useGalaxyStore.getState().phase).toBe('awakened')
    useGalaxyStore.getState().exitPresentation()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'idle', experienceMode: 'manual', presentation: false })
  })

  it('restarts presentation at loading', () => {
    useGalaxyStore.getState().startPresentation()
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().restartPresentation()
    expect(useGalaxyStore.getState().phase).toBe('loading')
  })

  it('clears an active scene transition on presentation exit or restart', () => {
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().transitionAwaken()
    expect(useGalaxyStore.getState().sceneTransition).toBe('awaken')
    useGalaxyStore.getState().startPresentation()
    expect(useGalaxyStore.getState().sceneTransition).toBeNull()
    expect(useGalaxyStore.getState().sceneTransitionStartedAt).toBeNull()
    useGalaxyStore.getState().exitPresentation()
    expect(useGalaxyStore.getState().sceneTransition).toBeNull()
    expect(useGalaxyStore.getState().sceneTransitionStartedAt).toBeNull()
  })
})

describe('scene transition state', () => {
  beforeEach(() => useGalaxyStore.getState().reset())

  it('runs each major transition once and returns to normal interaction', () => {
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().transitionAwaken()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'idle', sceneTransition: 'awaken' })
    expect(useGalaxyStore.getState().sceneTransitionStartedAt).toEqual(expect.any(Number))
    useGalaxyStore.getState().transitionAwaken()
    expect(useGalaxyStore.getState().sceneTransition).toBe('awaken')
    useGalaxyStore.getState().commitSceneTransition()
    expect(useGalaxyStore.getState().phase).toBe('awakened')
    useGalaxyStore.getState().clearSceneTransition()
    useGalaxyStore.getState().transitionFocus('video-studio')
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'awakened', sceneTransition: 'focus', pendingModule: 'video-studio' })
    useGalaxyStore.getState().commitSceneTransition()
    expect(useGalaxyStore.getState().phase).toBe('module-focus')
    useGalaxyStore.getState().clearSceneTransition()
    useGalaxyStore.getState().transitionBack()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'module-focus', sceneTransition: 'return' })
    useGalaxyStore.getState().commitSceneTransition()
    expect(useGalaxyStore.getState().phase).toBe('awakened')
    useGalaxyStore.getState().clearSceneTransition()
    expect(useGalaxyStore.getState().sceneTransition).toBeNull()
    expect(useGalaxyStore.getState().sceneTransitionStartedAt).toBeNull()
  })

  it('keeps the reduced-motion flag available for the overlay fallback', () => {
    useGalaxyStore.getState().toggleMotion()
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().transitionAwaken()
    expect(useGalaxyStore.getState()).toMatchObject({ motionOff: true, sceneTransition: 'awaken' })
  })

  it('records spatial renderer availability without changing the centralized scene flow', () => {
    useGalaxyStore.getState().setSpatialActive(true)
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', spatialActive: true, sceneTransition: null })
    useGalaxyStore.getState().setSpatialActive(false)
    expect(useGalaxyStore.getState().spatialActive).toBe(false)
  })

  it('keeps Loading and Presentation state usable after a spatial fallback diagnostic', () => {
    useGalaxyStore.getState().setSpatialDiagnostic({ fallbackActive: true, error: 'spatial-render-failed', mounted: false })
    expect(useGalaxyStore.getState().phase).toBe('loading')
    useGalaxyStore.getState().completeLoading()
    expect(useGalaxyStore.getState().phase).toBe('idle')
    useGalaxyStore.getState().startPresentation()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', presentation: true, spatialDiagnostic: { fallbackActive: true } })
  })
})
