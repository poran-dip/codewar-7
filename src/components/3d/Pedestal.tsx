'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { usePathname } from 'next/navigation'

type PedestalProps = {
  position: [number, number, number]
  color: string
  track: 'codestellation' | 'decode'
  deviceTier: 'mobile' | 'tablet' | 'desktop'
}

export default function Pedestal({ position, color, track, deviceTier }: PedestalProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const lightRef = useRef<THREE.PointLight>(null!)
  const pathname = usePathname()

  // Add inside the Pedestal component, before the return
  useEffect(() => {
    const handleTrackSelected = (e: CustomEvent) => {
      if (e.detail === track && groupRef.current) {
        // Trigger a subtle pedestal activation animation
        const material = (groupRef.current.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial
        const originalEmissive = material.emissiveIntensity
        
        let progress = 0
        const animate = () => {
          progress += 0.05
          if (progress <= 1) {
            material.emissiveIntensity = originalEmissive + Math.sin(progress * Math.PI) * 2
            requestAnimationFrame(animate)
          } else {
            material.emissiveIntensity = originalEmissive
          }
        }
        animate()
      }
    }

    window.addEventListener('trackSelected', handleTrackSelected as EventListener)
    return () => window.removeEventListener('trackSelected', handleTrackSelected as EventListener)
  }, [track])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    
    // Animate core rotation and float
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.015
      coreRef.current.rotation.x = Math.sin(t * 0.5) * 0.15
      coreRef.current.position.y = Math.sin(t * 1.5) * 0.1
    }

    // Pulse the glow
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.01
      const scale = 1 + Math.sin(t * 2) * 0.15
      glowRef.current.scale.setScalar(scale)
    }

    // Pulse the light intensity
    if (lightRef.current) {
      lightRef.current.intensity = 3 + Math.sin(t * 2) * 0.5
    }

    // Slight pedestal breathing
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.02
    }
  })

  const isActive = pathname.includes(`/tracks/${track}`)
  const intensity = isActive ? 5 : 3

  return (
    <group ref={groupRef} position={position}>
      {/* Base platform */}
      <mesh position={[0, -0.9, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 0.2, 8]} />
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Middle pillar section */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 1, 8]} />
        <meshStandardMaterial
          color="#0d0d20"
          metalness={0.95}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Top pillar section */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.8, 8]} />
        <meshStandardMaterial
          color="#0d0d20"
          metalness={0.95}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Top cap - where the core sits */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.4, 0.2, 8]} />
        <meshStandardMaterial
          color={color}
          metalness={1}
          roughness={0.05}
          emissive={color}
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Floating Core above the pedestal */}
      <group position={[0, 1.5, 0]}>
        {/* Outer glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Main core */}
        <mesh ref={coreRef} castShadow>
          <icosahedronGeometry args={[0.4, deviceTier === 'desktop' ? 1 : 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={3}
            metalness={1}
            roughness={0.1}
          />
        </mesh>

        {/* Inner bright core */}
        <mesh>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Point light from the core */}
        <pointLight
          ref={lightRef}
          color={color}
          intensity={intensity}
          distance={deviceTier === 'mobile' ? 4 : 8}
          decay={2}
          castShadow={deviceTier === 'desktop'}
        />
      </group>

      {/* Decorative rings around the pillar */}
      {[0.3, -0.1, -0.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.55 + i * 0.05, 0.02, 8, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}
