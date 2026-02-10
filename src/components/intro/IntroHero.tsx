'use client'

import { motion } from 'motion/react'
import TrackSelector from './TrackSelector'
import { useState } from 'react'

export default function IntroHero() {
  const [selectedTrack, setSelectedTrack] = useState<'codestellation' | 'decode' | null>(null)

  return (
    <section className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 pt-32 pb-20">
      
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

      {/* Image Placeholder Overlay */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        animate={{
          opacity: selectedTrack ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* This is where your image with transparency will go */}
        <div className="w-full h-full bg-[url('/path-to-your-image.png')] bg-cover bg-center opacity-0">
          {/* Placeholder - replace opacity-0 with actual image */}
        </div>
      </motion.div>

      {/* TOP HUD - Event Info */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="relative">
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60" />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60" />
          
          <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 px-6 py-3 font-mono">
            <p className="text-[10px] md:text-xs text-cyan-400/60 tracking-[0.3em] uppercase">
              UDBHAVANAM 13.0 · PYROKINESIS 2026
            </p>
          </div>
        </div>
      </motion.div>

      {/* MAIN TITLE - Center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
        className="relative z-20 mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-cyan-500/20" />
          
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-cyan-500/50 px-6 py-3 md:px-10 md:py-5 clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400" />
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-mono text-cyan-300 drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
              CODEWAR 7.0
            </h1>
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-linear-to-r from-transparent via-cyan-500/60 to-transparent" />
        </div>
      </motion.div>

      {/* TRACK SELECTOR - Bounded */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
        className="relative z-20 w-full max-w-4xl"
      >
        <TrackSelector onTrackChange={setSelectedTrack} selectedTrack={selectedTrack} />
      </motion.div>

      {/* BOTTOM HUD - Controls - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="relative bg-black/80 backdrop-blur-sm border border-cyan-500/30 px-4 py-2 font-mono">
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60" />
          
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-cyan-400/70">
            <kbd className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-300 font-bold">←</kbd>
            <kbd className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-300 font-bold">→</kbd>
            <span className="text-cyan-500/50">|</span>
            <kbd className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-300 font-bold">ENTER</kbd>
            <span className="text-cyan-500/50">|</span>
            <span className="text-cyan-400/50">2x CLICK</span>
          </div>
        </div>
      </motion.div>

      {/* System label */}
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-cyan-500/30 tracking-widest">
        TRACK_SELECT_v7.0
      </div>

    </section>
  )
}