import { FAQAccordion, HeroSection, LogoWall, PricingCard, ComparisonTable, ValueGrid, EventCard, ResourceCard, TestimonialCard, ContactFormShell, CTABand } from '@/components/marketing/sections';
import { Badge, Button, Checkbox, Container, Divider, Heading, Input, Section, Select, Text, Textarea } from '@/components/ui/primitives';

export default function StyleGuidePage() {
  return (
    <div>
      <HeroSection />
      <Section>
        <Container className="space-y-10">
          <div>
            <Badge>Design Tokens</Badge>
            <Heading level="h2" className="mt-3">Typography & Core Primitives</Heading>
            <Text tone="muted" className="mt-2">High-trust visual language with authority-led color contrast and scalable spacing.</Text>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <Divider />

          <div className="grid gap-4 md:grid-cols-3">
            <PricingCard name="Corporate" price="From $2,900/yr" features={["Executive delegation seats", "Policy working groups", "Strategic visibility"]} />
            <PricingCard name="SME" price="From $1,150/yr" features={["Market briefings", "Introductions", "Partner channels"]} />
            <PricingCard name="Individual" price="From $320/yr" features={["Community events", "Learning sessions", "Career visibility"]} />
          </div>

          <ComparisonTable rows={[{ label: 'Delegation Access', corporate: 'Priority', sme: 'Limited', individual: 'No' }, { label: 'Member Promotions', corporate: 'Quarterly', sme: 'Bi-monthly', individual: 'Directory only' }]} />

          <ValueGrid items={[{ title: 'Market Entry', description: 'Structured pathways for companies entering Cambodia with managed risk controls.' }, { title: 'Advocacy', description: 'Clear policy communication and business environment monitoring.' }, { title: 'Commercial Access', description: 'Trusted introductions and partner discovery across sectors.' }]} />

          <LogoWall items={['Advisory Partner A', 'Enterprise Group B', 'Industry Partner C', 'Institutional Partner D']} />

          <div className="grid gap-4 md:grid-cols-3">
            <EventCard title="CEO Roundtable" text="Quarterly policy and strategy session with cross-sector executives." />
            <ResourceCard title="Cambodia Market Snapshot" text="Structured briefing for leadership teams planning expansion." />
            <TestimonialCard title="Managing Director, Member Company" text="AusCham opened practical, high-quality market access channels quickly." />
          </div>

          <FAQAccordion items={[{ question: 'How quickly can new members engage?', answer: 'Most members are onboarded within one business week with immediate event and network access.' }, { question: 'Are there sector-specific programs?', answer: 'Yes. Priority sectors include infrastructure, education, health, and digital services.' }]} />

          <ContactFormShell>
            <Heading level="h3">Contact Form Shell</Heading>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div><label className="mb-1 block text-sm">Full name</label><Input placeholder="Jane Example" /></div>
              <div><label className="mb-1 block text-sm">Membership interest</label><Select defaultValue=""><option value="" disabled>Select one</option><option>Corporate</option><option>SME</option><option>Individual</option></Select></div>
              <div className="md:col-span-2"><label className="mb-1 block text-sm">Message</label><Textarea placeholder="Tell us about your priorities." /></div>
              <div className="md:col-span-2"><Checkbox id="consent" label="I agree to be contacted regarding AusCham membership and events." /></div>
            </div>
          </ContactFormShell>

          <CTABand title="Ready to architect your market position?" body="Use this UI system across Membership, Events, Resources, and Sponsorship journeys for consistent authority-driven execution." action={<Button>Book Consultation</Button>} />
        </Container>
      </Section>
    </div>
  );
}
