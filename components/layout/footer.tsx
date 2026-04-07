import Link from 'next/link';
import { Container } from '@/components/ui/primitives';

const buildSha = process.env.NEXT_PUBLIC_BUILD_SHA ?? 'dev';

export function Footer() {
  return (
    <footer className="mt-18 border-t border-brand-neutral-200 bg-white">
      <Container className="grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="font-semibold text-brand-navy-900">AusCham Cambodia</p>
          <p className="mt-2 text-sm text-brand-neutral-500">Authority-led platform supporting Australia–Cambodia business expansion and trusted market access.</p>
          <p className="mt-3 text-xs text-brand-neutral-400" aria-label="build-version">
            Build: {buildSha}
          </p>
        </div>
        <div className="text-sm text-brand-neutral-700">
          <p className="font-medium text-brand-navy-900">Platform</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/membership">Membership</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/resources">Resources</Link>
            </li>
          </ul>
        </div>
        <div className="text-sm text-brand-neutral-700">
          <p className="font-medium text-brand-navy-900">Legal</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
