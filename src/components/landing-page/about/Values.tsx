'use client';

import Image from 'next/image';
import ValuesIcon from '@/public/assets/about-page-assets/values-icon.svg';
import HeartIcon from '@/public/assets/about-page-assets/heart-icon.svg';
import ShieldIcon from '@/public/assets/about-page-assets/shield-icon.svg';
import StarIcon from '@/public/assets/about-page-assets/star-icon.svg';
import CheckIcon from '@/public/assets/about-page-assets/check-icon.svg';

const values = [
  {
    icon: HeartIcon,
    title: 'Empathy',
    desc: 'We design for the worried patient, not the spec sheet.',
    bg: '#E8F0F9',
  },
  {
    icon: ShieldIcon,
    title: 'Privacy',
    desc: 'Your medical data stays yours, encrypted and safe.',
    bg: '#DEF6E7',
  },
  {
    icon: StarIcon,
    title: 'Clarity',
    desc: 'Plain language always wins over medical jargon.',
    bg: '#CC34FF1A',
  },
  {
    icon: CheckIcon,
    title: 'Rigor',
    desc: 'Every workflow is reviewed by licensed clinicians.',
    bg: '#F5F5F5',
  },
];

export default function AboutValues() {
  return (
    <>
      <style>{`
        @media (max-width: 700px) {
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section
        className="bg-[#F5F5F5] text-center flex items-center justify-center flex-col w-full"
        style={{ padding: '60px 80px', gap: '50px' }}
      >
        {/* valuesContent */}
        <div className="flex items-center justify-center flex-col" style={{ gap: '30px' }}>
          {/* sectionTag */}
          <div
            className="flex items-center text-[#F59E0B] font-medium uppercase"
            style={{ gap: '10px', fontSize: '20px', lineHeight: '100%' }}
          >
            <span
              className="bg-[#F59E0B] shrink-0"
              style={{ width: '15px', height: '15px', borderRadius: '2px' }}
            />
            OUR VALUES
          </div>

          {/* valuesHeading */}
          <h2
            className="font-semibold text-[#272727] flex items-start justify-start flex-wrap"
            style={{
              fontSize: '40px',
              lineHeight: '120%',
              letterSpacing: '-2%',
            }}
          >
            <Image src={ValuesIcon.src} alt="icon" style={{ transform: 'translateY(-20px)' }} />
            What guides every decision made
          </h2>
        </div>

        {/* valuesGrid */}
        <div
          className="values-grid"
          style={{
            maxWidth: '1280px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            textAlign: 'left',
          }}
        >
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white border border-[#F0F0F0] flex items-start justify-start flex-col"
              style={{ borderRadius: '12px', gap: '15px', padding: '30px' }}
            >
              {/* valueIconWrap */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '13px',
                  padding: '10px',
                  backgroundColor: v.bg,
                }}
              >
                <Image src={v.icon.src} alt={v.title} style={{ width: '25px', height: '25px' }} />
              </div>

              {/* valueTitle */}
              <p
                className="font-semibold text-[#272727]"
                style={{ fontSize: '20px', lineHeight: '32px' }}
              >
                {v.title}
              </p>

              {/* valueDesc */}
              <p
                className="font-normal text-[#272727]"
                style={{ fontSize: '16px', lineHeight: '26px' }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
