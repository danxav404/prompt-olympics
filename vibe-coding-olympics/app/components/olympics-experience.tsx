"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LandingPage } from "./landing-page";
import type { BuildRequest, ExperienceView } from "./models";
import { BuildDashboard } from "./build-dashboard";

export function OlympicsExperience() {
  const [view, setView] = useState<ExperienceView>("landing");
  const [request, setRequest] = useState<BuildRequest>({ prompt: "", duration: 3 });

  function startBuild(nextRequest: BuildRequest) {
    setRequest(nextRequest);
    setView("dashboard");
  }

  return (
    <AnimatePresence mode="wait">
      {view === "landing" ? (
        <motion.main key="landing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.32 }}>
          <LandingPage onStart={startBuild} />
        </motion.main>
      ) : (
        <motion.main key="dashboard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
          <BuildDashboard request={request} onExit={() => setView("landing")} />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
