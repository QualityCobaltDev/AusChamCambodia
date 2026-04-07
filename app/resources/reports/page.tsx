import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Reports', description: 'Long-form chamber reports and whitepapers for executive planning and policy engagement.', path: '/resources/reports' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: 'Reports' }]} />
      <Heading level="h1">Reports</Heading>
      <Text className="mt-3" tone="muted">A premium report layout for downloadable, citation-friendly publications.</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-2"><Card><Text tone="strong">Quarterly business climate report</Text><Text className="mt-2">Placeholder editorial summary for chamber-approved macro and sector observations.</Text></Card><Card><Text tone="strong">Investment sentiment whitepaper</Text><Text className="mt-2">Placeholder summary template for research-backed member and partner interviews.</Text></Card></div>
      <Link href="/contact" className="mt-6 inline-block text-sm font-medium text-brand-blue-700">Request report updates</Link>
    </Container></Section>
  );
}
