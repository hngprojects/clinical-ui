'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import { PaymentForm } from '@/components/payment/payment-form';
import { PaymentProcessing } from '@/components/payment/payment-processing';
import { PaymentFailed } from '@/components/payment/payment-failed';
import { PaymentSuccessful } from '@/components/payment/payment-successful';

type PageState = 'form' | 'processing' | 'success' | 'failed';

export default function PaymentPage() {
  const [pageState, setPageState] = useState<PageState>('form');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user?.email) setUserEmail(user.email);
      })
      .catch(() => {
        // silently fail - fallback email will be used
      });
  }, []);

  const handleFormSubmit = () => {
    setPageState('processing');

    // TODO: Replace with real payment API call
    // Expected: POST /api/v1/payments or similar
    // On success → setPageState('success')
    // On failure → setPageState('failed')
    setTimeout(() => {
      setPageState('success');
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
            email={userEmail || 'customer@example.com'}
            onContinue={() => (window.location.href = '/')}
            onDownloadReceipt={() => {
              // TODO: implement receipt download
            }}
          />
        )}
      </div>
    </main>
  );
}
