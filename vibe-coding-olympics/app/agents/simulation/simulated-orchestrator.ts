import type { BuildProgress, BuildRequest } from "../../build/types";
import { TypedEventEmitter } from "../events";
import { placeholderAgents } from "./placeholder-agents";
import type { Agent, AgentMessage, AgentOrchestrator, AgentRun, AgentRunEvent, AgentRunEventMap, AgentRunSnapshot } from "../types";

const progressStages = ["Reading the brief", "Plotting the UX", "Writing suspiciously fast code", "Making it look expensive", "Finding character-building bugs", "Preparing the victory lap"];

function timestamp() {
  return new Intl.DateTimeFormat("en", { minute: "2-digit", second: "2-digit" }).format(new Date());
}

function createProgress(elapsed: number, durationMs: number): BuildProgress {
  const percent = Math.min(100, Math.round((elapsed / durationMs) * 100));
  const stageIndex = Math.min(Math.floor((percent / 100) * progressStages.length), progressStages.length - 1);
  return { percent, secondsRemaining: Math.max(0, Math.ceil((durationMs - elapsed) / 1000)), stage: progressStages[stageIndex], isComplete: percent >= 100 };
}

class SimulatedAgentRun implements AgentRun {
  private readonly events = new TypedEventEmitter<AgentRunEventMap>();
  private readonly durationMs: number;
  private readonly messageIntervalMs: number;
  private messages: AgentMessage[] = [];
  private progress: BuildProgress;
  private startedAt = 0;
  private sequence = 0;
  private frame = 0;
  private messageTimer = 0;
  private started = false;

  constructor(readonly request: BuildRequest, private readonly agents: Agent[], messageIntervalMs = 2500) {
    this.durationMs = request.duration * 60_000;
    this.messageIntervalMs = messageIntervalMs;
    this.progress = createProgress(0, this.durationMs);
  }

  getSnapshot(): AgentRunSnapshot { return { messages: this.messages, progress: this.progress }; }

  subscribe(listener: (event: AgentRunEvent) => void) {
    const unsubs = (Object.keys({ message: true, progress: true, complete: true }) as Array<keyof AgentRunEventMap>)
      .map((type) => this.events.on(type, (payload) => listener({ type, payload } as AgentRunEvent)));
    return () => unsubs.forEach((unsubscribe) => unsubscribe());
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.startedAt = Date.now();
    this.addMessage(this.agents[0], 0);
    this.addMessage(this.agents[1], 0);
    this.messageTimer = window.setInterval(() => {
      this.sequence += 1;
      this.addMessage(this.agents[this.sequence % this.agents.length], this.sequence);
    }, this.messageIntervalMs);
    const tick = () => {
      const elapsed = Math.min(Date.now() - this.startedAt, this.durationMs);
      this.progress = createProgress(elapsed, this.durationMs);
      this.events.emit("progress", this.progress);
      if (this.progress.isComplete) {
        window.clearInterval(this.messageTimer);
        this.events.emit("complete", undefined);
        return;
      }
      this.frame = window.requestAnimationFrame(tick);
    };
    tick();
  }

  stop() {
    window.clearInterval(this.messageTimer);
    window.cancelAnimationFrame(this.frame);
    this.events.clear();
  }

  private addMessage(agent: Agent, sequence: number) {
    const message = agent.respond({ request: this.request, sequence, timestamp: timestamp() });
    this.messages = [...this.messages.slice(-7), message];
    this.events.emit("message", message);
  }
}

/** Browser-only stand-in for the future server-backed agent orchestrator. */
export class SimulatedAgentOrchestrator implements AgentOrchestrator {
  constructor(private readonly agents = placeholderAgents) {}
  createRun(request: BuildRequest): AgentRun { return new SimulatedAgentRun(request, this.agents); }
}
