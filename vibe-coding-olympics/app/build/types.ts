export type BuildDuration = 1 | 3 | 5 | 10;

export interface BuildRequest {
  prompt: string;
  duration: BuildDuration;
}

export interface BuildProgress {
  percent: number;
  secondsRemaining: number;
  stage: string;
  isComplete: boolean;
}
