'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutStory() {
  return (
    <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
      {/* storyContent */}
      <div className="w-full lg:flex-1 flex items-start justify-start flex-col gap-5 lg:gap-6">
        {/* sectionTag */}
        <div className="flex items-center text-[#F59E0B] font-bold uppercase tracking-wider gap-2.5 text-sm lg:text-base leading-none">
          <span className="bg-[#F59E0B] shrink-0 w-3 h-3 rounded-none" />
          OUR STORY
        </div>
        {/* storyHeading */}
        <h2 className="font-bold text-[#1B1B1B] text-2xl lg:text-5xl leading-[120%] tracking-tight break-words w-full">
          Built by clinicians,
          <br className="hidden lg:block" />
          engineers, and patients.
        </h2>

        {/* storyBody x3 */}
        <div className="flex flex-col gap-4 lg:gap-6 w-full">
          <p className="font-normal text-[#5E5E5E] text-sm lg:text-lg leading-relaxed tracking-normal">
            Clinsights started after our founders watched family members leave clinics holding lab
            printouts they couldn&apos;t read. Doctors were stretched thin. Patients were left
            guessing.
          </p>
          <p className="font-normal text-[#5E5E5E] text-sm lg:text-lg leading-relaxed tracking-normal">
            We assembled a team of physicians, product managers, and product designers to build a
            tool that explains lab results the way a trusted doctor would — calmly, clearly, and
            honestly.
          </p>
          <p className="font-normal text-[#5E5E5E] text-sm lg:text-lg leading-relaxed tracking-normal">
            Today, we serve thousands of patients and a growing network of board-certified
            clinicians who review cases on demand.
          </p>
        </div>
      </div>

      {/* storyImageBox */}
      <div className="w-full lg:flex-1 relative aspect-square lg:aspect-[4/3] max-w-full overflow-hidden rounded-3xl">
        <Image
          src={`/assets/about-page-assets/story-image.svg`}
          alt="Our Story"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
