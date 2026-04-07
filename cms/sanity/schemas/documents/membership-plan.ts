import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { featuredField, orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const membershipPlanSchema: SchemaDocument = {
  name: 'membershipPlan',
  title: 'Membership Plan',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: ['required'] },
    slugField,
    { name: 'segment', title: 'Segment', type: 'string', options: { list: ['international-business', 'local-sme', 'individual'] }, validation: ['required'] },
    { name: 'annualPriceUsd', title: 'Annual price (USD)', type: 'number', validation: ['required', 'min:0'] },
    { name: 'onboardingFeeUsd', title: 'Onboarding fee (USD)', type: 'number', validation: ['min:0'] },
    { name: 'summary', title: 'Summary', type: 'text', validation: ['required'] },
    { name: 'benefits', title: 'Benefits', type: 'array', to: [{ type: 'membershipBenefit' }], validation: ['required'] },
    { name: 'comparisonHighlights', title: 'Comparison highlights', type: 'array', of: [{ type: 'string' }] },
    { name: 'ctaLabel', title: 'CTA label', type: 'string', validation: ['required'] },
    featuredField,
    orderField,
    statusField,
    seoField,
  ],
};
