"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { EVENT_CONFIG, type EventTrack } from "@/config/event";

export default function IntroHero() {
  const [selectedTrack, setSelectedTrack] = useState<EventTrack | null>(null);
  const tracks = Object.entries(EVENT_CONFIG.events) as [EventTrack, (typeof EVENT_CONFIG.events)[EventTrack]][];

  return (
    <main className="relative h-full min-h-0 w-full overflow-y-auto px-3 pb-16 pt-24 text-[var(--ink)] sm:px-5 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,223,0.08),rgba(255,248,223,0.62)_75%,rgba(255,248,223,0.95))]" />
      <section className="relative mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-7xl flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-center justify-between gap-3 text-[9px] font-[family-name:var(--font-pixel)] uppercase tracking-[0.12em] sm:text-[10px] md:text-xs">
          <span className="bg-[var(--cream)] px-2.5 py-2 shadow-[4px_4px_0_var(--ink)] sm:px-3">WORLD 1 / LEVEL 08</span>
          <span className="bg-[var(--sun)] px-2.5 py-2 shadow-[4px_4px_0_var(--ink)]">STATUS: OPEN FOR PLAY</span>
        </motion.div>
        <div className="grid min-w-0 items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <motion.p initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="mb-4 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.13em] text-[#b33d2e] sm:text-xs md:text-sm">AEC CODING CLUB PRESENTS</motion.p>
            <motion.h1 initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 110 }} className="max-w-4xl font-[family-name:var(--font-pixel)] text-[clamp(2rem,12vw,5rem)] leading-[1.35] tracking-[0.02em] text-[var(--ink)] drop-shadow-[5px_5px_0_#fff8df]">CODEWAR <span className="text-[#c04b35]">8.0</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-5 max-w-xl font-[family-name:var(--font-pixel)] text-[11px] leading-[2] sm:text-sm md:text-lg">ENTER THE WORLD OF CODE</motion.p>
            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Link href={EVENT_CONFIG.registrationUrl} className="pixel-button w-full bg-[#c04b35] text-white shadow-[6px_6px_0_var(--ink)] sm:w-auto">START ADVENTURE</Link><a href="#worlds" className="pixel-button w-full bg-[var(--cream)] text-[var(--ink)] shadow-[6px_6px_0_var(--ink)] sm:w-auto">EXPLORE EVENTS</a></div>
          </div>
          <motion.aside initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="pixel-panel min-w-0 bg-[rgba(255,248,223,0.78)] p-4 backdrop-blur-sm sm:p-5 md:p-7">
            <div className="mb-5 flex items-center justify-between border-b-2 border-dashed border-[#b88957] pb-4 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.14em]"><span>ADVENTURE BRIEF</span><span>★ 128</span></div>
            <p className="font-sans text-sm font-semibold leading-7 sm:text-base">Two worlds. One quest. Build boldly, solve quickly, and find your route through the CodeWar map.</p>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center font-[family-name:var(--font-pixel)] text-[9px] uppercase"><div className="bg-[#f4d990] p-3"><strong className="block text-lg">02</strong>worlds</div><div className="bg-[#a8d36c] p-3"><strong className="block text-lg">01</strong>quest</div><div className="bg-[#f4ad6f] p-3"><strong className="block text-lg">∞</strong>ideas</div></div>
          </motion.aside>
        </div>
      </section>
      <section id="worlds" className="relative mx-auto w-full max-w-7xl scroll-mt-20 pt-10">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-[0.16em] text-[#b33d2e]">SELECT YOUR LOADOUT</p><h2 className="mt-3 font-[family-name:var(--font-pixel)] text-2xl md:text-4xl">CHOOSE YOUR WORLD</h2></div><span className="hidden font-[family-name:var(--font-pixel)] text-xs md:block">COINS × 128</span></div>
        <div className="grid min-w-0 gap-5 lg:grid-cols-2">{tracks.map(([key, track], index) => { const active = selectedTrack === key; return <motion.article key={key} whileHover={{ y: -8 }} className={`pixel-panel relative min-w-0 overflow-hidden p-4 sm:p-6 md:p-8 ${active ? "ring-4 ring-[var(--sun)]" : ""} ${index === 0 ? "bg-[#fff0bd]" : "bg-[#d9f1ed]"}`}><div className="absolute right-4 top-4 font-[family-name:var(--font-pixel)] text-2xl opacity-25 sm:right-5 sm:top-5 sm:text-3xl">{index === 0 ? "✦" : "⌘"}</div><p className="font-[family-name:var(--font-pixel)] text-[9px] uppercase tracking-[0.1em] text-[#b33d2e] sm:text-[10px]">{track.world} / {track.track}</p><h3 className="mt-4 font-[family-name:var(--font-pixel)] text-lg leading-[1.6] sm:text-xl md:text-3xl">{track.name}</h3><p className="mt-3 text-base font-bold sm:text-lg">{track.tagline}</p><dl className="mt-5 grid gap-2 border-y-2 border-dashed border-[#b88957] py-4 font-[family-name:var(--font-pixel)] text-[9px] uppercase leading-[1.7] sm:text-[10px] sm:leading-[1.8]"><div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-2 sm:flex sm:justify-between sm:gap-4"><dt>TYPE</dt><dd className="min-w-0 break-words text-left sm:text-right">{track.type}</dd></div><div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-2 sm:flex sm:justify-between sm:gap-4"><dt>DATE</dt><dd className="min-w-0 break-words text-left sm:text-right">{track.date}</dd></div>{track.details.map((detail) => <div key={detail} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-2 sm:flex sm:justify-between sm:gap-4"><dt>INFO</dt><dd className="min-w-0 break-words text-left sm:text-right">{detail}</dd></div>)}</dl><div className="mt-5 flex w-full flex-col gap-3 sm:flex-row"><button type="button" onClick={() => setSelectedTrack(active ? null : key)} className="pixel-button w-full bg-[var(--sun)] text-[var(--ink)] sm:w-auto">{active ? "WORLD READY" : "SELECT WORLD"}</button><Link href={track.href} className="pixel-button w-full bg-[var(--ink)] text-white sm:w-auto">ENTER WORLD</Link></div></motion.article>; })}</div>
      </section>
      <section id="registration" className="relative mx-auto mt-16 max-w-7xl border-t-4 border-[var(--ink)] py-14 text-center"><p className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-[0.16em] text-[#b33d2e]">TREASURE CHECKPOINT</p><h2 className="mt-4 font-[family-name:var(--font-pixel)] text-2xl leading-[1.7] md:text-4xl">READY PLAYER?</h2><p className="mx-auto mt-4 max-w-lg text-lg font-bold">₹30,000 CASH + courses + goodies</p><Link href={EVENT_CONFIG.registrationUrl} className="pixel-button mt-7 inline-block bg-[#c04b35] text-white shadow-[6px_6px_0_var(--ink)]">REGISTER NOW</Link></section>
    </main>
  );
}
