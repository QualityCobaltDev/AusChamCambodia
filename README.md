# AusCham Cambodia - Website Rebuild Scaffold

Production-conscious scaffold for a Next.js + TypeScript + Tailwind rebuild of AusCham Cambodia's web platform.

## Tech stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint + Prettier
- pnpm
- Docker (multi-stage build)

## Local setup
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy environment template:
   ```bash
   cp .env.example .env.local
   ```
3. Run development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000).

## Quality checks
```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Project structure
- `app/` - App Router pages and API routes
- `components/` - reusable components and layout shell
- `content/` - data layer scaffolds
- `cms/` - CMS integration abstraction
- `api/` - service API integration layer
- `lib/` - config and utilities
- `hooks/` - reusable hooks
- `styles/` - style system extensions
- `docker/` - compose files
- `deploy/` - deployment and Nginx config artifacts
- `docs/architecture.md` - architecture and deployment strategy

## Production deployment (isolated VPS setup)
Target VPS: `207.180.207.22`  
Temporary domain: `missioncontrol.quest`

1. Place repo in isolated directory (example `/srv/auscham-cambodia`).
2. Create deployment env file:
   ```bash
   cp deploy/.env.production.example deploy/.env.production
   ```
3. Build and run isolated compose stack:
   ```bash
   ./deploy/deploy.sh
   ```
4. Add `deploy/nginx.auscham.conf` as a dedicated host config.
5. Reload Nginx.

> Important: this scaffold intentionally uses dedicated compose project names, network names, container names, env files, and upstream port mapping (`127.0.0.1:3101`) to avoid impact on any existing live website.
