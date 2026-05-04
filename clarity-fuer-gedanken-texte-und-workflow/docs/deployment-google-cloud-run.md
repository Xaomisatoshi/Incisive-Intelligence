# Deployment auf Google Cloud Run

## Ziel
Die App als öffentlicher HTTP-Service bereitstellen, damit ChatGPT den MCP-Endpunkt nutzen kann.


## Deployment (Source-basiert)
1. In Google Cloud Console zu **Cloud Run** gehen.
2. **Create Service** wählen.
3. **Continuously deploy from a repository** oder Source-Deployment wählen.

   - Startbefehl: `npm run start`
7. Port-Hinweis:
   - Cloud Run setzt `PORT` automatisch.
   - Der Server hört auf `process.env.PORT` (Fallback `8080`).
