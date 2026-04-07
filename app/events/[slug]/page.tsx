import { notFound } from 'next/navigation';
import { getCmsClient } from '@/cms/client';
import { Container, Heading, Section, Text } from '@/components/ui/primitives';

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getCmsClient().getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <Heading level="h1">{event.title}</Heading>
        <Text className="mt-2 text-sm" tone="muted">{event.startDateLabel} · {event.venue}</Text>
        <Text className="mt-4">{event.excerpt}</Text>
      </Container>
    </Section>
  );
}
