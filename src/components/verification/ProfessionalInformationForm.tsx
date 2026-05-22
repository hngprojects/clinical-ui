'use client';

import Dropdown from '@/components/ui/Dropdown';
import InputFieldContainer from '@/components/ui/InputFieldContainer';
import { VerificationInputField } from '@/components/ui/InputFieldContainer';
import VerificationSteps from '@/components/verification/VerificationSteps';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

const SPECIALIZATIONS = ['General Practice', 'Orthopedics', 'Neurology'];

const fieldContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function ProfessionalInformationForm() {
  const [specialization, setSpecialization] = useState('');

  return (
    <div className="max-w-165.25 mx-auto rounded-[32px] border py-10 px-6 md:py-10 md:px-20 space-y-22 bg-white">
      <VerificationSteps activeStep={0} />

      <div className="space-y-10">
        <div className="space-y-2">
          <h2 className="heading__medium">Professional Information</h2>
          <p className="body__medium text-secondary-3">
            Tell us about your professional background - this helps us route relevant cases to you.
          </p>
        </div>

        <form autoComplete="on" className="space-y-10">
          <motion.div
            className="space-y-4"
            variants={fieldContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fieldVariants}>
              <InputFieldContainer label="Specialization *" htmlFor="specialization">
                <Dropdown
                  options={SPECIALIZATIONS}
                  placeholder="Select your specialization"
                  value={specialization}
                  onChange={setSpecialization}
                />
              </InputFieldContainer>
            </motion.div>

            <motion.div variants={fieldVariants}>
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
                  className="py-1 w-full focus:outline-none"
                />
              </VerificationInputField>
            </motion.div>

            <motion.div variants={fieldVariants}>
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
                  className="py-1 w-full focus:outline-none"
                />
              </VerificationInputField>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <InputFieldContainer label="Upload passport photograph" htmlFor="passportPhotograph">
                <div className="relative">
                  <input
                    type="file"
                    name="passportPhotograph"
                    id="passportPhotograph"
                    className="border absolute w-full h-full cursor-pointer opacity-0"
                  />
                  <motion.div
                    className="flex min-h-35 flex-col items-center justify-center rounded-[16px] border border-dashed border-[#69A7FF] px-6 py-4 text-center gap-2.5 cursor-pointer"
                    style={{ backgroundColor: '#ffffff' }}
                    whileHover={{ scale: 1.02, backgroundColor: '#F8FBFF' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2FF] text-primary">
                      <Image
                        src="/assets/verification-assets/upload-icon.svg"
                        alt="Upload Icon"
                        width={48}
                        height={48}
                      />
                    </div>
                    <p className="body__medium text-text-primary">Click to upload or drag & drop</p>
                    <p className="text-neutral-color body__small">
                      Front of your passport photograph PDF, PNG, JPG (max 10MB)
                    </p>
                  </motion.div>
                </div>
              </InputFieldContainer>
            </motion.div>
          </motion.div>

          <motion.button
            type="button"
            className="body_large btn__primary text-white bg-primary-blue w-full"
            whileHover={{ scale: 1.015, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
          >
            <span>Save and Continue</span>
            <ArrowRight className="size-6 text-white" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
