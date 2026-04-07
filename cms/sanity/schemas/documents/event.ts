import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { featuredField, orderField, seoField, slugField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const eventSchema: SchemaDocument = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: ['required'] },
    slugField,
    { name: 'excerpt', title: 'Excerpt', type: 'text', validation: ['required'] },
    { name: 'startDate', title: 'Start date', type: 'datetime', validation: ['required'] },
    { name: 'endDate', title: 'End date', type: 'datetime' },
    { name: 'venue', title: 'Venue', type: 'string', validation: ['required'] },
    { name: 'eventType', title: 'Event type', type: 'string', options: { list: ['forum', 'networking', 'briefing', 'training'] }, validation: ['required'] },
    { name: 'registrationUrl', title: 'Registration URL', type: 'url' },
    { name: 'speakers', title: 'Speakers', type: 'array', to: [{ type: 'speaker' }] },
    { name: 'tags', title: 'Tags', type: 'array', to: [{ type: 'tag' }] },
    featuredField,
    orderField,
    statusField,
    seoField,
  ],
};
