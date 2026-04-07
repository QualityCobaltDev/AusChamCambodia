import { getCommitteeMembers, getEventBySlug, getEvents, getHomepageData, getMembershipPlans, getMemberStories, getResourceBySlug, getResources, getSponsorshipPackages } from '@/cms/adapters';

export type CmsProvider = 'sanity' | 'mock';

export interface CmsClient {
  provider: CmsProvider;
  getHomepage: typeof getHomepageData;
  getMembershipPlans: typeof getMembershipPlans;
  getEvents: typeof getEvents;
  getEventBySlug: typeof getEventBySlug;
  getResources: typeof getResources;
  getResourceBySlug: typeof getResourceBySlug;
  getSponsorshipPackages: typeof getSponsorshipPackages;
  getCommitteeMembers: typeof getCommitteeMembers;
  getMemberStories: typeof getMemberStories;
}

export function getCmsClient(): CmsClient {
  const provider = (process.env.CMS_PROVIDER as CmsProvider | undefined) ?? 'mock';

  return {
    provider,
    getHomepage: getHomepageData,
    getMembershipPlans,
    getEvents,
    getEventBySlug,
    getResources,
    getResourceBySlug,
    getSponsorshipPackages,
    getCommitteeMembers,
    getMemberStories,
  };
}
