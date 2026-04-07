import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button, Card, Checkbox, Container, Heading, Input, Section, Select, Text, Textarea } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Contact', description: 'Contact AusCham Cambodia for membership, events, sponsorship, media, and general enquiries.', path: '/contact' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <Heading level="h1">Contact AusCham Cambodia</Heading>
      <Text className="mt-3 max-w-3xl" tone="muted">Share your inquiry and the team will route you to the right membership, events, sponsorship, or media contact pathway.</Text>
      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <form className="space-y-4">
            <Input placeholder="Full name" aria-label="Full name" />
            <Input placeholder="Business email" type="email" aria-label="Business email" />
            <Input placeholder="Company" aria-label="Company" />
            <Select aria-label="Inquiry type"><option>Membership</option><option>Events</option><option>Sponsorship</option><option>Media</option><option>Other</option></Select>
            <Textarea placeholder="How can we help?" aria-label="Message" />
            <Checkbox id="contact-consent" label="I agree to receive a response to this enquiry." />
            <Button type="button">Send message</Button>
          </form>
        </Card>
        <Card>
          <Text tone="strong">Reassurance</Text>
          <Text className="mt-2 text-sm" tone="muted">This is a production-ready form layout. Backend submission and anti-spam validation should be wired before go-live.</Text>
          <Text className="mt-4 text-sm" tone="muted">General contact: info@auschamcambodia.com</Text>
          <Text className="mt-1 text-sm" tone="muted">Phone: +855 23 000 000</Text>
        </Card>
      </div>
    </Container></Section>
  );
}
