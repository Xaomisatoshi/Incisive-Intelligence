import { systemPrompt } from "./systemPrompt";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export function buildAgentMessages(history: ChatMessage[]) {
  return [{ role: "system", content: systemPrompt as string }, ...history];
}
