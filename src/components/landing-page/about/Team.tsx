'use client';

import React from 'react';
import TeamImage1 from '../../../public/assets/about-page-assets/team-image1.svg';
import TeamImage2 from '../../../public/assets/about-page-assets/team-image2.png';
import TeamImage3 from '../../../public/assets/about-page-assets/team-image3.png';
import TeamImage4 from '../../../public/assets/about-page-assets/team-image4.png';
import Profile5 from '../../../public/assets/about-page-assets/team-image5.png';
import Profile6 from '../../../public/assets/about-page-assets/team-image6.png';

const ImgBlock = ({
  style,
  image,
}: {
  style?: React.CSSProperties;
  image?: any;
  radius?: string;
}) => (
  <img
    src={image?.src}
    alt=""
    style={{
      ...style,
    }}
  />
);

const team = [
  { name: 'Dr. Amara Okafor', role: 'Chief Medical Officer', pic: TeamImage1 },
  { name: 'Dr. Sandra Jordan', role: 'CEO & Co-founder', pic: TeamImage2 },
  { name: 'Dr. John Fidelis', role: 'Head of Engineering', pic: TeamImage3 },
  { name: 'Sadiq Usman', role: 'Head of Design', pic: TeamImage4 },
  { name: 'Dr. Farouk Sadiq', role: 'Clinical Lead', pic: Profile5 },
  { name: 'Fatima Gowon', role: 'Head of AI', pic: Profile6 },
];

export default function AboutTeam() {
  return (
    <>
      <style>{`
        @media (max-width: 700px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section
        className="flex items-center justify-center flex-col text-center"
        style={{ gap: '25px', padding: '80px 0px' }}
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
          THE TEAM
        </div>

        {/* teamMain */}
        <div className="flex items-center justify-center flex-col" style={{ gap: '50px' }}>
          {/* teamHeading */}
          <h2
            className="font-semibold text-[#272727]"
            style={{ fontSize: '40px', lineHeight: '120%', letterSpacing: '-2%' }}
          >
            People behind the platform
          </h2>

          {/* teamGrid */}
          <div
            className="team-grid text-left w-full"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(309px, 1fr))',
              gap: '80px',
              maxWidth: '1100px',
            }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="border border-[#F0F0F0] overflow-hidden"
                style={{ borderRadius: '12px' }}
              >
                <ImgBlock
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                  }}
                  image={member.pic}
                  radius="0"
                />

                {/* teamInfo */}
                <div
                  className="flex items-start justify-start flex-col"
                  style={{ gap: '5px', padding: '23px 24px' }}
                >
                  {/* teamName */}
                  <p
                    className="font-semibold text-[#272727]"
                    style={{ fontSize: '16px', lineHeight: '32px' }}
                  >
                    {member.name}
                  </p>

                  {/* teamRole */}
                  <p
                    className="text-[#135BAD] font-normal"
                    style={{ fontSize: '14px', lineHeight: '26px' }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
