'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCountdown } from '@/hooks/useCountdown';
import { EmailForm } from '@/components/auth/forgot-password/EmailForm';
import { OtpForm } from '@/components/auth/forgot-password/OtpForm';
import { FailedView } from '@/components/auth/forgot-password/FailedView';

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
    if (!email) return;
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
      if (!res.ok) throw new Error(data.error || 'Token authorization rejected');

      router.push('/reset-password');
    } catch (err) {
      setStep('failed');
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
    // Fixed Viewport setup prevents accidental body bouncing or scrolling
    <main className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FFFFFE]">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/assets/forgot-password/BG.png"
          alt="Lab Background Frame"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
      </div>

      <header className="absolute top-0 left-0 z-10 flex items-center gap-3 pl-8 pt-8 md:pl-12 md:pt-12 select-none">
        <div className="relative size-8">
          <Image
            src="/assets/forgot-password/Subtract.svg"
            alt="Clinsights Icon"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-white text-3xl font-medium font-['Playfair_Display'] tracking-wide">
          Clinsights
        </span>
      </header>

      {/* Centerpiece Layout Content Well */}
      <div className="relative z-10 w-full flex items-center justify-center px-4">
        <div className="w-full max-w-[661px] bg-white rounded-[32px] shadow-[0px_24px_64px_rgba(0,0,0,0.15)] px-6 py-10 sm:px-16 flex flex-col items-center justify-between transition-all duration-300">
          {step === 'email' && (
            <EmailForm
              email={email}
              setEmail={setEmail}
              onSubmit={handleEmailSubmit}
              isLoading={isLoading}
              onBackToLogin={() => router.push('/login')}
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

          {/* Bottom Dynamic Space Blocks */}
          <div className="w-full flex flex-col items-center gap-4 mt-8">
            {/* Conditional Check: Hides the Lab Support line completely during the Verification Failed view */}
            {step !== 'failed' && (
              <footer className="w-full max-w-[521px] pt-6 border-t border-[#E1E2EA] flex items-center justify-center mx-auto animate-fadeIn">
                <p className="text-center text-[#424752] text-sm font-medium font-['Inter']">
                  Need immediate assistance? Contact{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/contact-us')}
                    className="text-[#1565C0] hover:text-[#0D47A1] font-semibold underline underline-offset-4 transition-colors"
                  >
                    Lab Support
                  </button>
                </p>
              </footer>
            )}

            {step === 'otp' && (
              <div className="w-full flex flex-row items-center justify-center gap-2 text-xs font-['Inter'] tracking-wider select-none animate-fadeIn">
                <div className="relative size-4 flex-shrink-0">
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
