import TextSplitReveal from "../ui/text-split-reveal";
import { industries } from "../../data/home";
import {
  Bank,
  Heart,
  Broadcast,
  ShieldCheck,
  Lightning,
  HandHeart,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

const industryIcons: Record<string, Icon> = {
  "Financial Services & Fintech": Bank,
  Telecommunications: Broadcast,
  "Healthcare & Life Sciences": Heart,
  "Government & Public Sector": ShieldCheck,
  "Energy & Utilities": Lightning,
  "International Organisations & NGOs": HandHeart,
};

function getIcon(name: string): Icon {
  return industryIcons[name] ?? Bank;
}

export default function IndustriesSection() {
  return (
    <section className="bg-light-grey py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-md">
            <TextSplitReveal
              text="Industries We Serve"
              className="text-3xl md:text-5xl font-bold"
              tag="h2"
            />
          </div>
          <p className="text-muted text-sm max-w-xs md:text-right leading-relaxed">
            Deep domain knowledge across the sectors that matter most to
            Africa's growth and the global economy.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 rounded-2xl overflow-hidden"
          style={{ gap: "1px", background: "rgba(15,31,69,0.08)" }}
        >
          {industries.map((industry: string, idx: number) => {
            const Icon = getIcon(industry);
            return (
              <div
                key={idx}
                className="group bg-light-grey hover:bg-white transition-colors duration-200 flex items-center gap-4 px-6 py-5"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0f1f45]/6 group-hover:bg-primary group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <Icon
                    size={17}
                    weight="regular"
                    className="text-primary group-hover:text-white transition-colors duration-200"
                  />
                </div>
                <p className="text-sm font-semibold text-[#0f1f45] leading-snug">
                  {industry}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
