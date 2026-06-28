'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Download01Icon, Loading03Icon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { toast } from 'sonner';
import { isValidEmail } from '@/lib/validation';
import { cn } from '@/lib/utils';

export function LeadForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState('');

  const isButtonEnabled = firstName.trim() !== '' && email.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setError('');
    if (!isValidEmail(email)) {
      setError('Enter a valid email address');
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok && response.status !== 409) {
        let message = 'Something went wrong. Please try again.';
        try {
          const data = (await response.json()) as { error?: unknown };
          if (typeof data?.error === 'string') message = data.error;
        } catch {
          /* keep default message */
        }
        throw new Error(message);
      }

      setIsDone(true);
      toast.success("You're all set! Check your inbox for the free guide.");
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request took too long. Please try again.');
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isDone) {
    return (
      <div
        role="status"
        className="flex w-full max-w-md items-start gap-3 rounded-xl border border-[#CDE0F4] bg-[#EAF1FB] p-5"
      >
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          className="mt-0.5 h-6 w-6 shrink-0 text-primary-blue"
          size={24}
        />
        <div>
          <p className="text-sm font-semibold text-slate-900">Your guide is on the way!</p>
          <p className="mt-1 text-sm text-slate-600">
            We&apos;ve sent &ldquo;5 Lab Values Every Nigerian Should Understand&rdquo; to{' '}
            <span className="font-medium text-slate-800">{email}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full max-w-md flex-col gap-3">
      <div>
        <label htmlFor="lead-first-name" className="sr-only">
          First name
        </label>
        <input
          id="lead-first-name"
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value.slice(0, 50))}
          disabled={isLoading}
          maxLength={50}
          autoComplete="given-name"
          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-4 py-3.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-primary-blue focus:outline-none disabled:bg-slate-50"
        />
      </div>

      <div>
        <label htmlFor="lead-email" className="sr-only">
          Email address
        </label>
        <input
          id="lead-email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          disabled={isLoading}
          autoComplete="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'lead-email-error' : undefined}
          className={cn(
            'w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none disabled:bg-slate-50',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-[#E4E4E7] hover:border-slate-300 focus:border-primary-blue',
          )}
        />
        {error && (
          <p id="lead-email-error" className="mt-1.5 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isButtonEnabled || isLoading}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all',
          isButtonEnabled && !isLoading
            ? 'bg-primary-blue text-white hover:bg-primary-blue/90 active:bg-primary-blue'
            : 'cursor-not-allowed bg-[#DCE8F6] text-[#7FA3D1]',
        )}
      >
        {isLoading ? (
          <>
            <span>Sending...</span>
            <HugeiconsIcon icon={Loading03Icon} className="h-5 w-5 animate-spin" size={20} />
          </>
        ) : (
          <>
            <span>Download Free Guide</span>
            <HugeiconsIcon icon={Download01Icon} className="h-5 w-5" size={20} />
          </>
        )}
      </button>
    </form>
  );
}
