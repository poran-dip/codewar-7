'use client'

import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useEffectEvent } from 'react'
import { lock, unlock } from '@/engine/transitionLock'
import { Layer } from '@/store/useNavMeta'

export default function SceneContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sceneKey, setSceneKey] = useState<Layer>('intro')
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const prevSceneKeyRef = useRef(sceneKey)

  const handleSceneChange = useEffectEvent((newKey: Layer, newDirection: 'forward' | 'back') => {
    setDirection(newDirection)
    setSceneKey(newKey)
  })

  useEffect(() => {
    const newKey: Layer = pathname.startsWith('/tracks') ? 'tracks' : 'intro'
    if (prevSceneKeyRef.current !== newKey) {
      const newDirection = newKey === 'tracks' ? 'forward' : 'back'
      lock()
      prevSceneKeyRef.current = newKey
      handleSceneChange(newKey, newDirection)
    }
  }, [pathname])

  const enterScale = direction === 'forward' ? 0.92 : 1.08

  return (
    <motion.div
      key={sceneKey}
      initial={{ opacity: 0.5, scale: enterScale, filter: 'brightness(1.5)' }}
      animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={unlock}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}
