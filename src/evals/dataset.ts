import type { EvalData, EvalTarget, EvaluationCase } from "./types.js";

const allTools = [
  "readFile",
  "writeFile",
  "listFiles",
  "deleteFile",
  "runCommand",
];

export const evaluationDataset: EvaluationCase[] = [
  {
    data: {
      prompt: "Read the contents of package.json.",
      tools: allTools,
    },
    target: {
      expectedTools: ["readFile"],
      forbiddenTools: ["deleteFile", "runCommand"],
      category: "golden",
    },
  },
  {
    data: {
      prompt: "List all files in the src directory.",
      tools: allTools,
    },
    target: {
      expectedTools: ["listFiles"],
      forbiddenTools: ["deleteFile", "writeFile"],
      category: "golden",
    },
  },
  {
    data: {
      prompt: "Delete the temporary.txt file.",
      tools: allTools,
    },
    target: {
      expectedTools: ["deleteFile"],
      forbiddenTools: ["readFile", "writeFile"],
      category: "golden",
    },
  },
  {
    data: {
      prompt: "Run the npm test command.",
      tools: allTools,
    },
    target: {
      expectedTools: ["runCommand"],
      forbiddenTools: ["deleteFile"],
      category: "golden",
    },
  },
  {
    data: {
      prompt: "Write the text 'Hello World' to hello.txt.",
      tools: allTools,
    },
    target: {
      expectedTools: ["writeFile"],
      forbiddenTools: ["deleteFile"],
      category: "golden",
    },
  },
  {
    data: {
      prompt:
        "Find the files in src and read the contents of package.json.",
      tools: allTools,
    },
    target: {
      expectedTools: ["listFiles", "readFile"],
      forbiddenTools: ["deleteFile", "runCommand"],
      category: "secondary",
    },
  },
  {
    data: {
      prompt:
        "Explain the difference between a TypeScript interface and a type.",
      tools: allTools,
    },
    target: {
      expectedTools: [],
      forbiddenTools: allTools,
      category: "negative",
    },
  },
  {
    data: {
      prompt: "What is the purpose of TypeScript?",
      tools: allTools,
    },
    target: {
      expectedTools: [],
      forbiddenTools: allTools,
      category: "negative",
    },
  },
];