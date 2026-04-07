import type { Metadata } from 'next';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AusCham Cambodia',
    template: '%s | AusCham Cambodia',
  },
  description: 'Production-ready scaffold for the AusCham Cambodia digital platform rebuild.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
