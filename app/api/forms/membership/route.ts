import { processFormSubmission } from '@/lib/forms/api';
import { validateMembershipPayload } from '@/lib/forms/validation';

export async function POST(request: Request) {
  return processFormSubmission(
    request,
    'membership-interest',
    validateMembershipPayload,
  );
}
