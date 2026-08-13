'use client';

import { useState } from 'react';
import Image from 'next/image';
import { pages } from './pages';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import {
  DashboardSquare03Icon,
  Folder03Icon,
  Stethoscope02Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';
import { LogoutIcon } from '@/components/icons/LogoutIcon';
import LogoutModal from '@/components/auth/LogoutModal';

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
  const [showLogout, setShowLogout] = useState(false);

  const basePath = user === 'Doctor' ? '/user' : '';

  const NavItems = ({ onNavigate }: { onNavigate?: () => void } = {}) =>
    pages[user].map((page) => {
      const isActive =
        pathname === page.path || (page.path !== basePath && pathname.startsWith(`${page.path}/`));
      const baseCls = 'px-2.5 py-3.5 rounded-[8px] transition-colors flex gap-2.5';
      const activeCls = 'bg-primary-subtle text-primary-blue';
      const inactiveCls = 'text-text-disabled hover:bg-primary-subtle';
      const PageIcon = iconMap[page.icon] ?? DashboardSquare03Icon;

      return (
        <Link
          key={page.name}
          href={page.path}
          className={`${baseCls} ${isActive ? activeCls : inactiveCls}`}
          onClick={onNavigate}
        >
          {page.svg ? (
            <Image src={page.svg} width={20} height={20} alt={`${page.name} icon`} />
          ) : (
            <HugeiconsIcon icon={PageIcon as IconSvgElement} />
          )}
          {page.name}
        </Link>
      );
    });

  return (
    <>
      {/* ── Desktop sidebar ────────────────────────────────────────────── */}
      <div className="hidden w-full sm:w-50 lg:w-62.5 px-4 py-6 shrink-0 bg-white sm:flex h-auto overflow-y-auto flex-col justify-between gap-10">
        <div className="flex flex-col gap-16">
          <div className="flex">
            <Image
              src="/assets/dashboard/vector-new.svg"
              width={116}
              height={40}
              alt="Dashboard Logo"
            />
          </div>
          <div className="flex flex-col gap-2">{NavItems()}</div>
        </div>

        <button
          className="flex text-text-disabled hover:text-red-600 transition-colors items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-red-50"
          aria-label="Logout"
          type="button"
          onClick={() => setShowLogout(true)}
        >
          <LogoutIcon />
          Logout
        </button>
      </div>

      {/* ── Mobile sidebar ─────────────────────────────────────────────── */}
      {isOpen && (
        <aside className="sm:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 overflow-y-auto shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <Image src="/assets/dashboard/vector-new.svg" width={116} height={40} alt="Logo" />
            <button type="button" aria-label="Close sidebar" className="p-2" onClick={onClose}>
              <HugeiconsIcon icon={Cancel01Icon as IconSvgElement} />
            </button>
          </div>

          <nav className="flex flex-col gap-3">{NavItems({ onNavigate: onClose })}</nav>

          <div className="mt-6">
            <button
              className="flex w-full items-center justify-center gap-2.5 px-4 py-3 rounded-md border border-[#D0D0D0] text-text-disabled hover:text-red-600 transition-colors"
              type="button"
              onClick={() => {
                onClose();
                setShowLogout(true);
              }}
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </aside>
      )}

      {/* ── Logout modal (shared, portal-style) ────────────────────────── */}
      <AnimatePresence>
        {showLogout && <LogoutModal onClose={() => setShowLogout(false)} />}
      </AnimatePresence>
    </>
  );
}
