'use client';

import InputFieldContainer, { VerificationInputField } from '@/components/ui/InputFieldContainer';
import VerificationSteps from '@/components/verification/VerificationSteps';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import Image from 'next/image';
import React from 'react';

const fieldContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function CredentialsVerificationForm() {
  return (
    <div className="max-w-165.25 mx-auto rounded-[32px] border py-10 px-6 md:py-10 md:px-20  space-y-22 bg-white">
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
          <motion.div
            className="space-y-4"
            variants={fieldContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fieldVariants}>
              <VerificationInputField label="MDCN licence number" htmlFor="licenseNumber">
                <Image
                  src="/assets/verification-assets/license.svg"
                  alt="Licence icon"
                  height={20}
                  width={20}
                />
                <input
                  id="licenseNumber"
                  type="text"
                  placeholder="Enter License number"
                  className="py-1 w-full focus:outline-none"
                />
              </VerificationInputField>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <InputFieldContainer label="National identity number (NIN)" htmlFor="nin">
                <input
                  id="nin"
                  type="text"
                  placeholder="Enter your 11-digin NIN"
                  className="py-3 w-full input__field"
                />
              </InputFieldContainer>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <InputFieldContainer label="Upload medical license" htmlFor="medicalLicense">
                <div className="relative">
                  <input
                    type="file"
                    name="medicalLicense"
                    id="medicalLicense"
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
                      Front of your MDCN license PDF, PNG, JPG (max 10MB)
                    </p>
                  </motion.div>
                </div>
              </InputFieldContainer>
            </motion.div>
          </motion.div>

          <div>
            <motion.button
              type="button"
              className="body_large btn__primary text-white bg-primary-blue w-full"
              whileHover={{ scale: 1.015, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
            >
              <span>Save and Continue</span>
              <ArrowRight className="size-6 text-white" />
            </motion.button>

            <p className="body__medium text-neutral-color text-center mt-1 text-sm">
              Your uploaded documents are automatically saved to the system
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
