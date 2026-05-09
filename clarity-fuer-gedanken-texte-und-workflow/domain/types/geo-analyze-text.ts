export type GeoAnalyzeTextInput = {
  text: string;
  projectName?: string;
  targetAudience?: string;
};

export type GeoAnalyzeTextOutput = {
  kurzdefinition: string;
  erkannte_entitaeten: string[];
  unklare_begriffe: string[];
  fehlende_faq_fragen: string[];
  ki_lesbare_zusammenfassung: string;
  optimierungsempfehlungen: string[];
};
