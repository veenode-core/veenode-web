import TextSplitReveal from "../ui/text-split-reveal";
import { LinkedinLogo } from "@phosphor-icons/react";
import { team } from "../../data/about";

export default function TeamSection() {
  return (
    <section className="bg-light-grey py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-xl">
            <TextSplitReveal
              text="The People|Behind the Work"
              mobileText="The People|Behind|the Work"
              className="text-3xl md:text-5xl font-bold text-[#0f1f45] mb-6"
              tag="h2"
            />
            <p className="text-muted text-sm md:text-base leading-relaxed">
              At Veenode, senior practitioners lead every engagement. You will not deal with account managers and then get handed off to junior teams. The experts you speak with are the experts who do the work.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {team.map(({ name, title, bio, linkedin, photo }) => (
            <div key={name} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/5] relative overflow-hidden bg-[#0f1f45]/5">
                <img 
                  src={photo} 
                  alt={name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                />
                <a 
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0f1f45] hover:bg-gold hover:text-white transition-all transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <LinkedinLogo size={20} weight="fill" />
                </a>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#0f1f45] mb-1">{name}</h3>
                <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-4">
                  {title}
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  {bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
