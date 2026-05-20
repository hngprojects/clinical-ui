'use client';

import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

type StepItem = {
  label: string;
  title: string;
};

type VerificationStepsProps = {
  activeStep?: number;
  steps?: StepItem[];
};

const defaultSteps: StepItem[] = [
  { label: 'Step 1', title: 'Information' },
  { label: 'Step 2', title: 'Verification' },
  { label: 'Step 3', title: 'Payment' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function VerificationSteps({
  activeStep = 0,
  steps = defaultSteps,
}: VerificationStepsProps) {
  return (
    <div className="w-full">
      <motion.div
        className="flex items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          const isLast = index === steps.length - 1;

          const circleColor = isCompleted
            ? 'bg-success-green'
            : isActive
              ? 'bg-primary-blue'
              : 'bg-neutral-400';

          const labelColor = isCompleted
            ? 'text-success-green'
            : isActive
              ? 'text-primary-blue'
              : 'text-text-disabled';

          return (
            <motion.div
              key={step.label}
              variants={stepVariants}
              className={`flex min-w-0 flex-col items-start gap-5 ${!isLast && 'flex-1'}`}
            >
              <div className="flex items-center w-full">
                <div className="flex items-center gap-2 shrink-0">
                  <motion.div
                    className={`h-4 w-4 rounded-full flex items-center justify-center ${circleColor}`}
                    animate={isCompleted ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted && <Check className="h-4 w-4 text-white" />}
                  </motion.div>

                  <span className={`body__large font-medium ${labelColor}`}>{step.label}</span>
                </div>

                {!isLast && (
                  <div className="relative flex-1 mx-2">
                    <div className="border-t-2 border-dashed border-neutral-300 w-full" />
                    <motion.div
                      className="absolute top-0 left-0 w-full border-t-2 border-dashed border-success-green"
                      initial={{ width: '0%' }}
                      animate={{ width: isCompleted ? '100%' : '0%' }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                  </div>
                )}
              </div>

              <p className="body__medium text-text-secondary text-left">{step.title}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
