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

export function MembershipInterestForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    membershipSegment: 'international-business',
    message: '',
    consent: false,
    website: '',
  });
  const { state, submit } = useFormSubmit('/api/forms/membership');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submit(form);
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Full name
        <Input
          value={form.fullName}
          onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
          required
        />
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Business email
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
        Membership segment
        <Select
          value={form.membershipSegment}
          onChange={(e) =>
            setForm((s) => ({ ...s, membershipSegment: e.target.value }))
          }
        >
          <option value="international-business">International Business</option>
          <option value="local-sme">Local SME</option>
          <option value="individual">Individual</option>
        </Select>
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Desired outcomes
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
        id="membership-consent"
        checked={form.consent}
        onChange={(e) => setForm((s) => ({ ...s, consent: e.target.checked }))}
        label="I consent to processing of my details for membership eligibility review and follow-up."
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
        {state.status === 'submitting'
          ? 'Submitting...'
          : 'Submit expression of interest'}
      </Button>
    </form>
  );
}
