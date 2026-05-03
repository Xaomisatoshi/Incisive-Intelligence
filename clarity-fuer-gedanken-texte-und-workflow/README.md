# Clarity für Gedanken, Texte und Workflow

Repo-seitiger MVP-Release-Stand für die **GEO / Digital Dreams / Clarity ChatGPT-App** auf Basis von **Apps SDK + MCP**.
Stand: Dieser Branch bildet den finalen MVP-Repository-Stand (ohne lokale Webapp/UI).

> Dieses Repository ist **keine** lokale Webapp (kein Next.js, kein React, keine mobile App).

## Was die App macht
Die App nutzt die vorhandene App-/Tool-Struktur (Apps SDK + MCP + Domain) und stellt das zentrale MCP-Tool **`geo_analyze_text`** bereit.

Eingabe:
- `text` (erforderlich)
- `projectName` (optional)
- `targetAudience` (optional)

Ausgabe:
- `kurzdefinition`
- `erkannte_entitaeten`
- `unklare_begriffe`
- `fehlende_faq_fragen`
- `ki_lesbare_zusammenfassung`
- `optimierungsempfehlungen`

## Architektur
- `apps-sdk/`
  - App-Konfiguration für ChatGPT-Anbindung (`app.config.json`)
  - Zugriffspunkt für Konfiguration (`src/index.ts`)
- `mcp-server/`
  - MCP-Server via STDIO
  - Tool-Registrierung und Tool-Ausführung
- `domain/`
  - zentrale Fachlogik `geoAnalyzeText`
- `tests/`
  - Domain-, Contract-, Struktur- und Release-Guardrail-Tests

## Start / Verbindung
### 1) Abhängigkeiten installieren
```bash
npm install
```

### 2) MCP-Server lokal starten
```bash
npm run mcp:start
```
(Alternativ: `npm run mcp:dev`)

### 3) Tests ausführen
```bash
npm test
```

## Notwendige Konfiguration
### Im Repository
- `apps-sdk/app.config.json` enthält:
  - MCP-Startkommando (`npm run mcp:start`)
  - zentrales Tool (`geo_analyze_text`)

### Außerhalb des Repositories (nach Setup)
1. In der ChatGPT-App-/Apps-SDK-Umgebung eine App-Integration anlegen.
2. Den MCP-Server-Prozess auf dieses Repo zeigen (Kommando: `npm run mcp:start`).
3. Sicherstellen, dass Tool-Aufrufe an `geo_analyze_text` weitergeleitet werden.
4. End-to-End-Aufruf im Zielsystem durchführen (Prompt -> Toolcall -> strukturierte Antwort).

## Release-Checkliste
Siehe `docs/release-checklist.md`.

## ChatGPT-Verbindung
Für die echte Nutzung in ChatGPT siehe `docs/chatgpt-setup.md`.
Die zentrale Funktion bleibt `geo_analyze_text`; dieses Repo liefert dafür die App-/MCP-Basis ohne lokale Webapp.

## Explizite Scope-Grenzen
- Kein `next`, `react`, `react-dom`
- Kein `src/app`, kein `src/components`
- Keine lokale Weboberfläche

## Legacy
Historische Referenzdateien liegen unter `../legacy/` und sind nicht Teil der Zielarchitektur.
