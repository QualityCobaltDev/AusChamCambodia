#!/usr/bin/env bash
set -euo pipefail

log() {
  printf '[AusCham][rollback] %s\n' "$*"
}

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_FILE="$PROJECT_ROOT/deploy/.last_successful_sha"
TARGET_REF="${1:-}"
DEPLOY_BRANCH="${2:-main}"

cd "$PROJECT_ROOT"

if [[ -z "$TARGET_REF" ]]; then
  if [[ -f "$STATE_FILE" ]]; then
    TARGET_REF="$(cat "$STATE_FILE")"
    log "No commit provided; defaulting to last successful commit: $TARGET_REF"
  else
    log "No rollback target provided and no $STATE_FILE present."
    log "Usage: ./deploy/rollback.sh <commit-sha> [branch]"
    exit 1
  fi
fi

log "Fetching latest refs"
git fetch --prune origin

log "Checking out branch: $DEPLOY_BRANCH"
git checkout "$DEPLOY_BRANCH"

if ! git cat-file -e "$TARGET_REF^{commit}" 2>/dev/null; then
  log "Commit not found locally: $TARGET_REF"
  exit 1
fi

log "Resetting $DEPLOY_BRANCH to commit $TARGET_REF"
git reset --hard "$TARGET_REF"

log "Re-deploying commit $TARGET_REF"
./deploy/deploy.sh "$DEPLOY_BRANCH"
