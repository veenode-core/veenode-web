import TextSplitReveal from "../ui/text-split-reveal";
import Button from "../ui/button";

export default function CTASection() {
  return (
    <section className="relative bg-primary overflow-hidden py-24 md:py-40">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Large ghost watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(8rem, 28vw, 26rem)",
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.035)",
          }}
        >
          VEENODE
        </span>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6">
        {/* Eyebrow */}
        <p
          className="text-xs font-bold tracking-widest uppercase mb-8 text-center"
          style={{ color: "rgba(240,165,0,0.8)" }}
        >
          Let's Work Together
        </p>

        <TextSplitReveal
          text="Ready to Build Something|That Lasts?"
          mobileText="Ready to Build|Something|That Lasts?"
          className="text-4xl md:text-6xl font-bold text-white text-center mb-8 leading-tight"
          tag="h2"
        />

        <p
          className="text-center text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Whether you have a specific project in mind or just want to explore
          what Veenode can do for your organisation, we would love to hear from
          you.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            to="/contact"
            variant="primary"
            size="lg"
            className="bg-gold border-gold text-[#0f1f45] hover:bg-gold/90 hover:border-gold/90 min-w-[180px]"
          >
            Get in Touch
          </Button>
          <Button to="/services" variant="cta-light" size="lg">
            Explore Services
          </Button>
        </div>
      </div>
    </section>
  );
}
