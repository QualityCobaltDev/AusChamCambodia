import Link from 'next/link';
import { Container } from '@/components/ui/primitives';
import { MobileNavDrawer } from '@/components/layout/mobile-nav-drawer';

const links = [
  { href: '/', label: 'Home' },
  { href: '/membership', label: 'Membership' },
  { href: '/events', label: 'Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/sponsorship', label: 'Sponsorship' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-neutral-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/65">
      <Container className="relative flex items-center justify-between py-5">
        <Link className="text-lg font-semibold tracking-[-0.02em] text-brand-navy-900" href="/">
          AusCham Cambodia
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="link-underline text-sm font-medium text-brand-neutral-500 transition-colors duration-200 ease-in-out hover:text-brand-blue-700">
              {link.label}
            </Link>
          ))}
        </nav>
        <MobileNavDrawer links={links} />
      </Container>
    </header>
  );
}
