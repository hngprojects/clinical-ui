'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <motion.div
            className="flex-[1.2] flex flex-col items-start gap-6 text-left"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 rounded-full bg-[#F5F5F5] p-1 pr-4"
            >
              <div className="flex -space-x-2 overflow-hidden">
                {[
                  '/assets/how-it-works/Ellipse 1613.svg',
                  '/assets/how-it-works/Ellipse 1614.svg',
                  '/assets/how-it-works/Ellipse 1615.svg',
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative h-6 w-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                  >
                    <Image src={src} alt="User" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-[11px] font-bold text-[#1565C0]">
                Join 1,000+ users already using Clinsight
              </span>
            </motion.div>

            <div className="flex flex-col gap-3">
              <motion.h1
                variants={fadeInUp}
                className="text-[28px] lg:text-[48px] font-bold leading-[1.2] tracking-[-0.02em] text-[#1B1B1B]"
              >
                Understand Your Lab Results Right Now.
              </motion.h1>
              <motion.h1
                variants={fadeInUp}
                className="text-[28px] lg:text-[48px] font-bold leading-[1.2] tracking-[-0.02em] text-[#1B1B1B]"
              >
                <span className="relative inline-block px-3 text-white">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="absolute inset-0 -skew-x-2 rounded bg-[#1565C0] origin-left"
                  />
                  <span className="relative">Here&apos;s How</span>
                </span>
              </motion.h1>
            </div>

            <motion.div
              variants={fadeInUp}
              className="max-w-md text-[16px] lg:text-[18px] font-normal leading-[1.5] tracking-[-0.01em] text-[#5E5E5E]"
            >
              <p>
                Clinsight helps you turns complex medical reports into clear, simple explanations
                using AI-assisted interpretation.
              </p>
            </motion.div>
          </motion.div>

          <div className="relative flex-1 flex items-center justify-center lg:justify-end lg:pr-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[400px] w-full max-w-[400px] lg:h-[600px] lg:max-w-[550px] flex items-center justify-center"
            >
              {/* Background Circle */}
              <div className="absolute inset-0 pointer-events-none opacity-60 lg:opacity-100 scale-110 lg:scale-125">
                <Image
                  src="/assets/landing-page-assets/outer-inner-circle.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Dashboard Content Container */}
              <div className="relative flex flex-col items-center z-10 w-full max-w-[300px] lg:max-w-[384px]">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -left-8 lg:-left-28 top-0 lg:top-0 z-30 flex w-[65px] lg:w-[88px] flex-col gap-2.5 lg:gap-3 rounded-[24px] bg-white p-2 shadow-[0px_8px_30px_rgba(0,0,0,0.06)] border border-slate-50"
                >
                  {['Rectangle 34624412', 'Rectangle 34624413', 'Rectangle 34624414'].map(
                    (name, i) => (
                      <div
                        key={i}
                        className="relative aspect-square w-full overflow-hidden rounded-xl lg:rounded-2xl"
                      >
                        <Image
                          src={`/assets/how-it-works/${name}.png`}
                          alt="User"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ),
                  )}
                  <div className="flex aspect-square w-full flex-col items-center justify-center rounded-xl lg:rounded-2xl bg-[#F0F7FF]">
                    <span className="text-[9px] lg:text-[12px] font-bold text-[#1565C0] leading-tight text-center">
                      User
                      <br />
                      Reports
                    </span>
                  </div>
                </motion.div>

                <div className="w-full p-6 lg:p-8 bg-gradient-to-b from-white from-20% to-zinc-50 to-80% rounded-[32px] shadow-[0px_20px_40px_rgba(0,0,0,0.08)] border-l-[3px] border-r-[3px] border-t-[3px] border-[#1565C0] flex flex-col gap-6 overflow-hidden relative">
                  {/* Header */}
                  <div className="flex justify-start items-center gap-3">
                    <div className="size-6 lg:size-7 relative">
                      <Image src="/assets/how-it-works/ai-scan.svg" alt="AI" fill />
                    </div>
                    <span className="text-[#1B1B1B] text-sm lg:text-base font-semibold">
                      Advanced Intelligent Analysis
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="flex-1 h-3 lg:h-3.5 bg-[#E8F0F9] rounded-full" />
                      <div className="w-20 lg:w-32 h-3 lg:h-3.5 bg-[#E8F0F9] rounded-full" />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-24 lg:w-32 h-3 lg:h-3.5 bg-[#E8F0F9] rounded-full" />
                      <div className="w-16 lg:w-28 h-3 lg:h-3.5 bg-[#E8F0F9] rounded-full" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="w-full px-4 py-3 bg-white/60 rounded-2xl border-b border-zinc-200 flex items-center gap-4">
                      <div className="size-9 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
                        <Image
                          src="/assets/how-it-works/key-01.svg"
                          alt="Key"
                          width={18}
                          height={18}
                        />
                      </div>
                      <span className="text-[#D97706] text-sm lg:text-md font-medium">
                        Key Findings
                      </span>
                    </div>
                    <div className="w-full px-4 py-3 bg-white/60 rounded-2xl border-b border-zinc-200 flex items-center gap-4">
                      <div className="size-9 bg-[#DCFCE7] rounded-lg flex items-center justify-center">
                        <Image
                          src="/assets/how-it-works/streamline-plump_file-report-solid.svg"
                          alt="Rec"
                          width={18}
                          height={18}
                        />
                      </div>
                      <span className="text-[#16A34A] text-sm lg:text-md font-medium">
                        Recommendations
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div whileTap={{ scale: 0.98 }} className="z-20 -mt-7 w-[90%]">
                  <Button className="w-full h-14 lg:h-16 bg-[#1565C0] hover:bg-[#0D47A1] rounded-2xl text-white font-bold shadow-[0px_10px_20px_rgba(21,101,192,0.3)] flex items-center justify-center gap-3 transition-colors duration-200">
                    Get Started
                    <Image
                      src="/assets/how-it-works/arrow_forward.svg"
                      alt="arrow"
                      width={20}
                      height={20}
                    />
                  </Button>
                </motion.div>

                <div className="absolute -bottom-12 -right-2 lg:-right-12 z-40">
                  <div className="size-14 lg:size-20 bg-white rounded-full shadow-2xl flex items-center justify-center border border-slate-50">
                    <div className="size-[85%] bg-[#FFF7ED] rounded-full flex items-center justify-center">
                      <Image
                        src="/assets/how-it-works/contracts.svg"
                        alt="doc"
                        width={32}
                        height={32}
                        className="lg:w-10 lg:h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
