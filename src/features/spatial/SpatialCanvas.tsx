import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { useGalaxyStore } from '../../state/useGalaxyStore'
import type { SpatialCapability } from './spatialCapability'
import { CameraRig } from './CameraRig'
import { CameraTransitionController } from './CameraTransitionController'
import { GalaxyCore3D } from './GalaxyCore3D'
import { GlassShardField3D } from './GlassShardField3D'
import { NebulaDust } from './NebulaDust'
import { getSpatialQuality } from './QualityAdapter'
import { StarVolume } from './StarVolume'

function SpatialScene({ capability }: { capability: SpatialCapability }) {
  const { quality, motionOff, setSpatialActive, setSpatialDiagnostic } = useGalaxyStore()
  const preset = getSpatialQuality(capability.quality === 'low' ? 'low' : quality, capability.isMobile, capability.safeMode)
  useEffect(() => { setSpatialActive(true); setSpatialDiagnostic({ mounted: true, fallbackActive: false }); return () => { setSpatialActive(false); setSpatialDiagnostic({ mounted: false }) } }, [setSpatialActive, setSpatialDiagnostic])
  return <Canvas className="spatial-canvas" dpr={preset.dpr} gl={{ alpha: true, antialias: !capability.safeMode && quality !== 'low', powerPreference: capability.safeMode ? 'low-power' : 'high-performance', preserveDrawingBuffer: false }} camera={{ position: [0, 0, 12], fov: 48, near: .1, far: 90 }} onCreated={({ gl }) => { gl.setClearColor(0x000000, 0) }}>
    <ambientLight intensity={.16} />
    {!capability.safeMode && <><directionalLight color="#dce9ff" position={[-4, 3.5, 6]} intensity={1.1} /><pointLight color="#879dff" position={[1.8, -1.5, 4]} intensity={.38} distance={9} decay={2} /></>}
    <CameraTransitionController />
    <CameraRig />
    <StarVolume far={preset.farStars} mid={preset.midStars} near={preset.nearStars} />
    <NebulaDust count={preset.dust} />
        <GalaxyCore3D motionOff={motionOff} />
    <GlassShardField3D mobile={capability.isMobile} lowMaterial={capability.safeMode} qualityOverride={capability.quality} />
  </Canvas>
}

export function SpatialCanvas({ capability, onLazyLoaded }: { capability: SpatialCapability; onLazyLoaded: () => void }) {
  useEffect(() => { onLazyLoaded() }, [onLazyLoaded])
  return <SpatialScene capability={capability} />
}
