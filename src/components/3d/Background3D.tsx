'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

import Sky from './Sky'
import Ground from './Ground'
import SideProps from './SideProps'
import SideCores from './SideCores'
import Particles from './Particles'

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0.5, 4], fov: 50 }}>
        <color attach="background" args={['#0d001f']} />
        <fog attach="fog" args={['#120018', 4, 12]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 5, 2]} intensity={1} />
        <pointLight position={[-2, 0, 1]} intensity={1.5} color="#7c5cff" />
        <pointLight position={[2, 0, 1]} intensity={1.5} color="#ff00ff" />
        <hemisphereLight
          color="#7c5cff"
          groundColor="#0a0a12"
          intensity={0.6}
        />
        <pointLight position={[0, 2, 3]} intensity={0.8} color="#ffffff" />

        <Suspense fallback={null}>
          <Sky />
          <Ground />
          <SideProps />
          <SideCores />
          <Particles />
        </Suspense>

        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.25} />
          <Vignette eskil={false} offset={0.1} darkness={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
