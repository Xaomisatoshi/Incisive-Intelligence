import { NextResponse } from "next/server";
import { buildAgentMessages, type ChatMessage } from "@/agent";
import { DEFAULT_MODEL, getOpenAIClient } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    const history = body.messages ?? [];

    if (!Array.isArray(history) || history.some((m) => !m?.role || !m?.content)) {
      return NextResponse.json({ error: "Ungültiges Nachrichtenformat." }, { status: 400 });
    }

    const input = buildAgentMessages(history).map((m) => ({ role: m.role, content: m.content }));

    const response = await getOpenAIClient().responses.create({
      model: DEFAULT_MODEL,
      input
    });

    const text = response.output_text?.trim();

    return NextResponse.json({ message: text || "Ich konnte gerade keine Antwort erzeugen." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Serverfehler bei der Chat-Anfrage." }, { status: 500 });
  }
}
