"use client";

import { useState } from "react";
import type { ChatMessage } from "@/agent";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";

const welcome = "Hallo, ich bin CHILL-SENSEI. Ich helfe dir ruhig und klar beim Ordnen deiner Gedanken, Texte und Workflows.";

export function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: welcome }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    const content = input.trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user", content } as ChatMessage];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      });
      const data = (await res.json()) as { message?: string; error?: string };
      const answer = data.message || data.error || "Keine Antwort erhalten.";
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Netzwerkfehler. Bitte erneut versuchen." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ width: "min(860px, 100%)", margin: "0 auto", background: "#eef2fb", borderRadius: 16, padding: 16 }}>
      <div style={{ minHeight: 380, display: "flex", flexDirection: "column", marginBottom: 12 }}>
        {messages.map((message, index) => (
          <MessageBubble key={`${message.role}-${index}`} message={message} />
        ))}
      </div>
      <ChatInput value={input} onChange={setInput} onSend={send} disabled={loading} />
    </section>
  );
}
