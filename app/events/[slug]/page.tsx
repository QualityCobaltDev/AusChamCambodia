import { PageShell } from '@/components/layout/page-shell';

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <PageShell
      title={`Event: ${slug}`}
      description="Dynamic event detail scaffold using route params. Connect to CMS-backed event data in implementation phase."
    />
  );
}
