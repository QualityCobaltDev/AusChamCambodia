import { CTABand, HeroSection, ValueGrid } from '@/components/marketing/sections';
import { Button, Container, Heading, Section, Text } from '@/components/ui/primitives';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Section>
        <Container>
          <Heading level="h2">Built for institutional confidence and execution velocity.</Heading>
          <Text className="mt-3 max-w-3xl" tone="muted">The platform architecture supports segmented memberships, flagship events, strategic resources, and sponsorship programs with reusable, production-safe design primitives.</Text>
          <div className="mt-6">
            <ValueGrid items={[{ title: 'Membership Engine', description: 'Conversion-focused pathways for enterprise, SME, and individual member journeys.' }, { title: 'Events Layer', description: 'High-trust event modules for executive forums, networking, and policy briefings.' }, { title: 'Resource Intelligence', description: 'Structured resource publishing for insight reports, guides, and market updates.' }]} />
          </div>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <CTABand title="View the internal style foundation" body="Use the style guide route to validate components, states, accessibility behaviors, and implementation consistency." action={<Button>Open /style-guide</Button>} />
        </Container>
      </Section>
    </>
  );
}
