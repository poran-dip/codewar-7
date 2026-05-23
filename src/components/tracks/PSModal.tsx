"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePSModal } from "@/store/PSModalContext";

const CATEGORY_COLORS: Record<string, string> = {
  Healthcare: "text-rose-300 bg-rose-500/10 border-rose-400/20",
  EdTech: "text-blue-300 bg-blue-500/10 border-blue-400/20",
  FinTech: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
  CivicTech: "text-yellow-300 bg-yellow-500/10 border-yellow-400/20",
  Opportunities: "text-indigo-300 bg-indigo-500/10 border-indigo-400/20",
  Crisis: "text-red-300 bg-red-500/10 border-red-400/20",
  Accessibility: "text-purple-300 bg-purple-500/10 border-purple-400/20",
};

export default function PSModal() {
  const { selectedPS, isOpen, closeModal } = usePSModal();

  if (!selectedPS) return null;

  const categoryColor =
    CATEGORY_COLORS[selectedPS.category] ??
    "text-purple-300 bg-purple-500/10 border-purple-400/20";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            data-ps-modal-open="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9998"
            style={{ position: "fixed" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-6 pointer-events-none"
            style={{ position: "fixed", zIndex: 9999 }}
          >
            <div
              className="pointer-events-auto w-full max-w-6xl max-h-[95vh] overflow-y-auto relative bg-black/50 backdrop-blur-xl border-2 border-purple-500/50 clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] md:clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] p-3 md:p-5"
              style={{ position: "relative", zIndex: 10000 }}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 border-purple-400" />
              <div className="absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 border-purple-400" />
              <div className="absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 border-purple-400" />
              <div className="absolute bottom-0 right-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 border-purple-400" />

              {/* Gradient overlays */}
              <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity clip-path-[polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] md:clip-path-[polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)] bg-linear-to-br from-purple-900/20 to-indigo-900/20 pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

              {/* Close button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-1.5 rounded hover:bg-purple-500/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              </button>

              {/* Content */}
              <div className="relative space-y-4 md:space-y-6">
                {/* Header */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="shrink-0 p-2 md:p-2 rounded bg-purple-500/20 border border-purple-400/40">
                    {selectedPS.icon && (
                      <selectedPS.icon className="w-4 h-4 md:w-4 md:h-4 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-mono md:text-xl font-bold text-purple-300 mb-2 pr-4">
                      {selectedPS.title}
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[8px] md:text-[9px] font-mono tracking-widest uppercase px-2 py-1 border rounded-sm ${categoryColor}`}
                      >
                        {selectedPS.category}
                      </span>
                      <span className="text-[8px] md:text-[9px] font-mono tracking-widest text-purple-400/60">
                        {`PS_${selectedPS.id.toUpperCase()}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Problem */}
                <div>
                  <h3 className="text-xs md:text-sm font-mono font-bold text-purple-300 mb-2 tracking-widest">
                    PROBLEM
                  </h3>
                  <p className="font-mono text-xs md:text-sm leading-relaxed text-purple-100/70">
                    {selectedPS.problem}
                  </p>
                </div>

                {/* Looking For */}
                <div>
                  <h3 className="text-xs md:text-sm font-mono font-bold text-purple-300 mb-2 tracking-widest">
                    WHAT WE&apos;RE LOOKING FOR
                  </h3>
                  <p className="font-mono text-xs md:text-sm leading-relaxed text-purple-100/70">
                    {selectedPS.lookingFor}
                  </p>
                </div>

                {/* Focus Areas */}
                {selectedPS.focusAreas && selectedPS.focusAreas.length > 0 && (
                  <div>
                    <h3 className="text-xs md:text-sm font-mono font-bold text-purple-300 mb-2 tracking-widest">
                      FOCUS AREAS
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedPS.focusAreas.map((area) => (
                        <div key={area} className="flex items-start gap-2">
                          <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                          <span className="font-mono text-xs md:text-sm text-purple-100/70">
                            {area}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Constraints */}
                {selectedPS.constraints &&
                  selectedPS.constraints.length > 0 && (
                    <div>
                      <h3 className="text-xs md:text-sm font-mono font-bold text-purple-300 mb-2 tracking-widest">
                        CONSTRAINTS
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedPS.constraints.map((constraint) => (
                          <div
                            key={constraint}
                            className="flex items-start gap-2"
                          >
                            <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                            <span className="font-mono text-xs md:text-sm text-purple-100/60">
                              {constraint}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
