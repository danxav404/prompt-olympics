import type { AgentMessage, AgentRole } from "../components/models";

/** Future live log providers should implement this contract without changing the UI. */
export interface AgentFeedSource {
  initialMessages(prompt: string): AgentMessage[];
  nextMessage(prompt: string, sequence: number): AgentMessage;
}

const roles: AgentRole[] = ["Planner", "Designer", "Frontend", "Backend", "QA", "Judge"];

const scripts: Record<AgentRole, (idea: string) => string> = {
  Planner: (idea) => `Breaking “${idea}” into features, risks, and one suspiciously large button.`,
  Designer: (idea) => `Moodboard acquired. ${idea} needs more sparkle and at least one emotionally available gradient.`,
  Frontend: (idea) => `I have created twelve components for “${idea}” and named none of them Button. This is craftsmanship.`,
  Backend: (idea) => `The fake data layer for “${idea}” is scaling beautifully. It has not complained once because it does not exist.`,
  QA: (idea) => `I found a bug, a feature, and a philosophical question in “${idea}”. Filing all three as high priority.`,
  Judge: (idea) => `Early verdict on “${idea}”: bold, confusing, and already dangerously pitchable.`,
};

function timestamp() {
  return new Intl.DateTimeFormat("en", { minute: "2-digit", second: "2-digit" }).format(new Date());
}

export const simulatedAgentFeed: AgentFeedSource = {
  initialMessages(prompt) {
    return [
      { id: "opening-plan", role: "Planner", text: `The brief is in. We are building “${prompt}”. I have alerted the tiny product roadmap.`, timestamp: timestamp() },
      { id: "opening-designer", role: "Designer", text: "I brought stickers, dramatic whitespace, and a legally distinct rainbow palette.", timestamp: timestamp() },
    ];
  },
  nextMessage(prompt, sequence) {
    const role = roles[sequence % roles.length];
    return { id: `${role}-${sequence}`, role, text: scripts[role](prompt), timestamp: timestamp() };
  },
};
