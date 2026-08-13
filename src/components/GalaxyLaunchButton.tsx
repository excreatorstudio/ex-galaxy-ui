import { useGalaxyStore } from '../state/useGalaxyStore'
import { getGalaxyBrandControl } from './galaxyBrandPolicy'

export const galaxyLaunchAriaLabel = 'Return to E.X Galaxy launch screen'

export function GalaxyLaunchButton({ className = '' }: { className?: string }) {
  const { phase, restartGalaxyExperience } = useGalaxyStore()
  if (getGalaxyBrandControl(phase) !== 'restart') return null
  return <button type="button" className={`galaxy-launch-button ${className}`} data-restart-action="launch-screen" onClick={restartGalaxyExperience} aria-label={galaxyLaunchAriaLabel}>E.X <span>GALAXY</span></button>
}
