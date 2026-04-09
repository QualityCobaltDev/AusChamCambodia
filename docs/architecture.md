# AusCham Cambodia Rebuild - Architecture

## Objectives
- Deliver a production-grade Next.js App Router platform for AusCham Cambodia.
- Keep deployment isolated from the existing website on VPS `207.180.207.22`.
- Support a future CMS-backed editorial and events pipeline without rework.

## Core stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- pnpm for deterministic package management
- Docker multi-stage image for lean production runtime
- Nginx host-based reverse proxy routing (`elevareai.online`)

## Isolation model (critical)
1. **Separate directories**: deploy this repository under a dedicated project path (e.g. `/var/www/auscham-missioncontrol`).
2. **Separate compose project**: use explicit project name `auscham-missioncontrol`.
3. **Separate container names**: `auscham_missioncontrol_web`.
4. **Separate network**: `auscham_missioncontrol_network`.
5. **Separate env file**: `deploy/.env.production` copied from example.
6. **Dedicated Nginx site file**: `deploy/nginx.auscham.conf` in `sites-available` and symlink into `sites-enabled`.
7. **Dedicated upstream port**: `127.0.0.1:3008 -> container:3008` to avoid conflicts.

## Application architecture
- `app/`: route handlers and page segments for business domains.
- `components/`: shared layout and UI building blocks.
- `content/`: structured content schemas and static fallback data.
- `cms/`: CMS adapter interfaces and provider implementations.
- `api/`: service-layer API abstractions consumed by routes/components.
- `lib/`: utilities and runtime configuration.
- `hooks/`: reusable React hooks.
- `styles/`: design-system and style helpers.

## Route strategy
The route tree follows chamber growth architecture:
- Home
- Membership (segmented plans + audience pages)
- Events (hub, upcoming, archive, dynamic detail)
- Resources (knowledge categories + dynamic detail)
- Sponsorship (packages, partners, enquiries)
- About (mission, committee, partners)
- Contact + legal pages

## Deployment flow
1. Provision project files on VPS in isolated directory.
2. Copy `deploy/.env.production.example` to `deploy/.env.production` and fill secrets.
3. Run `deploy/deploy.sh`.
4. Install isolated Nginx config file (do not replace global config).
5. Reload Nginx and verify `elevareai.online` host routes to `127.0.0.1:3008`.

## Safety controls
- No reuse of existing container names or compose project names.
- No direct edits to global Nginx config unless explicitly approved.
- Host binding restricted to loopback for app container port.
- Reversible deployment: `docker compose --project-name auscham-missioncontrol down`.
