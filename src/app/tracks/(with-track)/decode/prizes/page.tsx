'use client'

import { motion } from 'motion/react'
import { Trophy, Medal, Award, Sparkles } from 'lucide-react'

export default function DecodePrizes() {
  const prizes = [
    {
      icon: Trophy,
      title: '1st Place',
      reward: '₹10,000',
      text: 'Awarded to the team with the highest rank on the contest scoreboard.'
    },
    {
      icon: Medal,
      title: '2nd Place',
      reward: '₹6,000',
      text: 'Awarded to the second highest ranked team.'
    },
    {
      icon: Award,
      title: '3rd Place',
      reward: '₹4,000',
      text: 'Awarded to the third highest ranked team.'
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
        {/* HEADER */}
        <div className="relative mb-6">
          <div className="absolute inset-0 blur-3xl bg-green-500/10" />

          <div className="relative bg-black/40 backdrop-blur-md border-2 border-green-500/50 px-6 py-3 clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green-400" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green-400" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green-400" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-green-400" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4 text-green-400 animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-green-300">
                  PRIZES & RANKINGS
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-green-500/50 tracking-widest">
                TRACK_02_PRIZES
              </div>
            </div>

            <div className="absolute inset-0 bg-linear-to-b from-transparent via-green-500/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* PRIZE CARDS */}
        <div className="space-y-3">
          {prizes.map((prize, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-black/40 backdrop-blur-md border border-green-500/30 px-4 py-3 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <prize.icon className="w-4 h-4 text-green-400" />
                <div>
                  <h3 className="text-sm font-mono font-bold text-green-300">
                    {prize.title}
                  </h3>
                  <p className="text-xs text-green-100/70 font-mono">
                    {prize.text}
                  </p>
                </div>
              </div>
              <div className="text-lg font-mono font-bold text-green-200">
                {prize.reward}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 relative bg-black/20 backdrop-blur-md border-2 border-green-500/20 px-5 py-4 text-center overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-green-400" />
            <p className="text-sm font-mono font-bold text-green-200">
              All participants will receive certificates of participation
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
