import { describe, expect, it } from "vitest";
import { systemPrompt } from "../src/agent/systemPrompt";
import { responseRules } from "../src/agent/responseRules";

describe("Agentenverhalten", () => {
  it("enthält die Rollenidentität", () => {
    expect(systemPrompt).toContain("CHILL-SENSEI");
  });

  it("enthält den Produktnamen", () => {
    expect(systemPrompt).toContain("Clarity für Gedanken, Texte und Workflow");
  });

  it("fordert nächste Schritte", () => {
    expect(responseRules.join(" ")).toContain("nächsten Schritten");
  });
});
