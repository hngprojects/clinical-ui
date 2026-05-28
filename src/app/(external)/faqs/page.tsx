import FAQHeader from '@/components/faqs/FAQHeader';
import { MedicalProfessional } from '@/components/faqs/MedicalProfessional';
import { FAQ } from '@/components/landing-page/FAQ';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
};

export default function Page() {
  return (
    <div>
      <FAQHeader />

      <FAQ />
      <MedicalProfessional />
    </div>
  );
}
