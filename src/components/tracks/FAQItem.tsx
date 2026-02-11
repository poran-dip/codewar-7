'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useNavMeta } from '@/store/useNavMeta'

export default function FAQItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [open, setOpen] = useState(false)

  const navMeta = useNavMeta()
  const currentTrack = navMeta.currentMeta?.track

  const isCode = currentTrack === 'codestellation'
  const isDecode = currentTrack === 'decode'

  const theme = {
    border: isCode ? 'border-purple-500/40' : isDecode ? 'border-green-500/40' : 'border-white/20',
    glow: isCode ? 'via-purple-500/10' : isDecode ? 'via-green-500/10' : 'via-white/10',
    text: isCode ? 'text-purple-200' : isDecode ? 'text-green-200' : 'text-white',
    subtext: isCode ? 'text-purple-100/70' : isDecode ? 'text-green-100/70' : 'text-white/70',
    accent: isCode ? 'text-purple-400' : isDecode ? 'text-green-400' : 'text-white',
  }

  return (
    <motion.div
      layout
      className={`relative bg-black/40 backdrop-blur-md border ${theme.border} px-4 py-3 overflow-hidden cursor-pointer`}
      transition={{ 
        delay: 0.1, 
        type: 'spring', 
        stiffness: 100 
      }}
      whileHover={{ scale: 1.01 }}
    >
      <div className={`absolute inset-0 bg-linear-to-b from-transparent ${theme.glow} to-transparent pointer-events-none cursor-pointer`} />

      {/* Question row */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-full flex items-center justify-between text-left cursor-pointer"
      >
        <h3 className={`font-mono text-sm md:text-base font-bold ${theme.text}`}>
          {question}
        </h3>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${theme.accent} ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`mt-3 font-mono text-xs md:text-sm leading-relaxed ${theme.subtext}`}
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>

      {open && (
        <div className={`absolute bottom-0.5 right-3 text-[9px] font-mono ${theme.accent} opacity-60 tracking-widest`}>
          DATA_NODE_EXPANDED
        </div>
      )}
    </motion.div>
  )
}
