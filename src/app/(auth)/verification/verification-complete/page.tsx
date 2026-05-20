import CredentialsVerificationForm from '@/components/verification/CredentialsVerification';
import VerfificationCompleteCard from '@/components/verification/VerfificationCompleteCard';

export const metadata = {
  title: 'Complete Verification',
};

export default function page() {
  return (
    <div>
      <VerfificationCompleteCard />
    </div>
  );
}
