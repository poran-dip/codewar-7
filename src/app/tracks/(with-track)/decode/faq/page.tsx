'use client'

import { motion } from 'motion/react'
import { HelpCircle } from 'lucide-react'
import FAQItem from '@/components/tracks/FAQItem'

export default function DecodeFAQ() {
  const faqs = [
    {
      question: "Are inter-college teams allowed?",
      answer:
        "Yes. Teams may include participants from different colleges. Cross-institution teams are permitted.",
    },
    {
      question: "Can we use any programming language?",
      answer:
        "Yes. Participants can use any programming language supported by Codeforces for solving the problems.",
    },
    {
      question: "How are rankings decided?",
      answer:
        "Rankings follow the standard Codeforces scoring system. Teams solving more problems correctly in less time, with fewer incorrect submissions, will rank higher.",
    },
  ]

  return (
    <section className="h-screen flex items-center justify-center px-4">
      <motion.div className="w-full max-w-4xl">

        <div className="relative mb-6">
          <div className="absolute inset-0 blur-3xl bg-green-500/10" />
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-green-500/50 px-6 py-3 clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-green-400 animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-black font-mono text-green-300">
                  FREQUENTLY ASKED QUESTIONS
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-green-500/50 tracking-widest">
                TRACK_02_FAQ
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>

      </motion.div>
    </section>
  )
}
