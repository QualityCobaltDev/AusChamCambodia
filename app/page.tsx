import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { NewsletterForm } from '@/components/forms/newsletter-form';
import { Badge, Button, Card, Container, CTABand, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Home',
  description: 'AusCham Cambodia drives market access, trusted networks, and practical business outcomes for members in Cambodia.',
  path: '/',
});

const outcomes = [
  {
    title: 'Market entry clarity',
    body: 'Operational guides and executive briefings that help teams sequence market-entry decisions with confidence.',
    icon: 'M12 3v18 M3 12h18',
  },
  {
    title: 'Policy access',
    body: 'Structured opportunities to raise industry priorities through chamber-led advocacy and institutional dialogue.',
    icon: 'M4 8h16 M4 12h16 M4 16h10',
  },
  {
    title: 'Relationship velocity',
    body: 'High-intent events and partner introductions designed to move from first meeting to practical collaboration quickly.',
    icon: 'M4 17l6-6 4 4 6-8',
  },
];

function LineIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5 text-brand-blue-700">
      <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  const cms = getCmsClient();
  const data = cms.getHomepage();

  return (
    <>
      <Section className="fade-in-section relative overflow-hidden pb-18 pt-16 md:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-blue-100 via-brand-blue-50 to-white" />
        <div className="pointer-events-none absolute -right-12 top-0 h-96 w-96 rounded-full bg-brand-blue-700/15 blur-3xl" />
        <div className="pointer-events-none absolute left-[8%] top-10 h-80 w-80 rounded-full bg-brand-sky-400/30 blur-3xl" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: 'Home' }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <Badge>{data.hero.eyebrow}</Badge>
              <Heading level="h1" className="mt-6 max-w-4xl">
                {data.hero.title}
              </Heading>
              <Text className="mt-6 max-w-2xl text-lg" tone="muted">
                {data.hero.intro}
              </Text>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={data.hero.primaryCta.href}>
                  <Button size="lg">{data.hero.primaryCta.label}</Button>
                </Link>
                {data.hero.secondaryCta ? (
                  <Link href={data.hero.secondaryCta.href}>
                    <Button variant="secondary" size="lg">
                      {data.hero.secondaryCta.label}
                    </Button>
                  </Link>
                ) : null}
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-brand-neutral-500">
                <span>Trusted by regional leaders</span>
                <span className="text-brand-red-600">•</span>
                <span>Policy-backed network</span>
              </div>
            </div>
            <div className="surface-card relative overflow-hidden rounded-2xl bg-brand-navy-900 p-10 text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700/60 via-brand-navy-900 to-brand-navy-900" />
              <div className="relative grid gap-6">
                <div className="h-40 rounded-xl border border-white/25 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-sm text-blue-100">Active members</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{data.featuredPlans.length * 40}+</p>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-sm text-blue-100">Annual briefings</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{data.featuredResources.length * 12}+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="fade-in-section bg-gradient-to-b from-white via-brand-blue-50/60 to-white">
        <Container>
          <Heading level="h2">Built for every business stage</Heading>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {data.featuredPlans.map((plan, index) => (
              <Card key={plan.id} className={index === 1 ? 'md:-translate-y-2 md:shadow-lift' : ''}>
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-blue-100 to-transparent opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
                <div className="relative">
                  <div className="inline-flex rounded-lg border border-brand-neutral-200 p-2">
                    <LineIcon path="M6 12h12 M12 6v12" />
                  </div>
                  <Text tone="strong" className="mt-6 text-xl font-semibold">
                    {plan.name}
                  </Text>
                  <p className="mt-2 text-2xl font-semibold text-brand-navy-900">From ${plan.annualPriceUsd.toLocaleString()} / year</p>
                  <Text className="mt-4" tone="muted">
                    {plan.summary}
                  </Text>
                  <Link className="link-underline mt-6 inline-block text-sm font-semibold text-brand-blue-700" href={`/membership/${plan.slug}`}>
                    View segment details
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="fade-in-section bg-gradient-to-br from-brand-blue-50 via-white to-brand-blue-50/60">
        <Container>
          <Heading level="h2">Outcomes members rely on</Heading>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {outcomes.map((outcome) => (
              <Card key={outcome.title}>
                <div className="inline-flex rounded-lg bg-brand-blue-100 p-2.5">
                  <LineIcon path={outcome.icon} />
                </div>
                <Text tone="strong" className="mt-5 text-xl font-semibold">
                  {outcome.title}
                </Text>
                <Text className="mt-3" tone="muted">
                  {outcome.body}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="fade-in-section bg-gradient-to-b from-white to-brand-blue-50/60">
        <Container>
          <Heading level="h2">Featured events and resources</Heading>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {data.featuredEvents.map((event) => (
              <Card key={event.id} className="group/card">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-brand-blue-100 px-3 py-1 text-xs font-semibold text-brand-blue-700">{new Date(event.startDate).toLocaleDateString('en-US')}</span>
                  <span className="text-sm text-brand-neutral-500">📍 {event.venue}</span>
                </div>
                <Text tone="strong" className="mt-4 text-xl font-semibold">
                  {event.title}
                </Text>
                <Text className="mt-3" tone="muted">
                  {event.excerpt}
                </Text>
                <Link className="link-underline mt-5 inline-block text-sm font-semibold text-brand-blue-700 transition-transform duration-200 group-hover/card:translate-x-1" href={`/events/${event.slug}`}>
                  Read event brief
                </Link>
              </Card>
            ))}
            {data.featuredResources.map((resource) => (
              <Card key={resource.id} className="group/card">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-brand-blue-100 px-3 py-1 text-xs font-semibold text-brand-blue-700">{resource.resourceType.toUpperCase()}</span>
                  <span className="text-sm text-brand-neutral-500">{resource.author}</span>
                </div>
                <Text tone="strong" className="mt-4 text-xl font-semibold">
                  {resource.title}
                </Text>
                <Text className="mt-3" tone="muted">
                  {resource.excerpt}
                </Text>
                <Link className="link-underline mt-5 inline-block text-sm font-semibold text-brand-blue-700 transition-transform duration-200 group-hover/card:translate-x-1" href={`/resources/${resource.slug}`}>
                  Open resource
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="fade-in-section bg-gradient-to-r from-brand-blue-50 via-white to-brand-blue-50">
        <Container>
          <Heading level="h2">Trust proof</Heading>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div className="surface-card rounded-2xl border-l-4 border-l-brand-blue-700 p-8">
              <p className="text-sm uppercase tracking-[0.12em] text-brand-neutral-500">Institutional credibility</p>
              <p className="mt-4 text-2xl font-semibold leading-tight text-brand-navy-900">
                “AusCham has become a reliable strategic bridge between private-sector operators and institutional stakeholders.”
              </p>
              <p className="mt-4 text-sm text-brand-neutral-500">Regional partner testimonial</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.featuredPartners.slice(0, 4).map((partner) => (
                <div key={partner.id} className="flex min-h-24 items-center justify-center rounded-xl border border-brand-blue-700/20 bg-white px-3 text-center text-sm font-medium text-brand-neutral-400 transition-colors duration-200 hover:border-brand-blue-700/40 hover:text-brand-blue-700">
                  {partner.name}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="fade-in-section">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-brand-blue-700/20 bg-gradient-to-br from-brand-blue-100 via-brand-blue-50 to-white p-10">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div>
                <Text tone="strong" className="text-2xl font-semibold">
                  Newsletter
                </Text>
                <Text className="mt-3 max-w-2xl" tone="muted">
                  Receive chamber updates, event briefings, and curated market intelligence designed for executive teams operating in Cambodia.
                </Text>
                <div className="mt-6 max-w-xl">
                  <NewsletterForm />
                </div>
              </div>
              <div className="rounded-xl border border-brand-neutral-200 bg-white p-6">
                <Text tone="strong" className="text-lg font-semibold">
                  Privacy and consent
                </Text>
                <Text className="mt-3 text-base" tone="muted">
                  We only use submitted details for requested updates and operational communications. You can opt out at any time.
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="fade-in-section pb-14 pt-0">
        <Container>
          <CTABand
            title="Ready to move from intention to execution?"
            body="Start with membership fit, review upcoming events, and connect with the AusCham Cambodia team for practical next steps."
            action={
              <Link href="/membership/join">
                <Button className="bg-white text-brand-navy-900 hover:bg-brand-blue-100">Start membership application</Button>
              </Link>
            }
          />
        </Container>
      </Section>
    </>
  );
}
