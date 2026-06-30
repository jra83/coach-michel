# coach-michel — repère pour agents de code (Claude Code)

PWA "Coach Michel" (coach IA running) de JR. Heron itère dessus via Claude Code.
Ce fichier = périmètre minimal pour ne PAS ré-explorer tout le repo à chaque session.

## Architecture — LIRE EN PREMIER (évite de coder dans le mauvais fichier)
- **`index.html` (~62 KB) = L'APP LIVE.** Vanilla JS : toute la logique dans un `<script>`
  inline (~ligne 290) + le DOM au-dessus. L'UI se code ICI. Servie en dev par Vite
  (processus enfant du gateway Hermes), HMR recharge à chaud.
- **`src/*.jsx` (React) = LEGACY / abandonné.** N'est PAS importé par `index.html`.
  NE PAS y toucher pour une feature UI.
- `coach_michel_api.py` = backend FastAPI (Strava/Withings, plan, stats).
- Onglets dans `index.html` : **Stats**, **Plan**, Données, Chat, Résumé
  (repères : `>Plan<`, `>Stats<`, ids `plan*`).
- Styles : Tailwind (`tailwind.config.js`) + palette dans `COULEURS.md`.
  Réutiliser les classes / couleurs déjà présentes, pas de nouveau style ad hoc.

## Build / smoke — jamais sur l'arbre servi
- node n'est pas dans le PATH de login : `PATH=$HOME/.hermes/node/bin:$PATH`.
- Smoke = build vers un dossier temp (ne touche pas le live) :
  `PATH=$HOME/.hermes/node/bin:$PATH ./node_modules/.bin/vite build --outDir /tmp/cm-smoke --emptyOutDir`
- `vitest` existe mais ~pas de tests : utiliser le build comme smoke.

## Règles
- Petits diffs sur `index.html`, dans le style inline existant.
- NE PAS déployer, NE PAS toucher aux services (`coach-sync`, gateway) : éditer le code suffit.
- Ne pas committer sauf demande explicite.
