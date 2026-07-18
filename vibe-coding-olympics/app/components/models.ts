export type BuildDuration = 1 | 3 | 5 | 10;

export interface BuildRequest {
  prompt: string;
  duration: BuildDuration;
}

export type ExperienceView = "landing" | "dashboard";

export type AgentRole = "Planner" | "Designer" | "Frontend" | "Backend" | "QA" | "Judge";

export interface AgentMessage {
  id: string;
  role: AgentRole;
  text: string;
  timestamp: string;
}

export interface BuildProgress {
  percent: number;
  secondsRemaining: number;
  stage: string;
  isComplete: boolean;
}
