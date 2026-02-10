'use client'

import MiniTrackSelector from "@/components/tracks/MiniTrackSelector"
import TracksNavbar from "@/components/tracks/TracksNavbar"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"

export default function TracksLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const isCodestellation = pathname.includes('codestellation')
  const isDecode = pathname.includes('decode')

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

      <TracksNavbar />
      <MiniTrackSelector />
      <main className="ml-20 pt-24 px-6 pb-12">
        {children}
      </main>
    </>
  )
}
