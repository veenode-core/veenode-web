import Button from "../ui/button";
import { ArrowRight } from "@phosphor-icons/react";
import { serviceFeatures } from "../../data/services";

export default function ServicesGrid() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 space-y-32 md:space-y-48">
        {serviceFeatures.map((service, idx) => (
          <div
            key={service.id}
            className={`flex flex-col ${
              idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-12 md:gap-24 items-center`}
          >
            {/* Text Content */}
            <div className="w-full md:w-1/2 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-6 text-primary">
                <service.icon size={24} weight="bold" />
                <span className="text-xs font-bold uppercase tracking-widest leading-none mt-0.5">
                  {service.title}
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#0f1f45] mb-6 leading-tight">
                {service.headline}
              </h2>
              <p className="text-muted text-sm md:text-base leading-relaxed mb-8">
                {service.description}
              </p>
              <Button
                to={service.ctaHref}
                variant="ghost"
                icon={<ArrowRight size={18} />}
                className="pl-0 text-primary font-bold hover:translate-x-1 transition-transform"
              >
                {service.ctaText}
              </Button>
            </div>

            {/* Visual Content */}
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] bg-primary/5 rounded-3xl overflow-hidden border border-primary/10 shadow-sm relative group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-[#0f1f45]/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
