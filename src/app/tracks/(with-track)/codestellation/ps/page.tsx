'use client'

import { motion } from 'motion/react'
import { FileCode, Zap, Lock } from 'lucide-react'
import { useEffect, useState } from 'react'

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

const PS_RELEASE = new Date('2026-02-25T10:00:00+05:30')

export default function CodestellationPS() {
  const { days, hours, minutes, seconds } = useCountdown(PS_RELEASE)
  const released = Date.now() >= PS_RELEASE.getTime()

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
          <div className="absolute inset-0 blur-3xl bg-purple-500/10" />
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-purple-500/50 px-3 py-2 md:px-6 md:py-3 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] md:clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]">
            <div className="absolute top-0 left-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 border-purple-400" />
            <div className="absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 border-purple-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 border-purple-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 border-purple-400" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <FileCode className="w-3 h-3 md:w-4 md:h-4 text-purple-400 animate-pulse" />
                <h1 className="text-xl md:text-3xl font-black font-mono tracking-tight text-purple-300">
                  PROBLEM STATEMENTS
                </h1>
              </div>
              <div className="hidden md:block text-[10px] font-mono text-purple-500/50 tracking-widest">
                TRACK_01_PS
              </div>
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* PS Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative bg-black/40 backdrop-blur-md border-2 border-purple-500/30 clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] px-4 py-8 md:px-10 md:py-16"
        >
          <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-purple-400/60" />
          <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-purple-400/60" />
          <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-purple-400/60" />
          <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-purple-400/60" />
          <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 to-indigo-900/20 clip-path-[polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] md:clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

          {released ? (
            <div className="relative text-center">
              <p className="text-purple-300 font-mono text-lg">Problem statements will be uploaded soon...!</p>
            </div>
          ) : (
            <div className="relative flex flex-col items-center gap-6 md:gap-10">
              <div className="flex items-center gap-2 text-purple-400/70 font-mono text-[10px] md:text-xs tracking-widest uppercase">
                <Lock className="w-3 h-3 md:w-4 md:h-4" />
                <span>Problem statements release in</span>
              </div>

              {/* Countdown */}
              <div className="flex items-end gap-3 md:gap-6">
                {[
                  { value: days, label: 'DAYS' },
                  { value: hours, label: 'HRS' },
                  { value: minutes, label: 'MIN' },
                  { value: seconds, label: 'SEC' },
                ].map(({ value, label }, i) => (
                  <div key={label} className="flex items-end gap-3 md:gap-6">
                    <div className="flex flex-col items-center">
                      <motion.div
                        key={value}
                        initial={{ opacity: 0.5, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: 'clamp(32px, 8vw, 72px)' }}
                        className="font-black font-mono text-purple-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] tabular-nums"
                      >
                        {String(value).padStart(2, '0')}
                      </motion.div>
                      <span className="text-[8px] md:text-[10px] font-mono text-purple-500/60 tracking-widest mt-1">{label}</span>
                    </div>
                    {i < 3 && (
                      <span style={{ fontSize: 'clamp(32px, 8vw, 72px)' }} className="font-mono text-purple-500/40 leading-none self-center">:</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-[9px] md:text-[10px] font-mono text-purple-500/40 tracking-widest">
                FEB 25, 2026 @ 10:00 AM IST
              </div>
            </div>
          )}
        </motion.div>

        <div className="mb-8 md:mb-0 md:mt-6 text-center text-[8px] md:text-[10px] font-mono text-purple-500/30 tracking-widest">
          PS_SYSTEM_v7.0
        </div>
      </motion.div>
    </section>
  )
}
