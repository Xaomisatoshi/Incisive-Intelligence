# Clarity für Gedanken, Texte und Workflow

> **Korrekturstatus (2026-05-03):** Dieses Projekt ist **keine lokale Standalone-Next.js-Webapp**.
> Ziel ist eine **ChatGPT-App mit OpenAI Apps SDK und MCP-Server-Struktur**.

## Zielarchitektur

Das Repository ist auf drei Ebenen ausgerichtet:

1. **Apps SDK Layer** (`apps/sdk/`): App-Definition und Bindings für ChatGPT.
2. **MCP Server Layer** (`mcp/server/`): Tool-Server und Tool-Registrierung.
3. **Domain Layer** (`src/agent/`): Agentenlogik (Prompt, Regeln, Workflow-Modi, GEO-Bezug).

Es gibt **keine** Annahme zu Vercel, Android, iOS oder App-Store-Distribution.

## Merge-Konflikt-Entscheidungen (konsolidiert)

Bei konfliktträchtigen Dateien wurde konsequent die Architekturvariante **Apps SDK + MCP** priorisiert:

- `.env.example`: auf Apps-SDK/MCP-Betrieb vorbereitet.
- `package.json`: nur TypeScript + Vitest Tooling; **keine** React/Next-Abhängigkeiten.
- `tsconfig.json`: neutrales TypeScript-Setup für Agenten-/Server-Code.
- `README.md`: eindeutige Abgrenzung gegen lokale Webapp.

## Was explizit entfernt bleibt

Folgende Webapp-Artefakte sind **nicht Teil** dieses Projekts:

- `next`, `react`, `react-dom`
- `next.config.ts`, `next-env.d.ts`
- `src/app/*`
- `src/components/*`
- lokale Webapp-API-Routen

## Projektstruktur

```text
clarity-fuer-gedanken-texte-und-workflow
  apps/
    sdk/
      README.md
  mcp/
    server/
      README.md
      tools/
        geo-analysis.md
  src/
    agent/
      systemPrompt.ts
      responseRules.ts
      workflowModes.ts
      index.ts
  knowledge/
    README.md
  tests/
    agent-behavior.test.ts
  AGENTS.md
  package.json
  tsconfig.json
  .env.example
```

## Lokale Checks

```bash
npm install
npm run typecheck
npm test
```

> Hinweis: In eingeschränkten CI/Sandbox-Umgebungen kann `npm install` durch Registry-Policies fehlschlagen.
