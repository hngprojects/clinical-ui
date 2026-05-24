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
      <section className="container mx-auto px-6 lg:px-12 text-center flex items-center justify-center flex-col py-12 lg:py-24 max-w-[900px] gap-8 lg:gap-12">
        {/* heroTop */}
        <div className="flex items-center justify-center flex-col relative gap-2 w-full">
          {/* heroHeading */}
          <h1 className="hero-heading font-bold text-[#1B1B1B] text-2xl md:text-3xl lg:text-[64px] leading-[1.1] tracking-tight flex flex-col items-center md:block">
            <span className="relative inline-block mb-6 md:mb-0 md:mr-4 lg:mr-6">
              Making lab results
              <div className="absolute -bottom-5 lg:-bottom-10 left-0 w-full">
                <Image
                  src="/assets/about-page-assets/hero-icon.svg"
                  alt=""
                  width={842}
                  height={40}
                  className="w-full"
                  style={{ display: 'block' }}
                />
              </div>
            </span>
            <span className="bg-[#1565C0] text-white inline-block px-4 py-1 lg:px-6 lg:py-2 rounded-lg lg:rounded-xl">
              Human.
            </span>
          </h1>
        </div>

        {/* heroSubtext */}
        <p className="text-[#5E5E5E] font-normal max-w-[780px] mx-auto text-sm lg:text-[20px] leading-[1.6] tracking-tight">
          Clinsight simplifies complex lab results, so you can focus on your health. Clinsight was
          built to bridge the gap between complex medical reports and the people who deserve to
          understand them - with clarity, empathy, and clinical rigor.
        </p>
      </section>
    </div>
  );
}
