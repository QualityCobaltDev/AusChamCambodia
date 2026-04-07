import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const tagSchema: SchemaDocument = {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: ['required'] },
    slugField,
    { name: 'taxonomy', title: 'Taxonomy', type: 'string', options: { list: ['industry', 'topic', 'audience'] }, validation: ['required'] },
    orderField,
    statusField,
    seoField,
  ],
};
