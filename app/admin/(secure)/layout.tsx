import { AdminShell } from '@/components/admin/shell';
import { assertAdmin } from '@/lib/admin-auth';

export default async function AdminSecureLayout({ children }: { children: React.ReactNode }) {
  await assertAdmin();
  return <AdminShell>{children}</AdminShell>;
}
