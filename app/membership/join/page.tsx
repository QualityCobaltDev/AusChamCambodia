import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { MembershipInterestForm } from '@/components/forms/membership-interest-form';
import {
  Card,
  Container,
  Heading,
  Section,
  Text,
} from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Join Membership',
  description:
    'Begin your AusCham Cambodia membership application with guided segment selection and onboarding requirements.',
  path: '/membership/join',
});

export default function Page() {
  return (
    <Section>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Membership', href: '/membership' },
            { label: 'Join' },
          ]}
        />
        <Heading level="h1">Join AusCham Cambodia</Heading>
        <Text className="mt-3 max-w-3xl" tone="muted">
          Share your membership priorities and our team will review segment fit
          and onboarding requirements.
        </Text>
        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <MembershipInterestForm />
          </Card>
          <Card>
            <Text tone="strong">What happens next</Text>
            <ul className="text-brand-neutral-700 mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>Segment fit confirmation and plan recommendation.</li>
              <li>Onboarding checklist and administrative requirements.</li>
              <li>
                Welcome pathway into upcoming events and member resources.
              </li>
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
