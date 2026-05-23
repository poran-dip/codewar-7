"use client";

import {
  BotOff,
  Code,
  MonitorOff,
  Shield,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion } from "motion/react";

export default function DecodeStackRules() {
  const rules = [
    {
      icon: Code,
      title: "Original Solutions Only",
      text: "All solutions must be written entirely by the participant during the contest. External assistance from individuals, forums, or communities is strictly prohibited.",
      shortText: "Write all solutions yourself. No external help.",
    },
    {
      icon: BotOff,
      title: "No AI Assistance",
      text: "Use of any AI-powered tools or automated code generation, in any form, is strictly prohibited during the contest.",
      shortText: "AI assistance is strictly prohibited.",
    },
    {
      icon: User,
      title: "Solo Participation Only",
      text: "This is a solo event. Participants must register and compete individually. Team participation is not allowed.",
      shortText: "Solo event only. No teams.",
    },
    {
      icon: ShieldCheck,
      title: "Platform & Proctoring Rules",
      text: "The contest will be conducted exclusively on the GeeksforGeeks platform. All participants are subject to the platform’s built-in proctoring and anti-cheat mechanisms.",
      shortText: "GeeksforGeeks platform rules and proctoring apply.",
    },
    {
      icon: MonitorOff,
      title: "No External Tabs or Devices",
      text: "Opening additional browser tabs, applications, calculators, mobile phones, or other electronic devices during the contest is not permitted.",
      shortText: "No other tabs, apps, or devices allowed.",
    },
  ];

  return (
    <section className="h-screen flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
        className="w-full max-w-4xl md:mt-16"
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
                <Shield className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 animate-pulse" />
                <h1 className="text-xl md:text-3xl font-black font-mono tracking-tight text-cyan-300">
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
        <div className="space-y-2 md:space-y-3">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.05,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.01, x: 2 }}
              className="
                relative
                bg-black/40 backdrop-blur-md
                border-2 border-cyan-500/30
                clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]
                p-2 md:p-3
                group
                hover:border-cyan-400/50
                hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]
                transition-all duration-300
              "
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-900/20 to-blue-900/20 clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Scanline effect */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

              {/* Desktop Layout - Icon left, content right */}
              <div className="relative hidden md:flex gap-3 items-start">
                <div className="p-2 bg-cyan-500/10 border border-cyan-400/20 rounded shrink-0 group-hover:bg-cyan-500/20 transition-all">
                  <rule.icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-mono font-bold text-cyan-300 mb-1">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-cyan-100/70 font-mono leading-snug">
                    {rule.text}
                  </p>
                </div>

                {/* Status indicator */}
                <div className="shrink-0 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Mobile Layout - Icon + title on top, text below */}
              <div className="relative md:hidden">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {/* Number instead of icon on mobile for space efficiency */}
                    <div className="w-5 h-5 flex items-center justify-center bg-cyan-500/20 border border-cyan-400/30 rounded text-[10px] font-mono font-bold text-cyan-300">
                      {i + 1}
                    </div>
                    <h3 className="text-xs font-mono font-bold text-cyan-300">
                      {rule.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-cyan-100/70 font-mono leading-snug">
                    {rule.shortText}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-8 md:mb-0 mt-3 md:mt-4 text-center text-[8px] md:text-[10px] font-mono text-cyan-500/30 tracking-widest">
          PROTOCOL_ENFORCEMENT_v7.0
        </div>
      </motion.div>
    </section>
  );
}
