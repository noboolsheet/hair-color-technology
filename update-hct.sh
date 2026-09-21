#!/bin/bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────────────────────
# update-hct.sh — la otra mitad de ship-hct.sh, para correr EN EL SERVIDOR (vibox).
#
# Trae lo último de GitHub y redespliega. Es el "pull fácil": un solo comando en
# vez de acordarse de la secuencia git pull + deploy.
#
# Uso:  ./update-hct.sh [dev|prod]     (default: prod)
#       ./update-hct.sh prod --no-deploy   # solo actualiza el código
#
# El .env con los secretos de Gmail NO viaja por git: vive solo en el servidor y este
# script no lo toca.
# ─────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

BRANCH="prod"          # única rama del repo
REMOTE="origin"

ENV="prod"
DO_DEPLOY=1
while [[ $# -gt 0 ]]; do
    case "$1" in
        dev|prod)     ENV="$1"; shift;;
        --no-deploy)  DO_DEPLOY=0; shift;;
        -h|--help)    sed -n '4,14p' "$0"; exit 0;;
        *)            echo "❌ Argumento desconocido: $1"; echo "Uso: $0 {dev|prod} [--no-deploy]"; exit 1;;
    esac
done

# --- 1. El árbol debe estar limpio ------------------------------------------
# En el servidor no se edita código: si hay cambios locales es un accidente y un
# `git pull` los pisaría o se atascaría a mitad. Mejor parar y avisar.
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Hay cambios locales sin commitear en el servidor:"
    git status --short | sed 's/^/   /'
    echo "   Descártalos con 'git checkout -- .' (o guárdalos) y vuelve a intentarlo."
    exit 1
fi

CURRENT="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT" != "$BRANCH" ]; then
    echo "❌ El servidor está en la rama '$CURRENT'; se despliega '$BRANCH'."
    echo "   Corrige con: git checkout $BRANCH"
    exit 1
fi

# --- 2. Traer los cambios ---------------------------------------------------
echo "⬇️  Trayendo $REMOTE/${BRANCH}…"
BEFORE="$(git rev-parse HEAD)"
git pull --ff-only "$REMOTE" "$BRANCH"
AFTER="$(git rev-parse HEAD)"

if [ "$BEFORE" = "$AFTER" ]; then
    echo "🛈 Ya estabas al día (sin commits nuevos)."
else
    echo "📋 Novedades:"
    git log --oneline "$BEFORE..$AFTER" | sed 's/^/   /'
fi

# --- 3. Redesplegar ---------------------------------------------------------
if [ "$DO_DEPLOY" -eq 0 ]; then
    echo "🛈 --no-deploy: código actualizado, contenedor sin tocar."
    exit 0
fi

if [ "$BEFORE" = "$AFTER" ]; then
    # Redesplegamos igualmente: puede que se cambiara el .env o que el
    # contenedor esté caído, y `up -d --build` es idempotente.
    echo "🔄 Redesplegando de todos modos (por si cambió el .env o el contenedor está caído)…"
fi

echo "🚀 Desplegando ${ENV}…"
./deploy-hct.sh "$ENV"
