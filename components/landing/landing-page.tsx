import Header from "./header"
import HeroSection from "./hero-section"
import AboutSection from "./about-section"
import SubsidiariesSection from "./subsidiaries-section"
import ServicesSection from "./services-section"
import MethodologySection from "./methodology-section"
import ValuesSection from "./values-section"
import GrowthFundsSection from "./growth-funds-section"
import VenturesSection from "./ventures-section"
import ContactSection from "./contact-section"
import Footer from "./footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="bg-black text-white">
        <HeroSection />
        <AboutSection />
        <SubsidiariesSection />
        <ServicesSection />
        <MethodologySection />
        <ValuesSection />
        <GrowthFundsSection />
        <VenturesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
