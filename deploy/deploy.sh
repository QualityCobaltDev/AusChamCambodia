#!/usr/bin/env bash
set -euo pipefail

log() {
  printf '[AusCham][deploy] %s\n' "$*"
}

resolve_compose_cmd() {
  if docker compose version >/dev/null 2>&1; then
    printf 'docker compose'
    return 0
  fi

  if command -v docker-compose >/dev/null 2>&1; then
    printf 'docker-compose'
    return 0
  fi

  return 1
}

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_NAME="auscham-missioncontrol"
COMPOSE_FILE="$PROJECT_ROOT/docker-compose.yml"
ENV_FILE="$PROJECT_ROOT/deploy/.env.production"
STATE_FILE="$PROJECT_ROOT/deploy/.last_successful_sha"
TARGET_BRANCH="${1:-main}"

if [[ ! -f "$ENV_FILE" ]]; then
  log "Missing $ENV_FILE. Create it from deploy/.env.production.example first."
  exit 1
fi

if ! COMPOSE_BIN="$(resolve_compose_cmd)"; then
  log "Docker Compose not found. Install either the Docker Compose plugin ('docker compose') or docker-compose."
  exit 1
fi

IFS=' ' read -r -a COMPOSE_CMD <<< "$COMPOSE_BIN"

cd "$PROJECT_ROOT"

log "Starting deployment for branch: $TARGET_BRANCH"
log "Project root: $PROJECT_ROOT"

CURRENT_REF="$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
log "Current git ref: $CURRENT_REF"

log "Fetching latest refs from origin"
git fetch --prune origin

if ! git show-ref --verify --quiet "refs/remotes/origin/$TARGET_BRANCH"; then
  log "Remote branch origin/$TARGET_BRANCH not found."
  exit 1
fi

log "Checking out branch: $TARGET_BRANCH"
git checkout "$TARGET_BRANCH"

log "Fast-forwarding local branch to origin/$TARGET_BRANCH"
git pull --ff-only origin "$TARGET_BRANCH"

FULL_SHA="$(git rev-parse HEAD)"
SHORT_SHA="$(git rev-parse --short HEAD)"
export IMAGE_TAG="${SHORT_SHA}-$(date +%Y%m%d%H%M%S)"
export NEXT_PUBLIC_BUILD_SHA="$SHORT_SHA"

log "Resolved deploy commit: $FULL_SHA"
log "Using image tag: $IMAGE_TAG"

log "Installing dependencies (without frozen lockfile)"
pnpm install --no-frozen-lockfile

log "Running production build verification"
pnpm build

log "Building Docker image"
"${COMPOSE_CMD[@]}" \
  -p "$PROJECT_NAME" \
  -f "$COMPOSE_FILE" \
  --env-file "$ENV_FILE" \
  build web

log "Restarting isolated application container"
"${COMPOSE_CMD[@]}" \
  -p "$PROJECT_NAME" \
  -f "$COMPOSE_FILE" \
  --env-file "$ENV_FILE" \
  up -d web

CONTAINER_NAME="auscham_missioncontrol_web"
log "Waiting for health status from container: $CONTAINER_NAME"
for _ in $(seq 1 45); do
  status="$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}no-healthcheck{{end}}' "$CONTAINER_NAME" 2>/dev/null || true)"
  if [[ "$status" == "healthy" || "$status" == "no-healthcheck" ]]; then
    printf '%s\n' "$FULL_SHA" > "$STATE_FILE"
    log "Deployment healthy on commit: $FULL_SHA"
    log "Release state recorded in $STATE_FILE"
    exit 0
  fi
  sleep 2
done

log "Health check failed for commit: $FULL_SHA"
log "See container logs: docker logs $CONTAINER_NAME --tail 200"
exit 1
