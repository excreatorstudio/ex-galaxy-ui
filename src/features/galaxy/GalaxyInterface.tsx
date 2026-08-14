import { AnimatePresence, motion } from 'framer-motion'
import { GalaxyLaunchButton } from '../../components/GalaxyLaunchButton'
import { projectCovers } from '../../config/projectCovers'
import { localeLabels, supportedLocales, useI18n } from '../../i18n'
import { PlatformActions } from '../account/PlatformConsole'
import { useGalaxyStore } from '../../state/useGalaxyStore'

const cards = [
  { nameKey: 'cards.luxury', typeKey: 'cards.film', accent: 'estate', cover: projectCovers.film }, { nameKey: 'cards.visual', typeKey: 'cards.ai', accent: 'visual', cover: projectCovers.ai }, { nameKey: 'cards.brand', typeKey: 'cards.campaign', accent: 'brand', cover: projectCovers.campaign }, { nameKey: 'cards.city', typeKey: 'cards.reel', accent: 'city', cover: projectCovers.reel }, { nameKey: 'cards.soundtrack', typeKey: 'cards.audio', accent: 'audio', cover: projectCovers.audio },
]
const navigation = ['home', 'projects', 'assets', 'campaigns', 'studio'] as const

export function GalaxyInterface() {
  const { phase, toggleMotion, motionOff, quality, setQuality, transitionFocus, startPresentation, sceneTransition, presentation } = useGalaxyStore()
  const { locale, setLocale, t } = useI18n()
  return <AnimatePresence>{phase === 'awakened' && <motion.div className="interface home-layout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .9, ease: [.16, 1, .3, 1] }}>
    <header className="topbar glass"><GalaxyLaunchButton className="wordmark"/><nav>{navigation.map(item => <button key={item}>{t(`nav.${item}`)}</button>)}</nav><div className="top-actions"><details className="locale-menu"><summary aria-label={t('nav.language')}>{localeLabels[locale]}</summary><div>{supportedLocales.map(code => <button key={code} className={locale === code ? 'active' : ''} onClick={() => setLocale(code)}>{localeLabels[code]}</button>)}</div></details><select className="quality" value={quality} onChange={(event) => setQuality(event.target.value as 'high' | 'balanced' | 'low')} aria-label={t('nav.quality')}><option value="high">HIGH</option><option value="balanced">BALANCED</option><option value="low">LOW</option></select><button className="icon-button" onClick={toggleMotion} aria-label={t('nav.motion')}>{motionOff ? t('nav.motionOff') : t('nav.motionOn')}</button>{!presentation && <PlatformActions/>}<button className="present-button" onClick={() => !sceneTransition && startPresentation()}>{t('nav.presentation')}</button></div></header>
    <section className="brand-center"><p>{t('home.kicker')}</p><h1>E.X GALAXY</h1><small>{t('home.prototype')}</small></section>
    <section className="floating-cards" aria-label={t('cards.aria')}>{cards.map((card, index) => <motion.button key={card.nameKey} className={`media-card ${card.accent} c${index}`} initial={{ opacity: 0, filter: 'blur(5px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: .68 + index * .14, duration: .82, ease: [.16, 1, .3, 1] }}><span className="card-art"><img src={card.cover} alt="" onError={(event) => { event.currentTarget.hidden = true }}/></span><span className="card-meta"><i>{t(card.typeKey)}</i>{t(card.nameKey)}<b>00:{18 + index * 7}</b></span></motion.button>)}</section>
    <div className="bottom-actions glass"><button><span aria-hidden>＋</span><span>{t('cta.newCampaign')}</span></button><button onClick={() => transitionFocus('video-studio')}><span aria-hidden>▱</span><span>{t('cta.openProject')}</span></button><button><span aria-hidden>▹</span><span>{t('cta.mediaLibrary')}</span></button></div><footer><span>◉&nbsp; {t('status.activeProjects', { value: 3 })}</span><span className="online">●&nbsp; {t('status.online')}</span></footer>
  </motion.div>}</AnimatePresence>
}
