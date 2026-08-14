import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { orbitMotion } from '../config/orbitMotion'
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

describe('Orbit motion and Project Cover brightness polish', () => {
  beforeEach(() => {
    useGalaxyStore.getState().reset()
    if (useGalaxyStore.getState().motionOff) useGalaxyStore.getState().toggleMotion()
  })

  it('mounts Homepage-only orbit rotation, sweep and a limited glint field', () => {
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    const { host, root } = render(<GalaxyScene />)
    expect(host.querySelector('.galaxy-orbit-motion')?.getAttribute('data-orbit-motion')).toBe('homepage')
    expect(host.querySelectorAll('.orbit-light-sweep, .orbit-glints')).toHaveLength(2)
    expect(orbitMotion.homepage).toMatchObject({ rotationSeconds: 88, sweepSeconds: 9.4, glintCount: 3 })
    expect(host.querySelector('.galaxy-orbit-motion')?.getAttribute('style')).toContain('--orbit-rotation-duration: 88s')
    act(() => root.unmount())
  })

  it('keeps mobile motion inexpensive and halts all orbit animation for Motion Off', () => {
    expect(orbitMotion.mobile).toMatchObject({ homepageRotationSeconds: 116, sweepSeconds: 12 })
    useGalaxyStore.getState().toggleMotion()
    useGalaxyStore.getState().completeLoading()
    useGalaxyStore.getState().awaken()
    const { host, root } = render(<GalaxyScene />)
    expect(host.querySelector('.galaxy-scene')?.classList.contains('motion-off')).toBe(true)
    act(() => root.unmount())
  })

  it('gives Video Studio a slower orbit without Homepage sweep or glint markup', () => {
    const { host, root } = render(<VideoStudio />)
    expect(host.querySelector('.video-studio-orbit-motion')?.getAttribute('data-orbit-motion')).toBe('video-studio')
    expect(host.querySelector('.orbit-light-sweep, .orbit-glints')).toBeNull()
    expect(orbitMotion.videoStudio.rotationSeconds).toBe(126)
    expect(host.querySelector('.video-studio-orbit-motion')?.getAttribute('style')).toContain('--orbit-rotation-duration: 126s')
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
