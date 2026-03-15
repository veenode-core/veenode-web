import TextSplitReveal from "../ui/text-split-reveal";
import Button from "../ui/button";

export default function AboutCTASection() {
  return (
    <section className="bg-primary py-24 md:py-40 relative overflow-hidden">
      {/* Abstract background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.02] -skew-x-12 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-white/[0.05] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <TextSplitReveal
          text="Work With a Team That|Takes Your Technology|Seriously."
          mobileText="Work With|a Team That|Takes Your|Technology|Seriously."
          className="text-3xl md:text-6xl font-bold text-white mb-12 leading-tight"
          tag="h2"
        />
        <Button
          to="/contact"
          variant="primary"
          size="lg"
          className="bg-gold border-gold text-[#0f1f45] hover:bg-gold/90 hover:border-gold/90 min-w-[240px]"
        >
          Start a Conversation
        </Button>
      </div>
    </section>
  );
}
