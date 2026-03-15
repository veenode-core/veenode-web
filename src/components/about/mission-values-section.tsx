import TextSplitReveal from "../ui/text-split-reveal";
import { values } from "../../data/about";

export default function MissionValuesSection() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mission */}
        <div className="mb-32">
          <p className="text-gold text-[10px] md:text-xs uppercase tracking-[0.2em] font-inter font-bold mb-8">
            Our Mission
          </p>
          <h3 className="text-2xl md:text-4xl font-medium text-[#0f1f45] max-w-5xl leading-tight">
            "To deliver world-class AI engineering, cybersecurity, software, machine learning, and AI governance services to organisations wherever they are — with the technical depth, local intelligence, and global standards they deserve."
          </h3>
          <div className="w-20 h-1 bg-gold mt-12" />
        </div>

        {/* Values Header */}
        <div className="mb-16">
          <TextSplitReveal
            text="Core Values"
            className="text-3xl md:text-5xl font-bold text-[#0f1f45]"
            tag="h2"
          />
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-3xl overflow-hidden shadow-sm">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white p-10 md:p-14 flex flex-col gap-8 hover:bg-primary transition-colors duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                <Icon
                  size={28}
                  weight="regular"
                  className="text-primary group-hover:text-gold transition-colors"
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#0f1f45] group-hover:text-white transition-colors">
                  {title}
                </h4>
                <p className="text-muted text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
