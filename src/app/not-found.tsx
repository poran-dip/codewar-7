"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4 md:px-6">
      {/* Background glow */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        animate={{
          background:
            "radial-gradient(circle at center, rgba(147, 51, 234, 0.2) 0%, rgba(88, 28, 135, 0.1) 50%, transparent 100%)",
        }}
      />

      {/* TOP HUD */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="mb-4 md:mb-6"
      >
        <div className="relative">
          <div className="absolute -top-1 -left-1 md:-top-1.5 md:-left-1.5 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 border-purple-400/60" />
          <div className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-purple-400/60" />
          <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 px-2.5 py-1.5 md:px-4 md:py-2 font-mono">
            <span className="text-[10px] md:text-xs text-purple-400/70 tracking-widest uppercase">
              Error — Route Not Found
            </span>
          </div>
        </div>
      </motion.div>

      {/* MAIN 404 block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
        className="relative z-20 mb-4 md:mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 blur-xl md:blur-3xl bg-purple-500/20" />
          <div className="relative bg-black/40 backdrop-blur-md border-2 border-purple-500/50 px-6 py-4 md:px-12 md:py-6">
            <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-purple-400" />
            <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-purple-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-purple-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-purple-400" />

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight font-mono text-purple-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
              404
            </h1>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-linear-to-r from-transparent via-purple-500/60 to-transparent" />
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="font-mono text-xs md:text-sm text-purple-400/50 tracking-widest uppercase mb-6 md:mb-10"
      >
        SECTOR_NOT_FOUND — SIGNAL_LOST
      </motion.p>

      {/* Back to home button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
      >
        <button
          onClick={() => router.push("/")}
          className="relative group bg-black/60 backdrop-blur-sm border border-cyan-500/40 px-5 py-2.5 md:px-8 md:py-3 font-mono text-xs md:text-sm text-cyan-400 hover:text-cyan-200 hover:border-cyan-400/70 hover:bg-cyan-500/10 transition-all duration-200 tracking-widest uppercase"
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/60 group-hover:border-cyan-400" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400/60 group-hover:border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400/60 group-hover:border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/60 group-hover:border-cyan-400" />
          ← Return to Base
        </button>
      </motion.div>

      {/* System label */}
      <div className="hidden md:block absolute bottom-4 left-4 text-[10px] font-mono text-purple-500/30 tracking-widest">
        ERR_404_v7.0
      </div>
    </section>
  );
}
