import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Partners', description: 'Institutional and ecosystem partner framework for AusCham Cambodia.', path: '/about/partners' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Partners' }]} />
      <Heading level="h1">Partners</Heading>
      <Text className="mt-3" tone="muted">Partner profiles are maintained via structured records so editorial teams can publish trusted ecosystem context without code changes.</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-2"><Card><Text tone="strong">Institutional partner model</Text><Text className="mt-2">Template for organizations supporting bilateral trade, investment, and sector development.</Text></Card><Card><Text tone="strong">Cross-link to sponsorship</Text><Text className="mt-2">Commercial partner pathways remain separate through dedicated sponsorship journeys.</Text><Link href="/sponsorship" className="mt-3 inline-block text-sm font-medium text-brand-blue-700">Explore sponsorship</Link></Card></div>
    </Container></Section>
  );
}
