import { galaxyConfig } from '../../config/galaxyConfig'

export const getLoadingProgress = (elapsed: number) => {
  const ratio = Math.min(1, elapsed / galaxyConfig.loadingDurationMs)
  if (ratio < .68) return ratio / .68 * 70
  if (ratio < .85) return 70 + (ratio - .68) / .17 * 20
  return 90 + (ratio - .85) / .15 * 10
}
