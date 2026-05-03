# Clarity für Gedanken, Texte und Workflow

ChatGPT-App-Basis für **GEO / Digital Dreams / Clarity** mit einem lokalen MCP-Server als Tool-Layer.

> Dieses Repository ist **keine** lokale Webapp (kein Next.js, kein React, keine mobile App).

## Was die App macht
- stellt das zentrale Tool **`geo_analyze_text`** bereit
- analysiert GEO-Text und liefert strukturierte Hinweise für Optimierung
- trennt App-Konfiguration, MCP-Tooling und Domain-Logik klar in Layer

## Architektur
- `apps-sdk/`
  - App-Metadaten und MCP-Startkonfiguration (`app.config.json`)
- `mcp-server/`
  - lauffähiger MCP-Server über STDIO
  - Registrierung und Ausführung von `geo_analyze_text`
- `domain/`
  - fachliche Kernlogik (`geoAnalyzeText`)
- `src/agent/`
  - Agentenregeln/-texte für Clarity-Kontext

## Nutzung
### 1) Abhängigkeiten installieren
```bash
npm install
```

### 2) MCP-Server lokal starten
```bash
npm run mcp:dev
```
oder
```bash
npm run mcp:start
```

Der Server läuft über STDIO und stellt das Tool `geo_analyze_text` für MCP-Clients bereit.

### 3) Tests ausführen
```bash
npm test
```

## Wichtige Klarstellung
- Keine lokale Weboberfläche in diesem Repo.
- Die eigentliche App-Ausführung erfolgt später **innerhalb von ChatGPT** über **Apps SDK + MCP**.

## MCP-Server lokal starten
Der MCP-Server ist lokal per STDIO startbar und registriert das Tool `geo_analyze_text`.

1. Abhängigkeiten installieren:
   - `npm install`
2. Entwicklungsstart:
   - `npm run mcp:dev`
3. Start (alias):
   - `npm run mcp:start`

Hinweis: Es gibt bewusst keine lokale Webapp/UI. Die spätere App-Ausführung erfolgt innerhalb von ChatGPT über **Apps SDK + MCP**.

## Legacy
Alte Referenzartefakte liegen in `../legacy/` und sind nicht Teil der Zielarchitektur.
