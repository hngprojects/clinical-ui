'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { motion } from 'motion/react';

export function Hero() {
  // Animation variants for the text elements
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Left Column: Animated Text Content */}
          <motion.div 
            className="flex-[1.4] flex flex-col items-start gap-6 text-left"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 rounded-full bg-[#F5F5F5] p-1 pr-4">
              <div className="flex -space-x-2 overflow-hidden">
                {[
                  "/assets/landing-page-assets/handsome-man.jpg",
                  "/assets/landing-page-assets/successful-entrepreneur.jpg",
                  "/assets/landing-page-assets/curly-haired-woman.jpg"
                ].map((src, i) => (
                  <div key={i} className="relative h-6 w-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <Image src={src} alt="User" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-[11px] font-bold text-brand-blue">
                Join 1,000+ users already using Clinsight
              </span>
            </motion.div>

            {/* Headers */}
            <div className="flex flex-col gap-3">
              <motion.h1 variants={fadeInUp} className="text-[28px] lg:text-[48px] font-bold leading-[1.2] tracking-[-0.02em] text-[#1B1B1B]">
                Understand Your Lab Results Right Now.
              </motion.h1>
              <motion.h1 variants={fadeInUp} className="text-[28px] lg:text-[48px] font-bold leading-[1.2] tracking-[-0.02em] text-[#1B1B1B]">
                <span className="relative inline-block px-3 text-white">
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="absolute inset-0 -skew-x-2 rounded bg-[#1565C0] origin-left" 
                  />
                  <span className="relative">No Waiting!</span>
                </span>
              </motion.h1>
            </div>

            {/* Description & Subtext */}
            <motion.div variants={fadeInUp} className="max-w-md text-[16px] lg:text-[18px] font-normal leading-[1.5] tracking-[-0.01em] text-[#5E5E5E] flex flex-col gap-4">
              <p>Upload your laboratory results and get a clear interpretation in minutes.</p>
              <p className="italic text-[14px]">AI-assisted interpretation, not a medical diagnosis.</p>
            </motion.div>
          </motion.div>

          {/* Right Column: Animated Visuals */}
          <div className="relative w-full flex-1 min-h-[400px] lg:min-h-[600px] flex items-center justify-end -mr-6 lg:mr-0 -mt-8 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative h-[320px] w-[320px] lg:h-[600px] lg:w-[600px] flex items-center justify-center"
            >
              {/* Background Circle */}
              <div className="absolute inset-0 pointer-events-none">
                <Image src="/assets/landing-page-assets/outer-inner-circle.svg" alt="" fill className="object-contain" priority />
              </div>

              {/* Floating Docs Icon */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-2 lg:bottom-[8%] lg:right-[5%] z-20 w-12 h-12 lg:w-20 lg:h-20 flex items-center justify-center"
              >
                <div className="relative w-full h-full p-2 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center">
                  <Image src="/assets/landing-page-assets/docs.svg" alt="Note icon" width={40} height={40} className="w-full h-full object-contain" />
                </div>
              </motion.div>

              {/* Dashboard Content */}
              <div className="relative flex flex-col items-center z-10 w-full max-w-[240px] lg:max-w-[380px]">
                
                {/* Sidebar Cards */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -left-4 lg:-left-6 top-0 bottom-0 z-20 flex w-[50px] lg:w-[84px] flex-col gap-1.5 lg:gap-2 rounded-lg lg:rounded-xl bg-white p-1 lg:p-2 shadow-lg ring-1 ring-slat
                >
                  {['woman-with-laptop', 'successful-entrepreneur', 'african-american-student'].map((name, i) => (
                    <div key={i} className="relative flex-1 w-full overflow-hidden rounded-md lg:rounded-lg">
                      <Image src={`/assets/landing-page-assets/${name}.jpg`} alt="User" fill className="object-cover" />
                    </div>
                  ))}
                  <div className="flex flex-1 w-full flex-col items-center justify-center rounded-md lg:rounded-lg bg-[#E8F0F9] text-center text-[8px] lg:text-[14px] font-medium leading-tight text-bra
                    User<br />Reports
                  </div>
                </motion.div>

                {/* Main Card */}
                <div className="relative z-10 w-full rounded-t-[16px] lg:rounded-t-[24px] border-x border-t border-brand-blue bg-white p-4 lg:p-8 pb-8 lg:pb-12 flex flex-col gap-4 lg:gap-8 shadow-2xl"
                   {/* Simplified UI Bars for animation demo */}
                   <div className="flex items-center gap-3">
                      <div className="h-6 w-6 lg:h-10 lg:w-10 rounded-full bg-blue-50" />
                      <div className="h-2 w-24 bg-slate-100 rounded" />
                   </div>
                   <div className="space-y-3">
                      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1.2, duration: 0.8 }} className="h-3 bg-slate-50 rounded" />
                      <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ delay: 1.4, duration: 0.8 }} className="h-3 bg-slate-50 rounded" />
                   </div>
                </div>

                {/* CTA Button */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="z-20 mt-2 lg:mt-4 w-full"
                >
                  <Button variant="brand" className="w-full rounded-lg lg:rounded-xl py-4 lg:py-7 bg-[#1565C0] text-white">
                    Get Started
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="ml-1 lg:ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
