'use client'

import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, FileCode } from 'lucide-react'
import { ProblemStatement } from '@/lib/types'

const THEME_COLORS: Record<string, string> = {
  'Healthcare':             'text-rose-300 bg-rose-500/10 border-rose-400/20',
  'Smart Education':        'text-blue-300 bg-blue-500/10 border-blue-400/20',
  'FinTech':                'text-emerald-300 bg-emerald-500/10 border-emerald-400/20',
  'Fitness and Sports':     'text-orange-300 bg-orange-500/10 border-orange-400/20',
  'Sustainable Development':'text-green-300 bg-green-500/10 border-green-400/20',
  'E Governance':           'text-yellow-300 bg-yellow-500/10 border-yellow-400/20',
}

export default function PSItem({
  ps,
  isOpen,
  onToggle,
}: {
  ps: ProblemStatement
  isOpen: boolean
  onToggle: () => void
}) {
  const themeColor = THEME_COLORS[ps.theme] ?? 'text-purple-300 bg-purple-500/10 border-purple-400/20'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, x: 4 }}
      className={`
        relative
        bg-black/40 backdrop-blur-md
        border-2 transition-all duration-300
        clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]
        p-2.5 md:p-4
        cursor-pointer
        group
        ${isOpen
          ? 'border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
          : 'border-purple-500/30 hover:border-purple-400/50'
        }
      `}
    >
      {/* Corner decorations */}
      <div className={`absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 transition-colors ${isOpen ? 'border-purple-400' : 'border-purple-400/60'}`} />
      <div className={`absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 transition-colors ${isOpen ? 'border-purple-400' : 'border-purple-400/60'}`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 transition-colors ${isOpen ? 'border-purple-400' : 'border-purple-400/60'}`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 transition-colors ${isOpen ? 'border-purple-400' : 'border-purple-400/60'}`} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] bg-linear-to-br from-purple-900/20 to-indigo-900/20" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      {/* Header row */}
      <button onClick={onToggle} className="relative w-full flex items-start gap-2 md:gap-3 text-left">
        <div className={`shrink-0 p-1.5 md:p-2 rounded transition-all ${isOpen ? 'bg-purple-500/20 border border-purple-400/40' : 'bg-purple-500/10 border border-purple-400/20'}`}>
          <FileCode className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
        </div>

        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2">
          <h3 className="font-mono text-xs md:text-base font-bold text-purple-300">
            {ps.title}
          </h3>
          <span className={`w-fit shrink-0 text-[8px] md:text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 border rounded-sm ${themeColor}`}>
            {ps.theme}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
        </motion.div>
      </button>

      {/* Description */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* Desktop */}
            <div className="hidden md:block relative pt-4 pl-14">
              <div className="absolute left-7 top-0 w-px h-full bg-purple-500/30" />
              <p className="font-mono text-sm leading-relaxed text-purple-100/70">
                {ps.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[9px] font-mono tracking-widest text-purple-400/60">
                  {ps.id.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden relative pt-2">
              <p className="font-mono text-[11px] leading-relaxed text-purple-100/70">
                {ps.description}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[8px] font-mono tracking-widest text-purple-400/60">
                  {ps.id.toUpperCase()}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
