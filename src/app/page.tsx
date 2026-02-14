import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { FeatureDeepDives } from "@/components/feature-deep-dives";
import { EngineRoom } from "@/components/engine-room";
import { ModePreview } from "@/components/mode-preview";
import { StatsMarquee } from "@/components/stats-marquee";
import { BentoFeatures } from "@/components/bento-features";
import { FaqSection } from "@/components/faq-section";
import { FinalCta } from "@/components/final-cta";
import { MainFooter } from "@/components/main-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-500">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FeatureDeepDives />
      <EngineRoom />
      <ModePreview />
      <StatsMarquee />
      <BentoFeatures />
      <FaqSection />
      <FinalCta />
      <MainFooter />
    </main>
  );
}
