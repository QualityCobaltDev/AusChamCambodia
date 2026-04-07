export type SchemaField = {
  name: string;
  title: string;
  type: string;
  description?: string;
  options?: Record<string, unknown>;
  initialValue?: unknown;
  validation?: string[];
  of?: Array<Record<string, unknown>>;
  to?: Array<{ type: string }>;
  fields?: SchemaField[];
};

export type SchemaDocument = {
  name: string;
  title: string;
  type: 'document' | 'object';
  fields: SchemaField[];
  preview?: Record<string, unknown>;
};

export const statusField: SchemaField = {
  name: 'status',
  title: 'Status',
  type: 'string',
  initialValue: 'draft',
  options: { list: ['draft', 'review', 'published', 'archived'] },
  validation: ['required'],
};

export const featuredField: SchemaField = {
  name: 'featured',
  title: 'Featured',
  type: 'boolean',
  initialValue: false,
};

export const orderField: SchemaField = {
  name: 'order',
  title: 'Sort order',
  type: 'number',
  validation: ['integer', 'min:0'],
};

export const slugField: SchemaField = {
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: { source: 'title', maxLength: 96 },
  validation: ['required'],
};

export const seoField: SchemaField = {
  name: 'seo',
  title: 'SEO',
  type: 'seo',
  validation: ['required'],
};
