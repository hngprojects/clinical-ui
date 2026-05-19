import { Hero } from './how-it-works/Hero';
import { BentoGrid } from './how-it-works/BentoGrid';
import { ProcessHeader } from './how-it-works/ProcessHeader';
import { ProcessPath } from './how-it-works/ProcessPath';

export default function HowItWorks() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <BentoGrid />
      <ProcessHeader />
      <ProcessPath />
    </div>
  );
}
