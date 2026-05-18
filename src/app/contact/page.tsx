import ContactDetails from '@/components/contact/ContactDetails';
import ContactForm from '@/components/contact/ContactForm';
import ContactPageHeader from '@/components/contact/ContactPageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default function Page() {
  return (
    <div className="space-y-8 py-20 md:space-y-18">
      <ContactPageHeader />

      <main className="flex flex-col md:flex-row gap-8 px-5 lg:px-8 max-w-7xl mx-auto">
        <ContactForm />
        <ContactDetails />
      </main>
    </div>
  );
}
