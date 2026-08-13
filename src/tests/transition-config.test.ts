import { describe, expect, it } from 'vitest'
import { galaxyConfig } from '../config/galaxyConfig'

describe('Glass Stardust transition timing', () => {
  it('commits in the middle of the full transition rather than at entry', () => {
    expect(galaxyConfig.sceneTransitionMs).toBe(900)
    expect(galaxyConfig.sceneTransitionCommitMs).toBe(560)
    expect(galaxyConfig.sceneTransitionCommitMs).toBeGreaterThan(galaxyConfig.sceneTransitionMs * .58)
    expect(galaxyConfig.sceneTransitionCommitMs).toBeLessThan(galaxyConfig.sceneTransitionMs * .65)
  })

  it('keeps the reduced-motion transition shorter with its own commit point', () => {
    expect(galaxyConfig.sceneTransitionReducedMs).toBe(240)
    expect(galaxyConfig.sceneTransitionReducedCommitMs).toBe(120)
  })
})
