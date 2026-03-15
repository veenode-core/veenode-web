import { processSteps } from "../../data/services";

export default function HowWeWork() {
  return (
    <section className="bg-primary-light py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mb-16 md:mb-24">
          <p className="text-primary text-[10px] md:text-sm uppercase tracking-[0.2em] font-inter font-bold mb-6">
            Our Process
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f1f45] leading-tight">
            Our Approach to Every Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-px md:bg-[#0f1f45]/10 rounded-3xl overflow-hidden">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="bg-primary-light md:bg-white p-8 md:p-10 flex flex-col gap-6 group hover:bg-[#0f1f45] transition-colors duration-500"
            >
              <span className="text-3xl font-black text-[#0f1f45]/10 group-hover:text-gold/20 transition-colors tabular-nums leading-none">
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-[#0f1f45] group-hover:text-white transition-colors">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
