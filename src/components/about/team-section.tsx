import TextSplitReveal from "../ui/text-split-reveal";
import { LinkedinLogo, ArrowUpRight } from "@phosphor-icons/react";
import { team } from "../../data/about";

export default function TeamSection() {
  return (
    <section className="bg-light-grey py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <p
              className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: "rgba(240,165,0,0.85)" }}
            >
              The Team
            </p>
            <TextSplitReveal
              text="The People|Behind the Work"
              mobileText="The People|Behind|the Work"
              className="text-3xl md:text-5xl font-bold text-[#0f1f45]"
              tag="h2"
            />
          </div>
          <p className="text-muted text-sm leading-relaxed max-w-sm md:text-right">
            Senior practitioners lead every engagement. The experts you speak
            with are the experts who do the work.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0f1f45]/8 rounded-2xl overflow-hidden">
          {team.map(({ name, title, bio, linkedin, photo }) => (
            <div
              key={name}
              className="group relative flex flex-col bg-light-grey hover:bg-white transition-colors duration-300 overflow-hidden"
            >
              {/* Photo */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src={photo}
                  alt={name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-[1.03]"
                />

                {/* Dark gradient overlay — always present, deepens on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,31,69,0.75) 0%, rgba(15,31,69,0.1) 50%, transparent 100%)",
                  }}
                />

                {/* Name + title overlaid on photo bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-white font-bold text-base leading-tight">
                    {name}
                  </h3>
                  <p
                    className="text-[0.65rem] font-bold tracking-widest uppercase mt-1"
                    style={{ color: "rgba(240,165,0,0.9)" }}
                  >
                    {title}
                  </p>
                </div>

                {/* LinkedIn — slides in on hover */}
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 z-10"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(6px)",
                  }}
                  aria-label={`${name} on LinkedIn`}
                >
                  <LinkedinLogo size={16} weight="fill" />
                </a>
              </div>

              {/* Bio */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "rgba(15,31,69,0.55)" }}
                >
                  {bio}
                </p>

                {/* Footer row */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid rgba(15,31,69,0.07)" }}
                >
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold tracking-widest uppercase transition-opacity hover:opacity-60"
                    style={{ color: "rgba(15,31,69,0.4)" }}
                  >
                    LinkedIn
                    <ArrowUpRight size={11} weight="bold" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}