import Link from 'next/link';
import { Container } from '@/components/ui/primitives';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/site', label: 'Site settings' },
  { href: '/admin/branding', label: 'Branding' },
  { href: '/admin/navigation', label: 'Navigation' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/membership', label: 'Membership' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/resources', label: 'Resources' },
  { href: '/admin/sponsorship', label: 'Sponsorship' },
  { href: '/admin/about', label: 'About' },
  { href: '/admin/contact', label: 'Contact' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/seo', label: 'SEO' },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <Container className="grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <aside className="surface-card sticky top-24 h-fit rounded-2xl p-4">
        <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.1em] text-brand-neutral-500">Admin control center</p>
        <nav className="grid gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm text-brand-neutral-600 transition hover:bg-brand-blue-50 hover:text-brand-blue-700">
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="space-y-6">{children}</section>
    </Container>
  );
}
