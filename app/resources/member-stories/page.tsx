import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Member Stories', description: 'Read case-study narratives showing how members use AusCham networks and resources.', path: '/resources/member-stories' });

export default function Page() {
  const stories = getCmsClient().getMemberStories();

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: 'Member Stories' }]} />
        <Heading level="h1">Member stories</Heading>
        <Text className="mt-3" tone="muted">Structured case-study narratives for trust and credibility building.</Text>
        <div className="mt-8 grid gap-4">
          {stories.map((story) => (
            <Card key={story.id}>
              <Text tone="strong">{story.title}</Text>
              <Text className="mt-2">{story.summary}</Text>
              {story.impactMetric ? <Text className="mt-2 text-sm" tone="muted">Impact note (placeholder pending approval): {story.impactMetric}</Text> : null}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
