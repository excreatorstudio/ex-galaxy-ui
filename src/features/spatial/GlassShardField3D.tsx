import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getTransitionDebugConfig } from '../transition/transitionTrajectories'
import { getTransitionProgress } from '../../config/sceneTransitionConfig'
import { useGalaxyStore } from '../../state/useGalaxyStore'
import type { SceneTransitionKind } from '../../types'
import { spatialMotion } from './spatialMotion'
import { getSpatialShardPose, getSpatialShardSeeds, type ShardSeed } from './spatialShardMotion'

function makeShardGeometry(scaleX: number, scaleY: number, scaleZ: number) {
  const geometry = new THREE.OctahedronGeometry(.62, 0)
  geometry.scale(scaleX, scaleY, scaleZ)
  return geometry
}

function SpatialShard({ seed, index, geometries, startedAt, transition, mobile, lowMaterial }: { seed: ShardSeed; index: number; geometries: THREE.BufferGeometry[]; startedAt: number; transition: SceneTransitionKind; mobile: boolean; lowMaterial: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const debug = getTransitionDebugConfig(import.meta.env.DEV, window.location.search)
  useFrame(() => {
    if (!mesh.current) return
    const progress = getTransitionProgress(startedAt, Date.now(), false, debug.playbackRate)
    const pose = getSpatialShardPose(seed, index, progress, transition)
    mesh.current.position.set(pose.x, pose.y, pose.z)
    mesh.current.scale.setScalar(mobile ? pose.scale * .72 : pose.scale)
    mesh.current.rotation.set(...pose.rotation)
    const material = mesh.current.material as THREE.MeshStandardMaterial
    material.opacity = mobile ? pose.opacity * .7 : pose.opacity
    material.emissiveIntensity = index === 0 ? .13 + progress * .1 : .055
    if (index === 0) {
      spatialMotion.primaryShardZ = pose.z
      spatialMotion.nearPlaneCrossed = pose.z >= spatialMotion.cameraWorldZ - .1
    }
  })
  const foreground = seed.wave === 'center-lead' || seed.wave === 'primary-radial'
  return <mesh ref={mesh} geometry={geometries[index % geometries.length]} renderOrder={10}>{lowMaterial
    ? <meshStandardMaterial color={foreground ? '#c9d8f0' : '#aab7d6'} emissive="#536b9c" transparent opacity={0} roughness={.4} metalness={.08} side={THREE.DoubleSide} depthWrite={false} />
    : <meshPhysicalMaterial color={foreground ? '#d7e6ff' : '#b9c8f4'} emissive="#6c86c8" transparent opacity={0} roughness={foreground ? .16 : .24} metalness={foreground ? .28 : .16} transmission={mobile ? .02 : foreground ? .18 : .09} thickness={foreground ? .72 : .42} ior={1.32} clearcoat={foreground ? .44 : .22} clearcoatRoughness={.18} side={THREE.DoubleSide} depthWrite={false} />}
  </mesh>
}

export function GlassShardField3D({ mobile = false, lowMaterial = false, qualityOverride }: { mobile?: boolean; lowMaterial?: boolean; qualityOverride?: 'high' | 'balanced' | 'low' }) {
  const { sceneTransition, sceneTransitionStartedAt, motionOff, spatialActive, quality } = useGalaxyStore()
  const geometries = useMemo(() => [makeShardGeometry(1.22, .72, .72), makeShardGeometry(.94, 1.05, .62), makeShardGeometry(1.1, .62, .82)], [])
  const seeds = getSpatialShardSeeds(qualityOverride ?? quality, mobile)
  useEffect(() => () => { geometries.forEach((geometry) => geometry.dispose()) }, [geometries])
  if (!sceneTransition || !sceneTransitionStartedAt || motionOff || !spatialActive) return null
  return <group>{seeds.map((seed, index) => <SpatialShard key={index} seed={seed} index={index} geometries={geometries} startedAt={sceneTransitionStartedAt} transition={sceneTransition} mobile={mobile} lowMaterial={lowMaterial} />)}</group>
}
