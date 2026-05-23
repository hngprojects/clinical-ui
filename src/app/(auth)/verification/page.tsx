import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata: Metadata = pageMetadata(
  'Verification — Clinsight',
  'Complete your verification to access personalized lab insights and doctor consultations.',
  '/verification',
);

export default function Page() {
  redirect('/verification/professional-info');
}
