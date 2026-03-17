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
    const animateText = (element: HTMLElement) => {
      const chars = element.querySelectorAll(".char");

      if (inHero) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration, stagger, delay, ease: "power3.out" },
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
          },
        );
      }
    };

    if (desktopRef.current) animateText(desktopRef.current);
    if (mobileRef.current) animateText(mobileRef.current);
  }, [delay, duration, stagger, inHero]);

  /**
   * Split strategy:
   * 1. Split on "|" for explicit line breaks.
   * 2. Within each segment, split on spaces to get words.
   * 3. Wrap each WORD in an `inline-block` span so the browser
   *    wraps at word boundaries, never mid-word.
   * 4. Render each CHARACTER inside the word span as a .char
   *    for GSAP to target.
   * 5. Spaces between words are rendered as plain text nodes
   *    (" ") — NOT inside any span — so they are never collapsed
   *    and always behave like normal whitespace.
   */
  const splitText = (textContent: string) => {
    const lines = textContent.split("|");

    return lines.map((line, lineIdx) => {
      const words = line.split(" ");

      return (
        <span key={lineIdx} className="inline">
          {words.map((word, wordIdx) => (
            // Fragment lets us render the word span and the space
            // as true siblings — space is never inside inline-block
            <span key={`${lineIdx}-${wordIdx}`} className="inline">
              <span className="inline-block">
                {word.split("").map((char, charIdx) => (
                  <span
                    key={`${lineIdx}-${wordIdx}-${charIdx}`}
                    className="char inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>
              {/* Space sits outside the inline-block — behaves like normal text */}
              {wordIdx < words.length - 1 && " "}
            </span>
          ))}
          {lineIdx < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  const Tag = tag;

  return (
    <>
      {/* Desktop */}
      <Tag
        ref={desktopRef}
        className={`${mobileText ? "hidden md:block" : ""} ${className} tracking-tight leading-[1.1]`}
      >
        {splitText(content)}
      </Tag>

      {/* Mobile (only when mobileText is provided) */}
      {mobileText && (
        <Tag ref={mobileRef} className={`block md:hidden ${className}`}>
          {splitText(mobileText)}
        </Tag>
      )}
    </>
  );
}
