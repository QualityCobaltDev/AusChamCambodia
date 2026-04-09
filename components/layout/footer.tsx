import Link from 'next/link';
import { Container } from '@/components/ui/primitives';

const buildSha = process.env.NEXT_PUBLIC_BUILD_SHA ?? 'dev';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-neutral-200 bg-white">
      <Container className="grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-brand-navy-900">AusCham Cambodia</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-brand-neutral-500">
            Authority-led platform supporting Australia–Cambodia business expansion, trusted market access, and cross-sector collaboration.
          </p>
          <p className="mt-4 border-t border-brand-neutral-200 pt-4 text-xs text-brand-neutral-400" aria-label="build-version">
            Build: {buildSha}
          </p>
        </div>
        <div className="text-sm text-brand-neutral-500">
          <p className="font-semibold text-brand-neutral-700">Platform</p>
          <ul className="mt-4 space-y-3 border-t border-brand-neutral-200 pt-4">
            <li>
              <Link className="link-underline" href="/membership">
                Membership
              </Link>
            </li>
            <li>
              <Link className="link-underline" href="/events">
                Events
              </Link>
            </li>
            <li>
              <Link className="link-underline" href="/resources">
                Resources
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm text-brand-neutral-500">
          <p className="font-semibold text-brand-neutral-700">Legal</p>
          <ul className="mt-4 space-y-3 border-t border-brand-neutral-200 pt-4">
            <li>
              <Link className="link-underline" href="/legal/privacy-policy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="link-underline" href="/legal/terms-of-use">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
