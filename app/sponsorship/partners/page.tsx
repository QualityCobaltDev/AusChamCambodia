import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Sponsorship Partners', description: 'Partner recognition template for current and legacy sponsors.', path: '/sponsorship/partners' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sponsorship', href: '/sponsorship' }, { label: 'Partners' }]} />
      <Heading level="h1">Sponsorship partners</Heading>
      <Text className="mt-3" tone="muted">This area showcases active and past sponsorship relationships with editorial control over publication status.</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-2"><Card><Text tone="strong">Current program partners</Text><Text className="mt-2 text-sm" tone="muted">Partner names and logo assets are represented through CMS-backed records.</Text></Card><Card><Text tone="strong">Legacy supporters</Text><Text className="mt-2 text-sm" tone="muted">Historical supporters can be published as context without affecting current sponsorship tiers.</Text></Card></div>
      <Link href="/sponsorship/enquire" className="mt-6 inline-block text-sm font-medium text-brand-blue-700">Become a sponsor</Link>
    </Container></Section>
  );
}
