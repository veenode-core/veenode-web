import TextSplitReveal from "../ui/text-split-reveal";
import Button from "../ui/button";
import { ArrowRight } from "@phosphor-icons/react";
import { services } from "../../data/home";

export default function ServicesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
      <div className="max-w-2xl mb-16">
        <TextSplitReveal 
          text="Five Disciplines.|One Integrated Partner."
          mobileText="Five Disciplines.|One Integrated|Partner."
          className="text-3xl md:text-5xl font-bold mb-4"
          tag="h2"
        />
        <p className="text-muted text-sm md:text-base leading-relaxed">
          We go deeper than most. Whether you need to deploy an AI system,
          harden your infrastructure, govern your AI responsibly, build a
          product from scratch, or operationalise your machine learning models
          — Veenode brings the depth to do it right.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden">
        {services.map(({ icon: Icon, title, tagline, description, href }) => (
          <a
            key={title}
            href={href}
            className="group bg-white p-8 md:p-10 flex flex-col gap-5 hover:bg-[#f5f7fb] transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#0f1f45]/6 flex items-center justify-center shrink-0">
                <Icon size={20} weight="regular" className="text-primary" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-gray-700 uppercase mt-1 text-right leading-snug">
                {tagline}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#0f1f45]">{title}</h3>

            <p className="text-sm text-muted leading-relaxed flex-1">
              {description}
            </p>

            <Button 
              to={href} 
              variant="ghost" 
              size="sm"
              icon={<ArrowRight size={14} weight="bold" />}
              className="self-start mt-auto"
            >
              Learn more
            </Button>
          </a>
        ))}
      </div>
    </section>
  );
}
