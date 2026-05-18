'use client';

import Image from 'next/image';

const ResponsiveStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+3:wght@400;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Source Sans 3', sans-serif; }

    @media (max-width: 700px) {
      .hero-heading { font-size: 1.75rem !important; }
    }
  `}</style>
);

export default function AboutHero() {
  return (
    <>
      <ResponsiveStyle />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="text-center mx-auto flex items-center justify-center flex-col"
        style={{ maxWidth: '842px', gap: '56px', padding: '80px 0px' }}
      >
        {/* heroTop */}
        <div className="flex items-start justify-start flex-col" style={{ gap: '10px' }}>
          {/* heroHeading */}
          <h1
            className="hero-heading font-bold flex items-center justify-center flex-wrap text-[#272727]"
            style={{
              fontSize: '64px',
              lineHeight: '120%',
              letterSpacing: '-2%',
              gap: '20px',
            }}
          >
            Making lab results{' '}
            <span className="bg-brand-blue text-white inline-block" style={{ padding: '10px' }}>
              Human.
            </span>
          </h1>

          <Image src={`/assets/about-page-assets/hero-icon.svg`} alt="Hero icon" />
        </div>

        {/* heroSubtext */}
        <p
          className="text-[#5E5E5E] font-normal"
          style={{
            fontSize: '20px',
            lineHeight: '150%',
            letterSpacing: '-1%',
          }}
        >
          Clinsights simplifies complex lab results, so you can focus on your health. Clinsight was
          built to bridge the gap between complex medical reports and the people who deserve to
          understand the
        </p>
      </section>
    </>
  );
}
