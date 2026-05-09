import { describe, expect, it } from "vitest";
import { geoAnalyzeText } from "../../domain/geo/geo_analyze_text";

describe("geoAnalyzeText", () => {
  it("liefert immer alle sechs Output-Felder", () => {
    const result = geoAnalyzeText({
      text: "GEO Optimierung für Digital Dreams verbessert die Sichtbarkeit bei KI-Systemen.",
      projectName: "Digital Dreams",
      targetAudience: "Content Teams"
    });

    expect(result).toHaveProperty("kurzdefinition");
    expect(result).toHaveProperty("erkannte_entitaeten");
    expect(result).toHaveProperty("unklare_begriffe");
    expect(result).toHaveProperty("fehlende_faq_fragen");
    expect(result).toHaveProperty("ki_lesbare_zusammenfassung");
    expect(result).toHaveProperty("optimierungsempfehlungen");
  });
});
