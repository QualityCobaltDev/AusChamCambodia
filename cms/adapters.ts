import { mockContentStore } from '@/content/mock/store';
import type { Event, MembershipBenefit, MembershipPlan, Resource, SponsorshipPackage } from '@/content/mock/types';

const byOrder = <T extends { order?: number }>(items: T[]) => [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export interface MembershipPlanViewModel {
  id: string;
  slug: string;
  name: string;
  segmentLabel: string;
  annualPriceUsd: number;
  onboardingFeeUsd?: number;
  summary: string;
  benefitTitles: string[];
  comparisonHighlights: string[];
  ctaLabel: string;
}

export interface EventViewModel {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  startDateLabel: string;
  venue: string;
  isFeatured: boolean;
}

export interface ResourceViewModel {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  typeLabel: string;
  publishedAtLabel: string;
}

export interface SponsorshipPackageViewModel {
  id: string;
  name: string;
  tier: string;
  annualPriceUsd: number;
  eventInclusionCount: number;
  benefits: string[];
}

function mapSegment(segment: MembershipPlan['segment']): string {
  const labels: Record<MembershipPlan['segment'], string> = {
    'international-business': 'International Business',
    'local-sme': 'Local SME',
    individual: 'Individual',
  };
  return labels[segment];
}

function toDateLabel(value: string): string {
  return new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function benefitLookup(benefits: MembershipBenefit[]): Map<string, string> {
  return new Map(benefits.map((benefit) => [benefit.id, benefit.title]));
}

export function getHomepageData() {
  const { homepage, membershipPlans, events, resources, memberStories, partners } = mockContentStore;

  return {
    hero: homepage.hero,
    featuredPlans: membershipPlans.filter((plan) => homepage.sections.featuredPlanIds.includes(plan.id)),
    featuredEvents: events.filter((event) => homepage.sections.featuredEventIds.includes(event.id)),
    featuredResources: resources.filter((resource) => homepage.sections.featuredResourceIds.includes(resource.id)),
    featuredStories: memberStories.filter((story) => homepage.sections.featuredStoryIds.includes(story.id)),
    featuredPartners: partners.filter((partner) => homepage.sections.featuredPartnerIds.includes(partner.id)),
  };
}

export function getMembershipPlans(): MembershipPlanViewModel[] {
  const lookup = benefitLookup(mockContentStore.membershipBenefits);
  return byOrder(mockContentStore.membershipPlans).map((plan) => ({
    id: plan.id,
    slug: plan.slug,
    name: plan.name,
    segmentLabel: mapSegment(plan.segment),
    annualPriceUsd: plan.annualPriceUsd,
    onboardingFeeUsd: plan.onboardingFeeUsd,
    summary: plan.summary,
    benefitTitles: plan.benefitIds.map((id) => lookup.get(id)).filter(Boolean) as string[],
    comparisonHighlights: plan.comparisonHighlights,
    ctaLabel: plan.ctaLabel,
  }));
}

function adaptEvent(event: Event): EventViewModel {
  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    excerpt: event.excerpt,
    startDateLabel: toDateLabel(event.startDate),
    venue: event.venue,
    isFeatured: Boolean(event.featured),
  };
}

export function getEvents(): EventViewModel[] {
  return mockContentStore.events.map(adaptEvent);
}

export function getEventBySlug(slug: string): EventViewModel | null {
  const event = mockContentStore.events.find((entry) => entry.slug === slug);
  return event ? adaptEvent(event) : null;
}

function mapResourceType(type: Resource['resourceType']) {
  return type[0].toUpperCase() + type.slice(1);
}

export function getResources(): ResourceViewModel[] {
  return mockContentStore.resources.map((resource) => ({
    id: resource.id,
    slug: resource.slug,
    title: resource.title,
    excerpt: resource.excerpt,
    typeLabel: mapResourceType(resource.resourceType),
    publishedAtLabel: toDateLabel(resource.publishedAt),
  }));
}

export function getResourceBySlug(slug: string): ResourceViewModel | null {
  const resource = mockContentStore.resources.find((entry) => entry.slug === slug);
  if (!resource) return null;
  return {
    id: resource.id,
    slug: resource.slug,
    title: resource.title,
    excerpt: resource.excerpt,
    typeLabel: mapResourceType(resource.resourceType),
    publishedAtLabel: toDateLabel(resource.publishedAt),
  };
}

export function getSponsorshipPackages(): SponsorshipPackageViewModel[] {
  return byOrder(mockContentStore.sponsorshipPackages).map((pkg: SponsorshipPackage) => ({
    id: pkg.id,
    name: pkg.name,
    tier: pkg.tier,
    annualPriceUsd: pkg.annualPriceUsd,
    eventInclusionCount: pkg.eventInclusionCount,
    benefits: pkg.benefits,
  }));
}

export function getCommitteeMembers() {
  return byOrder(mockContentStore.committeeMembers);
}

export function getMemberStories() {
  return mockContentStore.memberStories;
}
