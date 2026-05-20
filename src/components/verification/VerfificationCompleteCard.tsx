import VerificationSteps from '@/components/verification/VerificationSteps';
import { ArrowRight } from 'lucide-react';
import React from 'react';

export default function VerfificationCompleteCard() {
  return (
    <div className="max-w-165.25 mx-auto rounded-[32px] border py-10 px-20 space-y-22 bg-white">
      <VerificationSteps activeStep={0} />

      <div className="space-y-10">
        <div className="space-y-2 text-left">
          <h2 className="heading__medium text-left">Complete Your Verification Payment</h2>
          <p className="body__medium text-secondary-3 text-left space-y-2">
            <span className="block">
              To verify your MDCN license, a total fee of ₦20,000 is required.{' '}
            </span>
            <span className="block">
              You only pay ₦5,000 upfront. The remaining ₦15,000 is gradually covered through a ₦500
              deduction per completed case.
            </span>

            <span>
              This allows you to get started immediately without paying the full amount at once.
            </span>
          </p>
        </div>

        <div>
          <button
            type="button"
            className="body_large btn__primary text-white bg-primary-blue w-full"
          >
            <span>Save and Continue</span>
            <ArrowRight className="size-6 text-white" />
          </button>

          <p className="body__medium text-neutral-color text-center mt-1 text-sm">
            Your uploaded documents are automatically saved to the system
          </p>
        </div>
      </div>
    </div>
  );
}
