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
- Smoke = `bash smoke.sh` : valide la SYNTAXE du `<script>` inline (node --check) PUIS le build.
  IMPORTANT : `vite build` seul NE valide PAS le `<script>` inline -> un `}` manquant passe le build mais casse l app. Toujours `smoke.sh`.
- `vitest` existe mais ~pas de tests : utiliser le build comme smoke.

## Règles
- Petits diffs sur `index.html`, dans le style inline existant.
- NE PAS déployer, NE PAS toucher aux services (`coach-sync`, gateway) : éditer le code suffit.
- Ne pas committer sauf demande explicite.

## Déploiement & git — le harness gère, pas toi
- Servi par `python3 -m http.server 3000` sur l arbre `master` : éditer un fichier = live au prochain chargement.
- Tu travailles sur une branche jetable créée par le harness. **NE committe pas, NE merge pas, NE push pas, NE déploie pas.**
  Le harness fait commit -> merge --no-ff sur master -> push si (et seulement si) le smoke est vert.
- Ton job : éditer `index.html` + lancer le smoke (build). Rien d autre côté git.
