'use client';

import { useState, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// import { verifyOtpAction, resendOtpAction } from '@/actions/auth-actions';
// import { toast } from 'sonner';
import { triggerComingSoonModal } from '@/components/coming-soon';

export function VerifyOtpForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  // const [isVerifying, setIsVerifying] = useState(false);
  // const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  // const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

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
    // const otpString = otp.join('');
    // if (otpString.length !== 6) {
    //   toast.error('Please enter the full 6-digit OTP');
    //   return;
    // }

    // setIsVerifying(true);
    // try {
    //   const result = await verifyOtpAction(email, otpString);
    //   if (result.error) {
    //     toast.error(result.error);
    //   } else {
    //     toast.success('Email verified successfully!');
    //     router.push('/signin'); // Or dashboard if logged in
    //   }
    // } catch {
    //   toast.error('An unexpected error occurred');
    // } finally {
    //   setIsVerifying(false);
    // }

    triggerComingSoonModal({
      title: 'OTP verification is coming soon',
      description: email
        ? `We are still completing the OTP verification flow for ${email}.`
        : 'We are still completing the OTP verification flow.',
    });
  };

  const handleResend = async () => {
    // if (!email) {
    //   toast.error('Email not found. Please try signing up again.');
    //   return;
    // }
    // setIsResending(true);
    // try {
    //   const result = await resendOtpAction(email);
    //   if (result.error) {
    //     toast.error(result.error);
    //   } else {
    //     toast.success('OTP resent successfully! Please check your email.');
    //   }
    // } catch {
    //   toast.error('An unexpected error occurred');
    // } finally {
    //   setIsResending(false);
    // }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[661px] rounded-[32px] bg-white shadow-2xl flex flex-col items-center border border-[#E0E0E0] p-6 md:px-20 md:py-10 gap-6 md:gap-10"
    >
      <div className="text-center">
        <h1 className="text-xl md:text-[32px] font-bold text-[#1B1B1B] mb-2 whitespace-nowrap">
          Received an OTP?
        </h1>
        <p className="text-sm md:text-base text-[#5E5E5E]">Input it below</p>
      </div>

      <div className="flex gap-2 md:gap-4 justify-center px-4 w-full" onPaste={handlePaste}>
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
            className={cn(
              'w-10 h-12 md:w-16 md:h-20 text-center text-xl md:text-2xl font-bold rounded-xl border border-[#E0E0E0] bg-white outline-none transition-all',
              'focus:border-brand-blue',
              digit && 'border-brand-blue',
            )}
          />
        ))}
      </div>

      <div className="w-full space-y-4">
        <Button
          variant="brand"
          onClick={handleVerify}
          // disabled={isVerifying || isResending || otp.some((d) => !d)}
          // disabled={isResending}
          className="h-15 w-full rounded-2xl text-base font-bold shadow-lg text-white"
        >
          {/* {isVerifying ? 'Verifying...' : 'Begin verification'}
          {!isVerifying && <HugeiconsIcon icon={ArrowRight02Icon} size={20} className="ml-2" />} */}
          Begin verification
          <HugeiconsIcon icon={ArrowRight02Icon} size={20} className="ml-2" />
        </Button>

        <button
          type="button"
          onClick={handleResend}
          // disabled={isVerifying || isResending}
          className="h-15 w-full rounded-2xl border border-[#1565C0] text-[#1565C0] text-base font-bold transition-colors hover:bg-blue-50 disabled:opacity-50"
        >
          {/* {isResending ? 'Sending...' : 'Resend OTP'} */}
          Resend OTP
        </button>
      </div>
    </motion.div>
  );
}
