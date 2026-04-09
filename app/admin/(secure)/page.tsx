import Link from 'next/link';
import { Card } from '@/components/ui/primitives';
import { getAdminSnapshot } from '@/lib/cms-service';

export default async function AdminDashboardPage() {
  const snapshot = getAdminSnapshot();

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-semibold text-brand-navy-900">Dashboard overview</h1>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(snapshot.counts).map(([key, value]) => (
            <div key={key} className="rounded-xl border border-brand-neutral-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-brand-neutral-500">{key}</p>
              <p className="mt-2 text-3xl font-semibold text-brand-navy-900">{value}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold text-brand-navy-900">Quick actions</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link href="/admin/branding" className="rounded-lg bg-brand-blue-50 px-3 py-2 text-brand-blue-700">Branding</Link>
          <Link href="/admin/events" className="rounded-lg bg-brand-blue-50 px-3 py-2 text-brand-blue-700">Events</Link>
          <Link href="/admin/resources" className="rounded-lg bg-brand-blue-50 px-3 py-2 text-brand-blue-700">Resources</Link>
          <Link href="/admin/site" className="rounded-lg bg-brand-blue-50 px-3 py-2 text-brand-blue-700">Site settings</Link>
        </div>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold text-brand-navy-900">Recent updates</h2>
        <ul className="mt-3 space-y-2 text-sm text-brand-neutral-600">
          {snapshot.recentAudit.map((item) => (
            <li key={item.id} className="rounded-lg border border-brand-neutral-100 px-3 py-2">
              {item.action} · {item.entityType} · {item.entityId}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
