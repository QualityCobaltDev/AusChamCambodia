import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Sponsorship Packages', description: 'Compare sponsorship tiers, annual investment, and inclusion scope.', path: '/sponsorship/packages' });

export default function Page() {
  const packages = getCmsClient().getSponsorshipPackages();

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sponsorship', href: '/sponsorship' }, { label: 'Packages' }]} />
        <Heading level="h1">Sponsorship packages</Heading>
        <Text className="mt-3" tone="muted">Package pricing and inclusion counts are centralized in the sponsorship content model.</Text>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {packages.map((pkg) => (
            <Card key={pkg.id}>
              <Text tone="strong">{pkg.name}</Text>
              <Text className="mt-2" tone="strong">${pkg.annualPriceUsd.toLocaleString()} / year</Text>
              <Text className="text-sm" tone="muted">Includes {pkg.eventInclusionCount} event placements</Text>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-brand-neutral-700">
                {pkg.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
              <Link href="/sponsorship/enquire" className="mt-4 inline-block text-sm font-medium text-brand-blue-700">Enquire about this package</Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
