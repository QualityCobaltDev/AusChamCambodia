import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/membership', label: 'Membership' },
  { href: '/events', label: 'Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/sponsorship', label: 'Sponsorship' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link className="text-lg font-semibold tracking-tight text-slate-900" href="/">
          AusCham Cambodia
        </Link>
        <nav aria-label="Primary" className="hidden gap-4 md:flex">
          {links.map((link) => (
            <Link className="text-sm text-slate-700 transition hover:text-slate-900" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
