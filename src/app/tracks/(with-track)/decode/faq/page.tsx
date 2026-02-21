'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { HelpCircle } from 'lucide-react'
import FAQItem from '@/components/tracks/FAQItem'

export default function DecodeStackFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Is it a solo event?",
      answer: "Yes. Participants must register and participate individually. Team participation is not allowed.",
    },
    {
      question: "Can we use any programming language?",
      answer: "Yes. Participants can use any programming language supported by GeeksforGeeks platform for solving the problems.",
    },
    {
      question: "How are rankings decided?",
      answer: "Rankings follow GeeksforGeeks' scoring system. Participants solving more problems correctly in less time, with fewer incorrect submissions, will rank higher.",
    },
  ]

  return (
    <section className="h-screen flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
        className="w-full max-w-4xl"
      >
        {/* Compact Header */}
        <div className="relative mb-3 md:mb-6">
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-cyan-500/50 px-3 py-2 md:px-6 md:py-3 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] md:clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
            <div className="absolute top-0 left-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 border-cyan-400" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <HelpCircle className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 animate-pulse" />
                <h1 className="text-xl md:text-3xl font-black font-mono tracking-tight text-cyan-300">
                  FAQ
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-cyan-500/50 tracking-widest">
                TRACK_02_FAQ
              </div>
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2 md:space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <FAQItem 
                {...faq} 
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>

        <div className="mb-8 md:mb-0 mt-3 md:mt-4 text-center text-[8px] md:text-[10px] font-mono text-cyan-500/30 tracking-widest">
          FAQ_SYSTEM_v7.0
        </div>
      </motion.div>
    </section>
  )
}
