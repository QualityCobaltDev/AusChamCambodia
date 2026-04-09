import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { getAboutSections, getPageContent } from '@/lib/cms-service';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'About', description: 'Learn the mission, governance, and partner ecosystem behind AusCham Cambodia.', path: '/about' });

export default function Page() {
  const page = getPageContent('about');
  const sections = getAboutSections();
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <Heading level="h1">{page?.title ?? 'About AusCham Cambodia'}</Heading>
      <Text className="mt-3 max-w-3xl" tone="muted">{page?.body ?? 'AusCham Cambodia is positioned as an authority-driven business platform supporting bilateral commercial growth through trusted engagement and practical execution.'}</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.id}>
            <Text tone="strong">{section.title}</Text>
            <Text className="mt-2">{section.excerpt}</Text>
            <Link href={`/about/${section.slug}`} className="mt-3 inline-block text-sm font-medium text-brand-blue-700">View details</Link>
          </Card>
        ))}
      </div>
    </Container></Section>
  );
}
