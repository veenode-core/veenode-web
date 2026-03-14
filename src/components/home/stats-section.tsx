import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: "6+",
    label: "Years of combined\ntechnical expertise",
    index: "01",
  },
  {
    value: "5",
    label: "Core service disciplines\nunder one roof",
    index: "02",
  },
  {
    value: "Global",
    label: "Clients across Nigeria,\nGhana, UK, US & beyond",
    index: "03",
  },
  {
    value: "100%",
    label: "Senior-led delivery on\nevery engagement",
    index: "04",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScrollWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="overflow-hidden">
      {/* Pinned horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex items-stretch will-change-transform"
        style={{ width: `${stats.length * 100}vw` }}
      >
        {stats.map(({ value, label, index }, i) => (
          <div
            key={index}
            className="relative shrink-0 flex flex-col justify-between overflow-hidden"
            style={{
              width: "100vw",
              height: "100vh",
              background: i % 2 === 0 ? "#ffffff" : "#1A3C6E",
            }}
          >
            {/* Subtle grid texture on dark panels */}
            {i % 2 !== 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "80px 80px",
                }}
              />
            )}

            {/* Index number — top left */}
            <div className="relative z-10 p-10 md:p-16">
              <span
                className="font-bold tabular-nums"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  color:
                    i % 2 === 0
                      ? "rgba(26,60,110,0.3)"
                      : "rgba(255,255,255,0.3)",
                }}
              >
                {index} / {String(stats.length).padStart(2, "0")}
              </span>
            </div>

            {/* Stat value — giant watermark center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span
                className="font-black tabular-nums leading-none"
                style={{
                  fontSize: "clamp(8rem, 28vw, 28rem)",
                  letterSpacing: "-0.04em",
                  color:
                    i % 2 === 0
                      ? "rgba(26,60,110,0.06)"
                      : "rgba(255,255,255,0.07)",
                }}
              >
                {value}
              </span>
            </div>

            {/* Foreground stat + label — bottom left */}
            <div className="relative z-10 p-10 md:p-16 flex flex-col gap-4">
              <span
                className="font-black leading-none tabular-nums"
                style={{
                  fontSize: "clamp(4rem, 14vw, 12rem)",
                  letterSpacing: "-0.04em",
                  color: i % 2 === 0 ? "#1A3C6E" : "#ffffff",
                }}
              >
                {value}
              </span>
              <p
                className="text-base md:text-lg font-medium max-w-xs leading-relaxed whitespace-pre-line"
                style={{
                  color:
                    i % 2 === 0
                      ? "rgba(26,60,110,0.55)"
                      : "rgba(255,255,255,0.55)",
                }}
              >
                {label}
              </p>
            </div>

            {/* Horizontal progress indicator — bottom right */}
            <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16 flex items-center gap-2">
              {stats.map((_, j) => (
                <span
                  key={j}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: j === i ? "24px" : "6px",
                    height: "6px",
                    background:
                      j === i
                        ? i % 2 === 0
                          ? "#1A3C6E"
                          : "#ffffff"
                        : i % 2 === 0
                          ? "rgba(26,60,110,0.2)"
                          : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
