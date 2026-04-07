'use client';

import { FormEvent, useState } from 'react';
import { Button, Checkbox, Input, Text } from '@/components/ui/primitives';
import { useFormSubmit } from '@/components/forms/use-form-submit';

export function NewsletterForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    consent: false,
    website: '',
  });
  const { state, submit } = useFormSubmit('/api/forms/newsletter');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = await submit(form);
    if (ok) setForm({ fullName: '', email: '', consent: false, website: '' });
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit} noValidate>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Name (optional)
        <Input
          value={form.fullName}
          onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
        />
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Email
        <Input
          type="email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          required
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
        id="newsletter-consent"
        checked={form.consent}
        onChange={(e) => setForm((s) => ({ ...s, consent: e.target.checked }))}
        label="I consent to receive AusCham Cambodia updates and can unsubscribe anytime."
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
        {state.status === 'submitting' ? 'Submitting...' : 'Subscribe'}
      </Button>
    </form>
  );
}
