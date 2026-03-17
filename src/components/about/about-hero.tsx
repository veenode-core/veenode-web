import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutHero() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    gsap.set([eyebrowRef.current, headingRef.current, bodyRef.current], {
      yPercent: 30,
      opacity: 0,
    });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

    tl.to(
      lineRef.current,
      { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
      0,
    )
      .to(eyebrowRef.current, { yPercent: 0, opacity: 1, duration: 0.7 }, 0.15)
      .to(headingRef.current, { yPercent: 0, opacity: 1, duration: 0.9 }, 0.3)
      .to(bodyRef.current, { yPercent: 0, opacity: 1, duration: 0.7 }, 0.5);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 pb-20 md:pb-28">
      {/* Top rule */}
      <div
        ref={lineRef}
        className="w-full mb-10"
        style={{ height: "1px", background: "rgba(15,31,69,0.1)" }}
      />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        {/* Left — eyebrow + heading */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <p
            ref={eyebrowRef}
            className="text-[0.65rem] font-bold tracking-[0.2em] uppercase"
            style={{ color: "rgba(240,165,0,0.85)" }}
          >
            About Veenode
          </p>

          <h1
            ref={headingRef}
            className="font-bold leading-[1.05] tracking-tight text-[#0f1f45]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            We Are Veenode{" "}
            <span style={{ color: "rgba(15,31,69,0.25)" }}>Technologies.</span>
          </h1>
        </div>

        {/* Right — body copy, pinned to baseline on desktop */}
        <p
          ref={bodyRef}
          className="text-sm md:text-base leading-relaxed max-w-sm md:text-right"
          style={{ color: "rgba(15,31,69,0.5)" }}
        >
          A professional services firm built for the era of AI — combining
          engineering depth, security expertise, and genuine global ambition.
        </p>
      </div>
    </section>
  );
}
