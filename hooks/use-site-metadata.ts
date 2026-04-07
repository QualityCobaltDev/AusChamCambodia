export function useSiteMetadata() {
  return {
    siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? 'AusCham Cambodia',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  };
}
