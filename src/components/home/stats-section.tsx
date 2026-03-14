import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "6+", label: "Years of combined\ntechnical expertise", index: "01" },
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
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isDesktop = window.innerWidth >= 768;

    if (!isDesktop) {
      // Mobile — ensure everything is in normal vertical flow, nothing else
      track.style.flexDirection = "column";
      track.style.width = "100%";
      panelRefs.current.forEach((p) => {
        if (!p) return;
        p.style.width = "100%";
        p.style.height = "auto";
      });
      return;
    }

    // Desktop — set panel and track to viewport dimensions then pin + scroll
    panelRefs.current.forEach((p) => {
      if (!p) return;
      p.style.width = "100vw";
      p.style.height = "100vh";
    });

    track.style.width = `${stats.length * 100}vw`;

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
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row will-change-transform"
      >
        {stats.map(({ value, label, index }, i) => {
          const isDark = i % 2 !== 0;
          const fg = isDark ? "#ffffff" : "#1A3C6E";
          const fgMuted = isDark
            ? "rgba(255,255,255,0.55)"
            : "rgba(26,60,110,0.55)";
          const fgGhost = isDark
            ? "rgba(255,255,255,0.07)"
            : "rgba(26,60,110,0.06)";
          const bg = isDark ? "#1A3C6E" : "#ffffff";

          return (
            <div
              key={index}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="relative shrink-0 flex flex-col justify-between overflow-hidden py-14 md:py-0"
              style={{ background: bg }}
            >
              {/* Grid texture — dark panels only */}
              {isDark && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                  }}
                />
              )}

              {/* Index — top left */}
              <div className="relative z-10 px-8 md:px-16 pt-2 md:pt-16">
                <span
                  className="font-bold tabular-nums"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    color: isDark
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(26,60,110,0.3)",
                  }}
                >
                  {index} / {String(stats.length).padStart(2, "0")}
                </span>
              </div>

              {/* Ghost watermark — desktop only */}
              <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none select-none">
                <span
                  className="font-black tabular-nums leading-none"
                  style={{
                    fontSize: "clamp(8rem, 28vw, 28rem)",
                    letterSpacing: "-0.04em",
                    color: fgGhost,
                  }}
                >
                  {value}
                </span>
              </div>

              {/* Stat + label — bottom */}
              <div className="relative z-10 px-8 md:px-16 pb-2 md:pb-16 flex flex-col gap-3 md:gap-4 mt-6 md:mt-0">
                <span
                  className="font-black leading-none tabular-nums"
                  style={{
                    fontSize: "clamp(4rem, 14vw, 12rem)",
                    letterSpacing: "-0.04em",
                    color: fg,
                  }}
                >
                  {value}
                </span>
                <p
                  className="text-sm md:text-lg font-medium max-w-xs leading-relaxed whitespace-pre-line"
                  style={{ color: fgMuted }}
                >
                  {label}
                </p>
              </div>

              {/* Progress dots — desktop only */}
              <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16 hidden md:flex items-center gap-2">
                {stats.map((_, j) => (
                  <span
                    key={j}
                    className="block rounded-full"
                    style={{
                      width: j === i ? "24px" : "6px",
                      height: "6px",
                      background:
                        j === i
                          ? fg
                          : isDark
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(26,60,110,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}