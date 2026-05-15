import { Hero } from "@/components/landing-page/how-it-works/Hero";
import { Features } from "@/components/landing-page/Features";
import { FeaturesGrid } from "@/components/landing-page/FeaturesGrid";
import HowItWorks from "@/app/how-it-works/page";
import { FAQ } from "@/components/landing-page/FAQ";
import { MedicalProfessional } from "@/components/landing-page/MedicalProfessional";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Features />
      <FeaturesGrid />
      <HowItWorks />
      <FAQ />
      <MedicalProfessional />
    </div>
  );
}
