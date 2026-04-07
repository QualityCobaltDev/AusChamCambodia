import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { NewsletterForm } from '@/components/forms/newsletter-form';
import {
  Badge,
  Button,
  Card,
  Container,
  CTABand,
  Heading,
  Section,
  Text,
} from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Home',
  description:
    'AusCham Cambodia drives market access, trusted networks, and practical business outcomes for members in Cambodia.',
  path: '/',
});

export default function HomePage() {
  const cms = getCmsClient();
  const data = cms.getHomepage();

  return (
    <>
      <Section className="pb-8">
        <Container>
          <Breadcrumbs items={[{ label: 'Home' }]} />
          <Badge>{data.hero.eyebrow}</Badge>
          <Heading level="h1" className="mt-4 max-w-4xl">
            {data.hero.title}
          </Heading>
          <Text className="mt-4 max-w-3xl" tone="muted">
            {data.hero.intro}
          </Text>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={data.hero.primaryCta.href}>
              <Button>{data.hero.primaryCta.label}</Button>
            </Link>
            {data.hero.secondaryCta ? (
              <Link href={data.hero.secondaryCta.href}>
                <Button variant="secondary">
                  {data.hero.secondaryCta.label}
                </Button>
              </Link>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <Heading level="h2">Built for every business stage</Heading>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {data.featuredPlans.map((plan) => (
              <Card key={plan.id}>
                <Text tone="strong">{plan.name}</Text>
                <Text className="mt-2 text-sm" tone="muted">
                  From ${plan.annualPriceUsd.toLocaleString()} / year
                </Text>
                <Text className="mt-3">{plan.summary}</Text>
                <Link
                  className="text-brand-blue-700 mt-4 inline-block text-sm font-medium"
                  href={`/membership/${plan.slug}`}
                >
                  View segment details
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <Heading level="h2">Outcomes members rely on</Heading>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card>
              <Text tone="strong">Market entry clarity</Text>
              <Text className="mt-2" tone="muted">
                Operational guides and executive briefings that help teams
                sequence market-entry decisions with confidence.
              </Text>
            </Card>
            <Card>
              <Text tone="strong">Policy access</Text>
              <Text className="mt-2" tone="muted">
                Structured opportunities to raise industry priorities through
                chamber-led advocacy and institutional dialogue.
              </Text>
            </Card>
            <Card>
              <Text tone="strong">Relationship velocity</Text>
              <Text className="mt-2" tone="muted">
                High-intent events and partner introductions designed to move
                from first meeting to practical collaboration quickly.
              </Text>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <Heading level="h2">Featured events and resources</Heading>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {data.featuredEvents.map((event) => (
              <Card key={event.id}>
                <Text tone="strong">{event.title}</Text>
                <Text className="text-sm" tone="muted">
                  {new Date(event.startDate).toLocaleDateString('en-US')} ·{' '}
                  {event.venue}
                </Text>
                <Text className="mt-2">{event.excerpt}</Text>
                <Link
                  className="text-brand-blue-700 mt-4 inline-block text-sm font-medium"
                  href={`/events/${event.slug}`}
                >
                  Read event brief
                </Link>
              </Card>
            ))}
            {data.featuredResources.map((resource) => (
              <Card key={resource.id}>
                <Text tone="strong">{resource.title}</Text>
                <Text className="text-sm" tone="muted">
                  {resource.resourceType.toUpperCase()} · {resource.author}
                </Text>
                <Text className="mt-2">{resource.excerpt}</Text>
                <Link
                  className="text-brand-blue-700 mt-4 inline-block text-sm font-medium"
                  href={`/resources/${resource.slug}`}
                >
                  Open resource
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <Heading level="h2">Trust proof</Heading>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {data.featuredStories.map((story) => (
              <Card key={story.id}>
                <Text tone="strong">{story.title}</Text>
                <Text className="mt-2" tone="muted">
                  {story.summary}
                </Text>
                <Link
                  className="text-brand-blue-700 mt-4 inline-block text-sm font-medium"
                  href="/resources/member-stories"
                >
                  See member stories
                </Link>
              </Card>
            ))}
            {data.featuredPartners.map((partner) => (
              <Card key={partner.id}>
                <Text tone="strong">Institutional partner spotlight</Text>
                <Text className="mt-2">
                  {partner.name} is listed as a featured partner in this mock
                  dataset for architecture demonstration.
                </Text>
                <Link
                  className="text-brand-blue-700 mt-4 inline-block text-sm font-medium"
                  href="/about/partners"
                >
                  Explore partners
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <Card>
              <Text tone="strong">Newsletter</Text>
              <Text className="mt-2 text-sm" tone="muted">
                Receive chamber updates, event briefings, and curated market
                intelligence.
              </Text>
              <div className="mt-4 max-w-md">
                <NewsletterForm />
              </div>
            </Card>
            <Card>
              <Text tone="strong">Privacy and consent</Text>
              <Text className="mt-2 text-sm" tone="muted">
                We only use submitted details for requested updates and
                operational communications. You can opt out at any time.
              </Text>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <CTABand
            title="Ready to grow with the chamber?"
            body="Start with membership fit, review upcoming events, and connect with the AusCham Cambodia team for next steps."
            action={
              <Link href="/membership/join">
                <Button>Start membership application</Button>
              </Link>
            }
          />
        </Container>
      </Section>
    </>
  );
}
