import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button, Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { getPageContent } from '@/lib/cms-service';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Membership',
  description: 'Compare membership pathways for international businesses, local SMEs, and individual professionals.',
  path: '/membership',
});

export default function Page() {
  const plans = getCmsClient().getMembershipPlans();
  const page = getPageContent('membership');

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Membership' }]} />
        <Heading level="h1">{page?.title ?? 'Membership built around your operating model'}</Heading>
        <Text className="mt-3 max-w-3xl" tone="muted">{page?.body ?? 'AusCham memberships are segmented by business context so each member sees relevant advocacy, market intelligence, and relationship opportunities.'}</Text>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col">
              <Text tone="strong">{plan.segmentLabel}</Text>
              <Text className="mt-2 text-sm" tone="muted">{plan.name}</Text>
              <Text className="mt-4 text-xl font-semibold text-brand-blue-700">${plan.annualPriceUsd.toLocaleString()} / year</Text>
              <Text className="mt-3">{plan.summary}</Text>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-brand-neutral-700">
                {plan.comparisonHighlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="mt-5">
                <Link href={`/membership/${plan.slug}`}>
                  <Button variant="secondary">View segment</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-brand-neutral-100 p-6">
          <Heading level="h3">Continue your membership journey</Heading>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/membership/plans"><Button variant="secondary">Compare all plans</Button></Link>
            <Link href="/membership/benefits"><Button variant="secondary">Explore benefits</Button></Link>
            <Link href="/membership/join"><Button>Start joining</Button></Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
