import Image from 'next/image';
import { SignInForm } from '@/components/auth/SigninForm';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata('Sign in — Clinsight', 'Sign in to your Clinsight account.');

export default function SignInPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
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
      <div className="absolute top-6 left-6 md:top-10 md:left-12 z-10">
        <div className="relative w-35 h-10 md:w-45 md:h-12.5">
          <Image
            src="/assets/signup-page-assets/auth-logo.svg"
            alt="Clinsights Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Signin Form Card */}
      <div className="relative z-10 w-full flex justify-center py-12">
        <SignInForm />
      </div>
    </div>
  );
}
