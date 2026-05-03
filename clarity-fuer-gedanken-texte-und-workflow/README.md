# Clarity für Gedanken, Texte und Workflow

Lokale Next.js-MVP-App für den internen Agenten **CHILL-SENSEI — Clarity-Architekt für Gedanken, Texte & Workflows**.

## Features
- Chat-Interface auf der Startseite
- API-Route (`/api/chat`) mit OpenAI Responses API
- Modulare Agentenkonfiguration (`src/agent`)
- Ausgelagerte Antwortregeln und Workflow-Modi
- Platzhalter-Ordner für Wissensdateien (`/knowledge`)
- Beispiel-Tests für Prompt-Verhalten

## Setup
1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Umgebungsvariablen setzen:
   ```bash
   cp .env.example .env.local
   ```
   Dann `OPENAI_API_KEY` in `.env.local` eintragen.
3. Dev-Server starten:
   ```bash
   npm run dev
   ```
4. App öffnen: `http://localhost:3000`

## Tests
```bash
npm test
```

## Hinweise
- Standardmodell ist `gpt-4.1-mini` (überschreibbar via `OPENAI_MODEL`).
- Antworten werden serverseitig über die Responses API erzeugt.
