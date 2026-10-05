"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type SceneLoaderHandle = {
  finish: () => void;
};

const SceneLoader = forwardRef<SceneLoaderHandle, { onDone?: () => void }>(
  ({ onDone }, ref) => {
    const [fading, setFading] = useState(false);
    const finishedRef = useRef(false);

    const finishLoading = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setFading(true);
      setTimeout(() => onDone?.(), 700);
    };

    useEffect(() => {
      const fallback = setTimeout(finishLoading, 1800);
      return () => clearTimeout(fallback);
    }, []);

    useImperativeHandle(ref, () => ({
      finish: finishLoading,
    }));

    return (
      <>
        <style>{`
          .sl-grid-inner {
            position: absolute;
            inset: 0;
            transform: rotateX(65deg);
            transform-origin: 50% 100%;
            background-image:
              linear-gradient(to right, rgba(43,27,18,0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px);
            background-size: 64px 64px;
            -webkit-mask-image: linear-gradient(to top, black 0%, transparent 75%);
            mask-image: linear-gradient(to top, black 0%, transparent 75%);
          }
          .sl-core {
            position: absolute;
            inset: 30px;
            border-radius: 50%;
            background: radial-gradient(circle at 35% 35%, #fff8b5, #ffd34e 50%, #c86c35);
            box-shadow: 0 0 16px 4px rgba(255,211,78,0.7), 0 0 32px 8px rgba(200,108,53,0.3);
            animation: slFloat 3s ease-in-out infinite;
          }
          @keyframes slSpinCW  { to { transform: rotate(360deg); } }
          @keyframes slSpinCCW { to { transform: rotate(-360deg); } }
          @keyframes slFloat {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-5px); }
          }
          .sl-spin-cw-14  { animation: slSpinCW  1.4s linear infinite; }
          .sl-spin-ccw-18 { animation: slSpinCCW 1.8s linear infinite; }
          .sl-spin-cw-24  { animation: slSpinCW  2.4s linear infinite; }
          .sl-float       { animation: slFloat   3s ease-in-out infinite; }
          .sl-mushroom-cap {
            animation: slCapSpin 2.2s linear infinite;
            transform-origin: 50% 100%;
          }
          @keyframes slCapSpin {
            0%, 100% { transform: rotateY(0deg) rotateZ(-3deg); }
            50% { transform: rotateY(180deg) rotateZ(3deg); }
          }
        `}</style>

        <div
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden transition-opacity duration-700"
          style={{
            background: "#67c9ed",
            opacity: fading ? 0 : 1,
            pointerEvents: fading ? "none" : "all",
          }}
        >
          {/* Perspective grid */}
          <div className="absolute inset-0 perspective-near">
            <div className="sl-grid-inner" />
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(103,201,237,0.9) 0%, transparent 35%, transparent 65%, rgba(78,175,85,0.65) 100%)",
            }}
          />

          {/* Glow blob */}
          <div
            className="absolute size-90 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,211,78,0.35) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex h-36 w-36 flex-col items-center justify-end">
            <div className="sl-mushroom-cap relative z-10 h-20 w-32 rounded-t-full rounded-b-[42%] border-4 border-[var(--ink)] bg-[#d94335] shadow-[5px_5px_0_var(--ink)]">
              <span className="absolute left-6 top-5 h-4 w-4 rounded-full border-2 border-[var(--ink)] bg-[#fff8df]" />
              <span className="absolute right-7 top-4 h-5 w-5 rounded-full border-2 border-[var(--ink)] bg-[#fff8df]" />
              <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--ink)] bg-[#fff8df]" />
            </div>
            <div className="relative -mt-1 h-16 w-20 rounded-b-[35%] rounded-t-[18%] border-4 border-[var(--ink)] bg-[#fff1c7] shadow-[5px_5px_0_var(--ink)]">
              <span className="absolute left-5 top-5 h-3 w-2 rounded-full bg-[var(--ink)]" />
              <span className="absolute right-5 top-5 h-3 w-2 rounded-full bg-[var(--ink)]" />
            </div>
          </div>
        </div>
      </>
    );
  },
);

SceneLoader.displayName = "SceneLoader";

export default SceneLoader;
