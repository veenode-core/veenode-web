"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type WordmarkMode = "reveal" | "outline-fill" | "parallax";

interface VeenodeWordmarkProps {
  mode?: WordmarkMode;
  className?: string;
}

// ─── MODE 1: Clip reveal ─────────────────────────────────────────────────────
function RevealWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars =
      containerRef.current?.querySelectorAll<HTMLElement>(".char-inner");
    if (!chars?.length) return;

    gsap.set(chars, { yPercent: 110 });

    const trigger = gsap.to(chars, {
      yPercent: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.06,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <h2
        className="font-bold text-primary leading-none tracking-tight flex"
        style={{ fontSize: "clamp(4rem, 20vw, 20rem)" }}
        aria-label="VEENODE"
      >
        {"VEENODE".split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ lineHeight: 1.08 }}
          >
            <span className="char-inner inline-block">{letter}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}

// ─── MODE 2: Outline → filled on scroll ──────────────────────────────────────
function OutlineFillWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const fillRef = useRef<SVGTextElement>(null);
  const clipRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const clip = clipRef.current;
    if (!fill || !clip) return;

    // Start clip rect at zero width — filled text hidden
    gsap.set(clip, { attr: { width: 0 } });

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "top 20%",
      scrub: 1.2,
      onUpdate: (self) => {
        const svgEl = svgRef.current;
        if (!svgEl) return;
        const totalWidth = svgEl.viewBox.baseVal.width;
        gsap.set(clip, {
          attr: { width: totalWidth * self.progress },
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      {/*
        Two SVG text layers stacked:
        1. Outlined text (always visible as base)
        2. Filled text revealed left-to-right via clipPath as user scrolls
      */}
      <svg
        ref={svgRef}
        viewBox="0 0 1000 220"
        className="w-full"
        style={{ overflow: "visible" }}
        aria-label="VEENODE"
      >
        <defs>
          <clipPath id="fill-reveal">
            <rect ref={clipRef} x="0" y="0" width="0" height="220" />
          </clipPath>
        </defs>

        {/* Layer 1 — outline base, always visible */}
        <text
          x="500"
          y="185"
          textAnchor="middle"
          fontWeight="800"
          fontSize="200"
          letterSpacing="-4"
          fill="transparent"
          stroke="#1A3C6E"
          strokeWidth="3"
          style={{ fontFamily: "inherit" }}
        >
          VEENODE
        </text>

        {/* Layer 2 — filled, revealed by clip rect on scroll */}
        <text
          ref={fillRef}
          x="500"
          y="185"
          textAnchor="middle"
          fontWeight="800"
          fontSize="200"
          letterSpacing="-4"
          fill="#1A3C6E"
          clipPath="url(#fill-reveal)"
          style={{ fontFamily: "inherit" }}
        >
          VEENODE
        </text>
      </svg>
    </div>
  );
}

// ─── MODE 3: Mouse parallax — 3 layers ───────────────────────────────────────
function ParallaxWordmark() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Separate x/y refs per layer to avoid transform conflicts
  const posRef = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const pos = posRef.current;
    const layers = [
      { el: layer1Ref.current, depth: 7 },
      { el: layer2Ref.current, depth: 20 },
      { el: layer3Ref.current, depth: 38 },
    ];

    const onMove = (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const r = wrapper.getBoundingClientRect();
      pos.x = (e.clientX - (r.left + r.width / 2)) / r.width;
      pos.y = (e.clientY - (r.top + r.height / 2)) / r.height;
    };

    const tick = () => {
      pos.cx += (pos.x - pos.cx) * 0.055;
      pos.cy += (pos.y - pos.cy) * 0.055;

      layers.forEach(({ el, depth }) => {
        if (!el) return;
        const dx = pos.cx * depth;
        const dy = pos.cy * depth;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const fontSize = "clamp(4rem, 20vw, 20rem)";
  const sharedStyle: React.CSSProperties = {
    fontSize,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 1,
    whiteSpace: "nowrap",
    userSelect: "none",
    willChange: "transform",
    // Each layer is in normal flow inside the stack — positioned by the flex container
    position: "absolute",
  };

  return (
    // Outer div establishes the mouse tracking area and height
    <div
      ref={wrapperRef}
      className="w-full flex justify-center items-center relative"
      style={{ height: "clamp(5rem, 22vw, 22rem)" }}
    >
      {/* Layer 1 — back ghost, barely moves */}
      <div
        ref={layer1Ref}
        style={{
          ...sharedStyle,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(26,60,110,0.15)",
        }}
      >
        VEENODE
      </div>

      {/* Layer 2 — mid outline, medium movement */}
      <div
        ref={layer2Ref}
        style={{
          ...sharedStyle,
          color: "transparent",
          WebkitTextStroke: "2px rgba(26,60,110,0.4)",
        }}
      >
        VEENODE
      </div>

      {/* Layer 3 — solid fill, most movement */}
      <div ref={layer3Ref} style={{ ...sharedStyle, color: "#1A3C6E" }}>
        VEENODE
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function VeenodeWordmark({
  mode = "reveal",
  className = "",
}: VeenodeWordmarkProps) {
  return (
    <section className={`max-w-7xl mx-auto px-6 py-16 md:py-24 ${className}`}>
      {mode === "reveal" && <RevealWordmark />}
      {mode === "outline-fill" && <OutlineFillWordmark />}
      {mode === "parallax" && <ParallaxWordmark />}
    </section>
  );
}
