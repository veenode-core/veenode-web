import HeroSection from "../components/home/hero-section";
import TrustBar from "../components/home/trust-bar";
import ServicesSection from "../components/home/services-section";
import DifferentiatorsSection from "../components/home/differentiators-section";
import GlobalReachSection from "../components/home/global-reach-section";
import IndustriesSection from "../components/home/industries-section";
import StatsSection from "../components/home/stats-section";
import InsightsSection from "../components/home/insights-section";
import CTASection from "../components/home/cta-section";
import VeenodeWordmark from "../components/veenode-wordmark";
import StatsSectionMobile from "../components/home/stats-section-mobile";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="hidden md:block">
        <VeenodeWordmark mode="outline-fill" />
      </div>
      <TrustBar />
      <ServicesSection />
      <DifferentiatorsSection />
      <GlobalReachSection />
      <IndustriesSection />
      <div className="hidden md:block">
        <StatsSection />
      </div>
      <div className="block md:hidden">
        <StatsSectionMobile />
      </div>
      <InsightsSection />
      <CTASection />
    </>
  );
}
