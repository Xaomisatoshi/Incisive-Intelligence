export const geoAnalyzeTextInputSchema = {
  type: "object",
  required: ["text"],
  properties: {
    text: { type: "string" },
    projectName: { type: "string" },
    targetAudience: { type: "string" }
  },
  additionalProperties: false
} as const;

export const geoAnalyzeTextOutputSchema = {
  type: "object",
  required: [
    "kurzdefinition",
    "erkannte_entitaeten",
    "unklare_begriffe",
    "fehlende_faq_fragen",
    "ki_lesbare_zusammenfassung",
    "optimierungsempfehlungen"
  ],
  properties: {
    kurzdefinition: { type: "string" },
    erkannte_entitaeten: { type: "array", items: { type: "string" } },
    unklare_begriffe: { type: "array", items: { type: "string" } },
    fehlende_faq_fragen: { type: "array", items: { type: "string" } },
    ki_lesbare_zusammenfassung: { type: "string" },
    optimierungsempfehlungen: { type: "array", items: { type: "string" } }
  },
  additionalProperties: false
} as const;
