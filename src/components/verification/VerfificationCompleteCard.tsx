'use client';

import VerificationSteps from '@/components/verification/VerificationSteps';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

const detailVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function VerfificationCompleteCard() {
  return (
    <motion.div
      className="max-w-165.25 mx-auto rounded-[32px] border py-10 px-20 space-y-22 bg-white"
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.1 }}
    >
      <VerificationSteps activeStep={2} />

      <div className="space-y-10">
        <div className="space-y-2 text-left">
          <h2 className="heading__medium text-left">Complete Your Verification Payment</h2>
          <motion.p
            className="body__medium text-secondary-3 text-left space-y-2"
            variants={detailVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={itemVariants} className="block">
              To verify your MDCN license, a total fee of ₦20,000 is required.{' '}
            </motion.span>
            <motion.span variants={itemVariants} className="block">
              You only pay ₦5,000 upfront. The remaining ₦15,000 is gradually covered through a ₦500
              deduction per completed case.
            </motion.span>
            <motion.span variants={itemVariants} className="block">
              This allows you to get started immediately without paying the full amount at once.
            </motion.span>
          </motion.p>
        </div>

        <div>
          <motion.button
            type="button"
            className="body_large btn__primary text-white bg-primary-blue w-full"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.6, ease: 'easeInOut' }}
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
      </div>
    </motion.div>
  );
}
