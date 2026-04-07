import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';

export const seoSchema: SchemaDocument = {
  name: 'seo',
  title: 'SEO metadata',
  type: 'object',
  fields: [
    { name: 'title', title: 'Meta title', type: 'string', validation: ['required', 'max:70'] },
    { name: 'description', title: 'Meta description', type: 'text', validation: ['required', 'max:160'] },
    { name: 'image', title: 'Social image', type: 'image' },
    { name: 'noIndex', title: 'No index', type: 'boolean', initialValue: false },
  ],
};
