import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { seoField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const siteSettingsSchema: SchemaDocument = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'siteName', title: 'Site name', type: 'string', validation: ['required'] },
    { name: 'siteUrl', title: 'Site URL', type: 'url', validation: ['required'] },
    { name: 'contactEmail', title: 'Contact email', type: 'string', validation: ['required', 'email'] },
    { name: 'contactPhone', title: 'Contact phone', type: 'string' },
    {
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'platform', title: 'Platform', type: 'string' }, { name: 'url', title: 'URL', type: 'url' }] }],
    },
    seoField,
    statusField,
  ],
};
