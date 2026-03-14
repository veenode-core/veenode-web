import { ArrowUpRight } from "@phosphor-icons/react";
import veenodeWhite from "../assets/veenode-white.png";

const nav = [
  {
    heading: "Services",
    links: [
      { label: "AI Engineering", href: "/services/ai-engineering" },
      { label: "Cybersecurity", href: "/services/cybersecurity" },
      { label: "Software Engineering", href: "/services/software-engineering" },
      { label: "Machine Learning", href: "/services/ml-engineering" },
      { label: "AI Governance & Safety", href: "/services/ai-governance" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  return (
    <footer className="bg-black overflow-hidden">
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
        {/* Top — wordmark + CTA */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 py-16 md:py-20"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="max-w-md">
            <p className="text-xs text-primary-light font-semibold tracking-widest uppercase mb-4">
              Veenode Technologies
            </p>
            <h2
              className="font-bold text-white leading-tight"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Build Smarter Systems.{" "}
              <span style={{ color: "rgba(255,255,255,0.35)" }}>
                Defend Them. Scale Anywhere.
              </span>
            </h2>
          </div>

          <a
            href="/contact"
            className="group inline-flex items-center gap-3 self-start md:self-end"
          >
            <span className="text-sm font-semibold text-white group-hover:opacity-70 transition-opacity">
              Start a conversation
            </span>
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <ArrowUpRight size={15} weight="bold" color="white" />
            </span>
          </a>
        </div>

        {/* Mid — nav columns */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <img src={veenodeWhite} alt="Veenode" className="w-32" />
            <p
              className="text-xs leading-relaxed max-w-50"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              A global professional services firm specialising in AI,
              cybersecurity, and software.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.65rem] font-semibold tracking-wide transition-opacity hover:opacity-60"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {nav.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-4">
              <p
                className="text-[0.65rem] font-bold tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm font-medium transition-opacity hover:opacity-60"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-6">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Veenode Technologies Ltd. All rights
            reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Registered in Nigeria · Operating Globally
          </p>
        </div>
      </div>
    </footer>
  );
}
