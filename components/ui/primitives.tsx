import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45 hover:-translate-y-0.5 hover:scale-[1.01]';
  const variants = {
    primary: 'bg-brand-blue-700 text-white shadow-soft hover:bg-brand-blue-600 hover:shadow-lift active:bg-brand-navy-900',
    secondary: 'border border-brand-neutral-200 bg-white text-brand-neutral-700 shadow-sm hover:border-brand-blue-700 hover:text-brand-blue-700 hover:shadow-soft',
    ghost: 'text-brand-neutral-700 hover:bg-brand-blue-100/70',
  };
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-[var(--container-content)] px-5 md:px-8', className)} {...props} />;
}

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('py-24 md:py-28', className)} {...props} />;
}

export function Heading({ className, level = 'h2', ...props }: HTMLAttributes<HTMLHeadingElement> & { level?: 'h1' | 'h2' | 'h3' | 'h4' }) {
  const Tag = level;
  const sizes = {
    h1: 'text-[3.5rem] leading-[1.02] md:text-[4rem]',
    h2: 'text-[2.35rem] leading-[1.08] md:text-[2.75rem]',
    h3: 'text-[1.625rem] leading-[1.15] md:text-[1.75rem]',
    h4: 'text-xl leading-[1.2] md:text-2xl',
  };
  return <Tag className={cn('font-semibold text-balance tracking-[-0.03em]', sizes[level], className)} {...props} />;
}

export function Text({ className, tone = 'default', ...props }: HTMLAttributes<HTMLParagraphElement> & { tone?: 'default' | 'muted' | 'strong' }) {
  const tones = {
    default: 'text-brand-neutral-700',
    muted: 'text-brand-neutral-500',
    strong: 'text-brand-neutral-700',
  };
  return <p className={cn('text-[1.05rem] leading-8', tones[tone], className)} {...props} />;
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('inline-flex rounded-full border border-brand-blue-700/20 bg-brand-blue-100/80 px-4 py-1.5 text-xs font-semibold tracking-[0.06em] text-brand-blue-700 uppercase', className)} {...props} />;
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('surface-card group relative overflow-hidden p-8 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg', className)} {...props} />;
}

const fieldBase =
  'w-full rounded-xl border border-brand-neutral-200 bg-white px-4 py-3 text-sm text-brand-neutral-700 placeholder:text-brand-neutral-500 transition-colors duration-200 focus-visible:border-brand-blue-700 focus-visible:outline-none';

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(fieldBase, className)} {...props} />
));
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<'textarea'>>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldBase, 'min-h-28', className)} {...props} />
));
Textarea.displayName = 'Textarea';

export const Select = forwardRef<HTMLSelectElement, ComponentPropsWithoutRef<'select'>>(({ className, ...props }, ref) => (
  <select ref={ref} className={cn(fieldBase, className)} {...props} />
));
Select.displayName = 'Select';

export function Checkbox({ label, id, ...props }: ComponentPropsWithoutRef<'input'> & { label: ReactNode; id: string }) {
  return (
    <label htmlFor={id} className="flex items-start gap-2 text-sm text-brand-neutral-700">
      <input id={id} type="checkbox" className="mt-0.5 h-4 w-4 rounded border-brand-neutral-200 text-brand-blue-700" {...props} />
      <span>{label}</span>
    </label>
  );
}

export function Divider({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('border-brand-neutral-200', className)} {...props} />;
}

export function CTABand({ title, body, action }: { title: string; body: string; action: ReactNode }) {
  return (
    <div className="rounded-2xl bg-brand-navy-900 px-8 py-12 text-white shadow-soft md:flex md:items-center md:justify-between md:px-12">
      <div>
        <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em]">{title}</h3>
        <p className="mt-3 max-w-2xl text-base text-blue-100">{body}</p>
      </div>
      <div className="mt-6 md:mt-0">{action}</div>
    </div>
  );
}
