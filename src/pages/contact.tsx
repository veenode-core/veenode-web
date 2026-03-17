import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  EnvelopeSimple,
  MapPin,
  LinkedinLogo,
  TwitterLogo,
  GithubLogo,
} from "@phosphor-icons/react";

const enquiryTypes = [
  "AI Engineering",
  "Cybersecurity",
  "Software Engineering",
  "Machine Learning",
  "AI Governance & Safety",
  "General Enquiry",
];

const contactDetails = [
  {
    icon: EnvelopeSimple,
    label: "Email",
    value: "hello@veenode.com",
    href: "mailto:hello@veenode.com",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Lagos, Nigeria",
    href: null,
  },
];

const socials = [
  { icon: LinkedinLogo, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: TwitterLogo, label: "X / Twitter", href: "https://x.com" },
  { icon: GithubLogo, label: "GitHub", href: "https://github.com" },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set([leftRef.current, formRef.current], { opacity: 0, y: 30 });
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left center" });

      tl.to(
        ruleRef.current,
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        0,
      )
        .to(leftRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to(formRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.35);
    },
    { scope: pageRef },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* ── Hero header ── */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 pb-16 md:pb-24">
        <div
          ref={ruleRef}
          className="w-full mb-10"
          style={{ height: "1px", background: "rgba(15,31,69,0.1)" }}
        />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div ref={leftRef}>
            <p
              className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: "rgba(240,165,0,0.85)" }}
            >
              Get in Touch
            </p>
            <h1
              className="font-bold leading-[1.05] tracking-tight text-[#0f1f45]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Let's Build{" "}
              <span style={{ color: "rgba(15,31,69,0.22)" }}>
                Something Together.
              </span>
            </h1>
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs md:text-right"
            style={{ color: "rgba(15,31,69,0.45)" }}
          >
            Whether you have a brief, a question, or just want to explore — we'd
            love to hear from you. We respond within one business day.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-px"
          style={{ background: "rgba(15,31,69,0.08)" }}
        >
          {/* Left — contact info */}
          <div
            ref={leftRef}
            className="lg:col-span-4 bg-primary flex flex-col justify-between p-10 md:p-14 relative overflow-hidden"
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Ghost watermark */}
            <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden">
              <span
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(6rem, 18vw, 14rem)",
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.04)",
                  display: "block",
                  transform: "translate(20%, 15%)",
                }}
              >
                VN
              </span>
            </div>

            <div className="relative z-10 flex flex-col gap-12">
              {/* Eyebrow */}
              <p
                className="text-[0.65rem] font-bold tracking-[0.2em] uppercase"
                style={{ color: "rgba(240,165,0,0.8)" }}
              >
                Veenode Technologies
              </p>

              {/* Contact details */}
              <div className="flex flex-col gap-8">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <Icon
                        size={13}
                        weight="regular"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      />
                      <span
                        className="text-[0.6rem] font-bold tracking-widest uppercase"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {label}
                      </span>
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-white hover:opacity-60 transition-opacity"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-white">
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Gold rule */}
              <div
                className="w-10 h-px"
                style={{ background: "rgba(240,165,0,0.5)" }}
              />

              {/* Response note */}
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                We typically respond within one business day. For urgent
                matters, please mention it in your message.
              </p>
            </div>

            {/* Socials */}
            <div className="relative z-10 flex items-center gap-4 mt-12">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-60"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <Icon
                    size={14}
                    weight="fill"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div ref={formRef} className="lg:col-span-8 bg-white p-10 md:p-14">
            {submitted ? (
              <div className="h-full flex flex-col items-start justify-center gap-6 py-20">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(15,31,69,0.06)" }}
                >
                  <ArrowRight
                    size={20}
                    weight="bold"
                    className="text-primary"
                  />
                </div>
                <h2
                  className="font-bold text-[#0f1f45] leading-tight"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
                >
                  Message received.
                </h2>
                <p
                  className="text-sm leading-relaxed max-w-sm"
                  style={{ color: "rgba(15,31,69,0.5)" }}
                >
                  Thank you for reaching out. A member of our team will be in
                  touch within one business day.
                </p>
                <div
                  className="w-8 h-px mt-2"
                  style={{ background: "#F0A500" }}
                />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* Enquiry type */}
                <div className="flex flex-col gap-4">
                  <label
                    className="text-[0.65rem] font-bold tracking-widest uppercase"
                    style={{ color: "rgba(15,31,69,0.4)" }}
                  >
                    What are you interested in?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {enquiryTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setSelected(type)}
                        className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
                        style={{
                          border: `1px solid ${selected === type ? "#1A3C6E" : "rgba(15,31,69,0.15)"}`,
                          background:
                            selected === type ? "#1A3C6E" : "transparent",
                          color:
                            selected === type
                              ? "#ffffff"
                              : "rgba(15,31,69,0.55)",
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field
                    label="Full Name"
                    id="name"
                    type="text"
                    placeholder="Jane Okafor"
                    required
                  />
                  <Field
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                  />
                </div>

                {/* Organisation */}
                <Field
                  label="Organisation"
                  id="org"
                  type="text"
                  placeholder="Company or institution name"
                />

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-[0.65rem] font-bold tracking-widest uppercase"
                    style={{ color: "rgba(15,31,69,0.4)" }}
                  >
                    Message <span style={{ color: "#F0A500" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project, challenge, or question…"
                    className="w-full text-sm resize-none outline-none transition-colors duration-200 bg-transparent"
                    style={{
                      borderBottom: "1px solid rgba(15,31,69,0.15)",
                      paddingBottom: "10px",
                      color: "#0f1f45",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderBottomColor = "#1A3C6E")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderBottomColor =
                        "rgba(15,31,69,0.15)")
                    }
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between pt-2">
                  <p
                    className="text-xs"
                    style={{ color: "rgba(15,31,69,0.3)" }}
                  >
                    * Required fields
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 text-sm font-bold text-[#0f1f45] hover:opacity-70 transition-opacity"
                  >
                    Send Message
                    <span
                      className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 group-hover:translate-x-0.5"
                      style={{
                        border: "1px solid rgba(15,31,69,0.2)",
                        background: "rgba(15,31,69,0.04)",
                      }}
                    >
                      <ArrowRight size={15} weight="bold" />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Reusable underline field ──────────────────────────────────────────────────
function Field({
  label,
  id,
  type,
  placeholder,
  required,
}: {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[0.65rem] font-bold tracking-widest uppercase"
        style={{ color: "rgba(15,31,69,0.4)" }}
      >
        {label} {required && <span style={{ color: "#F0A500" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full text-sm bg-transparent outline-none transition-colors duration-200 pb-2"
        style={{
          borderBottom: "1px solid rgba(15,31,69,0.15)",
          color: "#0f1f45",
        }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#1A3C6E")}
        onBlur={(e) =>
          (e.currentTarget.style.borderBottomColor = "rgba(15,31,69,0.15)")
        }
      />
    </div>
  );
}
