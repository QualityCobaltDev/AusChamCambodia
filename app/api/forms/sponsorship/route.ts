import { processFormSubmission } from '@/lib/forms/api';
import { validateSponsorshipPayload } from '@/lib/forms/validation';

export async function POST(request: Request) {
  return processFormSubmission(
    request,
    'sponsorship-enquiry',
    validateSponsorshipPayload,
  );
}
