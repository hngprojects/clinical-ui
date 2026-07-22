import posthog from 'posthog-js';

declare global {
  interface Window {
    __clinsightPostHogInitialized?: boolean;
  }
}

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

export function initializePostHog() {
  if (!posthogKey || typeof window === 'undefined' || window.__clinsightPostHogInitialized) return;

  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: true,
    persistence: 'localStorage+cookie',
  });
  window.__clinsightPostHogInitialized = true;
}

export function identifyLead(email: string, properties?: Record<string, string>) {
  if (!posthogKey) return;
  posthog.identify(email, { email, ...properties });
}

export function identifyUser(userId: string, properties?: Record<string, string>) {
  if (!posthogKey) return;
  posthog.identify(userId, properties);
}

export function captureLead(source: 'guide' | 'waitlist', email: string) {
  if (!posthogKey) return;
  posthog.capture('lead_captured', { source, email });
}

export function captureRegistration(email: string) {
  if (!posthogKey) return;
  posthog.identify(email, { email });
  posthog.alias(email);
  posthog.capture('registration_completed');
}

export function captureGuestEvent(event: string, properties?: Record<string, string>) {
  if (!posthogKey) return;
  initializePostHog();
  posthog.capture(event, properties);
}

export function restoreIdentityFromUrl() {
  if (!posthogKey || typeof window === 'undefined') return;
  const distinctId = new URLSearchParams(window.location.search).get('distinct_id');
  if (distinctId) posthog.identify(distinctId);
}
