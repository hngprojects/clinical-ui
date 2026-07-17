'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { HourglassIcon } from '@hugeicons/core-free-icons';

export default function VerificationCompletePage() {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    // Format date inside an asynchronous timeout to prevent hydration mismatch and avoid synchronous setState warnings
    const timer = setTimeout(() => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setFormattedDate(`${dateStr} at ${timeStr}`);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-[#F9FAFB] relative font-sans overflow-hidden">
      {/* Top Header Logo */}
      <header className="w-full px-6 md:px-12 pt-4 flex-shrink-0 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="relative w-[140px] h-[36px]">
            <Image
              src="/assets/header-assets/clinsight-logo.svg"
              alt="Clinsight Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </header>

      {/* Main Content Card Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="w-full max-w-[600px] bg-white border border-[#EBEBEB] rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col items-center">
          {/* Blue Hourglass Icon with flip animation (no bg or border) */}
          <div className="mb-3 flex items-center justify-center">
            <div className="animate-hourglass flex items-center justify-center">
              <HugeiconsIcon icon={HourglassIcon} size={44} className="text-primary-blue" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-[28px] font-bold text-center text-[#1b1b1b] leading-[130%] tracking-tight">
            Your application is under review
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-[#5e5e5e] text-center leading-[150%] mt-2 max-w-[480px]">
            We have received your application, and our team is reviewing your documents. You&apos;ll
            receive an email with an update once the review is complete or if we need any additional
            information.
          </p>

          {/* Details Table */}
          <div className="w-full flex flex-col gap-3 border-t border-slate-100 pt-4 mt-4">
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="text-[#5e5e5e] font-medium">Reference ID</span>
              <span className="text-[#1b1b1b] font-semibold font-mono text-[13px] md:text-sm text-right">
                CLN-DRV-2026-000245
              </span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="text-[#5e5e5e] font-medium">Submitted On</span>
              <span className="text-[#1b1b1b] font-semibold text-[13px] md:text-sm text-right">
                {formattedDate || 'Loading...'}
              </span>
            </div>
            <div className="flex justify-between items-start text-sm md:text-base">
              <span className="text-[#5e5e5e] font-medium shrink-0">What happens next?</span>
              <div className="text-[#1b1b1b] font-semibold text-left text-[13px] md:text-sm leading-normal flex flex-col items-start">
                <span>We will review your application</span>
                <span>within 2 weeks.</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href="/user"
            className="w-full mt-5 py-3.5 bg-primary-blue hover:bg-[#104ead] text-white font-semibold text-center rounded-xl transition-all duration-200 cursor-pointer shadow-sm shadow-primary-blue/10 flex items-center justify-center text-sm md:text-base"
          >
            Continue to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
