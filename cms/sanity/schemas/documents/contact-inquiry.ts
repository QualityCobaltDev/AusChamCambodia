import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { seoField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const contactInquirySchema: SchemaDocument = {
  name: 'contactInquiry',
  title: 'Contact Inquiry',
  type: 'document',
  fields: [
    { name: 'fullName', title: 'Full name', type: 'string', validation: ['required'] },
    { name: 'email', title: 'Email', type: 'string', validation: ['required', 'email'] },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'inquiryType', title: 'Inquiry type', type: 'string', options: { list: ['membership', 'events', 'sponsorship', 'media', 'other'] }, validation: ['required'] },
    { name: 'message', title: 'Message', type: 'text', validation: ['required', 'min:20'] },
    statusField,
    seoField,
  ],
};
