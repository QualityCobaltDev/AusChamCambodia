import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { featuredField, orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const committeeMemberSchema: SchemaDocument = {
  name: 'committeeMember',
  title: 'Committee Member',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: ['required'] },
    slugField,
    { name: 'role', title: 'Role', type: 'string', validation: ['required'] },
    { name: 'company', title: 'Company', type: 'string', validation: ['required'] },
    { name: 'bio', title: 'Biography', type: 'text' },
    { name: 'committeeType', title: 'Committee type', type: 'string', options: { list: ['executive', 'advisory', 'working-group'] }, validation: ['required'] },
    featuredField,
    orderField,
    statusField,
    seoField,
  ],
};
