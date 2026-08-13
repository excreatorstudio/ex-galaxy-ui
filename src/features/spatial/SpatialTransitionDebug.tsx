import { useEffect, useState } from 'react'
import { getTransitionProgress, getTransitionTiming } from '../../config/sceneTransitionConfig'
import { spatialMotion } from './spatialMotion'

export function SpatialTransitionDebug({ startedAt, playbackRate, motionOff }: { startedAt: number | null; playbackRate: number; motionOff: boolean }) {
  const [now, setNow] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 80); return () => window.clearInterval(timer) }, [])
  const timing = getTransitionTiming(motionOff)
  const progress = now ? getTransitionProgress(startedAt, now, motionOff, playbackRate) : 0
  return <aside className="spatial-transition-debug" aria-hidden="true">
    <b>3D TRANSITION DEBUG · {Math.round(playbackRate * 100)}%</b>
    <span>progress {progress.toFixed(3)} · commit {timing.commitProgress.toFixed(3)}</span>
    <span>camera Z {spatialMotion.cameraWorldZ.toFixed(2)} · shard Z {spatialMotion.primaryShardZ.toFixed(2)}</span>
    <span>{spatialMotion.nearPlaneCrossed ? 'NEAR PLANE CROSSED' : 'NEAR PLANE APPROACHING'}</span>
  </aside>
}
