import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';

export default function Page() {
  const events = getCmsClient().getEvents();

  return (
    <Section>
      <Container>
        <Heading level="h1">Events</Heading>
        <Text className="mt-3" tone="muted">Flagship forums, networking sessions, and strategic briefings.</Text>
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
