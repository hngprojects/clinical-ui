import CredentialsVerificationForm from '@/components/verification/CredentialsVerification';

export const metadata = {
  title: 'Credentials Verification',
};

export default function page() {
  return (
    <div>
      <CredentialsVerificationForm />
    </div>
  );
}
