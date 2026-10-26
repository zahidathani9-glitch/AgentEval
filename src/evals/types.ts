export interface EvalData {
  prompt: string;
  systemPrompt?: string;
  tools: string[];
  config?: {
    model?: string;
    temperature?: number;
  };
}

export interface EvalTarget {
  expectedTools?: string[];
  forbiddenTools?: string[];
  category: "golden" | "secondary" | "negative";
}

export interface EvaluationCase {
  data: EvalData;
  target: EvalTarget;
}

export interface SingleTurnResult {
  toolCalls: Array<{
    toolName: string;
    args: unknown;
  }>;
  toolNames: string[];
  selectedAny: boolean;
}