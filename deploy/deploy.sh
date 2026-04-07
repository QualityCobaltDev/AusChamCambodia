#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_NAME="auscham-missioncontrol"
COMPOSE_FILE="$PROJECT_ROOT/docker-compose.yml"
ENV_FILE="$PROJECT_ROOT/deploy/.env.production"
STATE_FILE="$PROJECT_ROOT/deploy/.last_successful_tag"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "[AusCham] Missing $ENV_FILE. Create it from deploy/.env.production.example first."
  exit 1
fi

cd "$PROJECT_ROOT"

if [[ "${1:-}" == "--rollback" ]]; then
  if [[ ! -f "$STATE_FILE" ]]; then
    echo "[AusCham] No prior release tag found in $STATE_FILE"
    exit 1
  fi
  export IMAGE_TAG
  IMAGE_TAG="$(cat "$STATE_FILE")"
  echo "[AusCham] Rolling back to IMAGE_TAG=$IMAGE_TAG"
  docker compose --project-name "$PROJECT_NAME" -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d web
  exit 0
fi

PREVIOUS_TAG=""
if [[ -f "$STATE_FILE" ]]; then
  PREVIOUS_TAG="$(cat "$STATE_FILE")"
fi

NEW_TAG="$(date +%Y%m%d%H%M%S)-$(git rev-parse --short HEAD)"
export IMAGE_TAG="$NEW_TAG"

echo "[AusCham] Building image tag: $IMAGE_TAG"
docker compose --project-name "$PROJECT_NAME" -f "$COMPOSE_FILE" --env-file "$ENV_FILE" build web

echo "[AusCham] Starting updated container (isolated stack)"
docker compose --project-name "$PROJECT_NAME" -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d web

CONTAINER_NAME="auscham_missioncontrol_web"
for _ in $(seq 1 30); do
  status="$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}no-healthcheck{{end}}' "$CONTAINER_NAME" 2>/dev/null || true)"
  if [[ "$status" == "healthy" || "$status" == "no-healthcheck" ]]; then
    echo "$IMAGE_TAG" > "$STATE_FILE"
    echo "[AusCham] Deploy healthy. Release recorded in $STATE_FILE"
    exit 0
  fi
  sleep 2
done

echo "[AusCham] Health check failed for new release $IMAGE_TAG"
if [[ -n "$PREVIOUS_TAG" ]]; then
  echo "[AusCham] Reverting to prior release tag: $PREVIOUS_TAG"
  export IMAGE_TAG="$PREVIOUS_TAG"
  docker compose --project-name "$PROJECT_NAME" -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d web
fi

exit 1
