import TextSplitReveal from "../ui/text-split-reveal";
import { pillars } from "../../data/home";

export default function DifferentiatorsSection() {
  return (
    <section className="bg-primary-light py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header — left aligned, split layout */}
        <div className="max-w-3xl mb-20">
          <TextSplitReveal
            text="The Partner That Builds|and Protects."
            mobileText="The Partner|That Builds|and Protects."
            className="text-3xl md:text-5xl font-bold mb-6"
            tag="h2"
          />
          <p className="text-muted text-sm md:text-base leading-relaxed">
            Most firms do one of these things. We do all of them, and we do them
            from the same team. Our practitioners span AI engineering,
            cybersecurity, ML, software, and AI governance. For clients who are
            serious about building technology that is production-ready,
            defensible, and responsibly governed, that combination is rare — and
            it matters.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0f1f45]/10">
          {pillars.map(({ icon: Icon, number, title, body }) => (
            <div
              key={number}
              className="flex flex-col gap-6 px-0 py-10 md:py-0 md:px-10 first:pl-0 last:pr-0"
            >
              {/* Top row: icon + number */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#0f1f45]/[0.07] flex items-center justify-center">
                  <Icon size={18} weight="regular" className="text-primary" />
                </div>
                <span className="text-3xl font-bold text-[#0f1f45]/10 tabular-nums">
                  {number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-[#0f1f45] leading-snug">
                {title}
              </h3>

              {/* Divider */}
              <div className="w-8 h-px bg-gold" />

              {/* Body */}
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
