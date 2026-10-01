import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import MentorsSection from "@/components/home/MentorsSection";
import EventsSection from "@/components/home/EventsSection";
import StoriesSection from "@/components/home/StoriesSection";
import CTASection from "@/components/home/CTASection";
import FooterSection from "@/components/shared/footer/page";
import Navbar from "@/components/shared/navbar/page";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <HeroSection />
      <FeaturesSection />
      <MentorsSection />
      <EventsSection />
      <StoriesSection />
      <CTASection />
      
    </div>
  );
}