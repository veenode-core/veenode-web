import TextSplitReveal from "../ui/text-split-reveal";
import { industries } from "../../data/home";

export default function IndustriesSection() {
  return (
    <section className="bg-light-grey py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <TextSplitReveal 
          text="Industries We Serve"
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          tag="h2"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {industries.map((industry, idx) => (
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
  );
}
