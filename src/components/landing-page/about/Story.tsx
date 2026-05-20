'use client';

import React from 'react';
import Image from 'next/image';

const ImgBlock = ({
  style,
  image,
}: {
  style?: React.CSSProperties;
  image?: string;
  radius?: string;
}) => {
  if (!image) return null;

  return (
    <div className="relative" style={style}>
      <Image src={image} alt="" fill className="object-contain" />
    </div>
  );
};

export default function AboutStory() {
  return (
    <>
      <style>{`
        .story-section { flex-direction: row; }
        @media (max-width: 700px) {
          .story-section { flex-direction: column !important; }
        }
      `}</style>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <section
        className="story-section flex items-center justify-between flex-wrap mx-auto"
        style={{ maxWidth: '1100px', gap: '50px', padding: '80px 0px' }}
      >
        {/* storyContent */}
        <div
          className="flex items-start justify-start flex-col"
          style={{ flex: '1 1 500px', gap: '25px' }}
        >
          {/* sectionTag */}
          <div
            className="flex items-center text-[#F59E0B] font-medium uppercase"
            style={{ gap: '10px', fontSize: '20px', lineHeight: '100%' }}
          >
            <span
              className="bg-[#F59E0B] shrink-0"
              style={{ width: '15px', height: '15px', borderRadius: '2px' }}
            />
            OUR STORY
          </div>

          {/* storyHeading */}
          <h2
            className="font-semibold text-[#272727]"
            style={{
              fontSize: '40px',
              lineHeight: '120%',
              letterSpacing: '-2%',
            }}
          >
            Built by clinicians,
            <br />
            engineers, and patients.
          </h2>

          {/* storyBody x3 */}
          <p
            className="font-normal text-[#5E5E5E]"
            style={{ fontSize: '16px', lineHeight: '150%', letterSpacing: '-1%' }}
          >
            Clinsights started after our founders watched family members leave clinics holding lab
            printouts they couldn&apos;t read. Doctors were stretched thin. Patients were left
            guessing.
          </p>
          <p
            className="font-normal text-[#5E5E5E]"
            style={{ fontSize: '16px', lineHeight: '150%', letterSpacing: '-1%' }}
          >
            We assembled a team of physicians, product managers, and product designers to build a
            tool that explains lab results the way a trusted doctor would — calmly, clearly, and
            honestly.
          </p>
          <p
            className="font-normal text-[#5E5E5E]"
            style={{ fontSize: '16px', lineHeight: '150%', letterSpacing: '-1%' }}
          >
            Today, we serve thousands of patients and a growing network of board-certified
            clinicians who review cases on demand.
          </p>
        </div>

        {/* storyImageBox */}
        <div style={{ flex: '1 1 450px', height: '450px' }}>
          <ImgBlock
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            image={`/assets/about-page-assets/story-image.svg`}
          />
        </div>
      </section>
    </>
  );
}
