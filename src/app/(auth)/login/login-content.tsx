'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AnimatePresence, motion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputFieldContainer from '@/components/ui/InputFieldContainer';
import ForgotPasswordModal from '@/components/auth/ForgotPasswordModal';
import SuccessModal from '@/components/auth/SuccessModal';

// ─── Schema ────────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please complete all required fields.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Please complete all required fields.' }),
});

type LoginValues = z.infer<typeof loginSchema>;

// ─── Google SVG ────────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.93 3.28-4.77 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LoginContent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get('error') || params.get('oauth_error');
    const code = params.get('code');
    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');
    const state = params.get('state');

    if (!oauthError && !code && !accessToken && !idToken) return;

    window.history.replaceState(null, '', window.location.pathname);

    if (oauthError) {
      const msg =
        oauthError === 'access_denied'
          ? 'Google sign in was cancelled.'
          : 'Unable to complete Google authentication. Please try again.';

      queueMicrotask(() => setApiError(msg));
      toast.error(msg);
      return;
    }

    const completeGoogleLogin = async () => {
      setApiError(null);

      try {
        const res = await fetch('/api/auth/google/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ code, access_token: accessToken, id_token: idToken, state }),
        });

        const json = await res.json();

        if (!res.ok) {
          const msg = mapApiError(res.status, json?.message ?? '');
          setApiError(msg);
          toast.error(msg);
          return;
        }

        const googleToken = json?.data?.google_token ?? json?.data?.googleToken;
        const returnedAccessToken = json?.data?.access_token ?? json?.data?.accessToken;

        if (googleToken) localStorage.setItem('googleToken', googleToken);
        if (returnedAccessToken) localStorage.setItem('accessToken', returnedAccessToken);

        setShowSuccessModal(true);
      } catch {
        const msg = 'Unable to complete Google authentication. Please try again.';
        setApiError(msg);
        toast.error(msg);
      }
    };

    void completeGoogleLogin();
  }, []);

  // ── Submit ──────────────────────────────────────────────────────────────────

  const onSubmit = async (data: LoginValues) => {
    setApiError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const json = await res.json();

      if (!res.ok) {
        // Map known backend error codes / messages to user-facing copy
        const msg = mapApiError(res.status, json?.message ?? '');

        if (res.status === 401) {
          setError('email', { type: 'server', message: msg });
          setError('password', { type: 'server', message: msg });
        }

        setApiError(msg);
        toast.error(msg);
        return;
      }

      const accessToken = json?.data?.access_token ?? json?.data?.accessToken;

      if (accessToken) localStorage.setItem('accessToken', accessToken);

      setShowSuccessModal(true);
    } catch {
      const msg = "We couldn't sign you in right now. Please check your connection and try again.";
      setApiError(msg);
      toast.error(msg);
    }
  };

  // ── Google OAuth ────────────────────────────────────────────────────────────

  const handleGoogleLogin = () => {
    try {
      const url =
        process.env.NEXT_PUBLIC_GOOGLE_AUTH_API_URL ??
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/google`;
      window.location.href = url;
    } catch {
      const msg = 'Unable to initiate Google authentication. Please try again.';
      setApiError(msg);
      toast.error(msg);
    }
  };

  // ── Derived state ───────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Split layout ─────────────────────────────────────────────────── */}
      <div className="flex min-h-screen w-full">
        {/* Left — hero image (desktop only) */}
        <div className="relative hidden lg:block lg:w-1/2 xl:w-[55%]">
          <Image
            src="/assets/auth/login-hero.jpg"
            alt="Doctor smiling in a white coat"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Right — form pane */}
        <div className="flex w-full flex-col lg:w-1/2 xl:w-[45%]">
          {/* Logo */}
          <div className="px-8 pt-8 pb-0">
            <Image
              src="/assets/header-assets/clinsight-logo.svg"
              alt="Clinsight Logo"
              width={140}
              height={36}
              priority
            />
          </div>

          {/* Centered form */}
          <div className="flex flex-1 items-center justify-center px-8 py-10">
            <div className="w-full max-w-[420px]">
              <LoginForm
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                isSubmitting={isSubmitting}
                apiError={apiError}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onSubmit={onSubmit}
                onGoogleLogin={handleGoogleLogin}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showForgotPassword && <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal
            title="Welcome Back!"
            message="You have successfully logged in."
            onComplete={() => {
              setShowSuccessModal(false);
              router.push('/user');
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Error mapper ───────────────────────────────────────────────────────────────

function mapApiError(status: number, message: string): string {
  if (status === 401) return 'Invalid email or password.';
  if (status === 403) return 'Please verify your email before logging in.';
  if (status === 0 || message.toLowerCase().includes('network'))
    return "We couldn't sign you in right now. Please check your connection and try again.";
  return message || 'Something went wrong. Please try again.';
}

// ─── Inner Form ─────────────────────────────────────────────────────────────────

interface LoginFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  isSubmitting: boolean;
  apiError: string | null;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  onSubmit: (data: LoginValues) => Promise<void>;
  onGoogleLogin: () => void;
  onForgotPassword: () => void;
}

function LoginForm({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  apiError,
  showPassword,
  setShowPassword,
  onSubmit,
  onGoogleLogin,
  onForgotPassword,
}: LoginFormProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-sans text-4xl font-semibold leading-10 tracking-tight text-text-primary">
          Welcome back
        </h1>
        <p className="font-sans text-base font-normal leading-6 text-text-secondary-3">
          Sign in to access your Clinsight doctor dashboard.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-8 lg:gap-4"
        noValidate
      >
        {/* Fields */}
        <div className="flex flex-col gap-4 lg:gap-3">
          {/* Email */}
          <InputFieldContainer label="Email Address" htmlFor="email" error={errors.email?.message}>
            <Input
              id="email"
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              error={!!errors.email || (!!apiError && apiError.toLowerCase().includes('email'))}
              autoComplete="email"
            />
          </InputFieldContainer>

          {/* Password */}
          <InputFieldContainer label="Password" htmlFor="password" error={errors.password?.message}>
            <div className="relative w-full">
              <Input
                id="password"
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="pr-12"
                error={!!errors.password || apiError === 'Invalid email or password.'}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-text-disabled transition-colors hover:text-text-primary"
              >
                <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} size={18} />
              </button>
            </div>
          </InputFieldContainer>

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onForgotPassword}
              className="font-sans text-sm font-normal text-primary-blue underline leading-5 hover:opacity-80 transition-opacity"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* API-level error (non-field) */}
        <AnimatePresence>
          {apiError && !errors.email && !errors.password && (
            <motion.p
              key="api-error"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-xs italic font-medium text-red-500"
            >
              {apiError}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4 lg:gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'h-12 w-full rounded-xl px-6 py-3 font-sans text-base font-medium leading-6 transition-colors select-none',
              !isSubmitting
                ? 'bg-primary-blue text-white hover:bg-primary-blue/90 cursor-pointer'
                : 'bg-[#F5F5F5] text-text-disabled cursor-not-allowed',
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Signing in…
              </span>
            ) : (
              'Log in'
            )}
          </Button>

          {/* Divider */}
          <div className="my-1 flex w-full items-center gap-1.5">
            <div className="h-0 flex-1 border-t border-[#F0F0F0]" />
            <span className="font-sans text-sm font-normal leading-5 text-text-disabled">or</span>
            <div className="h-0 flex-1 border-t border-[#F0F0F0]" />
          </div>

          {/* Google */}
          <Button
            type="button"
            variant="outline"
            onClick={onGoogleLogin}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#E0E0E0] bg-white font-sans text-base font-medium text-[#313131] transition-colors hover:bg-slate-50"
          >
            <GoogleIcon />
            Sign in with Google
          </Button>

          {/* Sign up link */}
          <div className="mt-2 text-center font-sans">
            <span className="text-sm font-normal leading-5 text-text-secondary-3">
              Don&apos;t have an account?{' '}
            </span>
            <Link
              href="/signup"
              className="text-sm font-normal leading-5 text-primary-blue underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Footer terms */}
        <div className="mt-2 flex w-full justify-center p-2.5 lg:mt-0">
          <p className="w-72 text-center font-sans text-xs font-normal leading-4 text-text-primary">
            By continuing, you have read and agreed to Clinsight&apos;s{' '}
            <Link
              href="/terms-and-conditions"
              className="font-medium leading-4 text-primary-blue underline"
            >
              Terms and Conditions.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

// ─── Spinner ────────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
