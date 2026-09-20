#!/bin/bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────────────────────
# ship-hct.sh — entrega el sitio a GitHub para que el servidor (vibox) haga pull.
#
# Replica el flujo de entrega de control-tower adaptado a este repo: verificar
# ANTES de commitear, y dejar `prod` en GitHub siempre desplegable. Allí el
# trabajo va en ramas locales (control-tower-mvp → dev → prod) porque conviven
# varias iniciativas; aquí `prod` es la única rama y la única con remoto, así
# que el flujo se queda en: verificar → commit → push origin prod.
#
# Uso:
#   ./ship-hct.sh "Mensaje del commit"   # verifica, commitea y sube
#   ./ship-hct.sh                        # igual, con mensaje por defecto fechado
#   ./ship-hct.sh --check                # SOLO verifica (no toca git)
#   ./ship-hct.sh --no-verify "Mensaje"  # salta el build (úsalo solo si ya lo
#                                        # corriste tú: se pierde la red de seguridad)
#
# Después, en vibox:   ./update-hct.sh prod
# ─────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

BRANCH="main"          # única rama del repo
REMOTE="origin"
MAX_FILE_MB=2          # nada pesado debe llegar al servidor (los originales están gitignored)

# --- 1. Parseo de argumentos ------------------------------------------------
DO_VERIFY=1
ONLY_CHECK=0
MESSAGE=""
while [[ $# -gt 0 ]]; do
    case "$1" in
        --check)      ONLY_CHECK=1; shift;;
        --no-verify)  DO_VERIFY=0; shift;;
        -h|--help)    sed -n '4,20p' "$0"; exit 0;;
        -*)           echo "❌ Opción desconocida: $1"; exit 1;;
        *)            MESSAGE="$1"; shift;;
    esac
done

# --- 2. Guardas de repositorio ----------------------------------------------
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
    echo "❌ Esto no es un repositorio git."; exit 1
}

CURRENT="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT" != "$BRANCH" ]; then
    echo "❌ Estás en la rama '$CURRENT' y la entrega va sobre '$BRANCH'."
    echo "   '$BRANCH' es la rama que el servidor tiene clonada. Cambia con:"
    echo "     git checkout $BRANCH && git merge --ff-only $CURRENT"
    exit 1
fi

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
    echo "❌ No existe el remoto '$REMOTE'. Configúralo antes de entregar."
    exit 1
fi

# --- 3. Verificación: typecheck + build (la puerta de calidad) ---------------
# Ojo al orden: el build corre `prebuild` (optimize-images), que puede regenerar
# .webp en public/images/. Por eso se verifica ANTES del `git add`, para que esos
# cambios entren en el mismo commit y el servidor no tenga que regenerarlos.
if [ "$DO_VERIFY" -eq 1 ]; then
    if [ ! -d node_modules ]; then
        echo "📦 Falta node_modules — instalando dependencias…"
        (cd web && npm ci)
    fi
    echo "🔍 Verificando (typecheck + build)…"
    if ! (cd web && npm run build); then
        echo "❌ El build falla. No se commitea nada: 'main' debe quedar siempre desplegable."
        exit 1
    fi
    echo "✅ Build correcto."
else
    echo "⚠️  Verificación saltada (--no-verify)."
fi

if [ "$ONLY_CHECK" -eq 1 ]; then
    echo "🛈 Solo verificación: no se ha tocado git."
    exit 0
fi

# --- 4. ¿Hay algo que entregar? ---------------------------------------------
if [ -z "$(git status --porcelain)" ]; then
    # Puede que el commit ya esté hecho y solo falte subirlo.
    if [ -n "$(git log "$REMOTE/$BRANCH..$BRANCH" --oneline 2>/dev/null)" ]; then
        echo "🛈 No hay cambios sin commitear, pero sí commits sin subir."
    else
        echo "✅ Nada que entregar: el árbol está limpio y $BRANCH ya está sincronizada."
        exit 0
    fi
else
    echo
    echo "📋 Se va a entregar:"
    git status --short | sed 's/^/   /'
    echo

    git add -A

    # --- 5. Red de seguridad sobre lo que REALMENTE se sube -----------------
    # Los secretos y los pesados ya están en .gitignore, pero un `git add -f`
    # despistado los saltaría. Esto mira lo que hay staged de verdad.
    STAGED="$(git diff --cached --name-only --diff-filter=ACM)"

    # Ojo: no todo fichero .env es un secreto. envs/.env.dev y envs/.env.prod son
    # configuración NO-secreta versionada a propósito (el .gitignore los des-ignora).
    # Por eso se marca un .env solo si es nuevo en el repo O si trae una clave con
    # pinta de secreto: así el ./.env real (GMAIL_APP_PASSWORD) se bloquea y los de
    # envs/ pasan.
    SECRETS=""
    while IFS= read -r f; do
        [ -n "$f" ] || continue
        echo "$f" | grep -qE '(^|/)\.env($|\.)' || continue
        REASON=""
        if ! git cat-file -e "HEAD:$f" 2>/dev/null; then
            REASON="nuevo en el repo"
        elif [ -f "$f" ] && grep -qE '^[A-Z_]*(PASSWORD|SECRET|TOKEN|API_KEY|PRIVATE)[A-Z_]*=.+' "$f"; then
            REASON="contiene una clave con pinta de secreto"
        fi
        [ -n "$REASON" ] && SECRETS="$SECRETS   $f ($REASON)"$'\n'
    done <<< "$STAGED"
    if [ -n "$SECRETS" ]; then
        echo "❌ Hay ficheros con secretos preparados para subir:"
        printf '%s' "$SECRETS"
        echo "   Quítalos con: git reset HEAD <fichero>"
        exit 1
    fi

    HEAVY=""
    while IFS= read -r f; do
        [ -n "$f" ] && [ -f "$f" ] || continue
        SIZE_MB=$(( $(wc -c < "$f") / 1048576 ))
        [ "$SIZE_MB" -ge "$MAX_FILE_MB" ] && HEAVY="$HEAVY   $f (${SIZE_MB} MB)"$'\n'
    done <<< "$STAGED"
    if [ -n "$HEAVY" ]; then
        echo "❌ Ficheros de ${MAX_FILE_MB} MB o más preparados para subir:"
        printf '%s' "$HEAVY"
        echo "   El repo se clona limpio en el servidor. Si es un original de imagen va en images-resources/"
        echo "   (gitignored); si de verdad debe subir, sube el límite MAX_FILE_MB."
        exit 1
    fi

    if [ -z "$MESSAGE" ]; then
        MESSAGE="Actualización del sitio — $(date '+%Y-%m-%d %H:%M')"
    fi
    git commit -q -m "$MESSAGE"
    echo "📝 Commit: $MESSAGE"
fi

# --- 6. Subida --------------------------------------------------------------
echo "🚀 Subiendo a $REMOTE/${BRANCH}…"
git push "$REMOTE" "$BRANCH"

echo
echo "✅ Entregado. En vibox:"
echo "     cd <ruta-del-repo> && ./update-hct.sh prod"
