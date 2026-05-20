'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ResetPasswordForm } from '@/components/auth/reset-password/ResetPasswordForm';
import { SuccessView } from '@/components/auth/reset-password/SuccessView';

type ResetStep = 'form' | 'success';

export default function ResetPasswordPage() {
  const [step, setStep] = useState<ResetStep>('form');

  return (
    <main className="relative min-h-screen w-full flex flex-col overflow-y-auto bg-[#FFFFFE]">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/assets/forgot-password/BG.png"
          alt="Lab Background Frame"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      <header className="absolute top-10 left-8 md:left-20 z-10 flex items-center gap-2.5 select-none">
        <div className="relative size-8 md:size-10">
          <Image
            src="/assets/forgot-password/Subtract.svg"
            alt="Clinsights Icon"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-white text-2xl md:text-3xl font-medium font-['Playfair_Display'] tracking-tight leading-8">
          Clinsights
        </span>
      </header>

      <div className="relative z-10 w-full flex-1 flex items-center justify-center px-4 pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="w-full md:w-[661px] min-h-[720px] md:h-[800px] bg-white rounded-[32px] shadow-[0px_24px_64px_rgba(0,0,0,0.15)] px-6 py-10 md:px-[70px] md:py-[64px] flex flex-col justify-between transition-all duration-300">
          {step === 'form' ? (
            <ResetPasswordForm onSuccess={() => setStep('success')} />
          ) : (
            <SuccessView />
          )}
        </div>
      </div>
    </main>
  );
}
