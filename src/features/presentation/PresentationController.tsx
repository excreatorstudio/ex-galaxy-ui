import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { galaxyConfig } from '../../config/galaxyConfig'
import { useI18n } from '../../i18n'
import { useGalaxyStore } from '../../state/useGalaxyStore'
import { shouldHoldPresentationForActivation } from './presentationSequence'

const chapterCount = 8

export function PresentationController() {
  const { presentation, presentationPaused, phase, projectCoreActivationState, setPresentationPaused, transitionAwaken, transitionFocus, setWorkflow, startProjectCoreActivation, restartPresentation, exitPresentation } = useGalaxyStore(); const { t } = useI18n()
  const chapterRef = useRef(0); const timer = useRef<number | null>(null); const [chapter, setChapter] = useState(0)
  const activationPending = shouldHoldPresentationForActivation(chapter, projectCoreActivationState)
  const advance = useCallback(() => { const current = useGalaxyStore.getState(); if (!current.presentation || (chapterRef.current === 4 && current.projectCoreActivationState !== 'complete')) return; const next = Math.min(chapterRef.current + 1, chapterCount - 1); chapterRef.current = next; if (next === 2) transitionAwaken(); if (next === 3) transitionFocus('video-studio'); if (next === 4) { startProjectCoreActivation('full'); setWorkflow('analyzing', 0) } if (next === 5) setWorkflow('completed', 12); if (next === 6) useGalaxyStore.getState().setExported(true); if (next === chapterCount - 1 && timer.current) window.clearTimeout(timer.current); setChapter(next) }, [setWorkflow, startProjectCoreActivation, transitionAwaken, transitionFocus])
  useEffect(() => { if (!presentation || presentationPaused || phase === 'loading' || activationPending) return; const delay = chapter === 0 ? galaxyConfig.presentationIdleHoldMs : chapter === 4 ? galaxyConfig.presentationActivationSettleMs : galaxyConfig.presentationChapterMs; timer.current = window.setTimeout(advance, delay); return () => { if (timer.current) window.clearTimeout(timer.current) } }, [presentation, presentationPaused, phase, activationPending, advance, chapter])
  const exit = () => { if (timer.current) window.clearTimeout(timer.current); chapterRef.current = 0; setChapter(0); exitPresentation() }
  return <AnimatePresence>{presentation && <motion.div className="presentation-control glass" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span>{t('common.demo')} · {phase === 'loading' ? t('presentation.initializing') : t(`presentation.chapter.${chapter}`)}</span><div><button onClick={() => setPresentationPaused(!presentationPaused)}>{presentationPaused ? t('presentation.resume') : t('presentation.pause')}</button><button onClick={() => { chapterRef.current = 0; setChapter(0); restartPresentation() }}>{t('presentation.restart')}</button><button onClick={advance} disabled={phase === 'loading' || activationPending}>{t('presentation.skip')}</button><button onClick={() => document.documentElement.requestFullscreen?.()}>{t('presentation.fullscreen')}</button><button onClick={exit}>{t('presentation.exit')}</button></div></motion.div>}</AnimatePresence>
}
