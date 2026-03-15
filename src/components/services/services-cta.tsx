import Button from "../ui/button";

export default function ServicesCTA() {
  return (
    <section className="bg-white py-24 md:py-40">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-6xl font-bold text-[#0f1f45] mb-12 leading-tight">
          Talk to Us About Your Project
        </h2>
        <Button
          to="/contact"
          variant="primary"
          size="lg"
          className="bg-gold border-gold text-[#0f1f45] hover:bg-gold/90 hover:border-gold/90 min-w-[240px]"
        >
          Get in Touch
        </Button>
      </div>
    </section>
  );
}
