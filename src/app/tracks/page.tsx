"use client";

import { Cpu } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import TrackSelector from "@/components/intro/TrackSelector";

export default function TracksHubHero() {
  const [selectedTrack, setSelectedTrack] = useState<
    "codestellation" | "decode" | null
  >(null);

  useEffect(() => {
    if (selectedTrack) {
      const event = new CustomEvent("trackSelected", { detail: selectedTrack });
      window.dispatchEvent(event);
    }
  }, [selectedTrack]);

  return (
    <section className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4 md:px-6">
      {/* Dynamic ambient glow */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        animate={{
          background:
            selectedTrack === "codestellation"
              ? "radial-gradient(circle at center, rgba(88, 28, 135, 0.25) 0%, rgba(49, 46, 129, 0.18) 50%, transparent 100%)"
              : selectedTrack === "decode"
                ? "radial-gradient(circle at center, rgba(8, 145, 178, 0.25) 0%, rgba(30, 64, 175, 0.18) 50%, transparent 100%)"
                : "radial-gradient(circle at center, rgba(6,182,212,0.15) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.8 }}
      />

      {/* TOP HUD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <div className="relative bg-black/60 backdrop-blur-sm border border-cyan-500/30 px-4 py-2 font-mono">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-cyan-400/60" />
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-cyan-400/60">
            <Cpu className="w-4 h-4" />
            TRACK SYSTEM INTERFACE
          </div>
        </div>
      </motion.div>

      {/* MAIN PANEL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 blur-3xl bg-cyan-500/10" />
        <div className="relative bg-black/40 backdrop-blur-md border-2 border-cyan-500/50 px-6 py-4 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

          <h1 className="text-2xl md:text-3xl font-black font-mono text-cyan-300 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
            SELECT A TRACK
          </h1>
          <p className="text-xs md:text-sm text-cyan-400/60 mt-2 max-w-md">
            Load track-specific environments, rulesets, objectives, and reward
            protocols.
          </p>
        </div>
      </motion.div>

      {/* TRACK SELECTOR */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-3xl"
      >
        <TrackSelector
          onTrackChange={setSelectedTrack}
          selectedTrack={selectedTrack}
        />
      </motion.div>

      {/* STATUS LINE */}
      <div className="mt-6 text-[10px] font-mono text-cyan-500/40 tracking-widest">
        STATUS: AWAITING SECTOR INITIALIZATION
      </div>
    </section>
  );
}
