import "dotenv/config";

import { evaluate, Laminar } from "@lmnr-ai/lmnr";

import {
  toolsSelected,
  toolsAvoided,
  toolSelectionScore,
} from "./evaluators.js";

import type {
  EvalData,
  EvalTarget,
  SingleTurnResult,
} from "./types.js";

import { evaluationDataset } from "./dataset.js";
import { singleTurnWithMocks } from "./executors.js";



const projectApiKey = process.env.LMNR_PROJECT_API_KEY;

if (!projectApiKey) {
  throw new Error(
    "LMNR_PROJECT_API_KEY is missing. Check your .env file.",
  );
}

console.log("1. Starting Laminar initialization");

Laminar.initialize({ projectApiKey });

console.log("2. Laminar initialization called");

const executor = async (data: EvalData): Promise<SingleTurnResult> => {
  console.log("EXECUTOR: calling Groq for:", data.prompt);

  try {
    const result = await singleTurnWithMocks(data);
    console.log("EXECUTOR: Groq call succeeded");
    return result;
  } catch (error) {
    console.error("EXECUTOR FAILED:", error);
    throw error;
  }
};
console.log("3. Starting evaluation");

evaluate({
  data: evaluationDataset,

  executor,

  evaluators: {
  toolsSelected: (
    output: SingleTurnResult,
    target?: EvalTarget,
  ) => {
    if (!target || target.category !== "golden") return 1;

    return toolsSelected(output, target);
  },

  toolsAvoided: (
    output: SingleTurnResult,
    target?: EvalTarget,
  ) => {
    if (!target || target.category !== "negative") return 1;

    return toolsAvoided(output, target);
  },

  selectionScore: (
    output: SingleTurnResult,
    target?: EvalTarget,
  ) => {
    if (!target || target.category !== "secondary") return 1;

    return toolSelectionScore(output, target);
  },
},
});