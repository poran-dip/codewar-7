'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState, memo } from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

import Sky from './Sky'
import Ground from './Ground'
import Pedestal from './Pedestal'
import Particles from './Particles'

function Background3D() {
  const [deviceTier, setDeviceTier] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const updateDeviceTier = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceTier('mobile')
      } else if (width < 1024) {
        setDeviceTier('tablet')
      } else {
        setDeviceTier('desktop')
      }
    }

    updateDeviceTier()
    window.addEventListener('resize', updateDeviceTier)
    return () => window.removeEventListener('resize', updateDeviceTier)
  }, [])

  const xOffset = deviceTier === 'mobile' ? 2.5 : deviceTier === 'tablet' ? 3.5 : 4.5

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 1, 5], fov: 50 }}
        dpr={deviceTier === 'mobile' ? 1 : [1, 2]}
        shadows={deviceTier === 'desktop'}
      >
        {/* Cyberpunk dark blue-purple gradient background */}
        <color attach="background" args={['#0a0118']} />
        <fog attach="fog" args={['#0a0118', 5, 15]} />

        {/* Ambient lighting (reduced since pedestals provide main light) */}
        <ambientLight intensity={0.2} />
        <hemisphereLight
          color="#4fc3f7"
          groundColor="#1a0033"
          intensity={0.4}
        />

        <Suspense fallback={null}>
          <Sky />
          <Ground deviceTier={deviceTier} />
          
          {/* Left Pedestal - Codestellation (Purple) */}
          <Pedestal 
            position={[-xOffset, -0.3, -2]} 
            color="#9c27b0" 
            track="codestellation"
            deviceTier={deviceTier}
          />
          
          {/* Right Pedestal - Decode (Cyan) */}
          <Pedestal 
            position={[xOffset, -0.3, -2]} 
            color="#00e5ff" 
            track="decode"
            deviceTier={deviceTier}
          />
          
          <Particles deviceTier={deviceTier} />
        </Suspense>

        {deviceTier === 'desktop' && (
          <EffectComposer>
            <Bloom intensity={1.5} luminanceThreshold={0.15} />
            <Vignette eskil={false} offset={0.15} darkness={0.8} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}

export default memo(Background3D)
