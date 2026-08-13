import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it } from 'vitest'
import { GalaxyIdleEntry } from '../components/GalaxyIdleEntry'
import { projectCovers } from '../config/projectCovers'
import { GalaxyInterface } from '../features/galaxy/GalaxyInterface'
import { GalaxyLaunchButton, galaxyLaunchAriaLabel } from '../components/GalaxyLaunchButton'
import { getGalaxyBrandControl } from '../components/galaxyBrandPolicy'
import { getLoadingProgress } from '../features/galaxy/loadingProgress'
import { galaxyConfig } from '../config/galaxyConfig'
import { translate } from '../i18n'
import { useGalaxyStore } from '../state/useGalaxyStore'

describe('Galaxy launch restart', () => {
  beforeEach(() => useGalaxyStore.getState().reset())

  it('does not render a restart brand during Loading', () => {
    const markup = renderToStaticMarkup(<GalaxyLaunchButton/>)
    expect(markup).toBe('')
  })

  it('keeps Idle entry and operational restart as separate branded controls by phase', () => {
    expect(getGalaxyBrandControl('loading')).toBe('none')
    expect(getGalaxyBrandControl('idle')).toBe('idle-entry')
    expect(getGalaxyBrandControl('awakened')).toBe('restart')
    expect(getGalaxyBrandControl('module-focus')).toBe('restart')
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().transitionAwaken()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'idle', sceneTransition: 'awaken' })
    useGalaxyStore.getState().commitSceneTransition()
    expect(useGalaxyStore.getState().phase).toBe('awakened')
    expect(getGalaxyBrandControl(useGalaxyStore.getState().phase)).toBe('restart')
  })

  it('uses the central Idle entry for awaken, never launch-screen restart', () => {
    useGalaxyStore.getState().completeLoading()
    const loadingRun = useGalaxyStore.getState().loadingRun
    const host = document.createElement('div')
    const root = createRoot(host)
    act(() => root.render(<GalaxyIdleEntry/>))
    const entry = host.querySelector<HTMLButtonElement>('[data-idle-action="awaken"]')
    expect(entry?.getAttribute('aria-label')).toBe(translate('zh-TW', 'idle.enterAria'))
    act(() => entry?.click())
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'idle', sceneTransition: 'awaken', loadingRun })
    act(() => root.unmount())
  })

  it('renders the operational brand as a button that restarts Awakened immediately', () => {
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    const host = document.createElement('div')
    const root = createRoot(host)
    act(() => root.render(<GalaxyLaunchButton className="wordmark"/>))
    const restart = host.querySelector<HTMLButtonElement>('[data-restart-action="launch-screen"]')
    expect(restart?.tagName).toBe('BUTTON')
    expect(restart?.getAttribute('aria-label')).toBe(galaxyLaunchAriaLabel)
    act(() => restart?.click())
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', sceneTransition: null })
    act(() => root.unmount())
  })

  it('shows restart in Module Focus and restores the central entry after Loading completes', () => {
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    useGalaxyStore.getState().focus('video-studio')
    expect(getGalaxyBrandControl(useGalaxyStore.getState().phase)).toBe('restart')
    useGalaxyStore.getState().restartGalaxyExperience()
    expect(useGalaxyStore.getState().phase).toBe('loading')
    useGalaxyStore.getState().completeLoading()
    expect(getGalaxyBrandControl(useGalaxyStore.getState().phase)).toBe('idle-entry')
  })

  it('returns Awakened and Module Focus to a fresh Loading run', () => {
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    const awakenedRun = useGalaxyStore.getState().loadingRun
    useGalaxyStore.getState().restartGalaxyExperience()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', experienceMode: 'manual', presentation: false, selectedModule: null, sceneTransition: null, loadingRun: awakenedRun + 1 })
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    useGalaxyStore.getState().focus('video-studio')
    useGalaxyStore.getState().restartGalaxyExperience()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', selectedModule: null, workflow: 'idle', sceneTransitionStartedAt: null })
  })

  it('ends Presentation Mode and rejects a stale transition commit after restart', () => {
    useGalaxyStore.getState().startPresentation()
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    useGalaxyStore.getState().transitionFocus('video-studio')
    useGalaxyStore.getState().restartGalaxyExperience()
    useGalaxyStore.getState().commitSceneTransition()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', experienceMode: 'manual', presentation: false, sceneTransition: null, sceneTransitionStartedAt: null })
  })

  it('does not duplicate restart while Loading and always restarts progress at zero', () => {
    useGalaxyStore.getState().completeLoading()
    const beforeRestart = useGalaxyStore.getState().loadingRun
    useGalaxyStore.getState().restartGalaxyExperience()
    const afterRestart = useGalaxyStore.getState().loadingRun
    useGalaxyStore.getState().restartGalaxyExperience()
    expect(afterRestart).toBe(beforeRestart + 1)
    expect(useGalaxyStore.getState().loadingRun).toBe(afterRestart)
    expect(getLoadingProgress(0)).toBe(0)
    expect(getLoadingProgress(galaxyConfig.loadingDurationMs)).toBe(100)
    useGalaxyStore.getState().completeLoading()
    expect(useGalaxyStore.getState().phase).toBe('idle')
  })

  it('keeps restart independent of active or fallback spatial rendering', () => {
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().setSpatialActive(true)
    useGalaxyStore.getState().restartGalaxyExperience()
    expect(useGalaxyStore.getState().phase).toBe('loading')
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().setSpatialActive(false)
    useGalaxyStore.getState().restartGalaxyExperience()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', spatialActive: false })
  })

  it('renders five public showcase covers with an image-level fallback', () => {
    useGalaxyStore.getState().completeLoading(); useGalaxyStore.getState().awaken()
    const host = document.createElement('div'); const root = createRoot(host)
    act(() => root.render(<GalaxyInterface/>))
    const covers = Array.from(host.querySelectorAll<HTMLImageElement>('.media-card .card-art img'))
    expect(covers).toHaveLength(5)
    expect(covers.map(cover => cover.getAttribute('src'))).toEqual([projectCovers.film, projectCovers.ai, projectCovers.campaign, projectCovers.reel, projectCovers.audio])
    act(() => covers[0].dispatchEvent(new Event('error')))
    expect(covers[0].hidden).toBe(true)
    act(() => root.unmount())
  })
})
