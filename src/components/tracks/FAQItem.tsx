'use client'

import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useNavMeta } from '@/store/useNavMeta'

export default function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  const navMeta = useNavMeta()
  const isCodestellation = navMeta.currentMeta?.track === 'codestellation'
  const accentColor = isCodestellation ? 'purple' : 'cyan'

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
          ? accentColor === 'purple'
            ? 'border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
            : 'border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
          : accentColor === 'purple'
            ? 'border-purple-500/30 hover:border-purple-400/50'
            : 'border-cyan-500/30 hover:border-cyan-400/50'
        }
      `}
    >
      {/* Corner decorations */}
      <div className={`absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 transition-colors ${isOpen ? accentColor === 'purple' ? 'border-purple-400' : 'border-cyan-400' : accentColor === 'purple' ? 'border-purple-400/60' : 'border-cyan-400/60'}`} />
      <div className={`absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 transition-colors ${isOpen ? accentColor === 'purple' ? 'border-purple-400' : 'border-cyan-400' : accentColor === 'purple' ? 'border-purple-400/60' : 'border-cyan-400/60'}`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 transition-colors ${isOpen ? accentColor === 'purple' ? 'border-purple-400' : 'border-cyan-400' : accentColor === 'purple' ? 'border-purple-400/60' : 'border-cyan-400/60'}`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 transition-colors ${isOpen ? accentColor === 'purple' ? 'border-purple-400' : 'border-cyan-400' : accentColor === 'purple' ? 'border-purple-400/60' : 'border-cyan-400/60'}`} />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] ${accentColor === 'purple' ? 'bg-linear-to-br from-purple-900/20 to-indigo-900/20' : 'bg-linear-to-br from-cyan-900/20 to-blue-900/20'}`} />
      
      {/* Scanline effect */}
      <div className={`absolute inset-0 bg-linear-to-b from-transparent to-transparent pointer-events-none ${accentColor === 'purple' ? 'via-purple-500/5' : 'via-cyan-500/5'}`} />

      {/* Question button */}
      <button
        onClick={onToggle}
        className="relative w-full flex items-start gap-2 md:gap-3 text-left"
      >
        <div className={`shrink-0 p-1.5 md:p-2 rounded transition-all ${isOpen ? accentColor === 'purple' ? 'bg-purple-500/20 border border-purple-400/40' : 'bg-cyan-500/20 border border-cyan-400/40' : accentColor === 'purple' ? 'bg-purple-500/10 border border-purple-400/20' : 'bg-cyan-500/10 border border-cyan-400/20'}`}>
          <HelpCircle className={`w-3 h-3 md:w-4 md:h-4 ${accentColor === 'purple' ? 'text-purple-400' : 'text-cyan-400'}`} />
        </div>

        <div className="flex-1">
          <h3 className={`font-mono text-xs md:text-base font-bold ${accentColor === 'purple' ? 'text-purple-300' : 'text-cyan-300'}`}>
            {question}
          </h3>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 ${accentColor === 'purple' ? 'text-purple-400' : 'text-cyan-400'}`} />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* Desktop: with line */}
            <div className="hidden md:block relative pt-4 pl-14">
              <div className={`absolute left-7 top-0 w-px h-full ${accentColor === 'purple' ? 'bg-purple-500/30' : 'bg-cyan-500/30'}`} />
              
              <p className={`font-mono text-sm leading-relaxed ${accentColor === 'purple' ? 'text-purple-100/70' : 'text-cyan-100/70'}`}>
                {answer}
              </p>

              <div className={`mt-3 flex items-center gap-2`}>
                <div className={`w-1.5 h-1.5 rounded-full ${accentColor === 'purple' ? 'bg-purple-400' : 'bg-cyan-400'} animate-pulse`} />
                <span className={`text-[9px] font-mono tracking-widest ${accentColor === 'purple' ? 'text-purple-400/60' : 'text-cyan-400/60'}`}>
                  ANSWER_VERIFIED
                </span>
              </div>
            </div>

            {/* Mobile: vertical layout without line */}
            <div className="md:hidden relative pt-2">
              <p className={`font-mono text-[11px] leading-relaxed ${accentColor === 'purple' ? 'text-purple-100/70' : 'text-cyan-100/70'}`}>
                {answer}
              </p>

              <div className={`mt-2 flex items-center gap-1.5`}>
                <div className={`w-1 h-1 rounded-full ${accentColor === 'purple' ? 'bg-purple-400' : 'bg-cyan-400'} animate-pulse`} />
                <span className={`text-[8px] font-mono tracking-widest ${accentColor === 'purple' ? 'text-purple-400/60' : 'text-cyan-400/60'}`}>
                  VERIFIED
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
