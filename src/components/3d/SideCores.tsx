'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Core({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const mesh = ref.current
    if (!mesh) return

    mesh.rotation.y += 0.01
    mesh.position.y = position[1] + Math.sin(t * 1.5) * 0.05
  })

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.35, 0]} /> {/* LOW POLY */}
      <meshStandardMaterial
        color="#7c9cff"
        emissive="#4f6bff"
        emissiveIntensity={2}
        metalness={1}
        roughness={0.2}
      />
    </mesh>
  )
}

export default function SideCores() {
  return (
    <>
      <Core position={[-1.8, -0.2, 0]} />
      <Core position={[1.8, -0.2, 0]} />
    </>
  )
}
