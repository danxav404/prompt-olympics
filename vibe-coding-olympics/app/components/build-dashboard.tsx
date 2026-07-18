"use client";

import { useEffect, useMemo } from "react";
import { ArrowLeft, CircleDotDashed } from "lucide-react";
import type { BuildRequest } from "./models";
import { SimulatedAgentOrchestrator } from "../agents/simulation/simulated-orchestrator";
import { AgentFeed } from "./agent-feed";
import { ProgressPanel } from "./progress-panel";
import { useBuildProgress } from "./use-build-progress";
import { PreviewPane } from "./preview-pane";

interface BuildDashboardProps {
  request: BuildRequest;
  onExit: () => void;
}

export function BuildDashboard({ request, onExit }: BuildDashboardProps) {
  const run = useMemo(() => new SimulatedAgentOrchestrator().createRun(request), [request]);
  const progress = useBuildProgress(run);

  useEffect(() => {
    run.start();
    return () => run.stop();
  }, [run]);
  return (
    <div className="min-h-screen bg-[#f8f8f5] px-5 py-6 text-[#242424] sm:px-8">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 border-b border-black/10 pb-5">
        <button type="button" onClick={onExit} className="inline-flex items-center gap-2 text-sm text-black/65 transition hover:text-black"><ArrowLeft size={16} aria-hidden="true" /> New idea</button>
        <span className="font-comic text-xl lowercase">prompt olympics</span>
        <span className="text-xs text-black/55">{progress.isComplete ? "complete" : "building"}</span>
      </header>

      <section className="mx-auto max-w-[1500px] py-7 lg:py-9">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-black/50">The crowd has submitted</p>
            <h1 className="mt-1 max-w-4xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl">“{request.prompt}”</h1>
          </div>
          <p className="flex items-center gap-2 text-sm text-black/55"><CircleDotDashed size={17} className={progress.isComplete ? "" : "animate-spin"} aria-hidden="true" /> {progress.isComplete ? "Shipped exactly on time" : "6 agents are pretending very hard"}</p>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(280px,0.85fr)_minmax(280px,0.9fr)_minmax(370px,1.25fr)]">
          <DashboardCard title="Agent feed" eyebrow="LIVE COMMENTARY"><AgentFeed run={run} /></DashboardCard>
          <DashboardCard title="Build progress" eyebrow={`${request.duration} MINUTE SPRINT`}><ProgressPanel progress={progress} /></DashboardCard>
          <DashboardCard title="Preview window" eyebrow="GENERATED APP"><PreviewPane prompt={request.prompt} progress={progress} /></DashboardCard>
        </div>
      </section>
    </div>
  );
}

interface DashboardCardProps { title: string; eyebrow: string; children: React.ReactNode; }

export function DashboardCard({ title, eyebrow, children }: DashboardCardProps) {
  return <section className="min-h-[440px] overflow-hidden rounded-2xl border border-black/10 bg-white"><div className="flex items-center justify-between border-b border-black/10 px-5 py-4"><div><p className="mb-1 text-[10px] tracking-[0.12em] text-black/45">{eyebrow}</p><h2 className="text-lg font-medium tracking-tight">{title}</h2></div><span className="h-2 w-2 rounded-full bg-[#4d9c75]" /></div>{children}</section>;
}
