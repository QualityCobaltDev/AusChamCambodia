import type { ReactNode } from 'react';

export function PageShell({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="max-w-3xl text-base text-slate-600">{description}</p>
      </div>
      {children ?? (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700">
          <p>Content scaffold is ready. Replace this block with production content modules.</p>
        </div>
      )}
    </section>
  );
}
