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
    <div className="rounded-xl bg-[#25312c] p-5 text-white">
      <div className="flex items-center justify-between"><span className="text-xs tracking-[0.14em] text-white/65">TIME REMAINING</span><Timer size={18} aria-hidden="true" /></div>
      <p className="mt-2 font-mono text-5xl font-medium tracking-[-0.08em]">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
      <p className="mt-2 text-sm text-white/65">A real-time {progress.isComplete ? "finish" : "build"}.</p>
    </div>
    <div className="mt-6"><div className="mb-2 flex items-end justify-between"><div><p className="text-[10px] tracking-[0.14em] text-[#766f89]">CURRENTLY</p><p className="font-medium">{progress.isComplete ? "Taking a dramatic bow" : progress.stage}</p></div><span className="text-2xl font-medium text-[#d75978]">{progress.percent}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#eeeef0]"><motion.div className="h-full rounded-full bg-[#4d9c75]" animate={{ width: `${progress.percent}%` }} transition={{ ease: "linear" }} /></div></div>
    <ol className="mt-7 space-y-3">{stages.map((stage, index) => { const done = index < stageNumber || progress.isComplete; const active = index === stageNumber && !progress.isComplete; return <li key={stage} className={`flex items-center gap-3 text-sm ${done || active ? "text-[#242424]" : "text-[#9993a5]"}`}><span className={`grid h-6 w-6 place-items-center rounded-full border text-xs ${done ? "border-[#4d9c75] bg-[#e5f0ea]" : active ? "border-[#d59e24] bg-[#fff4d2]" : "border-black/15 bg-white"}`}>{done ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : index + 1}</span>{stage}{active && <span className="font-comic ml-auto text-xs text-[#d75978]">now!</span>}</li>; })}</ol>
  </div>;
}
