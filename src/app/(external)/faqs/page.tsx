import FAQHeader from '@/components/faqs/FAQHeader';
import { MedicalProfessional } from '@/components/faqs/MedicalProfessional';
import { FAQ } from '@/components/landing-page/FAQ';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
};

export default function Page() {
  return (
    <div className="space-y-8 pb-20 md:space-y-18">
      <FAQHeader />

      <FAQ />
      <MedicalProfessional />
    </div>
  );
}
