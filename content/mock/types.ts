export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';

export interface SeoFields {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

export interface BaseDocument {
  id: string;
  status: ContentStatus;
  slug: string;
  featured?: boolean;
  order?: number;
  seo: SeoFields;
  updatedAt: string;
}

export interface SiteSettings extends Omit<BaseDocument, 'slug'> {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone?: string;
  defaultSeo: SeoFields;
  socialLinks: Array<{ platform: string; url: string }>;
  slug: 'site-settings';
}

export interface Homepage extends BaseDocument {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
  sections: {
    featuredPlanIds: string[];
    featuredEventIds: string[];
    featuredResourceIds: string[];
    featuredStoryIds: string[];
    featuredPartnerIds: string[];
  };
}

export interface Page extends BaseDocument {
  title: string;
  summary: string;
  body: string;
  pageType: 'standard' | 'legal' | 'landing';
}

export interface MembershipBenefit extends BaseDocument {
  title: string;
  description: string;
  category: 'advocacy' | 'network' | 'visibility' | 'insight' | 'services';
}

export interface MembershipPlan extends BaseDocument {
  name: string;
  segment: 'international-business' | 'local-sme' | 'individual';
  annualPriceUsd: number;
  onboardingFeeUsd?: number;
  summary: string;
  benefitIds: string[];
  comparisonHighlights: string[];
  ctaLabel: string;
}

export interface Speaker extends BaseDocument {
  name: string;
  title: string;
  organization: string;
  bio: string;
  headshotUrl?: string;
}

export interface Event extends BaseDocument {
  title: string;
  excerpt: string;
  startDate: string;
  endDate?: string;
  venue: string;
  eventType: 'forum' | 'networking' | 'briefing' | 'training';
  registrationUrl?: string;
  speakerIds: string[];
  tagIds: string[];
}

export interface Resource extends BaseDocument {
  title: string;
  excerpt: string;
  body: string;
  resourceType: 'insight' | 'report' | 'guide' | 'job';
  publishedAt: string;
  author: string;
  tagIds: string[];
}

export interface Testimonial extends BaseDocument {
  quote: string;
  personName: string;
  personTitle: string;
  company: string;
}

export interface MemberStory extends BaseDocument {
  title: string;
  summary: string;
  body: string;
  memberName: string;
  company: string;
  impactMetric?: string;
}

export interface SponsorshipPackage extends BaseDocument {
  name: string;
  tier: 'platinum' | 'gold' | 'silver' | 'supporting';
  annualPriceUsd: number;
  eventInclusionCount: number;
  benefits: string[];
}

export interface CommitteeMember extends BaseDocument {
  name: string;
  role: string;
  company: string;
  bio: string;
  committeeType: 'executive' | 'advisory' | 'working-group';
}

export interface Partner extends BaseDocument {
  name: string;
  category: 'strategic' | 'media' | 'institutional';
  website: string;
  logoUrl?: string;
}

export interface ContactInquiry extends BaseDocument {
  fullName: string;
  email: string;
  company?: string;
  inquiryType: 'membership' | 'events' | 'sponsorship' | 'media' | 'other';
  message: string;
}

export interface Redirect extends BaseDocument {
  fromPath: string;
  toPath: string;
  permanent: boolean;
}

export interface Tag extends BaseDocument {
  label: string;
  taxonomy: 'industry' | 'topic' | 'audience';
}

export interface MockContentStore {
  siteSettings: SiteSettings;
  homepage: Homepage;
  pages: Page[];
  membershipPlans: MembershipPlan[];
  membershipBenefits: MembershipBenefit[];
  events: Event[];
  speakers: Speaker[];
  resources: Resource[];
  testimonials: Testimonial[];
  memberStories: MemberStory[];
  sponsorshipPackages: SponsorshipPackage[];
  committeeMembers: CommitteeMember[];
  partners: Partner[];
  contactInquiries: ContactInquiry[];
  redirects: Redirect[];
  tags: Tag[];
}
