# Oniria web — instrucciones para Claude

Antes de cualquier tarea, lee [`docs/HANDOFF.md`](docs/HANDOFF.md) (estado y flujo de trabajo)
y [`docs/brainstorm.md`](docs/brainstorm.md) (visión y referencias).

En corto:
- El usuario decide diseño, copy y visión; Claude implementa y pregunta ante cualquier decisión.
- Solo `main`, commits pequeños en inglés y locales; no hacer push sin pedirlo.
- Cada cambio: `pnpm typecheck` + `pnpm lint` limpios y verificación visual en el navegador (`pnpm dev`).
- Responder en español.
