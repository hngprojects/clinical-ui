declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

export function trackLead() {
  window.fbq?.('track', 'Lead');
}

export function trackRegistration() {
  window.fbq?.('track', 'CompleteRegistration');
}
