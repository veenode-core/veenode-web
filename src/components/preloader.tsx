import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingStates {
  dom: boolean;
  images: boolean;
  fonts: boolean;
  minTime: boolean;
}

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [percent, setPercent] = useState(0);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    dom: false,
    images: false,
    fonts: false,
    minTime: false,
  });
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const hasExited = useRef(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Monitor actual page loading
  useEffect(() => {
    const MAX_LOAD_TIME = 5000;
    const MIN_DISPLAY_TIME = 1000;

    // Force complete after max time (edge case: slow connection)
    const maxTimeout = setTimeout(() => {
      setLoadingStates({
        dom: true,
        images: true,
        fonts: true,
        minTime: true,
      });
    }, MAX_LOAD_TIME);

    // Minimum display time
    const minTimeout = setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, minTime: true }));
    }, MIN_DISPLAY_TIME);

    // 1. Check DOM ready state
    const checkDOMReady = () => {
      if (document.readyState === "complete") {
        setLoadingStates((prev) => ({ ...prev, dom: true }));
      } else {
        window.addEventListener("load", () => {
          setLoadingStates((prev) => ({ ...prev, dom: true }));
        });
      }
    };

    // 2. Track all images
    const trackImages = () => {
      const images = Array.from(document.querySelectorAll("img"));
      
      if (images.length === 0) {
        setLoadingStates((prev) => ({ ...prev, images: true }));
        return;
      }

      const imagePromises = images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Don't block on errors
        });
      });

      Promise.all(imagePromises)
        .then(() => setLoadingStates((prev) => ({ ...prev, images: true })))
        .catch(() => setLoadingStates((prev) => ({ ...prev, images: true })));
    };

    // 3. Track fonts
    const trackFonts = () => {
      if ("fonts" in document) {
        document.fonts.ready
          .then(() => setLoadingStates((prev) => ({ ...prev, fonts: true })))
          .catch(() => setLoadingStates((prev) => ({ ...prev, fonts: true })));
      } else {
        // Fallback if fonts API not supported
        setLoadingStates((prev) => ({ ...prev, fonts: true }));
      }
    };

    checkDOMReady();
    trackImages();
    trackFonts();

    return () => {
      clearTimeout(maxTimeout);
      clearTimeout(minTimeout);
    };
  }, []);

  // Update progress based on loading states
  useEffect(() => {
    const completedStates = Object.values(loadingStates).filter(Boolean).length;
    const totalStates = Object.keys(loadingStates).length;
    const targetPercent = Math.round((completedStates / totalStates) * 100);

    // Animate to target percent
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const obj = { value: percent };
    animationRef.current = gsap.to(obj, {
      value: targetPercent,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        const v = Math.round(obj.value);
        setPercent(v);
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${v}%`;
        }
      },
    });

    // Check if all states are complete
    if (completedStates === totalStates && !hasExited.current) {
      // Small delay before exit for smooth UX
      setTimeout(() => {
        if (!hasExited.current) exit();
      }, 300);
    }
  }, [loadingStates]);

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
              transition: "width 0.3s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
}
