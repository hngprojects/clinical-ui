import posthog from 'posthog-js';

declare global {
  interface Window {
    __clinsightPostHogInitialized?: boolean;
  }
}

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

function getOpaqueAnalyticsId(kind: 'lead' | 'user') {
  const storageKey = `clinsight_${kind}_analytics_id`;
  const existingId = window.localStorage.getItem(storageKey);
  if (existingId) return existingId;

  const id = `${kind}_${crypto.randomUUID()}`;
  window.localStorage.setItem(storageKey, id);
  return id;
}

export function initializePostHog() {
  if (!posthogKey || typeof window === 'undefined' || window.__clinsightPostHogInitialized) return;

  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: true,
    persistence: 'localStorage+cookie',
  });
  window.__clinsightPostHogInitialized = true;
}

export function identifyLead() {
  if (!posthogKey || typeof window === 'undefined') return;
  posthog.identify(getOpaqueAnalyticsId('lead'));
}

export function identifyUser(userId: string, properties?: Record<string, string>) {
  if (!posthogKey) return;
  posthog.identify(userId, properties);
}

export function captureLead(source: 'guide' | 'waitlist') {
  if (!posthogKey) return;
  posthog.capture('lead_captured', { source });
}

export function captureRegistration() {
  if (!posthogKey || typeof window === 'undefined') return;
  const userId = getOpaqueAnalyticsId('user');
  const previousId = posthog.get_distinct_id();
  posthog.identify(userId);
  if (previousId !== userId) posthog.alias(userId, previousId);
  posthog.capture('registration_completed');
}

export function captureGuestEvent(event: string, properties?: Record<string, string>) {
  if (!posthogKey) return;
  initializePostHog();
  posthog.capture(event, properties);
}
