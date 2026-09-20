#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Repo indipendiente: los envs (no-secreto) viven dentro del propio proyecto.
ENV_DIR="$SCRIPT_DIR/envs"
# Il sito vive in web/; il compose e i suoi segreti stanno lì.
WEB_DIR="$SCRIPT_DIR/web"

# 1. Validar entorno
ENV=${1:-}
if [[ ! "$ENV" =~ ^(dev|prod)$ ]]; then
    echo "❌ Error: entorno inválido o ausente."
    echo "Uso: $0 {dev|prod}"
    exit 1
fi

# 2. Cargar variables de entorno (para el nombre de la red, etc.)
if [ -f "$ENV_DIR/.env.$ENV" ]; then
    echo "📖 Cargando entorno: $ENV"
    set -a
    source "$ENV_DIR/.env.$ENV"
    set +a
else
    echo "❌ Error: no existe $ENV_DIR/.env.$ENV"
    exit 1
fi


# 3. Verificar el secreto de Gmail (GMAIL_USER + GMAIL_APP_PASSWORD viven en web/.env.$ENV, gitignored)
if [ ! -f "$WEB_DIR/.env.$ENV" ]; then
    echo "❌ Error: no existe $WEB_DIR/.env.$ENV"
    echo "   Copia web/server/.env.example a web/.env.$ENV y define GMAIL_USER + GMAIL_APP_PASSWORD."
    exit 1
fi

# 4. Crear la red compartida si no existe (para poder añadir otras apps después)
if ! docker network inspect "$DOCKER_NETWORK" >/dev/null 2>&1; then
    echo "🌐 Creando red compartida: $DOCKER_NETWORK..."
    docker network create "$DOCKER_NETWORK"
else
    echo "🌐 La red $DOCKER_NETWORK ya existe."
fi

# 5. Levantar el stack
echo "🚀 Arrancando hct-$ENV (puerto host ${HCT_APP_EPORT})..."
docker compose --env-file "$ENV_DIR/.env.$ENV" -f "$WEB_DIR/hct.docker-compose.$ENV.yml" up -d --build

echo "✅ Listo. Sitio en http://localhost:${HCT_APP_EPORT}  ·  expón con: ./expose.sh $ENV"
