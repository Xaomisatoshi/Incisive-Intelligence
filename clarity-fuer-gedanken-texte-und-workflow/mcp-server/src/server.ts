import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { geoAnalyzeTextTool } from "./tools/geo_analyze_text";

type JsonRpcRequest = {
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
};

function toolDefinition() {
  return {
    name: geoAnalyzeTextTool.name,
    description: geoAnalyzeTextTool.description,
    inputSchema: geoAnalyzeTextTool.inputSchema
  };
}


export async function createMcpServer() {
  const [{ Server }, { StdioServerTransport }, { CallToolRequestSchema, ListToolsRequestSchema }] = await Promise.all([
    import("@modelcontextprotocol/sdk/server/index.js"),
    import("@modelcontextprotocol/sdk/server/stdio.js"),
    import("@modelcontextprotocol/sdk/types.js")
  ]);

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
    tools: [toolDefinition()]
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request: { params: { name: string; arguments?: unknown } }) => {
    if (request.params.name !== geoAnalyzeTextTool.name) {
      throw new Error(`Unknown tool: ${request.params.name}`);
    }

    const input = request.params.arguments ?? {};
    const result = await geoAnalyzeTextTool.handler(input);

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
      structuredContent: result
    };
  });

  return { server, StdioServerTransport };
}

async function handleMcpJsonRpc(body: JsonRpcRequest) {
  if (body.method === "tools/list") {
    return { tools: [toolDefinition()] };
  }

  if (body.method === "tools/call") {
    const name = body.params?.name;
    const args = body.params?.arguments ?? {};

    if (name !== geoAnalyzeTextTool.name) {
      throw new Error(`Unknown tool: ${String(name)}`);
    }

    const result = await geoAnalyzeTextTool.handler(args);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result)
        }
      ],
      structuredContent: result
    };
  }

  throw new Error(`Unsupported method: ${body.method}`);
}

async function readJsonBody(req: IncomingMessage): Promise<JsonRpcRequest> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as JsonRpcRequest;
}

export function createHttpServer() {
  return createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/health" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ status: "ok" }));
      return;
    }

    if (req.url === "/mcp" && req.method === "POST") {
      try {
        const body = await readJsonBody(req);
        const result = await handleMcpJsonRpc(body);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            jsonrpc: "2.0",
            id: body.id ?? null,
            result
          })
        );
        return;
      } catch (error) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            jsonrpc: "2.0",
            id: null,
            error: {
              code: -32000,
              message: error instanceof Error ? error.message : "Unknown error"
            }
          })
        );
        return;
      }
    }

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  });
}

export async function main(): Promise<void> {
  const mode = process.env.MCP_TRANSPORT ?? "http";

  if (mode === "stdio") {
    const { server, StdioServerTransport } = await createMcpServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    return;
  }

  const port = Number(process.env.PORT ?? 8080);
  const server = createHttpServer();

  await new Promise<void>((resolve) => {
    server.listen(port, () => resolve());
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Failed to start MCP server", error);
    process.exit(1);
  });
}
