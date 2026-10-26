import "dotenv/config";

import { generateText, stepCountIs, dynamicTool, type ToolSet } from "ai";
import { groq } from "@ai-sdk/groq";

import { TOOL_DEFINITIONS } from "./tools.js";

const model = groq("openai/gpt-oss-20b");

const SYSTEM_PROMPT = `
You are an AI coding agent.

You have access to file-operation and shell-operation tools.

Choose tools based on the user's request.
Only select tools that are necessary to fulfill the request.
Do not select a tool if the request does not require one.

Do not claim that a file was changed or a command was executed.
In this environment, tools are used to evaluate tool selection.
`;

export async function runAgent(
  prompt: string,
  availableTools: string[] = Object.keys(TOOL_DEFINITIONS),
  systemPrompt: string = SYSTEM_PROMPT,
) {
  const tools: ToolSet = {};

  for (const name of availableTools) {
    const definition =
      TOOL_DEFINITIONS[name as keyof typeof TOOL_DEFINITIONS];

    if (!definition) {
      throw new Error(`Unknown tool: ${name}`);
    }

    tools[name] = dynamicTool({
      description: definition.description,
      inputSchema: definition.parameters,
    });
  }

  const result = await generateText({
    model,
    system: systemPrompt,
    prompt,
    tools,
    stopWhen: stepCountIs(1),
    temperature: 0,
  });

  const toolCalls = result.toolCalls.map((call) => ({
    toolName: call.toolName,
    args: call.input,
  }));

  return {
    output: result.text,
    toolCalls,
    toolNames: toolCalls.map((call) => call.toolName),
    selectedAny: toolCalls.length > 0,
  };
}