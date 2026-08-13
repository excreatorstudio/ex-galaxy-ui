import { useI18n } from '../i18n'
import { useGalaxyStore } from '../state/useGalaxyStore'
import { getGalaxyBrandControl } from './galaxyBrandPolicy'

export const galaxyEntryAriaLabel = 'Enter E.X Galaxy'

/** The only branded control in Idle: it awakens the system and never restarts Loading. */
export function GalaxyIdleEntry() {
  const { phase, transitionAwaken } = useGalaxyStore()
  const { t } = useI18n()
  if (getGalaxyBrandControl(phase) !== 'idle-entry') return null

  return <button className="galaxy-idle-entry" data-idle-action="awaken" onClick={transitionAwaken} aria-label={t('idle.enterAria')}>
    <span className="idle-entry-kicker">{t('idle.kicker')}</span><strong data-wordmark="E.X GALAXY">E.X GALAXY</strong><small>{t('idle.prototype')}</small><i>◌</i><em>{t('idle.enter')}</em>
  </button>
}
