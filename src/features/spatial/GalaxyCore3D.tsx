import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { spatialMotion } from './spatialMotion'

function ringPositions(seed: number, count: number, radius: number) {
  const positions = new Float32Array(count * 3)
  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2 + seed
    const variance = 1 + Math.sin(index * 2.71 + seed) * .19
    positions[index * 3] = Math.cos(angle) * radius * variance
    positions[index * 3 + 1] = Math.sin(angle) * radius * variance * .29
    positions[index * 3 + 2] = Math.sin(index * 1.73 + seed) * .42
  }
  return positions
}

function CoreRing({ seed, radius, color, size, opacity }: { seed: number; radius: number; color: string; size: number; opacity: number }) {
  const ring = useRef<THREE.Points>(null); const material = useRef<THREE.PointsMaterial>(null); const positions = useMemo(() => ringPositions(seed, 230, radius), [radius, seed])
  useFrame((_, delta) => {
    if (!ring.current) return
    if (!document.hidden) ring.current.rotation.z += delta * (.028 + seed * .004)
    if (material.current) material.current.opacity = opacity
  })
  return <points ref={ring}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial ref={material} color={color} size={size} transparent opacity={opacity} sizeAttenuation depthWrite={false} /></points>
}

export function GalaxyCore3D({ motionOff }: { motionOff: boolean }) {
  const core = useRef<THREE.Group>(null); const coreLight = useRef<THREE.PointLight>(null); const surface = useRef<THREE.MeshBasicMaterial>(null)
  useFrame(({ clock }) => {
    if (!core.current) return
    const pulse = motionOff ? 1 : 1 + Math.sin(clock.elapsedTime * .62) * .025
    core.current.scale.setScalar(spatialMotion.coreScale * pulse)
    core.current.rotation.z += motionOff || document.hidden ? 0 : .00055
    if (coreLight.current) coreLight.current.intensity = spatialMotion.coreEnergy
    if (surface.current) surface.current.opacity = .8
  })
  return <group ref={core} rotation={[.14, -.08, -.2]}>
    <CoreRing seed={.2} radius={1.15} color="#dce8ff" size={.055} opacity={.85} />
    <CoreRing seed={1.8} radius={2.15} color="#8f9fee" size={.042} opacity={.46} />
    <CoreRing seed={3.3} radius={3.45} color="#826db9" size={.034} opacity={.27} />
    <mesh><sphereGeometry args={[.35, 20, 20]} /><meshBasicMaterial ref={surface} color="#dde9ff" transparent opacity={.8} /></mesh>
    <pointLight ref={coreLight} color="#8da8ff" intensity={1.5} distance={10} decay={2} />
  </group>
}
