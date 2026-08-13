import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import { galaxyConfig } from '../../config/galaxyConfig'
import { galaxyVisualAssets } from '../../config/galaxyVisualAssets'
import { moduleDefinitions } from '../../config/moduleDefinitions'
import { useI18n } from '../../i18n'
import { useGalaxyStore } from '../../state/useGalaxyStore'

const seeded = (seed: number) => { const x = Math.sin(seed * 987.13) * 43758.5453; return x - Math.floor(x) }

export function GalaxyScene() {
  const { phase, quality, motionOff, transitionFocus, selectedModule } = useGalaxyStore()
  const { t } = useI18n()
  const fieldRef = useRef<HTMLDivElement>(null)
  const stars = useMemo(() => Array.from({ length: galaxyConfig.stars[quality] }, (_, i) => ({ x: seeded(i + 2) * 100, y: seeded(i + 90) * 100, size: .5 + seeded(i + 300) * 2.3, delay: seeded(i + 420) * -5, duration: 2.5 + seeded(i + 640) * 5, hue: i % 11 === 0 ? 'var(--violet)' : 'var(--star)' })), [quality])
  useEffect(() => {
    const move = (event: PointerEvent) => { const x = (event.clientX / window.innerWidth - .5) * galaxyConfig.parallaxMax; const y = (event.clientY / window.innerHeight - .5) * galaxyConfig.parallaxMax; fieldRef.current?.style.setProperty('--px', `${x}px`); fieldRef.current?.style.setProperty('--py', `${y}px`) }
    window.addEventListener('pointermove', move, { passive: true }); return () => window.removeEventListener('pointermove', move)
  }, [])
  const assetStyle = Object.fromEntries(Object.entries(galaxyVisualAssets).map(([key, value]) => [`--galaxy-asset-${key}`, `url("${value}")`])) as CSSProperties
  return <div ref={fieldRef} className={`galaxy-scene ${phase} ${motionOff ? 'motion-off' : ''} ${selectedModule === 'video-studio' ? 'galaxy-scene--video-studio' : ''}`} style={assetStyle} aria-hidden="true">
    <div className="galaxy-asset-base"/>
    <div className="galaxy-entry-composite"/>
    <div className="galaxy-home-composite"/>
    <div className="galaxy-home-visuals"><i className="galaxy-visual-nebula"/><i className="galaxy-visual-orbits"/><i className="galaxy-visual-core-glow"/><i className="galaxy-visual-core-particles"/><i className="galaxy-visual-ex-outline"/><i className="galaxy-visual-stars"/><i className="galaxy-visual-atmosphere"/></div>
    <div className="nebula nebula-a"/><div className="nebula nebula-b"/><div className="star-layer far">{stars.map((star, i) => <i key={i} className="star" style={{ '--x': `${star.x}%`, '--y': `${star.y}%`, '--s': `${star.size}px`, '--d': `${star.delay}s`, '--t': `${star.duration}s`, '--c': star.hue } as CSSProperties}/>)}</div>
    <div className="star-layer near">{stars.slice(0, Math.floor(stars.length / 3)).map((star, i) => <i key={i} className="star" style={{ '--x': `${(star.x + 17) % 100}%`, '--y': `${(star.y + 43) % 100}%`, '--s': `${star.size + 1}px`, '--d': `${star.delay}s`, '--t': `${star.duration + 2}s`, '--c': star.hue } as CSSProperties}/>)}</div>
    <div className="galaxy-core"><div className="core-light"/><div className="spiral s1"/><div className="spiral s2"/><div className="spiral s3"/><div className="core-pulse"/></div>
    <div className="orbit-system"><i/><i/><i/><i/></div>
    {phase === 'awakened' && <div className="module-constellation">{moduleDefinitions.map((item, index) => <button key={item.id} className={`module-planet ${item.available ? 'available' : ''}`} style={{ left: `${item.position[0]}%`, top: `${item.position[1]}%`, '--accent': item.accent, '--scale': item.scale, '--reveal': `${520 + index * 105}ms` } as CSSProperties} onClick={() => transitionFocus(item.id)} aria-label={t(`modules.${item.translationKey}.name`)}><span>{item.icon}</span><b>{item.shortName}</b></button>)}</div>}
    {phase === 'module-focus' && selectedModule === 'video-studio' && <div className="focus-grid"><i/><i/><i/><i/><i/></div>}
  </div>
}
