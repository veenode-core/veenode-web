import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextSplitRevealProps {
  children?: string;
  text?: string;
  mobileText?: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  delay?: number;
  duration?: number;
  stagger?: number;
  inHero?: boolean;
}

export default function TextSplitReveal({
  children,
  text,
  mobileText,
  className = "",
  tag = "div",
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  inHero = false,
}: TextSplitRevealProps) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const content = text || children || "";

  useEffect(() => {
    const animateText = (element: HTMLElement, isInHero: boolean) => {
      const chars = element.querySelectorAll(".char");

      if (isInHero) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: "power3.out",
          }
        );
      } else {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reset",
            },
          }
        );
      }
    };

    if (desktopRef.current) {
      animateText(desktopRef.current, inHero);
    }

    if (mobileRef.current) {
      animateText(mobileRef.current, inHero);
    }
  }, [delay, duration, stagger, inHero]);

  const splitText = (textContent: string) => {
    return textContent.split("|").map((segment, segmentIndex) => (
      <span key={segmentIndex} className="inline-block">
        {segment.split("").map((char, charIndex) => (
          <span
            key={`${segmentIndex}-${charIndex}`}
            className="char inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        {segmentIndex < textContent.split("|").length - 1 && (
          <br className="block" />
        )}
      </span>
    ));
  };

  const Tag = tag;

  return (
    <>
      {/* Desktop version */}
      <Tag
        ref={desktopRef}
        className={`${mobileText ? "hidden md:block" : ""} ${className} tracking-tight leading-[1.1]`}
      >
        {splitText(content)}
      </Tag>

      {/* Mobile version (if mobileText is provided) */}
      {mobileText && (
        <Tag ref={mobileRef} className={`block md:hidden ${className}`}>
          {splitText(mobileText)}
        </Tag>
      )}
    </>
  );
}
