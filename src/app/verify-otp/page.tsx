import Image from 'next/image';
import { VerifyOtpForm } from '@/components/auth/VerifyOtpForm';

export default function VerifyOtpPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-white">
      {/* Logo - Top Left */}
      <div className="absolute top-6 left-6 md:top-10 md:left-12 z-10">
        <div className="relative w-[140px] h-[40px] md:w-[180px] md:h-[50px]">
          <Image
            src="/assets/otp-page-assets/footer-logo.svg"
            alt="Clinsights Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* OTP Verification Form */}
      <div className="relative z-10 w-full flex justify-center py-12">
        <VerifyOtpForm />
      </div>
    </div>
  );
}
