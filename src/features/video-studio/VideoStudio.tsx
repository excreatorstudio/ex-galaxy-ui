import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { galaxyConfig, workflowSteps } from '../../config/galaxyConfig'
import { galaxyVisualAssets, resolveGalaxyAssetUrl } from '../../config/galaxyVisualAssets'
import { getCoreActivationTiming } from '../../config/coreActivationConfig'
import { mediaAssets } from '../../data/mediaAssets'
import { useI18n } from '../../i18n'
import { useGalaxyStore } from '../../state/useGalaxyStore'
import { ProjectCoreActivationController } from './ProjectCoreActivationController'

const nodes = [
  { name: 'VIDEO', kind: 'video', icon: 'V', x: 18, y: 28 }, { name: 'AUDIO', kind: 'audio', icon: 'A', x: 79, y: 25 },
  { name: 'SUBTITLE', kind: 'subtitle', icon: 'T', x: 16, y: 54 }, { name: 'MUSIC', kind: 'music', icon: 'M', x: 84, y: 56 },
  { name: 'LOGO', kind: 'logo', icon: 'L', x: 37, y: 72 }, { name: 'AI ANALYSIS', kind: 'analysis', icon: 'AI', x: 67, y: 73 },
]

export function VideoStudio() {
  const {
    workflow, workflowStep, setWorkflow, exported, setExported, transitionBack, motionOff,
    projectCoreActivationState, projectCoreActivationMode, projectCoreActivationDurationMs,
    projectCoreActivationReduced, projectCoreActivationPausedAt, startProjectCoreActivation,
  } = useGalaxyStore()
  const { t } = useI18n()
  const [selected, setSelected] = useState<string[]>([])
  const [dragged, setDragged] = useState<string | null>(null)
  const workflowTimer = useRef<number | null>(null)
  const exportTimer = useRef<number | null>(null)
  const isRunning = workflow === 'analyzing' || workflow === 'building'
  const progress = workflowStep < 0 ? 0 : Math.round(((workflowStep + 1) / workflowSteps.length) * 100)
  const stepText = workflowStep < 0 ? t('video.standby') : t(`workflow.${workflowStep}`)
  const activationTiming = getCoreActivationTiming(projectCoreActivationMode, projectCoreActivationReduced || motionOff, projectCoreActivationDurationMs === 4800)
  const activationStyle = {
    '--project-core-activation-duration': `${projectCoreActivationDurationMs}ms`,
  } as CSSProperties
  const sceneStyle = {
    '--video-studio-asset-base': `url("${resolveGalaxyAssetUrl(galaxyVisualAssets.base)}")`,
    '--video-studio-asset-nebula': `url("${resolveGalaxyAssetUrl(galaxyVisualAssets.nebula)}")`,
    '--video-studio-asset-orbits': `url("${resolveGalaxyAssetUrl(galaxyVisualAssets.orbits)}")`,
    '--video-studio-asset-stars': `url("${resolveGalaxyAssetUrl(galaxyVisualAssets.stars)}")`,
    '--video-studio-asset-atmosphere': `url("${resolveGalaxyAssetUrl(galaxyVisualAssets.atmosphere)}")`,
  } as CSSProperties

  const runWorkflow = (fast = false) => {
    if (workflowTimer.current) window.clearInterval(workflowTimer.current)
    startProjectCoreActivation('full')
    setWorkflow('analyzing', 0)
    workflowTimer.current = window.setInterval(() => {
      const state = useGalaxyStore.getState()
      if (state.workflowStep >= workflowSteps.length - 1) {
        if (workflowTimer.current) window.clearInterval(workflowTimer.current)
        workflowTimer.current = null
        setWorkflow('completed', workflowSteps.length - 1)
        return
      }
      const next = state.workflowStep + 1
      setWorkflow(next > 6 ? 'building' : 'analyzing', next)
    }, fast ? 150 : galaxyConfig.workflowStepMs)
  }

  useEffect(() => () => {
    if (workflowTimer.current) window.clearInterval(workflowTimer.current)
    if (exportTimer.current) window.clearTimeout(exportTimer.current)
  }, [])

  const assign = (id: string) => setSelected(items => items.includes(id) ? items : [...items, id])
  const timelineVisible = workflowStep >= 6 || workflow === 'completed'
  const activeNode = workflowStep < 0 ? -1 : workflowStep % nodes.length
  const activationClass = `project-core-activation-${projectCoreActivationState} project-core-activation-mode-${projectCoreActivationMode} ${projectCoreActivationReduced ? 'project-core-activation-reduced' : ''} ${projectCoreActivationPausedAt ? 'project-core-activation-paused' : ''}`

  return <section className="video-studio">
    <ProjectCoreActivationController />
    <div className="video-studio-scene" data-asset-stack="video-studio" data-asset-layers="base,nebula,orbits,stars,atmosphere" style={sceneStyle} aria-hidden="true">
      <i className="video-studio-scene__base" data-asset-layer="base"/>
      <i className="video-studio-scene__nebula" data-asset-layer="nebula"/>
      <i className="video-studio-scene__orbits" data-asset-layer="orbits"/>
      <i className="video-studio-scene__stars" data-asset-layer="stars"/>
      <i className="video-studio-scene__atmosphere" data-asset-layer="atmosphere"/>
    </div>
    <header className="studio-header"><div><p>{t('video.header')}</p><h2>{t('video.title')}</h2></div><div className="workflow-readout"><span>{stepText}</span><b>{progress}%</b></div></header>
    <div className="workflow-space">
      <div className={`project-core-anchor ${activationClass}`} style={activationStyle}>
        <div className="project-core-light-field"/><div className="project-core-halo project-core-halo--inner"/><div className="project-core-halo project-core-halo--mid"/><div className="project-core-halo project-core-halo--outer"/><div className="project-energy-ring"><i/></div>
        <button className={`auto-core project-core-visual ${isRunning ? 'running' : ''} ${workflow === 'completed' ? 'completed' : ''}`} onClick={() => workflow === 'idle' || workflow === 'ready' ? runWorkflow() : undefined} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (dragged) { assign(dragged); setWorkflow('ready') } }} aria-label={t('video.startAria')}>
          <span>{workflow === 'completed' ? 'OK' : '✦'}</span><b>{workflow === 'completed' ? t('workflow.12') : t('video.start')}</b><small>{workflow === 'idle' ? t('video.drop') : isRunning ? stepText : workflow === 'completed' ? t('video.qualityPassed') : t('video.mediaReady')}</small>
        </button>
      </div>
      <svg className="connections" viewBox="0 0 100 100" preserveAspectRatio="none">{nodes.map((node, index) => <line key={node.name} className={activeNode === index || workflow === 'completed' ? 'lit' : ''} style={{ '--project-connection-delay': `${activationTiming.connectionDelaysMs[index]}ms` } as CSSProperties} x1="50" y1="47" x2={node.x + 3} y2={node.y + 3}/>)}</svg>
      {nodes.map((node, index) => <button key={node.name} className={`workflow-node node-${node.kind} ${activeNode === index || workflow === 'completed' ? 'active' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%`, '--project-node-delay': `${activationTiming.nodeDelaysMs[index]}ms` } as CSSProperties} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (dragged) assign(dragged) }}><span>{node.icon}</span><b>{node.name}</b><small>{activeNode === index ? t('video.processing') : workflow === 'completed' ? t('video.complete') : t('video.ready')}</small></button>)}
      {isRunning && <div className="step-progress"><i style={{ width: `${progress}%` }}/></div>}
    </div>
    <section className="media-orbit glass" onDragOver={(event) => event.preventDefault()} onDrop={() => dragged && assign(dragged)}><header><span>✦ {t('video.orbit')}</span><small>{t('video.assetsInOrbit', { value: selected.length })}</small></header><div className="media-list">{mediaAssets.map(asset => <button key={asset.id} draggable onDragStart={() => setDragged(asset.id)} onDragEnd={() => setDragged(null)} onClick={() => assign(asset.id)} className={`asset ${selected.includes(asset.id) ? 'selected' : ''}`} style={{ '--asset': asset.accent } as CSSProperties}><i>{asset.type === 'VIDEO' ? 'V' : asset.type === 'AUDIO' ? 'A' : 'L'}</i><b>{asset.name}</b><small>{asset.type} · {asset.duration}</small></button>)}</div></section>
    {timelineVisible && <Timeline/>}
    <section className={`completion-panel ${workflow === 'completed' ? 'show' : ''} glass`}><div><p>{t('workflow.12')}</p><h3>VERTICAL FILM / 00:45</h3><span>{t('video.summary')}</span></div><div><button onClick={() => window.alert(t('common.demo'))}>{t('video.preview')}</button><button className="primary" onClick={() => { if (exportTimer.current) window.clearTimeout(exportTimer.current); setWorkflow('exporting'); exportTimer.current = window.setTimeout(() => { setExported(true); setWorkflow('completed', workflowSteps.length - 1); exportTimer.current = null }, 1600) }}>{exported ? t('video.exported') : t('video.export')}</button><button onClick={transitionBack}>{t('video.back')}</button></div></section>
    <button className="dev-fast" onClick={() => runWorkflow(true)} aria-label={t('video.fast')}>{t('video.fast')}</button>
  </section>
}

function Timeline() {
  const { t } = useI18n()
  const clips = useMemo(() => ['ESTABLISH', 'LIVING', 'KITCHEN', 'DRONE', 'FINALE'], [])
  const tracks = ['videoTrack', 'audioTrack', 'subtitleTrack', 'overlayTrack']
  return <motion.section className="timeline glass" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}><header><b>{t('video.timeline')}</b><span>00:00 / 00:15 / 00:30 / 00:45</span></header>{tracks.map((track, index) => <div className="track" key={track}><b>{t(`video.${track}`)}</b><div className="track-lane">{clips.slice(0, index === 0 ? 5 : index === 1 ? 2 : 3).map((clip, clipIndex) => <i key={clip} className={`clip clip-${index}`} style={{ '--w': `${index === 1 ? 42 : 13 + clipIndex * 2}%`, '--delay': `${clipIndex * .14}s` } as CSSProperties}>{index === 0 ? clip : index === 2 ? `SCENE ${clipIndex + 1}` : index === 3 ? 'E.X' : 'WAVEFORM'}</i>)}</div></div>)}</motion.section>
}
