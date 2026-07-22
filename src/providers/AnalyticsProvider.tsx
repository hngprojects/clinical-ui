'use client';

import { useEffect } from 'react';
import { initializePostHog, restoreIdentityFromUrl } from '@/lib/analytics/posthog';

export function AnalyticsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    initializePostHog();
    restoreIdentityFromUrl();
  }, []);

  return children;
}
