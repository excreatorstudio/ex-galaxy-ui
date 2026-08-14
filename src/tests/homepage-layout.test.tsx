import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { GalaxyInterface } from '../features/galaxy/GalaxyInterface'
import { projectCovers } from '../config/projectCovers'
import { useGalaxyStore } from '../state/useGalaxyStore'

function renderHomepage() {
  const host = document.createElement('div')
  const root = createRoot(host)
  act(() => root.render(<GalaxyInterface />))
  return { host, root }
}

describe('Awakened Homepage layout', () => {
  beforeEach(() => {
    useGalaxyStore.getState().reset()
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
  })

  it('keeps all five mapped Project Showcase covers and the three Command Dock actions', () => {
    const { host, root } = renderHomepage()
    expect(host.querySelector('.home-layout')).not.toBeNull()
    expect(host.querySelectorAll('.media-card')).toHaveLength(5)
    expect(Array.from(host.querySelectorAll('.media-card img')).map((image) => image.getAttribute('src'))).toEqual([
      projectCovers.film, projectCovers.ai, projectCovers.campaign, projectCovers.reel, projectCovers.audio,
    ])
    expect(host.querySelectorAll('.bottom-actions button')).toHaveLength(3)
    act(() => (host.querySelectorAll('.bottom-actions button')[1] as HTMLButtonElement).click())
    expect(useGalaxyStore.getState()).toMatchObject({ sceneTransition: 'focus', pendingModule: 'video-studio' })
    act(() => root.unmount())
  })

  it('does not mount Homepage layout inside Module Focus', () => {
    useGalaxyStore.getState().focus('video-studio')
    const { host, root } = renderHomepage()
    expect(host.querySelector('.home-layout')).toBeNull()
    expect(host.querySelector('.floating-cards')).toBeNull()
    act(() => root.unmount())
  })

  it('keeps Presentation state independent from the Homepage layout shell', () => {
    const store = useGalaxyStore.getState()
    store.startPresentation(); store.completeLoading(); store.awaken()
    expect(useGalaxyStore.getState()).toMatchObject({ presentation: true, phase: 'awakened' })
    const { host, root } = renderHomepage()
    expect(host.querySelector('.home-layout')).not.toBeNull()
    act(() => root.unmount())
  })
})
