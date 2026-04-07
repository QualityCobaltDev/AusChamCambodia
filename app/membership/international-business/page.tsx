import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'International Business Membership', description: 'Designed for multinational and regional firms operating in Cambodia with policy, visibility, and relationship priorities.', path: '/membership/international-business' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Membership', href: '/membership' }, { label: 'International Business' }]} />
      <Heading level="h1">International Business Membership</Heading>
      <Text className="mt-3 max-w-3xl" tone="muted">For enterprise teams managing cross-border operations, stakeholder expectations, and executive-level partnership priorities in Cambodia.</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-2"><Card><Text tone="strong">Best suited for</Text><Text className="mt-2">Multinational corporations, regional holding structures, and market entrants requiring high-trust strategic positioning.</Text></Card><Card><Text tone="strong">Primary outcomes</Text><Text className="mt-2">Policy access, institutional visibility, strategic event participation, and curated relationship building.</Text></Card></div>
      <div className="mt-6 flex gap-3"><Link href="/membership/join" className="text-sm font-medium text-brand-blue-700">Apply now</Link><Link href="/events/upcoming" className="text-sm font-medium text-brand-blue-700">View upcoming executive events</Link></div>
    </Container></Section>
  );
}
