import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ContactForm } from '@/components/forms/contact-form';
import {
  Card,
  Container,
  Heading,
  Section,
  Text,
} from '@/components/ui/primitives';
import { getContactSettings, getPageContent, getSiteSettings } from '@/lib/cms-service';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contact AusCham Cambodia for membership, events, sponsorship, media, and general enquiries.',
  path: '/contact',
});

export default function Page() {
  const page = getPageContent('contact');
  const contactSettings = getContactSettings();
  const siteSettings = getSiteSettings();
  return (
    <Section>
      <Container>
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        />
        <Heading level="h1">{page?.title ?? 'Contact AusCham Cambodia'}</Heading>
        <Text className="mt-3 max-w-3xl" tone="muted">
          {page?.body ?? 'Share your inquiry and the team will route you to the right membership, events, sponsorship, or media contact pathway.'}
        </Text>
        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <ContactForm />
          </Card>
          <Card>
            <Text tone="strong">Inquiry routing</Text>
            <Text className="mt-2 text-sm" tone="muted">
              {contactSettings.map((entry) => `${entry.title}: ${String(entry.recipientEmail ?? '')}`).join(' · ')}
            </Text>
            <Text className="mt-4 text-sm" tone="muted">
              General contact: {siteSettings.contactEmail}
            </Text>
            <Text className="mt-1 text-sm" tone="muted">
              Phone: {siteSettings.contactPhone}
            </Text>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
