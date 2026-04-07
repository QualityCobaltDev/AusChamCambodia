import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Local SME Membership', description: 'A structured membership path for growth-stage Cambodian and Australian SMEs.', path: '/membership/local-sme' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Membership', href: '/membership' }, { label: 'Local SME' }]} />
      <Heading level="h1">Local SME Membership</Heading>
      <Text className="mt-3 max-w-3xl" tone="muted">For ambitious SMEs looking to expand market reach, improve credibility, and build stronger cross-sector connections.</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-2"><Card><Text tone="strong">Growth focus</Text><Text className="mt-2">Access practical business connections, market briefings, and event pathways that support revenue and partnership growth.</Text></Card><Card><Text tone="strong">Practical support</Text><Text className="mt-2">Get visibility in chamber channels and benefit from clear pathways into high-value networking forums.</Text></Card></div>
      <div className="mt-6 flex gap-3"><Link href="/membership/join" className="text-sm font-medium text-brand-blue-700">Start SME application</Link><Link href="/resources/guides" className="text-sm font-medium text-brand-blue-700">Read market-entry guides</Link></div>
    </Container></Section>
  );
}
