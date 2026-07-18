"use client";

import { useEffect, useState } from "react";
import type { BuildProgress } from "./models";
import type { AgentRun } from "../agents/types";

/** Adapts any local or remote orchestration run to the existing progress UI. */
export function useBuildProgress(run: AgentRun): BuildProgress {
  const [progress, setProgress] = useState(() => run.getSnapshot().progress);

  useEffect(() => {
    setProgress(run.getSnapshot().progress);
    return run.subscribe((event) => {
      if (event.type === "progress") setProgress(event.payload);
    });
  }, [run]);

  return progress;
}
