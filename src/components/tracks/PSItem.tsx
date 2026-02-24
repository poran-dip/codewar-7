'use client'

import { motion } from 'motion/react'
import { ZoomIn } from 'lucide-react'
import { ProblemStatement } from '@/data/ps'
import { usePSModal } from '@/store/PSModalContext'

const CATEGORY_COLORS: Record<string, string> = {
  'Healthcare': 'text-rose-300 bg-rose-500/10 border-rose-400/20',
  'EdTech': 'text-blue-300 bg-blue-500/10 border-blue-400/20',
  'FinTech': 'text-emerald-300 bg-emerald-500/10 border-emerald-400/20',
  'CivicTech': 'text-yellow-300 bg-yellow-500/10 border-yellow-400/20',
  'Opportunities': 'text-indigo-300 bg-indigo-500/10 border-indigo-400/20',
  'Crisis': 'text-red-300 bg-red-500/10 border-red-400/20',
  'Accessibility': 'text-purple-300 bg-purple-500/10 border-purple-400/20',
}

export default function PSItem({
  ps,
}: {
  ps: ProblemStatement
}) {
  const { openModal } = usePSModal()
  const categoryColor = CATEGORY_COLORS[ps.category] ?? 'text-purple-300 bg-purple-500/10 border-purple-400/20'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, x: 4 }}
      className={`
        relative
        bg-black/40 backdrop-blur-md
        border-2 border-purple-500/30 hover:border-purple-400/50
        transition-all duration-300
        clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]
        p-2.5 md:p-3
        cursor-pointer
        group
      `}
      onClick={() => openModal(ps)}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 border-purple-400/60 group-hover:border-purple-400 transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-purple-400/60 group-hover:border-purple-400 transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 border-purple-400/60 group-hover:border-purple-400 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-purple-400/60 group-hover:border-purple-400 transition-colors" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] bg-linear-to-br from-purple-900/20 to-indigo-900/20" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative w-full flex items-start gap-2 md:gap-3 text-left">
        <div className="shrink-0 p-1.5 md:p-2 rounded bg-purple-500/10 border border-purple-400/20 group-hover:bg-purple-500/20 group-hover:border-purple-400/40 transition-all">
          {ps.icon && <ps.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-purple-400" />}
        </div>

        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 md:gap-2">
          <h3 className="font-mono text-xs md:text-base font-bold text-purple-300">
            {ps.title}
          </h3>
          <span className={`hidden md:block w-fit shrink-0 text-[8px] md:text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 border rounded-sm ${categoryColor}`}>
            {ps.category}
          </span>
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="shrink-0"
        >
          <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
        </motion.div>
      </div>
    </motion.div>
  )
}
