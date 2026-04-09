import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { getPageContent } from '@/lib/cms-service';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Events', description: 'Discover flagship forums, market briefings, and networking sessions from AusCham Cambodia.', path: '/events' });

export default function Page() {
  const events = getCmsClient().getEvents();
  const page = getPageContent('events');

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Events' }]} />
        <Heading level="h1">{page?.title ?? 'Events calendar'}</Heading>
        <Text className="mt-3" tone="muted">{page?.body ?? 'Flagship forums, networking sessions, and strategic briefings for bilateral business communities.'}</Text>
        <div className="mt-4 flex gap-4 text-sm"><Link className="font-medium text-brand-blue-700" href="/events/upcoming">Upcoming events</Link><Link className="font-medium text-brand-blue-700" href="/events/past">Past events</Link></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id}>
              <Text tone="strong">{event.title}</Text>
              <Text className="text-sm" tone="muted">{event.startDateLabel} · {event.venue}</Text>
              <Text className="mt-2">{event.excerpt}</Text>
              <Link className="mt-4 inline-block text-sm font-medium text-brand-blue-700" href={`/events/${event.slug}`}>View details</Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
