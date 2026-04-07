import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button, Card, Checkbox, Container, Heading, Input, Section, Select, Text, Textarea } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Join Membership',
  description: 'Begin your AusCham Cambodia membership application with guided segment selection and onboarding requirements.',
  path: '/membership/join',
});

export default function Page() {
  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Membership', href: '/membership' }, { label: 'Join' }]} />
        <Heading level="h1">Join AusCham Cambodia</Heading>
        <Text className="mt-3 max-w-3xl" tone="muted">This production template demonstrates final UX structure for membership onboarding. Form processing should be connected to CRM or CMS workflows before launch.</Text>
        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <form className="space-y-4">
              <Input placeholder="Full name" aria-label="Full name" />
              <Input placeholder="Business email" type="email" aria-label="Business email" />
              <Input placeholder="Company name" aria-label="Company name" />
              <Select aria-label="Membership segment"><option>International Business</option><option>Local SME</option><option>Individual</option></Select>
              <Textarea placeholder="What outcomes are you looking for in the next 12 months?" aria-label="Desired outcomes" />
              <Checkbox id="membership-consent" label="I consent to be contacted about membership eligibility and onboarding." />
              <Button type="button">Submit expression of interest</Button>
            </form>
          </Card>
          <Card>
            <Text tone="strong">What happens next</Text>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-brand-neutral-700">
              <li>Segment fit confirmation and plan recommendation.</li>
              <li>Onboarding checklist and administrative requirements.</li>
              <li>Welcome pathway into upcoming events and member resources.</li>
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
