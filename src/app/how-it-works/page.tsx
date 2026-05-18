import { Footer } from '@/components/Footer';
import { HowItWorks } from '@/components/landing-page/HowItWorks';

export default function HowItWorksStandalonePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
