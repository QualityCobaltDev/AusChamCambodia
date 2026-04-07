import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const speakerSchema: SchemaDocument = {
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: ['required'] },
    slugField,
    { name: 'title', title: 'Job title', type: 'string', validation: ['required'] },
    { name: 'organization', title: 'Organization', type: 'string', validation: ['required'] },
    { name: 'bio', title: 'Biography', type: 'text', validation: ['required'] },
    { name: 'headshot', title: 'Headshot', type: 'image' },
    statusField,
    seoField,
  ],
};
