import { pageMetadata } from '@/lib/pageMetadata';
import { SqueezeHeader } from '@/components/squeeze/SqueezeHeader';
import { SqueezeHero } from '@/components/squeeze/SqueezeHero';
import { GuideHighlights } from '@/components/squeeze/GuideHighlights';

export const metadata = pageMetadata(
  '5 Lab Values Every Nigerian Should Understand — Clinsight',
  'Download the free guide and decode your lab results before your next doctor visit.',
  '/squeeze',
);

export default function SqueezePage() {
  return (
    <div className="bg-white">
      <SqueezeHeader />
      <SqueezeHero />
      <GuideHighlights />
    </div>
  );
}
