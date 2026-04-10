import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { servicesApi } from "../services/api";
import TextSplitReveal from "../components/ui/text-split-reveal";

export default function ServiceDetails() {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await servicesApi.getAll();
        const currentPath = location.pathname;
        
        const matchedService = data.find((s: any) => {
          return s.ctaHref === currentPath || s.cta_href === currentPath || s.ctaHref === currentPath + '/' || s.ctaHref === currentPath.replace(/\/$/, "");
        });

        if (matchedService) {
          setService(matchedService);
        }
      } catch (err) {
        console.error("Failed to load service", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [location.pathname]);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  }

  if (!service) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl font-bold text-[#0f1f45] mb-4">Service Not Found</h1>
        <p className="text-muted">We couldn't find the service you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <section className="bg-[#0f1f45] text-white py-24 md:py-32 relative overflow-hidden flex items-center px-6">
        <div className="absolute inset-0 z-0 opacity-20">
          {service.image && (
            <img src={service.image} alt="Background" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <TextSplitReveal text={service.title || service.name} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6" tag="h1" />
          <p className="text-lg md:text-xl text-white/80 max-w-2xl">
            {service.headline}
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          {service.description.split('\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-6 text-base md:text-lg text-[rgba(15,31,69,0.7)] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
