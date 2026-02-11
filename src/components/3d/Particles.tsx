'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type DeviceTier = 'mobile' | 'tablet' | 'desktop'

export default function Particles({ deviceTier }: { deviceTier: DeviceTier }) {
  const ref = useRef<THREE.Points>(null!)

  const particleCount = deviceTier === 'mobile' ? 100 : deviceTier === 'tablet' ? 150 : 250

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = Math.random() * 5 - 1
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12

      // Color variation (cyan to purple)
      const colorMix = Math.random()
      if (colorMix > 0.5) {
        colors[i * 3] = 0.0      // R
        colors[i * 3 + 1] = 0.9  // G
        colors[i * 3 + 2] = 1.0  // B (cyan)
      } else {
        colors[i * 3] = 0.6      // R
        colors[i * 3 + 1] = 0.15 // G
        colors[i * 3 + 2] = 0.7  // B (purple)
      }

      // Size variation
      sizes[i] = Math.random() * 0.05 + 0.02
    }

    return { positions, colors, sizes }
  }, [particleCount])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.03
      
      // Pulse effect
      const material = ref.current.material as THREE.PointsMaterial
      if (material) {
        material.opacity = 0.6 + Math.sin(clock.getElapsedTime()) * 0.2
      }
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
