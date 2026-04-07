# AusCham Overhaul Migration & Redirect Plan

## Scope and deployment safety assumptions
- Target runtime: isolated Docker stack on `207.180.207.22`, routed by host header for `missioncontrol.quest` only.
- Migration strategy is incremental and reversible: introduce redirects and 410 logic in the new stack without modifying unrelated vhosts.
- This plan is written for a controlled cutover from a legacy information architecture (IA) to the new IA.

## 1) Legacy-to-new structure map

| Legacy section / intent | Typical legacy URLs | New IA destination | Fate |
|---|---|---|---|
| Home | `/home`, `/index.php`, `/index.html` | `/` | 301 |
| Membership overview | `/membership`, `/membership-plans` | `/membership`, `/membership/plans` | 301/canonical |
| Join flow | `/become-a-member`, `/join-us` | `/membership/join` | 301 |
| Membership benefits | `/membership-benefits` | `/membership/benefits` | 301 |
| Corporate membership | `/corporate-membership` | `/membership/international-business` | 301 |
| SME membership | `/sme-membership` | `/membership/local-sme` | 301 |
| Individual membership | `/individual-membership` | `/membership/individual` | 301 |
| Events hub | `/events`, `/event-calendar` | `/events` | 301/canonical |
| Upcoming events | `/upcoming-events` | `/events/upcoming` | 301 |
| Past events | `/past-events` | `/events/past` | 301 |
| News/blog | `/news`, `/blog` | `/resources/insights` | 301 |
| Reports/publications | `/reports`, `/publications` | `/resources/reports` | 301 |
| Guides | `/guides` | `/resources/guides` | 301 |
| Jobs | `/jobs`, `/job-board` | `/resources/jobs` | 301 |
| Sponsorship | `/sponsorship`, `/sponsorship-opportunities` | `/sponsorship/packages` | 301 |
| Sponsors/partners | `/sponsors`, `/partners` | `/sponsorship/partners` | 301 |
| About | `/about-us`, `/about` | `/about` | 301/canonical |
| Committee/board | `/committee`, `/board` | `/about/committee` | 301 |
| Mission | `/mission` | `/about/mission` | 301 |
| Contact | `/contact-us` | `/contact` | 301 |
| Privacy policy | `/privacy-policy` | `/legal/privacy-policy` | 301 |
| Terms | `/terms-and-conditions` | `/legal/terms-of-use` | 301 |

> Note: This mapping uses deterministic legacy patterns and should be reconciled with the final crawl export (Screaming Frog + server logs) before cutover.

## 2) Redirect rules for legacy URLs

### Canonical implementation source
- Next.js rules: `lib/redirects.ts`
- Next.js wiring: `next.config.ts` (`redirects()`)
- Nginx equivalent snippet: `deploy/nginx.redirects.auscham.conf`

### Rule strategy
1. One-step 301 only (no chains).
2. Route to closest topical equivalent, not always homepage.
3. Preserve crawl equity by keeping redirect set stable for at least 12 months post-launch.
4. Do not redirect retired low-value technical URLs (serve 410).

## 3) URLs that should return 410 (Gone)

Use 410 for clearly retired, non-user-serving endpoints and archive artifacts:
- `/author/*`
- `/tag/*`
- `/category/uncategorized/*`
- Date archives (`/YYYY/MM/DD/*`)
- `/feed`, `/comments/feed`
- WordPress technical endpoints (`/xmlrpc.php`, `/wp-login.php`, `/wp-admin/*`, `/wp-content/*`, `/wp-includes/*`)

### Why 410 here
- Faster de-indexing than soft-404 patterns.
- Reduces crawl waste on obsolete paths.
- Prevents low-intent archives from cannibalizing new authority hubs.

## 4) SEO continuity controls

1. **Canonical discipline**
   - Self-referencing canonical tags on indexable pages.
   - Canonical host fixed to `https://missioncontrol.quest` during temporary-domain period.
2. **Information architecture continuity**
   - Membership, Events, Resources, Sponsorship, About, Contact, Legal all receive dedicated indexable hubs.
3. **Metadata continuity**
   - Carry forward title/description intent from top-performing legacy URLs to new topical equivalents.
4. **Internal link migration**
   - Replace old slugs in navigation, footer, and editorial body content before launch.
5. **Sitemap + robots alignment**
   - Sitemap should include only final canonical URLs (exclude redirected and 410 URLs).
6. **Monitoring window**
   - First 30 days: daily redirect error scan (404/5xx), weekly GSC coverage review.

## 5) Redirect config options

### Option A: Next.js (already wired)
- Manage rules in `lib/redirects.ts`.
- `next.config.ts` loads `legacyRedirects` for 301s.
- `middleware.ts` returns 410 for retired patterns.

### Option B: Nginx (edge handling)
- Use `deploy/nginx.redirects.auscham.conf` as an include snippet under the `missioncontrol.quest` server block.
- Keep snippet vhost-local; do not place rules in global Nginx config.

## 6) Content migration checklist

### Membership plans
- [ ] Finalize plan matrix with authoritative pricing, inclusions, and renewal terms.
- [ ] Confirm audience segmentation: International Business, Local SME, Individual.
- [ ] Align CTA flow and form fields with CRM/member onboarding process.

### Sponsorship packages
- [ ] Migrate package tiers with benefits, inventory, and deliverables.
- [ ] Define package validity period and event-specific upsell logic.
- [ ] Add contact workflow for package enquiries with clear owner.

### Events
- [ ] Migrate upcoming events with structured fields (date, venue, registration state).
- [ ] Archive past events with outcomes/assets where available.
- [ ] Ensure event URLs are stable and compatible with future CMS ingestion.

### Committee content
- [ ] Verify committee member names, roles, company, and tenure dates.
- [ ] Confirm governance page hierarchy (`/about/committee`, supporting profile pages if needed).

### About content
- [ ] Migrate mission, mandate, chamber value proposition, and partner ecosystem.
- [ ] Remove dated statements not backed by current governance-approved wording.

### Legal content
- [ ] Publish privacy policy, terms of use, and cookie disclosure (if applicable).
- [ ] Confirm legal text ownership and approval before publishing.

## 7) Unresolved-content checklist (must be manually resolved before launch)

1. **Bronze pricing mismatch**
   - Source references disagree on Bronze tier fee/value.
   - Action: appoint single source of truth (finance-approved pricing sheet) and reconcile all mentions.

2. **Plan naming inconsistencies**
   - Naming variants across draft materials (e.g., Corporate vs International Business; SME vs Local SME).
   - Action: freeze naming taxonomy and apply globally in navigation, page H1s, metadata, forms, and collateral.

3. **Resource promises not currently surfaced**
   - Claimed member resource access/benefits exist in strategy docs but are not clearly surfaced in page UX.
   - Action: add explicit “what members get” blocks under Resources and Membership benefits.

## 8) Launch-day validation steps (redirects + canonicals)

1. **Pre-switch validation (staging host)**
   - Run URL list test (legacy sample + top landing pages) and verify expected 301/410 status.
2. **Cutover validation (production host)**
   - Confirm no redirect loops/chains (`<=1 hop` target).
   - Verify random sample from each legacy cluster reaches intended new destination.
3. **Canonical validation**
   - Spot-check canonical tags on Home, Membership, Events, Resources, Sponsorship, About, Contact, Legal.
   - Confirm canonical host and protocol always `https://missioncontrol.quest`.
4. **Post-launch monitoring**
   - Check server logs for repeated 404s and promote high-frequency misses into redirect table where appropriate.
   - Re-submit XML sitemap in Google Search Console and monitor indexing/coverage deltas.

## Controlled migration gates

- Gate 1: Redirect inventory sign-off (legacy export mapped with fate for every URL pattern).
- Gate 2: Content consistency sign-off (pricing, naming, resource claims).
- Gate 3: Technical sign-off (301/410 behavior, canonicals, sitemap/robots, no chain loops).
- Gate 4: Go-live and 30-day observation plan accepted by stakeholders.
