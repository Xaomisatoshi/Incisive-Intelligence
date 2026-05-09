# Release-Checkliste (MVP)

## Repository-Stand
- [ ] `README.md` ist aktuell und beschreibt Architektur + Nutzung
- [ ] `apps-sdk/app.config.json` enthält korrektes MCP-Startkommando und Tool-Liste
- [ ] `mcp-server/src/server.ts` startet per STDIO
- [ ] `geo_analyze_text` ist als zentrales Tool registriert

## Qualität
- [ ] `npm test` läuft lokal erfolgreich
- [ ] Keine Next.js/React-Abhängigkeiten in `package.json`
- [ ] Keine alten Webapp-Verzeichnisse (`src/app`, `src/components`)

## Übergabe / Betrieb
- [ ] MCP-Server lokal getestet (`npm run mcp:start`)
- [ ] Tool-Aufruf mit `text`-Input erfolgreich geprüft
- [ ] Externe ChatGPT-App-Konfiguration (außerhalb des Repos) mit MCP-Command verbunden
