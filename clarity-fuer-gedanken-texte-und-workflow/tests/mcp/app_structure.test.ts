import { describe, expect, it } from "vitest";
import { getAppConfig } from "../../apps-sdk/src/index";
import { geoAnalyzeTextTool } from "../../mcp-server/src/tools/geo_analyze_text";

describe("App-Struktur", () => {
  it("verweist im Apps-SDK auf das MCP-Startkommando", () => {
    const config = getAppConfig();
    expect(config.mcp.command).toBe("npm");
    expect(config.mcp.args).toEqual(["run", "mcp:start"]);
  });

  it("führt geo_analyze_text als zentrales Tool", () => {
    const config = getAppConfig();
    expect(config.mcp.toolNames).toContain("geo_analyze_text");
    expect(geoAnalyzeTextTool.name).toBe("geo_analyze_text");
  });
});
