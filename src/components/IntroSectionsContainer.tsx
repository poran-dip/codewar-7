'use client'

import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useEffectEvent } from 'react'
import { lock, unlock } from '@/engine/transitionLock'
import { IntroSection } from '@/store/useNavMeta'

const INTRO_ORDER: Record<IntroSection, number> = {
  '': 0,
  contact: 1,
  sponsors: 2,
}

export default function IntroSectionsContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sceneKey, setSceneKey] = useState<IntroSection>('')
  const [direction, setDirection] = useState<1 | -1>(1)
  const prevSceneKeyRef = useRef(sceneKey)

  const handleSceneChange = useEffectEvent((newKey: IntroSection, newDirection: 1 | -1) => {
    setDirection(newDirection)
    setSceneKey(newKey)
  })

  useEffect(() => {
    const newKey: IntroSection = pathname.includes('contact')
      ? 'contact'
      : pathname.includes('sponsors')
      ? 'sponsors'
      : ''

    if (prevSceneKeyRef.current !== newKey) {
      const prevOrder = INTRO_ORDER[prevSceneKeyRef.current]
      const nextOrder = INTRO_ORDER[newKey]
      const newDirection = nextOrder >= prevOrder ? 1 : -1

      lock()
      prevSceneKeyRef.current = newKey
      handleSceneChange(newKey, newDirection)
    }
  }, [pathname])

  const yEnter = direction === 1 ? 22 : -22

  return (
    <motion.div
      key={sceneKey}
      initial={{ opacity: 0.5, y: yEnter }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={unlock}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}
