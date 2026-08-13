import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { galaxyConfig } from '../../config/galaxyConfig'
import { useI18n } from '../../i18n'
import { useGalaxyStore } from '../../state/useGalaxyStore'
import { getLoadingProgress } from './loadingProgress'

const loadingStatusKeys = ['loading.status.calibrating', 'loading.status.core', 'loading.status.modules', 'loading.status.sync', 'loading.status.ready']

function LoadingSequence({ motionOff }: { motionOff: boolean }) {
  const completeLoading = useGalaxyStore((state) => state.completeLoading); const { t } = useI18n(); const [progress, setProgress] = useState(0)
  useEffect(() => { let completed = false; const startedAt = performance.now(); const tick = () => { const next = getLoadingProgress(performance.now() - startedAt); setProgress(next); if (next >= 100 && !completed) { completed = true; completeLoading() } }; tick(); const timer = window.setInterval(tick, motionOff ? galaxyConfig.loadingDurationMs : galaxyConfig.loadingTickMs); return () => window.clearInterval(timer) }, [completeLoading, motionOff])
  const statusIndex = Math.min(loadingStatusKeys.length - 1, Math.floor(progress / 22))
  return <motion.section className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: motionOff ? .22 : .85 }} aria-label={t('loading.aria')}><div className="loading-stars"/><motion.div className="loading-mark" initial={{ scale: .82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .8 }}><span className="loading-orbit"/><strong>E.X</strong><i/></motion.div><div className="loading-copy"><p>{t('loading.initializing')}</p><b key={statusIndex}>{t(loadingStatusKeys[statusIndex])}</b></div><div className="loading-progress" aria-label={t('loading.percent', { value: Math.round(progress) })}><i style={{ width: `${progress}%` }}/><span style={{ left: `${progress}%` }}/></div><small>{String(Math.round(progress)).padStart(3, '0')}%</small></motion.section>
}

export function LoadingScreen() { const { phase, motionOff, loadingRun } = useGalaxyStore(); return <AnimatePresence>{phase === 'loading' && <LoadingSequence key={loadingRun} motionOff={motionOff}/>}</AnimatePresence> }
