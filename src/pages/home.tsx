import WebLayout from "../components/web-layout";
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

export default function Home() {
  return (
    <WebLayout>
      <HeroSection />
      <VeenodeWordmark mode="outline-fill" />
      <TrustBar />
      <ServicesSection />
      <DifferentiatorsSection />
      <GlobalReachSection />
      <IndustriesSection />
      <StatsSection />
      <InsightsSection />
      <CTASection />
    </WebLayout>
  );
}
