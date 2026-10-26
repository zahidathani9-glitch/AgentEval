import { z } from "zod";

export const TOOL_DEFINITIONS = {
  // File tools
  readFile: {
    description: "Read the contents of a file at the specified path",
    parameters: z.object({
      path: z.string().describe("The path to the file to read"),
    }),
  },

  writeFile: {
    description: "Write content to a file at the specified path",
    parameters: z.object({
      path: z.string().describe("The path to the file to write"),
      content: z.string().describe("The content to write to the file"),
    }),
  },

  listFiles: {
    description: "List all files in a directory",
    parameters: z.object({
      path: z.string().describe("The directory path to list files from"),
    }),
  },

  deleteFile: {
    description: "Delete a file at the specified path",
    parameters: z.object({
      path: z.string().describe("The path to the file to delete"),
    }),
  },

  // Shell tools
  runCommand: {
    description: "Execute a shell command and return its output",
    parameters: z.object({
      command: z.string().describe("The shell command to execute"),
    }),
  },
} as const;

export type ToolName = keyof typeof TOOL_DEFINITIONS;