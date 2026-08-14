import type { CSSProperties } from 'react'
import { orbitEnergyMotion, type OrbitEnergyScene } from '../../config/orbitMotion'

type GalaxyOrbitMotionOverlayProps = {
  scene: OrbitEnergyScene
  motionOff?: boolean
}

export function GalaxyOrbitMotionOverlay({ scene, motionOff = false }: GalaxyOrbitMotionOverlayProps) {
  const sceneConfig = orbitEnergyMotion.scenes[scene]
  const paths = orbitEnergyMotion.paths.slice(0, sceneConfig.pathCount)
  const gradientId = `orbit-energy-gradient-${scene}`

  return <svg
    className={`galaxy-orbit-motion-overlay galaxy-orbit-motion-overlay--${scene} ${motionOff ? 'orbit-motion-overlay--paused' : ''}`}
    data-orbit-motion-overlay={scene}
    data-orbit-path-count={paths.length}
    data-orbit-spark-count={sceneConfig.sparkCount}
    viewBox={orbitEnergyMotion.viewBox}
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#9dc8ff" stopOpacity="0"/>
        <stop offset="42%" stopColor="#9bd7ff" stopOpacity=".22"/>
        <stop offset="72%" stopColor="#edf8ff" stopOpacity=".86"/>
        <stop offset="100%" stopColor="#b9a8ff" stopOpacity="0"/>
      </linearGradient>
    </defs>
    {paths.map((orbit, index) => {
      const mobileHidden = index >= orbitEnergyMotion.mobile.pathCount
      const style = {
        '--orbit-flow-duration': `${orbit.durationSeconds}s`,
        '--orbit-pulse-duration': `${orbit.pulseSeconds}s`,
        '--orbit-flow-delay': `${orbit.delaySeconds}s`,
        '--orbit-flow-intensity': sceneConfig.intensity,
      } as CSSProperties
      const sparkVisible = index < sceneConfig.sparkCount
      return <g key={orbit.id} className={`orbit-energy-track orbit-energy-track--${orbit.direction} ${mobileHidden ? 'orbit-energy-track--mobile-hidden' : ''}`} data-orbit-path={orbit.id} data-orbit-direction={orbit.direction} data-orbit-duration={orbit.durationSeconds} style={style}>
        <path className="orbit-energy-guide" d={orbit.d} pathLength="100"/>
        <path className="orbit-energy-tracer" d={orbit.d} pathLength="100" stroke={`url(#${gradientId})`} strokeDasharray="18 82"/>
        <path className="orbit-energy-pulse" d={orbit.d} pathLength="100" stroke="#d9efff" strokeDasharray="7 93"/>
        {sparkVisible && <circle className="orbit-energy-spark" r="2.35" fill="#ecf7ff">
          {!motionOff && <animateMotion path={orbit.d} dur={`${orbit.durationSeconds * 1.55}s`} begin={`${orbit.delaySeconds}s`} repeatCount="indefinite"/>}
        </circle>}
      </g>
    })}
  </svg>
}
