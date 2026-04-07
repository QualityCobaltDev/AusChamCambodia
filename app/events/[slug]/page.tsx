import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { slug: string } }) {
  return buildMetadata({
    title: `Event: ${params.slug.replaceAll('-', ' ')}`,
    description: 'Event detail template with agenda framing, registration pathways, and related links.',
    path: `/events/${params.slug}`,
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getCmsClient().getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Events', href: '/events' }, { label: event.title }]} />
        <Heading level="h1">{event.title}</Heading>
        <Text className="mt-2 text-sm" tone="muted">{event.startDateLabel} · {event.venue}</Text>
        <Text className="mt-4">{event.excerpt}</Text>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card><Text tone="strong">Why attend</Text><Text className="mt-2">This template presents event value propositions and expected outcomes without introducing unverified claims.</Text></Card>
          <Card><Text tone="strong">Next step</Text><Text className="mt-2">Register through contact intake while final event registration integrations are being finalized.</Text><Link href="/contact" className="mt-3 inline-block text-sm font-medium text-brand-blue-700">Register interest</Link></Card>
        </div>
      </Container>
    </Section>
  );
}
