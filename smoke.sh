#!/usr/bin/env bash
# Smoke coach-michel : valide la SYNTAXE du <script> inline (que vite build NE valide PAS)
# puis le build. A utiliser comme --smoke pour claude-loop.sh.
set -e
export PATH="$HOME/.hermes/node/bin:$PATH"
# 1. extrait le(s) <script> inline (sans src) et verifie la syntaxe JS -> attrape les } manquantes
python3 - << "PY"
import re,sys
s=open("index.html",encoding="utf-8").read()
sc=re.findall(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>",s,re.S)
open("/tmp/cm-inline.js","w",encoding="utf-8").write("\n;\n".join(sc))
PY
node --check /tmp/cm-inline.js
# 2. build (bundle/PWA)
./node_modules/.bin/vite build --outDir /tmp/cm-smoke --emptyOutDir >/dev/null
echo "SMOKE OK (JS inline + build)"
