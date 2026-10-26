import type { ModelMessage } from "ai";
import type { EvalData } from "../evals/types.js";

/**
 * Build the conversation messages from evaluation data.
 *
 * The system prompt is passed separately to generateText(),
 * so the returned messages contain only the user message.
 */
export const buildMessages = (
  data: Pick<EvalData, "prompt" | "systemPrompt">,
): ModelMessage[] => {
  return [
    {
      role: "user",
      content: data.prompt,
    },
  ];
};