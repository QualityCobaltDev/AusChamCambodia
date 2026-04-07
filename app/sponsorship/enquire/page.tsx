import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SponsorshipEnquiryForm } from '@/components/forms/sponsorship-enquiry-form';
import {
  Card,
  Container,
  Heading,
  Section,
  Text,
} from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sponsorship Enquiry',
  description:
    'Submit sponsorship interest for package fit, audience strategy, and activation planning.',
  path: '/sponsorship/enquire',
});

export default function Page() {
  return (
    <Section>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Sponsorship', href: '/sponsorship' },
            { label: 'Enquire' },
          ]}
        />
        <Heading level="h1">Sponsorship enquiry</Heading>
        <Text className="mt-3 max-w-3xl" tone="muted">
          Use this form to capture sponsor intent before routing into
          partnership qualification workflows.
        </Text>
        <Card className="mt-8 max-w-3xl">
          <SponsorshipEnquiryForm />
        </Card>
      </Container>
    </Section>
  );
}
