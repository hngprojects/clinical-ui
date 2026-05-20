'use client';

import InputFieldContainer, { VerificationInputField } from '@/components/ui/InputFieldContainer';
import VerificationSteps from '@/components/verification/VerificationSteps';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import React from 'react';

export default function CredentialsVerificationForm() {
  const [specialization, setSpecialization] = useState('');
  const [workplace, setWorkplace] = useState('');

  return (
    <div className="max-w-165.25 mx-auto rounded-[32px] border py-10 px-20 space-y-22 bg-white">
      <VerificationSteps activeStep={1} />

      <div className="space-y-10">
        <div className="space-y-2">
          <h2 className="heading__medium">Verify your credentials</h2>
          <p className="body__medium text-secondary-3">
            This helps us ensure only qualified professionals join the plateform. Documents are
            encrypted and reviewed within 24 hour or less.
          </p>
        </div>

        <form autoComplete="on" className="space-y-10">
          <div className="space-y-4">
            <VerificationInputField label="MDCN licence number" htmlFor="licenseNumber">
              <Image
                src="/assets/verification-assets/license.svg"
                alt="Licence icon"
                height={20}
                width={20}
              />
              <input
                id="licenseNumber"
                type="number"
                placeholder="Enter License number"
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                className="py-1 w-full focus:outline-none"
              />
            </VerificationInputField>

            <InputFieldContainer label="National identity number (NIN)" htmlFor="nin">
              <input
                id="nin"
                type="text"
                placeholder="Enter your 11-digin NIN"
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                className="py-3 w-full  input__field"
              />
            </InputFieldContainer>

            <InputFieldContainer label="Upload medical license" htmlFor="medicalLicense">
              <div className="relative">
                <input
                  type="file"
                  name="medicalLicense"
                  id="medicalLicense"
                  className="border  absolute w-full h-full cursor-pointer opacity-0"
                />
                <div className="flex min-h-35 flex-col items-center justify-center rounded-[16px] border border-dashed border-[#69A7FF] bg-white px-6 py-4 text-center transition-colors hover:bg-[#F8FBFF] gap-2.5  cursor-pointer">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2FF] text-primary">
                    <Image
                      src="/assets/verification-assets/upload-icon.svg"
                      alt="Upload Icon"
                      width={48}
                      height={48}
                    />
                  </div>

                  <p className="body__medium text-text-primary">Click to upload or drag & drop</p>
                  <p className=" text-neutral-color body__small">
                    Front of your MDCN license PDF, PNG, JPG (max 10MB)
                  </p>
                </div>
              </div>
            </InputFieldContainer>
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
        </form>
      </div>
    </div>
  );
}
