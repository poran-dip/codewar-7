'use client'

import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { lock, unlock } from '@/engine/transitionLock'
import { TrackSection } from '@/store/useNavMeta'

const SECTION_ORDER: Record<TrackSection, number> = {
  '': 0,
  ps: 1,
  rules: 2,
  prizes: 3,
  faq: 4,
}

export default function TracksSectionsContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sceneKey, setSceneKey] = useState<TrackSection>('')
  const prevSceneKeyRef = useRef(sceneKey)
  const directionRef = useRef<1 | -1>(1)

  useEffect(() => {
    const newKey: TrackSection = pathname.includes('rules')
      ? 'rules'
      : pathname.includes('prizes')
      ? 'prizes'
      : pathname.includes('faq')
      ? 'faq'
      : pathname.includes('ps')
      ? 'ps'
      : ''

    if (prevSceneKeyRef.current !== newKey) {
      const prevOrder = SECTION_ORDER[prevSceneKeyRef.current]
      const nextOrder = SECTION_ORDER[newKey]
      directionRef.current = nextOrder >= prevOrder ? 1 : -1

      lock()
      prevSceneKeyRef.current = newKey
      setSceneKey(newKey)
    }
  }, [pathname])

  const xIn = `${directionRef.current * 3}%`

  return (
    <motion.div
      key={sceneKey}
      initial={{ opacity: 0.5, x: xIn, filter: 'brightness(1.15)' }}
      animate={{ opacity: 1, x: 0, filter: 'brightness(1)' }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      onAnimationComplete={unlock}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}
