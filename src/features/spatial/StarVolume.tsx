import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface PointCloudProps { count: number; radius: number; depth: number; size: number; opacity: number; color: string; seed: number }

function seeded(seed: number) { let value = seed; return () => { value = (value * 16807) % 2147483647; return (value - 1) / 2147483646 } }

function PointCloud({ count, radius, depth, size, opacity, color, seed }: PointCloudProps) {
  const group = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const random = seeded(seed); const points = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      const angle = random() * Math.PI * 2; const r = Math.pow(random(), .58) * radius
      points[index * 3] = Math.cos(angle) * r
      points[index * 3 + 1] = (random() - .5) * radius * .64
      points[index * 3 + 2] = -depth + random() * depth * 2
    }
    return points
  }, [count, depth, radius, seed])
  useFrame((_, delta) => { if (group.current && !document.hidden) group.current.rotation.z += delta * .0018 })
  return <points ref={group}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color={color} size={size} sizeAttenuation transparent opacity={opacity} depthWrite={false} /></points>
}

export function StarVolume({ far, mid, near }: { far: number; mid: number; near: number }) {
  return <group>
    <PointCloud count={far} radius={29} depth={26} size={.034} opacity={.5} color="#92a9e7" seed={17} />
    <PointCloud count={mid} radius={17} depth={13} size={.052} opacity={.64} color="#c5d5ff" seed={29} />
    <PointCloud count={near} radius={12} depth={6} size={.078} opacity={.52} color="#e6edff" seed={41} />
  </group>
}
