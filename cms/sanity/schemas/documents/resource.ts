import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { featuredField, orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const resourceSchema: SchemaDocument = {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: ['required'] },
    slugField,
    { name: 'excerpt', title: 'Excerpt', type: 'text', validation: ['required'] },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }], validation: ['required'] },
    { name: 'resourceType', title: 'Type', type: 'string', options: { list: ['insight', 'report', 'guide', 'job'] }, validation: ['required'] },
    { name: 'publishedAt', title: 'Published at', type: 'datetime', validation: ['required'] },
    { name: 'author', title: 'Author', type: 'string', validation: ['required'] },
    { name: 'tags', title: 'Tags', type: 'array', to: [{ type: 'tag' }] },
    featuredField,
    orderField,
    statusField,
    seoField,
  ],
};
