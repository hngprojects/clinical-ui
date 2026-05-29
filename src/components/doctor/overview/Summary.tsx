'use client';

import { Overview } from '@/services/doctor/service';
import {
  ArrowUpRight03Icon,
  Task01Icon,
  StickyNote02Icon,
  TextCheckIcon,
  Money01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  iconColor,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: IconSvgElement;
  iconColor: string;
}) {
  return (
    <div className="rounded-[20px] p-5 bg-[#FFFFFE] border border-[#F0F0F0]">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center gap-1">
          <div className="flex gap-2">
            <HugeiconsIcon icon={icon ?? Task01Icon} size={24} color={iconColor ?? '#935F07'} />
            <span className="text-secondary-3">{title}</span>
          </div>
          {subtitle ? (
            <span className="text-sm px-2.5 py-0.75 bg-[#DEF6E7] text-[#147638] rounded-[6px] flex items-center gap-2.5">
              <HugeiconsIcon icon={ArrowUpRight03Icon} size={24} color="currentColor" />
              {subtitle}
            </span>
          ) : null}
        </div>
        <span className="text-2xl lg:text-[40px] font-semibold">{value}</span>
      </div>
    </div>
  );
}

export default function Summary({ overview }: { overview?: Overview | null }) {
  const overviews = overview ?? null;

  const newRequests = overviews?.summary.newRequests ?? '—';
  const activeCases = overviews?.summary.activeCases ?? '—';
  const completedCases = overviews?.summary.completedCases ?? '—';
  const earnings = overviews?.summary.earnings ?? null;

  const formattedEarnings =
    earnings !== null
      ? new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          maximumFractionDigits: 0,
        }).format(earnings as number)
      : '—';

  const cards = [
    {
      key: 'new',
      title: 'New Requests',
      value: newRequests,
      icon: Task01Icon,
      iconColor: '#935F07',
    },
    {
      key: 'active',
      title: 'Active Cases',
      value: activeCases,
      icon: StickyNote02Icon,
      iconColor: '#1565C0',
    },
    {
      key: 'completed',
      title: 'Completed Cases',
      value: completedCases,
      icon: TextCheckIcon,
      iconColor: '#147638',
    },
    {
      key: 'earnings',
      title: 'Earnings',
      value: formattedEarnings,
      subtitle: overviews ? `${overviews.summary.earningsChange}%` : undefined,
      icon: Money01Icon,
      iconColor: '#147638',
    },
  ];

  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(271px,1fr))]">
      {cards.map((c) => (
        <SummaryCard
          key={c.key}
          title={c.title}
          value={c.value}
          subtitle={c.subtitle}
          icon={c.icon}
          iconColor={c.iconColor}
        />
      ))}
    </div>
  );
}
