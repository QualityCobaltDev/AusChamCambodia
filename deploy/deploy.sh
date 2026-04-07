#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$PROJECT_ROOT/docker/docker-compose.prod.yml"

cd "$PROJECT_ROOT"

echo "[AusCham] Building and starting isolated compose stack..."
docker compose -f "$COMPOSE_FILE" --project-name auscham-cambodia up -d --build

echo "[AusCham] Deployment complete."
