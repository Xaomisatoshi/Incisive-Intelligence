import { geoAnalyzeText } from "../../../domain/geo/geo_analyze_text";
import type { GeoAnalyzeTextInput } from "../../../domain/types/geo-analyze-text";
import { geoAnalyzeTextInputSchema, geoAnalyzeTextOutputSchema } from "../schemas/geo_analyze_text.schema";

export const geoAnalyzeTextTool = {
  name: "geo_analyze_text",
  description: "Analysiert GEO-Text und liefert strukturierte Optimierungshinweise.",
  inputSchema: geoAnalyzeTextInputSchema,
  outputSchema: geoAnalyzeTextOutputSchema,
  handler: async (input: GeoAnalyzeTextInput) => geoAnalyzeText(input)
};
