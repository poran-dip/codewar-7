'use client'

import { motion } from 'motion/react'
import { Calendar, Globe, Clock, Users, Terminal, Trophy, Timer, BrainCircuit, Zap } from 'lucide-react'

export default function DecodeStackInfo() {
  const handleRegister = () => {
    console.log('Registration clicked for Decode Stack')
    window.alert('Registration opens on February 16, 2026!')
  }

  const features = [
    { icon: Terminal, text: 'Competitive programming showdown' },
    { icon: BrainCircuit, text: '10 carefully curated problems' },
    { icon: Timer, text: '3 hours of pure problem-solving' },
    { icon: Trophy, text: 'Fastest correct solutions win' },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center py-8 md:py-20">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
        className="w-full max-w-5xl"
      >
        {/* Header */}
        <div className="relative mb-3 md:mb-4">
          <div className="absolute inset-0 blur-3xl bg-cyan-500/10" />
          
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-cyan-500/50 px-3 py-2 md:px-6 md:py-3 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] md:clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
            <div className="absolute top-0 left-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 border-cyan-400" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <Zap className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 animate-pulse" />
                <h1 className="text-xl md:text-3xl font-black font-mono tracking-tight text-cyan-300">
                  DECODE STACK
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-cyan-500/50 tracking-widest">
                TRACK_02_INFO
              </div>
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-6">
          
          {/* LEFT - About the Track */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="
              relative
              bg-black/40 backdrop-blur-md
              border-2 border-cyan-500/30
              clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]
              px-2 py-1 md:px-4 md:py-4
            "
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-cyan-400/60" />
            <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-cyan-400/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-cyan-400/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-cyan-400/60" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-900/20 to-blue-900/20 clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]" />
            
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

            <div className="relative">
              <div className="inline-block mb-2 md:mb-4 px-2 py-0.5 md:px-3 md:py-1 bg-cyan-500/20 border border-cyan-400/30 text-[8px] md:text-[10px] font-mono text-cyan-300 tracking-widest">
                MISSION_BRIEF
              </div>

              <p className="text-xs md:text-base text-cyan-100/80 font-mono leading-relaxed mb-3 md:mb-6">
                A high-intensity competitive programming contest hosted online on Codeforces. 
                Solve algorithmic challenges under pressure and race against teams across India.
              </p>

              {/* Features Grid - Hidden on mobile */}
              <div className="hidden md:grid grid-cols-1 gap-2.5">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-cyan-200/70 font-mono"
                  >
                    <div className="p-2 bg-cyan-500/10 border border-cyan-400/20 rounded">
                      <feature.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT - Event Details + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 md:space-y-4"
          >
            {/* Event Details Card */}
            <div className="
              relative
              bg-black/40 backdrop-blur-md
              border-2 border-cyan-500/30
              clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]
              px-2 py-1 md:px-4 md:py-4 pb-2
            ">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-cyan-400/60" />
              <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-cyan-400/60" />
              <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-cyan-400/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-cyan-400/60" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-900/20 to-blue-900/20 clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]" />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

              <div className="relative">
                <div className="inline-block mb-2 md:mb-4 px-2 py-0.5 md:px-3 md:py-1 bg-cyan-500/20 border border-cyan-400/30 text-[8px] md:text-[10px] font-mono text-cyan-300 tracking-widest">
                  EVENT_DATA
                </div>

                <div className="space-y-1 md:space-y-2.5">
                  {/* Date */}
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 bg-cyan-500/10 border border-cyan-400/20 rounded mt-0.5">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase mb-0.5 md:mb-1">Date</p>
                      <p className="text-xs md:text-sm font-mono text-cyan-200">February 26, 2026</p>
                    </div>
                  </div>

                  {/* Mode */}
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 bg-cyan-500/10 border border-cyan-400/20 rounded mt-0.5">
                      <Globe className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase mb-0.5 md:mb-1">Mode</p>
                      <p className="text-xs md:text-sm font-mono text-cyan-200">Online on Codeforces</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 bg-cyan-500/10 border border-cyan-400/20 rounded mt-0.5">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase mb-0.5 md:mb-1">Duration</p>
                      <p className="text-xs md:text-sm font-mono text-cyan-200">3 Hours</p>
                    </div>
                  </div>

                  {/* Format */}
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 bg-cyan-500/10 border border-cyan-400/20 rounded mt-0.5">
                      <Users className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase mb-0.5 md:mb-1">Format</p>
                      <p className="text-xs md:text-sm font-mono text-cyan-200">Team-based CF scoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={handleRegister}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                relative w-full
                bg-black/40 backdrop-blur-md
                border-2 border-cyan-500/50
                clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]
                mx-auto py-2 md:py-2.5
                font-mono font-bold text-sm md:text-lg
                text-cyan-300
                hover:border-cyan-400/80
                hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]
                transition-all duration-300
                group
              "
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-cyan-400 transition-colors" />
              <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-cyan-400 transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-cyan-400 transition-colors" />
              <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-cyan-400 transition-colors" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-blue-600/20 clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none" />

              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                <Terminal className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">REGISTER FOR DECODE STACK</span>
                <span className="sm:hidden">REGISTER NOW</span>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 animate-pulse rounded-full" />
              </span>
            </motion.button>

            {/* Info note */}
            <div className="hidden md:block text-center">
              <div className="inline-block bg-black/60 backdrop-blur-sm border border-cyan-500/20 px-3 py-1.5 md:px-4 md:py-2 font-mono text-[10px] md:text-xs text-cyan-400/50 rounded">
                <span className="text-cyan-400/70">NOTE:</span> Registration opens February 16
              </div>
            </div>
          </motion.div>

        </div>

        {/* System label */}
        <div className="mb-8 md:mb-0 md:mt-6 text-center text-[8px] md:text-[10px] font-mono text-cyan-500/30 tracking-widest">
          TRACK_INFO_SYSTEM_v1.0
        </div>
      </motion.div>
    </section>
  )
}
