'use client'

import { motion } from 'motion/react'
import { HelpCircle } from 'lucide-react'
import FAQItem from '@/components/tracks/FAQItem'

export default function CodestellationFAQ() {
  const faqs = [
    {
      question: "Are inter-college teams allowed?",
      answer:
        "Yes. Teams can consist of participants from different colleges. Collaboration across institutions is completely allowed.",
    },
    {
      question: "Can we use any tech stack or programming language?",
      answer:
        "Yes. Participants are free to use any programming languages, frameworks, tools, or tech stacks they are comfortable with while building their solution.",
    },
    {
      question: "How will projects be judged?",
      answer:
        "Judging will be based on how effectively the solution addresses the problem statement, feasibility, actual implementation, innovation, and the clarity of the final presentation.",
    },
  ]

  return (
    <section className="h-screen flex items-center justify-center px-4">
      <motion.div className="w-full max-w-4xl">
        
        {/* HEADER (same as system style) */}
        <div className="relative mb-6">
          <div className="absolute inset-0 blur-3xl bg-purple-500/10" />
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-purple-500/50 px-6 py-3 clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-purple-400 animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-black font-mono text-purple-300">
                  FREQUENTLY ASKED QUESTIONS
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-purple-500/50 tracking-widest">
                TRACK_01_FAQ
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
