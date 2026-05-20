import ProfessionalInformationForm from '@/components/verification/ProfessionalInformationForm';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Professional Information — Clinsight',
  'Provide your professional information to complete the verification process.',
);

export default function page() {
  return (
    <div>
      <ProfessionalInformationForm />
    </div>
  );
}
