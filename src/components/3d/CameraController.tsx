'use client'

import { isLocked } from '@/engine/transitionLock'
import { useFrame, useThree } from '@react-three/fiber'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import * as THREE from 'three'

export default function CameraController({ deviceTier }: { deviceTier: 'mobile' | 'tablet' | 'desktop' }) {
  const { camera } = useThree()
  const pathname = usePathname()
  const [restingPosition, setRestingPosition] = useState(new THREE.Vector3(0, 1, 5))
  const [restingLookAt, setRestingLookAt] = useState(new THREE.Vector3(0, 0, 0))
  const [breathingBlend, setBreathingBlend] = useState(0)
  const [cameraTarget, setCameraTarget] = useState<{
    position: THREE.Vector3
    lookAt: THREE.Vector3
  } | null>(null)

  useEffect(() => {
    const setCameraView = (pos: THREE.Vector3, look: THREE.Vector3) => {
      setRestingPosition(pos)
      setRestingLookAt(look)
      setCameraTarget({ position: pos, lookAt: look })
    }
    
    const isMobile = deviceTier === 'mobile'
    
    if (pathname === '/') {
      setCameraView(
        new THREE.Vector3(0, 1, isMobile ? 10 : 5),
        new THREE.Vector3(0, 0, 0)
      )
    } else if (pathname.includes('/tracks/codestellation')) {
      setCameraView(
        new THREE.Vector3(isMobile ? -4 : -3, 1, isMobile ? 7 : 3),
        new THREE.Vector3(isMobile ? -3 : -4, 1, 0)
      )
    } else if (pathname.includes('/tracks/decode')) {
      setCameraView(
        new THREE.Vector3(isMobile ? 4 : 3, 1, isMobile ? 7 : 3),
        new THREE.Vector3(isMobile ? 3 : 4, 1, 0)
      )
    }
  }, [pathname])

  useFrame(({ clock }) => {
    const lerpSpeed = deviceTier === 'mobile' ? 0.03 : 0.05

    if (cameraTarget) {
      camera.position.lerp(cameraTarget.position, lerpSpeed)
      
      const currentLookAt = new THREE.Vector3()
      camera.getWorldDirection(currentLookAt)
      currentLookAt.multiplyScalar(10).add(camera.position)
      currentLookAt.lerp(cameraTarget.lookAt, lerpSpeed)
      camera.lookAt(currentLookAt)
      
      if (camera.position.distanceTo(cameraTarget.position) < 0.05) {
        setCameraTarget(null)
      }
      
      setBreathingBlend(Math.max(0, breathingBlend - 0.02))
    }
    else if (!isLocked()) {
      const newBlend = Math.min(1, breathingBlend + 0.02)
      setBreathingBlend(newBlend)
      
      const t = clock.getElapsedTime()
      
      const breathingOffset = new THREE.Vector3(
        Math.sin(t * 0.15) * 0.3 * newBlend,
        Math.sin(t * 0.2) * 0.15 * newBlend,
        Math.cos(t * 0.15) * 0.2 * newBlend
      )
      
      camera.position.copy(restingPosition).add(breathingOffset)
      
      const lookAtOffset = new THREE.Vector3(
        Math.sin(t * 0.1) * 0.1 * newBlend,
        Math.cos(t * 0.12) * 0.05 * newBlend,
        0
      )
      camera.lookAt(restingLookAt.clone().add(lookAtOffset))
    }
  })

  return null
}
