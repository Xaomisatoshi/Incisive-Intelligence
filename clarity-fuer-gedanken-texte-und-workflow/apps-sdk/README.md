# Apps SDK Layer

Dieser Layer stellt die App-Metadaten für die spätere ChatGPT-App-Integration bereit.

## Inhalte
- `app.config.json`: zentrale App-Konfiguration (MCP-Startkommando, Toolliste, Domain-Kontext)
- `src/index.ts`: kleiner Zugriffspunkt auf die Konfiguration

## Zielbild
Die App wird in ChatGPT über Apps SDK + MCP ausgeführt. Es gibt bewusst keine lokale Webapp/UI in diesem Repository.
