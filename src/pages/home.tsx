import Navbar from "../components/navbar";
import Button from "../components/ui/button";
import { ArrowUpRight, ChatCircle } from "@phosphor-icons/react";
import { ReactTyped } from "react-typed";
import heroImage1 from "../assets/herosection.jpg";
import heroImage2 from "../assets/herosection2.jpg";
import heroImage3 from "../assets/herosection3.jpg";
import heroImage4 from "../assets/herosection4.jpg";

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
              <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xl">
                vn.
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
              <Button to="/services" variant="primary" icon={<ArrowUpRight size={20} />}>
                Explore Our Services
              </Button>
              <Button to="/contact" variant="secondary" icon={<ChatCircle size={20} />}>
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
            <div className="absolute inset-0 flex items-center justify-center text-primary font-bold  text-lg">
              vn.
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
              fontSize: 'clamp(4rem, 20vw, 20rem)',
            }}
          >
            VEENODE
          </h2>
        </div>
      </section>
    </div>
  );
}
