import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Jobs', description: 'Member jobs board template for high-trust hiring opportunities in Cambodia.', path: '/resources/jobs' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: 'Jobs' }]} />
      <Heading level="h1">Jobs board</Heading>
      <Text className="mt-3" tone="muted">A structured jobs listing template for member organizations. Listings below are editorial placeholders.</Text>
      <div className="mt-8 grid gap-4"><Card><Text tone="strong">Operations Manager (Placeholder listing)</Text><Text className="mt-2 text-sm" tone="muted">Member company name and final compensation details pending approval.</Text></Card><Card><Text tone="strong">Finance Lead (Placeholder listing)</Text><Text className="mt-2 text-sm" tone="muted">Use this template to publish verified roles once recruitment briefs are approved.</Text></Card></div>
    </Container></Section>
  );
}
