
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

    if (request.params.name !== geoAnalyzeTextTool.name) {
      throw new Error(`Unknown tool: ${request.params.name}`);
    }

    const input = request.params.arguments ?? {};
    const result = await geoAnalyzeTextTool.handler(input);

    return {

}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Failed to start MCP server", error);
    process.exit(1);
  });
}
