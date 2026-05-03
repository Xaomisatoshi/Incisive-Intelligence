import type { ChatMessage } from "@/agent";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "75%",
        background: isUser ? "#2f67ff" : "#ffffff",
        color: isUser ? "#fff" : "#111",
        borderRadius: 12,
        padding: "10px 12px",
        marginBottom: 8,
        boxShadow: "0 1px 4px rgba(0,0,0,.08)"
      }}
    >
      {message.content}
    </div>
  );
}
