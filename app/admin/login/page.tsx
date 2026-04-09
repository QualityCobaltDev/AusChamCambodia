import { redirect } from 'next/navigation';
import { Button, Card, Container, Input } from '@/components/ui/primitives';
import { loginAdmin } from '@/lib/admin-auth';

export default function AdminLoginPage() {
  async function login(formData: FormData) {
    'use server';
    const result = await loginAdmin(formData);
    if (result.success) redirect('/admin');
    redirect('/admin/login?error=1');
  }

  return (
    <Container className="py-20">
      <Card className="mx-auto max-w-md">
        <h1 className="text-2xl font-semibold text-brand-navy-900">Admin sign in</h1>
        <p className="mt-2 text-sm text-brand-neutral-500">Enter the admin password to access the control center.</p>
        <form action={login} className="mt-6 grid gap-3">
          <Input name="password" type="password" placeholder="Admin password" required />
          <Button type="submit">Sign in</Button>
        </form>
      </Card>
    </Container>
  );
}
