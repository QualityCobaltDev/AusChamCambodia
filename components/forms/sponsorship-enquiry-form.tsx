'use client';

import { FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  Input,
  Select,
  Text,
  Textarea,
} from '@/components/ui/primitives';
import { useFormSubmit } from '@/components/forms/use-form-submit';

export function SponsorshipEnquiryForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    budgetRange: 'up-to-7000',
    message: '',
    consent: false,
    website: '',
  });
  const { state, submit } = useFormSubmit('/api/forms/sponsorship');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submit(form);
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Contact name
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
        Phone
        <Input
          value={form.phone}
          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
        />
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Budget range
        <Select
          value={form.budgetRange}
          onChange={(e) =>
            setForm((s) => ({ ...s, budgetRange: e.target.value }))
          }
        >
          <option value="up-to-7000">Up to USD 7,000</option>
          <option value="7000-12000">USD 7,000 - 12,000</option>
          <option value="12000-plus">USD 12,000+</option>
        </Select>
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Objectives
        <Textarea
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
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
        id="sponsor-consent"
        checked={form.consent}
        onChange={(e) => setForm((s) => ({ ...s, consent: e.target.checked }))}
        label="I consent to being contacted regarding sponsorship options and partnership planning."
      />
      {state.message ? (
        <Text
          className={
            state.status === 'success' ? 'text-green-700' : 'text-red-700'
          }
        >
          {state.message}
        </Text>
      ) : null}
      <Button type="submit" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Sending...' : 'Send enquiry'}
      </Button>
    </form>
  );
}
