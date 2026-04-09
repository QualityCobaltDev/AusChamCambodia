# AusCham Cambodia Overhaul - Execution Log (Production-Safe)

This implementation log tracks the production-safe rollout sequence for `elevareai.online` on VPS `207.180.207.22`, while preserving isolation from any existing live site.

## 1) Scaffold repo and architecture
**What changed**
- Established modular Next.js app architecture with clear boundaries for UI, content, CMS adapter, APIs, deployment, and operations docs.
- Added environment template and baseline app/runtime wiring.

**Primary files**
- `README.md`
- `app/layout.tsx`
- `lib/config/env.ts`
- `docs/architecture.md`

## 2) Build design system
**What changed**
- Implemented reusable primitives, navigation shell, section components, and a style-guide page for visual QA consistency.
- Designed for “institutional + modern premium” brand direction with reusable spacing and typography tokens.

**Primary files**
- `components/ui/primitives.tsx`
- `components/layout/header.tsx`
- `components/layout/footer.tsx`
- `app/style-guide/page.tsx`

## 3) Create CMS schema and mock content
**What changed**
- Introduced CMS abstraction layer plus schema definitions and local mock content store to allow parallel content operations before full CMS go-live.
- Kept adapter-driven architecture so backend CMS provider can be swapped with low risk.

**Primary files**
- `cms/client.ts`
- `cms/queries.ts`
- `cms/sanity/schemas/index.ts`
- `content/mock/store.ts`

## 4) Build all major page templates
**What changed**
- Delivered Home, Membership, Events, Resources, Sponsorship, About, Contact, and Legal experiences.
- Added segmented sub-journeys for membership classes and content hubs.

**Primary files**
- `app/page.tsx`
- `app/membership/page.tsx`
- `app/events/page.tsx`
- `app/resources/page.tsx`
- `app/sponsorship/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/legal/page.tsx`

## 5) Implement forms and APIs
**What changed**
- Added typed server routes for form submission workflows and shared validation, anti-spam, and rate-limiting foundations.
- Connected reusable frontend form modules to API handlers.

**Primary files**
- `app/api/forms/contact/route.ts`
- `app/api/forms/membership/route.ts`
- `app/api/forms/sponsorship/route.ts`
- `lib/forms/validation.ts`
- `components/forms/use-form-submit.ts`

## 6) Add SEO and accessibility foundations
**What changed**
- Added metadata/canonical generation helpers and route-level metadata coverage.
- Implemented migration-aware redirects and structured legal canonical routing.

**Primary files**
- `lib/seo.ts`
- `next.config.ts`
- `lib/redirects.ts`
- `app/legal/privacy-policy/page.tsx`
- `app/legal/terms-of-use/page.tsx`

## 7) Add Docker deployment architecture
**What changed**
- Built isolated Compose stack and container strategy with loopback-only bind, unique project/network naming, and health checks.

**Primary files**
- `Dockerfile`
- `docker-compose.yml`
- `docker/docker-compose.prod.yml`

## 8) Configure safe Nginx host routing
**What changed**
- Added dedicated missioncontrol vhost and optional scoped redirect snippet.
- Avoided global Nginx ownership; all config is hostname-local and reversible.

**Primary files**
- `deploy/nginx.auscham.conf`
- `deploy/nginx.redirects.auscham.conf`

## 9) Add SSL for elevareai.online
**What changed**
- Documented certbot webroot-based issuance to avoid touching unrelated vhosts.
- Added verification and renewal validation procedures.

**Primary files**
- `deploy/README.md`
- `docs/final-safe-launch-plan.md`

## 10) Add deploy scripts and CI/CD
**What changed**
- Added deterministic deploy/rollback scripts with branch/commit controls and last-known-good tracking.
- Added CI and deployment workflow definitions.

**Primary files**
- `deploy/deploy.sh`
- `deploy/rollback.sh`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`

## 11) Implement redirect and migration strategy
**What changed**
- Defined legacy URL mapping, 301 targets, and 410 retirement patterns for technical and low-value legacy endpoints.
- Synced Next.js and Nginx migration strategy to prevent chain loops.

**Primary files**
- `docs/migration-redirect-plan.md`
- `lib/redirects.ts`
- `middleware.ts`
- `deploy/nginx.redirects.auscham.conf`

## 12) Complete QA and hardening
**What changed**
- Added comprehensive hardening checklist and rollout gates covering functional, security, and operational checks.

**Primary files**
- `docs/qa-hardening-launch-checklists.md`

## 13) Produce launch and rollback docs
**What changed**
- Finalized runbooks for launch execution, post-launch monitoring, and rollback across app, Nginx, and TLS failure modes.

**Primary files**
- `docs/final-safe-launch-plan.md`
- `deploy/README.md`
- `docs/github-actions-deployment.md`

---

## Latest update in this commit
- Canonical legal center introduced at `/legal`, with explicit legal subroutes for privacy and terms.
- Legacy routes `/privacy-policy` and `/terms` now safely redirect to canonical legal URLs.
- Footer legal links now target canonical legal routes to reduce duplicate index paths.
