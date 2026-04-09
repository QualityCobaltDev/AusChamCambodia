import { readDb } from '@/lib/cms-db';

const sortByOrder = <T extends { sortOrder?: number }>(items: T[]) => [...items].sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));

export function getSiteSettings() {
  return readDb().siteSettings;
}

export function getBranding() {
  const db = readDb();
  const logo = db.mediaAssets.find((item) => item.id === db.branding.logoAssetId);
  const favicon = db.mediaAssets.find((item) => item.id === db.branding.faviconAssetId);
  const ogImage = db.mediaAssets.find((item) => item.id === db.branding.ogImageAssetId);
  return { ...db.branding, logo, favicon, ogImage };
}

export function getNavigation() {
  const nav = readDb().navigation;
  return {
    ...nav,
    left: sortByOrder(nav.left).filter((item) => item.visible !== false && item.status !== 'archived'),
    right: sortByOrder(nav.right).filter((item) => item.visible !== false && item.status !== 'archived'),
  };
}

export function getPageContent(slug: string) {
  return readDb().pageContent.find((page) => page.slug === slug);
}

export function getMembershipTiers() {
  return sortByOrder(readDb().membershipTiers).filter((item) => item.status === 'published');
}

export function getEvents() {
  return sortByOrder(readDb().events).filter((item) => item.status === 'published' || item.status === 'draft');
}

export function getEventBySlug(slug: string) {
  return readDb().events.find((event) => event.slug === slug && event.status !== 'archived');
}

export function getResources() {
  return sortByOrder(readDb().resources).filter((item) => item.status !== 'archived');
}

export function getResourceBySlug(slug: string) {
  return readDb().resources.find((resource) => resource.slug === slug && resource.status !== 'archived');
}

export function getSponsorshipPackages() {
  return sortByOrder(readDb().sponsorshipPackages).filter((item) => item.status !== 'archived');
}

export function getAboutSections() {
  return sortByOrder(readDb().aboutSections).filter((item) => item.status !== 'archived');
}

export function getContactSettings() {
  return sortByOrder(readDb().contactSettings).filter((item) => item.status !== 'archived');
}

export function getAdminSnapshot() {
  const db = readDb();
  return {
    counts: {
      pages: db.pageContent.length,
      events: db.events.length,
      resources: db.resources.length,
      sponsorship: db.sponsorshipPackages.length,
      membership: db.membershipTiers.length,
      media: db.mediaAssets.length,
    },
    recentAudit: db.auditLog.slice(0, 12),
  };
}
