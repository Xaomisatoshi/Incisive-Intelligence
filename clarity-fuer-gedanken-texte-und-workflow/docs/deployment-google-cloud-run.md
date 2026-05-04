# Deployment auf Google Cloud Run

## Ziel
Die App als öffentlicher HTTP-Service bereitstellen, damit ChatGPT den MCP-Endpunkt nutzen kann.

## Ziel-Repository / Branch / Ordner
- Repository: `Xaomisatoshi/Incisive-Intelligence`
- Branch: `main`
- App-Ordner: `clarity-fuer-gedanken-texte-und-workflow`
- Dockerfile-Pfad: `clarity-fuer-gedanken-texte-und-workflow/Dockerfile`

## Voraussetzungen
- Google Cloud Projekt mit aktivierter Abrechnung
- APIs aktiviert: Cloud Run, Cloud Build, Artifact Registry

## Deployment (Source-basiert)
1. In Google Cloud Console zu **Cloud Run** gehen.
2. **Create Service** wählen.
3. **Continuously deploy from a repository** oder Source-Deployment wählen.
4. Repository verbinden und auswählen:
   - `Xaomisatoshi/Incisive-Intelligence`
   - Branch `main`
5. **Source folder** auf `clarity-fuer-gedanken-texte-und-workflow` setzen.
6. Build/Start konfigurieren:
   - Dockerfile: `clarity-fuer-gedanken-texte-und-workflow/Dockerfile`
   - Startbefehl: `npm run start`
7. Port-Hinweis:
   - Cloud Run setzt `PORT` automatisch.
   - Der Server hört auf `process.env.PORT` (Fallback `8080`).
8. Auth je nach Sicherheitsanforderung konfigurieren (optional für schnellen Start: "Allow unauthenticated").
9. Deploy ausführen.

## Öffentliche URL nach Deployment
- Die öffentliche Service-URL steht in Cloud Run unter **Service details → URL**.
- Beispiel: `https://<service>-<hash>-<region>.run.app`

## ChatGPT-Verbindung
- MCP-URL in ChatGPT eintragen:
  - `https://<service>-<hash>-<region>.run.app/mcp`
- Healthcheck:
  - `https://<service>-<hash>-<region>.run.app/health`
- Danach `geo_analyze_text` mit Beispieltext testen.
