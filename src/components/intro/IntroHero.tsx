'use client'

import { motion } from 'motion/react'
import TrackSelector from './TrackSelector'
import { useEffect, useState } from 'react'
import { unlock } from '@/engine/transitionLock'

export default function IntroHero() {
  const [selectedTrack, setSelectedTrack] = useState<'codestellation' | 'decode' | null>(null)

  useEffect(() => {
    if (selectedTrack) {
      const event = new CustomEvent('trackSelected', { detail: selectedTrack })
      window.dispatchEvent(event)
    } else {
      unlock()
    }
  }, [selectedTrack])

  return (
    <section className="mb-12 md:-mb-10 relative z-10 h-full w-full flex flex-col items-center justify-center px-4 md:px-6">
      
      {/* Dynamic Background Color Overlay */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        animate={{
          background: selectedTrack === 'codestellation'
            ? 'radial-gradient(circle at center, rgba(88, 28, 135, 0.3) 0%, rgba(49, 46, 129, 0.2) 50%, transparent 100%)'
            : selectedTrack === 'decode'
            ? 'radial-gradient(circle at center, rgba(8, 145, 178, 0.3) 0%, rgba(30, 64, 175, 0.2) 50%, transparent 100%)'
            : 'radial-gradient(circle at center, transparent 0%, transparent 100%)',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* TOP HUD - Event Info with Logos */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="mb-2 md:mb-4"
      >
        <div className="relative">
          <div className="absolute -top-1 -left-1 md:-top-1.5 md:-left-1.5 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 border-cyan-400/60" />
          <div className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-cyan-400/60" />
          
          <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 px-2.5 py-1.5 md:px-4 md:py-2 font-mono">
            <div className="flex items-center gap-3">
              <div className="relative h-4.5 md:h-6">
                <img 
                  src="/branding/udbhavanam.png" 
                  alt="Udbhavanam 13.0"
                  className="h-full w-auto object-contain opacity-90"
                />
              </div>
              <div className="h-5 w-px bg-linear-to-b from-transparent via-cyan-500/60 to-transparent" />
              <div className="relative h-4.5 md:h-6">
                <img 
                  src="/branding/pyrokinesis.png" 
                  alt="Pyrokinesis 2026"
                  className="h-full w-auto object-contain opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MAIN TITLE - Center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
        className="relative z-20 mb-3 md:mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 blur-xl md:blur-3xl bg-cyan-500/20" />
          
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-cyan-500/50 px-4 py-2 md:px-8 md:py-4 clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
            <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-cyan-400" />
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight font-mono text-cyan-300 drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
              CODEWAR 7.0
            </h1>
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-linear-to-r from-transparent via-cyan-500/60 to-transparent" />
        </div>
      </motion.div>

      {/* TRACK SELECTOR - Bounded */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
        className="relative z-20 w-full max-w-5xl"
      >
        <TrackSelector onTrackChange={setSelectedTrack} selectedTrack={selectedTrack} />
      </motion.div>

      {/* BOTTOM HUD - Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-3 md:mt-6"
      >
        <div className="relative bg-black/80 backdrop-blur-sm border border-cyan-500/30 px-2.5 py-1 md:px-4 md:py-2 font-mono">
          <div className="absolute -bottom-0.5 -left-0.5 md:-bottom-1 md:-left-1 w-2 h-2 md:w-2.5 md:h-2.5 border-b-2 border-l-2 border-cyan-400/60" />
          <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-2 h-2 md:w-2.5 md:h-2.5 border-b-2 border-r-2 border-cyan-400/60" />
          
          <div className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] text-cyan-400/70">
            <kbd className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-300 hidden md:inline font-bold">←</kbd>
            <kbd className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-300 hidden md:inline font-bold">→</kbd>
            <span className="text-cyan-500/50 hidden md:inline">|</span>
            <kbd className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-300 hidden md:inline font-bold">ENTER</kbd>
            <span className="text-cyan-500/50 hidden md:inline">|</span>
            <span className="text-cyan-400/50 inline">2x CLICK</span>
          </div>
        </div>
      </motion.div>

      {/* System label - hidden on mobile */}
      <div className="hidden md:block absolute bottom-6 left-4 text-[10px] font-mono text-cyan-500/30 tracking-widest">
        TRACK_SELECT_v7.0
      </div>

      {/* CC Attribution */}
      <div className="hidden md:block absolute bottom-6 right-4 text-[10px] font-mono text-cyan-500/20 tracking-wide">
        <a
          href="https://poly.pizza/m/8AJVYPEBVqt"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-500/50 transition-colors"
        >
          "Simple Pillar" by Troctzul [CC-BY]
        </a>
      </div>

    </section>
  )
}
