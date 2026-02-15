'use client'

import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { lock, unlock } from '@/engine/transitionLock'
import { TrackSection } from '@/store/useNavMeta'

export default function SceneContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sceneKey, setSceneKey] = useState<TrackSection>('')
  const prevSceneKeyRef = useRef(sceneKey)

  useEffect(() => {
    if (pathname.includes('rules')) {
      setSceneKey('rules')
    } else if (pathname.includes('prizes')) {
      setSceneKey('prizes')
    } else if (pathname.includes('faq')) {
      setSceneKey('faq')
    } else {
      setSceneKey('')
    }
  }, [pathname])

  useEffect(() => {
    if (prevSceneKeyRef.current !== sceneKey) {
      lock()
      prevSceneKeyRef.current = sceneKey
    }
  }, [sceneKey])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.98 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => {
          unlock()
        }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
