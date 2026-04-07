import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, Container, Heading, Section, Text } from '@/components/ui/primitives';
import { FAQAccordion } from '@/components/marketing/sections';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Individual Membership', description: 'For professionals seeking trusted networks, insight briefings, and career-shaping opportunities.', path: '/membership/individual' });

export default function Page() {
  return (
    <Section><Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Membership', href: '/membership' }, { label: 'Individual' }]} />
      <Heading level="h1">Individual Membership</Heading>
      <Text className="mt-3 max-w-3xl" tone="muted">Built for executives and professionals who want practical market intelligence and trusted relationships across the Australia–Cambodia business corridor.</Text>
      <div className="mt-8 grid gap-4 md:grid-cols-2"><Card><Text tone="strong">What you access</Text><Text className="mt-2">Member briefings, curated events, and targeted opportunities for learning, mentoring, and visibility.</Text></Card><Card><Text tone="strong">Who joins</Text><Text className="mt-2">Country managers, founders, advisors, and specialists working across trade, investment, and services sectors.</Text></Card></div>
      <Heading level="h3" className="mt-10">Membership support FAQ</Heading>
      <div className="mt-4"><FAQAccordion items={[{ question: 'Can I upgrade from individual to company membership later?', answer: 'Yes. This template supports membership transitions through the join workflow and admin review.' }, { question: 'Do individual members get event discounts?', answer: 'Yes, discounted rates are represented in the structured plan model and can be adjusted from CMS.' }, { question: 'How quickly are applications reviewed?', answer: 'Review windows are configured operationally by the chamber team; this page intentionally avoids unapproved SLA claims.' }]} /></div>
      <div className="mt-6"><Link href="/membership/join" className="text-sm font-medium text-brand-blue-700">Apply for individual membership</Link></div>
    </Container></Section>
  );
}
