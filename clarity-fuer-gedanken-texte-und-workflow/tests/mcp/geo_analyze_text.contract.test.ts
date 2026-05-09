import { describe, expect, it } from "vitest";
import { geoAnalyzeTextTool } from "../../mcp-server/src/tools/geo_analyze_text";

describe("geo_analyze_text MCP contract", () => {
  it("registriert den korrekten Toolnamen", () => {
    expect(geoAnalyzeTextTool.name).toBe("geo_analyze_text");
  });

  it("fordert text im Input-Schema", () => {
    expect(geoAnalyzeTextTool.inputSchema.required).toContain("text");
  });

  it("liefert alle sechs Output-Felder", async () => {
    const result = await geoAnalyzeTextTool.handler({ text: "Testinhalt für GEO" });

    expect(result).toHaveProperty("kurzdefinition");
    expect(result).toHaveProperty("erkannte_entitaeten");
    expect(result).toHaveProperty("unklare_begriffe");
    expect(result).toHaveProperty("fehlende_faq_fragen");
    expect(result).toHaveProperty("ki_lesbare_zusammenfassung");
    expect(result).toHaveProperty("optimierungsempfehlungen");
  });
});
