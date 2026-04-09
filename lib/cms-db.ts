import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface MediaAsset {
  id: string;
  slug: string;
  title: string;
  type: 'image' | 'video' | 'file' | 'logo' | 'favicon';
  mimeType: string;
  storagePath: string;
  altText: string;
  fileSize: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}

export interface CmsEntity {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  body?: string;
  status: ContentStatus;
  featured?: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  archivedAt?: string;
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
  };
  [key: string]: unknown;
}

export interface CmsDatabase {
  admins: { id: string; email: string; name: string; createdAt: string }[];
  siteSettings: {
    siteName: string;
    siteUrl: string;
    contactEmail: string;
    contactPhone: string;
    footerText: string;
    globalCtaLabel: string;
    globalCtaHref: string;
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    analyticsHead?: string;
    socialLinks: { platform: string; url: string }[];
    updatedAt: string;
  };
  branding: {
    logoAssetId?: string;
    faviconAssetId?: string;
    ogImageAssetId?: string;
    updatedAt: string;
  };
  navigation: {
    left: CmsEntity[];
    right: CmsEntity[];
    adminLabel: string;
    updatedAt: string;
  };
  pageContent: CmsEntity[];
  membershipTiers: CmsEntity[];
  events: CmsEntity[];
  resources: CmsEntity[];
  sponsorshipPackages: CmsEntity[];
  aboutSections: CmsEntity[];
  contactSettings: CmsEntity[];
  mediaAssets: MediaAsset[];
  auditLog: { id: string; action: string; entityType: string; entityId: string; timestamp: string }[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cms-db.json');

const nowIso = () => new Date().toISOString();

function ensureSeed(): CmsDatabase {
  const now = nowIso();
  const navItem = (slug: string, title: string, href: string, sortOrder: number): CmsEntity => ({
    id: `nav-${slug}`,
    slug,
    title,
    status: 'published',
    sortOrder,
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
    href,
    visible: true,
  });

  const page = (slug: string, title: string, subtitle: string, body: string, order = 1): CmsEntity => ({
    id: `page-${slug}`,
    slug,
    title,
    subtitle,
    body,
    excerpt: subtitle,
    status: 'published',
    sortOrder: order,
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
    sections: [],
  });

  return {
    admins: [{ id: 'admin-default', email: 'admin@auscham.local', name: 'AusCham Admin', createdAt: now }],
    siteSettings: {
      siteName: 'AusCham Cambodia',
      siteUrl: 'https://elevareai.online',
      contactEmail: 'info@auschamcambodia.com',
      contactPhone: '+855 23 000 000',
      footerText: 'AusCham Cambodia connects members through trusted market intelligence, events, and partnerships.',
      globalCtaLabel: 'Contact us',
      globalCtaHref: '/contact',
      defaultMetaTitle: 'AusCham Cambodia',
      defaultMetaDescription: 'Australia-Cambodia chamber for business growth, events, resources, and market access.',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/auscham-cambodia' },
        { platform: 'Facebook', url: 'https://facebook.com/auschamcambodia' },
      ],
      updatedAt: now,
    },
    branding: { updatedAt: now },
    navigation: {
      left: [navItem('home', 'Home', '/', 1), navItem('membership', 'Membership', '/membership', 2), navItem('events', 'Events', '/events', 3)],
      right: [
        navItem('resources', 'Resources', '/resources', 1),
        navItem('sponsorship', 'Sponsorship', '/sponsorship', 2),
        navItem('about', 'About', '/about', 3),
        navItem('contact', 'Contact', '/contact', 4),
      ],
      adminLabel: 'Admin',
      updatedAt: now,
    },
    pageContent: [
      page('home', 'A high-trust market platform for members and partners.', 'Australia–Cambodia business leadership', 'AusCham Cambodia connects decision-makers through programs, events, practical resources, and sponsorship opportunities.'),
      page('membership', 'Membership that scales with your ambition', 'Plans and segments', 'Flexible tiers with meaningful outcomes and clear benefits.'),
      page('events', 'Events built for market-moving conversations', 'Upcoming and past calendar', 'Discover executive briefings, forums, and member-only sessions.'),
      page('resources', 'Actionable resources for decision-makers', 'Guides, insights, reports, member stories, jobs', 'Browse practical content to support market entry and expansion.'),
      page('sponsorship', 'Sponsorship opportunities with high-quality exposure', 'Partner packages', 'Support flagship programs and engage our executive network.'),
      page('about', 'About AusCham Cambodia', 'Mission, committee, and partners', 'We foster trusted collaboration between Australian and Cambodian business communities.'),
      page('contact', 'Get in touch with AusCham Cambodia', 'Contact and enquiries', 'Send an enquiry and our team will route it to the relevant desk.'),
    ],
    membershipTiers: [
      {
        id: 'tier-international', slug: 'international-business', title: 'International Business', subtitle: 'For regional leaders',
        body: 'Dedicated account management and policy access.', excerpt: 'Executive-grade tier for multinational and regional firms.',
        status: 'published', featured: true, sortOrder: 1, createdAt: now, updatedAt: now, publishedAt: now,
        price: 2500, ctaLabel: 'Apply now', ctaUrl: '/membership/join', audienceType: 'international-business', benefits: ['Policy advocacy access', 'Executive networking calendar'],
      },
    ],
    events: [
      {
        id: 'event-1', slug: 'executive-breakfast-q2-2026', title: 'Executive Breakfast: Cambodia Market Signals 2026', excerpt: 'Quarterly executive briefing.',
        body: 'Deep dive into market signals and investment priorities.', status: 'published', featured: true, sortOrder: 1, createdAt: now, updatedAt: now, publishedAt: now,
        startDate: '2026-05-18T01:00:00.000Z', endDate: '2026-05-18T03:00:00.000Z', location: 'Raffles Hotel Le Royal, Phnom Penh', registrationUrl: '/contact', category: 'briefing', tags: ['market-intelligence'],
      },
    ],
    resources: [
      {
        id: 'resource-1', slug: 'investor-entry-guide-cambodia-2026', title: 'Investor Entry Guide: Cambodia 2026', excerpt: 'Framework for market-entry sequencing.',
        body: 'Comprehensive guide for new entrants and expansion teams.', status: 'published', featured: true, sortOrder: 1, createdAt: now, updatedAt: now, publishedAt: now,
        category: 'Guides', externalUrl: '', fileAssetId: '', tags: ['guide'],
      },
    ],
    sponsorshipPackages: [
      {
        id: 'sponsor-1', slug: 'platinum-package', title: 'Platinum Sponsorship', subtitle: 'Flagship visibility', excerpt: 'High-impact annual package',
        body: 'Brand placement across flagship events and speaking opportunities.', status: 'published', featured: true, sortOrder: 1, createdAt: now, updatedAt: now, publishedAt: now,
        price: 12000, inclusionCount: 8, ctaLabel: 'Enquire now', ctaUrl: '/sponsorship/enquire', benefits: ['Speaking slots', 'Event branding', 'Member visibility'],
      },
    ],
    aboutSections: [
      { id: 'about-mission', slug: 'mission', title: 'Our Mission', excerpt: 'Trusted bridge for business growth', body: 'AusCham accelerates market confidence through informed dialogue and practical collaboration.', status: 'published', sortOrder: 1, createdAt: now, updatedAt: now, publishedAt: now },
      { id: 'about-committee', slug: 'committee', title: 'Committee', excerpt: 'Leadership team', body: 'Committee profiles can be managed here.', status: 'published', sortOrder: 2, createdAt: now, updatedAt: now, publishedAt: now },
      { id: 'about-partners', slug: 'partners', title: 'Partners', excerpt: 'Strategic partners', body: 'Partner logos and details can be managed here.', status: 'published', sortOrder: 3, createdAt: now, updatedAt: now, publishedAt: now },
    ],
    contactSettings: [
      { id: 'contact-general', slug: 'general', title: 'General inquiry', excerpt: 'General enquiries', body: 'Route to info@auschamcambodia.com', status: 'published', sortOrder: 1, createdAt: now, updatedAt: now, publishedAt: now, recipientEmail: 'info@auschamcambodia.com' },
      { id: 'contact-membership', slug: 'membership', title: 'Membership', excerpt: 'Membership enquiries', body: 'Route to membership@auschamcambodia.com', status: 'published', sortOrder: 2, createdAt: now, updatedAt: now, publishedAt: now, recipientEmail: 'membership@auschamcambodia.com' },
    ],
    mediaAssets: [],
    auditLog: [],
  };
}

function initDbFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify(ensureSeed(), null, 2), 'utf8');
}

export function readDb(): CmsDatabase {
  initDbFile();
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) as CmsDatabase;
}

export function writeDb(updater: (db: CmsDatabase) => CmsDatabase): CmsDatabase {
  const current = readDb();
  const next = updater(current);
  fs.writeFileSync(DB_FILE, JSON.stringify(next, null, 2), 'utf8');
  return next;
}

export function touchAudit(db: CmsDatabase, action: string, entityType: string, entityId: string) {
  db.auditLog.unshift({ id: randomUUID(), action, entityType, entityId, timestamp: nowIso() });
  db.auditLog = db.auditLog.slice(0, 80);
}

export function upsertEntity(collection: CmsEntity[], payload: Partial<CmsEntity> & { slug: string; title: string }): CmsEntity[] {
  const now = nowIso();
  const found = collection.find((item) => item.id === payload.id || item.slug === payload.slug);
  if (found) {
    Object.assign(found, payload, { updatedAt: now });
    if (payload.status === 'published' && !found.publishedAt) found.publishedAt = now;
    if (payload.status === 'archived') found.archivedAt = now;
    return collection;
  }

  collection.push({
    ...payload,
    id: payload.id ?? randomUUID(),
    slug: payload.slug,
    title: payload.title,
    subtitle: payload.subtitle ?? '',
    excerpt: payload.excerpt ?? '',
    body: payload.body ?? '',
    status: payload.status ?? 'draft',
    featured: payload.featured ?? false,
    sortOrder: payload.sortOrder ?? collection.length + 1,
    createdAt: now,
    updatedAt: now,
    publishedAt: payload.status === 'published' ? now : undefined,
    archivedAt: payload.status === 'archived' ? now : undefined,
    tags: payload.tags ?? [],
  });
  return collection;
}

export function deleteEntity(collection: CmsEntity[], id: string): CmsEntity[] {
  return collection.filter((item) => item.id !== id);
}

export function getEntityBySlug(collection: CmsEntity[], slug: string): CmsEntity | undefined {
  return collection.find((item) => item.slug === slug && item.status !== 'archived');
}
