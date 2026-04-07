import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ContactForm } from '@/components/forms/contact-form';
import {
  Card,
  Container,
  Heading,
  Section,
  Text,
} from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contact AusCham Cambodia for membership, events, sponsorship, media, and general enquiries.',
  path: '/contact',
});

export default function Page() {
  return (
    <Section>
      <Container>
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        />
        <Heading level="h1">Contact AusCham Cambodia</Heading>
        <Text className="mt-3 max-w-3xl" tone="muted">
          Share your inquiry and the team will route you to the right
          membership, events, sponsorship, or media contact pathway.
        </Text>
        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <ContactForm />
          </Card>
          <Card>
            <Text tone="strong">How we handle your enquiry</Text>
            <Text className="mt-2 text-sm" tone="muted">
              Your message is validated, screened for spam, and routed for
              follow-up. CRM and email workflow integrations are structured for
              secure production rollout.
            </Text>
            <Text className="mt-4 text-sm" tone="muted">
              General contact: info@auschamcambodia.com
            </Text>
            <Text className="mt-1 text-sm" tone="muted">
              Phone: +855 23 000 000
            </Text>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
