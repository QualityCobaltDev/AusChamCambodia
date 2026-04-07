export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? 'AusCham Cambodia',
  cmsProvider: process.env.CMS_PROVIDER ?? 'contentful',
};
