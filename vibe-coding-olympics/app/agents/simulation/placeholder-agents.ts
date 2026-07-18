import type { Agent, AgentContext, AgentMessage, AgentRole } from "../types";

class PlaceholderAgent implements Agent {
  constructor(readonly role: AgentRole, private readonly copy: (idea: string) => string, private readonly openingCopy?: (idea: string) => string) {}

  respond({ request, sequence, timestamp }: AgentContext): AgentMessage {
    const text = sequence === 0 && this.openingCopy ? this.openingCopy(request.prompt) : this.copy(request.prompt);
    return { id: `${this.role}-${sequence}`, role: this.role, text, timestamp };
  }
}

export const plannerAgent = new PlaceholderAgent("Planner", (idea) => `Breaking “${idea}” into features, risks, and one suspiciously large button.`, (idea) => `The brief is in. We are building “${idea}”. I have alerted the tiny product roadmap.`);
export const designerAgent = new PlaceholderAgent("Designer", (idea) => `Moodboard acquired. ${idea} needs more sparkle and at least one emotionally available gradient.`, () => "I brought stickers, dramatic whitespace, and a legally distinct rainbow palette.");
export const frontendAgent = new PlaceholderAgent("Frontend", (idea) => `I have created twelve components for “${idea}” and named none of them Button. This is craftsmanship.`);
export const backendAgent = new PlaceholderAgent("Backend", (idea) => `The fake data layer for “${idea}” is scaling beautifully. It has not complained once because it does not exist.`);
export const qaAgent = new PlaceholderAgent("QA", (idea) => `I found a bug, a feature, and a philosophical question in “${idea}”. Filing all three as high priority.`);
export const judgeAgent = new PlaceholderAgent("Judge", (idea) => `Early verdict on “${idea}”: bold, confusing, and already dangerously pitchable.`);

export const placeholderAgents: Agent[] = [plannerAgent, designerAgent, frontendAgent, backendAgent, qaAgent, judgeAgent];
