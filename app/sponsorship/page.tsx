import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Sponsorship', description: 'Sponsorship opportunities for brands that want strategic visibility within AusCham Cambodia programs.', path: '/sponsorship' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sponsorship' }]} />
      <Heading level="h1">Sponsorship programs</Heading>
      <Text className="mt-3 max-w-3xl" tone="muted">Partner with AusCham through annual sponsorship designed for visibility, relevance, and long-term relationship building with decision-makers.</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-3"><Card><Text tone="strong">Overview</Text><Text className="mt-2">Understand sponsorship strategy, audience fit, and annual planning cycles.</Text><Link href="/sponsorship/packages" className="mt-3 inline-block text-sm font-medium text-brand-blue-700">View packages</Link></Card><Card><Text tone="strong">Partners</Text><Text className="mt-2">See how partner recognition can be presented on-site with structured governance.</Text><Link href="/sponsorship/partners" className="mt-3 inline-block text-sm font-medium text-brand-blue-700">View partners</Link></Card><Card><Text tone="strong">Enquiry</Text><Text className="mt-2">Submit commercial interest through a clear intake route for sponsor-fit review.</Text><Link href="/sponsorship/enquire" className="mt-3 inline-block text-sm font-medium text-brand-blue-700">Send enquiry</Link></Card></div>
    </Container></Section>
  );
}
