'use client';

import VerificationLayoutAnimation from '@/components/verification/VerificationLayoutAnimation';
import VerificationNavbar from '@/components/verification/VerificationNavbar';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { VerificationProvider } from '@/components/verification/VerificationContext';

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isCompletePage = pathname === '/verification/verification-complete';

  if (isCompletePage) {
    return <VerificationProvider>{children}</VerificationProvider>;
  }

  return (
    <VerificationProvider>
      <div className="h-screen w-full flex overflow-hidden bg-white">
        {/* Left panel - Image (Desktop only, lg and up) */}
        <div className="hidden lg:block lg:w-1/2 h-screen relative select-none flex-shrink-0 bg-[#18191B]">
          <Image
            src="/assets/verification-assets/lab.png"
            alt="Clinsight Lab"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Logo overlay on image */}
          <div className="absolute top-10 left-10">
            <Image
              src="/assets/header-assets/clinsight-logo.svg"
              alt="Clinsight Logo"
              width={140}
              height={36}
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
        </div>

        {/* Right panel - Form & Navbar */}
        <div className="w-full lg:w-1/2 h-screen overflow-y-auto bg-white flex flex-col px-6 sm:px-12 lg:px-10 xl:px-16">
          {/* Navbar */}
          <div className="w-full py-1.5 flex-shrink-0">
            <VerificationNavbar />
          </div>

          {/* Form Container */}
          <div className="flex-1 pb-2 flex flex-col justify-center">
            <div className="w-full max-w-[519px] mx-auto my-auto py-1">
              <VerificationLayoutAnimation>{children}</VerificationLayoutAnimation>
            </div>
          </div>
        </div>
      </div>
    </VerificationProvider>
  );
}
