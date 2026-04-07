import { PageShell } from '@/components/layout/page-shell';

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <PageShell
      title={`Resource: ${slug}`}
      description="Dynamic resource detail scaffold for insights, reports, and publication entities."
    />
  );
}
