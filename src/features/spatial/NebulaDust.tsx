import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export function NebulaDust({ count }: { count: number }) {
  const cloud = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const points = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      const angle = index * 2.399; const radius = 1.6 + (index % 31) * .085
      points[index * 3] = Math.cos(angle) * radius * 1.7
      points[index * 3 + 1] = Math.sin(angle) * radius * .42
      points[index * 3 + 2] = -2.8 + (index % 7) * .8
    }
    return points
  }, [count])
  useFrame((_, delta) => { if (cloud.current && !document.hidden) cloud.current.rotation.z -= delta * .008 })
  return <points ref={cloud} rotation={[.12, -.1, -.18]}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#8d80d1" size={.12} transparent opacity={.12} sizeAttenuation depthWrite={false} /></points>
}
