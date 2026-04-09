import { getAboutSections, getEventBySlug, getEvents, getMembershipTiers, getPageContent, getResources, getResourceBySlug, getSponsorshipPackages } from '@/lib/cms-service';

const toDateLabel = (value?: string) => (value ? new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBC');

export function getHomepageData() {
  const home = getPageContent('home');
  const membership = getMembershipTiers();
  const events = getEvents();
  const resources = getResources();
  const partners = getAboutSections().filter((section) => section.slug.includes('partner'));

  return {
    hero: {
      eyebrow: home?.subtitle ?? 'Australia-Cambodia business leadership',
      title: home?.title ?? 'AusCham Cambodia',
      intro: home?.body ?? '',
      primaryCta: { label: 'Explore membership', href: '/membership' },
      secondaryCta: { label: 'View upcoming events', href: '/events' },
    },
    featuredPlans: membership.map((plan) => ({ id: plan.id, slug: plan.slug, name: plan.title, annualPriceUsd: Number(plan.price ?? 0), summary: plan.excerpt ?? '' })),
    featuredEvents: events.map((event) => ({ id: event.id, slug: event.slug, title: event.title, excerpt: event.excerpt ?? '', startDate: String(event.startDate ?? event.updatedAt), venue: String(event.location ?? 'Venue TBC') })),
    featuredResources: resources.map((resource) => ({ id: resource.id, slug: resource.slug, title: resource.title, excerpt: resource.excerpt ?? '', resourceType: String(resource.category ?? 'guide').toLowerCase(), author: 'AusCham Secretariat' })),
    featuredStories: [],
    featuredPartners: partners.map((partner) => ({ id: partner.id, name: partner.title })),
  };
}

export function getMembershipPlans() {
  return getMembershipTiers().map((plan) => ({
    id: plan.id,
    slug: plan.slug,
    name: plan.title,
    segmentLabel: String(plan.audienceType ?? 'General'),
    annualPriceUsd: Number(plan.price ?? 0),
    onboardingFeeUsd: undefined,
    summary: plan.excerpt ?? '',
    benefitTitles: Array.isArray(plan.benefits) ? (plan.benefits as string[]) : [],
    comparisonHighlights: Array.isArray(plan.benefits) ? (plan.benefits as string[]) : [],
    ctaLabel: String(plan.ctaLabel ?? 'Apply now'),
  }));
}

export function getEventsAdapter() {
  return getEvents().map((event) => ({
    id: event.id,
    slug: event.slug,
    title: event.title,
    excerpt: event.excerpt ?? '',
    startDate: String(event.startDate ?? event.updatedAt),
    startDateLabel: toDateLabel(String(event.startDate ?? event.updatedAt)),
    venue: String(event.location ?? 'Venue TBC'),
    eventType: String(event.category ?? 'event'),
    featured: Boolean(event.featured),
    body: event.body ?? '',
    tags: event.tags ?? [],
  }));
}

export function getEventBySlugAdapter(slug: string) {
  const event = getEventBySlug(slug);
  if (!event) return null;
  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    excerpt: event.excerpt ?? '',
    startDate: String(event.startDate ?? event.updatedAt),
    startDateLabel: toDateLabel(String(event.startDate ?? event.updatedAt)),
    venue: String(event.location ?? 'Venue TBC'),
    eventType: String(event.category ?? 'event'),
    body: event.body ?? '',
    speakerIds: [],
    tagIds: event.tags ?? [],
  };
}

export function getResourcesAdapter() {
  return getResources().map((resource) => ({
    id: resource.id,
    slug: resource.slug,
    title: resource.title,
    excerpt: resource.excerpt ?? '',
    body: resource.body ?? '',
    resourceType: String(resource.category ?? 'guide').toLowerCase(),
    typeLabel: String(resource.category ?? 'Guide'),
    author: 'AusCham Secretariat',
    publishedAt: resource.publishedAt ?? resource.updatedAt,
    publishedAtLabel: toDateLabel(resource.publishedAt ?? resource.updatedAt),
  }));
}

export function getResourceBySlugAdapter(slug: string) {
  const resource = getResourceBySlug(slug);
  if (!resource) return null;
  return {
    id: resource.id,
    slug: resource.slug,
    title: resource.title,
    excerpt: resource.excerpt ?? '',
    body: resource.body ?? '',
    resourceType: String(resource.category ?? 'guide').toLowerCase(),
    typeLabel: String(resource.category ?? 'Guide'),
    author: 'AusCham Secretariat',
    publishedAt: resource.publishedAt ?? resource.updatedAt,
    publishedAtLabel: toDateLabel(resource.publishedAt ?? resource.updatedAt),
  };
}

export function getSponsorshipPackagesAdapter() {
  return getSponsorshipPackages().map((pkg) => ({
    id: pkg.id,
    name: pkg.title,
    tier: pkg.slug,
    annualPriceUsd: Number(pkg.price ?? 0),
    eventInclusionCount: Number(pkg.inclusionCount ?? 0),
    benefits: Array.isArray(pkg.benefits) ? (pkg.benefits as string[]) : [],
  }));
}

export function getCommitteeMembers() {
  return getAboutSections()
    .filter((section) => section.slug.includes('committee'))
    .map((section) => ({ id: section.id, name: section.title, title: section.subtitle ?? 'Committee Member', organization: 'AusCham Cambodia', role: section.subtitle ?? 'Committee Member', company: 'AusCham Cambodia', bio: section.body ?? section.excerpt ?? '' }));
}

export function getMemberStories() {
  return getAboutSections()
    .filter((section) => section.slug.includes('story') || section.slug.includes('mission'))
    .map((section) => ({ id: section.id, title: section.title, summary: section.excerpt ?? '', body: section.body ?? '', memberName: 'AusCham Member', company: 'Member Company', impactMetric: section.subtitle ?? '' }));
}
