'use client'

import { motion } from 'motion/react'
import { Trophy, Medal, Award, Sparkles } from 'lucide-react'

export default function CodestellationPrizes() {
  const prizes = [
    {
      icon: Trophy,
      place: '1st',
      title: 'First Place',
      reward: '₹10,000',
      text: 'Top scoring team',
      iconColor: 'text-yellow-400',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]'
    },
    {
      icon: Medal,
      place: '2nd',
      title: 'Second Place',
      reward: '₹5,000',
      text: 'Runner-up team',
      iconColor: 'text-gray-300',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(209,213,219,0.6)]'
    },
    {
      icon: Award,
      place: '3rd',
      title: 'Third Place',
      reward: '₹3,000',
      text: 'Third place team',
      iconColor: 'text-orange-400',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]'
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
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-purple-500/50 px-3 py-2 md:px-6 md:py-3 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] md:clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
            <div className="absolute top-0 left-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 border-purple-400" />
            <div className="absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 border-purple-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 border-purple-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 border-purple-400" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <Trophy className="w-3 h-3 md:w-4 md:h-4 text-purple-400 animate-pulse" />
                <h1 className="text-xl md:text-3xl font-black font-mono tracking-tight text-purple-300">
                  PRIZES & REWARDS
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-purple-500/50 tracking-widest">
                TRACK_01_PRIZES
              </div>
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Compact Prize Cards */}
        <div className="space-y-2 md:space-y-3">
          {prizes.map((prize, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="
                relative
                bg-black/40 backdrop-blur-md
                border-2 border-purple-500/30
                clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]
                p-2.5 md:p-4
                group
                hover:border-purple-400/50
                hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]
                transition-all duration-300
              "
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 border-purple-400/60 group-hover:border-purple-400 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-purple-400/60 group-hover:border-purple-400 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 border-purple-400/60 group-hover:border-purple-400 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-purple-400/60 group-hover:border-purple-400 transition-colors" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 to-indigo-900/20 clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

              <div className="relative flex items-center justify-between gap-3 md:gap-4">
                {/* Left: Icon + Details */}
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="p-1.5 md:p-2.5 bg-purple-500/10 border-2 border-purple-400/20 rounded group-hover:scale-110 group-hover:bg-purple-500/20 transition-all shrink-0">
                    <prize.icon className={`w-4 h-4 md:w-5 md:h-5 ${prize.iconColor} ${prize.iconGlow}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs md:text-base font-mono font-bold text-purple-200 mb-0.5">
                      {prize.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-purple-100/60 font-mono">
                      {prize.text}
                    </p>
                  </div>
                </div>

                {/* Right: Prize Amount */}
                <div className="text-right shrink-0">
                  <div className="text-base md:text-2xl font-mono font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    {prize.reward}
                  </div>
                  <div className="hidden md:flex items-center justify-end gap-1 mt-0.5">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[8px] font-mono text-green-400/70 tracking-widest">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact Participation Note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="
            mt-3 md:mt-4
            relative
            bg-black/30 backdrop-blur-md
            border border-purple-500/20
            px-3 py-2 md:px-4 md:py-2.5
            text-center
          "
        >
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
          <div className="relative flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-purple-400" />
            <p className="text-[11px] md:text-sm font-mono font-bold text-purple-200">
              All participants receive certificates
            </p>
          </div>
        </motion.div>

        <div className="mb-8 md:mb-0 mt-2 md:mt-3 text-center text-[8px] md:text-[10px] font-mono text-purple-500/30 tracking-widest">
          REWARD_SYSTEM_v7.0
        </div>
      </motion.div>
    </section>
  )
}
