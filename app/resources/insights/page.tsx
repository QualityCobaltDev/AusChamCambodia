import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Insights', description: 'Thought leadership and market commentary for members planning strategic decisions.', path: '/resources/insights' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: 'Insights' }]} />
      <Heading level="h1">Insights</Heading>
      <Text className="mt-3" tone="muted">Editorially-controlled commentary templates for policy, workforce, and investment updates.</Text>
      <div className="mt-8 grid gap-4"><Card><Text tone="strong">Policy signal briefing template</Text><Text className="mt-2">Designed for concise analysis of regulatory direction and likely business implications.</Text></Card><Card><Text tone="strong">Sector pulse template</Text><Text className="mt-2">Designed for monthly member-facing commentary, tagged by industry and audience.</Text></Card></div>
      <Link href="/resources/reports" className="mt-6 inline-block text-sm font-medium text-brand-blue-700">See research reports</Link>
    </Container></Section>
  );
}
