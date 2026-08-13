import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { coreActivationConfig, getCoreActivationProgress, getCoreActivationTiming, getCoreActivationVisual } from '../config/coreActivationConfig'
import { GalaxyScene } from '../features/galaxy/GalaxyScene'
import { shouldHoldPresentationForActivation } from '../features/presentation/presentationSequence'
import { ProjectCoreActivationController } from '../features/video-studio/ProjectCoreActivationController'
import { VideoStudio } from '../features/video-studio/VideoStudio'
import { useGalaxyStore } from '../state/useGalaxyStore'

function mountController() {
  const host = document.createElement('div')
  const root = createRoot(host)
  act(() => root.render(<ProjectCoreActivationController />))
  return root
}

function enterVideoStudio() {
  const store = useGalaxyStore.getState()
  store.completeLoading()
  store.awaken()
  store.focus('video-studio')
}

describe('Video Studio Creative Orbit activation', () => {
  beforeEach(() => { vi.useRealTimers(); useGalaxyStore.getState().reset() })

  it('does not start a project activation when the Galaxy Hero awakens', () => {
    const store = useGalaxyStore.getState()
    store.completeLoading(); store.transitionAwaken(); store.commitSceneTransition()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'awakened', projectCoreActivationState: 'idle' })
  })

  it('only starts the activation inside the Video Studio project context and completes from its shared timestamp', () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date(1_000)); enterVideoStudio()
    const store = useGalaxyStore.getState(); store.startProjectCoreActivation()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'module-focus', selectedModule: 'video-studio', projectCoreActivationState: 'playing', projectCoreActivationDurationMs: 5600 })
    const root = mountController(); act(() => vi.advanceTimersByTime(5600))
    expect(useGalaxyStore.getState().projectCoreActivationState).toBe('complete')
    act(() => root.unmount()); vi.useRealTimers()
  })

  it('cleans the scoped activation during restart so no old timer can mutate Loading', () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date(1_000)); enterVideoStudio(); useGalaxyStore.getState().startProjectCoreActivation()
    const root = mountController(); useGalaxyStore.getState().restartGalaxyExperience(); act(() => vi.advanceTimersByTime(coreActivationConfig.normal.durationMs + 200))
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', projectCoreActivationState: 'idle', projectCoreActivationStartedAt: null })
    act(() => root.unmount()); vi.useRealTimers()
  })

  it('keeps the project clock paused only for a paused Presentation', () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date(1_000)); enterVideoStudio()
    const store = useGalaxyStore.getState(); store.startPresentation(); store.completeLoading(); store.awaken(); store.focus('video-studio'); store.startProjectCoreActivation()
    const root = mountController(); act(() => vi.advanceTimersByTime(1200)); act(() => store.setPresentationPaused(true)); act(() => vi.advanceTimersByTime(20_000))
    expect(useGalaxyStore.getState()).toMatchObject({ projectCoreActivationState: 'playing', projectCoreActivationPausedAt: expect.any(Number) })
    act(() => store.setPresentationPaused(false)); act(() => vi.advanceTimersByTime(5000)); expect(useGalaxyStore.getState().projectCoreActivationState).toBe('complete')
    act(() => root.unmount()); vi.useRealTimers()
  })

  it('uses an independent mobile and reduced-motion project timeline', () => {
    expect(getCoreActivationTiming('full', false, true).durationMs).toBe(4800)
    expect(getCoreActivationTiming('full', true, false)).toMatchObject({ durationMs: 760, reduced: true })
  })

  it('keeps the fixed CoreAnchor separate from propagated energy breathing and retains a stable final scale', () => {
    const stable = getCoreActivationVisual(1, 'full'); const peak = getCoreActivationVisual(4900 / 5600, 'full')
    expect(peak.scale).toBe(1.22); expect(stable.scale).toBe(1.14); expect(stable.brightness).toBeLessThan(peak.brightness); expect(peak.brightness).toBe(1.56)
    expect(peak.lightFieldScale).toBe(1.72); expect(peak.lightFieldOpacity).toBe(.76); expect(peak.ringScale).toBe(1.38); expect(stable.ringProgress).toBe(1)
    expect(getCoreActivationProgress(1_000, 5600, 3_800)).toBe(.5)
  })

  it('uses distinct connection and node stagger values without moving surrounding nodes', () => {
    const timing = getCoreActivationTiming('full', false, false)
    expect(new Set(timing.connectionDelaysMs).size).toBe(timing.connectionDelaysMs.length)
    expect(new Set(timing.nodeDelaysMs).size).toBe(timing.nodeDelaysMs.length)
    const host = document.createElement('div'); const root = createRoot(host)
    enterVideoStudio(); act(() => root.render(<VideoStudio />))
    expect(host.querySelector('.project-core-anchor')).not.toBeNull(); expect(host.querySelector('.project-core-light-field')).not.toBeNull(); expect(host.querySelectorAll('.workflow-node')).toHaveLength(6)
    expect(host.querySelector('.project-core-anchor')?.className).not.toContain('galaxy')
    act(() => root.unmount())
  })

  it('leaves the Galaxy Hero without project activation markup and holds Presentation only at the Video Studio chapter', () => {
    const host = document.createElement('div'); const root = createRoot(host)
    act(() => root.render(<GalaxyScene/>))
    expect(host.querySelector('.project-core-anchor')).toBeNull(); expect(host.querySelector('.energy-ring')).toBeNull()
    act(() => root.unmount())
    expect(shouldHoldPresentationForActivation(4, 'playing')).toBe(true); expect(shouldHoldPresentationForActivation(4, 'complete')).toBe(false); expect(shouldHoldPresentationForActivation(2, 'playing')).toBe(false)
  })

  it('keeps entry and home artwork in the Hero visual layer, separate from the Video Studio activation', () => {
    const host = document.createElement('div'); const root = createRoot(host)
    act(() => root.render(<GalaxyScene/>))
    expect(host.querySelector('.galaxy-entry-composite')).not.toBeNull(); expect(host.querySelector('.galaxy-home-composite')).not.toBeNull()
    expect(host.querySelectorAll('.galaxy-home-visuals i')).toHaveLength(7)
    expect(host.querySelector('.galaxy-scene')?.getAttribute('style')).toContain('galaxy-master-composite.png')
    expect(host.querySelector('.galaxy-scene')?.getAttribute('style')).toContain('galaxy-home-master-composite.png')
    expect(host.querySelector('.project-core-anchor')).toBeNull()
    act(() => root.unmount())
  })

  it('isolates Video Studio from the Hero composite while retaining the independent functional layers', () => {
    const host = document.createElement('div'); const root = createRoot(host)
    enterVideoStudio(); act(() => root.render(<GalaxyScene/>))
    expect(host.querySelector('.galaxy-scene')?.className).toContain('galaxy-scene--video-studio')
    expect(host.querySelector('.galaxy-home-composite')).not.toBeNull()
    act(() => root.unmount())
    const videoRoot = createRoot(host); act(() => videoRoot.render(<VideoStudio/>))
    expect(host.querySelectorAll('.video-studio-scene i')).toHaveLength(5)
    expect(host.querySelector('.video-studio-scene')?.getAttribute('style')).toContain('galaxy-background-base.png')
    expect(host.querySelector('.video-studio-scene')?.getAttribute('style')).not.toContain('galaxy-home-master-composite.png')
    expect(host.querySelector('.video-studio-scene')?.getAttribute('style')).not.toContain('galaxy-master-composite.png')
    act(() => videoRoot.unmount())
  })

  it('keeps the Hero composite available outside Video Studio', () => {
    const host = document.createElement('div'); const root = createRoot(host)
    const store = useGalaxyStore.getState(); store.completeLoading(); store.awaken()
    act(() => root.render(<GalaxyScene/>))
    expect(host.querySelector('.galaxy-scene')?.className).not.toContain('galaxy-scene--video-studio')
    expect(host.querySelector('.galaxy-home-composite')).not.toBeNull()
    store.focus('brain')
    act(() => root.render(<GalaxyScene/>))
    expect(host.querySelector('.galaxy-scene')?.className).toContain('module-focus')
    expect(host.querySelector('.galaxy-scene')?.className).not.toContain('galaxy-scene--video-studio')
    act(() => root.unmount())
  })
})
