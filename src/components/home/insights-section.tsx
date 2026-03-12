import TextSplitReveal from "../ui/text-split-reveal";

export default function InsightsSection() {
  return (
    <section className="bg-primary-light py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <TextSplitReveal 
          text="Thinking From|the Front Lines"
          mobileText="Thinking|From the|Front Lines"
          className="text-3xl md:text-5xl font-bold text-center mb-6"
          tag="h2"
        />
        <p className="text-center text-muted text-base md:text-lg max-w-3xl mx-auto mb-12">
          Our team publishes technical perspectives on AI, cybersecurity, and
          software engineering. No filler — just insight from practitioners
          who do the work every day.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6">
              <div className="bg-light-grey h-48 rounded-lg mb-4"></div>
              <p className="text-xs text-gold font-medium mb-2">
                Coming Soon
              </p>
              <h3 className="font-bold text-lg mb-2">Blog Post Title {i}</h3>
              <p className="text-muted text-sm">
                Preview text for the blog post will appear here...
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="/insights"
            className="text-gold font-semibold hover:text-primary transition-colors"
          >
            Read Our Insights →
          </a>
        </div>
      </div>
    </section>
  );
}
