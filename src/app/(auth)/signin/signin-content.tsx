'use client';

import Image from 'next/image';
import { SignInForm } from '@/components/auth/SigninForm';
import { useRouter } from 'next/navigation';
import { createAuthBackHandlers } from '@/lib/auth-navigation';
import { Button } from '@/components/ui/button';

export default function SigninContent() {
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
      <div className="fixed top-6 left-6 md:top-4 lg:top-10 md:left-12 z-20">
        <Button
          type="button"
          variant="ghost"
          onClick={handleBack}
          aria-label="Go back"
          className="relative h-10 w-35 md:h-12.5 md:w-45 p-0 hover:bg-transparent"
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

      {/* Signin Form Card */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-6">
        <SignInForm />
      </div>
    </div>
  );
}
