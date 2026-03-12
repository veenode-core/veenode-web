import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [percent, setPercent] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const hasExited = useRef(false);

  useEffect(() => {
    const obj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        if (!hasExited.current) exit();
      },
    });

    tl.to(obj, {
      value: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(obj.value);
        setPercent(v);
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${v}%`;
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  const exit = () => {
    if (hasExited.current) return;
    hasExited.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.display = "none";
        onComplete?.();
      },
    });

    // Percent number slides down and fades
    tl.to(percentRef.current, {
      y: 80,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in",
    });

    // Progress track fades
    tl.to(
      progressTrackRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "<",
    );

    // Logo fades
    tl.to(
      logoRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "<",
    );

    // Overlay slides up to reveal site
    tl.to(
      overlayRef.current,
      {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      },
      "-=0.1",
    );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#1A3C6E" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Logo / wordmark — top left */}
      <div ref={logoRef} className="absolute top-8 left-8 md:top-12 md:left-12">
        <span
          className="text-white font-bold tracking-tight"
          style={{ fontSize: "1.125rem", opacity: 0.9 }}
        >
          Veenode
        </span>
      </div>

      {/* Center percentage */}
      <div
        ref={percentRef}
        className="relative flex items-end leading-none select-none"
        style={{ willChange: "transform, opacity" }}
      >
        <span
          className="text-white font-bold tabular-nums"
          style={{
            fontSize: "clamp(7rem, 22vw, 18rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            opacity: 0.95,
          }}
        >
          {percent}
        </span>
        <span
          className="text-white font-bold mb-4 md:mb-8"
          style={{
            fontSize: "clamp(2rem, 6vw, 5rem)",
            letterSpacing: "-0.03em",
            opacity: 0.5,
            marginLeft: "0.15em",
          }}
        >
          %
        </span>
      </div>

      {/* Progress bar — bottom */}
      <div
        ref={progressTrackRef}
        className="absolute bottom-10 md:bottom-14 left-8 right-8 md:left-12 md:right-12"
      >
        {/* Labels */}
        <div className="flex justify-between mb-3">
          <span
            className="text-white font-medium tracking-widest uppercase"
            style={{
              fontSize: "0.6875rem",
              opacity: 0.4,
              letterSpacing: "0.12em",
            }}
          >
            Loading
          </span>
          <span
            className="text-white font-medium tabular-nums"
            style={{
              fontSize: "0.6875rem",
              opacity: 0.4,
              letterSpacing: "0.06em",
            }}
          >
            {percent}%
          </span>
        </div>

        {/* Track */}
        <div
          className="w-full rounded-full overflow-hidden"
          style={{
            height: "2px",
            background: "rgba(255,255,255,0.12)",
          }}
        >
          <div
            ref={progressFillRef}
            className="h-full rounded-full"
            style={{
              width: "0%",
              background: "rgba(255,255,255,0.7)",
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
