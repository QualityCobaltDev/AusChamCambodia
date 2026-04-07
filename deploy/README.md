# VPS Deployment Runbook (missioncontrol.quest)

This runbook deploys the AusCham rebuild **without affecting any existing website** on the same VPS.

## Isolation strategy
- Project directory: `/var/www/auscham-missioncontrol`
- Compose project: `auscham-missioncontrol`
- Container: `auscham_missioncontrol_web`
- Network: `auscham_missioncontrol_network`
- Env file: `deploy/.env.production`
- Nginx vhost file: `/etc/nginx/sites-available/auscham-missioncontrol.conf`
- Internal app port: `3008`
- Host loopback binding: `127.0.0.1:3008`

## First-time setup on VPS
```bash
sudo mkdir -p /var/www/auscham-missioncontrol
sudo chown -R "$USER":"$USER" /var/www/auscham-missioncontrol
cd /var/www/auscham-missioncontrol
# copy repository contents here
cp deploy/.env.production.example deploy/.env.production
```

## Configure Nginx host routing (safe)
```bash
sudo cp deploy/nginx.auscham.conf /etc/nginx/sites-available/auscham-missioncontrol.conf
sudo ln -s /etc/nginx/sites-available/auscham-missioncontrol.conf /etc/nginx/sites-enabled/auscham-missioncontrol.conf
sudo nginx -t
sudo systemctl reload nginx
```

> Do **not** edit or replace `/etc/nginx/nginx.conf` for this project.

## Deploy
```bash
./deploy/deploy.sh
```

## Rollback (reversible)
```bash
./deploy/deploy.sh --rollback
```

## Backup project deployment assets
```bash
sudo ./deploy/backup-config.sh
```

This captures:
- `docker-compose.yml`
- `deploy/.env.production` (if present)
- `deploy/nginx.auscham.conf`
- host vhost config/symlink metadata when available
