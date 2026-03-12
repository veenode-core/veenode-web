import Navbar from "../components/navbar";
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
    <div className="bg-white min-h-screen font-sans antialiased text-[#1a1a1a] overflow-x-hidden">
      <Navbar />
      <HeroSection />

      {/* Veenode Large Text Section */}
      {/* <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="w-full flex justify-center">
          <h2
            className="font-bold text-primary leading-none tracking-tight text-center"
            style={{
              fontSize: "clamp(4rem, 20vw, 20rem)",
            }}
          >
            VEENODE
          </h2>
        </div>
      </section> */}
      <VeenodeWordmark mode="outline-fill" />

      <TrustBar />
      <ServicesSection />
      <DifferentiatorsSection />
      <GlobalReachSection />
      <IndustriesSection />
      <StatsSection />
      <InsightsSection />
      <CTASection />
    </div>
  );
}
