import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';

export default function Page() {
  const resources = getCmsClient().getResources();

  return (
    <Section>
      <Container>
        <Heading level="h1">Resources</Heading>
        <Text className="mt-3" tone="muted">Insights, reports, and guides curated for executive decision-making.</Text>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <Text tone="strong">{resource.title}</Text>
              <Text className="text-sm" tone="muted">{resource.typeLabel} · {resource.publishedAtLabel}</Text>
              <Text className="mt-2">{resource.excerpt}</Text>
              <Link className="mt-4 inline-block text-sm font-medium text-brand-blue-700" href={`/resources/${resource.slug}`}>Read resource</Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
