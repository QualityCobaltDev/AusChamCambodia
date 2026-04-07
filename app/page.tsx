import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { CTABand, ValueGrid } from '@/components/marketing/sections';
import { Badge, Button, Card, Container, Heading, Section, Text } from '@/components/ui/primitives';

export default function HomePage() {
  const cms = getCmsClient();
  const data = cms.getHomepage();

  return (
    <>
      <Section className="pb-8">
        <Container>
          <Badge>{data.hero.eyebrow}</Badge>
          <Heading level="h1" className="mt-4 max-w-4xl">
            {data.hero.title}
          </Heading>
          <Text className="mt-4 max-w-3xl" tone="muted">
            {data.hero.intro}
          </Text>
          <div className="mt-6 flex gap-3">
            <Link href={data.hero.primaryCta.href}><Button>{data.hero.primaryCta.label}</Button></Link>
            {data.hero.secondaryCta ? (
              <Link href={data.hero.secondaryCta.href}><Button variant="secondary">{data.hero.secondaryCta.label}</Button></Link>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <Heading level="h2">Featured membership segments</Heading>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {data.featuredPlans.map((plan) => (
              <Card key={plan.id}>
                <Text tone="strong">{plan.name}</Text>
                <Text className="mt-2 text-sm" tone="muted">From ${plan.annualPriceUsd.toLocaleString()} / year</Text>
                <Text className="mt-3">{plan.summary}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <Heading level="h2">Operational pillars</Heading>
          <div className="mt-6">
            <ValueGrid
              items={[
                { title: 'Membership Engine', description: 'Segment-based plan architecture with one source of truth for plan pricing and benefits.' },
                { title: 'Events Pipeline', description: 'Structured event model for listings, detail pages, speaker relationships, and featured flags.' },
                { title: 'Resource Intelligence', description: 'Taggable resource architecture for insight, report, and guide publishing workflows.' },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <CTABand title="Editorially safe and CMS-ready" body="The UI currently renders from typed mock data and can switch to Sanity without redesigning page components." action={<Link href="/membership/plans"><Button>Review plans</Button></Link>} />
        </Container>
      </Section>
    </>
  );
}
