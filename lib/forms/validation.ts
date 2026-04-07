import type {
  ContactPayload,
  FormResult,
  MembershipInterestPayload,
  NewsletterPayload,
  ResourceLeadPayload,
  SponsorshipPayload,
} from '@/lib/forms/types';
import { inquiryTypes } from '@/lib/forms/types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeText(value: unknown, maxLength = 1000) {
  return String(value ?? '')
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, maxLength);
}

function sanitizeEmail(value: unknown) {
  return sanitizeText(value, 200).toLowerCase();
}

function parseBoolean(value: unknown) {
  return value === true || value === 'true' || value === 'on' || value === '1';
}

function getCommonErrors(payload: {
  fullName: string;
  email: string;
  inquiryType?: string;
  consent: boolean;
  website?: string;
}) {
  const errors: Record<string, string> = {};

  if (!payload.fullName || payload.fullName.length < 2)
    errors.fullName = 'Please provide your full name.';
  if (!payload.email || !emailRegex.test(payload.email))
    errors.email = 'Please provide a valid email address.';
  if (
    payload.inquiryType &&
    !inquiryTypes.includes(payload.inquiryType as (typeof inquiryTypes)[number])
  ) {
    errors.inquiryType = 'Please select a valid inquiry type.';
  }
  if (!payload.consent) errors.consent = 'Consent is required to continue.';

  // Honeypot: if this hidden field is filled by bots, silently fail validation.
  if (payload.website) errors.website = 'Spam check failed.';

  return errors;
}

export function validateContactPayload(input: unknown): {
  data: ContactPayload;
  result: FormResult;
} {
  const body = (input && typeof input === 'object' ? input : {}) as Record<
    string,
    unknown
  >;
  const data: ContactPayload = {
    fullName: sanitizeText(body.fullName, 120),
    email: sanitizeEmail(body.email),
    company: sanitizeText(body.company, 120),
    phone: sanitizeText(body.phone, 40),
    inquiryType: sanitizeText(
      body.inquiryType,
      50,
    ) as ContactPayload['inquiryType'],
    message: sanitizeText(body.message, 2500),
    consent: parseBoolean(body.consent),
    captchaToken: sanitizeText(body.captchaToken, 2000),
    website: sanitizeText(body.website, 100),
  };

  const errors = getCommonErrors(data);
  if (!data.message || data.message.length < 10)
    errors.message = 'Please share more detail (at least 10 characters).';

  return {
    data,
    result: {
      ok: Object.keys(errors).length === 0,
      message: 'Validated',
      errors,
    },
  };
}

export function validateNewsletterPayload(input: unknown): {
  data: NewsletterPayload;
  result: FormResult;
} {
  const body = (input && typeof input === 'object' ? input : {}) as Record<
    string,
    unknown
  >;
  const data: NewsletterPayload = {
    fullName: sanitizeText(body.fullName, 120),
    email: sanitizeEmail(body.email),
    consent: parseBoolean(body.consent),
    captchaToken: sanitizeText(body.captchaToken, 2000),
    website: sanitizeText(body.website, 100),
  };

  const errors: Record<string, string> = {};
  if (!data.email || !emailRegex.test(data.email))
    errors.email = 'Please provide a valid email address.';
  if (!data.consent) errors.consent = 'Please consent to receiving updates.';
  if (data.website) errors.website = 'Spam check failed.';

  return {
    data,
    result: {
      ok: Object.keys(errors).length === 0,
      message: 'Validated',
      errors,
    },
  };
}

export function validateMembershipPayload(input: unknown): {
  data: MembershipInterestPayload;
  result: FormResult;
} {
  const body = (input && typeof input === 'object' ? input : {}) as Record<
    string,
    unknown
  >;
  const data: MembershipInterestPayload = {
    fullName: sanitizeText(body.fullName, 120),
    email: sanitizeEmail(body.email),
    company: sanitizeText(body.company, 120),
    phone: sanitizeText(body.phone, 40),
    inquiryType: 'membership',
    membershipSegment: sanitizeText(
      body.membershipSegment,
      40,
    ) as MembershipInterestPayload['membershipSegment'],
    message: sanitizeText(body.message, 2500),
    consent: parseBoolean(body.consent),
    captchaToken: sanitizeText(body.captchaToken, 2000),
    website: sanitizeText(body.website, 100),
  };

  const errors = getCommonErrors(data);
  if (
    !['international-business', 'local-sme', 'individual'].includes(
      data.membershipSegment,
    )
  ) {
    errors.membershipSegment = 'Please choose a valid membership segment.';
  }

  return {
    data,
    result: {
      ok: Object.keys(errors).length === 0,
      message: 'Validated',
      errors,
    },
  };
}

export function validateSponsorshipPayload(input: unknown): {
  data: SponsorshipPayload;
  result: FormResult;
} {
  const body = (input && typeof input === 'object' ? input : {}) as Record<
    string,
    unknown
  >;
  const data: SponsorshipPayload = {
    fullName: sanitizeText(body.fullName, 120),
    email: sanitizeEmail(body.email),
    company: sanitizeText(body.company, 120),
    phone: sanitizeText(body.phone, 40),
    inquiryType: 'sponsorship',
    budgetRange: sanitizeText(
      body.budgetRange,
      40,
    ) as SponsorshipPayload['budgetRange'],
    message: sanitizeText(body.message, 2500),
    consent: parseBoolean(body.consent),
    captchaToken: sanitizeText(body.captchaToken, 2000),
    website: sanitizeText(body.website, 100),
  };

  const errors = getCommonErrors(data);
  if (!['up-to-7000', '7000-12000', '12000-plus'].includes(data.budgetRange)) {
    errors.budgetRange = 'Please choose a valid budget range.';
  }

  return {
    data,
    result: {
      ok: Object.keys(errors).length === 0,
      message: 'Validated',
      errors,
    },
  };
}

export function validateResourceLeadPayload(input: unknown): {
  data: ResourceLeadPayload;
  result: FormResult;
} {
  const body = (input && typeof input === 'object' ? input : {}) as Record<
    string,
    unknown
  >;
  const data: ResourceLeadPayload = {
    resourceSlug: sanitizeText(body.resourceSlug, 120),
    fullName: sanitizeText(body.fullName, 120),
    email: sanitizeEmail(body.email),
    company: sanitizeText(body.company, 120),
    role: sanitizeText(body.role, 120),
    consent: parseBoolean(body.consent),
    captchaToken: sanitizeText(body.captchaToken, 2000),
    website: sanitizeText(body.website, 100),
  };

  const errors: Record<string, string> = {};
  if (!data.resourceSlug)
    errors.resourceSlug = 'Resource reference is missing.';
  if (!data.fullName || data.fullName.length < 2)
    errors.fullName = 'Please provide your full name.';
  if (!data.email || !emailRegex.test(data.email))
    errors.email = 'Please provide a valid email address.';
  if (!data.consent) errors.consent = 'Consent is required to continue.';
  if (data.website) errors.website = 'Spam check failed.';

  return {
    data,
    result: {
      ok: Object.keys(errors).length === 0,
      message: 'Validated',
      errors,
    },
  };
}
