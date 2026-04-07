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

export function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: 'general',
    message: '',
    consent: false,
    website: '',
  });
  const { state, submit } = useFormSubmit('/api/forms/contact');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = await submit(form);
    if (ok) setForm({ ...form, message: '', website: '' });
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Full name
        <Input
          value={form.fullName}
          onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
          aria-invalid={!!state.errors.fullName}
          required
        />
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Business email
        <Input
          type="email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          aria-invalid={!!state.errors.email}
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
        Phone (optional)
        <Input
          value={form.phone}
          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
        />
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Inquiry type
        <Select
          value={form.inquiryType}
          onChange={(e) =>
            setForm((s) => ({ ...s, inquiryType: e.target.value }))
          }
        >
          <option value="membership">Membership</option>
          <option value="sponsorship">Sponsorship</option>
          <option value="events">Events</option>
          <option value="general">General</option>
        </Select>
      </label>
      <label className="text-brand-navy-900 block text-sm font-medium">
        Message
        <Textarea
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          aria-invalid={!!state.errors.message}
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
        id="contact-consent"
        checked={form.consent}
        onChange={(e) => setForm((s) => ({ ...s, consent: e.target.checked }))}
        label="I consent to AusCham Cambodia using this information to respond to my enquiry."
      />
      <Text className="text-xs" tone="muted">
        Protected by anti-spam checks. Add reCAPTCHA or hCaptcha keys in
        environment variables to activate challenge verification.
      </Text>
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
        {state.status === 'submitting' ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  );
}
