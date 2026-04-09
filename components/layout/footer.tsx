import Link from 'next/link';
import { Container } from '@/components/ui/primitives';
import { getNavigation, getSiteSettings } from '@/lib/cms-service';

export function Footer() {
  const settings = getSiteSettings();
  const nav = getNavigation();
  const links = [...nav.left, ...nav.right];

  return (
    <footer className="border-t border-brand-neutral-200 bg-white py-12">
      <Container className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-xl font-semibold text-brand-navy-900">{settings.siteName}</p>
          <p className="mt-3 max-w-xl text-sm text-brand-neutral-500">{settings.footerText}</p>
          <p className="mt-4 text-sm text-brand-neutral-500">{settings.contactEmail} · {settings.contactPhone}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {links.map((item) => (
            <Link key={item.id} href={String(item.href ?? '/')} className="text-brand-neutral-500 hover:text-brand-blue-700">
              {item.title}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
