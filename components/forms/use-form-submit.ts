'use client';

import { useState } from 'react';

type SubmitState = {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
  errors: Record<string, string>;
};

export function useFormSubmit(endpoint: string) {
  const [state, setState] = useState<SubmitState>({ status: 'idle', errors: {} });

  async function submit(payload: Record<string, unknown>) {
    setState({ status: 'submitting', errors: {} });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as
      | { ok: boolean; message: string; errors?: Record<string, string> }
      | null;

    if (!response.ok || !data?.ok) {
      setState({ status: 'error', message: data?.message ?? 'Unable to submit. Please try again.', errors: data?.errors ?? {} });
      return false;
    }

    setState({ status: 'success', message: data.message, errors: {} });
    return true;
  }

  return { state, submit, reset: () => setState({ status: 'idle', errors: {} }) };
}
