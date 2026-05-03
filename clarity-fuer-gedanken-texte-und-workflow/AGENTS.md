# AGENTS.md – Codex-Projektregeln

## Ziel
Dieses Projekt ist ein bewusst schlankes MVP für den Agenten **CHILL-SENSEI**.

## Regeln
1. Behalte alle Agentenlogiken modular unter `src/agent`.
2. Vermeide Overengineering; bevorzuge klare, leicht wartbare Implementierung.
3. Änderungen an Prompt/Regeln müssen durch Tests in `tests/` abgesichert werden.
4. Verwende durchgehend TypeScript und sprechende Bezeichner.
5. Halte UI-Komponenten klein und fokussiert.
