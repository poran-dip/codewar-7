'use client'

import { forwardRef, useImperativeHandle, useState } from 'react'

export type SceneLoaderHandle = {
  finish: () => void
}

const SceneLoader = forwardRef<SceneLoaderHandle, { onDone?: () => void }>(
  ({ onDone }, ref) => {
    const [fading, setFading] = useState(false)

    useImperativeHandle(ref, () => ({
      finish: () => {
        setFading(true)
        setTimeout(() => onDone?.(), 700)
      },
    }))

    return (
      <>
        <style>{`
          .sl-grid-inner {
            position: absolute;
            inset: 0;
            transform: rotateX(65deg);
            transform-origin: 50% 100%;
            background-image:
              linear-gradient(to right, rgba(0,229,255,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(123,44,191,0.18) 1px, transparent 1px);
            background-size: 64px 64px;
            -webkit-mask-image: linear-gradient(to top, black 0%, transparent 75%);
            mask-image: linear-gradient(to top, black 0%, transparent 75%);
          }
          .sl-core {
            position: absolute;
            inset: 30px;
            border-radius: 50%;
            background: radial-gradient(circle at 35% 35%, #e0aaff, #9c27b0 50%, #4a0072);
            box-shadow: 0 0 16px 4px rgba(156,39,176,0.7), 0 0 32px 8px rgba(156,39,176,0.3);
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
        `}</style>

        <div
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden transition-opacity duration-700"
          style={{
            background: '#0a0118',
            opacity: fading ? 0 : 1,
            pointerEvents: fading ? 'none' : 'all',
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
              background: 'linear-gradient(to bottom, #0a0118 0%, transparent 35%, transparent 65%, #0a0118 100%)',
            }}
          />

          {/* Glow blob */}
          <div
            className="absolute size-90 rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(156,39,176,0.3) 0%, transparent 70%)',
            }}
          />

          {/* Orb */}
          <div className="relative z-10 size-24">
            {/* Ring 1 */}
            <div
              className="sl-spin-cw-14 absolute inset-0 rounded-full border border-[rgba(0,229,255,0.4)] border-t-transparent"
            />
            {/* Ring 2 */}
            <div
              className="sl-spin-ccw-18 absolute inset-2.5 rounded-full border border-[rgba(156,39,176,0.55)] border-b-transparent"
            />
            {/* Ring 3 */}
            <div
              className="sl-spin-cw-24 absolute inset-5 rounded-full border border-[rgba(0,229,255,0.3)] border-l-transparent"
            />

            {/* Core */}
            <div className="sl-core" />

            {/* Center dot */}
            <div
              className="sl-float absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_6px_3px_rgba(255,255,255,0.9)]"
            />
          </div>
        </div>
      </>
    )
  }
)

SceneLoader.displayName = 'SceneLoader'

export default SceneLoader
