import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const pageSchema: SchemaDocument = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: ['required'] },
    slugField,
    { name: 'summary', title: 'Summary', type: 'text', validation: ['required'] },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    { name: 'pageType', title: 'Page type', type: 'string', options: { list: ['standard', 'legal', 'landing'] }, validation: ['required'] },
    orderField,
    statusField,
    seoField,
  ],
};
