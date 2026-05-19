'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PaymentForm } from '@/components/payment/payment-form';
import { PaymentProcessing } from '@/components/payment/payment-processing';
import { PaymentFailed } from '@/components/payment/payment-failed';
import { PaymentSuccessful } from '@/components/payment/payment-successful';

type PageState = 'form' | 'processing' | 'success' | 'failed';

export default function PaymentPage() {
  const [pageState, setPageState] = useState<PageState>('form');

  const handleFormSubmit = () => {
    setPageState('processing');

    // Please, I will replace with real payment API call later
    setTimeout(() => {
      setPageState('success'); // Test success state
      // setPageState('failed'); // Test failed state
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="relative h-8 w-[120px] lg:h-10 lg:w-[140px]">
              <Image
                src="/assets/header-assets/clinsight-logo.svg"
                alt="Clinsight Logo"
                fill
                sizes="(max-width: 1024px) 120px, 140px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
        {pageState === 'form' && <PaymentForm amount={5000} onSubmit={handleFormSubmit} />}
        {pageState === 'processing' && <PaymentProcessing />}
        {pageState === 'failed' && (
          <PaymentFailed
            onRetry={() => setPageState('form')}
            onRetryLater={() => window.history.back()}
          />
        )}
        {pageState === 'success' && (
          <PaymentSuccessful
            email="customer@example.com"
            onContinue={() => (window.location.href = '/')}
            onDownloadReceipt={() => console.log('Download receipt')}
          />
        )}
      </div>
    </main>
  );
}
