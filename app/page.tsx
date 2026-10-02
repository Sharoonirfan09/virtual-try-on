import { AnalyticsPreview } from "@/components/AnalyticsPreview";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { BrandDashboard } from "@/components/BrandDashboard";
import { BusinessModel } from "@/components/BusinessModel";
import { CatalogueScale } from "@/components/CatalogueScale";
import { DemoExperience } from "@/components/DemoExperience";
import { EcommerceExperience } from "@/components/EcommerceExperience";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { PrivacySection } from "@/components/PrivacySection";
import { QRExperience } from "@/components/QRExperience";
import { QRManagement } from "@/components/QRManagement";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Customer experience */}
        <Hero />
        <DemoExperience />
        <HowItWorks />
        <QRExperience />
        <EcommerceExperience />
        {/* Brand opportunity */}
        <BrandDashboard />
        <CatalogueScale />
        <QRManagement />
        <AnalyticsPreview />
        <PrivacySection />
        <ArchitectureDiagram />
        <BusinessModel />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
