import { getCmsClient } from '@/cms/client';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';

export default function Page() {
  const members = getCmsClient().getCommitteeMembers();

  return (
    <Section>
      <Container>
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
