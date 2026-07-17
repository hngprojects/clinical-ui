'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { verifyOtpAction, resendOtpAction } from '@/actions/auth-actions';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function VerifyOtpForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds resend cooldown

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  // Timer Effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;

    setIsVerifying(true);
    setApiError(null);
    setResendSuccess(false);

    try {
      const result = await verifyOtpAction(email, otpString);
      if (result.error) {
        setApiError(result.error);
        toast.error(result.error);
      } else {
        toast.success('Email verified successfully!');
        router.push('/verification');
      }
    } catch {
      const errorMsg = 'An unexpected error occurred';
      setApiError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      const errorMsg = 'Email not found. Please try signing up again.';
      setApiError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setIsResending(true);
    setApiError(null);
    setResendSuccess(false);

    try {
      const result = await resendOtpAction(email);
      if (result.error) {
        setApiError(result.error);
        toast.error(result.error);
      } else {
        setResendSuccess(true);
        toast.success('OTP code resent successfully!');
        setTimeLeft(30); // Reset timer to 30 seconds
        setOtp(['', '', '', '', '', '']); // Clear digits
        inputRefs.current[0]?.focus(); // Refocus first input
      }
    } catch {
      const errorMsg = 'An unexpected error occurred while resending';
      setApiError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  // Turn borders red only if it's an actual incorrect/invalid code error from the server (not network timeouts or missing fields)
  const isCodeError =
    apiError && !/reach|server|network|timeout|gateway|connect|email/i.test(apiError);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[338px] flex flex-col items-center gap-5 md:gap-6 font-sans"
    >
      {/* Go Back Button */}
      <Button
        type="button"
        variant="ghost"
        onClick={() => router.back()}
        className="self-start flex items-center gap-1 text-[#5E5E5E] text-sm font-semibold hover:text-primary-blue hover:bg-transparent transition-colors cursor-pointer select-none -mb-3 p-0 h-auto"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
        <span>Go back</span>
      </Button>

      {/* Headings */}
      <div className="text-center select-none">
        <h1 className="text-2xl md:text-[32px] font-bold text-[#1B1B1B] mb-2 leading-tight">
          Verify Your Email
        </h1>
        <p className="text-sm md:text-base text-[#5E5E5E] font-normal max-w-[400px] mx-auto">
          Enter the 6 digit code we sent to{' '}
          <span className="font-semibold text-[#1B1B1B]">{email || 'your email'}</span>
        </p>
      </div>

      {/* Input Boxes and Alerts */}
      <div className="flex flex-col items-center w-full">
        <div className="flex gap-2.5 justify-center w-full" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              aria-label={`Digit ${index + 1} of 6`}
              className={cn(
                'w-12 h-12 text-center text-xl font-bold rounded-lg border border-[#E0E0E0] bg-transparent text-[#1B1B1B] outline-none transition-all',
                'focus:border-primary-blue focus:ring-1 focus:ring-primary-blue',
                digit && 'border-primary-blue',
                isCodeError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              )}
            />
          ))}
        </div>

        {/* Inline Feedback Alerts */}
        {apiError && (
          <div className="text-red-500 text-[11px] md:text-xs font-medium text-left w-full mt-2.5">
            {apiError}
          </div>
        )}

        {resendSuccess && (
          <div className="text-green-600 text-[11px] md:text-xs font-medium text-left w-full mt-2.5">
            OTP code resent successfully!
          </div>
        )}
      </div>

      {/* Verify Button & Resend Link */}
      <div className="w-full flex flex-col items-center gap-4">
        <Button
          type="button"
          onClick={handleVerify}
          disabled={!isOtpComplete || isVerifying || isResending}
          className={cn(
            'h-14 w-full rounded-2xl text-base font-bold transition-colors select-none flex items-center justify-center gap-2 border-transparent',
            isOtpComplete && !isVerifying && !isResending
              ? 'bg-primary-blue text-white hover:bg-primary-blue/90 cursor-pointer'
              : 'bg-[#F5F5F5] text-[#767676] cursor-not-allowed',
          )}
        >
          {isVerifying ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-[#767676]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>verifying email...</span>
            </>
          ) : (
            'Verify Email'
          )}
        </Button>

        <div className="text-sm md:text-base text-[#5E5E5E] mt-2 select-none text-center">
          {timeLeft > 0 ? (
            <p>
              Code expires in{' '}
              <span className="font-semibold text-[#1B1B1B]">
                00:{timeLeft.toString().padStart(2, '0')}
              </span>
            </p>
          ) : (
            <p>
              <span>{"Didn't receive the code? "}</span>
              <Button
                type="button"
                variant="link"
                onClick={handleResend}
                disabled={isVerifying || isResending}
                className="text-primary-blue font-bold hover:underline bg-transparent border-none cursor-pointer disabled:opacity-50 ml-1 p-0 h-auto inline"
              >
                {isResending ? 'Resending...' : 'Resend Code'}
              </Button>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
