import type { Metadata } from 'next';
import PrivacyPolicyContent from './privacy-policy-content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read how Clinsight collects, uses, and protects information for lab insights and doctor consultations.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
