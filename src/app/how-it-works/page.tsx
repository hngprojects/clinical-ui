//import { Header } from '@/components/Header';
//import { Footer } from '@/components/Footer';
  import HowItWorks from '@/components/landing/HowItWorks';

export default function HowItWorksStandalonePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* <Header /> */}
      <main className="flex-1">
        <HowItWorks />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
