'use client';

import { useState } from 'react';
import CurrentCase from './CurrentCase';
import AvailableCases from './AvailableCases';
import Summary from './Summary';
import { Overview, CaseRequest, Case } from '@/services/doctor';

export default function OverviewDashboard({ overview }: { overview: Overview | null }) {
  const [viewState, setViewState] = useState<'populated' | 'empty' | 'no-current'>('empty');

  const casesList = overview?.caseRequests ?? overview?.cases ?? [];
  const firstItem = casesList[0] as (CaseRequest & Case) | undefined;

  const currentCaseData =
    overview?.currentCase ??
    (firstItem
      ? {
          id: firstItem.id,
          patientName: firstItem.patientName,
          avatar: firstItem.avatar,
          timeAssigned: firstItem.timeSent || firstItem.timeAssigned || '10 mins ago',
          priority: firstItem.priority || 'Medium',
          condition: firstItem.condition,
          subtext: 'Continue to review the laboratory report.',
        }
      : null);

  const displayCurrentCase =
    viewState === 'empty' || viewState === 'no-current' ? null : currentCaseData;
  const displayAvailableCases = viewState === 'empty' ? [] : casesList;

  return (
    <div className="flex flex-col gap-6 pt-2.5 pb-10 px-2.5 max-w-7xl mx-auto w-full">
      {/* Summary Cards */}
      <Summary overview={overview} />

      {/* Current Case Section (Screenshot 1, 2, 3, 4, 5) */}
      <CurrentCase currentCase={displayCurrentCase} />

      {/* Available Cases Section (Screenshot 1, 2, 3, 4, 5) */}
      <AvailableCases cases={displayAvailableCases} badgeCount="10+" />
    </div>
  );
}
