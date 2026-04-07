'use client';

import { FormEvent, useState } from 'react';
import { Button, Checkbox, Input, Text } from '@/components/ui/primitives';
import { useFormSubmit } from '@/components/forms/use-form-submit';

export function ResourceDownloadForm({
  resourceSlug,
}: {
  resourceSlug: string;
}) {
  const [form, setForm] = useState({
    resourceSlug,
    fullName: '',
    email: '',
    company: '',
    role: '',
    consent: false,
    website: '',
  });
  const { state, submit } = useFormSubmit('/api/forms/resource-download');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submit(form);
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit} noValidate>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Full name
        <Input
          value={form.fullName}
          onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
          required
        />
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Work email
        <Input
          type="email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          required
        />
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Company
        <Input
          value={form.company}
          onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
        />
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Role
        <Input
          value={form.role}
          onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
        />
      </label>
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={form.website}
        onChange={(e) => setForm((s) => ({ ...s, website: e.target.value }))}
        name="website"
        aria-hidden
      />
      <Checkbox
        id={`resource-consent-${resourceSlug}`}
        checked={form.consent}
        onChange={(e) => setForm((s) => ({ ...s, consent: e.target.checked }))}
        label="I consent to the use of my details for resource delivery and relevant chamber updates."
      />
      {state.message ? (
        <Text
          className={
            state.status === 'success'
              ? 'text-sm text-green-700'
              : 'text-sm text-red-700'
          }
        >
          {state.message}
        </Text>
      ) : null}
      <Button type="submit" size="sm" disabled={state.status === 'submitting'}>
        {state.status === 'submitting'
          ? 'Processing...'
          : 'Request download link'}
      </Button>
    </form>
  );
}
