'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
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

  const { scene } = useGLTF('/3d/pillar.glb')

  // Clone scene so two instances don't share the same object
  const clonedScene = useRef(scene.clone())

  // Apply emissive color to the GLB materials
  useEffect(() => {
    clonedScene.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = (mesh.material as THREE.Material).clone()
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.color.set('#6a6a8a')
        mat.emissive = new THREE.Color(color)
        mat.emissiveIntensity = 0.2  // keep it subtle so original colors aren't washed out
        mat.metalness = 0.3
        mat.roughness = 0.7
        mesh.castShadow = true
      }
    })
  }, [color])

  useEffect(() => {
    const handleTrackSelected = (e: CustomEvent) => {
      if (e.detail === track && groupRef.current) {
        clonedScene.current.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
            const originalEmissive = mat.emissiveIntensity

            let progress = 0
            const animate = () => {
              progress += 0.1
              if (progress <= 1) {
                mat.emissiveIntensity = originalEmissive + Math.sin(progress * Math.PI) * 2
                requestAnimationFrame(animate)
              } else {
                mat.emissiveIntensity = originalEmissive
              }
            }
            animate()
          }
        })
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
      {/* GLB Pillar Model */}
      <primitive
        object={clonedScene.current}
        scale={[0.3, 0.3, 0.3]}       // tweak this if the pillar is too big/small
        position={[0, -1, 0]}   // tweak Y to sit flush on the ground
      />

      {/* Floating Core above the pedestal */}
      <group position={[0, 1.85, 0]}>
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
          <sphereGeometry args={[0.4, 32, 32]} />
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
    </group>
  )
}

useGLTF.preload('/3d/pillar.glb')
