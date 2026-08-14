'use client';

import { useState } from 'react';
import CurrentCase from './CurrentCase';
import AvailableCases from './AvailableCases';
import Summary from './Summary';
import VerificationBanner, { VerificationStatus } from './VerificationBanner';
import { Overview, CaseRequest, Case } from '@/services/doctor/service';

export default function OverviewDashboard({
  overview,
  isLoading = false,
  isError = false,
  onRetry,
}: {
  overview: Overview | null;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}) {
  const [viewState] = useState<'populated' | 'empty' | 'no-current'>('populated');

  const verificationStatus: VerificationStatus =
    (overview?.verificationStatus as VerificationStatus) ?? 'unsuccessful';
  const isDismissed = overview?.isVerificationDismissed ?? false;
  const showBanner = overview?.showVerificationBanner ?? !isDismissed;

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
      {/* Verification Status Banner */}
      {showBanner && (
        <VerificationBanner
          status={verificationStatus}
        />
      )}

      {/* Summary Cards */}
      <Summary
        overview={overview}
        isLoading={isLoading}
        isError={isError}
        onRetry={onRetry}
      />

      {/* Current Case Section */}
      <CurrentCase currentCase={displayCurrentCase} />

      {/* Available Cases Section */}
      <AvailableCases cases={displayAvailableCases} badgeCount="10+" />
    </div>
  );
}
