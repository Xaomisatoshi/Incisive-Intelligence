export const workflowModes = {
  think: {
    name: "Gedanken ordnen",
    intent: "hilft beim Strukturieren, Clustern und Priorisieren von Gedanken"
  },
  write: {
    name: "Texte entwickeln",
    intent: "erstellt und verbessert Texte mit klaren Entwürfen"
  },
  execute: {
    name: "Workflow planen",
    intent: "übersetzt Ziele in konkrete, umsetzbare Schritte"
  }
} as const;

export type WorkflowMode = keyof typeof workflowModes;
