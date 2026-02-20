'use client'

import { isLocked } from '@/engine/transitionLock'
import { useFrame, useThree } from '@react-three/fiber'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

const _breathingOffset = new THREE.Vector3()
const _lookAtOffset = new THREE.Vector3()
const _currentLookAt = new THREE.Vector3()

export default function CameraController({ deviceTier }: { deviceTier: 'mobile' | 'tablet' | 'desktop' }) {
  const { camera } = useThree()
  const pathname = usePathname()

  const [restingPosition, setRestingPosition] = useState(new THREE.Vector3(0, 1, 5))
  const [restingLookAt, setRestingLookAt] = useState(new THREE.Vector3(0, 0, 0))
  const [cameraTarget, setCameraTarget] = useState<{
    position: THREE.Vector3
    lookAt: THREE.Vector3
  } | null>(null)

  const breathingBlendRef = useRef(0)

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
  }, [pathname, deviceTier])

  useFrame(({ clock }) => {
    const lerpSpeed = deviceTier === 'mobile' ? 0.03 : 0.05

    if (cameraTarget) {
      camera.position.lerp(cameraTarget.position, lerpSpeed)

      camera.getWorldDirection(_currentLookAt)
      _currentLookAt.multiplyScalar(10).add(camera.position)
      _currentLookAt.lerp(cameraTarget.lookAt, lerpSpeed)
      camera.lookAt(_currentLookAt)

      if (camera.position.distanceTo(cameraTarget.position) < 0.05) {
        setCameraTarget(null)
      }

      breathingBlendRef.current = Math.max(0, breathingBlendRef.current - 0.02)
    }
    else if (!isLocked()) {
      breathingBlendRef.current = Math.min(1, breathingBlendRef.current + 0.02)
      const blend = breathingBlendRef.current

      const t = clock.getElapsedTime()

      _breathingOffset.set(
        Math.sin(t * 0.15) * 0.3 * blend,
        Math.sin(t * 0.2) * 0.15 * blend,
        Math.cos(t * 0.15) * 0.2 * blend
      )

      camera.position.copy(restingPosition).add(_breathingOffset)

      _lookAtOffset.set(
        Math.sin(t * 0.1) * 0.1 * blend,
        Math.cos(t * 0.12) * 0.05 * blend,
        0
      )

      camera.lookAt(_lookAtOffset.add(restingLookAt))
    }
  })

  return null
}
