'use client';

import Dropdown from '@/components/ui/Dropdown';
import InputFieldContainer from '@/components/ui/InputFieldContainer';
import { VerificationInputField } from '@/components/ui/InputFieldContainer';
import VerificationSteps from '@/components/verification/VerificationSteps';
import { ArrowRight } from 'lucide-react';

import Image from 'next/image';
import { useState } from 'react';

const SPECIALIZATIONS = ['General Practice', 'Orthopedics', 'Neurology'];

export default function ProfessionalInformationForm() {
  const [specialization, setSpecialization] = useState('');
  const [workplace, setWorkplace] = useState('');

  return (
    <div className="max-w-165.25 mx-auto rounded-[32px] border py-10 px-20 space-y-22 bg-white">
      <VerificationSteps activeStep={0} />

      <div className="space-y-10">
        <div className="space-y-2">
          <h2 className="heading__medium">Professional Information</h2>
          <p className="body__medium text-secondary-3">
            Tell us about your professional background - this helps us route relevant cases to you.
          </p>
        </div>

        <form autoComplete="on" className="space-y-10">
          <div className="space-y-4">
            <InputFieldContainer label="Specialization *" htmlFor="specialization">
              <Dropdown
                options={SPECIALIZATIONS}
                placeholder="Select your specialization"
                value={specialization}
                onChange={setSpecialization}
              />
            </InputFieldContainer>

            <VerificationInputField label="Years of Experience *" htmlFor="yoe">
              <Image
                src="/assets/verification-assets/yoe-icon.svg"
                alt="years of experience icon"
                height={20}
                width={20}
              />
              <input
                id="yoe"
                type="text"
                placeholder="e.g: 3"
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                className="py-1 w-full focus:outline-none"
              />
            </VerificationInputField>

            <VerificationInputField
              label="Current hospital / practice (optional)"
              htmlFor="currentHospital"
            >
              <Image
                src="/assets/verification-assets/current-hospital-icon.svg"
                alt="current hospital icon"
                height={20}
                width={20}
              />
              <input
                id="currentHospital"
                type="text"
                placeholder="e.g: City hospital"
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                className="py-1 w-full focus:outline-none"
              />
            </VerificationInputField>

            <InputFieldContainer label="Upload passport photograph" htmlFor="passportPhotograph">
              <div className="relative">
                <input
                  type="file"
                  name="passportPhotograph"
                  id="passportPhotograph"
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
                    Front of your passport photograph PDF, PNG, JPG (max 10MB)
                  </p>
                </div>
              </div>
            </InputFieldContainer>
          </div>

          <button
            type="button"
            className="body_large btn__primary text-white bg-primary-blue w-full"
          >
            <span>Save and Continue</span>
            <ArrowRight className="size-6 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
