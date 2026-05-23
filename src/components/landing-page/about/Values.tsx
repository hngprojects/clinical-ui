'use client';

import React from 'react';
import Image from 'next/image';

const values = [
  {
    icon: `/assets/about-page-assets/heart-icon.svg`,
    title: 'Empathy',
    desc: 'We design for the worried patient, not the spec sheet.',
    bg: '#E8F0F9',
    iconColor: '#1565C0',
  },
  {
    icon: `/assets/about-page-assets/shield-icon.svg`,
    title: 'Privacy',
    desc: 'Your medical data stays yours, encrypted and safe.',
    bg: '#DEF6E7',
    iconColor: '#22C55E',
  },
  {
    icon: `/assets/about-page-assets/star-icon.svg`,
    title: 'Clarity',
    desc: 'Plain language always wins over medical jargon.',
    bg: '#F3E8FF',
    iconColor: '#A855F7',
  },
  {
    icon: `/assets/about-page-assets/check-icon.svg`,
    title: 'Rigor',
    desc: 'Every workflow is reviewed by licensed clinicians.',
    bg: '#F5F5F5',
    iconColor: '#767676',
  },
];

export default function AboutValues() {
  return (
    <section className="w-full">
      {/* valuesTagWrap - White background full width */}
      <div className="w-full bg-white">
        <div className="container mx-auto px-6 lg:px-12 pt-12 lg:pt-24 pb-4 lg:pb-12">
          <div className="flex items-center text-[#F59E0B] font-bold uppercase tracking-wider gap-2.5 text-sm lg:text-base leading-none">
            <span className="bg-[#F59E0B] shrink-0 w-3 h-3 rounded-none" />
            OUR VALUES
          </div>
        </div>
      </div>

      {/* valuesContent - Grey background full width */}
      <div className="bg-[#F9FAFB] py-12 lg:py-24 w-full">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center gap-12 lg:gap-20">
          {/* valuesHeadingWrap */}
          <div className="flex flex-col items-center relative gap-4 lg:gap-8 w-full max-w-[800px]">
            {/* squiggle above heading */}
            <div className="absolute -top-4 lg:-top-5 -left-5 lg:-left-5 w-12 lg:w-16 h-8 lg:h-12">
              <Image
                src="/assets/about-page-assets/values-icon.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            {/* valuesHeading */}
            <h2 className="font-bold text-[#1B1B1B] text-center text-3xl lg:text-5xl leading-[120%] tracking-tight break-words w-full relative z-10">
              What guides every decision made
            </h2>
          </div>

          {/* valuesGrid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 w-full">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-[#F0F0F0] flex flex-col items-start gap-4 lg:gap-5 p-6 lg:p-8 rounded-2xl shadow-sm"
              >
                {/* valueIconWrap */}
                <div
                  className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-full shrink-0"
                  style={{ backgroundColor: v.bg }}
                >
                  <Image
                    src={v.icon}
                    alt={v.title}
                    width={24}
                    height={24}
                    className="lg:w-7 lg:h-7"
                  />
                </div>

                <div className="flex flex-col gap-2 lg:gap-4">
                  {/* valueTitle */}
                  <p className="font-bold text-[#1B1B1B] text-lg lg:text-2xl leading-tight">
                    {v.title}
                  </p>

                  {/* valueDesc */}
                  <p className="font-normal text-[#5E5E5E] text-sm lg:text-lg leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
