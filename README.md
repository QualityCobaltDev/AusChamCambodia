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

## Git-based deployment workflow (VPS-safe)
Target VPS: `207.180.207.22`  
Temporary domain: `elevareai.online`

1. Place repo in isolated directory (example `/var/www/auscham-missioncontrol`).
2. Create deployment env file:
   ```bash
   cp deploy/.env.production.example deploy/.env.production
   ```
3. Deploy from `main` in one command:
   ```bash
   ./deploy/deploy.sh
   ```
4. Deploy an alternate branch (for example, staging):
   ```bash
   ./deploy/deploy.sh staging
   ```

The deploy script now:
- fetches `origin`
- checks out target branch
- fast-forwards safely with `git pull --ff-only`
- runs `pnpm install --no-frozen-lockfile` + `pnpm build`
- rebuilds Docker image with a commit-aware build arg
- restarts only the isolated AusCham container
- writes the successful full commit SHA to `deploy/.last_successful_sha`

### Branch strategy
- `main` → production branch for elevareai.online
- `staging` (optional) → pre-production validation branch (deploy only when needed)

### Version stamp visibility
- Footer displays `Build: <short-sha>` via `NEXT_PUBLIC_BUILD_SHA` injected at build time.
- Runtime container also gets `APP_BUILD_SHA` for operator visibility.

### Rollback options
Rollback to the last successful commit:
```bash
./deploy/rollback.sh
```

Rollback to a specific commit:
```bash
./deploy/rollback.sh <commit-sha> main
```

Manual rollback procedure (if preferred):
```bash
git checkout main
git fetch --prune origin
git reset --hard <commit-sha>
./deploy/deploy.sh main
```

> Important: this scaffold intentionally uses dedicated compose project names, network names, container names, env files, and upstream port mapping (`127.0.0.1:3008`) to avoid impact on any existing live website.

For full VPS operations, backup, and Nginx routing steps, see `deploy/README.md`.

Pre-launch QA and hardening gates are documented in `docs/qa-hardening-launch-checklists.md`.
