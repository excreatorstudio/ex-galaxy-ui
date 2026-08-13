import { useEffect, useMemo } from 'react'
import { getTransitionTiming } from '../../config/sceneTransitionConfig'
import { SpatialTransitionDebug } from '../spatial/SpatialTransitionDebug'
import { useGalaxyStore } from '../../state/useGalaxyStore'
import type { Quality } from '../../types'
import { getTransitionDebugConfig, selectForegroundShards } from './transitionTrajectories'
import { shouldRenderCssTransitionFragments } from './transitionRenderPolicy'

type Depth = 'midground' | 'background'
type Fragment = readonly [Depth, string, string, string, string]

const fragments: readonly Fragment[] = [
  ['midground', '14%', '74%', '-13deg', '.04s'], ['midground', '29%', '17%', '26deg', '.08s'], ['midground', '43%', '69%', '-21deg', '.05s'], ['midground', '57%', '24%', '12deg', '.11s'], ['midground', '69%', '39%', '-36deg', '.07s'], ['midground', '82%', '79%', '19deg', '.10s'], ['midground', '93%', '48%', '-8deg', '.06s'],
  ['background', '21%', '42%', '7deg', '.13s'], ['background', '48%', '11%', '-19deg', '.16s'], ['background', '63%', '83%', '28deg', '.12s'], ['background', '76%', '27%', '-14deg', '.18s'],
]
const counts: Record<Quality, { midground: number; background: number; stardust: number }> = { high: { midground: 7, background: 4, stardust: 10 }, balanced: { midground: 6, background: 4, stardust: 8 }, low: { midground: 4, background: 2, stardust: 5 } }
const selectFragments = (quality: Quality) => { const density = counts[quality]; return [...fragments.slice(0, density.midground), ...fragments.slice(7, 7 + density.background)] }

export function TransitionOverlay() {
  const { sceneTransition, sceneTransitionStartedAt, motionOff, quality, spatialActive, commitSceneTransition, clearSceneTransition } = useGalaxyStore()
  const debug = getTransitionDebugConfig(import.meta.env.DEV, window.location.search)
  const activeForeground = useMemo(() => selectForegroundShards(quality), [quality]); const activeFragments = useMemo(() => selectFragments(quality), [quality]); const density = counts[quality]
  const foreground = debug.onlyCenter ? activeForeground.slice(0, 1) : activeForeground
  const renderCssFragments = shouldRenderCssTransitionFragments(spatialActive, motionOff)
  useEffect(() => {
    if (!sceneTransition) return
    const timing = getTransitionTiming(motionOff)
    const elapsed = sceneTransitionStartedAt ? Date.now() - sceneTransitionStartedAt : 0
    const commitDelay = Math.max(0, timing.commitMs / debug.playbackRate - elapsed)
    const duration = Math.max(0, timing.durationMs / debug.playbackRate - elapsed)
    const commitTimer = window.setTimeout(commitSceneTransition, commitDelay); const clearTimer = window.setTimeout(clearSceneTransition, duration)
    return () => { window.clearTimeout(commitTimer); window.clearTimeout(clearTimer) }
  }, [sceneTransition, sceneTransitionStartedAt, motionOff, debug.playbackRate, commitSceneTransition, clearSceneTransition])
  if (!sceneTransition) return null
  return <div className={`scene-transition scene-transition--${sceneTransition} scene-transition--${quality} ${spatialActive ? 'scene-transition--spatial' : ''} ${motionOff ? 'scene-transition--reduced' : ''} ${debug.enabled ? 'scene-transition--debug' : ''} ${debug.playbackRate === .5 ? 'scene-transition--half' : ''} ${debug.playbackRate === .25 ? 'scene-transition--slow' : ''}`} aria-hidden="true">
    <i className="transition-blur"/><i className="transition-refraction"/>
    {renderCssFragments && <div className="transition-fragments">{foreground.map(shard => <div key={shard.id} className={`shard-position shard-position--${shard.id}`} style={{ '--origin-x': `${shard.originX}vw`, '--origin-y': `${shard.originY}vh`, '--end-x': `${shard.endX}vw`, '--end-y': `${shard.endY}vh`, '--delay': `${shard.delayMs}ms` } as React.CSSProperties}><i className="transition-fragment transition-fragment--foreground"/>{debug.enabled && <><b className="debug-origin"/><b className="debug-endpoint"/></>}</div>)}{!debug.simplified && activeFragments.map(([depth, left, top, rotation, delay], index) => <i key={`${depth}-${index}`} className={`transition-fragment transition-fragment--${depth}`} style={{ '--left': left, '--top': top, '--rotation': rotation, '--delay': delay } as React.CSSProperties}/>)}</div>}
    {renderCssFragments && !debug.simplified && <div className="transition-stardust">{Array.from({ length: density.stardust }, (_, index) => <i key={index} style={{ '--delay': `${index * .028}s`, '--lane': `${7 + ((index * 19) % 84)}%`, '--length': `${18 + (index % 4) * 11}px` } as React.CSSProperties}/>)}</div>}
    {debug.enabled && <i className="debug-core"/>}
    {debug.enabled && <SpatialTransitionDebug startedAt={sceneTransitionStartedAt} playbackRate={debug.playbackRate} motionOff={motionOff} />}
  </div>
}
