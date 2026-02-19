'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type DeviceTier = 'mobile' | 'tablet' | 'desktop'

export default function Ground({ deviceTier }: { deviceTier: DeviceTier }) {
  const gridRef = useRef<THREE.GridHelper>(null!)

  useFrame(({ clock }) => {
    if (gridRef.current && deviceTier !== 'mobile') {
      const material = gridRef.current.material as THREE.Material
      if (Array.isArray(material)) {
        material.forEach(mat => {
          if ('opacity' in mat) {
            mat.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1
          }
        })
      }
    }
  })

  const gridSize = deviceTier === 'mobile' ? 20 : deviceTier === 'tablet' ? 25 : 30
  const gridDivisions = deviceTier === 'mobile' ? 20 : 30

  return (
    <>
      {/* Main floor - solid with metallic sheen */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial
          color="#0d0025"
          metalness={0.0}
          roughness={1.0}
          emissive="#1a0040"
          emissiveIntensity={0.2}
          envMapIntensity={0}
        />
      </mesh>

      {/* Animated grid overlay */}
      <gridHelper 
        ref={gridRef}
        args={[gridSize, gridDivisions, '#00e5ff', '#7b2cbf']} 
        position={[0, -1.19, 0]}
      />

      {/* Subtle underglow effect (desktop only) */}
      {deviceTier === 'desktop' && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]}>
          <planeGeometry args={[gridSize * 0.8, gridSize * 0.8]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </>
  )
}
