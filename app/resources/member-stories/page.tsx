import { getCmsClient } from '@/cms/client';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';

export default function Page() {
  const stories = getCmsClient().getMemberStories();

  return (
    <Section>
      <Container>
        <Heading level="h1">Member Stories</Heading>
        <Text className="mt-3" tone="muted">Structured case-study narratives for trust and credibility building.</Text>
        <div className="mt-8 grid gap-4">
          {stories.map((story) => (
            <Card key={story.id}>
              <Text tone="strong">{story.title}</Text>
              <Text className="mt-2">{story.summary}</Text>
              {story.impactMetric ? <Text className="mt-2 text-sm" tone="muted">Impact: {story.impactMetric}</Text> : null}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
