"use client";
import { motion } from "motion/react";
import { StepCard } from "./StepCard";

const steps = [
  { n: "01", t: "Upload Results", d: "Simply drag and drop your lab results—whether it’s a PDF or a clear image—and we’ll securely take it from there." },
  { n: "02", t: "We Extract Your Data", d: "Our system carefully reads your report and pulls out the key health markers, organising everything clearly." },
  { n: "03", t: "View Your Insights", d: "We turn complex medical data into simple, easy-to-understand insights—highlighting what’s normal." },
  { n: "04", t: "Request a Doctor’s Review", d: "If you’d like extra reassurance, you can request a review from a verified doctor." },
  { n: "05", t: "Choose & Complete Your Request", d: "Get matched with an available doctor or choose one yourself." },
];

const desktopPositions = [
  "lg:top-[0%] lg:right-[5%]",
  "lg:top-[20%] lg:left-[5%]",
  "lg:top-[40%] lg:right-[5%]",
  "lg:top-[60%] lg:left-[5%]",
  "lg:top-[80%] lg:right-[5%]",
];

export function ProcessPath() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6 relative max-w-[1200px]">
        
        <div className="relative flex flex-col gap-14 lg:block lg:h-[2500px] lg:w-full mt-10">
          
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* MOBILE DASHED LINE - Tighter, more dots */}
            <motion.path
              className="lg:hidden"
              d="M 30 0 C 30 10, 70 10, 70 20 C 70 30, 30 30, 30 40 C 30 50, 70 50, 70 60 C 70 70, 30 70, 30 80"
              fill="none"
              stroke="#1565C0"
              strokeWidth="2.5"
              strokeDasharray="6 10" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              vectorEffect="non-scaling-stroke"
            />

            {/* DESKTOP DASHED LINE - Tighter, more dots */}
            <motion.path
              className="hidden lg:block"
              d="M 72 0 C 72 10, 28 10, 28 20 C 28 30, 72 30, 72 40 C 72 50, 28 50, 28 60 C 28 70, 72 70, 72 80"
              fill="none"
              stroke="#1565C0"
              strokeWidth="2"
              strokeDasharray="2 1" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {steps.map((step, idx) => {
            const isRightSide = idx % 2 !== 0; 
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={`
                  relative z-10 w-full flex
                  ${isRightSide ? 'justify-end' : 'justify-start'}
                  lg:absolute lg:w-[400px] 
                  ${desktopPositions[idx]}
                `}
              >
                <div className="w-[90%] max-w-[320px] lg:max-w-none lg:w-full">
                  <StepCard
                    index={idx}
                    number={step.n}
                    title={step.t}
                    description={step.d}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}