export const inquiryTypes = [
  'membership',
  'sponsorship',
  'events',
  'general',
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export type FormResult = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

export type BaseFormPayload = {
  inquiryType: InquiryType;
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  consent: boolean;
  captchaToken?: string;
  website?: string;
};

export type ContactPayload = BaseFormPayload;

export type NewsletterPayload = {
  fullName?: string;
  email: string;
  consent: boolean;
  captchaToken?: string;
  website?: string;
};

export type MembershipInterestPayload = BaseFormPayload & {
  membershipSegment: 'international-business' | 'local-sme' | 'individual';
};

export type SponsorshipPayload = BaseFormPayload & {
  budgetRange: 'up-to-7000' | '7000-12000' | '12000-plus';
};

export type ResourceLeadPayload = {
  resourceSlug: string;
  fullName: string;
  email: string;
  company?: string;
  role?: string;
  consent: boolean;
  captchaToken?: string;
  website?: string;
};
