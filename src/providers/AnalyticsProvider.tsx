'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics/pixel';
import { initializePostHog } from '@/lib/analytics/posthog';

export function AnalyticsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const hasTrackedInitialMetaPageView = useRef(false);

  useEffect(() => {
    initializePostHog();
  }, []);

  useEffect(() => {
    if (!hasTrackedInitialMetaPageView.current) {
      hasTrackedInitialMetaPageView.current = true;
      return;
    }

    trackPageView();
  }, [pathname]);

  return children;
}
