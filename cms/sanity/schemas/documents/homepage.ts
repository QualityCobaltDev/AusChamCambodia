import type { SchemaDocument } from '@/cms/sanity/schemas/schema-helpers';
import { featuredField, seoField, statusField } from '@/cms/sanity/schemas/schema-helpers';

export const homepageSchema: SchemaDocument = {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    { name: 'title', title: 'Internal title', type: 'string', validation: ['required'] },
    {
      name: 'hero',
      title: 'Hero section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: ['required'] },
        { name: 'headline', title: 'Headline', type: 'string', validation: ['required'] },
        { name: 'intro', title: 'Intro', type: 'text', validation: ['required'] },
      ],
    },
    { name: 'featuredPlans', title: 'Featured membership plans', type: 'array', to: [{ type: 'membershipPlan' }] },
    { name: 'featuredEvents', title: 'Featured events', type: 'array', to: [{ type: 'event' }] },
    { name: 'featuredResources', title: 'Featured resources', type: 'array', to: [{ type: 'resource' }] },
    { name: 'featuredStories', title: 'Featured member stories', type: 'array', to: [{ type: 'memberStory' }] },
    featuredField,
    statusField,
    seoField,
  ],
};
