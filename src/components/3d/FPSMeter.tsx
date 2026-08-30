"use client";

import { useEffect, useRef, useState } from "react";

export default function FPSMeter({ deviceTier }: { deviceTier: string }) {
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState({ fps: 0, min: Infinity, avg: 0 });
  const frames = useRef<number[]>([]);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (
        !isTyping &&
        e.key.toLowerCase() === "f" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        setVisible((v) => !v);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const tick = () => {
      const now = performance.now();
      const delta = now - lastTime.current;
      lastTime.current = now;
      const fps = 1000 / delta;

      frames.current.push(fps);
      if (frames.current.length > 120) frames.current.shift(); // ~last 2s at 60fps

      const min = Math.min(...frames.current);
      const avg =
        frames.current.reduce((a: number, b: number) => a + b, 0) /
        frames.current.length;

      setStats({
        fps: Math.round(fps),
        min: Math.round(min),
        avg: Math.round(avg),
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        left: 8,
        zIndex: 9999,
        background: "rgba(0,0,0,0.7)",
        color: "#0f0",
        fontFamily: "monospace",
        fontSize: 12,
        padding: "6px 10px",
        borderRadius: 4,
        pointerEvents: "none",
      }}
    >
      tier: {deviceTier} | fps: {stats.fps} | min: {stats.min} | avg:{" "}
      {stats.avg}
    </div>
  );
}
