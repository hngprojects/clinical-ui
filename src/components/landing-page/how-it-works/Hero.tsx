"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

export function Hero() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <section className="relative overflow-x-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            className="flex-[1.4] flex flex-col items-center lg:items-start gap-6 text-center lg:text-left"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-2 rounded-full bg-[#F5F5F5] p-1 pr-4"
            >
              <div className="flex -space-x-2 overflow-hidden">
                <div className="relative h-6 w-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <Image
                    src="/assets/how-it-works/handsome-man.jpg"
                    alt="User"
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-6 w-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <Image
                    src="/assets/how-it-works/successful-entrepreneur.png"
                    alt="User"
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-6 w-6 rounded-full border-2 border-white bg-[#F5F5F5] overflow-hidden">
                  <Image
                    src="/assets/how-it-works/curly-haired-woman.jpg"
                    alt="User"
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-sm font-normal text-[#1565C0] leading-5">
                Join 1,000+ users already using Clinsight
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-3"
            >
              <h1 className="text-[32px] lg:text-[48px] font-bold font-['Inter'] leading-[1.2] tracking-[-0.02em] text-[#1B1B1B]">
                From Upload to Insight
              </h1>
              <h1 className="text-[32px] lg:text-[48px] font-bold font-['Inter'] leading-[1.2] tracking-[-0.02em] text-[#FFFFFF]">
                <span className="relative inline-block px-3 ">
                  <span className="absolute inset-0 -skew-x-2 rounded bg-[#1565C0]" />
                  <span className="relative">Here&apos;s How</span>
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[16px] lg:text-[18px] font-normal leading-[1.5] tracking-[-0.01em] text-[#494949]"
            >
              <p className="lg:whitespace-nowrap">
                Clinsight helps you turns complex medical reports into
                <br />
                clear, simple explanations using AI-assisted interpretation.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Dashboard Visual nested in Circle */}
          <motion.div
            className="relative flex-1 min-h-[400px] lg:min-h-[540px] flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative h-80 w-[320px] lg:h-[540px] lg:w-[540px] flex items-center justify-center scale-90 sm:scale-100 lg:scale-100">
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src="/assets/how-it-works/outer-inner-circle.svg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 320px, 540px"
                  className="object-contain"
                  priority
                />
              </div>
              
              <div className="absolute bottom-[2%] right-[2%] lg:bottom-[5%] lg:right-[8%] lg:left-auto z-20 w-12 h-12 lg:w-20 lg:h-20 flex items-center justify-center">
                <div className="relative w-full h-full p-2 bg-white rounded-full shadow-md border border-slate-100 lg:shadow-none lg:border-none flex items-center justify-center">
                  <Image
                    src="/assets/how-it-works/docs.svg"
                    alt="Note icon"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="absolute -left-4 lg:-left-6 top-0 bottom-0 z-20 flex w-[50px] lg:w-[84px] flex-col gap-1.5 lg:gap-2 rounded-lg lg:rounded-xl bg-white p-1 lg:p-2 shadow-lg ring-1 ring-sla
                {[
                  "/assets/how-it-works/woman-with-laptop.png",
                  "/assets/how-it-works/successful-entrepreneur.png",
                  "/assets/how-it-works/african-american-student.png",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative flex-1 w-full overflow-hidden rounded-md lg:rounded-lg"
                  >
                    <Image
                      src={src}
                      alt="User"
                      fill
                      sizes="(max-width: 1024px) 50px, 84px"
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="flex flex-1 w-full flex-col items-center justify-center rounded-md lg:rounded-lg bg-[#E8F0F9] text-center text-[8px] lg:text-[14px] font-medium font-inter leading-tight
                  User
                  <br />
                  Reports
                </div>
              </div>

              <div className="relative z-10 w-full">
                <div
                  className="rounded-t-[16px] lg:rounded-t-[24px] p-4 lg:p-8 pb-8 lg:pb-12 flex flex-col gap-2 lg:gap-3 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
                  style={{
                    borderWidth: "3px 3px 0px 3px",
                    borderStyle: "solid",
                    borderColor: "transparent",
                    backgroundImage:
                      "linear-gradient(to bottom, white, white, transparent), linear-gradient(180deg, #1565C0 0%, #F2F2F2 73.08%)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="flex h-6 w-6 lg:h-10 lg:w-10 items-center justify-center">
                      <Image
                        src="/assets/how-it-works/ai-scan.svg"
                        alt="AI Scan"
                        width={24}
                        height={24}
                        className="w-full h-full"
                      />
                    </div>
                    <span className="text-[10px] lg:text-sm font-bold text-[#1B1B1B] leading-tight">
                      Advanced Intelligent Analysis
                    </span>
                  </div>

                  <div className="space-y-2 lg:space-y-3">
                    <div className="flex gap-2 lg:gap-3">
                      <div className="h-2 lg:h-4 w-[100px] lg:w-[180px] rounded-full bg-[#E8F0F9]" />
                      <div className="h-2 lg:h-4 w-[40px] lg:w-[80px] rounded-full bg-[#E8F0F9]" />
                    </div>
                    <div className="flex gap-2 lg:gap-3">
                      <div className="h-2 lg:h-4 w-[40px] lg:w-[80px] rounded-full bg-[#E8F0F9]" />
                      <div className="h-2 lg:h-4 w-[40px] lg:w-[80px] rounded-full bg-[#E8F0F9]" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 lg:gap-4 self-stretch rounded-xl lg:rounded-2xl bg-white/20 px-3 lg:px-4 py-2 lg:py-3 shadow-[1px_2px_3px_0px_rgba(0,0,0,0.08)] border-b-2 bor
                    <div className="flex shrink-0 items-center justify-center rounded-lg bg-[#FFF7ED] p-1.5 lg:p-2">
                      <Image
                        src="/assets/how-it-works/key.svg"
                        alt="Key icon"
                        width={24}
                        height={24}
                        className="h-5 w-5 lg:h-6 lg:w-6"
                      />
                    </div>
                    <span className="font-['Inter'] text-[10px] font-medium leading-tight text-[#F59E0B] lg:text-lg">
                      Key Findings
                    </span>
                  </div>

                  {/* Recommendations Chip */}
                  <div className="flex items-center gap-3 lg:gap-4 self-stretch rounded-xl lg:rounded-2xl bg-white/20 px-3 lg:px-4 py-2 lg:py-3 shadow-[1px_2px_3px_0px_rgba(0,0,0,0.08)] border-b-2 bor
                    <div className="flex shrink-0 items-center justify-center rounded-lg bg-[#ECFDF5] p-1.5 lg:p-2">
                      <Image
                        src="/assets/how-it-works/recommendation.svg"
                        alt="Recommendation icon"
                        width={24}
                        height={24}
                        className="h-5 w-5 lg:h-6 lg:w-6"
                      />
                    </div>
                    <span className="font-['Inter'] text-[10px] font-medium leading-tight text-emerald-600 lg:text-lg">
                      Recommendations
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="z-20 -mt-6 lg:-mt-10 w-full px-4 lg:px-0">
                <Button className="w-full rounded-lg lg:rounded-xl bg-[#1565C0] py-4 lg:py-7 text-[10px] lg:text-sm text-base font-medium font-['Inter'] leading-6 hover:bg-[#0D47A1] transition-all">
                  Get Started
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    size={20}
                    className="ml-1 lg:ml-2"
                  />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
