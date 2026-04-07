export const cmsQueryKeys = {
  siteSettings: 'site-settings',
  homepage: 'homepage',
  membershipPlans: 'membership-plans',
  membershipBenefits: 'membership-benefits',
  events: 'events',
  eventBySlug: (slug: string) => `event:${slug}`,
  resources: 'resources',
  resourceBySlug: (slug: string) => `resource:${slug}`,
  sponsorshipPackages: 'sponsorship-packages',
  committeeMembers: 'committee-members',
  memberStories: 'member-stories',
} as const;

export const sanityGroq = {
  siteSettings: `*[_type == "siteSettings"][0]`,
  homepage: `*[_type == "homepage" && status == "published"][0]`,
  membershipPlans: `*[_type == "membershipPlan" && status == "published"] | order(order asc)`,
  events: `*[_type == "event" && status == "published"] | order(startDate asc)`,
  resources: `*[_type == "resource" && status == "published"] | order(publishedAt desc)`,
  sponsorshipPackages: `*[_type == "sponsorshipPackage" && status == "published"] | order(order asc)`,
} as const;
