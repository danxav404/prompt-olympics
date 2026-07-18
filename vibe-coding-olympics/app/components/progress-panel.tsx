"use client";

import { Check, Timer } from "lucide-react";
import { motion } from "framer-motion";
import type { BuildProgress } from "./models";

const stages = ["Brief decoded", "Vibes designed", "Code assembled", "Reality checked", "Demo launched"];

export function ProgressPanel({ progress }: { progress: BuildProgress }) {
  const minutes = Math.floor(progress.secondsRemaining / 60);
  const seconds = progress.secondsRemaining % 60;
  const stageNumber = Math.min(Math.floor(progress.percent / 20), stages.length - 1);

  return <div className="p-5">
    <div className="rounded-2xl border-2 border-[#16132b] bg-[#6c4cff] p-5 text-white shadow-[3px_3px_0_#16132b]">
      <div className="flex items-center justify-between"><span className="text-xs font-black tracking-[0.14em] text-white/70">TIME REMAINING</span><Timer size={20} aria-hidden="true" /></div>
      <p className="mt-2 font-mono text-5xl font-black tracking-[-0.08em]">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
      <p className="mt-2 text-sm font-bold text-white/75">Demo speed engaged · clocks are a suggestion</p>
    </div>
    <div className="mt-6"><div className="mb-2 flex items-end justify-between"><div><p className="text-[10px] font-black tracking-[0.14em] text-[#766f89]">CURRENTLY</p><p className="font-black">{progress.isComplete ? "Taking a dramatic bow" : progress.stage}</p></div><span className="text-2xl font-black text-[#ff5fa2]">{progress.percent}%</span></div><div className="h-4 overflow-hidden rounded-full border-2 border-[#16132b] bg-[#f0edf6]"><motion.div className="h-full rounded-full bg-[#4de4bd]" animate={{ width: `${progress.percent}%` }} transition={{ ease: "easeOut" }} /></div></div>
    <ol className="mt-7 space-y-3">{stages.map((stage, index) => { const done = index < stageNumber || progress.isComplete; const active = index === stageNumber && !progress.isComplete; return <li key={stage} className={`flex items-center gap-3 text-sm font-bold ${done || active ? "text-[#16132b]" : "text-[#9993a5]"}`}><span className={`grid h-6 w-6 place-items-center rounded-full border-2 border-[#16132b] text-xs ${done ? "bg-[#4de4bd]" : active ? "bg-[#ffd84d]" : "bg-white"}`}>{done ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : index + 1}</span>{stage}{active && <span className="comic-accent ml-auto text-xs text-[#ff5fa2]">now!</span>}</li>; })}</ol>
  </div>;
}
