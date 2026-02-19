'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Track = 'codestellation' | 'decode' | null

interface TrackSelectorProps {
  onTrackChange?: (track: Track) => void
  selectedTrack: Track
}

export default function TrackSelector({ onTrackChange, selectedTrack }: TrackSelectorProps) {
  const [hoveredTrack, setHoveredTrack] = useState<Track>(null)
  const router = useRouter()

  const activeTrack = selectedTrack || hoveredTrack

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        onTrackChange?.('codestellation')
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        onTrackChange?.('decode')
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onTrackChange?.(null)
      } else if ((e.key === 'Enter' || e.key === 'f' || e.key === 'F') && selectedTrack) {
        e.preventDefault()
        router.push(`/tracks/${selectedTrack}`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedTrack, router, onTrackChange])

  const handleTrackClick = (track: Track) => {
    if (selectedTrack === track && track) {
      router.push(`/tracks/${track}`)
    } else {
      onTrackChange?.(track)
    }
  }

  return (
    <div className="relative w-full">
      {/* Mission briefing label */}
      <div className="text-center mb-2 md:mb-4">
        <p className="text-[9px] md:text-xs font-mono text-cyan-400/60 tracking-widest md:tracking-[0.2em] uppercase">
          CHOOSE YOUR BATTLEFIELD
        </p>
      </div>

      {/* Track Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 lg:gap-8">
        
        {/* CODESTELLATION Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleTrackClick('codestellation')}
          onMouseEnter={() => setHoveredTrack('codestellation')}
          onMouseLeave={() => setHoveredTrack(null)}
          className={`
            relative group cursor-pointer
            bg-black/40 backdrop-blur-md
            border-2 transition-all duration-300
            clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]
            ${activeTrack === 'codestellation'
              ? 'border-purple-400/80 shadow-[0_0_40px_rgba(168,85,247,0.5)]'
              : 'border-purple-500/30 hover:border-purple-400/50'
            }
          `}
        >
          {/* Corner decorations */}
          <div className={`absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 transition-colors ${activeTrack === 'codestellation' ? 'border-purple-400' : 'border-purple-500/50'}`} />
          <div className={`absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 transition-colors ${activeTrack === 'codestellation' ? 'border-purple-400' : 'border-purple-500/50'}`} />
          <div className={`absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 transition-colors ${activeTrack === 'codestellation' ? 'border-purple-400' : 'border-purple-500/50'}`} />
          <div className={`absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 transition-colors ${activeTrack === 'codestellation' ? 'border-purple-400' : 'border-purple-500/50'}`} />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-900/30 via-purple-800/20 to-indigo-900/30 clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]" />
          
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

          <div className="relative p-3 md:p-5 lg:p-7">
            {/* Track badge */}
            <div className="inline-block mb-1.5 md:mb-2 px-2 py-0.5 md:px-3 md:py-1 bg-purple-500/20 border border-purple-400/30 text-[8px] md:text-[10px] font-mono text-purple-300 tracking-widest">
              TRACK_01
            </div>

            <h2 className="text-lg md:text-xl lg:text-3xl font-black font-mono tracking-tight text-purple-300 mb-1 md:mb-2">
              CODESTELLATION
            </h2>
            <p className="text-[11px] md:text-sm lg:text-base text-purple-200/70 font-mono mb-2 md:mb-3">
              Navigate the Stars of Code
            </p>

            {/* Select/Enter */}
            <button
              onClick={(e) => { e.stopPropagation(); handleTrackClick('codestellation') }}
              className="relative inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 font-mono text-[9px] md:text-xs font-bold uppercase tracking-widest text-white border border-purple-400/60 bg-purple-500/20 hover:bg-purple-500/40 hover:border-purple-400 transition-all duration-200 cursor-pointer group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-purple-300/70 group-hover:border-white" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-purple-300/70 group-hover:border-white" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-purple-300/70 group-hover:border-white" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-purple-300/70 group-hover:border-white" />
              <span>{selectedTrack === 'codestellation' ? '→ Enter Track' : 'Select'}</span>
              <div className="w-1 h-1 bg-purple-300 animate-pulse rounded-full group-hover:bg-white" />
            </button>
          </div>

          {/* Selection indicator */}
          {selectedTrack === 'codestellation' && (
            <motion.div
              layoutId="selectedTrack"
              className="absolute inset-0 border-2 border-purple-400 clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.div>

        {/* DECODE STACK Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleTrackClick('decode')}
          onMouseEnter={() => setHoveredTrack('decode')}
          onMouseLeave={() => setHoveredTrack(null)}
          className={`
            relative group cursor-pointer
            bg-black/40 backdrop-blur-md
            border-2 transition-all duration-300
            clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]
            ${activeTrack === 'decode'
              ? 'border-cyan-400/80 shadow-[0_0_40px_rgba(34,211,238,0.5)]'
              : 'border-cyan-500/30 hover:border-cyan-400/50'
            }
          `}
        >
          {/* Corner decorations */}
          <div className={`absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 transition-colors ${activeTrack === 'decode' ? 'border-cyan-400' : 'border-cyan-500/50'}`} />
          <div className={`absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 transition-colors ${activeTrack === 'decode' ? 'border-cyan-400' : 'border-cyan-500/50'}`} />
          <div className={`absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 transition-colors ${activeTrack === 'decode' ? 'border-cyan-400' : 'border-cyan-500/50'}`} />
          <div className={`absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 transition-colors ${activeTrack === 'decode' ? 'border-cyan-400' : 'border-cyan-500/50'}`} />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-bl from-cyan-900/30 via-blue-800/20 to-teal-900/30 clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]" />
          
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

          <div className="relative p-3 md:p-5 lg:p-7">
            {/* Track badge */}
            <div className="inline-block mb-1.5 md:mb-2 px-2 py-0.5 md:px-3 md:py-1 bg-cyan-500/20 border border-cyan-400/30 text-[8px] md:text-[10px] font-mono text-cyan-300 tracking-widest">
              TRACK_02
            </div>

            <h2 className="text-lg md:text-xl lg:text-3xl font-black font-mono tracking-tight text-cyan-300 mb-1 md:mb-2">
              DECODE STACK
            </h2>
            <p className="text-[11px] md:text-sm lg:text-base text-cyan-200/70 font-mono mb-2 md:mb-3">
              Unravel the Digital Mystery
            </p>

            {/* Select/Enter */}
            <button
              onClick={(e) => { e.stopPropagation(); handleTrackClick('decode') }}
              className="relative inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 font-mono text-[9px] md:text-xs font-bold uppercase tracking-widest text-white border border-cyan-400/60 bg-cyan-500/20 hover:bg-cyan-500/40 hover:border-cyan-400 transition-all duration-200 cursor-pointer group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-300/70 group-hover:border-white" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyan-300/70 group-hover:border-white" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyan-300/70 group-hover:border-white" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-300/70 group-hover:border-white" />
              <span>{selectedTrack === 'decode' ? '→ Enter Track' : 'Select'}</span>
              <div className="w-1 h-1 bg-cyan-300 animate-pulse rounded-full group-hover:bg-white" />
            </button>
          </div>

          {/* Selection indicator */}
          {selectedTrack === 'decode' && (
            <motion.div
              layoutId="selectedTrack"
              className="absolute inset-0 border-2 border-cyan-400 clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.div>

      </div>

      {/* External Selection Feedback - Below cards */}
      <AnimatePresence>
        {selectedTrack && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 md:mt-4 text-center"
          >
            <div className={`inline-flex items-center gap-1.5 md:gap-3 px-2.5 py-1 md:px-6 md:py-3 font-mono text-[8px] md:text-xs backdrop-blur-sm border rounded
              ${selectedTrack === 'codestellation' 
                ? 'bg-purple-500/10 border-purple-400/30 text-purple-300' 
                : 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300'
              }`}
            >
              <div className={`w-1 h-1 md:w-2 md:h-2 animate-pulse ${selectedTrack === 'codestellation' ? 'bg-purple-400' : 'bg-cyan-400'}`} />
              <span className="hidden md:inline">TRACK LOCKED - Press</span>
              <span className="md:hidden">LOCKED - Click again</span>
              <kbd className={`px-1.5 py-0.5 md:px-2 md:py-1 border rounded hidden md:inline font-bold
                ${selectedTrack === 'codestellation' 
                  ? 'bg-purple-500/20 border-purple-400/30' 
                  : 'bg-cyan-500/20 border-cyan-400/30'
                }`}>
                F
              </kbd>
              <span className="hidden md:inline">/</span>
              <kbd className={`hidden md:inline-block px-2 py-1 border rounded font-bold
                ${selectedTrack === 'codestellation' 
                  ? 'bg-purple-500/20 border-purple-400/30' 
                  : 'bg-cyan-500/20 border-cyan-400/30'
                }`}>
                ENTER
              </kbd>
              <span className="hidden md:inline"> or click again to deploy</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
