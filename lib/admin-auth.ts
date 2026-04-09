import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'auscham_admin_session';
const secret = process.env.ADMIN_SESSION_SECRET ?? 'auscham-dev-secret';
const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';

function sign(value: string) {
  return createHmac('sha256', secret).update(value).digest('hex');
}

export function buildSessionValue(email: string) {
  const payload = `${email}|${Date.now()}`;
  return `${payload}|${sign(payload)}`;
}

export function verifySession(value: string | undefined) {
  if (!value) return false;
  const [email, issuedAt, signature] = value.split('|');
  if (!email || !issuedAt || !signature) return false;
  const payload = `${email}|${issuedAt}`;
  const expected = sign(payload);
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function assertAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!verifySession(session)) {
    redirect('/admin/login');
  }
}

export async function loginAdmin(formData: FormData) {
  'use server';
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || password !== adminPassword) {
    return { success: false as const, message: 'Invalid credentials' };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, buildSessionValue(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return { success: true as const };
}

export async function logoutAdmin() {
  'use server';
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
