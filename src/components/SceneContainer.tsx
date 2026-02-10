'use client'

import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { lock, unlock } from '@/engine/transitionLock'
import { Layer } from '@/store/useNavMeta'

export default function SceneContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sceneKey, setSceneKey] = useState<Layer>('intro')

  useEffect(() => {
    if (pathname.startsWith('/tracks')) {
      setSceneKey('tracks')
    } else {
      setSceneKey('intro')
    }
  }, [pathname])

  useEffect(() => {
    lock()
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
