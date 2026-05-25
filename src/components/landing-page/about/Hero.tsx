'use client';

import Image from 'next/image';

const ResponsiveStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+3:wght@400;600;700&display=swap');

    .about-hero-section { font-family: 'Source Sans 3', sans-serif; }
    `}</style>
);

export default function AboutHero() {
  return (
    <div className="about-hero-section w-full flex flex-col items-center justify-center font-sans">
      <ResponsiveStyle />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="container mx-auto text-center flex items-center justify-center flex-col py-12 lg:py-24 max-w-210.5 gap-8 lg:gap-12">
        {/* heroTop */}
        <div className="flex items-center justify-center flex-col relative gap-2 w-full">
          {/* heroHeading */}
          <h1 className="font-bold flex items-start justify-center max-sm:flex-col max-sm:items-center text-[#1B1B1B] relative text-[32px] lg:text-[64px] leading-[120%] tracking-tight gap-x-3.25 gap-y-3 wrap-break-word">
            <span className="relative inline-block pb-4 lg:pb-8">
              Making lab results
              <div className="absolute -bottom-3 lg:-bottom-4 left-0 w-full">
                <Image
                  src="/assets/about-page-assets/hero-icon.svg"
                  alt=""
                  width={542}
                  height={50}
                  className="w-full"
                  style={{ display: 'block' }}
                />
              </div>
            </span>
            <span className="bg-[#1565C0] text-white inline-block px-4 lg:px-6 rounded-lg lg:rounded-xl shrink-0">
              Human.
            </span>
          </h1>
        </div>

        {/* heroSubtext */}
        <p className="text-[#5E5E5E] font-normal max-w-195 mx-auto text-sm lg:text-[20px] leading-[162%] tracking-[-1%] px-10 sm:px-8">
          Clinsights simplifies complex lab results, so you can focus on your health. Clinsight was
          built to bridge the gap between complex medical reports and the people who deserve to
          understand them - with clarity, empathy, and clinical rigor.
        </p>
      </section>
    </div>
  );
}
