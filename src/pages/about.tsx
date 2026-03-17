import AboutHero from "../components/about/about-hero";
import StorySection from "../components/about/story-section";
import MissionValuesSection from "../components/about/mission-values-section";
import TeamSection from "../components/about/team-section";
import AboutCTASection from "../components/about/about-cta-section";

export default function About() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <MissionValuesSection />
      <TeamSection />
      <AboutCTASection />
    </>
  );
}
