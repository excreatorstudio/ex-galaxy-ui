import type { AppPhase } from '../types'

export type GalaxyBrandControl = 'none' | 'idle-entry' | 'restart'

export function getGalaxyBrandControl(phase: AppPhase): GalaxyBrandControl {
  if (phase === 'idle') return 'idle-entry'
  if (phase === 'awakened' || phase === 'module-focus') return 'restart'
  return 'none'
}
