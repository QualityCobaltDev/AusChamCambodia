import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const membershipBenefitSchema: SchemaDocument = {
  name: 'membershipBenefit',
  title: 'Membership Benefit',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: ['required'] },
    slugField,
    { name: 'description', title: 'Description', type: 'text', validation: ['required'] },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['advocacy', 'network', 'visibility', 'insight', 'services'] }, validation: ['required'] },
    orderField,
    statusField,
    seoField,
  ],
};
