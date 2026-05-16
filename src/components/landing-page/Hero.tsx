'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Row: Centered alignment between text block and visual assembly */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column: Badge, Heading, and Subtext */}
          <div className="flex-[1.4] flex flex-col items-start gap-6 text-left">
            <div className="flex items-center gap-2 rounded-full bg-[#F5F5F5] p-1 pr-4">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="relative h-6 w-6 rounded-full border-2 border-white 
                bg-slate-200 overflow-hidden">
                  <Image
                    src="/assets/landing-page-assets/handsome-man.jpg"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-6 w-6 rounded-full border-2 border-white 
                bg-slate-200 overflow-hidden">
                  <Image
                    src="/assets/landing-page-assets/successful-entrepreneur.jpg"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-6 w-6 rounded-full border-2 border-white 
                bg-slate-200 overflow-hidden">
                  <Image
                    src="/assets/landing-page-assets/curly-haired-woman.jpg"
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] font-bold text-brand-blue">
                Join 1,000+ users already using Clinsight
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-[28px] lg:text-[48px] font-bold leading-[1.2] 
              tracking-[-0.02em] text-[#1B1B1B] w-full lg:max-w-none">
                Understand Your Lab Results Right Now.
              </h1>
              <h1 className="text-[28px] lg:text-[48px] font-bold leading-[1.2] 
              tracking-[-0.02em] text-[#1B1B1B]">
                <span className="relative inline-block px-3 text-white">
                  <span className="absolute inset-0 -skew-x-2 rounded bg-[#1565C0]" />
                  <span className="relative">No Waiting!</span>
                </span>
              </h1>
            </div>

            <div className="max-w-md text-[16px] lg:text-[18px] font-normal 
            leading-[1.5] tracking-[-0.01em] text-[#5E5E5E] flex flex-col gap-4">
              <p>
                Upload your laboratory results and get a clear interpretation in
                minutes.
              </p>
              <p className="italic text-[14px]">
                AI-assisted interpretation, not a medical diagnosis.
              </p>
            </div>
          </div>

          {/* Right Column: Dashboard Visual nested in Circle */}
          <div className="relative w-full flex-1 min-h-[400px] lg:min-h-[600px] 
          flex items-center justify-end -mr-6 lg:mr-0 -mt-8 lg:mt-0">
            {/* Circle Wrapper - Responsive size */}
            <div className="relative h-[320px] w-[320px] lg:h-[600px] lg:w-[600px] 
            flex items-center justify-center scale-90 sm:scale-100 lg:scale-100 
            translate-x-6 lg:translate-x-0">
              {/* Background Circle Asset */}
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src="/assets/landing-page-assets/outer-inner-circle.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Floating File Icon - Responsive size */}
              <div className="absolute -bottom-10 -right-2 lg:bottom-[8%] lg:right-[5%] 
              z-20 w-12 h-12 lg:w-20 lg:h-20 flex items-center justify-center">
                <div className="relative w-full h-full p-2 bg-white rounded-full 
                shadow-md border border-slate-100 lg:shadow-none lg:border-none flex 
                items-center justify-center">
                  <Image
                    src="/assets/landing-page-assets/docs.svg"
                    alt="Note icon"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              {/* Dashboard Content - Centered in the circle */}{' '}
              <div className="relative flex flex-col items-center gap-0 z-10 w-full 
              max-w-[240px] lg:max-w-[380px]">
                {/* User Reports Sidebar - Hidden or adjusted on mobile */}
                <div className="absolute -left-4 lg:-left-6 top-0 bottom-0 z-20 flex 
                w-[50px] lg:w-[84px] flex-col gap-1.5 lg:gap-2 rounded-lg lg:rounded-xl 
                bg-white p-1 lg:p-2 shadow-lg ring-1 ring-slate-100">
                  {[
                    '/assets/landing-page-assets/woman-with-laptop.jpg',
                    '/assets/landing-page-assets/successful-entrepreneur.jpg',
                    '/assets/landing-page-assets/african-american-student.jpg',
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative flex-1 w-full overflow-hidden rounded-md lg:rounded-lg"
                    >
                      <Image
                        src={src}
                        alt="User"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="flex flex-1 w-full flex-col items-center justify-center 
                  rounded-md lg:rounded-lg bg-[#E8F0F9] text-center text-[8px] lg:text-[14px] 
                  font-medium leading-tight text-brand-blue">
                    User
                    <br />
                    Reports
                  </div>
                </div>

                {/* Dashboard Card with Fading Bottom Edge */}
                <div className="relative z-10 w-full">
                  {/* Container with fading gradient and mask for the border/bg */}
                  <div className="rounded-t-[16px] lg:rounded-t-[24px] border-x border-t 
                  border-brand-blue bg-gradient-to-b from-white via-white to-transparent 
                  p-4 lg:p-8 pb-8 lg:pb-12 flex flex-col gap-4 lg:gap-8">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="flex h-6 w-6 lg:h-10 lg:w-10 items-center justify-center">
                        <Image
                          src="/assets/landing-page-assets/ai-scan.svg"
                          alt="AI Scan"
                          width={24}
                          height={24}
                          className="w-full h-full"
                        />
                      </div>
                      <span className="text-[10px] lg:text-sm font-bold text-slate-900 leading-tight">
                        Advanced Intelligent Analysis
                      </span>
                    </div>

                    <div className="space-y-2 lg:space-y-3">
                      <div className="flex gap-2 lg:gap-3">
                        <div className="h-2 lg:h-4 w-[100px] lg:w-[180px] rounded-full bg-[#E8F0F9]" />
                        <div className="h-2 lg:h-4 w-[40px] lg:w-[80px] rounded-full bg-[#E8F0F9]" />
                      </div>
                      <div className="flex gap-2 lg:gap-3">
                        <div className="h-2 lg:h-4 w-[40px] lg:w-[80px] rounded-full bg-[#E8F0F9]" />
                        <div className="h-2 lg:h-4 w-[40px] lg:w-[80px] rounded-full bg-[#E8F0F9]" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-[16px] 
                    bg-[#FFFFFE33] pt-2 pr-2 pb-3 pl-2 h-[60px] border-b-2 
                    border-[#1B1B1B14] text-[#F59E0B] w-full max-w-[352px]">
                      <Image
                        src="/assets/landing-page-assets/key.svg"
                        alt="Key icon"
                        width={24}
                        height={24}
                      />
                      <span className="text-[8px] lg:text-[12px] font-bold 
                      uppercase tracking-[0.2em]">
                        Key Findings
                      </span>
                    </div>

                    {/* Recommendations inside the fading container flow */}
                    <div className="flex items-center gap-4 rounded-[16px] bg-[#FFFFFE33] 
                    pt-2 pr-2 pb-3 pl-2 h-[60px] border-b-2 border-[#1B1B1B14] 
                    text-emerald-500 w-full max-w-[352px]">
                      <Image
                        src="/assets/landing-page-assets/recommendation.svg"
                        alt="Recommendation icon"
                        width={24}
                        height={24}
                      />
                      <span className="text-[8px] lg:text-[12px] font-bold uppercase 
                      tracking-[0.2em]">
                        Recommendations
                      </span>
                    </div>

                  </div>
                </div>

                {/* CTA Button */}
                <div className="z-20 mt-2 lg:mt-4 w-full">
                  <Button
                    variant="brand"
                    className="w-full rounded-lg lg:rounded-xl py-4 lg:py-7 text-[10px] 
                    lg:text-sm font-bold shadow-lg transition-all bg-[#1565C0] text-white 
                    hover:bg-[#1565C0]/90"
                  >
                    Get Started
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="ml-1 lg:ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
