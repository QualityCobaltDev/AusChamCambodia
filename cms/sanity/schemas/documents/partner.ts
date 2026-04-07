import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { featuredField, orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const partnerSchema: SchemaDocument = {
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: ['required'] },
    slugField,
    { name: 'category', title: 'Category', type: 'string', options: { list: ['strategic', 'media', 'institutional'] }, validation: ['required'] },
    { name: 'website', title: 'Website', type: 'url', validation: ['required'] },
    { name: 'logo', title: 'Logo', type: 'image' },
    featuredField,
    orderField,
    statusField,
    seoField,
  ],
};
