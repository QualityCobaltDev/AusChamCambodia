# QA, Hardening, and Launch Readiness Checklists

This document is the final QA and production-hardening layer for the AusCham Cambodia rebuild before public launch on `missioncontrol.quest`.

It assumes the isolated deployment model already defined for this project:
- dedicated app directory and compose project
- dedicated container and env file
- host-based Nginx routing
- no disruption to the existing live website on the same VPS (`207.180.207.22`)

---

## 1) QA Checklist

Use this section as the primary acceptance sheet before go-live.

### A. Visual review
- [ ] Verify all top-level pages render with no layout breakage: Home, Membership, Events, Resources, Sponsorship, About, Contact, Privacy Policy, Terms.
- [ ] Confirm brand consistency: logo usage, color palette, heading scale, spacing rhythm, CTA styles.
- [ ] Validate no clipped text, orphaned headings, broken cards, or overflow on common desktop resolutions (1366, 1440, 1920).
- [ ] Confirm all imagery has intentional crop behavior and no distortion.
- [ ] Check dark/light contrast relationships remain legible across sections.

### B. Mobile responsiveness
- [ ] Validate key breakpoints (320, 375, 390, 414, 768, 1024).
- [ ] Confirm primary nav, mobile menu, and footer links are usable one-handed.
- [ ] Ensure tables, event listings, and membership comparison content remain readable without horizontal scrolling (unless explicitly designed).
- [ ] Confirm tap targets are at least ~44x44 CSS px.
- [ ] Validate sticky UI elements do not block primary content on small screens.

### C. Form behavior
- [ ] Validate all forms submit successfully in expected success path.
- [ ] Validate failure handling: network error, server error, validation error, spam rejection.
- [ ] Confirm inline validation messages are actionable and mapped to specific fields.
- [ ] Confirm required/optional states are explicit and consistent.
- [ ] Confirm success states include clear next steps (e.g., response SLA, follow-up channel).

### D. Navigation
- [ ] Confirm main nav exposes all core information architecture paths.
- [ ] Confirm breadcrumbs (where present) reflect current location accurately.
- [ ] Confirm footer offers redundant access to core pages + legal pages.
- [ ] Confirm no dead-end pages without onward CTAs.
- [ ] Confirm back/forward browser navigation behaves predictably.

### E. Internal links
- [ ] Crawl all internal links and verify no `404`/`500` responses.
- [ ] Confirm no links still point to staging, localhost, or old domains.
- [ ] Validate in-page anchor links land on the correct section and account for sticky headers.
- [ ] Ensure downloadable assets (PDFs, forms) open correctly and are current.

### F. Metadata
- [ ] Every indexable page has unique `<title>` and meta description.
- [ ] Canonical URL is present and points to production domain.
- [ ] Open Graph/Twitter metadata includes meaningful title/description/image.
- [ ] Verify robots directives are correct (`noindex` only where intentional).
- [ ] Confirm sitemap and robots.txt are available and production-valid.

### G. Redirects
- [ ] Confirm legacy URL redirects match migration plan and preserve query strings where needed.
- [ ] Validate no redirect chains longer than 1 hop.
- [ ] Validate no redirect loops.
- [ ] Validate HTTP→HTTPS and apex↔www behavior matches chosen canonical policy.

### H. Accessibility baseline
- [ ] Validate visible keyboard focus on all interactive controls.
- [ ] Confirm semantic heading hierarchy (`h1` to `h2/h3`) is logical.
- [ ] Confirm all images have appropriate alt text (decorative images marked accordingly).
- [ ] Confirm ARIA is only used when native semantics are insufficient.
- [ ] Validate screen reader announcements for form errors and async state updates.

### I. Performance checks
- [ ] Confirm optimized image usage (next/image, appropriate sizing, modern formats).
- [ ] Confirm no oversized JS bundles from avoidable client-side imports.
- [ ] Confirm route-level code splitting and lazy loading where useful.
- [ ] Confirm caching headers for static assets and CDN compatibility.
- [ ] Confirm no critical console errors or hydration warnings on key pages.

### J. SSL and transport
- [ ] TLS certificate valid for `missioncontrol.quest` and `www.missioncontrol.quest`.
- [ ] Verify cert auto-renewal dry-run succeeds.
- [ ] Confirm HSTS policy is intentional (start conservative if first launch).
- [ ] Confirm mixed-content issues are absent.

---

## 2) Lighthouse Targets (Launch Gates)

Set explicit launch thresholds for both desktop and mobile runs on key templates (Home, Membership landing, Event detail, Resource detail, Contact).

- **Performance**: >= 85 (mobile), >= 92 (desktop)
- **Accessibility**: >= 95 (mobile + desktop)
- **Best Practices**: >= 95
- **SEO**: >= 95

Operational guidance:
- Run at least 3 Lighthouse passes per template and use median score.
- Investigate regressions >5 points between runs.
- Treat Accessibility score below 95 as launch-blocking unless approved exception is documented.

---

## 3) Accessibility Deep Checks (Required)

### Focus states
- [ ] Every link/button/input/select/textarea has a visible focus indicator with sufficient contrast.
- [ ] Focus indicator is not removed by global CSS reset.
- [ ] Focus order follows DOM reading order.

### Form labels
- [ ] Every input has a programmatically associated `<label>`.
- [ ] Placeholder text is not used as the only label.
- [ ] Error/help text is programmatically associated (`aria-describedby` when needed).

### Contrast
- [ ] Body text meets WCAG AA (4.5:1 for normal text).
- [ ] Large text meets at least 3:1.
- [ ] Interactive states (hover/focus/disabled) remain readable.

### Keyboard navigation
- [ ] Full site navigation is possible without a mouse.
- [ ] Menus, dialogs, and accordions support keyboard controls and escape behaviors.
- [ ] No keyboard traps.

### Skip links
- [ ] A skip-to-content link is present and keyboard reachable at top of page.
- [ ] Skip link target is valid and lands before primary content.

---

## 4) Security and App Hardening Checklist

### Env usage
- [ ] Production uses `deploy/.env.production` only; no fallback to dev env files in runtime container.
- [ ] No secrets are exposed via `NEXT_PUBLIC_*` variables.
- [ ] Required env vars validated at startup/build (fail fast if missing).

### No exposed secrets
- [ ] Repository scan confirms no committed secrets, tokens, private keys, or credentials.
- [ ] Client bundles inspected for accidental secret leakage.
- [ ] Error responses do not leak stack traces in production.

### Rate limiting
- [ ] Apply rate limiting on public form/API endpoints (Nginx or app layer).
- [ ] Define per-IP burst and sustained thresholds.
- [ ] Confirm abusive traffic receives safe error status (`429`) without app crash.

### Spam protection
- [ ] Implement bot mitigation on forms (honeypot + server validation and/or CAPTCHA).
- [ ] Add server-side validation for all user-submitted fields.
- [ ] Add minimal content heuristics for repeated spam payloads.

### Secure headers recommendations
- [ ] Security headers enabled at Nginx vhost level for this project only.
- [ ] Confirm headers on production response with `curl -I https://missioncontrol.quest`.

---

## 5) Nginx Security Header Guidance (Project Vhost Only)

Apply in `deploy/nginx.auscham.conf` (or host copy under `/etc/nginx/sites-available/auscham-missioncontrol.conf`) without changing global Nginx config.

Recommended baseline:

```nginx
# Clickjacking
add_header X-Frame-Options "SAMEORIGIN" always;

# MIME sniffing protection
add_header X-Content-Type-Options "nosniff" always;

# Referrer leakage control
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Browser feature permissions (tighten as required)
add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=()" always;

# Baseline CSP (tune for actual third-party scripts before enforcing)
add_header Content-Security-Policy "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; object-src 'none'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https:; font-src 'self' data:; upgrade-insecure-requests" always;
```

CSP rollout guidance:
- Start with `Content-Security-Policy-Report-Only` for 3-7 days if third-party scripts are still being finalized.
- Move to enforced CSP only after violations are triaged.
- Remove `'unsafe-inline'` where feasible by using nonce/hash strategy.

---

## 6) Production Logging and Monitoring Guidance

### Application-level
- Structured JSON logs for request lifecycle: timestamp, route, method, status, latency, request-id.
- Include source context for failures (component/API/action), but never log secrets or full PII payloads.
- Generate stable request correlation IDs and forward through proxy/app layers.

### Nginx-level
- Dedicated access/error logs for AusCham vhost (separate from existing live site logs).
- Include upstream response time and status in access log format.
- Alert on spikes of 4xx/5xx, high upstream latency, and repeated `429` responses.

### Infrastructure monitoring
- Track VPS CPU, memory, disk, inode usage, container restart count, and network saturation.
- Set alert thresholds with clear owner/escalation path.
- Validate backup and restore procedure for deployment config + environment files.

### Uptime and synthetic checks
- External monitor every 1-5 minutes for:
  - homepage 200 check
  - contact page 200 check
  - form endpoint health
  - TLS expiry threshold alerts (30/14/7 days)
- Add synthetic journey: Home -> Membership -> Contact form render.

---

## 7) Pre-Launch Go/No-Go Checklist

Launch only if all go criteria are met.

### Go criteria
- [ ] Critical QA checklist items passed (visual, navigation, links, forms, metadata, redirects).
- [ ] Lighthouse targets achieved or approved exceptions documented.
- [ ] Accessibility required checks passed (focus, labels, contrast, keyboard, skip link).
- [ ] Security checks passed (env, secrets, rate limiting, spam controls, headers).
- [ ] SSL valid and auto-renew dry-run successful.
- [ ] Rollback path tested (`deploy/rollback.sh`) and confirmed.
- [ ] Existing live website unaffected in parallel verification.
- [ ] Stakeholder sign-off recorded (product + technical owner).

### No-go triggers
- [ ] Any P0/P1 defect unresolved.
- [ ] Form submission failures on production-like environment.
- [ ] Broken critical redirect or canonicalization behavior.
- [ ] Accessibility blockers on primary user journeys.
- [ ] No tested rollback path.

---

## 8) Post-Launch Smoke Test Checklist (First 1-24 Hours)

Run immediately after go-live and repeat during first day.

### Immediate (0-30 minutes)
- [ ] Confirm homepage loads on `https://missioncontrol.quest`.
- [ ] Confirm TLS valid and no browser warning.
- [ ] Confirm top nav and footer links function.
- [ ] Submit and verify at least one test form submission end-to-end.
- [ ] Confirm legacy redirects return expected destinations.
- [ ] Confirm existing unrelated live website still works normally.

### Early observation (30 minutes - 4 hours)
- [ ] Review app + Nginx logs for errors and unusual traffic patterns.
- [ ] Confirm no surge in 5xx responses.
- [ ] Confirm no CSP/security header breakage in real sessions.
- [ ] Validate mobile behavior on at least iOS + Android devices.

### Stabilization (4-24 hours)
- [ ] Re-run smoke flow for top journeys.
- [ ] Re-run Lighthouse on top templates and compare to pre-launch baseline.
- [ ] Confirm monitoring alerts are operational and routed correctly.
- [ ] Document post-launch issues and remediation owners.

---

## Suggested Execution Ownership

- QA Lead: visual, links, forms, metadata, redirects, smoke retests.
- Accessibility Specialist: focus/keyboard/labels/contrast/skip-link sign-off.
- DevOps/Platform: SSL, headers, rate limiting, logging, monitoring, rollback validation.
- Product Owner: go/no-go decision with explicit risk acceptance for any exception.
