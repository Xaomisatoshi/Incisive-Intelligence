import { geoAnalyzeText } from "../../../domain/geo/geo_analyze_text";
import type { GeoAnalyzeTextInput } from "../../../domain/types/geo-analyze-text";
import { geoAnalyzeTextInputSchema, geoAnalyzeTextOutputSchema } from "../schemas/geo_analyze_text.schema";

function parseGeoAnalyzeTextInput(rawInput: unknown): GeoAnalyzeTextInput {
  if (typeof rawInput !== "object" || rawInput === null || !("text" in rawInput)) {
    throw new Error("Invalid input: text ist erforderlich.");
  }

  const input = rawInput as Record<string, unknown>;

  if (typeof input.text !== "string") {
    throw new Error("Invalid input: text muss ein String sein.");
  }

  return {
    text: input.text,
    projectName: typeof input.projectName === "string" ? input.projectName : undefined,
    targetAudience: typeof input.targetAudience === "string" ? input.targetAudience : undefined
  };
}

export const geoAnalyzeTextTool = {
  name: "geo_analyze_text",
  description: "Analysiert GEO-Text und liefert strukturierte Optimierungshinweise.",
  inputSchema: geoAnalyzeTextInputSchema,
  outputSchema: geoAnalyzeTextOutputSchema,
  handler: async (input: unknown) => geoAnalyzeText(parseGeoAnalyzeTextInput(input))
};
