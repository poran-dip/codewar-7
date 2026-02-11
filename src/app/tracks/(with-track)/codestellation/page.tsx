'use client'

import { motion } from 'motion/react'
import { Calendar, MapPin, Clock, Users, Zap, Code2, Lightbulb, Rocket } from 'lucide-react'

export default function CodestellationInfo() {
  const handleRegister = () => {
    console.log('Registration clicked for Codestellation')
    window.alert('Registration opens on February 16, 2026!')
  }

  const features = [
    { icon: Code2, text: 'Build innovative tech solutions' },
    { icon: Lightbulb, text: 'Real-world problem statements' },
    { icon: Users, text: 'Team-based competition' },
    { icon: Rocket, text: 'Ship a working prototype' },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
        className="w-full max-w-5xl"
      >
        {/* Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-3xl bg-purple-500/10" />
          
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-purple-500/50 px-6 py-3 clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-purple-400" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-purple-400" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-purple-400" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-purple-400" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-purple-300">
                  CODESTELLATION
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-purple-500/50 tracking-widest">
                TRACK_01_INFO
              </div>
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* LEFT - About the Track */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="
              relative
              bg-black/40 backdrop-blur-md
              border-2 border-purple-500/30
              clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]
              p-6 space-y-6
            "
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400/60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400/60" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 to-indigo-900/20 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]" />
            
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

            <div className="relative">
              <div className="inline-block mb-4 px-3 py-1 bg-purple-500/20 border border-purple-400/30 text-[10px] font-mono text-purple-300 tracking-widest">
                MISSION_BRIEF
              </div>

              <p className="text-sm md:text-base text-purple-100/80 font-mono leading-relaxed mb-6">
                A 24-hour hackathon where teams build innovative tech solutions to real-world problem statements. 
                Collaborate, code, and create working prototypes that make an impact.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-3">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-purple-200/70 font-mono"
                  >
                    <div className="p-2 bg-purple-500/10 border border-purple-400/20 rounded">
                      <feature.icon className="w-4 h-4 text-purple-400" />
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
            className="space-y-6"
          >
            {/* Event Details Card */}
            <div className="
              relative
              bg-black/40 backdrop-blur-md
              border-2 border-purple-500/30
              clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]
              p-6
            ">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400/60" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400/60" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400/60" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400/60" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 to-indigo-900/20 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]" />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

              <div className="relative">
                <div className="inline-block mb-4 px-3 py-1 bg-purple-500/20 border border-purple-400/30 text-[10px] font-mono text-purple-300 tracking-widest">
                  EVENT_DATA
                </div>

                <div className="space-y-4">
                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/10 border border-purple-400/20 rounded mt-0.5">
                      <Calendar className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-purple-400/60 tracking-widest uppercase mb-1">Date</p>
                      <p className="text-sm font-mono text-purple-200">February 25-26, 2026</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/10 border border-purple-400/20 rounded mt-0.5">
                      <MapPin className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-purple-400/60 tracking-widest uppercase mb-1">Location</p>
                      <p className="text-sm font-mono text-purple-200">Room 6, Main Building, AEC</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/10 border border-purple-400/20 rounded mt-0.5">
                      <Clock className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-purple-400/60 tracking-widest uppercase mb-1">Duration</p>
                      <p className="text-sm font-mono text-purple-200">24 Hours Non-Stop</p>
                    </div>
                  </div>

                  {/* Registration */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/10 border border-purple-400/20 rounded mt-0.5">
                      <Users className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-purple-400/60 tracking-widest uppercase mb-1">Registration Opens</p>
                      <p className="text-sm font-mono text-purple-200">February 16, 2026</p>
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
                border-2 border-purple-500/50
                clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]
                px-6 py-4
                font-mono font-bold text-base md:text-lg
                text-purple-300
                hover:border-purple-400/80
                hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]
                transition-all duration-300
                group
              "
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400 transition-colors" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400 transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400 transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400 transition-colors" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-indigo-600/20 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none" />

              <span className="relative flex items-center justify-center gap-3">
                <Rocket className="w-5 h-5" />
                REGISTER FOR CODESTELLATION
                <div className="w-2 h-2 bg-purple-400 animate-pulse rounded-full" />
              </span>
            </motion.button>

            {/* Info note */}
            <div className="text-center">
              <div className="inline-block bg-black/60 backdrop-blur-sm border border-purple-500/20 px-4 py-2 font-mono text-xs text-purple-400/50 rounded">
                <span className="text-purple-400/70">NOTE:</span> Registration opens February 16
              </div>
            </div>
          </motion.div>

        </div>

        {/* System label */}
        <div className="mt-6 text-center text-[10px] font-mono text-purple-500/30 tracking-widest">
          TRACK_INFO_SYSTEM_v1.0
        </div>
      </motion.div>
    </section>
  )
}
