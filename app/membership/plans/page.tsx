import Link from 'next/link';
import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Membership Plans',
  description: 'Review annual membership plans, pricing structure, and key inclusion highlights.',
  path: '/membership/plans',
});

export default function Page() {
  const plans = getCmsClient().getMembershipPlans();

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Membership', href: '/membership' }, { label: 'Plans' }]} />
        <Heading level="h1">Membership plan comparison</Heading>
        <Text className="mt-3 max-w-3xl" tone="muted">Pricing and package details are centralized in structured content models to avoid duplicated logic across the website.</Text>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <Text tone="strong">{plan.name}</Text>
              <Text className="text-sm" tone="muted">{plan.segmentLabel}</Text>
              <Text className="mt-2" tone="strong">${Number(plan.annualPriceUsd).toLocaleString()} / year</Text>
              {plan.onboardingFeeUsd ? <Text className="text-sm" tone="muted">Onboarding fee: ${Number(plan.onboardingFeeUsd).toLocaleString()}</Text> : null}
              <Text className="mt-3">{plan.summary}</Text>
              <Link className="mt-4 inline-block text-sm font-medium text-brand-blue-700" href={`/membership/${plan.slug}`}>View details</Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
