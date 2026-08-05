'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HugeiconsIcon } from '@hugeicons/react';
import { Download01Icon, Loading03Icon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { leadFormSchema, type LeadFormValues } from '@/schemas/lead-form-schema';
import { trackGuideDownload } from '@/lib/analytics/ga';
import { trackLead } from '@/lib/analytics/pixel';
import { captureGuestEvent, captureLead, identifyLead } from '@/lib/analytics/posthog';
import { runAnalyticsSafely } from '@/lib/analytics/safe';

export function LeadForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState('');
  const [website, setWebsite] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: '',
      email: '',
    },
  });

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const isButtonEnabled = firstName.trim() !== '' && email.trim() !== '';

  useEffect(() => {
    runAnalyticsSafely(() => captureGuestEvent('squeeze_page_viewed'));
  }, []);

  const onSubmit = async (data: LeadFormValues) => {
    if (isLoading) return;
    if (website) return;

    runAnalyticsSafely(() => captureGuestEvent('guide_download_started'));

    setError('');
    setIsLoading(true);

    const downloadWindow = window.open('', '_blank', 'noopener,noreferrer');

    try {
      const response = await fetch('/api/v1/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          first_name: data.firstName,
          source: 'lead_magnet',
        }),
      });

      if (!response.ok && response.status !== 409) {
        let errorMessage = 'Something went wrong. Please try again.';

        try {
          const result = (await response.json()) as { error?: unknown };
          if (typeof result.error === 'string') errorMessage = result.error;
        } catch {
          // Keep the safe default error message when the response is not JSON.
        }

        if (downloadWindow) {
          downloadWindow.close();
        }

        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      reset();
      setIsDone(true);
      runAnalyticsSafely(identifyLead, () => captureLead('guide'), trackLead, trackGuideDownload);
      toast.success("You're all set! Check your inbox for the free guide.");

      if (downloadWindow) {
        downloadWindow.location.href = '/guides/5-lab-values-every-nigerian-should-understand.pdf';
      } else {
        window.open(
          '/guides/5-lab-values-every-nigerian-should-understand.pdf',
          '_blank',
          'noopener,noreferrer',
        );
      }

      router.push('/thank-you/guide');
    } catch {
      if (downloadWindow) {
        downloadWindow.close();
      }

      const errorMessage = 'Something went wrong. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isDone) {
    return (
      <div
        role="status"
        className="flex w-full max-w-md items-start gap-3 rounded-xl border border-[#CDE0F4] bg-[#EAF1FB] p-5 text-left"
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-md flex-col gap-3 text-left"
    >
      <input
        tabIndex={-1}
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div>
        <label htmlFor="lead-first-name" className="sr-only">
          First name
        </label>
        <input
          id="lead-first-name"
          type="text"
          placeholder="Enter your first name"
          {...register('firstName')}
          onChange={(e) => {
            setFirstName(e.target.value);
            register('firstName').onChange(e);
          }}
          disabled={isLoading}
          maxLength={50}
          autoComplete="given-name"
          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-4 py-3.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-primary-blue focus:outline-none disabled:bg-slate-50"
        />
        {errors.firstName?.message && (
          <p className="mt-1.5 text-xs text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lead-email" className="sr-only">
          Email address
        </label>
        <input
          id="lead-email"
          type="email"
          placeholder="Enter your email address"
          {...register('email')}
          onChange={(e) => {
            setEmail(e.target.value);
            register('email').onChange(e);
          }}
          disabled={isLoading}
          autoComplete="email"
          aria-invalid={Boolean(error || errors.email)}
          aria-describedby={error || errors.email ? 'lead-email-error' : undefined}
          className={cn(
            'w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none disabled:bg-slate-50',
            error || errors.email
              ? 'border-red-500 focus:border-red-500'
              : 'border-[#E4E4E7] hover:border-slate-300 focus:border-primary-blue',
          )}
        />
        {(error || errors.email?.message) && (
          <p id="lead-email-error" className="mt-1.5 text-xs text-red-500">
            {error || errors.email?.message}
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
