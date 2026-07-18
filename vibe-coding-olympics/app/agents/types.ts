import type { BuildDuration, BuildProgress, BuildRequest } from "../build/types";

export const agentRoles = ["Planner", "Designer", "Frontend", "Backend", "QA", "Judge"] as const;

export type AgentRole = (typeof agentRoles)[number];

export interface AgentMessage {
  id: string;
  role: AgentRole;
  text: string;
  timestamp: string;
}

export interface AgentContext {
  request: BuildRequest;
  sequence: number;
  timestamp: string;
}

/** Contract for a real agent adapter (LLM, queue worker, or local implementation). */
export interface Agent {
  readonly role: AgentRole;
  respond(context: AgentContext): AgentMessage;
}

export interface AgentRunSnapshot {
  messages: AgentMessage[];
  progress: BuildProgress;
}

export interface AgentRun {
  readonly request: BuildRequest;
  getSnapshot(): AgentRunSnapshot;
  subscribe(listener: (event: AgentRunEvent) => void): () => void;
  start(): void;
  stop(): void;
}

export interface AgentOrchestrator {
  createRun(request: BuildRequest): AgentRun;
}

export interface AgentRunEventMap {
  message: AgentMessage;
  progress: BuildProgress;
  complete: undefined;
}

export type AgentRunEvent = {
  [Type in keyof AgentRunEventMap]: { type: Type; payload: AgentRunEventMap[Type] };
}[keyof AgentRunEventMap];

export interface SimulatedRunOptions {
  duration: BuildDuration;
  messageIntervalMs?: number;
}
