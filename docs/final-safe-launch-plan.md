# Final Safe Launch Plan: AusCham Cambodia Rebuild (`missioncontrol.quest`)

This procedure is designed for a **shared VPS** (`207.180.207.22`) where another website is already running. It is intentionally host-isolated, reversible, and scoped to the AusCham rebuild only.

---

## 1) Pre-Launch Checklist (Must pass before cutover)

### 1.1 DNS check
1. Confirm `missioncontrol.quest` A record points to `207.180.207.22`.
2. Confirm `www.missioncontrol.quest` points correctly (A or CNAME to apex).
3. Validate propagation from at least two resolvers:
   - `dig +short missioncontrol.quest`
   - `dig +short www.missioncontrol.quest`
4. Confirm the existing live domain still resolves to its expected target and is unchanged.

### 1.2 Environment and isolation check
1. Verify project path exists and is isolated: `/var/www/auscham-missioncontrol`.
2. Verify dedicated env file exists and is populated: `deploy/.env.production`.
3. Validate no secret is accidentally exposed via `NEXT_PUBLIC_*` variables.
4. Confirm compose project name is dedicated (`auscham-missioncontrol`) and does not overlap with other stacks.
5. Confirm host app bind is loopback-only (`127.0.0.1:3008`) to avoid accidental public port conflicts.

### 1.3 Container and app health pre-check
1. Build and start only the AusCham project services.
2. Confirm container state is healthy/running.
3. Validate health endpoint locally on VPS loopback:
   - `curl -fsS http://127.0.0.1:3008/api/health`
4. Confirm no restart loop for AusCham container.

### 1.4 Nginx config validation (project-only)
1. Ensure dedicated vhost file exists:
   - `/etc/nginx/sites-available/auscham-missioncontrol.conf`
2. Ensure dedicated symlink exists:
   - `/etc/nginx/sites-enabled/auscham-missioncontrol.conf`
3. Confirm no edits were made to global `/etc/nginx/nginx.conf` for this launch.
4. Run config syntax check before reload:
   - `sudo nginx -t`

### 1.5 SSL validation (before and after issuance)
1. Ensure ACME webroot exists: `/var/www/letsencrypt`.
2. Issue/renew cert (webroot mode) for:
   - `missioncontrol.quest`
   - `www.missioncontrol.quest`
3. Validate certificate dates/issuer:
   - `echo | openssl s_client -servername missioncontrol.quest -connect missioncontrol.quest:443 2>/dev/null | openssl x509 -noout -dates -issuer -subject`
4. Validate certbot dry-run renewal:
   - `sudo certbot renew --dry-run`

### 1.6 Backup and rollback readiness check
1. Create deployment backup bundle before launch (`deploy/backup-config.sh`).
2. Confirm backup artifact exists and is timestamped.
3. Confirm `.last_successful_sha` exists or seed it from current stable commit.
4. Dry-run rollback command understanding:
   - `./deploy/rollback.sh`
   - `./deploy/rollback.sh <known-good-sha> main`
5. Confirm operator has sudo access for Nginx disable/reload commands.

**Go/No-Go rule:** If any item above fails, launch is paused until corrected.

---

## 2) Exact Launch Sequence (in order)

1. **Freeze window starts**
   - Announce launch start and pause non-essential VPS changes.
2. **Take fresh backup**
   - Run `sudo ./deploy/backup-config.sh`.
3. **Update code to launch target**
   - Checkout target branch (`main` unless approved otherwise).
   - Pull latest fast-forward only.
4. **Build and deploy isolated app**
   - Run `./deploy/deploy.sh` (or `./deploy/deploy.sh <branch>`).
   - Wait for script success and health confirmation.
5. **Verify app on loopback only (before public route)**
   - `curl -I http://127.0.0.1:3008`
   - `curl -fsS http://127.0.0.1:3008/api/health`
6. **Install/verify dedicated Nginx vhost files only**
   - Ensure AusCham vhost file/symlink are present.
   - Do not modify unrelated server blocks.
7. **Validate Nginx syntax**
   - `sudo nginx -t`
8. **Reload Nginx in-place**
   - `sudo systemctl reload nginx`
9. **Provision/validate TLS certificate**
   - Issue/renew cert with webroot if needed.
   - Re-run `sudo nginx -t && sudo systemctl reload nginx`.
10. **Run immediate external smoke checks**
   - `curl -I http://missioncontrol.quest` (expect redirect behavior)
   - `curl -I https://missioncontrol.quest` (expect 200)
   - `curl -I https://www.missioncontrol.quest`
11. **Parallel unaffected-site confirmation**
   - Verify the existing live website still serves normally on its own domain.
12. **Declare launch complete**
   - Record timestamp, deployed commit SHA, and operator notes.

---

## 3) Immediate Post-Launch Validation (first 30 minutes)

1. Confirm homepage, membership, events, resources, sponsorship, about, contact, privacy, terms all load.
2. Verify at least one segmented membership page renders and links correctly.
3. Submit one controlled test form and verify expected delivery path.
4. Validate canonical behavior (HTTP->HTTPS and apex/www policy).
5. Validate security headers are present on production responses.
6. Check app logs and Nginx logs for 4xx/5xx spikes.
7. Reconfirm existing live site behavior is unchanged.

---

## 4) Exact Rollback Sequences

### 4.1 If app fails (bad release, runtime errors, broken UX)
1. Keep Nginx running; do **not** touch other vhosts.
2. Roll back application to last known good commit:
   - `./deploy/rollback.sh`
   - or explicit SHA: `./deploy/rollback.sh <known-good-sha> main`
3. Validate loopback health endpoint.
4. Re-test public domain URLs.
5. Record incident with failed SHA and recovery SHA.

### 4.2 If Nginx config breaks (`nginx -t` fails or bad routing)
1. Immediately disable only AusCham vhost symlink:
   - `sudo rm -f /etc/nginx/sites-enabled/auscham-missioncontrol.conf`
2. Validate Nginx config:
   - `sudo nginx -t`
3. Reload Nginx:
   - `sudo systemctl reload nginx`
4. Confirm existing live website is healthy.
5. Fix AusCham vhost offline, then re-enable and retest.

### 4.3 If SSL fails (cert missing/invalid/expired/mismatch)
1. Keep application available on loopback (no container rollback needed unless app itself failed).
2. Re-run certbot issuance in webroot mode for both hostnames.
3. Validate cert subject/SAN and validity dates.
4. `sudo nginx -t && sudo systemctl reload nginx`.
5. If unresolved quickly, temporarily keep AusCham vhost disabled while preserving the existing live website.

### 4.4 If containers crash/restart loop
1. Capture logs first:
   - `docker compose -p auscham-missioncontrol -f docker-compose.yml logs --tail=200`
2. Restart isolated AusCham service only.
3. If instability persists, execute app rollback (`deploy/rollback.sh`).
4. Re-check health endpoint and production URL.
5. Keep incident notes and open root-cause follow-up before next redeploy.

---

## 5) First 24 Hours Monitoring Checklist

### 0-30 minutes
- Check uptime every 5 minutes for `https://missioncontrol.quest`.
- Track Nginx error log for handshake/upstream failures.
- Confirm no unusual 5xx burst.

### 30 minutes-4 hours
- Monitor container restart count, CPU, memory, and disk.
- Validate contact and membership lead paths still function.
- Spot-check mobile rendering and key navigation flows.

### 4-24 hours
- Hourly checks of:
  - homepage status
  - membership page status
  - contact page status
  - health endpoint
- Review TLS status and expiry telemetry.
- Review error-rate trend and top failing routes.
- Produce 24-hour stabilization report with any remediation actions.

**Escalation threshold examples:**
- sustained 5xx rate > 2% for 5 minutes
- container restarts > 3 within 30 minutes
- TLS or DNS failures at any point

---

## 6) Later Domain Switch Guidance (temporary -> final production domain)

When moving from `missioncontrol.quest` to final production domain, use a staged cutover:

1. **Pre-cutover prep**
   - Add final-domain server_name entries in a separate, reviewed vhost update.
   - Issue TLS cert for final apex + www before DNS switch day.
   - Reduce DNS TTL 24-48h before cutover.

2. **Cutover day**
   - Update DNS A/CNAME to VPS for final domain.
   - Keep `missioncontrol.quest` live as fallback path.
   - Keep both domain certs active during transition.

3. **Validation after cutover**
   - Verify final domain HTTPS + redirects + canonical tags.
   - Confirm sitemap/robots/canonical URLs reflect final domain.
   - Confirm forms and email deliverability for final domain.

4. **Temporary-domain strategy after cutover**
   - For a stabilization window (recommended 2-4 weeks), keep `missioncontrol.quest` active with 301 redirects to final domain.
   - After window closes, decide whether to retain as permanent redirect domain.

5. **Reversibility**
   - If final-domain cutover fails, revert DNS to prior known-good target and continue serving from `missioncontrol.quest` while issues are fixed.

---

## 7) Operational Guardrails (must remain true)

- Never stop global Nginx service unless absolutely required; prefer config test + reload.
- Never replace global Nginx config for this project.
- Never reuse another project's container names, compose project, env files, or ports.
- All changes must be scoped to AusCham artifacts and be reversible in one operator session.
