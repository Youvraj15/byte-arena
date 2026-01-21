import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { VideoSection } from "@/components/landing/VideoSection";
import { ContestsSection } from "@/components/landing/ContestsSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <VideoSection />
        <ContestsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
