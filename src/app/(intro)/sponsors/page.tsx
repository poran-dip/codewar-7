'use client'

import { motion } from 'motion/react'
import { Trophy, Mail, Phone, Sparkles } from 'lucide-react'

export default function SponsorsPage() {
  // Placeholder sponsors - replace with real data
  const sponsors = [
    { tier: 'platinum', name: 'Sponsor 1' },
    { tier: 'platinum', name: 'Sponsor 2' },
    { tier: 'gold', name: 'Sponsor 3' },
    { tier: 'gold', name: 'Sponsor 4' },
    { tier: 'silver', name: 'Sponsor 5' },
    { tier: 'silver', name: 'Sponsor 6' },
  ]

  const getTierBorder = (tier: string) => {
    switch(tier) {
      case 'platinum': return 'border-cyan-400/50 hover:border-cyan-400/80'
      case 'gold': return 'border-yellow-400/50 hover:border-yellow-400/80'
      case 'silver': return 'border-purple-400/50 hover:border-purple-400/80'
      default: return 'border-cyan-400/50'
    }
  }

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'platinum': return { bg: 'bg-cyan-500/20', border: 'border-cyan-400/30', text: 'text-cyan-300', corner: 'border-cyan-400/70', glow: 'via-cyan-500/5' }
      case 'gold': return { bg: 'bg-yellow-500/20', border: 'border-yellow-400/30', text: 'text-yellow-300', corner: 'border-yellow-400/70', glow: 'via-yellow-500/5' }
      case 'silver': return { bg: 'bg-purple-500/20', border: 'border-purple-400/30', text: 'text-purple-300', corner: 'border-purple-400/70', glow: 'via-purple-500/5' }
      default: return { bg: 'bg-cyan-500/20', border: 'border-cyan-400/30', text: 'text-cyan-300', corner: 'border-cyan-400/70', glow: 'via-cyan-500/5' }
    }
  }

  return (
    <main className="h-screen text-white px-4">
      <div className="h-[105vh]">
        <div className="h-screen flex items-center justify-center pt-16 md:pt-32 pb-16">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
            className="w-full max-w-4xl"
          >
            {/* Compact Header */}
            <div className="relative mb-3 md:mb-6">
              <div className="relative bg-black/40 backdrop-blur-md border-2 border-cyan-500/50 px-3 py-2 md:px-6 md:py-3 clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
                <div className="absolute top-0 left-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 border-cyan-400" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Trophy className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                    <h1 className="text-xl md:text-3xl font-black font-mono tracking-tight text-cyan-300">
                      SPONSORS
                    </h1>
                  </div>
                  <div className="text-[8px] md:text-[10px] font-mono text-cyan-500/50 tracking-widest">
                    ALLIANCE_NET
                  </div>
                </div>
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Compact Sponsor Grid */}
            <div className="grid grid-cols-3 gap-2.5 md:gap-4 mb-6">
              {sponsors.map((sponsor, i) => {
                const colors = getTierColor(sponsor.tier)
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + (i * 0.05), type: 'spring', stiffness: 100 }}
                    whileHover={{ scale: 1.05 }}
                    className={`
                      relative group cursor-pointer
                      bg-black/40 backdrop-blur-md
                      border-2 transition-all duration-300
                      clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]
                      ${getTierBorder(sponsor.tier)}
                    `}
                  >
                    <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${colors.corner}`} />
                    <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${colors.corner}`} />
                    <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${colors.corner}`} />
                    <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${colors.corner}`} />

                    <div className={`absolute top-1 right-1 px-1.5 py-0.5 text-[7px] font-mono tracking-widest uppercase ${colors.bg} border ${colors.border} ${colors.text}`}>
                      {sponsor.tier}
                    </div>

                    <div className="relative h-24 md:h-28 flex items-center justify-center p-3">
                      <div className={`text-[10px] font-mono opacity-40 ${colors.text}`}>
                        LOGO
                      </div>
                    </div>

                    <div className={`absolute inset-0 bg-linear-to-b from-transparent to-transparent pointer-events-none ${colors.glow}`} />
                  </motion.div>
                )
              })}
            </div>

            {/* Compact Sponsorship CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="relative bg-black/60 backdrop-blur-md border-2 border-purple-500/40 p-3 md:p-5 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400/70" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400/70" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400/70" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400/70" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Sparkles className="w-4 md:w-6 h-4 md:h-6 text-purple-400" />
                    <div>
                      <h3 className="text-base md:text-xl font-black font-mono text-purple-300">
                        WANT TO SPONSOR US?
                      </h3>
                      <p className="text-xs text-purple-200/60 font-mono hidden md:block">
                        Power the next generation of coders
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-1.5 md:gap-3 text-xs">
                    <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-400/30 px-2 md:px-3 py-1 md:py-1.5 rounded">
                      <Mail className="w-2.5 md:w-3 h-2.5 md:h-3 text-purple-400" />
                      <span className="font-mono text-purple-200">codewar@aec.ac.in</span>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-400/30 px-2 md:px-3 py-1 md:py-1.5 rounded">
                      <Phone className="w-2.5 md:w-3 h-2.5 md:h-3 text-purple-400" />
                      <span className="font-mono text-purple-200">+91 94355 53309</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* System label */}
      <div className="hidden md:block absolute bottom-4 left-4 text-[10px] font-mono text-cyan-500/30 tracking-widest">
        SPONSOR_REGISTRY_v7.0
      </div>
    </main>
  )
}