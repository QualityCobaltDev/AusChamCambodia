#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/auscham-missioncontrol}"
WORK_DIR="$BACKUP_ROOT/$TIMESTAMP"

mkdir -p "$WORK_DIR"

cp "$PROJECT_ROOT/docker-compose.yml" "$WORK_DIR/docker-compose.yml"
cp "$PROJECT_ROOT/deploy/nginx.auscham.conf" "$WORK_DIR/nginx.auscham.conf"

if [[ -f "$PROJECT_ROOT/deploy/.env.production" ]]; then
  cp "$PROJECT_ROOT/deploy/.env.production" "$WORK_DIR/.env.production"
fi

if [[ -f "/etc/nginx/sites-available/auscham-missioncontrol.conf" ]]; then
  cp "/etc/nginx/sites-available/auscham-missioncontrol.conf" "$WORK_DIR/host.nginx.auscham-missioncontrol.conf"
fi

if [[ -L "/etc/nginx/sites-enabled/auscham-missioncontrol.conf" ]]; then
  readlink "/etc/nginx/sites-enabled/auscham-missioncontrol.conf" > "$WORK_DIR/sites-enabled-symlink.txt"
fi

( cd "$BACKUP_ROOT" && tar -czf "${TIMESTAMP}.tar.gz" "$TIMESTAMP" )

echo "[AusCham] Backup written to $BACKUP_ROOT/${TIMESTAMP}.tar.gz"
