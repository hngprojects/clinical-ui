'use client';

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: 'Doctor';
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] overflow-hidden">
      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <Sidebar user={user} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          user={user}
          isSidebarOpen={isSidebarOpen}
          onMenuToggle={() => setIsSidebarOpen((state) => !state)}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
