'use client';

import Image from 'next/image';
import { pages } from './pages';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import {
  DashboardSquare03Icon,
  Folder03Icon,
  Stethoscope02Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';
import { LogoutIcon } from '@/components/icons/LogoutIcon';

const iconMap: Record<string, IconSvgElement> = {
  DashboardSquare03Icon,
  Folder03Icon,
  Stethoscope02Icon,
};

export default function Sidebar({
  user,
  isOpen,
  onClose,
}: {
  user: 'Doctor';
  isOpen?: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const basePath = user === 'Doctor' ? '/user' : '';

  return (
    <>
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
                pathname === page.path ||
                (page.path !== basePath && pathname.startsWith(`${page.path}/`));
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
                    <HugeiconsIcon icon={PageIcon as IconSvgElement} />
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
          onClick={() => router.push('/login')}
        >
          <LogoutIcon />
          Logout
        </button>
      </div>

      {isOpen && (
        <aside className="sm:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 overflow-y-auto shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <Image src="/assets/dashboard/dashboard_logo.png" width={40} height={40} alt="Logo" />
            <button
              type="button"
              aria-label="Close sidebar"
              className="p-2"
              onClick={() => onClose()}
            >
              <HugeiconsIcon icon={Cancel01Icon as IconSvgElement} />
            </button>
          </div>

          <nav className="flex flex-col gap-3">
            {pages[user].map((page) => {
              const isActive =
                pathname === page.path ||
                (page.path !== basePath && pathname.startsWith(`${page.path}/`));
              const baseCls = 'px-2.5 py-3.5 rounded-[8px] transition-colors flex gap-2.5';
              const activeCls = 'bg-primary-blue text-white';
              const inactiveCls = 'text-text-disabled hover:bg-primary-blue/10';

              return (
                <Link
                  key={page.name}
                  href={page.path}
                  className={`${baseCls} ${isActive ? activeCls : inactiveCls}`}
                  onClick={() => onClose()}
                >
                  {page.svg ? (
                    <Image src={page.svg} width={20} height={20} alt={`${page.name} icon`} />
                  ) : (
                    <HugeiconsIcon
                      icon={iconMap[page.icon] ?? (DashboardSquare03Icon as IconSvgElement)}
                    />
                  )}
                  {page.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6">
            <button
              className="flex w-full items-center justify-center gap-2.5 px-4 py-3 rounded-md border border-[#D0D0D0] text-text-disabled hover:text-red-600"
              onClick={() => {
                onClose();
                router.push('/login');
              }}
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
