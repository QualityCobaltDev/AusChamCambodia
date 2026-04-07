import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return buildMetadata({
    title: `Resource: ${slug.replaceAll('-', ' ')}`,
    description: 'Resource detail template for guides, insights, reports, and related reading journeys.',
    path: `/resources/${slug}`,
  });
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getCmsClient().getResourceBySlug(slug);

  if (!resource) notFound();

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: resource.title }]} />
        <Heading level="h1">{resource.title}</Heading>
        <Text className="mt-2 text-sm" tone="muted">{resource.typeLabel} · {resource.publishedAtLabel}</Text>
        <Text className="mt-4">{resource.excerpt}</Text>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card><Text tone="strong">How to use this resource</Text><Text className="mt-2">Designed to support planning, board discussion, and implementation sequencing.</Text></Card>
          <Card><Text tone="strong">Related journey</Text><Text className="mt-2">Pair this with relevant events and membership support pathways.</Text><Link href="/events/upcoming" className="mt-3 inline-block text-sm font-medium text-brand-blue-700">View upcoming events</Link></Card>
        </div>
      </Container>
    </Section>
  );
}
