'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import React from 'react';

export default function VerificationNavbar() {
  return (
    <motion.nav
      className="max-w-7xl mx-auto flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="relative w-47.5 h-[40.58px]">
        <Image
          src={'/assets/header-assets/clinsight-logo.svg'}
          alt="Clingsights Log"
          fill
          className="object-contain"
        />
      </div>

      <button className="rounded-lg border py-3 px-6 gap-2 border-text-disabled button__text text-primary-blue">
        Log out
      </button>
    </motion.nav>
  );
}
