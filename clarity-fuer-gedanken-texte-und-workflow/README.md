# Clarity für Gedanken, Texte und Workflow

Dieses Projekt ist **keine lokale Next.js-/React-Webapp mehr**.

## Ziel
Migration zu einer ChatGPT-App-Architektur mit:
- **Apps SDK Layer** (Vorbereitung für ChatGPT-Integration)
- **MCP Server Layer** (Tools und Schemas)
- **Domain Layer** (fachliche GEO-/Agentenlogik)

## Aktueller Fokus (Arbeitspaket 1)
- Domain-Grundfunktion `geo_analyze_text`
- MCP-Server-Grundstruktur mit Tool- und Schema-Datei
- Apps-SDK-Vorbereitungsordner

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
Alte Referenzartefakte wurden nach `../legacy/` verschoben:
- `legacy/server.js`
- `legacy/package.txt`

Diese Dateien dienen nur noch als historische Referenz und sind nicht Teil der Zielarchitektur.
