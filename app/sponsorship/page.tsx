import Link from 'next/link';
import { getPageContent, getSponsorshipPackages } from '@/lib/cms-service';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Sponsorship', description: 'Sponsorship opportunities for brands that want strategic visibility within AusCham Cambodia programs.', path: '/sponsorship' });

export default function Page() {
  const page = getPageContent('sponsorship');
  const packages = getSponsorshipPackages();
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sponsorship' }]} />
      <Heading level="h1">{page?.title ?? 'Sponsorship programs'}</Heading>
      <Text className="mt-3 max-w-3xl" tone="muted">{page?.body ?? 'Partner with AusCham through annual sponsorship designed for visibility, relevance, and long-term relationship building with decision-makers.'}</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {packages.map((pkg) => (
          <Card key={pkg.id}>
            <Text tone="strong">{pkg.title}</Text>
            <Text className="mt-2">{pkg.excerpt}</Text>
            <Link href={String(pkg.ctaUrl ?? '/sponsorship/enquire')} className="mt-3 inline-block text-sm font-medium text-brand-blue-700">
              {String(pkg.ctaLabel ?? 'Send enquiry')}
            </Link>
          </Card>
        ))}
      </div>
    </Container></Section>
  );
}
