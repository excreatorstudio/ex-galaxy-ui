import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGalaxyStore } from '../../state/useGalaxyStore'
import { spatialMotion } from './spatialMotion'

export function CameraRig() {
  const { camera } = useThree(); const { phase, motionOff } = useGalaxyStore()
  const pointer = useRef({ x: 0, y: 0 }); const target = useMemo(() => new THREE.Vector3(), []); const lookAt = useMemo(() => new THREE.Vector3(), [])
  useEffect(() => {
    const move = (event: PointerEvent) => { pointer.current = { x: event.clientX / window.innerWidth - .5, y: event.clientY / window.innerHeight - .5 } }
    window.addEventListener('pointermove', move, { passive: true }); return () => window.removeEventListener('pointermove', move)
  }, [])
  useFrame(({ clock }, delta) => {
    const staticFocus = phase === 'module-focus' ? -2.05 : 0
    const drift = motionOff ? 0 : Math.sin(clock.elapsedTime * .13) * .075
    const px = motionOff ? 0 : pointer.current.x * .32
    const py = motionOff ? 0 : pointer.current.y * -.22
    target.set(px + spatialMotion.cameraX, py + spatialMotion.cameraY + drift, 12 + staticFocus + spatialMotion.cameraZ)
    camera.position.lerp(target, 1 - Math.exp(-delta * 2.7))
    spatialMotion.cameraWorldZ = camera.position.z
    lookAt.set(px * .17, py * .12, 0)
    camera.lookAt(lookAt)
  })
  return null
}
