import { processFormSubmission } from '@/lib/forms/api';
import { validateResourceLeadPayload } from '@/lib/forms/validation';

export async function POST(request: Request) {
  return processFormSubmission(
    request,
    'resource-download',
    validateResourceLeadPayload,
  );
}
