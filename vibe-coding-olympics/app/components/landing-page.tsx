"use client";

import { useState } from "react";
import { ArrowRight, Clock3 } from "lucide-react";
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
    <div className="dot-grid min-h-screen bg-[#fbfbf8] px-5 py-6 text-[#242424] sm:px-8 lg:px-12">
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-black/10 pb-5">
        <div className="flex items-center gap-3"><OlympicScribble /><span className="font-comic text-2xl lowercase sm:text-3xl">prompt olympics</span></div>
        <span className="hidden text-xs text-black/45 sm:block">season one · live-ish</span>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-88px)] max-w-4xl flex-col items-center justify-center py-16 text-center">
        <p className="mb-5 text-sm text-black/50">Six AI athletes. One terrible idea.</p>
        <h1 className="scribble-title font-comic max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">give a tiny team<br />an unnecessarily<br /><span className="text-[#d75d77]">specific brief.</span></h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-black/60 sm:text-lg">They&apos;ll plan, panic, ship, and be judged in real time. It&apos;s a very serious simulation.</p>

        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-3xl text-left">
          <label htmlFor="startup-prompt" className="mb-2 block text-sm text-black/60">What should the agents build?</label>
          <div className="rounded-2xl border border-black/15 bg-white p-2 shadow-sm">
            <textarea id="startup-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="e.g. LinkedIn for houseplants, but everyone is aggressively networking..." rows={4} className="w-full resize-none rounded-xl bg-transparent px-4 py-3 text-lg outline-none placeholder:text-black/30" />
            <div className="flex flex-col gap-3 border-t border-black/10 px-2 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm text-black/65"><Clock3 size={17} aria-hidden="true" /> Build time
                <select value={duration} onChange={(event) => setDuration(Number(event.target.value) as BuildDuration)} className="rounded-lg border border-black/15 bg-[#fbfbf8] px-3 py-2 outline-none focus:ring-2 focus:ring-[#d75d77]">
                  {durationOptions.map((option) => <option key={option} value={option}>{option} minute{option === 1 ? "" : "s"}</option>)}
                </select>
              </label>
              <button type="submit" disabled={!trimmedPrompt} className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#25312c] px-5 py-3 text-white transition hover:bg-[#3d5147] disabled:cursor-not-allowed disabled:opacity-45">
                Start Building <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>

        <p className="mt-7 text-sm text-black/40">No APIs were harmed. This is a delightfully believable simulation.</p>
      </section>
    </div>
  );
}

function OlympicScribble() {
  return <span aria-label="Hand-drawn Olympic-style rings" role="img" className="relative block h-9 w-[54px]">
    <i className="ring ring-blue absolute left-0 top-0" /><i className="ring ring-black absolute left-[16px] top-0" /><i className="ring ring-red absolute left-[32px] top-0" /><i className="ring ring-yellow absolute left-[8px] top-[14px]" /><i className="ring ring-green absolute left-[24px] top-[14px]" />
  </span>;
}
