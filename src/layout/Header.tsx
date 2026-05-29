'use client';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function UserHeader() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);
    updateStatus();
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  return (
    <header className="min-h-20 sm:min-h-26.75 w-full bg-[#FFFFFE] border border-[#F0F0F0] p-4 sm:px-10 sm:py-6 flex justify-between items-center gap-2.5 flex-wrap">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Welcome Dr. Light</h1>
        <p>
          <Link href="/user/case" className="text-primary-blue">
            5 cases{' '}
          </Link>
          assigned for this shift
        </p>
      </div>
      <div className="flex gap-6.25 items-center justify-self-end">
        <div
          className={`flex items-center justify-center rounded-full ${isOnline ? 'bg-[#DEF6E7] text-[#147638]' : 'bg-red-100 text-red-500'} py-2 px-4 gap-2`}
        >
          {isOnline ? (
            <>
              <span className="h-2 w-2 rounded-full bg-[#147638]" />
              Online
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Offline
            </>
          )}
        </div>
        <button className="flex relative">
          <Image src="/assets/dashboard/bell.svg" alt="Notifications" width={24} height={24} />
          <span className="absolute -top-2 -right-1 h-5 w-5 rounded-full bg-primary-blue text-white text-xs flex items-center justify-center">
            6
          </span>
        </button>
        <button className="flex py-1 px-2.5 rounded-[10px] border border-[#D0D0D0] justify-between items-center gap-3">
          <Image src="/assets/dashboard/doc.png" width={36} height={36} alt="Doctor Avatar" />
          <HugeiconsIcon icon={ArrowDown01Icon} />
        </button>
      </div>
    </header>
  );
}

export default function Header({ user }: { user: 'Doctor' }) {
  return <>{user === 'Doctor' && <UserHeader />}</>;
}
