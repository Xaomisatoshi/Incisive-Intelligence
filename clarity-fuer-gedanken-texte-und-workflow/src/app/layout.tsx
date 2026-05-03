import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clarity für Gedanken, Texte und Workflow",
  description: "Chat-Oberfläche für CHILL-SENSEI"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
