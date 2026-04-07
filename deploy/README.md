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

## Deploy application stack first (isolated)
```bash
./deploy/deploy.sh
```

## Add a dedicated Nginx vhost safely (do not touch existing live site)
```bash
# 1) Install dedicated vhost file for this project only
sudo cp deploy/nginx.auscham.conf /etc/nginx/sites-available/auscham-missioncontrol.conf

# 2) Enable with a dedicated symlink (safe, reversible)
sudo ln -s /etc/nginx/sites-available/auscham-missioncontrol.conf /etc/nginx/sites-enabled/auscham-missioncontrol.conf

# 3) Validate syntax before any reload
sudo nginx -t

# 4) Reload in-place (no full restart)
sudo systemctl reload nginx
```

> Do **not** edit or replace `/etc/nginx/nginx.conf` for this project.

## Issue SSL certificates with Certbot
Use webroot mode to avoid editing unrelated server blocks.

```bash
# Ensure ACME webroot exists (used in nginx.auscham.conf)
sudo mkdir -p /var/www/letsencrypt
sudo chown -R www-data:www-data /var/www/letsencrypt

# Request cert for apex + www
sudo certbot certonly \
  --webroot -w /var/www/letsencrypt \
  -d missioncontrol.quest -d www.missioncontrol.quest \
  --email admin@missioncontrol.quest --agree-tos --no-eff-email

# Validate and reload nginx after successful issuance
sudo nginx -t
sudo systemctl reload nginx
```

### Optional: verify renewal timer
```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

## Safe activation checklist
1. Confirm app is healthy on loopback only: `curl -I http://127.0.0.1:3008/api/health`
2. Confirm Nginx config passes: `sudo nginx -t`
3. Reload Nginx: `sudo systemctl reload nginx`
4. Confirm HTTP redirects: `curl -I http://missioncontrol.quest`
5. Confirm HTTPS serves app: `curl -I https://missioncontrol.quest`
6. Confirm existing site still responds normally on its own domain.

## Rollback (reversible)
If anything fails, roll back Nginx only for this project without touching other sites:

```bash
# Disable this single vhost
sudo rm -f /etc/nginx/sites-enabled/auscham-missioncontrol.conf

# Optional: keep or remove the vhost source file
# sudo rm -f /etc/nginx/sites-available/auscham-missioncontrol.conf

# Validate and reload
sudo nginx -t
sudo systemctl reload nginx
```

Application rollback remains available:
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
