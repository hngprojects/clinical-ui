'use client';

import React from 'react';
import Image from 'next/image';

interface EmailFormProps {
  email: string;
  setEmail: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onBackToSignin: () => void;
  errorMsg: string;
}

export function EmailForm({
  email,
  setEmail,
  onSubmit,
  isLoading,
  onBackToSignin,
  errorMsg,
}: EmailFormProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center flex-1 max-w-[521px] mx-auto animate-fadeIn">
      <div className="relative size-16 mb-[71px] flex items-center justify-center bg-[#D6E3FF] rounded-full">
        <Image
          src="/assets/forgot-password/icon-padlock.svg"
          alt="Lock Verification"
          width={24}
          height={28}
          className="object-contain"
        />
      </div>

      <h1 className="text-center text-[#191C21] text-3xl sm:text-4xl font-bold font-['Inter'] leading-[48px] sm:leading-[52px] tracking-tight mb-3">
        Forgot Password?
      </h1>
      <p className="text-center text-[#424752] text-base font-medium font-['Inter'] leading-6 mb-8 max-w-[480px]">
        Enter your registered email address and we&apos;ll send you a secure link to reset your
        password.
      </p>

      <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <label
            htmlFor="email"
            className="text-[#191C21] text-base font-medium font-['Inter'] leading-7"
          >
            Email address
          </label>
          <div className="w-full h-14 px-4 py-2.5 rounded-lg border border-[#BDC3C3] bg-white flex items-center gap-3 focus-within:border-[#1565C0] focus-within:ring-2 focus-within:ring-[#1565C0]/10 transition-all duration-200">
            <div className="size-5 relative shrink-0">
              <Image
                src="/assets/forgot-password/ai-mail-02.svg"
                alt="Mail Icon"
                fill
                className="object-contain"
              />
            </div>
            <input
              id="email"
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chioma@gmail.com"
              className="flex-1 h-full bg-transparent text-[#191C21] placeholder-[#2D2F2F] placeholder:opacity-40 text-sm sm:text-base font-normal font-['Inter'] outline-none border-none p-0 focus:ring-0 disabled:opacity-50"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 text-red-600 text-sm font-medium pt-1 animate-slideUp">
              <div className="relative size-4 shrink-0">
                <Image
                  src="/assets/forgot-password/alert-circle.svg"
                  alt="Error Alert"
                  fill
                  className="object-contain"
                />
              </div>
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col gap-5 mt-2">
          <button
            type="submit"
            // disabled={isLoading || email}
            disabled={isLoading}
            className="w-full h-14 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-medium text-base font-['Inter'] leading-6 rounded-xl transition-all duration-200 shadow-[0px_4px_12px_rgba(21,101,192,0.2)] flex items-center justify-center gap-2"
          >
            {isLoading ? 'Sending Request...' : 'Send Reset Code'}
          </button>

          <button
            type="button"
            onClick={onBackToSignin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2 text-[#006B5F] hover:text-[#004D44] text-sm sm:text-base font-medium font-['Inter'] transition-colors duration-150 group"
          >
            <div className="relative size-5 transition-transform duration-200 group-hover:-translate-x-0.5">
              <Image
                src="/assets/forgot-password/arrow-icon.svg"
                alt="Back Arrow"
                fill
                className="object-contain"
              />
            </div>
            <span>Back to Sign in</span>
          </button>
        </div>
      </form>
    </div>
  );
}
