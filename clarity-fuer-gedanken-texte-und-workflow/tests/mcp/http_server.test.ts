import { afterEach, describe, expect, it } from "vitest";
import { createHttpServer } from "../../mcp-server/src/server";

let server: ReturnType<typeof createHttpServer> | null = null;

afterEach(async () => {
  if (server) {
    await new Promise<void>((resolve, reject) => {
      server?.close((error) => (error ? reject(error) : resolve()));
    });
    server = null;
  }
});

describe("MCP HTTP server", () => {
  it("liefert /health", async () => {
    server = createHttpServer();
    await new Promise<void>((resolve) => server?.listen(0, resolve));

    const address = server.address();
    if (!address || typeof address === "string") throw new Error("No address");

    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
  });

  it("liefert tools/list über /mcp", async () => {
    server = createHttpServer();
    await new Promise<void>((resolve) => server?.listen(0, resolve));

    const address = server.address();
    if (!address || typeof address === "string") throw new Error("No address");

    const response = await fetch(`http://127.0.0.1:${address.port}/mcp`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} })
    });

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.result.tools[0].name).toBe("geo_analyze_text");
  });
});
