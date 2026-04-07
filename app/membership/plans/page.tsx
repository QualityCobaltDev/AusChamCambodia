import { getCmsClient } from '@/cms/client';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';

export default function Page() {
  const plans = getCmsClient().getMembershipPlans();

  return (
    <Section>
      <Container>
        <Heading level="h1">Membership Plans</Heading>
        <Text className="mt-3 max-w-3xl" tone="muted">Pricing and package details are centralized in the MembershipPlan model to prevent duplicated pricing logic across the site.</Text>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <Text tone="strong">{plan.name}</Text>
              <Text className="text-sm" tone="muted">{plan.segmentLabel}</Text>
              <Text className="mt-2" tone="strong">${plan.annualPriceUsd.toLocaleString()} / year</Text>
              {plan.onboardingFeeUsd ? <Text className="text-sm" tone="muted">Onboarding fee: ${plan.onboardingFeeUsd.toLocaleString()}</Text> : null}
              <Text className="mt-3">{plan.summary}</Text>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-brand-neutral-700">
                {plan.comparisonHighlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
