<!-- Copilot / AI agent guidance for Meu-projeto-Backend03 -->
# Copilot Instructions — Meu-projeto-Backend03

Purpose: short, actionable rules to help an AI make productive, low-risk code changes.

- Project entry points: `src/app.ts` (Express server and routes), `src/Models/Player.ts` (domain model).
- Dev run: use `npm run dev` (runs `tsx watch src/app.ts`). Keep changes compatible with `type: "module"` in `package.json`.

Architecture & data flow
- Single-process Express API serving an in-memory `Player` instance. The server listens on port 8081 in `src/app.ts`.
- Endpoints to reference:
  - `GET /player` — returns the current `player` object
  - `POST /player/attack` — calls `player.attack()` and returns a message
  - `POST /player/damage` — expects JSON `{ "damage": number }`, calls `player.takeDamage(damage)` and returns updated health
- No database or external services are present; state is ephemeral (in-memory). Avoid introducing persistent storage without a clear migration plan.

Conventions & patterns
- Files are TypeScript ESM (`"type": "module"`). Keep `import`/`export` syntax.
- Folder name uses `src/Models/Player.ts` (note uppercase `Models`). The code in `src/app.ts` imports `./models/Player` — Windows is case-insensitive but prefer the actual path `src/Models/Player.ts` when modifying imports to avoid cross-platform issues.
- Code and comments use Portuguese messaging. Keep response messages and comments in Portuguese unless the task explicitly requests translation.
- Routes are implemented directly in `src/app.ts` — add new simple routes there following the current pattern (`app.get/post(..., (req,res) => { res.json(...) })`).

Developer workflows
- Start local dev server: `npm install` then `npm run dev` (uses `tsx watch` to run TypeScript directly).
- Debugging: server logs the URL on startup (`console.log` in `src/app.ts`). Use Postman/curl to exercise endpoints.
- No test runner is configured. If you add tests, document new NPM scripts and devDependencies.

Safe change guidance for AI
- Small additive changes are fine (add routes, small refactors). For stateful changes, prefer making behavior configurable behind a feature flag or env var.
- When touching imports, normalize path casing to match filenames exactly.
- Preserve Portuguese user-facing strings (messages returned via `res.json`).
- Keep the single `Player` instance pattern if editing routes; if you need multiple players, introduce a clear in-memory collection and update endpoints accordingly.

Examples
- Add a new GET route:

```ts
// in src/app.ts
app.get('/status', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
```

- Use the damage endpoint with curl:

```bash
curl -X POST http://localhost:8081/player/damage -H "Content-Type: application/json" -d '{"damage":10}'
```

Files to inspect when changing behavior
- `src/app.ts` — routes, server config (port 8081), `express.json()` middleware
- `src/Models/Player.ts` — domain logic for `attack()` and `takeDamage()`
- `package.json` — dev script (`dev: tsx watch src/app.ts`) and ESM `type` field

If unsure
- Ask: Should state remain in-memory or be persisted? If persistence is required, propose a minimal change and mention migration/testing steps.
- Ask: Should messages be translated to English? Default: keep Portuguese.

Ask the human for feedback on any unclear or missing project-specific details.
