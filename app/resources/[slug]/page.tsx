import { notFound } from 'next/navigation';
import { getCmsClient } from '@/cms/client';
import { Container, Heading, Section, Text } from '@/components/ui/primitives';

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getCmsClient().getResourceBySlug(slug);

  if (!resource) notFound();

  return (
    <Section>
      <Container>
        <Heading level="h1">{resource.title}</Heading>
        <Text className="mt-2 text-sm" tone="muted">{resource.typeLabel} · {resource.publishedAtLabel}</Text>
        <Text className="mt-4">{resource.excerpt}</Text>
      </Container>
    </Section>
  );
}
