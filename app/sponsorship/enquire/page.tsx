import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button, Card, Checkbox, Container, Heading, Input, Section, Select, Text, Textarea } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Sponsorship Enquiry', description: 'Submit sponsorship interest for package fit, audience strategy, and activation planning.', path: '/sponsorship/enquire' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sponsorship', href: '/sponsorship' }, { label: 'Enquire' }]} />
      <Heading level="h1">Sponsorship enquiry</Heading>
      <Text className="mt-3 max-w-3xl" tone="muted">Use this form template to capture sponsor intent before routing into partnership qualification workflows.</Text>
      <Card className="mt-8 max-w-3xl">
        <form className="space-y-4">
          <Input placeholder="Contact name" aria-label="Contact name" />
          <Input placeholder="Work email" type="email" aria-label="Work email" />
          <Input placeholder="Company" aria-label="Company" />
          <Select aria-label="Budget range"><option>Up to USD 7,000</option><option>USD 7,000 - 12,000</option><option>USD 12,000+</option></Select>
          <Textarea placeholder="What audience and outcomes are most important for your brand?" aria-label="Objectives" />
          <Checkbox id="sponsor-consent" label="I agree to be contacted by AusCham Cambodia regarding sponsorship planning." />
          <Button type="button">Send enquiry</Button>
        </form>
      </Card>
    </Container></Section>
  );
}
