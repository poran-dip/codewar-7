"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useNavMeta } from "@/store/useNavMeta";

export default function EscapeButton() {
  const navMeta = useNavMeta();
  const accentColor =
    navMeta.currentMeta?.track === "codestellation" ? "purple" : "cyan";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: 0.3,
      }}
      className="hidden md:block fixed top-4 md:top-6 left-4 md:left-6 z-50"
    >
      <Link href="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            group relative flex items-center gap-1.5 md:gap-2
            bg-black/40 backdrop-blur-md
            border-2 transition-all duration-300
            px-2.5 py-1.5 md:px-3 md:py-2
            font-mono text-[10px] md:text-xs font-bold tracking-wider
            rounded
            clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]
            ${
              accentColor === "purple"
                ? "border-purple-500/40 text-purple-300 hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                : "border-cyan-500/40 text-cyan-300 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            }
          `}
        >
          {/* Corner decorations */}
          <div
            className={`absolute -top-0.5 -left-0.5 w-2 h-2 md:w-2.5 md:h-2.5 border-t-2 border-l-2 transition-colors ${accentColor === "purple" ? "border-purple-400/60 group-hover:border-purple-400" : "border-cyan-400/60 group-hover:border-cyan-400"}`}
          />
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 md:w-2.5 md:h-2.5 border-b-2 border-r-2 transition-colors ${accentColor === "purple" ? "border-purple-400/60 group-hover:border-purple-400" : "border-cyan-400/60 group-hover:border-cyan-400"}`}
          />

          {/* Glow effect on hover */}
          <div
            className={`
            absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
            bg-linear-to-br to-transparent
            clip-path-[polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]
            ${accentColor === "purple" ? "from-purple-500/10" : "from-cyan-500/10"}
          `}
          />

          {/* Scanline effect */}
          <div
            className={`absolute inset-0 bg-linear-to-b from-transparent to-transparent pointer-events-none ${accentColor === "purple" ? "via-purple-500/5" : "via-cyan-500/5"}`}
          />

          <X className="relative w-3.5 h-3.5 md:w-4 md:h-4 group-hover:rotate-90 transition-transform duration-300" />

          <span className="relative hidden sm:inline">EXIT</span>

          <span
            className={`relative text-[8px] md:text-[10px] border px-1.5 py-0.5 rounded ${accentColor === "purple" ? "text-purple-500/60 border-purple-500/30" : "text-cyan-500/60 border-cyan-500/30"}`}
          >
            ESC
          </span>

          {/* Corner accent */}
          <div
            className={`
            absolute top-0 right-0 w-1.5 h-1.5 
            border-t border-r
            transition-colors
            ${accentColor === "purple" ? "border-purple-400/60 group-hover:border-purple-400" : "border-cyan-400/60 group-hover:border-cyan-400"}
          `}
          />
        </motion.div>
      </Link>

      {/* System label - hidden on mobile */}
      <div
        className={`hidden md:block mt-1 text-[9px] font-mono tracking-widest ${accentColor === "purple" ? "text-purple-500/30" : "text-cyan-500/30"}`}
      >
        RETURN_TO_ROOT
      </div>
    </motion.div>
  );
}
