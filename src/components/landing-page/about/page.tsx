import AboutHero from '@/components/about/Hero';
import AboutMissionVision from '@/components/about/MissionVission';
import AboutStory from '@/components/about/Story';
import AboutValues from '@/components/about/Values';
import AboutTeam from '@/components/about/Team';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <main className="flex-1 flex flex-col items-center overflow-x-hidden text-base text-[#1B1B1B]">
        <AboutHero />
        <AboutStory />
        <AboutMissionVision />
        <AboutValues />
        <AboutTeam />
      </main>

      <Footer />
    </div>
  );
}
