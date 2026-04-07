import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'About', description: 'Learn the mission, governance, and partner ecosystem behind AusCham Cambodia.', path: '/about' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <Heading level="h1">About AusCham Cambodia</Heading>
      <Text className="mt-3 max-w-3xl" tone="muted">AusCham Cambodia is positioned as an authority-driven business platform supporting bilateral commercial growth through trusted engagement and practical execution.</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-3"><Card><Text tone="strong">Mission</Text><Text className="mt-2">See the strategic direction and value framework guiding member outcomes.</Text><Link href="/about/mission" className="mt-3 inline-block text-sm font-medium text-brand-blue-700">View mission</Link></Card><Card><Text tone="strong">Committee</Text><Text className="mt-2">Review executive governance and committee leadership profiles.</Text><Link href="/about/committee" className="mt-3 inline-block text-sm font-medium text-brand-blue-700">View committee</Link></Card><Card><Text tone="strong">Partners</Text><Text className="mt-2">Understand the institutional and ecosystem partnerships supporting delivery.</Text><Link href="/about/partners" className="mt-3 inline-block text-sm font-medium text-brand-blue-700">View partners</Link></Card></div>
    </Container></Section>
  );
}
