"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

export function ChatInput({ value, onChange, onSend, disabled }: Props) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
        placeholder="Womit soll ich dir heute Klarheit schaffen?"
        style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid #c8d1e7" }}
      />
      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        style={{ padding: "10px 14px", borderRadius: 10, border: "none", background: "#1d2433", color: "#fff" }}
      >
        Senden
      </button>
    </div>
  );
}
