"use client";

import { useState } from "react";
import { ArrowRight, Clock3, Sparkles, Trophy } from "lucide-react";
import type { BuildDuration, BuildRequest } from "./models";

interface LandingPageProps {
  onStart: (request: BuildRequest) => void;
}

const durationOptions: BuildDuration[] = [1, 3, 5, 10];

export function LandingPage({ onStart }: LandingPageProps) {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState<BuildDuration>(3);
  const trimmedPrompt = prompt.trim();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (trimmedPrompt) onStart({ prompt: trimmedPrompt, duration });
  }

  return (
    <div className="dot-grid relative isolate min-h-screen overflow-hidden bg-[#fffaf0] px-5 py-6 text-[#16132b] sm:px-8 lg:px-12">
      <div className="absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-[#ff5fa2]/25 blur-3xl" />
      <div className="absolute -right-24 bottom-4 -z-10 h-80 w-80 rounded-full bg-[#4de4bd]/25 blur-3xl" />

      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3 font-black tracking-tight">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border-2 border-[#16132b] bg-[#ffd84d] shadow-[3px_3px_0_#16132b]"><Trophy size={22} aria-hidden="true" /></span>
          <span className="text-lg sm:text-xl">VIBE CODING <span className="text-[#6c4cff]">OLYMPICS</span></span>
        </div>
        <span className="hidden rounded-full border-2 border-[#16132b] bg-white px-4 py-2 text-xs font-bold sm:block">SEASON 01 · LIVE-ish</span>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-88px)] max-w-4xl flex-col items-center justify-center py-14 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border-2 border-[#16132b] bg-[#4de4bd] px-4 py-2 text-sm font-bold shadow-[3px_3px_0_#16132b]"><Sparkles size={16} aria-hidden="true" /> Six AI athletes. One terrible idea.</div>
        <p className="comic-accent scribble mb-2 text-lg text-[#ff5fa2] sm:text-xl">Welcome to the internet&apos;s most questionable demo day</p>
        <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-7xl lg:text-8xl">MAKE AN AI TEAM<br /><span className="text-[#6c4cff]">BUILD SOMETHING</span><br />UNNECESSARY.</h1>
        <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-[#49455e] sm:text-lg">Throw a gloriously bad startup idea into the arena. Our fictional coding squad will plan, panic, ship, and be judged in real time.</p>

        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-3xl text-left">
          <label htmlFor="startup-prompt" className="mb-2 block text-sm font-black uppercase tracking-[0.14em]">What should the agents build?</label>
          <div className="rounded-[1.75rem] border-[3px] border-[#16132b] bg-white p-2 shadow-[7px_7px_0_#16132b]">
            <textarea id="startup-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="e.g. LinkedIn for houseplants, but everyone is aggressively networking..." rows={4} className="w-full resize-none rounded-2xl bg-transparent px-4 py-3 text-lg font-semibold outline-none placeholder:text-[#938fa3]" />
            <div className="flex flex-col gap-3 border-t-2 border-[#16132b]/10 px-2 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm font-bold"><Clock3 size={17} aria-hidden="true" /> Build time
                <select value={duration} onChange={(event) => setDuration(Number(event.target.value) as BuildDuration)} className="rounded-xl border-2 border-[#16132b] bg-[#fffaf0] px-3 py-2 font-black outline-none focus:ring-2 focus:ring-[#6c4cff]">
                  {durationOptions.map((option) => <option key={option} value={option}>{option} minute{option === 1 ? "" : "s"}</option>)}
                </select>
              </label>
              <button type="submit" disabled={!trimmedPrompt} className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#16132b] bg-[#6c4cff] px-5 py-3 font-black text-white shadow-[3px_3px_0_#16132b] transition hover:-translate-y-0.5 hover:bg-[#5839e8] disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none">
                Start Building <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>

        <p className="mt-7 text-sm font-semibold text-[#625d72]">No APIs were harmed. This is a delightfully believable simulation.</p>
      </section>
    </div>
  );
}
