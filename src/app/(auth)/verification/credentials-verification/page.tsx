import CredentialsVerificationForm from '@/components/verification/CredentialsVerification';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Credentials Verification — Clinsight',
  'Verify your professional credentials to complete the verification process.',
  '/verification/credentials-verification',
);

export default function page() {
  return (
    <div>
      <CredentialsVerificationForm />
    </div>
  );
}
