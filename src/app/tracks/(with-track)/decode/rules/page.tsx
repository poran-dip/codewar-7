'use client'

import { motion } from 'motion/react'
import { Shield, Code, Search, BotOff, Video } from 'lucide-react'

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
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
        className="w-full max-w-4xl"
      >
        {/* Compact Header */}
        <div className="relative mb-6">
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-cyan-500/50 px-6 py-3 clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-cyan-300">
                  RULES & GUIDELINES
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-cyan-500/50 tracking-widest">
                TRACK_02_RULES
              </div>
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Compact Rule Cards */}
        <div className="space-y-3">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.01, x: 2 }}
              className="
                relative
                bg-black/40 backdrop-blur-md
                border-2 border-cyan-500/30
                clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]
                p-4
                group
                hover:border-cyan-400/50
                hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]
                transition-all duration-300
              "
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-900/20 to-blue-900/20 clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

              <div className="relative flex gap-3 items-start">
                <div className="p-2 bg-cyan-500/10 border border-cyan-400/20 rounded shrink-0 group-hover:bg-cyan-500/20 transition-all">
                  <rule.icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xs md:text-sm font-mono font-bold text-cyan-300 mb-1">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-cyan-100/70 font-mono leading-snug">
                    {rule.text}
                  </p>
                </div>

                {/* Status indicator */}
                <div className="shrink-0 hidden md:flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center text-[10px] font-mono text-cyan-500/30 tracking-widest">
          PROTOCOL_ENFORCEMENT_v1.0
        </div>
      </motion.div>
    </section>
  )
}
