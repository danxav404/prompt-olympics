"use client";

import { ArrowLeft, CircleDotDashed, Trophy } from "lucide-react";
import type { BuildRequest } from "./models";
import { AgentFeed } from "./agent-feed";
import { ProgressPanel } from "./progress-panel";
import { useBuildProgress } from "./use-build-progress";
import { PreviewPane } from "./preview-pane";

interface BuildDashboardProps {
  request: BuildRequest;
  onExit: () => void;
}

export function BuildDashboard({ request, onExit }: BuildDashboardProps) {
  const progress = useBuildProgress(request.duration);
  return (
    <div className="dot-grid min-h-screen bg-[#f7f5ff] px-4 py-5 text-[#16132b] sm:px-7 lg:px-10">
      <header className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <button type="button" onClick={onExit} className="inline-flex items-center gap-2 rounded-xl border-2 border-[#16132b] bg-white px-3 py-2 text-sm font-bold shadow-[2px_2px_0_#16132b] transition hover:-translate-y-0.5"><ArrowLeft size={16} aria-hidden="true" /> New idea</button>
        <div className="hidden items-center gap-2 font-black sm:flex"><Trophy size={20} className="text-[#6c4cff]" aria-hidden="true" /> VIBE CODING OLYMPICS</div>
        <span className="rounded-full border-2 border-[#16132b] bg-[#ffd84d] px-3 py-1.5 text-xs font-black">BUILD IN PROGRESS</span>
      </header>

      <section className="mx-auto max-w-[1500px] py-7 lg:py-9">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="comic-accent text-base text-[#ff5fa2]">The crowd has submitted:</p>
            <h1 className="max-w-4xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">“{request.prompt}”</h1>
          </div>
          <p className="flex items-center gap-2 text-sm font-bold text-[#5d5872]"><CircleDotDashed size={17} className="animate-spin" aria-hidden="true" /> 6 agents are pretending very hard</p>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(280px,0.85fr)_minmax(280px,0.9fr)_minmax(370px,1.25fr)]">
          <DashboardCard title="Agent feed" eyebrow="LIVE COMMENTARY"><AgentFeed prompt={request.prompt} /></DashboardCard>
          <DashboardCard title="Build progress" eyebrow={`${request.duration} MINUTE SPRINT`}><ProgressPanel progress={progress} /></DashboardCard>
          <DashboardCard title="Preview window" eyebrow="GENERATED APP"><PreviewPane prompt={request.prompt} progress={progress} /></DashboardCard>
        </div>
      </section>
    </div>
  );
}

interface DashboardCardProps { title: string; eyebrow: string; children: React.ReactNode; }

export function DashboardCard({ title, eyebrow, children }: DashboardCardProps) {
  return <section className="min-h-[440px] overflow-hidden rounded-[1.6rem] border-[3px] border-[#16132b] bg-white shadow-[5px_5px_0_#16132b]"><div className="flex items-center justify-between border-b-2 border-[#16132b] bg-[#fffdf5] px-5 py-4"><div><p className="mb-0.5 text-[10px] font-black tracking-[0.14em] text-[#766f89]">{eyebrow}</p><h2 className="text-xl font-black tracking-tight">{title}</h2></div><span className="h-3 w-3 rounded-full bg-[#4de4bd] ring-2 ring-[#16132b]" /></div>{children}</section>;
}
