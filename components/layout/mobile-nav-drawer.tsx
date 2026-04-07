'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/primitives';

type NavItem = { href: string; label: string };

export function MobileNavDrawer({ links }: { links: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button aria-expanded={open} aria-controls="mobile-nav" variant="ghost" size="sm" onClick={() => setOpen((v) => !v)}>
        Menu
      </Button>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-4 top-16 z-40 rounded-lg border border-brand-neutral-200 bg-white p-4 shadow-card"
          >
            <nav aria-label="Mobile navigation" className="space-y-2">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-sm text-brand-neutral-700 hover:bg-brand-blue-100" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
