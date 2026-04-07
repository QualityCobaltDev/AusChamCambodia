import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Membership Benefits',
  description: 'Understand the advocacy, network, visibility, and capability benefits available through AusCham membership.',
  path: '/membership/benefits',
});

const benefits = [
  ['Advocacy', 'Participate in chamber-led consultation cycles and issue-led submissions relevant to bilateral business.'],
  ['Events access', 'Priority access to executive events, policy briefings, and curated cross-sector networking sessions.'],
  ['Market intelligence', 'Receive practical updates on regulation, investment climate, and business operating conditions.'],
  ['Visibility', 'Strengthen profile through directories, speaking opportunities, and member-focused communication channels.'],
  ['Member services', 'Connect to introductions, knowledge sessions, and tailored pathways depending on your membership segment.'],
] as const;

export default function Page() {
  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Membership', href: '/membership' }, { label: 'Benefits' }]} />
        <Heading level="h1">Membership benefits with practical value</Heading>
        <Text className="mt-3 max-w-3xl" tone="muted">Every membership tier includes core chamber benefits, with additional value calibrated to the scale and complexity of each member type.</Text>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {benefits.map(([title, body]) => (
            <Card key={title}><Text tone="strong">{title}</Text><Text className="mt-2">{body}</Text></Card>
          ))}
        </div>
        <Text className="mt-6 text-sm" tone="muted">Note: member-facing service levels are shown as structured mock copy and should be finalized during commercial policy review.</Text>
        <div className="mt-6 flex gap-3">
          <Link href="/membership/plans" className="text-sm font-medium text-brand-blue-700">Compare plans</Link>
          <Link href="/membership/join" className="text-sm font-medium text-brand-blue-700">Apply for membership</Link>
        </div>
      </Container>
    </Section>
  );
}
