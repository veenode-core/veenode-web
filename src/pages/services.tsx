import ServicesHero from "../components/services/services-hero";
import ServicesGrid from "../components/services/services-grid";
import HowWeWork from "../components/services/how-we-work";
import ServicesCTA from "../components/services/services-cta";

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <HowWeWork />
      <ServicesCTA />
    </>
  );
}
