'use client'

import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useNavMeta } from "@/store/useNavMeta"

const tracks = [
  { id: "codestellation", label: "CODESTE LLATION", color: "purple" },
  { id: "decode", label: "DECODE STACK", color: "cyan" }
]

const mobileTracks = [
  { id: "codestellation", label: "CODESTELLATION", color: "purple" },
  { id: "decode", label: "DECODE STACK", color: "cyan" }
]

export default function MiniTrackSelector() {
  const router = useRouter()
  const navMeta = useNavMeta()
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null)

  const currentTrack = navMeta.currentMeta?.track
  const currentSection = navMeta.currentMeta?.section
  
  const activeTrack = tracks.find(t => t.id === currentTrack)

  const handleTrackClick = (trackId: string) => {
    const section = currentSection === currentTrack ? '' : `/${currentSection}`
    router.push(`/tracks/${trackId}${section}`)
  }

  return (
    <>
      {/* Desktop Version - Vertical Sidebar (hidden on mobile) */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.4 }}
        className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
      >
        {/* Up Arrow */}
        <div className="flex justify-center mb-2">
          <div className={`
            w-10 h-10 rounded
            bg-black/60 backdrop-blur-sm
            border transition-colors
            flex items-center justify-center
            ${currentTrack === 'codestellation'
              ? 'border-gray-600/20 cursor-not-allowed'
              : 'border-purple-500/30 cursor-pointer hover:border-purple-400/60'
            }
          `}>
            <ChevronLeft className={`w-5 h-5 transition-colors rotate-90 ${
              currentTrack === 'codestellation' ? 'text-gray-600/30' : 'text-purple-400'
            }`} />
          </div>
        </div>

        {/* Track Cards */}
        {tracks.map((track, i) => {
          const isActive = currentTrack === track.id
          const isHovered = hoveredTrack === track.id
          const colors = track.color === 'purple'
            ? { 
                border: 'border-purple-500/50', 
                borderHover: 'border-purple-400/80',
                bg: 'bg-purple-500/20',
                text: 'text-purple-300',
                corner: 'border-purple-400',
                glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
                scanline: 'via-purple-500/5'
              }
            : { 
                border: 'border-cyan-500/50', 
                borderHover: 'border-cyan-400/80',
                bg: 'bg-cyan-500/20',
                text: 'text-cyan-300',
                corner: 'border-cyan-400',
                glow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]',
                scanline: 'via-cyan-500/5'
              }

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTrackClick(track.id)}
              onMouseEnter={() => setHoveredTrack(track.id)}
              onMouseLeave={() => setHoveredTrack(null)}
              className={`
                relative cursor-pointer
                bg-black/40 backdrop-blur-md
                border-2 transition-all duration-300
                clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]
                ${isActive || isHovered ? `${colors.borderHover} ${colors.glow}` : colors.border}
              `}
            >
              {/* Corner decorations */}
              <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors ${isActive || isHovered ? colors.corner : colors.border}`} />
              <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors ${isActive || isHovered ? colors.corner : colors.border}`} />
              <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors ${isActive || isHovered ? colors.corner : colors.border}`} />
              <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors ${isActive || isHovered ? colors.corner : colors.border}`} />

              {/* Scanline effect */}
              <div className={`absolute inset-0 bg-linear-to-b from-transparent to-transparent pointer-events-none ${colors.scanline}`} />

              <div className="relative p-3 w-12">
                {/* Vertical text */}
                <div className={`
                  font-mono text-[10px] font-bold tracking-widest
                  writing-mode-vertical-rl rotate-180 text-center
                  transition-colors
                  ${isActive ? colors.text : 'text-gray-400'}
                `}>
                  {track.label}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTrackSelector"
                    className={`absolute inset-0 border-2 clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] ${colors.corner}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}

        {/* Down Arrow */}
        <div className="flex justify-center mt-2">
          <div className={`
            w-10 h-10 rounded
            bg-black/60 backdrop-blur-sm
            border transition-colors
            flex items-center justify-center
            ${currentTrack === 'decode'
              ? 'border-gray-600/20 cursor-not-allowed'
              : 'border-cyan-500/30 cursor-pointer hover:border-cyan-400/60'
            }
          `}>
            <ChevronRight className={`w-5 h-5 transition-colors rotate-90 ${
              currentTrack === 'decode' ? 'text-gray-600/30' : 'text-cyan-400'
            }`} />
          </div>
        </div>

        {/* System label */}
        <div className={`mt-2 text-center text-[8px] font-mono tracking-widest ${
          activeTrack?.color === 'purple' ? 'text-purple-500/40' : 'text-cyan-500/40'
        }`}>
          TRACK_SW
        </div>
      </motion.aside>

      {/* Mobile Version - Horizontal Bottom Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.4 }}
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2"
      >
        {/* Left Arrow */}
        <div className={`
          w-8 h-8 rounded
          bg-black/60 backdrop-blur-sm
          border transition-colors
          flex items-center justify-center
          ${currentTrack === 'codestellation'
            ? 'border-gray-600/20 cursor-not-allowed'
            : 'border-purple-500/30 cursor-pointer active:scale-95'
          }
        `}>
          <ChevronLeft className={`w-4 h-4 transition-colors ${
            currentTrack === 'codestellation' ? 'text-gray-600/30' : 'text-purple-400'
          }`} />
        </div>

        {/* Track Cards */}
        {mobileTracks.map((track, i) => {
          const isActive = currentTrack === track.id
          const isHovered = hoveredTrack === track.id
          const colors = track.color === 'purple'
            ? { 
                border: 'border-purple-500/50', 
                borderHover: 'border-purple-400/80',
                text: 'text-purple-300',
                corner: 'border-purple-400',
                glow: 'shadow-[0_0_15px_rgba(168,85,247,0.4)]',
                scanline: 'via-purple-500/5'
              }
            : { 
                border: 'border-cyan-500/50', 
                borderHover: 'border-cyan-400/80',
                text: 'text-cyan-300',
                corner: 'border-cyan-400',
                glow: 'shadow-[0_0_15px_rgba(6,182,212,0.4)]',
                scanline: 'via-cyan-500/5'
              }

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTrackClick(track.id)}
              onTouchStart={() => setHoveredTrack(track.id)}
              onTouchEnd={() => setHoveredTrack(null)}
              className={`
                relative cursor-pointer
                bg-black/40 backdrop-blur-md
                border-2 transition-all duration-300
                clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]
                ${isActive || isHovered ? `${colors.borderHover} ${colors.glow}` : colors.border}
              `}
            >
              {/* Corner decorations */}
              <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors ${isActive || isHovered ? colors.corner : colors.border}`} />
              <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors ${isActive || isHovered ? colors.corner : colors.border}`} />
              <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors ${isActive || isHovered ? colors.corner : colors.border}`} />
              <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors ${isActive || isHovered ? colors.corner : colors.border}`} />

              {/* Scanline effect */}
              <div className={`absolute inset-0 bg-linear-to-r from-transparent to-transparent pointer-events-none ${colors.scanline}`} />

              <div className="relative px-3 py-2">
                {/* Horizontal text */}
                <div className={`
                  font-mono text-[8px] font-bold tracking-widest
                  transition-colors whitespace-nowrap
                  ${isActive ? colors.text : 'text-gray-400'}
                `}>
                  {track.label}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTrackSelectorMobile"
                    className={`absolute inset-0 border-2 clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)] ${colors.corner}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}

        {/* Right Arrow */}
        <div className={`
          w-8 h-8 rounded
          bg-black/60 backdrop-blur-sm
          border transition-colors
          flex items-center justify-center
          ${currentTrack === 'decode'
            ? 'border-gray-600/20 cursor-not-allowed'
            : 'border-cyan-500/30 cursor-pointer active:scale-95'
          }
        `}>
          <ChevronRight className={`w-4 h-4 transition-colors ${
            currentTrack === 'decode' ? 'text-gray-600/30' : 'text-cyan-400'
          }`} />
        </div>

        {/* System label */}
        <div className={`absolute -bottom-3.5 md:-bottom-5 left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-widest whitespace-nowrap ${
          activeTrack?.color === 'purple' ? 'text-purple-500/40' : 'text-cyan-500/40'
        }`}>
          TRACK_SW
        </div>
      </motion.div>
    </>
  )
}
