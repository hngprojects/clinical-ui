import CredentialsVerificationForm from '@/components/verification/CredentialsVerification';
import VerfificationCompleteCard from '@/components/verification/VerfificationCompleteCard';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Verification Complete — Clinsight',
  'Your verification is complete! You can now access personalized lab insights and doctor consultations.',
);

export default function page() {
  return (
    <div>
      <VerfificationCompleteCard />
    </div>
  );
}
