import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Resources', description: 'Browse guides, insights, reports, member stories, and jobs curated for AusCham members.', path: '/resources' });

const resourcePaths = [
  { label: 'Guides', href: '/resources/guides' },
  { label: 'Insights', href: '/resources/insights' },
  { label: 'Reports', href: '/resources/reports' },
  { label: 'Member Stories', href: '/resources/member-stories' },
  { label: 'Jobs', href: '/resources/jobs' },
];

export default function Page() {
  const resources = getCmsClient().getResources();

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} />
        <Heading level="h1">Resource hub</Heading>
        <Text className="mt-3" tone="muted">Insights, reports, and guides curated for executive decision-making and operational planning.</Text>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">{resourcePaths.map((item) => <Link key={item.href} href={item.href} className="font-medium text-brand-blue-700">{item.label}</Link>)}</div>
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
