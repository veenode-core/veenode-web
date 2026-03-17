import { processSteps } from "../../data/services";

export default function HowWeWork() {
  return (
    <section className="bg-primary py-20 md:py-32 overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div className="max-w-lg">
            <p
              className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: "rgba(240,165,0,0.85)" }}
            >
              Our Process
            </p>
            <h2
              className="font-bold text-white leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Our Approach to{" "}
              <span style={{ color: "rgba(255,255,255,0.3)" }}>
                Every Engagement
              </span>
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs md:text-right"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            A consistent framework that keeps every engagement structured,
            transparent, and focused on outcomes.
          </p>
        </div>

        {/* Steps */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          {processSteps.map((step, i) => (
            <div
              key={step.number}
              className="group relative flex flex-col gap-6 p-8 md:p-10 overflow-hidden transition-colors duration-300 hover:bg-white/5"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {/* Connector arrow — desktop only, not on last item */}
              {i < processSteps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 -right-3 z-10 w-6 h-px"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <span
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "3px solid transparent",
                      borderBottom: "3px solid transparent",
                      borderLeft: "5px solid rgba(255,255,255,0.2)",
                    }}
                  />
                </div>
              )}

              {/* Step number — watermark */}
              <span
                className="font-black tabular-nums leading-none select-none"
                style={{
                  fontSize: "clamp(3rem, 8vw, 5rem)",
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.06)",
                  lineHeight: 1,
                }}
              >
                {step.number}
              </span>

              {/* Step index + title */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-[0.6rem] font-bold tracking-widest uppercase"
                  style={{ color: "rgba(240,165,0,0.7)" }}
                >
                  Step {step.number}
                </span>
                <h3
                  className="font-bold leading-snug"
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {step.title}
                </h3>
              </div>

              {/* Gold rule */}
              <div
                className="w-8 h-px"
                style={{ background: "rgba(240,165,0,0.4)" }}
              />

              {/* Description */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}