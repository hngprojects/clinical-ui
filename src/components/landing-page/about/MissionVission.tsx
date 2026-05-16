'use client';

import React from 'react';
import Image from 'next/image';
import MissionImage from '../../../public/assets/about-page-assets/mission-image.svg';
import VissionImage from '../../../public/assets/about-page-assets/vision-image.svg';
import SpiralIcon from '../../../public/assets/about-page-assets/spiral-icon.svg';
import EyeIcon from '../../../public/assets/about-page-assets/eye-icon.svg';

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
    <Image
      src={image}
      alt=""
      style={{
        ...style,
      }}
    />
  );
};

export default function AboutMissionVision() {
  return (
    <>
      <style>{`
        .mission-section { flex-direction: row; }
        .vision-section { flex-direction: row; }
        @media (max-width: 700px) {
          .mission-section { flex-direction: column !important; }
          .vision-section { flex-direction: column !important; }
          .vision-image-box { order: -1; }
        }
      `}</style>

      {/* ── Middle Section ────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-center flex-wrap mx-auto"
        style={{ maxWidth: '1100px', gap: '80px', padding: '80px 0px' }}
      >
        {/* ── Mission ──────────────────────────────────────────────────────── */}
        <section className="mission-section flex items-center justify-between flex-wrap">
          {/* middleImageBox */}
          <div className="middle-image-box" style={{ flex: '1 1 500px', height: '500px' }}>
            <ImgBlock
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              image={MissionImage}
            />
          </div>

          {/* middleContent */}
          <div
            className="flex items-start justify-start flex-col"
            style={{ flex: '1 1 500px', gap: '20px', padding: '30px' }}
          >
            {/* middleIconWrap */}
            <div
              className="flex items-center justify-center bg-[#E8F0F9]"
              style={{ width: '66px', height: '66px', borderRadius: '13px', padding: '13px' }}
            >
              <Image
                src={SpiralIcon.src}
                alt="Spiral icon"
                style={{ width: '32.5px', height: '32.5px' }}
              />
            </div>

            {/* middleTagSmall */}
            <p
              className="font-medium uppercase text-[#272727]"
              style={{ fontSize: '18px', lineHeight: '100%' }}
            >
              OUR MISSION
            </p>

            {/* middleHeading */}
            <h2
              className="font-semibold text-[#272727]"
              style={{ fontSize: '40px', lineHeight: '52px' }}
            >
              Clarity for every patient.
            </h2>

            {/* middleBody */}
            <p
              className="font-normal text-[#5E5E5E]"
              style={{ fontSize: '16px', lineHeight: '26px' }}
            >
              We turn AI lab reports into plain-language summaries so that anyone regardless of
              medical background can confidently understand what their results mean.
            </p>
          </div>
        </section>

        {/* ── Vision ───────────────────────────────────────────────────────── */}
        <section className="vision-section flex items-center justify-between flex-wrap">
          {/* middleContent */}
          <div
            className="flex items-start justify-start flex-col"
            style={{ flex: '1 1 500px', gap: '20px', padding: '30px' }}
          >
            {/* middleIconWrap */}
            <div
              className="flex items-center justify-center bg-[#DEF6E7]"
              style={{ width: '66px', height: '66px', borderRadius: '13px', padding: '13px' }}
            >
              <Image
                src={EyeIcon.src}
                alt="Eye icon"
                style={{ width: '32.5px', height: '32.5px' }}
              />
            </div>

            {/* middleTagSmall */}
            <p
              className="font-medium uppercase text-[#272727]"
              style={{ fontSize: '18px', lineHeight: '100%' }}
            >
              OUR VISION
            </p>

            {/* middleHeading */}
            <h2
              className="font-semibold text-[#272727]"
              style={{ fontSize: '40px', lineHeight: '52px' }}
            >
              A world without medical confusion.
            </h2>

            {/* middleBody */}
            <p
              className="font-normal text-[#5E5E5E]"
              style={{ fontSize: '16px', lineHeight: '26px' }}
            >
              We imagine a future where every test result is paired with an explanation so patients
              actually understand, and a clinician they can reach in minutes.
            </p>
          </div>

          <div className="vision-image-box" style={{ flex: '1 1 500px', height: '500px' }}>
            <ImgBlock
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              image={VissionImage}
            />
          </div>
        </section>
      </div>
    </>
  );
}
