'use client'

import MiniTrackSelector from "@/components/tracks/MiniTrackSelector"
import { motion } from "motion/react"
import EscapeButton from "@/components/tracks/EscapeButton"
import { useNavMeta } from "@/store/useNavMeta"

export default function TracksLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navMeta = useNavMeta()
  const isCodestellation = navMeta.currentMeta?.track === 'codestellation'
  const isDecode = navMeta.currentMeta?.track === 'decode'
  const hasTrack = isCodestellation || isDecode

  return (
    <>
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        animate={{
          background: isCodestellation
            ? 'radial-gradient(circle at center, rgba(88, 28, 135, 0.25) 0%, rgba(49, 46, 129, 0.15) 50%, transparent 100%)'
            : isDecode
            ? 'radial-gradient(circle at center, rgba(8, 145, 178, 0.25) 0%, rgba(30, 64, 175, 0.15) 50%, transparent 100%)'
            : 'radial-gradient(circle at center, transparent 0%, transparent 100%)',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      <EscapeButton />
      <MiniTrackSelector />
      
      <main className={`
        pl-16 md:pl-20 pr-4 md:pr-6 pb-12
        ${hasTrack ? 'pt-8 md:pt-16' : 'pt-16 md:pt-20'}
      `}>
        {children}
      </main>
    </>
  )
}
