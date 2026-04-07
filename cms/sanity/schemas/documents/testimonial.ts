import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { featuredField, orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const testimonialSchema: SchemaDocument = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    slugField,
    { name: 'quote', title: 'Quote', type: 'text', validation: ['required'] },
    { name: 'personName', title: 'Person name', type: 'string', validation: ['required'] },
    { name: 'personTitle', title: 'Person title', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    featuredField,
    orderField,
    statusField,
    seoField,
  ],
};
