import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { geoAnalyzeTextTool } from "./tools/geo_analyze_text";

export function createMcpServer(): Server {
  const server = new Server(
    {
      name: "clarity-mcp-server",
      version: "0.1.0"
    },
    {
      capabilities: {
        tools: {}
      }
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: geoAnalyzeTextTool.name,
        description: geoAnalyzeTextTool.description,
        inputSchema: geoAnalyzeTextTool.inputSchema
      }
    ]
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name !== geoAnalyzeTextTool.name) {
      throw new Error(`Unknown tool: ${request.params.name}`);
    }

    const input = request.params.arguments ?? {};
    const result = await geoAnalyzeTextTool.handler(input);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result)
        }
      ],
      structuredContent: result
    };
  });

  return server;
}

export async function main(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Failed to start MCP server", error);
    process.exit(1);
  });
}
