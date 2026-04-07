import { processFormSubmission } from '@/lib/forms/api';
import { validateContactPayload } from '@/lib/forms/validation';

export async function POST(request: Request) {
  return processFormSubmission(request, 'contact', validateContactPayload);
}
