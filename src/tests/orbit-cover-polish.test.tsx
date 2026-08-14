import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { orbitEnergyMotion } from '../config/orbitMotion'
import { projectCoverVisuals } from '../config/projectCoverVisuals'
import { GalaxyInterface } from '../features/galaxy/GalaxyInterface'
import { GalaxyScene } from '../features/galaxy/GalaxyScene'
import { VideoStudio } from '../features/video-studio/VideoStudio'
import { useGalaxyStore } from '../state/useGalaxyStore'

function render(node: React.ReactNode) {
  const host = document.createElement('div')
  const root = createRoot(host)
  act(() => root.render(node))
  return { host, root }
}

describe('Orbit energy motion and Project Cover brightness polish', () => {
  beforeEach(() => {
    useGalaxyStore.getState().reset()
    if (useGalaxyStore.getState().motionOff) useGalaxyStore.getState().toggleMotion()
  })

  it('keeps the Homepage orbit bitmap static and mounts a six-path energy overlay instead', () => {
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    const { host, root } = render(<GalaxyScene />)
    expect(orbitEnergyMotion.bitmapRotationEnabled).toBe(false)
    expect(host.querySelector('.galaxy-visual-orbits')?.getAttribute('data-orbit-structure')).toBe('static')
    expect(host.querySelector('.galaxy-orbit-motion')).toBeNull()
    expect(host.querySelector('.orbit-light-sweep, .orbit-glints')).toBeNull()
    expect(host.querySelector('[data-orbit-motion-overlay="homepage"]')?.getAttribute('data-orbit-path-count')).toBe('6')
    expect(host.querySelectorAll('[data-orbit-path]')).toHaveLength(6)
    expect(new Set(Array.from(host.querySelectorAll('[data-orbit-path]')).map((path) => path.getAttribute('data-orbit-path'))).size).toBe(6)
    act(() => root.unmount())
  })

  it('uses staggered opposing flow directions, lower-cost mobile limits, and no motion for Motion Off', () => {
    expect(orbitEnergyMotion.paths.map((path) => path.durationSeconds)).toEqual([18, 23, 29, 35, 42, 51])
    expect(new Set(orbitEnergyMotion.paths.map((path) => path.direction))).toEqual(new Set(['clockwise', 'counter-clockwise']))
    expect(orbitEnergyMotion.mobile).toEqual({ pathCount: 4, sparkCount: 2 })
    useGalaxyStore.getState().toggleMotion()
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    const { host, root } = render(<GalaxyScene />)
    expect(host.querySelector('.galaxy-scene')?.classList.contains('motion-off')).toBe(true)
    expect(host.querySelector('[data-orbit-motion-overlay="homepage"]')?.classList.contains('orbit-motion-overlay--paused')).toBe(true)
    expect(host.querySelector('animateMotion')).toBeNull()
    act(() => root.unmount())
  })

  it('adds quiet Idle energy flow and a reduced Video Studio overlay without changing Core markup', () => {
    useGalaxyStore.getState().completeLoading()
    const idle = render(<GalaxyScene />)
    expect(idle.host.querySelector('[data-orbit-motion-overlay="idle"]')?.getAttribute('data-orbit-spark-count')).toBe('3')
    expect(idle.host.querySelectorAll('[data-orbit-path]')).toHaveLength(5)
    act(() => idle.root.unmount())

    const { host, root } = render(<VideoStudio />)
    expect(host.querySelector('.video-studio-scene__orbits')?.getAttribute('data-orbit-structure')).toBe('static')
    expect(host.querySelector('.orbit-light-sweep, .orbit-glints')).toBeNull()
    expect(host.querySelector('[data-orbit-motion-overlay="video-studio"]')?.getAttribute('data-orbit-path-count')).toBe('5')
    expect(host.querySelectorAll('[data-orbit-path]')).toHaveLength(5)
    expect(host.querySelector('.project-core-anchor')).not.toBeNull()
    expect(host.querySelectorAll('.workflow-node')).toHaveLength(6)
    act(() => root.unmount())
  })

  it('keeps cover mapping values distinct, brighter, and backed by the card-art fallback layer', () => {
    expect(projectCoverVisuals).toEqual(expect.objectContaining({
      film: expect.objectContaining({ brightness: 1.34 }),
      campaign: expect.objectContaining({ brightness: 1.3 }),
      reel: expect.objectContaining({ brightness: 1.36 }),
      ai: expect.objectContaining({ brightness: 1.3 }),
      audio: expect.objectContaining({ brightness: 1.38 }),
    }))
    expect(Object.values(projectCoverVisuals).every((cover) => cover.brightness >= 1.3 && cover.hoverBrightness > cover.brightness)).toBe(true)
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    const { host, root } = render(<GalaxyInterface />)
    const cards = Array.from(host.querySelectorAll('.media-card'))
    expect(cards).toHaveLength(5)
    expect(cards.map((card) => card.getAttribute('style'))).toEqual(expect.arrayContaining([
      expect.stringContaining('--project-cover-brightness: 1.34'),
      expect.stringContaining('--project-cover-brightness: 1.3'),
      expect.stringContaining('--project-cover-brightness: 1.36'),
      expect.stringContaining('--project-cover-brightness: 1.38'),
    ]))
    expect(host.querySelectorAll('.card-art')).toHaveLength(5)
    act(() => root.unmount())
  })
})
