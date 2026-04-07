import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { seoField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const redirectSchema: SchemaDocument = {
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    { name: 'fromPath', title: 'From path', type: 'string', validation: ['required', 'regex:^/'] },
    { name: 'toPath', title: 'To path', type: 'string', validation: ['required', 'regex:^/'] },
    { name: 'permanent', title: 'Permanent (301)', type: 'boolean', initialValue: true },
    statusField,
    seoField,
  ],
};
