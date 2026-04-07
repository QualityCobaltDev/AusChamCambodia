import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45';
  const variants = {
    primary: 'bg-brand-blue-600 text-white hover:bg-brand-blue-700 active:bg-brand-navy-900 shadow-soft',
    secondary: 'border border-brand-neutral-200 bg-white text-brand-navy-900 hover:border-brand-blue-600 hover:text-brand-blue-700',
    ghost: 'text-brand-navy-900 hover:bg-brand-blue-100',
  };
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-[var(--container-content)] px-4 md:px-6', className)} {...props} />;
}

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('py-14 md:py-18', className)} {...props} />;
}

export function Heading({ className, level = 'h2', ...props }: HTMLAttributes<HTMLHeadingElement> & { level?: 'h1' | 'h2' | 'h3' | 'h4' }) {
  const Tag = level;
  const sizes = { h1: 'text-4xl md:text-6xl', h2: 'text-3xl md:text-5xl', h3: 'text-2xl md:text-3xl', h4: 'text-xl md:text-2xl' };
  return <Tag className={cn('font-semibold text-balance', sizes[level], className)} {...props} />;
}

export function Text({ className, tone = 'default', ...props }: HTMLAttributes<HTMLParagraphElement> & { tone?: 'default' | 'muted' | 'strong' }) {
  const tones = {
    default: 'text-brand-neutral-700',
    muted: 'text-brand-neutral-500',
    strong: 'text-brand-navy-900',
  };
  return <p className={cn('leading-7', tones[tone], className)} {...props} />;
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('inline-flex rounded-full bg-brand-blue-100 px-3 py-1 text-xs font-medium text-brand-blue-700', className)} {...props} />;
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('surface-card p-6', className)} {...props} />;
}

const fieldBase =
  'w-full rounded-md border border-brand-neutral-200 bg-white px-3 py-2.5 text-sm text-brand-navy-900 placeholder:text-brand-neutral-500 focus-visible:border-brand-blue-600 focus-visible:outline-none';

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
      <input id={id} type="checkbox" className="mt-0.5 h-4 w-4 rounded border-brand-neutral-200 text-brand-blue-600" {...props} />
      <span>{label}</span>
    </label>
  );
}

export function Divider({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('border-brand-neutral-200', className)} {...props} />;
}

export function CTABand({ title, body, action }: { title: string; body: string; action: ReactNode }) {
  return (
    <div className="rounded-xl bg-brand-navy-900 px-6 py-8 text-white shadow-soft md:flex md:items-center md:justify-between md:px-8">
      <div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm text-blue-100">{body}</p>
      </div>
      <div className="mt-5 md:mt-0">{action}</div>
    </div>
  );
}
