'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export type UserRole = 'doctor' | 'admin';

interface AuthGuardProps {
  allowedRoles?: UserRole[];
  loginPath?: string;
  unauthorizedPath?: string;
  children: React.ReactNode;
}

export function AuthGuard({
  allowedRoles,
  loginPath = '/login',
  unauthorizedPath = '/unauthorized',
  children,
}: AuthGuardProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      const user = await getCurrentUser();

      if (cancelled) return;

      if (!user) {
        router.replace(loginPath);
        return;
      }

      if (allowedRoles && allowedRoles.length > 0) {
        const hasRole = allowedRoles.includes(user.role as UserRole);
        if (!hasRole) {
          router.replace(unauthorizedPath);
          return;
        }
      }

      setStatus('authorized');
    }

    verify();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'loading') {
    return <AuthLoadingScreen />;
  }

  if (status === 'unauthorized') {
    // Will redirect — render nothing while navigating
    return null;
  }

  return <>{children}</>;
}

function AuthLoadingScreen() {
  return (
    <div
      role="status"
      aria-label="Checking authentication…"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <svg
          className="animate-spin h-10 w-10 text-primary-blue"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="text-sm text-[#5E5E5E] font-medium select-none">Verifying access…</p>
      </div>
    </div>
  );
}
