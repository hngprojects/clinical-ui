'use client';

import { useState } from 'react';
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

    // TODO: Replace with real payment API call
    setTimeout(() => {
      setPageState('success');
      // setPageState('failed'); // Test failed state
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="px-8 py-5">
        <div className="flex items-center gap-2">
          <Image src="/clinsights-logo.png" alt="Clinsights" width={32} height={32} />
          <span className="text-lg font-semibold text-[#1565C0]">Clinsights</span>
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
