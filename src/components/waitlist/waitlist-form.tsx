'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  Loading03Icon,
  SchoolBell02Icon,
  User02Icon,
  MailBlock01Icon,
} from '@hugeicons/core-free-icons';
import Image from 'next/image';
import MyIcon from '@/components/icons/MyIcon';

export function WaitlistForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Check if button should be enabled
  const isButtonEnabled = firstName.trim() !== '' && email.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!isValidEmail(email)) {
      setError('Enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // API call
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to join waitlist');
      }

      // Success!
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-8 md:px-6 lg:px-8">
      <div className="flex w-full max-w-157.5 flex-col gap-8 md:gap-10">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex h-15 w-15 items-center justify-center rounded-2xl border-b-[5px] border-r-[5px] border-[#DCE8F6] bg-blue-600 p-2.5">
            <MyIcon />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            {/* Social proof */}
            <div className="mx-auto flex w-fit items-center justify-center gap-2.5 rounded-full bg-[#E8F0F9] px-4 py-2 pl-2">
              <div className="-space-x-2 flex">
                <Image
                  src="/assets/waitlist-assets/first.jpg"
                  alt="User 1"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                />
                <Image
                  src="/assets/waitlist-assets/second.jpg"
                  alt="User 2"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                />
                <Image
                  src="/assets/waitlist-assets/third.jpg"
                  alt="User 3"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFFFE] text-xs text-gray-600 ring-2 ring-white">
                  +1k
                </div>
              </div>
              <span className="text-sm font-medium text-brand-blue md:text-base">
                Join 1k+ people on the waitlist
              </span>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[64px] lg:leading-[1.1]">
                Be among the first to try Clinsight
              </h1>
            </div>
          </div>

          {/* Description */}
          <div className="text-center">
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              Get early access to a simpler way to understand your lab results — with clear insights
              and optional doctor review.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-131.25 flex-col gap-4 rounded-[20px] border border-[#F0F0F0] bg-[#FAFAFA] p-2.5"
        >
          {/* First Name Input */}
          <div className="relative">
            <HugeiconsIcon
              icon={User02Icon}
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={() => setFocusedField('firstName')}
              onBlur={() => setFocusedField(null)}
              disabled={isLoading}
              className={`w-full rounded-xl border-2 bg-white py-4 pl-12 pr-4 text-base transition-all placeholder:text-gray-400 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400 ${
                focusedField === 'firstName'
                  ? 'border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            />
          </div>

          {/* Email Input */}
          <div>
            <div className="relative">
              <HugeiconsIcon
                icon={MailBlock01Icon}
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(''); // Clear error on type
                }}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
                className={`w-full rounded-xl border-2 bg-white py-4 pl-12 pr-4 text-base transition-all placeholder:text-gray-400 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400 ${
                  error
                    ? 'border-red-500'
                    : focusedField === 'email'
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              />
            </div>

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isButtonEnabled || isLoading}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-all ${
              isLoading
                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                : isButtonEnabled
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                  : 'cursor-not-allowed bg-blue-100 text-blue-300'
            }`}
          >
            {isLoading ? (
              <>
                <span>Loading...</span>
                <HugeiconsIcon icon={Loading03Icon} className="h-5 w-5 animate-spin" size={20} />
              </>
            ) : (
              <>
                <span>Get Notified</span>
                <HugeiconsIcon icon={SchoolBell02Icon} className="h-5 w-5" size={20} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => {
                setShowSuccess(false);
                setFirstName('');
                setEmail('');
              }}
              className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5" size={20} />
            </button>

            {/* Confetti decorations */}
            <div className="absolute left-8 top-6 text-2xl">🎉</div>
            <div className="absolute right-12 top-10 text-xl">⭐</div>
            <div className="absolute left-1/4 top-12 text-lg">✨</div>
            <div className="absolute right-1/4 top-8 text-sm">🎊</div>
            <div className="absolute bottom-20 left-10 text-lg">⭐</div>
            <div className="absolute bottom-24 right-8 text-sm">✨</div>

            {/* Success content */}
            <div className="flex flex-col items-center pt-4 text-center">
              {/* Green checkmark circle */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                {`${firstName} you're on the list.`}
              </h3>
              <p className="text-sm text-gray-600">
                We&apos;ll let you know when access is available.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
