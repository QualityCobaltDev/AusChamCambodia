#!/usr/bin/env bash
set -euo pipefail

create_page() {
  local path="$1"
  local title="$2"
  local desc="$3"
  mkdir -p "$(dirname "$path")"
  cat > "$path" <<EOP
import { PageShell } from '@/components/layout/page-shell';

export default function Page() {
  return <PageShell title="$title" description="$desc" />;
}
EOP
}

create_page app/membership/page.tsx "Membership" "Membership entry point for corporate, SME, and individual segments."
create_page app/membership/plans/page.tsx "Membership Plans" "Plan architecture placeholder for tiering, fees, and eligibility definitions."
create_page app/membership/benefits/page.tsx "Membership Benefits" "Benefit catalogue scaffold for advocacy, network, and market access services."
create_page app/membership/join/page.tsx "Join Membership" "Membership conversion flow scaffold with structured onboarding steps."
create_page app/membership/international-business/page.tsx "International Business Membership" "Segment page scaffold for multinational and cross-border operators."
create_page app/membership/local-sme/page.tsx "Local SME Membership" "Segment page scaffold for Cambodian SMEs scaling through chamber support."
create_page app/membership/individual/page.tsx "Individual Membership" "Segment page scaffold for professionals and executives."

create_page app/events/page.tsx "Events" "Events hub scaffold for flagship forums, networking, and member briefings."
create_page app/events/upcoming/page.tsx "Upcoming Events" "Pipeline for future chamber events, registrations, and logistics."
create_page app/events/past/page.tsx "Past Events" "Archive scaffold for event outcomes, highlights, and media assets."

create_page app/resources/page.tsx "Resources" "Resource center scaffold for guides, insights, jobs, and member stories."
create_page app/resources/guides/page.tsx "Guides" "Knowledge asset scaffold for market-entry and operating guides."
create_page app/resources/insights/page.tsx "Insights" "Thought-leadership scaffold for economic and policy commentary."
create_page app/resources/reports/page.tsx "Reports" "Research publication scaffold for chamber reports and whitepapers."
create_page app/resources/member-stories/page.tsx "Member Stories" "Case-study scaffold spotlighting member achievements and impact."
create_page app/resources/jobs/page.tsx "Jobs" "Careers board scaffold for member company opportunities."

create_page app/sponsorship/page.tsx "Sponsorship" "Sponsorship program hub scaffold for strategic brand partnerships."
create_page app/sponsorship/packages/page.tsx "Sponsorship Packages" "Commercial package scaffold for annual and event sponsorship tiers."
create_page app/sponsorship/partners/page.tsx "Sponsorship Partners" "Partner showcase scaffold for current and past sponsors."
create_page app/sponsorship/enquire/page.tsx "Sponsorship Enquiry" "Lead-capture scaffold for sponsorship interest and partnership intake."

create_page app/about/page.tsx "About AusCham Cambodia" "Institutional overview scaffold for mission, governance, and partnerships."
create_page app/about/mission/page.tsx "Mission" "Mission and strategic direction scaffold for chamber objectives."
create_page app/about/committee/page.tsx "Committee" "Governance scaffold for board and committee representation."
create_page app/about/partners/page.tsx "Partners" "Institutional partner scaffold for allied organizations and ecosystems."

create_page app/contact/page.tsx "Contact" "Contact framework scaffold for enquiries, media, and member support."
create_page app/privacy-policy/page.tsx "Privacy Policy" "Legal policy scaffold for privacy, data handling, and consent." 
create_page app/terms/page.tsx "Terms" "Legal terms scaffold for website usage and service conditions."
