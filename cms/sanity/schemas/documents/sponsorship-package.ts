import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { featuredField, orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const sponsorshipPackageSchema: SchemaDocument = {
  name: 'sponsorshipPackage',
  title: 'Sponsorship Package',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: ['required'] },
    slugField,
    { name: 'tier', title: 'Tier', type: 'string', options: { list: ['platinum', 'gold', 'silver', 'supporting'] }, validation: ['required'] },
    { name: 'annualPriceUsd', title: 'Annual price (USD)', type: 'number', validation: ['required', 'min:0'] },
    { name: 'eventInclusionCount', title: 'Event inclusion count', type: 'number', validation: ['required', 'integer', 'min:0'] },
    { name: 'benefits', title: 'Benefits', type: 'array', of: [{ type: 'string' }], validation: ['required'] },
    featuredField,
    orderField,
    statusField,
    seoField,
  ],
};
