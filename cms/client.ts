import {
  getCommitteeMembers,
  getEventBySlugAdapter,
  getEventsAdapter,
  getHomepageData,
  getMemberStories,
  getMembershipPlans,
  getResourceBySlugAdapter,
  getResourcesAdapter,
  getSponsorshipPackagesAdapter,
} from '@/cms/adapters';

export type CmsProvider = 'jsondb';

export interface CmsClient {
  provider: CmsProvider;
  getHomepage: typeof getHomepageData;
  getMembershipPlans: typeof getMembershipPlans;
  getEvents: typeof getEventsAdapter;
  getEventBySlug: typeof getEventBySlugAdapter;
  getResources: typeof getResourcesAdapter;
  getResourceBySlug: typeof getResourceBySlugAdapter;
  getSponsorshipPackages: typeof getSponsorshipPackagesAdapter;
  getCommitteeMembers: typeof getCommitteeMembers;
  getMemberStories: typeof getMemberStories;
}

export function getCmsClient(): CmsClient {
  return {
    provider: 'jsondb',
    getHomepage: getHomepageData,
    getMembershipPlans,
    getEvents: getEventsAdapter,
    getEventBySlug: getEventBySlugAdapter,
    getResources: getResourcesAdapter,
    getResourceBySlug: getResourceBySlugAdapter,
    getSponsorshipPackages: getSponsorshipPackagesAdapter,
    getCommitteeMembers,
    getMemberStories,
  };
}
