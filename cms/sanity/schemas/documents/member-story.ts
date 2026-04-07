import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { featuredField, orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const memberStorySchema: SchemaDocument = {
  name: 'memberStory',
  title: 'Member Story',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: ['required'] },
    slugField,
    { name: 'summary', title: 'Summary', type: 'text', validation: ['required'] },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }], validation: ['required'] },
    { name: 'memberName', title: 'Member name', type: 'string', validation: ['required'] },
    { name: 'company', title: 'Company', type: 'string', validation: ['required'] },
    { name: 'impactMetric', title: 'Impact metric', type: 'string' },
    featuredField,
    orderField,
    statusField,
    seoField,
  ],
};
