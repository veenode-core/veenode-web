import Button from "../ui/button";
import { serviceFeatures } from "../../data/services";

export default function ServicesGrid() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {serviceFeatures.map((service, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={service.id}
              className="flex flex-col md:flex-row items-stretch gap-0 mb-px"
              style={
                {
                  flexDirection: isEven ? "row" : "row-reverse",
                } as React.CSSProperties
              }
            >
              {/* ── Text panel ── */}
              <div
                className={`
                  w-full md:w-1/2 flex flex-col justify-between
                  px-8 py-14 md:px-14 md:py-20
                  ${isEven ? "md:border-r" : "md:border-l"}
                  border-b md:border-b-0
                `}
                style={{ borderColor: "rgba(15,31,69,0.08)" }}
              >
                {/* Top — icon + service label */}
                <div className="flex items-center gap-3 mb-10">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(15,31,69,0.06)" }}
                  >
                    <service.icon
                      size={17}
                      weight="regular"
                      className="text-primary"
                    />
                  </div>
                  <span
                    className="text-[0.65rem] font-bold tracking-[0.15em] uppercase"
                    style={{ color: "rgba(15,31,69,0.4)" }}
                  >
                    {service.title}
                  </span>
                  <span
                    className="ml-auto font-bold tabular-nums"
                    style={{
                      fontSize: "0.65rem",
                      color: "rgba(15,31,69,0.15)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Headline */}
                <div className="flex-1">
                  <h2
                    className="font-bold text-[#0f1f45] leading-[1.05] tracking-tight mb-6"
                    style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
                  >
                    {service.headline}
                  </h2>

                  {/* Gold rule */}
                  <div
                    className="w-10 h-px mb-6"
                    style={{ background: "#F0A500" }}
                  />

                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: "rgba(15,31,69,0.55)" }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-10">
                  <Button to={service.ctaHref} variant="cta" size="md">
                    {service.ctaText}
                  </Button>
                </div>
              </div>

              {/* ── Image panel ── */}
              <div className="w-full md:w-1/2 relative overflow-hidden group min-h-75 md:min-h-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  style={{ transform: "scale(1.04)" }}
                />

                {/* Navy tint overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                  style={{ background: "rgba(15,31,69,0.25)" }}
                />

                {/* Hover label */}
                <div className="absolute bottom-6 left-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                  <span
                    className="text-[0.6rem] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {service.title}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}