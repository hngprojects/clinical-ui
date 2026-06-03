'use client';

import Image from 'next/image';
import { SignupForm } from '@/components/auth/SignupForm';
import { useRouter } from 'next/navigation';
import { createAuthBackHandlers } from '@/lib/auth-navigation';
import { Button } from '@/components/ui/button';

export default function SignupContent() {
  const router = useRouter();
  const { handleBack } = createAuthBackHandlers(router);
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/signup-page-assets/BG.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay to match design contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Logo - Top Left */}
      <div className="fixed top-4 left-6 md:top-6 md:left-12 z-20">
        <Button
          type="button"
          variant="ghost"
          onClick={handleBack}
          aria-label="Go back"
          className="relative h-8 w-28 md:h-10 md:w-36 p-0 hover:bg-transparent"
        >
          <Image
            src="/assets/signup-page-assets/auth-logo.svg"
            alt="Clinsights Logo"
            fill
            className="object-contain"
            priority
          />
        </Button>
      </div>

      {/* Signup Form Card */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-2 md:p-4">
        <SignupForm />
      </div>
    </div>
  );
}
