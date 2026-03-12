import TextSplitReveal from "../ui/text-split-reveal";
import Button from "../ui/button";

export default function CTASection() {
  return (
    <section className="bg-primary py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <TextSplitReveal 
          text="Ready to Build Something|That Lasts?"
          mobileText="Ready to Build|Something|That Lasts?"
          className="text-3xl md:text-5xl font-bold text-white mb-6"
          tag="h2"
        />
        <p className="text-white/90 text-base md:text-lg mb-8">
          Whether you have a specific project in mind or just want to explore
          what Veenode can do for your organisation, we would love to hear
          from you.
        </p>
        <Button
          to="/contact"
          variant="primary"
          size="lg"
          className="bg-gold text-primary hover:bg-gold/90"
        >
          Get in Touch
        </Button>
      </div>
    </section>
  );
}
