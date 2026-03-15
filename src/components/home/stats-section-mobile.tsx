import TextSplitReveal from "../ui/text-split-reveal";

const stats = [
  { value: "6+", label: "Years of combined technical expertise", index: "01" },
  { value: "5", label: "Core service disciplines under one roof", index: "02" },
  {
    value: "Global",
    label: "Clients across Nigeria, Ghana, UK, US & beyond",
    index: "03",
  },
  {
    value: "100%",
    label: "Senior-led delivery on every engagement",
    index: "04",
  },
];

export default function StatsSectionMobile() {
  return (
    <section className="bg-white py-20">
      <div className="px-6 mb-12">
        <TextSplitReveal
          text="The Work Speaks|for Itself."
          className="text-3xl font-bold"
          tag="h2"
        />
      </div>
      <div className="flex flex-col">
      {stats.map(({ value, label, index }, i) => {
        const isDark = i % 2 !== 0;
        const fg = isDark ? "#ffffff" : "#1A3C6E";
        const fgMuted = isDark
          ? "rgba(255,255,255,0.55)"
          : "rgba(26,60,110,0.55)";
        const bg = isDark ? "#1A3C6E" : "#ffffff";

        return (
          <div
            key={index}
            className="relative flex flex-col justify-between overflow-hidden px-8 py-14"
            style={{ background: bg, minHeight: "55vw" }}
          >
            {/* Grid texture on dark panels */}
            {isDark && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
            )}

            {/* Index */}
            <span
              className="relative z-10 font-bold tabular-nums mb-8"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                color: isDark ? "rgba(255,255,255,0.3)" : "rgba(26,60,110,0.3)",
              }}
            >
              {index} / {String(stats.length).padStart(2, "0")}
            </span>

            {/* Stat + label */}
            <div className="relative z-10 flex flex-col gap-3">
              <span
                className="font-black leading-none tabular-nums"
                style={{
                  fontSize: "clamp(4.5rem, 22vw, 8rem)",
                  letterSpacing: "-0.04em",
                  color: fg,
                }}
              >
                {value}
              </span>
              <p
                className="text-sm font-medium leading-relaxed max-w-55"
                style={{ color: fgMuted }}
              >
                {label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
    </section>
  );
}