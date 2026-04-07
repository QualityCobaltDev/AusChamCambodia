import { getCmsClient } from '@/cms/client';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Committee', description: 'Executive and advisory committee profiles for AusCham Cambodia governance.', path: '/about/committee' });

export default function Page() {
  const members = getCmsClient().getCommitteeMembers();

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Committee' }]} />
        <Heading level="h1">Committee</Heading>
        <Text className="mt-3" tone="muted">Executive and advisory leadership with clear, editable role profiles.</Text>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {members.map((member) => (
            <Card key={member.id}>
              <Text tone="strong">{member.name}</Text>
              <Text className="text-sm" tone="muted">{member.role} · {member.company}</Text>
              <Text className="mt-2">{member.bio}</Text>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
