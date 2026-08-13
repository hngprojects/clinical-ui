'use client';

import { cn } from '@/lib/utils';

type DutyStatusToggleProps = {
  isOnDuty: boolean;
  onToggle: () => void;
};

export default function DutyStatusToggle({ isOnDuty, onToggle }: DutyStatusToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOnDuty}
      aria-label={isOnDuty ? 'On duty. Click to go off duty.' : 'Off duty. Click to go on duty.'}
      onClick={onToggle}
      className={cn(
        'flex h-9 shrink-0 items-center justify-between gap-2 rounded-full border px-2 transition-colors sm:w-35 md:w-41 sm:gap-4 sm:px-4 border-none outline-none',
        isOnDuty ? 'bg-[#DEF6E7]' : 'bg-[#EBEBEB]',
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'size-2 shrink-0 rounded-full',
            isOnDuty ? 'bg-[#147638]' : 'bg-text-secondary',
          )}
        />
        <span
          className={cn(
            'hidden whitespace-nowrap sm:inline max-md:text-[14px]',
            isOnDuty ? 'text-[#147638]' : 'text-text-secondary',
          )}
        >
          {isOnDuty ? 'On duty' : 'Off duty'}
        </span>
      </div>

      <span
        className={cn(
          'relative inline-flex h-4.5 w-8.5 sm:w-6.5 md:w-8.5 shrink-0 rounded-full transition-colors',
          isOnDuty ? 'bg-primary-blue' : 'bg-[#B0B0B0]',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 size-3.5 rounded-full bg-white transition-[left]',
            isOnDuty ? 'left-4.5' : 'left-0.5',
          )}
        />
      </span>
    </button>
  );
}
