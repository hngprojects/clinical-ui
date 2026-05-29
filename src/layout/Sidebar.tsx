'use client';

import Image from 'next/image';
import { pages } from './pages';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { DashboardSquare03Icon, Folder03Icon, Stethoscope02Icon } from '@hugeicons/core-free-icons';
import { LogoutIcon } from '../../public/assets/dashboard/logout';

const iconMap: Record<string, unknown> = {
  DashboardSquare03Icon,
  Folder03Icon,
  Stethoscope02Icon,
};

export default function Sidebar({ user }: { user: 'Doctor' }) {
  const pathname = usePathname();

  const basePath = user === 'Doctor' && '/user';

  return (
    <div className="hidden w-full sm:w-50 lg:w-62.5 px-4 py-5 shrink-0 bg-white sm:flex h-auto overflow-y-auto flex-col justify-between gap-10">
      <div className="flex flex-col gap-8">
        <div className="flex">
          <Image
            src="/assets/dashboard/dashboard_logo.png"
            width={48}
            height={48}
            alt="Dashboard Logo"
          />
        </div>
        <div className="flex flex-col gap-2">
          {pages[user].map((page) => {
            const isActive =
              pathname === page.path || (page.path !== basePath && pathname.startsWith(page.path));
            const baseCls = 'px-2.5 py-3.5 rounded-[8px] transition-colors flex gap-2.5';
            const activeCls = 'bg-primary-blue text-white';
            const inactiveCls = 'text-text-disabled hover:bg-primary-blue/10';
            const PageIcon = iconMap[page.icon] ?? DashboardSquare03Icon;

            return (
              <Link
                key={page.name}
                href={page.path}
                className={`${baseCls} ${isActive ? activeCls : inactiveCls}`}
              >
                {page.svg ? (
                  <Image src={page.svg} width={20} height={20} alt={`${page.name} icon`} />
                ) : (
                  <HugeiconsIcon icon={PageIcon as never} />
                )}
                {page.name}
              </Link>
            );
          })}
        </div>
      </div>
      <button
        className="flex text-text-disabled hover:text-red-600 transition-colors items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-red-50"
        aria-label="Logout"
        type="button"
      >
        <LogoutIcon />
        Logout
      </button>
    </div>
  );
}
