import { runAgent } from "./agent/run.js";

async function main() {
  const prompts = [
    "Read the contents of package.json.",
    "List all files in the src directory.",
    "Delete the temporary.txt file.",
    "Run the npm test command.",
    "Explain what TypeScript interfaces are.",
  ];

  for (const prompt of prompts) {
    const result = await runAgent(prompt);

    console.log("\nPrompt:", prompt);
    console.log("Selected tools:", result.toolNames);
    console.log("Selected any:", result.selectedAny);
  }
}

main().catch(console.error);