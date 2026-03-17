import TextSplitReveal from "../ui/text-split-reveal";

const paragraphs = [
  {
    drop: true,
    text: "Veenode Technologies was founded on a simple belief: that organisations in Africa and around the world deserve access to the highest quality of technical expertise — not as a privilege, but as a standard.",
  },
  {
    drop: false,
    text: "With roots in West Africa and a team that has delivered technical projects across sectors ranging from financial services to public sector infrastructure, Veenode has built the kind of experience that only comes from doing real work in complex environments.",
  },
  {
    drop: false,
    text: "Today, we are relaunching with sharper focus, a stronger team, and a clear mandate: to be the partner of choice for any organisation that is serious about building and securing intelligent systems that perform at scale.",
  },
];

export default function StorySection() {
  return (
    <section className="bg-primary-light py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <p
          className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-12"
          style={{ color: "rgba(240,165,0,0.85)" }}
        >
          Our Story
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          {/* Left — heading, sticky on desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <TextSplitReveal
              text="Built From Experience.|Relaunched With Purpose."
              mobileText="Built From|Experience.|Relaunched|With Purpose."
              className="text-3xl md:text-5xl font-bold text-[#0f1f45] leading-[1.05] tracking-tight"
              tag="h2"
            />

            {/* Accent rule */}
            <div className="mt-8 w-12 h-px" style={{ background: "#F0A500" }} />

            {/* Founding year note */}
            <p
              className="mt-6 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "rgba(15,31,69,0.3)" }}
            >
              Est. West Africa · Global Reach
            </p>
          </div>

          {/* Right — body copy */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {paragraphs.map(({ drop, text }, i) => (
              <div key={i} className="relative">
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: "rgba(15,31,69,0.6)" }}
                >
                  {drop ? (
                    <>
                      <span
                        className="float-left mr-2 leading-none font-black text-[#0f1f45]"
                        style={{
                          fontSize: "clamp(3rem, 6vw, 4rem)",
                          lineHeight: 0.85,
                        }}
                      >
                        {text[0]}
                      </span>
                      {text.slice(1)}
                    </>
                  ) : (
                    text
                  )}
                </p>

                {/* Hairline under each paragraph */}
                {i < paragraphs.length - 1 && (
                  <div
                    className="mt-8 w-full"
                    style={{ height: "1px", background: "rgba(15,31,69,0.07)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
