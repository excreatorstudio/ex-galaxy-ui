import { motion } from 'framer-motion'
import { moduleDefinitions } from '../../config/moduleDefinitions'
import { useGalaxyStore } from '../../state/useGalaxyStore'
import { VideoStudio } from '../video-studio/VideoStudio'
import { GalaxyLaunchButton } from '../../components/GalaxyLaunchButton'
import { useI18n } from '../../i18n'

export function ModuleFocus() {
  const { phase, selectedModule, transitionBack } = useGalaxyStore()
  const { t } = useI18n()
  if (phase !== 'module-focus' || !selectedModule) return null
  const module = moduleDefinitions.find(item => item.id === selectedModule)!
  return <motion.main className="module-focus" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
    <GalaxyLaunchButton className="module-wordmark"/>
    <button className="back-button glass" onClick={transitionBack} aria-label={t('module.backAria')}>← {t('module.back')} <kbd>ESC</kbd></button>
    {module.available ? <VideoStudio/> : <section className="coming-soon glass"><span className="planet-preview" style={{ '--accent': module.accent } as React.CSSProperties}>{module.icon}</span><p>{t('module.preview')}</p><h2>{t(`modules.${module.translationKey}.name`)}</h2><p className="description">{t(`modules.${module.translationKey}.description`)}</p><strong>{t('module.comingSoon')}</strong><button onClick={transitionBack}>{t('module.return')}</button></section>}
  </motion.main>
}
