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
    <header className="sticky top-0 z-50 border-b border-brand-neutral-200/80 bg-white/90 backdrop-blur">
      <Container className="relative flex items-center justify-between py-4">
        <Link className="text-lg font-semibold tracking-tight text-brand-navy-900" href="/">
          AusCham Cambodia
        </Link>
        <nav aria-label="Primary" className="hidden gap-5 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-brand-neutral-700 transition hover:text-brand-blue-700">
              {link.label}
            </Link>
          ))}
        </nav>
        <MobileNavDrawer links={links} />
      </Container>
    </header>
  );
}
