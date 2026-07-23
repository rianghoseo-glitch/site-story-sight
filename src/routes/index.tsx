import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FounderSection from "@/components/FounderSection";
import TeamSection from "@/components/TeamSection";
import PricingSection from "@/components/PricingSection";
import AddOnServices from "@/components/AddOnServices";
import CustomPackageSection from "@/components/CustomPackageSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <FounderSection />
        <TeamSection />
        <PricingSection />
        <AddOnServices />
        <CustomPackageSection />

        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
