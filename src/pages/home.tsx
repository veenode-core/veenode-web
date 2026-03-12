import Navbar from "../components/navbar";
import Button from "../components/ui/button";
import TextSplitReveal from "../components/ui/text-split-reveal";
import {
  ArrowUpRight,
  ChatCircle,
  Buildings,
  GoogleLogo,
  Clock,
  SquaresFour,
  Brain,
  ShieldCheck,
  Code,
  ChartLineUp,
  ArrowRight,
} from "@phosphor-icons/react";
import { ReactTyped } from "react-typed";
import heroImage1 from "../assets/herosection.jpg";
import heroImage2 from "../assets/herosection2.jpg";
import heroImage3 from "../assets/herosection3.jpg";
import heroImage4 from "../assets/herosection4.jpg";
import iconImage from "../assets/icon.png";

const credentials = [
  {
    icon: Buildings,
    label: "AWS Partner",
    sub: "Cloud infrastructure",
  },
  {
    icon: GoogleLogo,
    label: "Google Cloud Ready",
    sub: "Verified partner",
  },
  {
    icon: ShieldCheck,
    label: "ISO-aligned",
    sub: "Methodology",
  },
  {
    icon: Clock,
    label: "6+ Years",
    sub: "Technical expertise",
  },
  {
    icon: SquaresFour,
    label: "5 Service Lines",
    sub: "Core offerings",
  },
];

const services = [
  {
    icon: Brain,
    title: "AI Engineering",
    tagline: "From architecture to deployment.",
    description:
      "We design, build, and integrate AI systems that actually work in production — LLM applications, agentic workflows, AI transformation, and custom AI product development.",
    href: "/services/ai-engineering",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    tagline: "Threats are real. So are we.",
    description:
      "VAPT, infrastructure hardening, threat modelling, incident response, and NDPA compliance consulting. We find and fix vulnerabilities before attackers do.",
    href: "/services/cybersecurity",
  },
  {
    icon: Code,
    title: "Software Engineering",
    tagline: "Built to last, built to scale.",
    description:
      "Full-stack development, cloud architecture, APIs, and systems engineering. We build software that performs under real-world conditions.",
    href: "/services/software-engineering",
  },
  {
    icon: ChartLineUp,
    title: "Machine Learning Engineering",
    tagline: "Models that go beyond the notebook.",
    description:
      "From data pipelines to MLOps and custom model development, we build machine learning infrastructure that delivers measurable business value.",
    href: "/services/ml-engineering",
  },
];

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#1a1a1a] overflow-x-hidden">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-20">
        <div className="flex flex-col md:grid md:grid-cols-[1fr_4fr] gap-8 md:gap-12">
          <div className="hidden md:flex justify-start pt-2">
            <div className="relative w-32 h-32 animate-[spin_15s_linear_infinite]">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  fill="none"
                />
                <text className="text-[8.5px] font-bold font-inter uppercase tracking-[0.18em] fill-black">
                  <textPath xlinkHref="#circlePath">
                    Veenode Technologies • 6+ Years • Veenode Technologies • 6+
                    Years •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={iconImage} alt="Veenode" className="w-12 h-12 object-contain" />
              </div>
            </div>
          </div>

          {/* Right Column: Original Content */}
          <div className="flex flex-col items-start w-full">
            {/* Desktop: Static eyebrow */}
            <p className="hidden md:block text-gray-400 text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-inter font-bold mb-10">
              AI Engineering | Cybersecurity | Software | Machine Learning | AI
              Governance & Safety
            </p>

            {/* Mobile: Typed animation */}
            <div className="md:hidden text-primary text-[10px] uppercase tracking-[0.15em] font-inter font-bold mb-6 h-6">
              <ReactTyped
                strings={[
                  "AI Engineering",
                  "Cybersecurity",
                  "Software",
                  "Machine Learning",
                  "AI Governance & Safety",
                ]}
                typeSpeed={80}
                backSpeed={80}
                backDelay={2000}
                loop
              />
            </div>

            {/* Headline as per your last share (No Span) */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 max-w-4xl text-black">
              Build Smarter Systems. <br className="hidden md:block" />
              Defend Them. Scale Anywhere.
            </h1>

            {/* Sub-headline */}
            <p className="text-gray-500 text-sm md:text-base max-w-3xl mb-12 leading-relaxed">
              Veenode Technologies is a global professional services firm
              specialising in AI engineering, cybersecurity, software, machine
              learning, and AI governance. We help ambitious organisations
              build, secure, and responsibly govern the technology that powers
              their next stage of growth.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <Button
                to="/services"
                variant="primary"
                icon={<ArrowUpRight size={20} />}
              >
                Explore Our Services
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                icon={<ChatCircle size={20} />}
              >
                Talk to Us
              </Button>
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-2">
              {[heroImage1, heroImage2, heroImage3, heroImage4].map(
                (img, idx) => (
                  <div
                    key={idx}
                    className="w-full md:w-[24%] aspect-1.5/1 overflow-hidden rounded-2xl border-2 border-primary"
                  >
                    <img
                      src={img}
                      alt={`Capability ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Mobile Spinning Badge - Centered Bottom */}
        <div className="flex md:hidden justify-center mt-16">
          <div className="relative w-28 h-28 animate-[spin_15s_linear_infinite]">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
            >
              <path
                id="circlePathMobile"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                fill="none"
              />
              <text className="text-[8.5px] font-bold font-inter uppercase tracking-[0.18em] fill-black">
                <textPath xlinkHref="#circlePathMobile">
                  Veenode Technologies • 6+ Years • Veenode Technologies • 6+
                  Years •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={iconImage} alt="Veenode" className="w-10 h-10 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Veenode Large Text Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="w-full flex justify-center">
          <h2
            className="font-bold text-primary leading-none tracking-tight text-center"
            style={{
              fontSize: "clamp(4rem, 20vw, 20rem)",
            }}
          >
            VEENODE
          </h2>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-medium tracking-[0.06em] uppercase text-white/60 mb-8">
            Trusted by organisations across Nigeria, Ghana, the UK, and beyond
          </p>
          <div
            className="grid grid-cols-2 md:grid-cols-5 rounded-xl overflow-hidden"
            style={{ gap: "1px", background: "rgba(255,255,255,0.1)" }}
          >
            {credentials.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="bg-primary flex flex-col items-center justify-center gap-3 px-4 py-6 text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} weight="regular" className="text-white" />
                </div>
                <div>
                  <p className="text-[0.8125rem] font-semibold text-white leading-snug">
                    {label}
                  </p>
                  <p className="text-[0.75rem] text-white/60 mt-0.5">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do - Service Overview */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-2xl mb-16">
          <TextSplitReveal 
            text="Five Disciplines.|One Integrated Partner."
            mobileText="Five Disciplines.|One Integrated|Partner."
            className="text-3xl md:text-5xl font-bold mb-4"
            tag="h2"
          />
          <p className="text-muted text-sm md:text-base leading-relaxed">
            We go deeper than most. Whether you need to deploy an AI system,
            harden your infrastructure, govern your AI responsibly, build a
            product from scratch, or operationalise your machine learning models
            — Veenode brings the depth to do it right.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden">
          {services.map(({ icon: Icon, title, tagline, description, href }) => (
            <a
              key={title}
              href={href}
              className="group bg-white p-8 md:p-10 flex flex-col gap-5 hover:bg-[#f5f7fb] transition-colors duration-200"
            >
              {/* Icon + tagline row */}
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#0f1f45]/6 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} weight="regular" className="text-primary" />
                </div>
                <span className="text-xs font-semibold tracking-wide text-gray-700 uppercase mt-1 text-right leading-snug">
                  {tagline}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#0f1f45]">{title}</h3>

              {/* Description */}
              <p className="text-sm text-muted leading-relaxed flex-1">
                {description}
              </p>

              {/* Learn more */}
              <Button 
                to={href} 
                variant="ghost" 
                size="sm"
                icon={<ArrowRight size={14} weight="bold" />}
                className="self-start mt-auto"
              >
                Learn more
              </Button>
            </a>
          ))}
        </div>
      </section>

      {/* Why Veenode - Differentiators */}
      <section className="bg-primary-light py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <TextSplitReveal 
            text="The Partner That Builds|and Protects."
            mobileText="The Partner|That Builds|and Protects."
            className="text-3xl md:text-5xl font-bold text-center mb-6"
            tag="h2"
          />
          <p className="text-center text-muted text-base md:text-lg max-w-4xl mx-auto mb-16">
            Most firms do one of these things. We do all of them, and we do them
            from the same team. Our practitioners span AI engineering,
            cybersecurity, ML, software, and AI governance. For clients who are
            serious about building technology that is production-ready,
            defensible, and responsibly governed, that combination is rare — and
            it matters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                AI, Security, and Governance Combined
              </h3>
              <p className="text-muted">
                You do not need three firms. Veenode's team spans AI
                engineering, cybersecurity, and AI governance — so your system
                gets built, hardened, and governed from the same partner.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Senior-Led Delivery</h3>
              <p className="text-muted">
                No junior teams running your engagement while seniors pitch. At
                Veenode, the people you meet are the people who do the work.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Global Standard, African Roots
              </h3>
              <p className="text-muted">
                We operate to international standards and serve clients
                worldwide, with deep knowledge of African markets, regulatory
                environments, and local technical contexts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <TextSplitReveal 
          text="Built in West Africa.|Ready for the World."
          mobileText="Built in|West Africa.|Ready for|the World."
          className="text-3xl md:text-5xl font-bold text-center mb-6"
          tag="h2"
        />
        <p className="text-center text-muted text-base md:text-lg max-w-3xl mx-auto mb-12">
          Veenode is headquartered in West Africa with a global delivery
          capability. We serve clients across Nigeria and Ghana, as well as
          organisations in the UK, the US, the Middle East, and across Africa.
          Our remote-first delivery model means you get Veenode-quality work
          wherever you are.
        </p>
        <div className="bg-light-grey rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
          <p className="text-muted text-center">
            [ World Map Visualization - Lagos, Accra, London, New York ]
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-light-grey py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <TextSplitReveal 
            text="Industries We Serve"
            className="text-3xl md:text-5xl font-bold text-center mb-16"
            tag="h2"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Financial Services & Fintech",
              "Telecommunications",
              "Healthcare & Life Sciences",
              "Government & Public Sector",
              "Energy & Utilities",
              "International Organisations & NGOs",
            ].map((industry, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-light rounded-full mx-auto mb-4"></div>
                <p className="font-medium text-dark">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Numbers */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <TextSplitReveal 
          text="The Work Speaks|for Itself."
          mobileText="The Work|Speaks|for Itself."
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          tag="h2"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
              6+
            </div>
            <p className="text-muted">Years of combined technical expertise</p>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
              5
            </div>
            <p className="text-muted">
              Core service disciplines under one roof
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
              Global
            </div>
            <p className="text-muted">
              Clients across Nigeria, Ghana, UK, US & beyond
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
              100%
            </div>
            <p className="text-muted">
              Senior-led delivery on every engagement
            </p>
          </div>
        </div>
      </section>

      {/* Insights Preview */}
      <section className="bg-primary-light py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <TextSplitReveal 
            text="Thinking From|the Front Lines"
            mobileText="Thinking|From the|Front Lines"
            className="text-3xl md:text-5xl font-bold text-center mb-6"
            tag="h2"
          />
          <p className="text-center text-muted text-base md:text-lg max-w-3xl mx-auto mb-12">
            Our team publishes technical perspectives on AI, cybersecurity, and
            software engineering. No filler — just insight from practitioners
            who do the work every day.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6">
                <div className="bg-light-grey h-48 rounded-lg mb-4"></div>
                <p className="text-xs text-gold font-medium mb-2">
                  Coming Soon
                </p>
                <h3 className="font-bold text-lg mb-2">Blog Post Title {i}</h3>
                <p className="text-muted text-sm">
                  Preview text for the blog post will appear here...
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="/insights"
              className="text-gold font-semibold hover:text-primary transition-colors"
            >
              Read Our Insights →
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-primary py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <TextSplitReveal 
            text="Ready to Build Something|That Lasts?"
            mobileText="Ready to Build|Something|That Lasts?"
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            tag="h2"
          />
          <p className="text-white/90 text-base md:text-lg mb-8">
            Whether you have a specific project in mind or just want to explore
            what Veenode can do for your organisation, we would love to hear
            from you.
          </p>
          <Button
            to="/contact"
            variant="primary"
            size="lg"
            className="bg-gold text-primary hover:bg-gold/90"
          >
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
