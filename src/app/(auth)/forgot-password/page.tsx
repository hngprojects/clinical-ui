'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCountdown } from '@/hooks/useCountdown';
import { EmailForm } from '@/components/auth/forgot-password/EmailForm';
import { OtpForm } from '@/components/auth/forgot-password/OtpForm';
import { FailedView } from '@/components/auth/forgot-password/FailedView';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Forgot Password — Clinsight',
  'Reset your Clinsight account password by entering your email address and verifying the OTP sent to you.',
);

type FlowStep = 'email' | 'otp' | 'failed';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<FlowStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { timeLeft, startTimer, resetTimer, formatTime } = useCountdown(45);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to dispatch reset token');

      startTimer();
      setStep('otp');
    } catch (err) {
      const error = err as Error;
      setErrorMessage(error.message || 'Network transport failure');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCodeString = otp.join('');
    if (otpCodeString.length < 6) return;
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp: otpCodeString }),
      });

      const data = await res.json();
      if (!res.ok) {
        const message = data.error || 'Token authorization rejected';
        if ([400, 401, 422].includes(res.status)) {
          setErrorMessage(message);
          setStep('failed');
          return;
        }
        throw new Error(message);
      }

      router.push('/reset-password');
    } catch (err) {
      const error = err as Error;
      setErrorMessage(error.message || 'Unable to verify code right now. Please try again.');
      setStep('otp');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtpCode = async () => {
    setOtp(new Array(6).fill(''));
    setErrorMessage('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Resend process failed');

      resetTimer();
      startTimer();
    } catch (err) {
      const error = err as Error;
      setErrorMessage(error.message || 'Failed to trigger token verification fallback');
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="w-full md:w-165.25 md:h-200 bg-white rounded-[32px] shadow-[0px_24px_64px_rgba(0,0,0,0.15)] px-6 py-10 md:px-17.5 md:pt-22.5 md:pb-16 flex flex-col items-center justify-between transition-all duration-300">
          <div className="w-full flex flex-col items-center flex-1 justify-start">
            {step === 'email' && (
              <EmailForm
                email={email}
                setEmail={setEmail}
                onSubmit={handleEmailSubmit}
                isLoading={isLoading}
                onBackToSignin={() => router.push('/signin')}
                errorMsg={errorMessage}
              />
            )}

            {step === 'otp' && (
              <OtpForm
                email={email}
                otp={otp}
                setOtp={setOtp}
                onSubmit={handleOtpSubmit}
                isLoading={isLoading}
                timeLeft={timeLeft}
                formatTime={formatTime}
                onResend={handleResendOtpCode}
                errorMsg={errorMessage}
              />
            )}

            {step === 'failed' && (
              <FailedView
                isLoading={isLoading}
                onRetry={() => {
                  setOtp(new Array(6).fill(''));
                  setErrorMessage('');
                  setStep('otp');
                  startTimer();
                }}
                onContactSupport={() => router.push('/contact-us')}
              />
            )}
          </div>
          <div className="w-full flex flex-col items-center mt-6">
            {step === 'email' && (
              <footer className="w-full pt-6 border-t border-zinc-200 flex items-center justify-center mx-auto animate-fadeIn">
                <p className="text-center text-gray-700 text-base font-medium font-['Inter'] leading-6">
                  Need immediate assistance? <br className="sm:hidden" />
                  Contact{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/contact-us')}
                    className="text-blue-700 hover:text-blue-900 font-medium transition-colors inline"
                  >
                    Lab Support
                  </button>
                </p>
              </footer>
            )}
            {step === 'otp' && (
              <div className="w-full flex flex-row items-center justify-center gap-2 text-xs font-['Inter'] tracking-wider select-none animate-fadeIn">
                <div className="relative size-4 shrink-0">
                  <Image
                    src="/assets/forgot-password/shield-icon.svg"
                    alt="Security Shield"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[#727783] font-medium">
                  Secure Critical Environment Context
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
