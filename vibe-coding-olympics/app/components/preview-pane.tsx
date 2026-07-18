"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, Sparkles, Star } from "lucide-react";
import type { BuildProgress } from "./models";

interface PreviewPaneProps { prompt: string; progress: BuildProgress; }

export function PreviewPane({ prompt, progress }: PreviewPaneProps) {
  const isReady = progress.percent >= 34;
  return <div className="min-h-[430px] bg-[#1f1b37] p-3 sm:p-4">
    <div className="flex items-center gap-1.5 rounded-t-xl bg-[#373052] px-3 py-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ff6d79]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffd84d]" /><span className="h-2.5 w-2.5 rounded-full bg-[#4de4bd]" /><div className="ml-2 flex-1 rounded-md bg-white/10 px-2 py-1 text-[9px] font-bold text-white/60">localhost:3000/grand-idea</div></div>
    <div className="relative min-h-[370px] overflow-hidden rounded-b-xl bg-white">
      <AnimatePresence mode="wait">
        {isReady ? <motion.div key="app" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}><GeneratedApp prompt={prompt} /></motion.div> : <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-[370px] flex-col items-center justify-center bg-[#fff8ed] p-8 text-center"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} className="grid h-16 w-16 place-items-center rounded-3xl border-2 border-[#16132b] bg-[#ffd84d] shadow-[3px_3px_0_#16132b]"><Sparkles size={30} /></motion.div><h3 className="mt-6 text-xl font-black">Summoning your app…</h3><p className="mt-2 max-w-56 text-sm font-semibold leading-5 text-[#6d6779]">Our imaginary deployment crew is adding the finishing sprinkles.</p><div className="mt-6 h-2 w-full max-w-56 overflow-hidden rounded-full bg-[#e8e2d9]"><motion.div className="h-full bg-[#ff5fa2]" animate={{ width: `${Math.max(8, progress.percent * 2.6)}%` }} /></div></motion.div>}
      </AnimatePresence>
    </div>
  </div>;
}

function GeneratedApp({ prompt }: { prompt: string }) {
  const compactPrompt = prompt.length > 38 ? `${prompt.slice(0, 38)}…` : prompt;
  return <div className="min-h-[370px] overflow-hidden bg-[#fffcf3] text-[#293136]"><nav className="flex items-center justify-between bg-[#1d3e36] px-4 py-3 text-white"><span className="flex items-center gap-1.5 text-xs font-black"><Star size={14} fill="currentColor" /> WOW, ACTUALLY</span><div className="hidden gap-3 text-[10px] font-bold sm:flex"><span>Discover</span><span>Leaderboard</span><span>About</span></div><Menu size={17} className="sm:hidden" /></nav><main className="p-5 sm:p-7"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ee658b]">A platform for ambitious weirdos</p><h3 className="mt-2 max-w-md text-3xl font-black leading-[0.95] tracking-[-0.06em] sm:text-4xl">{compactPrompt}</h3><p className="mt-3 max-w-sm text-xs font-semibold leading-5 text-[#67706e]">Finally, a beautifully over-engineered place for this very specific dream.</p><div className="mt-5 flex gap-2"><button type="button" className="rounded-full bg-[#f2698e] px-4 py-2 text-xs font-black text-white shadow-sm">Join the movement</button><button type="button" className="grid h-8 w-8 place-items-center rounded-full border border-[#b9c7c2]"><Heart size={14} /></button></div><div className="mt-6 rounded-xl bg-[#d8f1e7] p-4"><div className="flex items-center justify-between"><span className="text-xs font-black">Trending right now</span><Search size={15} /></div><div className="mt-3 grid grid-cols-3 gap-2">{["Hot take", "Main quest", "Big mood"].map((item, index) => <div key={item} className={`rounded-lg p-2 text-[10px] font-black ${index === 1 ? "bg-[#ffd86a]" : "bg-white"}`}>{item}<span className="mt-4 block text-lg">{["🔥", "🛼", "✨"][index]}</span></div>)}</div></div></main></div>;
}
