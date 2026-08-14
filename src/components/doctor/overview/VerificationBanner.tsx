'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { dismissVerificationBanner } from '@/services/doctor/service';

export type VerificationStatus = 'unsuccessful' | 'in_progress' | 'verified' | 'hidden';

export default function VerificationBanner({
  status: initialStatus = 'unsuccessful',
  onResubmit,
  onViewSubmission,
}: {
  status?: VerificationStatus;
  onResubmit?: () => void;
  onViewSubmission?: () => void;
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || initialStatus === 'hidden') {
    return null;
  }

  const handleDismiss = async () => {
    setDismissed(true);
    await dismissVerificationBanner();
  };

  if (initialStatus === 'unsuccessful') {
    return (
      <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[16px] p-4 md:p-5 shadow-2xs transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
              <Image
                src="/assets/dashboard/verification_unsuccessful.svg"
                width={24}
                height={24}
                alt="Verification Unsuccessful"
              />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#111827]">Verification unsuccessful</h4>
              <p className="text-sm text-[#4B5563] max-w-2xl mt-0.5 leading-relaxed">
                We couldn&apos;t verify your medical license, the uploaded document was unclear.
                Please re-upload a clear, valid copy to continue.
              </p>
            </div>
          </div>

          <div className="mt-1 md:mt-0 shrink-0 max-sm:w-max max-sm:ml-8">
            {onResubmit ? (
              <button
                type="button"
                onClick={onResubmit}
                className="w-full md:w-auto bg-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] text-white font-semibold text-sm px-5 py-2.5 rounded-[8px] transition-colors cursor-pointer text-center block"
              >
                Resubmit Documents
              </button>
            ) : (
              <Link
                href="/auth/verification/credentials-verification"
                className="w-full md:w-auto bg-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] text-white font-semibold text-sm px-5 py-2.5 rounded-[8px] transition-colors cursor-pointer text-center block"
              >
                Resubmit Documents
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (initialStatus === 'in_progress') {
    return (
      <div className="bg-[#F5F5F5] border border-[#BBBBBB] rounded-[16px] p-4 md:p-5 shadow-2xs transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5">
              <Image
                src="/assets/dashboard/verification_in_progress.svg"
                width={24}
                height={24}
                alt="Verification In Progress"
              />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#111827]">Verification in progress</h4>
              <p className="text-sm text-[#4B5563] max-w-2xl mt-0.5 leading-relaxed">
                We&apos;re reviewing your credentials. This usually takes 24–48 hours, you&apos;ll
                be able to start reviewing cases as soon as you&apos;re approved.
              </p>
            </div>
          </div>

          <div className="mt-1 md:mt-0 shrink-0 max-sm:w-max max-sm:ml-8">
            {onViewSubmission ? (
              <button
                type="button"
                onClick={onViewSubmission}
                className="w-full md:w-auto bg-primary-blue hover:bg-primary-blue/80 text-white font-semibold text-sm px-5 py-2.5 rounded-[8px] transition-colors cursor-pointer text-center block"
              >
                View Submission
              </button>
            ) : (
              <Link
                href="/auth/verification/credentials-verification"
                className="w-full md:w-auto bg-primary-blue hover:bg-primary-blue/80 text-white font-semibold text-sm px-5 py-2.5 rounded-[8px] transition-colors cursor-pointer text-center block"
              >
                View Submission
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (initialStatus === 'verified') {
    return (
      <div className="bg-[#E9FBF0] border border-[#CFEFDA] rounded-[16px] p-4 md:p-5 shadow-2xs transition-all">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5">
              <Image
                src="/assets/dashboard/verification_verified.svg"
                width={24}
                height={24}
                alt="Verification Verified"
              />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#111827]">
                You&apos;re officially verified!
              </h4>
              <p className="text-sm text-[#4B5563] max-w-2xl mt-0.5 leading-relaxed">
                Your credentials have been approved. You can now begin reviewing patients&apos;
                laboratory results.
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Dismiss banner"
            onClick={handleDismiss}
            className="text-[#10B981] hover:text-[#059669] p-1.5 rounded-lg hover:bg-[#D1FAE5]/60 transition-colors shrink-0 cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} color="currentColor" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
