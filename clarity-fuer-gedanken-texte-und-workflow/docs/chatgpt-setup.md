# ChatGPT-Setup (Apps SDK + MCP)

Diese Anleitung beschreibt, wie die bestehende App-Struktur aus diesem Repository in ChatGPT angebunden wird.

## 1) Vorhandene App-Konfiguration im Repo
Die Basis ist bereits vorhanden:
- `apps-sdk/app.config.json`
  - MCP-Startkommando: `npm run mcp:start`
  - Tool-Liste: `geo_analyze_text`
- `mcp-server/src/server.ts`
  - registriert und bedient das Tool über MCP
- `mcp-server/src/tools/geo_analyze_text.ts`
  - Tool-Wrapper, Input-Prüfung und Delegation in die Domain-Logik

## 2) Welche Server-Verbindung in ChatGPT eingetragen werden muss
Für die eigentliche Nutzung in ChatGPT muss außerhalb dieses Repos ein **erreichbarer MCP-Endpoint** bereitgestellt werden (nicht localhost, kein Tunnel als Hauptweg).

In ChatGPT/App-Konfiguration hinterlegen:
- MCP-Server-URL: die öffentliche URL des bereitgestellten MCP-Dienstes
- ggf. Auth-Header/Token: entsprechend deiner Hosting-/Gateway-Konfiguration
- freizugebendes Tool: `geo_analyze_text`

Hinweis: Dieses Repo enthält die Tool- und Serverlogik; die produktive Erreichbarkeit (URL, TLS, Auth, Betrieb) wird im Deployment außerhalb des Repos hergestellt.

## 3) Nötige Umgebungsvariablen
Für den reinen Tool-Flow `geo_analyze_text` sind in der aktuellen Implementierung keine zusätzlichen API-Keys erforderlich.

Optional für spätere Agent-/LLM-Erweiterung (bereits im Repo vorbereitet):
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional)

## 4) geo_analyze_text in ChatGPT testen
Nach erfolgreicher Verbindung des MCP-Servers in ChatGPT:
1. Neue Unterhaltung in der verbundenen App starten.
2. Einen GEO-Text zur Analyse senden.
3. Sicherstellen, dass `geo_analyze_text` ausgelöst wird.
4. Ergebnis auf die 6 Pflichtfelder prüfen:
   - `kurzdefinition`
   - `erkannte_entitaeten`
   - `unklare_begriffe`
   - `fehlende_faq_fragen`
   - `ki_lesbare_zusammenfassung`
   - `optimierungsempfehlungen`

## 5) Externe Schritte außerhalb des Repos
1. Runtime/Hosting für MCP-Server bereitstellen (mit stabiler öffentlicher URL).
2. Transport-/Gateway-Konfiguration für ChatGPT-kompatible MCP-Anbindung einrichten.
3. Authentifizierung und Zugriffsschutz (z. B. Bearer-Token) konfigurieren.
4. Server in ChatGPT eintragen und Tool-Aufrufe end-to-end validieren.
5. Betriebskonzept ergänzen (Monitoring, Logging, Rotation von Secrets).
