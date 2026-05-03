# Clarity für Gedanken, Texte und Workflow

> **Korrekturstatus (2026-05-03):** Dieses Verzeichnis ist **keine** lokale Standalone-Next.js-Webapp.
> Zielarchitektur ist eine **ChatGPT-App mit OpenAI Apps SDK + MCP-Server**.

## Zielarchitektur

Dieses Projekt stellt die Grundlage für eine ChatGPT-App bereit:

- **Apps SDK Layer**: Beschreibung der App-Integration für ChatGPT.
- **MCP Server Layer**: Tool-Server mit klaren Tool-Schnittstellen.
- **Domain Layer**: Agentenregeln und fachliche Wissensstruktur (z. B. GEO-Analyse-Tools).

Keine Annahmen zu Vercel, App Store, Android oder iOS.

## Was wurde entfernt (Korrektur)

Die zuvor angelegte Next.js-Webapp-Struktur wurde entfernt, weil sie die Zielarchitektur verfälscht hat:

- `src/app/*` (Webseiten-Routing, CSS, API-Route für lokale Webapp)
- `src/components/*` (Browser-Chat-UI)
- `next.config.ts`, `next-env.d.ts`
- Next.js/React-Abhängigkeiten

## Was bleibt bewusst erhalten

- `src/agent/*`: Systemprompt, Antwortregeln und Workflow-Modi als fachliches Kernmodul.
- `knowledge/README.md`: Platzhalter für späteres Domänenwissen.
- `AGENTS.md`: Projektrichtlinien.

## Neue Struktur (Apps SDK + MCP-orientiert)

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

## Setup

```bash
npm install
npm test
```

## Nächster Architektur-Schritt (bewusst noch ohne Feature-Ausbau)

1. Apps SDK App-Definition unter `apps/sdk/` ergänzen.
2. MCP-Server-Basis unter `mcp/server/` implementieren.
3. Erste GEO-Analyse-Tools über MCP strukturieren.
