'use client';

import { Overview } from '@/services/doctor';
import {
  ArrowUpRight03Icon,
  Folder03Icon,
  Money01Icon,
  Task01Icon,
  TextCheckIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import { cn } from '@/lib/utils';

const MAX_CASE_SLOTS = 5;

function SummaryCard({
  title,
  value,
  footer,
  icon,
  iconBgClass,
  iconColor,
  badge,
  className,
}: {
  title: string;
  value: React.ReactNode;
  footer?: string;
  icon: IconSvgElement;
  iconBgClass: string;
  iconColor: string;
  badge?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl border border-[#F0F0F0] bg-[#FFFFFE] p-4 lg:p-5', className)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <span className="text-sm text-secondary-3">{title}</span>
          <div
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-lg',
              iconBgClass,
            )}
          >
            <HugeiconsIcon icon={icon} size={20} color={iconColor} />
          </div>
        </div>

        <div className="text-[28px] font-semibold leading-none text-text-primary lg:text-[32px]">
          {value}
        </div>

        {(footer || badge) && (
          <div className="flex items-center justify-between gap-2">
            {footer ? <span className="text-xs text-text-disabled">{footer}</span> : <span />}
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Summary({ overview }: { overview: Overview | null }) {
  const overviews = overview ?? null;

  const pendingReviews = overviews?.summary.newRequests ?? '—';
  const acceptedCases = overviews?.summary.activeCases ?? '—';
  const completedCases = overviews?.summary.completedCases ?? '—';
  const earnings = overviews?.summary.earnings ?? null;
  const earningsChange = overviews?.summary.earningsChange;

  const formattedEarnings =
    earnings !== null
      ? new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          maximumFractionDigits: 0,
        }).format(earnings)
      : '—';

  const earningsBadge =
    earningsChange !== undefined ? (
      <span className="inline-flex items-center gap-1 rounded-md bg-[#DEF6E7] px-2 py-0.5 text-xs font-medium text-[#147638]">
        <HugeiconsIcon icon={ArrowUpRight03Icon} size={12} color="currentColor" />
        {earningsChange}%
      </span>
    ) : null;

  const slotsUsed = typeof acceptedCases === 'number' ? acceptedCases : 0;

  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Pending Reviews"
        value={pendingReviews}
        footer="Awaiting your review"
        icon={Task01Icon}
        iconBgClass="bg-[#FFF4D6]"
        iconColor="#B45309"
      />

      <SummaryCard
        title="Accepted Cases"
        value={
          typeof acceptedCases === 'number' ? (
            <>
              {acceptedCases}
              <span className="text-lg font-normal text-text-disabled"> /{MAX_CASE_SLOTS}</span>
            </>
          ) : (
            acceptedCases
          )
        }
        footer={`${slotsUsed} of ${MAX_CASE_SLOTS} slots used`}
        icon={Folder03Icon}
        iconBgClass="bg-primary-subtle"
        iconColor="#1565C0"
      />

      <SummaryCard
        title="Completed Cases"
        value={completedCases}
        footer="Reviewed today"
        icon={TextCheckIcon}
        iconBgClass="bg-[#DEF6E7]"
        iconColor="#147638"
      />

      <SummaryCard
        title="Earnings"
        value={formattedEarnings}
        footer="This shift"
        badge={earningsBadge}
        icon={Money01Icon}
        iconBgClass="bg-[#F3E8FF]"
        iconColor="#9333EA"
      />
    </div>
  );
}
