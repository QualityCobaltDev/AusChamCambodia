import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Privacy Policy', description: 'How AusCham Cambodia handles personal data, communication preferences, and consent.', path: '/privacy-policy' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <Heading level="h1">Privacy Policy</Heading>
      <Text className="mt-3" tone="muted">This policy template outlines how data is collected, stored, and used. Final legal copy should be reviewed by counsel before publication.</Text>
      <Card className="mt-8 space-y-3"><Text tone="strong">Data collection</Text><Text>We collect contact and inquiry information submitted through forms for member and partner communications.</Text><Text tone="strong">Use of data</Text><Text>Data is used to respond to enquiries, administer programs, and send relevant chamber updates where consent is provided.</Text><Text tone="strong">Retention</Text><Text>Retention periods and deletion workflows should align with final legal and operational policies.</Text></Card>
    </Container></Section>
  );
}
