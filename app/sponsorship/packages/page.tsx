import { getCmsClient } from '@/cms/client';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';

export default function Page() {
  const packages = getCmsClient().getSponsorshipPackages();

  return (
    <Section>
      <Container>
        <Heading level="h1">Sponsorship Packages</Heading>
        <Text className="mt-3" tone="muted">Package pricing and inclusion counts are centralized in the SponsorshipPackage content model.</Text>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {packages.map((pkg) => (
            <Card key={pkg.id}>
              <Text tone="strong">{pkg.name}</Text>
              <Text className="mt-2" tone="strong">${pkg.annualPriceUsd.toLocaleString()} / year</Text>
              <Text className="text-sm" tone="muted">Includes {pkg.eventInclusionCount} event placements</Text>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-brand-neutral-700">
                {pkg.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
