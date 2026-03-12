import TextSplitReveal from "../ui/text-split-reveal";

export default function StatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
      <TextSplitReveal 
        text="The Work Speaks|for Itself."
        mobileText="The Work|Speaks|for Itself."
        className="text-3xl md:text-5xl font-bold text-center mb-16"
        tag="h2"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
            6+
          </div>
          <p className="text-muted">Years of combined technical expertise</p>
        </div>
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
            5
          </div>
          <p className="text-muted">
            Core service disciplines under one roof
          </p>
        </div>
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
            Global
          </div>
          <p className="text-muted">
            Clients across Nigeria, Ghana, UK, US & beyond
          </p>
        </div>
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
            100%
          </div>
          <p className="text-muted">
            Senior-led delivery on every engagement
          </p>
        </div>
      </div>
    </section>
  );
}
