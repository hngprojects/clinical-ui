'use client';

import VerificationNavbar from '@/components/verification/VerificationNavbar';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="px-4 space-y-14 py-10">
      <VerificationNavbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
