"use client";

import { useEffect, useState } from "react";
import type { BuildDuration, BuildProgress } from "./models";

const stages = ["Reading the brief", "Plotting the UX", "Writing suspiciously fast code", "Making it look expensive", "Finding character-building bugs", "Preparing the victory lap"];
const sprintDurationMs = 30000;

/** Replace this clock with a real orchestration-progress subscription in Version 2. */
export function useBuildProgress(duration: BuildDuration): BuildProgress {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => setElapsed(Math.min(Date.now() - startedAt, sprintDurationMs)), 250);
    return () => window.clearInterval(timer);
  }, []);

  const percent = Math.round((elapsed / sprintDurationMs) * 100);
  const stageIndex = Math.min(Math.floor((percent / 100) * stages.length), stages.length - 1);
  const secondsRemaining = Math.max(0, Math.ceil((duration * 60) * (1 - elapsed / sprintDurationMs)));

  return { percent, secondsRemaining, stage: stages[stageIndex], isComplete: percent >= 100 };
}
