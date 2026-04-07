# GitHub Actions CI/CD for AusCham (missioncontrol.quest)

This project includes isolated CI/CD workflows designed for a VPS that already hosts another website.

## Workflows

### 1) CI Validation
File: `.github/workflows/ci.yml`

Runs on every push and pull request:
- Lint (`pnpm lint`)
- Typecheck (`pnpm typecheck`)
- Build (`pnpm build`)
- Test placeholder step (non-blocking placeholder output)

This catches broken builds before deployment.

### 2) Deploy to VPS
File: `.github/workflows/deploy.yml`

Supports:
- Manual deploy (`workflow_dispatch`)
- Optional auto-deploy on push to `main`

The deploy job:
1. Connects to the VPS via SSH key.
2. Enters isolated app directory (default `/var/www/auscham-missioncontrol`).
3. Optionally writes `deploy/.env.production` from a base64 secret.
4. Executes `./deploy/deploy.sh <branch>`.

This keeps deployment behavior consistent with the server-side safe deploy script.

## Required GitHub Secrets

Set these in **Settings → Secrets and variables → Actions**.

### Required
- `VPS_HOST` — VPS hostname/IP (example: `207.180.207.22`)
- `VPS_SSH_USER` — SSH user for deployment
- `VPS_SSH_KEY` — Private SSH key (PEM/OpenSSH format)

### Optional
- `VPS_APP_DIR` — Remote repo path. Defaults to `/var/www/auscham-missioncontrol`.
- `DEPLOY_ENV_B64` — Base64-encoded production env file content for `deploy/.env.production`.

Example to prepare `DEPLOY_ENV_B64` locally:

```bash
base64 -w 0 deploy/.env.production
```

> Keep `.env` values in secrets only. Never commit production secrets.

## Optional Auto-Deploy Toggle

Auto-deploy on `main` push is controlled by repository variable:
- `AUTO_DEPLOY_ON_MAIN`

Behavior:
- `AUTO_DEPLOY_ON_MAIN=true`: deploy runs automatically on `main` push.
- unset/any other value: no auto-deploy on push; manual deploy still works.

This allows safe rollout while keeping production protected.

## Manual Deploy

From GitHub Actions UI:
1. Open **Deploy to VPS (missioncontrol.quest)**.
2. Click **Run workflow**.
3. Provide optional branch input (default `main`).
4. Run.

## Safety Notes for Existing VPS

- The workflow does **not** modify global Nginx config.
- The workflow relies on existing isolated project deploy scripts.
- It deploys only the AusCham project path and compose project.
- Keep Nginx host-based routing isolated by dedicated vhost config, as documented in `deploy/README.md`.
