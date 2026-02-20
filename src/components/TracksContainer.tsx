'use client'

import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { lock, unlock } from '@/engine/transitionLock'
import { Track } from '@/store/useNavMeta'

const TRACK_ORDER: Record<Track, number> = {
  codestellation: 0,
  decode: 1,
}

export default function TracksContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sceneKey, setSceneKey] = useState<Track | 'none'>('codestellation')
  const prevSceneKeyRef = useRef<Track | 'none'>(sceneKey)
  const directionRef = useRef<1 | -1>(1)

  useEffect(() => {
    const newKey: Track | 'none' = pathname.includes('codestellation')
      ? 'codestellation'
      : pathname.includes('decode')
      ? 'decode'
      : 'none'

    if (prevSceneKeyRef.current !== newKey) {
      const prevOrder = prevSceneKeyRef.current !== 'none' ? TRACK_ORDER[prevSceneKeyRef.current] : 0
      const nextOrder = newKey !== 'none' ? TRACK_ORDER[newKey] : 0
      directionRef.current = nextOrder >= prevOrder ? 1 : -1

      lock()
      prevSceneKeyRef.current = newKey
      setSceneKey(newKey)
    }
  }, [pathname])

  const xIn = `${directionRef.current * -6}%`

  return (
    <motion.div
      key={sceneKey}
      initial={{ opacity: 0.5, x: xIn, scale: 0.99 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      onAnimationComplete={unlock}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}
