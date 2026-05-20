'use client';
export interface StepCardProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

export function StepCard({ number, title, description, index }: StepCardProps) {
  const isEven = index % 2 === 0;
  const rotationClass = isEven
    ? 'rotate-[-2.5deg] lg:-rotate-[7deg]'
    : 'rotate-[2.5deg] lg:rotate-[7deg]';

  return (
    <div
      className={`
        relative w-full bg-white rounded-[32px] 
        shadow-[0px_12px_40px_0px_rgba(0,0,0,0.08)]
        border-[0.5px] border-black/10
        p-2 lg:p-3 pt-[50px] lg:pt-[72px]
        transition-all duration-500
        ${rotationClass}
      `}
    >
      <div className="absolute top-4 lg:top-6 left-1/2 -translate-x-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-[#1565C0]/40 flex items-center justify-center bg-white z-20">
        <div className="w-7 h-7 lg:w-9 lg:h-9 bg-[#1565C0] rounded-full" />
      </div>

      <div className="w-full bg-[#F1F6FB] rounded-[24px] px-6 py-8 lg:px-9 lg:py-11 flex flex-col items-start min-h-[300px] lg:min-h-[400px]">
        <div className="bg-[#1B1B1B] rounded-[4px] px-3 py-1 mb-6">
          <span className="text-white text-3xl lg:text-5xl font-medium font-['Inter'] leading-none">
            {number}
          </span>
        </div>

        <h3 className="text-[#1B1B1B] text-xl lg:text-[30px] font-bold font-['Inter'] leading-[1.2] mb-4 tracking-tight">
          {title}
        </h3>

        <p className="text-[#1B1B1B]/80 text-sm lg:text-[18px] font-normal font-['Inter'] leading-relaxed text-left">
          {description}
        </p>
      </div>
    </div>
  );
}
