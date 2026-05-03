import type { GeoAnalyzeTextInput, GeoAnalyzeTextOutput } from "../types/geo-analyze-text";

const DEFAULT_SHORT_DEF = "Kurzdefinition konnte aus dem Text nicht eindeutig abgeleitet werden.";

function tokenizeEntities(text: string): string[] {
  const candidates = text.match(/\b[A-ZÄÖÜ][A-Za-zÄÖÜäöüß0-9_-]{2,}\b/g) ?? [];
  return [...new Set(candidates)].slice(0, 12);
}

function findUnclearTerms(text: string): string[] {
  const words = text.match(/\b[a-zA-ZÄÖÜäöüß]{8,}\b/g) ?? [];
  return [...new Set(words.filter((w) => /[A-Z]{2,}/.test(w) || w.includes("/") || w.includes("-")))].slice(0, 8);
}

function buildMissingFaqs(input: GeoAnalyzeTextInput): string[] {
  const project = input.projectName ?? "dieses Projekt";
  const audience = input.targetAudience ?? "die Zielgruppe";
  return [
    `Was ist das konkrete Ergebnisziel für ${project}?`,
    `Welche Probleme von ${audience} werden zuerst gelöst?`,
    "Welche Datenquellen werden für die Analyse verwendet?",
    "Wie wird die Qualität der Ergebnisse gemessen?"
  ];
}

export function geoAnalyzeText(input: GeoAnalyzeTextInput): GeoAnalyzeTextOutput {
  const text = (input.text ?? "").trim();
  const normalized = text.replace(/\s+/g, " ");
  const firstSentence = normalized.split(/[.!?]/).find((s) => s.trim().length > 0)?.trim();

  const erkannte_entitaeten = tokenizeEntities(normalized);
  const unklare_begriffe = findUnclearTerms(normalized);
  const fehlende_faq_fragen = buildMissingFaqs(input);

  return {
    kurzdefinition: firstSentence ? firstSentence.slice(0, 180) : DEFAULT_SHORT_DEF,
    erkannte_entitaeten,
    unklare_begriffe,
    fehlende_faq_fragen,
    ki_lesbare_zusammenfassung: normalized || "Kein analysierbarer Inhalt übergeben.",
    optimierungsempfehlungen: [
      "Zentrale Begriffe früh definieren und konsistent verwenden.",
      "Zielgruppe und Nutzen explizit in 1-2 Sätzen benennen.",
      "FAQ-Abschnitt mit häufigen Einwänden ergänzen."
    ]
  };
}
