'use client'

import { motion } from 'motion/react'
import { Shield, Github, Library, Gavel } from 'lucide-react'

export default function CodestellationRules() {
  const rules = [
    {
      icon: Github,
      title: "Build During the Hackathon",
      text: "All project work must be completed during the official hackathon duration. The GitHub repository submitted must have been created after the hackathon start time."
    },
    {
      icon: Shield,
      title: 'Original Team Work',
      text: "The final submission must primarily be the work of the participating team. Projects must not be copied or reused from previously built solutions."
    },
    {
      icon: Library,
      title: "Use of Libraries & Resources",
      text: "Teams are allowed to use external libraries, frameworks, APIs, and learning resources."
    },
    {
      icon: Gavel,
      title: "Fair Play & Conduct",
      text: "Participants are expected to maintain fair play, follow ethical coding practices, and respect other teams. Any form of plagiarism or misconduct may lead to disqualification."
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
        {/* HEADER — SAME STYLE AS INFO PAGE */}
        <div className="relative mb-6">
          <div className="absolute inset-0 blur-3xl bg-purple-500/10" />
          
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-purple-500/50 px-6 py-3 clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] overflow-hidden">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-purple-400" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-purple-400" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-purple-400" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-purple-400" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-purple-400 animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-purple-300">
                  RULES & GUIDELINES
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-purple-500/50 tracking-widest">
                TRACK_01_RULES
              </div>
            </div>

            <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* RULE LIST — SINGLE COLUMN */}
        <div className="space-y-3">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative bg-black/40 backdrop-blur-md border border-purple-500/30 px-4 py-3 flex gap-3 items-start overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

              <div className="p-2 bg-purple-500/10 border border-purple-400/20 rounded shrink-0">
                <rule.icon className="w-4 h-4 text-purple-400" />
              </div>

              <div>
                <h3 className="text-xs md:text-sm font-mono font-bold text-purple-300">
                  {rule.title}
                </h3>
                <p className="text-xs text-purple-100/70 font-mono leading-snug">
                  {rule.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 text-center text-[10px] font-mono text-purple-500/30 tracking-widest">
          PROTOCOL_ACTIVE_v1.0
        </div>
      </motion.div>
    </section>
  )
}
