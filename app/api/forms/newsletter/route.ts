import { processFormSubmission } from '@/lib/forms/api';
import { validateNewsletterPayload } from '@/lib/forms/validation';

export async function POST(request: Request) {
  return processFormSubmission(
    request,
    'newsletter',
    validateNewsletterPayload,
  );
}
