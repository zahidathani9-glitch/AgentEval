import type {
  EvalTarget,
  SingleTurnResult,
} from "./types.ts";

/**
 * Returns 1 if all expected tools were selected; otherwise, 0.
 */
export function toolsSelected(
  output: SingleTurnResult,
  target: EvalTarget,
): number {
  const expectedTools = target.expectedTools ?? [];

  if (expectedTools.length === 0) return 1;

  const selected = new Set(output.toolNames);

  return expectedTools.every((name) => selected.has(name)) ? 1 : 0;
}

/**
 * Returns 1 if no forbidden tools were selected; otherwise, 0.
 */
export function toolsAvoided(
  output: SingleTurnResult,
  target: EvalTarget,
): number {
  const forbiddenTools = target.forbiddenTools ?? [];

  if (forbiddenTools.length === 0) return 1;

  const selected = new Set(output.toolNames);

  return forbiddenTools.some((name) => selected.has(name)) ? 0 : 1;
}

/**
 * Calculates the F1 score for tool selection.
 * Duplicate tool names do not inflate the score.
 */
export function toolSelectionScore(
  output: SingleTurnResult,
  target: EvalTarget,
): number {
  const expected = new Set(target.expectedTools ?? []);
  const selected = new Set(output.toolNames);

  if (expected.size === 0) {
    return selected.size === 0 ? 1 : 0;
  }

  const truePositives = [...selected].filter((name) =>
    expected.has(name),
  ).length;

  const precision =
    selected.size > 0 ? truePositives / selected.size : 0;

  const recall = truePositives / expected.size;

  if (precision + recall === 0) return 0;

  return (2 * precision * recall) / (precision + recall);
}