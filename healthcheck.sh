#!/usr/bin/env bash
# Healthcheck coach-michel : charge le LIVE dans Chromium headless, echoue si erreur JS runtime.
# Utilise comme --healthcheck pour claude-loop.sh -> rollback auto si KO.
export PATH="$HOME/.hermes/node/bin:$PATH"
exec node "$HOME/.hermes/tools/pageload-check.mjs" "${1:-http://localhost:3000/}"
