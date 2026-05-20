import { HowItWorksHero } from '@/components/landing-page/how-it-works/HowItWorksHero';
import { BentoGrid } from '@/components/landing-page/how-it-works/BentoGrid';
import { ProcessHeader } from '@/components/landing-page/how-it-works/ProcessHeader';
import { ProcessPath } from '@/components/landing-page/how-it-works/ProcessPath';

export default function HowItWorksStandalonePage() {
  return (
    <div className="bg-white flex flex-col w-full">
      {/* The standalone page GETS the Hero */}
      <HowItWorksHero />
      <BentoGrid />
      <ProcessHeader />
      <ProcessPath />
    </div>
  );
}
