import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Professional Verification',
};

export default function Page() {
  redirect('/verification/professional-info');
}
