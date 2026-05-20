'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Mail01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowRight02Icon,
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import InputFieldContainer from '@/components/ui/InputFieldContainer';
import { cn } from '@/lib/utils';
import { signinAction } from '@/actions/auth-actions';
import { toast } from 'sonner';

const signinSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SigninValues = z.infer<typeof signinSchema>;

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SigninValues) => {
    const result = await signinAction({
      email: data.email,
      password: data.password,
    });

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Signed in successfully!');
      router.push('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-165.25 rounded-[32px] bg-white shadow-2xl flex flex-col p-6 md:px-20 md:py-10"
    >
      <div className="flex flex-col h-full gap-6 md:gap-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-[#1B1B1B] text-lg md:text-[38px] leading-[130%] tracking-[-0.02em] whitespace-nowrap">
            Welcome Back
          </h1>
          <p className="font-medium text-[#5E5E5E] text-xs md:text-base leading-[150%] tracking-[-0.01em]">
            Login to reveiw cases and manage your activties
          </p>
        </div>

        {/* Social Sign in */}
        <button
          type="button"
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-[#E0E0E0] bg-white text-base font-medium text-[#313131] transition-colors hover:bg-slate-50"
        >
          <span>Sign in with Google</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-3.3 3.28-8.19 3.28-8.09z"
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
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E0E0E0]" />
          <span className="text-sm font-medium text-[#313131]">or Sign in with Email</span>
          <div className="h-px flex-1 bg-[#E0E0E0]" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          autoComplete="off"
          noValidate
        >
          <div className="flex flex-col gap-4">
            {/* Email */}
            <InputFieldContainer
              label="Email address"
              htmlFor="email"
              error={errors.email?.message}
            >
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]">
                  <HugeiconsIcon icon={Mail01Icon} size={20} />
                </div>
                <input
                  id="email"
                  {...register('email')}
                  type="email"
                  placeholder="Enter email adress"
                  autoComplete="off"
                  className={cn(
                    'h-14 w-full rounded-xl border border-[#E0E0E0] bg-white pl-12 pr-4 text-sm md:text-base outline-none transition-all focus:border-brand-blue focus:bg-[#E8F0FE] not-placeholder-shown:bg-[#E8F0FE] placeholder:text-sm md:placeholder:text-base',
                    errors.email && 'border-red-500',
                  )}
                />
              </div>
            </InputFieldContainer>

            {/* Password */}
            <InputFieldContainer
              label="Password"
              htmlFor="password"
              error={errors.password?.message}
            >
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]">
                  <HugeiconsIcon icon={LockPasswordIcon} size={20} />
                </div>
                <input
                  id="password"
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className={cn(
                    'h-14 w-full rounded-xl border border-[#E0E0E0] bg-white pl-12 pr-4 text-sm md:text-base outline-none transition-all focus:border-brand-blue focus:bg-[#E8F0FE] not-placeholder-shown:bg-[#E8F0FE] placeholder:text-sm md:placeholder:text-base',
                    errors.password && 'border-red-500',
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3] transition-colors hover:text-[#1B1B1B]"
                >
                  <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} size={20} />
                </button>
              </div>
            </InputFieldContainer>
          </div>

          {/* Submit */}
          <Button
            variant="brand"
            type="submit"
            disabled={isSubmitting}
            className="h-15 w-full rounded-2xl text-base font-bold shadow-lg text-white"
          >
            {isSubmitting ? 'Sending...' : 'Sign me in'}
            <HugeiconsIcon icon={ArrowRight02Icon} size={20} className="ml-2" />
          </Button>

          {/* Footer Link */}
          <div className="text-center text-base text-[#5E5E5E]">
            Already have an account?{' '}
            <Link href="/signup" className="font-bold text-[#1565C0] hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
