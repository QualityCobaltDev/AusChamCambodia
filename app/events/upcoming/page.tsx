import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Upcoming Events', description: 'See upcoming AusCham Cambodia forums, briefings, and networking opportunities.', path: '/events/upcoming' });

export default function Page() {
  const events = getCmsClient().getEvents();

  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Events', href: '/events' }, { label: 'Upcoming' }]} />
      <Heading level="h1">Upcoming events</Heading>
      <Text className="mt-3" tone="muted">Register interest early to secure seats for high-demand forums and executive sessions.</Text>
      <div className="mt-8 grid gap-4">{events.map((event) => <Card key={event.id}><Text tone="strong">{event.title}</Text><Text className="text-sm" tone="muted">{event.startDateLabel} · {event.venue}</Text><Text className="mt-2">{event.excerpt}</Text><Link className="mt-3 inline-block text-sm font-medium text-brand-blue-700" href={`/events/${event.slug}`}>Open event page</Link></Card>)}</div>
    </Container></Section>
  );
}
