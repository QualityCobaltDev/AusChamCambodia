# Editorial workflow and CMS safety guide

## Purpose
This rebuild uses a **CMS-ready architecture** with Sanity-style schemas and a typed adapter layer, while frontend pages can still render from local mock data. This allows safe iteration before CMS credentials and studio rollout are completed.

## Content governance principles
1. **Single source of truth**:
   - Membership pricing lives only in `membershipPlan.annualPriceUsd`.
   - Sponsorship pricing lives only in `sponsorshipPackage.annualPriceUsd`.
   - Pages must read plan/package pricing via adapter helpers, not hard-coded values.
2. **Status workflow**:
   - `draft` → `review` → `published` → `archived`.
   - Production pages should only query published content.
3. **Controlled ordering**:
   - Use `order` fields for list curation.
   - Use `featured` for homepage and high-visibility sections.
4. **Safe SEO defaults**:
   - Every document includes SEO metadata.
   - `noIndex` should be enabled for non-public drafts if exposed in preview.

## Editor workflow by section
### Homepage
- Update hero messaging in `homepage`.
- Curate featured plans/events/resources/stories via references.
- Avoid duplicating prices in free text.

### Membership
- Add/update plans in `membershipPlan`.
- Manage reusable advantages in `membershipBenefit`.
- Attach benefits to plans by reference for consistency across segmented pages.

### Events
- Create each listing in `event` with dates, venue, type, speakers, and tags.
- Reuse `speaker` records instead of duplicating bios in event body text.

### Resources
- Publish insights/reports/guides/jobs in `resource`.
- Use `tag` for filtering and future search navigation.

### Sponsorship
- Manage package tiers in `sponsorshipPackage`.
- Keep annual price and inclusion counts updated in package documents only.

### Governance and proof
- Maintain leadership profiles in `committeeMember`.
- Manage social proof in `testimonial` and `memberStory`.

### Operations
- Capture inbound lead metadata in `contactInquiry`.
- Use `redirect` records for legacy URLs during migration.

## Technical integration pattern
- `content/mock/store.ts`: local seed content for immediate rendering.
- `cms/adapters.ts`: maps raw content into stable view models used by UI components.
- `cms/client.ts`: provider selector (`mock` fallback now, Sanity later).
- `cms/queries.ts`: canonical query key map + starter GROQ snippets.
- `cms/sanity/schemas/**`: document schema map and validation definitions.

## Pre-publish checklist
- Confirm status is `published`.
- Validate slug uniqueness.
- Confirm required SEO title and description are present.
- Ensure pricing fields changed only in plan/package records.
- Verify featured/order choices match homepage strategy.
