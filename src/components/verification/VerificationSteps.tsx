import { Check } from 'lucide-react';
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

export default function VerificationSteps({
  activeStep = 0,
  steps = defaultSteps,
}: VerificationStepsProps) {
  return (
    <div className="w-full">
      <div className="flex items-start">
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
            <div
              key={step.label}
              className={`flex min-w-0 flex-col items-start gap-5 ${!isLast && 'flex-1'}`}
            >
              <div className="flex items-center w-full">
                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className={`h-4 w-4 rounded-full flex items-center justify-center ${circleColor}`}
                  >
                    {isCompleted && <Check className="h-4 w-4 text-white" />}
                  </div>

                  <span className={`body__large font-medium ${labelColor}`}>{step.label}</span>
                </div>

                {!isLast && (
                  <div
                    className={`flex-1 border-t-2 border-dashed mx-2 ${
                      isCompleted ? 'border-success-green' : 'border-neutral-300'
                    }`}
                  />
                )}
              </div>

              <p className="body__medium text-text-secondary text-left">{step.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
