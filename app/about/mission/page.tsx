import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Mission', description: 'AusCham Cambodia mission and operating principles for member impact.', path: '/about/mission' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Mission' }]} />
      <Heading level="h1">Mission and strategic direction</Heading>
      <Text className="mt-3 max-w-3xl" tone="muted">Our mission is to advance Australia–Cambodia commercial ties through practical member value: trusted advocacy, quality intelligence, and high-impact relationship platforms.</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-3"><Card><Text tone="strong">Advocate</Text><Text className="mt-2">Represent member interests in constructive policy dialogue.</Text></Card><Card><Text tone="strong">Connect</Text><Text className="mt-2">Build meaningful commercial relationships across sectors and institutions.</Text></Card><Card><Text tone="strong">Equip</Text><Text className="mt-2">Provide usable market intelligence and implementation-focused resources.</Text></Card></div>
    </Container></Section>
  );
}
