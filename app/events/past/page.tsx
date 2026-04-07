import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Past Events', description: 'Review previous AusCham Cambodia events and the key outcomes captured from each program.', path: '/events/past' });

const pastHighlights = [
  ['Executive Dinner Roundtable', 'Stakeholders discussed investment confidence drivers and sector-specific constraints.', 'Roundtable summary draft pending publication.'],
  ['Trade & Logistics Briefing', 'Members reviewed practical updates to supply chain planning and cross-border operations.', 'Slides and recap to be uploaded by secretariat.'],
];

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Events', href: '/events' }, { label: 'Past' }]} />
      <Heading level="h1">Past events archive</Heading>
      <Text className="mt-3" tone="muted">A structured archive format for outcomes, media, and follow-up resources from past sessions.</Text>
      <div className="mt-8 grid gap-4">{pastHighlights.map(([title, summary, note]) => <Card key={title}><Text tone="strong">{title}</Text><Text className="mt-2">{summary}</Text><Text className="mt-2 text-sm" tone="muted">{note}</Text><Link href="/resources" className="mt-3 inline-block text-sm font-medium text-brand-blue-700">Related resources</Link></Card>)}</div>
    </Container></Section>
  );
}
