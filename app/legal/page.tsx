import Link from 'next/link';

import { Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Legal',
  description: 'Legal documents and platform policies for elevareai.online.',
  path: '/legal',
});

const legalLinks = [
  { href: '/legal/privacy-policy', label: 'Privacy Policy', description: 'How data is collected, processed, and retained.' },
  { href: '/legal/terms-of-use', label: 'Terms of Use', description: 'Website usage conditions and intellectual property rules.' },
];

export default function LegalIndexPage() {
  return (
    <Section>
      <Container>
        <Heading level="h1">Legal Center</Heading>
        <Text className="mt-3" tone="muted">
          This section centralizes legal and policy references for members, partners, and site visitors.
        </Text>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {legalLinks.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <Text tone="strong">{item.label}</Text>
              <Text className="mt-2" tone="muted">{item.description}</Text>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
