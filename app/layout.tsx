import type { Metadata } from 'next';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getBranding, getSiteSettings } from '@/lib/cms-service';
import '@/app/globals.css';

export function generateMetadata(): Metadata {
  const settings = getSiteSettings();
  const branding = getBranding();

  return {
    title: {
      default: settings.defaultMetaTitle || settings.siteName,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.defaultMetaDescription,
    icons: branding.favicon ? { icon: branding.favicon.storagePath } : undefined,
    openGraph: branding.ogImage
      ? {
          images: [{ url: branding.ogImage.storagePath }],
        }
      : undefined,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = getSiteSettings();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        {settings.analyticsHead ? <div dangerouslySetInnerHTML={{ __html: settings.analyticsHead }} /> : null}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
