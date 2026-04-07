import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Terms', description: 'Website usage terms and service conditions for AusCham Cambodia digital platforms.', path: '/terms' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      <Heading level="h1">Terms of use</Heading>
      <Text className="mt-3" tone="muted">This template provides structure for legal terms. Replace with approved legal language prior to production publication.</Text>
      <Card className="mt-8 space-y-3"><Text tone="strong">Acceptable use</Text><Text>Users agree to lawful, respectful use of the platform and its published resources.</Text><Text tone="strong">Intellectual property</Text><Text>Chamber publications and marks remain protected and may not be reused without permission.</Text><Text tone="strong">Limitation</Text><Text>Editorial content is provided for informational purposes and should be reviewed with professional advice where needed.</Text></Card>
    </Container></Section>
  );
}
