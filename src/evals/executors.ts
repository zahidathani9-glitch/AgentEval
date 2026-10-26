import { generateText, stepCountIs, dynamicTool, type ToolSet } from "ai";
import { groq } from "@ai-sdk/groq";

import { TOOL_DEFINITIONS } from "../agent/tools.js";
import { buildMessages } from "../utils/utils.js";
import type { EvalData, SingleTurnResult } from "./types.js";

export async function singleTurnWithMocks(
  data: EvalData,
): Promise<SingleTurnResult> {
  // Build the conversation messages from the evaluation input.
  const messages = buildMessages(data);

  // Create only the tools available for this evaluation case.
  const tools: ToolSet = {};

  for (const toolName of data.tools) {
    const def = TOOL_DEFINITIONS[toolName as keyof typeof TOOL_DEFINITIONS];


    if (!def) {
      throw new Error(`Unknown tool in evaluation dataset: ${toolName}`);
    }

    tools[toolName] = dynamicTool({
      description: def.description,
      inputSchema: def.parameters,
      // Intentionally no execute function.
      // We want to evaluate tool selection, not execute real operations.
    });
  }

  // Ask the model to select tools for the given prompt.
  const result = await generateText({
    model: groq(data.config?.model ?? "openai/gpt-oss-20b"),
    messages,
    tools,
    stopWhen: stepCountIs(1),
    ...(data.config?.temperature !== undefined
      ? { temperature: data.config.temperature }
      : {}),
  });

  // Extract the selected tool calls and their arguments.
  const toolCalls = result.toolCalls.map((call) => ({
    toolName: call.toolName,
    args: call.input,
  }));

  const toolNames = toolCalls.map((call) => call.toolName);

  return {
    toolCalls,
    toolNames,
    selectedAny: toolNames.length > 0,
  };
}