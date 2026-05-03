# Deployment auf Google Cloud Run

## Ziel
Die App als öffentlicher HTTP-Service bereitstellen, damit ChatGPT den MCP-Endpunkt nutzen kann.

## Voraussetzungen
- Google Cloud Projekt mit aktivierter Abrechnung
- APIs aktiviert: Cloud Run, Cloud Build, Artifact Registry
- Repository enthält den App-Ordner: `clarity-fuer-gedanken-texte-und-workflow`

## Deployment (Source-basiert)
1. In Google Cloud Console zu **Cloud Run** gehen.
2. **Create Service** wählen.
3. **Continuously deploy from a repository** oder Source-Deployment wählen.
4. Repository verbinden und Branch auswählen.
5. **Source folder** auf `clarity-fuer-gedanken-texte-und-workflow` setzen.
6. Build/Start:

   - Startbefehl: `npm run start`
7. Port-Hinweis:
   - Cloud Run setzt `PORT` automatisch.
   - Der Server hört auf `process.env.PORT` (Fallback `8080`).
8. Auth für schnellen Start optional auf "Allow unauthenticated" (je nach Sicherheitsanforderung).
9. Deploy ausführen.

## Nach dem Deployment
1. Service-URL kopieren (z. B. `https://<service>-<hash>-<region>.run.app`).
2. In ChatGPT als MCP-Server URL eintragen:
   - `https://<service>-<hash>-<region>.run.app/mcp`
3. Optional Healthcheck prüfen:
   - `https://<service>-<hash>-<region>.run.app/health`
4. In ChatGPT `geo_analyze_text` mit Beispieltext testen.
