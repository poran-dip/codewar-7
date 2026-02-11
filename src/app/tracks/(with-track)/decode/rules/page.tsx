'use client'

import { motion } from 'motion/react'
import { Code, Search, BotOff, Video } from 'lucide-react'

export default function DecodeStackRules() {
  const rules = [
    {
      icon: Code,
      title: "Original Solutions Only",
      text: "All solutions submitted must be written entirely by the team. No external help is allowed, including AI tools, search engines, books, references, or assistance from other individuals."
    },
    {
      icon: Search,
      title: "Syntax Lookup Allowed",
      text: "Participants may look up syntax-related queries or language documentation if needed, provided no problem-solving help is obtained."
    },
    {
      icon: BotOff,
      title: "AI Tools Strictly Prohibited",
      text: "AI-assisted tools such as GitHub Copilot or any LLM-based autocomplete must be turned off in the IDE. Use of such tools will result in immediate disqualification."
    },
    {
      icon: Video,
      title: "Mandatory Screen & Webcam Recording",
      text: "Participants must record their full screen and webcam in the specified format for submission. Detailed setup instructions will be provided via a tutorial video link."
    },
  ]

  return (
    <section className="h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="w-full max-w-4xl"
      >
        {/* HEADER — SAME STYLE, GREEN THEME */}
        <div className="relative mb-6">
          <div className="absolute inset-0 blur-3xl bg-green-500/10" />
          
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-green-500/50 px-6 py-3 clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] overflow-hidden">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green-400" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green-400" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green-400" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-green-400" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code className="w-4 h-4 text-green-400 animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-green-300">
                  RULES & GUIDELINES
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-green-500/50 tracking-widest">
                TRACK_02_RULES
              </div>
            </div>

            <div className="absolute inset-0 bg-linear-to-b from-transparent via-green-500/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* RULE LIST */}
        <div className="space-y-3">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative bg-black/40 backdrop-blur-md border border-green-500/30 px-4 py-3 flex gap-3 items-start overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-green-500/5 to-transparent pointer-events-none" />

              <div className="p-2 bg-green-500/10 border border-green-400/20 rounded shrink-0">
                <rule.icon className="w-4 h-4 text-green-400" />
              </div>

              <div>
                <h3 className="text-xs md:text-sm font-mono font-bold text-green-300">
                  {rule.title}
                </h3>
                <p className="text-xs text-green-100/70 font-mono leading-snug">
                  {rule.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 text-center text-[10px] font-mono text-green-500/30 tracking-widest">
          PROTOCOL_ACTIVE_v2.0
        </div>
      </motion.div>
    </section>
  )
}
