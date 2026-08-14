import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GalaxyScene } from '../features/galaxy/GalaxyScene'
import { GalaxyInterface } from '../features/galaxy/GalaxyInterface'
import { ModuleFocus } from '../features/modules/ModuleFocus'
import { PresentationController } from '../features/presentation/PresentationController'
import { TransitionOverlay } from '../features/transition/TransitionOverlay'
import { galaxyConfig } from '../config/galaxyConfig'
import { LoadingScreen } from '../features/galaxy/LoadingScreen'
import { BootDiagnostics } from '../features/spatial/BootDiagnostics'
import { SpatialLayer } from '../features/spatial/SpatialLayer'
import { GalaxyIdleEntry } from '../components/GalaxyIdleEntry'
import { PlatformConsole } from '../features/account/PlatformConsole'
import { useGalaxyStore } from '../state/useGalaxyStore'
import { isActivationTap, type PointerPoint } from '../utils/inputGesture'
import { captureMobileHomepageScroll, getMobileHomepageReturnScroll, isMobileHomepageScrollEnabled, mobileHomepageBreakpointPx } from '../config/mobileScenePolicy'

export function App() {
  const { phase, transitionAwaken, transitionBack, motionOff, startPresentation, sceneTransition } = useGalaxyStore()
  const pointerStart = useRef<PointerPoint | null>(null)
  const mobileViewport = window.matchMedia?.(`(max-width: ${mobileHomepageBreakpointPx}px)`).matches ?? false
  const mobileScrollEnabled = mobileViewport && isMobileHomepageScrollEnabled(phase, sceneTransition)
  useEffect(() => {
    const mobile = window.matchMedia?.(`(max-width: ${mobileHomepageBreakpointPx}px)`).matches ?? false
    const enabled = mobile && mobileScrollEnabled
    const roots = [document.documentElement, document.body, document.getElementById('root')].filter((element): element is HTMLElement => Boolean(element))
    roots.forEach((element) => element.classList.toggle('mobile-home-scroll-enabled', enabled))

    if (enabled) {
      const frame = window.requestAnimationFrame(() => window.scrollTo({ top: getMobileHomepageReturnScroll(), left: 0, behavior: 'auto' }))
      return () => { window.cancelAnimationFrame(frame); roots.forEach((element) => element.classList.remove('mobile-home-scroll-enabled')) }
    }
    return () => roots.forEach((element) => element.classList.remove('mobile-home-scroll-enabled'))
  }, [mobileScrollEnabled, phase, sceneTransition])
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') transitionBack()
      if (phase === 'idle' && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); transitionAwaken() }
      if (event.key.toLowerCase() === 'p' && phase !== 'loading' && !sceneTransition) startPresentation()
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [transitionAwaken, transitionBack, phase, sceneTransition, startPresentation])
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (phase === 'awakened' && event.button === 0) captureMobileHomepageScroll(window.scrollY)
    if (phase === 'idle' && event.button === 0) pointerStart.current = { x: event.clientX, y: event.clientY }
  }
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (sceneTransition || phase !== 'idle' || event.button !== 0) return
    const target = event.target as HTMLElement
    if (target.closest('[data-idle-action]')) return
    if (isActivationTap(pointerStart.current, { x: event.clientX, y: event.clientY }, galaxyConfig.inputTapThresholdPx)) transitionAwaken()
    pointerStart.current = null
  }
  return <div className={`app-shell phase-${phase} ${sceneTransition ? 'scene-transition-active' : ''} ${mobileScrollEnabled ? 'mobile-home-scroll-enabled' : ''} ${motionOff ? 'reduce-motion' : ''}`} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { pointerStart.current = null }}>
    <GalaxyScene/><SpatialLayer/><LoadingScreen/>
    <AnimatePresence>{phase === 'idle' && <motion.section className="idle-intro" initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: motionOff ? .2 : .7 }}><GalaxyIdleEntry/></motion.section>}</AnimatePresence>
    <GalaxyInterface/><ModuleFocus/><PresentationController/><PlatformConsole/><TransitionOverlay/>
    <div className="fallback" role="status"><b>WEBGL-OPTIONAL / CANVAS-FREE FALLBACK</b><span>Programmatic 2D galaxy remains available on all supported browsers.</span></div>
    <BootDiagnostics/>
  </div>
}
