import { committeeMemberSchema } from '@/cms/sanity/schemas/documents/committee-member';
import { contactInquirySchema } from '@/cms/sanity/schemas/documents/contact-inquiry';
import { eventSchema } from '@/cms/sanity/schemas/documents/event';
import { homepageSchema } from '@/cms/sanity/schemas/documents/homepage';
import { memberStorySchema } from '@/cms/sanity/schemas/documents/member-story';
import { membershipBenefitSchema } from '@/cms/sanity/schemas/documents/membership-benefit';
import { membershipPlanSchema } from '@/cms/sanity/schemas/documents/membership-plan';
import { pageSchema } from '@/cms/sanity/schemas/documents/page';
import { partnerSchema } from '@/cms/sanity/schemas/documents/partner';
import { redirectSchema } from '@/cms/sanity/schemas/documents/redirect';
import { resourceSchema } from '@/cms/sanity/schemas/documents/resource';
import { siteSettingsSchema } from '@/cms/sanity/schemas/documents/site-settings';
import { speakerSchema } from '@/cms/sanity/schemas/documents/speaker';
import { sponsorshipPackageSchema } from '@/cms/sanity/schemas/documents/sponsorship-package';
import { tagSchema } from '@/cms/sanity/schemas/documents/tag';
import { testimonialSchema } from '@/cms/sanity/schemas/documents/testimonial';
import { seoSchema } from '@/cms/sanity/schemas/objects/seo';

export const sanitySchemaMap = [
  seoSchema,
  siteSettingsSchema,
  homepageSchema,
  pageSchema,
  membershipPlanSchema,
  membershipBenefitSchema,
  eventSchema,
  speakerSchema,
  resourceSchema,
  testimonialSchema,
  memberStorySchema,
  sponsorshipPackageSchema,
  committeeMemberSchema,
  partnerSchema,
  contactInquirySchema,
  redirectSchema,
  tagSchema,
];
