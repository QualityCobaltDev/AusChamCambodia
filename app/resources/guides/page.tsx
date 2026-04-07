import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Guides', description: 'Practical playbooks for market entry, compliance sequencing, and operating execution.', path: '/resources/guides' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: 'Guides' }]} />
      <Heading level="h1">Guides</Heading>
      <Text className="mt-3" tone="muted">Practical structured guidance for teams entering or scaling operations in Cambodia.</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-2"><Card><Text tone="strong">Market-entry sequencing guide</Text><Text className="mt-2">Template content for registration planning, stakeholder mapping, and timeline risk controls.</Text></Card><Card><Text tone="strong">Governance and operating checklist</Text><Text className="mt-2">Template content for policy monitoring, committee reporting, and execution oversight.</Text></Card></div>
      <Link href="/resources" className="mt-6 inline-block text-sm font-medium text-brand-blue-700">Back to resource hub</Link>
    </Container></Section>
  );
}
