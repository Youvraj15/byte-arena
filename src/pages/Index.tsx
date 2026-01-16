import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";

const Index = () => {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Navbar />
      <main className="h-full pt-16">
        <HeroSection />
      </main>
    </div>
  );
};

export default Index;
