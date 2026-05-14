import { useEffect, useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";

export default function BookConsultation() {
  const [isLoading, setIsLoading] = useState(true);
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/consultation-veenode/30min");

  useEffect(() => {
    const name = sessionStorage.getItem("veenode_name");
    const email = sessionStorage.getItem("veenode_email");
    
    let url = "https://calendly.com/consultation-veenode/30min";
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (email) params.append("email", email);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    setCalendlyUrl(url);

    // Listen to Calendly events to hide spinner when widget is ready
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.event && e.data.event.startsWith('calendly.')) {
        // Any calendly event signifies the iframe is loaded and interacting
        setIsLoading(false);
      }
    };
    window.addEventListener("message", handleMessage);

    const existingScript = document.getElementById("calendly-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-6 relative overflow-hidden">
      {/* Decorative background grid (similar to contact page) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,31,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,31,69,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          zIndex: 0,
        }}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <p
            className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-5"
            style={{ color: "rgba(240,165,0,0.85)" }}
          >
            Next Steps
          </p>
          <h1
            className="font-bold leading-[1.05] tracking-tight text-[#0f1f45] mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Book your free consultation
          </h1>
          <p
            className="text-sm leading-relaxed max-w-md mx-auto"
            style={{ color: "rgba(15,31,69,0.5)" }}
          >
            Pick a time that works for you. We'll send you an invitation with the meeting details immediately.
          </p>
        </div>

        {/* Calendly Inline Widget */}
        <div 
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden relative" 
          style={{ minHeight: "700px" }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-0 transition-opacity duration-500">
              <CircleNotch size={40} className="animate-spin text-[#F0A500] mb-4" />
              <p className="text-sm font-medium text-[#0f1f45] opacity-70">Loading calendar...</p>
            </div>
          )}
          <div
            className="calendly-inline-widget w-full relative z-10"
            data-url={calendlyUrl}
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
      </div>
    </div>
  );
}
