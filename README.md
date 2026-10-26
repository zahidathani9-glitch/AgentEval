# AgentEval

An experimental evaluation framework for testing AI agent tool-selection behavior.

## The Problem

AI agents can behave differently across runs. They may select unnecessary tools, miss required tools, or call tools when a request can be answered directly.

AgentEval explores how structured evaluations can help measure and improve tool-selection behavior.

## What It Evaluates

The initial dataset contains eight test cases covering:

- Individual tool selection
- Requests requiring multiple tools
- Requests that should not require tool usage
- Avoidance of inappropriate tool calls

## Available Tools

| Tool | Purpose |
|---|---|
| `readFile` | Read file contents |
| `writeFile` | Write content to a file |
| `listFiles` | List directory contents |
| `deleteFile` | Delete a file |
| `runCommand` | Execute a shell command |

## Evaluation Metrics

- **Tool selection:** Checks whether the expected tools were selected.
- **Tool avoidance:** Checks whether forbidden tools were avoided.
- **Selection F1:** Measures the balance between precision and recall when selecting tools.

Laminar is used to track evaluation runs and inspect individual test cases.

## Current Status

The initial implementation runs eight test cases and records evaluation results.

This is an experimental prototype. The dataset and scoring methodology need further validation before the results can be used to make broad claims about agent reliability.

## Planned Improvements

- Expand the evaluation dataset.
- Evaluate tool arguments as well as tool names.
- Improve score aggregation and reporting.
- Test consistency across repeated runs.
- Explore multi-step agent evaluations.

## Getting Started

### Prerequisites

- Node.js
- A Groq API key
- A Laminar project API key

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/AgentEval.git
cd AgentEval
npm install
```

Create a local `.env` file with the required credentials:

```env
GROQ_API_KEY=your_groq_api_key
LMNR_PROJECT_API_KEY=your_laminar_project_api_key
```

Never commit your `.env` file.

### Run the agent

```bash
npx tsx src/agent/run.ts
```

Check the actual command and required arguments against the project's implementation.

### Run the evaluation

```bash
npx tsx src/evals/file-tools.evals.ts
```

## Tech Stack

- TypeScript
- Node.js
- Vercel AI SDK
- Groq
- Zod
- Laminar

## Disclaimer

AgentEval is a learning project exploring AI agent evaluation. Its initial dataset is small and does not establish production-level reliability.

## License

MIT
