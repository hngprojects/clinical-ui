import SigninContent from './signin-content';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  'Sign in — Clinsight',
  'Sign in to your Clinsight account.',
  '/signin',
);

export default function SignInPage() {
  return <SigninContent />;
}
