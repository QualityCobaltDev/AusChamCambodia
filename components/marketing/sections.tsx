'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Badge, Button, Card, Container, CTABand, Heading, Section, Text } from '@/components/ui/primitives';
import { cn } from '@/lib/utils/cn';

export function HeroSection() {
  return (
    <Section>
      <Container className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <Badge>Australia–Cambodia Business Platform</Badge>
          <Heading level="h1">Institutional trust with modern execution.</Heading>
          <Text tone="muted">AusCham Cambodia connects established enterprises, growth-stage entrants, and policy stakeholders through curated market intelligence, executive events, and strategic partnerships.</Text>
          <div className="flex gap-3">
            <motion.div whileHover={{ y: -2 }}>
              <Button>Explore Membership</Button>
            </motion.div>
            <Button variant="secondary">View Event Calendar</Button>
          </div>
        </div>
        <Card className="bg-gradient-to-br from-brand-navy-900 to-brand-blue-700 text-white">
          <p className="text-sm uppercase tracking-[0.18em] text-brand-gold-300">2026 Strategic Priorities</p>
          <ul className="mt-4 space-y-4 text-sm text-blue-100">
            <li>• Segment-led membership growth across enterprise, SME, and individual tiers.</li>
            <li>• Market access pathways for Cambodia market entry and bilateral trade initiatives.</li>
            <li>• Data-backed advocacy and policy dialogue with trusted executive stakeholders.</li>
          </ul>
        </Card>
      </Container>
    </Section>
  );
}

export function SegmentCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="h-full">
      <Card className="h-full">
        <h3 className="text-lg font-semibold text-brand-navy-900">{title}</h3>
        <Text className="mt-2" tone="muted">{description}</Text>
      </Card>
    </motion.div>
  );
}

export function ValueGrid({ items }: { items: Array<{ title: string; description: string }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <SegmentCard key={item.title} title={item.title} description={item.description} />
      ))}
    </div>
  );
}

export function LogoWall({ items }: { items: string[] }) {
  return <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{items.map((name) => <Card key={name} className="py-5 text-center text-sm text-brand-neutral-500">{name}</Card>)}</div>;
}

export function PricingCard({ name, price, features }: { name: string; price: string; features: string[] }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-brand-navy-900">{name}</h3>
      <p className="mt-3 text-2xl font-semibold text-brand-blue-700">{price}</p>
      <ul className="mt-4 space-y-2 text-sm text-brand-neutral-700">{features.map((f) => <li key={f}>• {f}</li>)}</ul>
      <Button className="mt-6 w-full">Apply</Button>
    </Card>
  );
}

export function ComparisonTable({ rows }: { rows: Array<{ label: string; corporate: string; sme: string; individual: string }> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-brand-neutral-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-brand-neutral-100 text-brand-navy-900"><tr><th className="p-3">Capability</th><th>Corporate</th><th>SME</th><th>Individual</th></tr></thead>
        <tbody>{rows.map((row) => <tr key={row.label} className="border-t border-brand-neutral-200"><td className="p-3 font-medium">{row.label}</td><td>{row.corporate}</td><td>{row.sme}</td><td>{row.individual}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function MetaCard({ title, text }: { title: string; text: string }) {
  return <Card><h3 className="text-lg font-semibold text-brand-navy-900">{title}</h3><Text tone="muted" className="mt-2">{text}</Text></Card>;
}

export const EventCard = MetaCard;
export const ResourceCard = MetaCard;
export const TestimonialCard = ({ title, text }: { title: string; text: string }) => <Card><Text tone="strong">“{text}”</Text><p className="mt-3 text-sm font-medium text-brand-navy-900">{title}</p></Card>;

export function FAQAccordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null);
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = open === item.question;
        return (
          <Card key={item.question} className="p-0">
            <button className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-brand-navy-900" onClick={() => setOpen(isOpen ? null : item.question)} aria-expanded={isOpen}>
              {item.question}
              <span>{isOpen ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {isOpen ? (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <Text className="px-5 pb-4 text-sm" tone="muted">{item.answer}</Text>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Card>
        );
      })}
    </div>
  );
}

export function ContactFormShell({ children }: { children: ReactNode }) {
  return <Card className={cn('p-6 md:p-8')}>{children}</Card>;
}

export { CTABand };
