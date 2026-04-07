import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/forms/rate-limit';
import { verifySpamProtection } from '@/lib/forms/spam';
import { handleInquiry } from '@/lib/forms/inquiry-service';
import type { FormResult } from '@/lib/forms/types';

function getIpAddress(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export async function processFormSubmission<
  T extends { captchaToken?: string },
>(
  request: Request,
  type: string,
  validator: (input: unknown) => { data: T; result: FormResult },
) {
  const maxRequests = Number(process.env.RATE_LIMIT_MAX ?? 8);
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);
  const rate = checkRateLimit(
    `${type}:${getIpAddress(request)}`,
    maxRequests,
    windowMs,
  );
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, message: 'Too many requests. Please try again shortly.' },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const { data, result } = validator(body);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Please correct the highlighted fields.',
        errors: result.errors,
      },
      { status: 400 },
    );
  }

  const spam = await verifySpamProtection(data.captchaToken);
  if (!spam.ok) {
    return NextResponse.json(
      { ok: false, message: spam.reason ?? 'Spam protection failed.' },
      { status: 400 },
    );
  }

  await handleInquiry(type, data);

  return NextResponse.json({
    ok: true,
    message: 'Thanks — your request has been received.',
  });
}
