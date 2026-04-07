import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';

type LegalContentProps = {
  title: string;
  intro: string;
  breadcrumbLabel: string;
  sections: Array<{ heading: string; body: string }>;
};

export function LegalContent({ title, intro, breadcrumbLabel, sections }: LegalContentProps) {
  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Legal', href: '/legal' }, { label: breadcrumbLabel }]} />
        <Heading level="h1">{title}</Heading>
        <Text className="mt-3" tone="muted">{intro}</Text>

        <Card className="mt-8 space-y-3">
          {sections.map((section) => (
            <div key={section.heading}>
              <Text tone="strong">{section.heading}</Text>
              <Text>{section.body}</Text>
            </div>
          ))}
        </Card>
      </Container>
    </Section>
  );
}
