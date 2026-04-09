import Link from 'next/link';
import { Container } from '@/components/ui/primitives';
import { MobileNavDrawer } from '@/components/layout/mobile-nav-drawer';
import { getBranding, getNavigation, getSiteSettings } from '@/lib/cms-service';

export function HeaderNav() {
  const nav = getNavigation();
  const site = getSiteSettings();
  const branding = getBranding();
  const contactLink = nav.right.find((item) => item.href === '/contact' || item.title.toLowerCase() === 'contact');
  const rightLinks = nav.right.filter((item) => item.id !== contactLink?.id);

  const mobileLinks = [
    ...nav.left.map((item) => ({ href: String(item.href ?? '/'), label: item.title })),
    ...nav.right.map((item) => ({ href: String(item.href ?? '/'), label: item.title })),
    { href: '/admin', label: nav.adminLabel || 'Admin' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-brand-blue-100 bg-[#f2f3f5]">
      <Container className="relative py-5">
        <div className="hidden items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <nav aria-label="Primary left" className="flex items-center justify-end gap-10">
            {nav.left.map((link) => (
              <Link key={link.id} href={String(link.href ?? '/')} className="text-sm font-semibold text-brand-neutral-500 transition-colors hover:text-brand-neutral-700">
                {link.title}
              </Link>
            ))}
          </nav>

          <div className="justify-self-center text-center">
            <Link className="flex items-center justify-center" href="/" aria-label="AUSCham Cambodia">
              <span className="text-lg font-semibold tracking-[-0.02em] text-brand-navy-900">AUSCham Cambodia</span>
            </Link>
            {contactLink ? (
              <Link href={String(contactLink.href ?? '/contact')} className="mt-1 block text-sm font-semibold text-brand-neutral-700 transition-colors hover:text-brand-neutral-900">
                {contactLink.title}
              </Link>
            ) : null}
          </div>

          <div className="flex items-center justify-start gap-7">
            <nav aria-label="Primary right" className="flex items-center gap-10">
              {rightLinks.map((link) => (
                <Link key={link.id} href={String(link.href ?? '/')} className="text-sm font-semibold text-brand-neutral-500 transition-colors hover:text-brand-neutral-700">
                  {link.title}
                </Link>
              ))}
            </nav>
            <Link href="/admin" className="rounded-full border border-brand-blue-700/25 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-brand-blue-700 transition hover:border-brand-blue-700/45 hover:bg-brand-blue-50">
              {nav.adminLabel || 'Admin'}
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between md:hidden">
          <Link href="/" className="text-lg font-semibold text-brand-navy-900">
            {branding.logo ? <img src={branding.logo.storagePath} alt={branding.logo.altText || site.siteName} className="h-10 w-auto object-contain" /> : site.siteName}
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/admin" className="rounded-md border border-brand-blue-700/30 px-2.5 py-1 text-xs font-semibold text-brand-blue-700">
              {nav.adminLabel || 'Admin'}
            </Link>
            <MobileNavDrawer links={mobileLinks} />
          </div>
        </div>
      </Container>
    </header>
  );
}
