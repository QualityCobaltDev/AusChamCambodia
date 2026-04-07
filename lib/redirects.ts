export type RedirectRule = {
  source: string;
  destination: string;
  permanent: true;
};

/**
 * Legacy-to-new URL redirects for the AusCham IA overhaul.
 *
 * Keep this list as the single source of truth for redirects used by:
 * - Next.js (`next.config.ts`)
 * - Nginx (`deploy/nginx.redirects.auscham.conf`)
 */
export const legacyRedirects: RedirectRule[] = [
  // Core navigation normalization
  { source: '/home', destination: '/', permanent: true },
  { source: '/index.php', destination: '/', permanent: true },
  { source: '/index.html', destination: '/', permanent: true },

  // Membership
  { source: '/membership', destination: '/membership', permanent: true },
  { source: '/become-a-member', destination: '/membership/join', permanent: true },
  { source: '/join-us', destination: '/membership/join', permanent: true },
  {
    source: '/membership-benefits',
    destination: '/membership/benefits',
    permanent: true,
  },
  { source: '/membership-plans', destination: '/membership/plans', permanent: true },
  {
    source: '/corporate-membership',
    destination: '/membership/international-business',
    permanent: true,
  },
  { source: '/sme-membership', destination: '/membership/local-sme', permanent: true },
  {
    source: '/individual-membership',
    destination: '/membership/individual',
    permanent: true,
  },

  // Events
  { source: '/events', destination: '/events', permanent: true },
  { source: '/event-calendar', destination: '/events', permanent: true },
  { source: '/upcoming-events', destination: '/events/upcoming', permanent: true },
  { source: '/past-events', destination: '/events/past', permanent: true },

  // Resources
  { source: '/news', destination: '/resources/insights', permanent: true },
  { source: '/blog', destination: '/resources/insights', permanent: true },
  { source: '/resources', destination: '/resources', permanent: true },
  { source: '/publications', destination: '/resources/reports', permanent: true },
  { source: '/reports', destination: '/resources/reports', permanent: true },
  { source: '/guides', destination: '/resources/guides', permanent: true },
  { source: '/job-board', destination: '/resources/jobs', permanent: true },
  { source: '/jobs', destination: '/resources/jobs', permanent: true },

  // Sponsorship and partnership
  { source: '/sponsors', destination: '/sponsorship/partners', permanent: true },
  { source: '/partners', destination: '/sponsorship/partners', permanent: true },
  {
    source: '/sponsorship',
    destination: '/sponsorship/packages',
    permanent: true,
  },
  {
    source: '/sponsorship-opportunities',
    destination: '/sponsorship/packages',
    permanent: true,
  },

  // About and governance
  { source: '/about-us', destination: '/about', permanent: true },
  { source: '/about', destination: '/about', permanent: true },
  { source: '/committee', destination: '/about/committee', permanent: true },
  { source: '/board', destination: '/about/committee', permanent: true },
  { source: '/mission', destination: '/about/mission', permanent: true },

  // Contact and legal
  { source: '/contact-us', destination: '/contact', permanent: true },
  { source: '/privacy-policy', destination: '/legal/privacy-policy', permanent: true },
  {
    source: '/terms-and-conditions',
    destination: '/legal/terms-of-use',
    permanent: true,
  },
];

/**
 * URLs that should be removed from index and return 410 (Gone) instead of redirecting.
 */
export const legacyGonePatterns: string[] = [
  '/author/:path*',
  '/tag/:path*',
  '/category/uncategorized/:path*',
  '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:path*',
  '/feed',
  '/comments/feed',
  '/xmlrpc.php',
  '/wp-login.php',
  '/wp-admin/:path*',
  '/wp-content/:path*',
  '/wp-includes/:path*',
];
