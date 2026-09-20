#!/bin/bash
set -e

# Expone ESTE sitio públicamente por Tailscale Funnel para hacer un preview con
# la clienta. El funnel apunta directo al puerto publicado del contenedor
# (HCT_APP_EPORT en envs/.env.$ENV), así que la clienta recibe la URL
# https://<nodo>.<tailnet>.ts.net y ve SOLO este sitio.
#
# Uso:  ./expose.sh [dev|prod] [443|8443|10000]
#   - El sitio debe estar levantado:  ./deploy-hct.sh <env>  (publica su EPORT).
#   - 2º argumento: puerto HTTPS público del funnel (default 8443). Tailscale
#     permite hasta 3 funnels por nodo (443, 8443, 10000), TODOS sobre el mismo
#     hostname del nodo. Cada puerto es un "slot": volver a exponer en el mismo
#     puerto SOBREESCRIBE el funnel anterior.
#
# CONVENCIÓN DE PUERTOS (varios sitios en el MISMO VPS/nodo):
#   - Alondra  → 443    (https://<nodo>.<tailnet>.ts.net)
#   - HCT      → 8443   (https://<nodo>.<tailnet>.ts.net:8443)   ← default aquí
#   Así los dos túneles conviven sin pisarse. Si expusieras HCT en 443 pisarías
#   el funnel de Alondra (y viceversa).
#
# Verbos de utilidad:
#   ./expose.sh status          # lista los funnels activos
#   ./expose.sh off [PUERTO]    # apaga el funnel de ese puerto (default 8443)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_DIR="$SCRIPT_DIR/envs"

if ! command -v tailscale >/dev/null 2>&1; then
    echo "❌ No encuentro 'tailscale' en el PATH. Instálalo: https://tailscale.com/download"
    exit 1
fi

case "${1:-}" in
    status)
        tailscale funnel status || true
        exit 0
        ;;
    off)
        PORT=${2:-8443}
        echo "🛑 Apagando funnel en :$PORT ..."
        tailscale funnel --https="$PORT" off
        tailscale funnel status || true
        exit 0
        ;;
esac

ENV=${1:-prod}
HTTPS_PORT=${2:-8443}

if [[ ! "$ENV" =~ ^(dev|prod)$ ]]; then
    echo "❌ Entorno inválido. Uso: $0 [dev|prod] [443|8443|10000]"
    exit 1
fi
if [[ ! "$HTTPS_PORT" =~ ^(443|8443|10000)$ ]]; then
    echo "❌ Puerto https inválido: $HTTPS_PORT. Tailscale Funnel permite 443, 8443 o 10000."
    exit 1
fi
if [ ! -f "$ENV_DIR/.env.$ENV" ]; then
    echo "❌ No existe $ENV_DIR/.env.$ENV"
    exit 1
fi

set -a; source "$ENV_DIR/.env.$ENV"; set +a
EPORT="${HCT_APP_EPORT:-}"
if [ -z "$EPORT" ]; then
    echo "❌ No encuentro HCT_APP_EPORT en .env.$ENV"
    exit 1
fi

echo "ℹ️  Funnels activos ahora mismo (máx. 3 en 443/8443/10000):"
FUNNEL_STATUS="$(tailscale funnel status 2>/dev/null || true)"
echo "$FUNNEL_STATUS"

# Aviso si el puerto elegido ya está ocupado por OTRO destino (evita pisar otro
# sitio, p. ej. Alondra en 443, sin darte cuenta).
if echo "$FUNNEL_STATUS" | grep -qE "(:$HTTPS_PORT\b|https://[^ ]*:$HTTPS_PORT\b)"; then
    if ! echo "$FUNNEL_STATUS" | grep -qE ":$HTTPS_PORT\b.*localhost:$EPORT|localhost:$EPORT"; then
        echo ""
        echo "⚠️  Ya hay un funnel activo en el puerto :$HTTPS_PORT que NO apunta a"
        echo "    este sitio (localhost:$EPORT). Si continúas lo SOBREESCRIBIRÁS."
        echo "    Para otro sitio usa un puerto distinto (443 / 8443 / 10000):"
        echo "      ./expose.sh $ENV 10000"
        read -r -p "    ¿Continuar y sobreescribir :$HTTPS_PORT? [y/N] " ans
        [[ "$ans" =~ ^[yY]$ ]] || { echo "Cancelado."; exit 1; }
    fi
fi

echo "🌐 Exponiendo Hair Color Technology ($ENV) — localhost:$EPORT → funnel https :$HTTPS_PORT ..."
tailscale funnel --bg --https="$HTTPS_PORT" "http://localhost:$EPORT"

echo "✅ Listo. URL pública del nodo:"
tailscale funnel status || true
echo "   (para apagarlo:  ./expose.sh off $HTTPS_PORT)"
